export type Visibility = "public" | "hidden" | "draft" | "internal";
export type EntityStatus = "live" | "in-progress" | "coming-soon" | "archived";
export type ProgramType = "UG" | "PG" | "Diploma" | "Certificate" | "PhD" | "Fellowship" | "Other";
export type RedirectType = "internal" | "external" | "apply-page" | "hidden";
export type CmsCollectionKey =
  | "routes"
  | "schools"
  | "departments"
  | "programs"
  | "courseCodes"
  | "partners"
  | "partnerLinks"
  | "pages";

export type CmsEntityBase = {
  id: string;
  slug?: string;
  visibility?: Visibility;
  status?: EntityStatus;
  notes?: string;
};

export type PageRoute = CmsEntityBase & {
  title?: string;
  url: string;
  pageType?: "page" | "school" | "department" | "program" | "partner" | "system" | "redirect";
  routeGroup?: "public" | "hidden" | "draft" | "internal" | "compliance" | "partner" | "redirects";
  inNavbar?: boolean;
  inFooter?: boolean;
  indexable?: boolean;
  redirectTarget?: string;
  redirectType?: RedirectType;
  pageExists?: boolean;
};

export type School = CmsEntityBase & {
  name?: string;
  shortName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  overview?: string;
  description?: string;
  deanName?: string;
  image?: string;
  icon?: string;
  featured?: boolean;
  displayOrder?: number;
  ctaLabel?: string;
  ctaLink?: string;
};

export type Department = CmsEntityBase & {
  schoolId: string;
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  hodName?: string;
  image?: string;
  displayOrder?: number;
  ctaLabel?: string;
  ctaLink?: string;
};

export type Program = CmsEntityBase & {
  schoolId: string;
  departmentId: string;

  courseName?: string;
  shortName?: string;
  programType?: ProgramType;
  mode?: string;
  duration?: string;
  internshipDuration?: string;
  totalIntake?: string;
  campus?: string;
  mediumOfInstruction?: string;

  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  brochureLink?: string;
  applyNowLink?: string;
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;

  shortOverview?: string;
  fullOverview?: string;
  whyChoose?: string;
  highlights?: string[];
  learningOutcomes?: string;
  careerOutcomes?: string;

  eligibility?: string;
  admissionProcess?: string;
  requiredDocuments?: string;
  importantDates?: string;
  feesNote?: string;
  scholarshipNote?: string;
  admissionsLink?: string;
  enquiryLink?: string;

  curriculumSummary?: string;
  yearWiseStructure?: string;
  semesterWiseStructure?: string;
  coreSubjects?: string[];
  electives?: string[];
  clinicalTrainingInfo?: string;
  internshipInfo?: string;
  curriculumPdf?: string;
  syllabusPdf?: string;

  facultyAssigned?: string[];
  labsAssigned?: string[];
  clinicalCentersAssigned?: string[];
  trainingPartnerAssigned?: string[];

  careerOpportunities?: string;
  higherStudies?: string;
  placementNote?: string;
  internshipSupportNote?: string;

  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  indexable?: boolean;
  inSitemap?: boolean;

  contentCompleteness?: number;
  draftComments?: string;
};

export type CourseCode = CmsEntityBase & {
  serialNo?: string;
  schoolCode?: string;
  schoolName?: string;
  departmentCode?: string;
  departmentName?: string;
  levelCode?: string;
  level?: string;
  courseCodeWithTrack?: string;
  courseName?: string;
  track?: string;
  fullCode?: string;
  years?: string;
  semesters?: string;
};

export type Partner = CmsEntityBase & {
  name?: string;
  logo?: any;
  partnerType?: string;
  shortDescription?: string;
  fullDescription?: string;
  website?: string;
  iframeUrl?: string;
  redirectUrl?: string;
  openInNewTab?: boolean;
  embedCode?: string;
};

export type CoursePartnerLink = CmsEntityBase & {
  programId: string;
  partnerId: string;
  ctaLabel?: string;
  redirectLink?: string;
  redirectType?: RedirectType;
  enabled?: boolean;
};

export type ContentIssue = {
  id: string;
  entityType: "page" | "route" | "school" | "department" | "program" | "partner";
  entityId: string;
  entityLabel: string;
  missingField: string;
  severity: "low" | "medium" | "high";
};

export type CompletenessItem = {
  id: string;
  label: string;
  score: number;
  missingFields: string[];
};

export type CompletenessReport = {
  schools: CompletenessItem[];
  departments: CompletenessItem[];
  programs: CompletenessItem[];
  partners: CompletenessItem[];
  pages: CompletenessItem[];
};

export type RedirectCheckResult = {
  routeId: string;
  url: string;
  valid: boolean;
  reason?: string;
};

export type CmsPageContent = CmsEntityBase & {
  title?: string;
  sectionType?: "hero" | "faq" | "scholarship" | "footer" | "contact" | "cta" | "feature" | "misc";
  content?: string;
  tags?: string[];
  ctaLabel?: string;
  ctaLink?: string;
};

export type DeveloperCMSState = {
  metadata: {
    sourceVersion: string;
    lastUpdated: string;
  };
  routes: PageRoute[];
  schools: School[];
  departments: Department[];
  programs: Program[];
  courseCodes: CourseCode[];
  partners: Partner[];
  partnerLinks: CoursePartnerLink[];
  pages: CmsPageContent[];
};

export type DeletedEntityMap = Partial<Record<CmsCollectionKey, string[]>>;

export type DeveloperCMSOverlay = Partial<DeveloperCMSState> & {
  deleted?: DeletedEntityMap;
};
