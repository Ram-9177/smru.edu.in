"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { schools as staticSchools } from "../data/schools";
import { 
  FaSearch, FaFilter, FaLayerGroup, FaUniversity, FaUserGraduate, 
  FaCertificate, FaBrain, FaInfoCircle, FaArrowRight, FaLightbulb,
  FaBookOpen, FaGlobeAmericas, FaAward
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useOpenApply from "../hooks/useOpenApply";
import abstractHeroBg from "../assets/education-pattern.webp";
import SEO from "../components/SEO";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { resolveAssetSrc } from "@/lib/shared/media";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms, syncAcademicSchoolsWithCms } from "@/lib/developer/academic-data";
import { ADMISSIONS_CONTENT_LAST_UPDATED } from "@/lib/shared/site-constants";
import {
  detectProgramCategory,
  safeSlug,
} from "@/lib/shared/program-utils";

const academicRelatedLinks = [
  { href: "/admissions", label: "Admissions and Apply Now", description: "Review admissions steps before selecting a programme route." },
  { href: "/schools", label: "Schools", description: "Explore academic schools and school-level pathways." },
  { href: "/departments", label: "Departments", description: "Browse department pages across all schools." },
  { href: "/campus-location-hyderabad", label: "Campus Location", description: "Check campus address and visitor guidance." },
  { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Verify official institutional recognition pages." },
  { href: "/contact", label: "Contact Admissions", description: "Ask the university team about programmes and eligibility." },
  { href: "/#faqs", label: "University FAQs", description: "Read common applicant and parent questions." },
];

export default function AcademicStructure() {
  const openApply = useOpenApply();
  const { state } = useDeveloperCms({ useOverlay: true });
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = useMemo(() => syncAcademicSchoolsWithCms(staticSchools, cmsSchools), [cmsSchools]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const flattenedPrograms = useMemo(() => {
    let list = [];
    
    schoolSource.forEach((school) => {
      school.departments?.forEach((dept) => {
        dept.programs?.forEach((prog) => {
          const category = detectProgramCategory(prog, { uppercase: true });
          list.push({
            schoolName: school.name,
            schoolSlug: safeSlug(school.slug, school.name),
            deptName: dept.name,
            deptSlug: safeSlug(dept.slug, dept.name),
            progName: prog.name,
            progSlug: safeSlug(prog.slug, prog.name),
            level: prog.level,
            category: category,
          });
        });
      });
    });
    return list;
  }, [schoolSource]);

  const filtered = useMemo(() => {
    return flattenedPrograms.filter((p) => {
      const matchSearch =
        p.progName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLevel = filterLevel === "All" || p.category === filterLevel;
      return matchSearch && matchLevel;
    });
  }, [flattenedPrograms, searchTerm, filterLevel]);

  const stats = useMemo(() => {
    return {
      total: flattenedPrograms.length,
      ug: flattenedPrograms.filter(p => p.category === "UG").length,
      pg: flattenedPrograms.filter(p => p.category === "PG").length,
      phd: flattenedPrograms.filter(p => p.category === "PhD").length,
      diploma: flattenedPrograms.filter(p => p.category === "Diploma").length,
    };
  }, [flattenedPrograms]);

  return (
    <div className="min-h-screen bg-white font-outfit text-[#0d315c] selection:bg-[#019e6e]/10">
      <SEO 
        title="Academic Structure | Stmarys University"
        description="Explore the academic catalogue of Stmarys University across rehabilitation, health sciences, nursing, psychology, engineering, law, and allied professional schools."
      />

      {/* -------------------------------------------------------------------
          CINEMATIC HERO SECTION
          ------------------------------------------------------------------- */}
      <section className="relative min-h-[70vh] pt-36 pb-20 overflow-hidden flex flex-col items-center justify-center bg-[#f8fafc]">
        {/* Cinematic Atmospheric Background */}
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(37,184,149,0.15)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(13,49,92,0.1)_0,transparent_50%),radial-gradient(at_50%_50%,rgba(245,249,255,0.6)_0,transparent_100%)]" />

        {/* Abstract Asset Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Education Pattern Background */}
          <div 
            className="absolute inset-0 bg-repeat opacity-[0.05]" 
            style={{ backgroundImage: `url(${resolveAssetSrc(abstractHeroBg)})`, backgroundSize: '460px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/95" />
          {/* Subtle Mask for bottom cards */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-white/10 backdrop-blur-[2px] pointer-events-none" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center space-y-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] md:text-[11px] font-black text-[#019e6e] uppercase tracking-[0.6em] mb-4">Academic Excellence</p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-[#0d315c]">
              Academic <span className="text-[#019e6e]">Structure</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-slate-500 font-medium italic leading-relaxed opacity-80 max-w-3xl mx-auto">
              A career-focused catalogue across Stmarys University's schools, built around clinical exposure, professional skills, and interdisciplinary learning.
            </p>
          </motion.div>
 
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <button onClick={openApply} className="px-10 py-5 bg-[#0d315c] text-white font-black text-[13px] uppercase tracking-widest cut-corner-badge shadow-2xl hover:bg-[#019e6e] transition-all transform hover:-translate-y-1">
              Apply Now 2026-27
            </button>
            <a href="#catalogue" className="px-10 py-5 bg-white/70 backdrop-blur-md border border-[#0d315c]/10 text-[#0d315c] font-black text-[13px] uppercase tracking-widest cut-corner-badge flex items-center gap-2 hover:bg-white transition-all shadow-lg">
              Explore Catalogue <FaArrowRight className="text-[#019e6e]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          STATS GRID (Floating)
          ------------------------------------------------------------------- */}
      <section className="relative z-20 -mt-16 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Programs", count: stats.total, icon: <FaLayerGroup />, color: "from-[#0d315c] to-[#1e4a7a]" },
            { label: "Undergraduate", count: stats.ug, icon: <FaUniversity />, color: "from-[#019e6e] to-[#0fa571]" },
            { label: "Postgraduate", count: stats.pg, icon: <FaUserGraduate />, color: "from-blue-600 to-blue-800" },
            { label: "Doctoral / Ph.D.", count: stats.phd || "Separate", icon: <FaBrain />, color: "from-purple-600 to-purple-800" },
            { label: "Diplomas", count: stats.diploma, icon: <FaCertificate />, color: "from-[#ffaf3a] to-[#e09a2a]" },
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 cut-corner-panel shadow-xl border border-slate-100 flex flex-col items-center text-center gap-4 transition-all"
            >
              {s.label === "Doctoral / Ph.D." ? (
                <Link href="/phd-admissions" className="flex flex-col items-center gap-4 group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${s.color} text-white cut-corner-badge flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-black text-[#0d315c] leading-tight group-hover:text-[#019e6e] transition-colors">{s.count}</div>
                    <div className="text-[11px] text-slate-600 font-black uppercase tracking-[0.14em]">{s.label}</div>
                  </div>
                </Link>
              ) : (
                <>
                  <div className={`w-14 h-14 bg-gradient-to-br ${s.color} text-white cut-corner-badge flex items-center justify-center text-2xl shadow-lg`}>
                    {s.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-black text-[#0d315c] leading-tight">{s.count}</div>
                    <div className="text-[11px] text-slate-600 font-black uppercase tracking-[0.14em]">{s.label}</div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------------
          ADMISSIONS NOTICE
          ------------------------------------------------------------------- */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <div className="bg-[#fff9ef] border-l-8 border-[#ffaf3a] p-8 cut-corner-panel shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 cut-corner-badge bg-[#ffaf3a]/20 flex items-center justify-center shrink-0">
            <FaInfoCircle className="text-[#ffaf3a] text-3xl" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black uppercase tracking-tight text-[#0d315c]">Admissions Update 2026-27</h4>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              UG, PG, and diploma programme structures listed below are active for the 2026-27 cycle. Ph.D. cycle status and doctoral information are listed separately on the Ph.D. admissions page.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Last updated: {ADMISSIONS_CONTENT_LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          SEARCH & CATALOGUE
          ------------------------------------------------------------------- */}
      <section id="catalogue" className="py-16 scroll-mt-40">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-12">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Program <span className="text-[#019e6e]">Catalogue</span></h2>
              <p className="text-slate-400 text-sm font-medium italic">Search by programme, department, or school to find a suitable academic path.</p>
              <div className="w-24 h-1 bg-[#ffaf3a]" />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "UG", "PG", "PhD", "Diploma"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-6 py-3 cut-corner-badge font-black text-[11px] uppercase tracking-widest transition-all ${
                    filterLevel === lvl
                      ? "bg-[#0d315c] text-white shadow-xl scale-105"
                      : "bg-[#f8faff] text-[#0d315c] hover:bg-slate-100 border border-slate-200/50"
                  }`}
                >
                  {lvl === "PhD" ? "Doctoral" : lvl === "All" ? "All Levels" : lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-8">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#019e6e] text-xl">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search by program name, department or school..."
              className="w-full pl-16 pr-8 py-7 cut-corner-panel bg-white border-2 border-[#f0f7ff] shadow-[0_20px_50px_rgba(13,49,92,0.08)] focus:border-[#019e6e] outline-none text-xl font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white cut-corner-panel shadow-2xl border border-slate-100 overflow-hidden group">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#0d315c] text-white">
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.2em] opacity-60">School / Department</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.2em] opacity-60">Program Level</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.2em] opacity-60">Catalogue Details</th>
                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.2em] opacity-60 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence mode="popLayout">
                    {filtered.length > 0 ? (
                      filtered.map((item, idx) => (
                        <motion.tr 
                          key={`${item.schoolSlug}-${item.deptSlug}-${item.progSlug}`}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-[#f8faff] transition-colors group/row"
                        >
                          <td className="px-10 py-8">
                            <div className="space-y-1">
                              <Link href={`/schools/${item.schoolSlug}`} className="text-[10px] font-black text-[#019e6e] uppercase tracking-widest hover:underline block">
                                {item.schoolName}
                              </Link>
                              <Link href={`/schools/${item.schoolSlug}/${item.deptSlug}`} className="text-lg font-black tracking-tight text-[#0d315c] hover:text-[#019e6e] transition-colors block">
                                {item.deptName}
                              </Link>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 cut-corner-badge text-[10px] font-black uppercase tracking-widest ${
                              item.category === "UG" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                              item.category === "PG" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                              item.category === "PhD" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                              "bg-amber-50 text-amber-600 border border-amber-100"
                            }`}>
                              <span className="w-1.5 h-1.5 cut-corner-badge bg-current" />
                              {item.level || item.category}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <Link 
                              href={`/schools/${item.schoolSlug}/${item.deptSlug}/${item.progSlug}`}
                              className="text-base font-bold text-[#0d315c] group-hover/row:text-[#019e6e] transition-colors flex items-center gap-2"
                            >
                              {item.progName}
                              <FaArrowRight className="text-[10px] opacity-0 -translate-x-2 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all" />
                            </Link>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button 
                              onClick={openApply}
                              className="px-6 py-2.5 bg-[#f0f7ff] text-[#0d315c] text-[10px] font-black uppercase tracking-widest cut-corner-badge hover:bg-[#0d315c] hover:text-white transition-all shadow-sm"
                            >
                              Enquire
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-10 py-32 text-center text-slate-400 font-medium italic">
                          No programs found matching your search. Try adjusting filters or terms.
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            <div className="bg-[#fcfdfd] px-10 py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Showing {filtered.length} of {stats.total} professional programs
              </p>
              <div className="flex gap-4 text-[11px] font-black text-[#019e6e] uppercase tracking-widest">
                <span className="flex items-center gap-2"><FaAward /> NEP 2020 Aligned</span>
                <span className="flex items-center gap-2"><FaGlobeAmericas /> University Recognition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        title="Academic Structure Links"
        intro="Use these official routes to compare schools, departments, admissions, campus access, and public verification pages."
        links={academicRelatedLinks}
      />

      {/* -------------------------------------------------------------------
          FINALE SECTION
          ------------------------------------------------------------------- */}
      <section className="py-20 bg-[#0d315c] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-6 text-center space-y-12 relative z-10">
          <div className="w-20 h-20 mx-auto bg-white/10 cut-corner-badge flex items-center justify-center text-3xl">
            <FaLightbulb className="text-[#ffaf3a]" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Cannot find what you're <span className="text-[#019e6e]">looking for?</span></h2>
            <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto italic px-6">
              Our counsellors can help you compare eligibility, programme fit, and available admission routes.
            </p>
          </div>
          <div className="pt-8 flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="px-10 py-5 bg-[#019e6e] text-white font-black text-sm uppercase tracking-[0.2em] cut-corner-badge hover:scale-105 transition-all shadow-2xl">
              Talk to a Counselor
            </Link>
            <button onClick={openApply} className="px-10 py-5 bg-white text-[#0d315c] font-black text-sm uppercase tracking-[0.2em] cut-corner-badge hover:scale-105 transition-all shadow-2xl">
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
