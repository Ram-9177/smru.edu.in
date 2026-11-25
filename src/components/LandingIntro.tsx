"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LandingIntro() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"welcome" | "logo" | "corner" | "done">("welcome");
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only display on the main landing entry point
    const isLandingRoute = pathname === "/" || pathname === "";
    if (!isLandingRoute) return;

    // Respect reduced-motion preferences immediately for accessibility
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      return;
    }

    // Check if user has already experienced the intro during this browser session
    let hasSeenIntro = false;
    let isForced = false;
    try {
      hasSeenIntro = typeof window !== "undefined" && Boolean(window.sessionStorage?.getItem("smru_landing_intro_seen"));
      isForced = typeof window !== "undefined" && window.location.search.includes("welcome");
    } catch {
      // Storage access blocked by browser privacy/security settings
    }

    if (!hasSeenIntro || isForced) {
      setShouldShow(true);
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage?.setItem("smru_landing_intro_seen", "true");
        }
      } catch {
        // Storage access blocked or quota exceeded
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!shouldShow) return;

    // If tab is loaded in the background, skip to completion immediately to avoid animation throttle
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      setPhase("done");
      return;
    }

    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let fallbackTimer: NodeJS.Timeout;

    // Step 1: Display Welcome text, then transition to logo at 350ms
    timer1 = setTimeout(() => {
      setPhase("logo");
    }, 350);

    // Step 2: Transition logo moving to the top-left corner and fading out at 750ms
    const triggerCornerTransition = () => {
      setPhase("corner");
      // Step 3: Complete and remove overlay from DOM at 1400ms (750ms + 650ms)
      timer3 = setTimeout(() => {
        setPhase("done");
      }, 650);
    };

    timer2 = setTimeout(() => {
      triggerCornerTransition();
    }, 750);

    // Hard fallback: Always complete within 1600ms max (recovering if any animation frame hangs)
    fallbackTimer = setTimeout(() => {
      setPhase("done");
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(fallbackTimer);
    };
  }, [shouldShow]);

  if (!mounted || !shouldShow || phase === "done") {
    return null;
  }

  const isCorner = phase === "corner";

  return (
    <div
      aria-hidden={isCorner}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white transition-opacity duration-600 ease-out select-none ${
        isCorner ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        transitionDuration: isCorner ? "600ms" : "300ms",
        willChange: "opacity, transform",
      }}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(248,250,252,0.85)_100%)] pointer-events-none" />

      {/* Main Content Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCorner
            ? "-translate-x-[calc(50vw-70px)] -translate-y-[calc(50vh-45px)] scale-[0.38] opacity-0"
            : "translate-x-0 translate-y-0 scale-100 opacity-100"
        }`}
        style={{
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        {/* Welcome Text */}
        <div
          className={`transition-all duration-500 ease-out ${
            phase === "welcome"
              ? "opacity-100 translate-y-0 scale-100"
              : phase === "logo"
              ? "opacity-80 -translate-y-2 scale-95"
              : "opacity-0 -translate-y-6 scale-90"
          }`}
        >
          <span className="inline-block text-[11px] sm:text-[13px] md:text-sm font-black uppercase tracking-[0.25em] text-[#019e6e] mb-2 sm:mb-3">
            Welcome to
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0d315c] tracking-tight leading-tight font-cinzel">
            St. Mary&apos;s
          </h1>
          <p className="mt-1 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
            University &bull; Hyderabad
          </p>
        </div>

        {/* University Crest / Logo */}
        <div
          className={`mt-6 sm:mt-8 transition-all duration-600 ease-out ${
            phase === "welcome"
              ? "opacity-0 scale-90 translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Subtle soft backdrop ring */}
            <div className="absolute -inset-4 rounded-full bg-slate-100/70 -z-10 blur-sm scale-110" />
            <Image
              src="/assets/Logo.webp"
              alt="St. Mary's University"
              width={260}
              height={140}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* Institutional motto divider */}
        <div
          className={`mt-6 flex items-center gap-3 transition-opacity duration-400 ${
            phase === "logo" ? "opacity-60" : "opacity-0"
          }`}
        >
          <div className="h-[1px] w-8 sm:w-12 bg-slate-300" />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Institutional Excellence
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
