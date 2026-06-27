"use client";

import React from "react";

type BadgeTone = "blue" | "green" | "amber" | "rose" | "slate" | "violet";

const tones: Record<BadgeTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
};

export function Badge({ label, tone = "slate" }: { label: string; tone?: BadgeTone }) {
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${tones[tone]}`}>{label}</span>;
}

export function toneByVisibility(v?: string): BadgeTone {
  if (v === "public") return "green";
  if (v === "hidden") return "blue";
  if (v === "draft") return "amber";
  if (v === "internal") return "violet";
  return "slate";
}

export function toneByStatus(s?: string): BadgeTone {
  if (s === "live") return "green";
  if (s === "in-progress") return "amber";
  if (s === "coming-soon") return "blue";
  if (s === "archived") return "rose";
  return "slate";
}

export function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#0d315c]">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
