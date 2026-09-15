import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const compareScript = fileURLToPath(new URL("../scripts/compare-frontend-audit.mjs", import.meta.url));

const emptyAudit = {
  routeCount: 0,
  protectedLinkCount: 0,
  routes: [],
  links: [],
  protectedFiles: [],
  browserEvidence: [],
};

test("frontend audit comparison detects a removed duplicate link", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "smru-audit-"));
  try {
    const link = {
      sourceRoute: "/",
      href: "https://apply.smru.edu.in/",
      target: "_self",
      rel: "",
      protected: true,
    };
    const baselinePath = path.join(directory, "baseline.json");
    const currentPath = path.join(directory, "current.json");
    await writeFile(baselinePath, JSON.stringify({ ...emptyAudit, protectedLinkCount: 2, links: [link, link] }));
    await writeFile(currentPath, JSON.stringify({ ...emptyAudit, protectedLinkCount: 1, links: [link] }));

    const result = spawnSync(process.execPath, [compareScript, baselinePath, currentPath], {
      encoding: "utf8", maxBuffer: 32 * 1024 * 1024, timeout: 60_000,
    });

    assert.equal(result.status, 1);
    assert.match(result.stdout, /"pass": false/);
    assert.match(result.stdout, /"links"/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("frontend audit comparison permits only explicitly approved route removals", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "smru-audit-removal-"));
  try {
    const publicRoute = { route: "/", visibleTextSha256: "public" };
    const debugRoute = { route: "/developer/", visibleTextSha256: "debug" };
    const debugLink = { sourceRoute: "/developer/", href: "/", target: "_self", rel: "", protected: false };
    const baselinePath = path.join(directory, "baseline.json");
    const currentPath = path.join(directory, "current.json");
    await writeFile(baselinePath, JSON.stringify({
      ...emptyAudit,
      routeCount: 2,
      routes: [publicRoute, debugRoute],
      links: [debugLink],
    }));
    await writeFile(currentPath, JSON.stringify({
      ...emptyAudit,
      routeCount: 1,
      routes: [publicRoute],
    }));

    const approved = spawnSync(process.execPath, [
      compareScript,
      baselinePath,
      currentPath,
      "--allow-removed-route=/developer/",
    ], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, timeout: 60_000 });
    assert.equal(approved.status, 0);
    assert.equal(JSON.parse(approved.stdout).pass, true);

    const unapproved = spawnSync(process.execPath, [compareScript, baselinePath, currentPath], {
      encoding: "utf8", maxBuffer: 32 * 1024 * 1024, timeout: 60_000,
    });
    assert.equal(unapproved.status, 1);
    assert.equal(JSON.parse(unapproved.stdout).pass, false);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
