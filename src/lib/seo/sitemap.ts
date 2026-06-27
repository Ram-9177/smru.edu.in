import type { MetadataRoute } from "next";
import { leaders } from "@/data/leaders";
import { EDU_PARTNERS, schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";
import { COMING_SOON_SCHOOL_SLUGS, SCHOOL_LANDING_PATHS } from "@/lib/shared/school-landing";
import { isRemovedPartnerPageSlug } from "@/lib/shared/partner-pages";
import { INFO_PAGES } from "./info-pages";
import { SHOW_PUBLIC_INFO_PAGES } from "./visibility";
import { INDEXABLE_COMPLIANCE_PAGES, NOINDEX_COMPLIANCE_PATHS } from "../../../data/compliance-pages";
import { INDEXABLE_SEO_PAGES } from "../../../data/seo-pages";

// Canonical sitemap host: HTTPS-only, non-www. HTTP and www are redirected in
// public/.htaccess, so sitemap loc values must stay on this origin.
const base = "https://smru.edu.in";

// Current public review baseline for main university pages.
const LAST_MODIFIED = new Date("2026-05-15");

// Tier 1: Conversion & Trust pages - highest priority after homepage
const tier1Routes = ["/admissions", "/exam-notification", "/phd-admissions", "/schools", "/about", "/contact", "/law"];

// Tier 2: Academic catalogue & campus pages
const tier2Routes = [
  "/academic-structure",
  "/campus-360",
  "/brochure",
  "/careers",
  "/partner",
  "/mandatory-disclosure",
  "/leadership/all",
  "/search",
  "/schools/law",
  "/schools/law/legal-studies",
];

// Tier 3: Legal & utility pages - included for crawlability, low priority
const tier3Routes = [
  "/privacy-policy",
  "/terms-of-service",
  "/anti-ragging",
  "/refund-policy",
  "/admission-policy",
  "/approvals-recognitions",
  "/departments",
  "/niat",
  "/qtst",
  "/niat-upskilling",
  "/iiat",
  "/bb",
];

const legacyComplianceInfoPageSlugs = new Set([
  "ugc-disclosure",
  "mandatory-disclosure",
  "statutory-disclosures",
  "naac",
  "iqac-quality-assurance",
  "first-academic-year-disclosures",
  "anti-ragging",
  "grievance-redressal",
  "ombudsperson",
  "public-information",
]);

const infoPageRoutes = SHOW_PUBLIC_INFO_PAGES
  ? INFO_PAGES.map((page) => `/${page.slug}`).filter(
      (path) => !legacyComplianceInfoPageSlugs.has(path.replace(/^\//, "")) && !NOINDEX_COMPLIANCE_PATHS.has(path),
    )
  : [];

const partnerPathFromLandingUrl = (landingUrl?: string | null) => {
  const value = (landingUrl || "").trim();
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  const slug = value.replace(/^\/+/, "").replace(/^partner\//, "").replace(/\/$/, "").toLowerCase();
  return slug && !isRemovedPartnerPageSlug(slug) ? `/partner/${slug}` : null;
};

const partnerRoutes = Object.values(EDU_PARTNERS || {})
  .map((partner: any) => partnerPathFromLandingUrl(partner.landingUrl))
  .filter((path): path is string => Boolean(path));

const schoolLandingRoutes = COMING_SOON_SCHOOL_SLUGS.map((slug) => SCHOOL_LANDING_PATHS[slug]);
const indexableComplianceRoutes = INDEXABLE_COMPLIANCE_PAGES.map((page) => `/${page.section}/${page.slug}`);
const isolatedSeoRoutes = [
  "/html-sitemap",
  "/iqac",
  ...INDEXABLE_SEO_PAGES.map((page) => page.path),
  ...indexableComplianceRoutes,
];

const urlFor = (path: string) => `${base}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;

const dateFor = (value?: string) => {
  const parsed = value ? new Date(value) : LAST_MODIFIED;
  return Number.isNaN(parsed.getTime()) ? LAST_MODIFIED : parsed;
};

const uniqueEntries = (entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap => {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
};

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const schoolRoutes: MetadataRoute.Sitemap = schools.flatMap((school) => {
    const schoolPath = `/schools/${safeSlug(school.slug, school.name)}`;
    const deptRoutes = (school.departments || []).flatMap((dept) => {
      const deptPath = `${schoolPath}/${safeSlug(dept.slug, dept.name)}`;
      const programRoutes: MetadataRoute.Sitemap = (dept.programs || []).map((program) => ({
        url: urlFor(`${deptPath}/${safeSlug(program.slug, program.name)}`),
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
      }));
      return [
        { url: urlFor(deptPath), lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.75 },
        ...programRoutes,
      ];
    });
    return [
      { url: urlFor(schoolPath), lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.85 },
      ...deptRoutes,
    ];
  });

  const leadershipRoutes: MetadataRoute.Sitemap = (leaders || []).map((leader) => ({
    url: urlFor(`/leadership/${leader.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const infoRoutes: MetadataRoute.Sitemap = infoPageRoutes.map((path) => ({
    url: urlFor(path),
    lastModified: dateFor(INFO_PAGES.find((page) => `/${page.slug}` === path)?.lastReviewed),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const partnerEntries: MetadataRoute.Sitemap = partnerRoutes.map((path) => ({
    url: urlFor(path),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const isolatedSeoEntries: MetadataRoute.Sitemap = isolatedSeoRoutes.map((path) => ({
    url: urlFor(path),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: path.includes("/mandatory-disclosure") || path.includes("/iqac") ? 0.6 : 0.4,
  }));

  return uniqueEntries([
    {
      url: urlFor("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...tier1Routes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...tier2Routes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...schoolLandingRoutes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...tier3Routes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...schoolRoutes,
    ...leadershipRoutes,
    ...infoRoutes,
    ...partnerEntries,
    ...isolatedSeoEntries,
  ]);
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatDate = (value: Date | string | undefined) => {
  const parsed = value instanceof Date ? value : value ? new Date(value) : LAST_MODIFIED;
  return Number.isNaN(parsed.getTime()) ? LAST_MODIFIED.toISOString() : parsed.toISOString();
};

export function buildSitemapXml(entries = buildSitemapEntries()) {
  const urls = entries
    .map((entry) => {
      const changeFrequency = entry.changeFrequency ? `\n    <changefreq>${entry.changeFrequency}</changefreq>` : "";
      const priority = typeof entry.priority === "number" ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : "";
      return `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${formatDate(entry.lastModified as Date | string | undefined)}</lastmod>${changeFrequency}${priority}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
