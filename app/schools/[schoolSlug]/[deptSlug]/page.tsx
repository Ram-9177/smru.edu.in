import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildItemListSchema } from "@/lib/seo/schema";
import { buildDepartmentBreadcrumbs, buildDepartmentFaqs, resolveDepartment } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import Department from "@/views/Department";
import { getDepartmentMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";
import { getDepartmentSearchTerms } from "@/lib/seo/search-intent";

export function generateMetadata({ params }: { params: { schoolSlug: string; deptSlug: string } }): Metadata {
  return getDepartmentMetadata(params);
}

export function generateStaticParams() {
  return (schools || []).flatMap((school) =>
    (school.departments || []).map((department) => ({
      schoolSlug: safeSlug(school.slug, school.name),
      deptSlug: safeSlug(department.slug, department.name),
    }))
  );
}

export default function Page({ params }: { params: { schoolSlug: string; deptSlug: string } }) {
  const { school, department } = resolveDepartment(params.schoolSlug, params.deptSlug);
  const pathname = `/schools/${params.schoolSlug}/${params.deptSlug}`;
  const searchTerms =
    school && department
      ? getDepartmentSearchTerms(
          { slug: params.schoolSlug, name: school.name },
          { slug: params.deptSlug, name: department.name }
        )
      : [];
  return (
    <>
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-breadcrumb-schema`}
        data={school && department ? buildBreadcrumbSchema(buildDepartmentBreadcrumbs(school, department)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-page-schema`}
        data={buildCollectionPageSchema({
          title: department?.name || "Department",
          description: department?.about || "Explore department programs at Stmarys University.",
          pathname,
          keywords: searchTerms,
        })}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-faq-schema`}
        data={
          school && department && SHOW_PUBLIC_FAQ_SCHEMA
            ? buildFaqSchema(buildDepartmentFaqs(school, department))
            : null
        }
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-program-list-schema`}
        data={
          school && department
            ? buildItemListSchema(
                (department.programs || []).map((program: any) => ({
                  name: program.name,
                  url: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}/${safeSlug(program.slug, program.name)}`,
                }))
              )
            : null
        }
      />
      <Department />
    </>
  );
}
