// Regenerates the programme catalogue block inside public/llms-full.txt from the built
// sitemap-programmes.xml, so an LLM crawler learns the full course list in one fetch.
//
//   npm run build && node scripts/generate-llms.mjs   (or: npm run seo:llms)
//
// Only the text between <!-- programmes:start --> and <!-- programmes:end --> is replaced.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const START = "<!-- programmes:start -->";
const END = "<!-- programmes:end -->";
const BASE = "https://smru.edu.in";

// The built programme pages are the source of truth. Read each page's title + Course facts.
function programmeEntries() {
  const sitemap = path.join(outDir, "sitemap-programmes.xml");
  if (!existsSync(sitemap)) throw new Error("run npm run build first: out/sitemap-programmes.xml missing");
  const locs = [...readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const rows = [];
  for (const loc of locs) {
    const pathname = new URL(loc).pathname;
    const file = path.join(outDir, pathname.replace(/^\//, ""), "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    let name = "";
    const course = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((m) => {
        try {
          return JSON.parse(m[1]);
        } catch {
          return null;
        }
      })
      .find((n) => n && n["@type"] === "Course");
    name = course?.name || "";
    const level = course?.educationalCredentialAwarded || "";
    const duration = course?.timeRequired ? isoToHuman(course.timeRequired) : "";
    const fee = course?.offers ? "fee published" : "fee at counselling";
    const facts = [level, duration, fee].filter(Boolean).join(" · ");
    rows.push(`- ${name}: ${BASE}${pathname}${facts ? ` (${facts})` : ""}`);
  }
  return rows;
}

const isoToHuman = (iso) => {
  const y = iso.match(/P(\d+)Y/);
  if (y) return `${y[1]} year${y[1] === "1" ? "" : "s"}`;
  const m = iso.match(/P(\d+)M/);
  if (m) return `${m[1]} months`;
  return "";
};

const target = path.join(root, "public/llms-full.txt");
let text = readFileSync(target, "utf8");
const rows = programmeEntries();
const block = `${START}\n${rows.join("\n")}\n${END}`;

if (text.includes(START) && text.includes(END)) {
  text = text.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
} else {
  // Insert a new "## Programme Catalogue" section before "## Source Priority".
  const heading = `## Programme Catalogue (all live courses)\n\nEach programme links to its canonical page. Fees are confirmed at official admissions counselling unless a page states otherwise.\n\n${block}\n\n`;
  if (text.includes("## Source Priority")) text = text.replace("## Source Priority", `${heading}## Source Priority`);
  else text += `\n${heading}`;
}

writeFileSync(target, text, "utf8");
console.log(JSON.stringify({ programmes: rows.length, file: "public/llms-full.txt" }));
