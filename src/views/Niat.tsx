// @ts-nocheck
"use client";
import React, { useState } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import { useIframeAutoHeight } from "@/hooks/useIframeAutoHeight";

const Niat = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const { iframeRef, iframeHeight, handleIframeLoad, iframeScrolling, hasDynamicHeight } = useIframeAutoHeight(1600);

  return (
    <>
      <SEO 
        title="NIAT | Stmarys University"
        description="Explore the NIAT programs in collaboration with Stmarys University."
        canonical="https://smru.edu.in/niat"
      />
      
      {/* Cinematic Transition Loader Overlay */}
      <AnimatePresence mode="wait">
        {!isIframeLoaded && (
          <motion.div
            key="portal-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              {/* Central Stmarys University Logo with pulsing effect */}
              <motion.img 
                src={resolveAssetSrc(logo)} 
                alt="Stmarys University Logo" 
                className="h-24 md:h-32 w-auto object-contain mb-10 drop-shadow-xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Progress Indicator */}
              <div className="w-56 h-1 bg-slate-100 cut-corner-badge overflow-hidden relative shadow-inner">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#019e6e] to-transparent"
                />
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-[#0d315c] text-center"
              >
                Connecting to Partner Portal
              </motion.p>
            </motion.div>

            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#019e6e]/5 via-transparent to-transparent blur-[140px] rounded-full -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="niat-iframe-wrapper relative bg-white">
        <iframe
          ref={iframeRef}
          id="niatIframe"
          src="https://www.niatindia.com/campus/niat-st.-mary-s-university"
          title="NIAT Campus"
          loading="eager"
          onLoad={() => {
            handleIframeLoad();
            // Give it a tiny bit of extra time to render after loading
            setTimeout(() => {
              setIsIframeLoaded(true);
            }, 600);
          }}
          scrolling={iframeScrolling}
          style={{ height: `${iframeHeight}px`, overflow: hasDynamicHeight ? "hidden" : "auto" }}
          className={`w-full border-none block transition-all duration-1000 ${isIframeLoaded ? 'opacity-100' : 'opacity-0 scale-95 blur-sm'}`}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Niat;
