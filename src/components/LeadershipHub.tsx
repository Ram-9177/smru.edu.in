// @ts-nocheck
"use client";
// src/components/LeadershipHub.jsx
import React from "react";
import Link from "next/link";

// Assets
import founderImg from "../assets/kvk.webp";
import bharathiImg from "../assets/Bharathi.webp";
import harshaImg from "../assets/harsha.webp";
import vcImg from "../assets/vc.webp";
import indrajaImg from "../assets/indraja.webp";
import induImg from "../assets/indu.webp";
import { resolveAssetSrc } from "@/lib/shared/media";

// Cards row — use the same five as About/Sponsor Body and link to profiles
const leaders = [
  { slug: "founder",    name: "Dr. K.V.K. Rao",        role: "Founder, Chairman & Chancellor", img: founderImg },
  { slug: "co-founder", name: "Smt. C.V.N.V Bharathi", role: "Co-Founder & Pro-Chancellor",    img: bharathiImg },
  { slug: "ceo",        name: "Mr. K. Sri Harsha",     role: "Secretary & CEO",                img: harshaImg },
  { slug: "treasurer",  name: "Smt. K. Indraja",       role: "Treasurer & CFO",                img: indrajaImg },
  { slug: "joint-secretary", name: "Smt. K. Indu Aparna", role: "Joint Secretary & COO",        img: induImg },
];

export default function LeadershipHub() {
  return (
    <main className="font-['Poppins']">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 pt-10 lg:pt-14">
        <h1 className="text-3xl sm:text-4xl font-black font-outfit text-[#0f6a5a]">
          Leadership
        </h1>
        <p className="mt-2 text-slate-600">
          Meet the team guiding Stmarys University's vision, governance, and academic growth.
        </p>

        <div className="mt-6 bg-[#0d315c]/5 cut-corner-panel overflow-hidden">
          <div
            className="h-44 sm:h-56 lg:h-64 w-full bg-center bg-cover"
            style={{ backgroundImage: `url('/assets/hero-campus.webp')` }}
          />
        </div>
      </section>

      {/* Cards row (click → profile) */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {leaders.map((p) => (
            <Link
              href={`/leadership/${p.slug}`}
              key={p.slug}
              className="group cut-corner-card bg-white shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={resolveAssetSrc(p.img)}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center cut-corner-badge ring-1 ring-[#0f6a5a] group-hover:bg-[#0f6a5a] transition">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 fill-[#0f6a5a] group-hover:fill-white"
                    >
                      <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500">{p.role}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/leadership/all"
            className="inline-flex items-center gap-2 text-[#0f6a5a] font-semibold hover:underline"
          >
            View full Leadership Structure
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
