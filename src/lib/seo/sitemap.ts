import type { MetadataRoute } from "next";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { leaders } from "@/data/leaders";
import { EDU_PARTNERS, schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";
import { isRemovedPartnerPageSlug } from "@/lib/shared/partner-pages";
import { SEO_AUTHORITY_PAGES } from "./authority-map";
import { INFO_PAGES } from "./info-pages";
import { SAFE_GUIDE_PAGES } from "./safe-guides";
import { SHOW_PUBLIC_INFO_PAGES } from "./visibility";
import { NOINDEX_COMPLIANCE_PATHS } from "../../../data/compliance-pages";
import { INDEXABLE_SEO_PAGES } from "../../../data/seo-pages";

// Canonical sitemap host: HTTPS-only, non-www. HTTP and www are redirected in
// public/.htaccess, so sitemap loc values must stay on this origin.
const base = "https://smru.edu.in";

// Fallback lastmod when a source file cannot be stat'ed (kept from the Phase 0 baseline).
const LAST_MODIFIED = new Date("2026-05-15");

// The sitemap is served as an index; each section is its own child file.
export const SITEMAP_SECTIONS = ["pages", "schools", "programmes", "guides"] as const;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];
export const sitemapSectionPath = (section: SitemapSection | "images") => `/sitemap-${section}.xml`;

