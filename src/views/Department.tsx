"use client";
import React, { useMemo } from "react";
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
import {
  ENTRANCE_EXAM_LINK,
  buildDepartmentAnswers,
  buildDepartmentFaqs,
  buildDepartmentProgramLinks,
  buildDepartmentSiblingLinks,
} from "@/lib/seo/academic";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const LEVEL_ORDER = { ug: 0, pg: 1, diploma: 2, phd: 3, integrated_phd: 4 };

const sortPrograms = (programs = []) =>
  [...programs].sort((a, b) => {
    const rankA = LEVEL_ORDER[detectProgramCategory(a, { includeIntegratedPhd: true })] ?? 99;
    const rankB = LEVEL_ORDER[detectProgramCategory(b, { includeIntegratedPhd: true })] ?? 99;
    if (rankA !== rankB) return rankA - rankB;
    return (a.name || "").localeCompare(b.name || "");
  });

const getDepartmentPositioning = (schoolSlug: string) => {
  const slug = (schoolSlug || "").toLowerCase();
  if (slug.includes('rehabilitation')) {
    return {
      focus: "This department connects to rehabilitation sciences, assistive care, inclusive education, clinical/practical learning, and professional therapeutic pathways.",
      matters: "It addresses the critical need for qualified professionals who can restore communication, mobility, and learning abilities for individuals with diverse challenges.",
      studentType: "Designed for empathetic, scientifically-minded students who want a hands-on clinical career dedicated to improving the quality of life for others.",
      direction: "Emphasizes clinical laboratory exposure, inclusive education methodologies, and evidence-based therapeutic practices."
    };
  }
  if (slug.includes('health')) {
    return {
      focus: "This department connects to healthcare support, diagnostics, emergency care, therapy, clinical technologies, and the broader patient-care ecosystem.",
      matters: "It forms the backbone of the modern healthcare system by ensuring accurate diagnostics, efficient therapeutic interventions, and robust patient support.",
      studentType: "Designed for detail-oriented individuals passionate about medical sciences, diagnostics, and working alongside clinical healthcare teams.",
      direction: "Prioritizes practical clinical training, laboratory diagnostics, and integration with advanced healthcare technologies."
    };
  }
  if (slug.includes('psychology')) {
    return {
      focus: "This department connects to mental health, behaviour, clinical psychology, counselling support, rehabilitation psychology, and behavioural sciences.",
      matters: "It tackles the growing global need for mental health support, cognitive rehabilitation, and psychological well-being interventions.",
      studentType: "Designed for observant, compassionate students interested in understanding human behavior, cognitive processes, and therapeutic support.",
      direction: "Blends scientific behavioral research with practical counseling, clinical observation, and therapeutic methodology."
    };
  }
  if (slug.includes('nursing')) {
    return {
      focus: "This department connects to patient care, clinical responsibility, healthcare service, ethics, and professional nursing education.",
      matters: "It provides essential frontline patient care, continuous clinical monitoring, and health advocacy within critical and general care settings.",
      studentType: "Designed for dedicated, resilient individuals who are committed to direct patient care and maintaining high clinical standards.",
      direction: "Focuses heavily on clinical rotations, patient safety protocols, healthcare ethics, and hands-on medical care."
    };
  }
  if (slug.includes('engineering') || slug.includes('technology') || slug.includes('tech')) {
    return {
      focus: "This department connects to assistive technologies, rehabilitation engineering, computer science, AI, data science, healthcare technology, and emerging tech applications.",
      matters: "It drives innovation in healthcare and general industry through computational problem-solving, advanced engineering, and data analysis.",
      studentType: "Designed for analytical problem-solvers who want to build solutions, work with emerging technologies, and engineer systems for the future.",
      direction: "Focuses on software and hardware development, advanced computing labs, and industry-aligned technological projects."
    };
  }
  if (slug.includes('law')) {
    return {
      focus: "This department connects to legal education, justice, rights, ethics, advocacy, healthcare law, disability rights, public policy, and professional legal studies.",
      matters: "It ensures the protection of rights, ethical governance, and the functioning of a just society, especially advocating for vulnerable populations.",
      studentType: "Designed for articulate, critically-thinking students who are passionate about justice, advocacy, and navigating complex regulatory frameworks.",
      direction: "Emphasizes moot court practice, policy analysis, constitutional studies, and professional legal ethics."
    };
  }
  
  return {
    focus: "This department connects to multidisciplinary academic excellence, professional skill development, and industry readiness.",
    matters: "It provides the foundational knowledge and advanced skills required to succeed in dynamic, modern professional environments.",
    studentType: "Designed for ambitious students looking for structured academic pathways that lead to diverse career opportunities.",
    direction: "Combines rigorous theoretical foundations with practical, industry-relevant applications."
  };
};

