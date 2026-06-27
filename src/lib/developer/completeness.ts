import type {
  CmsPageContent,
  CompletenessItem,
  CompletenessReport,
  ContentIssue,
  Department,
  DeveloperCMSState,
  Partner,
  Program,
  School,
} from "@/types/developer";

const scoreEntity = (
  id: string,
  label: string,
  fields: Array<{ key: string; value: unknown; required: boolean }>
): CompletenessItem => {
  const required = fields.filter((f) => f.required);
  const filledCount = required.filter((f) => {
    const value = f.value;
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(String(value ?? "").trim());
  }).length;
  const missingFields = required
    .filter((f) => {
      const value = f.value;
      if (Array.isArray(value)) return value.length === 0;
      return !String(value ?? "").trim();
    })
    .map((f) => f.key);

  return {
    id,
    label,
    score: required.length ? Math.round((filledCount / required.length) * 100) : 100,
    missingFields,
  };
};

const schoolCompleteness = (school: School) =>
  scoreEntity(school.id, school.name || school.slug || school.id, [
    { key: "name", value: school.name, required: true },
    { key: "slug", value: school.slug, required: true },
    { key: "overview", value: school.overview, required: true },
    { key: "heroTitle", value: school.heroTitle, required: true },
    { key: "ctaLink", value: school.ctaLink, required: true },
  ]);

const departmentCompleteness = (department: Department) =>
  scoreEntity(department.id, department.name || department.slug || department.id, [
    { key: "name", value: department.name, required: true },
    { key: "slug", value: department.slug, required: true },
    { key: "schoolId", value: department.schoolId, required: true },
    { key: "shortDescription", value: department.shortDescription, required: true },
    { key: "ctaLink", value: department.ctaLink, required: true },
  ]);

const programCompleteness = (program: Program) =>
  scoreEntity(program.id, program.courseName || program.slug || program.id, [
    { key: "courseName", value: program.courseName, required: true },
    { key: "slug", value: program.slug, required: true },
    { key: "programType", value: program.programType, required: true },
    { key: "schoolId", value: program.schoolId, required: true },
    { key: "departmentId", value: program.departmentId, required: true },
    { key: "heroImage", value: program.heroImage, required: true },
    { key: "brochureLink", value: program.brochureLink, required: true },
    { key: "fullOverview", value: program.fullOverview, required: true },
    { key: "eligibility", value: program.eligibility, required: true },
    { key: "curriculumSummary", value: program.curriculumSummary, required: true },
    { key: "facultyAssigned", value: program.facultyAssigned, required: true },
    { key: "metaTitle", value: program.metaTitle, required: true },
    { key: "primaryCtaLink", value: program.primaryCtaLink, required: true },
  ]);

const partnerCompleteness = (partner: Partner) =>
  scoreEntity(partner.id, partner.name || partner.slug || partner.id, [
    { key: "name", value: partner.name, required: true },
    { key: "slug", value: partner.slug, required: true },
    { key: "redirectUrl", value: partner.redirectUrl, required: true },
    { key: "partnerType", value: partner.partnerType, required: true },
  ]);

const pageCompleteness = (page: CmsPageContent) =>
  scoreEntity(page.id, page.title || page.id, [
    { key: "title", value: page.title, required: true },
    { key: "sectionType", value: page.sectionType, required: true },
    { key: "content", value: page.content, required: true },
  ]);

export function computeCompleteness(state: DeveloperCMSState): CompletenessReport {
  return {
    schools: state.schools.map(schoolCompleteness),
    departments: state.departments.map(departmentCompleteness),
    programs: state.programs.map(programCompleteness),
    partners: state.partners.map(partnerCompleteness),
    pages: state.pages.map(pageCompleteness),
  };
}

export function findMissingContent(state: DeveloperCMSState): ContentIssue[] {
  const report = computeCompleteness(state);
  const issues: ContentIssue[] = [];

  const pushIssues = (
    entityType: ContentIssue["entityType"],
    items: CompletenessItem[],
    severity: ContentIssue["severity"]
  ) => {
    items.forEach((item) => {
      item.missingFields.forEach((field) => {
        issues.push({
          id: `${entityType}-${item.id}-${field}`,
          entityType,
          entityId: item.id,
          entityLabel: item.label,
          missingField: field,
          severity,
        });
      });
    });
  };

  pushIssues("school", report.schools, "medium");
  pushIssues("department", report.departments, "medium");
  pushIssues("program", report.programs, "high");
  pushIssues("partner", report.partners, "medium");
  pushIssues("page", report.pages, "low");

  return issues;
}
