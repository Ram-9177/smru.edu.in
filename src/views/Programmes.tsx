"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import type { CatalogueProgramme } from "@/lib/seo/programme-catalogue";

type SchoolGroup = { schoolName: string; schoolSlug: string; programmes: CatalogueProgramme[] };

const LEVELS: Array<{ key: string; label: string }> = [
  { key: "all", label: "All levels" },
  { key: "ug", label: "Undergraduate" },
  { key: "pg", label: "Postgraduate" },
  { key: "diploma", label: "Diploma" },
  { key: "phd", label: "Doctoral" },
];

export default function Programmes({ groups, total }: { groups: SchoolGroup[]; total: number }) {
  const [query, setQuery] = useState("");
  const [school, setSchool] = useState("all");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((group) => school === "all" || group.schoolSlug === school)
      .map((group) => ({
        ...group,
        programmes: group.programmes.filter((programme) => {
          if (level !== "all" && !(programme.category === level || (level === "phd" && programme.category === "integrated_phd"))) return false;
          if (!q) return true;
          return (
            programme.name.toLowerCase().includes(q) ||
            programme.departmentName.toLowerCase().includes(q) ||
            programme.level.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((group) => group.programmes.length > 0);
  }, [groups, query, school, level]);

  const shownCount = filtered.reduce((sum, group) => sum + group.programmes.length, 0);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#f9fbff_100%)] pt-[120px] lg:pt-[136px] pb-20">
      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">Programme catalogue</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-5xl">
            All Programmes at St. Mary&apos;s University (SMRU)
          </h1>
          <div className="mt-5 h-1.5 w-20 rounded-full bg-[#ffaf3a]" />
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-700">
            St. Mary&apos;s University (SMRU), Hyderabad offers {total} undergraduate, postgraduate, diploma and doctoral
            programmes across six schools — rehabilitation sciences, health &amp; allied health sciences, psychology,
            nursing, engineering &amp; emerging technologies, and law. Every programme below links to its full page with
            eligibility, duration, curriculum and admissions. Fees are confirmed at official admissions counselling.
          </p>

          {/* Filters — the full list is rendered in the static HTML below; this only narrows what is shown. */}
          <div className="mt-10 grid gap-4 rounded-2xl border border-[#dce7f3] bg-white p-5 sm:grid-cols-[1fr_auto_auto]">
            <label className="relative flex items-center">
              <FaSearch className="absolute left-4 text-slate-400" size={14} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a course — BPT, nursing, BASLP, law…"
                aria-label="Search programmes"
                className="w-full rounded-xl border border-[#dce7f3] bg-[#f8fbff] py-3 pl-11 pr-4 text-sm font-semibold text-[#0d315c] outline-none focus:border-[#019e6e]"
              />
            </label>
            <select
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              aria-label="Filter by school"
              className="rounded-xl border border-[#dce7f3] bg-white px-4 py-3 text-sm font-semibold text-[#0d315c] outline-none focus:border-[#019e6e]"
            >
              <option value="all">All schools</option>
              {groups.map((group) => (
                <option key={group.schoolSlug} value={group.schoolSlug}>
                  {group.schoolName}
                </option>
              ))}
            </select>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              aria-label="Filter by level"
              className="rounded-xl border border-[#dce7f3] bg-white px-4 py-3 text-sm font-semibold text-[#0d315c] outline-none focus:border-[#019e6e]"
            >
              {LEVELS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Showing {shownCount} of {total} programmes
          </p>

          <div className="mt-10 space-y-12">
            {filtered.map((group) => (
              <div key={group.schoolSlug}>
                <div className="flex items-center justify-between gap-4 border-b border-[#dce7f3] pb-3">
                  <h2 className="text-xl font-black text-[#0d315c]">{group.schoolName}</h2>
                  <Link href={`/schools/${group.schoolSlug}/`} className="shrink-0 text-sm font-bold text-[#019e6e] hover:underline">
                    School hub <FaArrowRight className="inline" size={11} />
                  </Link>
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                        <th className="px-3 py-2 font-black">Programme</th>
                        <th className="px-3 py-2 font-black">Level</th>
                        <th className="px-3 py-2 font-black">Duration</th>
                        <th className="px-3 py-2 font-black">Annual fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.programmes.map((programme) => (
                        <tr key={programme.path} className="border-t border-[#eef4fb] hover:bg-[#f4f9ff]">
                          <td className="px-3 py-3">
                            <Link href={`${programme.path}/`} className="font-bold text-[#0d315c] hover:text-[#019e6e]">
                              {programme.name}
                            </Link>
                            <span className="block text-xs font-medium text-slate-500">{programme.departmentName}</span>
                          </td>
                          <td className="px-3 py-3 text-slate-600">{programme.categoryLabel}</td>
                          <td className="px-3 py-3 text-slate-600">{programme.duration || "See page"}</td>
                          <td className="px-3 py-3 text-slate-600">{programme.feeLabel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="rounded-xl border border-[#dce7f3] bg-white px-6 py-10 text-center text-slate-600">
                No programmes match that filter. <button className="font-bold text-[#019e6e]" onClick={() => { setQuery(""); setSchool("all"); setLevel("all"); }}>Reset</button>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
