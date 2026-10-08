// @ts-nocheck
"use client";
import React, { useState, useEffect, useMemo } from "react";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import {
  CAREER_BENEFITS,
  CAREER_OPENINGS,
  RECRUITMENT_NOTICE_META,
  VC_NOTIFICATION_DATA,
  REGISTRAR_NOTIFICATION_DATA,
  ASST_REGISTRAR_NOTIFICATION_DATA,
  FACULTY_NOTIFICATION_DATA,
  RECRUITMENT_DOCUMENTS,
} from "@/data/careers";
import {
  FiUsers,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiMapPin,
  FiMail,
  FiGlobe,
  FiActivity,
  FiEdit3,
  FiUserCheck,
  FiBriefcase,
  FiHeart,
  FiMonitor,
  FiPhone,
  FiDownload,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiInfo,
  FiExternalLink,
  FiEye,
  FiChevronRight,
  FiChevronDown,
  FiX,
  FiMaximize2,
  FiPaperclip,
  FiCalendar,
  FiCheck,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import {
  FaAward,
  FaHeartbeat,
  FaHandsHelping,
  FaChartLine,
  FaGraduationCap,
  FaUniversity,
  FaBalanceScale,
  FaStethoscope,
  FaBrain,
  FaUserNurse,
  FaLaptopCode,
} from "react-icons/fa";

import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";

const iconForBenefit = (label = "") => {
  const t = label.toLowerCase();
  if (t.includes("culture")) return <FiUsers aria-hidden />;
  if (t.includes("research") || t.includes("growth")) return <FiBookOpen aria-hidden />;
  if (t.includes("wellness") || t.includes("benefit")) return <FiAward aria-hidden />;
  if (t.includes("career") || t.includes("development")) return <FiTrendingUp aria-hidden />;
  if (t.includes("global")) return <FiGlobe aria-hidden />;
  if (t.includes("inclusive") || t.includes("diverse")) return <FiHeart aria-hidden />;
  if (t.includes("infrastructure")) return <FiMonitor aria-hidden />;
  if (t.includes("mentorship")) return <FiUserCheck aria-hidden />;
  return <FiAward aria-hidden />;
};

const schoolIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("rehabilitation")) return <FaHandsHelping className="text-[#019e6e]" />;
  if (n.includes("allied") || n.includes("health")) return <FaStethoscope className="text-[#0d315c]" />;
  if (n.includes("psychology")) return <FaBrain className="text-[#019e6e]" />;
  if (n.includes("nursing")) return <FaUserNurse className="text-[#0d315c]" />;
  if (n.includes("engineering")) return <FaLaptopCode className="text-[#019e6e]" />;
  if (n.includes("law")) return <FaBalanceScale className="text-[#0d315c]" />;
  return <FaGraduationCap className="text-[#019e6e]" />;
};

