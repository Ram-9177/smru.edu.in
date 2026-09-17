import type { Metadata } from "next";
import RedirectFallback from "@/components/seo/RedirectFallback";
import { schools } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import { safeSlug } from "@/lib/shared/program-utils";

const departments = (schools || []).flatMap((school) =>
  (school.departments || []).map((department) => ({
    schoolSlug: safeSlug(school.slug, school.name),
    deptSlug: safeSlug(department.slug, department.name),
    name: department.name,
    about: department.about,
  }))
);

const findDepartment = (deptSlug: string) => departments.find((item) => item.deptSlug === deptSlug);

export function generateStaticParams() {
  return departments.map((department) => ({ deptSlug: department.deptSlug }));
}

export async function generateMetadata(props: { params: Promise<{ deptSlug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const department = findDepartment(params.deptSlug);
  const targetPath = department ? `/schools/${department.schoolSlug}/${department.deptSlug}` : "/schools";
  return buildMetadata({
    title: `${department?.name || "Department"} | St. Mary's University`,
    description: department?.about || "Explore department programs at St. Mary's University.",
    pathname: targetPath,
    robots: "noindex,follow",
  });
}

export default async function Page(props: { params: Promise<{ deptSlug: string }> }) {
  const params = await props.params;
  const department = findDepartment(params.deptSlug);
  const target = department ? `/schools/${department.schoolSlug}/${department.deptSlug}/` : "/schools/";
  return <RedirectFallback targetUrl={target} />;
}
