"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: "left" | "center";
  revealDelay?: string;
};

export default function UniversitySectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  align = "center",
  revealDelay = "0.05s",
}: Props) {
  const centered = align === "center";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !("IntersectionObserver" in window)) return;
    const els = containerRef.current.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <h2
        className={`smru-title ${centered ? "text-center" : "text-left"} ${titleClassName}`}
        data-reveal="fade-up"
        style={{ "--delay": revealDelay } as React.CSSProperties}
      >
        {title}
      </h2>
      
      <div
        className={`mt-4 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a] ${centered ? "mx-auto" : ""}`}
        data-reveal="fade-up"
        style={{ "--delay": "0.08s" } as React.CSSProperties}
      />

      {subtitle ? (
        <p
          className={`smru-sub ${centered ? "mx-auto text-center" : "text-left"} ${subtitleClassName}`}
          data-reveal="fade-up"
          style={{ "--delay": "0.1s" } as React.CSSProperties}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
