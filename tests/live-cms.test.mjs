import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// cms-data.json can replace the built-in content. It is normally a placeholder, so reading it must stay cheap.
async function liveCms({ hostname = "smru.edu.in", answers = [] } = {}) {
  const source = await readFile(new URL("../src/lib/developer/live-cms.ts", import.meta.url), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const requests = [];
  const fetch = async (url, options) => {
    requests.push({ url, options });
    const answer = answers[Math.min(requests.length, answers.length) - 1];
    if (answer instanceof Error) throw answer;
    return { ok: answer.status === undefined, status: answer.status ?? 200, json: async () => answer };
  };
  const mod = { exports: {} };
  vm.runInNewContext(code, { module: mod, exports: mod.exports, fetch, window: { location: { hostname } } });
  return { ...mod.exports, requests };
}

const published = {
  metadata: { sourceVersion: "v7", lastUpdated: "2026-11-01" },
  routes: [], schools: [{ id: "school-law" }], departments: [], programs: [], partners: [], partnerLinks: [],
  pages: [{ id: "page-contact-primary", content: "1 | 2" }],
};
const placeholder = { metadata: { sourceVersion: "seed-fallback-placeholder" } };

test("published content is returned as it was published", async () => {
  const { loadLiveCms } = await liveCms({ answers: [published] });
  const live = await loadLiveCms();
  assert.equal(live.schools[0].id, "school-law");
  assert.equal(live.pages[0].content, "1 | 2");
  assert.equal(live.metadata.lastUpdated, "2026-11-01");
});

test("the placeholder file means no published content, and is asked for once per page load", async () => {
  const { loadLiveCms, requests } = await liveCms({ answers: [placeholder] });
  assert.deepEqual(await Promise.all([loadLiveCms(), loadLiveCms()]), [null, null]);
  assert.equal(await loadLiveCms(), null);
  assert.equal(requests.length, 1);
});

test("a failed request is tried again the next time", async () => {
  const { loadLiveCms, requests } = await liveCms({ answers: [new Error("offline"), { status: 503 }, published] });
  assert.equal(await loadLiveCms(), null);
  assert.equal(await loadLiveCms(), null);
  assert.equal((await loadLiveCms()).schools[0].id, "school-law");
  assert.equal(requests.length, 3);
});

test("the browser checks for a newer file but does not download an unchanged one again", async () => {
  const { loadLiveCms, requests } = await liveCms({ answers: [placeholder] });
  await loadLiveCms();
  assert.equal(requests[0].url, "/cms-data.json");
  assert.equal(requests[0].options.cache, "no-cache");
});

test("a local preview does not read the published file unless asked to", async () => {
  for (const hostname of ["localhost", "127.0.0.1"]) {
    const { loadLiveCms, requests } = await liveCms({ hostname, answers: [published] });
    assert.equal(await loadLiveCms(), null);
    assert.equal(requests.length, 0);
    assert.equal((await loadLiveCms({ allowLocal: true })).schools[0].id, "school-law");
  }
});
