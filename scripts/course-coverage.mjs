// Phase 4 "definition of done": audit every programme page against the standard.
// Reads the built out/ HTML + the flattened catalogue and writes docs/seo/course-coverage.csv.
//
//   npm run build && node scripts/course-coverage.mjs
//
// Each row is complete or carries a @@NEEDS_UNIVERSITY_INPUT@@ reason for the missing field.

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeHtml, visibleText, decodeEntities } from "./crawl-helpers.mjs";

const root = process.cwd();
const outDir = path.join(root, "out");

// Load the catalogue by transpiling the TS module graph is heavy; instead re-derive the
// programme list from the built sitemap-programmes.xml (authoritative list of live pages).
function programmePathsFromSitemap() {
  const file = path.join(outDir, "sitemap-programmes.xml");
  if (!existsSync(file)) return [];
  return [...readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname.replace(/\/$/, ""))
    .filter((p) => p.split("/").length === 5);
}

// First substantive paragraph (>= 12 words) inside <main> — the answer-first passage,
// skipping short eyebrow/label paragraphs.
const answerParagraph = (html) => {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const scope = main ? main[1] : html;
  for (const m of scope.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = visibleText(m[1]);
    if (text.split(/\s+/).filter(Boolean).length >= 12) return text;
  }
  return "";
};

const jsonLdRaw = (html) =>
  [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

const has = (v) => (v ? "yes" : "NEEDS_INPUT");

const rows = [];
for (const pathname of programmePathsFromSitemap()) {
  const file = path.join(outDir, pathname.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) {
    rows.push({ path: pathname, hasPage: "no" });
    continue;
  }
  const html = readFileSync(file, "utf8");
  const a = analyzeHtml(html);
  const ld = jsonLdRaw(html);
  const course = ld.find((n) => n["@type"] === "Course");
  const body = decodeEntities(visibleText(html));
  const answerFirst = answerParagraph(html);
  const answerWords = answerFirst ? answerFirst.split(/\s+/).length : 0;
  rows.push({
    path: pathname,
    name: a.h1 || a.title,
    hasPage: "yes",
    titleLen: a.titleLength,
    titleOk: a.titleLength > 0 && a.titleLength <= 65 ? "yes" : "NO",
    answerFirst: answerWords >= 40 ? "yes" : `weak(${answerWords}w)`,
    fee: course?.offers ? "yes" : "NEEDS_INPUT",
    eligibility: has(course?.coursePrerequisites),
    duration: has(course?.timeRequired || /duration/i.test(body)),
    approvals: /UGC|RCI|INC|NCAHP|BCI|PCI|approv|recognis|recognized/i.test(body) ? "mentioned" : "NEEDS_INPUT",
    curriculum: /curriculum|syllabus|semester|subjects|what students study/i.test(body) ? "yes" : "NEEDS_INPUT",
    faqs: a.jsonLdTypes.includes("FAQPage") ? "yes" : "NEEDS_INPUT",
    courseSchema: a.jsonLdTypes.includes("Course") ? "yes" : "NO",
    courseInstance: a.jsonLdTypes.includes("CourseInstance") ? "yes" : "NO",
    offer: a.jsonLdTypes.includes("Offer") ? "yes" : "NEEDS_INPUT",
    image: /<img\b/i.test(html) ? "yes" : "NEEDS_INPUT",
    words: a.mainWordCount ?? a.bodyWordCount,
  });
}

const columns = [
  "Path", "Name", "Has Page", "Title Len", "Title <=65", "Answer-First >=40w",
  "Fee (Offer)", "Eligibility", "Duration", "Approvals", "Curriculum", "FAQs",
  "Course schema", "CourseInstance", "Offer", "Image", "Main Words",
];
const field = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const csv = [
  columns.join(","),
  ...rows.map((r) =>
    [r.path, r.name, r.hasPage, r.titleLen, r.titleOk, r.answerFirst, r.fee, r.eligibility, r.duration, r.approvals, r.curriculum, r.faqs, r.courseSchema, r.courseInstance, r.offer, r.image, r.words]
      .map(field)
      .join(","),
  ),
].join("\n");

const target = path.join(root, "docs/seo/course-coverage.csv");
mkdirSync(path.dirname(target), { recursive: true });
writeFileSync(target, csv, "utf8");

const complete = rows.filter((r) => r.hasPage === "yes" && r.courseSchema === "yes" && r.courseInstance === "yes" && r.titleOk === "yes").length;
const feeGaps = rows.filter((r) => r.fee === "NEEDS_INPUT").length;
console.log(JSON.stringify({ programmes: rows.length, withCourseInstance: rows.filter((r) => r.courseInstance === "yes").length, structurallyComplete: complete, feeGaps, csv: path.relative(root, target) }));

if (process.argv[1] && path.resolve(process.argv[1]) !== fileURLToPath(import.meta.url)) {
  // imported — no-op
}
