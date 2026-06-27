export type ComplianceStatus =
  | "Published"
  | "First University-Cycle Tracking"
  | "Available on Official Request"
  | "Pending official document/data from university office."
  | "Being updated"
  | "To be updated after statutory approval"
  | "Available through admissions office"
  | "Under review";

export type CompliancePage = {
  section: "mandatory-disclosure" | "iqac";
  slug: string;
  title: string;
  description: string;
  h1: string;
  status: ComplianceStatus;
  ownerOffice: string;
  lastUpdated: string;
  lastReviewed: string;
  nextReviewDue: string;
  sourceDocumentNeeded: string;
  evidenceLinks: Array<{ href: string; label: string }>;
  directAnswer: string;
  disclosureNote: string;
  disclaimer: string;
  faqTopics: string[];
  indexing: "index" | "noindex";
  schemaMode: "verified-public-facts" | "route-only";
};

const review = {
  lastUpdated: "6 June 2026",
  lastReviewed: "6 June 2026",
  nextReviewDue: "30 June 2026",
};

const pending = "Pending official document/data from university office.";
const defaultDisclaimer =
  "This page is a compliance status page. It must not be used to infer approvals, fees, intake, eligibility, duration, accreditation, rankings, placements or officer names unless St.Marys University publishes official evidence.";

const officialEvidence = [
  { href: "/assets/SMRU%20Act%2010%20of%202026.pdf", label: "University Establishment Act" },
  {
    href: "/assets/St.%20Marys%20Rehabilitation%20University%20UGC%20recognition%20letter%202(f).pdf",
    label: "UGC Recognition Letter",
  },
];

const contactEvidence = [{ href: "/contact", label: "Official Contact Route" }];
const naacSafeStatusLine =
  "NAAC-related information will be updated as per official university records and applicable accreditation processes.";
const naacDisclaimer =
  "This IQAC/NAAC readiness page does not claim accreditation status or quality outcomes. Details require official university records before public indexing.";

export const compliancePagePath = (page: CompliancePage) => `/${page.section}/${page.slug}`;

const iqacPendingPage = ({
  slug,
  title,
  description,
  h1,
  ownerOffice = "Quality Assurance Office",
  directAnswer = naacSafeStatusLine,
  disclosureNote = "Do not publish IQAC composition, minutes, AQAR, SSR, audit findings, feedback outcomes or NAAC-related documents without official approval.",
  faqTopics,
}: {
  slug: string;
  title: string;
  description: string;
  h1: string;
  ownerOffice?: string;
  directAnswer?: string;
  disclosureNote?: string;
  faqTopics: string[];
}): CompliancePage => ({
  section: "iqac",
  slug,
  title,
  description,
  h1,
  status: pending,
  ownerOffice,
  sourceDocumentNeeded: pending,
  evidenceLinks: contactEvidence,
  directAnswer,
  disclosureNote,
  disclaimer: naacDisclaimer,
  faqTopics,
  indexing: "noindex",
  schemaMode: "route-only",
  ...review,
});

