// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import { FaComments, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt, FaWhatsapp, FaClock, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import useOpenApply from "../hooks/useOpenApply";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { CONTACT_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const MAP_EMBED_URL = "https://maps.google.com/maps?q=St.%20Mary%27s%20University%2C%20Deshmukhi&output=embed";

const Contact = () => {
  useEffect(() => {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (!revealTargets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openPopup = useOpenApply();

  return (
    <>
      <section id="contact-hero" className="scroll-mt-24 relative w-full min-h-[46vh] overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#f0fdfa] via-[#f8fafc] to-[#eff6ff]">
        {/* Abstract Image Hero */}
        <img 
          src={resolveAssetSrc(abstractHeroBg)} 
          alt="Abstract Background" 
          className="absolute inset-0 h-full w-full object-cover opacity-[0.05] scale-105 z-0 pointer-events-none mix-blend-multiply" 
        />

        <div className="relative z-20 max-w-6xl mx-auto px-4 pt-20 pb-10 md:pb-12 flex flex-col items-center justify-center text-center">
          <h1
            className="text-[clamp(3.1rem,9.5vw,9.1rem)] font-black font-outfit uppercase leading-[0.85] tracking-tighter text-[#0d315c] flex flex-col items-center"
            data-reveal="fade-up"
          >
            Contact 
            <span className="text-[#019e6e] text-[0.4em] tracking-normal mt-4 block font-bold capitalize">
              Stmarys University
            </span>
          </h1>
          <div className="mt-4 h-1.5 w-20 cut-corner-badge bg-[#ffaf3a] mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }} />
          <p
            className="mt-6 max-w-4xl text-[#0f1736] text-[clamp(0.95rem,1.45vw,1.5rem)] leading-[1.35] font-semibold"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            Admissions and campus helpdesk for students, parents, visitors, and public information requests. Our Deshmukhi campus is located near Ramoji Film City, Hyderabad.
          </p>
        </div>
      </section>

      <section id="details" className="scroll-mt-24 bg-[#f8fafc] py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-12">
            <div>
              <h2
                className="text-3xl font-black text-[#0d315c] mb-6 flex items-center gap-3"
                data-reveal="fade-right"
              >
                <span className="h-8 w-1.5 bg-[#019e6e] cut-corner-badge" />
                Regional Headquarters
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex gap-4" data-reveal="fade-up">
                    <div className="h-12 w-12 shrink-0 bg-white border border-slate-200 cut-corner-badge flex items-center justify-center text-[#019e6e] shadow-sm">
                      <FaMapMarkerAlt size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Campus Address</p>
                      <address className="text-[14px] font-bold text-[#0d315c] not-italic leading-relaxed mt-2">
                        <strong>Stmarys University</strong><br />
                        <span className="text-slate-600 font-medium">Main Campus & Administrative Headquarters</span><br />
                        Near Ramoji Film City, Deshmukhi Village,<br />
                        Pochampally Mandal, Yadadri Bhuvanagiri District,<br />
                        Hyderabad Metropolitan Region,<br />
                        Telangana State, India - 508284.
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
                    <div className="h-12 w-12 shrink-0 bg-white border border-slate-200 cut-corner-badge flex items-center justify-center text-[#019e6e] shadow-sm">
                      <FaPhoneAlt size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Admissions Helpdesk</p>
                      <p className="text-[15px] font-black text-[#0d315c]">{SITE_CONTACT.primaryPhone}</p>
                      <p className="text-[12px] font-bold text-slate-500">Mon-Sat: 9:30 AM - 5:30 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-4" data-reveal="fade-up" style={{ "--delay": "0.2s" }}>
                    <div className="h-12 w-12 shrink-0 bg-[#25d366]/10 border border-[#25d366]/20 cut-corner-badge flex items-center justify-center text-[#25d366] shadow-sm">
                      <FaWhatsapp size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#25d366] mb-1">WhatsApp Admissions</p>
                      <a href={SITE_CTA_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[15px] font-black text-[#0d315c] hover:text-[#019e6e] transition-colors underline decoration-dotted underline-offset-4">
                        Chat with Counsellors
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8fafc] border border-[#bae6fd] cut-corner-panel p-6 space-y-4">
                   <h3 className="text-[12px] font-black text-[#0369a1] uppercase tracking-widest flex items-center gap-2">
                     <FaClock /> Campus Visit Status
                   </h3>
                   <p className="text-[13px] font-bold text-[#0d315c] leading-relaxed">
                     Campus visits are encouraged for prospective students. Please schedule your visit at least 24 hours in advance for a guided laboratory tour.
                   </p>
                   <button onClick={openPopup} className="w-full py-3 bg-[#0369a1] text-white cut-corner-badge font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-[#075985] transition-all">
                     Request Campus Visit
                   </button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
               <h3 className="text-xl font-black text-[#0d315c] mb-6">Directions & Accessibility</h3>
               <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-6 bg-white border border-slate-100 cut-corner-card shadow-sm space-y-3">
                     <p className="text-[11px] font-black text-[#ffaf3a] uppercase tracking-widest">From Hyderabad City</p>
                     <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                       Take the Vijayawada Highway (NH65). Pass the Outer Ring Road (ORR) junction at L.B. Nagar. Continue towards Deshmukhi via the Ramoji Film City entrance route.
                     </p>
                  </div>
                  <div className="p-6 bg-white border border-slate-100 cut-corner-card shadow-sm space-y-3">
                     <p className="text-[11px] font-black text-[#ffaf3a] uppercase tracking-widest">Local Landmarks</p>
                     <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                       Located 15 minutes from the Ramoji Film City main gate. Easily accessible via university shuttle buses from major pickup points in Hyderabad.
                     </p>
                  </div>
               </div>
            </div>

            <div
              id="map"
              className="scroll-mt-24 relative cut-corner-panel overflow-hidden shadow-2xl group border-4 border-white"
              data-reveal="fade-up"
            >
              <div className="h-[400px] w-full">
                <iframe
                  title="Stmarys University Campus Location"
                  loading="lazy"
                  className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={MAP_EMBED_URL}
                  allowFullScreen
                />
              </div>
              <div className="absolute left-6 bottom-6 px-4 py-2 bg-[#0d315c] text-white cut-corner-badge text-[10px] font-black uppercase tracking-widest shadow-xl">
                Stmarys University Deshmukhi Campus
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border-2 border-[#ffaf3a]/30 cut-corner-panel p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffaf3a]/5 cut-corner-badge -mr-12 -mt-12" />
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-[#ffaf3a]/10 cut-corner-badge flex items-center justify-center text-[#ffaf3a] text-2xl">
                  <FaComments />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#0d315c] tracking-tight">Admissions Enquiry</h2>
                  <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                    Get personal guidance on programme selection, eligibility, scholarships, and the 2026-27 admission process.
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={openPopup}
                    className="w-full py-5 bg-[#0d315c] text-white cut-corner-badge font-black text-[13px] uppercase tracking-widest shadow-lg hover:bg-[#1a4a84] transition-all transform hover:-translate-y-1"
                  >
                    Start Admission Enquiry
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                    Admissions team will respond through official contact routes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f8fafc] border border-[#dce7f3] cut-corner-panel p-8 space-y-6">
               <h3 className="text-[12px] font-black text-[#0d315c] uppercase tracking-widest border-b border-[#dce7f3] pb-3">Corporate & Support</h3>
               <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="mt-1 text-[#019e6e]" />
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                      <a href={`mailto:${SITE_CONTACT.email}`} className="text-[14px] font-bold text-[#0d315c] hover:underline">{SITE_CONTACT.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img src="/assets/Stmarys-Logo.webp" className="w-5 h-5 object-contain mt-1" alt="Safety" />
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Campus Safety</p>
                      <p className="text-[14px] font-bold text-[#0d315c]">24/7 Security: {SITE_CONTACT.secondaryPhone}</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {SHOW_PUBLIC_SEO_SECTIONS && (
        <section className="bg-gray-50 px-4 pb-16">
          <div className="max-w-6xl mx-auto space-y-8">
            <LinkGridSection
              title="Visit & Public Information"
              items={[
                { href: "/campus-location-hyderabad", label: "Campus Location Hyderabad", description: "Verified campus address and location details published on the site." },
                { href: "/campus-360", label: "Visit Campus", description: "Campus tour page with contact guidance." },
                { href: "/campus-location-hyderabad", label: "How to Reach Stmarys University", description: "Public route and campus access guidance through the verified campus location page." },
                { href: "/contact-directory", label: "Contact Directory", description: "Public contact routes listed on the website." },
                { href: "/grievance-redressal", label: "Grievance Redressal", description: "Student support route with official contact guidance." },
                { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Trust and public disclosure page for verified documents." },
              ]}
            />
            <FaqSection title="Frequently Asked Questions" items={CONTACT_FAQS} />
          </div>
        </section>
      )}

      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{
          opacity:0; transform: translateY(14px); filter: blur(0);
          transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), filter .7s var(--ease-out);
          transition-delay: var(--delay, 0s); will-change: opacity, transform;
        }
        [data-reveal].is-visible{ opacity:1; transform:none; filter: blur(0); }
        [data-reveal=fade-up]{ transform: translateY(18px); }
        [data-reveal=fade-left]{ transform: translateX(22px); }
        [data-reveal=fade-right]{ transform: translateX(-22px); }
        [data-reveal=zoom-in]{ transform: translateY(12px); }
      `}</style>
    </>
  );
};

export default Contact;
