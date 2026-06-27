import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { LinkGridSection } from "@/components/seo/PageSections";
import { schools } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import { TRUST_LINKS } from "@/lib/seo/info-pages";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schema";
import { SHOW_PUBLIC_INFO_PAGE_LINKS } from "@/lib/seo/visibility";
import { safeSlug } from "@/lib/shared/program-utils";

export const metadata: Metadata = buildMetadata({
  title: "Departments",
  description: "Browse the public department directory for Stmarys University schools and academic pathways.",
  pathname: "/departments",
  keywords: ["departments", "academic departments", "Stmarys University departments", "Stmarys University departments"],
});

export default function Page() {
  const departmentLinks = schools
    .flatMap((school) =>
      (school.departments || []).map((department) => ({
        href: `/schools/${safeSlug(school.slug, school.name)}/${safeSlug(department.slug, department.name)}`,
        label: department.name,
        description: department.about || `${school.name} department page.`,
      }))
    )
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <StructuredData
        id="departments-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Departments", path: "/departments" },
        ])}
      />
      <StructuredData
        id="departments-page-schema"
        data={buildCollectionPageSchema({
          title: "Departments",
          description: "Browse the public department directory for Stmarys University schools and academic pathways.",
          pathname: "/departments",
        })}
      />
      <main className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#fbfdff_100%)] pt-[120px] lg:pt-[136px] pb-16">
        <section className="px-4">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#dce7f3] bg-white px-6 py-12 shadow-[0_24px_44px_rgba(13,49,92,0.08)] md:px-12">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
              <a href="/" className="transition-colors hover:text-[#019e6e]">Home</a>
              <span>/</span>
              <span className="text-[#0d315c]">Departments</span>
            </nav>
            <div className="max-w-4xl">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">Academic Directory</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-6xl">Departments</h1>
              <div className="mt-5 h-1.5 w-20 rounded-full bg-[#ffaf3a]" />
              <p className="mt-6 text-base font-medium leading-8 text-slate-600 md:text-lg">
                Browse department pages across the university and continue to the relevant school, program, and admissions routes.
              </p>
            </div>
          </div>
        </section>
        <section className="px-4 pt-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <LinkGridSection title="Department Directory" items={departmentLinks} />
            {SHOW_PUBLIC_INFO_PAGE_LINKS && (
              <LinkGridSection
                title="Admissions & Public Information"
                items={[
                  { href: "/schools", label: "Schools", description: "Explore all academic schools and their program pathways." },
                  { href: "/admissions", label: "Admissions", description: "Official admissions route for UG, PG, diploma, and doctoral pathways." },
                  { href: "/contact", label: "Contact", description: "Campus, admissions, and public support contact details." },
                  ...TRUST_LINKS.slice(0, 3),
                ]}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
