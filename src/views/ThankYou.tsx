"use client";
import React from "react";
import Link from "next/link";
import { FaDownload, FaCheckCircle, FaHome, FaArrowLeft } from "react-icons/fa";
import useOpenApply from "../hooks/useOpenApply";
import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";


export default function ThankYou() {
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
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white cut-corner-panel shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 cut-corner-badge flex items-center justify-center">
              <FaCheckCircle className="text-6xl text-green-600" />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Thank You for Your Interest!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your enquiry has been submitted successfully. Our team will get back to you within 24 hours.
          </p>

          {/* Brochure Download Section */}
          <div className="bg-blue-50 cut-corner-panel p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Download Our University Flyer
            </h2>
            <p className="text-gray-600 mb-4">
              Get detailed information about our programs, facilities, and admission process in our official flyer.
            </p>
            <button
              onClick={handleBrochureDownload}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 cut-corner-badge transition duration-200 shadow-lg hover:shadow-xl"
            >
              <FaDownload className="text-lg" />
              Download Flyer
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 cut-corner-badge transition duration-200 shadow-lg hover:shadow-xl"
            >
              <FaHome className="text-lg" />
              Back to Home
            </Link>
            
            <button
              onClick={openApply}
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 cut-corner-badge transition duration-200 shadow-lg hover:shadow-xl"
            >
              <FaArrowLeft className="text-lg" />
              Go to Admissions
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need immediate assistance? Contact us at{" "}
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
