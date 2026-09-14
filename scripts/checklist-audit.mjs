import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  findBrowserCredentialAuthorization,
  findCredentialAssignments,
  findForbiddenStringLiterals,
  isPublicDeveloperBundle,
} from "./audit-patterns.mjs";

const root = process.cwd();
const exportRoot = path.join(root, "out");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const label = args.find((argument) => !argument.startsWith("--")) || "current";
const reportPath = path.join(root, "output", "frontend-audit", label, "checklist-audit.json");
const productionOrigin = "https://smru.edu.in";
const forbiddenCredentialValueHashes = new Set([
  "a0826a61a948346c7128979a0508db4a6b149543db05e9e7fd376456905bd157",
]);
const textExtensions = new Set([".css", ".html", ".js", ".jsx", ".json", ".mjs", ".ts", ".tsx", ".txt", ".xml"]);
const sourceExtensions = new Set([".html", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  }));
  return nested.flat();
}

const relative = (file) => path.relative(root, file).split(path.sep).join("/");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
  }
  return result;
}

function routeFromFile(file) {
  const name = path.relative(exportRoot, file).split(path.sep).join("/");
  if (name === "index.html") return "/";
  if (name.endsWith("/index.html")) return `/${name.slice(0, -"index.html".length)}`;
  return `/${name}`;
}

function localCandidates(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return [];
  }
  const clean = decoded.replace(/^\/+/, "");
  if (!clean) return ["index.html"];
  if (decoded.endsWith("/")) return [`${clean}index.html`];
  if (path.extname(clean)) return [clean];
  return [clean, `${clean}/index.html`, `${clean}.html`];
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

const exportFiles = await walk(exportRoot);
const exportFileSet = new Set(exportFiles.map((file) => path.relative(exportRoot, file).split(path.sep).join("/")));
const htmlFiles = exportFiles.filter((file) => file.endsWith(".html"));
const htmlByFile = new Map();
const idsByFile = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  htmlByFile.set(file, html);
  idsByFile.set(file, new Set([...html.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)].map((match) => match[1] ?? match[2])));
}

const pages = [];
const brokenLinks = [];
const brokenHashes = [];
const duplicateIds = [];
const duplicateSchemas = [];
const exactDuplicateSchemas = [];
const externalDomains = new Map();
const protectedLinks = [];
const localAssetReferences = [];
const unsafeLinkSchemes = [];

