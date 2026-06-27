// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import logo from "../assets/Favicon&Loading.webp";
import { resolveAssetSrc } from "@/lib/shared/media";

/**
 * Custom Page Loader for specific long-running transitions.
 * Restyled to a solid high-contrast loader so it reads clearly during slow routes.
 */
const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const location = { pathname };

  useEffect(() => {
    // Only show loader for specific 'Partnered' pages that take time
    const targetPaths = ["/niat-upskilling"];
    const isTargetPage = targetPaths.some((path) => location.pathname.includes(path));

    if (isTargetPage) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // keep initial state false to avoid a white fullscreen flash on first paint
      setLoading(false);
    }
  }, [location.pathname]);

  return (
    loading ? (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
        <div className="relative flex flex-col items-center">
          <img 
            src={resolveAssetSrc(logo)} 
            alt="Stmarys University Logo" 
            className="h-28 md:h-36 w-auto object-contain animate-pulse will-change-transform"
          />
        </div>

        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.01); }
          }
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    ) : null
  );
};

export default PageLoader;
