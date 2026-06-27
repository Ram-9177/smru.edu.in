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

  const getCmsContent = (id: string, separator = " | ") => {
    const page = state.pages.find((p) => p.id === id);
    return page?.content ? page.content.split(separator).map((s) => s.trim()) : [];
  };

  const benefits = useMemo(() => {
    const fromCms = getCmsContent("page-careers-benefits", ";");
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
    <section className="w-full bg-gray-50">
      <SEO
        title="Careers | Stmarys University"
        description="Join Stmarys University — careers in rehabilitation and allied health education. Faculty, clinical, technical roles and more."
        keywords={["Stmarys University careers","Stmarys jobs","university jobs hyderabad","rehabilitation careers"]}
        canonical="https://smru.edu.in/careers"
        og={{ url: "https://smru.edu.in/careers" }}
      />
      {/* ===== HERO ===== */}
      <section
        id="careers-hero"
        className="scroll-mt-24 relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden"
        data-reveal="fade-up"
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

        <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-[clamp(3.1rem,9.5vw,9.2rem)] font-black font-outfit uppercase leading-[0.85] tracking-tighter text-[#0d315c] flex flex-col items-center">
            Careers 
            <span className="text-[#25b895] text-[0.4em] tracking-normal mt-4 block font-bold capitalize">
              Stmarys University
            </span>
          </h1>
          <div className="mt-4 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a] mx-auto" />
          <p
            className="mt-6 max-w-4xl text-[#0f1736] text-[clamp(0.95rem,1.45vw,1.5rem)] leading-[1.35] font-semibold"
            style={{ "--delay": "0.08s" }}
          >
            Join Stmarys University’s specialized academic ecosystem for rehabilitation, allied health, law, and professional education.
          </p>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3 transition-all duration-700 opacity-100 translate-y-0">
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
              { icon: <FaAward />, title: "Educational Legacy", desc: "A purpose-driven academic environment with Stmarys institutional foundation." },
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

      {/* JOB OPENINGS */}
      <section id="openings" className="scroll-mt-24 max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white cut-corner-panel shadow-xl p-10 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#0d315c] tracking-tight">Current Openings</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={tabClass(cat)}
                  onClick={() => onChangeFilter(cat)}
                  style={{ "--delay": `${i * 0.04}s` }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(!jobs || jobs.length === 0) && (
              <div className="col-span-full text-center text-base text-[#970c0c] py-8 font-semibold">
                No openings in this category currently.
              </div>
            )}
            {jobs.map((job, i) => (
              <div
                key={job.id ?? i}
                className="relative cut-corner-card border border-gray-200 p-7 flex flex-col justify-between shadow hover:shadow-xl transition overflow-hidden"
                style={{ "--delay": `${i * 0.06}s` }}
              >
                <div className="relative flex flex-col justify-between h-full z-10">
                  <div>
                    <h3 className="text-xl font-bold text-[#0d315c] mb-1">{job.title}</h3>
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#019e6e] mb-2">
                       <FiMapPin className="text-base" />
                       {job.location}
                       {job.category_name && (
                         <span className="ml-2 bg-[#0d315c] text-white px-2 py-0.5 cut-corner-badge text-xs">
                           {job.category_name}
                         </span>
                       )}
                    </p>
                    <p className="text-base text-gray-700 mb-3">{job.summary}</p>
                  </div>
                  <button
                    className="mt-2 inline-block bg-[#019e6e] hover:bg-[#0fa571] text-white px-5 py-2 cut-corner-badge font-semibold transition shadow text-center w-max self-start focus:outline-none focus:ring-2 focus:ring-[#019e6e]"
                    onClick={() => setModalJob(job)}
                    aria-label={`View details for ${job.title}`}
                    tabIndex={0}
                    type="button"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB MODAL */}
      {modalJob && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3"
          onClick={() => setModalJob(null)}
        >
          <div
            className="bg-white cut-corner-panel p-8 relative w-full max-w-lg shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 w-8 h-8 cut-corner-badge bg-[#ffaf3a] text-white font-bold hover:bg-yellow-500 shadow"
              onClick={() => setModalJob(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#0d315c] mb-2">{modalJob.title}</h3>
            <p className="flex items-center gap-2 text-base font-semibold text-[#019e6e] mb-2">
              <FiMapPin className="text-base" />
              {modalJob.location}
              {modalJob.category_name && (
                <span className="ml-2 bg-[#0d315c] text-white px-2 py-0.5 cut-corner-badge text-xs">
                  {modalJob.category_name}
                </span>
              )}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-base text-gray-700">
              {Array.isArray(modalJob.details) && modalJob.details.length ? (
                modalJob.details.map((d, i) => <li key={i}>{d}</li>)
              ) : (
                <li>No details provided.</li>
              )}
            </ul>
            <div className="mt-8 flex flex-col md:flex-row items-center gap-3">
              <a
                href={`mailto:careers@smru.edu.in?subject=Application%20for%20${encodeURIComponent(
                  modalJob.title
                )}`}
                className="inline-block bg-[#019e6e] hover:bg-[#0fa571] text-white px-6 py-2 cut-corner-badge font-semibold transition shadow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply via Email
              </a>
              <span className="text-sm text-gray-500">
                Please mention the job title in your email.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT HR */}
      <section id="contact-hr" className="scroll-mt-24 max-w-2xl mx-auto px-4 pb-20">
        <div
          className="relative overflow-hidden border border-gray-200 cut-corner-panel text-center p-8 shadow-lg"
          data-reveal="fade-up"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${resolveAssetSrc(cls1)})` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(245,246,238,0.9) 0%, rgba(200,239,223,0.86) 55%, rgba(159,223,202,0.9) 100%)" }}
          />
          <div className="relative">
          <h2 className="text-2xl font-bold text-[#0d315c] mb-3">Contact Careers Team</h2>
          <p className="text-base flex items-center justify-center gap-2 mb-2">
            <FiUserCheck aria-hidden /> Contact:
            <span className="font-semibold text-[#0d315c]">Narmada - 94902 60261</span>
          </p>
          <p className="text-base flex items-center justify-center gap-2 mb-2">
            <FiMail aria-hidden /> Email CV:
              <a href="mailto:careers@smru.edu.in" className="font-semibold text-[#0d315c] hover:underline">
                careers@smru.edu.in
              </a>
          </p>
          <p className="text-base text-[#0d315c]">
            Stmarys University
            <br />
             Near Ramoji Film City, Deshmukhi Village,
             <br />
             Pochampally Mandal, Yadadri Bhuvanagiri District,
             <br />
             Hyderabad, Telangana - 508284, India.
          </p>          </div>        </div>
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
    </section>
  );
}
