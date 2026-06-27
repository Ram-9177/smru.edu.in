import React from "react";
import type { Metadata } from "next";
import { FaCertificate, FaTasks, FaChartLine, FaUsers } from "react-icons/fa";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "IQAC & Quality Assurance | Stmarys University",
  description: "Official portal of the Internal Quality Assurance Cell (IQAC) at Stmarys University, managing quality standards and NAAC compliance.",
  alternates: {
    canonical: "https://smru.edu.in/iqac-quality-assurance",
  },
};

export default function IQACPage() {
  return (
    <>
      <StructuredData
        id="iqac-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "IQAC Quality Assurance", path: "/iqac-quality-assurance" },
        ])}
      />
      <StructuredData
        id="iqac-webpage-schema"
        data={buildWebPageSchema({
          title: "IQAC & Quality Assurance | Stmarys University",
          description: "Official portal of the Internal Quality Assurance Cell (IQAC) at Stmarys University, managing quality standards and NAAC compliance.",
          pathname: "/iqac-quality-assurance",
        })}
      />
      <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(1,158,110,0.08)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(13,49,92,0.1)_0,transparent_50%)]" />
          </div>

          <div className="smru-container relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-3 border border-[#0d315c]/10 bg-white/80 backdrop-blur-md px-5 py-2.5 cut-corner-badge shadow-sm">
              <FaCertificate className="text-[#019e6e]" size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0d315c]/60">NAAC Compliance</span>
            </div>

            <h1 className="smru-h1 max-w-4xl mx-auto mb-6">
              Internal Quality <span className="text-[#019e6e]">Assurance Cell</span> (IQAC)
            </h1>

            <div className="w-20 h-1.5 bg-[#ffaf3a] cut-corner-underline mx-auto mb-8" />

            <p className="max-w-2xl mx-auto text-slate-600 font-medium text-lg leading-relaxed mb-10">
              The Internal Quality Assurance Cell (IQAC) at Stmarys Rehabilitation University is established to develop a system for conscious, consistent, and catalytic improvement in the overall performance of the institution.
            </p>
          </div>
        </section>

        <section className="smru-section bg-white border-y border-[#d8e8fb]">
          <div className="smru-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: FaTasks, title: "Quality Benchmarks", desc: "Setting parameters for various academic and administrative activities of the institution." },
                { icon: FaUsers, title: "Stakeholder Feedback", desc: "Collecting and analyzing responses from students, parents, and alumni on quality-related institutional processes." },
                { icon: FaChartLine, title: "Annual Reports (AQAR)", desc: "Preparing the Annual Quality Assurance Report as per NAAC guidelines for future submission." }
              ].map((feature, i) => (
                <div key={i} className="p-8 border border-[#d8e8fb] cut-corner-panel bg-[#f8fbff] text-center hover:shadow-md transition-shadow">
                  <feature.icon className="mx-auto text-[#0d315c] mb-4 text-3xl" />
                  <h3 className="text-lg font-black text-[#0d315c] mb-3">{feature.title}</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-8 border border-[#d8e8fb] bg-white cut-corner-panel shadow-sm">
              <h3 className="text-xl font-black text-[#0d315c] mb-6 border-b border-[#eef4fb] pb-4">IQAC Documentation Repository</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#f8fbff] border border-[#eef4fb] flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-[#0d315c]">IQAC Formation & Mandate</h4>
                    <p className="text-xs text-slate-500 mt-1">Official constitution of the IQAC committee</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-green-100 text-green-700 rounded">Available</span>
                </div>
                
                <div className="p-4 bg-white border border-[#eef4fb] flex justify-between items-center opacity-70">
                  <div>
                    <h4 className="font-bold text-slate-500">AQAR 2025-26</h4>
                    <p className="text-xs text-slate-400 mt-1">Annual Quality Assurance Report</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-amber-100 text-amber-700 rounded">Awaiting Cycle Completion</span>
                </div>

                <div className="p-4 bg-white border border-[#eef4fb] flex justify-between items-center opacity-70">
                  <div>
                    <h4 className="font-bold text-slate-500">Meeting Minutes</h4>
                    <p className="text-xs text-slate-400 mt-1">First quarter proceedings</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-amber-100 text-amber-700 rounded">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
