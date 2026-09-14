import { createHash } from "node:crypto";

const stringAssignmentPattern = /\b([A-Za-z_$][\w$]*)\s*(?:=|:)\s*(?:"([^"\r\n]{8,})"|'([^'\r\n]{8,})'|`([^`\r\n]{8,})`)/gim;
const stringLiteralPattern = /"((?:\\.|[^"\\\r\n]){8,})"|'((?:\\.|[^'\\\r\n]){8,})'|`((?:\\.|[^`\\\r\n]){8,})`/gm;

function isCredentialIdentifier(identifier) {
  const normalized = identifier
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .toUpperCase();
  const segments = normalized.split("_").filter(Boolean);
  return segments.some((segment) => ["PASS", "PASSWORD", "SECRET", "TOKEN"].includes(segment)) ||
    normalized.includes("API_KEY") || normalized.includes("CLIENT_SECRET");
}

export function findCredentialAssignments(contents) {
  return [...contents.matchAll(stringAssignmentPattern)]
    .filter((match) => isCredentialIdentifier(match[1]))
    .map((match) => ({
      identifier: match[1],
      value: match[2] ?? match[3] ?? match[4],
      index: match.index,
    }));
}

export function findBrowserCredentialAuthorization(contents) {
  const findings = [];
  const storageAuthPattern = /\b(?:localStorage|sessionStorage)\s*\.\s*(?:getItem|setItem)\s*\(\s*["'`][^"'`]*(?:auth|credential|session|token)[^"'`]*["'`]/gi;
  for (const match of contents.matchAll(storageAuthPattern)) {
    findings.push({ pattern: "browser storage used as authorization", index: match.index });
  }

  const passwordField = /\btype\s*=\s*["']password["']/i;
  const clientGrant = /\b(?:setAuthenticated|authenticated|isAuthenticated|authorized|isAuthorized)\b/i;
  const credentialComparison = /(?:===|==)\s*[A-Za-z_$][\w$]*(?:PASS|PASSWORD|USER|CREDENTIAL)|[A-Za-z_$][\w$]*(?:PASS|PASSWORD|USER|CREDENTIAL)\s*(?:===|==)/i;
  if (passwordField.test(contents) && clientGrant.test(contents) && credentialComparison.test(contents)) {
    findings.push({ pattern: "client-side password comparison grants authorization", index: contents.search(passwordField) });
  }
  return findings;
}

export function findForbiddenStringLiterals(contents, forbiddenHashes) {
  const findings = [];
  for (const match of contents.matchAll(stringLiteralPattern)) {
    const rawValue = match[1] ?? match[2] ?? match[3];
    const value = rawValue
      .replace(/\\([\\"'`])/g, "$1")
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t");
    const valueSha256 = createHash("sha256").update(value).digest("hex");
    if (forbiddenHashes.has(valueSha256)) findings.push({ valueSha256, index: match.index });
  }
  return findings;
}

export function isPublicDeveloperBundle(file) {
  return /(?:^|\/)\_next\/static\/chunks\/app\/developer(?:\/|-)/.test(file.replaceAll("\\", "/"));
}
