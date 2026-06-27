"use client";
import React from "react";
import Link from "next/link";
import { FaDownload, FaFilePdf, FaHome, FaArrowLeft } from "react-icons/fa";
import SEO from "../components/SEO";
import useOpenApply from "../hooks/useOpenApply";
import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";

export default function BrochureDownload() {
  const openApply = useOpenApply();
  const handleBrochureDownload = () => {
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = '/SMG-Flyer.pdf';
      link.download = "St_Marys_University_Flyer.pdf";
      link.target = '_blank';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Fallback: if download doesn't work, open in new tab
      setTimeout(() => {
        window.open('/SMG-Flyer.pdf', '_blank');
      }, 100);
      
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open('/SMG-Flyer.pdf', '_blank');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 overflow-hidden">
      {/* Cinematic Background Background */}
      <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(37,184,149,0.1)_0,transparent_55%),radial-gradient(at_100%_0%,rgba(13,49,92,0.06)_0,transparent_55%)]" />
      <SEO
        title="Download Brochure | Stmarys University"
        description="Download Stmarys University's official university flyer with programs, facilities, and admissions info."
        keywords={["Stmarys University brochure","Stmarys flyer","university brochure download","rehabilitation university brochure"]}
        canonical="https://smru.edu.in/brochure"
        og={{ url: "https://smru.edu.in/brochure" }}
      />
      <div className="max-w-2xl w-full">
        {/* Download Card */}
        <div className="bg-white cut-corner-panel shadow-2xl p-8 text-center">
          {/* PDF Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 cut-corner-badge flex items-center justify-center">
              <FaFilePdf className="text-6xl text-red-600" />
            </div>
          </div>

          {/* Download Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Download Stmarys University Flyer
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Get comprehensive information about our university, programs, facilities, and admission process in our official flyer.
          </p>

          {/* Brochure Information */}
          <div className="bg-gray-50 cut-corner-panel p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              What's Inside the Flyer?
            </h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 cut-corner-badge"></span>
                Complete program details and curriculum
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 cut-corner-badge"></span>
                Faculty and leadership information
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 cut-corner-badge"></span>
                Campus facilities and infrastructure
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 cut-corner-badge"></span>
                Admission requirements and process
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 cut-corner-badge"></span>
                Contact information and support
              </li>
            </ul>
          </div>

          {/* Download Button */}
          <button
            onClick={handleBrochureDownload}
            className="inline-flex items-center gap-3 text-white font-bold py-4 px-10 cut-corner-badge transition-all shadow-[0_8px_25px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_35px_rgba(220,38,38,0.45)] hover:-translate-y-1 text-lg mb-8 active:scale-95"
            style={{ background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)" }}
          >
            <FaDownload className="text-xl" />
            Download Flyer (PDF)
          </button>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 cut-corner-badge transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              style={{ background: "linear-gradient(135deg, #10bb82 0%, #086b4d 100%)" }}
            >
              <FaHome className="text-lg" />
              Back to Home
            </Link>
            
            <button
              type="button"
              onClick={openApply}
              className="inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 cut-corner-badge transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              style={{ background: "linear-gradient(135deg, #1c3c88 0%, #0d315c 100%)" }}
            >
              <FaArrowLeft className="text-lg" />
              Apply for Admission
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Having trouble downloading? Contact us at{" "}
              <a 
                href={`tel:${SITE_CONTACT.primaryPhone}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                {SITE_CONTACT.primaryPhone}
              </a>{" "}
              or{" "}
              <a 
                href={SITE_CTA_LINKS.whatsapp}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
