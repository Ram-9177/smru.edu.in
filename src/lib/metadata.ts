import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/seo/site";
import { UNIVERSITY_INFO } from "@/lib/shared/university";

const siteUrl = SITE_IDENTITY.canonicalBaseUrl;
const siteName = SITE_IDENTITY.siteName;
export const SEO_TITLE_BRAND = "St. Mary's University";
// Pages whose <title> is fixed verbatim (entity pages); the brand suffix is not appended.
const EXACT_TITLES: Record<string, string> = {
  "/": "St. Mary's University Hyderabad (SMRU) – Official Site",
  "/smru": "SMRU – St. Mary's Rehabilitation University, Hyderabad",
};
const TITLE_SEPARATOR = " | ";
// Formula: primary ≤ 41 chars + " | St. Mary's University" (24) = ≤ 65 total.
const MAX_SEO_TITLE_LENGTH = 65;
const MAX_META_DESCRIPTION_LENGTH = 155;
// A trimmed title must never end on one of these.
const DANGLING_TITLE_WORDS = new Set(["in", "for", "with", "of", "and", "to", "at", "on", "by", "or", "&", "the", "a", "an", "vs", "from", "into"]);
const HOME_PATHNAMES = new Set(["", "/"]);

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const stripDanglingWords = (value: string) => {
  const words = value.split(" ");
  while (words.length > 1 && DANGLING_TITLE_WORDS.has(words[words.length - 1].toLowerCase())) words.pop();
  return words.join(" ").replace(/[,\-:;|&–—(\s]+$/, "");
};

// Word-safe trim that never cuts mid-phrase: prefers the last clause boundary (":", "–", ",")
// inside the limit, then the last whole word, and never ends on a preposition/conjunction.
export const trimAtWord = (value: string, maxLength: number) => {
  const normalized = normalizeWhitespace(value);
  if (normalized.length <= maxLength) return normalized;
  const window = normalized.slice(0, maxLength + 1);
  const clauseBreak = Math.max(window.lastIndexOf(": "), window.lastIndexOf(" – "), window.lastIndexOf(" — "), window.lastIndexOf(", "));
  const clause = clauseBreak >= Math.floor(maxLength * 0.55) ? stripDanglingWords(window.slice(0, clauseBreak)) : "";
  if (clause && clause.length <= maxLength) return clause;
  const clipped = stripDanglingWords(normalized.slice(0, maxLength).replace(/\s+\S*$/, ""));
  return clipped || normalized.slice(0, maxLength).trim();
};

const normalizePrimaryTitle = (title: string) => {
  const primary = normalizeWhitespace(title.replace(/[’]/g, "'").split("|")[0] || "");
  if (!primary) return SEO_TITLE_BRAND;
  return primary;
};

const normalizePathname = (pathname = "/") => {
  const path = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return path || "/";
};

export const formatSeoTitle = (title: string, pathname = "/") => {
  const normalizedPathname = normalizePathname(pathname);
  const maxTitleLength = MAX_SEO_TITLE_LENGTH;
  const maxPrimaryLength = maxTitleLength - TITLE_SEPARATOR.length - SEO_TITLE_BRAND.length;
  const primary = trimAtWord(normalizePrimaryTitle(title), maxPrimaryLength);

  // Entity pages carry a fixed title; brand-like subpages keep their own
  // intent-specific titles so approvals, admissions and facts pages do not all
  // collapse into the same SERP title.
  const exactTitle = EXACT_TITLES[normalizedPathname];
  if (exactTitle && (HOME_PATHNAMES.has(normalizedPathname) ? /^(?:St\.?\s*Mary'?s\s+University|SMRU)/i.test(primary) : true)) {
    return exactTitle;
  }

  if (primary.toLowerCase().endsWith(SEO_TITLE_BRAND.toLowerCase())) {
    return trimAtWord(primary, maxTitleLength);
  }

  const standardPrimary = trimAtWord(primary, maxPrimaryLength);
  return `${standardPrimary}${TITLE_SEPARATOR}${SEO_TITLE_BRAND}`;
};

// A description must read as a finished thought in the SERP: it ends at a sentence boundary when a
// sentence of useful length fits, otherwise at a whole word, never on a preposition/conjunction/comma,
// and always with terminal punctuation. (A hard character cap produced "…clinical learning, and".)
const MIN_SENTENCE_CUT = 80;
export const formatMetaDescription = (description: string) => {
  const normalized = normalizeWhitespace((description || "").replace(/\s*\.\.\.$/, ""));
  if (!normalized) return "";
  const finish = (value: string) => (/[.!?]$/.test(value) ? value : `${value.replace(/[,;:\-–—(\s]+$/, "")}.`);
  if (normalized.length <= MAX_META_DESCRIPTION_LENGTH) return finish(normalized);
  // A sentence ending at index i yields i+1 chars, so the search window is exactly the cap.
  const window = normalized.slice(0, MAX_META_DESCRIPTION_LENGTH);
  let sentenceEnd = -1;
  for (const match of window.matchAll(/[.!?](?=\s|$)/g)) {
    // Skip abbreviations ("B.Sc.", "St.", "Ph.D.", "Hons.") — a sentence ends after a real word.
    const before = window.slice(0, match.index);
    if (/(?:^|[\s(])(?:[A-Z][A-Za-z]?|Mrs|Prof|Hons|Ph\.D|[BM]\.?[A-Z][a-z]*|LL\.?[BM]|No|vs|etc)$/.test(before)) continue;
    if (match.index !== undefined && match.index + 1 >= MIN_SENTENCE_CUT) sentenceEnd = match.index + 1;
  }
  if (sentenceEnd > 0) return normalized.slice(0, sentenceEnd).trim();
  return finish(trimAtWord(normalized, MAX_META_DESCRIPTION_LENGTH - 1));
};

/** First candidate that fits the primary-title budget (41 chars); falls back to a word-safe trim of the last one. */
export const pickTitleCandidate = (candidates: string[]) => {
  const limit = MAX_SEO_TITLE_LENGTH - TITLE_SEPARATOR.length - SEO_TITLE_BRAND.length;
  const fit = candidates.map(normalizeWhitespace).find((candidate) => candidate.length <= limit);
  return fit || trimAtWord(candidates[candidates.length - 1], limit);
};

const normalizeTitle = (title: string, pathname = "/") => {
  return formatSeoTitle(title, pathname);
};

/**
 * Returns an absolute URL with a trailing slash, matching next.config.mjs trailingSlash: true.
 * This prevents canonical vs. actual URL mismatch (duplicate content risk).
 */
export function absoluteUrl(pathname = "/") {
  const url = new URL(pathname, siteUrl);
  // Ensure trailing slash for all non-asset paths (assets have extensions)
  const isAsset = /\.[a-z0-9]+$/i.test(url.pathname);
  if (!isAsset && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  robots = "index,follow",
  // Accepted for call-site compatibility but never emitted: no engine uses the
  // keywords meta tag, and the old term lists leaked misspellings into markup.
  keywords: _keywords = [],
  imagePath = UNIVERSITY_INFO.defaultOgImage,
}: {
  title: string;
  description: string;
  pathname: string;
  robots?: string;
  keywords?: string[];
  imagePath?: string;
}): Metadata {
  void _keywords;
  const canonical = absoluteUrl(pathname);
  const normalizedTitle = normalizeTitle(title, pathname);
  const normalizedDescription = formatMetaDescription(description);
  const ogImage = absoluteUrl(imagePath);
  const ogImageExtension = new URL(ogImage).pathname.split(".").pop()?.toLowerCase();
  const ogImageType =
    ogImageExtension === "png"
      ? "image/png"
      : ogImageExtension === "jpg" || ogImageExtension === "jpeg"
        ? "image/jpeg"
        : "image/webp";
  return {
    title: normalizedTitle,
    description: normalizedDescription,
    alternates: {
      canonical,
      // The site serves English speakers everywhere (one URL set, no translations).
      // en-IN / en / x-default all point at the same canonical so Google treats the page
      // as English-global rather than India-only.
      languages: {
        "en-IN": canonical,
        en: canonical,
        "x-default": canonical,
      },
    },
    robots,
    openGraph: {
      title: normalizedTitle,
      description: normalizedDescription,
      url: canonical,
      type: "website",
      siteName,
      images: [
        {
          url: ogImage,
          alt: UNIVERSITY_INFO.brandName,
          width: 1200,
          height: 630,
          type: ogImageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description: normalizedDescription,
      images: [ogImage],
    },
  };
}
