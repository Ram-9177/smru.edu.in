import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as fa from "react-icons/fa";
import * as fi from "react-icons/fi";
import * as gi from "react-icons/gi";
import ts from "typescript";
import { generatedFiles } from "../scripts/generate-icons.mjs";

const folder = fileURLToPath(new URL("../src/components/icons", import.meta.url));
const original = { ...gi, ...fi, ...fa };

function load(file, imports) {
  const code = ts.transpileModule(readFileSync(path.join(folder, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", code)(mod, mod.exports, (name) => imports[name]);
  return mod.exports;
}

const shared = load("icon.ts", { react: React });
const names = readdirSync(folder).filter((name) => /^(Fa|Fi|Gi)/.test(name)).map((name) => name.replace(/\.ts$/, ""));

test("every icon draws exactly what react-icons draws", () => {
  assert.ok(names.length > 100);
  const variations = [{}, { className: "text-xl", size: 20 }, { title: "Call us", "aria-hidden": true, color: "red", style: { marginTop: 2 } }];
  for (const name of names) {
    const { default: Icon } = load(`${name}.ts`, { "./icon": shared });
    for (const props of variations) {
      assert.equal(
        renderToStaticMarkup(React.createElement(Icon, props)),
        renderToStaticMarkup(React.createElement(original[name], props)),
        `${name} ${JSON.stringify(props)}`,
      );
    }
  }
});

test("the icon files match the icons the site imports (npm run icons:generate)", () => {
  const files = generatedFiles();
  assert.deepEqual(readdirSync(folder).sort(), [...files.keys(), "icon.ts"].sort());
  for (const [name, text] of files) assert.equal(readFileSync(path.join(folder, name), "utf8"), text, name);
});
