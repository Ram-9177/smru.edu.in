#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] || "out";
const timeoutMs = Number(process.env.LINK_CHECK_TIMEOUT_MS || 15000);
const concurrency = Number(process.env.LINK_CHECK_CONCURRENCY || 6);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const file = join(dir, entry);
    const stat = statSync(file);
    if (stat.isDirectory()) walk(file, files);
    else if (file.endsWith(".html")) files.push(file);
  }
  return files;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function collectLinks() {
  const links = new Map();
  for (const file of walk(root)) {
    const html = readFileSync(file, "utf8");
    for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
      const href = decodeHtml(match[1].trim());
      if (!/^https?:\/\//i.test(href)) continue;
      if (!links.has(href)) links.set(href, new Set());
      links.get(href).add(file);
    }
  }
  return links;
}

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

async function request(url, method) {
  return fetch(url, {
    method,
    redirect: "follow",
    signal: timeoutSignal(),
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; SMRU-SEOLinkCheck/1.0; +https://smru.edu.in/)",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
}

async function checkUrl(url, files) {
  try {
    const head = await request(url, "HEAD");
    if (![403, 405, 501].includes(head.status)) {
      return { url, ok: head.status < 400, status: head.status, finalUrl: head.url, method: "HEAD", files: [...files] };
    }
  } catch {
    // Fall back to GET below.
  }

  try {
    const get = await request(url, "GET");
    return { url, ok: get.status < 400, status: get.status, finalUrl: get.url, method: "GET", files: [...files] };
  } catch (error) {
    return { url, ok: false, error: error?.name === "AbortError" ? "timeout" : String(error?.message || error), files: [...files] };
  }
}

async function main() {
  const links = [...collectLinks()];
  const results = [];
  for (let index = 0; index < links.length; index += concurrency) {
    const batch = links.slice(index, index + concurrency);
    results.push(...await Promise.all(batch.map(([url, files]) => checkUrl(url, files))));
  }

  const broken = results.filter((result) => !result.ok);
  console.log(JSON.stringify({
    checked: results.length,
    broken: broken.length,
    failures: broken,
  }, null, 2));

  if (broken.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
