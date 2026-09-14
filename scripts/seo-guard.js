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
      const file = read("src/lib/seo/sitemap.ts");
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
    name: "Programme pages expose workbook AEO intent blocks",
    pass: () => {
      const academic = read("src/lib/seo/academic.ts");
      return [
        "What are the fees for this program?",
        "Are scholarships available for this program?",
        "What does the curriculum cover?",
        "What practical experience is included?",
        "What career pathways can this program support?",
        "Where is this program offered?",
        "What recognition or approval applies to this program?",
      ].every((question) => academic.includes(question));
    },
  },
  {
    name: "AI crawler access and llms references are configured",
    pass: () => {
      const robots = read("app/robots.txt/route.ts");
      const llms = read("public/llms.txt");
      return (
        robots.includes("User-agent: OAI-SearchBot") &&
        robots.includes("User-agent: bingbot") &&
        llms.includes("Canonical academic URL pattern:") &&
        llms.includes("Source priority:")
      );
    },
  },
  {
    name: "Internal and temporary routes are excluded from indexing",
    pass: () => {
      const search = read("app/search/page.tsx");
      const update = read("app/under-update/layout.tsx");
      return search.includes('robots: "noindex,follow"') && update.includes('robots: "noindex,follow"');
    },
  },
  {
    name: "All course pages include typo keyword support",
    pass: () => {
      const file = read("src/lib/seo/search-intent.ts");
      return (
        file.includes("buildProgramTypoSearchTerms") &&
        file.includes("typoPhrase") &&
        ["admision", "eligiblity", "cource", "collage", "hyderbad"].every((term) => file.includes(term))
      );
    },
  },
  {
    name: "Health Allied courses have high-intent SEO profiles",
    pass: () => {
      const officialCourses = read("src/data/official-courses.ts");
      const healthSeo = read("src/lib/seo/health-allied-course-seo.ts");
      const canonicalSlug = (slug) => {
        const s = slug.toLowerCase();
        if (s === "bpt-emversity" || s === "bpt-edridge") return "bpt";
        if (s === "bot-emversity" || s === "bot-edridge") return "bot";
        if (s === "mpt-alt-code") return "mpt";
        if (s === "bmls" || s === "bmlt-edridge") return "bmlt";
        if (s === "bemt") return "betcms";
        if (s === "baott" || s === "bsc-anaesthesia-ot-edridge") return "bsc-anaesthesia-ot";
        if (s === "bcvt-edridge") return "bcvt";
        if (s === "bmrit-edridge") return "bmit";
        if (s === "brtt") return "brt";
        return s;
      };
      const courseKeys = [
        ...officialCourses.matchAll(
          /\{\s*schoolSlug:\s*"health-allied-health-sciences",\s*departmentSlug:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/g
        ),
      ].map((match) => `${match[1]}/${canonicalSlug(match[2])}`);
      const uniqueCourseKeys = [...new Set(courseKeys)];

      return (
        uniqueCourseKeys.length > 0 &&
        uniqueCourseKeys.every((key) => healthSeo.includes(`"${key}": profile({`)) &&
        uniqueCourseKeys.every((key) => healthSeo.includes(`"${key}": [`)) &&
        healthSeo.includes("buildHighIntentMetaTitle") &&
        healthSeo.includes("Admission 2026, Fees") &&
        healthSeo.includes("TYPO_KEYWORD_SUPPORT") &&
        healthSeo.includes("COURSE_TYPO_SUPPORT") &&
        ["physiotheraphy", "tecnology", "admision", "cource", "hyderbad"].every((term) => healthSeo.includes(term))
      );
    },
  },
  {
    name: "Health Allied seed-only courses are not linked as live routes",
    pass: () => {
      const schools = read("src/data/schools.ts");
      const officialCourses = read("src/data/official-courses.ts");
      const liveRoutes = [
        ...officialCourses.matchAll(
          /\{\s*schoolSlug:\s*"health-allied-health-sciences",\s*departmentSlug:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/g
        ),
      ].map((match) => `${match[1]}/${match[2]}`);
      const seedOnly = ["allied-health-sciences/bsc-him", "allied-health-sciences/bsc-public-health"];

      return seedOnly.every((key) => schools.includes(`slug: "${key.split("/")[1]}"`) && !liveRoutes.includes(key));
    },
  },
  {
    name: "Safe best/top guide pages are public and sitemap-backed",
    pass: () => {
      const guides = read("src/lib/seo/safe-guides.ts");
      const route = read("app/guides/[slug]/page.tsx");
      const sitemap = read("src/lib/seo/sitemap.ts");
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
      const route = read("app/guides/best-university-in-hyderabad/page.tsx");
      const guides = read("src/lib/seo/safe-guides.ts");
      return (
        route.includes('const slug = "best-university-in-hyderabad"') &&
        route.includes("SAFE_GUIDE_PAGE_MAP.get(slug)") &&
        route.includes("InformationPage") &&
        guides.includes('slug: "best-university-in-hyderabad"') &&
        guides.includes("Best University in Hyderabad") &&
        guides.includes("best university in Hyderabad") &&
        guides.includes("SEO, AEO, and GEO") &&
        guides.includes("does not claim")
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
    name: "Master remediation control log exists",
    pass: () =>
      exists("REMEDIATION_SUMMARY.md") &&
      read("REMEDIATION_SUMMARY.md").includes("Status date:") &&
      read("REMEDIATION_SUMMARY.md").includes("Release Decision"),
  },
  {
    name: "Repository keeps a single markdown source of truth",
    pass: () => {
      const files = require("fs")
        .readdirSync(process.cwd(), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => entry.name);
      return files.length === 1 && files[0] === "REMEDIATION_SUMMARY.md";
    },
  },
];

const failures = checks.filter((check) => !check.pass());

if (failures.length) {
  console.error("SEO guard failed:");
  failures.forEach((failure) => console.error(`- ${failure.name}`));
  process.exit(1);
}

console.log(`SEO guard passed: ${checks.length} checks`);
