// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { 
  FaUserGraduate, FaBrain, FaArrowRight, FaAward, FaBuilding, 
  FaCheckCircle, FaFileAlt, FaUserCheck, FaUniversity, FaShieldAlt 
} from "react-icons/fa";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import TrustBand from "../components/TrustBand";
import { BigNumberGrid } from "../components/InfographicSections";
import { FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { ADMISSIONS_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import { ADMISSIONS_CONTENT_LAST_UPDATED } from "@/lib/shared/site-constants";

export default function Admissions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-outfit text-[#0d315c] overflow-x-hidden">
      
      {/* ================= HERO ================= */}
      <section className="relative pt-14 pb-12 md:pt-24 md:pb-16 text-center overflow-hidden">
        {/* Cinematic Asset Wash */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-white to-[#f8fafc]" />
           <img
             src={resolveAssetSrc(abstractHeroBg)}
             alt="Abstract Background"
             className="absolute inset-0 h-full w-full object-cover opacity-[0.03] scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#f8fafc]" />
        </div>
 
        <div className="smru-container relative z-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 cut-corner-badge bg-[#019e6e]/10 border border-[#019e6e]/20 mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="w-2 h-2 rounded-full bg-[#019e6e] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#019e6e]">Enrollment Cycle 2026-27</span>
          </div>
 
          <h1 className="smru-h1 mb-8">
            Admissions <br />
            <span className="text-[#019e6e]">Gateway</span>
          </h1>
 
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { label: "UGC Status", icon: <FaUniversity /> },
              { label: "Statutory Frameworks", icon: <img src="/assets/Stmarys-Logo.webp" className="w-4 h-4 object-contain" alt="Statutory" /> },
              { label: "Educational Legacy", icon: <FaAward /> },
            ].map(pill => (
              <div key={pill.label} className="px-6 py-2 bg-white border border-slate-100 cut-corner-badge shadow-sm flex items-center gap-3 hover:border-[#ffaf3a] transition-colors">
                 <span className="text-[#ffaf3a]">{pill.icon}</span>
                 <span className="text-[11px] font-black uppercase tracking-widest">{pill.label}</span>
              </div>
            ))}
          </div>
 
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-600 font-medium leading-relaxed md:text-center">
            Backed by St. Mary’s educational legacy and UGC 2(f) recognized university status, our admissions team helps students and parents understand programmes, eligibility, applications, scholarships, and official university information before applying.
          </p>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
            Last updated: {ADMISSIONS_CONTENT_LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ================= ADMISSION PATHS ================= */}
      <section className="scroll-mt-24 smru-section relative z-10">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Choose Your Admission Path"
            subtitle="Select the entry route tailored to your career aspirations."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 md:mt-20">
            
            {/* PATH 1: UG/PG */}
            <div className="group relative bg-white border border-slate-100 cut-corner-panel shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 sm:p-8 lg:p-12 overflow-hidden hover:shadow-2xl transition-all duration-500">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#019e6e]/5 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover:scale-125" />
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#019e6e] text-white flex items-center justify-center text-3xl cut-corner-badge shadow-xl mb-10 group-hover:rotate-12 transition-transform">
                     <FaUserGraduate />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#019e6e] text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Admissions Now Open
                  </div>
                  <h3 className="text-[clamp(1.8rem,6vw,2.25rem)] font-black uppercase tracking-tighter text-[#0d315c] mb-6">UG, PG & <br />Specialized Diploma</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
                    Explore Bachelor’s, Master’s, and specialized diploma pathways across allied health, nursing, psychology, rehabilitation, law, and emerging professional fields.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                     {['Full Time', 'Clinical Labs', 'Industry Ready'].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 cut-corner-badge">{tag}</span>
                     ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <a 
                      href="https://apply.smru.edu.in" 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-5 bg-[#0d315c] text-white font-black uppercase tracking-[0.2em] text-xs cut-corner-badge hover:bg-[#019e6e] transition-all"
                    >
                      Start Application <FaArrowRight className="ml-3" />
                    </a>
                    <Link 
                      href="/schools"
                      className="flex items-center justify-center w-full py-5 bg-white border border-slate-200 text-[#0d315c] font-black uppercase tracking-[0.2em] text-xs cut-corner-badge hover:bg-slate-50 transition-all"
                    >
                      Explore Programmes
                    </Link>
                  </div>
               </div>
            </div>

            {/* PATH 2: DOCTORAL */}
            <div className="group relative bg-[#0d315c] border border-white/5 cut-corner-panel shadow-[0_30px_60px_rgba(13,49,92,0.15)] p-6 sm:p-8 lg:p-12 overflow-hidden hover:shadow-2xl transition-all duration-500">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffaf3a]/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover:scale-125" />
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#ffaf3a] text-[#0d315c] flex items-center justify-center text-3xl cut-corner-badge shadow-xl mb-10 group-hover:-rotate-12 transition-transform">
                     <FaBrain />
                  </div>
                  <h3 className="text-[clamp(1.8rem,6vw,2.25rem)] font-black uppercase tracking-tighter text-white mb-6">Doctoral Research <br />(Ph.D. / M.Phil.)</h3>
                  <p className="text-white/60 font-medium leading-relaxed mb-10 max-w-sm">
                    Doctoral research pathways for rehabilitation, healthcare, psychology, nursing, technology, management, and interdisciplinary academic work.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                     {['Fellowships', 'NEP 2020', 'Research Labs'].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 cut-corner-badge">{tag}</span>
                     ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link 
                      href="/phd-admissions"
                      className="flex items-center justify-center w-full py-5 bg-[#ffaf3a] text-[#0d315c] font-black uppercase tracking-[0.2em] text-xs cut-corner-badge hover:bg-white transition-all"
                    >
                      View PhD Status <FaArrowRight className="ml-3" />
                    </Link>
                    <Link 
                      href="/contact"
                      className="flex items-center justify-center w-full py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs cut-corner-badge hover:bg-white/10 transition-all"
                    >
                      Talk to Admissions
                    </Link>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= APPLICATION JOURNEY ================= */}
      <section className="scroll-mt-24 smru-section bg-white">
        <div className="smru-container">
           <UniversitySectionHeader 
             title="The Admission Journey" 
             subtitle="A clear, institutional route from your first enquiry to official enrollment."
             align="center"
           />
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-20 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-slate-100 z-0" />
              
              {[
                { step: "01", title: "Select Track", icon: <FaUserCheck />, desc: "Choose your UG, PG, or Ph.D. route based on eligibility." },
                { step: "02", title: "Apply Online", icon: <FaFileAlt />, desc: "Submit your academic credentials via our digital portal." },
                { step: "03", title: "Counselling Review", icon: <FaAward />, desc: "Admissions counsellors help verify eligibility, fit, and available next steps." },
                { step: "04", title: "Enroll", icon: <FaCheckCircle />, desc: "Confirm your seat and begin your professional journey." }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-6 group">
                   <div className="w-24 h-24 bg-[#f8fafc] border-2 border-slate-100 cut-corner-panel flex items-center justify-center text-3xl text-[#0d315c] shadow-sm group-hover:border-[#ffaf3a] group-hover:bg-white transition-all duration-500">
                      {item.icon}
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#ffaf3a]">Step {item.step}</p>
                      <h3 className="text-xl font-black uppercase tracking-tighter">{item.title}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ================= TRUST STRIP & DISCLAIMER ================= */}
      <section className="scroll-mt-24 smru-section bg-slate-50 border-t border-slate-200">
         <div className="smru-container flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-[#0d315c] mb-6 p-3 overflow-hidden">
              <img src="/assets/Stmarys-Logo.webp" alt="Stmarys University Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0d315c] mb-6">
              Institutional Trust & Recognition
            </h2>
            <p className="text-slate-600 font-medium max-w-2xl leading-relaxed mb-10 text-lg">
              Students and parents can review Stmarys University’s official establishment and UGC recognition documents before applying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full md:w-auto px-4">
              <a 
                href="/assets/St.%20Marys%20Rehabilitation%20University%20UGC%20recognition%20letter%202(f).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#0d315c] text-white rounded-xl font-black uppercase tracking-[0.15em] text-[11px] hover:bg-[#019e6e] transition-all shadow-md"
              >
                View UGC Recognition Letter
              </a>
              <a 
                href="/assets/SMRU%20Act%2010%20of%202026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white border border-[#0d315c] text-[#0d315c] rounded-xl font-black uppercase tracking-[0.15em] text-[11px] hover:bg-slate-50 transition-all shadow-sm"
              >
                View Establishment Act
              </a>
              <Link 
                href="/approvals-recognitions"
                className="px-8 py-4 bg-transparent border border-transparent text-[#019e6e] underline rounded-xl font-black uppercase tracking-[0.15em] text-[11px] hover:text-[#0d315c] transition-all"
              >
                Approvals & Recognitions
              </Link>
            </div>
            
            <div className="mt-12 md:mt-16 max-w-3xl w-full bg-white border border-[#ffaf3a]/30 p-6 sm:p-10 rounded-xl shadow-sm">
              <p className="text-slate-600 font-medium text-sm leading-relaxed flex flex-col md:flex-row items-center justify-center gap-6">
                <span className="w-12 h-12 bg-[#ffaf3a]/10 text-[#ffaf3a] rounded-full flex items-center justify-center shrink-0">
                  <FaFileAlt size={20} />
                </span>
                <span className="text-left">
                  Confirm current fee components, intake, and scholarship eligibility through the official admissions counselling route before payment.
                </span>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="px-8 py-3.5 bg-[#ffaf3a] text-[#0d315c] rounded-lg font-black uppercase tracking-wider text-[11px] hover:bg-[#e09930] transition-colors shadow-md">
                  Talk to Admissions
                </Link>
              </div>
            </div>
         </div>
      </section>

      {/* ================= FAQS ================= */}
      {SHOW_PUBLIC_SEO_SECTIONS && (
        <section className="scroll-mt-24 smru-section bg-white border-y border-slate-100">
          <div className="smru-container max-w-4xl">
            <FaqSection title="Admissions FAQ" items={ADMISSIONS_FAQS} />
          </div>
        </section>
      )}

      {/* ================= GLOBAL TRUST ================= */}
      <section className="smru-section bg-white">
        <div className="smru-container">
           <TrustBand 
             items={[
               { icon: <FaBuilding className="text-[#ffaf3a]" />, text: "120-Acre Campus" },
               { icon: <FaAward className="text-[#ffaf3a]" />, text: "Educational Legacy" },
               { icon: <FaUserGraduate className="text-[#ffaf3a]" />, text: "Professional Education" },
             ]}
           />
        </div>
      </section>

    </div>
  );
}
