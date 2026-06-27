"use client";
import React from "react";
import Link from "next/link";
import { schools } from "../data/schools";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronUp
} from "react-icons/fa";
import { SITE_CONTACT, SITE_CTA_LINKS, SITE_SOCIAL_LINKS } from "@/lib/shared/site-constants";
import { getSchoolLandingPath } from "@/lib/shared/school-landing";

import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";

const Footer = () => {
  const { state } = useDeveloperCms();

  const getCmsContent = (id: string, separator = " | ") => {
    const page = state.pages.find((p) => p.id === id);
    return page?.content ? page.content.split(separator).map((s) => s.trim()) : [];
  };
  const normalizePhoneDisplay = (value: string) => {
    const compact = value.replace(/[^\d+]/g, "");
    if (compact === "08065459645" || compact === "+918065459645") return "08065459645";
    if (compact === "+919493321969" || compact === "9493321969") return "9493321969";
    return value;
  };

  const cmsContact = getCmsContent("page-contact-primary"); // [phone1, phone2, email, address]
  const address = cmsContact[3] || SITE_CONTACT.address;
  const primaryPhone = normalizePhoneDisplay(cmsContact[0] || SITE_CONTACT.primaryPhone);
  const secondaryPhone = normalizePhoneDisplay(cmsContact[1] || SITE_CONTACT.secondaryPhone);
  const email = cmsContact[2] || SITE_CONTACT.email;


  const socialIconLinks = [
    { icon: FaYoutube, href: SITE_SOCIAL_LINKS.youtube, label: "YouTube" },
    { icon: FaFacebookF, href: SITE_SOCIAL_LINKS.facebook, label: "Facebook" },
    { icon: FaInstagram, href: SITE_SOCIAL_LINKS.instagram, label: "Instagram" },
    { icon: FaLinkedinIn, href: SITE_SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  ];
  const academicLinks = (schools || []).filter(s => s.visibility !== "hidden").slice(0, 6);
  


  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full overflow-hidden bg-[linear-gradient(180deg,#143a6b_0%,#0d315c_100%)] font-outfit text-white pb-[116px] lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 pt-8 md:pt-14 pb-6">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] xl:gap-12">
          {/* Logo, Connect & Social */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div>
                <h3 className="text-3xl md:text-4xl font-black italic tracking-tight text-[#ffaf3a] leading-none">
                  Stmarys
                </h3>
                <p className="mt-1 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                  University
                </p>
              </div>
              <p className="max-w-xs text-[13px] md:text-[14px] font-medium leading-relaxed text-white/40">
                Stmarys University educational legacy, now advancing rehabilitation-led professional education.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Contact</h4>
              <div className="space-y-3 text-[13px] font-medium text-white/50">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-[#ffaf3a]" size={14} />
                  <p className="leading-relaxed">{address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 shrink-0 text-[#ffaf3a]" size={13} />
                  <div>
                    <p>{primaryPhone}</p>
                    <p>{secondaryPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0 text-[#ffaf3a]" size={13} />
                  <p className="break-all">{email}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Social</h4>
              <div className="flex gap-3">
                {socialIconLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center cut-corner-badge border border-white/10 bg-white/5 text-white transition-all hover:bg-[#ffaf3a] hover:text-[#0d315c]"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Academics */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Academics</h4>
            <nav aria-label="Academics">
              <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                <li><Link href="/schools" className="transition-colors hover:text-white">Schools</Link></li>
                {academicLinks.map((school) => (
                  <li key={school.slug}>
                    <Link
                      href={getSchoolLandingPath(school.slug)}
                      className="transition-colors hover:text-white"
                    >
                      {school.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Admissions & Campus */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Admissions</h4>
              <nav aria-label="Admissions">
                <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                  <li><a href={SITE_CTA_LINKS.apply} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Apply Now</a></li>
                  <li><Link href="/admissions" className="transition-colors hover:text-white">Admissions Overview</Link></li>
                  <li><Link href="/phd-admissions" className="transition-colors hover:text-white">Ph.D. Admissions</Link></li>
                  <li><Link href="/fee-structure" className="transition-colors hover:text-white">Fee Structure</Link></li>
                  <li><Link href="/admission-policy" className="transition-colors hover:text-white">Admission Policy</Link></li>
                </ul>
              </nav>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Campus</h4>
              <nav aria-label="Campus">
                <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                  <li><Link href="/campus-location-hyderabad" className="transition-colors hover:text-white">Campus Location</Link></li>
                  <li><Link href="/campus-360" className="transition-colors hover:text-white">Visit Campus</Link></li>
                  <li><Link href="/hostel" className="transition-colors hover:text-white">Hostel Facilities</Link></li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Student Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Student Support</h4>
            <nav aria-label="Student Support">
              <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                <li><Link href="/anti-ragging" className="transition-colors hover:text-white">Anti-Ragging</Link></li>
                <li><Link href="/grievance-redressal" className="transition-colors hover:text-white">Grievance Redressal</Link></li>
                <li><Link href="/ombudsperson" className="transition-colors hover:text-white">Ombudsperson</Link></li>
                <li><Link href="/search" className="transition-colors hover:text-white">Site Search</Link></li>
                <li><Link href="/admissions" className="transition-colors hover:text-white">Admissions</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-white">Career Guidance</Link></li>
                <li><Link href="/contact-directory" className="transition-colors hover:text-white">Contact Directory</Link></li>
              </ul>
            </nav>
          </div>

          {/* University Information & Disclosures */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Information & Disclosures</h4>
            <nav aria-label="University Information & Disclosures">
              <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                <li><Link href="/approvals-recognitions" className="transition-colors hover:text-white">Approvals & Recognitions</Link></li>
                <li><Link href="/leadership/all" className="transition-colors hover:text-white">Governance & Leadership</Link></li>
                <li><a href="/assets/St.%20Marys%20Rehabilitation%20University%20UGC%20recognition%20letter%202(f).pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">UGC Recognition Letter</a></li>
                <li><a href="/assets/SMRU%20Act%2010%20of%202026.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">University Establishment Act</a></li>
                <li><Link href="/mandatory-disclosure" className="transition-colors hover:text-white">Mandatory Disclosure</Link></li>
                <li><Link href="/public-information" className="transition-colors hover:text-white">Public Information</Link></li>
                <li><Link href="/statutory-disclosures" className="transition-colors hover:text-white">Statutory Disclosures</Link></li>
                <li><Link href="/iqac-quality-assurance" className="transition-colors hover:text-white">IQAC & Quality</Link></li>
                <li><Link href="/first-academic-year-disclosures" className="transition-colors hover:text-white">University Cycle Note</Link></li>
                <li><Link href="/sponsor-society" className="transition-colors hover:text-white">Sponsor Society</Link></li>
                <li><Link href="/accessibility-statement" className="transition-colors hover:text-white">Accessibility Statement</Link></li>
                <li><Link href="/Stmarys-facts" className="transition-colors hover:text-[#019e6e] font-bold">Stmarys University Facts & AI Guidance</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="relative mt-8 md:mt-12 border-t border-white/[0.08] pt-10 md:pt-12">
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Scroll to top"
            className="absolute left-1/2 top-0 flex h-13 w-13 md:h-14 md:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center cut-corner-badge bg-[#10bb82] text-white shadow-[0_20px_45px_rgba(1,158,110,0.35)] transition-transform hover:scale-105"
          >
            <FaChevronUp size={18} />
          </button>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="py-4">
              <p className="text-[13px] font-black uppercase tracking-[0.42em] text-white/40">
                Official Stmarys University Website
              </p>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.08em] text-white/25">
                Stmarys University is officially established as St. Mary’s Rehabilitation University under Telangana Gazette Act No. 10 of 2026.<br />
                Copyrights © 2026 Stmarys University. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/[0.35] md:justify-end">
              <Link href="/privacy-policy" className="transition-colors hover:text-white/70">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="transition-colors hover:text-white/70">
                Terms Of Service
              </Link>
              <Link href="/schools" className="text-[#ffaf3a] transition-colors hover:text-white">
                Academics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
