import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createReact } from "./helpers/mini-react.mjs";

async function openModal() {
  const source = await readFile(new URL("../src/components/MerittoApplyModal.tsx", import.meta.url), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true },
  }).outputText;
  const react = createReact();
  const listeners = new Map();
  const downloads = [];
  const window = {
    addEventListener: (type, fn) => listeners.set(type, fn),
    removeEventListener: (type, fn) => listeners.get(type) === fn && listeners.delete(type),
  };
  const document = {
    body: { style: {}, appendChild() {} },
    createElement: () => ({ style: {}, click() { downloads.push(this.href); }, remove() {} }),
  };
  const mod = { exports: {} };
  vm.runInNewContext(code, {
    module: mod, exports: mod.exports, window, document, React: react,
    require: (name) => (name === "react" ? react : { __esModule: true, default: () => null, FaTimes: () => null }),
  });
  const draw = (props) => react.render(() => mod.exports.default(props));
  const redraw = () => draw(current);
  let current;
  return {
    downloads,
    show: (props) => { current = { onClose() {}, ...props }; redraw(); },
    say: (data) => { listeners.get("message")?.({ data }); redraw(); },
  };
}

const brochure = { brochureUrl: "/assets/brochure.pdf", brochureName: "brochure.pdf" };

test("the form's messages start one brochure download, however many arrive", async () => {
  const modal = await openModal();
  modal.show({ open: true, payload: brochure });
  ["lead captured", "success", "thank you", "form submitted"].forEach(modal.say);
  assert.deepEqual(modal.downloads, ["/assets/brochure.pdf"]);
});

test("opening the form again allows one more download", async () => {
  const modal = await openModal();
  modal.show({ open: true, payload: brochure });
  modal.say("success");
  modal.show({ open: false, payload: null });
  modal.show({ open: true, payload: brochure });
  modal.say("success");
  modal.say("success");
  assert.equal(modal.downloads.length, 2);
});

test("a form without a brochure downloads nothing", async () => {
  const modal = await openModal();
  modal.show({ open: true, payload: null });
  modal.say("success");
  assert.deepEqual(modal.downloads, []);
});
