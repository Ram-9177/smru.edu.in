// @ts-nocheck
"use client";
import React, { useState, useEffect, useMemo } from "react";
import SEO from "../components/SEO";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
import cls1 from "../assets/Cls1.webp";
import cls2 from "../assets/cls2.webp";
import { resolveAssetSrc } from "@/lib/shared/media";
import { CAREER_BENEFITS, CAREER_OPENINGS } from "@/data/careers";
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
} from "react-icons/fi";
import {
  FaAward,
  FaHeartbeat,
  FaHandsHelping,
  FaChartLine
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

export default function Careers() {
  const { state } = useDeveloperCms();
  const [filter, setFilter] = useState("All");
  const [modalJob, setModalJob] = useState(null);

  const benefits = useMemo(() => {
    const page = state.pages.find((item) => item.id === "page-careers-benefits");
    const fromCms = page?.content ? page.content.split(";").map((item) => item.trim()) : [];
    const source = fromCms.length > 0 ? fromCms : CAREER_BENEFITS;
    return source.map((text) => ({ icon: iconForBenefit(text), text }));
  }, [state.pages]);

  const allJobs = useMemo(() => {
    const page = state.pages.find((p) => p.id === "page-careers-openings");
    if (page?.content) {
      try {
        const parsed = JSON.parse(page.content);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Fallback if not valid JSON
        console.warn("CMS content for page-careers-openings is not valid JSON", e);
      }
    }
    return CAREER_OPENINGS;
  }, [state.pages]);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(allJobs.map((j) => j.category_name)))];
  }, [allJobs]);

  const jobs = useMemo(() => {
    if (filter === "All") return allJobs;
    return allJobs.filter((j) => j.category_name === filter);
  }, [allJobs, filter]);

  // ---- Animations (IntersectionObserver) ----
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
  }, []);

  // ---- Helpers ----
  const onChangeFilter = (cat) => {
    setFilter(cat);
  };

  const tabClass = (cat) =>
    `px-6 py-2 text-sm font-semibold transition border-2 cut-corner-badge 
     ${
       filter === cat
         ? "bg-[#019e6e] text-white border-[#019e6e] shadow"
         : "bg-gray-50 text-[#0d315c] border-[#019e6e] hover:bg-[#019e6e] hover:text-white"
     }`;

  // ---- UI ----
  return (
    <>
      <SEO
        title="Careers | St.Mary's University"
        description="Join St.Mary's University — careers in rehabilitation and allied health education. Faculty, clinical, technical roles and more."
        keywords={["St.Mary's University careers","St.Mary's jobs","university jobs hyderabad","rehabilitation careers"]}
        canonical="https://smru.edu.in/careers"
        og={{ url: "https://smru.edu.in/careers" }}
      />
      {/* ===== HERO ===== */}
      <section
        id="careers-hero"
        className="scroll-mt-24 relative w-full overflow-hidden min-h-[46vh] flex items-center justify-center"
      >
        {/* Clean Institutional 'Light Wash' Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0fdfa] via-[#f8fafc] to-[#eff6ff]" />

        {/* HERO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Abstract Image Hero */}
          <img 
            src={resolveAssetSrc(abstractHeroBg)} 
            alt="Abstract Background" 
            className="absolute inset-0 h-full w-full object-cover opacity-[0.05] scale-105" 
          />
          {/* Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#f5f9ff]" />
        </div>

        <div className="smru-container relative z-20 pt-8 md:pt-16 pb-6 md:pb-12 flex flex-col items-center justify-center text-center">
          <h1 className="smru-h1 text-[#0d315c] flex flex-col items-center" data-reveal="fade-up">
            Careers 
            <span className="text-[#25b895] text-[0.4em] tracking-normal mt-4 block font-bold capitalize">
              St.Mary's University
            </span>
          </h1>
          <div className="mt-4 h-1.5 w-20 cut-corner-badge bg-[#ffaf3a] mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }} />
          <p
            className="mt-7 max-w-4xl text-[#0f1736] text-[clamp(0.95rem,1.45vw,1.55rem)] leading-[1.35] font-semibold"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            Join St.Mary's University’s specialized academic ecosystem for rehabilitation, allied health, law, and professional education.
          </p>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3 transition-all duration-700 opacity-100 translate-y-0" data-reveal="fade-up" style={{ "--delay": "0.12s" }}>
            <span className="inline-block bg-[#24b491] text-white px-5 py-2 cut-corner-badge font-semibold shadow text-sm md:text-base">
              Applications reviewed on a rolling basis
            </span>
            <span className="inline-block bg-[#1b2444] text-white px-5 py-2 cut-corner-badge font-semibold shadow text-sm md:text-base">
              Join the School of Law Faculty
            </span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
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

      {/* WHY JOIN US */}
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
            style={{ background: "linear-gradient(105deg, rgba(245,246,238,0.9) 0%, rgba(200,239,223,0.86) 55%, rgba(159,223,202,0.9) 100%)" }}
          />
          <div className="relative text-center">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Why Join Stmarys University?</h2>
            <div className="mx-auto mt-2 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
              Build your academic career in a purpose-driven university environment.
            </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaHeartbeat />, title: "Rehab-Focused Curriculum", desc: "Specialized programs tailored to the needs of rehabilitation and allied health sciences." },
              { icon: <FaHandsHelping />, title: "Clinical Training & Outreach", desc: "Real-world training integrated with community outreach and clinical exposure." },
              { icon: <FaAward />, title: "Educational Legacy", desc: "A purpose-driven academic environment with St.Mary's institutional foundation." },
              { icon: <FaChartLine />, title: "Student Outcomes Focus", desc: "Work with teams focused on internships, clinical exposure, skill-building, and career support." },
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
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* JOB INQUIRIES */}
      <section id="openings" className="scroll-mt-24 max-w-4xl mx-auto px-4 pb-20 mt-10">
        <div className="bg-white cut-corner-panel shadow-xl p-10 border border-gray-100 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-[#019e6e]/10 text-[#019e6e] rounded-full flex items-center justify-center mb-6 text-3xl">
            <FiBriefcase />
          </div>
          <h2 className="text-3xl font-bold text-[#0d315c] tracking-tight mb-4">Join Our Team</h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl leading-relaxed">
            We are always looking for passionate educators, professionals, and support staff to join our university. For any job inquiries or to submit your resume, please reach out to our careers team.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full">
            <a href="mailto:enquiry@smru.edu.in" className="flex-1 flex flex-col items-center justify-center gap-3 text-[#0d315c] hover:text-[#019e6e] bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
              <span className="text-2xl text-[#019e6e]"><FiMail /></span>
              <span className="text-lg font-bold">enquiry@smru.edu.in</span>
            </a>
            <a href="tel:+919010455591" className="flex-1 flex flex-col items-center justify-center gap-3 text-[#0d315c] hover:text-[#019e6e] bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
              <span className="text-2xl text-[#019e6e]"><FiPhone /></span>
              <span className="text-lg font-bold">+91 9010455591</span>
            </a>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-100 w-full text-slate-600 text-sm">
            <p>
              <strong>St.Mary's University</strong><br />
              Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.
            </p>
          </div>
        </div>
      </section>

      {/* Inline reveal styles (same as About) */}
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
      `}</style>
    </>
  );
}
