import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildItemListSchema } from "@/lib/seo/schema";
import { buildCourseItemListSchema, getDepartmentCourseListItems } from "@/lib/seo/course-list";
import { buildDepartmentBreadcrumbs, buildDepartmentFaqs, resolveDepartment } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import Department from "@/views/Department";
import { getDepartmentMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";

export async function generateMetadata(props: { params: Promise<{ schoolSlug: string; deptSlug: string }> }): Promise<Metadata> {
  const params = await props.params;
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

export default async function Page(props: { params: Promise<{ schoolSlug: string; deptSlug: string }> }) {
  const params = await props.params;
  const { school, department } = resolveDepartment(params.schoolSlug, params.deptSlug);
  const pathname = `/schools/${params.schoolSlug}/${params.deptSlug}`;
  const courseListItems = school && department ? getDepartmentCourseListItems(school, department) : [];

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
          description: department?.about || "Explore department programs at St. Mary's University.",
          pathname,
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
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-course-item-list-schema`}
        data={school && department ? buildCourseItemListSchema(courseListItems) : null}
      />
      <Department />
    </>
  );
}
