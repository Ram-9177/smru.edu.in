import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import sharp from "sharp";
import {
  allowExternalImageRequestsForRoute,
  visualMaskRegistry,
  visualMasksForRoute,
  visualStabilizerForRoute,
  visualStabilizerRegistry,
  visualExternalImageRoutes,
  visualReadinessForRoute,
  visualReadinessRegistry,
} from "./visual-audit-config.mjs";

const root = process.cwd();
const exportRoot = path.join(root, "out");
const label = process.argv[2] || "current";
const baseUrl = process.env.FRONTEND_AUDIT_URL || "http://127.0.0.1:4173";
const outputRoot = path.join(root, "output", "frontend-audit", label, "visual");
const defaultExecutablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath = process.env.FRONTEND_AUDIT_BROWSER ||
  (existsSync(defaultExecutablePath) ? defaultExecutablePath : undefined);
const workerCount = Math.max(1, Math.min(2, Number(process.env.VISUAL_WORKERS || 1)));
const stabilizerHoldMs = Math.max(0, Number(process.env.VISUAL_STABILIZER_HOLD_MS || 0));
const routeFilter = new Set((process.env.VISUAL_ROUTES || "")
  .split(",")
  .map((route) => route.trim())
  .filter(Boolean));
const viewports = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 1 },
};

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const portablePath = (value) => path.relative(root, value).split(path.sep).join("/");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : file;
  }));
  return nested.flat();
}

function routeFromFile(file) {
  const name = path.relative(exportRoot, file).split(path.sep).join("/");
  if (name === "index.html") return "/";
  if (name.endsWith("/index.html")) return `/${name.slice(0, -"index.html".length)}`;
  return `/${name}`;
}

function screenshotName(route) {
  const readable = route.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9.-]+/gi, "-") || "home";
  return `${readable.slice(0, 120)}-${sha256(route).slice(0, 10)}.png`;
}

function isRedirectHtml(html) {
  return /http-equiv=["']refresh["']|window\.location\.(?:replace|assign)\s*\(/i.test(html);
}

async function withTimeout(promise, timeoutMs, labelText) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${labelText} timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function nonWhitePixelRatio(bytes) {
  const { data, info } = await sharp(bytes).removeAlpha().toColourspace("srgb").raw().toBuffer({ resolveWithObject: true });
  let nonWhitePixels = 0;
  for (let index = 0; index < data.length; index += info.channels) {
    if (data[index] < 248 || data[index + 1] < 248 || data[index + 2] < 248) nonWhitePixels += 1;
  }
  return nonWhitePixels / (info.width * info.height);
}

function installTimerFreezeInDocument(timerFreeze) {
  if (!timerFreeze || location.pathname !== timerFreeze.documentPath || window.__smruVisualAuditTimerFreezeInstalled) return;
  const nativeScheduler = window[timerFreeze.method].bind(window);
  window.__smruVisualAuditSuppressedTimerCount = 0;
  window.__smruVisualAuditTimerFreezeInstalled = true;
  window[timerFreeze.method] = (handler, delay, ...args) => {
    const source = typeof handler === "function" ? Function.prototype.toString.call(handler) : String(handler);
    if (Number(delay) === timerFreeze.delay && source.includes(timerFreeze.callbackIncludes)) {
      window.__smruVisualAuditSuppressedTimerCount += 1;
      return 0;
    }
    return nativeScheduler(handler, delay, ...args);
  };
}

async function createAuditPage(browser, route) {
  const page = await browser.newPage();
  const stabilizer = visualStabilizerForRoute(route);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(30_000);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "smru.edu.in" || parsed.hostname === "www.smru.edu.in") {
        request.continue({ url: `${baseUrl}${parsed.pathname}${parsed.search}` });
        return;
      }
    } catch {
      // Non-URL request values are handled by the protocol checks below.
    }
    if (url.startsWith(baseUrl) || url.startsWith("data:") || url.startsWith("blob:")) request.continue();
    else if (request.resourceType() === "image" && allowExternalImageRequestsForRoute(route) && url.startsWith("https://")) request.continue();
    else request.abort("blockedbyclient");
  });
  await page.evaluateOnNewDocument(installTimerFreezeInDocument, stabilizer?.timerFreeze || null);
  await page.evaluateOnNewDocument(() => {
    try {
      sessionStorage.setItem("smru_splash_seen", "true");
      sessionStorage.setItem("phd_popup_v3", "true");
    } catch {
      // Storage can be unavailable in opaque initial documents.
    }
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.setAttribute("data-visual-audit", "motion-lock");
      style.textContent = "html{scroll-behavior:auto!important}*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}";
      document.head.appendChild(style);
    });
  });
  return page;
}

