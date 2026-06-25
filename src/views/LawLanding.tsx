"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  FaArrowRight,
  FaBalanceScale,
  FaBookOpen,
  FaBriefcase,
  FaCheckCircle,
  FaDownload,
  FaEnvelope,
  FaGavel,
  FaHandshake,
  FaLandmark,
  FaMicroscope,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
// MerittoWidget removed for NPF widget
import useOpenApply from "@/hooks/useOpenApply";
import { useApplyModal } from "@/context/ApplyModalContext";
import { lawCareerPaths, lawFacilities, lawHighlights, lawProgrammes } from "@/data/law";
import { getLawBrochureDownloadUrl, getLawBrochureFileName } from "@/data/law-brochures";
import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { schools } from "@/data/schools";
import { buildSchoolFaqs, buildSchoolAnswers } from "@/lib/seo/academic";
import { FaqSection, AnswerGridSection } from "@/components/seo/PageSections";
import { buildFaqSchema } from "@/lib/seo/schema";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const navLinks = [
  ["Programmes", "#programmes"],
  ["Why Stmarys University Law", "#why"],
  ["Facilities", "#facilities"],
  ["Careers", "#careers"],
  ["Admissions", "#admissions"],
];

const heroTrust = [
  { label: "BCI Approved", Icon: FaBalanceScale },
  { label: "Moot Court Training", Icon: FaGavel },
  { label: "Legal Aid Cell", Icon: FaHandshake },
  { label: "Career Readiness", Icon: FaBriefcase },
];

const whyCards = lawHighlights.map((title, index) => {
  const icons = [FaGavel, FaHandshake, FaBookOpen, FaBalanceScale, FaMicroscope, FaBriefcase];
  return { title, Icon: icons[index] || FaCheckCircle };
});

const facilityImages = ["/assets/law/moot-court.webp", "/assets/law/digital-library.webp", "/assets/law/legal-aid.webp", "/assets/law/adr.webp", "/assets/law/classroom.webp", "/assets/law/campus.webp"];

const admissionSteps = [
  ["01", "Choose Programme", "Select your integrated law or LL.B. pathway."],
  ["02", "Apply Online", "Submit details through the Stmarys University admissions portal."],
  ["03", "Counselling", "Complete eligibility review and admissions counselling."],
  ["04", "Confirm Seat", "Finish documentation and begin your law journey."],
];

function ApplyButton({ className = "", children = "Apply Now" }: { className?: string; children?: ReactNode }) {
  const openApply = useOpenApply("general");
  return (
    <button type="button" onClick={() => openApply("law")} className={className}>
      {children}
    </button>
  );
}

