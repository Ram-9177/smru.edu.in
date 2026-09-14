const fs = require('fs');

const pageContent = `"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MerittoWidget from "@/components/MerittoWidget";
import {
  TbBrain,
  TbWorld,
  TbBuildingHospital,
  TbShieldCheck,
  TbHeartbeat,
  TbActivity,
  TbPlane,
  TbCurrencyRupee,
  TbX
} from "react-icons/tb";

export default function NursingLanding() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center">
             <Image
                src="/assets/Logo.webp"
                alt="St. Mary's University"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
          </Link>
          <button 
            onClick={() => setIsApplyOpen(true)}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Apply Now
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900">
            B.Sc Nursing · Admissions Open 2026–27
          </div>
          <h1 className="mb-3 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
            Nursing, trained inside a live rehabilitation ecosystem.
          </h1>
          <p className="mb-6 text-base text-slate-600 sm:text-lg">
            NCLEX-aligned curriculum. Rehabilitation, mental health, and critical care pathways. Clinical training across a full healthcare ecosystem.
          </p>

          <div className="rounded-xl border border-slate-300 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 font-medium text-slate-900">Speak to an admissions counsellor</p>
                <div className="grid gap-1 text-sm text-slate-700">
                  <p>080 65459645 · WhatsApp 94933 21969</p>
                  <p>enquiry@smru.edu.in</p>
                </div>
              </div>
              <button 
                onClick={() => setIsApplyOpen(true)}
                className="hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white sm:block transition-colors hover:bg-slate-800"
              >
                Apply Online
              </button>
            </div>
          </div>
        </div>

        <div className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-2xl font-semibold text-slate-900">4.5 million</p>
            <p className="mt-1 text-sm text-slate-600">the projected global shortfall of nurses by 2030 (WHO)</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-2xl font-semibold text-slate-900">10 million</p>
            <p className="mt-1 text-sm text-slate-600">the projected global health-worker shortage by 2030 (WHO)</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-2xl font-semibold text-slate-900">2.4 billion</p>
            <p className="mt-1 text-sm text-slate-600">people worldwide living with a condition that could benefit from rehabilitation</p>
          </div>
        </div>

        <div className="my-8 rounded-xl bg-slate-100 p-6 sm:p-8">
          <p className="text-lg italic leading-relaxed text-slate-900 sm:text-xl">
            "Nursing is not a fallback career. It is one of the most in-demand, mobile, and respected professions of the next decade."
          </p>
        </div>

        <section className="mb-10">
          <h2 className="mb-1 text-xl font-medium text-slate-900 sm:text-2xl">An Indian Nursing Degree. Built to International Standards.</h2>
          <p className="mb-6 text-sm text-slate-500 sm:text-base">The credential is Indian. The standard is global. St. Mary's B.Sc Nursing is structured against NCLEX-RN.</p>
          
          <div className="grid gap-3">
            <div className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <TbBrain className="shrink-0 text-2xl text-slate-900" />
              <div>
                <p className="mb-1 font-medium text-slate-900">Clinical reasoning over rote learning</p>
                <p className="text-sm text-slate-600 sm:text-base">Coursework is designed around case studies, patient scenarios, and clinical judgment, in line with NCLEX's Next Generation format.</p>
              </div>
            </div>
            
            <div className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <TbWorld className="shrink-0 text-2xl text-slate-900" />
              <div>
                <p className="mb-1 font-medium text-slate-900">English-medium clinical training</p>
                <p className="text-sm text-slate-600 sm:text-base">Patient communication, documentation, and case presentation conducted in English throughout the degree.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <TbBuildingHospital className="shrink-0 text-2xl text-slate-900" />
              <div>
                <p className="mb-1 font-medium text-slate-900">The St. Mary's Ecosystem</p>
                <p className="text-sm text-slate-600 sm:text-base">A 100-bed rehabilitation hospital, a 50-bed mental health hospital, a rehabilitation centre, and a 250-capacity special school on campus.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <TbShieldCheck className="shrink-0 text-2xl text-slate-900" />
              <div>
                <p className="mb-1 font-medium text-slate-900">Campus, Safety, and the Parent Promise</p>
                <p className="text-sm text-slate-600 sm:text-base">A 120-acre campus. Separate hostels with 24-hour security. Trained wardens. CCTV coverage. Controlled campus access.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-1 text-xl font-medium text-slate-900 sm:text-2xl">Career Tracks</h2>
          <p className="mb-6 text-sm text-slate-600 sm:text-base">Build a specialist identity from Year 2. From Year 2, you can align your electives, clinical postings, and skill certifications toward a track.</p>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50">
              <TbHeartbeat className="text-2xl text-slate-900" />
              <p className="mt-2 text-sm font-medium text-slate-900">Rehabilitation Nursing</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50">
              <TbBrain className="text-2xl text-slate-900" />
              <p className="mt-2 text-sm font-medium text-slate-900">Psychiatric & Mental Health</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50">
              <TbActivity className="text-2xl text-slate-900" />
              <p className="mt-2 text-sm font-medium text-slate-900">Critical Care Nursing</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50">
              <TbPlane className="text-2xl text-slate-900" />
              <p className="mt-2 text-sm font-medium text-slate-900">International Readiness</p>
            </div>
          </div>
        </section>

        <div className="mb-10 flex gap-4 rounded-xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100 items-start">
          <TbCurrencyRupee className="shrink-0 text-2xl text-slate-900 mt-0.5" />
          <div>
            <p className="mb-1 font-medium text-slate-900">Fee support</p>
            <p className="text-sm text-slate-600 sm:text-base">Eligible SC / ST / OBC students may receive up to 100% tuition fee support through applicable Government scholarship and fee-reimbursement schemes. Bank loan assistance is available for eligible students, subject to bank norms and approval.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
          <h2 className="mb-1.5 text-xl font-medium text-slate-900">Visit the campus</h2>
          <p className="mb-4 text-sm text-slate-600 sm:text-base">St. Mary's University, Near Ramoji Film City, Deshmukhi Village, Hyderabad 508284</p>
          <p className="mb-4 text-sm text-slate-600 sm:text-base">Corporate office: Ground Floor, Prajay Princeton Towers, opposite Metro Pillar No. 1650, LB Nagar, Hyderabad — 2 minutes' walk from LB Nagar Metro.</p>
          <p className="mb-6 text-sm font-medium text-slate-700 sm:text-base">We encourage families to visit before applying. See the hospitals. Walk the campus. Meet the faculty. A nursing decision is a four-year decision — make it with your eyes open.</p>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="mb-1.5 text-lg font-medium text-slate-900">Recognitions</h2>
            <p className="mb-2 text-sm text-slate-600">St. Mary's University, Hyderabad</p>
            <ul className="list-inside list-disc space-y-1.5 text-xs text-slate-500 sm:text-sm">
              <li>Established under the Telangana State Private Universities (Establishment and Regulation) Act, 2018.</li>
              <li>Recognised by the University Grants Commission under Section 2(f) of the UGC Act, 1956.</li>
              <li>School of Nursing — programmes structured in alignment with INC norms and NCLEX-RN standards.</li>
              <li>Programme approvals, affiliations, and clinical partnerships are confirmed at the time of admission.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* APPLICATION FORM MODAL */}
      {isApplyOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsApplyOpen(false)}
          />
          <div
            className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-1 sm:max-h-[calc(100dvh-3rem)] sm:p-2 shadow-2xl"
            role="document"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl bg-white px-4 py-3 border-b border-slate-100">
              <h2 className="text-lg font-medium text-slate-900">
                Application Form
              </h2>
              <button
                type="button"
                onClick={() => setIsApplyOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="Close modal"
              >
                <TbX size={20} />
              </button>
            </div>
            <div className="p-2 sm:p-4">
              <MerittoWidget className="min-h-[500px] w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageContent);
console.log('page.tsx rewritten successfully.');
