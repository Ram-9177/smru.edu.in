import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import {
  findBrowserCredentialAuthorization,
  findCredentialAssignments,
  findForbiddenStringLiterals,
  isPublicDeveloperBundle,
} from "../scripts/audit-patterns.mjs";

test("credential audit finds varied hard-coded credential assignments", () => {
  const source = [
    'const AUTH_PASS = "example-password";',
    'const BACKUP_PASSWORD = "backup-passphrase-example";',
    'const apiToken = "example-token-value";',
    'const config = { clientSecret: "example-client-secret" };',
  ].join("\n");

  assert.deepEqual(
    findCredentialAssignments(source).map(({ identifier, value }) => ({ identifier, value })),
    [
      { identifier: "AUTH_PASS", value: "example-password" },
      { identifier: "BACKUP_PASSWORD", value: "backup-passphrase-example" },
      { identifier: "apiToken", value: "example-token-value" },
      { identifier: "clientSecret", value: "example-client-secret" },
    ]
  );
});

test("credential audit ignores password UI fields and short placeholders", () => {
  const source = '<input type="password" />\nconst token = "demo";\nconst compassion = "student support";';
  assert.deepEqual(findCredentialAssignments(source), []);
});

test("credential audit detects browser-side authorization grants", () => {
  const storageGrant = 'sessionStorage.setItem("developer_auth", "1")';
  const passwordGrant = '<input type="password" />\nif (enteredPassword === EXPECTED_PASSWORD) setAuthenticated(true);';
  assert.equal(findBrowserCredentialAuthorization(storageGrant).length, 1);
  assert.equal(findBrowserCredentialAuthorization(passwordGrant).length, 1);
});

test("credential audit detects a forbidden literal by hash without storing its value", () => {
  const forbiddenValue = "synthetic-forbidden-credential";
  const hashes = new Set([createHash("sha256").update(forbiddenValue).digest("hex")]);
  const findings = findForbiddenStringLiterals(`const value = "${forbiddenValue}";`, hashes);
  assert.equal(findings.length, 1);
  assert.equal("value" in findings[0], false);
});

test("forbidden literal scan is not desynchronized by a preceding short string", () => {
  const forbiddenValue = "synthetic-forbidden-credential";
  const hashes = new Set([createHash("sha256").update(forbiddenValue).digest("hex")]);
  const source = `const shortValue = "demo";\nconst value = "${forbiddenValue}";`;
  assert.equal(findForbiddenStringLiterals(source, hashes).length, 1);
});

test("developer bundle matcher is route-specific", () => {
  assert.equal(isPublicDeveloperBundle("_next/static/chunks/app/developer/page-abc.js"), true);
  assert.equal(isPublicDeveloperBundle("_next/static/chunks/app/page-abc.js"), false);
  assert.equal(isPublicDeveloperBundle("_next/static/chunks/8614.js"), false);
});
