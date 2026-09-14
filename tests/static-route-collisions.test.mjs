import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function explicitPageSlugs(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  const slugs = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("[")) continue;
    if (entry.name.startsWith("(")) {
      slugs.push(...await explicitPageSlugs(path.join(directory, entry.name)));
      continue;
    }
    const page = await readFile(path.join(root, directory, entry.name, "page.tsx"), "utf8").catch(() => "");
    if (page) slugs.push(entry.name);
  }
  return slugs;
}

function configuredSlugs(source, prefix = "") {
  return [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)]
    .map((match) => match[1])
    .filter((slug) => slug.startsWith(prefix))
    .map((slug) => slug.slice(prefix.length));
}

function excludedSlugs(source, constantName) {
  const match = source.match(new RegExp(`const ${constantName} = new Set\\(\\[([\\s\\S]*?)\\]\\);`));
  assert.ok(match, `${constantName} must remain explicit`);
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

test("dynamic static params exclude every explicit route collision", async () => {
  const infoData = await readFile(path.join(root, "src/lib/seo/info-pages.ts"), "utf8");
  const infoRoute = await readFile(path.join(root, "app/(seo-pages)/[slug]/page.tsx"), "utf8");
  const rootRoutes = new Set(await explicitPageSlugs("app"));
  const rootCollisions = configuredSlugs(infoData).filter((slug) => rootRoutes.has(slug)).sort();

  assert.deepEqual(excludedSlugs(infoRoute, "EXPLICIT_PAGE_SLUGS").sort(), rootCollisions);

  const guideData = await readFile(path.join(root, "src/lib/seo/safe-guides.ts"), "utf8");
  const guideRoute = await readFile(path.join(root, "app/guides/[slug]/page.tsx"), "utf8");
  const explicitGuide = await readFile(
    path.join(root, "app/guides/best-university-in-hyderabad/page.tsx"),
    "utf8"
  );
  const guideRoutes = new Set(await explicitPageSlugs("app/guides"));
  const guideCollisions = configuredSlugs(guideData)
    .filter((slug) => guideRoutes.has(slug))
    .sort();

  assert.deepEqual(excludedSlugs(guideRoute, "EXPLICIT_GUIDE_SLUGS").sort(), guideCollisions);
  assert.match(explicitGuide, /SAFE_GUIDE_PAGE_MAP\.get\(slug\)/);
});
