import { readFile } from "node:fs/promises";
import path from "node:path";

function auditPath(input, fallbackLabel) {
  const value = input || fallbackLabel;
  return value.endsWith(".json") || value.includes(path.sep)
    ? value
    : path.join("output", "frontend-audit", value, "audit.json");
}

const baselinePath = auditPath(process.argv[2], "baseline");
const currentPath = auditPath(process.argv[3], "after");
const approvedRemovedRoutes = new Set(
  process.argv.slice(4)
    .filter((argument) => argument.startsWith("--allow-removed-route="))
    .map((argument) => argument.slice("--allow-removed-route=".length))
);

const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));
function mapBy(items, keyFor) {
  return new Map(items.map((item) => [keyFor(item), item]));
}

function compareCountedMultisets(baselineItems, currentItems, keyFor) {
  const countByKey = (items) => {
    const counts = new Map();
    for (const item of items) {
      const key = keyFor(item);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  };

  const baseline = countByKey(baselineItems);
  const current = countByKey(currentItems);
  const missing = [...baseline.keys()].filter((key) => !current.has(key));
  const added = [...current.keys()].filter((key) => !baseline.has(key));
  const changed = [...baseline.keys()].filter(
    (key) => current.has(key) && baseline.get(key) !== current.get(key)
  );
  return { missing, added, changed };
}

function compareMaps(baselineItems, currentItems, keyFor, valueFor) {
  const baseline = mapBy(baselineItems, keyFor);
  const current = mapBy(currentItems, keyFor);
  const missing = [...baseline.keys()].filter((key) => !current.has(key));
  const added = [...current.keys()].filter((key) => !baseline.has(key));
  const changed = [...baseline.keys()].filter(
    (key) => current.has(key) && valueFor(baseline.get(key)) !== valueFor(current.get(key))
  );
  return { missing, added, changed };
}

const baseline = await readJson(baselinePath);
const current = await readJson(currentPath);

const rawRouteComparison = compareMaps(
  baseline.routes,
  current.routes,
  (item) => item.route,
  (item) => item.visibleTextSha256
);
const approvedRouteRemovals = {
  removed: rawRouteComparison.missing.filter((route) => approvedRemovedRoutes.has(route)),
  stillPresent: [...approvedRemovedRoutes].filter((route) => current.routes.some((item) => item.route === route)),
  absentFromBaseline: [...approvedRemovedRoutes].filter((route) => !baseline.routes.some((item) => item.route === route)),
};
const routeComparison = {
  ...rawRouteComparison,
  missing: rawRouteComparison.missing.filter((route) => !approvedRemovedRoutes.has(route)),
};

const linkComparison = compareCountedMultisets(
  baseline.links.filter((item) => !approvedRemovedRoutes.has(item.sourceRoute)),
  current.links.filter((item) => !approvedRemovedRoutes.has(item.sourceRoute)),
  (item) => JSON.stringify([
    item.sourceRoute,
    item.href,
    item.target,
    item.rel,
    Boolean(item.protected),
  ])
);

const protectedFileComparison = compareMaps(
  baseline.protectedFiles,
  current.protectedFiles,
  (item) => item.file,
  (item) => item.sha256
);

const browserComparison = compareMaps(
  baseline.browserEvidence.filter((item) => !approvedRemovedRoutes.has(item.route)),
  current.browserEvidence.filter((item) => !approvedRemovedRoutes.has(item.route)),
  (item) => `${item.route}|${item.viewport.width}x${item.viewport.height}`,
  (item) => item.visibleTextSha256
);

const result = {
  routeCount: { baseline: baseline.routeCount, current: current.routeCount },
  protectedLinkCount: {
    baseline: baseline.protectedLinkCount,
    current: current.protectedLinkCount,
  },
  approvedRouteRemovals,
  routes: routeComparison,
  links: linkComparison,
  protectedFiles: protectedFileComparison,
  browserVisibleText: browserComparison,
};

const hasDifferences = Object.entries(result)
  .filter(([key]) => !["routeCount", "protectedLinkCount", "approvedRouteRemovals"].includes(key))
  .some(([, comparison]) => comparison.missing.length || comparison.added.length || comparison.changed.length);
const invalidApprovedRemoval = approvedRouteRemovals.stillPresent.length > 0 ||
  approvedRouteRemovals.absentFromBaseline.length > 0;

console.log(JSON.stringify({ ...result, pass: !hasDifferences && !invalidApprovedRemoval }, null, 2));
if (hasDifferences || invalidApprovedRemoval) process.exit(1);
