import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");

function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function escapeCsvField(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

function stripHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetadata(filePath, content) {
  const relPath = path.relative(outDir, filePath).replace(/\\/g, "/");
  let urlPath = "/" + relPath.replace(/\.html$/, "");
  if (urlPath.endsWith("/index")) {
    urlPath = urlPath.slice(0, -6) + "/";
  } else if (urlPath === "/index") {
    urlPath = "/";
  } else if (!urlPath.endsWith("/")) {
    urlPath = urlPath + "/";
  }

  const is404 = relPath === "404.html";
  const status = is404 ? 404 : 200;

  // Title
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? stripHtml(titleMatch[1]) : "";

  // Description
  const descMatch =
    content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) ||
    content.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : "";

  // Canonical
  const canonMatch =
    content.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i) ||
    content.match(/<link\s+href=["']([\s\S]*?)["']\s+rel=["']canonical["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : "";

  // Robots
  const robotsMatch =
    content.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i) ||
    content.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']robots["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : "";

  // H1
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? stripHtml(h1Match[1]) : "";

  // Word count (body or main text)
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const textContent = stripHtml(bodyMatch ? bodyMatch[1] : content);
  const words = textContent.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // JSON-LD types
  const jsonLdTypes = new Set();
  const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      const addTypes = (item) => {
        if (!item || typeof item !== "object") return;
        if (item["@type"]) {
          if (Array.isArray(item["@type"])) {
            item["@type"].forEach((t) => jsonLdTypes.add(t));
          } else {
            jsonLdTypes.add(item["@type"]);
          }
        }
        if (Array.isArray(item["@graph"])) {
          item["@graph"].forEach(addTypes);
        }
        if (Array.isArray(item.itemListElement)) {
          item.itemListElement.forEach(addTypes);
        }
        if (item.mainEntity) {
          if (Array.isArray(item.mainEntity)) item.mainEntity.forEach(addTypes);
          else addTypes(item.mainEntity);
        }
      };
      if (Array.isArray(parsed)) {
        parsed.forEach(addTypes);
      } else {
        addTypes(parsed);
      }
    } catch {
      // ignore invalid json ld for now
    }
  }

  const jsonLdTypesStr = Array.from(jsonLdTypes).sort().join("; ");

  return {
    filePath: relPath,
    url: `https://smru.edu.in${urlPath}`,
    path: urlPath,
    status,
    title,
    description,
    canonical,
    robots,
    h1,
    wordCount,
    jsonLdTypes: jsonLdTypesStr,
  };
}

export function crawlExport(targetCsvPath = path.join(rootDir, "docs/seo/baseline-2026-09.csv")) {
  console.log(`Scanning out/ directory: ${outDir}`);
  const htmlFiles = getHtmlFiles(outDir);
  console.log(`Found ${htmlFiles.length} HTML files.`);

  const records = [];
  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, "utf8");
    const record = extractMetadata(file, content);
    records.push(record);
  }

  // Sort by URL path
  records.sort((a, b) => a.path.localeCompare(b.path));

  const headers = [
    "URL",
    "Path",
    "Status",
    "Title",
    "Description",
    "Canonical",
    "Robots",
    "H1",
    "Word Count",
    "JSON-LD Types",
    "File",
  ];

  const csvRows = [
    headers.join(","),
    ...records.map((r) =>
      [
        escapeCsvField(r.url),
        escapeCsvField(r.path),
        escapeCsvField(r.status),
        escapeCsvField(r.title),
        escapeCsvField(r.description),
        escapeCsvField(r.canonical),
        escapeCsvField(r.robots),
        escapeCsvField(r.h1),
        escapeCsvField(r.wordCount),
        escapeCsvField(r.jsonLdTypes),
        escapeCsvField(r.filePath),
      ].join(",")
    ),
  ];

  const outputDir = path.dirname(targetCsvPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(targetCsvPath, csvRows.join("\n"), "utf8");
  console.log(`Exported ${records.length} records to ${targetCsvPath}`);
  return records;
}

// CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetCsv = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : undefined;
  crawlExport(targetCsv);
}