export default function Careers() {
  const { state } = useDeveloperCms();

  // Navigation & Tabs State
  const [activeTab, setActiveTab] = useState("vc"); // 'vc' | 'admin-faculty'
  const [adminSubTab, setAdminSubTab] = useState("registrar"); // 'registrar' | 'asst-registrar' | 'faculty'
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isPosterZoomed, setIsPosterZoomed] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Close modal on Escape key and prevent background scrolling
  useEffect(() => {
    if (!isPosterModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsPosterModalOpen(false);
        setIsPosterZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isPosterModalOpen]);

  // Read URL Hash on mount or popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("vc") || hash.includes("vice-chancellor")) {
        setActiveTab("vc");
      } else if (
        hash.includes("registrar") ||
        hash.includes("faculty") ||
        hash.includes("admin")
      ) {
        setActiveTab("admin-faculty");
        if (hash.includes("asst-registrar") || hash.includes("assistant")) {
          setAdminSubTab("asst-registrar");
        } else if (hash.includes("faculty")) {
          setAdminSubTab("faculty");
        } else if (hash.includes("registrar")) {
          setAdminSubTab("registrar");
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const newHash = tab === "vc" ? "#vc" : "#registrar-faculty";
      window.history.replaceState(null, "", newHash);
    }
  };

  const copyToClipboard = (email) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  const benefits = useMemo(() => {
    const page = state.pages.find((item) => item.id === "page-careers-benefits");
    const fromCms = page?.content ? page.content.split(";").map((item) => item.trim()) : [];
    const source = fromCms.length > 0 ? fromCms : CAREER_BENEFITS;
    return source.map((text) => ({ icon: iconForBenefit(text), text }));
  }, [state.pages]);

  // ---- Reveal Animations (IntersectionObserver) ----
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [activeTab, adminSubTab]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        id="careers-hero"
        className="scroll-mt-24 relative w-full overflow-hidden min-h-[48vh] flex items-center justify-center bg-[#f8fafc]"
      >
        {/* Clean Institutional Light Wash Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0fdfa] via-[#f8fafc] to-[#eff6ff]" />

        {/* HERO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={resolveAssetSrc(abstractHeroBg)}
            alt="Institutional Background"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.05] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#f5f9ff]" />
        </div>

        <div className="smru-container relative z-20 pt-10 md:pt-16 pb-8 md:pb-14 flex flex-col items-center justify-center text-center">
          {/* Institutional Badge */}
          <div
            className="inline-flex items-center gap-2 bg-[#0d315c]/5 text-[#0d315c] border border-[#0d315c]/15 px-4 py-1.5 cut-corner-badge text-xs md:text-sm font-semibold tracking-wide uppercase mb-4"
            data-reveal="fade-up"
          >
            <span className="w-2 h-2 rounded-full bg-[#019e6e] animate-pulse" />
            Official Employment Notification &bull; Ref: {RECRUITMENT_NOTICE_META.notificationNo} &bull; Dated {RECRUITMENT_NOTICE_META.notificationDate}
          </div>

          <h1 className="smru-h1 text-[#0d315c] flex flex-col items-center" data-reveal="fade-up">
            Careers &amp; Appointments
            <span className="text-[#019e6e] text-[0.42em] tracking-normal mt-3 block font-bold capitalize">
              St. Mary's Rehabilitation University, Hyderabad
            </span>
          </h1>

          <div
            className="mt-4 h-1.5 w-24 cut-corner-badge bg-[#ffaf3a] mx-auto"
            data-reveal="fade-up"
            style={{ "--delay": "0.1s" }}
          />

          <p
            className="mt-5 max-w-4xl text-[#0f1736] text-[clamp(0.95rem,1.35vw,1.35rem)] leading-relaxed font-medium"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            Inviting applications and nominations for the appointment of <strong>Regular Vice-Chancellor</strong>, 
            <strong> Registrar</strong>, <strong>Assistant Registrar</strong>, and <strong>Faculty (Professors, Associate Professors, Assistant Professors)</strong> across 6 Specialized Schools.
          </p>

          {/* Quick Jump Buttons */}
          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-3.5"
            data-reveal="fade-up"
            style={{ "--delay": "0.12s" }}
          >
            <a
              href="#recruitment-tabs"
              onClick={() => handleTabSwitch("vc")}
              className={`px-5 py-2.5 cut-corner-badge font-semibold text-sm transition shadow-sm flex items-center gap-2 ${
                activeTab === "vc"
                  ? "bg-[#019e6e] text-white hover:bg-[#00875e]"
                  : "bg-white text-[#0d315c] border border-[#0d315c]/20 hover:border-[#019e6e]"
              }`}
            >
              <FaUniversity className="text-base" />
              Vice-Chancellor (VC) Tab
            </a>

            <a
              href="#recruitment-tabs"
              onClick={() => handleTabSwitch("admin-faculty")}
              className={`px-5 py-2.5 cut-corner-badge font-semibold text-sm transition shadow-sm flex items-center gap-2 ${
                activeTab === "admin-faculty"
                  ? "bg-[#0d315c] text-white hover:bg-[#1a447a]"
                  : "bg-white text-[#0d315c] border border-[#0d315c]/20 hover:border-[#0d315c]"
              }`}
            >
              <FiUsers className="text-base" />
              Registrar, Asst. Registrar &amp; Faculty Tab
            </a>

            <button
              onClick={() => setIsPosterModalOpen(true)}
              className="px-5 py-2.5 cut-corner-badge font-semibold text-sm bg-[#ffaf3a]/15 text-[#915e00] border border-[#ffaf3a]/40 hover:bg-[#ffaf3a]/25 transition flex items-center gap-2"
            >
              <FiEye className="text-base" />
              View Newspaper Ad Poster
            </button>
          </div>
        </div>
      </section>

      {/* ===== OFFICIAL STATUTORY ADVISORY STRIP ===== */}
      <section className="bg-gradient-to-r from-[#0d315c] via-[#103a6d] to-[#0d315c] text-white py-4 border-y border-[#ffaf3a]/30 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#ffaf3a]/20 text-[#ffaf3a] cut-corner-badge font-bold">
              <FiClock className="text-lg" />
            </span>
            <div>
              <p className="font-semibold text-slate-100">
                Application Timeline: <span className="text-[#ffaf3a]">21 Clear Calendar Days</span> from newspaper publication or website upload.
              </p>
              <p className="text-slate-300 text-[11px] md:text-xs">
                Detailed eligibility criteria, terms of appointment, application formats, and statutory schedules available below.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${RECRUITMENT_NOTICE_META.vcSubmissionEmail}`}
              className="text-white hover:text-[#ffaf3a] transition underline underline-offset-2 flex items-center gap-1.5"
            >
              <FiMail /> VC: {RECRUITMENT_NOTICE_META.vcSubmissionEmail}
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <a
              href={`mailto:${RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail}`}
              className="text-white hover:text-[#ffaf3a] transition underline underline-offset-2 flex items-center gap-1.5"
            >
              <FiMail /> Other Posts: {RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail}
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <a
              href={`tel:+91${RECRUITMENT_NOTICE_META.enquiryPhone}`}
              className="text-[#ffaf3a] font-bold hover:underline flex items-center gap-1"
            >
              <FiPhone /> +91 {RECRUITMENT_NOTICE_META.enquiryPhone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== MAIN RECRUITMENT TABS SECTION ===== */}
      <section id="recruitment-tabs" className="scroll-mt-24 max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8" data-reveal="fade-up">
          <span className="text-[#019e6e] text-xs font-bold uppercase tracking-widest bg-[#019e6e]/10 px-3.5 py-1 cut-corner-badge">
            Official Employment Notifications
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0d315c] mt-3 tracking-tight">
            Institutional Recruitment Portal
          </h2>
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            Select a recruitment tab below to view the official Post Notification, detailed statutory requirements, and download the prescribed editable application forms.
          </p>
        </div>

        {/* PRIMARY TAB SWITCHER */}
        <div
          role="tablist"
          aria-label="Recruitment Tabs"
          className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mb-10 p-1.5 bg-slate-100 cut-corner-panel border border-slate-200"
          data-reveal="fade-up"
        >
          {/* TAB 1: VICE-CHANCELLOR */}
          <button
            role="tab"
            id="tab-vc-button"
            aria-selected={activeTab === "vc"}
            aria-controls="tab-vc-panel"
            onClick={() => handleTabSwitch("vc")}
            className={`flex-1 flex flex-col items-center justify-center p-4 cut-corner-badge transition-all text-center ${
              activeTab === "vc"
                ? "bg-[#0d315c] text-white shadow-md ring-2 ring-[#019e6e]"
                : "bg-white text-[#0d315c] hover:bg-slate-50 hover:text-[#019e6e]"
            }`}
          >
            <div className="flex items-center gap-2">
              <FaUniversity className={`text-xl ${activeTab === "vc" ? "text-[#ffaf3a]" : "text-[#019e6e]"}`} />
              <span className="text-base md:text-lg font-bold">1. Vice-Chancellor (VC)</span>
            </div>
            <span className={`text-xs mt-1 ${activeTab === "vc" ? "text-slate-200" : "text-slate-500"}`}>
              Post Notification &amp; Detailed VC Appointment
            </span>
          </button>

          {/* TAB 2: REGISTRAR, ASST. REGISTRAR & FACULTY */}
          <button
            role="tab"
            id="tab-admin-faculty-button"
            aria-selected={activeTab === "admin-faculty"}
            aria-controls="tab-admin-faculty-panel"
            onClick={() => handleTabSwitch("admin-faculty")}
            className={`flex-1 flex flex-col items-center justify-center p-4 cut-corner-badge transition-all text-center ${
              activeTab === "admin-faculty"
                ? "bg-[#0d315c] text-white shadow-md ring-2 ring-[#019e6e]"
                : "bg-white text-[#0d315c] hover:bg-slate-50 hover:text-[#019e6e]"
            }`}
          >
            <div className="flex items-center gap-2">
              <FiUsers className={`text-xl ${activeTab === "admin-faculty" ? "text-[#ffaf3a]" : "text-[#019e6e]"}`} />
              <span className="text-base md:text-lg font-bold">2. Registrar, Asst. Registrar &amp; Faculty</span>
            </div>
            <span className={`text-xs mt-1 ${activeTab === "admin-faculty" ? "text-slate-200" : "text-slate-500"}`}>
              Administration &amp; Faculty Across 6 Schools
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* ================= TAB 1: VICE-CHANCELLOR ================= */}
        {/* ========================================================= */}
        {activeTab === "vc" && (
          <div
            id="tab-vc-panel"
            role="tabpanel"
            aria-labelledby="tab-vc-button"
            className="space-y-12 animate-fadeIn"
          >
            {/* SUB-SECTION 1: VC POST NOTIFICATION */}
            <div className="bg-white cut-corner-panel shadow-lg border border-slate-200 p-6 md:p-10">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between pb-8 border-b border-slate-200">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#019e6e]/10 text-[#019e6e] px-3.5 py-1 cut-corner-badge text-xs font-bold uppercase">
                    <FiAward /> Leadership Appointment Notification
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0d315c] leading-tight">
                    Appointment of Regular Vice-Chancellor
                  </h3>

                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    Applications and nominations are invited for appointment to the post of <strong>Regular Vice-Chancellor</strong> in 
                    <strong> St. Mary's Rehabilitation University</strong>, Hyderabad, Telangana from eligible distinguished academicians 
                    with proven competence, integrity, moral standing, and academic leadership.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Notification Number:</span>
                      <span className="text-[#0d315c] font-bold text-sm">{VC_NOTIFICATION_DATA.notificationNo}</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Notification Date:</span>
                      <span className="text-[#0d315c] font-bold text-sm">{VC_NOTIFICATION_DATA.date}</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Nature &amp; Tenure of Office:</span>
                      <span className="text-[#0d315c] font-bold text-sm">3 Years (or until 70 yrs of age) &bull; Full-time Salaried</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Designated Application Email:</span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[#019e6e] font-bold text-sm">{VC_NOTIFICATION_DATA.submissionEmail}</span>
                        <button
                          onClick={() => copyToClipboard(VC_NOTIFICATION_DATA.submissionEmail)}
                          className="text-xs bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded text-slate-700 font-medium"
                          title="Copy email address"
                        >
                          {copiedEmail === VC_NOTIFICATION_DATA.submissionEmail ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={VC_NOTIFICATION_DATA.downloadDocx}
                      download={VC_NOTIFICATION_DATA.filename}
                      className="inline-flex items-center gap-2 bg-[#019e6e] text-white px-6 py-3 cut-corner-badge font-bold text-sm shadow hover:bg-[#00875e] transition"
                    >
                      <FiDownload className="text-lg" />
                      Download SMRU VC Notification &amp; Form (.docx)
                    </a>

                    <a
                      href={`mailto:${VC_NOTIFICATION_DATA.submissionEmail}?subject=Application%20for%20Regular%20Vice-Chancellor%20-%20SMRU`}
                      className="inline-flex items-center gap-2 bg-[#0d315c] text-white px-5 py-3 cut-corner-badge font-semibold text-sm hover:bg-[#1a447a] transition"
                    >
                      <FiMail className="text-lg" />
                      Submit to Chancellor Portal
                    </a>

                    <button
                      onClick={() => setIsPosterModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 border border-slate-300 px-4 py-3 cut-corner-badge font-semibold text-sm hover:bg-slate-200 transition"
                    >
                      <FiEye className="text-lg text-[#019e6e]" />
                      View Ad Poster
                    </button>
                  </div>
                </div>

                {/* Poster Preview Card */}
                <div className="w-full lg:w-72 bg-gradient-to-b from-slate-50 to-slate-100 p-4 cut-corner-card border border-slate-300 shadow-sm flex flex-col items-center text-center">
                  <div
                    onClick={() => setIsPosterModalOpen(true)}
                    className="relative cursor-pointer group overflow-hidden border border-slate-200 shadow rounded bg-white w-full aspect-[3/4] flex items-center justify-center"
                  >
                    <img
                      src={RECRUITMENT_NOTICE_META.posterImage}
                      alt="Employment Notification Poster"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-[#0d315c]/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white p-4">
                      <FiMaximize2 className="text-3xl mb-2 text-[#ffaf3a]" />
                      <span className="text-xs font-bold uppercase tracking-wider">Click to Zoom Ad Poster</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 font-semibold mt-3">
                    Newspaper Employment Ad Poster
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Dated 05.10.2026 &bull; SMRU/2026-27/VC.APP/01
                  </span>
                  <button
                    onClick={() => setIsPosterModalOpen(true)}
                    className="mt-3 text-xs text-[#019e6e] hover:underline font-bold flex items-center gap-1"
                  >
                    <FiEye /> Expand Full Poster
                  </button>
                </div>
              </div>

              {/* Notice Details Callout Banner */}
              <div className="mt-6 bg-[#f0fdfa] border-l-4 border-[#019e6e] p-4 text-xs md:text-sm text-slate-700">
                <strong>Important Notice on Submission Period:</strong> The last date for receipt of applications shall be 
                <strong> 21 clear calendar days</strong> from the later of (i) the date of publication of this notification in the newspaper, 
                or (ii) the date on which the detailed notification is uploaded on the University website. 
                Complete applications with prescribed supporting documents, vision statement, and referees must be received within the stipulated window.
              </div>
            </div>

            {/* SUB-SECTION 2: SMRU VC APPOINTMENT DETAILED NOTIFICATION */}
            <div className="bg-white cut-corner-panel shadow-lg border border-slate-200 p-6 md:p-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#019e6e]">
                    Section II &bull; Official Detailed Document
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0d315c] mt-1">
                    SMRU VC Appointment Detailed Notification
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-1">
                    Eligibility criteria, terms of appointment, governance mandates, and application guidelines under statutory framework.
                  </p>
                </div>

                <a
                  href={VC_NOTIFICATION_DATA.downloadDocx}
                  download={VC_NOTIFICATION_DATA.filename}
                  className="inline-flex items-center gap-2 bg-[#0d315c] text-white hover:bg-[#019e6e] px-5 py-2.5 cut-corner-badge font-semibold text-xs md:text-sm transition self-start md:self-auto shrink-0"
                >
                  <FiDownload />
                  Download Full Form (.docx)
                </a>
              </div>

              {/* GRID OF STATUTORY REQUIREMENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Governing Provisions */}
                <div className="bg-slate-50 p-6 cut-corner-card border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-[#0d315c] font-bold text-base md:text-lg">
                    <FaBalanceScale className="text-[#019e6e]" />
                    <h4>1. Statutory Governance Framework</h4>
                  </div>
                  <ul className="space-y-2 text-xs md:text-sm text-slate-700 list-disc list-inside">
                    {VC_NOTIFICATION_DATA.governingFramework.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* 2. Tenure & Remuneration */}
                <div className="bg-slate-50 p-6 cut-corner-card border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-[#0d315c] font-bold text-base md:text-lg">
                    <FiClock className="text-[#019e6e]" />
                    <h4>2. Tenure, Pay &amp; Office Conditions</h4>
                  </div>
                  <div className="space-y-2 text-xs md:text-sm text-slate-700">
                    <p>
                      <strong>Term of Office:</strong> {VC_NOTIFICATION_DATA.tenure}
                    </p>
                    <p>
                      <strong>Nature of Office:</strong> Full-time salaried statutory office. Incompatible outside commitments must be resolved prior to assumption of charge.
                    </p>
                    <p>
                      <strong>Emoluments &amp; Allowances:</strong> {VC_NOTIFICATION_DATA.remuneration}
                    </p>
                    <p>
                      <strong>Resignation Notice:</strong> Six (6) months' written notice addressed to the Chancellor under Statute 8.1(g).
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Essential Eligibility Routes (UGC Reg 7.3) */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0d315c] flex items-center gap-2">
                  <FiCheckCircle className="text-[#019e6e]" />
                  3. Essential Eligibility Routes (UGC Regulation 7.3(i))
                </h4>
                <p className="text-xs md:text-sm text-slate-600">
                  Candidate must be a distinguished academician with high competence, integrity, moral standing, and commitment to the institution, fulfilling either Route (a) or Route (b):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VC_NOTIFICATION_DATA.eligibilityRoutes.map((rt, i) => (
                    <div
                      key={i}
                      className="p-6 bg-gradient-to-br from-white to-[#f0fdfa] border-2 border-[#019e6e]/30 cut-corner-card space-y-3 shadow-sm"
                    >
                      <span className="inline-block bg-[#019e6e] text-white px-3 py-1 cut-corner-badge text-xs font-bold uppercase tracking-wider">
                        {rt.route}
                      </span>
                      <p className="font-bold text-[#0d315c] text-sm md:text-base leading-snug">
                        {rt.qualification}
                      </p>
                      <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                        <strong>Mandatory Evidence:</strong> {rt.evidence}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded text-xs md:text-sm text-amber-900 space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5 text-amber-950">
                    <FiInfo /> Critical Scrutiny Rules on Eligibility:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-800 text-xs">
                    <li>Ten years of teaching experience in total does not by itself establish ten years of service as Professor.</li>
                    <li>Designation such as Principal, Dean, or Director does not by itself establish eligibility without proving required academic leadership.</li>
                    <li>The statutory age ceiling for holding office is 70 years. Retired candidates may apply if within this limit.</li>
                    <li>Strict non-overlapping calendar calculation applies; concurrent service cannot be counted twice.</li>
                  </ul>
                </div>
              </div>

              {/* 4. Principal Responsibilities & Governance */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0d315c] flex items-center gap-2">
                  <FaUniversity className="text-[#019e6e]" />
                  4. Principal Responsibilities &amp; Statutory Role
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {VC_NOTIFICATION_DATA.responsibilities.map((resp, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-50 cut-corner-card border border-slate-200 flex items-start gap-3"
                    >
                      <span className="p-1.5 bg-[#019e6e]/10 text-[#019e6e] rounded text-sm shrink-0 mt-0.5 font-bold">
                        {i + 1}
                      </span>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Search Committee & Selection Process */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0d315c] flex items-center gap-2">
                  <FiUsers className="text-[#019e6e]" />
                  5. Search-cum-Selection Committee Process
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {VC_NOTIFICATION_DATA.selectionProcess.map((step, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white cut-corner-card border border-slate-200 shadow-sm text-center flex flex-col items-center justify-start"
                    >
                      <span className="w-8 h-8 rounded-full bg-[#0d315c] text-white flex items-center justify-center text-xs font-bold mb-3">
                        {i + 1}
                      </span>
                      <p className="text-xs md:text-sm text-slate-700 font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. How to Apply & Prescribed Application Form (Section III) */}
              <div className="space-y-4 bg-slate-50 p-6 md:p-8 cut-corner-panel border border-slate-200">
                <h4 className="text-xl font-bold text-[#0d315c] flex items-center gap-2">
                  <FiFileText className="text-[#019e6e]" />
                  6. Application Instructions &amp; Prescribed Section III Format
                </h4>
                <p className="text-xs md:text-sm text-slate-700">
                  Applicants and nominators must strictly follow the format prescribed in the detailed notification document:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {VC_NOTIFICATION_DATA.howToApply.map((ins, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                      <FiCheck className="text-[#019e6e] mt-1 shrink-0 font-bold" />
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>

                {/* Vision Statement Box */}
                <div className="mt-4 p-4 bg-white rounded border border-slate-300 space-y-2">
                  <h5 className="font-bold text-[#0d315c] text-sm flex items-center gap-2">
                    <FiEdit3 className="text-[#019e6e]" />
                    Special Requirement: Vision Statement &amp; Action Plan (1,000–1,500 words)
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Attach a signed institutional vision statement covering: (1) SMRU’s academic &amp; public-interest mission; 
                    (2) First 100 days action plan; (3) Three-year priorities; (4) Accessible campus &amp; inclusive learning; 
                    (5) Rehabilitation/health professional education and regulatory readiness; (6) Research and faculty development; 
                    (7) Ethical finance and institution building; (8) Quality assurance and student welfare; (9) Collaborations; 
                    and (10) Measurable milestones and risk management.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-[#0d315c]">File:</span> {VC_NOTIFICATION_DATA.filename} &bull; Editable Microsoft Word Format (.docx)
                  </div>
                  <a
                    href={VC_NOTIFICATION_DATA.downloadDocx}
                    download={VC_NOTIFICATION_DATA.filename}
                    className="inline-flex items-center gap-2 bg-[#019e6e] text-white px-6 py-2.5 cut-corner-badge font-bold text-sm hover:bg-[#00875e] transition shadow"
                  >
                    <FiDownload />
                    Download Editable Prescribed Form (.docx)
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================= TAB 2: REGISTRAR, ASST. REGISTRAR & FACULTY ============ */}
        {/* ========================================================================= */}
        {activeTab === "admin-faculty" && (
          <div
            id="tab-admin-faculty-panel"
            role="tabpanel"
            aria-labelledby="tab-admin-faculty-button"
            className="space-y-12 animate-fadeIn"
          >
            {/* SUB-SECTION 1: POST NOTIFICATION (OVERVIEW) */}
            <div className="bg-white cut-corner-panel shadow-lg border border-slate-200 p-6 md:p-10">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between pb-8 border-b border-slate-200">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#0d315c]/10 text-[#0d315c] px-3.5 py-1 cut-corner-badge text-xs font-bold uppercase">
                    <FiBriefcase /> Administrative &amp; Faculty Recruitment Notice
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0d315c] leading-tight">
                    Appointment of Registrar, Assistant Registrar &amp; Faculty
                  </h3>

                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    Applications are invited for the key administrative offices of <strong>Registrar</strong> and <strong>Assistant Registrar</strong>, 
                    and academic positions of <strong>Professor</strong>, <strong>Associate Professor</strong>, and <strong>Assistant Professor</strong> across 
                    all disciplines in the 6 constituent Schools of St. Mary's Rehabilitation University, Hyderabad.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Leadership &amp; Administration:</span>
                      <span className="text-[#0d315c] font-bold text-sm">Registrar &bull; Assistant Registrar</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Faculty Ranks (6 Schools):</span>
                      <span className="text-[#0d315c] font-bold text-sm">Professor &bull; Associate Professor &bull; Assistant Professor</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Submission Email:</span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[#019e6e] font-bold text-sm">{RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail}</span>
                        <button
                          onClick={() => copyToClipboard(RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail)}
                          className="text-xs bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded text-slate-700 font-medium"
                          title="Copy email address"
                        >
                          {copiedEmail === RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs md:text-sm">
                      <span className="text-slate-500 block font-semibold">Contact &amp; Enquiries:</span>
                      <span className="text-[#0d315c] font-bold text-sm">
                        +91 {RECRUITMENT_NOTICE_META.enquiryPhone} / +91 {RECRUITMENT_NOTICE_META.alternatePhone}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail}`}
                      className="inline-flex items-center gap-2 bg-[#019e6e] text-white px-6 py-3 cut-corner-badge font-bold text-sm shadow hover:bg-[#00875e] transition"
                    >
                      <FiMail className="text-lg" />
                      Email CV &amp; Application to hr@smru.edu.in
                    </a>

                    <button
                      onClick={() => setIsPosterModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 border border-slate-300 px-4 py-3 cut-corner-badge font-semibold text-sm hover:bg-slate-200 transition"
                    >
                      <FiEye className="text-lg text-[#019e6e]" />
                      View Ad Poster
                    </button>
                  </div>
                </div>

                {/* Poster Preview Card */}
                <div className="w-full lg:w-72 bg-gradient-to-b from-slate-50 to-slate-100 p-4 cut-corner-card border border-slate-300 shadow-sm flex flex-col items-center text-center">
                  <div
                    onClick={() => setIsPosterModalOpen(true)}
                    className="relative cursor-pointer group overflow-hidden border border-slate-200 shadow rounded bg-white w-full aspect-[3/4] flex items-center justify-center"
                  >
                    <img
                      src={RECRUITMENT_NOTICE_META.posterImage}
                      alt="Employment Notification Poster"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-[#0d315c]/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white p-4">
                      <FiMaximize2 className="text-3xl mb-2 text-[#ffaf3a]" />
                      <span className="text-xs font-bold uppercase tracking-wider">Click to Zoom Ad Poster</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 font-semibold mt-3">
                    Employment Notification Notice
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Administration &amp; Faculty Openings
                  </span>
                  <button
                    onClick={() => setIsPosterModalOpen(true)}
                    className="mt-3 text-xs text-[#019e6e] hover:underline font-bold flex items-center gap-1"
                  >
                    <FiEye /> Expand Full Poster
                  </button>
                </div>
              </div>

              {/* Notification Banner on Timeline */}
              <div className="mt-6 bg-[#eff6ff] border-l-4 border-[#0d315c] p-4 text-xs md:text-sm text-slate-700">
                <strong>Submission Guideline:</strong> Applications must be sent with detailed CV and self-attested testimonials of highest qualification to 
                <strong> {RECRUITMENT_NOTICE_META.adminFacultySubmissionEmail}</strong> within <strong>21 clear calendar days</strong>. 
                Shortlisted candidates will be invited for interview and document verification.
              </div>
            </div>

            {/* SUB-SECTION 2: DETAILED NOTIFICATIONS (SUB-TABS: REGISTRAR, ASST REGISTRAR, FACULTY) */}
            <div className="bg-white cut-corner-panel shadow-lg border border-slate-200 p-6 md:p-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#019e6e]">
                    Section II &bull; Detailed Statutory Notifications
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0d315c] mt-1">
                    SMRU Registrar, Asst. Registrar &amp; Faculty Detailed Notifications
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-1">
                    Select a sub-category below to inspect the complete terms, qualification requirements, and download the official .docx application forms.
                  </p>
                </div>
              </div>

              {/* SUB-TAB NAVIGATOR */}
              <div
                role="tablist"
                aria-label="Administration and Faculty Sub-Tabs"
                className="flex flex-wrap gap-2 border-b border-slate-200 pb-3"
              >
                <button
                  role="tab"
                  aria-selected={adminSubTab === "registrar"}
                  onClick={() => setAdminSubTab("registrar")}
                  className={`px-5 py-2.5 cut-corner-badge font-bold text-xs md:text-sm transition flex items-center gap-2 ${
                    adminSubTab === "registrar"
                      ? "bg-[#019e6e] text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <FaUniversity />
                  A. Registrar Notification
                </button>

                <button
                  role="tab"
                  aria-selected={adminSubTab === "asst-registrar"}
                  onClick={() => setAdminSubTab("asst-registrar")}
                  className={`px-5 py-2.5 cut-corner-badge font-bold text-xs md:text-sm transition flex items-center gap-2 ${
                    adminSubTab === "asst-registrar"
                      ? "bg-[#019e6e] text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <FiBriefcase />
                  B. Assistant Registrar Notification
                </button>

                <button
                  role="tab"
                  aria-selected={adminSubTab === "faculty"}
                  onClick={() => setAdminSubTab("faculty")}
                  className={`px-5 py-2.5 cut-corner-badge font-bold text-xs md:text-sm transition flex items-center gap-2 ${
                    adminSubTab === "faculty"
                      ? "bg-[#019e6e] text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <FaGraduationCap />
                  C. Faculty Notification (6 Schools)
                </button>
              </div>

              {/* SUB-TAB A: REGISTRAR */}
              {adminSubTab === "registrar" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 cut-corner-card border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-[#019e6e] uppercase">Statutory Administrative Post</span>
                      <h4 className="text-xl md:text-2xl font-bold text-[#0d315c]">
                        SMRU Registrar Appointment Detailed Notification
                      </h4>
                      <p className="text-xs text-slate-600">
                        Tenure: 3 Years &bull; Full-time Salaried Office &bull; SMRU Statute 9 Framework
                      </p>
                    </div>

                    <a
                      href={REGISTRAR_NOTIFICATION_DATA.downloadDocx}
                      download={REGISTRAR_NOTIFICATION_DATA.filename}
                      className="inline-flex items-center gap-2 bg-[#0d315c] text-white hover:bg-[#019e6e] px-5 py-2.5 cut-corner-badge font-bold text-xs md:text-sm transition shrink-0"
                    >
                      <FiDownload />
                      Download Registrar Notification (.docx)
                    </a>
                  </div>

                  {/* Essential Qualifications & Routes */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-[#0d315c] flex items-center gap-2">
                      <FiCheckCircle className="text-[#019e6e]" />
                      Essential Qualifications &amp; Experience Routes
                    </h5>
                    <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs md:text-sm space-y-1">
                      <p className="font-bold text-[#0d315c]">Basic Academic Requirement:</p>
                      <p className="text-slate-700">
                        Master's degree with at least 55% marks or an equivalent grade on the applicable grading scale from a recognised institution.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {REGISTRAR_NOTIFICATION_DATA.experienceRoutes.map((rt, i) => (
                        <div
                          key={i}
                          className="p-5 bg-white cut-corner-card border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between"
                        >
                          <div>
                            <span className="inline-block bg-[#0d315c]/10 text-[#0d315c] px-2.5 py-0.5 rounded text-xs font-bold mb-2">
                              {rt.route}
                            </span>
                            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                              {rt.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statutory Duties */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-[#0d315c] flex items-center gap-2">
                      <FaBalanceScale className="text-[#019e6e]" />
                      Statutory Functions &amp; Responsibilities (Statute 9)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {REGISTRAR_NOTIFICATION_DATA.statutoryFunctions.map((func, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 cut-corner-card border border-slate-200 text-xs md:text-sm text-slate-700">
                          <span className="p-1 bg-[#019e6e]/10 text-[#019e6e] rounded text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{func}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selection Committee */}
                  <div className="bg-[#f0fdfa] p-6 cut-corner-card border border-[#019e6e]/30 text-xs md:text-sm space-y-2">
                    <h5 className="font-bold text-[#0d315c] text-sm md:text-base">
                      Selection Committee &amp; Tenure Terms
                    </h5>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                      {REGISTRAR_NOTIFICATION_DATA.selectionAndTerms.map((term, i) => (
                        <li key={i}>{term}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-100 cut-corner-badge">
                    <span className="text-xs text-slate-600">
                      Submit application form to: <strong>{REGISTRAR_NOTIFICATION_DATA.submissionEmail}</strong>
                    </span>
                    <a
                      href={REGISTRAR_NOTIFICATION_DATA.downloadDocx}
                      download={REGISTRAR_NOTIFICATION_DATA.filename}
                      className="text-xs font-bold text-[#019e6e] hover:underline flex items-center gap-1"
                    >
                      <FiDownload /> Download Form ({REGISTRAR_NOTIFICATION_DATA.filename})
                    </a>
                  </div>
                </div>
              )}

              {/* SUB-TAB B: ASSISTANT REGISTRAR */}
              {adminSubTab === "asst-registrar" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 cut-corner-card border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-[#019e6e] uppercase">Administrative Officer Post</span>
                      <h4 className="text-xl md:text-2xl font-bold text-[#0d315c]">
                        SMRU Assistant Registrar Appointment Detailed Notification
                      </h4>
                      <p className="text-xs text-slate-600">
                        Full-time Administrative Officer Post &bull; SMRU Statutes 12, 18 &amp; 21
                      </p>
                    </div>

                    <a
                      href={ASST_REGISTRAR_NOTIFICATION_DATA.downloadDocx}
                      download={ASST_REGISTRAR_NOTIFICATION_DATA.filename}
                      className="inline-flex items-center gap-2 bg-[#0d315c] text-white hover:bg-[#019e6e] px-5 py-2.5 cut-corner-badge font-bold text-xs md:text-sm transition shrink-0"
                    >
                      <FiDownload />
                      Download Asst. Registrar Notification (.docx)
                    </a>
                  </div>

                  {/* Essential Qualifications */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-[#0d315c] flex items-center gap-2">
                      <FiCheckCircle className="text-[#019e6e]" />
                      Qualifications &amp; Office Competencies
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-white cut-corner-card border border-slate-200 shadow-sm space-y-2">
                        <span className="text-xs font-bold uppercase text-[#019e6e] block">Essential Academic Criteria</span>
                        <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1.5">
                          {ASST_REGISTRAR_NOTIFICATION_DATA.essentialQualifications.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 bg-white cut-corner-card border border-slate-200 shadow-sm space-y-2">
                        <span className="text-xs font-bold uppercase text-[#0d315c] block">Desirable Experience &amp; Competencies</span>
                        <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1.5">
                          {ASST_REGISTRAR_NOTIFICATION_DATA.desirableExperience.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Portfolios & Duties */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-[#0d315c] flex items-center gap-2">
                      <FiBriefcase className="text-[#019e6e]" />
                      Key Portfolios &amp; Administrative Duties
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ASST_REGISTRAR_NOTIFICATION_DATA.portfoliosAndDuties.map((duty, i) => (
                        <div key={i} className="p-4 bg-slate-50 cut-corner-card border border-slate-200 text-xs md:text-sm text-slate-700 space-y-1">
                          <span className="font-bold text-[#0d315c] block">Portfolio {i + 1}:</span>
                          <p>{duty}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-100 cut-corner-badge">
                    <span className="text-xs text-slate-600">
                      Submit application form to: <strong>{ASST_REGISTRAR_NOTIFICATION_DATA.submissionEmail}</strong>
                    </span>
                    <a
                      href={ASST_REGISTRAR_NOTIFICATION_DATA.downloadDocx}
                      download={ASST_REGISTRAR_NOTIFICATION_DATA.filename}
                      className="text-xs font-bold text-[#019e6e] hover:underline flex items-center gap-1"
                    >
                      <FiDownload /> Download Form ({ASST_REGISTRAR_NOTIFICATION_DATA.filename})
                    </a>
                  </div>
                </div>
              )}

              {/* SUB-TAB C: FACULTY ACROSS 6 SCHOOLS */}
              {adminSubTab === "faculty" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 cut-corner-card border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-[#019e6e] uppercase">Teaching Appointments &bull; 6 Schools</span>
                      <h4 className="text-xl md:text-2xl font-bold text-[#0d315c]">
                        SMRU Faculty Appointment Detailed Notification
                      </h4>
                      <p className="text-xs text-slate-600">
                        Professor &bull; Associate Professor &bull; Assistant Professor &bull; UGC &amp; Statutory Council Norms
                      </p>
                    </div>

                    <a
                      href={FACULTY_NOTIFICATION_DATA.downloadDocx}
                      download={FACULTY_NOTIFICATION_DATA.filename}
                      className="inline-flex items-center gap-2 bg-[#0d315c] text-white hover:bg-[#019e6e] px-5 py-2.5 cut-corner-badge font-bold text-xs md:text-sm transition shrink-0"
                    >
                      <FiDownload />
                      Download Faculty Notification (.docx)
                    </a>
                  </div>

                  {/* 6 Specialized Schools Grid */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h5 className="text-lg font-bold text-[#0d315c] flex items-center gap-2">
                        <FaGraduationCap className="text-[#019e6e]" />
                        Faculty Positions Across 6 Specialized Schools
                      </h5>
                      <span className="text-xs text-slate-500">
                        Disciplines notified under SMRU/2026-27/VC.APP/01
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {FACULTY_NOTIFICATION_DATA.schools.map((sch, i) => (
                        <div
                          key={i}
                          className="bg-white cut-corner-card border border-slate-200 shadow-sm p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition"
                        >
                          <div>
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className="text-xl">{schoolIcon(sch.schoolName)}</span>
                              <h6 className="font-bold text-[#0d315c] text-sm md:text-base leading-snug">
                                {sch.schoolName}
                              </h6>
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                                Advertised Disciplines &amp; Programmes:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {sch.disciplines.map((disc, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className="bg-slate-100 text-slate-800 text-[11px] px-2 py-0.5 rounded font-medium"
                                  >
                                    {disc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#f0fdfa] p-2.5 rounded text-[11px] text-slate-700 border border-[#019e6e]/20">
                            <strong>Regulatory Norms:</strong> {sch.norms}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rank-Wise Eligibility Criteria */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-[#0d315c] flex items-center gap-2">
                      <FiCheckCircle className="text-[#019e6e]" />
                      UGC Minimum Qualifications by Rank
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {FACULTY_NOTIFICATION_DATA.ranks.map((rk, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 cut-corner-card border border-slate-200 p-5 space-y-3 flex flex-col justify-between"
                        >
                          <div>
                            <span className="inline-block bg-[#0d315c] text-white px-3 py-1 cut-corner-badge text-xs font-bold uppercase">
                              {rk.rank}
                            </span>
                            <ul className="mt-3 space-y-2 text-xs text-slate-700 list-disc list-inside">
                              {rk.criteria.map((c, cIdx) => (
                                <li key={cIdx} className="leading-relaxed">{c}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                            Evaluated in accordance with UGC 2018 Regulations &amp; relevant Council Gazette norms.
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-100 cut-corner-badge">
                    <span className="text-xs text-slate-600">
                      Submit application form &amp; CV to: <strong>{FACULTY_NOTIFICATION_DATA.submissionEmail}</strong>
                    </span>
                    <a
                      href={FACULTY_NOTIFICATION_DATA.downloadDocx}
                      download={FACULTY_NOTIFICATION_DATA.filename}
                      className="text-xs font-bold text-[#019e6e] hover:underline flex items-center gap-1"
                    >
                      <FiDownload /> Download Form ({FACULTY_NOTIFICATION_DATA.filename})
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ===== DOWNLOAD OFFICIAL DOCUMENTS HUB ===== */}
      <section id="official-downloads" className="scroll-mt-24 max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#0d315c] to-[#122849] cut-corner-panel p-8 md:p-12 text-white shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-[#ffaf3a] text-xs font-bold uppercase tracking-widest bg-[#ffaf3a]/15 px-3 py-1 cut-corner-badge">
              Official Downloads Repository
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold mt-3 text-white">
              Download Prescribed Application Forms &amp; Notifications
            </h3>
            <p className="mt-2 text-slate-300 text-sm md:text-base">
              All documents contain the complete detailed statutory terms, eligibility criteria, checklists, and editable Microsoft Word (.docx) application forms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECRUITMENT_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white/10 backdrop-blur-md cut-corner-card border border-white/15 p-6 flex flex-col justify-between hover:bg-white/15 transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 bg-[#ffaf3a]/20 text-[#ffaf3a] cut-corner-badge font-bold text-lg">
                      <FiFileText />
                    </span>
                    <span className="text-xs font-bold uppercase bg-white/20 px-2 py-0.5 rounded text-slate-200">
                      {doc.format} &bull; {doc.fileSize}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base leading-snug group-hover:text-[#ffaf3a] transition">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-3">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <a
                    href={doc.downloadUrl}
                    download={doc.filename}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#019e6e] hover:bg-[#00875e] text-white text-xs font-bold py-2.5 px-4 cut-corner-badge transition shadow"
                  >
                    <FiDownload /> Download .docx
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
            <div className="flex items-center gap-2">
              <FiPaperclip className="text-[#ffaf3a]" />
              <span>All 4 notifications are available in Microsoft Word (.docx) format for easy electronic completion.</span>
            </div>

            <button
              onClick={() => setIsPosterModalOpen(true)}
              className="text-[#ffaf3a] hover:underline font-bold flex items-center gap-1"
            >
              <FiEye /> View Newspaper Ad Poster Image
            </button>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section id="benefits" className="scroll-mt-24 max-w-6xl mx-auto px-4 py-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {benefits.map((b, i) => (
          <div
            key={`${b.text}-${i}`}
            className="bg-white cut-corner-card shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition"
            data-reveal="zoom-in"
            style={{ "--delay": `${i * 0.06}s` }}
          >
            <span className="text-4xl text-[#019e6e] mb-4 block">{b.icon}</span>
            <span className="text-base font-semibold text-[#0d315c]">{b.text}</span>
          </div>
        ))}
      </section>

      {/* ===== WHY JOIN US ===== */}
      <section id="why-join-careers" className="scroll-mt-24 max-w-5xl mx-auto px-4 pb-16">
        <div className="relative overflow-hidden cut-corner-panel shadow-lg ring-1 ring-black/5 p-10 text-[#0f1736]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${resolveAssetSrc(abstractHeroBg)})` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(245,246,238,0.9) 0%, rgba(200,239,223,0.86) 55%, rgba(159,223,202,0.9) 100%)",
            }}
          />
          <div className="relative text-center">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Why Join St. Mary's University?</h2>
            <div
              className="mx-auto mt-2 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a]"
              data-reveal="fade-up"
              style={{ "--delay": "0.05s" }}
            />
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
              Build your academic and administrative career in an institution committed to disability rehabilitation, allied health, and cutting-edge education.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FaHeartbeat />,
                  title: "Rehab-Focused Curriculum",
                  desc: "Specialized programs tailored to the needs of rehabilitation, mental health, and allied healthcare.",
                },
                {
                  icon: <FaHandsHelping />,
                  title: "Clinical Outreach",
                  desc: "Real-world exposure integrated with community hospitals, patient clinics, and simulation facilities.",
                },
                {
                  icon: <FaAward />,
                  title: "Educational Legacy",
                  desc: "A purpose-driven academic environment rooted in St. Mary's institutional foundation and research.",
                },
                {
                  icon: <FaChartLine />,
                  title: "Academic Growth",
                  desc: "Robust support for research grants, patent generation, doctoral mentorship, and faculty development.",
                },
              ].map((item, i) => (
                <article
                  key={i}
                  className="bg-white cut-corner-card p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center flex flex-col items-center border border-[#e6f2ff]"
                  data-reveal="fade-up"
                  style={{ "--delay": `${0.08 + i * 0.06}s` }}
                >
                  <div className="h-20 w-20 cut-corner-card bg-[#019e6e]/10 text-[#019e6e] grid place-items-center text-4xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0d315c]">{item.title}</h3>
                  <p className="mt-2 text-slate-600 text-xs md:text-sm">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HELP & INQUIRIES ===== */}
      <section id="openings" className="scroll-mt-24 max-w-4xl mx-auto px-4 pb-20 mt-10">
        <div className="bg-white cut-corner-panel shadow-xl p-8 md:p-10 border border-gray-100 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-[#019e6e]/10 text-[#019e6e] rounded-full flex items-center justify-center mb-6 text-3xl">
            <FiBriefcase />
          </div>
          <h2 className="text-3xl font-bold text-[#0d315c] tracking-tight mb-3">Careers &amp; Recruitment Helpdesk</h2>
          <p className="text-base text-slate-700 mb-8 max-w-2xl leading-relaxed">
            For recruitment enquiries, application submission assistance, or clarification regarding statutory eligibility norms:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center justify-center gap-2 text-[#0d315c] bg-gray-50 p-5 rounded-xl border border-gray-200">
              <span className="text-2xl text-[#019e6e]"><FiMail /></span>
              <span className="text-xs text-slate-500 font-semibold uppercase">Vice-Chancellor Portal</span>
              <a href="mailto:chancellor@smru.edu.in" className="text-sm font-bold hover:text-[#019e6e]">
                chancellor@smru.edu.in
              </a>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-[#0d315c] bg-gray-50 p-5 rounded-xl border border-gray-200">
              <span className="text-2xl text-[#019e6e]"><FiMail /></span>
              <span className="text-xs text-slate-500 font-semibold uppercase">HR &amp; Faculty Portal</span>
              <a href="mailto:hr@smru.edu.in" className="text-sm font-bold hover:text-[#019e6e]">
                hr@smru.edu.in
              </a>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-[#0d315c] bg-gray-50 p-5 rounded-xl border border-gray-200">
              <span className="text-2xl text-[#019e6e]"><FiPhone /></span>
              <span className="text-xs text-slate-500 font-semibold uppercase">Telephone Enquiries</span>
              <a href="tel:+919010455590" className="text-sm font-bold hover:text-[#019e6e]">
                +91 9010455590
              </a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 w-full text-slate-600 text-xs md:text-sm">
            <p>
              <strong>St. Mary's Rehabilitation University</strong><br />
              {RECRUITMENT_NOTICE_META.address}
            </p>
          </div>
        </div>
      </section>

      {/* ===== NEWSPAPER ADVERTISEMENT POSTER LIGHTBOX MODAL ===== */}
      {isPosterModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Official Employment Notification Poster"
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
          onClick={() => {
            setIsPosterModalOpen(false);
            setIsPosterZoomed(false);
          }}
        >
          {/* Prominent Floating Close Button (always accessible and never obscured) */}
          <button
            onClick={() => {
              setIsPosterModalOpen(false);
              setIsPosterZoomed(false);
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] p-2.5 rounded-full bg-white text-[#0d315c] hover:bg-[#ffaf3a] hover:text-[#0d315c] shadow-2xl transition transform hover:scale-110 flex items-center justify-center font-bold ring-2 ring-black/20"
            aria-label="Close modal (Esc)"
            title="Close (Esc)"
          >
            <FiX className="text-2xl" />
          </button>

          <div
            className="relative bg-white cut-corner-panel max-w-5xl max-h-[94vh] w-full overflow-hidden flex flex-col shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0d315c] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffaf3a] animate-pulse" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm md:text-base leading-tight">
                    Official Employment Notification Poster
                  </h4>
                  <span className="text-[11px] text-slate-300">
                    Ref: {RECRUITMENT_NOTICE_META.notificationNo} &bull; Dated {RECRUITMENT_NOTICE_META.notificationDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPosterZoomed(!isPosterZoomed)}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 cut-corner-badge font-semibold flex items-center gap-1.5 transition border border-white/20"
                  title="Toggle Zoom"
                >
                  {isPosterZoomed ? (
                    <>
                      <FiZoomOut className="text-sm text-[#ffaf3a]" /> Reset Zoom
                    </>
                  ) : (
                    <>
                      <FiZoomIn className="text-sm text-[#ffaf3a]" /> Magnify Poster
                    </>
                  )}
                </button>

                <a
                  href={RECRUITMENT_NOTICE_META.posterImage}
                  download="SMRU-Employment-Notification-2026.jpg"
                  className="text-xs bg-[#019e6e] hover:bg-[#00875e] text-white px-3 py-1.5 cut-corner-badge font-bold flex items-center gap-1.5 transition shadow"
                  title="Download Image File"
                >
                  <FiDownload className="text-sm" /> Download Poster
                </a>

                <button
                  onClick={() => {
                    setIsPosterModalOpen(false);
                    setIsPosterZoomed(false);
                  }}
                  className="p-1.5 hover:bg-white/20 rounded text-white transition text-lg ml-1"
                  aria-label="Close Poster View"
                  title="Close (Esc)"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Modal Body / Image Viewer */}
            <div className="overflow-auto flex-1 p-3 sm:p-5 flex items-center justify-center bg-slate-950/90 min-h-[300px]">
              <img
                src={RECRUITMENT_NOTICE_META.posterImage}
                alt="St. Mary's Rehabilitation University Official Employment Notification"
                className={`transition-all duration-200 select-none rounded shadow-xl ${
                  isPosterZoomed
                    ? "w-full max-w-4xl object-contain cursor-zoom-out"
                    : "max-h-[76vh] w-auto max-w-full object-contain cursor-zoom-in"
                }`}
                onClick={() => setIsPosterZoomed(!isPosterZoomed)}
                title={isPosterZoomed ? "Click image to Zoom Out" : "Click image to Magnify text"}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
              <span className="font-medium text-[11px] sm:text-xs">
                <strong>St. Mary's Rehabilitation University</strong> &bull; Hyderabad, Telangana
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                {isPosterZoomed ? "Click image to restore default view" : "Click image or Magnify button to enlarge text"} &bull; Esc to close
              </span>
              <button
                onClick={() => {
                  setIsPosterModalOpen(false);
                  setIsPosterZoomed(false);
                }}
                className="text-xs text-[#019e6e] hover:underline font-bold sm:hidden"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline reveal styles */}
      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{
          opacity:0;
          transform: translateY(14px);
          transition:
            opacity .7s var(--ease-out),
            transform .7s var(--ease-out),
            filter .7s var(--ease-out);
          transition-delay: var(--delay, 0s);
          will-change: opacity, transform, filter;
          filter: blur(0);
        }
        [data-reveal].is-visible{ opacity:1; transform:none; filter: blur(0); }
        [data-reveal=fade-up]{ transform: translateY(18px); }
        [data-reveal=fade-left]{ transform: translateX(22px); }
        [data-reveal=fade-right]{ transform: translateX(-22px); }
        [data-reveal=zoom-in]{ transform: translateY(12px); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
