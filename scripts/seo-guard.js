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
    name: "Naming standard: identity constants and bridge sentence",
    pass: () => {
      const university = read("src/lib/shared/university.ts");
      const site = read("src/lib/seo/site.ts");
      const bridge =
        "St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.";
      return (
        university.includes('brandName: "St. Mary\'s University"') &&
        university.includes('shortName: "SMRU"') &&
        university.includes('legalName: "St. Mary\'s Rehabilitation University"') &&
        site.includes(bridge) &&
        site.includes('foundingDate: "2025-07-24"') &&
        ["Stmarys University", "StMarys University", "stmarys university", "Stmarys", "StMarys", "stmarys"].every(
          (alias) => !site.includes(`"${alias}"`)
        )
      );
    },
  },
  {
    name: "Naming standard: no 'St.Mary' (no space) in site copy, data or llms files",
    pass: () => {
      const skip = /Partners - Codes/;
      const walk = (dir) =>
        fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
          const rel = `${dir}/${entry.name}`;
          if (skip.test(rel)) return [];
          if (entry.isDirectory()) return walk(rel);
          return /\.(tsx?|mjs|js|json|txt|md)$/.test(entry.name) ? [rel] : [];
        });
      const files = [...walk("src"), ...walk("app"), ...walk("data"), "public/llms.txt", "public/llms-full.txt"];
      // The single permitted no-space form is the schema alternateName entry in site.ts.
      return files.every((file) => !/St\.Mary|\b(Stmarys|StMarys) University\b/.test(read(file).replace(/"St\.Mary's University",/g, "")));
    },
  },
  {
    name: "Brand rewrite script and keywords meta are gone",
    pass: () =>
      !exists("update_brand.js") &&
      !read("src/lib/metadata.ts").includes("keywords: Array.from") &&
      !read("app/layout.tsx").includes("keywords: ["),
  },
  {
    name: "Canonical identity page /smru/ exists with disambiguation and FAQ schema",
    pass: () => {
      const page = read("app/smru/page.tsx");
      const sitemap = read("src/lib/seo/sitemap.ts");
      return (
        page.includes("SITE_IDENTITY.bridgeSentence") &&
        page.includes("Not to be confused with") &&
        page.includes("buildFaqSchema") &&
        sitemap.includes('"/smru"')
      );
    },
  },
  {
    name: "Program pages include direct-answer intro (shared with Course.description)",
    pass: () => {
      const view = read("src/views/Program.tsx");
      const route = read("app/schools/[schoolSlug]/[deptSlug]/[programSlug]/page.tsx");
      const shared = read("src/lib/seo/programme-answer.ts");
      return (
        shared.includes("export const getProgrammeAnswerFirst") &&
        view.includes("getProgrammeAnswerFirst") &&
        view.includes("programDirectAnswer") &&
        route.includes("getProgrammeAnswerFirst")
      );
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
    name: "Program metadata targets course detail intent with the full degree name",
    pass: () => {
      const file = read("src/lib/shared/dynamic-route-metadata.ts");
      const names = read("src/lib/shared/programme-names.ts");
      return (
        file.includes("in Hyderabad: Fees, Eligibility 2026") &&
        file.includes("pickTitleCandidate") &&
        file.includes("getProgrammeDisplayName") &&
        // The keyword-list description template ("…syllabus, career pathways, and recommended related
        // courses") is what produced descriptions cut mid-sentence; it must not come back.
        !file.includes("recommended related courses") &&
        !file.includes(".slice(0, 155)") &&
        names.includes('bpt: { display: "Bachelor of Physiotherapy (BPT)"')
      );
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
        robots.includes('"OAI-SearchBot"') &&
        robots.includes('"bingbot"') &&
        llms.includes("Canonical academic URL pattern:") &&
        llms.includes("St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University") &&
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
    name: "Deliberate-misspelling keyword machinery is absent",
    pass: () => {
      const files = ["src/lib/seo/search-intent.ts", "src/lib/seo/health-allied-course-seo.ts"];
      return files.every((file) => {
        const text = read(file);
        return (
          !text.includes("buildProgramTypoSearchTerms") &&
          !text.includes("typoPhrase") &&
          !text.includes("TYPO_KEYWORD_SUPPORT") &&
          !text.includes("COURSE_TYPO_SUPPORT") &&
          !/cource|admision|collage|hyderbad|tecnology|theraphy|eligiblity|scince|optomitry/i.test(text)
        );
      });
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
        healthSeo.includes("buildHighIntentMetaTitle") &&
        healthSeo.includes("Admission 2026, Fees")
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
    name: "Sitemap is an index with per-section child sitemaps",
    pass: () =>
      read("app/sitemap.xml/route.ts").includes("buildSitemapIndexXml") &&
      ["pages", "schools", "programmes", "guides", "images", "international"].every((section) => exists(`app/sitemap-${section}.xml/route.ts`)) &&
      !read("src/lib/seo/sitemap.ts").includes('"/iqac"') &&
      !read("src/lib/seo/sitemap.ts").includes("indexableComplianceRoutes") &&
      !read("src/lib/seo/sitemap.ts").includes('"/niat"'),
  },
  {
    name: "Retired and duplicate URLs have server-side 301s and the branded 404 is served",
    pass: () => {
      const htaccess = read("public/.htaccess");
      const redirectMap = read("REDIRECT_MAP.csv");
      return (
        htaccess.includes("ErrorDocument 404 /404.html") &&
        htaccess.includes("Stmarys-facts|stmarys-facts)/?$ https://smru.edu.in/smru/") &&
        htaccess.includes("^Hand-Book/?$ https://smru.edu.in/handbook/") &&
        htaccess.includes("^iqac/?$ https://smru.edu.in/iqac-quality-assurance/") &&
        htaccess.includes("engineering-emerging-technologies|law)/?$ https://smru.edu.in/schools/$1/") &&
        redirectMap.includes("Hand-Book/?$") &&
        !exists("app/Hand-Book/page.tsx") &&
        exists("app/handbook/page.tsx")
      );
    },
  },
  {
    name: "Brand reference info pages are retired into /smru/ and placeholders are noindex",
    pass: () => {
      const info = read("src/lib/seo/info-pages.ts");
      const retired = ["Stmarys-university", "Stmarys-university-official", "Stmarys-hyderabad", "rehabilitation-university-hyderabad", "Stmarys-facts"];
      const placeholders = ["ombudsperson", "naac", "nirf", "first-academic-year-disclosures", "academic-calendar", "faculty-directory", "public-information", "contact-directory"];
      return (
        retired.every((slug) => !info.includes(`slug: "${slug}"`)) &&
        placeholders.every((slug) => new RegExp(`\\{\\n\\s*robots: "noindex,follow",\\n\\s*slug: "${slug}"`).test(info)) &&
        read("app/(seo-pages)/[slug]/page.tsx").includes("robots: config.robots")
      );
    },
  },
  {
    name: "School hubs are canonical at /schools/{slug}; short forms are redirect shells",
    pass: () => {
      const landing = read("src/lib/shared/school-landing.ts");
      const shells = ["rehabilitation-sciences", "health-allied-health-sciences", "psychology", "nursing-sciences", "engineering-emerging-technologies", "law"];
      return (
        landing.includes('law: "/schools/law"') &&
        shells.every((slug) => read(`app/${slug}/page.tsx`).includes(`redirect(TARGET_PATH)`) && read(`app/${slug}/page.tsx`).includes(`/schools/${slug}`)) &&
        read("app/schools/[schoolSlug]/page.tsx").includes("LawHubPage")
      );
    },
  },
  {
    name: "Programme catalogue /programmes/ exists and is in tier-1 sitemap",
    pass: () => {
      const page = read("app/programmes/page.tsx");
      const sitemap = read("src/lib/seo/sitemap.ts");
      const view = read("src/views/Programmes.tsx");
      return (
        page.includes("getCatalogueProgrammes") &&
        page.includes("buildItemListSchema") &&
        page.includes("buildCollectionPageSchema") &&
        sitemap.includes('"/programmes"') &&
        view.includes("<table")
      );
    },
  },
  {
    name: "Course schema emits hasCourseInstance and gated Offer + fee plumbing exists",
    pass: () => {
      const schema = read("src/lib/seo/schema.ts");
      const route = read("app/schools/[schoolSlug]/[deptSlug]/[programSlug]/page.tsx");
      return (
        schema.includes("hasCourseInstance") &&
        schema.includes("CourseInstance") &&
        schema.includes("toIsoDuration") &&
        schema.includes("fee && (fee.annualINR || fee.totalINR)") &&
        route.includes("getProgrammeFee(pathname)") &&
        exists("src/data/programme-fees.ts")
      );
    },
  },
  {
    name: "Bridge sentence is byte-identical across the fact sources",
    pass: () => {
      const bridge =
        "St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.";
      return ["src/lib/seo/site.ts", "public/llms.txt", "public/llms-full.txt"].every((file) => read(file).includes(bridge));
    },
  },
  {
    name: "AI and answer-engine crawlers are explicitly allowed in robots.txt",
    pass: () => {
      const robots = read("app/robots.txt/route.ts");
      return ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "CCBot", "Applebot-Extended", "bingbot"].every((agent) => robots.includes(`"${agent}"`)) &&
        robots.includes('Disallow: ${path}') &&
        robots.includes("/developer/");
    },
  },
  {
    name: "Eager /* speculation prefetch is removed; prerender list kept",
    pass: () => {
      const layout = read("app/layout.tsx");
      return !layout.includes('href_matches: "/*"') && layout.includes("prerender:");
    },
  },
  {
    name: "llms-full.txt carries the full programme catalogue block",
    pass: () => {
      const llms = read("public/llms-full.txt");
      return llms.includes("<!-- programmes:start -->") && llms.includes("<!-- programmes:end -->") && llms.includes("## Programme Catalogue");
    },
  },
  {
    name: "Fact-consistency and llms generators exist",
    pass: () =>
      exists("scripts/check-facts-consistency.mjs") &&
      exists("scripts/generate-llms.mjs") &&
      exists("docs/seo/ai-audit.md"),
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