export default function LawLanding() {
  const school = schools.find((s) => s.slug === "law");
  const schoolFaqs = school ? buildSchoolFaqs(school) : [];
  const schoolAnswers = school ? buildSchoolAnswers(school) : [];
  const { openMerittoModal } = useApplyModal();

  const openBrochureForm = (program: string, programLabel: string) => {
    const brochureName = getLawBrochureFileName(program);
    openMerittoModal({
      brochureUrl: getLawBrochureDownloadUrl(program),
      brochureName,
      programLabel,
    });
  };

  useEffect(() => {
    if (!document.getElementById("npf-widget-script")) {
      const s = document.createElement("script");
      s.id = "npf-widget-script";
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0d315c]">
      <header className="fixed inset-x-0 top-0 z-[2000] border-b border-white/15 bg-[#071a32]/96 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-24 items-center justify-center bg-white px-2 shadow-sm" style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
              <Image src="/assets/Logo.webp" alt="Stmarys University" width={86} height={36} className="h-auto w-full object-contain" style={{ height: "auto" }} priority />
            </span>
            <span className="hidden text-[11px] font-black uppercase tracking-[0.24em] text-white md:inline">School of Law</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#ffaf3a]">
                {label}
              </a>
            ))}
          </nav>
          <ApplyButton className="inline-flex items-center gap-2 bg-[#c43342] px-4 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(196,51,66,0.28)] transition-transform hover:-translate-y-0.5">
            Apply <FaArrowRight />
          </ApplyButton>
        </div>
      </header>

      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#071a32] pt-20 text-white sm:min-h-[82svh] lg:min-h-[84svh]">
        <Image src="/assets/law/moot-court.webp" alt="Stmarys University School of Law moot court training" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,50,0.96)_0%,rgba(7,26,50,0.84)_35%,rgba(7,26,50,0.36)_72%,rgba(7,26,50,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/50 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:grid-cols-[0.9fr_0.55fr] lg:pb-12">
          <div>
            <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-[6rem]">
              School of <span className="text-[#ffaf3a]">Law</span> Admissions
            </h1>
            <p className="mt-6 inline-flex items-center gap-3 border-l-4 border-[#c43342] bg-white/10 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_20px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-base">
              <FaBalanceScale className="shrink-0 text-[#ffaf3a]" />
              Approved by the Bar Council of India
            </p>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
              Build advocacy, legal reasoning, research, ethics, and courtroom confidence through practice-driven law education at Stmarys University.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ApplyButton className="inline-flex items-center justify-center gap-3 bg-[#c43342] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(196,51,66,0.34)] transition-transform hover:-translate-y-1">
                Apply Now <FaArrowRight />
              </ApplyButton>
              <button onClick={() => openBrochureForm("general", "Law programmes")} className="inline-flex items-center justify-center gap-3 border border-white/30 bg-white/10 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:bg-white/18">
                Download Brochure <FaDownload />
              </button>
            </div>
          </div>
          <div className="hidden content-end gap-3 lg:grid">
            {heroTrust.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-3 border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <Icon className="shrink-0 text-[#ffaf3a]" />
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programmes" className="scroll-mt-20 border-b border-[#dbe8f8] bg-white px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-sm break-normal text-3xl font-black uppercase tracking-tight text-[#0d315c] sm:max-w-none sm:text-5xl">Programmes Offered</h2>
              <div className="mt-4 h-1.5 w-20 bg-[#ffaf3a]" />
            </div>
            <p className="max-w-xl text-sm font-semibold leading-7 text-slate-600">
              Three-year LL.B., five-year integrated LL.B. (Hons.), one-year LL.M., and Ph.D. in Law pathways from the approved brochure.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lawProgrammes.map((program) => (
              <article key={program.slug} className="border border-[#dbe8f8] border-t-4 border-t-[#019e6e] bg-[#f8fbff] p-5 shadow-[0_12px_28px_rgba(13,49,92,0.05)]">
                <h3 className="min-h-14 text-xl font-black leading-tight text-[#0d315c]">{program.name}</h3>
                <dl className="mt-5 grid gap-3 text-sm font-semibold text-slate-600">
                  <div className="flex justify-between gap-4 border-t border-[#dbe8f8] pt-3"><dt>Duration</dt><dd className="text-[#0d315c]">{program.duration}</dd></div>
                  <div className="flex justify-between gap-4 border-t border-[#dbe8f8] pt-3"><dt>Level</dt><dd className="text-[#0d315c]">{program.level}</dd></div>
                  <div className="border-t border-[#dbe8f8] pt-3"><dt>Eligibility</dt><dd className="mt-1 text-[#0d315c]">{program.eligibility}</dd></div>
                </dl>
                <button
                  type="button"
                  onClick={() => openBrochureForm(program.slug, program.name)}
                  className="mt-5 inline-flex items-center gap-2 border border-[#0d315c]/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0d315c] transition-colors hover:bg-[#eef4ff]"
                >
                  Download Brochure <FaDownload />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-20 bg-[#f5f9ff] px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#0d315c] sm:text-5xl">Why Stmarys University Law?</h2>
              <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
                A conversion-focused learning environment built around advocacy practice, community justice, legal research, and professional readiness.
              </p>
              <div className="mt-8 flex items-center gap-5 border border-[#f1c7cc] bg-white p-5">
                <Image src="/assets/law/bci-logo.svg" alt="Bar Council of India logo" width={86} height={86} className="h-20 w-20 shrink-0 object-contain" />
                <div>
                  <h3 className="text-xl font-black text-[#0d315c]">Bar Council of India Approved</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Law programmes are positioned around statutory legal education standards and professional readiness.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {whyCards.map(({ title, Icon }) => (
                <article key={title} className="border border-[#dbe8f8] bg-white p-5 shadow-[0_10px_24px_rgba(13,49,92,0.05)]">
                  <Icon className="text-2xl text-[#019e6e]" />
                  <h3 className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[#0d315c]">{title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="facilities" className="scroll-mt-20 bg-white px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-black uppercase tracking-tight text-[#0d315c] sm:text-5xl">Facilities & Legal Training</h2>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base font-semibold leading-8 text-slate-600">
            Practical legal education supported by courtroom simulation, legal aid, research, arbitration, and academic support systems.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lawFacilities.map((facility, index) => (
              <article key={facility.title} className="overflow-hidden border border-[#dbe8f8] bg-white shadow-[0_14px_32px_rgba(13,49,92,0.07)]">
                <div className="relative h-44">
                  <Image src={facilityImages[index] || "/assets/law/campus.webp"} alt={facility.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#0d315c]">{facility.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{facility.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="scroll-mt-20 bg-[#071a32] px-4 py-14 text-white sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">Career Paths After Law</h2>
              <p className="mt-5 text-base font-semibold leading-8 text-white/70">
                Prepare for litigation, judiciary, corporate legal roles, policy work, arbitration, research, and public service.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lawCareerPaths.slice(0, 9).map((career) => (
                <div key={career} className="border border-white/12 bg-white/[0.06] p-4">
                  <FaLandmark className="text-[#ffaf3a]" />
                  <p className="mt-3 text-sm font-black leading-5 text-white">{career}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="admissions" className="scroll-mt-20 bg-[#f8fbff] px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#0d315c] sm:text-5xl">Admissions Made Simple</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {admissionSteps.map(([step, title, desc]) => (
                <article key={step} className="border border-[#dbe8f8] bg-white p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c43342] text-sm font-black text-white">{step}</span>
                  <h3 className="mt-4 text-xl font-black text-[#0d315c]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{desc}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${SITE_CONTACT.primaryPhone}`} className="inline-flex items-center justify-center gap-3 border border-[#0d315c]/15 bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#0d315c]">
                <FaPhoneAlt /> Call {SITE_CONTACT.primaryPhone}
              </a>
              <a href={`mailto:${SITE_CONTACT.email}`} className="inline-flex items-center justify-center gap-3 border border-[#0d315c]/15 bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#0d315c]">
                <FaEnvelope /> Email Admissions
              </a>
            </div>
          </div>
          <aside className="border border-[#dbe8f8] bg-[#0d315c] p-4 text-white shadow-[0_20px_45px_rgba(13,49,92,0.18)] sm:p-6">
            <div className="mb-5">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Enquire Now</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/70">Submit your interest and the admissions team will contact you.</p>
            </div>
            <div className="npf_wgts min-h-[400px] w-full bg-white" data-height="400px" data-w="c749512f7c7e844798f6815ac81c0e2b"></div>
          </aside>
        </div>
      </section>

      <section className="bg-[#019e6e] px-4 py-8 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Your future in law begins here.</h2>
            <p className="mt-2 text-sm font-semibold text-white/78">Apply for Stmarys University School of Law admissions.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ApplyButton className="inline-flex items-center justify-center gap-3 bg-[#c43342] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white">
              Apply Now <FaArrowRight />
            </ApplyButton>
            <a href={SITE_CTA_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 border border-white/40 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white">
              WhatsApp <FaUsers />
            </a>
          </div>
        </div>
      </section>

      {SHOW_PUBLIC_SEO_SECTIONS && schoolAnswers.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <AnswerGridSection title="Quick Answers" items={schoolAnswers} />
          <div className="mt-8">
            <FaqSection title="Frequently Asked Questions" items={schoolFaqs} />
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(schoolFaqs))
        }}
      />

      <footer className="bg-[#071a32] px-4 py-8 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs font-semibold text-white/60 md:flex-row">
          <p>Stmarys University, Hyderabad, Telangana</p>
          <p>{SITE_CONTACT.email} | {SITE_CONTACT.primaryPhone}</p>
        </div>
      </footer>
    </div>
  );
}
