import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Schools from "@/views/Schools";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildItemListSchema } from "@/lib/seo/schema";
import { buildCourseItemListSchema, getAllCourseListItems } from "@/lib/seo/course-list";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";

export const metadata: Metadata = buildMetadata({
  title: "Courses Offered at Stmarys University | UG, PG & Professional Programmes",
  description: "Explore the schools at Stmarys University. From nursing to engineering, discover specialized career-focused pathways for 2026.",
  pathname: "/schools",
  keywords: [
    "Stmarys University schools",
    "professional degree programs Hyderabad",
    "healthcare courses after 12th",
    "engineering courses after 12th",
    "law courses after 12th",
    "psychology courses after 12th",
    "nursing courses after 12th",
    "career focused courses Hyderabad",
  ],
});

export default function Page() {
  const courseListItems = getAllCourseListItems(schools);

  return (
    <>
      <StructuredData
        id="schools-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Schools", path: "/schools" },
        ])}
      />
      <StructuredData
        id="schools-page-schema"
        data={buildCollectionPageSchema({
          title: "Schools",
          description: "Explore schools, departments, and program categories at Stmarys University.",
          pathname: "/schools",
        })}
      />
      <StructuredData
        id="schools-item-list-schema"
        data={buildItemListSchema(
          (schools || []).map((school) => ({
            name: school.name,
            url: `/schools/${safeSlug(school.slug, school.name)}`,
          }))
        )}
      />
      <StructuredData
        id="schools-course-item-list-schema"
        data={buildCourseItemListSchema(courseListItems)}
      />
      <Schools />
    </>
  );
}
