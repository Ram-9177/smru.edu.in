import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const projectRoot = process.cwd();
const exportRoot = path.join(projectRoot, "out");
const label = process.argv[2] || "current";
const baseUrl = process.env.FRONTEND_AUDIT_URL || "http://127.0.0.1:4173";
const defaultBrowserExecutablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browserExecutablePath = process.env.FRONTEND_AUDIT_BROWSER ||
  (existsSync(defaultBrowserExecutablePath) ? defaultBrowserExecutablePath : undefined);
const outputDir = path.join(projectRoot, "output", "frontend-audit", label);
const browserWaitUntil = (() => {
  const candidate = (process.env.FRONTEND_AUDIT_WAIT_UNTIL || process.env.FRONTEND_AUDIT_WAITUNTIL || "networkidle2").toLowerCase();
  return ["commit", "domcontentloaded", "networkidle0", "networkidle2", "load"].includes(candidate)
    ? candidate
    : "networkidle2";
})();
const pageTimeoutMs = Number(process.env.FRONTEND_AUDIT_TIMEOUT_MS || "45000");
const gotoTimeoutMs = Number.isFinite(pageTimeoutMs) && pageTimeoutMs > 0 ? Math.trunc(pageTimeoutMs) : 45000;

const browserRoutes = [
  "/",
  "/about/",
  "/admissions/",
  "/schools/",
  "/law/",
  "/nursing-sciences/",
  "/campus-360/",
  "/grievance-redressal/",
  "/contact/",
  "/partner/qtst/",
];

const protectedMarkers = [
  "apply.smru.edu.in",
  "ctplform",
  "meritto",
  "iframe",
  "redirectUrl",
  "partner-pages",
  "partner-alias-redirects",
];

const sourceRoots = ["app", "src"];
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".html"]);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

async function withTimeout(promise, timeoutMs, label) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    })
  );
  return files.flat();
}

function routeFromHtml(filePath) {
  const relativePath = path.relative(exportRoot, filePath).split(path.sep).join("/");
  if (relativePath === "index.html") return "/";
  if (relativePath === "404.html") return "/404.html";
  return `/${relativePath.replace(/\/index\.html$/, "")}/`;
}

function visibleTextFromHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function attributesFromTag(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
  }
  return attributes;
}

async function collectExportInventory() {
  const htmlFiles = (await walk(exportRoot)).filter((file) => file.endsWith(".html"));
  const routes = [];
  const links = [];

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    const route = routeFromHtml(filePath);
    const text = visibleTextFromHtml(html);
    routes.push({
      route,
      file: path.relative(projectRoot, filePath),
      htmlSha256: sha256(html),
      visibleTextSha256: sha256(text),
      visibleTextLength: text.length,
    });

    for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
      const attributes = attributesFromTag(match[0]);
      const href = attributes.href;
      if (!href) continue;
      links.push({
        sourceRoute: route,
        href,
        target: attributes.target || "_self",
        rel: attributes.rel || "",
        protected: href.includes("apply.smru.edu.in") || href.includes("ctpl.io"),
      });
    }
  }

  return {
    routes: routes.sort((a, b) => a.route.localeCompare(b.route)),
    links,
  };
}

async function collectProtectedFiles() {
  const candidates = [
    path.join(projectRoot, "next.config.mjs"),
    path.join(projectRoot, "public", ".htaccess"),
  ];

  for (const sourceRoot of sourceRoots) {
    const absoluteRoot = path.join(projectRoot, sourceRoot);
    const files = await walk(absoluteRoot);
    candidates.push(...files.filter((file) => sourceExtensions.has(path.extname(file))));
  }

  const protectedFiles = [];
  for (const filePath of candidates) {
    const contents = await readFile(filePath, "utf8");
    const markers = protectedMarkers.filter((marker) => contents.toLowerCase().includes(marker.toLowerCase()));
    if (!markers.length) continue;
    protectedFiles.push({
      file: path.relative(projectRoot, filePath),
      markers,
      sha256: sha256(contents),
    });
  }

  return protectedFiles.sort((a, b) => a.file.localeCompare(b.file));
}

