import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildItemListSchema } from "@/lib/seo/schema";
import { buildCourseItemListSchema, getSchoolCourseListItems } from "@/lib/seo/course-list";
import { buildSchoolBreadcrumbs, buildSchoolFaqs, resolveSchool } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import dynamic from "next/dynamic";
import School from "@/views/School";

// Only the matching school's rich view is bundled into its page chunk; the other five schools
// must not pay for the Law and Nursing landings.
const LawHubPage = dynamic(() => import("@/views/LawHubPage"));
const NursingLandingClient = dynamic(() => import("@/views/NursingLandingClient"));
import { getSchoolMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";

export async function generateMetadata(props: { params: Promise<{ schoolSlug: string }> }): Promise<Metadata> {
  const params = await props.params;
  return getSchoolMetadata(params);
}

export function generateStaticParams() {
  return (schools || []).map((school) => ({
    schoolSlug: safeSlug(school.slug, school.name),
  }));
}

export default async function Page(props: { params: Promise<{ schoolSlug: string }> }) {
  const params = await props.params;
  const school = resolveSchool(params.schoolSlug);
  const pathname = `/schools/${params.schoolSlug}`;
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
          description: school?.about || "Explore school programs and departments at St. Mary's University.",
          pathname,
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
      {/* Law and Nursing keep their richer landing views at the canonical /schools/{slug}/ URL. */}
      {params.schoolSlug === "law" ? <LawHubPage /> : params.schoolSlug === "nursing-sciences" ? <NursingLandingClient /> : <School />}
    </>
  );
}
