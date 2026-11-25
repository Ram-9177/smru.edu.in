import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

// AppShell wraps every page, so whatever it imports directly is downloaded by every visitor on every page. These
// modules are large and only some pages (or a menu that opens on hover) need them.
const root = fileURLToPath(new URL("..", import.meta.url));
const HEAVY = [
  "src/data/schools.ts",
  "src/data/course-codes.ts",
  "src/data/campus-tour.ts",
  "src/data/developer/static-seed.ts",
  "src/lib/developer/seed.ts",
  "src/lib/developer/academic-data.ts",
  "src/lib/seo/search-intent.ts",
  "src/lib/metadata.ts",
];

function resolveImport(from, specifier) {
  const base = specifier.startsWith("@/")
    ? path.join(root, "src", specifier.slice(2))
    : path.resolve(path.dirname(from), specifier);
  return [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")].find(
    (file) => existsSync(file) && statSync(file).isFile(),
  );
}

// Follows static imports only: import(…) is downloaded later, on demand. `import type` disappears in the build.
function staticImports(entry) {
  const files = new Map();
  const packages = new Map();
  const queue = [path.join(root, entry)];
  while (queue.length) {
    const file = queue.pop();
    if (files.has(file)) continue;
    const source = readFileSync(file, "utf8");
    files.set(file, true);
    for (const [, specifier] of source.matchAll(/^\s*(?:import|export)\s(?!type\b)[^;]*?\bfrom\s+["']([^"']+)["']/gm)) {
      if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
        packages.set(specifier, path.relative(root, file));
        continue;
      }
      const target = resolveImport(file, specifier);
      if (target && /\.tsx?$/.test(target)) queue.push(target);
    }
  }
  return { files: [...files.keys()].map((file) => path.relative(root, file)), packages };
}

test("the shell around every page does not carry data that only some pages need", () => {
  const { files } = staticImports("src/components/AppShell.tsx");
  assert.ok(files.includes(path.join("src", "components", "Navbar.tsx")), "the walk did not reach the header");
  assert.deepEqual(files.filter((file) => HEAVY.includes(file.split(path.sep).join("/"))), []);
});

test("icons come from one file each, not from a package that ships every icon on every page", () => {
  const offenders = [];
  (function walk(folder) {
    for (const entry of readdirSync(path.join(root, folder), { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.tsx?$/.test(entry.name) && /from ["']react-icons/.test(readFileSync(path.join(root, file), "utf8"))) offenders.push(file);
    }
  })("src");
  assert.deepEqual(offenders, []);
});
