import type { OfficialCourseSeo } from "./course-seo";
import { OFFICIAL_COURSE_BY_SLUG } from "./course-seo";

export type SeoRouteGroup = "seo" | "admission-guides" | "student-guides" | "mandatory-disclosure" | "iqac";
export type SeoRisk = "Low" | "Medium" | "High";
export type SeoRiskLevel = "low" | "medium" | "high";
export type SeoRobots = "index, follow" | "noindex, follow";
export type SeoSourceOfTruth = "seo-pages" | "compliance-pages";
export type SeoSection = {
  heading: string;
  paragraphs: string[];
};

export type SeoPage = {
  no: number;
  bucket: string;
  keyword: string;
  slug: string;
  path: string;
  routeGroup: SeoRouteGroup;
  intent: string;
  pageType: string;
  title: string;
  description: string;
  h1: string;
  h2: string[];
  sections: SeoSection[];
  risk: SeoRisk;
  riskLevel: SeoRiskLevel;
  robots: SeoRobots;
  isApproved: boolean;
  isIndexable: boolean;
  requiresManualApproval: boolean;
  claimDisclaimer: string;
  sourceOfTruth: SeoSourceOfTruth;
  safeAngle: string;
  claimHandlingNote: string;
  directAnswer: string;
  keyFacts: Array<{ label: string; value: string }>;
  faqTopics: string[];
  schema: Array<"WebPage" | "Article" | "FAQPage" | "BreadcrumbList" | "Course" | "Place">;
  internalLinks: Array<{ href: string; label: string }>;
  cta: string;
  indexingNote: string;
  aiOptimizationNote: string;
  ugcNaacNote: string;
  officialCourseSlug?: string;
};

type Seed = {
  no: number;
  bucket: string;
  keyword: string;
  slug: string;
  routeGroup: SeoRouteGroup;
  intent: string;
  pageType: string;
  risk: SeoRisk;
  officialCourseSlug?: string;
};

const h2ByIntent = {
  ranking: ["What this search means", "What students should verify", "Recognition and disclosure checks", "Questions to ask before applying", "Official St.Marys University links"],
  geo: ["Location answer", "Official campus and contact checks", "Course and school routes", "Questions to ask before visiting", "Verification links"],
  course: ["Course identity", "Official course route", "What to verify before applying", "Admissions and disclosure checks", "FAQs"],
  admission: ["Admission question", "Official application route", "Documents and fee confirmation", "Counselling questions", "FAQs"],
  comparison: ["Decision question", "Comparison checklist", "Official course and disclosure links", "Questions for counselling", "FAQs"],
  patient: ["Patient enquiry answer", "Rehabilitation education ecosystem", "What to confirm before visiting", "Official contact routes", "FAQs"],
  compliance: ["Disclosure answer", "Evidence and status", "Owner office", "Public verification route", "FAQs"],
};

export const HIGH_RISK_SEO_PAGE_NUMBERS = new Set<number>([
  ...Array.from({ length: 38 }, (_, index) => index + 1),
  122,
  126,
  132,
  135,
  155,
  156,
  158,
  159,
  179,
  187,
  188,
  191,
  192,
  193,
  194,
  195,
]);

export const UNAPPROVED_SEO_PAGE_NUMBERS = new Set<number>(
  Array.from({ length: 20 }, (_, index) => index + 201)
);

export const COMPLIANCE_SOURCE_SEO_PAGE_NUMBERS = new Set<number>(
  Array.from({ length: 10 }, (_, index) => index + 191)
);

const ADDITIONAL_APPROVED_SEO_PAGE_NUMBERS = new Set<number>([221, 222, 223]);

export const HIGH_RISK_CLAIM_DISCLAIMER =
  "This page is a student guidance page for search and comparison purposes. It does not make unsupported ranking, placement, salary, accreditation or 'No.1' claims.";

export const UNAPPROVED_PAGE_DISCLAIMER =
  "This optional page is not approved for public indexing. It must remain noindex until St.Marys University gives explicit approval and public proof is available where needed.";

const riskLevelFor = (seed: Seed): SeoRiskLevel =>
  HIGH_RISK_SEO_PAGE_NUMBERS.has(seed.no) ? "high" : (seed.risk.toLowerCase() as SeoRiskLevel);

const routePath = (routeGroup: SeoRouteGroup, slug: string) => {
  if (routeGroup === "seo") return `/seo/${slug}`;
  if (routeGroup === "mandatory-disclosure" && slug === "index") return "/mandatory-disclosure";
  if (routeGroup === "iqac" && slug === "index") return "/iqac";
  return `/${routeGroup}/${slug}`;
};

const titleCase = (value: string) =>
  value
    .split(/\s+/)
    .map((word) => (word.length <= 3 && word === word.toUpperCase() ? word : `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`))
    .join(" ");

const trim = (value: string, max: number) => (value.length <= max ? value : `${value.slice(0, max - 3).replace(/\s+\S*$/, "")}...`);

const intentKind = (seed: Seed) => {
  if (seed.routeGroup === "mandatory-disclosure" || seed.routeGroup === "iqac") return "compliance";
  if (seed.pageType.includes("Patient") || seed.keyword.includes("treatment") || seed.keyword.includes("therapy") || seed.keyword.includes("rehabilitation hospital")) return "patient";
  if (seed.pageType.includes("Comparison") || seed.keyword.includes(" vs ") || seed.keyword.includes("compare")) return "comparison";
  if (seed.routeGroup === "admission-guides" || seed.keyword.includes("admission") || seed.keyword.includes("apply")) {
    return seed.officialCourseSlug || seed.keyword.includes("course") ? "course" : "admission";
  }
  if (seed.keyword.includes("Hyderabad") || seed.keyword.includes("Telangana") || seed.keyword.includes("Ramoji") || seed.keyword.includes("Deshmukhi")) return "geo";
  if (seed.officialCourseSlug || seed.keyword.includes("course")) return "course";
  return "ranking";
};

const schemaFor = (kind: keyof typeof h2ByIntent, seed: Seed): SeoPage["schema"] => {
  const base: SeoPage["schema"] = ["WebPage", "FAQPage", "BreadcrumbList"];
  if (kind === "course" && seed.officialCourseSlug && OFFICIAL_COURSE_BY_SLUG.has(seed.officialCourseSlug)) return [...base, "Course"];
  if (kind === "geo") return [...base, "Place"];
  if (kind === "ranking" || kind === "comparison") return ["Article", "FAQPage", "BreadcrumbList"];
  return base;
};

const section = (heading: string, paragraphs: string[]): SeoSection => ({ heading, paragraphs });

const proofHeldFields = "eligibility, duration, fee, intake, approval, salary, placement, ranking and accreditation";

