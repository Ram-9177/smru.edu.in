import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeHtml,
  collectJsonLdRootTypes,
  collectJsonLdTypes,
  computeGates,
  countBrandNoSpace,
  crossCheckSitemap,
  decodeEntities,
  extractJsonLdBlocks,
  getLinks,
  getMetaContent,
  outerMain,
  parseAttributes,
  parseSitemapLocs,
  sitemapLocToRelativeFile,
  urlPathFromRelativeFile,
  visibleText,
  wordCount,
} from "../scripts/crawl-helpers.mjs";

test("decodeEntities handles hex, decimal and named entities and leaves unknown ones alone", () => {
  assert.equal(
    decodeEntities("St.Mary&#x27;s &amp; &#39;x&#39; &quot;q&quot; John&#8217;s&nbsp;&ndash; &zzz;"),
    "St.Mary's & 'x' \"q\" John’s – &zzz;"
  );
  assert.equal(decodeEntities(""), "");
});

test("parseAttributes is order-independent and tolerates quoting styles and boolean attributes", () => {
  const attrs = parseAttributes(`<meta content="St. Mary&#x27;s" NAME='description' data-x=plain hidden />`);
  assert.deepEqual(attrs, { content: "St. Mary's", name: "description", "data-x": "plain", hidden: "" });
});

test("getMetaContent finds name= and property= metas regardless of attribute order", () => {
  const html = `<head><meta content="Desc here" name="description"><meta property="og:title" content="OG"></head>`;
  assert.equal(getMetaContent(html, "description"), "Desc here");
  assert.equal(getMetaContent(html, "og:title"), "OG");
  assert.equal(getMetaContent(html, "keywords"), "");
});

test("getLinks returns canonical and hreflang alternates", () => {
  const html = `<link href="https://smru.edu.in/a/" rel="canonical"/><link rel="alternate" hreflang="en-IN" href="https://smru.edu.in/a/"><link rel="alternate" type="application/rss+xml" href="/feed">`;
  assert.deepEqual(getLinks(html, "canonical"), [{ href: "https://smru.edu.in/a/", hreflang: "" }]);
  assert.deepEqual(getLinks(html, "alternate").map((link) => link.hreflang), ["en-IN", ""]);
});

test("extractJsonLdBlocks accepts any attribute order, ignores other scripts and reports invalid JSON", () => {
  const html = [
    `<script id="x" type="application/ld+json">{"@type":"WebPage"}</script>`,
    `<script type='application/ld+json'>{"@type":["Organization","CollegeOrUniversity"]}</script>`,
    `<script type="module">export {}</script>`,
    `<script type="application/ld+json">{not json}</script>`,
  ].join("");
  const blocks = extractJsonLdBlocks(html);
  assert.equal(blocks.length, 3);
  assert.deepEqual(blocks[0].data, { "@type": "WebPage" });
  assert.equal(blocks[2].data, null);
  assert.ok(blocks[2].error);
});

test("collectJsonLdTypes reaches nested Course inside ListItem.item and OfferCatalog while root types stay shallow", () => {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ItemList", itemListElement: [{ "@type": "ListItem", item: { "@type": "Course", name: "BPT" } }] },
      { "@type": "Organization", hasOfferCatalog: { "@type": "OfferCatalog", itemListElement: [{ "@type": "Offer", itemOffered: { "@type": "Course" } }] } },
      { "@type": ["WebPage", "CollectionPage"] },
    ],
  };
  assert.deepEqual([...collectJsonLdTypes(data)].sort(), ["CollectionPage", "Course", "ItemList", "ListItem", "Offer", "OfferCatalog", "Organization", "WebPage"]);
  assert.deepEqual([...collectJsonLdRootTypes(data)].sort(), ["CollectionPage", "ItemList", "Organization", "WebPage"]);
});

test("outerMain is depth-aware and visibleText strips chrome, scripts and entities", () => {
  const html = `<body><nav>Home About Contact</nav><main class="shell"><main><h1>Title</h1><p>one two &amp; three</p></main><script>ignored words here</script></main><footer>Footer words</footer></body>`;
  const main = outerMain(html);
  assert.ok(main.startsWith("<main>"));
  assert.equal(visibleText(main), "Title one two & three");
  assert.equal(wordCount(visibleText(main)), 5);
  assert.equal(wordCount(visibleText(html)), 10);
  assert.equal(outerMain("<body><p>no main</p></body>"), null);
});

test("countBrandNoSpace catches the misspelling and not the standard spelling", () => {
  assert.equal(countBrandNoSpace("St.Mary's University and St.Marys and St.Mary’s"), 3);
  assert.equal(countBrandNoSpace("St. Mary's University (SMRU)"), 0);
});

test("analyzeHtml decodes the title, counts h1s, reads lang, hreflang, robots and keywords", () => {
  const html = `<!DOCTYPE html><html lang="en"><head><title>St.Mary&#x27;s University | Private University</title>
    <meta name="description" content="A &amp; B"><meta content="index, follow" name="robots"><meta name="keywords" content="a, b">
    <link rel="alternate" hreflang="en-IN" href="https://smru.edu.in/x/"><link rel="canonical" href="https://smru.edu.in/x/">
    <script type="application/ld+json">{"@type":"FAQPage","mainEntity":[{"@type":"Question"}]}</script></head>
    <body><main><h1>First</h1><h1>Second</h1><p>St.Mary's body copy</p></main></body></html>`;
  const result = analyzeHtml(html);
  assert.equal(result.title, "St.Mary's University | Private University");
  assert.equal(result.titleLength, 41);
  assert.equal(result.description, "A & B");
  assert.equal(result.robots, "index,follow");
  assert.equal(result.lang, "en");
  assert.deepEqual(result.hreflang, ["en-IN"]);
  assert.equal(result.h1Count, 2);
  assert.equal(result.h1, "First");
  assert.equal(result.keywordsMeta, true);
  assert.equal(result.canonical, "https://smru.edu.in/x/");
  assert.equal(result.brandNoSpaceCount, 2);
  assert.deepEqual(result.jsonLdTypes, ["FAQPage", "Question"]);
  assert.equal(result.mainWordCount, 5);
});

