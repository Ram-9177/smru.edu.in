import { ADMISSIONS_CONTENT_LAST_UPDATED, SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import {
  APPROVAL_SAFETY_NOTE,
  DISCLOSURE_LAST_REVIEWED,
  DISCLOSURE_NEXT_REVIEW_DUE,
  FIRST_ACADEMIC_YEAR_NOTE,
  OFFICIAL_DOCUMENT_LIST,
  OFFICIAL_DOCUMENTS,
  STATUS_DESCRIPTIONS,
  type DisclosureStatus,
  type OfficialDocument,
} from "@/lib/shared/university";
import { SITE_IDENTITY } from "@/lib/seo/site";

export type InfoPageConfig = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  pageType?: "trust" | "local" | "research";
  keywords?: string[];
  status?: DisclosureStatus;
  ownerDepartment?: string;
  lastReviewed?: string;
  nextReviewDue?: string;
  answers: Array<{ question: string; answer: string }>;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  tables?: Array<{ heading: string; columns: string[]; rows: string[][]; note?: string }>;
  faqItems: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; label: string; description: string }>;
  needsVerification?: string[];
  mapEmbedUrl?: string;
  statusNote?: string;
  footerDisclaimer?: string;
  documents?: OfficialDocument[];
};

const defaultStatus = {
  status: "Published" as DisclosureStatus,
  ownerDepartment: "Registrar Office",
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
};

const firstYearStatus = {
  status: "Not Applicable - First Academic Year" as DisclosureStatus,
  ownerDepartment: "Registrar Office",
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
};

const processStatus = (ownerDepartment = "Registrar Office") => ({
  status: "Under Process" as DisclosureStatus,
  ownerDepartment,
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
});

const requestStatus = (ownerDepartment = "Registrar Office") => ({
  status: "Available on Official Request" as DisclosureStatus,
  ownerDepartment,
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
});

const publicReleaseStatus = (ownerDepartment = "Registrar Office") => ({
  status: "Awaiting Public Release" as DisclosureStatus,
  ownerDepartment,
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
});

const admissionsLinks = [
  { href: "/admissions", label: "Admissions", description: "Official admissions route for UG, PG, diploma, and application support." },
  { href: "/fee-structure", label: "Fee Structure", description: "Programme-wise fee reference and counselling confirmation note." },
  { href: "/contact", label: "Contact", description: "Admissions, campus, and support contact information." },
];

const corePublicLinks = [
  { href: "/", label: "Home", description: "Official website home page." },
  { href: "/about", label: "About", description: "Institutional information, sponsor legacy, and university context." },
  { href: "/schools", label: "Schools", description: "Official school and programme information published on smru.edu.in." },
  { href: "/academic-structure", label: "Academic Structure", description: "Academic structure and programme listing page." },
  { href: "/admissions", label: "Admissions", description: "Official admissions information page." },
  { href: "/contact", label: "Contact", description: "Official contact and location information." },
];

