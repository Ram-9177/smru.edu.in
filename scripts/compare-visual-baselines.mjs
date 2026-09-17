import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const warningThreshold = Number(process.env.VISUAL_PIXEL_WARNING_RATIO || 0.00012);
const failureThreshold = Number(process.env.VISUAL_PIXEL_FAILURE_RATIO || 0.001);
const channelDeltaThreshold = Number(process.env.VISUAL_CHANNEL_DELTA || 32);
const lowEntropyThreshold = Number(process.env.VISUAL_LOW_ENTROPY_RATIO || 0.005);

function manifestPath(value) {
  return value.endsWith(".json") || value.includes(path.sep)
    ? value
    : path.join("output", "frontend-audit", value, "visual", "manifest.json");
}

async function decodedPixels(file) {
  return sharp(path.resolve(file)).removeAlpha().toColourspace("srgb").raw().toBuffer({ resolveWithObject: true });
}

async function pixelDifference(baselineCapture, currentCapture) {
  if (baselineCapture.screenshotSha256 === currentCapture.screenshotSha256) return { changedPixelRatio: 0 };
  const [baseline, current] = await Promise.all([
    decodedPixels(baselineCapture.screenshot),
    decodedPixels(currentCapture.screenshot),
  ]);
  const sameDimensions = baseline.info.width === current.info.width &&
    baseline.info.height === current.info.height &&
    baseline.info.channels === current.info.channels;
  if (!sameDimensions) {
    return { changedPixelRatio: 1, dimensionMismatch: { baseline: baseline.info, current: current.info } };
  }
  let changedPixels = 0;
  for (let index = 0; index < baseline.data.length; index += baseline.info.channels) {
    const difference = Math.max(
      Math.abs(baseline.data[index] - current.data[index]),
      Math.abs(baseline.data[index + 1] - current.data[index + 1]),
      Math.abs(baseline.data[index + 2] - current.data[index + 2])
    );
    if (difference > channelDeltaThreshold) changedPixels += 1;
  }
  return { changedPixelRatio: changedPixels / (baseline.info.width * baseline.info.height) };
}

const baselinePath = manifestPath(process.argv[2] || "visual-baseline");
const currentPath = manifestPath(process.argv[3] || "visual-current");
const outputPath = process.argv[4];
const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
const current = JSON.parse(await readFile(currentPath, "utf8"));
const key = (item) => `${item.route}|${item.profile}`;
const baselineMap = new Map(baseline.captures.map((item) => [key(item), item]));
const currentMap = new Map(current.captures.map((item) => [key(item), item]));
const missing = [...baselineMap.keys()].filter((item) => !currentMap.has(item));
const added = [...currentMap.keys()].filter((item) => !baselineMap.has(item));
const common = [...baselineMap.keys()].filter((item) => currentMap.has(item));

const redirectRoutesChanged = JSON.stringify(baseline.redirectRoutes || []) !== JSON.stringify(current.redirectRoutes || []);
const routeScopeChanged = baseline.selectedRouteCount !== current.selectedRouteCount ||
  JSON.stringify(baseline.routeFilter || []) !== JSON.stringify(current.routeFilter || []);
const maskRegistryChanged = baseline.maskRegistrySha256 !== current.maskRegistrySha256;
const captureErrors = common.filter((item) => {
  const captures = [baselineMap.get(item), currentMap.get(item)];
  return captures.some((capture) => capture.error || capture.status === null || capture.status >= 400 ||
    capture.renderStable !== true || (capture.consoleErrors?.length || 0) > 0 || (capture.pageErrors?.length || 0) > 0 ||
    !["deterministic", "selector-masked"].includes(capture.classification));
});
const classificationChanges = common.filter((item) => {
  const left = baselineMap.get(item);
  const right = currentMap.get(item);
  const requiredCounts = (capture) => (capture.maskedNodeCounts || []).filter((entry) => {
    const definition = (capture.masks || []).find((mask) => mask.selector === entry.selector);
    return !definition?.optional;
  });
  return left.classification !== right.classification || JSON.stringify(left.masks || []) !== JSON.stringify(right.masks || []) ||
    JSON.stringify(requiredCounts(left)) !== JSON.stringify(requiredCounts(right)) ||
    JSON.stringify(left.stabilizerEvidence || null) !== JSON.stringify(right.stabilizerEvidence || null);
});
const lowEntropyCaptures = common.filter((item) => {
  const captures = [baselineMap.get(item), currentMap.get(item)];
  return captures.some((capture) => capture.visibleTextLength > 100 &&
    typeof capture.unmaskedNonWhitePixelRatio === "number" && capture.unmaskedNonWhitePixelRatio < lowEntropyThreshold);
});
const domChanges = common.filter((item) => baselineMap.get(item).normalizedDomSha256 !== currentMap.get(item).normalizedDomSha256);
const visibleTextChanges = common.filter((item) => baselineMap.get(item).visibleTextSha256 !== currentMap.get(item).visibleTextSha256);
const assetUrlChanges = common.filter((item) => baselineMap.get(item).assetUrlsSha256 !== currentMap.get(item).assetUrlsSha256);

let nextCapture = 0;
const pixelMetrics = [];
async function compareWorker() {
  while (true) {
    const index = nextCapture;
    nextCapture += 1;
    if (index >= common.length) return;
    const captureKey = common[index];
    if (captureErrors.includes(captureKey)) continue;
    const difference = await pixelDifference(baselineMap.get(captureKey), currentMap.get(captureKey));
    if (difference.changedPixelRatio > warningThreshold || difference.dimensionMismatch) pixelMetrics.push({ capture: captureKey, ...difference });
  }
}
await Promise.all(Array.from({ length: 2 }, () => compareWorker()));
pixelMetrics.sort((left, right) => right.changedPixelRatio - left.changedPixelRatio || left.capture.localeCompare(right.capture));

const pixelChanges = pixelMetrics.filter((item) => item.changedPixelRatio > failureThreshold || item.dimensionMismatch);
const pixelWarnings = pixelMetrics.filter((item) => item.changedPixelRatio <= failureThreshold && !item.dimensionMismatch);
const pass = !missing.length && !added.length && !captureErrors.length && !classificationChanges.length &&
  !lowEntropyCaptures.length && !domChanges.length && !visibleTextChanges.length && !assetUrlChanges.length &&
  !pixelChanges.length && !pixelWarnings.length && !redirectRoutesChanged && !routeScopeChanged && !maskRegistryChanged;
const result = {
  baseline: baselinePath,
  current: currentPath,
  thresholds: { channelDeltaThreshold, warningThreshold, failureThreshold, lowEntropyThreshold },
  missing,
  added,
  captureErrors,
  classificationChanges,
  lowEntropyCaptures,
  pixelChanges,
  pixelWarnings,
  domChanges,
  visibleTextChanges,
  assetUrlChanges,
  redirectRoutesChanged,
  routeScopeChanged,
  maskRegistryChanged,
  pass,
};
const serializedResult = `${JSON.stringify(result, null, 2)}\n`;
if (outputPath) {
  const resolvedOutputPath = path.resolve(outputPath);
  await mkdir(path.dirname(resolvedOutputPath), { recursive: true });
  await writeFile(resolvedOutputPath, serializedResult);
}
console.log(serializedResult.trimEnd());
if (!pass) process.exit(1);
