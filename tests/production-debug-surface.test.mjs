import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

test("public developer route and credential gate stay outside production source", () => {
  assert.equal(existsSync("app/developer/page.tsx"), false);
  assert.equal(existsSync("app/developer/page.js"), false);
  assert.equal(existsSync("src/components/developer/DeveloperAccessGate.tsx"), false);
  assert.equal(existsSync("src/components/developer/DeveloperAccessGate.jsx"), false);
});

test("campus map calibrator stays local-only", () => {
  assert.equal(existsSync("public/calibrate.html"), false);
  assert.equal(existsSync("tools/campus-map-calibrator/index.html"), true);
});