test("urlPathFromRelativeFile and sitemapLocToRelativeFile agree on the served path mapping", () => {
  assert.equal(urlPathFromRelativeFile("index.html"), "/");
  assert.equal(urlPathFromRelativeFile("a/b/index.html"), "/a/b/");
  assert.equal(urlPathFromRelativeFile("404.html"), "/404.html");
  assert.equal(sitemapLocToRelativeFile("https://smru.edu.in/"), "index.html");
  assert.equal(sitemapLocToRelativeFile("https://smru.edu.in/a/b/"), "a/b/index.html");
  assert.equal(sitemapLocToRelativeFile("https://smru.edu.in/x.pdf"), "x.pdf");
  assert.equal(sitemapLocToRelativeFile("https://smru.edu.in/no-slash"), "no-slash/index.html");
  assert.equal(sitemapLocToRelativeFile("not a url"), null);
});

test("parseSitemapLocs handles urlset and sitemapindex and crossCheckSitemap reports missing files", () => {
  const urlset = `<urlset><url><loc>https://smru.edu.in/</loc></url><url><loc>https://smru.edu.in/a/?x=1&amp;y=2</loc></url><url><loc>https://smru.edu.in/missing/</loc></url></urlset>`;
  const parsed = parseSitemapLocs(urlset);
  assert.deepEqual(parsed.children, []);
  assert.equal(parsed.urls[1], "https://smru.edu.in/a/?x=1&y=2");
  const index = parseSitemapLocs(`<sitemapindex><sitemap><loc>https://smru.edu.in/sitemap-pages.xml</loc></sitemap></sitemapindex>`);
  assert.deepEqual(index, { urls: [], children: ["https://smru.edu.in/sitemap-pages.xml"] });
  const existing = new Set(["index.html", "a/index.html"]);
  const { present, missing } = crossCheckSitemap(parsed.urls, (file) => existing.has(file));
  assert.equal(present.size, 2);
  assert.deepEqual(missing, ["https://smru.edu.in/missing/"]);
});

const record = (overrides) => ({
  url: "https://smru.edu.in/p/",
  path: "/p/",
  status: 200,
  inSitemap: true,
  title: "Fine title | Brand",
  titleLength: 18,
  description: "x".repeat(130),
  descriptionLength: 130,
  canonical: "https://smru.edu.in/p/",
  robots: "index,follow",
  lang: "en",
  hreflang: [],
  h1: "H",
  h1Count: 1,
  keywordsMeta: false,
  bodyWordCount: 500,
  mainWordCount: 300,
  brandNoSpaceCount: 0,
  jsonLdTypes: ["WebPage"],
  jsonLdRootTypes: ["WebPage"],
  jsonLdBlocks: 1,
  jsonLdErrors: 0,
  file: "p/index.html",
  ...overrides,
});

test("computeGates passes a clean record set", () => {
  const { failures, metrics } = computeGates([record({}), record({ url: "https://smru.edu.in/q/", path: "/q/", title: "Other | Brand", file: "q/index.html", canonical: "https://smru.edu.in/q/" })]);
  assert.deepEqual(failures, []);
  assert.equal(metrics.pages, 2);
  assert.equal(metrics.sitemapMissing, 0);
});

test("computeGates names every failing gate on a dirty record set", () => {
  const dirty = [
    record({ title: "Best Private University in | Brand", titleLength: 70 }),
    record({ url: "https://smru.edu.in/dup1/", path: "/dup1/", file: "dup1/index.html", canonical: "https://smru.edu.in/dup1/", title: "Same" }),
    record({ url: "https://smru.edu.in/dup2/", path: "/dup2/", file: "dup2/index.html", canonical: "https://smru.edu.in/dup2/", title: "Same" }),
    record({ url: "https://smru.edu.in/g/", path: "/g/", file: "g/index.html", canonical: "https://smru.edu.in/g/", title: "BPO Course Guide Guide", brandNoSpaceCount: 3, h1Count: 0, lang: "en-IN", keywordsMeta: true }),
    record({ url: "https://smru.edu.in/n/", path: "/n/", file: "n/index.html", canonical: "https://smru.edu.in/other/", robots: "noindex,follow" }),
    record({ url: "https://smru.edu.in/missing/", path: "/missing/", file: "", status: 404, title: "", titleLength: 0 }),
  ];
  const { failures, warnings } = computeGates(dirty);
  const gates = failures.map((failure) => failure.gate);
  for (const expected of ["sitemapMissing", "sitemapNoindex", "sitemapCanonicalMismatch", "titlesOver65", "duplicateTitles", "guideGuide", "truncatedTitles", "brandNoSpace", "missingH1"]) {
    assert.ok(gates.includes(expected), `expected gate ${expected} in ${gates.join(",")}`);
  }
  assert.ok(warnings.some((warning) => warning.gate === "keywordsMetaPresent"));
  assert.ok(warnings.some((warning) => warning.gate === "langNotEn"), "lang is a warning until Phase 6");
  assert.ok(computeGates(dirty, { strictLang: true }).failures.some((failure) => failure.gate === "langNotEn"));
  assert.equal(failures.find((failure) => failure.gate === "duplicateTitles").pages, 2);
  const strictKeywords = computeGates(dirty, { expectKeywordsMeta: false });
  assert.ok(strictKeywords.failures.some((failure) => failure.gate === "keywordsMetaPresent"));
});