const sectionsFor = (kind: keyof typeof h2ByIntent, seed: Seed, course?: OfficialCourseSeo): SeoSection[] => {
  const topic = seed.keyword;
  const courseName = course?.seoName || topic;
  const school = course?.school || "the relevant St.Marys University school";

  if (kind === "patient") {
    return [
      section("Patient Enquiry Answer", [
        `This page supports people searching for ${topic} by routing them to official St.Marys University verification before they visit or rely on third-party information.`,
        "St.Marys University can be considered as a verification starting point for rehabilitation-linked education and patient-care-linked learning, but current service availability must be confirmed directly.",
      ]),
      section("Rehabilitation Education Ecosystem", [
        "The safe positioning is clinical exposure, rehabilitation education ecosystem and patient-care-linked learning connected with rehabilitation and health-related academic areas.",
        "This page does not claim hospital accreditation, OPD/IPD availability, emergency care, named doctors, treatment outcomes, fees or timings.",
      ]),
      section("What To Confirm Before Visiting", [
        "Confirm whether the relevant support is currently available, whether an appointment is required, what documents are needed and whether the visit is medically suitable.",
        "For urgent symptoms, injury, emergency care or diagnosis, contact local emergency services or a licensed hospital immediately.",
      ]),
      section("Official Contact Routes", [
        "Use the official St.Marys University contact route and campus-location route to verify the current process before travelling.",
        "Patient-facing searches should remain enquiry-led and verification-led until public service documents are available.",
      ]),
      section("FAQs", [
        "FAQ answers should explain what to verify, how to contact St.Marys University, what cannot be assumed and when emergency medical care is required.",
        "Any future service-specific claim should be added only after official public proof is supplied.",
      ]),
    ];
  }

  if (kind === "course") {
    return [
      section("Course Identity", [
        `${courseName} is referenced through the official St.Marys University course lock for SEO and compliance-safe discovery.`,
        `The linked academic area is ${school}; this page does not add unverified ${proofHeldFields}.`,
      ]),
      section("Official Course Route", [
        "Students should use the official course, school and admissions routes linked on this page for current information.",
        "If an official course page is linked, that source remains the controlling public reference for course-specific details.",
      ]),
      section("What To Verify Before Applying", [
        `Before applying, verify ${proofHeldFields} through official St.Marys University communication or published documents.`,
        "Do not rely on third-party summaries, copied fee tables, old screenshots or counselling claims unless they match the latest official source.",
      ]),
      section("Admissions And Disclosure Checks", [
        "Admissions interest should be routed to official St.Marys University admissions channels, not unsupported deadline or seat claims.",
        "University-level recognition and programme-level approvals are separate checks and should not be merged into one claim.",
      ]),
      section("FAQs", [
        "FAQ answers should stay limited to course identity, official route, verification steps and proof-required fields.",
        "Eligibility, duration, fee, intake and professional approval details must remain blank unless official proof is available.",
      ]),
    ];
  }

  if (kind === "admission") {
    return [
      section("Admission Question", [
        `This guide answers the search intent behind ${topic} without adding unverified admission dates, seat counts, fee promises or eligibility claims.`,
        "It is designed to move prospective students from search results to official St.Marys University admissions verification.",
      ]),
      section("Official Application Route", [
        "Use the official admissions link and contact route for the current application process.",
        "Any deadline, counselling schedule, entrance requirement or document checklist should be treated as current only when published or confirmed by St.Marys University.",
      ]),
      section("Documents And Fee Confirmation", [
        "Applicants should confirm documents, fee structure, refund rules, scholarship status and payment process through official channels.",
        "Screenshots, verbal counselling claims and aggregator listings should not override official university information.",
      ]),
      section("Counselling Questions", [
        "Useful questions include course availability, school, admission step, contact person, official document source and disclosure route.",
        "Placement, salary, ranking and guarantee-based claims should be ignored unless St.Marys University publishes verifiable evidence.",
      ]),
      section("FAQs", [
        "Admission FAQ answers should be short, factual and route users to official verification.",
        "Where proof is missing, the answer should say that confirmation is required instead of guessing.",
      ]),
    ];
  }

  if (kind === "comparison") {
    return [
      section("Decision Question", [
        `${topic} should be handled as a decision checklist, not as a superiority claim.`,
        "The goal is to compare official documents, course identity, location, disclosures and current admissions routes.",
      ]),
      section("Comparison Checklist", [
        `Compare ${proofHeldFields}, campus access, student support and official recognition evidence from each institution.`,
        "Claims such as best, top, guaranteed placement or highest package should be accepted only when backed by current public proof.",
      ]),
      section("Official Course And Disclosure Links", [
        "For St.Marys University, use the official course, admissions, disclosure and contact routes linked on this page.",
        "Keep the university-level and programme-level verification steps separate when comparing options.",
      ]),
      section("Questions For Counselling", [
        "Ask counselling teams for document sources, publication dates and the route where students can verify the same information independently.",
        "If a claim cannot be verified publicly or through official communication, treat it as unconfirmed.",
      ]),
      section("FAQs", [
        "Comparison FAQ answers should help students choose safely without making ranking or outcome promises.",
        "The safe answer is to verify first, then compare based on official evidence.",
      ]),
    ];
  }

  if (kind === "geo") {
    return [
      section("Location Answer", [
        `This page serves users searching for ${topic} by connecting the query to St.Marys University's official Hyderabad, Telangana verification routes.`,
        "Local-intent users should confirm campus location, travel route, admissions contact and course availability through official sources.",
      ]),
      section("Official Campus And Contact Checks", [
        "Use St.Marys University's campus-location and contact pages before planning a visit.",
        "Do not rely on third-party maps, old listings or unofficial phone numbers when making admission or visit decisions.",
      ]),
      section("Course And School Routes", [
        "Students can move from local search intent to schools, courses and admissions pages to continue verification.",
        "Course-specific details should still be checked on official course or admissions routes.",
      ]),
      section("Questions To Ask Before Visiting", [
        "Before visiting, confirm office hours, admission counselling availability, required documents and whether the relevant school contact is available.",
        "Hostel, transport, scholarship, lab, clinical exposure and facility details require official confirmation.",
      ]),
      section("Verification Links", [
        "The links on this page are selected to reduce dependence on aggregator pages and copied local listings.",
        "If a local claim cannot be matched with official St.Marys University information, treat it as unverified.",
      ]),
    ];
  }

  return [
    section("What This Search Means", [
      `${topic} is a high-risk search phrase when it suggests a ranking, guarantee, first-ever claim or outcome promise.`,
      "This page answers the query by explaining verification steps instead of declaring St.Marys University as best, top, No.1, first, guaranteed or highest.",
    ]),
    section("What Students Should Verify", [
      `Students should verify ${proofHeldFields}, official recognition evidence, course identity, school route and admissions process.`,
      "A strong choice should be based on current public documents and direct university confirmation, not promotional wording alone.",
    ]),
    section("Recognition And Disclosure Checks", [
      "University-level recognition, professional programme approvals, NAAC status, rankings and placement outcomes are different evidence categories.",
      "Each category should be checked separately through the official St.Marys University website, public documents or approved contact routes.",
    ]),
    section("Questions To Ask Before Applying", [
      "Ask for the official source of any claim about fees, intake, eligibility, placements, scholarships, facilities or approvals.",
      "If the claim cannot be verified, keep it out of application decisions until St.Marys University provides proof.",
    ]),
    section("Official St.Marys University Links", [
      "Use the official links on this page to continue from broad search intent to verified university information.",
      "This is the safest way to support SEO, answer engines and student decision-making without creating unsupported claims.",
    ]),
  ];
};

const internalLinksFor = (kind: keyof typeof h2ByIntent, seed: Seed): SeoPage["internalLinks"] => {
  const core = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About St.Marys University" },
    { href: "/schools", label: "Schools" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" },
    { href: "/approvals-recognitions", label: "Approvals & Recognitions" },
  ];
  if (kind === "patient") {
    return [
      { href: "/health-allied-health-sciences", label: "Health & Allied Health Sciences" },
      { href: "/rehabilitation-sciences", label: "Rehabilitation Sciences" },
      { href: "/campus-location-hyderabad", label: "Campus Location" },
      { href: "/contact", label: "Contact St.Marys University" },
    ];
  }
  if (kind === "compliance") {
    return [
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure" },
      { href: "/approvals-recognitions", label: "Approvals & Recognitions" },
      { href: "/iqac/quality-assurance", label: "IQAC & Quality" },
      { href: "/contact", label: "Contact" },
    ];
  }
  if (kind === "course" && seed.officialCourseSlug) {
    const course = OFFICIAL_COURSE_BY_SLUG.get(seed.officialCourseSlug);
    return [
      ...(course?.officialPath ? [{ href: course.officialPath, label: course.seoName }] : []),
      { href: "/schools", label: "Schools" },
      { href: "/admissions", label: "Admissions" },
      { href: "/fee-structure", label: "Fee Structure" },
      { href: "/approvals-recognitions", label: "Approvals & Recognitions" },
    ];
  }
  return core;
};

const courseMetaContext = (seed: Seed) => {
  if (seed.routeGroup === "student-guides") return "student FAQ";
  if (seed.slug.includes("admission")) return "admission checklist";
  if (seed.slug.includes("hyderabad")) return "Hyderabad course guide";
  return "course guide";
};