async function frameForSelector(page, selector) {
  const handle = await page.waitForSelector(selector, { timeout: 10_000 });
  const frame = await handle.contentFrame();
  await handle.dispose();
  if (!frame) throw new Error(`visual frame did not resolve: ${selector}`);
  return frame;
}

async function applyRouteStabilizer(page, route) {
  const stabilizer = visualStabilizerForRoute(route);
  if (!stabilizer) return;
  const context = stabilizer.frameSelector
    ? await frameForSelector(page, stabilizer.frameSelector)
    : page;
  await context.evaluate(installTimerFreezeInDocument, stabilizer.timerFreeze);
  if (stabilizer.kind === "qtst-page-one") {
    const selector = "#unisDots button[aria-label=\"Page 1\"]";
    await context.waitForSelector(selector, { timeout: 10_000 });
    await context.evaluate((targetSelector) => document.querySelector(targetSelector)?.click(), selector);
  } else if (stabilizer.kind === "veloces-first-slide") {
    await context.waitForFunction(() => typeof window.goToSlide === "function", { timeout: 10_000 });
    await context.evaluate(() => window.goToSlide(0));
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
}

async function captureStabilizerEvidence(page, route) {
  const stabilizer = visualStabilizerForRoute(route);
  if (!stabilizer) return null;
  const context = stabilizer.frameSelector
    ? await frameForSelector(page, stabilizer.frameSelector)
    : page;
  const evidence = await context.evaluate((kind) => {
    const suppressionCount = Number(window.__smruVisualAuditSuppressedTimerCount || 0);
    if (kind === "qtst-page-one") {
      return {
        timerFreezeApplied: suppressionCount > 0,
        state: document.querySelector("#unisDots button[aria-selected=\"true\"]")?.getAttribute("aria-label") || null,
      };
    }
    return {
      timerFreezeApplied: suppressionCount > 0,
      state: `${document.querySelector(".collab-slides")?.style.transform || ""}|${document.querySelector(".dot.active") === document.querySelector(".dot:first-of-type")}`,
    };
  }, stabilizer.kind);
  const expectedState = stabilizer.kind === "qtst-page-one" ? "Page 1" : "translateX(0%)|true";
  if (!evidence.timerFreezeApplied || evidence.state !== expectedState) {
    throw new Error(`visual stabilizer did not freeze ${route} at its approved initial state: ${JSON.stringify(evidence)}`);
  }
  return evidence;
}

async function resetViewportPosition(page) {
  const position = await page.evaluate(async () => {
    document.documentElement.style.setProperty("scroll-behavior", "auto", "important");
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return { x: window.scrollX, y: window.scrollY };
  });
  if (position.x !== 0 || position.y !== 0) throw new Error(`visual viewport did not reset to the approved origin: ${JSON.stringify(position)}`);
  return position;
}

async function waitForStableRender(page, masks) {
  let previousSignature = null;
  let stableSince = 0;
  let stableSamples = 0;
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    const signature = await page.evaluate((maskDefinitions) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const selectors = maskDefinitions
        .filter((mask) => !mask.frameSelector && (mask.mode || "hide") === "hide")
        .map((mask) => mask.selector);
      const isMasked = (element) => selectors.some((selector) => element.matches(selector) || element.closest(selector));
      const visibleLayout = Array.from(document.body.querySelectorAll("*")).flatMap((element) => {
        if (isMasked(element)) return [];
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height || rect.bottom <= 0 || rect.right <= 0 || rect.top >= height || rect.left >= width) return [];
        const style = getComputedStyle(element);
        const className = typeof element.className === "string" ? element.className : element.className?.baseVal || "";
        return [[
          element.tagName,
          element.id,
          className,
          Math.round(rect.left * 10) / 10,
          Math.round(rect.top * 10) / 10,
          Math.round(rect.width * 10) / 10,
          Math.round(rect.height * 10) / 10,
          style.display,
          style.visibility,
          style.opacity,
          Array.from(element.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent || "")
            .join(" ")
            .replace(/\s+/g, " ")
            .trim(),
        ]];
      });
      const textClone = document.body.cloneNode(true);
      for (const selector of selectors) textClone.querySelectorAll(selector).forEach((node) => node.remove());
      return JSON.stringify({
        readyState: document.readyState,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        text: textClone.textContent.replace(/\s+/g, " ").trim(),
        visibleLayout,
      });
    }, masks);
    if (signature === previousSignature) {
      stableSamples += 1;
    } else {
      previousSignature = signature;
      stableSamples = 1;
      stableSince = Date.now();
    }
    if (stableSamples >= 4 && Date.now() - stableSince >= 1_000) return true;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

