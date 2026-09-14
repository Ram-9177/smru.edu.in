import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/seo/json-ld.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { serializeJsonLd } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("JSON-LD cannot terminate its script element", () => {
  const value = { text: "</script><script>alert(1)</script>" };
  const serialized = serializeJsonLd(value);

  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), value);
});

test("JSON-LD escapes JavaScript line separators without changing its value", () => {
  const value = { text: `before\u2028middle\u2029after` };
  const serialized = serializeJsonLd(value);

  assert.equal(serialized.includes("\u2028"), false);
  assert.equal(serialized.includes("\u2029"), false);
  assert.deepEqual(JSON.parse(serialized), value);
});
