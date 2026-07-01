const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const checks = [
  {
    name: "SEO authority map exists",
    pass: () => exists("src/lib/seo/authority-map.ts") && read("src/lib/seo/authority-map.ts").includes("SEO_AUTHORITY_PAGES"),
  },
  {
    name: "Sitemap includes authority pages",
    pass: () => {
      const file = read("app/sitemap.ts");
      return file.includes("SEO_AUTHORITY_PAGES") && file.includes("authorityEntries") && file.includes("...authorityEntries");
    },
  },
  {
    name: "Course ItemList schema helper exists",
    pass: () => read("src/lib/seo/course-list.ts").includes("buildCourseItemListSchema"),
  },
  {
    name: "Schools index has Course ItemList schema",
    pass: () => read("app/schools/page.tsx").includes("schools-course-item-list-schema"),
  },
  {
    name: "Dynamic school pages have Course ItemList schema",
    pass: () => read("app/schools/[schoolSlug]/page.tsx").includes("course-item-list-schema"),
  },
  {
    name: "Dynamic department pages have Course ItemList schema",
    pass: () => read("app/schools/[schoolSlug]/[deptSlug]/page.tsx").includes("course-item-list-schema"),
  },
  {
    name: "Navbar uses SEO authority map",
    pass: () => read("src/components/Navbar.tsx").includes("getSeoAuthorityPage"),
  },
  {
    name: "Footer uses SEO authority map",
    pass: () => read("src/components/Footer.tsx").includes("getSeoAuthorityPage"),
  },
  {
    name: "Homepage/shared link grids resolve authority-map links",
    pass: () => {
      const file = read("src/components/seo/PageSections.tsx");
      return file.includes("getSeoAuthorityPageByPath") && file.includes("resolveAuthorityHref");
    },
  },
  {
    name: "Brand spelling aliases are protected in structured SEO identity",
    pass: () => {
      const site = read("src/lib/seo/site.ts");
      const metadata = read("src/lib/metadata.ts");
      const aliases = [
        "Stmarys University",
        "St Marys University",
        "St. Mary's University",
        "St.Mary's University",
        "StMarys University",
        "stmarys university",
        "Stmarys",
        "St Marys",
        "St. Mary's",
        "St.Mary's",
        "StMarys",
        "stmarys",
      ];

      return aliases.every((alias) => site.includes(alias)) && metadata.includes("...SITE_IDENTITY.alternateNames");
    },
  },
  {
    name: "Program pages include direct-answer intro",
    pass: () => {
      const file = read("src/views/Program.tsx");
      return file.includes("buildProgramDirectAnswer") && file.includes("programDirectAnswer");
    },
  },
  {
    name: "Program pages include recommended related courses",
    pass: () => {
      const academic = read("src/lib/seo/academic.ts");
      const view = read("src/views/Program.tsx");
      const route = read("app/schools/[schoolSlug]/[deptSlug]/[programSlug]/page.tsx");
      return (
        academic.includes("buildProgramRecommendationLinks") &&
        view.includes("Recommended Related Courses") &&
        route.includes("recommended-course-item-list-schema") &&
        route.includes("buildItemListSchema")
      );
    },
  },
  {
    name: "Program metadata targets course detail intent",
    pass: () => {
      const file = read("src/lib/shared/dynamic-route-metadata.ts");
      return file.includes("Eligibility, Fees & Syllabus") && file.includes("recommended related courses");
    },
  },
  {
    name: "Safe best/top guide pages are public and sitemap-backed",
    pass: () => {
      const guides = read("src/lib/seo/safe-guides.ts");
      const route = read("app/guides/[slug]/page.tsx");
      const sitemap = read("app/sitemap.ts");
      return (
        guides.includes("SAFE_GUIDE_PAGES") &&
        guides.includes("best-private-university-in-hyderabad") &&
        guides.includes("does not claim") &&
        route.includes("SAFE_GUIDE_PAGE_MAP") &&
        sitemap.includes("SAFE_GUIDE_PAGES") &&
        sitemap.includes("safeGuideEntries")
      );
    },
  },
  {
    name: "Best university Hyderabad pillar page exists",
    pass: () => {
      const file = read("app/guides/best-university-in-hyderabad/page.tsx");
      return (
        file.includes("Best University in Hyderabad") &&
        file.includes("best university in Hyderabad") &&
        file.includes("SEO, AEO, and GEO") &&
        file.includes("InformationPage") &&
        file.includes("does not claim")
      );
    },
  },
  {
    name: "Google site verification is configured",
    pass: () => {
      const layout = read("app/layout.tsx");
      const htmlFile = read("public/google6dae2ac571d34510.html");
      return (
        layout.includes("verification") &&
        layout.includes("MNlkKsQJcg3Cv14G_CeV3L_C7f2A3MpdPNSYNdDtdfU") &&
        htmlFile.includes("google-site-verification: google6dae2ac571d34510.html")
      );
    },
  },
  {
    name: "Preloader no longer competes as priority LCP asset",
    pass: () => {
      const file = read("src/components/Preloader.tsx");
      return file.includes("priority={false}") && file.includes("}, 150);") && file.includes("}, 550);");
    },
  },
  {
    name: "Backlink/citation execution sheet exists",
    pass: () => exists("SEO_BACKLINK_CITATION_EXECUTION_SHEET.md"),
  },
  {
    name: "Phase status report exists",
    pass: () => exists("SEO_HARDENING_PHASE_1_STATUS.md"),
  },
  {
    name: "End-to-end execution master exists",
    pass: () => exists("SEO_END_TO_END_EXECUTION_MASTER.md"),
  },
];

const failures = checks.filter((check) => !check.pass());

if (failures.length) {
  console.error("SEO guard failed:");
  failures.forEach((failure) => console.error(`- ${failure.name}`));
  process.exit(1);
}

console.log(`SEO guard passed: ${checks.length} checks`);
