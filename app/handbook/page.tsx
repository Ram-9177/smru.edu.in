import type { Metadata } from 'next';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: "Handbook | St. Mary's University",
  description: "View and download the official St. Mary's University Handbook.",
  pathname: "/handbook",
  keywords: ["St. Mary's University Handbook", "university handbook Hyderabad"],
});

export default function HandbookPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 md:p-12 relative font-sans">
      
      {/* Premium background accent */}
      <div className="absolute top-0 w-full h-[30vh] bg-gradient-to-b from-navy/5 to-transparent pointer-events-none z-0"></div>

      <div className="w-full max-w-3xl bg-white shadow-[0_20px_50px_rgba(13,49,92,0.08)] rounded-3xl overflow-hidden flex flex-col border border-gray-100 relative z-10">
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#0d315c 1px, transparent 1px), linear-gradient(90deg, #0d315c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-navy"></div>
        
        {/* Content Section */}
        <div className="px-8 py-16 md:px-20 md:py-20 flex flex-col items-center text-center relative z-10">
          
          {/* SMRU Logo */}
          <div className="mb-10 relative h-20 w-48">
            <Image
              src="/assets/Logo.webp"
              alt="St. Mary's University Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          
          {/* Typography */}
          <h1 className="text-3xl md:text-[40px] font-bold text-navy tracking-tight mb-5 leading-tight">
            University Handbook
          </h1>
          
          <div className="w-12 h-1 bg-accent mb-8 rounded-full"></div>
          
          <p className="text-[#475569] text-base md:text-lg font-light mb-12 max-w-lg leading-relaxed">
            The official and comprehensive guide for students and faculty. Review academic policies, campus resources, and student life guidelines.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
            <a
              href="/assets/handbook/HAND_BOOK.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy text-base font-semibold rounded-xl text-white bg-navy hover:bg-[#1c3c88] hover:border-[#1c3c88] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 gap-3 whitespace-nowrap group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Document
            </a>
            
            <a
              href="/assets/handbook/HAND_BOOK.pdf"
              download="SMRU_Handbook.pdf"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#e2e8f0] text-base font-semibold rounded-xl text-navy bg-white hover:bg-[#f8fafc] hover:border-[#cbd5e1] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 gap-3 whitespace-nowrap group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-90 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
          
        </div>
      </div>
    </main>
  );
}
