import React from "react";
import type { Metadata } from "next";
import { FaBan, FaPhoneAlt, FaEnvelope, FaExclamationTriangle } from "react-icons/fa";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Anti-Ragging Policy & Committee | Stmarys University",
  description: "Official Anti-Ragging regulations, Zero Tolerance policy, helpline contacts, and committee information for Stmarys University.",
  alternates: {
    canonical: "https://smru.edu.in/anti-ragging",
  },
};

export default function AntiRaggingPage() {
  return (
    <>
      <StructuredData
        id="anti-ragging-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Anti-Ragging Cell", path: "/anti-ragging" },
        ])}
      />
      <StructuredData
        id="anti-ragging-webpage-schema"
        data={buildWebPageSchema({
          title: "Anti-Ragging Policy & Committee | Stmarys University",
          description: "Official Anti-Ragging regulations, Zero Tolerance policy, helpline contacts, and committee information for Stmarys University.",
          pathname: "/anti-ragging",
        })}
      />
      <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
        <section className="relative pt-24 pb-16 md:pt-32 px-6 overflow-hidden">
          <div className="smru-container relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 inline-flex items-center gap-3 border border-red-200 bg-red-50 px-5 py-2.5 cut-corner-badge shadow-sm">
                <FaBan className="text-red-600" size={16} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-800">Zero Tolerance Policy</span>
              </div>

              <h1 className="smru-h1 max-w-4xl mb-6">
                Anti-<span className="text-red-600">Ragging</span> Cell
              </h1>
              <div className="w-20 h-1.5 bg-red-600 cut-corner-underline mb-8" />
              
              <p className="max-w-2xl text-slate-600 font-medium text-lg leading-relaxed mb-10">
                Stmarys University enforces a strict ZERO TOLERANCE policy against ragging in accordance with the UGC Regulations. Ragging is a criminal offense and will be dealt with utmost severity.
              </p>
            </div>
          </div>
        </section>

        <section className="smru-section bg-white border-y border-[#d8e8fb]">
          <div className="smru-container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-8 border border-red-100 bg-red-50 cut-corner-panel">
                  <h3 className="text-lg font-black text-red-800 mb-4 flex items-center gap-2">
                    <FaExclamationTriangle /> Report an Incident
                  </h3>
                  <p className="text-sm font-medium text-red-900/80 mb-6">
                    If you or someone you know is facing ragging, immediately contact the Anti-Ragging Cell or use the National Helpline. Your identity will be kept strictly confidential.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-md border border-red-100">
                      <FaPhoneAlt className="text-red-600" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">UGC National Helpline (Toll Free)</p>
                        <p className="font-bold text-red-700">1800-180-5522</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-md border border-red-100">
                      <FaEnvelope className="text-red-600" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">UGC Anti-Ragging Email</p>
                        <p className="font-bold text-red-700">helpline@antiragging.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-md border border-red-100">
                      <FaEnvelope className="text-[#0d315c]" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">University Campus Cell</p>
                        <p className="font-bold text-[#0d315c]">antiragging@smru.edu.in</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 border border-[#d8e8fb] bg-white cut-corner-panel">
                  <h3 className="text-lg font-black text-[#0d315c] mb-4">Mandatory Affidavits</h3>
                  <p className="text-sm font-medium text-slate-600 mb-6">
                    It is mandatory for all students and their parents/guardians to submit an Anti-Ragging Undertaking at the time of admission.
                  </p>
                  <a href="https://www.antiragging.in/affidavit_registration_disclaimer.html" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-[#0d315c] text-white text-xs font-black uppercase tracking-widest cut-corner-badge hover:bg-[#019e6e] transition-colors">
                    Fill UGC Affidavit Online
                  </a>
                </div>
              </div>

              <div className="p-8 bg-[#f8fbff] border border-[#d8e8fb] cut-corner-panel">
                <h3 className="text-xl font-black text-[#0d315c] mb-6">What Constitutes Ragging?</h3>
                <ul className="space-y-4 text-sm font-medium text-slate-700">
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    Any conduct by a student or students whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    Indulging in rowdy or indisciplined activities which causes or is likely to cause annoyance, hardship, physical or psychological harm.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    Asking any student to do any act which such student will not in the ordinary course do and which has the effect of causing or generating a sense of shame, or torment or embarrassment.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    Any act of physical abuse including all variants of it: sexual abuse, homosexual assaults, stripping, forcing obscene and lewd acts, gestures.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
