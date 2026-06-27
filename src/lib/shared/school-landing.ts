import type { Metadata } from "next";
import { schools } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import { getSchoolSearchTerms } from "@/lib/seo/search-intent";
import { findBySlugOrName, safeSlug } from "@/lib/shared/program-utils";

export const SCHOOL_LANDING_PATHS: Record<string, string> = {
  law: "/law",
  "rehabilitation-sciences": "/rehabilitation-sciences",
  "health-allied-health-sciences": "/health-allied-health-sciences",
  psychology: "/psychology",
  "nursing-sciences": "/nursing-sciences",
  "engineering-emerging-technologies": "/engineering-emerging-technologies",
};

export const COMING_SOON_SCHOOL_SLUGS = [
  "rehabilitation-sciences",
  "health-allied-health-sciences",
  "psychology",
  "nursing-sciences",
  "engineering-emerging-technologies",
] as const;

const SCHOOL_LANDING_IMAGES: Record<string, string> = {
  "rehabilitation-sciences": "/assets/school_rehabilitation_sciences_hq.webp",
  "health-allied-health-sciences": "/assets/school_health_allied_health_sciences_hq.webp",
  psychology: "/assets/school_psychology_hq.webp",
  "nursing-sciences": "/assets/school_nursing_hq.webp",
  "engineering-emerging-technologies": "/assets/school_engineering_emerging_technologies_hq.webp",
};

export const getKnownSchoolLandingPath = (schoolSlug: string) => SCHOOL_LANDING_PATHS[schoolSlug] || null;

export const getSchoolLandingPath = (schoolSlug: string) =>
  getKnownSchoolLandingPath(schoolSlug) || `/schools/${schoolSlug}`;

export const getSchoolLandingConfig = (schoolSlug: string) => {
  const school = findBySlugOrName(schools, schoolSlug);
  if (!school) return null;

  const slug = safeSlug(school.slug, school.name);
  const pathname = getSchoolLandingPath(slug);

  return {
    school,
    slug,
    pathname,
    catalogPath: `/schools/${slug}`,
    name: school.name,
    shortName: school.short || school.name,
    description:
      school.about ||
      `${school.name} at Stmarys University with admissions, departments, and programme information.`,
    imagePath: SCHOOL_LANDING_IMAGES[slug] || "/assets/hero-campus.webp",
  };
};

export const buildSchoolLandingMetadata = (schoolSlug: string): Metadata => {
  const config = getSchoolLandingConfig(schoolSlug);
  const name = config?.name || "School";
  const pathname = config?.pathname || `/${schoolSlug}`;
  const description =
    config?.description ||
    `${name} at Stmarys University with departments, programmes, admissions 2026, and academic pathway information.`;

  return buildMetadata({
    title: `${name} | Departments, Courses & Admissions 2026`,
    description: `${description} Explore departments, courses, programmes, admissions 2026, and official school information.`,
    pathname,
    keywords: [
      name,
      `${name} admissions`,
      `${name} programmes`,
      "Stmarys University schools",
      "Stmarys University",
      ...getSchoolSearchTerms({ slug: schoolSlug, name }),
    ],
  });
};
