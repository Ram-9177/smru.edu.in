// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import {
  FaGraduationCap, FaFlask, FaCalendarAlt, FaClipboardCheck,
  FaArrowRight, FaUsers, FaLightbulb, FaBookOpen, FaHospital,
  FaMicroscope, FaLaptopCode, FaBrain, FaAward,
  FaChalkboardTeacher, FaStethoscope, FaChartBar, FaGlobeAmericas,
  FaShieldAlt, FaLeaf, FaWheelchair, FaDumbbell, FaEnvelope, FaRupeeSign,
  FaHandshake, FaGlobe, FaUserGraduate, FaChevronDown, FaCheckCircle,
  FaClock, FaMapMarkerAlt, FaBriefcase, FaPaperPlane, FaBuilding, FaUniversalAccess, FaFileDownload
} from "react-icons/fa";
import abstractHeroBg from "../assets/abstract-hero-bg.webp";
const campusVideo = "/assets/campus_video_fallback.mp4";
import { resolveAssetSrc } from "@/lib/shared/media";
import {
  ADMISSIONS_CONTENT_LAST_UPDATED,
  PHD_ADMISSIONS_STATUS_MESSAGE,
} from "@/lib/shared/site-constants";
import TrustBand from "../components/TrustBand";
import { FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { PHD_FAQS } from "@/lib/seo/static-page-faqs";
import { LOCATION_LINKS, RESEARCH_LINKS, TRUST_LINKS } from "@/lib/seo/info-pages";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const PhdAdmission = () => {
  const addendumDownloadHref = "/assets/SMRU_PhD_Addendum_Formatted.docx";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: "120-Acre", label: "Purpose-Built Campus" },
    { value: "30", label: "Years of Institutional Legacy" },
    { value: "21", label: "Disabilities Addressed" },
    { value: "100-Bed", label: "Medical Rehab Hospital" },
    { value: "50-Bed", label: "Mental Health Hospital" }
  ];

  const promise = [
    { title: "Structured Supervision", desc: "Every scholar is matched with a research supervisor aligned to their area of inquiry. Supervision at Stmarys University follows a structured mentoring framework with regular progress reviews." },
    { title: "Coursework That Sharpens Research Capability", desc: "Doctoral coursework is not a formality. It builds research methodology competence, domain depth, statistical rigour, and publication readiness." },
    { title: "Interdisciplinary Research Culture", desc: "The university’s architecture naturally creates opportunities for scholars across rehabilitation, engineering, psychology, nursing, and management to collaborate." },
    { title: "Publication & Conference Support", desc: "Stmarys University encourages scholars to publish in indexed journals and present at national and international conferences. We provide guidance on ethics and manuscript development." },
    { title: "A Community, Not Just a Programme", desc: "From seminar series and research colloquia to informal mentorship, Stmarys University's scholars become part of a vibrant research community." }
  ];

  const domains = [
    { name: "School of Rehabilitation Sciences", items: ["Audiology", "Speech & Hearing Sciences", "Communication Sciences & Disorders", "Special Education", "Inclusive Education", "Education (Disability Studies)", "Autism Spectrum Disorders"] },
    { name: "School of Health & Allied Health Sciences", items: ["Physiotherapy", "Occupational Therapy"] },
    { name: "School of Psychology", items: ["Clinical Psychology", "Rehabilitation Psychology", "Applied / Health Psychology"] },
    { name: "School of Engineering & Emerging Technologies", items: ["Computer Science & Engineering", "Artificial Intelligence & Machine Learning", "AI & Data Science", "Biomedical Engineering", "Integrated M.Tech + Ph.D. (CSE / AI & ML / AI & DS)"] },
    { name: "School of Nursing", items: ["Nursing Sciences"] },
    { name: "School of Management & Computer Applications", items: ["Data Science / Computer Applications", "Management / Business Administration"] },
    { name: "School of Applied Sciences & Design", items: ["Forensic Science", "Public Health"] }
  ];

  const labs = [
    {
      category: "Core Research Facilities",
      items: ["Biostatistics & Data Analytics Lab", "Clinical Research & Evidence-Based Practice Lab", "Health Informatics & AI Lab"]
    },
    {
      category: "Physiotherapy & Rehabilitation Labs",
      items: ["Biomechanics & Motion Analysis Lab", "Neuro-Rehabilitation Lab", "Cardio-Pulmonary Rehab Lab", "Exercise Physiology Lab", "Electrotherapy & Pain Research Lab"]
    },
    {
      category: "Occupational Therapy Labs",
      items: ["ADL (Activities of Daily Living) Lab", "Sensory Integration Lab", "Cognitive Rehabilitation Lab", "Pediatric & Geriatric Therapy Lab", "Assistive Technology & Ergonomics Lab"]
    },
    {
      category: "Clinical & Rehabilitation Psychology Labs",
      items: ["Psychological Assessment Lab", "Neuropsychology Lab", "Mental Health & Psychopathology Lab", "Counseling & Psychotherapy Lab", "Digital Mental Health Lab"]
    },
    {
      category: "Applied Psychology & Behavioral Health",
      items: ["Cognitive & Behavioral Science Lab", "Social & Community Psychology Lab", "Stress, Addiction & Wellness Lab"]
    },
    {
      category: "Special & Inclusive Education Labs",
      items: ["Autism Spectrum Disorder (ASD) Lab", "Inclusive Education Innovation Lab"]
    },
    {
      category: "Nursing Sciences Labs",
      items: ["Clinical Nursing Simulation Lab", "Advanced Nursing Research Unit"]
    },
    {
      category: "Speech & Hearing Labs",
      items: ["Audiology & Hearing Assessment Lab", "Speech-Language Pathology Lab", "Acoustics & Voice Lab", "Assistive Hearing Technology Lab", "Communication Disorders Lab"]
    },
    {
      category: "Advanced Research & Innovation Labs",
      items: ["Rehabilitation Robotics Lab", "Virtual Reality (VR) Therapy Lab"]
    },
    {
      category: "Clinical & Field Research Support",
      items: ["Teaching Hospital & Rehab Centers", "Special Schools & Inclusive Education Units", "Mental Health Clinics", "Community & Rural Health Research Centers"]
    }
  ];

  const feeStructure = [
    { category: "Rehabilitation, Health & Allied Health Sciences", fee: "Official Request" },
    { category: "Engineering & Emerging Technologies", fee: "Official Request" },
    { category: "Business Administration & Management Studies", fee: "Official Request" },
    { category: "Nursing Sciences", fee: "Official Request" },
    { category: "Psychology", fee: "Official Request" },
    { category: "Applied Sciences (Forensic, Public Health)", fee: "Official Request" }
  ];

  const applySteps = [
    { title: "Confirm Application Fee", desc: "Confirm the current application fee through the official admissions/research office before payment." },
    { title: "Complete Online Application", desc: "Fill in academic, professional, and research interest details at apply.smru.edu.in." },
    { title: "Upload Required Documents", desc: "Certificates (SSC, UG, PG), proof of UGC-NET/GATE/SLET/M.Phil, and 5% exemption proof." },
    { title: "Appear for Entrance Examination", desc: "Qualify in the Stmarys University Ph.D. entrance examination (Exempted for JRF/GATE)." },
    { title: "Attend Personal Interview", desc: "Present your research proposal and academic background to the selection committee." },
    { title: "Receive Admission Decision", desc: "Final selection based on credentials, proposal, and interview." }
  ];

  return (
    <div className="bg-white font-outfit text-[#0d315c] selection:bg-[#019e6e]/10">

      {/* -------------------------------------------------------------------
          DOCTORAL ADMISSIONS HERO
          ------------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-[#071a32]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            preload="none"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-[58%_center]"
          >
            <source src={campusVideo} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,22,43,0.98)_0%,rgba(8,35,66,0.94)_38%,rgba(8,35,66,0.72)_66%,rgba(5,22,43,0.58)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,26,50,0.18)_0%,rgba(7,26,50,0.18)_55%,rgba(7,26,50,0.86)_100%)]" />
        <div
          className="absolute inset-0 z-10 opacity-[0.035]"
          style={{ backgroundImage: `url(${resolveAssetSrc(abstractHeroBg)})`, backgroundSize: "360px" }}
        />

        <div className="smru-container relative z-20 py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="grid items-center gap-10 lg:min-h-[670px] lg:grid-cols-[minmax(0,1fr)_minmax(360px,470px)] lg:gap-14 xl:gap-20">
            <div className="animate-fade-in-up">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#61dbb4] sm:text-xs">
                Admissions 2026–27
              </p>
              <h1 className="mt-5 max-w-3xl font-outfit text-[clamp(3.25rem,9vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white">
                Doctoral
                <span className="block text-[#ffaf3a]">Programme</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-xl sm:leading-8 lg:text-2xl lg:leading-9">
                Advance knowledge. Shape healthcare. Build the future of rehabilitation, inclusion, and human-centred innovation.
              </p>

              <dl className="mt-10 grid grid-cols-3 border-y border-white/15 bg-white/[0.045] backdrop-blur-sm">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="min-w-0 border-r border-white/15 px-3 py-5 last:border-r-0 sm:px-5 sm:py-6">
                    <dt className="text-[8px] font-black uppercase leading-3 tracking-[0.12em] text-white/55 sm:text-[10px] sm:leading-4">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 text-xl font-black leading-none tracking-tight text-[#61dbb4] sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="relative">
              <div className="cut-corner-panel absolute -inset-3 -z-10 border border-white/10 bg-white/[0.055] backdrop-blur-sm" />
              <div className="cut-corner-panel bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0d315c]">
                    Admissions Status
                  </p>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffaf3a] shadow-[0_0_0_5px_rgba(255,175,58,0.15)]" />
                </div>
                <h2 className="mt-6 text-xl font-black leading-[1.18] tracking-[-0.025em] text-[#0d315c] sm:text-3xl">
                  {PHD_ADMISSIONS_STATUS_MESSAGE}
                </h2>
                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Last updated: {ADMISSIONS_CONTENT_LAST_UPDATED}
                </p>

                <div className="mt-8 grid gap-3">
                  <a
                    href="/assets/Notice_Revised_Schedule_PhD_Admissions_2026_27.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center gap-3 bg-[#0d315c] px-5 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#019e6e]"
                  >
                    Download Notification <FaFileDownload />
                  </a>
                  <a
                    href={addendumDownloadHref}
                    download="SMRU_PhD_Addendum_Formatted.docx"
                    className="flex min-h-12 items-center justify-center gap-3 bg-[#ffaf3a] px-5 text-[10px] font-black uppercase tracking-[0.16em] text-[#0d315c] transition-colors hover:bg-[#019e6e] hover:text-white"
                  >
                    Download Addendum <FaFileDownload />
                  </a>
                  <a
                    href="/contact"
                    className="flex min-h-12 items-center justify-center gap-3 border border-slate-200 px-5 text-[10px] font-black uppercase tracking-[0.16em] text-[#0d315c] transition-colors hover:border-[#019e6e] hover:text-[#019e6e]"
                  >
                    Next Cycle Updates <FaEnvelope />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          NEW SECTION: CRITICAL DATES & NOTIFICATIONS
          ------------------------------------------------------------------- */}
      <section className="relative z-30 -mt-10 md:-mt-20">
         <div className="smru-container">

            {/* Dates Banner (Matching Reference Image) */}
            <div className="flex flex-col md:flex-row cut-corner-panel overflow-hidden shadow-2xl">
               <div className="md:w-1/2 bg-[#1b437c] p-10 md:p-14 flex items-center gap-8">
                  <div className="w-20 h-20 bg-white/10 cut-corner-badge flex items-center justify-center">
                     <FaCalendarAlt size={32} className="text-[#ffaf3a]" />
                  </div>
                  <div className="text-white">
                     <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50 mb-2">Cycle Status</p>
                     <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tighter">
                        Application <span className="text-[#ffaf3a]">End <br className="hidden md:block" /> Date</span>
                     </h3>
                     <p className="mt-4 text-xl font-bold italic text-[#ffaf3a]">CYCLE COMPLETE</p>
                  </div>
               </div>
               <div className="md:w-1/2 bg-white p-10 md:p-14 flex items-center gap-8 border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="w-20 h-20 bg-[#f8faff] cut-corner-badge flex items-center justify-center">
                     <FaClipboardCheck size={32} className="text-[#019e6e]" />
                  </div>
                  <div className="text-[#0d315c]">
                     <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Selection Process</p>
                     <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tighter">
                        Entrance <span className="text-[#019e6e]">Test Date</span>
                     </h3>
                     <p className="mt-4 text-xl font-bold italic text-[#019e6e]">CYCLE COMPLETE</p>
                  </div>
               </div>
            </div>

            {/* Notification Cards (Matching Reference Image) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

               {/* Card 1: Admission Notification */}
               <div className="bg-white p-12 cut-corner-panel shadow-xl border border-gray-50 h-full flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 bg-[#f8faff] cut-corner-badge flex items-center justify-center shadow-inner mb-10">
                     <FaBookOpen className="text-[#019e6e]" size={24} />
                  </div>
                  <h4 className="text-2xl font-black text-[#0d315c] uppercase tracking-tighter mb-2">Admission Notification</h4>
                  <p className="text-[10px] font-black text-[#019e6e] uppercase tracking-[0.3em] mb-8">CYCLE COMPLETE</p>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-12 max-w-sm flex-1">
                     Download the primary document detailing doctoral program structures, eligibility criteria, and clinical domain specific guidelines.
                  </p>
                  <a
                    href="/assets/Notice_Revised_Schedule_PhD_Admissions_2026_27.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full bg-[#0d315c] hover:bg-[#019e6e] text-white py-5 cut-corner-badge font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl"
                  >
                     Download Notification <FaArrowRight size={14} />
                  </a>
               </div>

               {/* Card 2: Addendum/Extension */}
               <div className="bg-[#fffcf7] p-12 cut-corner-panel shadow-xl border border-[#ffaf3a]/10 h-full flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 bg-white cut-corner-badge flex items-center justify-center shadow-lg mb-10">
                     <FaLightbulb className="text-[#ffaf3a]" size={24} />
                  </div>
                  <h4 className="text-2xl font-black text-[#0d315c] uppercase tracking-tighter mb-2">Addendum / Extension</h4>
                  <p className="text-[10px] font-black text-[#019e6e] uppercase tracking-[0.3em] mb-8">CYCLE COMPLETE</p>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-12 max-w-sm flex-1">
                     Essential extension notification regarding the revised timeline for doctoral registrations and doctoral entrance test (DET).
                  </p>
                  <a
                     href={addendumDownloadHref}
                     download="SMRU_PhD_Addendum_Formatted.docx"
                     className="mt-auto w-full bg-[#ffaf3a] hover:bg-[#0d315c] hover:text-white text-[#0d315c] py-5 cut-corner-badge font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl"
                  >
                     Download Addendum <FaArrowRight size={14} />
                  </a>
               </div>

            </div>
         </div>
      </section>

      {/* -------------------------------------------------------------------
          SUB NAVIGATION (Green Ribbon)
          ------------------------------------------------------------------- */}
      <nav className="sticky top-20 z-50 bg-[#019e6e] border-y border-[#019e6e]/20 py-5 hidden md:block shadow-xl">
         <div className="smru-container flex justify-center gap-14 text-[11px] font-black uppercase tracking-[0.3em] overflow-x-auto no-scrollbar">
            {[
              { label: "Vision", id: "vision" },
              { label: "Promise", id: "promise" },
              { label: "Domains", id: "domains" },
              { label: "Eligibility", id: "eligibility" },
              { label: "Fees", id: "fees" },
              { label: "Apply", id: "apply" }
            ].map((item) => (
               <a key={item.label} href={`#${item.id}`} className="text-white hover:text-[#ffaf3a] transition-all transform hover:scale-105 whitespace-nowrap">{item.label}</a>
            ))}
         </div>
      </nav>

      {/* -------------------------------------------------------------------
          VISION & WHY Stmarys University (Textured Background)
          ------------------------------------------------------------------- */}
      <section id="vision" className="smru-section bg-[#f8faff] relative overflow-hidden scroll-mt-40">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
         <div className="smru-container relative z-10">
            <div className="flex flex-col lg:flex-row gap-24 items-start">
               <div className="lg:w-1/3">
                  <h2 className="text-4xl font-extrabold tracking-tighter text-[#0d315c] leading-tight uppercase">
                     Why Pursue Your <br />Doctorate at Stmarys University
                  </h2>
                  <div className="w-16 h-1 mt-6 bg-[#ffaf3a]" />
               </div>
               <div className="lg:w-2/3 space-y-10 text-[18px] text-gray-500 font-medium leading-relaxed">
                  <p>
                     India’s rehabilitation, allied health, and inclusive-care sectors face a critical shortage of research leaders. Stmarys University’s doctoral programme exists to develop exactly these professionals within a rehabilitation-focused academic ecosystem.
                  </p>
                  <p className="border-l-4 border-[#ffaf3a] pl-8 italic text-gray-400">
                     "Your doctoral research here is not just academic — it is part of a national capacity-building mission."
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* -------------------------------------------------------------------
          THE Stmarys University EDGE (Refined Cards)
          ------------------------------------------------------------------- */}
      <section id="promise" className="smru-section bg-white scroll-mt-40">
         <div className="smru-container">
            <div className="text-center mb-20 space-y-4">
               <h3 className="text-4xl md:text-5xl font-black text-[#0d315c] uppercase tracking-tighter">The Stmarys University <span className="text-[#ffaf3a]">Edge</span></h3>
               <div className="w-24 h-[2px] bg-[#ffaf3a] mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {promise.map((p, i) => (
                  <div key={i} className="group relative p-10 bg-white cut-corner-panel border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                     <div className="absolute top-6 right-8 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
                        <FaAward size={40} className="text-[#0d315c]" />
                     </div>
                     <h4 className="text-lg font-black text-[#0d315c] leading-tight mb-4 uppercase tracking-tight">{p.title}</h4>
                     <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{p.desc}</p>
                     <div className="mt-6 w-10 h-1 bg-[#019e6e] cut-corner-badge group-hover:w-20 transition-all duration-500" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* -------------------------------------------------------------------
          RESEARCH LABS (Matching Grid Layout)
          ------------------------------------------------------------------- */}
      <section className="smru-section bg-[#f8faff] scroll-mt-40">
         <div className="smru-container">
            <div className="flex flex-col items-center text-center mb-20 gap-4">
               <h3 className="text-4xl md:text-6xl font-black text-[#0d315c] uppercase tracking-tighter">Research <span className="text-[#ffaf3a]">Labs</span></h3>
               <div className="w-32 h-[3px] bg-[#ffaf3a]" />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mt-4">Advanced specialized facilities for doctoral enquiry</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {labs.map((row, i) => (
                  <div key={i} className="bg-white p-8 cut-corner-panel shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col group">
                     <div className="mb-6 flex justify-between items-start">
                        <h4 className="text-[12px] font-black text-[#0d315c] uppercase tracking-tight leading-tight group-hover:text-[#ffaf3a] transition-colors">{row.category}</h4>
                        <FaFlask className="text-[#019e6e]/20 group-hover:text-[#019e6e] transition-colors" size={16} />
                     </div>
                     <ul className="space-y-3 mt-auto">
                        {row.items.map((item, idx) => (
                           <li key={idx} className="flex items-start gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 cut-corner-badge bg-[#019e6e] mt-1 shrink-0" />
                              <span className="leading-snug">{item}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* -------------------------------------------------------------------
          DOCTORAL RESEARCH DOMAINS (Institutional Row Layout)
          ------------------------------------------------------------------- */}
      <section id="domains" className="smru-section bg-[#0d315c] text-white relative overflow-hidden scroll-mt-40">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0d315c_70%)] z-0" />
         <div className="smru-container relative z-10">
            <div className="text-center mb-20">
               <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">DOCTORAL RESEARCH <span className="text-[#019e6e]">DOMAINS</span></h3>
               <div className="w-32 h-[3px] bg-[#ffaf3a] mx-auto mt-6" />
               <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-8 italic">Scientific enquiry across 25+ specialisations</p>
            </div>
            <div className="space-y-4">
               {domains.map((domain, i) => (
                  <div key={i} className="group overflow-hidden cut-corner-panel border border-slate-200 hover:border-[#019e6e]/40 transition-all bg-white shadow-2xl">
                    <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                       <h4 className="text-lg md:text-xl font-bold text-[#0d315c] uppercase tracking-tight md:w-1/3 group-hover:text-[#ffaf3a] transition-colors">{domain.name}</h4>
                       <div className="flex flex-wrap gap-2 md:w-2/3 md:justify-end">
                          {domain.items.map((item, idx) => (
                             <span key={idx} className="px-4 py-2 bg-[#f5f9ff] hover:bg-[#eaf6f2] border border-slate-200 cut-corner-badge text-[10px] font-black uppercase tracking-widest text-[#0d315c] transition-all">
                               {item}
                             </span>
                          ))}
                       </div>
                    </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* -------------------------------------------------------------------
          ELIGIBILITY & SELECTION
          ------------------------------------------------------------------- */}
      <section id="eligibility" className="smru-section bg-[#fcfdfd] scroll-mt-40">
         <div className="smru-container">
            <div className="text-center mb-14 space-y-4">
               <h3 className="text-4xl font-black text-[#0d315c] uppercase tracking-tighter">Eligibility & <span className="text-[#ffaf3a]">Selection</span></h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Assessment on Research Methodology and Subject Knowledge</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="cut-corner-panel border border-[#0d315c]/10 bg-white shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-[#0d315c] text-white">
                     <h4 className="text-sm font-black uppercase tracking-[0.2em]">Standard Ph.D.</h4>
                  </div>
                  <div className="p-6 space-y-4">
                     <div className="flex items-start gap-3">
                        <FaUserGraduate className="text-[#019e6e] mt-0.5" size={16} />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Qualification</p>
                           <p className="text-sm font-bold text-[#0d315c]">Master's degree in relevant discipline</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <FaChartBar className="text-[#019e6e] mt-0.5" size={16} />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Minimum Marks</p>
                           <p className="text-sm font-bold text-[#0d315c]">55% (50% for SC/ST/OBC)</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="cut-corner-panel border border-[#019e6e]/20 bg-white shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-[#019e6e] text-white">
                     <h4 className="text-sm font-black uppercase tracking-[0.2em]">Integrated Ph.D. (CSE & ET)</h4>
                  </div>
                  <div className="p-6 space-y-4">
                     <div className="flex items-start gap-3">
                        <FaGraduationCap className="text-[#ffaf3a] mt-0.5" size={16} />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Qualification</p>
                           <p className="text-sm font-bold text-[#0d315c]">4-year Bachelor's (BS/BE/B.Tech)</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <FaChartBar className="text-[#ffaf3a] mt-0.5" size={16} />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Minimum Marks</p>
                           <p className="text-sm font-bold text-[#0d315c]">75% aggregate</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <FaBookOpen className="text-[#ffaf3a] mt-0.5" size={16} />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Master's Requirement</p>
                           <p className="text-sm font-bold text-[#0d315c]">Not required</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8 cut-corner-panel border border-slate-100 bg-white p-6 shadow-sm">
               <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4">Selection Flow</p>
               <div className="flex flex-col md:flex-row md:items-center gap-3 text-center">
                  {["Eligibility Check", "Entrance Test", "Interview", "Final Selection"].map((item, idx) => (
                    <React.Fragment key={item}>
                      <div className="flex-1 cut-corner-panel border border-slate-100 bg-[#f8fbff] px-4 py-4">
                        <p className="text-xs font-black uppercase tracking-wide text-[#0d315c]">{item}</p>
                      </div>
                      {idx < 3 && (
                        <div className="hidden md:flex text-[#019e6e]/40">
                          <FaArrowRight size={14} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
               </div>
            </div>

            <div className="mt-6 p-6 bg-[#fff9ef] cut-corner-panel border border-[#ffaf3a]/25 text-sm font-bold text-gray-700">
               <p className="flex items-start gap-3">
                 <FaAward size={18} className="text-[#ffaf3a] mt-0.5" />
                 <span>Exemptions: Candidates with UGC-NET (including JRF), GATE, SLET, or M.Phil. are exempted from the entrance exam.</span>
               </p>
            </div>
         </div>
      </section>

      {/* -------------------------------------------------------------------
          FEES & FINANCE (Slate/Navy Textured Section)
          ------------------------------------------------------------------- */}
      <section id="fees" className="smru-section bg-[#1b2444] text-white relative overflow-hidden scroll-mt-40">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#019e6e]/5 rounded-full blur-[150px] -mr-96 -mt-96" />
         <div className="smru-container relative z-10">
            <div className="text-center mb-20">
               <h3 className="text-4xl font-black uppercase tracking-tighter">Fees & <span className="text-[#019e6e]">Financial Structure</span></h3>
               <p className="text-white/30 font-medium italic text-[11px] uppercase mt-2 tracking-widest">Transparent and structured</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               <div className="bg-white border border-slate-200 cut-corner-panel shadow-2xl overflow-hidden">
                  <div className="p-8 bg-slate-50 border-b border-slate-200 text-center">
                     <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em]">Fee Status</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                     {feeStructure.map((item, i) => (
                        <div key={i} className="p-8 flex justify-between items-center hover:bg-slate-50 transition-colors">
                           <span className="text-[13px] font-bold text-slate-600 uppercase tracking-tight max-w-[280px]">{item.category}</span>
                           <span className="text-3xl font-black text-[#ffaf3a]">{item.fee}</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="bg-[#0d315c] text-white p-12 cut-corner-panel shadow-2xl border border-white/5">
                     <h4 className="text-[13px] font-black uppercase tracking-[0.4em] mb-12 text-[#ffaf3a]">Component Fees</h4>
                     <ul className="space-y-8">
                        {[
                          { l: "Admission Fee", f: "Official Request", s: "Confirm before payment" },
                          { l: "Coursework Fee", f: "Official Request", s: "Confirm before payment" },
                          { l: "Caution Deposit", f: "Official Request", s: "Confirm before payment" },
                          { l: "Thesis Fee", f: "Official Request", s: "Confirm before payment" },
                          { l: "Application Fee", f: "Official Request", s: "Confirm before payment" }
                        ].map((fee, i) => (
                           <li key={i} className="flex justify-between items-center pb-5 border-b border-white/5">
                              <div>
                                 <p className="text-[15px] font-bold text-white/80">{fee.l}</p>
                                 <p className="text-[10px] text-white/20 uppercase tracking-widest">{fee.s}</p>
                               </div>
                               <span className="text-2xl font-black text-[#ffaf3a]">{fee.f}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* -------------------------------------------------------------------
           HOW TO APPLY
           ------------------------------------------------------------------- */}
       <section id="apply" className="smru-section bg-[#fdfefe] scroll-mt-40 border-t border-gray-100">
          <div className="smru-container">
             <div className="text-center mb-16 space-y-4">
                <h3 className="text-5xl font-black text-[#0d315c] uppercase tracking-tighter">How to <span className="text-[#ffaf3a]">Apply</span></h3>
                <p className="text-lg text-gray-400 font-medium italic opacity-60">Follow the 6-step integrated application journey.</p>
             </div>

             <div className="max-w-5xl mx-auto relative">
                <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-[#0d315c]/10" />
                {applySteps.map((step, i) => {
                  const icons = [FaRupeeSign, FaPaperPlane, FaClipboardCheck, FaBookOpen, FaUsers, FaCheckCircle];
                  const StepIcon = icons[i] || FaArrowRight;
                  const isLeft = i % 2 === 0;
                  const accent = ["#019e6e", "#ffaf3a", "#0d315c", "#25b895", "#1b2444", "#ffaf3a"][i % 6];
                  return (
                    <article
                      key={i}
                      className={`relative mb-6 md:mb-8 flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
                    >
                      <div className="w-full md:w-[46%] relative">
                        <div className="bg-white cut-corner-card border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                          <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="inline-flex items-center gap-3">
                                <span className="inline-flex h-8 min-w-8 items-center justify-center cut-corner-badge bg-[#0d315c] px-2 text-[11px] font-black text-white">
                                  0{i + 1}
                                </span>
                                <div className="h-10 w-10 cut-corner-badge bg-[#f5f9ff] border border-[#0d315c]/10 text-[#019e6e] grid place-items-center text-xl">
                                  <StepIcon />
                                </div>
                              </div>
                            </div>
                            <h4 className="mt-4 text-[14px] font-black text-[#0d315c] uppercase tracking-wide leading-tight">{step.title}</h4>
                            <p className="mt-2 text-[13px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border-2 border-[#0d315c]/10 items-center justify-center text-[11px] font-black text-[#0d315c] z-10">
                        {i + 1}
                      </div>
                    </article>
                  );
                })}
             </div>

             <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 cut-corner-card bg-[#fff9ef] border border-[#ffaf3a]/25">
                   <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0d315c]/50 mb-2">Application Fee</p>
                   <p className="text-2xl font-black text-[#0d315c]">Rs 2,000</p>
                </div>
                <div className="p-5 cut-corner-card bg-[#f2fbf8] border border-[#019e6e]/20">
                   <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0d315c]/50 mb-2">Admission Mode</p>
                   <p className="text-2xl font-black text-[#0d315c]">Entrance + Interview</p>
                </div>
                <div className="p-5 cut-corner-card bg-[#f5f9ff] border border-[#0d315c]/10">
                   <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0d315c]/50 mb-2">Submission</p>
                   <p className="text-2xl font-black text-[#0d315c]">Online Only</p>
                </div>
             </div>

             <div className="mt-32 text-center">
                <a href="/contact" className="inline-block px-14 py-7 bg-[#ffaf3a] text-[#0d315c] font-black text-xl uppercase tracking-widest cut-corner-badge shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">
                   Register Interest for Next Ph.D. Cycle
                </a>
             </div>
          </div>
       </section>

       {SHOW_PUBLIC_SEO_SECTIONS && (
         <section className="bg-[#f7fbff] smru-section">
            <div className="smru-container space-y-16">
               <LinkGridSection
                 title="Research & Public Information"
                 items={[
                   RESEARCH_LINKS[0],
                   { href: "/admissions", label: "Admissions", description: "Primary admissions page for non-doctoral and general application support." },
                   { href: "/contact", label: "Contact", description: "Admissions, campus, and public support contact details." },
                   LOCATION_LINKS[0],
                   TRUST_LINKS[2],
                   { href: "/fee-structure", label: "Fee Structure", description: "Published fee reference with counselling confirmation guidance for current applicants." },
                 ].filter(Boolean)}
               />
               <FaqSection title="Frequently Asked Questions" items={PHD_FAQS} />
            </div>
         </section>
       )}

       {/* -------------------------------------------------------------------
           YOUR LEGACY FINALE (Green Institutional Section)
           ------------------------------------------------------------------- */}
        <section className="smru-section text-center relative overflow-hidden bg-[#019e6e] text-white">
          <div className="smru-container relative z-10 space-y-20">
             <div className="space-y-4">
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic">YOUR <span className="text-[#ffaf3a]">LEGACY</span></h2>
                <div className="w-24 h-[2px] bg-[#ffaf3a] mx-auto mt-8" />
                <p className="text-2xl md:text-3xl text-white/80 font-medium italic leading-relaxed max-w-4xl mx-auto px-6 mt-10">
                   "The future of rehabilitation, healthcare, and inclusion needs researchers who lead, not follow."
                </p>
             </div>

             <div className="pt-24 space-y-12">
                <h3 className="text-2xl md:text-3xl font-black text-[#ffaf3a] tracking-[0.5em] uppercase leading-snug">Stmarys University</h3>
                <TrustBand
                  dark
                  className="text-white/40"
                  itemClassName="text-[11px] tracking-widest"
                  items={[
                    { icon: <FaBuilding className="text-[#ffaf3a]" />, text: "120-Acre Campus" },
                    { icon: <FaAward className="text-[#ffaf3a]" />, text: "Educational Legacy" },
                    { icon: <FaUserGraduate className="text-[#ffaf3a]" />, text: "Doctoral Excellence" },
                  ]}
                />
                <div className="bg-black/10 px-8 py-3 rounded-full w-fit mx-auto">
                  <TrustBand
                    dark
                    className="gap-x-10 text-white/90"
                    itemClassName="tracking-widest"
                    items={[
                      { text: "RPWD Act Compliant" },
                      { text: "NEP 2020 Aligned" },
                    ]}
                  />
                </div>
             </div>
          </div>
       </section>
    </div>
  );
};

export default PhdAdmission;
