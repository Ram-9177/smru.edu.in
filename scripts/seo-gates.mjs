// SEO gate assertions over the static export (uses the crawl harness records).
//
//   node scripts/seo-gates.mjs [label] [--out <dir>] [--strict] [--report <path>]
//
// Prints metrics, failures and warnings; --strict sets a non-zero exit code on any failure.
// Not part of the mandatory verification chain until the Phase 2 gate makes it pass.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { crawlRecords } from "./crawl-export.mjs";
import { computeGates, GATE_THRESHOLDS } from "./crawl-helpers.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const label = args.find((argument, index) => !argument.startsWith("--") && !["--out", "--report"].includes(args[index - 1])) || "current";
const readOption = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? path.resolve(args[index + 1]) : undefined;
};
const outDir = readOption("--out") ?? path.join(root, "out");
const reportPath = readOption("--report") ?? path.join(root, "output", "seo-gates", label, "seo-gates.json");

const { records, summary } = crawlRecords({ outDir });
const { metrics, failures, warnings } = computeGates(records, GATE_THRESHOLDS);

const report = {
  generatedAt: new Date().toISOString(),
  outDir: path.relative(root, outDir) || ".",
  summary,
  metrics,
  failures,
  warnings,
  pass: failures.length === 0,
};

await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(
  JSON.stringify({
    report: path.relative(root, reportPath),
    metrics,
    failures: failures.map(({ gate, count, pages }) => (pages ? { gate, count, pages } : { gate, count })),
    warnings: warnings.map(({ gate, count }) => ({ gate, count })),
    pass: report.pass,
  })
);

if (strict && !report.pass) process.exitCode = 1;
