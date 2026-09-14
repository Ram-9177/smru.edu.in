import assert from "node:assert/strict";
import test from "node:test";
import {
  allowExternalImageRequestsForRoute,
  validateVisualMaskRegistry,
  validateVisualStabilizerRegistry,
  validateVisualReadinessRegistry,
  visualMaskRegistry,
  visualMasksForRoute,
  visualStabilizerForRoute,
  visualReadinessForRoute,
} from "../scripts/visual-audit-config.mjs";

test("visual masks are exact, route-specific, selector-specific, and justified", () => {
  assert.equal(validateVisualMaskRegistry(), true);
  assert.equal(validateVisualStabilizerRegistry(), true);
  assert.equal(validateVisualReadinessRegistry(), true);
  assert.equal(visualMasksForRoute("/").length, 0);
  assert.deepEqual(visualMasksForRoute("/campus-360/").map((mask) => mask.selector), [".psv-canvas-container", ".psv-markers"]);
  assert.equal(visualMasksForRoute("/partner/bb/").some((mask) => mask.optional), true);
  assert.equal(visualMasksForRoute("/partner/bb/")[0].selector, "div.overflow-hidden.bg-white");
  assert.equal(visualMasksForRoute("/partner/edinbox/")[0].selector, "img[src^=\"https://images.unsplash.com/\"]");
  assert.equal(visualMasksForRoute("/partners/qtst/")[0].selector, "img[src^=\"https://\"]");
  assert.equal(visualMasksForRoute("/partners/edinbox/").filter((mask) => mask.mode === "background-image").length, 2);
  assert.equal(visualMasksForRoute("/partners/edinbox/").filter((mask) => mask.mode === "background-image").every((mask) => mask.replacementBackgroundImage.startsWith("linear-gradient(") && !mask.replacementBackgroundImage.includes("url(")), true);
  assert.equal(visualMasksForRoute("/partner/qtst/")[0].frameSelector, "iframe[title$=\" Portal\"]");
  assert.equal(allowExternalImageRequestsForRoute("/partners/qtst/"), true);
  assert.equal(allowExternalImageRequestsForRoute("/partner/qtst/"), true);
  assert.equal(allowExternalImageRequestsForRoute("/"), false);
  assert.equal(visualStabilizerForRoute("/partner/qtst/").kind, "qtst-page-one");
  assert.deepEqual(visualStabilizerForRoute("/partner/qtst/").timerFreeze, {
    documentPath: "/partners/qtst/index.html",
    method: "setTimeout",
    delay: 3000,
    callbackIncludes: "go(current + 1)",
  });
  assert.equal(visualStabilizerForRoute("/partner/veloces/").kind, "veloces-first-slide");
  assert.deepEqual(visualStabilizerForRoute("/partner/veloces/").timerFreeze, {
    documentPath: "/partners/veloces/velocescampus.html",
    method: "setInterval",
    delay: 4000,
    callbackIncludes: "moveSlide(1)",
  });
  assert.deepEqual(visualStabilizerForRoute("/partners/qtst/").timerFreeze, {
    documentPath: "/partners/qtst/",
    method: "setTimeout",
    delay: 3000,
    callbackIncludes: "go(current + 1)",
  });
  assert.deepEqual(visualStabilizerForRoute("/partners/veloces/velocescampus.html").timerFreeze, {
    documentPath: "/partners/veloces/velocescampus.html",
    method: "setInterval",
    delay: 4000,
    callbackIncludes: "moveSlide(1)",
  });
  assert.equal(visualStabilizerForRoute("/"), null);
  assert.deepEqual(visualReadinessForRoute("/partner/qtst/").map((requirement) => requirement.state), ["absent"]);
  assert.equal(visualReadinessForRoute("/partner/qtst/")[0].selector, "div[class~='fixed'][class~='inset-0'][class~='z-[1000]']");
  assert.deepEqual(visualReadinessForRoute("/") , []);
  assert.deepEqual(visualReadinessForRoute("/partner/bytexl/") , []);
  assert.equal([...visualMaskRegistry.values()].flat().every((mask) => mask.justification.length > 0), true);
});

test("visual mask registry rejects full-page and unjustified masks", () => {
  assert.throws(() => validateVisualMaskRegistry(new Map([["/bad/", [{ selector: "body", justification: "hide it" }]]])));
  assert.throws(() => validateVisualMaskRegistry(new Map([["/bad/", [{ selector: ".widget", justification: "" }]]])));
  assert.throws(() => validateVisualMaskRegistry(new Map([["/bad/", [{ selector: ".widget", justification: "valid", optional: "yes" }]]])));
  assert.throws(() => validateVisualMaskRegistry(new Map([["/bad/", [{ selector: ".widget", justification: "valid", mode: "blur" }]]])));
  assert.throws(() => validateVisualMaskRegistry(new Map([["/bad/", [{ selector: ".widget", justification: "valid", mode: "background-image" }]]])));
  assert.throws(() => validateVisualMaskRegistry(new Map([["/bad/", [{ selector: ".widget", justification: "valid", mode: "background-image", replacementBackgroundImage: "url(https://example.com/a.jpg)" }]]])));
});

test("visual stabilizer registry requires an exact audit-only timer freeze", () => {
  assert.throws(() => validateVisualStabilizerRegistry(new Map([["/bad/", {
    kind: "qtst-page-one",
    justification: "valid",
  }]])));
  assert.throws(() => validateVisualStabilizerRegistry(new Map([["/bad/", {
    kind: "veloces-first-slide",
    justification: "valid",
    timerFreeze: { documentPath: "/partners/veloces/velocescampus.html", method: "setInterval", delay: 0, callbackIncludes: "moveSlide(1)" },
  }]])));
});

test("visual readiness registry rejects broad or non-absent requirements", () => {
  assert.throws(() => validateVisualReadinessRegistry(new Map([["/bad/", [{ selector: "body", state: "visible", timeoutMs: 1, justification: "invalid" }]]])));
  assert.throws(() => validateVisualReadinessRegistry(new Map([["/bad/", [{ selector: ".loader", state: "absent", timeoutMs: 0, justification: "invalid" }]]])));
});