export const COMPLIANCE_PAGES: CompliancePage[] = [
  {
    section: "mandatory-disclosure",
    slug: "ugc-disclosure",
    title: "UGC Recognition Disclosure",
    description: "Public route for St.Marys University university-level UGC recognition document verification.",
    h1: "UGC Recognition Disclosure",
    status: "Published",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: "Public UGC recognition letter and establishment act are linked. Programme-level approvals remain separate where applicable.",
    evidenceLinks: officialEvidence,
    directAnswer:
      "St.Marys University provides public document routes for university-level UGC recognition verification. This does not create or imply programme-level approval claims.",
    disclosureNote:
      "Do not infer professional council approvals, course intake, eligibility, duration, fees, accreditation or ranking from university-level recognition documents.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["UGC recognition", "university-level evidence", "programme-level approvals", "official documents"],
    indexing: "index",
    schemaMode: "verified-public-facts",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "statutory-disclosures",
    title: "Statutory Disclosure Index",
    description: "Index of verified and pending St.Marys University mandatory disclosure status pages.",
    h1: "Statutory Disclosure Index",
    status: "Published",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: "Verified source documents are linked where public. Pending items are marked separately.",
    evidenceLinks: officialEvidence,
    directAnswer:
      "This index separates verified public documents from disclosure items that still need official university data before public indexing.",
    disclosureNote: "Disclosure items without public evidence are shown by status, not by unsupported claims.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["statutory disclosures", "document status", "pending data", "official verification"],
    indexing: "index",
    schemaMode: "verified-public-facts",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "statutory-bodies",
    title: "Statutory Bodies Disclosure",
    description: "Status page for statutory body information pending official university publication.",
    h1: "Statutory Bodies Disclosure",
    status: "To be updated after statutory approval",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Statutory body names, members, terms and minutes must remain pending until St.Marys University publishes official data.",
    disclosureNote: "Do not invent statutory body names, memberships, dates, meeting minutes or approval references.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["statutory bodies", "governing records", "official publication", "pending data"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "governance",
    title: "Governance Disclosure",
    description: "Governance disclosure status page pending official university document release.",
    h1: "Governance Disclosure",
    status: "To be updated after statutory approval",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Governance structure details require official university publication before they can be indexed or cited.",
    disclosureNote: "Do not publish officer names, committee details, meeting records or governance claims without official evidence.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["governance", "official records", "responsible office", "pending publication"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "programmes-offered",
    title: "Programmes Offered Disclosure",
    description: "Programme disclosure status page with official course routes and no unverified intake or eligibility claims.",
    h1: "Programmes Offered Disclosure",
    status: "Available through admissions office",
    ownerOffice: "Academic Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: [
      { href: "/schools", label: "Official Schools" },
      { href: "/academic-structure", label: "Academic Structure" },
    ],
    directAnswer:
      "Programme discovery should use official St.Marys University school and academic-structure routes. A mandatory disclosure programme document is still required for indexing this page.",
    disclosureNote: "Do not add unverified course duration, intake, eligibility, fee, approval or accreditation data.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["programmes offered", "course verification", "academic office", "pending programme document"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "faculty",
    title: "Faculty Disclosure",
    description: "Faculty disclosure status page pending official faculty data from the university office.",
    h1: "Faculty Disclosure",
    status: "Being updated",
    ownerOffice: "Academic Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Faculty names, designations, qualifications and department assignments must remain pending until official data is published.",
    disclosureNote: "Do not invent faculty names, qualifications, designations, counts or profiles.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["faculty data", "academic office", "qualification records", "pending document"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "fees",
    title: "Fees Disclosure",
    description: "Fee disclosure status page pending official fee document publication.",
    h1: "Fees Disclosure",
    status: "Available through admissions office",
    ownerOffice: "Accounts Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Fee details must be confirmed through official St.Marys University documents or contact routes until a public fee disclosure is published.",
    disclosureNote: "Do not publish or infer programme fees, payment schedules, scholarships, refunds or charges without official proof.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["fees", "accounts office", "refunds", "official proof"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "infrastructure",
    title: "Infrastructure Disclosure",
    description: "Infrastructure disclosure status page pending official public data from the university office.",
    h1: "Infrastructure Disclosure",
    status: "Being updated",
    ownerOffice: "Administration Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Infrastructure details require official public data before they can be indexed as compliance facts.",
    disclosureNote: "Do not invent land area, buildings, labs, beds, clinical facilities, equipment, hostels or capacity figures.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["infrastructure", "facilities", "administration office", "pending data"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "student-support",
    title: "Student Support Disclosure",
    description: "Student support disclosure status page pending official publication of support services and contacts.",
    h1: "Student Support Disclosure",
    status: "Being updated",
    ownerOffice: "Student Affairs Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Student support details should be verified through official St.Marys University contact routes until public support documents are released.",
    disclosureNote: "Do not invent counselling cells, support officers, helplines, facilities or service guarantees.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["student support", "student affairs", "support contacts", "pending publication"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "grievance-redressal",
    title: "Grievance Redressal Disclosure",
    description: "Grievance redressal status page pending official public details from St.Marys University.",
    h1: "Grievance Redressal Disclosure",
    status: "Being updated",
    ownerOffice: "Student Affairs Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Grievance redressal details must remain status-tracked until St.Marys University publishes official public data.",
    disclosureNote: "Do not name officers, committees, escalation contacts or timelines without approved evidence.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["grievance redressal", "student affairs", "official contact", "pending data"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "anti-ragging",
    title: "Anti-Ragging Disclosure",
    description: "Anti-ragging disclosure status page pending official public committee/contact data.",
    h1: "Anti-Ragging Disclosure",
    status: "Being updated",
    ownerOffice: "Student Affairs Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Anti-ragging public details must be verified through official university publication or contact routes.",
    disclosureNote: "Do not invent committee members, phone numbers, undertakings, timelines or escalation paths.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["anti-ragging", "student safety", "official contact", "pending committee data"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "policies",
    title: "Policies Disclosure",
    description: "Policy disclosure status page pending official policy document publication.",
    h1: "Policies Disclosure",
    status: "Under review",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: contactEvidence,
    directAnswer: "Policy documents should be published only after official university approval for public release.",
    disclosureNote: "Do not summarize or invent policy rules, grievance rules, refund rules, admission rules or compliance procedures without official documents.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["policies", "official documents", "publication approval", "pending data"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "contact",
    title: "Mandatory Disclosure Contact",
    description: "Official contact route for mandatory disclosure verification and document requests.",
    h1: "Mandatory Disclosure Contact",
    status: "Published",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: "Official contact route is linked for verification and document requests.",
    evidenceLinks: contactEvidence,
    directAnswer: "Disclosure verification requests should use the official St.Marys University contact route unless a specific public document is already linked.",
    disclosureNote: "Do not publish private officer details or unofficial phone numbers on this page.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["contact", "document request", "official route", "verification"],
    indexing: "index",
    schemaMode: "verified-public-facts",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "first-academic-year-disclosure",
    title: "First Academic Year Disclosure",
    description: "Explains first university-cycle status for future reports and disclosures.",
    h1: "First Academic Year Disclosure",
    status: "First University-Cycle Tracking",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: "University-cycle documents will be required when applicable after official approval for public release.",
    evidenceLinks: officialEvidence,
    directAnswer:
      "University-cycle outputs such as eligible alumni outcomes, annual reports, rankings and accreditation materials should be published only when applicable and officially available.",
    disclosureNote: "Do not publish NAAC grade, NIRF rank, placement outcomes or alumni outcomes until official evidence exists.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["first academic cycle", "NAAC readiness", "NIRF status", "future disclosures"],
    indexing: "index",
    schemaMode: "verified-public-facts",
    ...review,
  },
  {
    section: "mandatory-disclosure",
    slug: "public-information",
    title: "Public Information Disclosure",
    description: "Public information route for official verification, admissions and disclosures.",
    h1: "Public Information Disclosure",
    status: "Available on Official Request",
    ownerOffice: "Registrar Office",
    sourceDocumentNeeded: "Official public document or contact-route confirmation is required for item-specific requests.",
    evidenceLinks: contactEvidence,
    directAnswer:
      "Public verification questions should be routed through official St.Marys University contact channels unless a specific document is already published.",
    disclosureNote: "Public information must stay aligned with official university release status.",
    disclaimer: defaultDisclaimer,
    faqTopics: ["public information", "verification contact", "admissions contact", "disclosure route"],
    indexing: "index",
    schemaMode: "verified-public-facts",
    ...review,
  },
  {
    section: "iqac",
    slug: "naac-readiness",
    title: "NAAC Readiness at St.Marys University",
    description: "NAAC readiness status page using official-record and accreditation-process language only.",
    h1: "NAAC Readiness at St.Marys University",
    status: pending,
    ownerOffice: "Quality Assurance Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: [{ href: "/mandatory-disclosure/first-academic-year-disclosure", label: "First Academic Year Disclosure" }],
    directAnswer: naacSafeStatusLine,
    disclosureNote: "Do not imply NAAC accreditation status or quality outcomes without verified official proof.",
    disclaimer: naacDisclaimer,
    faqTopics: ["NAAC readiness", "official records", "accreditation process", "public evidence"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  {
    section: "iqac",
    slug: "quality-assurance",
    title: "IQAC and Quality Assurance",
    description: "Quality assurance readiness and publication-status route for St.Marys University.",
    h1: "IQAC and Quality Assurance",
    status: pending,
    ownerOffice: "Quality Assurance Office",
    sourceDocumentNeeded: pending,
    evidenceLinks: [{ href: "/mandatory-disclosure", label: "Mandatory Disclosure" }],
    directAnswer: naacSafeStatusLine,
    disclosureNote: "Formal composition, minutes, AQAR, SSR or NAAC materials require official approval before publication.",
    disclaimer: naacDisclaimer,
    faqTopics: ["IQAC", "quality assurance", "NAAC readiness", "official publication"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
  iqacPendingPage({
    slug: "about",
    title: "About IQAC",
    description: "IQAC about page pending official university publication.",
    h1: "About IQAC",
    faqTopics: ["about IQAC", "quality office", "official records", "pending publication"],
  }),
  iqacPendingPage({
    slug: "composition",
    title: "IQAC Composition",
    description: "IQAC composition page pending official member and office records.",
    h1: "IQAC Composition",
    disclosureNote: "Do not publish IQAC member names, roles, designations, external nominees or term details without official approval.",
    faqTopics: ["IQAC composition", "member records", "official approval", "pending data"],
  }),
  iqacPendingPage({
    slug: "minutes",
    title: "IQAC Minutes",
    description: "IQAC meeting minutes page pending official approved records.",
    h1: "IQAC Minutes",
    disclosureNote: "Do not publish meeting dates, attendance, agenda, minutes or resolutions without approved official records.",
    faqTopics: ["IQAC minutes", "meeting records", "approved documents", "pending data"],
  }),
  iqacPendingPage({
    slug: "aqar",
    title: "AQAR Status",
    description: "AQAR page pending official university records and applicable process status.",
    h1: "AQAR Status",
    disclosureNote: "Do not publish AQAR status, filing details, assessment references or submitted content without official evidence.",
    faqTopics: ["AQAR", "quality report", "official records", "pending process"],
  }),
  iqacPendingPage({
    slug: "ssr",
    title: "SSR Status",
    description: "SSR page pending official university records and applicable process status.",
    h1: "SSR Status",
    disclosureNote: "Do not publish SSR status, criteria responses or submission claims without official proof.",
    faqTopics: ["SSR", "self study report", "official records", "pending process"],
  }),
  iqacPendingPage({
    slug: "best-practices",
    title: "Best Practices",
    description: "Best-practices page pending official university documentation.",
    h1: "Best Practices",
    disclosureNote: "Do not publish institutional best-practice claims, outcomes, metrics or awards without official documentation.",
    faqTopics: ["best practices", "quality documentation", "evidence", "pending data"],
  }),
  iqacPendingPage({
    slug: "institutional-distinctiveness",
    title: "Institutional Distinctiveness",
    description: "Institutional distinctiveness page pending official university documentation.",
    h1: "Institutional Distinctiveness",
    disclosureNote: "Do not publish distinctiveness claims, outcomes, recognitions or comparative quality statements without official proof.",
    faqTopics: ["institutional distinctiveness", "quality claims", "official proof", "pending data"],
  }),
  iqacPendingPage({
    slug: "student-satisfaction-survey",
    title: "Student Satisfaction Survey",
    description: "Student satisfaction survey page pending official survey process and publication approval.",
    h1: "Student Satisfaction Survey",
    disclosureNote: "Do not publish survey forms, scores, results, response counts or analysis without official approval.",
    faqTopics: ["student satisfaction survey", "survey records", "results", "pending data"],
  }),
  iqacPendingPage({
    slug: "feedback-system",
    title: "Feedback System",
    description: "Feedback-system page pending official university process records.",
    h1: "Feedback System",
    disclosureNote: "Do not publish feedback mechanisms, results, stakeholder analysis or outcomes without official documentation.",
    faqTopics: ["feedback system", "stakeholder feedback", "analysis", "pending data"],
  }),
  iqacPendingPage({
    slug: "action-taken-reports",
    title: "Action Taken Reports",
    description: "Action taken reports page pending official records and publication approval.",
    h1: "Action Taken Reports",
    disclosureNote: "Do not publish actions, dates, responsible officers, closure status or outcomes without official records.",
    faqTopics: ["action taken reports", "quality actions", "official records", "pending data"],
  }),
  iqacPendingPage({
    slug: "academic-audit",
    title: "Academic Audit",
    description: "Academic audit page pending official audit records and publication approval.",
    h1: "Academic Audit",
    ownerOffice: "Academic and Quality Offices",
    disclosureNote: "Do not publish audit findings, scores, observations, compliance status or action plans without official approval.",
    faqTopics: ["academic audit", "audit records", "quality office", "pending data"],
  }),
  iqacPendingPage({
    slug: "quality-initiatives",
    title: "Quality Initiatives",
    description: "Quality initiatives page pending official documentation and approval.",
    h1: "Quality Initiatives",
    disclosureNote: "Do not publish initiative claims, timelines, outcomes, partners, metrics or impact statements without official proof.",
    faqTopics: ["quality initiatives", "official documentation", "outcomes", "pending data"],
  }),
  iqacPendingPage({
    slug: "policies",
    title: "IQAC Policies",
    description: "IQAC policies page pending official policy documents.",
    h1: "IQAC Policies",
    disclosureNote: "Do not publish quality policy text, procedures, committee rules or assessment processes without official documents.",
    faqTopics: ["IQAC policies", "quality policy", "official documents", "pending data"],
  }),
  iqacPendingPage({
    slug: "naac-documents",
    title: "NAAC Documents",
    description: "NAAC documents page pending official university records and applicable accreditation process status.",
    h1: "NAAC Documents",
    disclosureNote: "Do not publish NAAC-related documents or accreditation outcome material unless verified official proof exists.",
    faqTopics: ["NAAC documents", "official records", "accreditation process", "pending data"],
  }),
  {
    section: "iqac",
    slug: "clinical-exposure-quality-note",
    title: "Clinical Exposure Quality Note",
    description: "Quality-readiness note for clinical exposure, rehabilitation education and patient-care-linked learning.",
    h1: "Clinical Exposure Quality Note",
    status: pending,
    ownerOffice: "Academic and Quality Offices",
    sourceDocumentNeeded: pending,
    evidenceLinks: [
      { href: "/health-allied-health-sciences", label: "Health & Allied Health Sciences" },
      { href: "/rehabilitation-sciences", label: "Rehabilitation Sciences" },
    ],
    directAnswer:
      `Clinical exposure should be framed as part of St.Marys University's rehabilitation education ecosystem and patient-care-linked learning. Service availability must be publicly verified. ${naacSafeStatusLine}`,
    disclosureNote:
      "Do not claim hospital accreditation, treatment availability, doctors, timings, OPD/IPD, emergency care or outcomes without official proof.",
    disclaimer: naacDisclaimer,
    faqTopics: ["clinical exposure", "rehabilitation education", "patient-care-linked learning", "verification"],
    indexing: "noindex",
    schemaMode: "route-only",
    ...review,
  },
];

export const HIGH_RISK_COMPLIANCE_PATHS = new Set([
  "/mandatory-disclosure/ugc-disclosure",
  "/mandatory-disclosure/statutory-bodies",
  "/mandatory-disclosure/governance",
  "/mandatory-disclosure/faculty",
  "/mandatory-disclosure/fees",
  "/mandatory-disclosure/infrastructure",
  "/mandatory-disclosure/grievance-redressal",
  "/mandatory-disclosure/anti-ragging",
  "/iqac/naac-readiness",
  "/iqac/quality-assurance",
]);

export const UNAPPROVED_COMPLIANCE_PATHS = new Set(
  COMPLIANCE_PAGES.filter((page) => page.indexing === "noindex").map(compliancePagePath)
);

export const NOINDEX_COMPLIANCE_PATHS = UNAPPROVED_COMPLIANCE_PATHS;

export const isCompliancePathIndexable = (path: string) => !NOINDEX_COMPLIANCE_PATHS.has(path);

export const isCompliancePageIndexable = (page: CompliancePage) => page.indexing === "index";

export const INDEXABLE_COMPLIANCE_PAGES = COMPLIANCE_PAGES.filter(isCompliancePageIndexable);

export const NOINDEX_COMPLIANCE_PAGES = COMPLIANCE_PAGES.filter((page) => !isCompliancePageIndexable(page));

export const MANDATORY_DISCLOSURE_INDEX = COMPLIANCE_PAGES.filter((page) => page.section === "mandatory-disclosure");
export const IQAC_INDEX = COMPLIANCE_PAGES.filter((page) => page.section === "iqac");
export const COMPLIANCE_PAGE_BY_PATH = new Map(
  COMPLIANCE_PAGES.map((page) => [compliancePagePath(page), page])
);