for (const file of htmlFiles) {
  const html = htmlByFile.get(file);
  const route = routeFromFile(file);
  const idValues = [...html.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)].map((match) => match[1] ?? match[2]);
  const idCounts = new Map();
  idValues.forEach((id) => idCounts.set(id, (idCounts.get(id) || 0) + 1));
  for (const [id, count] of idCounts) {
    if (count > 1) duplicateIds.push({ route, id, count });
  }

  const jsonLdErrors = [];
  const schemaTypes = [];
  const schemaSignatures = new Map();
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const values = Array.isArray(value) ? value : [value];
      for (const item of values) {
        if (item && typeof item === "object") {
          const type = item["@type"] ? String(item["@type"]) : "unknown";
          if (item["@type"]) schemaTypes.push(type);
          const signature = sha256(JSON.stringify(item));
          const existing = schemaSignatures.get(signature) || { type, count: 0 };
          existing.count += 1;
          schemaSignatures.set(signature, existing);
        }
      }
    } catch (error) {
      jsonLdErrors.push(error instanceof Error ? error.message : String(error));
    }
  }
  const schemaCounts = new Map();
  schemaTypes.forEach((type) => schemaCounts.set(type, (schemaCounts.get(type) || 0) + 1));
  for (const [type, count] of schemaCounts) {
    if (count > 1) duplicateSchemas.push({ route, type, count });
  }
  for (const [signature, item] of schemaSignatures) {
    if (item.count > 1) exactDuplicateSchemas.push({ route, type: item.type, count: item.count, sha256: signature });
  }

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const description = html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || "";
  const canonical = html.match(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*href=["']([^"']*)["'][^>]*>/i)?.[1] || "";
  const robots = html.match(/<meta\b(?=[^>]*name=["']robots["'])[^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || "";
  const lang = html.match(/<html\b[^>]*lang=["']([^"']*)["']/i)?.[1] || "";
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  pages.push({
    route,
    title,
    description,
    canonical,
    robots,
    lang,
    h1Count,
    jsonLdBlocks: schemaTypes.length,
    jsonLdErrors,
    hasViewport: /<meta\b(?=[^>]*name=["']viewport["'])/i.test(html),
    hasCharset: /<meta\b[^>]*charset=/i.test(html),
    metadataHasNonProductionHost: /localhost|127\.0\.0\.1|staging|stageprod/i.test(`${title} ${description} ${canonical}`),
  });

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const href = attrs.href;
    if (!href || /^(?:mailto:|tel:)/i.test(href)) continue;
    let url;
    try {
      url = new URL(href, `${productionOrigin}${route}`);
    } catch {
      brokenLinks.push({ route, href, reason: "invalid URL" });
      continue;
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      unsafeLinkSchemes.push({ route, href, protocol: url.protocol });
      continue;
    }
    if (url.origin !== productionOrigin) {
      externalDomains.set(url.hostname, (externalDomains.get(url.hostname) || 0) + 1);
      if (/apply\.smru\.edu\.in|ctpl\.io/i.test(url.href)) {
        protectedLinks.push({ route, href, target: attrs.target || "_self", rel: attrs.rel || "" });
      }
      continue;
    }
    const candidates = localCandidates(url.pathname);
    const targetRelative = candidates.find((candidate) => exportFileSet.has(candidate));
    if (!targetRelative) {
      brokenLinks.push({ route, href, pathname: url.pathname });
      continue;
    }
    if (url.hash && url.hash !== "#") {
      let id;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        brokenHashes.push({ route, href, reason: "invalid encoded fragment" });
        continue;
      }
      const targetFile = path.join(exportRoot, targetRelative);
      if (!idsByFile.get(targetFile)?.has(id)) brokenHashes.push({ route, href, target: url.pathname, id });
    }
  }

  for (const match of html.matchAll(/<(?:img|script|source|video|audio|iframe|link)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const values = [attrs.src, attrs.poster];
    if (match[0].toLowerCase().startsWith("<link")) values.push(attrs.href);
    if (attrs.srcset) values.push(...attrs.srcset.split(",").map((part) => part.trim().split(/\s+/)[0]));
    for (const value of values.filter(Boolean)) {
      if (/['"`]\s*\+|\$\{|\{\{/.test(value)) continue;
      if (/^(?:data:|blob:|https?:|\/\/|#)/i.test(value)) continue;
      const url = new URL(value, `${productionOrigin}${route}`);
      const candidates = localCandidates(url.pathname);
      if (!candidates.some((candidate) => exportFileSet.has(candidate))) {
        localAssetReferences.push({ route, value, pathname: url.pathname });
      }
    }
  }
}

const cssMissingAssets = [];
for (const file of exportFiles.filter((item) => item.endsWith(".css"))) {
  const css = await readFile(file, "utf8");
  for (const match of css.matchAll(/url\((?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\)/gi)) {
    const value = match[1] ?? match[2] ?? match[3];
    if (!value || /^(?:data:|blob:|https?:|\/\/|#)/i.test(value)) continue;
    const target = value.startsWith("/")
      ? path.join(exportRoot, value.replace(/^\/+/, ""))
      : path.resolve(path.dirname(file), value);
    if (!exportFileSet.has(path.relative(exportRoot, target).split(path.sep).join("/"))) {
      cssMissingAssets.push({ file: path.relative(exportRoot, file), value });
    }
  }
}

const sourceRoots = ["app", "components", "src", "public"];
const sourceFiles = (await Promise.all(sourceRoots.map((directory) => walk(path.join(root, directory))))).flat();
const searchableSource = sourceFiles.filter((file) => sourceExtensions.has(path.extname(file)));
const extendedSecurityRoots = ["scripts", "tests"];
const extendedSecurityFiles = (await Promise.all(extendedSecurityRoots.map((directory) => walk(path.join(root, directory))))).flat()
  .filter((file) => sourceExtensions.has(path.extname(file)));
const sourceInventory = {
  routeEntries: sourceFiles.filter((file) => /\/page\.(?:js|jsx|ts|tsx)$/.test(file)).map(relative).sort(),
  layouts: sourceFiles.filter((file) => /\/layout\.(?:js|jsx|ts|tsx)$/.test(file)).map(relative).sort(),
  components: sourceFiles.filter((file) => /\/components?\//i.test(file) && /\.(?:jsx|tsx)$/.test(file)).map(relative).sort(),
  hooks: sourceFiles.filter((file) => /\/hooks?\//i.test(file)).map(relative).sort(),
  publicFiles: sourceFiles.filter((file) => relative(file).startsWith("public/")).map(relative).sort(),
};

const codeSignals = {
  storage: [],
  cookies: [],
  serviceWorkers: [],
  webWorkers: [],
  postMessage: [],
  rawHtmlSinks: [],
  suppressions: [],
  unfinishedMarkers: [],
  localOrStagingUrls: [],
  environmentVariables: new Set(),
  secrets: [],
  browserCredentialAuthorization: [],
  forbiddenCredentialValues: [],
};
const credentialValues = new Map();
const patterns = [
  ["storage", /\b(?:localStorage|sessionStorage|indexedDB|caches\.)\b/g],
  ["cookies", /document\.cookie/g],
  ["serviceWorkers", /navigator\.serviceWorker/g],
  ["webWorkers", /\bnew\s+(?:Shared)?Worker\s*\(/g],
  ["postMessage", /\bpostMessage\s*\(/g],
  ["rawHtmlSinks", /dangerouslySetInnerHTML|\binnerHTML\s*=|insertAdjacentHTML|document\.write(?:ln)?\s*\(|\beval\s*\(|new\s+Function\s*\(/g],
  ["suppressions", /@ts-(?:nocheck|ignore)|eslint-disable|ignoreDuringBuilds/g],
  ["unfinishedMarkers", /\b(?:TODO|FIXME|HACK|TEMP|XXX|PLACEHOLDER)\b/g],
  ["localOrStagingUrls", /https?:\/\/(?:localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|[^/\s"']*(?:staging|stageprod)[^/\s"']*)[^\s"']*/gi],
];

for (const file of searchableSource) {
  const contents = await readFile(file, "utf8");
  for (const [key, pattern] of patterns) {
    for (const match of contents.matchAll(pattern)) {
      codeSignals[key].push({ file: relative(file), line: lineNumber(contents, match.index), signal: match[0].slice(0, 120) });
    }
  }
  for (const match of contents.matchAll(/(?:process\.env\.|\b)(NEXT_PUBLIC_[A-Z0-9_]+|PUBLIC_[A-Z0-9_]+|VITE_[A-Z0-9_]+|REACT_APP_[A-Z0-9_]+)/g)) {
    codeSignals.environmentVariables.add(match[1]);
  }
  for (const credential of findCredentialAssignments(contents)) {
    const valueSha256 = sha256(credential.value);
    codeSignals.secrets.push({
      file: relative(file),
      line: lineNumber(contents, credential.index),
      pattern: `hard-coded credential assignment: ${credential.identifier}`,
      valueSha256,
    });
    credentialValues.set(credential.value, valueSha256);
  }
  for (const finding of findBrowserCredentialAuthorization(contents)) {
    codeSignals.browserCredentialAuthorization.push({
      file: relative(file),
      line: lineNumber(contents, finding.index),
      pattern: finding.pattern,
    });
  }
  for (const finding of findForbiddenStringLiterals(contents, forbiddenCredentialValueHashes)) {
    codeSignals.forbiddenCredentialValues.push({
      file: relative(file),
      line: lineNumber(contents, finding.index),
      valueSha256: finding.valueSha256,
    });
  }
  if (/BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|AKIA[0-9A-Z]{16}/.test(contents)) {
    codeSignals.secrets.push({ file: relative(file), pattern: "private key or AWS access key" });
  }
}
for (const file of extendedSecurityFiles) {
  const contents = await readFile(file, "utf8");
  for (const finding of findForbiddenStringLiterals(contents, forbiddenCredentialValueHashes)) {
    codeSignals.forbiddenCredentialValues.push({
      file: relative(file),
      line: lineNumber(contents, finding.index),
      valueSha256: finding.valueSha256,
    });
  }
}
codeSignals.environmentVariables = [...codeSignals.environmentVariables].sort();

const bundleSecretLocations = [];
for (const file of exportFiles.filter((item) => [".html", ".js", ".json", ".txt"].includes(path.extname(item)))) {
  const contents = await readFile(file, "utf8");
  for (const [credential, valueSha256] of credentialValues) {
    if (contents.includes(credential)) {
      bundleSecretLocations.push({ file: path.relative(exportRoot, file), pattern: "source credential value", valueSha256 });
    }
  }
  if (/BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|AKIA[0-9A-Z]{16}/.test(contents)) {
    bundleSecretLocations.push({ file: path.relative(exportRoot, file), pattern: "private key or AWS access key" });
  }
  for (const finding of findForbiddenStringLiterals(contents, forbiddenCredentialValueHashes)) {
    bundleSecretLocations.push({
      file: path.relative(exportRoot, file),
      pattern: "forbidden credential value",
      valueSha256: finding.valueSha256,
    });
  }
}

const unexpectedPublicFiles = exportFiles
  .map((file) => path.relative(exportRoot, file).split(path.sep).join("/"))
  .filter((file) => /(?:^|\/)(?:\.env[^/]*|[^/]*(?:backup|\.bak|\.old|\.orig|\.tmp|\.zip|\.tar|\.gz|\.psd|\.ai|\.fig|\.sketch|\.map))$/i.test(file));

const sourceMaps = exportFiles
  .filter((file) => file.endsWith(".map"))
  .map((file) => path.relative(exportRoot, file));
const publicDebugRoutes = pages.filter((page) => page.route === "/developer/").map((page) => page.route);
const publicDeveloperBundles = exportFiles
  .map((file) => path.relative(exportRoot, file).split(path.sep).join("/"))
  .filter(isPublicDeveloperBundle);
const publicDebugFiles = exportFiles
  .map((file) => path.relative(exportRoot, file).split(path.sep).join("/"))
  .filter((file) => file === "calibrate.html");

const largeFiles = [];
const largeFileHashes = new Map();
for (const file of exportFiles) {
  const info = await stat(file);
  if (info.size < 1_000_000) continue;
  const contents = await readFile(file);
  const hash = sha256(contents);
  const item = { file: path.relative(exportRoot, file), bytes: info.size, sha256: hash };
  if (info.size >= 10_000_000) largeFiles.push(item);
  const group = largeFileHashes.get(hash) || [];
  group.push(item);
  largeFileHashes.set(hash, group);
}
const duplicateLargeAssets = [...largeFileHashes.values()].filter((group) => group.length > 1);

const unsafeSvgFiles = [];
for (const file of exportFiles.filter((item) => item.endsWith(".svg"))) {
  const contents = await readFile(file, "utf8");
  if (/<script\b|\bon\w+\s*=|<foreignObject\b|\b(?:href|src)=["']https?:/i.test(contents)) {
    unsafeSvgFiles.push(path.relative(exportRoot, file));
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  export: {
    fileCount: exportFiles.length,
    htmlCount: htmlFiles.length,
    pages,
    brokenLinks,
    brokenHashes,
    duplicateIds,
    duplicateSchemas,
    exactDuplicateSchemas,
    unsafeLinkSchemes,
    missingHtmlAssetReferences: localAssetReferences,
    missingCssAssetReferences: cssMissingAssets,
    sourceMaps,
    unexpectedPublicFiles,
    publicDebugRoutes,
    publicDeveloperBundles,
    publicDebugFiles,
    largeFiles: largeFiles.sort((a, b) => b.bytes - a.bytes),
    duplicateLargeAssets,
    unsafeSvgFiles,
    bundleSecretLocations,
  },
  integrations: {
    protectedLinks,
    externalDomains: [...externalDomains.entries()].map(([domain, references]) => ({ domain, references })).sort((a, b) => a.domain.localeCompare(b.domain)),
  },
  sourceInventory,
  codeSignals,
};

const releaseBlockers = {
  brokenLinks: brokenLinks.length,
  brokenHashes: brokenHashes.length,
  duplicateIds: duplicateIds.length,
  invalidJsonLd: pages.reduce((total, page) => total + page.jsonLdErrors.length, 0),
  exactDuplicateJsonLd: exactDuplicateSchemas.length,
  duplicateFaqPageJsonLd: duplicateSchemas.filter((item) => item.type === "FAQPage").length,
  missingAssets: localAssetReferences.length + cssMissingAssets.length,
  unsafeLinkSchemes: unsafeLinkSchemes.length,
  sourceSecrets: codeSignals.secrets.length,
  browserCredentialAuthorization: codeSignals.browserCredentialAuthorization.length,
  forbiddenCredentialValues: codeSignals.forbiddenCredentialValues.length,
  bundleSecrets: bundleSecretLocations.length,
  sourceMaps: sourceMaps.length,
  unexpectedPublicFiles: unexpectedPublicFiles.length,
  unsafeSvgFiles: unsafeSvgFiles.length,
  nonProductionMetadata: pages.filter((page) => page.metadataHasNonProductionHost).length,
  publicDebugRoutes: publicDebugRoutes.length,
  publicDeveloperBundles: publicDeveloperBundles.length,
  publicDebugFiles: publicDebugFiles.length,
};

report.releaseGate = {
  pass: Object.values(releaseBlockers).every((count) => count === 0),
  blockers: releaseBlockers,
};

await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  report: relative(reportPath),
  routes: pages.length,
  brokenLinks: brokenLinks.length,
  brokenHashes: brokenHashes.length,
  duplicateIds: duplicateIds.length,
  invalidJsonLd: pages.reduce((total, page) => total + page.jsonLdErrors.length, 0),
  exactDuplicateJsonLd: exactDuplicateSchemas.length,
  duplicateFaqPageJsonLd: duplicateSchemas.filter((item) => item.type === "FAQPage").length,
  missingAssets: localAssetReferences.length + cssMissingAssets.length,
  sourceSecrets: codeSignals.secrets.length,
  browserCredentialAuthorization: codeSignals.browserCredentialAuthorization.length,
  forbiddenCredentialValues: codeSignals.forbiddenCredentialValues.length,
  bundleSecrets: bundleSecretLocations.length,
  sourceMaps: report.export.sourceMaps.length,
  largeFiles: largeFiles.length,
  duplicateLargeAssetGroups: duplicateLargeAssets.length,
  releaseGate: report.releaseGate,
}));

if (strict && !report.releaseGate.pass) process.exitCode = 1;
