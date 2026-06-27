// @ts-nocheck
"use client";
import React, { useState } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import { useIframeAutoHeight } from "@/hooks/useIframeAutoHeight";

const NiatUpskilling = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const { iframeRef, iframeHeight, handleIframeLoad, iframeScrolling, hasDynamicHeight } = useIframeAutoHeight(1600);

  return (
    <>
      <SEO 
        title="NIAT Upskilling | Stmarys University"
        description="Explore the NIAT Upskilling programs in collaboration with Stmarys University."
        canonical="https://smru.edu.in/niat-upskilling"
      />

      <AnimatePresence mode="wait">
        {!isIframeLoaded && (
          <motion.div
            key="upskilling-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center"
            >
              <motion.img 
                src={resolveAssetSrc(logo)} 
                alt="Stmarys University Logo" 
                className="h-24 md:h-32 w-auto object-contain mb-10"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              
              <div className="w-56 h-1 bg-slate-50 cut-corner-badge overflow-hidden relative border border-slate-100/50 shadow-inner">
                <motion.div 
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

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-[#0d315c] text-center"
              >
                Launching Upskilling Portal
              </motion.p>
            </motion.div>
          </motion.div>
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
    </>
  );
};

export default NiatUpskilling;
