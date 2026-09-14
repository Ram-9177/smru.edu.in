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
const MAX_SEO_TITLE_LENGTH = 60;
const MAX_PROGRAM_SEO_TITLE_LENGTH = 82;
const MAX_META_DESCRIPTION_LENGTH = 160;
const HOME_PATHNAMES = new Set(["", "/"]);
const PROGRAM_DETAIL_PATHNAME = /^\/schools\/[^/]+\/[^/]+\/[^/]+$/;

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const trimAtWord = (value: string, maxLength: number) => {
  const normalized = normalizeWhitespace(value);
  if (normalized.length <= maxLength) return normalized;
  const clipped = normalized
    .slice(0, maxLength)
    .replace(/\s+\S*$/, "")
    .replace(/[,\-:;|&\s]+$/, "");
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
  const maxTitleLength = PROGRAM_DETAIL_PATHNAME.test(normalizedPathname)
    ? MAX_PROGRAM_SEO_TITLE_LENGTH
    : MAX_SEO_TITLE_LENGTH;
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

export const formatMetaDescription = (description: string) =>
  trimAtWord(description || "", MAX_META_DESCRIPTION_LENGTH);

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
