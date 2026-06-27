// @ts-nocheck
"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt, FaGlobe, FaLayerGroup, FaLink } from "react-icons/fa";
import SEO from "../components/SEO";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import { LinkGridSection } from "@/components/seo/PageSections";
import { TRUST_LINKS } from "@/lib/seo/info-pages";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import { isRemovedPartnerPageSlug } from "@/lib/shared/partner-pages";

const CARD_TONES = [
  {
    accent: "#0f9f7a",
    surface: "from-[#fffefb] via-white to-[#f7fcfa]",
    ring: "ring-[#0f9f7a]/12",
    badge: "bg-[#e6f8f2] text-[#0f6a55]",
    panel: "bg-[#f4fbf8]",
  },
  {
    accent: "#cf8a19",
    surface: "from-[#fffdf9] via-white to-[#fff8ef]",
    ring: "ring-[#cf8a19]/12",
    badge: "bg-[#fff1d8] text-[#9a6207]",
    panel: "bg-[#fff8ee]",
  },
  {
    accent: "#a65638",
    surface: "from-[#fffdfb] via-white to-[#fcf4ef]",
    ring: "ring-[#a65638]/12",
    badge: "bg-[#fbe9e1] text-[#8a452d]",
    panel: "bg-[#fbf3ee]",
  },
  {
    accent: "#5f7c5b",
    surface: "from-[#fffefb] via-white to-[#f6faf3]",
    ring: "ring-[#5f7c5b]/12",
    badge: "bg-[#edf4e8] text-[#486244]",
    panel: "bg-[#f5f9f2]",
  },
  {
    accent: "#6f8c9f",
    surface: "from-[#fdfefe] via-white to-[#f3f7fa]",
    ring: "ring-[#6f8c9f]/12",
    badge: "bg-[#eaf2f7] text-[#4c6678]",
    panel: "bg-[#f3f7fa]",
  },
  {
    accent: "#b06f3f",
    surface: "from-[#fffefb] via-white to-[#f8f2ea]",
    ring: "ring-[#b06f3f]/12",
    badge: "bg-[#f7e9da] text-[#8d542a]",
    panel: "bg-[#f8f1e8]",
  },
];

const getPartnerMeta = (partner) => {
  if (partner.embedCode) {
    return {
      typeLabel: "Integrated Portal",
      typeNote: "Official partner code integration for university portal",
      icon: <FaLayerGroup />,
    };
  }

  if (partner.iframeUrl) {
    return {
      typeLabel: "Embedded Portal",
      typeNote: "Unified partner experience inside the university site",
      icon: <FaLayerGroup />,
    };
  }

  if (partner.redirectUrl?.startsWith("/")) {
    return {
      typeLabel: "Internal Route",
      typeNote: "Structured partner page inside the Stmarys University ecosystem",
      icon: <FaLink />,
    };
  }

  return {
    typeLabel: "Partner Access",
    typeNote: "Connected pathway for partner-led learning experiences",
    icon: <FaGlobe />,
  };
};

