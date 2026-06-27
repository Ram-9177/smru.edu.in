"use client";

import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import dynamic from "next/dynamic";
const EnquiryModal = dynamic(() => import("./ApplyModal"));
const MerittoApplyModal = dynamic(() => import("./MerittoApplyModal"));
import ReactDomSafetyPatch from "./ReactDomSafetyPatch";
import { ApplyModalContext } from "../context/ApplyModalContext";
import type { MerittoModalPayload } from "../context/ApplyModalContext";

import { FaPaperPlane, FaPhoneAlt, FaFileDownload, FaWhatsapp, FaHeadset } from "react-icons/fa";
import {
  PARTNER_HIDDEN_STICKY_ROUTES,
  PHD_ADMISSIONS_STATUS_MESSAGE,
  STICKY_CTA_HIDDEN_ROUTES,
  SITE_CONTACT,
  SITE_CTA_LINKS,
} from "@/lib/shared/site-constants";
import MobileMenu from "./MobileMenu";

type FlashUpdate = {
  text: string;
  to: string;
  isPriority?: boolean;
};

const FLASH_UPDATES: FlashUpdate[] = [
  { text: "Admissions and entrance-related updates will be announced through official university notices.", to: "/admissions", isPriority: true },
  { text: PHD_ADMISSIONS_STATUS_MESSAGE, to: "/phd-admissions" },
  { text: "Admissions Open: Apply now for UG, PG, and Diploma programmes for the 2026-27 session.", to: "/admissions" },
  { text: "Scholarships: Merit-based financial assistance available for eligible students (T&C apply).", to: "/admissions" },
  { text: "Campus Tour: Book your campus visit and admission counselling slots today.", to: "/contact" },
];

type AppShellContentProps = {
  children: ReactNode;
  openApplyModal: () => void;
  openMerittoModal: (payload?: MerittoModalPayload) => void;
  showEnquiryModal: boolean;
  setShowEnquiryModal: Dispatch<SetStateAction<boolean>>;
};

