import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

// The script is run for real, with rsync, against a local folder standing in for public_html.
const script = fileURLToPath(new URL("../scripts/deploy-cpanel.sh", import.meta.url));
const workflow = readFileSync(new URL("../.github/workflows/seo-hardening-ci.yml", import.meta.url), "utf8");

function site(t) {
  const root = mkdtempSync(path.join(tmpdir(), "smru-deploy-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (file, text) => {
    const target = path.join(root, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, text);
  };
  put("out/index.html", "new home");
  put("out/admissions/index.html", "new admissions");
  put("out/_next/static/chunks/new.js", "new chunk");
  put("out/.htaccess", "new rules");
  put("server/index.html", "old home");
  put("server/.htaccess", "old rules");
  return {
    root,
    put,
    read: (file) => readFileSync(path.join(root, file), "utf8"),
    has: (file) => existsSync(path.join(root, file)),
    run: (env = {}) => {
      const result = spawnSync("bash", [script], {
        cwd: root,
        encoding: "utf8",
        env: { PATH: process.env.PATH, HOME: root, DEPLOY_TARGET: path.join(root, "server"), ...env },
      });
      return { code: result.status, text: `${result.stdout}${result.stderr}` };
    },
  };
}

test("a live run puts the new site on the server", (t) => {
  const s = site(t);
  const { code, text } = s.run({ DEPLOY_MODE: "live" });
  assert.equal(code, 0, text);
  assert.equal(s.read("server/index.html"), "new home");
  assert.equal(s.read("server/admissions/index.html"), "new admissions");
  assert.equal(s.read("server/_next/static/chunks/new.js"), "new chunk");
  assert.equal(s.read("server/.htaccess"), "new rules");
});

test("without a mode it is a dry run: it lists the changes and changes nothing", (t) => {
  const s = site(t);
  const { code, text } = s.run();
  assert.equal(code, 0, text);
  assert.match(text, /admissions\/index\.html/);
  assert.equal(s.read("server/index.html"), "old home");
  assert.equal(s.read("server/.htaccess"), "old rules");
  assert.deepEqual(readdirSync(path.join(s.root, "server")).sort(), [".htaccess", "index.html"]);
});

test("files that are only on the server are kept", (t) => {
  const s = site(t);
  s.put("server/_next/static/chunks/old.js", "a visitor's open tab still needs this");
  s.put("server/.well-known/acme-challenge/token", "certificate renewal");
  s.put("server/cgi-bin/keep.txt", "not ours");
  assert.equal(s.run({ DEPLOY_MODE: "live" }).code, 0);
  assert.ok(s.has("server/_next/static/chunks/old.js"));
  assert.ok(s.has("server/.well-known/acme-challenge/token"));
  assert.ok(s.has("server/cgi-bin/keep.txt"));
});

test("a failed page upload leaves the new scripts in place and the old .htaccess untouched", (t) => {
  const s = site(t);
  rmSync(path.join(s.root, "server/index.html"));
  s.put("server/index.html/blocker.txt", "a folder where the page should go makes this upload fail");
  const { code } = s.run({ DEPLOY_MODE: "live" });
  assert.notEqual(code, 0);
  assert.ok(s.has("server/_next/static/chunks/new.js"), "_next/ goes first");
  assert.equal(s.read("server/.htaccess"), "old rules", ".htaccess goes last");
});

test("the site folder keeps the permissions cPanel gave it", (t) => {
  const s = site(t);
  const server = path.join(s.root, "server");
  chmodSync(server, 0o750);
  assert.equal(s.run({ DEPLOY_MODE: "live" }).code, 0);
  assert.equal((statSync(server).mode & 0o777).toString(8), "750");
});

test("Finder files are not uploaded", (t) => {
  const s = site(t);
  s.put("out/.DS_Store", "junk");
  s.put("out/admissions/.DS_Store", "junk");
  assert.equal(s.run({ DEPLOY_MODE: "live" }).code, 0);
  assert.ok(!s.has("server/.DS_Store"));
  assert.ok(!s.has("server/admissions/.DS_Store"));
});

test("a second run with the same build sends nothing", (t) => {
  const s = site(t);
  assert.equal(s.run({ DEPLOY_MODE: "live" }).code, 0);
  for (const file of ["index.html", "admissions/index.html", ".htaccess"]) s.put(`out/${file}`, s.read(`out/${file}`));
  const { code, text } = s.run({ DEPLOY_MODE: "live" });
  assert.equal(code, 0, text);
  assert.match(text, /done, 0 files to send/);
});

test("a folder that is not the live site is refused", (t) => {
  const s = site(t);
  s.put("home/mail/inbox", "someone's home folder");
  const { code, text } = s.run({ DEPLOY_MODE: "live", DEPLOY_TARGET: path.join(s.root, "home") });
  assert.notEqual(code, 0);
  assert.match(text, /does not look like the live site/);
  assert.deepEqual(readdirSync(path.join(s.root, "home")), ["mail"]);
});

test("a target that does not exist is refused, not created", (t) => {
  const s = site(t);
  const { code, text } = s.run({ DEPLOY_MODE: "live", DEPLOY_TARGET: path.join(s.root, "public_htm") });
  assert.notEqual(code, 0);
  assert.match(text, /does not look like the live site/);
  assert.ok(!s.has("public_htm"));
});

test("an incomplete build is refused", (t) => {
  const s = site(t);
  rmSync(path.join(s.root, "out/.htaccess"));
  const { code, text } = s.run({ DEPLOY_MODE: "live" });
  assert.notEqual(code, 0);
  assert.match(text, /out\/\.htaccess is missing/);
  assert.equal(s.read("server/index.html"), "old home");
});

test("a missing target is reported by name", (t) => {
  const { code, text } = site(t).run({ DEPLOY_MODE: "live", DEPLOY_TARGET: "" });
  assert.notEqual(code, 0);
  assert.match(text, /DEPLOY_TARGET is not set/);
});

test("an unknown mode is refused", (t) => {
  const s = site(t);
  const { code, text } = s.run({ DEPLOY_MODE: "prod" });
  assert.notEqual(code, 0);
  assert.match(text, /DEPLOY_MODE must be dry-run or live/);
  assert.equal(s.read("server/index.html"), "old home");
});

test("publishing waits for every check, runs only for main, and is off until switched on", () => {
  const deploy = workflow.split(/^ {2}deploy:$/m)[1];
  assert.ok(deploy, "the workflow has a deploy job");
  assert.match(deploy, /^ {4}needs: verify$/m);
  assert.match(deploy, /github\.ref == 'refs\/heads\/main'/);
  assert.match(deploy, /github\.event_name == 'push' && vars\.CPANEL_DEPLOY == 'on'/);
  assert.match(deploy, /^ {4}environment: production$/m);
  assert.doesNotMatch(deploy, /pull_request/);
});
