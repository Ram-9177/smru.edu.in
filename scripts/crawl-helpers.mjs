// Pure, filesystem-free helpers for the static-export crawl harness.
// Used by scripts/crawl-export.mjs, scripts/seo-gates.mjs and tests/crawl-helpers.test.mjs.

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  copy: "©",
  reg: "®",
  trade: "™",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  middot: "·",
  bull: "•",
};

export function decodeEntities(text) {
  if (!text) return "";
  return String(text).replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (whole, body) => {
    if (body[0] === "#") {
      const isHex = body[1] === "x" || body[1] === "X";
      const code = parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named === undefined ? whole : named;
  });
}

// '<meta content="x" NAME=\'description\' hidden>' -> { content: "x", name: "description", hidden: "" }
export function parseAttributes(tagSource) {
  const result = {};
  const body = String(tagSource)
    .replace(/^<\s*[a-zA-Z][\w:-]*/, "")
    .replace(/\/?>\s*$/, "");
  const pattern = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of body.matchAll(pattern)) {
    const key = match[1].toLowerCase();
    const raw = match[2] ?? match[3] ?? match[4] ?? "";
    result[key] = decodeEntities(raw);
  }
  return result;
}

export function findVoidTags(html, tagName) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return [...String(html).matchAll(pattern)].map((match) => ({ raw: match[0], attrs: parseAttributes(match[0]) }));
}

