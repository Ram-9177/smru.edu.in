// Fact consistency: the canonical facts must be byte-identical everywhere an engine reads them.
// A drifting bridge sentence or establishment date across pages teaches answer engines a
// contradiction. Runs over built HTML (out/) + the source-of-truth files.
//
//   npm run build && node scripts/check-facts-consistency.mjs [--strict]   (npm run seo:facts)
//
// --strict sets a non-zero exit code on any mismatch.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { decodeEntities, visibleText } from "./crawl-helpers.mjs";

const root = process.cwd();
const outDir = path.join(root, "out");
const strict = process.argv.includes("--strict");

// The single source of truth (mirror of SITE_IDENTITY / UNIVERSITY_INFO).
const FACTS = {
  bridgeSentence:
    "St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.",
  legalName: "St. Mary's Rehabilitation University",
  sponsor: "Joseph Sriharsha & Mary Indraja Educational Society",
  ordinance: "Ordinance No. 2 of 2025",
  act: "Act No. 10 of 2026",
  ugc: "Section 2(f)",
  postalCode: "508284",
  email: "reach@smru.edu.in",
  website: "https://smru.edu.in",
  schools: [
    "Rehabilitation Sciences",
    "Health & Allied Health Sciences",
    "Psychology",
    "Nursing",
    "Engineering & Emerging Technologies",
    "Law",
  ],
};

const read = (rel) => (existsSync(path.join(root, rel)) ? readFileSync(path.join(root, rel), "utf8") : null);
const pageText = (rel) => {
  const file = path.join(outDir, rel);
  return existsSync(file) ? decodeEntities(readFileSync(file, "utf8")) : null;
};

// Sources that MUST carry the bridge sentence verbatim.
const BRIDGE_SOURCES = [
  { name: "site.ts (SITE_IDENTITY)", text: read("src/lib/seo/site.ts") },
  { name: "llms.txt", text: read("public/llms.txt") },
  { name: "llms-full.txt", text: read("public/llms-full.txt") },
  { name: "/smru/ (built)", text: pageText("smru/index.html") },
  { name: "homepage Organization JSON-LD", text: pageText("index.html") },
];
// International page ships in Phase 6; include it when it exists.
if (existsSync(path.join(outDir, "international/index.html"))) {
  BRIDGE_SOURCES.push({ name: "/international/ (built)", text: pageText("international/index.html") });
}

const failures = [];
const checks = [];

// 1. Bridge sentence identical everywhere it must appear.
for (const source of BRIDGE_SOURCES) {
  if (source.text === null) {
    checks.push({ check: `bridge:${source.name}`, ok: false, note: "source missing" });
    failures.push(`bridge sentence source missing: ${source.name}`);
    continue;
  }
  const normalized = source.text.replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&amp;/g, "&");
  const ok = normalized.includes(FACTS.bridgeSentence);
  checks.push({ check: `bridge:${source.name}`, ok });
  if (!ok) failures.push(`bridge sentence missing/altered in ${source.name}`);
}

// 2. Core facts present in the key built pages.
const CORE_PAGES = ["index.html", "about/index.html", "smru/index.html"];
const CORE_FACTS = [FACTS.legalName, FACTS.ordinance, FACTS.act, FACTS.ugc];
for (const rel of CORE_PAGES) {
  const text = pageText(rel);
  if (text === null) continue; // page may be absent in a partial build
  const normalized = text.replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&amp;/g, "&");
  for (const fact of CORE_FACTS) {
    const ok = normalized.includes(fact);
    checks.push({ check: `fact:${rel}:${fact.slice(0, 24)}`, ok });
    if (!ok) failures.push(`"${fact}" not found on /${rel.replace("index.html", "")}`);
  }
}

// 3. Sponsor society + email + postal code consistent in llms + built /smru/ + Organization JSON-LD.
for (const [label, value] of [["sponsor", FACTS.sponsor], ["email", FACTS.email], ["postalCode", FACTS.postalCode]]) {
  for (const source of [
    { name: "llms.txt", text: read("public/llms.txt") },
    { name: "llms-full.txt", text: read("public/llms-full.txt") },
    { name: "/smru/", text: pageText("smru/index.html") },
  ]) {
    if (source.text === null) continue;
    const normalized = source.text.replace(/&amp;/g, "&");
    const ok = normalized.includes(value);
    checks.push({ check: `${label}:${source.name}`, ok });
    if (!ok) failures.push(`${label} "${value}" missing in ${source.name}`);
  }
}

// 4. All six schools named on /schools/ and in llms files.
for (const source of [
  { name: "llms.txt", text: read("public/llms.txt") },
  { name: "/schools/", text: pageText("schools/index.html") },
]) {
  if (source.text === null) continue;
  const missing = FACTS.schools.filter((school) => !source.text.includes(school));
  const ok = missing.length === 0;
  checks.push({ check: `schools:${source.name}`, ok, note: missing.join(", ") });
  if (!ok) failures.push(`schools missing in ${source.name}: ${missing.join(", ")}`);
}

const report = { checks: checks.length, passed: checks.filter((c) => c.ok).length, failures };
console.log(JSON.stringify(report, null, failures.length ? 2 : 0));
if (strict && failures.length) process.exitCode = 1;
