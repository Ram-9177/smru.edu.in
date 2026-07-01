import type { MetadataRoute } from "next";
import { leaders } from "../src/data/leaders";
import { EDU_PARTNERS, schools } from "../src/data/schools";
import { SEO_AUTHORITY_PAGES } from "../src/lib/seo/authority-map";
import { INFO_PAGES } from "../src/lib/seo/info-pages";
import { SHOW_PUBLIC_INFO_PAGES } from "../src/lib/seo/visibility";
import { safeSlug } from "../src/lib/shared/program-utils";
import { COMING_SOON_SCHOOL_SLUGS, SCHOOL_LANDING_PATHS } from "../src/lib/shared/school-landing";
import { isRemovedPartnerPageSlug } from "../src/lib/shared/partner-pages";

const base = "https://smru.edu.in";

// Current public review baseline for main university pages.
const LAST_MODIFIED = new Date("2026-05-15");

// Tier 1: Conversion & Trust pages — highest priority after homepage
const tier1Routes = ["/admissions", "/exam-notification", "/phd-admissions", "/schools", "/about", "/contact", "/law"];

// Tier 2: Academic catalogue & campus pages
const tier2Routes = [
  "/academic-structure",
  "/campus-360",
  "/brochure",
  "/careers",
  "/partner",
  "/leadership/all",
  "/search",
  "/schools/law",
  "/schools/law/legal-studies",
];

// Tier 3: Legal & utility pages — included for crawlability, low priority
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

const infoPageRoutes = SHOW_PUBLIC_INFO_PAGES ? INFO_PAGES.map((page) => `/${page.slug}`) : [];

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

const urlFor = (path: string) => `${base}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;

const dateFor = (value?: string) => {
  const parsed = value ? new Date(value) : LAST_MODIFIED;
  return Number.isNaN(parsed.getTime()) ? LAST_MODIFIED : parsed;
};

const priorityForAuthorityPage = (priority: string) => {
  if (priority === "conversion" || priority === "trust" || priority === "academic") return 0.9;
  if (priority === "local") return 0.85;
  return 0.7;
};

const authorityEntries: MetadataRoute.Sitemap = SEO_AUTHORITY_PAGES.map((page) => ({
  url: urlFor(page.path),
  lastModified: LAST_MODIFIED,
  changeFrequency: "weekly" as const,
  priority: priorityForAuthorityPage(page.priority),
}));

const uniqueEntries = (entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap => {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
};

export default function sitemap(): MetadataRoute.Sitemap {
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

  return uniqueEntries([
    // Homepage — highest authority
    {
      url: urlFor("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Central authority pages for sitelinks, trust, admissions, and academic discovery.
    ...authorityEntries,
    // Tier 1: Conversion pages
    ...tier1Routes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Tier 2: Academic catalogue pages
    ...tier2Routes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Top-level school landing placeholders
    ...schoolLandingRoutes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Tier 3: Utility pages
    ...tier3Routes.map((path) => ({
      url: urlFor(path),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    // Dynamic school/dept/program routes
    ...schoolRoutes,
    // Leadership profiles
    ...leadershipRoutes,
    // Trust & disclosure info pages
    ...infoRoutes,
    // Partner routes
    ...partnerEntries,
  ]);
}
