"use client";
// src/pages/LeaderProfile.jsx
// ------------------------------------------------------------------
// Detail page with no images. Uses `bio` if present, else falls back
// to the short `about`. Optional sections (achievements/initiatives)
// are shown when provided. Back link goes to /leadership.
// ------------------------------------------------------------------
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { leaderBySlug } from "../data/leaders";
import SEO from "../components/SEO";

export default function LeaderProfile() {
  const params = useParams();
  const slug = params.slug as string;
  const leader = leaderBySlug[slug as keyof typeof leaderBySlug] as any;

  if (!leader) {
    return (
      <div className="container max-w-screen-xl mx-auto px-4 py-24">
        <div className="cut-corner-panel border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-[#0d315c]">Profile not found</h1>
          <Link
            href="/leadership"
            className="mt-4 inline-block text-[#0f6a5a] font-semibold hover:underline"
          >
            Back to Leadership
          </Link>
        </div>
      </div>
    );
  }

  const hasAchievements = Array.isArray(leader.achievements) && leader.achievements.length > 0;

  return (
    <>
      <SEO
        title={`${leader.name} | Leadership | Stmarys University`}
        description={`${leader.name} — ${leader.role} at Stmarys University.`}
        keywords={["Stmarys leadership","Stmarys leadership","university leaders","rehabilitation university leadership", leader.name, leader.role]}
      />
      {/* Banner */}
      <section className="relative w-full min-h-[35vh] overflow-hidden flex items-center">
        {/* Premium Atmospheric 'Mesh' Gradient */}
        <div className="absolute inset-0 bg-[#f8fafc]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(37,184,149,0.18)_0,transparent_55%),radial-gradient(at_100%_0%,rgba(13,49,92,0.12)_0,transparent_55%)]" />

        <div className="container relative z-10 max-w-screen-xl mx-auto px-4 pt-24 pb-8">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-[#0d315c]/60 hover:text-[#0d315c] font-black uppercase tracking-widest text-[10px] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current -scale-x-100">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
            Back to Leadership
          </Link>
          <div className="mt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#019e6e] mb-2">Detailed Profile</p>
            <h1 className="text-[#0d315c] text-3xl md:text-5xl font-black font-outfit uppercase tracking-tight">
              {leader.name}
            </h1>
            <div className="mt-2 h-1 w-16 cut-corner-badge bg-[#ffaf3a]" />
            <p className="mt-4 text-slate-500 font-bold text-lg">{leader.role}</p>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="py-12 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Left panel (no image; quick facts only) */}
          <aside className="lg:col-span-1">
            <div className="cut-corner-panel bg-white ring-1 ring-slate-200 p-5">
              <h3 className="text-[#0d315c] font-bold">Quick Facts</h3>
              <ul className="mt-3 space-y-2 text-slate-700 text-sm">
                <li>
                  <strong>Role:</strong> {leader.role}
                </li>
                {/* You can add more facts here if needed */}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile / Bio */}
            <article className="cut-corner-panel bg-white ring-1 ring-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d315c]">Profile</h2>
              <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">
                {leader.bio || leader.about}
              </p>
            </article>

            {/* Achievements */}
            {hasAchievements && (
              <article className="cut-corner-panel bg-white ring-1 ring-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Key Achievements</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-slate-700">
                  {leader.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </article>
            )}

            {/* Initiatives */}
            {leader.initiatives && (
              <article className="cut-corner-panel bg-white ring-1 ring-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Initiatives & Vision</h2>
                <p className="mt-2 text-slate-700 whitespace-pre-line">
                  {leader.initiatives}
                </p>
              </article>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