// Tier 1: conversion & trust pages. Tier 2: catalogue & campus. Tier 3: legal & utility.
const tier1Routes = ["/smru", "/admissions", "/exam-notification", "/phd-admissions", "/schools", "/about", "/contact"];
const tier2Routes = ["/academic-structure", "/campus-360", "/brochure", "/careers", "/partner", "/mandatory-disclosure", "/leadership/all"];
const tier3Routes = [
  "/privacy-policy",
  "/terms-of-service",
  "/anti-ragging",
  "/refund-policy",
  "/admission-policy",
  "/approvals-recognitions",
  "/departments",
  "/carebridge",
  "/handbook",
  "/html-sitemap",
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

// Info pages that are noindex (placeholders awaiting real content) never enter the sitemap.
const sitemapInfoPages = SHOW_PUBLIC_INFO_PAGES
  ? INFO_PAGES.filter(
      (page) =>
        page.robots !== "noindex,follow" &&
        !legacyComplianceInfoPageSlugs.has(page.slug) &&
        !NOINDEX_COMPLIANCE_PATHS.has(`/${page.slug}`),
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

const safeGuideRoutes = SAFE_GUIDE_PAGES.map((page) => `/${page.slug}`);

const urlFor = (routePath: string) => `${base}${routePath === "/" ? "/" : `${routePath.replace(/\/$/, "")}/`}`;

// Real lastmod: the newest mtime of the source files that define an entry, else the baseline date.
const sourceMtime = (...relativePaths: string[]) => {
  let newest = 0;
  for (const relativePath of relativePaths) {
    try {
      const absolute = path.join(process.cwd(), relativePath);
      if (existsSync(absolute)) newest = Math.max(newest, statSync(absolute).mtimeMs);
    } catch {
      // fall through to the baseline date
    }
  }
  return newest ? new Date(newest) : LAST_MODIFIED;
};

const routeSourceMtime = (routePath: string) => {
  const clean = routePath.replace(/^\/+|\/+$/g, "");
  return sourceMtime(clean ? `app/${clean}/page.tsx` : "app/page.tsx", clean ? `app/(seo-pages)/${clean}/page.tsx` : "");
};

const dateFor = (value?: string, fallback = LAST_MODIFIED) => {
  const parsed = value ? new Date(value) : fallback;
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
};

const entry = (
  routePath: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
): MetadataRoute.Sitemap[number] => ({ url: urlFor(routePath), lastModified, changeFrequency });

const uniqueEntries = (entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap => {
  const seen = new Set<string>();
  return entries.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
};

export function buildSitemapSections(): Record<SitemapSection, MetadataRoute.Sitemap> {
  const catalogueMtime = sourceMtime("src/data/schools.ts");
  const schoolEntries: MetadataRoute.Sitemap = [];
  const programmeEntries: MetadataRoute.Sitemap = [];

  schools.forEach((school) => {
    const schoolPath = `/schools/${safeSlug(school.slug, school.name)}`;
    schoolEntries.push(entry(schoolPath, catalogueMtime));
    (school.departments || []).forEach((dept) => {
      const deptPath = `${schoolPath}/${safeSlug(dept.slug, dept.name)}`;
      schoolEntries.push(entry(deptPath, catalogueMtime));
      (dept.programs || []).forEach((program) => {
        programmeEntries.push(entry(`${deptPath}/${safeSlug(program.slug, program.name)}`, catalogueMtime));
      });
    });
  });

  const leadershipRoutes: MetadataRoute.Sitemap = (leaders || []).map((leader) =>
    entry(`/leadership/${leader.slug}`, sourceMtime("src/data/leaders.ts")),
  );

  const infoRoutes: MetadataRoute.Sitemap = sitemapInfoPages.map((page) =>
    entry(`/${page.slug}`, dateFor(page.lastReviewed, sourceMtime("src/lib/seo/info-pages.ts"))),
  );

  const authorityEntries: MetadataRoute.Sitemap = SEO_AUTHORITY_PAGES.map((page) =>
    entry(page.path, routeSourceMtime(page.path), "weekly"),
  );

  const safeGuideEntries: MetadataRoute.Sitemap = safeGuideRoutes.map((routePath) =>
    entry(routePath, sourceMtime("src/lib/seo/safe-guides.ts")),
  );

  const partnerEntries: MetadataRoute.Sitemap = partnerRoutes.map((routePath) =>
    entry(routePath, sourceMtime("src/data/schools.ts", "src/views/Partner.tsx")),
  );

  const templatedGuideEntries: MetadataRoute.Sitemap = INDEXABLE_SEO_PAGES.map((page) =>
    entry(page.path, sourceMtime("data/seo-pages.ts")),
  );

  return {
    pages: uniqueEntries([
      entry("/", routeSourceMtime("/"), "weekly"),
      ...tier1Routes.map((routePath) => entry(routePath, routeSourceMtime(routePath), "weekly")),
      ...authorityEntries,
      ...tier2Routes.map((routePath) => entry(routePath, routeSourceMtime(routePath))),
      ...tier3Routes.map((routePath) => entry(routePath, routeSourceMtime(routePath), "yearly")),
      ...leadershipRoutes,
      ...infoRoutes,
      ...partnerEntries,
    ]),
    schools: uniqueEntries(schoolEntries),
    programmes: uniqueEntries(programmeEntries),
    guides: uniqueEntries([...safeGuideEntries, ...templatedGuideEntries]),
  };
}

// Flat view of every URL in the index (used by tooling and tests).
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const sections = buildSitemapSections();
  return uniqueEntries(SITEMAP_SECTIONS.flatMap((section) => sections[section]));
}

// Image sitemap: campus, school and event imagery with captions. Only files that exist are emitted.
type ImageEntry = { page: string; images: Array<{ src: string; caption: string }> };
const IMAGE_ENTRIES: ImageEntry[] = [
  {
    page: "/",
    images: [{ src: "/assets/hero-campus.webp", caption: "St. Mary's University (SMRU) campus at Deshmukhi, near Ramoji Film City, Hyderabad" }],
  },
  {
    page: "/schools/rehabilitation-sciences",
    images: [{ src: "/assets/school_rehabilitation_sciences_hq.webp", caption: "School of Rehabilitation Sciences, St. Mary's University (SMRU), Hyderabad" }],
  },
  {
    page: "/schools/health-allied-health-sciences",
    images: [{ src: "/assets/school_health_allied_health_sciences_hq.webp", caption: "School of Health & Allied Health Sciences, St. Mary's University (SMRU), Hyderabad" }],
  },
  {
    page: "/schools/psychology",
    images: [{ src: "/assets/school_psychology_hq.webp", caption: "School of Psychology, St. Mary's University (SMRU), Hyderabad" }],
  },
  {
    page: "/schools/nursing-sciences",
    images: [{ src: "/assets/school_nursing_hq.webp", caption: "School of Nursing, St. Mary's University (SMRU), Hyderabad" }],
  },
  {
    page: "/schools/engineering-emerging-technologies",
    images: [{ src: "/assets/school_engineering_emerging_technologies_hq.webp", caption: "School of Engineering & Emerging Technologies, St. Mary's University (SMRU), Hyderabad" }],
  },
  {
    page: "/events",
    images: [
      { src: "/assets/events/tree-plantation-drive-2026/tree-plantation-drive-01.webp", caption: "Tree Plantation Drive on World Environment Day 2026 at St. Mary's University (SMRU)" },
      { src: "/assets/events/tree-plantation-drive-2026/tree-plantation-drive-02.webp", caption: "Faculty and students planting trees on the SMRU campus, Deshmukhi" },
    ],
  },
];

export function buildImageSitemapEntries() {
  return IMAGE_ENTRIES.map((item) => ({
    page: item.page,
    images: item.images.filter((image) => existsSync(path.join(process.cwd(), "public", image.src))),
  })).filter((item) => item.images.length > 0);
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

const newestDate = (entries: MetadataRoute.Sitemap) =>
  entries.reduce<Date>((newest, item) => {
    const candidate = item.lastModified instanceof Date ? item.lastModified : new Date(item.lastModified || LAST_MODIFIED);
    return candidate > newest ? candidate : newest;
  }, LAST_MODIFIED);

export function buildSitemapXml(entries = buildSitemapEntries()) {
  const urls = entries
    .map((item) => {
      const changeFrequency = item.changeFrequency ? `\n    <changefreq>${item.changeFrequency}</changefreq>` : "";
      return `  <url>\n    <loc>${escapeXml(item.url)}</loc>\n    <lastmod>${formatDate(item.lastModified as Date | string | undefined)}</lastmod>${changeFrequency}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildSectionSitemapXml(section: SitemapSection) {
  return buildSitemapXml(buildSitemapSections()[section]);
}

export function buildImageSitemapXml() {
  const urls = buildImageSitemapEntries()
    .map((item) => {
      const images = item.images
        .map(
          (image) =>
            `    <image:image>\n      <image:loc>${escapeXml(`${base}${image.src}`)}</image:loc>\n      <image:caption>${escapeXml(image.caption)}</image:caption>\n    </image:image>`,
        )
        .join("\n");
      return `  <url>\n    <loc>${escapeXml(urlFor(item.page))}</loc>\n${images}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
}

export function buildSitemapIndexXml() {
  const sections = buildSitemapSections();
  const children = [
    ...SITEMAP_SECTIONS.map((section) => ({ loc: `${base}${sitemapSectionPath(section)}`, lastmod: newestDate(sections[section]) })),
    { loc: `${base}${sitemapSectionPath("images")}`, lastmod: sourceMtime("src/lib/seo/sitemap.ts") },
  ];
  const items = children
    .map((child) => `  <sitemap>\n    <loc>${escapeXml(child.loc)}</loc>\n    <lastmod>${formatDate(child.lastmod)}</lastmod>\n  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}
