// Regression crawl harness for the static export.
// Walks out/**/*.html, extracts SEO signals per page, cross-checks out/sitemap.xml
// (one synthetic 404 row per <loc> without a built file) and writes a CSV.
//
//   node scripts/crawl-export.mjs [targetCsv] [--out <dir>] [--sitemap <file>]
//
// Defaults: targetCsv docs/seo/baseline-2026-09.csv, --out ./out, --sitemap <out>/sitemap.xml.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  analyzeHtml,
  crossCheckSitemap,
  parseSitemapLocs,
  urlPathFromRelativeFile,
} from "./crawl-helpers.mjs";

const rootDir = process.cwd();
const SITE_ORIGIN = "https://smru.edu.in";

export const CSV_COLUMNS = [
  "URL",
  "Path",
  "Status",
  "In Sitemap",
  "Title",
  "Title Length",
  "Description",
  "Description Length",
  "Canonical",
  "Robots",
  "Lang",
  "Hreflang",
  "H1",
  "H1 Count",
  "Keywords Meta",
  "Body Word Count",
  "Main Word Count",
  "Brand No-Space Count",
  "JSON-LD Root Types",
  "JSON-LD Types",
  "JSON-LD Blocks",
  "JSON-LD Errors",
  "File",
];

function walkHtml(directory, files = []) {
  if (!existsSync(directory)) return files;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walkHtml(fullPath, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

// Follows child sitemaps when sitemap.xml is an index (Phase 2 converts to one).
function readSitemapUrls(sitemapPath, outDir, seen = new Set()) {
  if (!sitemapPath || !existsSync(sitemapPath) || seen.has(sitemapPath)) return [];
  seen.add(sitemapPath);
  const { urls, children } = parseSitemapLocs(readFileSync(sitemapPath, "utf8"));
  const childUrls = children.flatMap((child) => {
    let pathname;
    try {
      pathname = new URL(child).pathname;
    } catch {
      return [];
    }
    return readSitemapUrls(path.join(outDir, pathname.replace(/^\/+/, "")), outDir, seen);
  });
  return [...urls, ...childUrls];
}

export function crawlRecords({ outDir = path.join(rootDir, "out"), sitemapPath } = {}) {
  const resolvedOut = path.resolve(outDir);
  const resolvedSitemap = sitemapPath ? path.resolve(sitemapPath) : path.join(resolvedOut, "sitemap.xml");
  const htmlFiles = walkHtml(resolvedOut);
  const relativeFiles = new Set(htmlFiles.map((file) => path.relative(resolvedOut, file).split(path.sep).join("/")));

  const sitemapUrls = readSitemapUrls(resolvedSitemap, resolvedOut);
  const { present, missing } = crossCheckSitemap(sitemapUrls, (file) => relativeFiles.has(file));
  const sitemapPaths = new Set(
    [...present].map((loc) => {
      try {
        return new URL(loc).pathname;
      } catch {
        return loc;
      }
    })
  );

  const records = htmlFiles.map((file) => {
    const relPath = path.relative(resolvedOut, file).split(path.sep).join("/");
    const urlPath = urlPathFromRelativeFile(relPath);
    const analysis = analyzeHtml(readFileSync(file, "utf8"));
    return {
      url: `${SITE_ORIGIN}${urlPath}`,
      path: urlPath,
      status: relPath === "404.html" ? 404 : 200,
      inSitemap: sitemapPaths.has(urlPath),
      ...analysis,
      file: relPath,
    };
  });

  for (const loc of missing) {
    let urlPath = loc;
    try {
      urlPath = new URL(loc).pathname;
    } catch {
      // keep the raw loc as the path
    }
    records.push({
      url: loc,
      path: urlPath,
      status: 404,
      inSitemap: true,
      title: "",
      titleLength: 0,
      description: "",
      descriptionLength: 0,
      canonical: "",
      robots: "",
      lang: "",
      hreflang: [],
      h1: "",
      h1Count: 0,
      keywordsMeta: false,
      bodyWordCount: 0,
      mainWordCount: null,
      brandNoSpaceCount: 0,
      jsonLdTypes: [],
      jsonLdRootTypes: [],
      jsonLdBlocks: 0,
      jsonLdErrors: 0,
      file: "",
    });
  }

  records.sort((a, b) => a.path.localeCompare(b.path));
  return { records, summary: { html: htmlFiles.length, sitemapUrls: sitemapUrls.length, sitemapMissing: missing.length, rows: records.length } };
}

const csvField = (value) => {
  if (value === null || value === undefined) return '""';
  return `"${String(value).replace(/"/g, '""')}"`;
};

export function recordToRow(record) {
  return [
    record.url,
    record.path,
    record.status,
    record.inSitemap ? "yes" : "no",
    record.title,
    record.titleLength,
    record.description,
    record.descriptionLength,
    record.canonical,
    record.robots,
    record.lang,
    record.hreflang.join("; "),
    record.h1,
    record.h1Count,
    record.keywordsMeta ? "yes" : "no",
    record.bodyWordCount,
    record.mainWordCount === null ? "" : record.mainWordCount,
    record.brandNoSpaceCount,
    record.jsonLdRootTypes.join("; "),
    record.jsonLdTypes.join("; "),
    record.jsonLdBlocks,
    record.jsonLdErrors,
    record.file,
  ]
    .map(csvField)
    .join(",");
}

export function crawlExport(targetCsvPath = path.join(rootDir, "docs/seo/baseline-2026-09.csv"), options = {}) {
  const { records, summary } = crawlRecords(options);
  mkdirSync(path.dirname(targetCsvPath), { recursive: true });
  writeFileSync(targetCsvPath, [CSV_COLUMNS.join(","), ...records.map(recordToRow)].join("\n"), "utf8");
  console.log(JSON.stringify({ ...summary, csv: path.relative(rootDir, targetCsvPath) }));
  return records;
}

function parseArgs(argv) {
  const options = {};
  let targetCsv;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--out") options.outDir = path.resolve(argv[++index]);
    else if (argument === "--sitemap") options.sitemapPath = path.resolve(argv[++index]);
    else if (!argument.startsWith("--")) targetCsv = path.resolve(argument);
  }
  return { targetCsv, options };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { targetCsv, options } = parseArgs(process.argv.slice(2));
  crawlExport(targetCsv, options);
}
