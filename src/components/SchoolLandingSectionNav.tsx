"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type SectionLink = {
  href: string;
  label: string;
};

export default function SchoolLandingSectionNav({ links }: { links: SectionLink[] }) {
  const lastScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [activeHref, setActiveHref] = useState(links[0]?.href || "");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDir(currentScrollY > lastScrollY.current && currentScrollY > 100 ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-42% 0px -48% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav
      aria-label="School page sections"
      className={`fixed left-0 right-0 z-[1500] border-b border-white/10 bg-[#061c38]/90 px-3 py-3 shadow-[0_12px_32px_rgba(13,49,92,0.2)] backdrop-blur-xl transition-[top,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrollDir === "up" ? "top-[112px] lg:top-[136px]" : "top-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto lg:pl-24 lg:pr-8">
        {links.map((link) => {
          const isActive = activeHref === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap border px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition sm:px-5 ${
                isActive
                  ? "border-[#ffaf3a] bg-[#ffaf3a] text-[#0d315c] shadow-[0_10px_22px_rgba(255,175,58,0.22)]"
                  : "border-white/20 bg-white/10 text-white hover:border-[#ffaf3a] hover:bg-white/20 hover:text-[#ffaf3a]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
