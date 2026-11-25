"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { FaLayerGroup } from "@/components/icons";
import { getAcademicSchools } from "@/lib/developer/academic-schools";
import { useCmsState } from "@/lib/developer/useCmsState";
import { detectProgramCategory, safeSlug } from "@/lib/shared/program-utils";

type SchoolsMegaMenuProps = {
  activeSchoolSlug: string;
  setActiveSchoolSlug: (slug: string) => void;
  academicStructureHref: string;
  prefetchPath: (path: string) => void;
  closeMenu: () => void;
  onMouseLeave: () => void;
};

// The desktop Schools menu: every school with its programmes by level. Loaded on demand by Navbar.
export default function SchoolsMegaMenu({
  activeSchoolSlug,
  setActiveSchoolSlug,
  academicStructureHref,
  prefetchPath,
  closeMenu,
  onMouseLeave,
}: SchoolsMegaMenuProps) {
  const { state } = useCmsState({ useOverlay: true });
  const schools = useMemo(() => getAcademicSchools(state).filter((s) => s.visibility !== "hidden"), [state]);
  const activeSchool = schools.find((s) => s.slug === activeSchoolSlug) || schools[0];
  const activeSlug = safeSlug(activeSchool?.slug, activeSchool?.name);

  useEffect(() => {
    if (activeSlug) prefetchPath(`/schools/${activeSlug}`);
  }, [activeSlug, prefetchPath]);

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

  return (
    <div 
      className="fixed top-[104px] lg:top-[116px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 cut-corner-panel overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onMouseLeave}
    >
      <div className="w-[300px] shrink-0 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-slate-400 border-b border-slate-100 pb-2">Academic Units</h3>
        <div className="flex flex-col gap-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {schools.map((s) => {
              const sSlug = safeSlug(s.slug, s.name);
              const isActive = activeSlug === sSlug;
              return (
                <Link prefetch={false}
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
          <Link prefetch={false} 
            href={academicStructureHref}
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
                          <Link prefetch={false} 
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
          <Link prefetch={false} 
            href={`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}`}
            onClick={closeMenu}
            className="text-[#019e6e] font-black text-[13px] hover:gap-2 flex items-center gap-1.5 transition-all group"
          >
            View school dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
    
  );
}
