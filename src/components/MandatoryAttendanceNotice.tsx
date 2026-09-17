"use client";

import React from "react";
import { FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

export default function MandatoryAttendanceNotice() {
  return (
    <section
      aria-labelledby="attendance-notice-heading"
      className="relative overflow-hidden rounded-2xl border-2 border-amber-400/90 bg-gradient-to-br from-[#fffdfa] via-white to-[#fff8ee] p-6 sm:p-8 md:p-10 shadow-[0_12px_36px_rgba(217,119,6,0.12)]"
    >
      {/* Decorative corner accent and subtle watermarks */}
      <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-amber-400/15 via-amber-300/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Badge & Institutional Branding */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-700 shadow-sm">
              <FaExclamationTriangle className="text-xl text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#0d315c]">
                St. Mary’s Rehabilitation University
              </p>
              <div className="inline-flex items-center gap-1.5 mt-0.5 rounded-md bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-900 border border-amber-400/30">
                Caution / Important Notice
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800/80 bg-white/80 px-3 py-1 rounded-md border border-amber-200 shadow-sm">
              Official University Notice
            </span>
          </div>
        </div>

        {/* Subject Header */}
        <div>
          <h3
            id="attendance-notice-heading"
            className="font-outfit text-lg sm:text-xl font-black text-[#0d315c] leading-snug"
          >
            Subject: Mandatory Attendance for Students Admitted to MPT and MOT Programmes
          </h3>
          <div className="mt-2.5 h-1 w-16 bg-[#ffaf3a] rounded-full" />
        </div>

        {/* Notice Body */}
        <div className="space-y-4 text-sm sm:text-[14.5px] leading-relaxed text-slate-700 font-medium">
          <p>
            All students who have taken admission to the <strong>Master of Physiotherapy (MPT)</strong> and <strong>Master of Occupational Therapy (MOT)</strong> programmes at <strong>St. Mary’s Rehabilitation University (SMRU)</strong> are hereby advised that they will attend the classes regularly and as per the academic schedule notified by the University, on commencement of the University Academic Schedule.
          </p>

          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-500/10 p-4 sm:p-5 text-amber-950 font-semibold leading-relaxed">
            <p className="flex items-start gap-2.5">
              <FaShieldAlt className="mt-1 shrink-0 text-amber-700 text-sm sm:text-base" aria-hidden="true" />
              <span>
                Students are specifically cautioned that any information, communication, message, or representation received by them stating or suggesting that attendance in classes is not mandatory or are not required to attend regularly, or that they may complete the programme without attending classes is incorrect and should not be relied upon.
              </span>
            </p>
          </div>

          <p>
            Students are required to comply with the academic, attendance, clinical/practical training, examination, and other requirements prescribed by the University and applicable regulatory authorities.
          </p>

          <p className="text-slate-600">
            The University shall not be responsible for any academic consequences arising from a student’s reliance upon unauthorized, unofficial, or incorrect information received from any individual or source.
          </p>

          <p className="text-slate-600">
            Students are therefore advised to rely only on official communications issued through the University website, University notices, or authorized communications from the competent University authorities.
          </p>
        </div>

        {/* Official Authority Sign-off */}
        <div className="pt-4 border-t border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">By Order</p>
            <p className="font-black text-[#0d315c] text-sm mt-0.5">St. Mary’s Rehabilitation University</p>
            <p className="text-slate-600 font-semibold text-[11px]">Hyderabad, Telangana</p>
          </div>
          <div className="text-[11px] font-semibold text-slate-500 sm:text-right">
            <span>Official SMRU Regulatory Compliance Notice</span>
          </div>
        </div>
      </div>
    </section>
  );
}
