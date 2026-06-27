import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

export function generateMetadata({ params }: { params: { deptSlug: string } }): Metadata {
  const department = findDepartment(params.deptSlug);
  const targetPath = department ? `/schools/${department.schoolSlug}/${department.deptSlug}` : "/schools";
  return buildMetadata({
    title: `${department?.name || "Department"} | Stmarys University`,
    description: department?.about || "Explore department programs at Stmarys University.",
    pathname: targetPath,
    robots: "noindex,follow",
  });
}

export default function Page({ params }: { params: { deptSlug: string } }) {
  const department = findDepartment(params.deptSlug);
  const target = department ? `/schools/${department.schoolSlug}/${department.deptSlug}/` : "/schools/";
  redirect(target);
}
