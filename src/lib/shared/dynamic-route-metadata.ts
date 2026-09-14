import type { Metadata } from "next";
import { schools } from "@/data/schools";
import { buildMetadata, pickTitleCandidate } from "@/lib/metadata";
import {
  getDepartmentSearchTerms,
  getProgramSearchSubject,
  getProgramSearchTerms,
  getSchoolSearchTerms,
} from "@/lib/seo/search-intent";
import { getHealthAlliedCourseSeoProfile } from "@/lib/seo/health-allied-course-seo";
import { findBySlugOrName } from "@/lib/shared/program-utils";

const trimText = (value: string, maxLength = 155) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return normalized.slice(0, maxLength).replace(/\s+\S*$/, "").replace(/[,;:\-|\s]+$/, "");
};

// Long school names are abbreviated so "{School} – Courses & Fees" fits the 41-char primary budget.
const SCHOOL_TITLE_NAMES: Record<string, string> = {
  "health-allied-health-sciences": "Allied Health Sciences",
  "engineering-emerging-technologies": "Engineering & Emerging Tech",
  "rehabilitation-sciences": "Rehabilitation Sciences",
  "nursing-sciences": "Nursing",
  psychology: "Psychology",
  law: "Law",
};

const buildProgramSummary = (program?: { duration?: string; eligibility?: string; overview?: string }) => {
  const parts = [
    program?.duration ? `Duration: ${program.duration}` : "",
    program?.eligibility ? `Eligibility: ${program.eligibility}` : "",
    "Fee status: confirm through official counselling",
  ].filter(Boolean);

  return parts.join(" | ");
};

export const getSchoolMetadata = (params: { schoolSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const schoolName = school?.name || "Academic School";
  
  // Formula: "School of {X} – Courses & Fees" (abbreviated / shortened until it fits 41 chars).
  const shortName = SCHOOL_TITLE_NAMES[params.schoolSlug] || school?.short || schoolName.replace(/^School of /, "");
  const title = pickTitleCandidate([
    `School of ${shortName} – Courses & Fees`,
    `${shortName} – Courses & Fees`,
    `${shortName} Courses & Fees`,
    `${shortName} Courses`,
  ]);
  const description = trimText(
    school?.about
      ? `Explore admissions 2026, courses, eligibility, and official application updates for ${schoolName}. ${school.about}`
      : `Explore admissions 2026, courses, eligibility, and official application updates for ${schoolName} at St. Mary's University.`
  );

  const isLaw = params.schoolSlug === "law";
  const customKeywords = isLaw 
    ? ["Integrated LLB Hyderabad", "Law College Telangana", "5 Year LLB Admissions", "B.A. LL.B. Hons"]
    : [];

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}`,
    keywords: [
      schoolName,
      `${schoolName} admissions 2026`,
      "admissions updates",
      "Hyderabad University",
      "College Telangana",
      "St. Mary's University",
      ...customKeywords,
      ...getSchoolSearchTerms({ slug: params.schoolSlug, name: schoolName }),
    ],
  });
};

export const getDepartmentMetadata = (params: { schoolSlug: string; deptSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const dept = findBySlugOrName(school?.departments as Array<{ slug?: string; name?: string; about?: string }> | undefined, params.deptSlug);
  
  const deptName = dept?.name || "Department";
  const schoolName = school?.name || "St. Mary's University";
  
  // Formula: "{Department} – Courses & Admissions 2026", shortened until it fits 41 chars.
  const title = pickTitleCandidate([
    `${deptName} – Courses & Admissions 2026`,
    `${deptName} Courses & Admissions`,
    `${deptName} Courses 2026`,
    `${deptName} Courses`,
    deptName,
  ]);
  const description = trimText(
    dept?.about
      ? `${dept.about} Check admissions 2026, eligibility, and official application updates.`
      : `Detailed curriculum and admissions 2026 information for ${deptName} under ${schoolName}.`
  );

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}/${params.deptSlug}`,
    keywords: [
      deptName,
      `${deptName} admissions 2026`,
      schoolName,
      "admissions updates",
      "Hyderabad",
      "St. Mary's University",
      ...getDepartmentSearchTerms(
        { slug: params.schoolSlug, name: schoolName },
        { slug: params.deptSlug, name: deptName }
      ),
    ],
  });
};

export const getProgramMetadata = (params: { schoolSlug: string; deptSlug: string; programSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const dept = findBySlugOrName(
    school?.departments as Array<{
      slug?: string;
      name?: string;
      programs?: Array<{
        slug?: string;
        name?: string;
        overview?: string;
        level?: string;
        duration?: string;
        eligibility?: string;
      }>;
    }> | undefined,
    params.deptSlug
  );
  const program = findBySlugOrName(dept?.programs, params.programSlug);

  const programName = program?.name || "Program";
  const deptName = dept?.name || "Department";
  const schoolName = school?.name || "St. Mary's University";
  const healthAlliedSeo = getHealthAlliedCourseSeoProfile({
    schoolSlug: params.schoolSlug,
    departmentSlug: params.deptSlug,
    programSlug: params.programSlug,
  });
  const subject = getProgramSearchSubject(
    { slug: params.programSlug, name: programName, level: program?.level },
    { slug: params.deptSlug, name: deptName }
  );
  const programSummary = buildProgramSummary(program);
  
  // Formula: "{Course} in Hyderabad: Fees, Eligibility 2026" — drop "in Hyderabad" before dropping "Fees".
  const title = pickTitleCandidate([
    `${programName} in Hyderabad: Fees, Eligibility 2026`,
    `${programName}: Fees, Eligibility 2026`,
    `${programName}: Fees & Eligibility`,
    `${programName} Fees 2026`,
    `${programName} Course`,
    programName,
  ]);
  const description = trimText(
    healthAlliedSeo
      ? `${healthAlliedSeo.metaDescription} ${programSummary ? `${programSummary}. ` : ""}Latest intake, approvals, placement, salary, and council recognition must be verified with the university.`
      : program?.overview
      ? `${programName} admissions 2026 at St. Mary's University Hyderabad: eligibility, duration, fee guidance, syllabus, career pathways, and recommended related courses. ${programSummary ? `${programSummary}. ` : ""}${program.overview}`
      : `${programName} at St. Mary's University Hyderabad: admissions 2026, eligibility, duration, fee guidance, syllabus, career outcomes, and recommended related courses. ${programSummary ? `${programSummary}.` : ""}`
  );

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}/${params.deptSlug}/${params.programSlug}`,
    keywords: [
      programName,
      `${programName} course`,
      `${programName} course details`,
      `${programName} eligibility`,
      `${programName} fees`,
      `${programName} fee structure`,
      `${programName} syllabus`,
      `${programName} duration`,
      `${programName} career opportunities`,
      `${programName} admissions 2026`,
      `${programName} recommended courses`,
      `${subject} course in Hyderabad`,
      `${subject} admissions 2026`,
      `${subject} eligibility and fees`,
      deptName,
      schoolName,
      "admissions updates",
      "Hyderabad Admissions",
      "University Fees",
      "Eligibility",
      "Duration",
      "St. Mary's University",
      ...getProgramSearchTerms(
        { slug: params.schoolSlug, name: schoolName },
        { slug: params.deptSlug, name: deptName },
        { slug: params.programSlug, name: programName, level: program?.level }
      ),
    ],
  });
};
