// Redirect register: regenerate the "route shell" rows of REDIRECT_MAP.csv from the built export,
// and check that the register agrees with what is actually served.
//
//   npm run build && node scripts/redirect-map.mjs            # rewrite the shell rows in place
//   npm run build && node scripts/redirect-map.mjs --check    # exit 1 if the CSV is stale (CI/pre-push)
//
// Two kinds of rows live in REDIRECT_MAP.csv:
//   - Apache rules (Implementation "public/.htaccess"): hand-maintained, mirrored from RewriteRule lines.
//     This script verifies each one still exists in public/.htaccess but never edits them.
//   - Route shells (Implementation "route shell"): every exported page whose <head> carries a
//     <meta http-equiv="refresh" content="0;url=…">, i.e. an app/**/page.tsx that renders
//     <RedirectFallback>. These rows are derived from out/ so the register cannot drift from the site.
//
// The Source of a shell row is the served path (e.g. /carrer/), the Target is the refresh URL, and
// Notes records whether Apache also 301s that path (server) or only the shell serves it (client only).
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const outDir = path.join(root, "out");
const csvPath = path.join(root, "REDIRECT_MAP.csv");
const htaccessPath = path.join(root, "public", ".htaccess");
const check = process.argv.includes("--check");

const HEADER = '"Source","Target","Type","Implementation","Status","Notes"';
const SHELL_IMPL = "route shell";
const csvField = (value) => `"${String(value).replace(/"/g, '""')}"`;

// Minimal RFC-4180 line parser (fields are always quoted in this file).
const parseRow = (line) => {
  const fields = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { fields.push(field); field = ""; }
    else field += ch;
  }
  fields.push(field);
  return fields;
};

const walkHtml = (dir, acc = []) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) { if (name !== "_next") walkHtml(full, acc); }
    else if (name.endsWith(".html")) acc.push(full);
  }
  return acc;
};

