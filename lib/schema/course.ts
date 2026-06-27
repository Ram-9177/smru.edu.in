import type { OfficialCourseSeo } from "../../data/course-seo";
import { absoluteSeoUrl } from "./webpage";

export const buildCourseSchema = (course: OfficialCourseSeo) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${absoluteSeoUrl(course.officialPath || "/schools")}#course-${course.slug}`,
  name: course.canonicalName,
  alternateName: course.aliases,
  url: absoluteSeoUrl(course.officialPath || "/schools"),
  provider: { "@id": "https://smru.edu.in/#organization" },
});
