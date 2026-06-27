"use client";
// src/components/LeadershipBoards.jsx
import React from "react";
import Link from "next/link";

/** Single card (no images). Order: Name → Category → Designation → About */
function Card({ m = {} as any, category = "" }) {
  const name = m.name || "—";
  const role = m.role || "—";
  const about = m.about || "";

  return (
    <article className="cut-corner-panel bg-[#fdf2f4] p-8 transition-transform hover:scale-[1.01]">
      <h4 className="text-[17px] font-extrabold text-[#0d315c] leading-tight mb-2">
        {name}
      </h4>

      <div className="flex flex-wrap items-baseline gap-1.5 pt-1">
        <span className="text-[14px] font-black tracking-tight text-[#25b895]">
          Governing body:
        </span>
        <span className="text-[14px] font-bold text-slate-800">{category}</span>
      </div>

      <div className="flex flex-wrap items-baseline gap-1.5 pt-1">
        <span className="text-[14px] font-black tracking-tight text-[#25b895]">
          Designation:
        </span>
        <span className="text-[14px] font-bold text-slate-800">{role}</span>
      </div>

      {about && (
        <p className="text-[14px] text-slate-600 font-medium leading-[1.6] mt-5">
          {about}
        </p>
      )}

      {m.slug && (
        <div className="mt-4">
          <Link
            href={`/leadership/${m.slug}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d315c] hover:text-[#25b895] flex items-center gap-2 transition-colors"
          >
            Full Profile
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current border border-current cut-corner-badge p-0.5">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </Link>
        </div>
      )}
    </article>
  );
}

function LeadershipBoards({ groups }: { groups?: Record<string, any[]> }) {
  const entries = Object.entries(groups || {}) as [string, any[]][];
  if (!entries.length) return null;

  return (
    <section id="governing-bodies" className="relative overflow-hidden bg-[#c8efdf] pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative mb-6 overflow-hidden px-2 pt-2 text-center md:mb-12 md:px-4 md:pt-4">
          <h3 className="pointer-events-none mx-auto w-full text-center text-[clamp(2.2rem,8.5vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#25b895]/30 sm:whitespace-nowrap">
            GOVERNING BODIES
          </h3>
          <p className="mx-auto mt-5 max-w-4xl text-sm font-semibold leading-7 text-[#0d315c]/75 md:text-base">
            Stmarys University is guided by statutory and institutional governing bodies including the Governing Council, Board of Management, and Sponsor Body. These bodies support academic leadership, transparent governance, institutional accountability, and compliance-driven university administration.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.16em]">
            <Link href="/leadership/all" className="text-[#0d315c] hover:text-[#25b895]">Leadership</Link>
            <Link href="/approvals-recognitions" className="text-[#0d315c] hover:text-[#25b895]">Approvals &amp; Recognitions</Link>
            <Link href="/mandatory-disclosure" className="text-[#0d315c] hover:text-[#25b895]">Mandatory Disclosure</Link>
            <Link href="/sponsor-society" className="text-[#0d315c] hover:text-[#25b895]">Sponsor Society</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-20">
          {entries.map(([title, members], idx) => (
            <div
              key={title}
              className="space-y-8"
              data-reveal="fade-up"
              style={{ "--delay": `${idx * 0.12}s` }}
            >
              <h3 className="inline-block px-5 py-2.5 cut-corner-badge bg-[#0d315c] text-white text-[13px] font-bold tracking-wide shadow-lg">
                 {title}
              </h3>

              <div className="space-y-5">
                {members.map((m, i) => (
                  <Card key={i} m={m} category={title} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadershipBoards;