async function waitForReadiness(page, route, masks) {
  await page.waitForFunction(() => !document.getElementById("site-preloader"), { timeout: 10_000 });
  for (const requirement of visualReadinessForRoute(route)) {
    await page.waitForFunction((selector) => !document.querySelector(selector), { timeout: requirement.timeoutMs }, requirement.selector);
  }
  await withTimeout(page.evaluate(async () => {
    if (!document.fonts || document.fonts.status === "loaded") return;
    await document.fonts.ready;
  }), 10_000, "document fonts");
  for (const mask of masks) {
    if (mask.optional) continue;
    if (mask.frameSelector) {
      const frame = await frameForSelector(page, mask.frameSelector);
      await frame.waitForSelector(mask.selector, { timeout: 10_000 });
    } else {
      await page.waitForSelector(mask.selector, { timeout: 10_000 });
    }
  }
  const topLevelHideMasks = masks.filter((mask) => !mask.frameSelector && (mask.mode || "hide") === "hide");
  await page.waitForFunction((maskDefinitions) => {
    const selectors = maskDefinitions.map((mask) => mask.selector);
    const isMasked = (element) => selectors.some((selector) => element.matches(selector) || element.closest(selector));
    const visibleImages = Array.from(document.images).filter((image) => {
      const box = image.getBoundingClientRect();
      return !isMasked(image) && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0 && box.top < innerHeight && box.left < innerWidth;
    });
    return visibleImages.every((image) => image.complete && image.naturalWidth > 0);
  }, { timeout: 15_000 }, topLevelHideMasks);
  await page.evaluate(async (maskDefinitions) => {
    const selectors = maskDefinitions.map((mask) => mask.selector);
    const isMasked = (element) => selectors.some((selector) => element.matches(selector) || element.closest(selector));
    const visibleImages = Array.from(document.images).filter((image) => {
      const box = image.getBoundingClientRect();
      return !isMasked(image) && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0 && box.top < innerHeight && box.left < innerWidth;
    });
    await Promise.all(visibleImages.map((image) => image.decode?.().catch(() => undefined)));
  }, topLevelHideMasks);
  if (!await waitForStableRender(page, masks)) throw new Error("render did not remain stable for four samples over at least one second");
}

