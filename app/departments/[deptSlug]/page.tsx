import type { Metadata } from "next";
import RedirectFallback from "@/components/seo/RedirectFallback";
import { schools } from "@/data/schools";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";
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

// One target for metadata and shell: the canonical department hub, or the schools index for an unknown slug.
const targetPathFor = (deptSlug: string) => {
  const department = findDepartment(deptSlug);
  return department ? `/schools/${department.schoolSlug}/${department.deptSlug}/` : "/schools/";
};

export function generateStaticParams() {
  return departments.map((department) => ({ deptSlug: department.deptSlug }));
}

export async function generateMetadata(props: { params: Promise<{ deptSlug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const department = findDepartment(params.deptSlug);
  return buildRedirectMetadata(`${department?.name || "Department"} | St. Mary's University`, targetPathFor(params.deptSlug));
}

export default async function Page(props: { params: Promise<{ deptSlug: string }> }) {
  const params = await props.params;
  return <RedirectFallback targetUrl={targetPathFor(params.deptSlug)} />;
}
