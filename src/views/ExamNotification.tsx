"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBell,
  FaCheckCircle,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import { ADMISSIONS_CONTENT_LAST_UPDATED } from "@/lib/shared/site-constants";

export default function ExamNotification() {
  return (
    <main className="min-h-screen bg-[#f4f8fc] px-4 pb-24 pt-36 text-[#0d315c] md:pt-44">
      <section className="mx-auto max-w-5xl overflow-hidden cut-corner-panel border border-[#dbe8f8] bg-white shadow-[0_28px_70px_rgba(13,49,92,0.1)]">
        <div className="bg-[#0d315c] px-6 py-12 text-center text-white md:px-12 md:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center cut-corner-badge bg-[#ffaf3a] text-2xl text-[#0d315c]">
            <FaBell />
          </div>
          <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#ffcf7a]">
            Admissions Office Update
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">
            Entrance Exam Announcement
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-white/75">
            No university entrance exam is currently announced. Any future entrance examination,
            schedule, eligibility, application or admit-card information will be published only
            through an official Stmarys University notice.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
          <article className="border border-[#dbe8f8] bg-[#f8fbff] p-6">
            <FaInfoCircle className="text-xl text-[#019e6e]" />
            <h2 className="mt-4 text-lg font-black">Current status</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              There is no active university entrance-exam notification, examination date,
              syllabus, pattern, admit card or result announcement at this time.
            </p>
          </article>

          <article className="border border-[#dbe8f8] bg-[#f8fbff] p-6">
            <FaCheckCircle className="text-xl text-[#019e6e]" />
            <h2 className="mt-4 text-lg font-black">Where updates will appear</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              Confirm future updates on this page and through the official admissions office.
              Do not rely on older schedules, unofficial messages or archived documents.
            </p>
          </article>
        </div>

        <div className="border-t border-[#dbe8f8] px-6 py-8 md:px-10">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Last reviewed
              </p>
              <p className="mt-1 text-sm font-bold">{ADMISSIONS_CONTENT_LAST_UPDATED}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 bg-[#019e6e] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white"
              >
                Admissions <FaArrowRight />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#0d315c] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#0d315c]"
              >
                Contact Office <FaEnvelope />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