const makePage = (seed: Seed): SeoPage => {
  const kind = intentKind(seed) as keyof typeof h2ByIntent;
  const course = seed.officialCourseSlug ? OFFICIAL_COURSE_BY_SLUG.get(seed.officialCourseSlug) : undefined;
  const sourceOfTruth: SeoSourceOfTruth = COMPLIANCE_SOURCE_SEO_PAGE_NUMBERS.has(seed.no) ? "compliance-pages" : "seo-pages";
  const isApproved =
    ((seed.no >= 1 && seed.no <= 200) || ADDITIONAL_APPROVED_SEO_PAGE_NUMBERS.has(seed.no)) &&
    !UNAPPROVED_SEO_PAGE_NUMBERS.has(seed.no);
  const requiresManualApproval =
    HIGH_RISK_SEO_PAGE_NUMBERS.has(seed.no) || UNAPPROVED_SEO_PAGE_NUMBERS.has(seed.no);
  const isIndexable = isApproved && !requiresManualApproval && sourceOfTruth === "seo-pages";
  const robots: SeoRobots = isIndexable ? "index, follow" : "noindex, follow";
  const claimDisclaimer = UNAPPROVED_SEO_PAGE_NUMBERS.has(seed.no)
    ? UNAPPROVED_PAGE_DISCLAIMER
    : requiresManualApproval
      ? HIGH_RISK_CLAIM_DISCLAIMER
      : "This page is an isolated student guidance page. Official St.Marys University routes should be used for final verification.";
  const titleBase =
    seed.risk === "High" && /best|top|no\.?1|100%|highest|first/i.test(seed.keyword)
      ? `${titleCase(seed.keyword)}? Verify First`
      : `${titleCase(seed.keyword)} Guide`;
  const title = trim(titleBase, 58);
  const description = trim(
    kind === "patient"
      ? `People searching for ${seed.keyword} can contact St.Marys University to verify current rehabilitation-linked support before visiting.`
      : kind === "course"
        ? `Check ${course?.seoName || seed.keyword} with this ${courseMetaContext(seed)} using official St.Marys University routes before applying.`
        : kind === "compliance"
          ? `Verify ${seed.keyword} through official St.Marys University disclosure status, evidence links and contact routes.`
          : `Use official St.Marys University routes to verify ${seed.keyword} claims before relying on rankings, fees or outcomes.`,
    150
  );

  return {
    ...seed,
    path: routePath(seed.routeGroup, seed.slug),
    title,
    description,
    h1: title,
    h2: h2ByIntent[kind],
    sections: sectionsFor(kind, seed, course),
    riskLevel: riskLevelFor(seed),
    robots,
    isApproved,
    isIndexable,
    requiresManualApproval,
    claimDisclaimer,
    sourceOfTruth,
    safeAngle:
      kind === "patient"
        ? "Patient-facing enquiry page that recommends official verification before visiting."
        : kind === "course"
          ? "Official-course whitelist page with no unsupported fee, intake, eligibility or approval claims."
          : kind === "compliance"
            ? "Disclosure-status page using evidence-first language."
            : "Claim-check page that answers the search without making superiority claims.",
    claimHandlingNote:
      kind === "patient"
        ? "Do not claim treatment availability, doctors, OPD/IPD, emergency care, fees, timings or outcomes without official proof."
        : kind === "course"
          ? "Do not add eligibility, duration, fee, intake, approval, salary, placement, ranking or accreditation unless official proof is provided."
          : kind === "compliance"
            ? "Use published evidence or status labels only."
            : "Do not state St.Marys University is best, top, No.1, first, guaranteed or highest without official evidence.",
    directAnswer:
      kind === "patient"
        ? "If you are searching for physiotherapy or rehabilitation support near Hyderabad, use official St.Marys University contact routes to verify whether any current public support information is available before visiting."
        : kind === "course"
          ? `${course?.seoName || seed.keyword} should be checked through official St.Marys University course and admissions routes. Final fee, intake, eligibility and approval details require official confirmation.`
          : kind === "compliance"
            ? "Use official St.Marys University disclosure pages and evidence documents for verification. Items not publicly released should be treated as status-tracked, not claimed."
            : "This page does not claim St.Marys University is the best, top or No.1. It explains what students should verify before trusting that type of search result.",
    keyFacts:
      kind === "patient"
        ? [
            { label: "Institution", value: "St.Marys University" },
            { label: "Location", value: "Hyderabad, Telangana" },
            { label: "Use", value: "Patient enquiry and public verification" },
            { label: "Before visiting", value: "Use official contact routes and do not assume treatment availability" },
          ]
        : kind === "course"
          ? [
              { label: "Course name", value: course?.seoName || seed.keyword },
              { label: "School area", value: course?.school || "Official St.Marys University school route" },
              { label: "Verification", value: "Admissions and disclosure routes" },
              { label: "Held for proof", value: "Fee, intake, duration, eligibility, approvals and outcomes" },
            ]
          : [
              { label: "Official website", value: "https://smru.edu.in" },
              { label: "Legal name", value: "St.Marys University" },
              { label: "Public brand", value: "St.Marys University" },
              { label: "Verification route", value: "Official disclosures and contact channels" },
            ],
    faqTopics:
      kind === "patient"
        ? ["official contact route", "public verification", "medical suitability", "emergency care", "unverified service details"]
        : kind === "course"
          ? ["course identity", "admission route", "fees and intake confirmation", "professional approval verification", "official contact"]
          : kind === "compliance"
            ? ["UGC status", "NAAC readiness", "IQAC status", "public disclosure", "official evidence"]
            : ["rankings", "recognition", "fees", "placements", "official documents"],
    schema: schemaFor(kind, seed),
    internalLinks: internalLinksFor(kind, seed),
    cta: kind === "patient" ? "Contact St.Marys University to confirm current support before visiting." : "Use official St.Marys University links to verify details before applying.",
    indexingNote: seed.risk === "High" ? "Index after content QA; no unsupported claims." : "Index after standard QA.",
    aiOptimizationNote: "Use a short direct answer, facts table, FAQ block and official links for answer engines.",
    ugcNaacNote:
      kind === "patient"
        ? "Position as clinical exposure, rehabilitation education ecosystem and patient-care-linked learning; public verification required."
        : kind === "compliance"
          ? "Use readiness/status language only unless official NAAC/UGC evidence is published."
          : "University-level recognition may be cited only from official evidence; programme-level proof remains separate.",
  };
};