export default function Partner() {
  const { state } = useDeveloperCms();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const PARTNER_ORDER = [
    "nst",
    "emversity",
    "niat",
    "qtst",
    "bytexl",
    "iiat",
    "edinbox",
    "veloces",
    "bb",
    "edridge",
    "nextgen"
  ];

  const partners = useMemo(() => {
    return (state.partners || [])
      .filter((partner) => partner.visibility !== "hidden" && partner.status !== "archived")
      .filter((partner) => !isRemovedPartnerPageSlug(partner.slug))
      .map((partner, idx) => {
        const tone = CARD_TONES[idx % CARD_TONES.length];
        const internalRedirect = partner.redirectUrl?.startsWith("/");
        const partnerRoute = partner.slug ? `/partner/${partner.slug}` : "/partner";
        const partnerSlug = (partner.slug || "").toLowerCase();
        const forcedExternalFallback = ""; // Force internal routes to keep Navbar visible
        const configuredExternalUrl =
          (partner.redirectUrl?.startsWith("http") && partner.redirectUrl) ||
          (partner.website?.startsWith("http") && partner.website) ||
          "";
        const path = forcedExternalFallback
          ? configuredExternalUrl || forcedExternalFallback
          : partnerRoute;
        const isComingSoon = !partner.redirectUrl && !partner.website;
        const meta = getPartnerMeta(partner);

        return {
          id: partner.id || partner.slug || `partner-${idx}`,
          slug: partnerSlug,
          name: partner.name || "Untitled Partner",
          logo: partner.logo || null,
          shortDescription:
            partner.shortDescription ||
            partner.fullDescription ||
            "Partner-linked academic pathway designed to connect university learning with practical, industry-facing skills.",
          website: partner.website || "",
          path: isComingSoon ? "#" : path,
          typeLabel: isComingSoon ? "Launching Soon" : meta.typeLabel,
          typeNote: isComingSoon ? "Strategic route in development" : meta.typeNote,
          typeIcon: isComingSoon ? <span className="animate-pulse">●</span> : meta.icon,
          tone: isComingSoon 
            ? { accent: "#94a3b8", surface: "bg-white", ring: "ring-slate-100", badge: "bg-slate-100 text-slate-500", panel: "bg-slate-50" } 
            : tone,
          isComingSoon,
          iframeUrl: partner.iframeUrl,
          embedCode: partner.embedCode
        };
      })
      .sort((a, b) => {
        const indexA = PARTNER_ORDER.indexOf(a.slug);
        const indexB = PARTNER_ORDER.indexOf(b.slug);
        
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        // Fallback to previous logic for unordered items
        if (a.isComingSoon && !b.isComingSoon) return 1;
        if (!a.isComingSoon && b.isComingSoon) return -1;
        return 0;
      });
  }, [state.partners]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Our Edupartners | Stmarys University"
        description="Explore strategic education and technology partners powering future-ready learning at Stmarys University."
      />

      <section className="relative overflow-hidden border-b border-slate-100 bg-white pt-10">
        {/* Architectural Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(193,140,63,0.12),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(15,159,122,0.1),transparent_40%)]" />
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03] grayscale invert pointer-events-none">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
          <img
            src={resolveAssetSrc(abstractHeroBg)}
            alt=""
            className="h-full w-full object-cover opacity-[0.08] mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-10 xl:px-12 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center">
            <div 
              className="inline-flex items-center gap-3 cut-corner-badge bg-white/60 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#0f9f7a] shadow-sm backdrop-blur-sm border border-white/80 mb-10"
              data-reveal="fade-up"
            >
              <span className="flex h-1.5 w-1.5 cut-corner-badge bg-[#0f9f7a] animate-pulse" />
              Industry-Integrated Ecosystem
            </div>

            <h1
              className="text-[clamp(3rem,8vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#0d315c] drop-shadow-sm flex flex-col items-center"
              data-reveal="fade-up"
              style={{ "--delay": "0.05s" }}
            >
              <span>Partner</span>
              <span className="text-[#019e6e] mt-1 relative flex items-center gap-4">
                Pathways
                <span className="text-[12px] font-black text-[#eadfce] tracking-widest opacity-80 uppercase pt-4 hidden md:block">Est. 2026</span>
              </span>
            </h1>

            <p
              className="mt-10 max-w-2xl text-[17px] leading-[1.8] text-[#586472] md:text-[20px] font-medium"
              data-reveal="fade-up"
              style={{ "--delay": "0.08s" }}
            >
              A curated network of academic, healthcare, technology, and pathway partners that supports practical learning, skilling, internships, and career-ready student outcomes.
            </p>

            <div
              className="mt-14 grid gap-6 sm:grid-cols-3 w-full"
              data-reveal="fade-up"
              style={{ "--delay": "0.12s" }}
            >
              {[
                { value: String(partners.length).padStart(2, "0"), label: "Active Partners", color: "text-[#0d315c]" },
                { value: String(partners.filter((item) => item.website || item.path).length).padStart(2, "0"), label: "Learning Routes", color: "text-[#019e6e]" },
                { value: "01", label: "Student Pathway", color: "text-[#cf8a19]" },
              ].map((item) => (
                <div key={item.label} className="group relative cut-corner-panel border border-white/80 bg-white/60 p-8 shadow-[0_20px_50px_rgba(98,73,45,0.06)] backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-[0_25px_60px_rgba(98,73,45,0.1)] hover:-translate-y-1">
                  <div className="absolute inset-0 cut-corner-panel bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className={`relative z-10 text-5xl font-black leading-none ${item.color} tracking-tighter`}>{item.value}</div>
                  <div className="relative z-10 mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#9b8f83] group-hover:text-[#20313f] transition-colors">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div data-reveal="fade-up">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8d542a]">Directory</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-[#20313f] md:text-5xl">All Partner Routes</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6b7682] md:text-base">
                Explore partner-linked routes that support industry-integrated learning, practical exposure, and programme-specific student pathways.
              </p>
            </div>
            <div
              className="inline-flex w-fit items-center gap-2 cut-corner-badge border border-[#eadfce] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#7d6f61] shadow-sm"
              data-reveal="fade-up"
              style={{ "--delay": "0.05s" }}
            >
              <span className="h-2 w-2 cut-corner-badge bg-[#0f9f7a]" />
              Student Pathway Directory
            </div>
          </div>

          {partners.length ? (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {partners.map((partner, idx) => {
                const CardWrapper = partner.isComingSoon ? "div" : Link;

                return (
                  <CardWrapper
                    key={partner.id}
                    href={partner.isComingSoon ? undefined : partner.path}
                    className={`group relative flex flex-col overflow-hidden cut-corner-panel border border-slate-100 bg-white p-7 transition-all duration-500 ${partner.isComingSoon ? "opacity-60 grayscale" : "hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"}`}
                    data-reveal="fade-up"
                    style={{ "--delay": `${idx * 0.04}s` }}
                  >
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Prominent Logo Display */}
                      <div className={`flex h-[100px] w-[100px] sm:h-[110px] sm:w-[110px] items-center justify-center cut-corner-badge bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-50 p-5 transition-transform duration-500 group-hover:scale-105`}>
                        {partner.logo ? (
                          <img 
                            src={resolveAssetSrc(partner.logo)} 
                            alt={partner.name} 
                            className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:grayscale" 
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-2xl font-black uppercase tracking-tighter text-[#0d315c]/10 absolute">
                              {partner.name.slice(0, 1)}
                            </span>
                            <span className="relative text-sm font-black uppercase tracking-widest text-[#0d315c]">
                              {partner.name.split(' ').map(n => n[0]).join('').slice(0, 3)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-7">
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#019e6e] mb-2.5">Institutional Partner</div>
                        <h3 className="text-[1.5rem] sm:text-[1.75rem] font-black leading-tight tracking-[-0.04em] text-[#0d315c] group-hover:text-[#019e6e] transition-colors">
                          {partner.name}
                        </h3>
                        {partner.isComingSoon ? (
                          <div className="mt-4 inline-flex items-center gap-2 cut-corner-badge bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="h-1.5 w-1.5 cut-corner-badge bg-slate-300" />
                            Coming Soon
                          </div>
                        ) : (
                          <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold text-[#0d315c]/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                            Explore Route <span>→</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 cut-corner-panel border border-dashed border-[#d9ccb8] bg-white p-10 text-center">
              <h3 className="text-2xl font-black text-[#20313f]">No partners published yet</h3>
              <p className="mt-3 text-[#6b7682]">Add partner records in the CMS to populate this directory.</p>
            </div>
          )}

          {SHOW_PUBLIC_SEO_SECTIONS && (
            <div className="mt-12">
              <LinkGridSection
                title="University Links"
                items={[
                  { href: "/schools", label: "Schools", description: "Explore academic schools and program pathways." },
                  { href: "/admissions", label: "Admissions", description: "Official admissions routes for university programs." },
                  { href: "/contact", label: "Contact", description: "Admissions, campus, and public support contact details." },
                  TRUST_LINKS[0],
                  TRUST_LINKS[1],
                  { href: "/campus-360", label: "Visit Campus", description: "Campus tour and public location guidance." },
                ].filter(Boolean)}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