const servedPath = (file) => {
  const rel = path.relative(outDir, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
};

export function collectShellRows() {
  if (!existsSync(outDir)) throw new Error("out/ is missing — run `npm run build` first");
  const htaccess = readFileSync(htaccessPath, "utf8");
  // The HTTPS/canonical-host rule (^(.*)$ → https://smru.edu.in/$1) matches every path and is not a
  // redirect of the path itself, so it is excluded from coverage.
  const rules = [...htaccess.matchAll(/^\s*RewriteRule\s+(\S+)\s+(\S+)/gm)]
    .map((m) => ({ pattern: m[1], target: m[2] }))
    .filter((rule) => !/\$1\/?$/.test(rule.target) || !/^\^\(\.\*\)\$/.test(rule.pattern));
  const apacheCovers = (served) => {
    const bare = served.replace(/^\//, "").replace(/\/$/, "");
    return rules.some((rule) => {
      try { return new RegExp(rule.pattern, "i").test(bare); } catch { return false; }
    });
  };
  const rows = [];
  for (const file of walkHtml(outDir)) {
    const html = readFileSync(file, "utf8");
    const refresh = html.match(/<meta http-equiv="refresh" content="0;url=([^"]+)"/i);
    if (!refresh) continue;
    const source = servedPath(file);
    rows.push([
      source,
      refresh[1],
      "meta refresh + location.replace",
      SHELL_IMPL,
      "active",
      apacheCovers(source) ? "server 301 in public/.htaccess also covers this path" : "client only — no Apache rule for this path",
    ]);
  }
  rows.sort((a, b) => a[0].localeCompare(b[0]));
  return rows;
}

export function verifyApacheRows(lines) {
  // Rows record one source path per line ("seo/foo/?$"); .htaccess groups sources into alternation
  // rules ("^(seo/foo|seo/bar)/?$"). A row is covered when its source, read as a concrete path,
  // matches some RewriteRule pattern, or when the row is itself a verbatim rule pattern.
  const htaccess = readFileSync(htaccessPath, "utf8");
  const patterns = [...htaccess.matchAll(/^\s*RewriteRule\s+(\S+)\s+(\S+)/gm)]
    .filter((m) => !/^\^\(\.\*\)\$/.test(m[1]))
    .map((m) => m[1]);
  const missing = [];
  for (const line of lines) {
    const [source, , , impl] = parseRow(line);
    if (impl !== "public/.htaccess") continue;
    if (htaccess.includes(source)) continue;
    const concrete = source.replace(/\/\?\$/, "").replace(/\\-/g, "-");
    const covered = /[()|*+\\]/.test(concrete)
      ? false
      : patterns.some((p) => { try { return new RegExp(p, "i").test(concrete); } catch { return false; } });
    if (!covered) missing.push(source);
  }
  return missing;
}

// Every RewriteRule (other than the canonical-host rule) must be recorded by at least one Apache row.
export function verifyRulesHaveRows(lines) {
  const htaccess = readFileSync(htaccessPath, "utf8");
  const rules = [...htaccess.matchAll(/^\s*RewriteRule\s+(\S+)\s+(\S+)/gm)]
    .map((m) => m[1])
    .filter((p) => !/^\^\(\.\*\)\$/.test(p));
  const sources = lines.map((line) => parseRow(line)).filter((r) => r[3] === "public/.htaccess").map((r) => r[0]);
  return rules.filter((pattern) => {
    const bare = pattern.replace(/^\^/, "");
    if (sources.some((s) => s === bare || htaccess.includes(s) && pattern.includes(s))) return false;
    let re; try { re = new RegExp(pattern, "i"); } catch { return false; }
    return !sources.some((s) => re.test(s.replace(/\/\?\$/, "").replace(/\\-/g, "-")));
  });
}

export function main() {
  const existing = readFileSync(csvPath, "utf8").split(/\r?\n/).filter(Boolean);
  if (existing[0] !== HEADER) throw new Error(`unexpected header in REDIRECT_MAP.csv: ${existing[0]}`);
  const apacheRows = existing.slice(1).filter((line) => parseRow(line)[3] !== SHELL_IMPL && !parseRow(line)[3].startsWith("app/") && !parseRow(line)[3].startsWith("src/"));
  const shellRows = collectShellRows().map((row) => row.map(csvField).join(","));
  const next = [HEADER, ...apacheRows, ...shellRows].join("\n") + "\n";
  const missing = verifyApacheRows(apacheRows);
  const shellObjects = collectShellRows();
  const clientOnly = shellObjects.filter((row) => row[5].startsWith("client only")).map((row) => row[0]);
  const homepageTargets = shellObjects.filter((row) => /^(\/|https:\/\/smru\.edu\.in\/?)$/.test(row[1])).map((row) => row[0]);
  const ruleWithoutRow = verifyRulesHaveRows(apacheRows);
  const current = readFileSync(csvPath, "utf8");
  const stale = current !== next;
  const summary = { apacheRows: apacheRows.length, shellRows: shellRows.length, apacheRowsMissingFromHtaccess: missing.length, shellsWithoutApacheRule: clientOnly.length, shellsTargetingHomepage: homepageTargets.length, rulesWithoutRegisterRow: ruleWithoutRow.length, stale };
  const problems = [];
  if (missing.length) problems.push(`Apache rows with no matching RewriteRule: ${missing.join(", ")}`);
  if (clientOnly.length) problems.push(`shells with no Apache 301 (add a RewriteRule + register row): ${clientOnly.join(", ")}`);
  if (homepageTargets.length) problems.push(`shells redirecting to the homepage (pick a specific target): ${homepageTargets.join(", ")}`);
  if (ruleWithoutRow.length) problems.push(`RewriteRules with no register row (add the hand-kept Apache row): ${ruleWithoutRow.join(", ")}`);
  if (check) {
    console.log(JSON.stringify(summary));
    if (missing.length) console.error("Apache rows with no matching RewriteRule:", missing.join(", "));
    if (stale) console.error("REDIRECT_MAP.csv is stale — run `npm run build && node scripts/redirect-map.mjs`");
    process.exitCode = missing.length || stale ? 1 : 0;
    return;
  }
  writeFileSync(csvPath, next, "utf8");
  console.log(JSON.stringify({ ...summary, written: "REDIRECT_MAP.csv" }));
  if (missing.length) { console.error("Apache rows with no matching RewriteRule:", missing.join(", ")); process.exitCode = 1; }
}

if (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
