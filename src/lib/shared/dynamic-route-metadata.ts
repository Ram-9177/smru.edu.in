import type { Metadata } from "next";
import { schools } from "@/data/schools";
import { buildMetadata, pickTitleCandidate } from "@/lib/metadata";
import {
  getDepartmentSearchTerms,
  getProgramSearchSubject,
  getProgramSearchTerms,
  getSchoolSearchTerms,
} from "@/lib/seo/search-intent";
import { findBySlugOrName } from "@/lib/shared/program-utils";
import { getProgrammeDisplayName, getProgrammeShortName, getProgrammeTitleName } from "@/lib/shared/programme-names";

// Descriptions are capped by buildMetadata (sentence-aware, ≤ 155, always a finished thought), so the
// templates below are written short and factual rather than pre-trimmed here.
const LEVEL_WORD: Array<[RegExp, string]> = [
  [/integrated/i, "integrated undergraduate degree"],
  [/ph\.?d/i, "doctoral programme"],
  [/pg\s*diploma|post\s*graduate\s*diploma/i, "postgraduate diploma"],
  [/diploma/i, "diploma"],
  [/\bpg\b|postgraduate/i, "postgraduate degree"],
  [/\bug\b|undergraduate/i, "undergraduate degree"],
];
const levelWord = (level = "") => LEVEL_WORD.find(([pattern]) => pattern.test(level))?.[1] || "programme";
// "5 Years (10 Semesters)" → "5-year"; "3-4 Years" → "3–4-year"; "1 Year (2 Semesters)" → "1-year".
const durationWord = (duration = "") => {
  const match = duration.match(/(\d+(?:\s*[–-]\s*\d+)?)\s*years?/i);
  return match ? `${match[1].replace(/\s*[–-]\s*/, "–")}-year` : "";
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
  const description = school?.about
    ? `${schoolName} at St. Mary's University (SMRU), Hyderabad: programmes, eligibility and 2026 admissions. ${school.about}`
    : `${schoolName} at St. Mary's University (SMRU), Hyderabad: programmes, eligibility and 2026 admissions.`;

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
  const description = dept?.about
    ? `${deptName}, ${schoolName}, St. Mary's University (SMRU), Hyderabad. ${dept.about}`
    : `Programmes, eligibility and 2026 admissions for ${deptName} under ${schoolName} at St. Mary's University (SMRU), Hyderabad.`;

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

  const programName = getProgrammeShortName(program) || "Program";
  const displayName = getProgrammeDisplayName(program) || programName;
  const titleName = getProgrammeTitleName(program) || programName;
  const deptName = dept?.name || "Department";
  const schoolName = school?.name || "St. Mary's University";
  const subject = getProgramSearchSubject(
    { slug: params.programSlug, name: programName, level: program?.level },
    { slug: params.deptSlug, name: deptName }
  );

  // Formula: full degree name first ("Bachelor of Physiotherapy (BPT)"), then the local modifier and
  // the intent words, dropping from the right until the 41-char primary budget fits; the bare
  // abbreviation is the last resort, never the first choice.
  const withSuffixes = (name: string) => [
    `${name} in Hyderabad: Fees, Eligibility 2026`,
    `${name} in Hyderabad – Fees 2026`,
    `${name} in Hyderabad`,
    `${name}: Fees, Eligibility 2026`,
    `${name} Fees 2026`,
    name,
  ];
  const title = pickTitleCandidate([
    ...withSuffixes(displayName),
    ...(titleName !== displayName ? withSuffixes(titleName) : []),
    ...withSuffixes(programName),
  ]);

  const level = levelWord(program?.level);
  const years = durationWord(program?.duration);
  // Eligibility strings can be long, so they come last and are the first thing the sentence-aware cap drops.
  const description = [
    `${displayName} at St. Mary's University (SMRU), Hyderabad – ${years ? `${years} ` : ""}${level}.`,
    "Fees, 2026 admissions and career paths.",
    program?.eligibility ? `Eligibility: ${program.eligibility}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

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
