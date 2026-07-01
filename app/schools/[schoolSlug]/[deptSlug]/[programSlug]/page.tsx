import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCourseSchema, buildFaqSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { buildProgramBreadcrumbs, buildProgramFaqs, buildProgramRecommendationLinks, resolveProgram } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import Program from "@/views/Program";
import { getProgramMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";
import { getProgramSearchTerms } from "@/lib/seo/search-intent";

import { notFound, redirect } from "next/navigation";

const hasVelocesPartner = (program: any = {}) => {
  const codes = Array.isArray(program.partnerCodes)
    ? program.partnerCodes
    : String(program.partnerCode || "").split(/[;,]/);

  return codes.some((code) => String(code || "").trim().toUpperCase() === "VELOCES");
};

export function generateMetadata({ params }: { params: { schoolSlug: string; deptSlug: string; programSlug: string } }): Metadata {
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

export default function Page({
  params,
}: {
  params: { schoolSlug: string; deptSlug: string; programSlug: string };
}) {
  const { school, department, program } = resolveProgram(params.schoolSlug, params.deptSlug, params.programSlug);
  
  if (!school || !department || !program) {
    notFound();
  }

  if (hasVelocesPartner(program)) {
    redirect("/partner/veloces");
  }

  const pathname = `/schools/${params.schoolSlug}/${params.deptSlug}/${params.programSlug}`;
  const programName = program?.name || "Program";
  const searchTerms = getProgramSearchTerms(
    { slug: params.schoolSlug, name: school.name },
    { slug: params.deptSlug, name: department.name },
    { slug: params.programSlug, name: programName, level: program.level }
  );
  const recommendations = buildProgramRecommendationLinks(school, department, program, 8);
  const description = program?.overview
    ? `${program.overview} Check admissions 2026, eligibility, duration, fee guidance, syllabus, career pathways, and recommended related courses.`
    : `${programName} programme details at Stmarys University Hyderabad with admissions 2026, eligibility, duration, fee guidance, syllabus, career pathways, and recommended related courses.`;

  return (
    <>
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-breadcrumb-schema`}
        data={school && department && program ? buildBreadcrumbSchema(buildProgramBreadcrumbs(school, department, program)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-page-schema`}
        data={buildWebPageSchema({
          title: `${programName} Admissions 2026`,
          description,
          pathname,
          keywords: searchTerms,
        })}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-course-schema`}
        data={
          program
            ? buildCourseSchema({
                name: programName,
                description,
                pathname,
                schoolName: school?.name,
                level: program?.level,
                duration: program?.duration,
                eligibility: program?.eligibility,
                keywords: searchTerms,
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