async function captureDocumentEvidence(page, masks) {
  const documentMasks = masks.filter((mask) => !mask.frameSelector);
  const frameMaskedNodeCounts = [];
  for (const mask of masks.filter((definition) => definition.frameSelector)) {
    const frame = await frameForSelector(page, mask.frameSelector);
    const count = await frame.$$eval(mask.selector, (nodes) => nodes.length);
    if (!mask.optional && count === 0) throw new Error(`visual frame mask did not resolve: ${mask.selector}`);
    frameMaskedNodeCounts.push({
      selector: mask.selector,
      frameSelector: mask.frameSelector,
      mode: mask.mode || "hide",
      count,
    });
  }
  const evidence = await page.evaluate((maskDefinitions) => {
    const clone = document.documentElement.cloneNode(true);
    const maskedNodeCounts = [];
    for (const mask of maskDefinitions) {
      const liveCount = document.querySelectorAll(mask.selector).length;
      const cloneNodes = Array.from(clone.querySelectorAll(mask.selector));
      if ((!mask.optional && liveCount === 0) || cloneNodes.length !== liveCount) throw new Error(`visual mask did not resolve consistently: ${mask.selector}`);
      for (const node of cloneNodes) {
        if (mask.mode === "background-image") {
          node.setAttribute("data-visual-audit-background-mask", mask.selector);
          node.style.setProperty("background-image", mask.replacementBackgroundImage, "important");
        } else if (mask.optional) node.remove();
        else {
          const placeholder = document.createElement("visual-audit-mask");
          placeholder.setAttribute("data-selector", mask.selector);
          node.replaceWith(placeholder);
        }
      }
      if (mask.optional) {
        const placeholder = document.createElement("visual-audit-optional-mask");
        placeholder.setAttribute("data-selector", mask.selector);
        clone.querySelector("body")?.appendChild(placeholder);
      }
      maskedNodeCounts.push({ selector: mask.selector, mode: mask.mode || "hide", count: liveCount });
    }
    clone.querySelectorAll("script,style,noscript,next-route-announcer").forEach((node) => node.remove());
    const assetUrls = Array.from(clone.querySelectorAll("img[src],source[src],source[srcset],video[src],video[poster],audio[src],iframe[src],link[href]"))
      .flatMap((node) => ["src", "srcset", "poster", "href"].flatMap((attribute) => {
        const value = node.getAttribute(attribute);
        return value ? [`${node.tagName.toLowerCase()}:${attribute}:${value}`] : [];
      }))
      .sort();
    return {
      normalizedDom: clone.outerHTML.replace(/\s+/g, " ").trim(),
      visibleText: clone.querySelector("body")?.textContent.replace(/\s+/g, " ").trim() || "",
      assetUrls,
      maskedNodeCounts,
    };
  }, documentMasks);
  return {
    ...evidence,
    maskedNodeCounts: [...evidence.maskedNodeCounts, ...frameMaskedNodeCounts],
  };
}

