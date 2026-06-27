import { EDU_PARTNERS, schools as websiteSchools } from "@/data/schools";
import { COURSE_CODES } from "@/data/course-codes";
import { STATIC_PAGE_CONTENT, STATIC_ROUTES } from "@/data/developer/static-seed";
import type {
  CourseCode,
  CoursePartnerLink,
  Department,
  DeveloperCMSState,
  EntityStatus,
  PageRoute,
  Partner,
  Program,
  ProgramType,
  School,
  Visibility,
} from "@/types/developer";

const nowIso = () => new Date().toISOString();

const toProgramType = (level = ""): ProgramType => {
  const value = level.toLowerCase();
  if (value.includes("ph")) return "PhD";
  if (value.includes("dip")) return value.includes("certificate") ? "Certificate" : "Diploma";
  if (value.includes("pg") || value.includes("post")) return "PG";
  if (value.includes("fellow")) return "Fellowship";
  if (value.includes("ug") || value.includes("bachelor")) return "UG";
  return "Other";
};

const defaultVisibility: Visibility = "public";
const defaultStatus: EntityStatus = "live";
const HIDDEN_PARTNER_CODES = new Set(["STMARYS UNIVERSITY", "KPMG", "MICROSOFT", "IST"]);

const normalizePath = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
};

const getProgramPartnerCodes = (program: any = {}) => {
  const rawCodes = Array.isArray(program.partnerCodes)
    ? program.partnerCodes
    : String(program.partnerCode || "").split(/[;,]/);

  return rawCodes
    .map((code) => String(code || "").toUpperCase().trim())
    .filter(Boolean);
};

const staticRouteMap = new Map(STATIC_ROUTES.map((r) => [r.url, r]));

