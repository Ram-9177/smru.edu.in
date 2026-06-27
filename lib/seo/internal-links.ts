import { INDEXABLE_COMPLIANCE_PAGES } from "../../data/compliance-pages";
import { INDEXABLE_SEO_PAGES } from "../../data/seo-pages";

export const HTML_SITEMAP_GROUPS = [
  "A. National aggressive keywords",
  "B. Hyderabad/Telangana keywords",
  "C. Course-specific keywords",
  "D. Admission-intent keywords",
  "E. Comparison/decision keywords",
  "F. Local/high-conversion keywords",
  "G. AI answer / FAQ / voice-search pages",
  "H. UGC/NAAC trust and disclosure pages",
  "I. Hospital + Rehabilitation Service GEO Pages",
];

export const getHtmlSitemapGroups = () =>
  HTML_SITEMAP_GROUPS.map((bucket) => {
    const seoPages = INDEXABLE_SEO_PAGES.filter((page) => page.bucket === bucket).map((page) => ({
      href: page.path,
      label: page.title,
      risk: page.risk,
    }));
    const compliancePages =
      bucket === "H. UGC/NAAC trust and disclosure pages"
        ? INDEXABLE_COMPLIANCE_PAGES.map((page) => ({
            href: `/${page.section}/${page.slug}`,
            label: page.title,
            risk: "Low",
          }))
        : [];
    return {
      bucket,
      pages: [...seoPages, ...compliancePages],
    };
  }).filter((group) => group.pages.length > 0);

export const FOOTER_SAFE_LINKS = [
  { href: "/html-sitemap", label: "HTML Sitemap" },
  { href: "/mandatory-disclosure/public-information", label: "Public Information" },
  { href: "/iqac", label: "IQAC Index" },
  { href: "/student-guides/what-to-check-before-admission", label: "Admission Checklist" },
];