async function auditRoute(browser, route, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push({ url: request.url(), error: request.failure()?.errorText || "unknown" });
  });

  let response = null;
  try {
    response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: browserWaitUntil,
      timeout: gotoTimeoutMs,
    });
  } catch (error) {
    if (!String(error).includes("Navigation timeout")) throw error;
    response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: gotoTimeoutMs,
    });
  }

  const result = await page.evaluate(() => {
    const controlHasName = (element) => {
      const text = element.textContent?.trim();
      const imageAlt = element.querySelector("img[alt]")?.getAttribute("alt")?.trim();
      return Boolean(text || imageAlt || element.getAttribute("aria-label") || element.getAttribute("title"));
    };
    const inputHasLabel = (input) => {
      const id = input.getAttribute("id");
      return Boolean(
        input.getAttribute("aria-label") ||
          input.getAttribute("aria-labelledby") ||
          (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
          input.closest("label")
      );
    };

    const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => {
      try {
        JSON.parse(script.textContent || "");
        return null;
      } catch (error) {
        return error instanceof Error ? error.message : String(error);
      }
    });

    return {
      title: document.title,
      lang: document.documentElement.lang,
      h1Count: document.querySelectorAll("h1").length,
      missingImageAlt: document.querySelectorAll("img:not([alt])").length,
      unnamedButtons: Array.from(document.querySelectorAll("button")).filter((element) => !controlHasName(element)).length,
      unnamedLinks: Array.from(document.querySelectorAll("a[href]")).filter((element) => !controlHasName(element)).length,
      unlabeledInputs: Array.from(document.querySelectorAll("input, select, textarea")).filter((input) => !inputHasLabel(input)).length,
      invalidJsonLdBlocks: jsonLd.filter(Boolean),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      visibleTextSha256Input: document.body.innerText.replace(/\s+/g, " ").trim(),
    };
  });

  await withTimeout(page.close(), 5_000, `${route} page close`).catch(() => undefined);
  return {
    route,
    viewport,
    status: response?.status() ?? null,
    ...result,
    visibleTextSha256: sha256(result.visibleTextSha256Input),
    visibleTextSha256Input: undefined,
    consoleErrors,
    failedRequests,
  };
}

async function collectBrowserEvidence() {
  const browser = await puppeteer.launch({
    headless: true,
    ...(browserExecutablePath ? { executablePath: browserExecutablePath } : {}),
  });
  try {
    const results = [];
    for (const route of browserRoutes) {
      results.push(await auditRoute(browser, route, { width: 1440, height: 900, deviceScaleFactor: 1 }));
      results.push(await auditRoute(browser, route, { width: 390, height: 844, deviceScaleFactor: 1 }));
    }
    return results;
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

await mkdir(outputDir, { recursive: true });
const exportInventory = await collectExportInventory();
const protectedFiles = await collectProtectedFiles();
const browserEvidence = await collectBrowserEvidence();
const report = {
  generatedAt: new Date().toISOString(),
  label,
  baseUrl,
  routeCount: exportInventory.routes.length,
  protectedLinkCount: exportInventory.links.filter((link) => link.protected).length,
  externalLinkCount: exportInventory.links.filter((link) => /^https?:\/\//.test(link.href)).length,
  routes: exportInventory.routes,
  links: exportInventory.links,
  protectedFiles,
  browserEvidence,
};

await writeFile(path.join(outputDir, "audit.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify({
    output: path.relative(projectRoot, path.join(outputDir, "audit.json")),
    routeCount: report.routeCount,
    protectedLinkCount: report.protectedLinkCount,
    protectedFileCount: protectedFiles.length,
    browserChecks: browserEvidence.length,
    consoleErrors: browserEvidence.reduce((total, item) => total + item.consoleErrors.length, 0),
    accessibilitySignals: browserEvidence.reduce(
      (total, item) => total + item.missingImageAlt + item.unnamedButtons + item.unnamedLinks + item.unlabeledInputs,
      0
    ),
  })
);