const complianceLinks = [
  { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Published establishment and recognition documents." },
  { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Master public disclosure dashboard." },
  { href: "/statutory-disclosures", label: "Statutory Disclosures", description: "Public statutory disclosure index." },
  { href: "/first-academic-year-disclosures", label: "University Cycle Note", description: "Public-safe status for first university-cycle disclosures." },
  { href: "/contact", label: "Contact", description: "Official support and verification route." },
];

const safeProcessParagraph = (owner: string) =>
  `${owner} maintains this record through the official university verification and publication workflow. Public updates are made after university approval for release.`;

const officialRequestParagraph = (owner: string) =>
  `The ${owner} maintains this record and guides stakeholders through the official contact route where direct office confirmation is appropriate.`;

const universityReferenceAnswers = [
  { question: "What is the official/legal name?", answer: "The official/legal name is Stmarys University." },
  { question: "What is the public brand?", answer: "The public brand used on the website is Stmarys University." },
  { question: "Where is official information published?", answer: "Official public information is published at https://smru.edu.in." },
];

export const INFO_PAGES: InfoPageConfig[] = [
  {
    slug: "Stmarys-university",
    title: "Stmarys University",
    description: "Stmarys University is the public brand used for Stmarys University, Hyderabad, Telangana.",
    eyebrow: "Brand Reference",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["Stmarys University", "Stmarys University Hyderabad", "Stmarys University", "Stmarys University Hyderabad", "Stmarys University"],
    ...defaultStatus,
    answers: universityReferenceAnswers,
    sections: [
      {
        heading: "Official Identity",
        paragraphs: [
          "Official website: https://smru.edu.in.",
          "Public brand: Stmarys University.",
          "Official/legal name: Stmarys University.",
          "Display name: Stmarys University.",
          "Short name: Stmarys University.",
          "Location: Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "Is Stmarys University the same institution as Stmarys University?", answer: SITE_IDENTITY.bridgeSentence },
      { question: "Where should official course and school information be checked?", answer: "Official school and course information should be checked on smru.edu.in pages." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "Stmarys-university-official",
    title: "Stmarys University Official Name | Stmarys University",
    description: "Stmarys University is the official/legal name of Stmarys University, Hyderabad, Telangana.",
    eyebrow: "Official Name",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["Stmarys University", "Stmarys University", "Stmarys University", "Stmarys University"],
    ...defaultStatus,
    answers: universityReferenceAnswers,
    sections: [
      {
        heading: "University Reference",
        paragraphs: [
          "Stmarys University is the official/legal name used for Stmarys University.",
          "Stmarys University remains the short-name alias used for search and statutory references.",
          "The public brand used for the university is Stmarys University.",
          "Stmarys University is located in Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "What does Stmarys University stand for?", answer: "Stmarys University stands for Stmarys University." },
      { question: "Which website should be used for official information?", answer: "Use https://smru.edu.in for official university information." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "Stmarys-hyderabad",
    title: "Stmarys University Hyderabad | Stmarys University",
    description: "Stmarys University Hyderabad refers to Stmarys University, publicly known as Stmarys University, located in Hyderabad, Telangana.",
    eyebrow: "Location Reference",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["Stmarys University Hyderabad", "Stmarys University", "Stmarys University Hyderabad", "Stmarys University Hyderabad", "Stmarys University"],
    ...defaultStatus,
    answers: universityReferenceAnswers,
    sections: [
      {
        heading: "Factual Summary",
        paragraphs: [
          "Official website: https://smru.edu.in.",
          "Public brand: Stmarys University.",
          "Official/legal name: Stmarys University.",
          "Short name: Stmarys University.",
          "Location: Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "Is Stmarys University located in Hyderabad?", answer: "Stmarys University is located in Hyderabad, Telangana." },
      { question: "Where are Stmarys University schools and programmes listed?", answer: "Schools and programme information are listed on smru.edu.in pages including /schools and /academic-structure." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "rehabilitation-university-hyderabad",
    title: "Rehabilitation University Hyderabad",
    description: "Reference page for Stmarys University, Hyderabad, Telangana, publicly known as Stmarys University.",
    eyebrow: "University Reference",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["Rehabilitation University Hyderabad", "Stmarys University", "Stmarys University Hyderabad", "Stmarys University Hyderabad"],
    ...defaultStatus,
    answers: universityReferenceAnswers,
    sections: [
      {
        heading: "Official Reference",
        paragraphs: [
          "Stmarys University is a rehabilitation-led university established in Telangana.",
          "The university uses public disclosure pages to help students, parents, and stakeholders verify published information.",
          APPROVAL_SAFETY_NOTE,
        ],
      },
    ],
    faqItems: [
      { question: "Where should official school information be checked?", answer: "Official school information should be checked only on smru.edu.in pages." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "Stmarys-facts",
    title: "Stmarys University Facts | Stmarys University",
    description: "Factual reference for Stmarys University: official website, public brand, legal name, short-name alias, location, and important public routes.",
    eyebrow: "Factual Reference",
    intro: "This page provides factual reference information for Stmarys University and its official/legal name.",
    pageType: "trust",
    keywords: ["Stmarys University facts", "Stmarys University facts", "Stmarys University", "Stmarys University facts"],
    ...defaultStatus,
    answers: [
      { question: "What is the official website?", answer: "The official website is https://smru.edu.in." },
      { question: "What is the official/legal name?", answer: "The official/legal name is Stmarys University." },
      { question: "What display name is used on the website?", answer: "The website uses Stmarys University as the public display name." },
      { question: "What is the short-name alias?", answer: "The short-name alias is Stmarys University." },
    ],
    sections: [
      {
        heading: "Entity Facts",
        paragraphs: [
          "Official website: https://smru.edu.in.",
          "Public brand: Stmarys University.",
          "Official/legal name: Stmarys University.",
          "Display name: Stmarys University.",
          "Short name: Stmarys University.",
          "Location: Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "What source should be used for official Stmarys University course and school information?", answer: "Official course and school information should be taken only from smru.edu.in pages." },
      { question: "What is the relationship between Stmarys University and Stmarys University?", answer: SITE_IDENTITY.bridgeSentence },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "approvals-recognitions",
    title: "Approvals & Recognitions",
    description: "Official approvals, recognitions, and regulatory disclosure page for Stmarys University.",
    eyebrow: "Trust & Compliance",
    intro: "Stmarys University maintains this page as the public reference for official establishment, recognition, and statutory documents. Students, parents, and stakeholders may use the documents below for transparent verification.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "What is published here?", answer: "The university establishment Act and UGC 2(f) recognition letter are published here." },
      { question: "How are programme-level professional approvals shown?", answer: "Programme-level professional permissions are shown separately where required and linked to public official evidence when available." },
    ],
    sections: [
      {
        heading: "Verification Protocol",
        paragraphs: [
          "All public documents are reviewed by the university before publication.",
          APPROVAL_SAFETY_NOTE,
          "Applicants should verify establishment and university-level recognition here before admission decisions.",
        ],
      },
    ],
    documents: [OFFICIAL_DOCUMENTS.smruAct2026, OFFICIAL_DOCUMENTS.ugcRecognition2f],
    faqItems: [
      { question: "Can I rely on this page for university-level verification?", answer: "Yes. This page is the official public reference point for published establishment and UGC recognition documents." },
    ],
    relatedLinks: complianceLinks,
  },
  {
    slug: "ugc-disclosure",
    title: "UGC Disclosure",
    description: "UGC recognition and disclosure information page for Stmarys University.",
    eyebrow: "UGC Status",
    intro: "Stmarys University is recognized under Section 2(f) of the UGC Act, 1956. This page is the dedicated university-level UGC disclosure reference.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "Is Stmarys University recognized by the UGC?", answer: "Yes. The published letter confirms recognition under Section 2(f) of the UGC Act, 1956." },
      { question: "How should professional permissions be checked?", answer: "Professional permissions should be checked programme-wise where required, using official university notifications or statutory council documents." },
    ],
    sections: [
      {
        heading: "UGC Compliance Note",
        paragraphs: [
          "The UGC recognition letter confirms university-level recognition.",
          "Course-level or profession-specific approvals, if required by law, are maintained separately through the relevant statutory route.",
          APPROVAL_SAFETY_NOTE,
        ],
      },
    ],
    documents: [OFFICIAL_DOCUMENTS.ugcRecognition2f, OFFICIAL_DOCUMENTS.smruAct2026],
    faqItems: [],
    relatedLinks: complianceLinks,
  },
  {
    slug: "mandatory-disclosure",
    title: "Mandatory Disclosure",
    description: "Master public disclosure dashboard for Stmarys University establishment, recognition, admissions, student support, and first university-cycle disclosure status.",
    eyebrow: "Mandatory Disclosure",
    intro: "This page acts as the master public index for Stmarys University disclosures. Published documents are linked directly; first university-cycle or office-maintained items are shown with a clear status.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "What is this page?", answer: "It is the public dashboard for official university disclosures, documents, and status notes." },
      { question: "How are disclosure items maintained?", answer: "Stmarys University carries an educational legacy and is now in its first university academic cycle. University-cycle records are maintained through formal verification before publication." },
    ],
    sections: [
      {
        heading: "Published Establishment & Recognition",
        paragraphs: [
          "The establishment Act and UGC 2(f) letter are published as public documents.",
          "Students and parents should use the linked documents and official pages for verification.",
        ],
      },
      {
        heading: "Admissions & Academic Information",
        paragraphs: [
          "Admissions information, entrance notification, Ph.D. status, fee reference, and counselling contacts are published through admissions-critical pages.",
          "Final intake, fee heads, and scholarship eligibility must be confirmed with the admissions office before payment.",
        ],
      },
      {
        heading: "Student Support & Governance",
        paragraphs: [
          "Anti-ragging, grievance, ombudsperson, IQAC, academic calendar, faculty directory, and contact directory pages are maintained with public-safe university-cycle status notes.",
          "Committee and officer details are published only after university approval for public release.",
        ],
      },
      {
        heading: "University Academic Cycle Disclosure Note",
        paragraphs: [FIRST_ACADEMIC_YEAR_NOTE],
      },
    ],
    documents: OFFICIAL_DOCUMENT_LIST,
    tables: [
      {
        heading: "Disclosure Status Dashboard",
        columns: ["Disclosure Area", "Status", "Owner", "Public Route"],
        rows: [
          ["Establishment Act", "Published", "Registrar Office", "/approvals-recognitions"],
          ["UGC 2(f) Recognition", "Published", "Registrar Office", "/ugc-disclosure"],
          ["Entrance Exam Updates", "Announcement pending", "Admissions Office", "/exam-notification"],
          ["Ph.D. Admissions 2026-27", "Published / Cycle Completed", "Research Office", "/phd-admissions"],
          ["Fee Structure", "Admissions Counselling Confirmation", "Admissions Office", "/fee-structure"],
          ["Refund Policy", "Official Publication Workflow", "Finance and Admissions Offices", "/refund-policy"],
          ["Anti-Ragging / Grievance / Ombudsperson", "Official Publication Workflow", "Student Affairs Office", "/anti-ragging"],
          ["NAAC / NIRF / Alumni / Placements / Annual Reports", "First University-Cycle Tracking", "Registrar Office", "/first-academic-year-disclosures"],
        ],
      },
    ],
    faqItems: [
      { question: "How are approval-sensitive items handled?", answer: "Approval-sensitive items are maintained through official verification. Public approval claims are made only with official documents." },
    ],
    relatedLinks: complianceLinks,
  },
  {
    slug: "statutory-disclosures",
    title: "Statutory Disclosures",
    description: "Public statutory disclosure index for Stmarys University approvals, recognition, policies, and institutional information.",
    eyebrow: "Public Disclosure",
    intro: "This page organizes statutory disclosure routes for students, parents, regulators, and institutional stakeholders.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "What does this page contain?", answer: "It links to public statutory records, approval documents, policies, admissions information, and official contact routes." },
      { question: "Where are UGC recognition documents published?", answer: "UGC recognition and establishment documents are published on the Approvals & Recognitions and UGC Disclosure pages." },
    ],
    sections: [
      {
        heading: "Disclosure Index",
        paragraphs: [
          "Use the related links below to access mandatory disclosure, approvals, UGC recognition, admission policy, fee structure, refund policy, public information, IQAC, grievance, ombudsperson, and contact directory pages.",
          "Documents pending university verification are shown with a status instead of unsupported claims.",
        ],
      },
    ],
    documents: OFFICIAL_DOCUMENT_LIST,
    faqItems: [
      { question: "Is this the same as mandatory disclosure?", answer: "This page is an index. The mandatory disclosure page remains the main disclosure dashboard." },
    ],
    relatedLinks: [
      ...complianceLinks,
      { href: "/public-information", label: "Public Information", description: "Public information and compliance contacts." },
      { href: "/fee-structure", label: "Fee Structure", description: "Published fee information page." },
      { href: "/refund-policy", label: "Refund Policy", description: "Fee refund and withdrawal policy status page." },
      { href: "/contact-directory", label: "Contact Directory", description: "Official contact directory page." },
    ],
  },
  {
    slug: "first-academic-year-disclosures",
    title: "University Academic Cycle Disclosure Note",
    description: "Verified status note for first university-cycle disclosures such as alumni, placements, annual reports, audited accounts, NAAC, and NIRF outputs.",
    eyebrow: "University Academic Cycle",
    intro: "Stmarys University brings forward Stmarys educational legacy and is now operating in its first university academic cycle. This page explains how university-cycle disclosure items are tracked for verified public release.",
    pageType: "trust",
    ...firstYearStatus,
    answers: [
      { question: "Why are some disclosures marked by university cycle?", answer: "Some university records, such as university alumni outcomes and placement data, are created as eligible university batches progress or graduate." },
      { question: "How is information handled?", answer: "The university records the status clearly and publishes verified material through approved public channels." },
    ],
    sections: [
      {
        heading: "University-Cycle Items",
        paragraphs: [
          FIRST_ACADEMIC_YEAR_NOTE,
          "The university will publish applicable outcomes, reports, audited records, and accreditation/ranking materials after they are generated, verified, and cleared for public release.",
        ],
      },
    ],
    faqItems: [
      { question: "How is NAAC presented?", answer: "The website presents NAAC as quality-cycle readiness unless formal accreditation is published." },
      { question: "How are placement and alumni outcomes presented?", answer: "University-cycle placement and alumni outcomes are published after eligible batches create verified outcomes." },
    ],
    relatedLinks: complianceLinks,
  },
  {
    slug: "public-information",
    title: "Public Information",
    description: "Public information desk and compliance contacts for Stmarys University.",
    eyebrow: "Public Information",
    intro: "The university provides public contact routes for institutional information, admissions support, and disclosure verification.",
    pageType: "trust",
    ...requestStatus("Registrar Office"),
    answers: [
      { question: "Where can public verification questions be sent?", answer: `Use the official contact route at ${SITE_CONTACT.email} or the admissions helpdesk listed on the contact page.` },
    ],
    sections: [
      {
        heading: "Public Enquiry Route",
        paragraphs: [
          officialRequestParagraph("Registrar Office"),
          `Official contact email: ${SITE_CONTACT.email}. Admissions helpdesk: ${SITE_CONTACT.primaryPhone}.`,
        ],
      },
    ],
    faqItems: [],
    relatedLinks: complianceLinks,
  },
  {
    slug: "anti-ragging",
    title: "Anti-Ragging",
    description: "Anti-ragging policy and reporting status page for Stmarys University.",
    eyebrow: "Student Welfare",
    intro: "Stmarys University maintains a zero-tolerance position towards ragging and student harassment. Public committee details are released through the official university publication workflow.",
    pageType: "trust",
    ...processStatus("Student Affairs Office"),
    answers: [
      { question: "Is anti-ragging reporting supported?", answer: "Yes. Students may use official university contact routes while the public committee page is maintained by Student Affairs." },
    ],
    sections: [
      {
        heading: "Reporting Status",
        paragraphs: [
          safeProcessParagraph("Student Affairs Office"),
          "Students should immediately contact the university helpdesk, campus administration, or student affairs route for urgent support.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Official helpdesk and campus contact information." },
      { href: "/grievance-redressal", label: "Grievance Redressal", description: "Student grievance route." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Disclosure dashboard." },
    ],
  },
  {
    slug: "grievance-redressal",
    title: "Grievance Redressal",
    description: "Student and staff grievance redressal status page for Stmarys University.",
    eyebrow: "Student Welfare",
    intro: "Stmarys University maintains formal grievance support through university contact routes while public cell details are released through the official university publication workflow.",
    pageType: "trust",
    ...processStatus("Student Affairs Office"),
    answers: [
      { question: "How can students raise concerns now?", answer: "Students may use the official contact page, admissions helpdesk, or campus administration route for guidance." },
    ],
    sections: [
      {
        heading: "Redressal Workflow Status",
        paragraphs: [
          safeProcessParagraph("Student Affairs Office"),
          "Public names, roles, and escalation contacts are published only after university release approval.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Official helpdesk and campus contact information." },
      { href: "/ombudsperson", label: "Ombudsperson", description: "Independent review status page." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Disclosure dashboard." },
    ],
  },
  {
    slug: "ombudsperson",
    title: "Ombudsperson",
    description: "University ombudsperson status and independent review information.",
    eyebrow: "Student Welfare",
    intro: "The university tracks ombudsperson-related public information through the official disclosure system and publishes appointment details through the approved release workflow.",
    pageType: "trust",
    ...processStatus("Registrar Office"),
    answers: [
      { question: "How are ombudsperson details published?", answer: "Appointment details are published after university confirmation for public release." },
    ],
    sections: [
      {
        heading: "Appointment Disclosure Status",
        paragraphs: [
          safeProcessParagraph("Registrar Office"),
          "Until public appointment details are released, stakeholders should use the official contact route for guidance.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: complianceLinks,
  },
  {
    slug: "iqac-quality-assurance",
    title: "IQAC & Quality Assurance",
    description: "Internal quality assurance and quality-cycle readiness status for Stmarys University.",
    eyebrow: "Quality Cycles",
    intro: "Stmarys University uses an internal quality framework to support academic planning, disclosure discipline, and future accreditation readiness.",
    pageType: "trust",
    ...processStatus("Quality Assurance Office"),
    answers: [
      { question: "How is IQAC information published?", answer: "Quality-cycle information is maintained with public-safe status, and formal composition details are published through the approved university release workflow." },
    ],
    sections: [
      {
        heading: "Quality Framework",
        paragraphs: [
          "Stmarys University is building university-level quality assurance systems from its first academic cycle.",
          safeProcessParagraph("Quality Assurance Office"),
          "Formal NAAC accreditation is published only after the applicable accreditation process is completed.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/naac", label: "NAAC", description: "Quality-cycle readiness status." },
      { href: "/first-academic-year-disclosures", label: "University Cycle Note", description: "Status for early-cycle quality disclosures." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Disclosure dashboard." },
    ],
  },
  {
    slug: "academic-calendar",
    title: "Academic Calendar",
    description: "Official academic calendar status, term dates, and exam schedule publication route.",
    eyebrow: "Academics",
    intro: "The academic calendar page tracks publication status for term timelines, examination schedules, and academic notices.",
    pageType: "trust",
    ...publicReleaseStatus("Academic Office"),
    answers: [
      { question: "Where should applicants confirm current dates?", answer: "Admissions-critical dates should be checked on the admissions and entrance test pages, then confirmed with the admissions office." },
    ],
    sections: [
      {
        heading: "Academic Calendar Status",
        paragraphs: [
          "The academic calendar is maintained by the Academic Office and released publicly after university approval.",
          "Admissions and entrance test dates already published on active admissions pages remain the current public reference.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: admissionsLinks,
  },
  {
    slug: "faculty-directory",
    title: "Faculty Directory",
    description: "Faculty directory status and public release page for Stmarys University academic departments.",
    eyebrow: "Academics",
    intro: "Stmarys University maintains faculty information through academic departments. Public profiles are released through verification, consent, and the approved publication workflow.",
    pageType: "trust",
    ...publicReleaseStatus("Academic Office"),
    answers: [
      { question: "How are faculty profiles published?", answer: "Faculty profiles are published after internal verification, appointment confirmation, and release approval." },
    ],
    sections: [
      {
        heading: "Faculty Profile Status",
        paragraphs: [
          "Academic departments maintain faculty records for internal and public use.",
          "Public faculty profiles are expanded through university verification and the approved release workflow.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/schools", label: "Schools", description: "Academic school and department pages." },
      { href: "/academic-structure", label: "Academic Structure", description: "Programme and department catalogue." },
      { href: "/contact", label: "Contact", description: "Official contact route." },
    ],
  },
  {
    slug: "contact-directory",
    title: "Contact Directory",
    description: "Official contact directory for departments, administration, admissions, and support.",
    eyebrow: "Information",
    intro: "The contact directory provides official public contact routes while detailed officer-wise directories are released through the approved university workflow.",
    pageType: "trust",
    ...requestStatus("Registrar Office"),
    answers: [
      { question: "What contact routes are public?", answer: `Admissions: ${SITE_CONTACT.primaryPhone}. Email: ${SITE_CONTACT.email}. WhatsApp is linked through the contact and admissions pages.` },
    ],
    sections: [
      {
        heading: "Public Contact Routes",
        paragraphs: [
          `Admissions helpdesk: ${SITE_CONTACT.primaryPhone}.`,
          `Email: ${SITE_CONTACT.email}.`,
          `Campus address: ${SITE_CONTACT.address}`,
          officialRequestParagraph("Registrar Office"),
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Full public contact page." },
      { href: "/campus-location-hyderabad", label: "Campus Location", description: "Campus address and map." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Disclosure dashboard." },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Fee refund and withdrawal policy status for Stmarys University.",
    eyebrow: "Fees & Policies",
    intro: "Stmarys University tracks fee refund and withdrawal policy information through admissions and finance review before public release.",
    pageType: "trust",
    ...processStatus("Finance and Admissions Offices"),
    answers: [
      { question: "Where should refund questions be confirmed?", answer: "Confirm withdrawal/refund terms with the admissions office before payment." },
    ],
    sections: [
      {
        heading: "Refund Policy Status",
        paragraphs: [
          safeProcessParagraph("Finance and Admissions Offices"),
          "Students should not rely on informal fee or refund statements. Confirm the applicable policy with the official admissions office before payment.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: admissionsLinks,
  },
  {
    slug: "fee-structure",
    title: "Fee Structure",
    description: "Academic fee structure information page for Stmarys University.",
    eyebrow: "Fees & Policies",
    intro: "Stmarys University maintains programme-wise fee information through the Admissions and Finance offices. Applicants receive current fee guidance through official admissions counselling and university communication.",
    pageType: "trust",
    status: "Published",
    ownerDepartment: "Admissions Office",
    lastReviewed: ADMISSIONS_CONTENT_LAST_UPDATED,
    nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
    statusNote: `Last reviewed: ${ADMISSIONS_CONTENT_LAST_UPDATED}`,
    answers: [
      { question: "Is programme-wise fee information public?", answer: "The university maintains programme-wise fee information and confirms current amounts through the official admissions and counselling route." },
      { question: "How should applicants confirm fees?", answer: "Applicants should confirm final fee heads, intake, scholarships, and payment schedules only with the official admissions counselling route before payment." },
    ],
    sections: [
      {
        heading: "Fee Confirmation Note",
        paragraphs: [
          "No fee amount on this page should be treated as a public fee quote until the approved fee schedule is published by the university.",
          "Hostel fee, examination fee, caution deposit, application fee, and other statutory or laboratory charges are confirmed through official counselling before payment.",
        ],
      },
    ],
    tables: [
      {
        heading: "Programme-Wise Fee Disclosure Status",
        columns: ["School", "Programme Group", "Public Amount Status", "Owner Office", "Applicant Route"],
        note: "Fee amounts are maintained by the university and confirmed through the official admissions/counselling channel.",
        rows: [
          ["Rehabilitation Sciences", "UG / PG / Diploma", "Admissions Counselling Confirmation", "Admissions and Finance Offices", "Admissions counselling / official helpdesk"],
          ["Health & Allied Health Sciences", "UG / PG", "Admissions Counselling Confirmation", "Admissions and Finance Offices", "Admissions counselling / official helpdesk"],
          ["Psychology", "UG / PG / Diploma", "Admissions Counselling Confirmation", "Admissions and Finance Offices", "Admissions counselling / official helpdesk"],
          ["Nursing", "UG / PG", "Admissions Counselling Confirmation", "Admissions and Finance Offices", "Admissions counselling / official helpdesk"],
          ["Engineering & Emerging Technologies", "UG / PG", "Admissions Counselling Confirmation", "Admissions and Finance Offices", "Admissions counselling / official helpdesk"],
          ["Law", "UG / Integrated / PG", "Admissions Counselling Confirmation", "Admissions and Finance Offices", "Admissions counselling / official helpdesk"],
          ["Doctoral", "Ph.D.", "Admissions Completed / Next Cycle Request", "Research and Admissions Offices", "Ph.D. page and official helpdesk"],
        ],
      },
    ],
    faqItems: [
      { question: "How are scholarships confirmed?", answer: "Scholarship eligibility, tuition fee waiver, and payment schedules are confirmed separately during admissions counselling." },
      { question: "Where should fee disputes or refund questions be checked?", answer: "Use the refund policy page and admissions helpdesk before making payment." },
    ],
    relatedLinks: admissionsLinks,
  },
  {
    slug: "admission-policy",
    title: "Admission Policy",
    description: "Admission policy and application guidance for Stmarys University.",
    eyebrow: "Admissions",
    intro: "Admissions at Stmarys University are conducted through a transparent, documented process with programme-wise eligibility, counselling, document verification, and fee confirmation.",
    pageType: "trust",
    ...processStatus("Admissions Office"),
    answers: [
      { question: "Where is the active admission process shown?", answer: "The active admission journey, entrance route, fee reference, and helpdesk are shown on the Admissions and Entrance Test pages." },
    ],
    sections: [
      {
        heading: "Admissions Process",
        paragraphs: [
          "Students should select the programme route, check eligibility, apply through the official application route, complete counselling/document review, and confirm fee and scholarship terms before payment.",
          safeProcessParagraph("Admissions Office"),
        ],
      },
    ],
    documents: [OFFICIAL_DOCUMENTS.admissionsBrochure],
    faqItems: [],
    relatedLinks: [
      ...admissionsLinks,
      { href: "/exam-notification", label: "Entrance Exam Updates", description: "Future entrance exam information will be published through official university notices." },
    ],
  },
  {
    slug: "naac",
    title: "NAAC Quality-Cycle Readiness",
    description: "NAAC quality-cycle readiness information for Stmarys University.",
    eyebrow: "Quality Cycle",
    intro: "Stmarys University is building university-level quality systems from its first academic cycle, backed by the broader Stmarys educational legacy. This page presents quality-cycle readiness while formal accreditation material is published through the official route when applicable.",
    pageType: "trust",
    ...firstYearStatus,
    answers: [
      { question: "What is the NAAC status?", answer: "This page records university quality-cycle readiness. Formal NAAC grade information is published through the official route when applicable." },
    ],
    sections: [
      {
        heading: "Readiness Status",
        paragraphs: [
          FIRST_ACADEMIC_YEAR_NOTE,
          "NAAC-related public materials are published after they become applicable, are verified, and are cleared for release.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/iqac-quality-assurance", label: "IQAC & Quality", description: "Internal quality framework status." },
      { href: "/first-academic-year-disclosures", label: "University Cycle Note", description: "Disclosure status note." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Public disclosure dashboard for official university records." },
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Published establishment and recognition documents." },
      { href: "/statutory-disclosures", label: "Statutory Disclosures", description: "Public statutory disclosure index." },
      { href: "/contact", label: "Contact", description: "Official support route for public information queries." },
    ],
  },
  {
    slug: "nirf",
    title: "NIRF Disclosure Status",
    description: "NIRF participation and ranking-data status for the first university academic cycle at Stmarys University.",
    eyebrow: "Rankings",
    intro: "Stmarys University tracks ranking-related outputs through the first university academic cycle and publishes verified NIRF data through the official route when applicable.",
    pageType: "trust",
    ...firstYearStatus,
    answers: [
      { question: "How is NIRF information published?", answer: "NIRF-related information is published through official disclosures after applicable verified data exists." },
    ],
    sections: [
      {
        heading: "Ranking Data Status",
        paragraphs: [
          FIRST_ACADEMIC_YEAR_NOTE,
          "Student strength, faculty details, financial resources, research output, and placement outcomes will be handled through verified university records as applicable.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/first-academic-year-disclosures", label: "University Cycle Note", description: "Disclosure status note." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Disclosure dashboard." },
    ],
  },
  {
    slug: "sponsor-society",
    title: "Sponsor Society & Legacy",
    description: "Sponsor body and public legacy reference for Joseph Sriharsha & Mary Indraja Educational Society and Stmarys University.",
    eyebrow: "Sponsor Legacy",
    intro: "Stmarys University is promoted by the Joseph Sriharsha & Mary Indraja Educational Society. Public legacy information is presented through verified website facts and university-cleared context.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "Who is the sponsor body?", answer: "The sponsor body is Joseph Sriharsha & Mary Indraja Educational Society, as reflected in the public university leadership content." },
      { question: "Why does this page exist?", answer: "It gives students, parents, and stakeholders a public-safe view of sponsor continuity, governance context, and institutional legacy." },
    ],
    sections: [
      {
        heading: "Sponsor Body Reference",
        paragraphs: [
          "Joseph Sriharsha & Mary Indraja Educational Society is presented as the sponsor body in the university's public leadership content.",
          "The page focuses on public university-cleared facts about the sponsor body and institutional legacy.",
        ],
      },
      {
        heading: "Legacy Context",
        paragraphs: [
          "The Stmarys educational journey is presented on the About page through a public timeline from 1996 onward.",
          "The current university positioning is rehabilitation-led, statutory, UGC 2(f) recognized, and admissions active for the first university academic cycle.",
        ],
      },
    ],
    faqItems: [
      { question: "How are sponsor body records presented?", answer: "The website presents university-cleared public facts and keeps internal sponsor body records within official governance channels." },
    ],
    relatedLinks: [
      { href: "/about", label: "About Stmarys University", description: "Institutional journey and leadership context." },
      { href: "/leadership/all", label: "Leadership", description: "Public leadership and governance pages." },
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Published establishment and UGC recognition documents." },
    ],
  },
  {
    slug: "accessibility-statement",
    title: "Accessibility Statement",
    description: "Accessibility commitment and public feedback route for the Stmarys University rehabilitation-led website.",
    eyebrow: "Inclusion",
    intro: "As a rehabilitation-led university, Stmarys University treats accessibility as part of institutional trust. The website will continue to improve toward accessible content, navigation, forms, and public documents.",
    pageType: "trust",
    ...processStatus("Digital and Student Support Teams"),
    answers: [
      { question: "Why is accessibility important for Stmarys University?", answer: "Accessibility aligns with the university's rehabilitation and inclusion identity and supports students, parents, and public stakeholders." },
    ],
    sections: [
      {
        heading: "Accessibility Commitment",
        paragraphs: [
          "Stmarys University aims to maintain meaningful alt text, clear headings, keyboard-friendly navigation, readable contrast, labelled forms, and accessible public documents wherever feasible.",
          "Accessibility feedback can be sent through the official contact route while improvements continue through the website maintenance process.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Send accessibility feedback through official channels." },
      { href: "/public-information", label: "Public Information", description: "Public information route." },
    ],
  },
  {
    slug: "research",
    title: "Research & Doctoral Disclosure",
    description: "Research and doctoral disclosure status for the first university academic cycle at Stmarys University.",
    eyebrow: "Research",
    intro: "Stmarys University doctoral information is published through the Ph.D. admissions page. Broader research-cell disclosures are maintained through the university-cycle publication workflow.",
    pageType: "research",
    ...processStatus("Research Office"),
    answers: [
      { question: "Where is doctoral admissions status published?", answer: "The Ph.D. admissions page publishes current-cycle status, notices, research domains, and fees." },
    ],
    sections: [
      {
        heading: "Research Disclosure Status",
        paragraphs: [
          "The Research Office maintains doctoral and research information for public release.",
          "Ph.D. admissions cycle status is published on the Ph.D. admissions page.",
        ],
      },
    ],
    documents: [OFFICIAL_DOCUMENTS.phdNotice2026, OFFICIAL_DOCUMENTS.phdAddendum2026],
    faqItems: [],
    relatedLinks: [
      { href: "/phd-admissions", label: "Ph.D. Admissions", description: "Doctoral admissions status and documents." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Disclosure dashboard." },
    ],
  },
  {
    slug: "university-in-telangana",
    title: "University in Telangana",
    description: "State private university in Telangana with a rehabilitation-led academic focus.",
    eyebrow: "Regional Excellence",
    intro: "Stmarys University is established in Telangana with a rehabilitation-led academic identity and public disclosure approach.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "Is Stmarys University a private university in Telangana?", answer: "Stmarys University is established through the published Telangana Act and maintains public documents on the Approvals & Recognitions page." },
    ],
    sections: [
      {
        heading: "Educational Impact in Telangana",
        paragraphs: [
          "Stmarys University focuses on rehabilitation, healthcare, allied sciences, technology, law, psychology, and inclusive education.",
          "Published establishment and UGC recognition documents are available for verification.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: complianceLinks,
  },
  {
    slug: "physiotherapy-college-in-telangana",
    title: "Physiotherapy Programmes in Telangana",
    description: "Public reference page for Stmarys University physiotherapy programmes, admissions, and regulatory-status verification.",
    eyebrow: "Clinical Expertise",
    intro: "Stmarys University offers physiotherapy education pathways through its Health & Allied Health Sciences structure. Applicants should verify current admission, fee, and regulatory-status information through official university pages.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "Where can I check Stmarys University physiotherapy information?", answer: "Use the Department of Physiotherapy page and admissions pages for current programme information." },
    ],
    sections: [
      {
        heading: "BPT & MPT Reference",
        paragraphs: [
          "The programme pages describe duration, eligibility, practical exposure, and fee references where available.",
          APPROVAL_SAFETY_NOTE,
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [{ href: "/schools/health-allied-health-sciences/physiotherapy", label: "Department of Physiotherapy", description: "View all physiotherapy programmes." }],
  },
  {
    slug: "baslp-college-in-hyderabad",
    title: "BASLP Programme in Hyderabad",
    description: "Public reference page for Stmarys University BASLP and speech-hearing science admissions information.",
    eyebrow: "Specialized Sciences",
    intro: "Stmarys University publishes BASLP and speech-hearing science information through its Rehabilitation Sciences pages. Applicants should verify professional permissions through published university or statutory council documents.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "Where can I study BASLP at Stmarys University?", answer: "Use the BASLP programme page under the School of Rehabilitation Sciences for current university information." },
    ],
    sections: [
      {
        heading: "Audiology & Speech Reference",
        paragraphs: [
          "The programme page describes the academic pathway, clinical orientation, duration, and eligibility information.",
          APPROVAL_SAFETY_NOTE,
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [{ href: "/schools/rehabilitation-sciences/audiology-speech-sciences/baslp", label: "BASLP Program", description: "View programme details." }],
  },
  {
    slug: "campus-near-ramoji-film-city",
    title: "Campus Near Ramoji Film City",
    description: "Stmarys University Deshmukhi Campus location guide and directions near Ramoji Film City, Hyderabad.",
    eyebrow: "Location Guide",
    intro: "Stmarys University Deshmukhi campus is located near Ramoji Film City, Hyderabad, with public contact and visit guidance on the Contact page.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "How far is the campus from Ramoji Film City?", answer: "The website describes the campus as near Ramoji Film City. Visitors should confirm route and visit timing through the contact page." },
    ],
    sections: [
      {
        heading: "Visitor Information",
        paragraphs: [
          "Prospective students and parents should schedule guided campus visits through official university contact routes.",
          "Use the Contact page for current visit timings, directions, and admissions helpdesk support.",
        ],
      },
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/campus-location-hyderabad", label: "Campus Location Hyderabad", description: "Campus address, map reference, and visitor information." },
      { href: "/campus-360", label: "Campus Tour", description: "Explore the campus through the public virtual tour route." },
      { href: "/contact", label: "Contact Us", description: "Get exact coordinates and phone support." },
      { href: "/admissions", label: "Admissions and Apply Now", description: "Review admissions guidance before planning a campus visit." },
      { href: "/schools", label: "Schools", description: "Explore academic schools and programme pathways." },
      { href: "/academic-structure", label: "Courses and Academic Structure", description: "Compare departments and programme routes." },
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Check official recognition and disclosure pages." },
    ],
  },
  {
    slug: "campus-location-hyderabad",
    title: "Campus Location Hyderabad",
    description: "Official Stmarys University Hyderabad campus address, map reference, and visitor location information.",
    eyebrow: "Campus Location",
    intro: `Stmarys University is located at ${SITE_CONTACT.address}`,
    pageType: "local",
    ...defaultStatus,
    answers: [
      { question: "Where is the Stmarys University campus located?", answer: SITE_CONTACT.address },
      { question: "What is the nearest landmark?", answer: "The campus is located near Ramoji Film City, Hyderabad." },
      { question: "Who should visitors contact before coming to campus?", answer: `Visitors may contact the university helpdesk at ${SITE_CONTACT.primaryPhone} or ${SITE_CONTACT.email}.` },
    ],
    sections: [
      {
        heading: "Campus Address",
        paragraphs: [
          SITE_CONTACT.address,
          "Prospective students, parents, and visitors should contact the university before planning a guided campus visit.",
        ],
      },
      {
        heading: "Location Reference",
        paragraphs: [
          "The campus is published on the website as the Deshmukhi campus near Ramoji Film City, Hyderabad.",
          "Use the contact page for current visit timings, directions, and admissions helpdesk support.",
        ],
      },
    ],
    faqItems: [
      { question: "Is the campus location page public?", answer: "Yes. This page provides the public campus address and map reference for Stmarys University Hyderabad." },
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=St.%20Mary%27s%20Rehabilitation%20University%2C%20Deshmukhi&output=embed",
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Official contact details, phone, email, and campus map." },
      { href: "/campus-near-ramoji-film-city", label: "Campus Near Ramoji Film City", description: "Additional location guide for visitors." },
      { href: "/campus-360", label: "Campus 360", description: "Virtual campus and visitor experience page." },
    ],
  },
  {
    slug: "hostel",
    title: "Hostel Facilities",
    description: "Public hostel facility information for students at Stmarys University.",
    eyebrow: "Student Life",
    intro: "Stmarys University provides separate hostel facilities for boys and girls, subject to university norms, allotment rules, and availability.",
    pageType: "trust",
    ...defaultStatus,
    answers: [
      { question: "Are hostel facilities available?", answer: "Yes. The website publishes separate hostel facilities for boys and girls." },
      { question: "How should students confirm hostel allotment?", answer: `Students should confirm current availability, fees, and rules through admissions support at ${SITE_CONTACT.primaryPhone}.` },
    ],
    sections: [
      {
        heading: "Published Hostel Facilities",
        paragraphs: [
          "Separate hostel facilities are available for boys and girls.",
          "Published amenities include air conditioning, individual study tables, storage cupboards, laundry facilities, and dining services with different weekly menus.",
        ],
      },
      {
        heading: "Student Guidance",
        paragraphs: [
          "Hostel allotment, fee, room category, and rules should be confirmed with the university for the current academic year.",
          "Students may also use the campus visit route to view sample facilities where available.",
        ],
      },
    ],
    faqItems: [
      { question: "Is hostel allotment automatic?", answer: "Hostel allotment is subject to university norms and availability." },
      { question: "Where can I ask for current hostel fees?", answer: "Use the admissions helpdesk or contact page for the latest hostel fee and allotment information." },
    ],
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Ask the university for current hostel availability and fee details." },
      { href: "/campus-360", label: "Campus 360", description: "Explore campus facilities virtually." },
      { href: "/campus-location-hyderabad", label: "Campus Location", description: "Campus address and map reference." },
    ],
  },
];

export const INFO_PAGE_MAP = new Map(INFO_PAGES.map((page) => [page.slug, page]));

const makeLinks = (slugs: string[]) =>
  slugs
    .map((slug) => INFO_PAGE_MAP.get(slug))
    .filter(Boolean)
    .map((page) => ({
      href: `/${page!.slug}`,
      label: page!.title,
      description: page!.description,
    }));

export const TRUST_LINKS = makeLinks([
  "approvals-recognitions",
  "statutory-disclosures",
  "mandatory-disclosure",
  "ugc-disclosure",
  "admission-policy",
  "refund-policy",
  "fee-structure",
  "contact-directory",
  "faculty-directory",
  "ombudsperson",
  "iqac-quality-assurance",
  "naac",
  "nirf",
  "public-information",
  "anti-ragging",
  "grievance-redressal",
  "academic-calendar",
  "first-academic-year-disclosures",
  "sponsor-society",
  "accessibility-statement",
]);

export const LOCATION_LINKS = makeLinks([
  "campus-location-hyderabad",
  "campus-near-ramoji-film-city",
]);

export const REGIONAL_LINKS = makeLinks([
  "university-in-telangana",
  "physiotherapy-college-in-telangana",
  "baslp-college-in-hyderabad",
  "campus-near-ramoji-film-city",
]);

export const FACILITY_LINKS = makeLinks(["hostel"]);

export const RESEARCH_LINKS = makeLinks(["research"]);

export const GLOBAL_TRUST_CTA_LINKS = [
  ...TRUST_LINKS,
  { href: SITE_CTA_LINKS.brochure, label: "Brochure", description: "University brochure download page." },
];
