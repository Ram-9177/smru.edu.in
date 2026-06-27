"use client";

import React from "react";

/**
 * Root Loading State (App Router)
 * Refactored to a subtle, non-blocking overlay.
 * Replaces the legacy full-screen white-out to prevent 'Wait' psychology.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Institutional Logo with Pulse */}
        <div className="relative flex flex-col items-center">
          <img 
            src="/assets/Logo.png" 
            alt="Stmarys University" 
            className="h-20 sm:h-28 w-auto object-contain animate-premium-pulse"
          />
          
          {/* Subtle spinning progress indicator below or around */}
          <div className="mt-8 h-1 w-32 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-[#019e6e] animate-progress-slide" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes premium-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes progress-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-premium-pulse {
          animation: premium-pulse 2s ease-in-out infinite;
        }
        .animate-progress-slide {
          animation: progress-slide 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