export function findElements(html, tagName) {
  const pattern = new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}\\s*>`, "gi");
  return [...String(html).matchAll(pattern)].map((match) => ({
    raw: match[0],
    attrs: parseAttributes(`<${tagName}${match[1]}>`),
    inner: match[2],
  }));
}

export function getMetaContent(html, name) {
  const wanted = String(name).toLowerCase();
  for (const tag of findVoidTags(html, "meta")) {
    const key = (tag.attrs.name ?? tag.attrs.property ?? "").toLowerCase();
    if (key === wanted) return tag.attrs.content ?? "";
  }
  return "";
}

export function getLinks(html, rel) {
  const wanted = String(rel).toLowerCase();
  return findVoidTags(html, "link")
    .filter((tag) => (tag.attrs.rel ?? "").toLowerCase().split(/\s+/).includes(wanted))
    .map((tag) => ({ href: tag.attrs.href ?? "", hreflang: tag.attrs.hreflang ?? "" }));
}

export function getHtmlLang(html) {
  const [tag] = findVoidTags(html, "html");
  return tag ? tag.attrs.lang ?? "" : "";
}

// Inner HTML of the outermost <main>, or null when the page has none.
// The app shell wraps every page in <main> and many views nest a second one, so depth is tracked.
export function outerMain(html) {
  const source = String(html);
  const tokens = /<main\b[^>]*>|<\/main\s*>/gi;
  let depth = 0;
  let start = -1;
  for (const match of source.matchAll(tokens)) {
    const isOpen = match[0][1] !== "/";
    if (isOpen) {
      if (depth === 0) start = match.index + match[0].length;
      depth += 1;
    } else if (depth > 0) {
      depth -= 1;
      if (depth === 0) return source.slice(start, match.index);
    }
  }
  return start >= 0 ? source.slice(start) : null;
}

export function visibleText(html) {
  return decodeEntities(
    String(html)
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(text) {
  const trimmed = String(text ?? "").trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

// Catches "St.Mary's", "St.Mary’s" and "St.Marys" (no space after the dot); "St. Mary's" does not match.
export function countBrandNoSpace(text) {
  return (String(text ?? "").match(/St\.Mary/g) || []).length;
}

export function extractJsonLdBlocks(html) {
  return findElements(html, "script")
    .filter((script) => (script.attrs.type ?? "").toLowerCase() === "application/ld+json")
    .map((script) => {
      try {
        return { data: JSON.parse(script.inner), error: null };
      } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : String(error) };
      }
    });
}

const addType = (value, out) => {
  if (Array.isArray(value)) value.forEach((entry) => typeof entry === "string" && out.add(entry));
  else if (typeof value === "string") out.add(value);
};

// Every @type at any depth (ListItem.item, hasOfferCatalog.itemListElement[].itemOffered, ...).
export function collectJsonLdTypes(node, out = new Set()) {
  if (Array.isArray(node)) {
    node.forEach((entry) => collectJsonLdTypes(entry, out));
  } else if (node && typeof node === "object") {
    if (node["@type"] !== undefined) addType(node["@type"], out);
    for (const [key, value] of Object.entries(node)) {
      if (key !== "@type" && value && typeof value === "object") collectJsonLdTypes(value, out);
    }
  }
  return out;
}

// Top-level and @graph members only — the shape the page author intended as its primary entities.
export function collectJsonLdRootTypes(node, out = new Set()) {
  if (Array.isArray(node)) {
    node.forEach((entry) => collectJsonLdRootTypes(entry, out));
  } else if (node && typeof node === "object") {
    if (node["@type"] !== undefined) addType(node["@type"], out);
    if (Array.isArray(node["@graph"])) node["@graph"].forEach((entry) => collectJsonLdRootTypes(entry, out));
  }
  return out;
}

export function analyzeHtml(html) {
  const source = String(html);
  const titles = findElements(source, "title");
  const title = titles.length ? visibleText(titles[0].inner) : "";
  const description = decodeEntities(getMetaContent(source, "description")).replace(/\s+/g, " ").trim();
  const [canonical] = getLinks(source, "canonical");
  const h1s = findElements(source, "h1").map((h1) => visibleText(h1.inner));
  const bodyMatch = source.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i);
  const bodyText = visibleText(bodyMatch ? bodyMatch[1] : source);
  const main = outerMain(source);
  const mainText = main === null ? null : visibleText(main);
  const jsonLd = extractJsonLdBlocks(source);
  const types = new Set();
  const rootTypes = new Set();
  jsonLd.forEach((block) => {
    if (block.data !== null) {
      collectJsonLdTypes(block.data, types);
      collectJsonLdRootTypes(block.data, rootTypes);
    }
  });

  return {
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical: canonical ? canonical.href : "",
    robots: getMetaContent(source, "robots").replace(/\s+/g, "").toLowerCase(),
    lang: getHtmlLang(source),
    hreflang: getLinks(source, "alternate")
      .filter((link) => link.hreflang)
      .map((link) => link.hreflang),
    h1: h1s[0] ?? "",
    h1Count: h1s.length,
    keywordsMeta: getMetaContent(source, "keywords") !== "",
    bodyWordCount: wordCount(bodyText),
    mainWordCount: mainText === null ? null : wordCount(mainText),
    brandNoSpaceCount: countBrandNoSpace(title) + h1s.reduce((sum, h1) => sum + countBrandNoSpace(h1), 0) + countBrandNoSpace(bodyText),
    jsonLdTypes: [...types].sort(),
    jsonLdRootTypes: [...rootTypes].sort(),
    jsonLdBlocks: jsonLd.length,
    jsonLdErrors: jsonLd.filter((block) => block.error).length,
  };
}

// out/ relative file -> served URL path. index.html -> "/", a/b/index.html -> "/a/b/", x.html -> "/x.html".
export function urlPathFromRelativeFile(relPath) {
  const normalized = String(relPath).replaceAll("\\", "/");
  if (normalized === "index.html") return "/";
  if (normalized.endsWith("/index.html")) return `/${normalized.slice(0, -"index.html".length)}`;
  return `/${normalized}`;
}

// Handles both <urlset> and <sitemapindex>; <loc> text is entity-decoded.
export function parseSitemapLocs(xml) {
  const source = String(xml);
  const locs = [...source.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((match) => decodeEntities(match[1]).trim());
  const isIndex = /<sitemapindex\b/i.test(source);
  return { urls: isIndex ? [] : locs, children: isIndex ? locs : [] };
}

export function sitemapLocToRelativeFile(loc) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(loc).pathname);
  } catch {
    return null;
  }
  const clean = pathname.replace(/^\/+/, "");
  if (!clean) return "index.html";
  if (pathname.endsWith("/")) return `${clean}index.html`;
  if (/\.[a-z0-9]+$/i.test(clean)) return clean;
  return `${clean}/index.html`;
}

export function crossCheckSitemap(locs, exists) {
  const present = new Set();
  const missing = [];
  for (const loc of locs) {
    const file = sitemapLocToRelativeFile(loc);
    if (file && exists(file)) present.add(loc);
    else missing.push(loc);
  }
  return { present, missing };
}

export const GATE_THRESHOLDS = {
  maxTitleLength: 65,
  maxDescriptionLength: 155,
  minDescriptionLength: 120,
  requiredLang: "en",
  expectKeywordsMeta: true, // flips to false once Phase 1 removes the keywords tag
  strictLang: false, // flips to true once Phase 6 sets <html lang="en">
};

const TRUNCATED_TITLE = /\b(in|for|with|of|and|to|at|on|by|or|&)\s*\|/i;
// Search-engine verification files (google*.html) are served but are not pages.
const isVerificationFile = (record) => /^google[0-9a-f]+\.html$/i.test(record.file ?? "");
const isIndexable = (record) => record.status === 200 && !isVerificationFile(record) && !String(record.robots ?? "").includes("noindex");
const example = (record) => record.path ?? record.url;

// records: the objects produced by crawlRecords() (camelCase keys, one row per HTML file plus synthetic sitemap rows).
export function computeGates(records, thresholds = GATE_THRESHOLDS) {
  const limits = { ...GATE_THRESHOLDS, ...thresholds };
  const pages = records.filter((record) => record.file && !isVerificationFile(record));
  const indexable = pages.filter(isIndexable);
  const sitemapRows = records.filter((record) => record.inSitemap);
  const failures = [];
  const warnings = [];
  const push = (list, gate, matches, label = example) => {
    if (matches.length) list.push({ gate, count: matches.length, examples: matches.slice(0, 10).map(label) });
  };

  push(failures, "sitemapMissing", records.filter((record) => record.inSitemap && record.status !== 200));
  push(failures, "sitemapNoindex", sitemapRows.filter((record) => record.status === 200 && String(record.robots ?? "").includes("noindex")));
  push(failures, "sitemapCanonicalMismatch", sitemapRows.filter((record) => record.status === 200 && record.canonical && record.canonical !== record.url));
  push(failures, "titlesOver65", indexable.filter((record) => record.titleLength > limits.maxTitleLength));

  const titleGroups = new Map();
  indexable.forEach((record) => {
    if (!record.title) return;
    titleGroups.set(record.title, [...(titleGroups.get(record.title) || []), record]);
  });
  const duplicateGroups = [...titleGroups.entries()].filter(([, group]) => group.length > 1);
  if (duplicateGroups.length) {
    failures.push({
      gate: "duplicateTitles",
      count: duplicateGroups.length,
      pages: duplicateGroups.reduce((sum, [, group]) => sum + group.length, 0),
      examples: duplicateGroups.slice(0, 10).map(([title, group]) => `${title} (${group.length})`),
    });
  }

  push(failures, "guideGuide", pages.filter((record) => /Guide Guide/.test(record.title)));
  push(failures, "truncatedTitles", indexable.filter((record) => TRUNCATED_TITLE.test(record.title)));
  push(failures, "brandNoSpace", pages.filter((record) => record.brandNoSpaceCount > 0 || countBrandNoSpace(record.description) > 0));
  push(failures, "descriptionsOver155", indexable.filter((record) => record.descriptionLength > limits.maxDescriptionLength));
  push(warnings, "descriptionsUnder120", indexable.filter((record) => record.descriptionLength < limits.minDescriptionLength));
  push(failures, "missingH1", indexable.filter((record) => record.h1Count === 0));
  push(failures, "multipleH1", indexable.filter((record) => record.h1Count > 1));
  push(failures, "missingCanonical", indexable.filter((record) => !record.canonical));
  push(failures, "jsonLdErrors", pages.filter((record) => record.jsonLdErrors > 0));
  push(limits.strictLang ? failures : warnings, "langNotEn", pages.filter((record) => record.lang !== limits.requiredLang));
  push(limits.expectKeywordsMeta ? warnings : failures, "keywordsMetaPresent", pages.filter((record) => record.keywordsMeta));

  const metrics = {
    pages: pages.length,
    indexable: indexable.length,
    noindex: pages.length - indexable.filter((record) => record.status === 200).length,
    sitemapUrls: sitemapRows.length,
    sitemapMissing: records.filter((record) => record.inSitemap && record.status !== 200).length,
    titlesOver65: indexable.filter((record) => record.titleLength > limits.maxTitleLength).length,
    duplicateTitleGroups: duplicateGroups.length,
    guideGuide: pages.filter((record) => /Guide Guide/.test(record.title)).length,
    brandNoSpaceOccurrences: pages.reduce((sum, record) => sum + record.brandNoSpaceCount + countBrandNoSpace(record.description), 0),
    keywordsMetaPages: pages.filter((record) => record.keywordsMeta).length,
    coursePages: pages.filter((record) => (record.jsonLdTypes ?? []).includes("Course")).length,
    faqPages: pages.filter((record) => (record.jsonLdTypes ?? []).includes("FAQPage")).length,
  };

  return { metrics, failures, warnings };
}
