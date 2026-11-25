// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import * as m from "framer-motion/m";
import logo from "../assets/Logo.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import { useIframeAutoHeight } from "@/hooks/useIframeAutoHeight";

const NiatUpskilling = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const { iframeRef, iframeHeight, handleIframeLoad, iframeScrolling, hasDynamicHeight } = useIframeAutoHeight(1600);

  // The iframe can finish loading before React attaches onLoad, or never finish: the loading screen must not outlive that.
  useEffect(() => {
    const timer = setTimeout(() => setIsIframeLoaded(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        {!isIframeLoaded && (
          <m.div
            key="upskilling-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 pointer-events-none"
          >
            <m.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center"
            >
              <m.img
                src={resolveAssetSrc(logo)} 
                alt="St. Mary's University Logo" 
                className="h-24 md:h-32 w-auto object-contain mb-10"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              
              <div className="w-56 h-1 bg-slate-50 cut-corner-badge overflow-hidden relative border border-slate-100/50 shadow-inner">
                <m.div
                  initial={{ transform: "translateX(-100%)" }}
                  animate={{ transform: "translateX(100%)" }}
                  transition={{ 
                    duration: 1.6, 
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-[#019e6e]/80"
                />
              </div>

              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-[#0d315c] text-center"
              >
                Launching Upskilling Portal
              </m.p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
      
      <div className="iframe-wrapper relative bg-white">
        <iframe
          ref={iframeRef}
          id="dynamicIframe"
          src="https://www.niatindia.com/external-universities/st.-mary-s-university"
          title="NIAT Collaboration Page"
          scrolling={iframeScrolling}
          onLoad={() => {
            handleIframeLoad();
            setTimeout(() => {
              setIsIframeLoaded(true);
            }, 500);
          }}
          className={`w-full border-none block transition-all duration-1000 ${isIframeLoaded ? 'opacity-100' : 'opacity-0 translate-y-4 blur-xl'}`}
          style={{ width: "100%", border: "none", height: `${iframeHeight}px`, overflow: hasDynamicHeight ? "hidden" : "auto" }}
          allowFullScreen
        ></iframe>
      </div>
    </LazyMotion>
  );
};

export default NiatUpskilling;
