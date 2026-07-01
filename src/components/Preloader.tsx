"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Preloader component that displays a clean, full-screen splash screen on initial landing.
 * Features a white background with only the institutional logo and a smooth fade-out transition.
 */
export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("smru_splash_seen");
    if (hasSeenSplash) {
      setShouldRender(false);
      return;
    }

    // Keep the splash very short so it does not compete with the real LCP element.
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("smru_splash_seen", "true");
      document.body.style.overflow = "";
    }, 150);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 550);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="site-preloader"
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
        className={`transition-all duration-[600ms] ease-out transform ${
          isVisible ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-md"
        }`}
      >
        <Image
          src="/assets/Logo.webp"
          alt="Stmarys University Logo"
          width={450}
          height={240}
          priority={false}
          sizes="(max-width: 768px) 280px, 450px"
          className="h-auto w-[280px] md:w-[450px] object-contain"
          style={{ height: "auto" }}
        />
      </div>
    </div>
  );
}