export default function Department() {
  const params = useParams();
  const schoolSlug = params.schoolSlug as string;
  const deptSlug = params.deptSlug as string;
  const { state } = useDeveloperCms({ useOverlay: true });
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = useMemo(() => syncAcademicSchoolsWithCms(staticSchools, cmsSchools), [cmsSchools]);
  const school = findBySlugOrName(schoolSource, schoolSlug) as any;
  const dept = findBySlugOrName(school?.departments, deptSlug) as any;
  const openApply = useOpenApply();

  const sortedPrograms = useMemo(() => {
    const raw = sortPrograms((dept?.programs || []).filter(Boolean));
    return raw.filter((p) => p?.name);
  }, [dept]);

  const schoolSlugSafe = safeSlug(school?.slug || "", school?.name || "");
  const deptSlugSafe = safeSlug(dept?.slug || "", dept?.name || "");
  const departmentQuickAnswers = useMemo(() => buildDepartmentAnswers(school, dept), [school, dept]);
  const departmentFaqs = useMemo(() => buildDepartmentFaqs(school, dept), [school, dept]);
  const departmentQuickLinks = useMemo(() => {
    if (!school || !dept) return [];
    return [
      ...buildDepartmentProgramLinks(school, dept),
      ...buildDepartmentSiblingLinks(school, dept).slice(0, 3),
      { href: `/schools/${schoolSlugSafe}`, label: school.name, description: "Parent school page for this department." },
      { href: "/admissions", label: "Admissions", description: "Official admissions routes for listed programs." },
      ENTRANCE_EXAM_LINK,
      TRUST_LINKS[0],
    ].filter(Boolean);
  }, [dept, school, schoolSlugSafe]);

  if (!school || !dept) notFound();

  return (
    <SchoolLayout
      activeSchoolSlug={safeSlug(school.slug, school.name)}
      title={dept.name}
      subtitle="Explore programmes, pathways, and academic details for this department."
      breadcrumbs={[
        { label: school.short || school.name, path: `/schools/${schoolSlugSafe}` },
        { label: dept.short || dept.name }
      ]}
      sectionLabel={dept.name.toUpperCase()}
      heading="Programs Offered"
      onApply={openApply}
    >
      <div className="space-y-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black text-[#0d315c] mb-6 tracking-tight">Department Overview</h2>
          
          <p className="text-slate-700 leading-relaxed font-medium mb-8 text-[15px]">
            {dept.about && dept.about.length > 20 && !dept.about.toLowerCase().includes("pending") && !dept.about.toLowerCase().includes("coming soon")
              ? dept.about 
              : `The ${dept.name} under the ${school.name} is dedicated to academic excellence and professional readiness. ${getDepartmentPositioning(school.slug).focus}`
            }
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#019e6e]">Why it Matters</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{getDepartmentPositioning(school.slug).matters}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#019e6e]">Who is this for?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{getDepartmentPositioning(school.slug).studentType}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#019e6e]">Learning Direction</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{getDepartmentPositioning(school.slug).direction}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#019e6e]">Career Pathways</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Students may explore career and higher-study pathways depending on programme level, eligibility, professional requirements, and applicable regulations.</p>
            </div>
          </div>

          <div className="bg-[#f8fafc] border-l-4 border-[#ffaf3a] p-5 text-[13px] text-slate-600 font-medium rounded-r-lg">
            For the latest department-specific academic guidance, please contact the admissions office.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedPrograms.map((p, i) => {
            const progSlug = safeSlug(p.slug, p.name);
            return (
              <Link
                key={i}
                href={`/schools/${schoolSlugSafe}/${deptSlugSafe}/${progSlug}`}
                className="group p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#25b895] hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#25b895] bg-[#25b895]/10 px-3 py-1 rounded-full">
                    {p.level || "Program"}
                  </span>
                  {p.duration && (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {p.duration}
                    </span>
                  )}
                </div>
                <h4 className="text-[15px] font-black text-[#0d315c] group-hover:text-[#25b895] mb-4 leading-tight">
                  {p.name}
                </h4>
                {p.partnerCode === "QTST" && (
                  <div className="mb-4">
                    <Link
                      href="/qtst"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0d315c] bg-[#ffaf3a]/20 px-3 py-1 rounded-full hover:bg-[#ffaf3a]/30 transition-colors"
                      aria-label="View QTST partner page"
                    >
                      QTST Partner Page →
                    </Link>
                  </div>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-[#25b895]">
                  Full Details →
                </div>
              </Link>
            );
          })}
        </div>
        {SHOW_PUBLIC_SEO_SECTIONS && (
          <>
            <AnswerGridSection title="Quick Answers" items={departmentQuickAnswers} />
            <LinkGridSection title="Programs & Related Departments" items={departmentQuickLinks} />
            <FaqSection title="Frequently Asked Questions" items={departmentFaqs} />
          </>
        )}
      </div>
    </SchoolLayout>
  );
}
