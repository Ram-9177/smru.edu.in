// @ts-nocheck
"use client";
import React, { useCallback, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PARTNER_HIDDEN_STICKY_ROUTES } from "@/lib/shared/site-constants";
import { schools as staticSchools } from "../data/schools";
import { FaLayerGroup } from "react-icons/fa";
import { useOpenApply } from "../context/ApplyModalContext";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms, syncAcademicSchoolsWithCms } from "@/lib/developer/academic-data";
import { detectProgramCategory, safeSlug } from "@/lib/shared/program-utils";
import { getSeoAuthorityPage } from "@/lib/seo/authority-map";

const authorityPath = (key: string, fallback: string) => getSeoAuthorityPage(key)?.path || fallback;

const MobileAccordionItem = ({ group, closeMenu, openApply }) => {
  return null; // This is now handled in MobileMenu.tsx
};

const Navbar = ({ 
  isPartner: propIsPartner,
  isOpen,
  toggleMenu
}: { 
  isPartner?: boolean,
  isOpen?: boolean,
  toggleMenu?: () => void
} = {}) => {
  const openApply = useOpenApply();
  const [activeMenu, setActiveMenu] = useState(null); // 'schools' or null
  const [activeSchoolSlug, setActiveSchoolSlug] = useState(safeSlug(staticSchools[0]?.slug, staticSchools[0]?.name || ""));
  const navigate = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useDeveloperCms({ useOverlay: true });
  const cmsItems = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schools = useMemo(() => syncAcademicSchoolsWithCms(staticSchools, cmsItems), [cmsItems]);

  const authority = useMemo(() => ({
    about: authorityPath("about", "/about"),
    academicStructure: authorityPath("academicStructure", "/academic-structure"),
    admissions: authorityPath("admissions", "/admissions"),
    schools: authorityPath("schools", "/schools"),
    phdAdmissions: authorityPath("phdAdmissions", "/phd-admissions"),
    contact: authorityPath("contact", "/contact"),
    campus360: authorityPath("campus360", "/campus-360"),
    brochure: authorityPath("brochure", "/brochure"),
    approvals: authorityPath("approvalsRecognitions", "/approvals-recognitions"),
  }), []);

  const isPartner = propIsPartner !== undefined ? propIsPartner : PARTNER_HIDDEN_STICKY_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  const closeMenu = () => {
    if (toggleMenu && isOpen) toggleMenu();
    setActiveMenu(null);
  };

  const prefetchPath = useCallback(
    (path: string) => {
      if (!path) return;
      router.prefetch(path);
    },
    [router]
  );

  const activeSchool = useMemo(() => {
    const filtered = schools.filter(s => s.visibility !== "hidden");
    return filtered.find((s) => s.slug === activeSchoolSlug) || filtered[0];
  }, [activeSchoolSlug, schools]);

  const schoolProgramsByCategory = useMemo(() => {
    if (!activeSchool) return { ug: [], pg: [], diploma: [], phd: [] };
    const allProgs = [];
    (activeSchool.departments || []).forEach((dept) => {
      const deptSlug = safeSlug(dept.slug, dept.name);
      (dept.programs || []).forEach((prog) => {
        allProgs.push({ 
          ...prog, 
          deptSlug, 
          slug: safeSlug(prog.slug, prog.name),
          deptName: dept.name
        });
      });
    });

    const categories = { ug: [], pg: [], diploma: [], phd: [] };

    allProgs.forEach((prog) => {
      const cat = detectProgramCategory(prog);
      categories[cat].push({ 
        ...prog, 
        displayName: prog.name || "Untitled",
        deptName: prog.deptName || "Department"
      });
    });

    Object.keys(categories).forEach((k) => categories[k].sort((a, b) => a.displayName.localeCompare(b.displayName)));
    return categories;
  }, [activeSchool]);

  const isSchoolsOpen = activeMenu === 'schools';
  const isAdmissionsOpen = activeMenu === 'admissions';

  return (
    <nav 
      className={`fixed ${isPartner ? "top-0" : "top-10"} left-0 right-0 z-[2000] h-[64px] lg:h-[76px] bg-[#0d315c] border-b-2 border-[#019e6e]/40 shadow-lg transition-all duration-300`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex h-full items-center justify-between lg:items-center lg:justify-between lg:py-0 lg:pr-8">
        <Link href="/" onClick={closeMenu} onMouseEnter={() => setActiveMenu(null)} className="flex h-full items-center justify-center shrink-0 bg-white cut-corner-badge shadow-md overflow-hidden transition-all duration-300 px-3 sm:px-4 lg:px-5 min-w-[112px] sm:min-w-[128px] lg:min-w-[140px]">
          <Image
            src="/assets/Logo.webp"
            alt="Stmarys University Logo"
            width={374}
            height={200}
            className="w-[86px] object-contain lg:w-[96px]"
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <ul className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-1 overflow-visible font-outfit [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>li]:shrink-0 h-full lg:flex lg:flex-nowrap lg:gap-4 xl:gap-7 pr-4">
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link href="/" onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link href={authority.about} onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>

          <li 
            className="flex items-center md:h-full"
            onMouseEnter={() => {
              setActiveMenu('schools');
              prefetchPath(`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}`);
            }}
          >
            <Link
              href={authority.schools}
              onClick={closeMenu}
              aria-label="Academic Schools Mega Menu"
              className={`whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] cursor-pointer transition-all flex items-center gap-1.5 py-2 md:gap-2 md:py-4 ${isSchoolsOpen ? "text-[#ffaf3a]" : "text-white/90 hover:text-[#ffaf3a]"}`}
            >
              Schools
              <span className={`text-[10px] transition-transform duration-300 ${isSchoolsOpen ? "rotate-180" : ""}`}>▼</span>
            </Link>

            {isSchoolsOpen && (
              <div 
                className={`fixed top-[104px] lg:top-[116px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 cut-corner-panel overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-200`}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="w-[300px] shrink-0 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-slate-400 border-b border-slate-100 pb-2">Academic Units</h3>
                  <div className="flex flex-col gap-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {schools
                      .filter(s => s.visibility !== "hidden")
                      .map((s) => {
                        const sSlug = safeSlug(s.slug, s.name);
                        const isActive = activeSchoolSlug === sSlug;
                        return (
                          <Link
                            href={`/schools/${sSlug}`}
                            key={sSlug}
                            onMouseEnter={() => {
                              setActiveSchoolSlug(sSlug);
                            }}
                            onClick={closeMenu}
                            className={`text-left px-5 py-3.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-between group ${
                              isActive ? "bg-[#0d315c] text-white shadow-md translate-x-2" : "text-slate-500 hover:bg-slate-100 hover:text-[#0d315c]"
                            }`}
                          >
                            <span className="leading-tight pr-4">{s.short || s.name}</span>
                            {isActive && <span className="text-[10px]">➜</span>}
                          </Link>
                        );
                      })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Link 
                      href={authority.academicStructure}
                      onClick={closeMenu}
                      className="text-left flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all group w-full"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaLayerGroup className="text-sm" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black leading-none mb-1">Academic Structure</p>
                        <p className="text-[9px] opacity-70">Program catalog</p>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="flex-grow p-6 overflow-y-auto max-h-[70vh] bg-slate-50/20">
                  <div className="mb-5">
                    <p className="text-[#019e6e] text-[9px] font-black uppercase tracking-[0.2em] mb-1.5">{activeSchool?.name}</p>
                    <h2 className="text-[24px] font-black text-[#0d315c] tracking-tight leading-none">Programs by Level</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {["ug", "pg", "diploma", "phd"].map((cat) => {
                      const titles = {
                        ug: "Undergraduate Programs",
                        pg: "Postgraduate Programs",
                        diploma: "Diploma / Certificate",
                        phd: "Ph.D. / M.Phil."
                      };
                      return (
                        <div key={cat}>
                          <h4 className="text-[9px] font-black text-[#0d315c] uppercase tracking-[0.15em] border-b-2 border-[#ffaf3a] pb-1.5 mb-2.5 w-fit leading-none">{titles[cat]}</h4>
                          <ul className="space-y-1.5">
                            {schoolProgramsByCategory[cat].length > 0 ? (
                              schoolProgramsByCategory[cat].map((p) => (
                                <li key={p.slug} className="group flex items-start gap-2 p-1.5 rounded-md hover:bg-white/80 transition-all">
                                  <div className="flex flex-col group/item transition-all">
                                    <Link 
                                      href={`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}/${p.deptSlug}/${p.slug}`}
                                      onClick={closeMenu}
                                      className="text-left text-[13px] font-bold text-slate-800 group-hover/item:text-[#019e6e] leading-snug transition-colors"
                                    >
                                      {p.displayName}
                                    </Link>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight mt-0.5">{p.deptName}</span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="text-[11px] text-slate-400 italic pl-2">No programs listed yet.</li>
                            )}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-200 flex justify-end">
                    <Link 
                      href={`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}`}
                      onClick={closeMenu}
                      className="text-[#019e6e] font-black text-[13px] hover:gap-2 flex items-center gap-1.5 transition-all group"
                    >
                      View school dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li 
            className="flex items-center md:h-full"
            onMouseEnter={() => setActiveMenu('admissions')}
          >
            <Link
              href={authority.admissions}
              onClick={closeMenu}
              aria-label="Official University Admissions Mega Menu"
              className={`whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] cursor-pointer transition-all flex items-center gap-1.5 py-2 md:gap-2 md:py-4 ${isAdmissionsOpen ? "text-[#ffaf3a]" : "text-white/90 hover:text-[#ffaf3a]"}`}
            >
              Admissions
              <span className={`text-[10px] transition-transform duration-300 ${isAdmissionsOpen ? "rotate-180" : ""}`}>▼</span>
            </Link>

            {isAdmissionsOpen && (
              <div 
                className="fixed top-[104px] lg:top-[116px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1000px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 cut-corner-panel overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="w-[280px] shrink-0 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-slate-400 border-b border-slate-100 pb-2">Enrollment Hub</h3>
                  <div className="space-y-4">
                    <a 
                      href="https://apply.smru.edu.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-4 bg-[#019e6e] text-white rounded-xl shadow-lg hover:bg-[#0fa571] transition-all"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Apply Now</p>
                      <p className="text-lg font-black leading-none">Admissions 2026</p>
                    </a>
                    <Link 
                      href={authority.admissions}
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-[#019e6e] hover:bg-slate-50 transition-all group w-full text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0d315c] group-hover:bg-[#019e6e]/10 group-hover:text-[#019e6e]">
                        <FaLayerGroup />
                      </div>
                      <span className="text-[11px] font-black text-[#0d315c] uppercase">Overview</span>
                    </Link>
                  </div>
                </div>

                <div className="flex-grow p-8 bg-white grid grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-[12px] font-black text-[#019e6e] uppercase tracking-[0.2em] mb-6">Degree Programs</h4>
                    <ul className="space-y-5">
                      {[
                        { label: "UG Admissions", desc: "Bachelors degrees across all schools", to: authority.admissions },
                        { label: "PG Admissions", desc: "Master of Science & specialized masters", to: authority.admissions },
                        { label: "PhD Admissions", desc: "Doctoral research opportunities", to: authority.phdAdmissions, highlight: true },
                        { label: "Post-Diploma", desc: "Specialized clinical credentials", to: authority.admissions },
                      ].map((item, i) => (
                        <li key={i}>
                          <Link 
                            href={item.to}
                            onClick={closeMenu}
                            className={`text-left group flex flex-col ${item.highlight ? "text-[#0d315c]" : "text-slate-600"} hover:text-[#019e6e] transition-colors`}
                          >
                            <span className="text-[15px] font-black tracking-tight">{item.label}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[12px] font-black text-[#019e6e] uppercase tracking-[0.2em] mb-6">Resources & Support</h4>
                    <ul className="space-y-5">
                      {[
                        { label: "Counselling Helpdesk", desc: "Fee and scholarship guidance through admissions", to: authority.contact },
                        { label: "Download Brochure", desc: "Course and admissions information", to: authority.brochure },
                        { label: "Approvals & Recognition", desc: "Official statutory documentation", to: authority.approvals },
                        { label: "Mandatory Disclosure", desc: "Official statutory documentation", to: "/mandatory-disclosure" },
                      ].map((item, i) => (
                        <li key={i}>
                          <Link 
                            href={item.to}
                            onClick={closeMenu}
                            className="text-left group flex flex-col text-slate-600 hover:text-[#019e6e] transition-colors"
                          >
                            <span className="text-[15px] font-black tracking-tight">{item.label}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link href="/careers" onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Careers
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link href="/search" onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Search
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link href={authority.contact} onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>

          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link href={authority.campus360} onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Campus 360
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
        </ul>

        {!isOpen && (
          <button
            className="block lg:hidden mr-4 p-3 transition-opacity duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span className="absolute block h-[2.5px] w-full bg-white top-0" />
              <span className="absolute block h-[2.5px] w-full bg-white top-2" />
              <span className="absolute block h-[2.5px] w-full bg-white top-4" />
            </div>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