async function applyVisualMasks(page, masks) {
  if (!masks.length) return;
  const documentRules = masks.filter((mask) => !mask.frameSelector).map((mask) => mask.mode === "background-image"
    ? `${mask.selector}{background-image:${mask.replacementBackgroundImage}!important}`
    : `${mask.selector}{visibility:hidden!important}`);
  if (documentRules.length) await page.addStyleTag({ content: documentRules.join("\n") });
  for (const mask of masks.filter((definition) => definition.frameSelector)) {
    const frame = await frameForSelector(page, mask.frameSelector);
    await frame.addStyleTag({ content: `${mask.selector}{visibility:hidden!important}` });
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
}

const htmlFiles = (await walk(exportRoot)).filter((file) => file.endsWith(".html"));
const routeHtml = new Map();
for (const file of htmlFiles) routeHtml.set(routeFromFile(file), await readFile(file, "utf8"));
const allRoutes = [...routeHtml.keys()].sort();
for (const requestedRoute of routeFilter) {
  if (!routeHtml.has(requestedRoute)) throw new Error(`VISUAL_ROUTES contains an unknown route: ${requestedRoute}`);
}
const selectedRoutes = routeFilter.size ? allRoutes.filter((route) => routeFilter.has(route)) : allRoutes;
const redirectRoutes = selectedRoutes.filter((route) => isRedirectHtml(routeHtml.get(route)));
const captureRoutes = selectedRoutes.filter((route) => !isRedirectHtml(routeHtml.get(route)));
const maskRegistryEvidence = [...visualMaskRegistry.entries()].map(([route, masks]) => ({ route, masks }));
const stabilizerRegistryEvidence = [...visualStabilizerRegistry.entries()].map(([route, stabilizer]) => ({ route, stabilizer }));
const readinessRegistryEvidence = [...visualReadinessRegistry.entries()].map(([route, requirements]) => ({ route, requirements }));
const externalImageRouteEvidence = [...visualExternalImageRoutes.entries()].map(([route, justification]) => ({ route, justification }));
const maskRegistrySha256 = sha256(JSON.stringify({
  masks: maskRegistryEvidence,
  stabilizers: stabilizerRegistryEvidence,
  readiness: readinessRegistryEvidence,
  externalImages: externalImageRouteEvidence,
}));

for (const profile of Object.keys(viewports)) {
  await mkdir(path.join(outputRoot, profile), { recursive: true });
  await mkdir(path.join(outputRoot, "unmasked", profile), { recursive: true });
  await mkdir(path.join(outputRoot, "dom", profile), { recursive: true });
}

const results = [];
let browser;
let batchRoutes = [];
let nextRoute = 0;
let completedRoutes = 0;

async function worker() {
  while (true) {
    const index = nextRoute;
    nextRoute += 1;
    if (index >= batchRoutes.length) break;
    const route = batchRoutes[index];
    const masks = visualMasksForRoute(route);
    for (const [profile, viewport] of Object.entries(viewports)) {
      const page = await createAuditPage(browser, route);
      const consoleErrors = [];
      const pageErrors = [];
      const onConsole = (message) => {
        if (message.type() === "error" && !message.text().includes("ERR_BLOCKED_BY_CLIENT")) consoleErrors.push(message.text());
      };
      const onPageError = (error) => pageErrors.push(error.message);
      page.on("console", onConsole);
      page.on("pageerror", onPageError);
      let status = null;
      try {
        await page.setViewport(viewport);
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: ["domcontentloaded", "networkidle2"], timeout: 30_000 });
        status = response?.status() ?? null;
        if (status === null || status >= 400) throw new Error(`unexpected HTTP status ${status}`);
        await page.evaluate(() => scrollTo(0, 0));
        await applyRouteStabilizer(page, route);
        await waitForReadiness(page, route, masks);
        await applyRouteStabilizer(page, route);
        if (visualStabilizerForRoute(route) && stabilizerHoldMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, stabilizerHoldMs));
          await captureStabilizerEvidence(page, route);
        }
        const viewportPosition = await resetViewportPosition(page);
        const evidence = await captureDocumentEvidence(page, masks);
        const domFile = path.join(outputRoot, "dom", profile, screenshotName(route).replace(/\.png$/, ".html"));
        await writeFile(domFile, `${evidence.normalizedDom}\n`);

        const unmaskedFile = path.join(outputRoot, "unmasked", profile, screenshotName(route));
        await applyRouteStabilizer(page, route);
        await resetViewportPosition(page);
        const unmaskedBytes = await withTimeout(page.screenshot({ path: unmaskedFile, type: "png", fullPage: false }), 15_000, `${route} ${profile} unmasked screenshot`);
        const unmaskedNonWhitePixelRatio = await nonWhitePixelRatio(unmaskedBytes);

        let comparisonFile = unmaskedFile;
        let comparisonBytes = unmaskedBytes;
        if (masks.length) {
          await applyVisualMasks(page, masks);
          await applyRouteStabilizer(page, route);
          await resetViewportPosition(page);
          comparisonFile = path.join(outputRoot, profile, screenshotName(route));
          comparisonBytes = await withTimeout(page.screenshot({ path: comparisonFile, type: "png", fullPage: false }), 15_000, `${route} ${profile} masked screenshot`);
        }
        const stabilizerEvidence = await captureStabilizerEvidence(page, route);

        results.push({
          route,
          profile,
          status,
          classification: masks.length ? "selector-masked" : "deterministic",
          masks,
          stabilizerEvidence,
          viewportPosition,
          maskedNodeCounts: evidence.maskedNodeCounts,
          screenshot: portablePath(comparisonFile),
          screenshotSha256: sha256(comparisonBytes),
          unmaskedScreenshot: portablePath(unmaskedFile),
          unmaskedScreenshotSha256: sha256(unmaskedBytes),
          normalizedDomSha256: sha256(evidence.normalizedDom),
          normalizedDomSnapshot: portablePath(domFile),
          visibleTextSha256: sha256(evidence.visibleText),
          visibleTextLength: evidence.visibleText.length,
          assetUrlsSha256: sha256(JSON.stringify(evidence.assetUrls)),
          renderStable: true,
          nonWhitePixelRatio: await nonWhitePixelRatio(comparisonBytes),
          unmaskedNonWhitePixelRatio,
          consoleErrors,
          pageErrors,
        });
      } catch (caught) {
        const error = caught instanceof Error ? caught.message : String(caught);
        results.push({ route, profile, status, error, consoleErrors, pageErrors });
      } finally {
        page.off("console", onConsole);
        page.off("pageerror", onPageError);
        await withTimeout(page.close(), 5_000, `${route} ${profile} page close`).catch(() => undefined);
      }
    }
    completedRoutes += 1;
    if (completedRoutes % 25 === 0) console.log(`Captured ${completedRoutes}/${captureRoutes.length} routes`);
  }
}

