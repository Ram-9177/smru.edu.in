import type { InfoPageConfig } from "@/lib/seo/info-pages";
import { DISCLOSURE_LAST_REVIEWED, DISCLOSURE_NEXT_REVIEW_DUE } from "@/lib/shared/university";

const coreLinks = [
  { href: "/", label: "Stmarys University", description: "Official university homepage." },
  { href: "/schools", label: "Schools & Courses", description: "Explore official school, department, and programme pages." },
  { href: "/admissions", label: "Admissions", description: "Official admissions route and counselling guidance." },
  { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Official university-level recognition and statutory proof." },
  { href: "/campus-360", label: "Campus 360", description: "Explore the campus experience and visit confidence route." },
  { href: "/contact", label: "Contact", description: "Verify current admissions, campus, and counselling information." },
  { href: "/brochure", label: "Brochure", description: "Download the public university brochure where available." },
];

const guideStatus = {
  status: "Published" as const,
  ownerDepartment: "Admissions & SEO Review",
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
};

type GuideSeed = {
  slug: string;
  title: string;
  description: string;
  targetQuery: string;
  audience: string;
  angle: string;
  keywords: string[];
  focusLinks?: InfoPageConfig["relatedLinks"];
};

const checklistRows = [
  ["Recognition", "Check university-level recognition and published statutory documents."],
  ["Course fit", "Compare whether the school, department, and programme match the student's goal."],
  ["Eligibility", "Verify official eligibility before relying on third-party counselling claims."],
  ["Fee guidance", "Confirm fee information through official admissions communication."],
  ["Campus confidence", "Review campus, labs, location, visit route, and student support."],
  ["Career pathway", "Look for curriculum relevance, practical learning, and career-readiness support without treating placement claims as guaranteed."],
];

const makeGuide = (seed: GuideSeed): InfoPageConfig => ({
  slug: `guides/${seed.slug}`,
  title: seed.title,
  description: seed.description,
  eyebrow: "Student Comparison Guide",
  intro: `${seed.targetQuery} is a comparison-style search. This guide answers it safely by showing what students and parents should verify before choosing a college or university. It does not claim that Stmarys University is No.1, best, top, guaranteed, first, or highest without public proof.`,
  pageType: "research",
  keywords: seed.keywords,
  ...guideStatus,
  answers: [
    {
      question: `What does the search "${seed.targetQuery}" mean?`,
      answer: `It usually means the student is comparing options. The safe answer is to verify recognition, courses, eligibility, fee guidance, campus, and admissions route before deciding.`,
    },
    {
      question: "Can Stmarys University be considered for this search?",
      answer: "Stmarys University can be explored as one official option in Hyderabad, Telangana. Final decisions should be based on official course pages, admissions counselling, and published recognition/disclosure information.",
    },
    {
      question: "Should this page be treated as a ranking claim?",
      answer: "No. This is a student guidance and comparison page. It supports search discovery without making unsupported ranking, placement, salary, or accreditation claims.",
    },
  ],
  sections: [
    {
      heading: "Direct Answer",
      paragraphs: [
        `${seed.targetQuery} should be answered by comparing verified university information, not by trusting a single promotional ranking phrase. ${seed.angle}`,
        "Students should use official pages for course details, admissions, eligibility, fee confirmation, campus visit guidance, and recognition proof before applying.",
      ],
    },
    {
      heading: "How To Compare Options Safely",
      paragraphs: [
        "Start with university-level recognition, then check the exact course, department, eligibility, fee guidance, and applicable programme-level professional requirements separately.",
        "Do not treat 'best', 'top', 'No.1', 'guaranteed placement', 'highest package', or '100% placement' as facts unless the institution publishes current evidence.",
      ],
    },
    {
      heading: "Where Stmarys University Fits",
      paragraphs: [
        `For ${seed.audience}, Stmarys University pages can help students move from broad comparison intent to official school, course, admissions, campus, and disclosure routes.`,
        "This guide intentionally uses verification-first wording so it can support SEO, AEO, and GEO without creating doorway pages, hidden pages, or unsupported claims.",
      ],
    },
    {
      heading: "Recommended Next Steps",
      paragraphs: [
        "Open the relevant school and course pages, compare eligibility and duration, contact admissions for current fee guidance, and verify recognition or statutory information through official documents.",
        "After the live site is deployed, submit the sitemap in Google Search Console and request indexing for the guide page plus the linked school/course pages.",
      ],
    },
  ],
  tables: [
    {
      heading: "Comparison Checklist",
      columns: ["Factor", "What to verify"],
      rows: checklistRows,
      note: "This table is designed for students and parents comparing colleges without relying on unsupported ranking language.",
    },
  ],
  faqItems: [
    {
      question: `Which is the best option for ${seed.targetQuery}?`,
      answer: "There is no safe single answer without the student's goals and official evidence. Compare recognition, course fit, eligibility, fee guidance, campus, student support, and admissions route.",
    },
    {
      question: "Does this page claim Stmarys University is the best or top?",
      answer: "No. This page helps students compare options and then routes them to official Stmarys University information for verification.",
    },
    {
      question: "Where should I confirm admissions and fees?",
      answer: "Use the official admissions, contact, and brochure routes. Fee and intake information should be confirmed through current official university communication.",
    },
    {
      question: "Why are rankings and placement claims handled carefully?",
      answer: "Ranking, salary, placement, first-ever, and No.1 claims require current public evidence. Without evidence, the safe approach is to compare verifiable information only.",
    },
  ],
  relatedLinks: [...(seed.focusLinks || []), ...coreLinks],
  footerDisclaimer:
    "This guide is published for student comparison and search discovery. It does not make unsupported ranking, placement, salary, accreditation, No.1, first, guaranteed, or highest claims.",
  statusNote: "Public comparison guide. Verification-first SEO page.",
});

const schoolLinks = {
  rehabilitation: [{ href: "/rehabilitation-sciences", label: "Rehabilitation Sciences", description: "Explore rehabilitation-linked school information and programme routes." }],
  alliedHealth: [{ href: "/health-allied-health-sciences", label: "Health & Allied Health Sciences", description: "Explore health and allied health course pathways." }],
  law: [{ href: "/law", label: "Law School", description: "Explore law programmes, admissions guidance, and school information." }],
  engineering: [{ href: "/engineering-emerging-technologies", label: "Engineering & Emerging Technologies", description: "Explore technology-focused academic routes." }],
  pharmacy: [{ href: "/schools", label: "Pharmacy Courses", description: "Explore official pharmacy-related school and programme pages from the schools catalogue." }],
  management: [{ href: "/schools", label: "Management Courses", description: "Explore official management-related school and programme pages from the schools catalogue." }],
};

export const SAFE_GUIDE_PAGES: InfoPageConfig[] = [
  makeGuide({
    slug: "best-private-university-in-hyderabad",
    title: "Best Private University in Hyderabad: What Students Should Verify",
    description: "Compare private universities in Hyderabad using recognition, courses, eligibility, fee guidance, campus, and admissions verification.",
    targetQuery: "best private university in Hyderabad",
    audience: "students comparing private universities in Hyderabad",
    angle: "A strong private university choice should be based on official recognition, course fit, transparent counselling, and campus confidence.",
    keywords: ["best private university in Hyderabad", "top private university Hyderabad", "private university admissions Hyderabad", "Stmarys University Hyderabad"],
  }),
  makeGuide({
    slug: "top-university-in-hyderabad-for-admissions",
    title: "Top University in Hyderabad for Admissions: Student Checklist",
    description: "A safe admissions checklist for students comparing universities in Hyderabad for 2026 applications.",
    targetQuery: "top university in Hyderabad for admissions",
    audience: "students planning 2026 admissions in Hyderabad",
    angle: "Admissions decisions should compare official application routes, eligibility, counselling clarity, and programme availability.",
    keywords: ["top university in Hyderabad admissions", "university admissions 2026 Hyderabad", "UG PG admissions Hyderabad", "Stmarys University admissions"],
  }),
  makeGuide({
    slug: "best-university-in-telangana-for-career-focused-courses",
    title: "Best University in Telangana for Career-Focused Courses: How to Compare",
    description: "Compare career-focused university courses in Telangana using curriculum, practical learning, admissions, and official verification.",
    targetQuery: "best university in Telangana for career-focused courses",
    audience: "students comparing career-focused courses in Telangana",
    angle: "Career-focused education should be compared through curriculum relevance, skill exposure, practical learning, and official programme information.",
    keywords: ["best university in Telangana", "career focused courses Telangana", "professional courses Hyderabad", "Stmarys University courses"],
  }),
  makeGuide({
    slug: "best-college-near-ramoji-film-city",
    title: "Best College Near Ramoji Film City: Location & Admissions Checklist",
    description: "A location-intent guide for students searching for colleges or universities near Ramoji Film City and Hyderabad.",
    targetQuery: "best college near Ramoji Film City",
    audience: "students and parents checking campus location near Ramoji Film City",
    angle: "Location searches should verify campus address, travel route, admissions support, course availability, and official contact information.",
    keywords: ["college near Ramoji Film City", "university near Ramoji Film City", "Hyderabad campus university", "Stmarys University location"],
    focusLinks: [{ href: "/contact", label: "Campus Location & Contact", description: "Verify campus location, phone, and admissions support." }],
  }),
  makeGuide({
    slug: "best-rehabilitation-university-in-hyderabad",
    title: "Best Rehabilitation University in Hyderabad: What to Check First",
    description: "Compare rehabilitation universities and courses in Hyderabad using recognition, clinical learning, eligibility, and official verification.",
    targetQuery: "best rehabilitation university in Hyderabad",
    audience: "students exploring rehabilitation sciences and therapy-linked courses",
    angle: "Rehabilitation education should be compared through course identity, practical learning, applicable professional requirements, and official recognition evidence.",
    keywords: ["best rehabilitation university in Hyderabad", "rehabilitation courses Hyderabad", "BASLP college Hyderabad", "BPT college Hyderabad", "occupational therapy college Hyderabad"],
    focusLinks: schoolLinks.rehabilitation,
  }),
  makeGuide({
    slug: "best-allied-health-sciences-college-in-hyderabad",
    title: "Best Allied Health Sciences College in Hyderabad: Student Comparison Guide",
    description: "Compare allied health sciences courses in Hyderabad through eligibility, practical learning, admissions, and official verification.",
    targetQuery: "best allied health sciences college in Hyderabad",
    audience: "students exploring allied health and paramedical course options",
    angle: "Allied health choices should be checked through course outcomes, laboratory or clinical exposure, eligibility, duration, and official admissions guidance.",
    keywords: ["best allied health sciences college Hyderabad", "paramedical courses Hyderabad", "BMLT course Hyderabad", "operation theatre technology Hyderabad"],
    focusLinks: schoolLinks.alliedHealth,
  }),
  makeGuide({
    slug: "best-law-college-in-hyderabad",
    title: "Best Law College in Hyderabad: How Students Should Compare",
    description: "Compare law colleges in Hyderabad using curriculum, moot court exposure, internships, eligibility, admissions, and official verification.",
    targetQuery: "best law college in Hyderabad",
    audience: "students comparing BA LLB, BBA LLB, LLB, and LLM options",
    angle: "Law college comparison should include curriculum, legal-skills exposure, internships, research opportunities, admission route, and official programme information.",
    keywords: ["best law college in Hyderabad", "top law college Hyderabad", "BA LLB college Hyderabad", "LLB admission 2026 Hyderabad"],
    focusLinks: schoolLinks.law,
  }),
  makeGuide({
    slug: "best-engineering-college-for-emerging-technologies-in-hyderabad",
    title: "Best Engineering College for Emerging Technologies in Hyderabad: Compare Safely",
    description: "Compare emerging technology and engineering courses in Hyderabad for AI, data science, cyber security, and career-focused learning.",
    targetQuery: "best engineering college for emerging technologies in Hyderabad",
    audience: "students exploring engineering, AI, data science, cyber security, and technology pathways",
    angle: "Technology-course comparison should focus on curriculum, projects, labs, industry relevance, eligibility, admissions, and official course pages.",
    keywords: ["best engineering college emerging technologies Hyderabad", "BTech AI ML Hyderabad", "BTech data science Hyderabad", "cyber security course Hyderabad"],
    focusLinks: schoolLinks.engineering,
  }),
  makeGuide({
    slug: "best-pharmacy-college-in-hyderabad",
    title: "Best Pharmacy College in Hyderabad: Course & Admissions Checklist",
    description: "Compare pharmacy course options in Hyderabad using eligibility, duration, professional requirements, fee guidance, and official verification.",
    targetQuery: "best pharmacy college in Hyderabad",
    audience: "students comparing pharmacy-related course options",
    angle: "Pharmacy-course decisions should separate university recognition, programme requirements, eligibility, practical exposure, and official counselling confirmation.",
    keywords: ["best pharmacy college Hyderabad", "B Pharmacy admission Hyderabad", "D Pharmacy college Telangana", "pharmacy courses after 12th"],
    focusLinks: schoolLinks.pharmacy,
  }),
  makeGuide({
    slug: "best-mba-college-in-hyderabad",
    title: "Best MBA College in Hyderabad: Management Admissions Checklist",
    description: "Compare MBA and management course options in Hyderabad using curriculum, career support, eligibility, admissions, and official verification.",
    targetQuery: "best MBA college in Hyderabad",
    audience: "students comparing management and MBA-style pathways",
    angle: "Management-course comparison should focus on curriculum, industry exposure, career-readiness support, eligibility, fee guidance, and official admissions counselling.",
    keywords: ["best MBA college Hyderabad", "management courses Hyderabad", "MBA admissions 2026 Hyderabad", "career focused MBA Hyderabad"],
    focusLinks: schoolLinks.management,
  }),
];

export const SAFE_GUIDE_PAGE_MAP = new Map(SAFE_GUIDE_PAGES.map((page) => [page.slug.replace(/^guides\//, ""), page]));
