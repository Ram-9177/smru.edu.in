// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";

import { FaTimes } from "react-icons/fa";
import admissionsImg from "../assets/Phd Notification New.webp";
import Link from "next/link";

const PhDPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("phd_popup_v3");
    if (hasSeen) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("phd_popup_v3", "true");
    }, 1200);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (timeLeft <= 0) { setIsVisible(false); return; }
    const tick = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(tick);
  }, [isVisible, timeLeft]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={() => setIsVisible(false)}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md md:max-w-xl cut-corner-panel overflow-hidden shadow-2xl animate-[phd-popup_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-white/90 hover:bg-white text-gray-800 cut-corner-badge flex items-center justify-center shadow-lg transition-all duration-200 hover:rotate-90 active:scale-90"
          aria-label="Close popup"
        >
          <FaTimes size={14} />
        </button>

        {/* Countdown indicator */}
        <div className="absolute top-3 left-3 z-20 w-10 h-10 flex items-center justify-center">
          <svg className="absolute" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="16" fill="none"
              stroke="#ef4444" strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 16}`}
              strokeDashoffset={`${2 * Math.PI * 16 * (1 - timeLeft / 12)}`}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="text-white text-[12px] font-black relative z-10">{timeLeft}</span>
        </div>

        {/* The actual design image (Clickable Link → internal PhD page) */}
        <Link
          href="/phd-admissions"
          className="block w-full h-full transition-all duration-500 hover:scale-[1.01] group focus:outline-none"
          onClick={() => setIsVisible(false)}
        >
          <img
            src={admissionsImg.src}
            alt="PhD Admissions 2026-27 cycle status"
            className="w-full h-auto block cut-corner-panel group-hover:brightness-[1.03]"
          />
          {/* Click Indicator (Floating Tooltip style) */}
          <div className="absolute bottom-8 right-8 px-5 py-2.5 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[11px] cut-corner-badge shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500 flex items-center gap-2">
            EXPLORE PROGRAMS <span className="text-lg">→</span>
          </div>
        </Link>
      </div>

      <style>{`
        @keyframes phd-popup {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PhDPopup;
