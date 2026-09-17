import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const exportRoot = path.join(projectRoot, "out");
const localOrigin = "https://frontend-audit.local";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    })
  );
  return files.flat();
}

function sourceUrl(filePath) {
  const relative = path.relative(exportRoot, filePath).split(path.sep).join("/");
  if (relative === "index.html") return `${localOrigin}/`;
  return `${localOrigin}/${relative.replace(/index\.html$/, "")}`;
}

function hrefsFromHtml(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi)].map(
    (match) => match[1] ?? match[2]
  );
}

function targetCandidates(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.replace(/^\/+/, "");
  if (!relative) return [path.join(exportRoot, "index.html")];
  if (decoded.endsWith("/")) return [path.join(exportRoot, relative, "index.html")];
  if (path.extname(relative)) return [path.join(exportRoot, relative)];
  return [
    path.join(exportRoot, relative),
    path.join(exportRoot, relative, "index.html"),
    path.join(exportRoot, `${relative}.html`),
  ];
}

const exportFiles = await walk(exportRoot);
const exactExportPaths = new Set(
  exportFiles.map((file) => path.relative(exportRoot, file).split(path.sep).join("/"))
);
const htmlFiles = exportFiles.filter((file) => file.endsWith(".html"));
const checked = new Set();
const broken = [];

for (const filePath of htmlFiles) {
  const html = await readFile(filePath, "utf8");
  const base = sourceUrl(filePath);
  for (const href of hrefsFromHtml(html)) {
    if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    let target;
    try {
      target = new URL(href, base);
    } catch {
      broken.push({ source: path.relative(exportRoot, filePath), href, reason: "invalid URL" });
      continue;
    }
    if (target.origin !== localOrigin) continue;
    const key = target.pathname;
    if (checked.has(key)) continue;
    checked.add(key);
    const candidates = targetCandidates(target.pathname);
    let targetExists = false;
    for (const candidate of candidates) {
      const exactPath = path.relative(exportRoot, candidate).split(path.sep).join("/");
      if (exactExportPaths.has(exactPath)) {
        targetExists = true;
        break;
      }
    }
    if (!targetExists) {
      broken.push({ source: path.relative(exportRoot, filePath), href, pathname: target.pathname });
    }
  }
}

if (broken.length) {
  console.error(JSON.stringify({ checked: checked.size, broken: broken.length, links: broken }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ checked: checked.size, broken: 0 }));
