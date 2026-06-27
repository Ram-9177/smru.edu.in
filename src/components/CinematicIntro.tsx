"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Using atmospheric ocean/coastline descent for a more cinematic transition
const CAMPUS_DRONE_VIEW = "/assets/Campus guide images/campus-main.webp";

interface CinematicIntroProps {
  onComplete: () => void;
  logoUrl?: string;
}

export default function CinematicIntro({ onComplete, logoUrl }: CinematicIntroProps) {
  const [phase, setPhase] = useState<"initial" | "cinematic" | "reveal" | "landing">("initial");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("cinematic"), 300);
    const timer2 = setTimeout(() => setPhase("reveal"), 2500);
    const timer3 = setTimeout(() => setPhase("landing"), 5500);
    const timer4 = setTimeout(onComplete, 6500);

    return () => {
      [timer1, timer2, timer3, timer4].forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden bg-[#0d315c] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {(phase === "cinematic" || phase === "reveal") && (
          <motion.div
            key="drone-view"
            initial={{ opacity: 0, scale: 1.1, x: -20 }}
            animate={{ 
              opacity: 1, 
              scale: phase === "reveal" ? 1.05 : 1.15,
              x: phase === "reveal" ? 0 : -10
            }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute inset-0"
          >
            <img
              src={CAMPUS_DRONE_VIEW}
              alt="Campus Drone View"
              className="w-full h-full object-cover"
            />
            
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/60 via-transparent to-[#0d315c]/30" />
            
            {/* Premium Light Leak / Lens Flare Effect */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.4, x: 100 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)] mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 text-center px-6"
          >
            <div className="relative inline-block mb-8">
              {logoUrl && (
                <motion.img
                  src={logoUrl}
                  alt="Stmarys University Logo"
                  className="h-20 w-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                />
              )}
              {/* Spinning Ring behind logo */}
              <div className="absolute inset-0 -z-10 animate-spin-slow opacity-20">
                <div className="h-full w-full rounded-full border-2 border-dashed border-white" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-[0.4em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                Stmarys <br /> 
                <span className="text-[#019e6e] text-2xl md:text-4xl mt-2 block">Rehabilitation University</span>
              </h1>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-[2px] w-12 bg-white/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Institutional Excellence</span>
                <div className="h-[2px] w-12 bg-white/30" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Flash / Transition Overlay */}
      <AnimatePresence>
        {phase === "landing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[10001]"
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
