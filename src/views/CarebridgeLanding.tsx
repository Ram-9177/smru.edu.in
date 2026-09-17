"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaGlobeAmericas,
  FaUserMd,
  FaGraduationCap,
  FaCertificate,
  FaPlaneDeparture,
  FaHospital,
  FaCheckCircle,
  FaPhoneAlt,
  FaArrowRight,
  FaAward,
  FaUniversity,
  FaStethoscope,
  FaHeartbeat,
  FaLaptopMedical,
  FaLanguage,
  FaBriefcase,
  FaClinicMedical,
  FaFileContract,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function CarebridgeLanding() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const programs = [
    {
      title: "Bachelor of Physiotherapy (BPT)",
      duration: "4.5 Years (Incl. 6 Months Internship)",
      desc: "Rehabilitation, movement science, neuro & ortho therapy with live clinical rotations from Year 1.",
      url: "https://carebridge.education/programs/bachelor-of-physiotherapy/",
      tag: "High Global Demand",
      icon: FaHeartbeat,
    },
    {
      title: "Bachelor of Occupational Therapy (BOT)",
      duration: "4.5 Years (Incl. 6 Months Internship)",
      desc: "Assistive rehabilitation, sensory integration, and occupational restoration in clinical and pediatric setups.",
      url: "https://carebridge.education/programs/bachelor-of-occupational-therapy/",
      tag: "UK / Australia Shortage List",
      icon: FaStethoscope,
    },
    {
      title: "B.Sc Nursing",
      duration: "4 Years Integrated Degree",
      desc: "International nursing curriculum aligned with NMC UK and Australian AHPRA healthcare standards.",
      url: "https://carebridge.education/programs/bsc-nursing/",
      tag: "Fast-Track Visa",
      icon: FaUserMd,
    },
    {
      title: "Special & Inclusive Education (ISITEP)",
      duration: "4 Years Integrated Program",
      desc: "Empowering educators with RCI-approved neurodiversity, assistive tech, and learning disability skills.",
      url: "https://carebridge.education/programs/special-inclusive-education/",
      tag: "RCI Approved",
      icon: FaGraduationCap,
    },
    {
      title: "Audiology & Speech-Language Pathology (BASLP)",
      duration: "4 Years Comprehensive Degree",
      desc: "Diagnostics for hearing impairment, pediatric speech therapy, and clinical cochlear rehab protocols.",
      url: "https://carebridge.education/programs/audiology-speech-language-pathology/",
      tag: "Specialized Clinic Access",
      icon: FaClinicMedical,
    },
    {
      title: "Bachelor in Clinical Psychology",
      duration: "4 Years Honors Degree",
      desc: "Behavioral science, psychometric evaluation, psychotherapy assistance, and mental healthcare delivery.",
      url: "https://carebridge.education/programs/bachelor-clinical-psychology/",
      tag: "Growing Global Need",
      icon: FaHeartbeat,
    },
    {
      title: "Medical Radiology & Imaging Technology (BMRIT)",
      duration: "3 + 1 Years Clinical Practice",
      desc: "MRI, CT-Scan, Ultrasonography, and diagnostic radiography training inside our on-campus imaging unit.",
      url: "https://carebridge.education/programs/medical-radiology-imaging-technology/",
      tag: "Hospital Lab Integrated",
      icon: FaLaptopMedical,
    },
    {
      title: "Medical Laboratory Sciences (BMLS)",
      duration: "3 + 1 Years Clinical Practice",
      desc: "Clinical biochemistry, molecular diagnostics, pathology analysis, and automated laboratory operation.",
      url: "https://carebridge.education/programs/medical-laboratory-sciences/",
      tag: "Automated Diagnostic Suites",
      icon: FaCertificate,
    },
    {
      title: "Emergency Medical Technology (EMT)",
      duration: "3 + 1 Years Clinical Practice",
      desc: "Trauma response, critical care triage, intensive care stabilization, and advanced life support paramedic protocols.",
      url: "https://carebridge.education/programs/emergency-medical-technology/",
      tag: "Critical Care Rotations",
      icon: FaHospital,
    },
    {
      title: "Dialysis Technology",
      duration: "3 + 1 Years Clinical Practice",
      desc: "Renal replacement therapy, hemodialysis equipment calibration, peritoneal dialysis, and nephrology care.",
      url: "https://carebridge.education/programs.html",
      tag: "Specialist Nephro Suites",
      icon: FaClinicMedical,
    },
    {
      title: "Operation Theatre & Anesthesia Technology",
      duration: "3 + 1 Years Clinical Practice",
      desc: "Surgical theater management, anesthetic apparatus handling, sterilization, and perioperative assistance.",
      url: "https://carebridge.education/programs.html",
      tag: "Live Surgical Suites",
      icon: FaHospital,
    },
    {
      title: "Cardiac Care & Perfusion Technology",
      duration: "3 + 1 Years Clinical Practice",
      desc: "Heart-lung machine management, cardiovascular diagnostics, echocardiography, and catheterization lab support.",
      url: "https://carebridge.education/programs.html",
      tag: "High Acuity Care",
      icon: FaHeartbeat,
    },
  ];

  const readinessTracks = [
    {
      number: "01",
      title: "International Licensing Readiness",
      desc: "Country-specific credential evaluation, documentation, licensing exams (UK NMC/HCPC, Australia AHPRA, Gulf DHA/DOH/MOH, USA/Canada Boards) built directly into semester studies.",
      linkText: "View Licensing Exam Modules on Carebridge",
      linkUrl: "https://carebridge.education/pathway.html#career-readiness",
    },
    {
      number: "02",
      title: "Digital-Health Readiness",
      desc: "Hands-on mastery of Electronic Health Records (EHR), clinical documentation standards, telemedicine protocols, remote vitals monitoring, and ethical clinical AI.",
      linkText: "Explore Digital Health Training",
      linkUrl: "https://carebridge.education/pathway.html#career-readiness",
    },
    {
      number: "03",
      title: "Destination-Specific Preparation",
      desc: "Deep immersion into target countries' healthcare policies, patient safety mandates, clinical ethics, and legal scopes of practice before graduating.",
      linkText: "See Destination Roadmaps",
      linkUrl: "https://carebridge.education/pathway.html",
    },
    {
      number: "04",
      title: "Language & Clinical Communication",
      desc: "Comprehensive OET (Occupational English Test) and IELTS coaching integrated with simulated doctor-patient dialogues and foreign healthcare workplace etiquette.",
      linkText: "Check Language Support Details",
      linkUrl: "https://carebridge.education/pathway.html#career-readiness",
    },
    {
      number: "05",
      title: "Career-Ready Stacked Certifications",
      desc: "American Heart Association (AHA) aligned Basic Life Support (BLS), Advanced CPR, Emergency Triage, Infection Control, and Clinical Research Certifications.",
      linkText: "View Stacked Certifications",
      linkUrl: "https://carebridge.education/pathway.html#pillars",
    },
  ];

  const fourDoors = [
    {
      door: "1",
      title: "Get Placed in India",
      highlight: "100% Placement Assistance",
      desc: "Career services, CV building workshops, mock technical interviews, and on-campus recruitment drives connecting students to premier hospitals across India.",
      actionText: "Learn about Placement Support",
      actionUrl: "https://carebridge.education/pathway.html",
    },
    {
      door: "2",
      title: "Build Your Own Practice",
      highlight: "Clinical Entrepreneurship",
      desc: "Full guidance on clinic establishment, therapy equipment budgeting, compliance with statutory councils, and healthcare management practice where permitted.",
      actionText: "Explore Practice Setup Guidance",
      actionUrl: "https://carebridge.education/pathway.html",
    },
    {
      door: "3",
      title: "Go Global Overseas",
      highlight: "International Recruitment & Visas",
      desc: "Complete overseas pathways with foreign-hospital virtual interview circuits, credential evaluation (WES/DataFlow), visa filing, and relocation assistance.",
      actionText: "Discover Global Relocation Assistance",
      actionUrl: "https://carebridge.education/pathway.html",
    },
    {
      door: "4",
      title: "Grow Professionally",
      highlight: "Higher Education & Research",
      desc: "Structured guidance toward Master's (MPT, MOT, M.Sc, MPH) degrees, clinical specializations, scientific publishing, and global healthcare fellowship admissions.",
      actionText: "Read Higher Study Roadmaps",
      actionUrl: "https://carebridge.education/pathway.html",
    },
  ];

  const salaryData = [
    {
      role: "B.Sc Nursing",
      india: "₹3 – ₹5 Lakh / yr",
      abroad: "UK: ₹28–35 L | Gulf: ₹15–30 L (Tax-Free) | Australia: ₹40 L+",
      detailLink: "https://carebridge.education/programs/bsc-nursing/",
    },
    {
      role: "Physiotherapy (BPT)",
      india: "₹3 – ₹6 Lakh / yr",
      abroad: "Australia · UK · Gulf: ₹30 – ₹55 Lakh / yr",
      detailLink: "https://carebridge.education/programs/bachelor-of-physiotherapy/",
    },
    {
      role: "Occupational Therapy (BOT)",
      india: "₹3 – ₹6 Lakh / yr",
      abroad: "Australia · UK · Canada: ₹30 – ₹50 Lakh / yr",
      detailLink: "https://carebridge.education/programs/bachelor-of-occupational-therapy/",
    },
    {
      role: "Radiology & Imaging (BMRIT)",
      india: "₹3 – ₹5 Lakh / yr",
      abroad: "Canada · UK · Gulf: ₹20 – ₹45 Lakh / yr",
      detailLink: "https://carebridge.education/programs/medical-radiology-imaging-technology/",
    },
    {
      role: "Medical Lab Sciences (BMLS)",
      india: "₹2.5 – ₹5 Lakh / yr",
      abroad: "Canada · UK · Gulf: ₹18 – ₹40 Lakh / yr",
      detailLink: "https://carebridge.education/programs/medical-laboratory-sciences/",
    },
    {
      role: "Special Education (ISITEP)",
      india: "₹3 – ₹5 Lakh / yr",
      abroad: "International Schools & NHS Clinics: ₹20 – ₹40 Lakh / yr",
      detailLink: "https://carebridge.education/programs/special-inclusive-education/",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Banner Notice */}
      <aside aria-label="Admissions alert" className="bg-[#04163f] text-white py-2.5 px-4 text-xs md:text-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-400">Admissions 2026-27:</span>
            <span>Limited Global Healthcare Pathway Intake at St. Mary&apos;s University</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+914045307444"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-amber-400 transition-colors font-medium"
            >
              <FaPhoneAlt className="text-xs text-amber-400" />
              <span>24×7 Admissions Helpline: 040 45307444</span>
            </a>
            <a
              href="https://carebridge.education/admissions.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded transition-colors"
            >
              Apply via Carebridge <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>
        </div>
      </aside>

      {/* ================= HERO / LANDING SECTION ================= */}
      <section className="relative bg-gradient-to-br from-[#04163f] via-[#0d315c] to-[#082245] text-white pt-12 pb-20 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs font-medium text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/partner" className="hover:text-amber-400 transition-colors">Industry Partners</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Carebridge Global Healthcare</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
                <FaGlobeAmericas className="text-emerald-400" />
                <span>India&apos;s Flagship Healthcare Mobility Pathway</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Healthcare degrees.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 italic">
                  Global career pathways.
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Carebridge connects accredited university healthcare degrees, live inpatient clinical exposure from Year 1, and international licensing readiness on St. Mary&apos;s University&apos;s 120-acre medical campus for students building careers in India and across the world.
              </p>

              {/* Destination Pills */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Target Markets:</span>
                {["United Kingdom (NHS)", "Australia (AHPRA)", "Gulf / Middle East (DHA/DOH)", "Canada", "USA", "India"].map((dest) => (
                  <span
                    key={dest}
                    className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-md bg-white/10 text-slate-200 border border-white/10"
                  >
                    {dest}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://carebridge.education"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Visit Official Carebridge Portal</span>
                  <FaExternalLinkAlt className="text-xs" />
                </a>

                <a
                  href="https://carebridge.education/pathway.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all"
                >
                  <span>Explore 3-Step Pathway</span>
                  <FaArrowRight className="text-xs text-amber-400" />
                </a>
              </div>

              {/* Statutory Badges */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <span>Govt. of Telangana Gazette No. 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <span>UGC Section 2(f) Aligned</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <span>NCAHP &amp; RCI Approved Programs</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xl">
                      CB
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-base">Carebridge Ecosystem</h2>
                      <p className="text-xs text-emerald-300 font-medium">St. Mary&apos;s University Campus</p>
                    </div>
                  </div>
                  <a
                    href="https://carebridge.education/about.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                  >
                    About Carebridge <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">120</span>
                    <span className="text-xs text-slate-300 font-medium">Acres Integrated Campus in Hyderabad</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400">14+</span>
                    <span className="text-xs text-slate-300 font-medium">Specialized Rehab Clinics &amp; Labs</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">100%</span>
                    <span className="text-xs text-slate-300 font-medium">Live Patient Rotations from Year 1</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400">5–8×</span>
                    <span className="text-xs text-slate-300 font-medium">Average Starting Salary Uplift Abroad</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-xs text-slate-200">
                  <strong className="text-emerald-300 block mb-1">WHO Global Shortage Alert:</strong>
                  Over 11 million healthcare workers needed worldwide by 2030. Preparation for international licensing begins on Day 1.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE 3 PILLARS: EDUCATE. CERTIFY. DEPLOY. ================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              How Carebridge Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d315c] tracking-tight">
              Educate. Certify. <span className="text-amber-500">Deploy.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Carebridge replaces fragmented post-college training with an unbroken 3-pillar pipeline where academic mastery, licensing exams, and overseas career launch are woven together.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 01 */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors">01</span>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                  <FaHospital />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0d315c] mb-3">Educate from Day 1</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                International-standard pedagogy inside St. Mary&apos;s 120-acre clinical campus. Students practice on simulation manikins, clinical documentation systems, and live hospital ward rounds starting from the very first semester.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href="https://carebridge.education/pathway.html#pillars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Explore Academic Curriculum</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-slate-300 group-hover:text-amber-500 transition-colors">02</span>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl">
                  <FaCertificate />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0d315c] mb-3">Certify Across the Degree</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                OET &amp; IELTS language mastery, digital health training, and Prometric/CBT licensing exam preparation are integrated into university credits — eliminating the need for expensive private coaching after graduation.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href="https://carebridge.education/pathway.html#career-readiness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>View Certifications Roadmap</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">03</span>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl">
                  <FaPlaneDeparture />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0d315c] mb-3">Deploy with Legal Care</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                Foreign healthcare employer interviews, credential verification (DataFlow, WES), visa sponsorship filings, and post-arrival accommodation assistance managed via legally licensed international recruitment pathways.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href="https://carebridge.education/pathway.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
                >
                  <span>See Global Deployment Routes</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 12 PROFESSIONS THE WORLD CANNOT HIRE ENOUGH OF ================= */}
      <section className="py-16 md:py-24 bg-[#f8fbff]" id="programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                Flagship Degree Offerings
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d315c] tracking-tight">
                12 Professions the World <span className="text-amber-500">Cannot Hire Enough Of.</span>
              </h2>
              <p className="mt-3 text-slate-600 text-base max-w-2xl">
                Every degree offered under the Carebridge banner at St. Mary&apos;s University targets verifiable healthcare workforce shortages in India and abroad.
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://carebridge.education/programs.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0d315c] hover:bg-[#082245] text-white font-bold text-sm transition-all shadow-md"
              >
                <span>View All 12 Programs on Carebridge</span>
                <FaExternalLinkAlt className="text-xs text-amber-400" />
              </a>
            </div>
          </div>

          {/* Program Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, index) => {
              const Icon = prog.icon;
              return (
                <article
                  key={prog.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-extrabold text-slate-400">0{index + 1}</span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {prog.tag}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-[#0d315c]/5 text-[#0d315c] text-lg mt-0.5">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0d315c] leading-snug">{prog.title}</h3>
                        <p className="text-xs font-semibold text-amber-600 mt-0.5">{prog.duration}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">{prog.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={prog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group"
                    >
                      <span>Carebridge Curriculum</span>
                      <FaExternalLinkAlt className="text-[10px] transform group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <a
                      href="https://carebridge.education/admissions.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-500 hover:text-[#0d315c]"
                    >
                      Eligibility →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SKILLS FOR THE PROFESSION. PREPARATION FOR THE DESTINATION. ================= */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200" id="readiness">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
              The 5 Parallel Readiness Tracks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d315c] tracking-tight">
              Skills for the Profession.{" "}
              <span className="text-amber-500">Preparation for the Destination.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              These five tracks run alongside university semester lectures, ensuring students master the clinical protocols, statutory documentation, and communications demanded by foreign healthcare systems.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {readinessTracks.map((track) => (
              <div
                key={track.number}
                className="bg-slate-50 hover:bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0d315c] text-white flex items-center justify-center font-bold text-sm">
                    {track.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#0d315c]">{track.title}</h3>
                    <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">{track.desc}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={track.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-xs font-bold text-emerald-800 hover:text-emerald-900 shadow-sm transition-all"
                  >
                    <span>{track.linkText}</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= YOUR CAREER. YOUR CHOICE. OUR SUPPORT. ================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8fbff] to-white" id="careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              Career &amp; Placement Assurance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d315c] tracking-tight">
              Your Career. Your Choice. <span className="text-amber-500">Our Support.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Students graduate with multiple credible, fully supported career destinations. No student is pushed into a single forced outcome. Four distinct doors remain permanently open.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourDoors.map((door) => (
              <div
                key={door.door}
                className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Door 0{door.door}</span>
                    <span className="inline-block px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-bold text-[11px] border border-amber-200">
                      {door.highlight}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0d315c] mb-3">{door.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{door.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={door.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    <span>{door.actionText}</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SALARY ECONOMICS TABLE ================= */}
      <section className="py-16 md:py-24 bg-[#04163f] text-white" id="salaries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                Global Healthcare Economics
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Do the Maths Once.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 italic">
                  It Never Stops Making Sense.
                </span>
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
                The exact same clinical competence commands dramatically different value across international borders. Here is an indicative entry-level compensation comparison converted to INR:
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://carebridge.education/pathway.html#salary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all"
              >
                <span>View Full Salary Analysis on Carebridge</span>
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="bg-white/10 text-xs uppercase font-extrabold tracking-wider text-amber-300 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">Profession</th>
                  <th scope="col" className="px-6 py-4">Starting in India</th>
                  <th scope="col" className="px-6 py-4">Typical Entry Abroad (UK · Gulf · Aus · Canada)</th>
                  <th scope="col" className="px-6 py-4 text-right">Carebridge Program</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                {salaryData.map((row) => (
                  <tr key={row.role} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{row.role}</td>
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap">{row.india}</td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">{row.abroad}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <a
                        href={row.detailLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
                      >
                        <span>Curriculum</span>
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400 text-center">
            *Indicative compensation figures based on standard NHS Band 5, Australian AHPRA Grade 1, and UAE MOH clinical licensing pay scales. Figures reflect gross compensation before destination taxes.
          </p>
        </div>
      </section>

      {/* ================= ON-CAMPUS CLINICAL ADVANTAGE ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                Integrated Campus Advantage
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d315c] tracking-tight">
                Not Near Hospitals. <span className="text-emerald-600">Inside Them.</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Carebridge programs at St. Mary&apos;s University are delivered on a sprawling 120-acre lush green campus near Ramoji Film City Road, Hyderabad. The campus integrates active multi-speciality rehabilitation hospital wards, pediatric therapy units, audio-vestibular suites, and simulation laboratories in a single contiguous environment.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <strong className="block text-xl font-bold text-[#0d315c]">120 Acres</strong>
                  <span className="text-xs text-slate-500">Green Valley Medical Campus</span>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <strong className="block text-xl font-bold text-[#0d315c]">0 Kilometers</strong>
                  <span className="text-xs text-slate-500">Inpatient Hospital on Campus</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://carebridge.education/campus.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0d315c] hover:bg-[#082245] text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Explore 120-Acre Campus Facilities</span>
                  <FaExternalLinkAlt className="text-xs text-amber-400" />
                </a>
                <a
                  href="https://carebridge.education/contact.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
                >
                  <span>Book Campus Tour</span>
                  <FaArrowRight className="text-xs text-slate-500" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
                <div className="relative h-96 w-full bg-slate-800">
                  {/* Drone Campus Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/campus-drone.webp"
                    alt="120-Acre St. Mary's Rehabilitation University Campus Aerial View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-block px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs mb-2">
                      Hyderabad Integrated Campus
                    </span>
                    <h4 className="text-lg font-bold">St. Mary&apos;s University &amp; Carebridge</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Academic blocks, inpatient wards, specialized clinics, and modern student residences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA & HELPLINE BANNER ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#04163f] via-[#0d315c] to-[#04163f] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
              Admissions 2026-27 Intake Open
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Begin Your Global Healthcare Journey at St. Mary&apos;s University.
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Take the first step toward high-demand healthcare careers with early clinical exposure, OET/IELTS coaching, and guaranteed licensing exam support.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://carebridge.education/admissions.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Apply via Carebridge Portal</span>
                <FaExternalLinkAlt className="text-xs" />
              </a>

              <a
                href="tel:+914045307444"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all"
              >
                <FaPhoneAlt className="text-amber-400" />
                <span>Call Admissions: 040 45307444</span>
              </a>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <a
                href="https://carebridge.education/pathway.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 underline underline-offset-4"
              >
                Carebridge Pathway Guide
              </a>
              <span>·</span>
              <a
                href="https://carebridge.education/programs.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 underline underline-offset-4"
              >
                12 Degree Programs
              </a>
              <span>·</span>
              <a
                href="https://carebridge.education/campus.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 underline underline-offset-4"
              >
                Campus Facilities
              </a>
              <span>·</span>
              <a
                href="https://carebridge.education/contact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 underline underline-offset-4"
              >
                Contact &amp; Tours
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
