import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createReact } from "./helpers/mini-react.mjs";

// Both partner views cover the page with a loading screen until the partner's iframe reports that it loaded. That
// event can be missed (the iframe loads before React attaches) or never come, so the screen must also end by itself.
async function open(file) {
  const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true },
  }).outputText;
  const timers = new Map();
  let id = 0;
  const setTimeout = (fn, ms) => { timers.set(++id, { fn, ms }); return id; };
  const clearTimeout = (key) => timers.delete(key);
  const react = createReact();
  const drawn = [];
  react.createElement = (type, props, ...children) => ({ type, props, children });
  const iframeRef = { current: null };
  const part = (name) => new Proxy({}, { get: (_, tag) => (tag === "__esModule" ? true : `${name}.${String(tag)}`) });
  const modules = {
    react,
    "next/link": { __esModule: true, default: "Link" },
    "framer-motion": { AnimatePresence: "AnimatePresence", LazyMotion: "LazyMotion", domAnimation: {}, motion: part("motion") },
    "framer-motion/m": part("m"),
    "@/hooks/useIframeAutoHeight": {
      useIframeAutoHeight: () => ({ iframeRef, iframeHeight: 1600, handleIframeLoad() {}, iframeScrolling: "no", hasDynamicHeight: false }),
    },
    "@/lib/developer/useCmsPartners": { useCmsPartners: () => [{ slug: "nst", name: "NST", iframeUrl: "https://partner.example/" }] },
    "@/data/edu-partners": { EDU_PARTNERS: {} },
    "@/lib/shared/media": { resolveAssetSrc: () => "" },
  };
  const mod = { exports: {} };
  vm.runInNewContext(code, {
    module: mod, exports: mod.exports, React: react, setTimeout, clearTimeout, window: { setTimeout, clearTimeout },
    require: (name) => modules[name] ?? { __esModule: true, default: "" },
  });
  const render = () => react.render(() => { drawn[0] = mod.exports.default({ slug: "nst" }); });
  render();
  const loading = () => JSON.stringify(drawn[0]).match(/"(?:upskilling|partner)-loader"/) !== null;
  return {
    loading,
    wait(ms) {
      for (const [key, timer] of [...timers]) if (timer.ms <= ms) { timers.delete(key); timer.fn(); }
      render();
    },
  };
}

for (const file of ["src/views/NiatUpskilling.tsx", "src/views/PartnerIframePage.tsx"]) {
  test(`${file}: the loading screen ends within 6 seconds even if the partner page never reports loading`, async () => {
    const page = await open(file);
    assert.equal(page.loading(), true);
    page.wait(6000);
    assert.equal(page.loading(), false);
  });
}