export function loadSeedState(): DeveloperCMSState {
  const schools: School[] = [];
  const departments: Department[] = [];
  const programs: Program[] = [];
  const courseCodes: CourseCode[] = COURSE_CODES;
  const partners: Partner[] = [];
  const partnerLinks: CoursePartnerLink[] = [];
  const routes: PageRoute[] = [];

  const partnerCodeToId = new Map<string, string>();

  Object.values(EDU_PARTNERS || {}).forEach((partner: any) => {
    const partnerCode = (partner.code || "").toUpperCase();
    const id = `partner-${(partner.code || "unknown").toLowerCase()}`;
    partnerCodeToId.set(partnerCode, id);
    const isHiddenPartner = HIDDEN_PARTNER_CODES.has(partnerCode);
    partners.push({
      id,
      slug: String(partner.landingUrl || "").startsWith("/")
        ? partner.landingUrl.replace(/^\//, "")
        : (partner.code || "").toLowerCase(),
      name: partner.name,
      redirectUrl: normalizePath(partner.landingUrl),
      iframeUrl: partner.iframeUrl || "",
      embedCode: partner.embedCode || "",
      logo: partner.logo || "",
      visibility: isHiddenPartner ? "hidden" : "public",
      status: isHiddenPartner ? "archived" : "live",
      partnerType: "edutech",
      shortDescription: "Partner-linked education program pathway",
      website: "",
      openInNewTab: false,
    });

    if (partner.landingUrl && !isHiddenPartner && !String(partner.landingUrl).startsWith("http")) {
      routes.push({
        id: `route-partner-${(partner.code || "").toLowerCase()}`,
        title: `${partner.name} Partner Page`,
        url: `/partner/${(partner.landingUrl || "").replace(/^\//, "") || (partner.code || "").toLowerCase()}`,
        pageType: "partner",
        routeGroup: "partner",
        visibility: "public",
        status: "live",
        inNavbar: false,
        inFooter: false,
        indexable: true,
        pageExists: true,
      });
    }
  });

  (websiteSchools || []).forEach((school: any, schoolIndex: number) => {
    const schoolId = `school-${school.slug}`;

    schools.push({
      id: schoolId,
      slug: school.slug,
      name: school.name,
      shortName: school.short,
      overview: school.about,
      description: school.about,
      heroTitle: school.name,
      heroSubtitle: school.short,
      displayOrder: schoolIndex + 1,
      featured: schoolIndex < 4,
      ctaLabel: "View School",
      ctaLink: `/schools/${school.slug}`,
      visibility: defaultVisibility,
      status: defaultStatus,
    });

    routes.push({
      id: `route-school-${school.slug}`,
      title: school.name,
      url: `/schools/${school.slug}`,
      slug: school.slug,
      pageType: "school",
      routeGroup: "public",
      visibility: defaultVisibility,
      status: defaultStatus,
      inNavbar: false,
      inFooter: true,
      indexable: true,
      pageExists: true,
    });

    (school.departments || []).forEach((department: any, deptIndex: number) => {
      const departmentId = `department-${school.slug}-${department.slug}`;

      departments.push({
        id: departmentId,
        slug: department.slug,
        schoolId,
        name: department.name,
        shortDescription: department.about || "",
        fullDescription: department.about || "",
        displayOrder: deptIndex + 1,
        ctaLabel: "Explore Department",
        ctaLink: `/schools/${school.slug}/${department.slug}`,
        visibility: defaultVisibility,
        status: defaultStatus,
      });

      routes.push({
        id: `route-dept-${school.slug}-${department.slug}`,
        title: department.name,
        url: `/schools/${school.slug}/${department.slug}`,
        slug: department.slug,
        pageType: "department",
        routeGroup: "public",
        visibility: defaultVisibility,
        status: defaultStatus,
        inNavbar: false,
        inFooter: false,
        indexable: true,
        pageExists: true,
      });

      (department.programs || []).forEach((program: any, programIndex: number) => {
        const programId = `program-${school.slug}-${department.slug}-${program.slug}`;
        const programRoute = `/schools/${school.slug}/${department.slug}/${program.slug}`;
        const programPartnerCodes = getProgramPartnerCodes(program);

        programs.push({
          id: programId,
          slug: program.slug,
          schoolId,
          departmentId,
          courseName: program.name,
          shortName: program.name,
          programType: toProgramType(program.level),
          duration: program.duration || "",
          eligibility: program.eligibility || "",
          feesNote: program.fees || program.feeNotes || "",
          scholarshipNote: "",
          curriculumSummary: program.curriculum || "",
          internshipInfo: program.durationNote || "",
          clinicalTrainingInfo: program.overview ? "Integrated clinical training and outreach" : "",
          shortOverview: program.overview || "",
          fullOverview: program.overview || "",
          whyChoose: program.whyChoose || program.whyChooseNote || "",
          highlights: program.highlights || [],
          learningOutcomes: program.outcomes || "",
          careerOutcomes: program.outcomes || program.careerOpportunities || "",
          careerOpportunities: program.careerOpportunities || "",
          higherStudies: "",
          placementNote: program.salaryNote || "Career support information",
          brochureLink: "/brochure",
          applyNowLink: "https://apply.smru.edu.in",
          primaryCtaLabel: "Apply Now",
          primaryCtaLink: "https://apply.smru.edu.in",
          secondaryCtaLabel: "Download Brochure",
          secondaryCtaLink: "/brochure",
          admissionsLink: "https://apply.smru.edu.in",
          enquiryLink: "/contact",
          coreSubjects: program.subjects || [],
          electives: program.specializations || [],
          trainingPartnerAssigned: programPartnerCodes,
          indexable: true,
          inSitemap: true,
          visibility: defaultVisibility,
          status: defaultStatus,
          contentCompleteness: 0,
          notes: "",
        });

        routes.push({
          id: `route-program-${school.slug}-${department.slug}-${program.slug}`,
          title: program.name,
          url: programRoute,
          slug: program.slug,
          pageType: "program",
          routeGroup: "public",
          visibility: defaultVisibility,
          status: defaultStatus,
          inNavbar: false,
          inFooter: false,
          indexable: true,
          pageExists: true,
        });

        programPartnerCodes.forEach((partnerCode) => {
          const partnerId = partnerCodeToId.get(partnerCode);
          if (partnerId) {
            const partner = EDU_PARTNERS[partnerCode];
            partnerLinks.push({
              id: `pl-${programId}-${partnerId}`,
              programId,
              partnerId,
              ctaLabel: "Partner Apply",
              redirectLink: program.partnerLeadUrl || normalizePath(partner?.landingUrl) || "",
              redirectType: program.partnerLeadUrl?.startsWith("http") ? "external" : "internal",
              enabled: true,
              visibility: defaultVisibility,
              status: defaultStatus,
            });
          }
        });

        if (programIndex === 0 && programPartnerCodes.length === 0) {
          partnerLinks.push({
            id: `pl-placeholder-${programId}`,
            programId,
            partnerId: "",
            ctaLabel: "",
            redirectLink: "",
            redirectType: "internal",
            enabled: false,
            visibility: "draft",
            status: "in-progress",
            notes: "No partner mapped yet",
          });
        }
      });
    });
  });

  STATIC_ROUTES.forEach((route) => {
    if (!routes.some((r) => r.url === route.url)) routes.push(route);
  });

  routes.forEach((route) => {
    const staticRoute = staticRouteMap.get(route.url);
    if (!staticRoute) return;
    route.inNavbar = staticRoute.inNavbar ?? route.inNavbar;
    route.inFooter = staticRoute.inFooter ?? route.inFooter;
    route.indexable = staticRoute.indexable ?? route.indexable;
    route.routeGroup = staticRoute.routeGroup ?? route.routeGroup;
    route.visibility = staticRoute.visibility ?? route.visibility;
    route.status = staticRoute.status ?? route.status;
  });

  routes.sort((a, b) => a.url.localeCompare(b.url));

  return {
    metadata: {
      sourceVersion: "smru-dev-cms-v1",
      lastUpdated: nowIso(),
    },
    routes,
    schools,
    departments,
    programs,
    courseCodes,
    partners,
    partnerLinks,
    pages: STATIC_PAGE_CONTENT,
  };
}