function AppShellContent({
  children,
  openApplyModal,
  openMerittoModal,
  showEnquiryModal,
  setShowEnquiryModal,
}: AppShellContentProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/+$/, "") || "/";
  const isDeveloperPage = normalizedPathname.startsWith("/developer");
  const isPartnerPage = (() => {
    const segments = normalizedPathname.split("/").filter(Boolean);
    if (segments.length === 0) return false;
    const partnerBases = [
      "partner",
      "bb",
      "blackbucks",
      "bytexl",
      "edinbox",
      "edridge",
      "emversity",
      "iiat",
      "ist",
      "mjiollnir",
      "niat",
      "niat-upskilling",
      "nst",
      "onnbikes",
      "qtst",
      "qtst-Stmarys",
      "university",
      "veloces",
      "nextgen"
    ];
    return partnerBases.includes(segments[0]);
  })();
  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isNavLoading = false;
  const isLandingPage = normalizedPathname.startsWith("/landing/");

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide header if mobile menu is open (body scroll is locked)
      if (document.body.style.overflow === 'hidden') return;

      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      
      setLastScrollY(currentScrollY);
      setIsTop(currentScrollY < 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const shouldHideLayoutChrome =
    isDeveloperPage ||
    isLandingPage ||
    normalizedPathname === "/campus-360" ||
    PARTNER_HIDDEN_STICKY_ROUTES.some((route) => normalizedPathname === route || normalizedPathname.startsWith(`${route}/`));

  const isStickyHiddenRoute =
    STICKY_CTA_HIDDEN_ROUTES.some((route) => normalizedPathname === route || normalizedPathname.startsWith(`${route}/`));
  const isExploreStmarysPage =
    normalizedPathname === "/explore" ||
    normalizedPathname.startsWith("/explore/") ||
    normalizedPathname === "/explore-Stmarys" ||
    normalizedPathname.startsWith("/explore-Stmarys/");

  const shouldHideStickyElements =
    shouldHideLayoutChrome ||
    isStickyHiddenRoute ||
    isExploreStmarysPage;

  const shouldHideFooter = shouldHideLayoutChrome || isStickyHiddenRoute || isExploreStmarysPage;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Institutional Loading Bar */}
      {isNavLoading && (
        <div className="fixed top-0 left-0 right-0 z-[3000] h-1 overflow-hidden pointer-events-none">
          <div className="h-full bg-[#ffaf3a] animate-nav-progress origin-left shadow-[0_0_10px_#ffaf3a]" />
        </div>
      )}

      {!isDeveloperPage && !shouldHideLayoutChrome && (
        <div 
          className={`fixed top-0 left-0 right-0 z-[2200] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrollDir === "down" && !isTop ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <section className="h-10 bg-[#082244] border-b border-white/10">
            <div className="max-w-[1440px] mx-auto h-full px-3 sm:px-4 flex items-center gap-1.5 sm:gap-3">
              <span className="shrink-0 hidden md:inline-flex items-center cut-corner-badge bg-[#ffaf3a] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#0d315c]">
                Flash
              </span>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="smru-global-ticker-track">
                  {FLASH_UPDATES.map((item, idx) => {
                    const isExternalOrAsset = item.to.includes("/assets/") || item.to.startsWith("http");
                    
                    const content = (
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        {item.isPriority && (
                          <span className="animate-pulse bg-[#ea580c] text-white px-1.5 py-0.5 text-[7px] sm:text-[8px] font-black uppercase tracking-widest whitespace-nowrap">
                            New:{" "}
                          </span>
                        )}
                        <span className={item.isPriority ? "text-[#ffedd5] font-bold" : ""}>
                          {item.text}
                        </span>
                      </span>
                    );

                    return isExternalOrAsset ? (
                      <a
                        key={`${idx}-${item.text}`}
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`smru-global-ticker-item smru-global-ticker-link text-[10px] sm:text-[11px] ${item.isPriority ? "!text-[#ffaf3a]" : ""}`}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={`${idx}-${item.text}`}
                        href={item.to}
                        className={`smru-global-ticker-item smru-global-ticker-link text-[10px] sm:text-[11px] ${item.isPriority ? "!text-[#ffaf3a]" : ""}`}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <Link
                href="/admissions"
                className="shrink-0 inline-flex min-h-[28px] items-center cut-corner-badge border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.05em] sm:tracking-[0.12em] text-white hover:bg-white/20 transition-colors"
              >
                Important Notice
              </Link>
            </div>
          </section>
          <Navbar 
            isPartner={pathname === "/institutional-partner"} 
            isOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      )}

      <MobileMenu 
        isOpen={isMenuOpen} 
        closeMenu={() => setIsMenuOpen(false)} 
        openApply={openApplyModal} 
      />

      <ScrollToTop />

      <main
        className={`flex-1 ${
          isDeveloperPage
            ? ""
            : `${shouldHideLayoutChrome ? "" : "pt-[104px] lg:pt-[116px]"}`
        }`}
      >
        {children}
      </main>

      {!shouldHideStickyElements && (
        <>
          <div className="hidden lg:flex fixed right-0 top-[50%] z-[1200] pointer-events-none group/sidebar" style={{ transform: 'translateY(-50%)', WebkitTransform: 'translateY(-50%)' }}>
            <div className="flex flex-col items-end pointer-events-auto gap-2">
                <a
                  href={SITE_CTA_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center w-[52px] py-2.5 cut-corner-badge border border-black/5 transition-all duration-300 hover:w-[68px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[0_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#c6f6d5] to-[#9ae6b4]"
                >
                  <FaWhatsapp className="text-[18px] text-[#166534] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[7px] font-extrabold mt-1 text-[#166534] uppercase tracking-tighter">WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONTACT.primaryPhone.replace(/\s/g, "")}`}
                  className="relative flex flex-col items-center justify-center w-[52px] py-2.5 cut-corner-badge border border-black/5 transition-all duration-300 hover:w-[68px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[0_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#fef08a] to-[#fde047]"
                >
                  <FaPhoneAlt className="text-[14px] text-[#854d0e] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[7px] font-extrabold mt-1 text-[#854d0e] uppercase tracking-tighter">Call Us</span>
                </a>

                 <a
                  href={SITE_CTA_LINKS.apply}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center w-[52px] py-2.5 cut-corner-badge border border-black/5 transition-all duration-300 hover:w-[68px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[0_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]"
                >
                  <FaPaperPlane className="text-[14px] text-[#1e3a8a] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[7px] font-extrabold mt-1 text-[#1e3a8a] uppercase tracking-tighter">Apply</span>
                </a>

                <button
                  type="button"
                  onClick={openApplyModal}
                  className="relative flex flex-col items-center justify-center w-[52px] py-2.5 cut-corner-badge border border-black/5 transition-all duration-300 hover:w-[68px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[0_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#ffedd5] to-[#fed7aa]"
                >
                  <FaHeadset className="text-[14px] text-[#9a3412] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[7px] font-extrabold mt-1 text-[#9a3412] uppercase tracking-tighter text-center">Enquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => openMerittoModal()}
                  className="relative flex flex-col items-center justify-center w-[52px] py-2.5 cut-corner-badge border border-black/5 transition-all duration-300 hover:w-[68px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[0_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#fee2e2] to-[#fecaca]"
                >
                  <FaFileDownload className="text-[14px] text-[#991b1b] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[7px] font-extrabold mt-1 text-[#991b1b] uppercase tracking-tighter">Brochure</span>
                </button>
            </div>
          </div>

          <div className="lg:hidden fixed left-2 right-2 sm:left-3 sm:right-3 z-[1200] pointer-events-none pb-[env(safe-area-inset-bottom)] bottom-2">
            <div 
              className="grid grid-cols-5 gap-1 overflow-hidden cut-corner-panel border border-white/40 bg-white/88 p-1 shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-xl pointer-events-auto"
            >
              <a
                href={SITE_CTA_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaWhatsapp className="text-sm text-[#166534]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#166534]">WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONTACT.primaryPhone.replace(/\s/g, "")}`}
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fefce8] to-[#fef3c7] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaPhoneAlt className="text-[13px] text-[#854d0e]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#854d0e]">Call Us</span>
              </a>

              <a
                href={SITE_CTA_LINKS.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] py-1.5 sm:py-2 transition-all active:scale-90"
            >
                <FaPaperPlane className="text-[13px] text-[#1e3a8a]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#1e3a8a]">Apply</span>
              </a>

              <button
                type="button"
                onClick={openApplyModal}
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaHeadset className="text-[13px] text-[#9a3412]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#9a3412]">Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => openMerittoModal()}
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaFileDownload className="text-[13px] text-[#991b1b]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#991b1b]">Brochure</span>
              </button>
            </div>
          </div>
        </>
      )}

      <EnquiryModal open={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} />
      {!isDeveloperPage && !shouldHideFooter && !isPartnerPage && (
        <>
          <div className="w-full h-1.5 bg-[#019e6e]" />
          <Footer />
        </>
      )}

    </div>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showMerittoModal, setShowMerittoModal] = useState(false);
  const [merittoModalPayload, setMerittoModalPayload] = useState<MerittoModalPayload | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const openApplyModal = () => setShowEnquiryModal(true);
  const openMerittoModal = (payload?: MerittoModalPayload) => {
    setMerittoModalPayload(payload ?? null);
    setShowMerittoModal(true);
  };
  const closeMerittoModal = () => {
    setShowMerittoModal(false);
    setMerittoModalPayload(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Navigation transition and scroll position restore handled by Next.js natively
    // accessibility: restore focus to main heading for screen readers
    requestAnimationFrame(() => {
      try {
        const mainHeading = document.querySelector("main h1") as HTMLElement | null;
        if (mainHeading) {
          mainHeading.setAttribute("tabindex", "-1");
          mainHeading.focus({ preventScroll: true });
          // remove tabindex to keep DOM clean
          mainHeading.removeAttribute("tabindex");
        }
      } catch (e) {
        // ignore focus errors in non-browser environments
      }
    });
  }, [pathname]);

  return (
    <ApplyModalContext.Provider
      value={{
        showApplyModal: showEnquiryModal,
        openApplyModal,
        closeApplyModal: () => setShowEnquiryModal(false),
        showMerittoModal,
        openMerittoModal,
        closeMerittoModal,
        merittoModalPayload,
      }}
    >
      <ReactDomSafetyPatch />

      <AppShellContent 
        openApplyModal={openApplyModal}
        openMerittoModal={openMerittoModal}
        showEnquiryModal={showEnquiryModal}
        setShowEnquiryModal={setShowEnquiryModal}
      >
        {children}
      </AppShellContent>
      <MerittoApplyModal open={showMerittoModal} onClose={closeMerittoModal} payload={merittoModalPayload} />

    </ApplyModalContext.Provider>
  );
}
