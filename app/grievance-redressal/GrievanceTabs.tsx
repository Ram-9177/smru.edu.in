"use client";

import React, { useState } from "react";
import { FaUserGraduate, FaUserTie, FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";

export default function GrievanceTabs() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="mb-12 bg-white border border-[#d8e8fb] cut-corner-panel overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row border-b border-[#d8e8fb]">
        <button
          onClick={() => setActiveTab("students")}
          className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "students"
              ? "bg-[#0d315c] text-white"
              : "text-[#0d315c] hover:bg-[#f8fbff]"
          }`}
        >
          <FaUserGraduate size={16} /> Students
        </button>
        <button
          onClick={() => setActiveTab("parents")}
          className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border-y sm:border-y-0 sm:border-l border-[#d8e8fb] ${
            activeTab === "parents"
              ? "bg-[#0d315c] text-white"
              : "text-[#0d315c] hover:bg-[#f8fbff]"
          }`}
        >
          <FaUserTie size={16} /> Parents
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 sm:border-l border-[#d8e8fb] ${
            activeTab === "faculty"
              ? "bg-[#0d315c] text-white"
              : "text-[#0d315c] hover:bg-[#f8fbff]"
          }`}
        >
          <FaChalkboardTeacher size={16} /> Faculty & Staff
        </button>
      </div>

      <div className="p-8 md:p-10">
        {activeTab === "students" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-black text-[#0d315c] mb-4">Student Grievance Redressal</h3>
            <p className="text-slate-600 font-medium mb-6">
              Students can raise academic, administrative, or any other campus-related grievances. To ensure authenticity and prompt resolution, all student complaints must be sent exclusively from your official university email ID (<strong>@smru.edu.in</strong>).
            </p>
            <div className="bg-[#f8fbff] border border-[#d8e8fb] p-6 text-center cut-corner-panel">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Send an Email To</p>
              <a href="mailto:grievances@smru.edu.in" className="text-2xl font-black text-[#019e6e] hover:text-[#0d315c] transition-colors break-all">
                grievances@smru.edu.in
              </a>
              <div className="mt-6 mb-2">
                <a 
                  href="https://outlook.office.com/mail/deeplink/compose?to=grievances@smru.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0078d4] text-white px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-[#005a9e] transition-colors cut-corner-badge shadow-md"
                >
                  <FaEnvelope /> Give Complaint
                </a>
              </div>
              <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 inline-block px-3 py-2 rounded cut-corner-badge">
                Note: Complaints from personal email IDs (Gmail, Yahoo, etc.) will not be processed.
              </p>
            </div>
          </div>
        )}

        {activeTab === "parents" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-black text-[#0d315c] mb-4">Parent Grievance Redressal</h3>
            <p className="text-slate-600 font-medium mb-6">
              We value the feedback and concerns of our students&apos; parents. Parents are requested to communicate their grievances through their ward&apos;s official university email ID (<strong>@smru.edu.in</strong>) or explicitly mention their ward&apos;s official email ID for verification.
            </p>
            <div className="bg-[#f8fbff] border border-[#d8e8fb] p-6 text-center cut-corner-panel">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Send an Email To</p>
              <a href="mailto:grievances@smru.edu.in" className="text-2xl font-black text-[#019e6e] hover:text-[#0d315c] transition-colors break-all">
                grievances@smru.edu.in
              </a>
              <div className="mt-6 mb-2">
                <a 
                  href="https://outlook.office.com/mail/deeplink/compose?to=grievances@smru.edu.in&subject=Parent%20Grievance:%20[Student%20Roll%20Number]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0078d4] text-white px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-[#005a9e] transition-colors cut-corner-badge shadow-md"
                >
                  <FaEnvelope /> Give Complaint
                </a>
              </div>
              <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 inline-block px-3 py-2 rounded cut-corner-badge">
                Note: Please include the student&apos;s Roll Number and @smru.edu.in email ID in the subject line.
              </p>
            </div>
          </div>
        )}

        {activeTab === "faculty" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-black text-[#0d315c] mb-4">Faculty & Staff Grievance Redressal</h3>
            <p className="text-slate-600 font-medium mb-6">
              Faculty and staff members can submit their grievances directly to the Internal Grievance Redressal Committee. All correspondence must be made using your official university email domain (<strong>@smru.edu.in</strong>).
            </p>
            <div className="bg-[#f8fbff] border border-[#d8e8fb] p-6 text-center cut-corner-panel">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Send an Email To</p>
              <a href="mailto:grievances@smru.edu.in" className="text-2xl font-black text-[#019e6e] hover:text-[#0d315c] transition-colors break-all">
                grievances@smru.edu.in
              </a>
              <div className="mt-6 mb-2">
                <a 
                  href="https://outlook.office.com/mail/deeplink/compose?to=grievances@smru.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0078d4] text-white px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-[#005a9e] transition-colors cut-corner-badge shadow-md"
                >
                  <FaEnvelope /> Give Complaint
                </a>
              </div>
              <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 inline-block px-3 py-2 rounded cut-corner-badge">
                Note: Complaints from non-institutional email IDs will not be processed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
