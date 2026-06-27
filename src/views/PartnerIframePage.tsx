"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import SEO from "@/components/SEO";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { useIframeAutoHeight } from "@/hooks/useIframeAutoHeight";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.webp";
import { resolveAssetSrc } from "@/lib/shared/media";

export default function PartnerIframePage({ slug }: { slug: string }) {
  const { state } = useDeveloperCms();
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const { iframeRef, iframeHeight, handleIframeLoad, iframeScrolling, hasDynamicHeight } = useIframeAutoHeight(1200);

  const externalFallbackBySlug: Record<string, string> = {
    bytexl: "https://bytexl.com/smru.html",
    niat: "https://www.niatindia.com/external-universities/st.-mary-s-university",
    iiat: "https://iiath.com/university/smru/",
    bb: "https://smru.theblackbucks.com/",
    nst: "https://university.newtonschool.co/v1/nst-st-marys-hyd",
    emversity: "https://emversity.com/university-partners/st-marys-website-page",
    ist: "/partners/ist/index.html",
    qtst: "/partners/qtst/index.html",
    edinbox: "/partners/edinbox/index.html",
    edridge: "https://edridge.in/edridge-st-mary-s-university/",
    veloces: "/partners/veloces/velocescampus.html",
  };

  const partner = useMemo(() => {
    const key = (slug || "").toLowerCase();
    return (state.partners || []).find((item) => (item.slug || "").toLowerCase() === key) || null;
  }, [slug, state.partners]);

  const activeSlug = (partner?.slug || slug || "").toLowerCase();
  const isFullBleedLayout = true; // Global partner layout is now end-to-end as requested

  const iframeSrc =
    partner?.iframeUrl ||
    (partner?.redirectUrl?.startsWith("http") ? partner.redirectUrl : "") ||
    partner?.website ||
    externalFallbackBySlug[activeSlug] ||
    "";

  // Reset loading state when slug changes
  useEffect(() => {
    setIsIframeLoaded(false);
  }, [slug]);

  if (!partner) {
    const displayName = (slug || "Partner").toUpperCase().replace("-", " ");
    return (
      <section className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl cut-corner-panel border border-slate-100 bg-white p-12 md:p-24 text-center shadow-[0_30px_60px_rgba(13,49,92,0.06)]">
          <h1 className="text-4xl md:text-7xl font-black text-[#0d315c] uppercase tracking-tighter opacity-[0.08] mb-4">
            {displayName}
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#019e6e] mb-10">
            Institutional Portal Coming Soon
          </p>
          <Link href="/partner" className="inline-flex cut-corner-badge bg-[#0d315c] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#019e6e] transition-all hover:scale-105 active:scale-95 shadow-lg">
            Back to Directory
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={`${partner.name || "Partner"} | Stmarys University`}
        description={partner.shortDescription || `Explore ${partner.name || "our partner"} at Stmarys University.`}
        canonical={`https://smru.edu.in/partner/${partner.slug || slug}`}
      />

      {/* Cinematic Transition Loader Overlay */}
      <AnimatePresence mode="wait">
        {!isIframeLoaded && iframeSrc && (
          <motion.div
            key="partner-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              <motion.img 
                src={resolveAssetSrc(logo)} 
                alt="Stmarys University Logo" 
                className="h-20 md:h-28 w-auto object-contain mb-10 drop-shadow-xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-48 h-0.5 bg-slate-100 overflow-hidden relative">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-[#019e6e]"
                />
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#0d315c] opacity-40">
                Securing Partner Gateway
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={isFullBleedLayout ? "bg-white overflow-hidden" : "bg-white px-0 py-0 sm:px-4 sm:py-3 md:py-4"}>
        <div className={isFullBleedLayout ? "w-full" : "mx-auto max-w-screen-xl"}>
          {partner.embedCode ? (
            <div className="bg-white min-h-[600px] w-full">
              <div
                dangerouslySetInnerHTML={{ __html: partner.embedCode }}
                ref={(el) => {
                  if (!el) return;
                  // Execute scripts in the embed code
                  const scripts = el.querySelectorAll("script");
                  scripts.forEach((oldScript) => {
                    if (oldScript.getAttribute("data-executed")) return;
                    const newScript = document.createElement("script");
                    Array.from(oldScript.attributes).forEach((attr) => {
                      newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                    newScript.setAttribute("data-executed", "true");
                    oldScript.parentNode?.replaceChild(newScript, oldScript);
                  });
                }}
              />
            </div>
          ) : iframeSrc ? (
            <motion.div
              initial={false}
              animate={{ opacity: isIframeLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={
                isFullBleedLayout
                  ? "overflow-hidden bg-white"
                  : "overflow-hidden border-y border-slate-200 bg-white shadow-sm sm:cut-corner-panel sm:border"
              }
            >
              <iframe
                ref={iframeRef}
                title={`${partner.name || "Partner"} Portal`}
                src={iframeSrc}
                className="w-full border-0 block"
                loading="eager"
                scrolling={iframeScrolling}
                onLoad={() => {
                  handleIframeLoad();
                  // Short delay to ensure rendering is ready before hiding loader
                  setTimeout(() => setIsIframeLoaded(true), 400);
                }}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ 
                  height: `${iframeHeight}px`, 
                  overflow: "auto",
                  transition: "height 0.3s ease-out" 
                }}
              />
            </motion.div>
          ) : (
            <div className="cut-corner-panel border border-slate-100 bg-slate-50/50 p-20 text-center backdrop-blur-sm">
              <h2 className="text-4xl md:text-6xl font-black text-[#0d315c] uppercase tracking-tighter opacity-20">
                {partner.name}
              </h2>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.4em] text-[#019e6e]">
                Portal Coming Soon
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
