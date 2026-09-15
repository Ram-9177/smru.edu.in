"use client";

import { useEffect, useState, type ElementType, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBaby,
  FaBrain,
  FaBriefcaseMedical,
  FaChartLine,
  FaCheckCircle,
  FaComments,
  FaEnvelope,
  FaGlobe,
  FaHeartbeat,
  FaHome,
  FaHospital,
  FaLanguage,
  FaPhone,
  FaShieldAlt,
  FaStethoscope,
  FaUserNurse,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import MerittoWidget from "@/components/MerittoWidget";

const navItems = [
  ["Ecosystem", "#ecosystem"],
  ["Career Tracks", "#tracks"],
  ["Mobility Cell", "#mobility"],
  ["Simulation", "#simulation"],
  ["Campus", "#campus"],
  ["Admissions", "#admissions"],
];

const heroImages = ["/images/hero-campus.jpg", "/images/nursing_hero.png"];

const stats = [
  ["4.5 Million", FaUserNurse, "The projected global shortfall of nurses by 2030 (WHO, State of the World’s Nursing 2025)."],
  ["10 Million", FaUsers, "The projected global health worker shortage by 2030 (WHO)."],
  ["2.4 Billion", FaGlobe, "People worldwide living with a condition that could benefit from rehabilitation."],
  ["Largest", FaStethoscope, "Nurses are the single largest occupational group in global healthcare."],
] as const;

const standards = [
  ["Clinical Reasoning", "Coursework designed around case studies, patient scenarios, and clinical judgment, in line with NCLEX’s Next Generation format."],
  ["Global Competencies", "Mapped to international standards: safe and effective care, health promotion, psychosocial integrity, and physiological integrity."],
  ["English-Medium Training", "Patient communication, documentation, and case presentations are conducted in English throughout the degree."],
  ["Structured Prep System", "Dedicated NCLEX prep hours, adaptive question banks, mock exams, and clinical judgment workshops."],
  ["One Curriculum", "NCLEX preparation strengthens readiness for UK NMC, Gulf Prometric, and Australian pathways. Prepare once. Choose later."],
];

const clinical = [
  ["Clinical Training Sites", FaHospital, "Daily clinical exposure from Year 1 across rehabilitation, mental-health, general nursing and community-outreach placements. Partner facilities are confirmed at admissions counselling."],
  ["Multi-Speciality Partners", FaHeartbeat, "ICU, emergency, operation theatre, obstetrics and gynaecology, paediatrics, and oncology."],
  ["Government Rotations", FaUsers, "High patient-volume exposure, public health experience, and community health nursing."],
  ["Community Postings", FaHome, "Rural health centres, urban PHCs, home care, and disability outreach."],
] as const;

const tracks = [
  ["Rehabilitation Nursing", "Train inside an active rehabilitation hospital alongside physiotherapists and rehab specialists. Focus on neuro-rehab, spinal care, and post-surgical recovery."],
  ["Psychiatric & Mental Health", "Hospital-based training under psychiatrists and clinical psychologists in mental-health clinical settings (placement sites confirmed at admissions counselling)."],
  ["Critical Care Nursing", "ICU, emergency, and trauma. Designed for students who thrive under pressure."],
  ["Geriatric & Long-Term Care", "The global growth specialty. Ageing populations across Japan, Germany, Canada, and the UK are hiring specifically for this."],
  ["Mother & Child Health", "Focused preparation in obstetrics, paediatrics, and neonatal care."],
  ["Leadership & Operations", "For students aiming at ward supervision, hospital administration, and healthcare management roles."],
  ["International Readiness", "Structured preparation for global pathways including NCLEX, NMC, and country-specific language proficiency."],
];

const mobility = [
  ["United States and Canada", "NCLEX preparation, credentialing guidance, documentation support, and Pearson VUE registration orientation."],
  ["United Kingdom", "NMC pathway orientation, IELTS and OET training, CBT and OSCE readiness."],
  ["Germany & Japan", "Language pathway support, elder-care specialisation, cultural readiness, and nursing terminology training."],
  ["Gulf Countries", "Prometric, DHA, HAAD, and MOH exam awareness and interview preparation."],
];

const campus = [
  ["Safety First", FaShieldAlt, "Separate hostels, 24-hour security, CCTV, anti-ragging systems, and on-campus medical support."],
  ["Life on Campus", FaHome, "Nutritionist-supervised mess, transport, sports, cultural activities, and senior faculty mentorship."],
  ["Parent Communication", FaComments, "Regular updates on academics and clinicals, direct access to wardens, and structured parent-teacher engagement."],
  ["Career Ready", FaBriefcaseMedical, "A degree structured for employability with Indian hospital placements and global mobility support built in."],
] as const;

function CutCard({
  children,
  className = "",
  light = true,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`cut-card ${light ? "cut-card-light" : "cut-card-dark"} ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: ElementType;
  description: string;
}) {
  return (
    <CutCard className="group h-full p-6 text-center transition hover:-translate-y-1">
      <Icon className="mx-auto mb-4 text-3xl text-[#019e6e] transition group-hover:scale-110" />
      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0d315c]">{title}</h3>
      <p className="mt-3 border-t border-[#dbe8f8] pt-3 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </CutCard>
  );
}

function SectionHeading({
  children,
  description,
  centered = false,
  dark = false,
}: {
  children: ReactNode;
  description?: string;
  centered?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`mb-14 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <h2 className={`text-3xl font-black uppercase tracking-tight sm:text-4xl ${dark ? "text-white" : "text-[#0d315c]"}`}>
        {children}
      </h2>
      <div className={`mt-4 h-1.5 w-24 bg-[#ffaf3a] ${centered ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-6 text-lg font-light leading-relaxed ${dark ? "text-white/80" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default function NursingLanding() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(
      () => setHeroIndex((current) => (current + 1) % heroImages.length),
      3000,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isApplyOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsApplyOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isApplyOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0d315c]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#071a32]/85 shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="brand-cut flex h-12 w-24 items-center justify-center bg-white px-2 shadow-sm sm:w-28">
              <Image
                src="https://smru.edu.in/assets/Logo.webp"
                alt="St. Mary's University logo"
                width={374}
                height={200}
                className="h-10 w-auto object-contain"
              />
            </span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.15em] text-white sm:inline md:text-sm">
              St. Mary&apos;s University
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="text-[11px] font-semibold uppercase tracking-widest text-white/80 transition hover:text-[#ffaf3a]">
                {label}
              </a>
            ))}
          </nav>
          <button onClick={() => setIsApplyOpen(true)} className="button-cut inline-flex items-center gap-2 bg-[#c43342] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5">
            Apply <FaArrowRight />
          </button>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-dvh items-center overflow-hidden bg-[#071a32] pt-20 text-white">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="Nursing campus and clinical training"
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-[center_30%] transition-opacity duration-1000 ${heroIndex === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-br from-[#071a32]/85 via-[#0d315c]/75 to-[#019e6e]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,50,1)_0%,rgba(7,26,50,.95)_45%,rgba(7,26,50,.6)_75%,rgba(7,26,50,.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#071a32] to-transparent" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[.9fr_.55fr] lg:pb-12">
            <div>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[5rem]">
                India&apos;s Premium <span className="text-[#ffaf3a]">Nursing</span> Program
              </h1>
              <p className="mt-6 inline-flex items-center gap-3 border-l-4 border-[#c43342] bg-white/10 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] backdrop-blur-xl sm:text-base">
                <FaCheckCircle className="text-[#ffaf3a]" /> B.Sc Nursing · 2026–27
              </p>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/90 sm:text-xl">
                Nursing, trained inside a live rehabilitation ecosystem. NCLEX-aligned curriculum. Rehabilitation, mental health, and critical care pathways. Clinical training across a full healthcare ecosystem.
              </p>
              <button onClick={() => setIsApplyOpen(true)} className="button-cut mt-8 inline-flex items-center gap-3 bg-[#c43342] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:-translate-y-1">
                Apply Now <FaArrowRight />
              </button>
            </div>
            <div className="relative z-20 self-center">
              <div className="mb-3 border-l-4 border-[#ffaf3a] bg-[#071a32]/80 px-5 py-4 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffaf3a]">Admissions 2026–27</p>
                <h2 className="mt-1 text-xl font-black uppercase text-white sm:text-2xl">Apply for B.Sc Nursing</h2>
              </div>
              <MerittoWidget />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:py-28">
          <div className="relative z-10 mx-auto max-w-7xl">
            <SectionHeading description="Most nursing colleges will teach you the syllabus. A few will get you into a hospital. One is built around the future of healthcare itself.">
              The Case for Nursing at <span className="text-[#019e6e]">St. Mary&apos;s</span>
            </SectionHeading>
            <p className="-mt-10 mb-14 max-w-3xl leading-relaxed text-slate-600">
              Global healthcare is shifting. The population is ageing. Chronic conditions are rising. Mental health has moved from stigma to specialty. Rehabilitation is no longer an afterthought—it is where medicine ends and recovery begins.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([title, icon, description]) => (
                <StatCard key={title} title={title} icon={icon} description={description} />
              ))}
            </div>
            <div className="mx-auto mt-16 max-w-4xl rounded-xl border border-[#019e6e]/20 bg-[#019e6e]/10 p-8 text-center">
              <p className="text-xl font-bold italic leading-relaxed text-[#019e6e] sm:text-2xl">
                “Nursing is not a fallback career. It is one of the most in-demand, mobile, and respected professions of the next decade.”
              </p>
            </div>
          </div>
        </section>

        <section className="pattern-dark bg-[#071a32] px-4 py-20 text-white sm:px-6 lg:py-28">
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading dark centered description="The credential is Indian. The standard is global. St. Mary’s B.Sc Nursing is structured against NCLEX-RN—the benchmark for registered nurse practice worldwide.">
              An Indian Degree. <span className="text-[#ffaf3a]">Built to International Standards.</span>
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {standards.map(([title, description]) => (
                <CutCard key={title} light={false} className="p-6">
                  <FaCheckCircle className="mb-4 text-2xl text-[#019e6e]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
                  <p className="mt-3 border-t border-white/15 pt-3 text-sm leading-relaxed text-white/70">{description}</p>
                </CutCard>
              ))}
            </div>
          </div>
        </section>

        <section id="ecosystem" className="scroll-mt-16 bg-[#019e6e]/10 px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading description="One campus. Every kind of patient care. One patient. One team. Many professions. Our students train inside a working care system, not only a classroom.">
                The St. Mary&apos;s <span className="text-[#019e6e]">Ecosystem</span>
              </SectionHeading>
              <div className="space-y-4">
                {[
                  ["Rehabilitation Nursing Placements", "Post-surgical recovery, neurological rehabilitation, spinal injury care, physiotherapy-integrated nursing, and long-term patient management."],
                  ["Mental Health Nursing Placements", "Psychiatric nursing, therapeutic communication, crisis response, medication management, and patient dignity in mental illness."],
                  ["Rehabilitation Centre & Special School", "Audiology, speech therapy, assistive technology, paediatric developmental care, disability support, and family counselling."],
                ].map(([title, description]) => (
                  <div key={title} className="border border-[#dbe8f8] bg-white/70 p-6 shadow-sm">
                    <h3 className="font-bold text-[#0d315c]">{title}</h3>
                    <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-relaxed text-slate-600">{description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              <Image src="/images/campus-aerial.webp" alt="St. Mary's rehabilitation ecosystem and campus" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-1000 hover:scale-105" />
              <div className="absolute inset-0 bg-[#0d315c]/20 mix-blend-multiply" />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading centered description="Where you train decides what kind of nurse you become. Students rotate through a tiered network designed to build both breadth and depth.">
              Clinical Training Network
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {clinical.map(([title, icon, description]) => (
                <StatCard key={title} title={title} icon={icon} description={description} />
              ))}
            </div>
          </div>
        </section>

        <section id="tracks" className="pattern-dark scroll-mt-16 bg-[#071a32] px-4 py-20 text-white sm:px-6 lg:py-28">
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading dark description="Build a specialist identity from Year 2. Align your electives, clinical postings, and skill certifications toward a track that matches where you want your career to go.">
              Career <span className="text-[#ffaf3a]">Tracks</span>
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tracks.map(([title, description]) => (
                <CutCard key={title} light={false} className="group p-8 transition hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#ffaf3a] shadow-[0_0_10px_#ffaf3a]" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white">{title}</h3>
                  </div>
                  <p className="mt-5 border-t border-white/20 pt-4 text-sm font-light leading-relaxed text-white/85">{description}</p>
                </CutCard>
              ))}
            </div>
          </div>
        </section>

        <section id="mobility" className="scroll-mt-16 bg-[#019e6e]/10 px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading centered description="A structured pathway from Hyderabad to hospitals across the world. It prepares students for global shortages with structured preparation, not just promises.">
              Global Nursing <span className="text-[#019e6e]">Mobility Cell</span>
            </SectionHeading>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
              {mobility.map(([title, description]) => (
                <div key={title} className="group border border-[#dbe8f8] bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#ffaf3a]">
                  <h3 className="flex items-center gap-4 text-lg font-bold text-[#0d315c]">
                    <span className="h-2 w-2 rounded-full bg-[#ffaf3a]" /> {title}
                  </h3>
                  <p className="mt-5 border-t border-slate-200 pt-5 pl-6 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="simulation" className="scroll-mt-16 bg-white px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:divide-x lg:divide-slate-200">
            <div className="lg:pr-14">
              <SectionHeading description="Practice before patient care. Every clinical procedure is first performed in a simulation environment—repeatedly, under supervision, until you are confident.">
                Simulation & <span className="text-[#c43342]">Competency Centre</span>
              </SectionHeading>
              <div className="grid sm:grid-cols-2 sm:gap-x-8">
                {[
                  ["ICU Simulation", FaHeartbeat, "Ventilator management, monitoring, emergency response."],
                  ["Maternal & Neonatal", FaBaby, "Labour management, newborn care, obstetric emergencies."],
                  ["Psychiatric Communication", FaBrain, "De-escalation, therapeutic conversation, crisis response."],
                  ["OSCE & Logbook", FaChartLine, "Competency certification and portable digital skill tracking."],
                ].map(([title, Icon, description]) => (
                  <div key={title as string} className="flex gap-3 border-t border-slate-200 py-5">
                    <Icon className="mt-0.5 shrink-0 text-xl text-[#c43342]" />
                    <div>
                      <h3 className="font-bold text-[#0d315c]">{title as string}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{description as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-14">
              <SectionHeading description="A nursing degree gets you the qualification. The Finishing School gets you ready to be hired. Every final-year student completes the Nursing Employability Bootcamp.">
                The <span className="text-[#019e6e]">Finishing School</span>
              </SectionHeading>
              {[
                ["Clinical Readiness", FaStethoscope, "Bedside communication, clinical documentation, infection control, ICU basics, emergency response, and digital hospital systems."],
                ["Professional Readiness", FaLanguage, "English fluency for healthcare, patient handover practice, interprofessional communication, and workplace grooming."],
                ["Career Readiness", FaBriefcaseMedical, "Interview technique, resume building, employer interaction sessions, and mock recruitment drives."],
              ].map(([title, Icon, description]) => (
                <div key={title as string} className="flex items-start gap-4 border-t border-slate-200 py-5">
                  <span className="rounded-lg bg-[#019e6e]/10 p-3 text-[#019e6e]"><Icon /></span>
                  <div>
                    <h3 className="font-bold text-[#0d315c]">{title as string}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{description as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="campus" className="scroll-mt-16 bg-[#f4f7fa] px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading centered description="A 120-acre campus. Built for focus, safety, and family confidence. Residential education is a structured, supervised development system—not just a hostel.">
              Campus, Safety, & <span className="text-[#ffaf3a]">The Parent Promise</span>
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {campus.map(([title, icon, description]) => (
                <StatCard key={title} title={title} icon={icon} description={description} />
              ))}
            </div>
          </div>
        </section>

        <section id="admissions" className="scroll-mt-16 border-t border-[#dbe8f8] bg-[#0b1f3a] px-4 py-20 text-white sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading dark>Admissions 2026–27</SectionHeading>
              <div className="space-y-6">
                <div className="rounded-lg border border-white/20 bg-white/10 p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#ffaf3a]">B.Sc Nursing Overview</h3>
                  <ul className="space-y-3 text-white/90">
                    <li><strong>Duration:</strong> 4 years</li>
                    <li><strong>Eligibility:</strong> 10+2 pass with Biology & MBiPC</li>
                    <li><strong>Regulator:</strong> Aligned with INC norms</li>
                    <li><strong>Medium:</strong> English</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-[#ffaf3a]/30 bg-[#ffaf3a]/10 p-6">
                  <h3 className="mb-2 text-xl font-bold text-[#ffaf3a]">The Founding-Batch Advantage</h3>
                  <p className="text-sm leading-relaxed text-white/80">Students admitted in 2026–27 join a small founding cohort, with close attention, direct access to faculty, and a distinctive identity.</p>
                </div>
                <div className="rounded-lg border border-white/20 bg-white/10 p-6">
                  <h3 className="mb-2 text-xl font-bold text-[#ffaf3a]">Fee Support</h3>
                  <p className="text-sm leading-relaxed text-white/80">Eligible SC/ST/OBC students may receive up to 100% tuition fee support through applicable government scholarship and fee-reimbursement schemes.</p>
                </div>
              </div>
            </div>
            <CutCard className="bg-white p-10 text-[#0d315c]">
              <h3 className="text-2xl font-black uppercase">Speak to an Admissions Counsellor</h3>
              <div className="mt-6 space-y-3 text-slate-700">
                <p className="flex items-center gap-3 font-semibold"><FaPhone className="text-[#019e6e]" /> 080 65459645 · 8712479133</p>
                <p className="flex items-center gap-3 font-semibold"><FaWhatsapp className="text-[#019e6e]" /> WhatsApp 94933 21969</p>
                <p className="flex items-center gap-3 font-semibold"><FaEnvelope className="text-[#019e6e]" /> enquiry@smru.edu.in · smru.edu.in</p>
              </div>
              <div className="mt-8 border-t border-slate-200 pt-6">
                <h3 className="mb-4 text-xl font-black uppercase">Visit the Campus</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">St. Mary&apos;s University, Near Ramoji Film City, Deshmukhi Village, Hyderabad 508284</p>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">Corporate office: Ground Floor, Prajay Princeton Towers, opposite Metro Pillar No. 1650, LB Nagar, Hyderabad.</p>
                <p className="text-sm font-semibold leading-relaxed text-slate-600">See the hospitals. Walk the campus. Meet the faculty. A nursing decision is a four-year decision—make it with your eyes open.</p>
              </div>
            </CutCard>
          </div>
        </section>
      </main>

      <footer className="bg-[#041122] px-6 py-16 text-white/80">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-6 text-xl font-bold uppercase tracking-widest text-[#ffaf3a]">Recognitions</h3>
          <h4 className="mb-4 font-semibold text-white">St. Mary&apos;s University, Hyderabad</h4>
          <ul className="max-w-4xl list-disc space-y-4 pl-5 text-sm font-light leading-relaxed text-white/70">
            <li>Established under Telangana Ordinance No. 2 of 2025 (promulgated 24 July 2025), enacted as Telangana Act No. 10 of 2026.</li>
            <li>Recognised by the University Grants Commission under Section 2(f) of the UGC Act, 1956.</li>
            <li>School of Nursing programmes are structured in alignment with Indian Nursing Council norms and NCLEX-RN international standards.</li>
            <li>Programme approvals, affiliations, and clinical partnerships are confirmed with counsellors at the time of admission.</li>
          </ul>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs tracking-wide text-white/50">
            St. Mary&apos;s University · Near Ramoji Film City, Deshmukhi Village, Hyderabad 508284 · smru.edu.in
          </div>
        </div>
      </footer>

      <div className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col overflow-hidden rounded-l-xl border border-r-0 border-white/20 bg-[#071a32]/90 shadow-2xl backdrop-blur-xl">
        <a href="https://wa.me/919493321969" target="_blank" rel="noopener noreferrer" className="flex h-14 w-12 items-center justify-center border-b border-white/10 text-2xl text-[#019e6e] hover:bg-white/10" aria-label="WhatsApp us"><FaWhatsapp /></a>
        <a href="tel:08065459645" className="flex h-14 w-12 items-center justify-center border-b border-white/10 text-[#ffaf3a] hover:bg-white/10" aria-label="Call us"><FaPhone /></a>
        <button onClick={() => setIsApplyOpen(true)} className="flex h-24 w-12 items-center justify-center bg-[#c43342] text-white hover:bg-[#a62b37]" aria-label="Apply now">
          <span className="-rotate-90 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.2em]">Apply</span>
        </button>
      </div>

      {isApplyOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#041122]/85 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="application-form-title" onClick={() => setIsApplyOpen(false)}>
          <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-[#071a32] p-3 shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-5" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 mb-3 flex items-center justify-between rounded-xl bg-[#071a32]/95 px-3 py-2 backdrop-blur-xl">
              <h2 id="application-form-title" className="text-sm font-black uppercase tracking-widest text-white sm:text-base">Apply for B.Sc Nursing</h2>
              <button onClick={() => setIsApplyOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-[#c43342]" aria-label="Close application form" autoFocus>×</button>
            </div>
            <MerittoWidget />
          </div>
        </div>
      )}
    </div>
  );
}
