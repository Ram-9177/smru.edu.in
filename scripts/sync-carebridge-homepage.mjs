// Sync the Carebridge Education home page into public/partners/carebridge/ from the partner's site export.
//
//   npm run partners:carebridge -- "/path/to/V6 - latest"      # reads <export>/dist/index.html
//
// /carebridge/ on smru.edu.in shows the Carebridge HOME PAGE ONLY, iframed the same way as the other raw
// partner landings (PartnerIframePage). Everything a visitor clicks leaves the frame for the real site
// at https://carebridge.education/. This script is the written procedure for re-syncing when the partner
// resends their export; it must stay the only way that folder is produced.
//
// What it does, and nothing else:
//   1. Copies the home page plus the exact set of assets it references (css/js/images, srcset included);
//      no other pages, no build tooling, no .git, no backups.
//   2. Rewrites every page link (about.html, programs/x/, index.html, www.carebridge.education/…) to the
//      same path on https://carebridge.education/ and gives it target="_top" so the whole tab navigates.
//      External links keep their own target; tel:, mailto: and #anchors are left alone.
//   3. Sets the copy's <meta name="robots"> to noindex,follow — it is a mirror of another site's page
//      (public/.htaccess already sends X-Robots-Tag noindex for /partners/*.html). The partner's own
//      canonical (their domain) and every word of their copy stay untouched.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const LIVE_ORIGIN = "https://carebridge.education";
const TARGET_DIR = path.join(process.cwd(), "public", "partners", "carebridge");

const usage = () => {
  console.error('usage: node scripts/sync-carebridge-homepage.mjs "<path to the Carebridge export root>"');
  process.exit(2);
};

export function collectAssetRefs(html) {
  const refs = new Set();
  for (const m of html.matchAll(/\b(?:src|href|poster|data-src)="([^"]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/g)) m[1].split(",").forEach((part) => refs.add(part.trim().split(/\s+/)[0]));
  return [...refs]
    .map((ref) => ref.split(/[?#]/)[0])
    .filter((ref) => /^(assets|css|js)\//.test(ref));
}

const isPageLink = (href) => {
  if (/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(href)) return false;
  const clean = href.split(/[?#]/)[0];
  return clean === "" || clean === "index.html" || /\.html$/.test(clean) || /\/$/.test(clean) || !/\.[a-z0-9]+$/i.test(clean);
};

// "programs/bsc-nursing/index.html" → "/programs/bsc-nursing/", "index.html" → "/", "about.html#x" → "/about.html#x"
export function toLiveUrl(href) {
  const [pathPart, hash] = href.split("#");
  let clean = pathPart.replace(/^\.\//, "").replace(/\/index\.html$/, "/");
  if (clean === "index.html") clean = "";
  return `${LIVE_ORIGIN}/${clean}${hash ? `#${hash}` : ""}`;
}

export function rewriteHtml(html) {
  let pageLinks = 0;
  let hostLinks = 0;
  const out = html.replace(/<a\b([^>]*)>/g, (tag, attrs) => {
    const hrefMatch = attrs.match(/\bhref="([^"]*)"/);
    if (!hrefMatch) return tag;
    const href = hrefMatch[1];
    let nextAttrs = attrs;
    if (isPageLink(href)) {
      nextAttrs = nextAttrs.replace(hrefMatch[0], `href="${toLiveUrl(href)}"`);
      pageLinks += 1;
    } else if (/^https?:\/\/(www\.)?carebridge\.education(\/|$)/i.test(href)) {
      nextAttrs = nextAttrs.replace(hrefMatch[0], `href="${href.replace(/^https?:\/\/(www\.)?carebridge\.education/i, LIVE_ORIGIN)}"`);
      hostLinks += 1;
    } else {
      return tag;
    }
    if (!/\btarget=/.test(nextAttrs)) nextAttrs += ' target="_top"';
    return `<a${nextAttrs}>`;
  });
  const robots = out.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">');
  return { html: robots, pageLinks, hostLinks, robotsChanged: robots !== out };
}

export function remainingRelativePageLinks(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((m) => m[1]).filter(isPageLink);
}

export function main(exportRoot) {
  if (!exportRoot) usage();
  const distIndex = path.join(exportRoot, "dist", "index.html");
  if (!existsSync(distIndex)) {
    console.error(`no dist/index.html under ${exportRoot} — run the partner's \`npm run build\` in their export first`);
    process.exit(1);
  }
  const distRoot = path.dirname(distIndex);
  const source = readFileSync(distIndex, "utf8");

  const assets = collectAssetRefs(source);
  const missing = assets.filter((ref) => !existsSync(path.join(distRoot, ref)));
  if (missing.length) {
    console.error("referenced assets missing from the export:", missing.join(", "));
    process.exit(1);
  }

  // Assets referenced from the stylesheet(s), one level deep.
  for (const css of assets.filter((ref) => ref.endsWith(".css"))) {
    const cssDir = path.posix.dirname(css);
    const cssText = readFileSync(path.join(distRoot, css), "utf8");
    for (const m of cssText.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
      const ref = m[1].split(/[?#]/)[0];
      if (/^(https?:|data:|\/)/.test(ref)) continue;
      const resolved = path.posix.normalize(path.posix.join(cssDir, ref));
      if (existsSync(path.join(distRoot, resolved))) assets.push(resolved);
    }
  }

  const { html, pageLinks, hostLinks, robotsChanged } = rewriteHtml(source);
  const leftovers = remainingRelativePageLinks(html);
  if (leftovers.length) {
    console.error("relative page links survived the rewrite:", leftovers.join(", "));
    process.exit(1);
  }

  rmSync(TARGET_DIR, { recursive: true, force: true });
  mkdirSync(TARGET_DIR, { recursive: true });
  let bytes = 0;
  for (const ref of [...new Set(assets)]) {
    const from = path.join(distRoot, ref);
    const to = path.join(TARGET_DIR, ref);
    mkdirSync(path.dirname(to), { recursive: true });
    cpSync(from, to);
    bytes += statSync(to).size;
  }
  writeFileSync(path.join(TARGET_DIR, "index.html"), html, "utf8");
  bytes += Buffer.byteLength(html);

  const files = (function walk(dir, acc = []) {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full, acc);
      else acc.push(full);
    }
    return acc;
  })(TARGET_DIR).length;

  console.log(JSON.stringify({
    source: distIndex,
    target: path.relative(process.cwd(), TARGET_DIR),
    files,
    bytes,
    pageLinksRewritten: pageLinks,
    hostLinksNormalised: hostLinks,
    robotsSetToNoindex: robotsChanged,
    liveOrigin: LIVE_ORIGIN,
  }));
}

if (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv[2]);
