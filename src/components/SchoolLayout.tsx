"use client";
import React from "react";
import Link from "next/link";
import { schools } from "../data/schools";
import abstractHeroBg from "../assets/education-pattern.webp";
import { safeSlug } from "@/lib/shared/program-utils";
import { resolveAssetSrc } from "@/lib/shared/media";

export default function SchoolLayout({ 
  breadcrumbs = [], 
  title = "", 
  subtitle = "", 
  activeSchoolSlug = "", 
  sectionLabel = "",
  heading = "",
  children,
  onApply = null,
  partner = null
}) {
  const allSchools = (schools || []).map((s) => ({
    name: s.name,
    short: s.short || s.name,
    slug: safeSlug(s.slug, s.name)
  }));

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f7fc_0%,#eef3f9_100%)]">
      {/* ================= HERO ================= */}
      <section className="relative text-[#0d315c] pt-[130px] pb-12 md:pt-[160px] md:pb-20 px-4 sm:px-6 md:px-8 text-center overflow-hidden bg-[#f3f8ff]">
        {/* Subtle grid and glows texture */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(13,49,92,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,49,92,0.08)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(13,49,92,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Dynamic Multi-layered Brand Glows */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#ffaf3a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#019e6e]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Gradient line integration with content area */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0d315c]/10 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative z-20 px-4">
          <div className="mx-auto cut-corner-panel p-[1.5px] bg-gradient-to-br from-[#dbe8f8] via-[#e2eaf4] to-[#c4d7ec] shadow-[0_20px_50px_rgba(13,49,92,0.05)] hover:shadow-[0_24px_60px_rgba(13,49,92,0.09)] hover:scale-[1.01] transition-all duration-300">
            <div className="cut-corner-panel bg-white/85 backdrop-blur-md p-6 sm:p-8 md:p-12">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 mb-6 opacity-70">
                <Link href="/schools" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#019e6e] transition-colors">Schools</Link>
                {breadcrumbs.map((bc, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[11px] font-black text-[#6c819e] leading-none">/</span>
                    {bc.path ? (
                      <Link href={bc.path} className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#019e6e] transition-colors">{bc.label}</Link>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">{bc.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
              
              {partner && (
                <div className="mb-6 flex justify-center animate-in fade-in slide-in-from-top-4 duration-1000">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 cut-corner-badge bg-white/50 border border-white/85 shadow-[0_4px_12px_rgba(13,49,92,0.05)] backdrop-blur-md">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0d315c]/50">Institutional Partner</span>
                    <div className="h-3 w-px bg-[#0d315c]/10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#019e6e]">{partner.name}</span>
                  </div>
                </div>
              )}

              <h1 className={`font-black font-outfit mb-3 tracking-tight leading-[0.95] uppercase mx-auto max-w-[98%] text-[#0d315c] ${
                title.length > 40 
                  ? "text-[clamp(1.5rem,4.5vw,3rem)]" 
                  : title.length > 28
                    ? "text-[clamp(1.85rem,5.5vw,3.8rem)]"
                    : "text-[clamp(2.2rem,6.5vw,4.8rem)]"
              }`}>
                {title}
              </h1>
              <div className="mt-4 h-1.5 w-16 cut-corner-badge bg-[#ffaf3a] mx-auto mb-6 shadow-sm" />
              {subtitle && (
                <p className={`max-w-3xl mx-auto text-[#0d315c]/75 font-semibold leading-relaxed ${
                  subtitle.length > 80
                    ? "text-[14px] md:text-[1.05rem] normal-case tracking-normal opacity-90"
                    : "text-[13px] md:text-sm uppercase tracking-[0.4em]"
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 py-10 md:py-12">
        <div className="bg-[#fdfefe] cut-corner-panel shadow-[0_20px_44px_rgba(13,49,92,0.12)] border border-[#dbe6f3] overflow-hidden grid grid-cols-1 lg:grid-cols-[280px,1fr]">
          
          {/* Sidebar */}
          <aside className="relative overflow-hidden bg-[linear-gradient(180deg,#123d72_0%,#0d315c_100%)] p-8 text-white">
            {/* Sidebar premium textures */}
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
            <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.4em] mb-8">Schools</p>
            <ul className="space-y-2">
              {allSchools.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/schools/${s.slug}`}
                    className={`block px-4 py-3 cut-corner-badge text-xs font-bold transition-all ${
                      s.slug === activeSchoolSlug 
                        ? "bg-[#f7fbff] text-[#0d315c] shadow-[0_10px_24px_rgba(0,0,0,0.2)] translate-x-1" 
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Body */}
          <main className="relative p-5 sm:p-8 md:p-12 flex flex-col justify-between min-h-[420px] md:min-h-[500px] bg-[linear-gradient(180deg,#fbfdff_0%,#f7fbff_100%)] overflow-hidden">
            {/* Body subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(13,49,92,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,49,92,0.06)_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(13,49,92,0.08)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div>
               {sectionLabel && (
                 <div className="text-[11px] font-black text-[#1f9a79] uppercase tracking-[0.4em] mb-2">
                   {sectionLabel}
                 </div>
               )}
               {heading && (
                 <h2 className="text-2xl md:text-3xl font-black text-[#133f71] font-outfit mb-8">
                   {heading}
                 </h2>
               )}
               
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {children}
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-[#dce7f3] flex flex-wrap items-center justify-between gap-6">
               <Link href="/schools" className="text-sm font-black text-[#1f9a79] uppercase tracking-widest hover:underline">
                  ← All Schools
               </Link>
               {onApply && (
                 <button
                   onClick={onApply}
                   className="px-10 py-4 cut-corner-badge bg-[#1f9a79] text-white font-black uppercase tracking-widest text-[11px] shadow-[0_10px_24px_rgba(31,154,121,0.24)] hover:bg-[#1a8b6c] transition-all hover:scale-[1.02] active:scale-95"
                 >
                   Apply / Enquire
                 </button>
               )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
