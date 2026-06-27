import { absoluteUrl } from "@/lib/metadata";
import { SITE_IDENTITY } from "@/lib/seo/site";
import { safeSlug } from "@/lib/shared/program-utils";

export type SeoCourseListItem = {
  name: string;
  description?: string;
  url: string;
  level?: string;
  duration?: string;
  eligibility?: string;
  schoolName?: string;
  departmentName?: string;
};

const clean = (value?: string) => String(value || "").replace(/\s+/g, " ").trim();

const fallbackDescription = (item: SeoCourseListItem) => {
  const level = clean(item.level) || "Programme";
  const school = clean(item.schoolName) || "Stmarys University";
  const department = clean(item.departmentName);
  const departmentSuffix = department ? ` in ${department}` : "";

  return `${level} programme under ${school}${departmentSuffix} at Stmarys University Hyderabad.`;
};

export const buildCourseItemListSchema = (items: SeoCourseListItem[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: (items || []).filter((item) => clean(item.name) && clean(item.url)).map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(item.url),
    item: {
      "@type": "Course",
      "@id": `${absoluteUrl(item.url)}#course`,
      name: clean(item.name),
      description: clean(item.description) || fallbackDescription(item),
      url: absoluteUrl(item.url),
      provider: { "@id": SITE_IDENTITY.id },
      inLanguage: "en-IN",
      ...(item.schoolName ? { isPartOf: { "@type": "EducationalOrganization", name: item.schoolName } } : {}),
      ...(item.level ? { educationalCredentialAwarded: item.level } : {}),
      ...(item.duration ? { timeRequired: item.duration } : {}),
      ...(item.eligibility ? { coursePrerequisites: item.eligibility } : {}),
    },
  })),
});

export const getAllCourseListItems = (schools: any[] = []): SeoCourseListItem[] =>
  schools.flatMap((school) => getSchoolCourseListItems(school));

export const getSchoolCourseListItems = (school: any): SeoCourseListItem[] => {
  if (!school) return [];
  const schoolSlug = safeSlug(school.slug, school.name);
  return (school.departments || []).flatMap((department: any) =>
    getDepartmentCourseListItems(school, department, schoolSlug)
  );
};

export const getDepartmentCourseListItems = (school: any, department: any, resolvedSchoolSlug?: string): SeoCourseListItem[] => {
  if (!school || !department) return [];
  const schoolSlug = resolvedSchoolSlug || safeSlug(school.slug, school.name);
  const deptSlug = safeSlug(department.slug, department.name);
  return (department.programs || []).map((program: any) => ({
    name: program.name,
    description: program.overview,
    url: `/schools/${schoolSlug}/${deptSlug}/${safeSlug(program.slug, program.name)}`,
    level: program.level,
    duration: program.duration,
    eligibility: program.eligibility,
    schoolName: school.name,
    departmentName: department.name,
  }));
};
