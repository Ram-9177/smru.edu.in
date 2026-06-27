export type DisclosureStatus =
  | "Published"
  | "Under Process"
  | "Awaiting Public Release"
  | "Available on Official Request"
  | "Not Applicable - First Academic Year";

export type OfficialDocument = {
  id: string;
  title: string;
  label: string;
  category: "Establishment" | "UGC" | "Admissions" | "Doctoral" | "Brochure" | "Policy" | "Student Support" | "Quality";
  authority: string;
  status: DisclosureStatus;
  ownerDepartment: string;
  lastReviewed: string;
  nextReviewDue: string;
  href?: string;
  description: string;
  publicNote: string;
};

export const DISCLOSURE_LAST_REVIEWED = "11 June 2026";
export const DISCLOSURE_NEXT_REVIEW_DUE = "30 June 2026";

export const STATUS_DESCRIPTIONS: Record<DisclosureStatus, string> = {
  Published: "Public document or disclosure is available for review.",
  "Under Process": "Maintained through the official university verification and publication workflow.",
  "Awaiting Public Release": "Prepared or being verified for university-approved public release.",
  "Available on Official Request": "Maintained by the university office and confirmed through the official channel where appropriate.",
  "Not Applicable - First Academic Year": "This item will emerge through the first university academic cycle and is tracked for future publication.",
};

export const FIRST_ACADEMIC_YEAR_NOTE =
  "Stmarys University carries forward Stmarys educational legacy while operating as Stmarys University in its first university academic cycle. Items such as university alumni data, placement outcomes, annual reports, audited annual accounts, ranking submissions, and accreditation-cycle outputs are tracked for future publication when they become applicable or are cleared for public release.";

export const APPROVAL_SAFETY_NOTE =
  "Programme-level professional council permissions, where required, are verified through official university notifications or relevant statutory council documents.";

const commonReview = {
  lastReviewed: DISCLOSURE_LAST_REVIEWED,
  nextReviewDue: DISCLOSURE_NEXT_REVIEW_DUE,
};

export const OFFICIAL_DOCUMENTS = {
  smruAct2026: {
    id: "smru-act-2026",
    title: "University Establishment Act",
    label: "Telangana Gazette - University Act No. 10 of 2026",
    category: "Establishment",
    authority: "Government of Telangana",
    status: "Published",
    ownerDepartment: "Registrar Office",
    href: "/assets/SMRU%20Act%2010%20of%202026.pdf",
    description: "Official Telangana Gazette document establishing St. Mary’s Rehabilitation University through Act No. 10 of 2026.",
    publicNote: "This is the primary public establishment document for the university.",
    ...commonReview,
  },
  ugcRecognition2f: {
    id: "ugc-recognition-2f",
    title: "UGC Recognition under Section 2(f)",
    label: "UGC Recognition Letter",
    category: "UGC",
    authority: "University Grants Commission",
    status: "Published",
    ownerDepartment: "Registrar Office",
    href: "/assets/St.%20Marys%20Rehabilitation%20University%20UGC%20recognition%20letter%202(f).pdf",
    description: "Official UGC recognition letter confirming St. Mary’s Rehabilitation University under Section 2(f) of the UGC Act, 1956.",
    publicNote: "This confirms university-level UGC recognition. Programme-level professional approvals are shown separately where applicable.",
    ...commonReview,
  },
  phdNotice2026: {
    id: "phd-admissions-2026-notice",
    title: "Ph.D. Admissions 2026-27 Revised Schedule",
    label: "Ph.D. Admissions Revised Schedule",
    category: "Doctoral",
    authority: "Research and Admissions Offices",
    status: "Published",
    ownerDepartment: "Research Office",
    href: "/assets/Notice_Revised_Schedule_PhD_Admissions_2026_27.docx",
    description: "Published Ph.D. admissions schedule notice for the 2026-27 cycle.",
    publicNote: "Ph.D. admissions cycle status is published on the admissions page.",
    ...commonReview,
  },
  phdAddendum2026: {
    id: "phd-admissions-2026-addendum",
    title: "Ph.D. Admissions Addendum",
    label: "Ph.D. Admissions Addendum",
    category: "Doctoral",
    authority: "Research Office",
    status: "Published",
    ownerDepartment: "Research Office",
    href: "/assets/SMRU_PhD_Addendum_Formatted.docx",
    description: "Published addendum connected with the Ph.D. admissions 2026-27 cycle.",
    publicNote: "Use with the Ph.D. admissions notice and page status.",
    ...commonReview,
  },
  admissionsBrochure: {
    id: "admissions-brochure",
    title: "Admissions Brochure / Flyer",
    label: "Stmarys University Admissions Brochure",
    category: "Brochure",
    authority: "Admissions Office",
    status: "Published",
    ownerDepartment: "Admissions Office",
    href: "/SMG-Flyer.pdf",
    description: "Public admissions brochure/flyer for student and parent reference.",
    publicNote: "The website pages remain the primary source for current fee, status, and disclosure updates.",
    ...commonReview,
  },
} as const satisfies Record<string, OfficialDocument>;

export const OFFICIAL_DOCUMENT_LIST = Object.values(OFFICIAL_DOCUMENTS);

export const getDocumentsByCategory = (category: OfficialDocument["category"]) =>
  OFFICIAL_DOCUMENT_LIST.filter((document) => document.category === category);
