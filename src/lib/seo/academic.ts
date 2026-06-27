import { schools } from "@/data/schools";
import {
  cleanProgramName,
  findBySlugOrName,
  getCanonicalProgramKey,
  safeSlug,
} from "@/lib/shared/program-utils";
import { MANUAL_VERIFICATION_LABEL, SEO_UPDATE_NOTE } from "@/lib/shared/university";
import {
  buildDepartmentComparisonFaqs,
  buildProgramComparisonFaqs,
  buildSchoolComparisonFaqs,
} from "@/lib/seo/search-intent";

export type SeoAnswerItem = {
  question: string;
  answer: string;
};

export type SeoLinkItem = {
  href: string;
  label: string;
  description: string;
};

export const ENTRANCE_EXAM_LINK: SeoLinkItem = {
  href: "/exam-notification",
  label: "Entrance Exam Updates",
  description: "Future university entrance exam information will be published here through official notices.",
};

const uniquePrograms = (programs: Array<{ slug?: string; name?: string }> = []) => {
  const seen = new Set<string>();
  return programs.filter((program) => {
    const key = getCanonicalProgramKey(program.name || "", { extended: true });
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const resolveSchool = (schoolSlug: string) => findBySlugOrName(schools, schoolSlug) as any;

export const resolveDepartment = (schoolSlug: string, deptSlug: string) => {
  const school = resolveSchool(schoolSlug);
  const department = findBySlugOrName(school?.departments, deptSlug) as any;
  return { school, department };
};

export const resolveProgram = (schoolSlug: string, deptSlug: string, programSlug: string) => {
  const { school, department } = resolveDepartment(schoolSlug, deptSlug);
  const program = findBySlugOrName(department?.programs, programSlug) as any;
  return { school, department, program };
};

export const buildSchoolBreadcrumbs = (school: any) => [
  { name: "Home", path: "/" },
  { name: "Schools", path: "/schools" },
  { name: school?.name || "School", path: `/schools/${safeSlug(school?.slug, school?.name)}` },
];

export const buildDepartmentBreadcrumbs = (school: any, department: any) => [
  { name: "Home", path: "/" },
  { name: "Schools", path: "/schools" },
  { name: school?.name || "School", path: `/schools/${safeSlug(school?.slug, school?.name)}` },
  {
    name: department?.name || "Department",
    path: `/schools/${safeSlug(school?.slug, school?.name)}/${safeSlug(department?.slug, department?.name)}`,
  },
];

export const buildProgramBreadcrumbs = (school: any, department: any, program: any) => [
  { name: "Home", path: "/" },
  { name: "Schools", path: "/schools" },
  { name: school?.name || "School", path: `/schools/${safeSlug(school?.slug, school?.name)}` },
  {
    name: department?.name || "Department",
    path: `/schools/${safeSlug(school?.slug, school?.name)}/${safeSlug(department?.slug, department?.name)}`,
  },
  {
    name: cleanProgramName(program?.name || "Program"),
    path: `/schools/${safeSlug(school?.slug, school?.name)}/${safeSlug(department?.slug, department?.name)}/${safeSlug(program?.slug, program?.name)}`,
  },
];

export const buildSchoolAnswers = (school: any): SeoAnswerItem[] => {
  const departmentCount = (school?.departments || []).length;
  const programCount = uniquePrograms((school?.departments || []).flatMap((department: any) => department.programs || [])).length;
  return [
    {
      question: `What is ${school?.name || "this school"}?`,
      answer: school?.about || SEO_UPDATE_NOTE,
    },
    {
      question: "Which departments are listed under this school?",
      answer:
        departmentCount > 0
          ? `${departmentCount} department${departmentCount === 1 ? "" : "s"} are listed on this school page.`
          : SEO_UPDATE_NOTE,
    },
    {
      question: "How many programs can I explore here?",
      answer:
        programCount > 0
          ? `${programCount} distinct program pathways are currently listed under this school section on the website.`
          : SEO_UPDATE_NOTE,
    },
    {
      question: "How do I apply for a program under this school?",
      answer:
        "Use the official admissions and program links shown on this page. Any future entrance test or counselling requirement will apply only where officially notified.",
    },
  ];
};

export const buildSchoolFaqs = (school: any) => {
  const departments = (school?.departments || []).map((department: any) => department.name).filter(Boolean);
  return [
    {
      question: `What does ${school?.name || "this school"} focus on?`,
      answer: school?.about || SEO_UPDATE_NOTE,
    },
    {
      question: `Which departments are available in ${school?.name || "this school"}?`,
      answer: departments.length ? departments.join("; ") : SEO_UPDATE_NOTE,
    },
    {
      question: `How can I compare programs in ${school?.name || "this school"}?`,
      answer:
        "Open the department and program links from this school page to review individual program details, eligibility, admissions status, and application routes.",
    },
    {
      question: `Is an entrance exam currently announced for ${school?.name || "this school"}?`,
      answer: "No university entrance exam is currently announced. Any future entrance test or counselling requirement will be published through an official notice.",
    },
    {
      question: `Are fees, intake, and statutory approvals listed for ${school?.name || "this school"}?`,
      answer: `${MANUAL_VERIFICATION_LABEL}. Refer to the public disclosure, fee, and admissions pages for confirmed updates.`,
    },
    ...buildSchoolComparisonFaqs(school),
  ];
};

export const buildDepartmentAnswers = (school: any, department: any): SeoAnswerItem[] => {
  const programCount = uniquePrograms(department?.programs || []).length;
  return [
    {
      question: `What is the ${department?.name || "department"}?`,
      answer: department?.about || SEO_UPDATE_NOTE,
    },
    {
      question: "How many programs are listed on this department page?",
      answer:
        programCount > 0
          ? `${programCount} program option${programCount === 1 ? "" : "s"} are currently listed under this department.`
          : SEO_UPDATE_NOTE,
    },
    {
      question: "Which school is this department part of?",
      answer: school?.name ? `${department?.name || "This department"} is listed under ${school.name}.` : SEO_UPDATE_NOTE,
    },
    {
      question: "How do I proceed with admissions from this department page?",
      answer:
        "Use the program detail links and admissions CTA to move to the relevant route. Any future entrance test or counselling requirement will apply only where officially notified.",
    },
  ];
};

export const buildDepartmentFaqs = (school: any, department: any) => {
  const programs = uniquePrograms(department?.programs || []).map((program) => cleanProgramName(program.name || "", { trailingOnly: true }));
  return [
    {
      question: `What academic focus is shown for ${department?.name || "this department"}?`,
      answer: department?.about || SEO_UPDATE_NOTE,
    },
    {
      question: `Which programs are listed under ${department?.name || "this department"}?`,
      answer: programs.length ? programs.join("; ") : SEO_UPDATE_NOTE,
    },
    {
      question: `Where can I find the parent school for ${department?.name || "this department"}?`,
      answer: school?.name ? `This department belongs to ${school.name}.` : SEO_UPDATE_NOTE,
    },
    {
      question: `Is an entrance exam currently announced for ${department?.name || "this department"}?`,
      answer: "No university entrance exam is currently announced. Future requirements will be published through an official university notice.",
    },
    {
      question: `Are fee, intake, and approval details confirmed for ${department?.name || "this department"}?`,
      answer: `${MANUAL_VERIFICATION_LABEL}. Check the admissions and disclosure pages for confirmed public updates.`,
    },
    ...buildDepartmentComparisonFaqs(school, department),
  ];
};

export const buildProgramAnswers = (school: any, department: any, program: any): SeoAnswerItem[] => [
  {
    question: `What is ${cleanProgramName(program?.name || "this program")}?`,
    answer: program?.overview || SEO_UPDATE_NOTE,
  },
  {
    question: "Who can apply to this program?",
    answer: program?.eligibility || SEO_UPDATE_NOTE,
  },
  {
    question: "What is the duration of this program?",
    answer: program?.duration || SEO_UPDATE_NOTE,
  },
  {
    question: "How do I apply for this program?",
    answer:
      school && department
        ? `Use the admissions or enquiry actions shown on this program page. This program is listed under ${department.name} in ${school.name}; entrance test or counselling applies only where officially notified.`
        : SEO_UPDATE_NOTE,
  },
];

export const buildProgramFaqs = (school: any, department: any, program: any) => [
  {
    question: `What overview is available for ${cleanProgramName(program?.name || "this program")}?`,
    answer: program?.overview || SEO_UPDATE_NOTE,
  },
  {
    question: `What eligibility is listed for ${cleanProgramName(program?.name || "this program")}?`,
    answer: program?.eligibility || SEO_UPDATE_NOTE,
  },
  {
    question: `How long does ${cleanProgramName(program?.name || "this program")} take?`,
    answer: program?.duration || SEO_UPDATE_NOTE,
  },
  {
    question: `Are intake, fees, and statutory approvals confirmed for ${cleanProgramName(program?.name || "this program")}?`,
    answer: `${MANUAL_VERIFICATION_LABEL}. Review official fee, disclosure, and admissions pages for confirmed updates.`,
  },
  {
    question: `Is an entrance exam currently announced for ${cleanProgramName(program?.name || "this program")}?`,
    answer: "No university entrance exam is currently announced. Future requirements will be published through an official university notice.",
  },
  ...buildProgramComparisonFaqs(school, department, program),
];

export const buildDepartmentSiblingLinks = (school: any, currentDepartment: any): SeoLinkItem[] =>
  (school?.departments || [])
    .filter((department: any) => department?.slug !== currentDepartment?.slug)
    .slice(0, 6)
    .map((department: any) => ({
      href: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}`,
      label: department.name || "Department",
      description: department.about || "Explore programs and department details.",
    }));

export const buildSchoolDepartmentLinks = (school: any): SeoLinkItem[] =>
  (school?.departments || []).slice(0, 6).map((department: any) => ({
    href: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}`,
    label: department.name || "Department",
    description: department.about || "Explore department details and program links.",
  }));

export const buildDepartmentProgramLinks = (school: any, department: any): SeoLinkItem[] =>
  uniquePrograms(department?.programs || [])
    .slice(0, 6)
    .map((program) => ({
      href: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}/${safeSlug(program.slug, program.name)}`,
      label: cleanProgramName(program.name || "", { trailingOnly: true }),
      description: `${department?.name || "Department"} program page`,
    }));

export const buildProgramRelatedLinks = (school: any, department: any, currentProgram: any): SeoLinkItem[] =>
  uniquePrograms(department?.programs || [])
    .filter((program) => program?.slug !== currentProgram?.slug)
    .slice(0, 6)
    .map((program) => ({
      href: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}/${safeSlug(program.slug, program.name)}`,
      label: cleanProgramName(program.name || "", { trailingOnly: true }),
      description: `${department?.name || "Department"} program page`,
    }));
