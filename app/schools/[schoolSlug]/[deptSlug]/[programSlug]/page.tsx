import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCourseSchema, buildFaqSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { buildProgramBreadcrumbs, buildProgramFaqs, buildProgramRecommendationLinks, resolveProgram } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import Program from "@/views/Program";
import { getProgramMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { getProgrammeFee } from "@/data/programme-fees";
import { safeSlug } from "@/lib/shared/program-utils";
import { getProgrammeAnswerFirst } from "@/lib/seo/programme-answer";
import { getProgrammeCredential, getProgrammeDisplayName, getProgrammeShortName } from "@/lib/shared/programme-names";

import { notFound } from "next/navigation";

export async function generateMetadata(
  props: { params: Promise<{ schoolSlug: string; deptSlug: string; programSlug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  return getProgramMetadata(params);
}

export function generateStaticParams() {
  return (schools || []).flatMap((school) =>
    (school.departments || []).flatMap((department) =>
      (department.programs || []).map((program) => ({
        schoolSlug: safeSlug(school.slug, school.name),
        deptSlug: safeSlug(department.slug, department.name),
        programSlug: safeSlug(program.slug, program.name),
      }))
    )
  );
}

export default async function Page(
  props: {
    params: Promise<{ schoolSlug: string; deptSlug: string; programSlug: string }>;
  }
) {
  const params = await props.params;
  const { school, department, program } = resolveProgram(params.schoolSlug, params.deptSlug, params.programSlug);

  if (!school || !department || !program) {
    notFound();
  }

  const pathname = `/schools/${params.schoolSlug}/${params.deptSlug}/${params.programSlug}`;
  const programName = getProgrammeDisplayName(program) || "Program";
  const shortName = getProgrammeShortName(program);
  const recommendations = buildProgramRecommendationLinks(school, department, program, 8);
  // The schema describes the programme with the same answer-first paragraph the page opens with —
  // substance, not a "check admissions, eligibility, syllabus…" keyword list.
  const description = getProgrammeAnswerFirst({
    school,
    department,
    program,
    schoolSlug: params.schoolSlug,
    departmentSlug: params.deptSlug,
    programSlug: params.programSlug,
  });
  const metadata = getProgramMetadata(params);
  const pageTitle = typeof metadata.title === "string" ? metadata.title : `${programName} Admissions 2026`;
  const pageDescription = typeof metadata.description === "string" ? metadata.description : description;

  return (
    <>
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-breadcrumb-schema`}
        data={school && department && program ? buildBreadcrumbSchema(buildProgramBreadcrumbs(school, department, program)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-page-schema`}
        data={buildWebPageSchema({
          title: pageTitle,
          description: pageDescription,
          pathname,
        })}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-course-schema`}
        data={
          program
            ? buildCourseSchema({
                name: programName,
                alternateName: shortName && shortName !== programName ? shortName : undefined,
                description,
                pathname,
                schoolName: school?.name,
                level: program?.level,
                duration: program?.duration,
                eligibility: program?.eligibility,
                identifier: program?.courseCode,
                fee: getProgrammeFee(pathname),
                credentialAwarded: getProgrammeCredential(program),
              })
            : null
        }
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-recommended-course-item-list-schema`}
        data={
          recommendations.length
            ? buildItemListSchema(recommendations.map((item) => ({ name: item.label, url: item.href })))
            : null
        }
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-faq-schema`}
        data={
          school && department && program && SHOW_PUBLIC_FAQ_SCHEMA
            ? buildFaqSchema(buildProgramFaqs(school, department, program))
            : null
        }
      />
      <Program />
    </>
  );
}