for (let start = 0; start < captureRoutes.length; start += 50) {
  batchRoutes = captureRoutes.slice(start, start + 50);
  nextRoute = 0;
  browser = await puppeteer.launch({ headless: true, protocolTimeout: 45_000, ...(executablePath ? { executablePath } : {}) });
  try {
    await Promise.all(Array.from({ length: workerCount }, () => worker()));
  } finally {
    const browserProcess = browser.process();
    try {
      await withTimeout(browser.close(), 10_000, "browser close");
    } catch {
      browser.disconnect();
      browserProcess?.kill("SIGKILL");
    }
  }
}

const captures = results.sort((left, right) => `${left.route}|${left.profile}`.localeCompare(`${right.route}|${right.profile}`));
const manifest = {
  generatedAt: new Date().toISOString(),
  label,
  baseUrl,
  workerCount,
  stabilizerHoldMs,
  routeFilter: [...routeFilter].sort(),
  exportRouteCount: allRoutes.length,
  selectedRouteCount: selectedRoutes.length,
  captureRouteCount: captureRoutes.length,
  redirectRoutes,
  viewportCount: Object.keys(viewports).length,
  maskRegistry: maskRegistryEvidence,
  stabilizerRegistry: stabilizerRegistryEvidence,
  readinessRegistry: readinessRegistryEvidence,
  externalImageRoutes: externalImageRouteEvidence,
  maskRegistrySha256,
  captures,
};
const manifestPath = path.join(outputRoot, "manifest.json");
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
const summary = {
  manifest: portablePath(manifestPath),
  exportRoutes: allRoutes.length,
  selectedRoutes: selectedRoutes.length,
  redirectRoutes: redirectRoutes.length,
  captures: captures.length,
  errors: captures.filter((item) => item.error).length,
  failedStatuses: captures.filter((item) => item.status === null || item.status >= 400).length,
  consoleErrors: captures.reduce((total, item) => total + (item.consoleErrors?.length || 0), 0),
  pageErrors: captures.reduce((total, item) => total + (item.pageErrors?.length || 0), 0),
};
console.log(JSON.stringify(summary));
if (summary.errors || summary.failedStatuses || summary.consoleErrors || summary.pageErrors) process.exitCode = 1;
