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
    name: "Program pages include direct-answer intro",
    pass: () => {
      const file = read("src/views/Program.tsx");
      return file.includes("buildProgramDirectAnswer") && file.includes("programDirectAnswer");
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
];

const failures = checks.filter((check) => !check.pass());

if (failures.length) {
  console.error("SEO guard failed:");
  failures.forEach((failure) => console.error(`- ${failure.name}`));
  process.exit(1);
}

console.log(`SEO guard passed: ${checks.length} checks`);