const seeds: Seed[] = [
  { no: 1, bucket: "A. National aggressive keywords", keyword: "No.1 college in India", slug: "no1-college-in-india-checklist", routeGroup: "seo", intent: "Investigational", pageType: "Claim checklist", risk: "High" },
  { no: 2, bucket: "A. National aggressive keywords", keyword: "Best college in India", slug: "best-college-in-india-checklist", routeGroup: "seo", intent: "Investigational", pageType: "Claim checklist", risk: "High" },
  { no: 3, bucket: "A. National aggressive keywords", keyword: "Top college in India", slug: "top-college-in-india-checklist", routeGroup: "seo", intent: "Investigational", pageType: "Claim checklist", risk: "High" },
  { no: 4, bucket: "A. National aggressive keywords", keyword: "Best university in India", slug: "best-university-in-india-checklist", routeGroup: "seo", intent: "Investigational", pageType: "Claim checklist", risk: "High" },
  { no: 5, bucket: "A. National aggressive keywords", keyword: "Top university in India", slug: "top-university-in-india-checklist", routeGroup: "seo", intent: "Investigational", pageType: "Claim checklist", risk: "High" },
  { no: 6, bucket: "A. National aggressive keywords", keyword: "No.1 private university in India", slug: "no1-private-university-india-checklist", routeGroup: "seo", intent: "Investigational", pageType: "Claim checklist", risk: "High" },
  { no: 7, bucket: "A. National aggressive keywords", keyword: "Best rehabilitation university in India", slug: "best-rehabilitation-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 8, bucket: "A. National aggressive keywords", keyword: "Top rehabilitation university in India", slug: "top-rehabilitation-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 9, bucket: "A. National aggressive keywords", keyword: "Best health sciences university in India", slug: "best-health-sciences-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 10, bucket: "A. National aggressive keywords", keyword: "Best allied health sciences university in India", slug: "best-allied-health-sciences-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 11, bucket: "A. National aggressive keywords", keyword: "Best psychology university in India", slug: "best-psychology-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 12, bucket: "A. National aggressive keywords", keyword: "Best nursing university in India", slug: "best-nursing-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 13, bucket: "A. National aggressive keywords", keyword: "Best engineering university in India", slug: "best-engineering-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 14, bucket: "A. National aggressive keywords", keyword: "Best law university in India", slug: "best-law-university-india", routeGroup: "seo", intent: "Investigational", pageType: "SEO guide", risk: "High" },
  { no: 15, bucket: "A. National aggressive keywords", keyword: "Best BPT college in India", slug: "best-bpt-college-india", routeGroup: "seo", intent: "Course investigational", pageType: "SEO guide", risk: "High", officialCourseSlug: "bpt" },
  { no: 16, bucket: "A. National aggressive keywords", keyword: "Best BASLP college in India", slug: "best-baslp-college-india", routeGroup: "seo", intent: "Course investigational", pageType: "SEO guide", risk: "High", officialCourseSlug: "baslp" },
  { no: 17, bucket: "A. National aggressive keywords", keyword: "Best B.Sc Nursing college in India", slug: "best-bsc-nursing-college-india", routeGroup: "seo", intent: "Course investigational", pageType: "SEO guide", risk: "High", officialCourseSlug: "bsc-nursing" },
  { no: 18, bucket: "A. National aggressive keywords", keyword: "Best B.Tech CSE college in India", slug: "best-btech-cse-college-india", routeGroup: "seo", intent: "Course investigational", pageType: "SEO guide", risk: "High", officialCourseSlug: "btech-cse" },
  { no: 19, bucket: "A. National aggressive keywords", keyword: "Best law college in India", slug: "best-law-college-india", routeGroup: "seo", intent: "Course investigational", pageType: "SEO guide", risk: "High" },
  { no: 20, bucket: "A. National aggressive keywords", keyword: "Top private university admissions India", slug: "top-private-university-admissions-india", routeGroup: "seo", intent: "Admission research", pageType: "SEO guide", risk: "High" },
  { no: 21, bucket: "A. National aggressive keywords", keyword: "100% placement guaranteed college", slug: "placement-guarantee-college-checklist", routeGroup: "seo", intent: "Risk query", pageType: "Claim checklist", risk: "High" },
  { no: 22, bucket: "A. National aggressive keywords", keyword: "Highest salary package college", slug: "highest-salary-package-college-checklist", routeGroup: "seo", intent: "Risk query", pageType: "Claim checklist", risk: "High" },
  { no: 23, bucket: "A. National aggressive keywords", keyword: "India's first university", slug: "indias-first-university-claim-checklist", routeGroup: "seo", intent: "Risk query", pageType: "Claim checklist", risk: "High" },
  { no: 24, bucket: "A. National aggressive keywords", keyword: "Fastest growing university in India", slug: "fastest-growing-university-india-checklist", routeGroup: "seo", intent: "Risk query", pageType: "Claim checklist", risk: "High" },
  { no: 25, bucket: "A. National aggressive keywords", keyword: "Best college with scholarships in India", slug: "best-college-scholarships-india", routeGroup: "seo", intent: "Scholarship research", pageType: "SEO guide", risk: "High" },
  { no: 26, bucket: "A. National aggressive keywords", keyword: "Top university for healthcare courses India", slug: "top-university-healthcare-courses-india", routeGroup: "seo", intent: "Course research", pageType: "SEO guide", risk: "High" },
  { no: 27, bucket: "A. National aggressive keywords", keyword: "Best university for inclusive education India", slug: "best-inclusive-education-university-india", routeGroup: "seo", intent: "Course research", pageType: "SEO guide", risk: "High" },
  { no: 28, bucket: "A. National aggressive keywords", keyword: "Best university for forensic science India", slug: "best-forensic-science-university-india", routeGroup: "seo", intent: "Course research", pageType: "SEO guide", risk: "High", officialCourseSlug: "bsc-forensic-science" },
  { no: 29, bucket: "A. National aggressive keywords", keyword: "Best university near Hyderabad India", slug: "best-university-near-hyderabad-india", routeGroup: "seo", intent: "Geo research", pageType: "SEO guide", risk: "High" },
  { no: 30, bucket: "A. National aggressive keywords", keyword: "Best university with campus facilities India", slug: "best-university-campus-facilities-india", routeGroup: "seo", intent: "Campus research", pageType: "SEO guide", risk: "High" },
  { no: 31, bucket: "B. Hyderabad/Telangana keywords", keyword: "Best college in Hyderabad", slug: "best-college-in-hyderabad-checklist", routeGroup: "seo", intent: "Local commercial", pageType: "GEO guide", risk: "High" },
  { no: 32, bucket: "B. Hyderabad/Telangana keywords", keyword: "Top college in Hyderabad", slug: "top-college-in-hyderabad-checklist", routeGroup: "seo", intent: "Local commercial", pageType: "GEO guide", risk: "High" },
  { no: 33, bucket: "B. Hyderabad/Telangana keywords", keyword: "Best university in Hyderabad", slug: "best-university-in-hyderabad-checklist", routeGroup: "seo", intent: "Local commercial", pageType: "GEO guide", risk: "High" },
  { no: 34, bucket: "B. Hyderabad/Telangana keywords", keyword: "Top university in Hyderabad", slug: "top-university-in-hyderabad-checklist", routeGroup: "seo", intent: "Local commercial", pageType: "GEO guide", risk: "High" },
  { no: 35, bucket: "B. Hyderabad/Telangana keywords", keyword: "Best college in Telangana", slug: "best-college-in-telangana-checklist", routeGroup: "seo", intent: "Regional commercial", pageType: "GEO guide", risk: "High" },
  { no: 36, bucket: "B. Hyderabad/Telangana keywords", keyword: "Top college in Telangana", slug: "top-college-in-telangana-checklist", routeGroup: "seo", intent: "Regional commercial", pageType: "GEO guide", risk: "High" },
  { no: 37, bucket: "B. Hyderabad/Telangana keywords", keyword: "Best university in Telangana", slug: "best-university-in-telangana-checklist", routeGroup: "seo", intent: "Regional commercial", pageType: "GEO guide", risk: "High" },
  { no: 38, bucket: "B. Hyderabad/Telangana keywords", keyword: "Top university in Telangana", slug: "top-university-in-telangana-checklist", routeGroup: "seo", intent: "Regional commercial", pageType: "GEO guide", risk: "High" },
  { no: 39, bucket: "B. Hyderabad/Telangana keywords", keyword: "Private university in Hyderabad", slug: "private-university-in-hyderabad", routeGroup: "seo", intent: "Local commercial", pageType: "GEO guide", risk: "Medium" },
  { no: 40, bucket: "B. Hyderabad/Telangana keywords", keyword: "Private university in Telangana", slug: "private-university-in-telangana", routeGroup: "seo", intent: "Regional commercial", pageType: "GEO guide", risk: "Medium" },
  { no: 41, bucket: "B. Hyderabad/Telangana keywords", keyword: "UGC recognized university in Hyderabad", slug: "ugc-recognized-university-hyderabad", routeGroup: "seo", intent: "Trust search", pageType: "GEO trust page", risk: "Medium" },
  { no: 42, bucket: "B. Hyderabad/Telangana keywords", keyword: "UGC recognized university in Telangana", slug: "ugc-recognized-university-telangana", routeGroup: "seo", intent: "Trust search", pageType: "GEO trust page", risk: "Medium" },
  { no: 43, bucket: "B. Hyderabad/Telangana keywords", keyword: "Rehabilitation university Hyderabad", slug: "rehabilitation-university-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 44, bucket: "B. Hyderabad/Telangana keywords", keyword: "Health sciences university Hyderabad", slug: "health-sciences-university-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 45, bucket: "B. Hyderabad/Telangana keywords", keyword: "Allied health sciences college Hyderabad", slug: "allied-health-sciences-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 46, bucket: "B. Hyderabad/Telangana keywords", keyword: "Psychology college Hyderabad", slug: "psychology-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 47, bucket: "B. Hyderabad/Telangana keywords", keyword: "Nursing college Hyderabad", slug: "nursing-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 48, bucket: "B. Hyderabad/Telangana keywords", keyword: "Engineering college Hyderabad", slug: "engineering-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 49, bucket: "B. Hyderabad/Telangana keywords", keyword: "Law college Hyderabad", slug: "law-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium" },
  { no: 50, bucket: "B. Hyderabad/Telangana keywords", keyword: "BPT college Hyderabad", slug: "bpt-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium", officialCourseSlug: "bpt" },
  { no: 51, bucket: "B. Hyderabad/Telangana keywords", keyword: "BASLP college Hyderabad", slug: "baslp-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium", officialCourseSlug: "baslp" },
  { no: 52, bucket: "B. Hyderabad/Telangana keywords", keyword: "B.Sc Nursing college Hyderabad", slug: "bsc-nursing-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium", officialCourseSlug: "bsc-nursing" },
  { no: 53, bucket: "B. Hyderabad/Telangana keywords", keyword: "B.Tech CSE college Hyderabad", slug: "btech-cse-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium", officialCourseSlug: "btech-cse" },
  { no: 54, bucket: "B. Hyderabad/Telangana keywords", keyword: "LLB college Hyderabad", slug: "llb-college-hyderabad", routeGroup: "seo", intent: "Local course", pageType: "GEO guide", risk: "Medium", officialCourseSlug: "llb" },
  { no: 55, bucket: "B. Hyderabad/Telangana keywords", keyword: "Colleges near Ramoji Film City", slug: "colleges-near-ramoji-film-city", routeGroup: "seo", intent: "Local high intent", pageType: "Local page", risk: "Medium" },
  { no: 56, bucket: "B. Hyderabad/Telangana keywords", keyword: "University near Ramoji Film City", slug: "university-near-ramoji-film-city", routeGroup: "seo", intent: "Local high intent", pageType: "Local page", risk: "Medium" },
  { no: 57, bucket: "B. Hyderabad/Telangana keywords", keyword: "College in Deshmukhi Hyderabad", slug: "college-in-deshmukhi-hyderabad", routeGroup: "seo", intent: "Local high intent", pageType: "Local page", risk: "Medium" },
  { no: 58, bucket: "B. Hyderabad/Telangana keywords", keyword: "University in Yadadri Bhuvanagiri", slug: "university-in-yadadri-bhuvanagiri", routeGroup: "seo", intent: "Local high intent", pageType: "Local page", risk: "Medium" },
  { no: 59, bucket: "B. Hyderabad/Telangana keywords", keyword: "Admissions open college Hyderabad", slug: "admissions-open-college-hyderabad", routeGroup: "seo", intent: "Admission local", pageType: "Admission guide", risk: "Medium" },
  { no: 60, bucket: "B. Hyderabad/Telangana keywords", keyword: "Campus tour university Hyderabad", slug: "campus-tour-university-hyderabad", routeGroup: "seo", intent: "Local conversion", pageType: "Local page", risk: "Low" },
  { no: 61, bucket: "C. Course-specific keywords", keyword: "BASLP course in Hyderabad", slug: "baslp-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "baslp" },
  { no: 62, bucket: "C. Course-specific keywords", keyword: "BASLP admission guide", slug: "baslp-admission-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "baslp" },
  { no: 63, bucket: "C. Course-specific keywords", keyword: "M.Sc Audiology course", slug: "msc-audiology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "msc-audiology" },
  { no: 64, bucket: "C. Course-specific keywords", keyword: "BPO course guide", slug: "bpo-course-guide", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bpo" },
  { no: 65, bucket: "C. Course-specific keywords", keyword: "MPO course guide", slug: "mpo-course-guide", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "mpo" },
  { no: 66, bucket: "C. Course-specific keywords", keyword: "BA BEd special inclusive education", slug: "ba-bed-special-inclusive-education", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "ba-bed-special-inclusive-education" },
  { no: 67, bucket: "C. Course-specific keywords", keyword: "BSc BEd special inclusive education", slug: "bsc-bed-special-inclusive-education", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-bed-special-inclusive-education" },
  { no: 68, bucket: "C. Course-specific keywords", keyword: "BCom BEd special inclusive education", slug: "bcom-bed-special-inclusive-education", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bcom-bed-special-inclusive-education" },
  { no: 69, bucket: "C. Course-specific keywords", keyword: "BPT course in Hyderabad", slug: "bpt-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bpt" },
  { no: 70, bucket: "C. Course-specific keywords", keyword: "BPT admission guide", slug: "bpt-admission-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bpt" },
  { no: 71, bucket: "C. Course-specific keywords", keyword: "MPT course in Hyderabad", slug: "mpt-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "mpt" },
  { no: 72, bucket: "C. Course-specific keywords", keyword: "BOT course in Hyderabad", slug: "bot-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bot" },
  { no: 73, bucket: "C. Course-specific keywords", keyword: "BOT admission guide", slug: "bot-admission-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bot" },
  { no: 74, bucket: "C. Course-specific keywords", keyword: "MOT course in Hyderabad", slug: "mot-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "mot" },
  { no: 75, bucket: "C. Course-specific keywords", keyword: "Medical Lab Technology course", slug: "medical-lab-technology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "medical-lab-technology" },
  { no: 76, bucket: "C. Course-specific keywords", keyword: "Anesthesia Operation Theatre Technology course", slug: "anesthesia-operation-theatre-technology", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "anesthesia-operation-theatre-technology" },
  { no: 77, bucket: "C. Course-specific keywords", keyword: "Cardiovascular Technology course", slug: "cardiovascular-technology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "cardiovascular-technology" },
  { no: 78, bucket: "C. Course-specific keywords", keyword: "Emergency Medical Technology course", slug: "emergency-medical-technology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "emergency-medical-technology" },
  { no: 79, bucket: "C. Course-specific keywords", keyword: "Optometry course in Hyderabad", slug: "optometry-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "optometry" },
  { no: 80, bucket: "C. Course-specific keywords", keyword: "Radiotherapy Technology course", slug: "radiotherapy-technology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "radiotherapy-technology" },
  { no: 81, bucket: "C. Course-specific keywords", keyword: "BSc Forensic Science course", slug: "bsc-forensic-science-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-forensic-science" },
  { no: 82, bucket: "C. Course-specific keywords", keyword: "BSc Forensic Science admission guide", slug: "bsc-forensic-science-admission", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-forensic-science" },
  { no: 83, bucket: "C. Course-specific keywords", keyword: "BSc Clinical Psychology course", slug: "bsc-clinical-psychology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-clinical-psychology" },
  { no: 84, bucket: "C. Course-specific keywords", keyword: "MA Clinical Psychology course", slug: "ma-clinical-psychology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "ma-clinical-psychology" },
  { no: 85, bucket: "C. Course-specific keywords", keyword: "Professional Diploma Clinical Psychology", slug: "professional-diploma-clinical-psychology", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "professional-diploma-clinical-psychology" },
  { no: 86, bucket: "C. Course-specific keywords", keyword: "PG Diploma Rehabilitation Psychology", slug: "pg-diploma-rehabilitation-psychology", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "pg-diploma-rehabilitation-psychology" },
  { no: 87, bucket: "C. Course-specific keywords", keyword: "B Psychology course", slug: "b-psychology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "b-psychology" },
  { no: 88, bucket: "C. Course-specific keywords", keyword: "M Psychology course", slug: "m-psychology-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "m-psychology" },
  { no: 89, bucket: "C. Course-specific keywords", keyword: "BSc Nursing course in Hyderabad", slug: "bsc-nursing-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-nursing" },
  { no: 90, bucket: "C. Course-specific keywords", keyword: "BSc Nursing admission guide", slug: "bsc-nursing-admission-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-nursing" },
  { no: 91, bucket: "C. Course-specific keywords", keyword: "MSc Nursing course in Hyderabad", slug: "msc-nursing-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "msc-nursing" },
  { no: 92, bucket: "C. Course-specific keywords", keyword: "BTech Rehabilitation Engineering course", slug: "btech-rehabilitation-engineering-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "btech-rehabilitation-engineering-prosthetics-orthotics-assistive-technologies" },
  { no: 93, bucket: "C. Course-specific keywords", keyword: "BTech Rehabilitation Engineering admission", slug: "btech-rehabilitation-engineering-admission", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "btech-rehabilitation-engineering-prosthetics-orthotics-assistive-technologies" },
  { no: 94, bucket: "C. Course-specific keywords", keyword: "BTech CSE course in Hyderabad", slug: "btech-cse-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "btech-cse" },
  { no: 95, bucket: "C. Course-specific keywords", keyword: "BTech CSE admission guide", slug: "btech-cse-admission-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Course guide", risk: "Medium", officialCourseSlug: "btech-cse" },
  { no: 96, bucket: "C. Course-specific keywords", keyword: "BTech CSE AI ML course", slug: "btech-cse-ai-ml-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "btech-cse-ai-ml" },
  { no: 97, bucket: "C. Course-specific keywords", keyword: "BTech CSE AI DS course", slug: "btech-cse-ai-ds-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "btech-cse-ai-ds" },
  { no: 98, bucket: "C. Course-specific keywords", keyword: "LLB course in Hyderabad", slug: "llb-course-hyderabad", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "llb" },
  { no: 99, bucket: "C. Course-specific keywords", keyword: "LLB Hons course", slug: "llb-hons-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "llb-hons" },
  { no: 100, bucket: "C. Course-specific keywords", keyword: "BA LLB Hons course", slug: "ba-llb-hons-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "ba-llb-hons" },
  { no: 101, bucket: "C. Course-specific keywords", keyword: "BBA LLB Hons course", slug: "bba-llb-hons-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bba-llb-hons" },
  { no: 102, bucket: "C. Course-specific keywords", keyword: "BSc LLB Hons course", slug: "bsc-llb-hons-course", routeGroup: "admission-guides", intent: "Course intent", pageType: "Course guide", risk: "Medium", officialCourseSlug: "bsc-llb-hons" },
  { no: 103, bucket: "C. Course-specific keywords", keyword: "Rehabilitation sciences courses", slug: "rehabilitation-sciences-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 104, bucket: "C. Course-specific keywords", keyword: "Health allied health sciences courses", slug: "health-allied-health-sciences-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 105, bucket: "C. Course-specific keywords", keyword: "Psychology courses at university", slug: "psychology-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 106, bucket: "C. Course-specific keywords", keyword: "Nursing courses at university", slug: "nursing-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 107, bucket: "C. Course-specific keywords", keyword: "Engineering emerging technologies courses", slug: "engineering-emerging-technologies-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 108, bucket: "C. Course-specific keywords", keyword: "Law courses at university", slug: "law-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 109, bucket: "C. Course-specific keywords", keyword: "Undergraduate rehabilitation courses", slug: "undergraduate-rehabilitation-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 110, bucket: "C. Course-specific keywords", keyword: "Postgraduate rehabilitation courses", slug: "postgraduate-rehabilitation-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 111, bucket: "C. Course-specific keywords", keyword: "Allied health technology courses", slug: "allied-health-technology-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 112, bucket: "C. Course-specific keywords", keyword: "Clinical psychology courses", slug: "clinical-psychology-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 113, bucket: "C. Course-specific keywords", keyword: "Inclusive education courses", slug: "inclusive-education-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 114, bucket: "C. Course-specific keywords", keyword: "CSE specialisation courses", slug: "cse-specialisation-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 115, bucket: "C. Course-specific keywords", keyword: "Integrated law courses", slug: "integrated-law-courses", routeGroup: "admission-guides", intent: "Course category", pageType: "Course index", risk: "Medium" },
  { no: 116, bucket: "D. Admission-intent keywords", keyword: "St.Marys University admissions 2026", slug: "smru-admissions-2026", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Medium" },
  { no: 117, bucket: "D. Admission-intent keywords", keyword: "UG admissions 2026", slug: "ug-admissions-2026", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Medium" },
  { no: 118, bucket: "D. Admission-intent keywords", keyword: "PG admissions 2026", slug: "pg-admissions-2026", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Medium" },
  { no: 119, bucket: "D. Admission-intent keywords", keyword: "Diploma admissions 2026", slug: "diploma-admissions-2026", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Medium" },
  { no: 120, bucket: "D. Admission-intent keywords", keyword: "SMCET 2026 guide", slug: "smcet-2026-guide", routeGroup: "admission-guides", intent: "Entrance", pageType: "Admission guide", risk: "Medium" },
  { no: 121, bucket: "D. Admission-intent keywords", keyword: "Entrance exam for St.Marys University", slug: "smru-entrance-exam", routeGroup: "admission-guides", intent: "Entrance", pageType: "Admission guide", risk: "Medium" },
  { no: 122, bucket: "D. Admission-intent keywords", keyword: "Direct admission St.Marys University", slug: "direct-admission-smru-checklist", routeGroup: "admission-guides", intent: "Admission", pageType: "Caution guide", risk: "High" },
  { no: 123, bucket: "D. Admission-intent keywords", keyword: "St.Marys University application form", slug: "application-form-guide", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Low" },
  { no: 124, bucket: "D. Admission-intent keywords", keyword: "Admission counselling guide", slug: "admission-counselling-guide", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Low" },
  { no: 125, bucket: "D. Admission-intent keywords", keyword: "Admission document checklist", slug: "document-checklist", routeGroup: "admission-guides", intent: "Admission", pageType: "Checklist", risk: "Low" },
  { no: 126, bucket: "D. Admission-intent keywords", keyword: "Fee confirmation before admission", slug: "fee-confirmation-before-admission", routeGroup: "admission-guides", intent: "Admission", pageType: "Caution guide", risk: "High" },
  { no: 127, bucket: "D. Admission-intent keywords", keyword: "Scholarship eligibility questions", slug: "scholarship-eligibility-questions", routeGroup: "admission-guides", intent: "Admission", pageType: "FAQ guide", risk: "Medium" },
  { no: 128, bucket: "D. Admission-intent keywords", keyword: "Hostel admission questions", slug: "hostel-admission-questions", routeGroup: "student-guides", intent: "Student", pageType: "Student guide", risk: "Medium" },
  { no: 129, bucket: "D. Admission-intent keywords", keyword: "Campus visit before admission", slug: "campus-visit-before-admission", routeGroup: "student-guides", intent: "Local admission", pageType: "Student guide", risk: "Low" },
  { no: 130, bucket: "D. Admission-intent keywords", keyword: "Parents admission checklist", slug: "parents-admission-checklist", routeGroup: "student-guides", intent: "Admission", pageType: "Parent guide", risk: "Low" },
  { no: 131, bucket: "D. Admission-intent keywords", keyword: "Apply online St.Marys University guide", slug: "apply-online-smru", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Low" },
  { no: 132, bucket: "D. Admission-intent keywords", keyword: "Admission last date check", slug: "admission-last-date-check", routeGroup: "admission-guides", intent: "Admission", pageType: "Caution guide", risk: "High" },
  { no: 133, bucket: "D. Admission-intent keywords", keyword: "Admission helpline guide", slug: "admission-helpline-guide", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Low" },
  { no: 134, bucket: "D. Admission-intent keywords", keyword: "Course selection before applying", slug: "course-selection-before-applying", routeGroup: "student-guides", intent: "Decision", pageType: "Student guide", risk: "Low" },
  { no: 135, bucket: "D. Admission-intent keywords", keyword: "Admission withdrawal refund questions", slug: "refund-withdrawal-questions", routeGroup: "admission-guides", intent: "Admission", pageType: "Caution guide", risk: "High" },
  { no: 136, bucket: "D. Admission-intent keywords", keyword: "PhD next cycle updates", slug: "phd-next-cycle-updates", routeGroup: "admission-guides", intent: "Admission", pageType: "Admission guide", risk: "Medium" },
  { no: 137, bucket: "D. Admission-intent keywords", keyword: "Law admissions guide", slug: "law-admissions-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Admission guide", risk: "Medium" },
  { no: 138, bucket: "D. Admission-intent keywords", keyword: "BTech admissions guide", slug: "btech-admissions-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Admission guide", risk: "Medium" },
  { no: 139, bucket: "D. Admission-intent keywords", keyword: "Health sciences admissions guide", slug: "health-sciences-admissions-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Admission guide", risk: "Medium" },
  { no: 140, bucket: "D. Admission-intent keywords", keyword: "Nursing admissions guide", slug: "nursing-admissions-guide", routeGroup: "admission-guides", intent: "Admission course", pageType: "Admission guide", risk: "Medium" },
  { no: 141, bucket: "E. Comparison/decision keywords", keyword: "Compare St.Marys University with other universities", slug: "compare-smru-with-other-universities", routeGroup: "student-guides", intent: "Decision", pageType: "Comparison", risk: "Medium" },
  { no: 142, bucket: "E. Comparison/decision keywords", keyword: "Private university vs college", slug: "private-university-vs-college", routeGroup: "student-guides", intent: "Decision", pageType: "Comparison", risk: "Low" },
  { no: 143, bucket: "E. Comparison/decision keywords", keyword: "University vs college admission", slug: "university-vs-college-admission", routeGroup: "student-guides", intent: "Decision", pageType: "Comparison", risk: "Low" },
  { no: 144, bucket: "E. Comparison/decision keywords", keyword: "BPT vs BOT", slug: "bpt-vs-bot", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 145, bucket: "E. Comparison/decision keywords", keyword: "BASLP vs BPT", slug: "baslp-vs-bpt", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 146, bucket: "E. Comparison/decision keywords", keyword: "BSc Nursing vs allied health", slug: "bsc-nursing-vs-allied-health", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 147, bucket: "E. Comparison/decision keywords", keyword: "BTech CSE vs CSE AI ML", slug: "btech-cse-vs-cse-ai-ml", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 148, bucket: "E. Comparison/decision keywords", keyword: "LLB vs BA LLB", slug: "llb-vs-ba-llb", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 149, bucket: "E. Comparison/decision keywords", keyword: "BA LLB vs BBA LLB", slug: "ba-llb-vs-bba-llb", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 150, bucket: "E. Comparison/decision keywords", keyword: "Clinical Psychology vs Rehabilitation Psychology", slug: "clinical-vs-rehabilitation-psychology", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 151, bucket: "E. Comparison/decision keywords", keyword: "Forensic Science vs Medical Lab Technology", slug: "forensic-science-vs-medical-lab-technology", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 152, bucket: "E. Comparison/decision keywords", keyword: "Optometry vs Radiotherapy Technology", slug: "optometry-vs-radiotherapy-technology", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 153, bucket: "E. Comparison/decision keywords", keyword: "MPT vs MOT", slug: "mpt-vs-mot", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 154, bucket: "E. Comparison/decision keywords", keyword: "BPO vs MPO", slug: "bpo-vs-mpo", routeGroup: "student-guides", intent: "Course decision", pageType: "Comparison", risk: "Medium" },
  { no: 155, bucket: "E. Comparison/decision keywords", keyword: "Course fees comparison checklist", slug: "course-fees-comparison-checklist", routeGroup: "student-guides", intent: "Decision", pageType: "Checklist", risk: "High" },
  { no: 156, bucket: "E. Comparison/decision keywords", keyword: "Placement claims comparison checklist", slug: "placement-claims-comparison-checklist", routeGroup: "student-guides", intent: "Decision", pageType: "Checklist", risk: "High" },
  { no: 157, bucket: "E. Comparison/decision keywords", keyword: "Campus facilities comparison checklist", slug: "campus-facilities-comparison-checklist", routeGroup: "student-guides", intent: "Decision", pageType: "Checklist", risk: "Low" },
  { no: 158, bucket: "E. Comparison/decision keywords", keyword: "UGC recognition comparison checklist", slug: "ugc-recognition-comparison-checklist", routeGroup: "student-guides", intent: "Trust decision", pageType: "Checklist", risk: "Medium" },
  { no: 159, bucket: "E. Comparison/decision keywords", keyword: "Professional approval comparison checklist", slug: "professional-approval-checklist", routeGroup: "student-guides", intent: "Trust decision", pageType: "Checklist", risk: "High" },
  { no: 160, bucket: "E. Comparison/decision keywords", keyword: "Scholarship comparison checklist", slug: "scholarship-comparison-checklist", routeGroup: "student-guides", intent: "Decision", pageType: "Checklist", risk: "Medium" },
  { no: 161, bucket: "F. Local/high-conversion keywords", keyword: "Campus near Ramoji Film City admissions", slug: "campus-near-ramoji-film-city-admissions", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Low" },
  { no: 162, bucket: "F. Local/high-conversion keywords", keyword: "University campus visit Hyderabad", slug: "university-campus-visit-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Low" },
  { no: 163, bucket: "F. Local/high-conversion keywords", keyword: "College hostel facilities Hyderabad", slug: "hostel-facilities-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Student guide", risk: "Medium" },
  { no: 164, bucket: "F. Local/high-conversion keywords", keyword: "Admissions office Hyderabad university", slug: "admissions-office-hyderabad-university", routeGroup: "student-guides", intent: "Local conversion", pageType: "Contact guide", risk: "Low" },
  { no: 165, bucket: "F. Local/high-conversion keywords", keyword: "College near Deshmukhi", slug: "college-near-deshmukhi", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Low" },
  { no: 166, bucket: "F. Local/high-conversion keywords", keyword: "University near Pochampally Mandal", slug: "university-near-pochampally-mandal", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Low" },
  { no: 167, bucket: "F. Local/high-conversion keywords", keyword: "College near Yadadri Bhuvanagiri", slug: "college-near-yadadri-bhuvanagiri", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Low" },
  { no: 168, bucket: "F. Local/high-conversion keywords", keyword: "Campus with hostel Hyderabad", slug: "campus-with-hostel-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Student guide", risk: "Medium" },
  { no: 169, bucket: "F. Local/high-conversion keywords", keyword: "Rehabilitation university campus Hyderabad", slug: "rehabilitation-university-campus-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Low" },
  { no: 170, bucket: "F. Local/high-conversion keywords", keyword: "Law college campus Hyderabad", slug: "law-college-campus-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Medium" },
  { no: 171, bucket: "F. Local/high-conversion keywords", keyword: "Nursing college campus Hyderabad", slug: "nursing-college-campus-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Medium" },
  { no: 172, bucket: "F. Local/high-conversion keywords", keyword: "Engineering college campus Hyderabad", slug: "engineering-college-campus-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Medium" },
  { no: 173, bucket: "F. Local/high-conversion keywords", keyword: "Allied health campus Hyderabad", slug: "allied-health-campus-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Medium" },
  { no: 174, bucket: "F. Local/high-conversion keywords", keyword: "Student counselling Hyderabad university", slug: "student-counselling-hyderabad-university", routeGroup: "student-guides", intent: "Local conversion", pageType: "Student guide", risk: "Low" },
  { no: 175, bucket: "F. Local/high-conversion keywords", keyword: "Weekend campus visit Hyderabad", slug: "weekend-campus-visit-hyderabad", routeGroup: "student-guides", intent: "Local conversion", pageType: "Local guide", risk: "Medium" },
  { no: 176, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "What is St.Marys University", slug: "what-is-smru", routeGroup: "student-guides", intent: "Informational", pageType: "AEO FAQ", risk: "Low" },
  { no: 177, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Is St.Marys University same as St.Marys University", slug: "is-st-marys-university-same-as-smru", routeGroup: "student-guides", intent: "Informational", pageType: "AEO FAQ", risk: "Low" },
  { no: 221, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "St.Marys University", slug: "Stmarys-university", routeGroup: "student-guides", intent: "Informational", pageType: "AEO FAQ", risk: "Low" },
  { no: 222, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "St.Marys University hyderabad", slug: "Stmarys-university-hyderabad", routeGroup: "student-guides", intent: "Local FAQ", pageType: "AEO FAQ", risk: "Low" },
  { no: 223, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "St.Marys University", slug: "Stmarys-rehabilitation-university", routeGroup: "student-guides", intent: "Informational", pageType: "AEO FAQ", risk: "Low" },
  { no: 178, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Where is St.Marys University located", slug: "where-is-smru-located", routeGroup: "student-guides", intent: "Local FAQ", pageType: "AEO FAQ", risk: "Low" },
  { no: 179, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Is St.Marys University UGC recognized", slug: "is-smru-ugc-recognized", routeGroup: "student-guides", intent: "Trust FAQ", pageType: "AEO FAQ", risk: "Medium" },
  { no: 180, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "How to apply to St.Marys University", slug: "how-to-apply-to-smru", routeGroup: "student-guides", intent: "Admission FAQ", pageType: "AEO FAQ", risk: "Low" },
  { no: 181, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "What courses does St.Marys University offer", slug: "what-courses-does-smru-offer", routeGroup: "student-guides", intent: "Course FAQ", pageType: "AEO FAQ", risk: "Medium" },
  { no: 182, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Does St.Marys University offer BPT", slug: "does-smru-offer-bpt", routeGroup: "student-guides", intent: "Course FAQ", pageType: "AEO FAQ", risk: "Medium", officialCourseSlug: "bpt" },
  { no: 183, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Does St.Marys University offer BSc Nursing", slug: "does-smru-offer-bsc-nursing", routeGroup: "student-guides", intent: "Course FAQ", pageType: "AEO FAQ", risk: "Medium", officialCourseSlug: "bsc-nursing" },
  { no: 184, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Does St.Marys University offer law courses", slug: "does-smru-offer-law-courses", routeGroup: "student-guides", intent: "Course FAQ", pageType: "AEO FAQ", risk: "Medium" },
  { no: 185, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Does St.Marys University offer BTech CSE", slug: "does-smru-offer-btech-cse", routeGroup: "student-guides", intent: "Course FAQ", pageType: "AEO FAQ", risk: "Medium", officialCourseSlug: "btech-cse" },
  { no: 186, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "What should I check before admission", slug: "what-to-check-before-admission", routeGroup: "student-guides", intent: "Admission FAQ", pageType: "AEO FAQ", risk: "Low" },
  { no: 187, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "How to verify university recognition", slug: "how-to-verify-university-recognition", routeGroup: "student-guides", intent: "Trust FAQ", pageType: "AEO FAQ", risk: "Medium" },
  { no: 188, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "What documents prove St.Marys University status", slug: "documents-prove-smru-status", routeGroup: "student-guides", intent: "Trust FAQ", pageType: "AEO FAQ", risk: "Medium" },
  { no: 189, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "Does St.Marys University have hostel", slug: "does-smru-have-hostel", routeGroup: "student-guides", intent: "Student FAQ", pageType: "AEO FAQ", risk: "Medium" },
  { no: 190, bucket: "G. AI answer / FAQ / voice-search pages", keyword: "How to contact St.Marys University admissions", slug: "contact-smru-admissions", routeGroup: "student-guides", intent: "Admission FAQ", pageType: "AEO FAQ", risk: "Low" },
  { no: 191, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "UGC disclosure St.Marys University", slug: "ugc-disclosure", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Medium" },
  { no: 192, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "Mandatory disclosure St.Marys University", slug: "index", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure index", risk: "Medium" },
  { no: 193, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "Statutory disclosure St.Marys University", slug: "statutory-disclosures", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Medium" },
  { no: 194, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "NAAC readiness St.Marys University", slug: "naac-readiness", routeGroup: "iqac", intent: "Compliance", pageType: "IQAC page", risk: "High" },
  { no: 195, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "IQAC quality assurance St.Marys University", slug: "quality-assurance", routeGroup: "iqac", intent: "Compliance", pageType: "IQAC page", risk: "Medium" },
  { no: 196, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "First academic year disclosure", slug: "first-academic-year-disclosure", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Medium" },
  { no: 197, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "Anti ragging disclosure", slug: "anti-ragging", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Medium" },
  { no: 198, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "Grievance redressal disclosure", slug: "grievance-redressal", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Medium" },
  { no: 199, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "Ombudsperson disclosure", slug: "ombudsperson", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Medium" },
  { no: 200, bucket: "H. UGC/NAAC trust and disclosure pages", keyword: "Public information disclosure", slug: "public-information", routeGroup: "mandatory-disclosure", intent: "Compliance", pageType: "Disclosure", risk: "Low" },
  { no: 201, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "rehabilitation hospital in Hyderabad", slug: "rehabilitation-hospital-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 202, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "physiotherapy treatment Hyderabad", slug: "physiotherapy-treatment-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 203, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "physiotherapy near Ramoji Film City", slug: "physiotherapy-near-ramoji-film-city", routeGroup: "student-guides", intent: "Local patient", pageType: "Patient service guide", risk: "High" },
  { no: 204, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "rehab centre in Hyderabad", slug: "rehab-centre-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 205, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "orthopedic physiotherapy Hyderabad", slug: "orthopedic-physiotherapy-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 206, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "neuro rehabilitation Hyderabad", slug: "neuro-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 207, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "sports physiotherapy Hyderabad", slug: "sports-physiotherapy-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 208, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "pediatric rehabilitation Hyderabad", slug: "pediatric-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 209, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "geriatric rehabilitation Hyderabad", slug: "geriatric-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 210, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "occupational therapy services Hyderabad", slug: "occupational-therapy-services-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 211, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "speech therapy services Hyderabad", slug: "speech-therapy-services-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 212, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "audiology services Hyderabad", slug: "audiology-services-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 213, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "prosthetics orthotics services Hyderabad", slug: "prosthetics-orthotics-services-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 214, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "assistive technology rehabilitation Hyderabad", slug: "assistive-technology-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 215, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "mental health rehabilitation Hyderabad", slug: "mental-health-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 216, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "water therapy rehabilitation Hyderabad", slug: "water-therapy-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 217, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "post surgery rehabilitation Hyderabad", slug: "post-surgery-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 218, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "cardiopulmonary rehabilitation Hyderabad", slug: "cardiopulmonary-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "High" },
  { no: 219, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "community rehabilitation Hyderabad", slug: "community-rehabilitation-hyderabad", routeGroup: "student-guides", intent: "Patient GEO", pageType: "Patient service guide", risk: "Medium" },
  { no: 220, bucket: "I. Hospital + Rehabilitation Service GEO Pages", keyword: "rehabilitation hospital near Deshmukhi", slug: "rehabilitation-hospital-near-deshmukhi", routeGroup: "student-guides", intent: "Local patient", pageType: "Patient service guide", risk: "High" },
];

export const SEO_PAGES: SeoPage[] = seeds.map(makePage);

export const ROUTABLE_SEO_PAGES = SEO_PAGES.filter((page) => page.sourceOfTruth === "seo-pages");

export const INDEXABLE_SEO_PAGES = ROUTABLE_SEO_PAGES.filter((page) => page.isIndexable);

export const NOINDEX_SEO_PAGES = SEO_PAGES.filter((page) => !page.isIndexable);

export const SEO_PAGES_BY_PATH = new Map(SEO_PAGES.map((page) => [page.path, page]));

export const getSeoPageByRoute = (routeGroup: SeoRouteGroup, slug: string) =>
  ROUTABLE_SEO_PAGES.find((page) => page.routeGroup === routeGroup && page.slug === slug);

export const getSeoPagesByRouteGroup = (routeGroup: SeoRouteGroup) =>
  ROUTABLE_SEO_PAGES.filter((page) => page.routeGroup === routeGroup);

export const getSeoPagesByBucket = (bucket: string) => SEO_PAGES.filter((page) => page.bucket === bucket);
