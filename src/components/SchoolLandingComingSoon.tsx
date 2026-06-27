import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowRight,
  FaBookOpen,
  FaBuilding,
  FaCheckCircle,
  FaClipboardList,
  FaGraduationCap,
  FaLayerGroup,
  FaPaperPlane,
  FaUniversity,
} from "react-icons/fa";
import SchoolLandingSectionNav from "@/components/SchoolLandingSectionNav";
import StructuredData from "@/components/seo/StructuredData";
import { getEduPartner } from "@/data/schools";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { detectProgramCategory, safeSlug } from "@/lib/shared/program-utils";
import { getSchoolLandingConfig } from "@/lib/shared/school-landing";

const GROUP_LABELS: Record<string, string> = {
  ug: "Undergraduate Programmes",
  pg: "Postgraduate Programmes",
  diploma: "Diploma / Certificate",
  phd: "Doctoral Programmes",
  integrated_phd: "Integrated Doctoral Pathways",
};

const GROUP_ORDER = ["ug", "pg", "diploma", "phd", "integrated_phd"] as const;

const toText = (value: unknown, fallback = "") => {
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  if (typeof value === "string") return value.trim();
  return fallback;
};

export default function SchoolLandingComingSoon({ schoolSlug }: { schoolSlug: string }) {
  const config = getSchoolLandingConfig(schoolSlug);
  if (!config) notFound();

  const school = config.school;
  const departments = school.departments || [];
  const schoolPath = `/schools/${config.slug}`;
  const programmes = departments.flatMap((dept) => {
    const deptSlug = safeSlug(dept.slug, dept.name);
    return (dept.programs || [])
      .filter((program) => program?.name)
      .map((program) => {
        const programSlug = safeSlug(program.slug, program.name);
        return {
          ...program,
          deptName: dept.name,
          deptPath: `${schoolPath}/${deptSlug}`,
          path: `${schoolPath}/${deptSlug}/${programSlug}`,
          group: detectProgramCategory(program, { includeIntegratedPhd: true }) as string,
          partnerName: getEduPartner(program)?.name,
        };
      });
  });
  const groupCounts = GROUP_ORDER.filter((key) => programmes.some((program) => program.group === key)).length || 1;
  const pageDescription = `${toText(config.description, `${config.name} at Stmarys University.`)} Explore departments, courses, programmes, admissions, and academic pathways.`;

  return (
    <>
      <StructuredData
        id={`${config.slug}-landing-breadcrumb-schema`}
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: config.name, path: config.pathname },
        ])}
      />
      <StructuredData
        id={`${config.slug}-landing-page-schema`}
        data={buildWebPageSchema({
          title: config.name,
          description: pageDescription,
          pathname: config.pathname,
        })}
      />
      <StructuredData
        id={`${config.slug}-landing-programmes-schema`}
        data={buildItemListSchema(programmes.map((program) => ({ name: program.name, url: program.path })))}
      />

      <main className="min-h-screen bg-[#f5f9ff] text-[#0d315c]">
        <section className="relative overflow-hidden bg-[#0d315c] pt-[112px] md:pt-[136px]">
          <div className="absolute inset-0 z-0">
            <Image src={config.imagePath} alt={config.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,49,92,0.9)_0%,rgba(13,49,92,0.74)_46%,rgba(13,49,92,0.3)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d315c] to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-6 md:pb-20 md:pt-16 lg:pl-24 lg:pr-8">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
              <Link href="/" className="hover:text-[#ffaf3a]">Home</Link>
              <span>/</span>
              <Link href="/schools" className="hover:text-[#ffaf3a]">Schools</Link>
              <span>/</span>
              <span>{config.shortName}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
              <div className="max-w-4xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffaf3a]/35 bg-[#ffaf3a]/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffaf3a]">
                  <FaUniversity /> St. Mary&apos;s University
                </div>
                <h1 className="max-w-4xl text-4xl font-black uppercase leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-7xl">
                  {config.name}
                </h1>
                <div className="my-7 h-1.5 w-20 bg-[#ffaf3a]" />
                <p className="max-w-3xl text-base font-semibold leading-8 text-white/80 md:text-lg">
                  {toText(config.description, `${config.name} offers academic pathways at Stmarys University.`)}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="#programmes"
                    className="inline-flex items-center gap-3 bg-[#ffaf3a] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#0d315c] shadow-[0_16px_30px_rgba(255,175,58,0.22)] transition hover:bg-white"
                  >
                    <FaBookOpen /> Programmes <FaArrowRight />
                  </Link>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-3 border border-white/25 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur transition hover:bg-white hover:text-[#0d315c]"
                  >
                    <FaPaperPlane /> Admissions
                  </Link>
                </div>
              </div>

              <div className="border border-white/20 bg-white/10 p-5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffaf3a]">Academic Overview</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ["Departments", departments.length],
                    ["Programmes", programmes.length],
                    ["Levels", groupCounts],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-white/10 p-4 text-white">
                      <div className="text-2xl font-black">{value}</div>
                      <div className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-white/70">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3">
                  <Link href={config.catalogPath} className="flex items-center justify-between border border-white/15 bg-white px-4 py-3 text-sm font-black text-[#0d315c] transition hover:bg-[#ffaf3a]">
                    Academic catalogue <FaArrowRight />
                  </Link>
                  <Link href="/exam-notification" className="flex items-center justify-between border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#0d315c]">
                    Entrance notification <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SchoolLandingSectionNav
          links={[
            { label: "About", href: "#about" },
            { label: "Departments", href: "#departments" },
            { label: "Programmes", href: "#programmes" },
            { label: "Admissions", href: "#admissions" },
          ]}
        />

        <section id="about" className="scroll-mt-40 px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_0.3fr] lg:items-start lg:pl-24 lg:pr-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#019e6e]">About The School</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#0d315c] md:text-5xl">
                Academic pathways built around department-led learning.
              </h2>
              <p className="mt-6 max-w-4xl text-base font-medium leading-8 text-slate-600">
                {toText(config.description, `${config.name} brings together academic departments, published programmes, and admissions guidance for students exploring the university.`)}
              </p>
            </div>
            <div className="border-l-4 border-l-[#ffaf3a] bg-white p-6 shadow-[0_18px_44px_rgba(13,49,92,0.08)]">
              <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#0d315c]">Explore This School</h3>
              <div className="mt-5 space-y-3 text-sm font-bold text-slate-600">
                <Link
                  href={config.catalogPath}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 hover:text-[#019e6e]"
                >
                  View all catalogue pages <FaArrowRight />
                </Link>
                <Link
                  href="/admissions"
                  className="flex items-center justify-between border-b border-slate-100 pb-3 hover:text-[#019e6e]"
                >
                  Admissions 2026 <FaArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between hover:text-[#019e6e]"
                >
                  Contact counselling desk <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="departments" className="scroll-mt-40 bg-white px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl lg:pl-24 lg:pr-8">
            <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#019e6e]">Departments</p>
                <h2 className="mt-3 text-3xl font-black text-[#0d315c] md:text-5xl">Learning Units</h2>
              </div>
              <Link href={config.catalogPath} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#019e6e] hover:text-[#0d315c]">
                Full catalogue <FaArrowRight />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept, index) => (
                <Link
                  key={dept.slug || dept.name}
                  href={`${schoolPath}/${safeSlug(dept.slug, dept.name)}`}
                  className="group border border-[#dbe8f8] bg-[#f8fbff] p-6 shadow-[0_12px_28px_rgba(13,49,92,0.05)] transition hover:-translate-y-1 hover:border-[#019e6e] hover:bg-white hover:shadow-[0_22px_44px_rgba(13,49,92,0.1)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#0d315c] text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-black leading-tight text-[#0d315c] group-hover:text-[#019e6e]">{dept.name}</h3>
                  <p className="mt-3 min-h-[3.5rem] text-sm font-medium leading-7 text-slate-600">
                    {dept.about || `${dept.programs?.length || 0} published programme${dept.programs?.length === 1 ? "" : "s"} under this department.`}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#dbe8f8] pt-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#019e6e]">
                    <span>{dept.programs?.length || 0} programmes</span>
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="programmes" className="scroll-mt-40 px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl lg:pl-24 lg:pr-8">
            <div className="mb-9">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#019e6e]">Courses & Programmes</p>
              <h2 className="mt-3 text-3xl font-black text-[#0d315c] md:text-5xl">Published Academic Programmes</h2>
            </div>

            <div className="space-y-10">
              {GROUP_ORDER.map((group) => {
                const groupProgrammes = programmes.filter((program) => program.group === group);
                if (!groupProgrammes.length) return null;

                return (
                  <div key={group}>
                    <div className="mb-5 flex items-center gap-3">
                      <FaLayerGroup className="text-[#ffaf3a]" />
                      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#0d315c]">{GROUP_LABELS[group]}</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {groupProgrammes.map((program) => (
                        <Link
                          key={program.path}
                          href={program.path}
                          className="group flex min-h-[220px] flex-col border border-[#dbe8f8] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)] transition hover:-translate-y-1 hover:border-[#019e6e] hover:shadow-[0_22px_44px_rgba(13,49,92,0.1)]"
                        >
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#f5f9ff] text-[#019e6e]">
                              <FaGraduationCap />
                            </div>
                            <span className="text-right text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{program.level || GROUP_LABELS[group]}</span>
                          </div>
                          <h4 className="text-lg font-black leading-tight text-[#0d315c] group-hover:text-[#019e6e]">{program.name}</h4>
                          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{program.deptName}</p>
                          <div className="mt-4 space-y-2 text-sm font-medium leading-6 text-slate-600">
                            {program.duration && (
                              <p className="flex gap-2"><FaCheckCircle className="mt-1 flex-shrink-0 text-[#019e6e]" /> {program.duration}</p>
                            )}
                            {program.eligibility && (
                              <p className="flex gap-2"><FaClipboardList className="mt-1 flex-shrink-0 text-[#019e6e]" /> {program.eligibility}</p>
                            )}
                            {program.partnerName && (
                              <p className="flex gap-2"><FaBuilding className="mt-1 flex-shrink-0 text-[#019e6e]" /> Powered with {program.partnerName}</p>
                            )}
                          </div>
                          <div className="mt-auto pt-5 text-[10px] font-black uppercase tracking-[0.16em] text-[#019e6e]">
                            View programme <FaArrowRight className="ml-2 inline transition group-hover:translate-x-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="admissions" className="scroll-mt-40 bg-[#0d315c] px-4 py-14 text-white md:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.65fr_0.35fr] lg:items-center lg:pl-24 lg:pr-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#ffaf3a]">Admissions</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Start with the official admissions route.</h2>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/75">
                Use the admissions page and entrance notification for the current application cycle, counselling updates, and school-specific programme guidance.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                ["Academic Structure", "/academic-structure"],
                ["Admissions", "/admissions"],
                ["Contact Admissions", "/contact"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="flex items-center justify-between border border-white/15 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0d315c] transition hover:bg-[#ffaf3a]">
                  {label} <FaArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
