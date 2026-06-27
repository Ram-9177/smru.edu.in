"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { schools as staticSchools } from "../data/schools";
import useOpenApply from "../hooks/useOpenApply";
import { FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import { BigNumberGrid, PillBand } from "../components/InfographicSections";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms, syncAcademicSchoolsWithCms } from "@/lib/developer/academic-data";
import { LinkGridSection } from "@/components/seo/PageSections";
import { LOCATION_LINKS, TRUST_LINKS } from "@/lib/seo/info-pages";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import {
  ADMISSIONS_CONTENT_LAST_UPDATED,
  PHD_ADMISSIONS_STATUS_MESSAGE,
} from "@/lib/shared/site-constants";
import {
  detectProgramCategory,
  safeSlug,
} from "@/lib/shared/program-utils";
import { getKnownSchoolLandingPath } from "@/lib/shared/school-landing";

const sortByName = (a, b) => (a.name || "").localeCompare(b.name || "");

export default function Schools() {
  const { state } = useDeveloperCms({ useOverlay: true });
  const cmsItems = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const source = useMemo(() => syncAcademicSchoolsWithCms(staticSchools, cmsItems), [cmsItems]);
  const baseItems = useMemo(() => 
    (source || [])
      .filter(s => s.visibility !== "hidden")
      .map((s) => ({ ...s, slug: safeSlug(s.slug, s.name) })), 
    [source]
  );
  const [activeSlug, setActiveSlug] = useState(baseItems[0]?.slug || null);
  const openApply = useOpenApply();

  const activeSchool = baseItems.find((s) => s.slug === activeSlug) || baseItems[0] || null;
  const activeLandingPath = activeSchool ? getKnownSchoolLandingPath(activeSchool.slug) : null;

  const groupedPrograms = useMemo(() => {
    if (!activeSchool) return { ug: [], pg: [], diploma: [], phd: [] };
    const catalog = { ug: [], pg: [], diploma: [], phd: [] };

    (activeSchool.departments || []).forEach((dept) => {
      const deptSlug = safeSlug(dept.slug, dept.name);
      (dept.programs || []).forEach((prog) => {
        const cat = detectProgramCategory(prog);
        const progSlug = safeSlug(prog.slug, prog.name);
        catalog[cat].push({
          name: prog.name,
          path: `/schools/${activeSchool.slug}/${deptSlug}/${progSlug}`,
        });
      });
    });
    Object.keys(catalog).forEach((key) => {
      catalog[key].sort(sortByName);
    });
    return catalog;
  }, [activeSchool]);

  const groups = [
    { key: "ug", label: "Undergraduate Programs" },
    { key: "pg", label: "Postgraduate Programs" },
    { key: "diploma", label: "Diploma / Certificate" },
    { key: "phd", label: "Ph.D. / M.Phil." },
  ];

  const schoolStats = useMemo(() => {
    const schoolsCount = baseItems.length;
    const deptCount = baseItems.reduce((acc, s) => acc + (s.departments?.length || 0), 0);
    const programCount = baseItems.reduce(
      (schoolTotal, s) => schoolTotal + (s.departments || []).reduce((deptTotal, d) => deptTotal + (d.programs?.length || 0), 0),
      0
    );
    return { schoolsCount, deptCount, programCount };
  }, [baseItems]);

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      {/* ================= HERO ================= */}
      <section className="relative text-[#0d315c] pt-20 md:pt-28 pb-12 overflow-hidden">
        {/* Premium Atmospheric 'Mesh' Gradient */}
        <div className="absolute inset-0 bg-[#f8fafc]" />
        
        {/* Dynamic Multi-layered Brand Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(37,184,149,0.18)_0,transparent_55%),radial-gradient(at_100%_0%,rgba(13,49,92,0.12)_0,transparent_55%),radial-gradient(at_50%_0%,rgba(240,253,250,0.8)_0,transparent_60%)]" />
 
        {/* Cinematic Texture / Pattern */}
        <div 
          className="absolute inset-0 bg-repeat opacity-[0.04] mix-blend-multiply" 
          style={{ backgroundImage: `url(${resolveAssetSrc(abstractHeroBg)})`, backgroundSize: '460px' }}
        />
        
        {/* Smooth integration with content area */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f9ff]/90" />
        
        <div className="smru-container relative z-20 text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 mb-6 opacity-60">
            <Link href="/" className="text-[11px] font-black uppercase tracking-[0.4em] hover:text-[#019e6e] transition-colors">Home</Link>
            <span className="text-[10px] font-bold text-slate-300">/</span>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Schools</span>
          </nav>
 
          <h1 className="smru-h1 mb-3">
            Schools <span className="text-[#019e6e]">&</span> Programs
          </h1>
          <div className="mt-4 h-1.5 w-16 cut-corner-underline bg-[#ffaf3a] mx-auto mb-6 shadow-sm" />
          
          <p className="max-w-3xl mx-auto text-[14px] md:text-base text-[#0d315c]/50 font-black uppercase tracking-[0.4em] leading-relaxed">
            Choose the school that matches your career path
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={openApply}
              className="px-8 py-3 cut-corner-badge text-[12px] font-black uppercase tracking-widest bg-[#019e6e] text-white hover:scale-105 shadow-xl transition-all"
            >
              Apply Online
            </button>
            <Link
              href="/academic-structure"
              className="px-8 py-3 cut-corner-badge text-[12px] font-black uppercase tracking-widest border border-[#0d315c]/10 text-[#0d315c] hover:bg-white transition-all flex items-center gap-2 shadow-sm"
            >
              Academic Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* Admissions Notice */}
      <div className="smru-container mt-8">
        <div className="bg-[#f0fdf4] border-l-4 border-[#019e6e] p-5 cut-corner-panel shadow-sm intro-fade-up">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 cut-corner-badge bg-[#019e6e]/20 flex items-center justify-center">
              <FaInfoCircle className="text-[#019e6e] text-sm" />
            </div>
            <p className="text-slate-700 text-[14px] font-medium leading-relaxed">
              <strong className="text-[#0d315c] mr-1">Admissions Update:</strong> 
              Admissions for <span className="font-bold">UG, PG & Diploma programs (2026-27)</span> are now active. <span className="font-bold text-[#0d315c]">{PHD_ADMISSIONS_STATUS_MESSAGE}</span>
              <span className="block mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Last updated: {ADMISSIONS_CONTENT_LAST_UPDATED}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="smru-container mt-8">
        <BigNumberGrid
          className="sm:grid-cols-3 lg:grid-cols-3"
          showOrdinal={false}
          items={[
            { value: schoolStats.schoolsCount, label: "Schools" },
            { value: schoolStats.deptCount, label: "Departments" },
            { value: `${schoolStats.programCount}+`, label: "Programs" },
          ]}
        />
      </div>

      <div className="smru-container py-12">
        <div className="cut-corner-panel shadow-2xl border border-[#cfe4ff] overflow-hidden grid md:grid-cols-[260px,1fr] bg-[#edf6ff] min-h-[440px] md:min-h-[520px]">

          {/* Left — navy sidebar */}
          <div className="bg-[#0d315c] text-white p-5 flex flex-col">
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60 mb-4">Schools</div>
            <ul className="space-y-1 flex-1 overflow-y-auto pr-1">
              {baseItems.map((s) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setActiveSlug(s.slug)}
                    className={`w-full text-left px-3 py-2.5 cut-corner-badge text-sm font-medium transition ${
                      activeSlug === s.slug ? "bg-white text-[#0d315c]" : "hover:bg-white/10 text-white/90"
                    }`}
                  >
                    {s.short || s.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[11px] text-white/50">Select a school to see its programs.</div>
          </div>

          {/* Right — white panel */}
          <div className="bg-[linear-gradient(180deg,#f4f9ff_0%,#e8f3ff_100%)] flex flex-col">
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {activeSchool && (
              <>
                {/* School label + heading */}
                <div className="mb-6">
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#019e6e] mb-1">
                    {activeSchool.short || activeSchool.name}
                  </div>
                  <UniversitySectionHeader
                    title="Programs by Level"
                    align="left"
                    titleClassName="text-2xl"
                    className="mb-0"
                  />
                  {activeSchool.about && (
                    <p className="mt-3 text-sm text-slate-600 max-w-3xl leading-relaxed">{activeSchool.about}</p>
                  )}
                  <PillBand
                    className="mt-5 justify-start"
                    items={groups
                      .map((g) => ({ label: g.label.replace(" Programs", ""), value: groupedPrograms[g.key]?.length || 0 }))
                      .filter((item) => item.value)}
                  />
                </div>

                {/* Programs grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {groups.map((g) => {
                    const list = groupedPrograms[g.key] || [];
                    if (!list.length) return null;
                    return (
                      <div key={g.key}>
                        <div className="w-fit">
                          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-1">
                            {g.label}
                          </h3>
                          <div className="h-1 w-full cut-corner-underline bg-[#ffaf3a] mb-3" />
                        </div>
                        <ul className="space-y-1 cut-corner-panel border border-[#d7e8fb] bg-white p-2 shadow-[0_12px_30px_rgba(13,49,92,0.06)]">
                          {list.map((p) => (
                            <li key={p.path}>
                              <Link
                                href={p.path}
                                className="block text-[13px] leading-snug text-[#019e6e] hover:text-[#0f6a5a] hover:bg-[#eef6ff] cut-corner-badge px-2 py-1.5 transition-colors font-medium"
                              >
                                <span className="inline-flex items-center gap-2 flex-wrap">
                                  <span>{p.name}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

              </>
            )}
            </div>

            {/* Footer row */}
            {activeSchool && (
              <div className="px-5 md:px-8 py-5 border-t border-[#d7e8fb] bg-white flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                  {activeLandingPath && (
                    <Link
                      href={activeLandingPath}
                      className="text-sm font-semibold text-[#0d315c] hover:text-[#019e6e] transition-colors"
                    >
                      View school landing →
                    </Link>
                  )}
                  <Link
                    href={`/schools/${activeSchool.slug}`}
                    className="text-sm font-semibold text-[#019e6e] hover:text-[#0f6a5a] transition-colors"
                  >
                    View all departments in this school →
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={openApply}
                  className="px-6 py-2.5 cut-corner-badge text-base font-semibold bg-[#019e6e] text-white hover:bg-[#0fa571] transition-colors"
                >
                  Apply / Enquire
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust & Recognition Band */}
      <div className="smru-container smru-section">
        <div className="bg-[#0d315c] cut-corner-panel p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 cut-corner-badge -mr-32 -mt-32" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-4 italic">Statutory Trust & <span className="text-[#ffaf3a]">Recognition</span></h2>
              <p className="text-white/70 font-medium leading-relaxed max-w-xl mb-6">
                Stmarys University is a state private university established under the Telangana State Private Universities Act and recognized by UGC under Section 2(f). Programme-specific permissions, where required, are verified through official university or statutory council documents.
              </p>
              <div className="flex flex-wrap gap-4">
                {["UGC Recognized", "State Act Established", "Clinical Excellence"].map(badge => (
                  <div key={badge} className="bg-white/10 border border-white/10 px-4 py-2 cut-corner-badge text-[11px] font-black uppercase tracking-widest">{badge}</div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 cut-corner-panel border border-white/10">
              <p className="text-xs font-bold text-[#ffaf3a] uppercase tracking-widest mb-4">Admissions Verification</p>
              <p className="text-sm leading-relaxed text-white/80">
                For the 2026-27 academic session, current intakes, eligibility, and fee guidance are confirmed through admissions counselling and university communication. Prospective students can verify recognition details through the <Link href="/approvals-recognitions" className="text-white underline">Recognition & Verification</Link> page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {SHOW_PUBLIC_SEO_SECTIONS && (
        <div className="smru-container smru-section space-y-16">
          <section className="space-y-8">
            <UniversitySectionHeader
              title="Academic FAQ"
              align="left"
              subtitle="Common Queries regarding Schools & Programs"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "How many academic schools does Stmarys University have?", a: `Stmarys University currently houses ${schoolStats.schoolsCount} specialized schools: Rehabilitation Sciences, Health & Allied Health Sciences, Psychology, Nursing, Engineering & Emerging Technologies, and Law.` },
                { q: "How are programme-level permissions shown?", a: "Programme-level professional permissions are shown through published university notifications or relevant statutory council documents where required. Applicants should verify current details from the programme page and official disclosure pages." },
                { q: "What is the admission mode for 2026-27?", a: "Admissions are based on merit and university-led entrance examinations for specific clinical tracks." },
                { q: "Does Stmarys University offer Ph.D. programs?", a: "Yes. Ph.D. admissions cycle status and doctoral information are maintained on the dedicated Ph.D. admissions page." },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 cut-corner-panel border border-slate-100 shadow-sm">
                  <h3 className="font-black text-[#0d315c] text-[13px] uppercase tracking-wider mb-2">Q: {faq.q}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <LinkGridSection
            title="Institutional Resources"
            items={[
              { href: "/departments", label: "Department Directory", description: "Explore specific clinical and academic departments." },
              { href: "/admissions", label: "Admissions Portal", description: "Start your application for the 2026-27 academic session." },
              { href: "/university-in-telangana", label: "University in Telangana", description: "Regional authority and state recognition details." },
              { href: "/approvals-recognitions", label: "Recognition & Verification", description: "View establishment, UGC recognition, and programme verification routes." },
              { href: "/contact", label: "Career Guidance", description: "Contact the university for current career support information." },
              { href: "/admissions", label: "Admissions", description: "Review official admissions information for students." },
            ]}
          />
        </div>
      )}
    </div>
  );
}
