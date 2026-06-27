import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildItemListSchema } from "@/lib/seo/schema";
import { buildCourseItemListSchema, getSchoolCourseListItems } from "@/lib/seo/course-list";
import { buildSchoolBreadcrumbs, buildSchoolFaqs, resolveSchool } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import School from "@/views/School";
import SchoolOfLaw from "@/views/SchoolOfLaw";
import { getSchoolMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";
import { getSchoolSearchTerms } from "@/lib/seo/search-intent";

export function generateMetadata({ params }: { params: { schoolSlug: string } }): Metadata {
  return getSchoolMetadata(params);
}

export function generateStaticParams() {
  return (schools || []).map((school) => ({
    schoolSlug: safeSlug(school.slug, school.name),
  }));
}

export default function Page({ params }: { params: { schoolSlug: string } }) {
  const school = resolveSchool(params.schoolSlug);
  const pathname = `/schools/${params.schoolSlug}`;
  const searchTerms = school
    ? getSchoolSearchTerms({ slug: params.schoolSlug, name: school.name })
    : [];
  const courseListItems = school ? getSchoolCourseListItems(school) : [];


  return (
    <>
      <StructuredData
        id={`${params.schoolSlug}-breadcrumb-schema`}
        data={school ? buildBreadcrumbSchema(buildSchoolBreadcrumbs(school)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-page-schema`}
        data={buildCollectionPageSchema({
          title: school?.name || "School",
          description: school?.about || "Explore school programs and departments at Stmarys University.",
          pathname,
          keywords: searchTerms,
        })}
      />
      <StructuredData
        id={`${params.schoolSlug}-faq-schema`}
        data={school && SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(buildSchoolFaqs(school)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-department-list-schema`}
        data={
          school
            ? buildItemListSchema(
                (school.departments || []).map((department: any) => ({
                  name: department.name,
                  url: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}`,
                }))
              )
            : null
        }
      />
      <StructuredData
        id={`${params.schoolSlug}-course-item-list-schema`}
        data={school ? buildCourseItemListSchema(courseListItems) : null}
      />
      <School />
    </>
  );
}
