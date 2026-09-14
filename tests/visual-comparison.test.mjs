import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import sharp from "sharp";

const comparator = path.resolve("scripts/compare-visual-baselines.mjs");

async function fixture() {
  const directory = await mkdtemp(path.join(os.tmpdir(), "smru-visual-compare-"));
  const screenshot = path.join(directory, "capture.png");
  const bytes = await sharp({ create: { width: 50, height: 50, channels: 3, background: "#123456" } }).png().toBuffer();
  await writeFile(screenshot, bytes);
  const hash = createHash("sha256").update(bytes).digest("hex");
  const capture = {
    route: "/",
    profile: "desktop",
    status: 200,
    classification: "deterministic",
    masks: [],
    stabilizerEvidence: null,
    maskedNodeCounts: [],
    screenshot,
    screenshotSha256: hash,
    normalizedDomSha256: "dom-a",
    visibleTextSha256: "text-a",
    visibleTextLength: 150,
    assetUrlsSha256: "assets-a",
    renderStable: true,
    unmaskedNonWhitePixelRatio: 1,
    consoleErrors: [],
    pageErrors: [],
  };
  const manifest = {
    selectedRouteCount: 1,
    routeFilter: [],
    redirectRoutes: [],
    maskRegistrySha256: "registry-a",
    captures: [capture],
  };
  return { directory, manifest };
}

async function compare(left, right, directory) {
  const leftPath = path.join(directory, "left.json");
  const rightPath = path.join(directory, "right.json");
  await writeFile(leftPath, `${JSON.stringify(left)}\n`);
  await writeFile(rightPath, `${JSON.stringify(right)}\n`);
  return spawnSync(process.execPath, [comparator, leftPath, rightPath], { encoding: "utf8" });
}

test("visual comparator passes equal deterministic evidence", async () => {
  const { directory, manifest } = await fixture();
  try {
    const result = await compare(manifest, structuredClone(manifest), directory);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).pass, true);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("visual comparator blocks DOM-only changes and unknown instability", async () => {
  const { directory, manifest } = await fixture();
  try {
    const changed = structuredClone(manifest);
    changed.captures[0].normalizedDomSha256 = "dom-b";
    changed.captures[0].renderStable = false;
    const result = await compare(manifest, changed, directory);
    const report = JSON.parse(result.stdout);
    assert.equal(result.status, 1);
    assert.deepEqual(report.domChanges, ["/|desktop"]);
    assert.deepEqual(report.captureErrors, ["/|desktop"]);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("visual comparator blocks redirect-scope changes", async () => {
  const { directory, manifest } = await fixture();
  try {
    const changed = structuredClone(manifest);
    changed.redirectRoutes = ["/legacy/"];
    const result = await compare(manifest, changed, directory);
    assert.equal(result.status, 1);
    assert.equal(JSON.parse(result.stdout).redirectRoutesChanged, true);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("visual comparator blocks stabilizer-state changes", async () => {
  const { directory, manifest } = await fixture();
  try {
    manifest.captures[0].stabilizerEvidence = { timerFreezeApplied: true, state: "Page 1" };
    const changed = structuredClone(manifest);
    changed.captures[0].stabilizerEvidence.state = "Page 2";
    const result = await compare(manifest, changed, directory);
    assert.equal(result.status, 1);
    assert.deepEqual(JSON.parse(result.stdout).classificationChanges, ["/|desktop"]);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("visual comparator blocks small above-threshold pixel warnings", async () => {
  const { directory, manifest } = await fixture();
  try {
    const changed = structuredClone(manifest);
    const changedBytes = await sharp({ create: { width: 50, height: 50, channels: 3, background: "#123456" } })
      .composite([{ input: { create: { width: 1, height: 1, channels: 3, background: "#ffffff" } }, left: 0, top: 0 }])
      .png()
      .toBuffer();
    const changedFile = path.join(directory, "changed.png");
    await writeFile(changedFile, changedBytes);
    changed.captures[0].screenshot = changedFile;
    changed.captures[0].screenshotSha256 = createHash("sha256").update(changedBytes).digest("hex");
    const result = await compare(manifest, changed, directory);
    const report = JSON.parse(result.stdout);
    assert.equal(result.status, 1);
    assert.equal(report.pixelWarnings.length, 1);
    assert.equal(report.pixelChanges.length, 0);
  } finally {
    await rm(directory, { recursive: true });
  }
});
