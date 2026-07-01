import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/seo/site";
import { UNIVERSITY_INFO } from "@/lib/shared/university";

const siteUrl = SITE_IDENTITY.canonicalBaseUrl;
const siteName = SITE_IDENTITY.siteName;
export const SEO_TITLE_BRAND = "Stmarys University";
const TITLE_SEPARATOR = " | ";
const MAX_SEO_TITLE_LENGTH = 60;
const MAX_META_DESCRIPTION_LENGTH = 160;
const HOME_PATHNAMES = new Set(["", "/"]);

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const trimAtWord = (value: string, maxLength: number) => {
  const normalized = normalizeWhitespace(value);
  if (normalized.length <= maxLength) return normalized;
  const clipped = normalized.slice(0, maxLength).replace(/\s+\S*$/, "");
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
  const primary = trimAtWord(normalizePrimaryTitle(title), 50);
  const normalizedPathname = normalizePathname(pathname);

  // Keep the homepage as the broad brand-intent landing page.
  // Brand-like subpages must retain their own intent-specific titles so that
  // approvals, admissions, facts, and other official pages do not all collapse
  // into the same SERP title.
  if (
    HOME_PATHNAMES.has(normalizedPathname) &&
    /^(?:St\.?\s*Mary'?s|Stmarys)\s+University/i.test(primary)
  ) {
    return "Stmarys University | Private University in Hyderabad";
  }

  if (primary.toLowerCase().endsWith(SEO_TITLE_BRAND.toLowerCase())) {
    return trimAtWord(primary, MAX_SEO_TITLE_LENGTH);
  }

  const maxPrimaryLength = MAX_SEO_TITLE_LENGTH - TITLE_SEPARATOR.length - SEO_TITLE_BRAND.length;
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
  keywords = [],
  imagePath = UNIVERSITY_INFO.defaultOgImage,
}: {
  title: string;
  description: string;
  pathname: string;
  robots?: string;
  keywords?: string[];
  imagePath?: string;
}): Metadata {
  const canonical = absoluteUrl(pathname);
  const normalizedTitle = normalizeTitle(title, pathname);
  const normalizedDescription = formatMetaDescription(description);
  const ogImage = absoluteUrl(imagePath);
  const baseKeywords = [
    ...SITE_IDENTITY.alternateNames,
    UNIVERSITY_INFO.brandName,
    "private university in Telangana",
    "university in Hyderabad",
    "admissions",
    "courses",
    "eligibility",
    "fees",
    "placements",
    "health sciences",
    "law",
    "pharmacy",
    "engineering",
    "management",
    "rehabilitation",
    "emerging technologies",
  ];

  return {
    title: normalizedTitle,
    description: normalizedDescription,
    keywords: Array.from(new Set([...baseKeywords, ...keywords])),
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
          type: "image/jpeg",
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
