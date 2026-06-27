import React from "react";
import type { Metadata } from "next";
import { FaMoneyBillWave, FaPercentage } from "react-icons/fa";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Fee & Refund Policy | Stmarys University",
  description: "Official Fee and Refund regulations of Stmarys University, Hyderabad, structured in compliance with UGC prescribed refund tiers.",
  alternates: {
    canonical: "https://smru.edu.in/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <StructuredData
        id="refund-policy-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Refund Policy", path: "/refund-policy" },
        ])}
      />
      <StructuredData
        id="refund-policy-webpage-schema"
        data={buildWebPageSchema({
          title: "Fee & Refund Policy | Stmarys University",
          description: "Official Fee and Refund regulations of Stmarys University, Hyderabad, structured in compliance with UGC prescribed refund tiers.",
          pathname: "/refund-policy",
        })}
      />
      <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
        <section className="relative pt-24 pb-16 md:pt-32 px-6">
          <div className="smru-container relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-3 border border-[#0d315c]/10 bg-white/80 backdrop-blur-md px-5 py-2.5 cut-corner-badge shadow-sm">
              <FaMoneyBillWave className="text-[#019e6e]" size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0d315c]/60">Financial Policies</span>
            </div>
            <h1 className="smru-h1 max-w-4xl mx-auto mb-6">
              Fee & <span className="text-[#019e6e]">Refund Policy</span>
            </h1>
            <div className="w-20 h-1.5 bg-[#ffaf3a] cut-corner-underline mx-auto mb-8" />
          </div>
        </section>

        <section className="smru-section bg-white border-y border-[#d8e8fb] pt-8">
          <div className="smru-container max-w-4xl">
            <div className="prose prose-slate max-w-none prose-headings:text-[#0d315c] prose-a:text-[#019e6e]">
              <p className="text-lg font-medium text-slate-600 mb-8 text-center max-w-3xl mx-auto">
                Stmarys University follows a transparent fee and refund policy structured in accordance with the guidelines prescribed by the University Grants Commission (UGC) for higher educational institutions.
              </p>

              <div className="p-8 border border-[#d8e8fb] bg-[#f8fbff] cut-corner-panel mb-10">
                <h3 className="text-xl font-black text-[#0d315c] mb-6 flex items-center gap-3">
                  <FaPercentage className="text-[#ffaf3a]" /> UGC Prescribed Refund Tiers
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead>
                      <tr className="bg-[#0d315c] text-white">
                        <th className="p-4 font-bold text-sm">Percentage of Refund</th>
                        <th className="p-4 font-bold text-sm">Point of time when notice of withdrawal of admission is received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef4fb]">
                      <tr>
                        <td className="p-4 font-bold text-[#019e6e]">100%*</td>
                        <td className="p-4 text-sm text-slate-600">15 days or more before the formally-notified last date of admission.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-700">90%</td>
                        <td className="p-4 text-sm text-slate-600">Less than 15 days before the formally-notified last date of admission.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-700">80%</td>
                        <td className="p-4 text-sm text-slate-600">15 days or less after the formally-notified last date of admission.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-700">50%</td>
                        <td className="p-4 text-sm text-slate-600">30 days or less, but more than 15 days, after formally-notified last date of admission.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-400">0%</td>
                        <td className="p-4 text-sm text-slate-600">More than 30 days after formally-notified last date of admission.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-4 italic">
                  * Note: In case of a 100% refund, the University may deduct processing charges not more than 5% of the fees paid, subject to a maximum of Rs. 5,000/- as per UGC guidelines.
                </p>
              </div>

              <div className="p-8 border border-[#d8e8fb] bg-white cut-corner-panel shadow-sm">
                <h3 className="text-lg font-black text-[#0d315c] mb-4 border-b border-[#eef4fb] pb-4">Refund Process</h3>
                <ul className="list-disc pl-5 space-y-3 text-slate-600 font-medium text-sm">
                  <li>All applications for refund must be submitted in writing to the Registrar&apos;s Office in the prescribed format.</li>
                  <li>Refunds will be processed within 15 working days from the date of receiving the complete written application.</li>
                  <li>All refunds will be transferred electronically to the original source of payment or the student/parent&apos;s verified bank account.</li>
                  <li>Application/Registration fees are non-refundable under all circumstances.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
