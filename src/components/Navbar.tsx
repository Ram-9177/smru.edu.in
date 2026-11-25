// @ts-nocheck
"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { PARTNER_HIDDEN_STICKY_ROUTES } from "@/lib/shared/site-constants";
import { FaLayerGroup } from "@/components/icons";
import { useOpenApply } from "../context/ApplyModalContext";
import { getSeoAuthorityPage } from "@/lib/seo/authority-map";
import { predictivePrefetch } from "@/lib/speed/predictive-preloader";

// The Schools menu needs the whole course catalogue and opens only on hover from 1024 px up, so it is a separate
// download: never on a phone, and while the browser is idle on a wider screen.
const loadSchoolsMegaMenu = () => import("./SchoolsMegaMenu");
const SchoolsMegaMenu = dynamic(loadSchoolsMegaMenu, { ssr: false });

const authorityPath = (key: string, fallback: string) => getSeoAuthorityPage(key)?.path || fallback;

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
  const [activeSchoolSlug, setActiveSchoolSlug] = useState(""); // "" until a school is pointed at: the first one shows
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia?.("(min-width: 1024px)").matches) return;
    // A failed download here is not an error: the menu asks for the file again when it opens.
    const preload = () => void loadSchoolsMegaMenu().catch(() => {});
    if (typeof window.requestIdleCallback !== "function") {
      const timer = window.setTimeout(preload, 1500);
      return () => window.clearTimeout(timer);
    }
    const idle = window.requestIdleCallback(preload, { timeout: 4000 });
    return () => window.cancelIdleCallback(idle);
  }, []);

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
      predictivePrefetch(path);
    },
    [router]
  );

  const isSchoolsOpen = activeMenu === 'schools';
  const isAdmissionsOpen = activeMenu === 'admissions';

  return (
    <nav 
      className={`fixed ${isPartner ? "top-0" : "top-10"} left-0 right-0 z-[2000] h-[64px] lg:h-[76px] bg-[#0d315c] border-b-2 border-[#019e6e]/40 shadow-lg transition-all duration-300`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex h-full items-center justify-between lg:items-center lg:justify-between lg:py-0 lg:pr-8">
        <Link prefetch={false} href="/" onClick={closeMenu} onMouseEnter={() => setActiveMenu(null)} className="flex h-full items-center justify-center shrink-0 bg-white cut-corner-badge shadow-md overflow-hidden transition-all duration-300 px-3 sm:px-4 lg:px-5 min-w-[112px] sm:min-w-[128px] lg:min-w-[140px]">
          <Image
            src="/assets/logo-384.webp"
            alt="St. Mary's University Logo"
            width={384}
            height={205}
            className="w-[86px] object-contain lg:w-[96px]"
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <ul className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-1 overflow-visible font-outfit [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>li]:shrink-0 h-full lg:flex lg:flex-nowrap lg:gap-4 xl:gap-7 pr-4">
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link prefetch={false} href="/" onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link prefetch={false} href={authority.about} onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>

          <li 
            className="flex items-center md:h-full"
            onMouseEnter={() => setActiveMenu('schools')}
          >
            <Link prefetch={false}
              href={authority.schools}
              onClick={closeMenu}
              aria-label="Academic Schools Mega Menu"
              className={`whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] cursor-pointer transition-all flex items-center gap-1.5 py-2 md:gap-2 md:py-4 ${isSchoolsOpen ? "text-[#ffaf3a]" : "text-white/90 hover:text-[#ffaf3a]"}`}
            >
              Schools
              <span className={`text-[10px] transition-transform duration-300 ${isSchoolsOpen ? "rotate-180" : ""}`}>▼</span>
            </Link>

            {isSchoolsOpen && (
              <SchoolsMegaMenu
                activeSchoolSlug={activeSchoolSlug}
                setActiveSchoolSlug={setActiveSchoolSlug}
                academicStructureHref={authority.academicStructure}
                prefetchPath={prefetchPath}
                closeMenu={closeMenu}
                onMouseLeave={() => setActiveMenu(null)}
              />
            )}
          </li>

          <li 
            className="flex items-center md:h-full"
            onMouseEnter={() => setActiveMenu('admissions')}
          >
            <Link prefetch={false}
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
                    <Link prefetch={false} 
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
                          <Link prefetch={false} 
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
                          <Link prefetch={false} 
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
            <Link prefetch={false} href="/careers" onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Careers
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link prefetch={false} href="/search" onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Search
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link prefetch={false} href={authority.contact} onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>

          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link prefetch={false} href={authority.campus360} onClick={closeMenu} className="whitespace-nowrap text-[10px] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.08em] lg:tracking-[0.14em] xl:tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
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
