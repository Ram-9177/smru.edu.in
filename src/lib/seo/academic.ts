import { schools } from "@/data/schools";
import {
  cleanProgramName,
  findBySlugOrName,
  getCanonicalProgramKey,
  safeSlug,
} from "@/lib/shared/program-utils";
import { UNIVERSITY_INFO } from "@/lib/shared/university";
import {
  buildDepartmentComparisonFaqs,
  buildProgramComparisonFaqs,
  buildSchoolComparisonFaqs,
  getProgramSearchSubject,
} from "@/lib/seo/search-intent";
import {
  buildHealthAlliedCourseFaqs,
  getHealthAlliedCourseSeoProfile,
} from "@/lib/seo/health-allied-course-seo";

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

const textValue = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const curriculumSummary = (curriculum: unknown) => {
  if (!Array.isArray(curriculum)) return "";
  const topics = curriculum.flatMap((item: any) => {
    if (typeof item === "string") return [item];
    return [item?.year, ...(Array.isArray(item?.semesters) ? item.semesters : [])];
  });
  const visibleTopics = topics.map(textValue).filter(Boolean).slice(0, 6);
  return visibleTopics.length ? `${visibleTopics.join("; ")}${topics.length > visibleTopics.length ? "; and other approved modules." : "."}` : "";
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

// When a fact is not yet published, say so and give the reader the one useful next step —
// never answer a factual question with an unrelated recognition note. FAQ entries whose answer
// would be NOT_YET are dropped so FAQPage schema never carries a non-answer.
const ASK_ADMISSIONS = `confirmed at official admissions counselling — call ${UNIVERSITY_INFO.phone} or email ${UNIVERSITY_INFO.email}.`;
const NOT_YET = "__not_yet_published__";
const withoutNotYet = <T extends { answer?: string }>(items: T[]) => items.filter((item) => item.answer && item.answer !== NOT_YET);

export const buildSchoolAnswers = (school: any): SeoAnswerItem[] => {
  const departmentCount = (school?.departments || []).length;
  const programCount = uniquePrograms((school?.departments || []).flatMap((department: any) => department.programs || [])).length;
  return [
    {
      question: `What is ${school?.name || "this school"}?`,
      answer: school?.about || `${school?.name || "This school"} is one of the six schools of St. Mary's University (SMRU), Hyderabad. Its full profile is ${ASK_ADMISSIONS}`,
    },
    {
      question: "Which departments are listed under this school?",
      answer:
        departmentCount > 0
          ? `${school?.name || "This school"} has ${departmentCount} department${departmentCount === 1 ? "" : "s"}; each is listed below with its programmes.`
          : `The department structure is ${ASK_ADMISSIONS}`,
    },
    {
      question: "How many programs can I explore here?",
      answer:
        programCount > 0
          ? `${programCount} programme${programCount === 1 ? "" : "s"} are offered under ${school?.name || "this school"}, each with its own page covering eligibility, duration and admissions.`
          : `The programme list is ${ASK_ADMISSIONS}`,
    },
    {
      question: "How do I apply for a program under this school?",
      answer:
        "Choose a programme below, then apply online at apply.smru.edu.in and complete admissions counselling. No entrance exam is currently announced; any future test is published only through an official university notice.",
    },
  ];
};

export const buildSchoolFaqs = (school: any) => {
  const departments = (school?.departments || []).map((department: any) => department.name).filter(Boolean);
  return withoutNotYet([
    {
      question: `What does ${school?.name || "this school"} focus on?`,
      answer: school?.about || NOT_YET,
    },
    {
      question: `Which departments are in ${school?.name || "this school"}?`,
      answer: departments.length ? `${school?.name || "The school"} comprises: ${departments.join("; ")}.` : NOT_YET,
    },
    {
      question: `How do I compare programmes in ${school?.name || "this school"}?`,
      answer:
        "Each programme page states its level, duration, eligibility and practical training; compare those side by side, then confirm the current fee at admissions counselling.",
    },
    {
      question: `Is there an entrance exam for ${school?.name || "this school"}?`,
      answer: "No university entrance exam is currently announced; admission is through the online application and admissions counselling. Any future test will be published only through an official university notice.",
    },
    {
      question: `Is ${school?.name || "this school"} at St. Mary's University recognised?`,
      answer: "St. Mary's University is recognised by the UGC under Section 2(f) of the UGC Act, 1956. Where a professional council approval applies to a programme, it is published on the Approvals & Recognitions page.",
    },
    ...buildSchoolComparisonFaqs(school),
  ]);
};

export const buildDepartmentAnswers = (school: any, department: any): SeoAnswerItem[] => {
  const programCount = uniquePrograms(department?.programs || []).length;
  return [
    {
      question: `What is the ${department?.name || "department"}?`,
      answer: department?.about || `${department?.name || "This department"} is part of ${school?.name || "St. Mary's University"} at SMRU, Hyderabad; its programmes are listed below.`,
    },
    {
      question: "How many programs are listed on this department page?",
      answer:
        programCount > 0
          ? `${department?.name || "This department"} offers ${programCount} programme${programCount === 1 ? "" : "s"}, each with its own page.`
          : `The programme list is ${ASK_ADMISSIONS}`,
    },
    {
      question: "Which school is this department part of?",
      answer: school?.name ? `${department?.name || "This department"} is part of ${school.name} at St. Mary's University (SMRU), Hyderabad.` : `${department?.name || "This department"} is part of St. Mary's University (SMRU), Hyderabad.`,
    },
    {
      question: "How do I proceed with admissions from this department page?",
      answer:
        "Open the programme you want, then apply online at apply.smru.edu.in and complete admissions counselling. No entrance exam is currently announced.",
    },
  ];
};

export const buildDepartmentFaqs = (school: any, department: any) => {
  const programs = uniquePrograms(department?.programs || []).map((program) => cleanProgramName(program.name || "", { trailingOnly: true }));
  return withoutNotYet([
    {
      question: `What does ${department?.name || "this department"} focus on?`,
      answer: department?.about || NOT_YET,
    },
    {
      question: `Which programmes does ${department?.name || "this department"} offer?`,
      answer: programs.length ? `${department?.name || "The department"} offers: ${programs.join("; ")}.` : NOT_YET,
    },
    {
      question: `Which school does ${department?.name || "this department"} belong to?`,
      answer: school?.name ? `${department?.name || "This department"} belongs to ${school.name} at St. Mary's University (SMRU), Hyderabad.` : NOT_YET,
    },
    {
      question: `Is there an entrance exam for ${department?.name || "this department"}?`,
      answer: "No university entrance exam is currently announced; admission is through the online application and admissions counselling. Any future test will be published only through an official university notice.",
    },
    {
      question: `Are ${department?.name || "this department"} programmes at St. Mary's University recognised?`,
      answer: "St. Mary's University is recognised by the UGC under Section 2(f) of the UGC Act, 1956. Where a professional council approval applies to a programme, it is published on the Approvals & Recognitions page.",
    },
    ...buildDepartmentComparisonFaqs(school, department),
  ]);
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
  const healthAlliedSeo = getHealthAlliedCourseSeoProfile({
    schoolSlug: school?.slug,
    departmentSlug: department?.slug,
    programSlug: program?.slug,
  });
  const programName = cleanProgramName(program?.name || "this program");
  const practicalAnswer =
    textValue(program?.labs) ||
    textValue(program?.fieldExposure) ||
    healthAlliedSeo?.experience ||
    `The practical, clinical, internship or project components of ${programName} follow the approved curriculum; the current structure is ${ASK_ADMISSIONS}`;
  const careerAnswer =
    Array.isArray(program?.careerOpportunities) && program.careerOpportunities.length
      ? `Listed pathways include ${program.careerOpportunities.filter(Boolean).join("; ")}. Professional requirements and current opportunities should be confirmed before application.`
      : textValue(program?.outcomes) ||
        `Graduates of ${programName} typically progress into practice roles in the discipline or into postgraduate study; the professional-registration requirements for a given role are set by the relevant council.`;
  const curriculumAnswer =
    curriculumSummary(program?.curriculum) ||
    textValue(program?.overview) ||
    `The semester-wise curriculum for ${programName} is ${ASK_ADMISSIONS}`;
  const locationAnswer = program?.campus
    ? textValue(program.campus)
    : `${programName} is listed under ${department?.name || "the academic department"} at ${UNIVERSITY_INFO.city}, ${UNIVERSITY_INFO.state}. Confirm the current teaching or clinical location with admissions.`;
  return [
    {
      question: `What is ${programName}?`,
      answer: program?.overview || healthAlliedSeo?.directAnswer || `${programName} is offered by ${school?.name || "St. Mary's University"} at St. Mary's University (SMRU), Hyderabad. The full programme outline is ${ASK_ADMISSIONS}`,
    },
    {
      question: "Who can apply to this program?",
      answer: program?.eligibility || `The current eligibility for ${programName} is ${ASK_ADMISSIONS}`,
    },
    {
      question: "What is the duration of this program?",
      answer: program?.duration || `The duration of ${programName} is ${ASK_ADMISSIONS}`,
    },
    {
      question: "How do I apply for this program?",
      answer: `Apply online at apply.smru.edu.in, then complete admissions counselling to confirm eligibility and your seat. No entrance exam is currently announced; any future test is published only through an official university notice.`,
    },
    {
      question: "Which related courses should I compare?",
      answer: recommendations.length
        ? `Recommended related course pages include ${recommendations.map((item) => item.label).join("; ")}. Compare eligibility, duration, practical exposure, admission route, and official fee guidance before applying.`
        : "Use the parent department and school links to compare related programmes, eligibility, duration, and admissions guidance.",
    },
    {
      question: "What are the fees for this program?",
      answer: `The current annual fee, hostel and other charges for ${programName} are ${ASK_ADMISSIONS} Pay only against the official fee schedule you receive there.`,
    },
    {
      question: "Are scholarships available for this program?",
      answer: "Scholarship eligibility and the current terms are assessed during admissions counselling, alongside the fee.",
    },
    {
      question: "What does the curriculum cover?",
      answer: curriculumAnswer,
    },
    {
      question: "What practical experience is included?",
      answer: practicalAnswer,
    },
    {
      question: "What career pathways can this program support?",
      answer: careerAnswer,
    },
    {
      question: "Where is this program offered?",
      answer: locationAnswer,
    },
    {
      question: "What recognition or approval applies to this program?",
      answer: "University-level recognition is published on the official approvals page. Programme-level permissions, where required, must be verified through current university notifications or relevant statutory documents.",
    },
  ];
};

export const buildProgramFaqs = (school: any, department: any, program: any) => {
  const recommendations = buildProgramRecommendationLinks(school, department, program, 5);
  return withoutNotYet(buildProgramFaqEntries(school, department, program, recommendations));
};

const buildProgramFaqEntries = (school: any, department: any, program: any, recommendations: ReturnType<typeof buildProgramRecommendationLinks>) => {
  const healthAlliedFaqs = buildHealthAlliedCourseFaqs({
    schoolSlug: school?.slug,
    departmentSlug: department?.slug,
    programSlug: program?.slug,
    programName: cleanProgramName(program?.name || "this program", { trailingOnly: true }),
  });
  return [
    {
      question: `What is ${cleanProgramName(program?.name || "this program")}?`,
      answer: program?.overview || NOT_YET,
    },
    {
      question: `Who is eligible for ${cleanProgramName(program?.name || "this program")}?`,
      answer: program?.eligibility || NOT_YET,
    },
    {
      question: `How long is ${cleanProgramName(program?.name || "this program")}?`,
      answer: program?.duration || NOT_YET,
    },
    {
      question: `Which programmes should I compare with ${cleanProgramName(program?.name || "this program")}?`,
      answer: recommendations.length
        ? `Related options at SMRU include ${recommendations.map((item) => item.label).join("; ")} — compare eligibility, duration and clinical or practical exposure before choosing.`
        : NOT_YET,
    },
    {
      question: `Is ${cleanProgramName(program?.name || "this program")} at St. Mary's University recognised?`,
      answer: "St. Mary's University is recognised by the UGC under Section 2(f) of the UGC Act, 1956. Where a professional council approval applies to this programme, it is published on the Approvals & Recognitions page.",
    },
    {
      question: `Is there an entrance exam for ${cleanProgramName(program?.name || "this program")}?`,
      answer: "No university entrance exam is currently announced; admission is through the online application and admissions counselling. Any future test will be published only through an official university notice.",
    },
    {
      question: `What does ${cleanProgramName(program?.name || "this program")} cost, and are scholarships available?`,
      answer: `The current fee and any scholarship terms are ${ASK_ADMISSIONS}`,
    },
    {
      question: `What curriculum and practical training does ${cleanProgramName(program?.name || "this program")} include?`,
      answer:
        curriculumSummary(program?.curriculum) ||
        textValue(program?.labs) ||
        textValue(program?.fieldExposure) ||
        NOT_YET,
    },
    {
      question: `What career pathways can ${cleanProgramName(program?.name || "this program")} support?`,
      answer:
        Array.isArray(program?.careerOpportunities) && program.careerOpportunities.length
          ? `Graduates typically work as ${program.careerOpportunities.filter(Boolean).join("; ")}. Professional registration for a given role is granted by the relevant council.`
          : textValue(program?.outcomes) || NOT_YET,
    },
    ...healthAlliedFaqs,
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
