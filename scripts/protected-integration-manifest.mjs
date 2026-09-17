import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportRoot = path.join(root, "out");
const label = process.argv[2] || "current";
const outputPath = path.join(root, "output", "frontend-audit", label, "protected-integrations.json");
const protectedDomains = new Set([
  "admissions.velocescampus.com",
  "aifset.com",
  "apply.smru.edu.in",
  "qtst.ai",
  "smrunextgenstageprod.ctpl.io",
  "widgets.in4.nopaperforms.com",
]);
const integrationPurpose = {
  "admissions.velocescampus.com": "Veloces admissions destination",
  "aifset.com": "AIFSET partner destination",
  "apply.smru.edu.in": "Admissions and PhD CRM",
  "qtst.ai": "Quality Thought partner destination",
  "smrunextgenstageprod.ctpl.io": "NextGen partner destination",
  "widgets.in4.nopaperforms.com": "Meritto form widget",
};
const protectedScriptUrls = [
  "https://apply.smru.edu.in/js/ctplform.js",
  "https://widgets.in4.nopaperforms.com/emwgts.js",
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  }));
  return nested.flat();
}

function attrs(tag) {
  const values = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    values[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
  }
  return values;
}

function routeFromFile(file) {
  const name = path.relative(exportRoot, file).split(path.sep).join("/");
  if (name === "index.html") return "/";
  if (name.endsWith("/index.html")) return `/${name.slice(0, -"index.html".length)}`;
  return `/${name}`;
}

async function requestOnce(url, method) {
  return fetch(url, {
    method,
    redirect: "manual",
    headers: { "user-agent": "SMRU-Frontend-Read-Only-Audit/1.1" },
    signal: AbortSignal.timeout(15_000),
  });
}

async function redirectChain(startUrl) {
  const chain = [];
  let current = new URL(startUrl);
  current.hash = "";
  let method = protectedScriptUrls.includes(startUrl) ? "GET" : "HEAD";

  for (let hop = 0; hop < 8; hop += 1) {
    let response;
    try {
      response = await requestOnce(current, method);
      if (method === "HEAD" && (response.status >= 400 || response.status === 0)) {
        method = "GET";
        response = await requestOnce(current, method);
      }
    } catch (error) {
      chain.push({ url: current.href, method, error: error instanceof Error ? error.message : String(error) });
      break;
    }
    const location = response.headers.get("location");
    chain.push({ url: current.href, method, status: response.status, location });
    if (!location || response.status < 300 || response.status >= 400) break;
    current = new URL(location, current);
  }
  return chain;
}

const htmlFiles = (await walk(exportRoot)).filter((file) => file.endsWith(".html"));
const linkInstances = [];
const exactUrls = new Set(protectedScriptUrls);

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = routeFromFile(file);
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const attributes = attrs(match[0]);
    if (!attributes.href) continue;
    let url;
    try {
      url = new URL(attributes.href, "https://smru.edu.in");
    } catch {
      continue;
    }
    if (!protectedDomains.has(url.hostname)) continue;
    exactUrls.add(url.href);
    linkInstances.push({
      sourceRoute: route,
      sourceElement: "a",
      exactStartingUrl: url.href,
      target: attributes.target || "_self",
      rel: attributes.rel || "",
      sameTab: (attributes.target || "_self") !== "_blank",
    });
  }
}

const sourceExtensions = new Set([".html", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const sourceFiles = (await Promise.all(["app", "src", "public"].map((dir) => walk(path.join(root, dir))))).flat();
const sourceReferences = [];
for (const file of sourceFiles.filter((item) => sourceExtensions.has(path.extname(item)))) {
  const contents = await readFile(file, "utf8");
  const domains = [...protectedDomains].filter((domain) => contents.includes(domain));
  if (!domains.length && !/ctplform|nopaperforms|meritto/i.test(contents)) continue;
  sourceReferences.push({
    file: path.relative(root, file).split(path.sep).join("/"),
    domains,
    sha256: createHash("sha256").update(contents).digest("hex"),
  });
}

const chains = [];
for (const url of [...exactUrls].sort()) {
  chains.push({ startingUrl: url, chain: await redirectChain(url) });
}

const integrations = [...protectedDomains].sort().map((domain, index) => {
  const links = linkInstances.filter((item) => new URL(item.exactStartingUrl).hostname === domain);
  const urls = [...new Set(links.map((item) => item.exactStartingUrl))].sort();
  return {
    integrationId: `PI-${String(index + 1).padStart(3, "0")}`,
    businessPurpose: integrationPurpose[domain],
    vendorOwner: "University/vendor owner confirmation required",
    domain,
    integrationType: domain === "widgets.in4.nopaperforms.com" ? "Script widget" : "Direct link or redirect",
    exactStartingUrls: urls,
    sourceRoutes: [...new Set(links.map((item) => item.sourceRoute))].sort(),
    targetBehaviors: [...new Set(links.map((item) => item.target))].sort(),
    browserHistoryTreatment: "Read-only source behavior recorded; no navigation mutation performed",
    protectedSourceFiles: sourceReferences.filter((item) => item.domains.includes(domain)).map((item) => item.file),
    auditTreatment: "PROTECTED EXTERNAL INTEGRATION — READ ONLY / REPORT ONLY",
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  mutationPolicy: "No forms submitted; only HEAD/GET availability and redirect observation performed",
  integrations,
  linkInstances,
  sourceReferences: sourceReferences.sort((a, b) => a.file.localeCompare(b.file)),
  redirectChains: chains,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  report: path.relative(root, outputPath),
  integrations: integrations.length,
  exactUrls: exactUrls.size,
  linkInstances: linkInstances.length,
  protectedSourceFiles: sourceReferences.length,
  checksWithErrors: chains.filter((item) => item.chain.some((hop) => hop.error)).length,
}));
