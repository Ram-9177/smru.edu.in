"use client";
import React, { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { schools as staticSchools } from "../data/schools";
import useOpenApply from "../hooks/useOpenApply";
import SchoolLayout from "../components/SchoolLayout";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms, syncAcademicSchoolsWithCms } from "@/lib/developer/academic-data";
import {
  detectProgramCategory,
  findBySlugOrName,
  safeSlug,
} from "@/lib/shared/program-utils";
import { AnswerGridSection, FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { TRUST_LINKS } from "@/lib/seo/info-pages";
import { ENTRANCE_EXAM_LINK, buildSchoolAnswers, buildSchoolDepartmentLinks, buildSchoolFaqs } from "@/lib/seo/academic";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const GROUPS = [
  { key: "ug",             label: "Undergraduate Programs" },
  { key: "pg",             label: "Postgraduate Programs" },
  { key: "diploma",        label: "Diploma / Certificate" },
  { key: "phd",            label: "Ph.D. / M.Phil." },
  { key: "integrated_phd", label: "M.Tech. + Ph.D." },
];

const sortByName = (a, b) => (a.name || "").localeCompare(b.name || "");

export default function School() {
  const params = useParams();
  const schoolSlug = params.schoolSlug as string;
  const { state } = useDeveloperCms({ useOverlay: true });
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = useMemo(() => syncAcademicSchoolsWithCms(staticSchools, cmsSchools), [cmsSchools]);
  const school = findBySlugOrName(schoolSource, schoolSlug) as any;
  const openApply = useOpenApply();



  const groupedPrograms = useMemo(() => {
    if (!school) return { ug: [], pg: [], diploma: [], phd: [], integrated_phd: [] };
    const catalog = { ug: [], pg: [], diploma: [], phd: [], integrated_phd: [] };
    const schoolSlugSafe = safeSlug(school.slug, school.name);

    (school.departments || []).forEach((dept) => {
      const deptSlug = safeSlug(dept.slug, dept.name);
      (dept.programs || []).forEach((prog) => {
        if (!prog?.name) return;
        const cat = detectProgramCategory(prog, { includeIntegratedPhd: true });
        catalog[cat].push({
          name: prog.name,
          dept: dept.name,
          path: `/schools/${schoolSlugSafe}/${deptSlug}/${safeSlug(prog.slug, prog.name)}`,
        });
      });
    });
    Object.keys(catalog).forEach((key) => catalog[key].sort(sortByName));
    return catalog;
  }, [school]);

  const schoolQuickAnswers = useMemo(() => buildSchoolAnswers(school), [school]);
  const schoolFaqs = useMemo(() => buildSchoolFaqs(school), [school]);
  const schoolQuickLinks = useMemo(
    () => [
      ...buildSchoolDepartmentLinks(school),
      { href: "/admissions", label: "Admissions", description: "Official admissions routes for school and program applications." },
      ENTRANCE_EXAM_LINK,
      { href: "/contact", label: "Contact", description: "Campus, admissions, and support contact details." },
      TRUST_LINKS[0],
    ].filter(Boolean),
    [school]
  );

  if (!school) notFound();

  const schoolBreadcrumbs = [{ name: school.short || school.name, path: `/schools/${school.slug}` }];

  return (
    <SchoolLayout
      activeSchoolSlug={school.slug}
      title={school.name}
      subtitle={school.overview || "Empowering students with industry-relevant skills and academic excellence."}
      breadcrumbs={schoolBreadcrumbs.map(b => ({ label: b.name, path: b.path }))}
      sectionLabel={school.name.toUpperCase()}
      heading="Programs by Level"
      onApply={openApply}
    >
      <div className="space-y-16">
        {/* ================= PROGRAMS SECTION ================= */}
        <section id="programs" className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-[#0d315c] uppercase tracking-tight">Academic Programs</h2>
            <div className="h-0.5 flex-grow bg-slate-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {GROUPS.map((g) => {
              const list = groupedPrograms[g.key];
              if (!list?.length) return null;
              return (
                <div key={g.key}>
                  <div className="mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">
                      {g.label}
                    </h3>
                    <div className="h-0.5 w-12 bg-[#ffaf3a] cut-corner-badge" />
                  </div>
                  <div className="space-y-6">
                    {list.map((p, i) => (
                      <Link
                        key={i}
                        href={p.path}
                        className="group block transition-all"
                      >
                        <h4 className="text-[14px] font-black text-[#1f2933] group-hover:text-[#25b895] leading-tight mb-1">
                          {p.name}
                        </h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {p.dept}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= DEPARTMENTS SECTION ================= */}
        {school.departments && school.departments.length > 0 && (
          <section id="departments" className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-[#0d315c] uppercase tracking-tight">Departments</h2>
              <div className="h-0.5 flex-grow bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {school.departments.map((dept, i) => (
                <Link
                  key={i}
                  href={`/schools/${safeSlug(school.slug, school.name)}/${safeSlug(dept.slug, dept.name)}`}
                  className="group p-6 cut-corner-card border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#25b895] hover:shadow-xl transition-all"
                >
                  <h4 className="text-sm font-black text-[#0d315c] group-hover:text-[#25b895] mb-2 leading-tight">
                    {dept.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                    {dept.about || "Explore programs and research in this department."}
                  </p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#25b895]">
                    View Programs →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= VISION & MISSION SECTION ================= */}
        {(school.vision || school.mission) && (
          <section id="vision-mission" className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-[#0d315c] uppercase tracking-tight">Vision & Mission</h2>
              <div className="h-0.5 flex-grow bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {school.vision && (
                <article className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#019e6e] mb-2">
                      Our Vision
                    </h3>
                    <div className="h-0.5 w-12 bg-[#019e6e] cut-corner-badge" />
                  </div>
                  <ul className="space-y-4">
                    {school.vision.map((v, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ffaf3a] flex-shrink-0" />
                        <p className="text-sm text-[#0d315c]/80 font-medium leading-relaxed">{v}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
              {school.mission && (
                <article className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0d315c] mb-2">
                      Our Mission
                    </h3>
                    <div className="h-0.5 w-12 bg-[#0d315c] cut-corner-badge" />
                  </div>
                  <ul className="space-y-4">
                    {school.mission.map((m, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#25b895] flex-shrink-0" />
                        <p className="text-sm text-[#0d315c]/80 font-medium leading-relaxed">{m}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          </section>
        )}

        {/* ================= FACILITIES SECTION ================= */}
        {school.facilities && school.facilities.length > 0 && (
          <section id="facilities" className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-[#0d315c] uppercase tracking-tight">Facilities</h2>
              <div className="h-0.5 flex-grow bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {school.facilities.map((f, i) => (
                <article
                  key={i}
                  className="p-8 cut-corner-card border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 cut-corner-badge bg-[#f5f9ff] flex items-center justify-center text-[#019e6e] mb-6">
                    <span className="font-black text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="text-base font-black text-[#0d315c] mb-3 leading-tight">
                    {f.name}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {f.desc}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {SHOW_PUBLIC_SEO_SECTIONS && (
          <>
            <AnswerGridSection title="Quick Answers" items={schoolQuickAnswers} />
            <LinkGridSection title="Departments & Admissions" items={schoolQuickLinks} />
            <FaqSection title="Frequently Asked Questions" items={schoolFaqs} />
          </>
        )}
      </div>
    </SchoolLayout>
  );
}
