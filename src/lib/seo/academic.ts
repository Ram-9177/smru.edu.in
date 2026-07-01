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
  getProgramSearchSubject,
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

const normalizeLevel = (value = "") => {
  const level = value.toLowerCase();
  if (/ph\.?d|doctoral/.test(level)) return "doctoral";
  if (/pg|postgraduate|m\.?sc|m\.?tech|ll\.?m/.test(level)) return "pg";
  if (/ug|undergraduate|b\.?sc|b\.?tech|ll\.?b|integrated/.test(level)) return "ug";
  if (/diploma|certificate/.test(level)) return "diploma";
  return level.trim();
};

const programPath = (school: any, department: any, program: any) =>
  `/schools/${safeSlug(school?.slug, school?.name)}/${safeSlug(department?.slug, department?.name)}/${safeSlug(program?.slug, program?.name)}`;

const programDescription = (department: any, program: any, reason = "related programme") => {
  const level = program?.level ? `${program.level} ` : "";
  const duration = program?.duration ? ` Duration: ${program.duration}.` : "";
  const eligibility = program?.eligibility ? ` Eligibility: ${program.eligibility}.` : "";
  return `${level}${reason} under ${department?.name || "the department"}.${duration}${eligibility}`.replace(/\s+/g, " ").trim();
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
    path: programPath(school, department, program),
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

export const buildProgramRecommendationLinks = (
  school: any,
  department: any,
  currentProgram: any,
  limit = 8
): SeoLinkItem[] => {
  if (!school || !department || !currentProgram) return [];

  const currentKey = getCanonicalProgramKey(currentProgram?.name || "", { extended: true });
  const currentLevel = normalizeLevel(currentProgram?.level || "");
  const currentSubject = getProgramSearchSubject(currentProgram, department);

  const candidates = (school?.departments || []).flatMap((candidateDepartment: any) =>
    uniquePrograms(candidateDepartment?.programs || [])
      .filter((program: any) => getCanonicalProgramKey(program?.name || "", { extended: true }) !== currentKey)
      .map((program: any) => {
        const candidateLevel = normalizeLevel(program?.level || "");
        const candidateSubject = getProgramSearchSubject(program, candidateDepartment);
        const sameDepartment = safeSlug(candidateDepartment?.slug, candidateDepartment?.name) === safeSlug(department?.slug, department?.name);
        const sameLevel = candidateLevel && candidateLevel === currentLevel;
        const sameSubject = candidateSubject && candidateSubject === currentSubject;
        const score = (sameDepartment ? 40 : 0) + (sameSubject ? 30 : 0) + (sameLevel ? 20 : 0);
        const reason = sameDepartment
          ? "Recommended related course"
          : sameSubject
            ? `Related ${candidateSubject} pathway`
            : "Recommended course pathway";

        return {
          score,
          href: programPath(school, candidateDepartment, program),
          label: cleanProgramName(program?.name || "Program", { trailingOnly: true }),
          description: programDescription(candidateDepartment, program, reason),
        };
      })
  );

  const seen = new Set<string>();
  return candidates
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .filter((candidate) => {
      if (seen.has(candidate.href)) return false;
      seen.add(candidate.href);
      return true;
    })
    .slice(0, limit)
    .map(({ score: _score, ...link }) => link);
};

export const buildProgramAnswers = (school: any, department: any, program: any): SeoAnswerItem[] => {
  const recommendations = buildProgramRecommendationLinks(school, department, program, 4);
  return [
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
    {
      question: "Which related courses should I compare?",
      answer: recommendations.length
        ? `Recommended related course pages include ${recommendations.map((item) => item.label).join("; ")}. Compare eligibility, duration, practical exposure, admission route, and official fee guidance before applying.`
        : "Use the parent department and school links to compare related programmes, eligibility, duration, and admissions guidance.",
    },
  ];
};

export const buildProgramFaqs = (school: any, department: any, program: any) => {
  const recommendations = buildProgramRecommendationLinks(school, department, program, 5);
  return [
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
      question: `Which courses are recommended with ${cleanProgramName(program?.name || "this program")}?`,
      answer: recommendations.length
        ? `Students can compare ${recommendations.map((item) => item.label).join("; ")} from the recommended related courses section on this page.`
        : "Students can use the parent department and school pages to compare related programmes.",
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
};

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
      href: programPath(school, department, program),
      label: cleanProgramName(program.name || "", { trailingOnly: true }),
      description: programDescription(department, program, `${department?.name || "Department"} programme`),
    }));

export const buildProgramRelatedLinks = (school: any, department: any, currentProgram: any): SeoLinkItem[] =>
  buildProgramRecommendationLinks(school, department, currentProgram, 6);
