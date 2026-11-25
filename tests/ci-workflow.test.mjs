import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// GitHub lets a pull request into main merge only after the check with this exact name passes (PROJECT.md §8).
const REQUIRED_CHECK = "Build, lint audit, and SEO sanity checks";
const workflow = readFileSync(new URL("../.github/workflows/seo-hardening-ci.yml", import.meta.url), "utf8");

// The verify job's name as GitHub would show it. Its expression uses only github.*, == != && || and quoted text,
// which mean the same in JavaScript, so it is evaluated rather than matched as text.
function checkName(github) {
  const value = workflow.match(/^ {2}verify:\n {4}name: (.+)$/m)[1].trim();
  const expression = value.match(/^\$\{\{ (.+) \}\}$/)?.[1];
  return expression ? new Function("github", `return ${expression};`)(github) : value;
}

test("a pull request and main report the check that main requires", () => {
  assert.equal(checkName({ event_name: "pull_request", ref: "refs/pull/19/merge" }), REQUIRED_CHECK);
  assert.equal(checkName({ event_name: "push", ref: "refs/heads/main" }), REQUIRED_CHECK);
  assert.equal(checkName({ event_name: "workflow_dispatch", ref: "refs/heads/main" }), REQUIRED_CHECK);
});

test("a run on a year branch cannot pass or block the check that main requires", () => {
  for (const event_name of ["push", "workflow_dispatch"]) {
    const name = checkName({ event_name, ref: "refs/heads/site/2026-27" });
    assert.notEqual(name, REQUIRED_CHECK, event_name);
    assert.ok(name, `${event_name}: the check has no name`);
  }
});
