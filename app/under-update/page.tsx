"use client";

import React from "react";
import Link from "next/link";
import { FaLock, FaArrowLeft, FaClock } from "react-icons/fa";

export default function UnderUpdatePage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white flex flex-col justify-center items-center py-20 px-6">
      {/* Background Aesthetics */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[radial-gradient(at_50%_0%,rgba(13,49,92,0.05)_0,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] grayscale" style={{ backgroundImage: 'linear-gradient(#0d315c 1px, transparent 1px), linear-gradient(90deg, #0d315c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="p-10 md:p-14 bg-white border border-[#d8e8fb] cut-corner-panel shadow-[0_22px_44px_rgba(13,49,92,0.08)] text-center">
          
          <div className="w-20 h-20 mx-auto mb-8 bg-[#f8fbff] border border-[#eef4fb] flex items-center justify-center cut-corner-badge shadow-inner">
            <FaLock className="text-[#0d315c] text-3xl" />
          </div>

          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-[#ffaf3a]/10 border border-[#ffaf3a]/30 cut-corner-badge">
            <FaClock className="text-[#ffaf3a]" size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffaf3a]">Status: Under Update</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#0d315c] mb-6 uppercase tracking-tight">
            Document <span className="text-[#019e6e]">Not Ready</span>
          </h1>

          <p className="text-base font-medium leading-relaxed text-slate-600 mb-10 max-w-lg mx-auto">
            The requested page or document is currently marked as <strong className="text-[#0d315c]">Confidential</strong> or is <strong className="text-[#0d315c]">Under Update</strong>. Certain statutory disclosures, such as Annual Reports and Audited Financial Statements, will be made publicly available upon the completion of the university&apos;s first academic and financial cycle.
          </p>

          <div className="p-5 bg-[#f8fbff] border border-[#eef4fb] text-sm text-slate-500 font-medium mb-10 text-left rounded">
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#0d315c] mb-2">Why am I seeing this?</span>
            This route ensures compliance safety by preventing premature access to incomplete data or internal university records that are currently in the process of being published.
          </div>

          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0d315c] text-white text-[11px] font-black uppercase tracking-[0.2em] cut-corner-badge hover:bg-[#019e6e] hover:-translate-y-1 transition-all shadow-md hover:shadow-lg"
          >
            <FaArrowLeft /> Return to Homepage
          </Link>

        </div>
      </div>
    </div>
  );
}
