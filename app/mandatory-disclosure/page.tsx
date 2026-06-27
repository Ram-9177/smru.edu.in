import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { FaFileAlt, FaUniversity, FaUserTie, FaMoneyCheckAlt, FaBookOpen, FaDownload } from "react-icons/fa";
import UniversitySectionHeader from "@/components/UniversitySectionHeader";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Mandatory Disclosure | Stmarys University",
  description: "Official public mandatory self-disclosure portal of Stmarys University, Hyderabad, Telangana, maintaining institutional compliance with the UGC Regulations.",
  alternates: {
    canonical: "https://smru.edu.in/mandatory-disclosure",
  },
};

export default function MandatoryDisclosure() {
  const disclosures = [
    {
      title: "Statutory Approvals & Recognitions",
      icon: FaUniversity,
      items: [
        { name: "Act & Statutes", status: "Published", link: "/approvals-recognitions" },
        { name: "UGC 2(f) Status", status: "Published", link: "/approvals-recognitions" },
        { name: "Professional Council Approvals", status: "Official verification route", link: "/approvals-recognitions" },
      ]
    },
    {
      title: "Governance & Administration",
      icon: FaUserTie,
      items: [
        { name: "Vice-Chancellor", status: "Published", link: "/leadership/vice-chancellor" },
        { name: "Registrar", status: "Published", link: "/contact" },
        { name: "Finance Officer", status: "Published", link: "/contact" },
      ]
    },
    {
      title: "Financial Disclosures",
      icon: FaMoneyCheckAlt,
      items: [
        { name: "Annual Report 2025-26", status: "Awaiting First Cycle", link: "/under-update" },
        { name: "Audited Financial Statements", status: "Awaiting First Cycle", link: "/under-update" },
      ]
    },
    {
      title: "Academic Policies",
      icon: FaBookOpen,
      items: [
        { name: "Admission Policy", status: "Published", link: "/admission-policy" },
        { name: "Fee & Refund Policy", status: "Published", link: "/refund-policy" },
        { name: "Academic Calendar", status: "Office Request", link: "/contact" },
      ]
    }
  ];

  return (
    <>
      <StructuredData
        id="mandatory-disclosure-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mandatory Disclosure", path: "/mandatory-disclosure" },
        ])}
      />
      <StructuredData
        id="mandatory-disclosure-webpage-schema"
        data={buildWebPageSchema({
          title: "Mandatory Disclosure | Stmarys University",
          description: "Official public mandatory self-disclosure portal of Stmarys University, Hyderabad, Telangana, maintaining institutional compliance with the UGC Regulations.",
          pathname: "/mandatory-disclosure",
        })}
      />
      <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(1,158,110,0.08)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(13,49,92,0.1)_0,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0d315c 1px, transparent 1px), linear-gradient(90deg, #0d315c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="smru-container relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 inline-flex items-center gap-3 border border-[#0d315c]/10 bg-white/80 backdrop-blur-md px-5 py-2.5 cut-corner-badge shadow-sm animate-fade-in">
                <FaFileAlt className="text-[#019e6e]" size={16} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0d315c]/60">UGC Compliance</span>
              </div>

              <h1 className="smru-h1 max-w-4xl mb-6">
                Mandatory <span className="text-[#019e6e]">Disclosure</span>
              </h1>

              <div className="w-20 h-1.5 bg-[#ffaf3a] cut-corner-underline mb-8" />

              <p className="max-w-2xl text-slate-600 font-medium text-lg leading-relaxed mb-10">
                In accordance with the University Grants Commission (UGC) Guidelines on Public Self-Disclosure, Stmarys University maintains this portal to ensure transparency, accountability, and unrestricted access to institutional records for our stakeholders.
              </p>
            </div>
          </div>
        </section>

        {/* Disclosures Section */}
        <section className="smru-section bg-white border-y border-[#d8e8fb]">
          <div className="smru-container">
            <UniversitySectionHeader title="Public Records Dashboard" align="center" className="mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {disclosures.map((section, idx) => (
                <div key={idx} className="p-8 bg-[#f8fbff] border border-[#d8e8fb] cut-corner-panel shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#d8e8fb]">
                    <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#d8e8fb] cut-corner-badge">
                      <section.icon className="text-[#0d315c] text-xl" />
                    </div>
                    <h3 className="text-xl font-black text-[#0d315c]">{section.title}</h3>
                  </div>

                  <ul className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white border border-[#eef4fb] rounded-lg">
                        <span className="font-bold text-slate-700">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                            item.status === 'Published' ? 'bg-green-100 text-green-700' :
                            item.status === 'Office Request' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status}
                          </span>
                          {item.link !== '#' && (
                            <Link href={item.link} className="text-[#019e6e] hover:text-[#0d315c] transition-colors">
                              <FaDownload size={14} />
                            </Link>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[#0d315c] text-white cut-corner-panel text-center">
              <p className="text-sm font-medium leading-relaxed opacity-90">
                <strong>Note for First Year cycle:</strong> Certain administrative and financial records (such as the Annual Report and Audited Financial Statements) will be published upon the completion of the university&apos;s first financial year, in accordance with statutory timelines.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
