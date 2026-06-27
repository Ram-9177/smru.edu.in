import React from "react";
import type { Metadata } from "next";
import { FaUserShield, FaBalanceScale, FaEnvelopeOpenText } from "react-icons/fa";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Grievance Redressal Cell | Stmarys University",
  description: "Official Grievance Redressal Cell and feedback mechanism at Stmarys University, complying with UGC regulations.",
  alternates: {
    canonical: "https://smru.edu.in/grievance-redressal",
  },
};

export default function GrievanceRedressalPage() {
  return (
    <>
      <StructuredData
        id="grievance-redressal-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Grievance Redressal Cell", path: "/grievance-redressal" },
        ])}
      />
      <StructuredData
        id="grievance-redressal-webpage-schema"
        data={buildWebPageSchema({
          title: "Grievance Redressal Cell | Stmarys University",
          description: "Official Grievance Redressal Cell and feedback mechanism at Stmarys University, complying with UGC regulations.",
          pathname: "/grievance-redressal",
        })}
      />
      <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
        <section className="relative pt-24 pb-16 md:pt-32 px-6 overflow-hidden">
          <div className="smru-container relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-3 border border-[#0d315c]/10 bg-white/80 backdrop-blur-md px-5 py-2.5 cut-corner-badge shadow-sm">
              <FaUserShield className="text-[#019e6e]" size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0d315c]/60">Student Support</span>
            </div>

            <h1 className="smru-h1 max-w-4xl mx-auto mb-6">
              Grievance <span className="text-[#019e6e]">Redressal</span> Cell
            </h1>
            <div className="w-20 h-1.5 bg-[#ffaf3a] cut-corner-underline mx-auto mb-8" />
            
            <p className="max-w-2xl mx-auto text-slate-600 font-medium text-lg leading-relaxed mb-10">
              The Grievance Redressal mechanism at Stmarys Rehabilitation University is established to ensure a fair, impartial, and consistent mechanism for redressal of various issues faced by students, staff, and faculty.
            </p>
          </div>
        </section>

        <section className="smru-section bg-white border-y border-[#d8e8fb]">
          <div className="smru-container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 border border-[#d8e8fb] bg-[#f8fbff] cut-corner-panel text-center">
                <FaBalanceScale className="mx-auto text-[#0d315c] text-3xl mb-4" />
                <h3 className="text-xl font-black text-[#0d315c] mb-3">Internal Redressal</h3>
                <p className="text-sm font-medium text-slate-600 mb-6">
                  Students and staff are encouraged to first approach the University&apos;s Internal Grievance Redressal Committee (IGRC) for prompt resolution.
                </p>
                <div className="inline-block px-4 py-2 bg-white border border-[#d8e8fb] rounded text-sm font-bold text-[#0d315c]">
                  Email: grievances@smru.edu.in
                </div>
              </div>

              <div className="p-8 border border-[#d8e8fb] bg-[#f8fbff] cut-corner-panel text-center">
                <FaEnvelopeOpenText className="mx-auto text-[#019e6e] text-3xl mb-4" />
                <h3 className="text-xl font-black text-[#0d315c] mb-3">UGC e-Samadhaan</h3>
                <p className="text-sm font-medium text-slate-600 mb-6">
                  For escalations, the University complies with the UGC e-Samadhaan portal, a unified platform for tracking and resolving grievances.
                </p>
                <a href="https://samadhaan.ugc.ac.in/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-[#0d315c] text-white text-xs font-black uppercase tracking-widest cut-corner-badge hover:bg-[#019e6e] transition-colors">
                  Visit e-Samadhaan
                </a>
              </div>
            </div>

            <div className="p-8 border border-[#d8e8fb] bg-white cut-corner-panel shadow-sm">
              <h3 className="text-lg font-black text-[#0d315c] mb-4 border-b border-[#eef4fb] pb-4">Scope of Grievances</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                <li className="flex items-start gap-2"><span className="text-[#019e6e]">✓</span> Academic matters (Classes, exams, marks)</li>
                <li className="flex items-start gap-2"><span className="text-[#019e6e]">✓</span> Financial matters (Fee disputes, refunds)</li>
                <li className="flex items-start gap-2"><span className="text-[#019e6e]">✓</span> Administrative matters (ID cards, certificates)</li>
                <li className="flex items-start gap-2"><span className="text-[#019e6e]">✓</span> Infrastructure & Amenities (Hostel, library, transport)</li>
                <li className="flex items-start gap-2"><span className="text-[#019e6e]">✓</span> Harassment & Discrimination</li>
                <li className="flex items-start gap-2"><span className="text-[#019e6e]">✓</span> Matters regarding Internal Complaints Committee (ICC)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
