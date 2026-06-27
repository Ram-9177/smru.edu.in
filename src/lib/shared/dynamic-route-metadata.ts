import type { Metadata } from "next";
import { schools } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import {
  getDepartmentSearchTerms,
  getProgramSearchTerms,
  getSchoolSearchTerms,
} from "@/lib/seo/search-intent";
import { findBySlugOrName } from "@/lib/shared/program-utils";

const trimText = (value: string, maxLength = 160) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const clipped = normalized.slice(0, maxLength - 3).replace(/\s+\S*$/, "");
  return `${clipped}...`;
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
  
  // Authority Pattern: [School Name] Admissions 2026 | Stmarys University Hyderabad
  const title = `${schoolName} Admissions 2026 | Stmarys University`;
  const description = trimText(
    school?.about
      ? `Explore admissions 2026, courses, eligibility, and official application updates for ${schoolName}. ${school.about}`
      : `Explore admissions 2026, courses, eligibility, and official application updates for ${schoolName} at Stmarys University.`
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
      "Stmarys University",
      ...customKeywords,
      ...getSchoolSearchTerms({ slug: params.schoolSlug, name: schoolName }),
    ],
  });
};

export const getDepartmentMetadata = (params: { schoolSlug: string; deptSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const dept = findBySlugOrName(school?.departments as Array<{ slug?: string; name?: string; about?: string }> | undefined, params.deptSlug);
  
  const deptName = dept?.name || "Department";
  const schoolName = school?.name || "Stmarys University";
  
  // Authority Pattern: [Department] Admissions | [School] | Stmarys University Hyderabad
  const title = `${deptName} Admissions 2026 | ${schoolName} | Stmarys University Hyderabad`;
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
      "Stmarys University",
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
  const programSummary = buildProgramSummary(program);
  
  // Authority Pattern: [Program Name] Admissions 2026 | Stmarys University
  const title = `${programName} Admissions 2026 | Stmarys University Hyderabad`;
  const description = trimText(
    program?.overview
      ? `${programName} admissions 2026: check eligibility, duration, course details, and official application updates. ${program.overview} ${programSummary ? `${programSummary}.` : ""}`
      : `Explore ${programName} at Stmarys University. ${programSummary ? `${programSummary}. ` : ""}Get details on admissions 2026, eligibility, syllabus, and career outcomes.`
  );

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}/${params.deptSlug}/${params.programSlug}`,
    keywords: [
      programName,
      `${programName} course`,
      `${programName} eligibility`,
      `${programName} admissions 2026`,
      deptName,
      "admissions updates",
      "Hyderabad Admissions",
      "University Fees",
      "Eligibility",
      "Duration",
      "Stmarys University",
      ...getProgramSearchTerms(
        { slug: params.schoolSlug, name: school?.name },
        { slug: params.deptSlug, name: deptName },
        { slug: params.programSlug, name: programName, level: program?.level }
      ),
    ],
  });
};
