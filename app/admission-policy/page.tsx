import React from "react";
import type { Metadata } from "next";
import { FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Admission Regulations & Policy | Stmarys University",
  description: "Official Admission Policy and academic regulations of Stmarys University, Hyderabad, Telangana, in compliance with UGC guidelines.",
  alternates: {
    canonical: "https://smru.edu.in/admission-policy",
  },
};

export default function AdmissionPolicyPage() {
  return (
    <>
      <StructuredData
        id="admission-policy-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Admission Policy", path: "/admission-policy" },
        ])}
      />
      <StructuredData
        id="admission-policy-webpage-schema"
        data={buildWebPageSchema({
          title: "Admission Regulations & Policy | Stmarys University",
          description: "Official Admission Policy and academic regulations of Stmarys University, Hyderabad, Telangana, in compliance with UGC guidelines.",
          pathname: "/admission-policy",
        })}
      />
      <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
        <section className="relative pt-24 pb-16 md:pt-32 px-6">
          <div className="smru-container relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-3 border border-[#0d315c]/10 bg-white/80 backdrop-blur-md px-5 py-2.5 cut-corner-badge shadow-sm">
              <FaGraduationCap className="text-[#019e6e]" size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0d315c]/60">Academic Regulations</span>
            </div>
            <h1 className="smru-h1 max-w-4xl mx-auto mb-6">
              Admission <span className="text-[#019e6e]">Regulations</span>
            </h1>
            <div className="w-20 h-1.5 bg-[#ffaf3a] cut-corner-underline mx-auto mb-8" />
          </div>
        </section>

        <section className="smru-section bg-white border-y border-[#d8e8fb] pt-8">
          <div className="smru-container max-w-4xl">
            <div className="p-8 border border-[#d8e8fb] bg-white cut-corner-panel shadow-sm mb-10 text-slate-600 leading-relaxed font-medium">
              <p className="mb-6 text-center text-lg max-w-3xl mx-auto">
                Stmarys University follows a strictly merit-based, transparent admission process across all its programs. Our admission policies are fully compliant with the guidelines established by the University Grants Commission (UGC) and relevant statutory councils (such as the Rehabilitation Council of India, where applicable).
              </p>
              
              <h3 className="text-xl font-black text-[#0d315c] mt-10 mb-6 flex items-center gap-2 border-b border-[#eef4fb] pb-4">
                <FaCheckCircle className="text-[#019e6e]" size={20} /> General Guidelines
              </h3>
              <ul className="space-y-4">
                <li className="p-5 bg-[#f8fbff] border border-[#eef4fb] rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#0d315c] mb-2 text-lg">Merit-Based Selection</h4>
                  <p className="text-sm">Admissions to all professional and non-professional courses are granted solely on the basis of merit, determined either through marks obtained in the qualifying examination or a recognized entrance test.</p>
                </li>
                <li className="p-5 bg-[#f8fbff] border border-[#eef4fb] rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#0d315c] mb-2 text-lg">Reservation Policy</h4>
                  <p className="text-sm">The University adheres to the reservation policy as mandated by the State Government of Telangana and the Government of India for admissions into higher educational institutions.</p>
                </li>
                <li className="p-5 bg-[#f8fbff] border border-[#eef4fb] rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#0d315c] mb-2 text-lg">Eligibility Verification</h4>
                  <p className="text-sm">All admissions are provisional and subject to the physical verification of original documents, mark sheets, and eligibility certificates at the time of joining the campus.</p>
                </li>
                <li className="p-5 bg-[#f8fbff] border border-[#eef4fb] rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#0d315c] mb-2 text-lg">Foreign Nationals / NRI Admissions</h4>
                  <p className="text-sm">A specific quota is maintained for International and NRI students. Candidates under this category must meet equivalence standards set by the Association of Indian Universities (AIU).</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
