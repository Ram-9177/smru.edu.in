"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const campusVideo = "/assets/campus_video_fallback.mp4";
const campusPoster = "/assets/hero-campus.webp";
const canteenImg = "/assets/canteen-CZmCaPgx.webp";
const hostelImg1 = "/assets/Hostel1-CfcW80Kf.webp";
const hostelImg2 = "/assets/Hostel2-C_Z6DObd.webp";
import { buildFaqSchema } from "@/lib/seo/schema";
import { resolveAssetSrc } from "@/lib/shared/media";
import { useOpenApply } from "../context/ApplyModalContext";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import { BentoTrustGrid, HalfRingStepRail, PillBand, TechniqueModernGrid, RingStepFlow, StairHighlightStrips } from "../components/InfographicSections";
import {
  FaArrowRight,
  FaAward,
  FaHeartbeat,
  FaHandsHelping,
  FaChartLine,
  FaQuoteLeft,
  FaShieldAlt,
  FaBrain,
  FaEye,
  FaStethoscope,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBullseye,
  FaBicycle,
  FaUniversity,
  FaScroll,
  FaMicrochip,
  FaGavel,
  FaSyringe,
  FaProcedures,
  FaDna,
} from "react-icons/fa";
import { GiBrain, GiMedicalPack, GiRunningShoe } from "react-icons/gi";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { HOME_FAQ_CATEGORIES } from "@/lib/seo/home-faqs";
import { LinkGridSection } from "@/components/seo/PageSections";
import { GLOBAL_TRUST_CTA_LINKS, LOCATION_LINKS } from "@/lib/seo/info-pages";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import { getSchoolLandingPath } from "@/lib/shared/school-landing";
import { isRemovedPartnerPageSlug } from "@/lib/shared/partner-pages";
import { PHD_ADMISSIONS_STATUS_MESSAGE } from "@/lib/shared/site-constants";

import { EDU_PARTNERS, schools as staticSchools } from "../data/schools";
import FAQSection from "../components/FAQSection";

import { 
  DEFAULT_SCHOLARSHIP_NAMES, 
  DEFAULT_WHY_CHOOSE_ITEMS, 
  DEFAULT_CAMPUS_ITEMS, 
  DEFAULT_CANTEEN_HIGHLIGHTS, 
  TESTIMONIAL_DATA 
} from "@/data/home-data";
import { UNIVERSITY_EVENTS } from "@/data/events";

const admissionsApplyUrl = "https://apply.smru.edu.in";

/* =============================== Page =============================== */
export default function Home() {
  const router = useRouter();
  const openApply = useOpenApply();
  const [showVideo, setShowVideo] = useState(false);
  
  const heroImages = useMemo(() => ["/assets/hero-campus.webp", "/assets/hero-campus-2.webp"], []);
  const latestEvents = useMemo(
    () => [...UNIVERSITY_EVENTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3),
    []
  );
  const [heroIndex, setHeroIndex] = useState(0);
  const { state } = useDeveloperCms();

  const getCmsContent = useCallback((id: string, separator = " | ") => {
    const page = state.pages.find((p) => p.id === id);
    return page?.content ? page.content.split(separator).map((s) => s.trim()) : [];
  }, [state.pages]);

  const scholarshipNames = useMemo(() => {
    const fromCms = getCmsContent("page-scholarships", ";");
    return fromCms.length > 0 ? fromCms : DEFAULT_SCHOLARSHIP_NAMES;
  }, [getCmsContent]);

  const whyChooseItems = useMemo(() => {
    const phrases = getCmsContent("page-hero-phrases");
    const icons = [<FaHeartbeat key="1" />, <FaHandsHelping key="2" />, <FaAward key="3" />, <FaChartLine key="4" />];

    if (phrases.length === 0) return DEFAULT_WHY_CHOOSE_ITEMS.map((d, i) => ({ ...d, icon: icons[i] }));
    
    return phrases.map((p, i) => {
      const existing = DEFAULT_WHY_CHOOSE_ITEMS.find(d => d.title.toLowerCase() === p.toLowerCase());
      return {
        icon: icons[i % icons.length],
        title: p,
        desc: existing?.desc || "Experience excellence and innovation at Stmarys University."
      };
    });
  }, [getCmsContent]);

  const campusItemsFromCms = useMemo(() => {
    const features = getCmsContent("page-campus-hostel", ",");
    const iconMap: Record<string, React.ReactNode> = {
      // eslint-disable-next-line @next/next/no-img-element
      hostel: <img src="/assets/Stmarys-Logo.webp" alt="Stmarys University" className="w-5 h-5 object-contain" />,
      sports: <GiRunningShoe />,
      labs: <FaBrain />,
      wellness: <FaStethoscope />,
      green: <FaBullseye />,
      bike: <FaBicycle />,
    };

    if (features.length === 0) return DEFAULT_CAMPUS_ITEMS.map(c => ({ ...c, icon: iconMap[c.key] }));

    return features.map((f) => {
      const match = DEFAULT_CAMPUS_ITEMS.find(c => f.toLowerCase().includes(c.key) || f.toLowerCase().includes(c.title.toLowerCase().split(' ')[1]));
      return {
        icon: match ? iconMap[match.key] : <FaUniversity />,
        title: f,
        desc: match?.desc || "State-of-the-art facilities designed for student excellence."
      };
    });
  }, [getCmsContent]);

  const importantLinks = useMemo(
    () => [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Verified establishment, UGC recognition, and official university recognition documents." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Official disclosure dashboard for students, parents, and public verification." },
      { href: "/admissions", label: "Admissions 2026", description: "UG, PG, diploma, and doctoral admission routes with counselling support." },
      { href: "/campus-location-hyderabad", label: "Campus Location", description: "Deshmukhi campus address, map access, and visit guidance near Hyderabad." },
      { href: "/contact", label: "Contact Helpdesk", description: "Admissions, campus visit, and student support contact routes." },
      { href: "/campus-360", label: "Visit Campus", description: "Campus tour, facilities preview, and location guidance." },
      { href: "/careers", label: "Careers", description: "Explore faculty and institutional job opportunities at Stmarys University." },
    ].filter(Boolean),
    []
  );

  const canteenHighlights = useMemo(() => {
    const fromCms = getCmsContent("page-canteen-highlights", ";");
    return fromCms.length > 0 ? fromCms : DEFAULT_CANTEEN_HIGHLIGHTS;
  }, [getCmsContent]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!showVideo) {
      // Show images for a total of 6 seconds (3s each) then switch to video
      timer = setTimeout(() => setShowVideo(true), 6000);
    }
    return () => clearTimeout(timer);
  }, [showVideo]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!showVideo) {
      interval = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % heroImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showVideo, heroImages.length]);

  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      if (top >= 72 && top <= 140) return;
      window.scrollTo({ top: Math.max(0, window.scrollY + top - 96), behavior: "auto" });
    };

    scrollToHash();
    const timers = [100, 700, 1600, 2600].map((delay) => window.setTimeout(scrollToHash, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const [index, setIndex] = useState(0);
  const total = TESTIMONIAL_DATA.length;
  const next = useCallback(() => setIndex((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total]);

  const collegeNameLines = ["Stmarys", "Rehabilitation", "University"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(HOME_FAQ_CATEGORIES.flatMap(c => c.faqs)))
        }}
      />
      {/* ========================= HERO ======================== */}
      <section id="hero" className="relative w-full h-[calc(100svh-112px)] md:h-[90svh] min-h-[560px] md:min-h-[620px] overflow-hidden">
        {/* Cinematic Asset Cross-Dissolve Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base Layer: Video (mounts/plays when showVideo is true) */}
          {showVideo && (
            <video
              poster={campusPoster}
              preload="none"
              autoPlay
              muted
              playsInline
              onEnded={() => setShowVideo(false)}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${showVideo ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={campusVideo} type="video/mp4" />
            </video>
          )}

          {/* Top Layer: Static Image Loop (fades out to reveal video) */}
          <div className={`absolute inset-0 h-full w-full transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              showVideo 
                ? 'opacity-0 scale-[1.02] blur-sm' 
                : 'opacity-100 scale-110 blur-0'
            }`}>
            {heroImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt="Stmarys University Campus View in Hyderabad"
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover object-center hero-campus-image transition-opacity duration-1000 ${
                  heroIndex === i ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>


        {/* Institutional Mission Backdrop — Dark Blue Fade */}
        <div className="absolute top-0 left-0 w-full h-[42svh] md:h-[45svh] z-10 bg-gradient-to-b from-[#0d315c]/95 via-[#0d315c]/72 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[36svh] z-10 bg-gradient-to-t from-[#0d315c]/85 via-[#0d315c]/35 to-transparent pointer-events-none md:hidden" />

        {/* Floating Institutional Mission Ribbon — Pure 1305 Style Elevation */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-start p-6 md:p-12 pt-[96px] sm:pt-[104px] md:pt-[112px] lg:pt-[120px] xl:pt-[128px]">
          <div className="smru-container pointer-events-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Tier-1 Institutional Header Cluster — Brand Identity Primary Highlight */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-2 cut-corner-badge bg-[#ffaf3a]/10 backdrop-blur-md border border-[#ffaf3a]/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#ffaf3a] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffaf3a]">Admissions Open for UG, PG & Diploma (2026-27)</span>
              </div>
              
              <div className="space-y-0">
                <h1 className="text-[clamp(1.5rem,5.5vw,3.5rem)] font-black text-white drop-shadow-2xl [text-shadow:_0_8px_40px_rgba(0,0,0,0.8)] font-['Cinzel'] leading-[1.15] tracking-tight uppercase">
                  <span className="sr-only">St. Mary&apos;s University - </span>
                  <span className="text-[#ffaf3a]">St. Mary&apos;s</span> Rehabilitation University
                </h1>
              </div>

              <p className="text-white/90 text-[10px] md:text-[13px] font-black uppercase tracking-[0.4em] max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
                Established under the Telangana Private Universities Act, 2018 | UGC 2(f) Recognized
              </p>
            </div> 
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${showVideo ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-[1px] h-12 bg-white/40 mx-auto" />
        </div>
      </section>

      {/* ===================== PHD ADMISSION RIBBON ====================== */}
      {false && (
        <section id="phd-ribbon" className="relative z-30 -mt-8 md:-mt-12 mb-12">
          <div className="smru-container">
            <div className="bg-[#0d315c] cut-corner-panel shadow-2xl overflow-hidden border border-white/10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-8 animate-fade-in-up">
            
            {/* Left Side: Title & Badge */}
            <div className="flex items-center gap-6 flex-1 text-center md:text-left">
              <div className="hidden md:flex w-20 h-20 bg-white/10 cut-corner-panel items-center justify-center text-[#ffaf3a] shadow-inner">
                 <FaAward size={42} />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                  <span className="bg-[#ffaf3a] text-[#0d315c] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Admissions Status -
                  </span>
                  <span className="text-[#019e6e] text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-md">
                    UG & PG Admissions 2026-27
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#ffaf3a] uppercase tracking-tight leading-none mb-4">
                  UG, PG & Diploma <br className="hidden md:block" /> Admissions Still Active
                </h2>
                <p className="text-white/60 text-sm md:text-base font-black uppercase tracking-[0.2em] border-l-2 border-[#019e6e] pl-4">
                  <span className="text-white">{PHD_ADMISSIONS_STATUS_MESSAGE}</span>
                </p>
              </div>
            </div>

            {/* Right Side: Dates & Action Card */}
            <div className="w-full lg:w-auto bg-white/5 border border-white/10 cut-corner-panel p-5 md:p-8 backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] grayscale pointer-events-none">
                <FaUniversity size={100} />
              </div>
              
              <div className="flex gap-8 md:gap-12">
                <div className="text-center md:text-left">
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Doctoral Cycle</p>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tighter">APPLICATIONS CLOSED</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
                <div className="text-center md:text-left">
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-2">UG/PG Cycle</p>
                  <p className="text-xl md:text-2xl font-black text-[#ffaf3a] tracking-tighter">ACTIVE</p>
                </div>
              </div>

              <button 
                onClick={() => openApply("auto")}
                className="w-full md:w-auto bg-[#ffaf3a] hover:bg-[#ffbf5a] text-[#0d315c] px-8 py-4 rounded-xl font-black text-[12px] uppercase tracking-[0.25em] shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                UG & PG Admissions <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
        </section>
      )}

      {/* ===================== TRUST STRIP ====================== */}
      <section id="trust-strip" className="bg-[#0d315c] text-white py-8 border-y border-white/10 relative z-20">
        <div className="smru-container text-center">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/90 leading-relaxed max-w-5xl mx-auto">
            Stmarys University, legally established as St. Mary&apos;s Rehabilitation University in Hyderabad, Telangana, was established through Telangana Gazette Act No. 10 of 2026 and recognized by the University Grants Commission under Section 2(f) of the UGC Act, 1956.
          </p>
        </div>
      </section>

      {/* ===================== WHY Stmarys University ====================== */}
      <section id="why-smru" className="scroll-mt-24 smru-section bg-[#f8fbff]">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Why Join Stmarys University?"
            subtitle="Stmarys University brings together rehabilitation, healthcare, allied sciences, assistive technology, law, management, technology, and multidisciplinary education through a student-first academic ecosystem."
            subtitleClassName="max-w-3xl"
          />
          <BentoTrustGrid
            className="mt-12"
            items={[
              {
                title: "Rehabilitation & Healthcare Focus",
                desc: "Dedicated clinical training embedded into healthcare and allied sciences programmes.",
              },
              {
                title: "6 Focused Schools",
                desc: "A streamlined structure offering depth and specialisation across key academic fields.",
              },
              {
                title: "Student-First Ecosystem",
                desc: "Built to support student outcomes from admission through graduation and beyond.",
              },
              {
                title: "Statutory Compliance",
                desc: "Operating transparently under UGC 2(f) and State University guidelines.",
              },
            ]}
          />
        </div>
      </section>

      {/* ===================== EXPLORE SIX SCHOOLS ====================== */}
      <section id="schools" className="scroll-mt-24 smru-section bg-white">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Explore Our Schools"
            subtitle="Discover focused programmes designed for modern professional pathways in rehabilitation, health, technology, and management."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {([
              {
                name: "School of Rehabilitation Sciences",
                slug: "rehabilitation-sciences",
                image: "/assets/school_rehabilitation_sciences_hq.webp",
              },
              {
                name: "School of Health & Allied Health Sciences",
                slug: "health-allied-health-sciences",
                image: "/assets/school_health_allied_health_sciences_hq.webp",
              },
              {
                name: "School of Psychology",
                slug: "psychology",
                image: "/assets/school_psychology_hq.webp",
              },
              {
                name: "School of Nursing",
                slug: "nursing-sciences",
                image: "/assets/school_nursing_hq.webp",
              },
              {
                name: "School of Engineering & Emerging Technologies",
                slug: "engineering-emerging-technologies",
                image: "/assets/school_engineering_emerging_technologies_hq.webp",
              },
              {
                name: "School of Law",
                slug: "law",
                image: "/assets/school_law_hq.webp",
              },
            ] as const).map((school, i) => {
              const matchedSchool = staticSchools.find(s => s.slug === school.slug);
              return (
              <Link
                key={i}
                href={getSchoolLandingPath(school.slug)}
                className="group relative min-h-[220px] sm:min-h-[240px] md:min-h-[280px] overflow-hidden cut-corner-panel shadow-[0_15px_40px_rgba(13,49,92,0.12)] hover:shadow-[0_25px_60px_rgba(13,49,92,0.25)] transition-all duration-700 hover:-translate-y-2 flex flex-col border border-slate-200/50 bg-[#0d315c]"
              >
                {/* ── BACKGROUND IMAGE (Shifted left to prevent text cutting) ── */}
                <div
                  className="absolute inset-0 bg-cover bg-[position:0%_50%] transition-transform duration-1000 ease-out group-hover:scale-105 origin-left"
                  style={{ backgroundImage: `url(${school.image})` }}
                />

                {/* ── INNER DEPTH SHADOW ── */}
                <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.3)] pointer-events-none group-hover:shadow-[inset_0_0_150px_rgba(0,0,0,0.45)] transition-all duration-700" />

                {/* ── HOVER GLIMMER EFFECT ── */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full rotate-45" />

                {/* ── BOTTOM FROSTED BAR ── */}
                <div className="mt-auto relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/20 p-5 transform group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between">
                    <h3 className="max-w-[calc(100%-3rem)] text-sm font-black uppercase leading-tight tracking-[0.08em] text-white/90 transition-colors duration-300 group-hover:text-white sm:text-base">
                      {school.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-[#0d315c] transition-all duration-300 shadow-xl shrink-0">
                      <FaArrowRight className="text-[12px] transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                  {matchedSchool?.about && (
                    <p className="mt-3 text-white/80 text-xs font-medium leading-relaxed max-h-0 opacity-0 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 transition-all duration-700 delay-75">
                      {matchedSchool.about}
                    </p>
                  )}
                </div>

              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* ================== STUDENT LEARNING EXPERIENCE ================= */}
      <section id="experience" className="scroll-mt-24 smru-section bg-[#f8fbff]">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Teaching Techniques at Stmarys University"
            subtitle="We employ advanced, practice-based teaching methods to ensure students gain hands-on experience and a profound understanding of their fields."
            subtitleClassName="max-w-3xl"
          />

          <TechniqueModernGrid
            className="mt-12"
            items={[
              {
                title: "Clinical Exposure",
                meta: "Hands-On",
                icon: <FaStethoscope />,
                desc: "Practical, functional tasks in clinical settings that improve learning retention and professional readiness.",
              },
              {
                title: "Simulation Labs",
                meta: "Advanced Facilities",
                icon: <FaBrain />,
                desc: "Realistic clinical simulations that prepare students for patient-facing and technical scenarios.",
              },
              {
                title: "Multisensory Learning",
                meta: "Integrated Methods",
                icon: <FaEye />,
                desc: "Integrated methods that engage visual, auditory, and kinaesthetic pathways.",
              },
              {
                title: "Peer-Led Case Discussions",
                meta: "Collaborative Review",
                icon: <FaUsers />,
                desc: "Collaborative case reviews to build critical thinking and team-based decision skills.",
              },
            ]}
          />
        </div>
      </section>

      {/* ================= CAMPUS ENVIRONMENT ================= */}
      <section id="campus" className="relative scroll-mt-24 smru-section bg-white overflow-hidden bg-[radial-gradient(at_0%_0%,rgba(37,184,149,0.06)_0,transparent_55%),radial-gradient(at_100%_100%,rgba(13,49,92,0.08)_0,transparent_55%)]">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Campus & Learning Environment"
            subtitle="Purpose-built facilities designed to support continuous learning, clinical exposure, and student well-being."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {campusItemsFromCms.map((item, i) => {
              const colors = [
                { iconBg: "bg-[#0d315c]/10", iconText: "text-[#0d315c]", border: "hover:border-[#0d315c]", glow: "group-hover:shadow-[0_10px_30px_rgba(13,49,92,0.15)]" },
                { iconBg: "bg-[#019e6e]/10", iconText: "text-[#019e6e]", border: "hover:border-[#019e6e]", glow: "group-hover:shadow-[0_10px_30px_rgba(1,158,110,0.2)]" },
                { iconBg: "bg-[#ffaf3a]/20", iconText: "text-[#d49400]", border: "hover:border-[#ffaf3a]", glow: "group-hover:shadow-[0_10px_30px_rgba(255,175,58,0.3)]" },
              ];
              const theme = colors[i % colors.length];

              return (
                <div key={i} className={`relative z-10 p-8 border border-slate-200 cut-corner-panel bg-white shadow-sm hover:-translate-y-1 transition-all duration-300 group ${theme.border} ${theme.glow}`}>
                  <div className={`w-16 h-16 ${theme.iconBg} ${theme.iconText} flex items-center justify-center cut-corner-panel mb-6 text-3xl group-hover:scale-110 transition-transform duration-300 border border-current/10`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#0d315c] mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= OUR INDUSTRIAL PARTNERS ================= */}
      <section id="partners" className="relative scroll-mt-24 smru-section bg-[#f8fbff] overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(255,175,58,0.08)_0,transparent_60%)]">
        <div className="smru-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#0d315c] mb-8 shadow-sm border border-slate-100 overflow-hidden p-3 mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/Stmarys-Logo.webp" alt="Stmarys University Logo" className="w-full h-full object-contain" />
          </div>
          <UniversitySectionHeader
            title="Our Industrial Partners"
            subtitle="Stmarys University collaborates with leading healthcare and technology organizations to ensure our students graduate industry-ready."
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {(() => {
              const PARTNER_ORDER = [
                "nst",
                "emversity",
                "niat",
                "qtst",
                "bytexl",
                "iiat",
                "edinbox",
                "veloces",
                "bb",
                "edridge",
                "nextgen"
              ];
              
              return Object.values(EDU_PARTNERS)
                .filter(p => {
                  const slug = String(p.landingUrl || "").replace(/^\/+/, "").replace(/\/$/, "").toLowerCase();
                  return p.code !== "Stmarys University" && 'logo' in p && p.landingUrl && !isRemovedPartnerPageSlug(slug);
                })
                .sort((a, b) => {
                  const slugA = (a.landingUrl || "").replace(/^\//, "").toLowerCase();
                  const slugB = (b.landingUrl || "").replace(/^\//, "").toLowerCase();
                  const indexA = PARTNER_ORDER.indexOf(slugA);
                  const indexB = PARTNER_ORDER.indexOf(slugB);
                  
                  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                });
            })()
              .map((partner, i) => {
              const colors = [
                { bg: "bg-[#0d315c]", text: "text-[#0d315c]", border: "hover:border-[#0d315c]", glow: "hover:shadow-[0_10px_30px_rgba(13,49,92,0.15)]", lightBg: "bg-[#0d315c]/5" },
                { bg: "bg-[#019e6e]", text: "text-[#019e6e]", border: "hover:border-[#019e6e]", glow: "hover:shadow-[0_10px_30px_rgba(1,158,110,0.2)]", lightBg: "bg-[#019e6e]/5" },
                { bg: "bg-[#ffaf3a]", text: "text-[#0d315c]", border: "hover:border-[#ffaf3a]", glow: "hover:shadow-[0_10px_30px_rgba(255,175,58,0.3)]", lightBg: "bg-[#ffaf3a]/10" },
              ];
              const theme = colors[i % colors.length];

              return (
                <Link 
	                  key={partner.code} 
	                  href={`/partner/${String(partner.landingUrl).replace(/^\/+/, "").replace(/\/$/, "")}`}
                  className={`group relative overflow-hidden p-8 border border-slate-200 cut-corner-panel bg-white transition-all duration-500 hover:-translate-y-2 ${theme.border} ${theme.glow}`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme.lightBg} pointer-events-none`} />
                  <div className="relative z-10 flex flex-col items-center justify-center text-center h-full gap-4">
                    <div className="h-16 w-full flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={resolveAssetSrc((partner as any).logo)} 
                        alt="" 
                        aria-hidden="true"
                        className="max-h-full max-w-full object-contain transition-all duration-500 transform group-hover:scale-110 group-hover:grayscale" 
                      />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.text} opacity-100 transition-opacity`}>
                      {partner.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOSTEL FACILITIES ================= */}
      <section id="hostels" className="relative scroll-mt-24 smru-section bg-white overflow-hidden bg-[radial-gradient(at_0%_100%,rgba(1,158,110,0.08)_0,transparent_55%),radial-gradient(at_100%_0%,rgba(13,49,92,0.06)_0,transparent_55%)]">
        <div className="smru-container">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-start h-20 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/Stmarys-Logo.webp" alt="Stmarys University Logo" className="h-full w-auto object-contain" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-outfit text-[#0d315c] tracking-tight uppercase leading-none">
                Hostel Facilities at <br className="hidden md:block" /> <span className="text-[#019e6e]">St. Mary&apos;s University</span>
              </h2>
              <div className="h-1.5 w-24 bg-[#ffaf3a] cut-corner-underline" />
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                We offer a comfortable, secure, and nurturing home away from home. Our modern hostel blocks are equipped with 24/7 security, high-speed Wi-Fi, and recreational spaces designed to support both academic focus and personal well-being.
              </p>
              <ul className="space-y-4 mt-8">
                {["24/7 CCTV Surveillance & Security", "High-Speed Wi-Fi Access", "Modern Recreational Rooms", "In-House Medical Assistance"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-semibold text-lg">
                    <span className="w-8 h-8 rounded-full bg-[#019e6e]/10 text-[#019e6e] flex items-center justify-center shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full flex flex-col gap-8 relative z-10 mt-8 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] bg-[#019e6e]/20 blur-[100px] pointer-events-none rounded-full" />
              
              {/* Study Area */}
              <div className="relative w-full md:w-[85%] aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-[16/10] cut-corner-panel border-[6px] border-white overflow-hidden shadow-[0_20px_40px_-15px_rgba(13,49,92,0.25)] group">
                <Image src={hostelImg1} alt="Stmarys University Hostel Study Area" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0d315c]/90 via-[#0d315c]/60 to-transparent p-5 md:p-6">
                   <p className="text-[#ffaf3a] font-black uppercase tracking-widest text-xs mb-1">Premium Facilities</p>
                   <p className="text-white font-bold text-lg md:text-xl drop-shadow-md">Dedicated Study Workspaces</p>
                </div>
              </div>

              {/* AC Room */}
              <div className="relative w-full md:w-[85%] self-end aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-[16/10] cut-corner-panel border-[6px] border-white overflow-hidden shadow-[0_20px_40px_-15px_rgba(13,49,92,0.25)] group">
                <Image src={hostelImg2} alt="Stmarys University Air Conditioned Rooms" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0d315c]/90 via-[#0d315c]/60 to-transparent p-5 md:p-6 text-right">
                   <p className="text-[#ffaf3a] font-black uppercase tracking-widest text-xs mb-1">Comfort First</p>
                   <p className="text-white font-bold text-lg md:text-xl drop-shadow-md">Air-Conditioned Bedrooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAMPUS CANTEEN ================= */}
      <section id="canteen" className="relative scroll-mt-24 smru-section bg-[#0d315c] text-white overflow-hidden bg-[radial-gradient(circle_at_0%_100%,rgba(255,175,58,0.15)_0,transparent_55%),radial-gradient(circle_at_100%_0%,rgba(1,158,110,0.15)_0,transparent_55%)]">
        <div className="smru-container">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black font-outfit tracking-tight uppercase leading-none">
                Campus Canteen at <br className="hidden md:block" /> <span className="text-[#ffaf3a]">St. Mary&apos;s University</span>
              </h2>
              <p className="text-lg text-white/80 font-medium leading-relaxed max-w-2xl">
                Our central cafeteria serves as the social hub of the campus, offering a diverse, nutritious, and hygienically prepared menu that caters to various dietary preferences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 relative z-10">
                {canteenHighlights.map((highlight, i) => (
                  <div key={i} className="p-4 bg-white/10 backdrop-blur-md cut-corner-panel border border-white/20 font-medium flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:bg-white/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#ffaf3a] shadow-[0_0_10px_rgba(255,175,58,0.8)]" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full relative aspect-video cut-corner-panel border-[6px] border-white/10 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
              <Image src={canteenImg} alt="Stmarys University Campus Canteen" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAMPUS GALLERY ================= */}
      <section id="gallery" className="relative scroll-mt-24 bg-white overflow-hidden">
        <div className="smru-container py-12 md:py-16">
          <UniversitySectionHeader
            title="Life at Stmarys University"
            subtitle="Explore our vibrant campus life through state-of-the-art labs, sports facilities, and modern learning spaces."
          />
        </div>

        <div className="smru-container py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Drone View */}
            <div className="relative aspect-video md:aspect-square lg:aspect-auto md:col-span-2 lg:col-span-2 cut-corner-panel overflow-hidden group shadow-xl border border-slate-100">
              <Image 
                src="/assets/campus-gallery/drone.webp" 
                alt="Stmarys University Drone View" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 p-4 bg-[#0d315c]/90 backdrop-blur-md border border-white/10 cut-corner-panel">
                <h3 className="text-[#ffaf3a] font-black uppercase tracking-widest text-[9px] mb-0.5">Perspective</h3>
                <h4 className="text-white font-bold text-[11px]">Campus Drone View</h4>
              </div>
            </div>

            {/* Computer Labs */}
            <div className="relative aspect-video md:aspect-square cut-corner-panel overflow-hidden group shadow-lg border border-slate-100">
              <Image 
                src="/assets/campus-gallery/comp-lab.webp" 
                alt="Computer Lab" 
                fill 
                className="object-cover object-center group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 p-4 bg-[#0d315c]/90 backdrop-blur-md border border-white/10 cut-corner-panel">
                <h3 className="text-[#ffaf3a] font-black uppercase tracking-widest text-[9px] mb-0.5">Learning</h3>
                <h4 className="text-white font-bold text-[11px]">Computer Labs</h4>
              </div>
            </div>

            {/* Sports Complex */}
            <div className="relative aspect-video md:aspect-square cut-corner-panel overflow-hidden group shadow-lg border border-slate-100">
              <Image 
                src="/assets/campus-gallery/sports.webp" 
                alt="Sports Complex" 
                fill 
                className="object-cover object-center group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 p-4 bg-[#0d315c]/90 backdrop-blur-md border border-white/10 cut-corner-panel">
                <h3 className="text-[#ffaf3a] font-black uppercase tracking-widest text-[9px] mb-0.5">Athletics</h3>
                <h4 className="text-white font-bold text-[11px]">Sports Complex</h4>
              </div>
            </div>

            {/* Smart Classrooms */}
            <div className="relative aspect-video md:aspect-square lg:aspect-auto md:col-span-2 lg:col-span-2 cut-corner-panel overflow-hidden group shadow-lg border border-slate-100">
              <Image 
                src="/assets/campus-gallery/classroom.webp" 
                alt="Smart Classroom" 
                fill 
                className="object-cover object-center group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 p-4 bg-[#0d315c]/90 backdrop-blur-md border border-white/10 cut-corner-panel">
                <h3 className="text-[#ffaf3a] font-black uppercase tracking-widest text-[9px] mb-0.5">Innovation</h3>
                <h4 className="text-white font-bold text-[11px]">Smart Classrooms</h4>
              </div>
            </div>

            {/* Student Life */}
            <div className="relative aspect-video md:aspect-[16/5] md:col-span-2 lg:col-span-3 cut-corner-panel overflow-hidden group shadow-lg border border-slate-100">
              <Image 
                src="/assets/campus-gallery/campus-life.webp" 
                alt="Student Life" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 p-5 bg-[#0d315c]/90 backdrop-blur-md border border-white/10 cut-corner-panel">
                <h3 className="text-[#ffaf3a] font-black uppercase tracking-widest text-[11px] mb-1">Campus Experience</h3>
                <h4 className="text-white font-black text-base uppercase tracking-tight">Student Life at St. Mary&apos;s University</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHOLARSHIPS ================= */}
      <section id="scholarships" className="relative scroll-mt-24 smru-section bg-white border-b border-slate-100 overflow-hidden bg-[radial-gradient(at_50%_0%,rgba(255,175,58,0.08)_0,transparent_55%)]">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Scholarships at Stmarys University"
            subtitle="We believe that quality education should be accessible. Stmarys University offers robust scholarship programs for meritorious and deserving students."
          />
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 mt-12">
            {scholarshipNames.map((scholarship, i) => (
              <div key={i} className="px-6 py-3 bg-[#f5f9ff] text-[#0d315c] cut-corner-badge border border-[#d8e8fb] font-black shadow-[0_8px_20px_rgba(13,49,92,0.06)] hover:shadow-[0_12px_30px_rgba(13,49,92,0.12)] hover:-translate-y-1 transition-all flex items-center gap-2 relative z-10">
                <FaAward className="text-[#ffaf3a] drop-shadow-md" /> {scholarship}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UNIVERSITY EVENTS ================= */}
      <section id="events" className="relative scroll-mt-24 smru-section bg-[#eef6f5] border-y border-[#d8e8e6] overflow-hidden">
        <div className="smru-container">
          <UniversitySectionHeader
            title="University Events"
            subtitle="Latest campus activities, institutional initiatives, and student life updates from Stmarys University."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestEvents.map((event) => (
              <Link
                key={event.slug}
                href={`/events#${event.slug}`}
                className="group overflow-hidden cut-corner-panel border border-slate-100 bg-white shadow-[0_18px_44px_rgba(13,49,92,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(13,49,92,0.14)]"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={event.images[0].src}
                    alt={event.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 bg-[#0d315c]/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffaf3a] backdrop-blur">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <FaCalendarAlt className="text-[#019e6e]" /> {event.displayDate}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#ffaf3a]" /> Stmarys University Campus
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0d315c] tracking-tight">{event.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{event.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#019e6e]">
                    View event <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 bg-[#0d315c] px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#019e6e]"
            >
              View All Events <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== EXPLORE CAMPUS ====================== */}
      <section id="explore-campus" className="scroll-mt-24 bg-white py-12 md:py-20">
        <div className="smru-container">
          <div className="grid overflow-hidden cut-corner-panel border border-[#dbe8f8] bg-[#f7fbff] shadow-[0_24px_60px_rgba(13,49,92,0.1)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[300px] overflow-hidden lg:min-h-[480px]">
              <Image
                src="/assets/campus-gallery/campus-aerial.webp"
                alt="Aerial view of Stmarys University campus"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061c38]/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 cut-corner-badge bg-white/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#0d315c] shadow-xl">
                <FaMapMarkerAlt className="text-[#019e6e]" />
                Hyderabad Campus
              </div>
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden p-7 sm:p-10 lg:p-14">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#019e6e]/10 blur-3xl" />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#019e6e]">
                  Explore Stmarys
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-[#0d315c] sm:text-4xl lg:text-5xl">
                  Experience the campus in 360°
                </h2>
                <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  Move through key campus locations, explore academic and student spaces, and
                  understand the university environment through an interactive virtual tour.
                </p>

                <div className="mt-7 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#0d315c]">
                  <span className="cut-corner-badge border border-[#dbe8f8] bg-white px-4 py-2">360° Views</span>
                  <span className="cut-corner-badge border border-[#dbe8f8] bg-white px-4 py-2">Guided Locations</span>
                  <span className="cut-corner-badge border border-[#dbe8f8] bg-white px-4 py-2">Multilingual Tour</span>
                </div>

                <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-2">
                  <Link
                    href="/campus-360/"
                    className="inline-flex min-h-12 items-center justify-center gap-3 cut-corner-badge bg-[#ffaf3a] px-7 text-xs font-black uppercase tracking-[0.18em] text-[#0d315c] shadow-[0_16px_32px_rgba(255,175,58,0.28)] transition-all hover:-translate-y-1 hover:bg-[#ffc15f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2 sm:px-5"
                  >
                    <FaEye /> Start 360° Tour <FaArrowRight />
                  </Link>
                  <Link
                    href="/explore/"
                    className="inline-flex min-h-12 items-center justify-center gap-3 cut-corner-badge bg-[#0d315c] px-7 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_16px_32px_rgba(13,49,92,0.2)] transition-all hover:-translate-y-1 hover:bg-[#019e6e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2 sm:px-5"
                  >
                    Explore Page <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OFFICIAL RECOGNITION ================= */}
      <section id="recognition" className="scroll-mt-24 smru-section bg-white">
        <div className="smru-container text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f5f9ff] text-[#0d315c] mb-8 shadow-inner border border-[#d8e8fb]">
            <FaScroll size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit text-[#0d315c] tracking-tight uppercase leading-none">
            Official <span className="text-[#019e6e]">Recognition</span>
          </h2>
          <div className="mx-auto mt-6 h-1.5 w-24 cut-corner-underline bg-[#ffaf3a]" />
          
          <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed">
            Stmarys University is legally established as St. Mary’s Rehabilitation University by the Government of Telangana and recognized by the UGC under Section 2(f). Students and parents can verify university-level recognition through the published official documents.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/approvals-recognitions" 
              className="px-10 py-5 bg-[#019e6e] text-white rounded-xl font-black text-[13px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#0fa571] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
            >
              View Official Documents <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ADMISSIONS CTA ================= */}
      <section id="admissions-cta" className="smru-section bg-[#0d315c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#019e6e]/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        
        <div className="smru-container relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-outfit text-white leading-tight uppercase tracking-tight">
            Begin Your <span className="text-[#ffaf3a]">Professional Journey</span>
          </h2>
          <p className="mt-6 text-white/80 text-lg md:text-xl font-medium leading-relaxed">
            Admissions for the upcoming academic session are now open. Speak to our counsellors or start your application today.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={admissionsApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden px-6 sm:px-10 md:px-12 py-5 bg-[#ffaf3a] hover:bg-[#ffaf3a]/90 text-[#0d315c] cut-corner-panel font-black text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4)_0,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10">Start Your Application</span>
            </a>
            
            <Link 
              href="/contact" 
              className="group relative overflow-hidden px-6 sm:px-10 md:px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 cut-corner-panel font-black text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10 flex items-center gap-3">
                Talk to Admissions <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================== TESTIMONIALS ====================== */}
      <section id="testimonials" className="smru-section bg-white border-y border-slate-100">
        <div className="smru-container">
          <UniversitySectionHeader
            title="Voices of Excellence"
            subtitle="Hear from our dedicated clinicians and principals who shape the future of our students every day."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIAL_DATA.map((testimonial, i) => (
              <blockquote key={i} className="flex flex-col justify-between p-8 cut-corner-panel bg-[#f8fbff] border border-[#d8e8fb] shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6 text-[#ffaf3a] text-3xl opacity-50">
                  <FaQuoteLeft />
                </div>
                <p className="text-slate-700 italic font-medium leading-relaxed mb-8 relative z-10 flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>
                <cite className="not-italic block border-t border-slate-200/50 pt-5 mt-auto">
                  <span className="block text-sm font-black text-[#0d315c] uppercase tracking-wide">
                    {testimonial.name}
                  </span>
                  <span className="block text-[11px] font-medium text-slate-500 mt-1">
                    {testimonial.course}
                  </span>
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== UNIVERSITY MISSION & VISION ====================== */}
      <section id="mission-vision" className="relative scroll-mt-24 overflow-hidden bg-[#0d315c] text-white">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="smru-container relative py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#ffaf3a]">Vision & Mission</p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Built for inclusive professional education
            </h2>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-white/78 md:text-lg">
              Stmarys University combines rehabilitation, health sciences, psychology, technology, law, and management to prepare ethical professionals who can serve real communities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden cut-corner-panel border border-white/15 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:p-8">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center cut-corner-panel bg-[#ffaf3a] text-[#0d315c] shadow-lg">
                  <FaEye size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">Where we are going</p>
                  <h3 className="mt-1 text-2xl font-black uppercase tracking-tight text-white md:text-3xl">Our Vision</h3>
                </div>
              </div>

              <p className="text-lg font-semibold leading-8 text-white/88">
                To become a recognized multidisciplinary university for inclusive education, clinical excellence, applied research, and socially responsible leadership.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Develop professionals with empathy, ethics, and strong field readiness.",
                  "Advance rehabilitation and health-focused education through innovation.",
                  "Build pathways that make quality education accessible and outcome oriented.",
                ].map((item, i) => (
                  <div key={item} className="flex gap-4 border-t border-white/10 pt-4">
                    <span className="shrink-0 text-[11px] font-black uppercase tracking-[0.18em] text-[#ffaf3a]">0{i + 1}</span>
                    <p className="text-sm font-medium leading-6 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="relative overflow-hidden cut-corner-panel border border-white/15 bg-white p-6 text-[#0d315c] shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:p-8">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center cut-corner-panel bg-[#019e6e] text-white shadow-lg">
                  <FaBullseye size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">How we deliver it</p>
                  <h3 className="mt-1 text-2xl font-black uppercase tracking-tight md:text-3xl">Our Mission</h3>
                </div>
              </div>

              <p className="text-lg font-semibold leading-8 text-slate-700">
                To deliver practice-led education through clinical exposure, simulation, research culture, industry collaboration, and student support from admission to career readiness.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Connect classroom learning with labs, clinics, fieldwork, and case discussions.",
                  "Encourage research, problem solving, and interdisciplinary collaboration.",
                  "Support students with transparent systems, mentoring, and professional values.",
                ].map((item, i) => (
                  <div key={item} className="flex gap-4 border-t border-slate-200 pt-4">
                    <span className="shrink-0 text-[11px] font-black uppercase tracking-[0.18em] text-[#019e6e]">0{i + 1}</span>
                    <p className="text-sm font-semibold leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-xs font-black uppercase tracking-[0.16em] text-white/68 md:grid-cols-3">
            <span className="cut-corner-badge border border-white/12 bg-white/[0.05] px-4 py-3">Inclusive learning</span>
            <span className="cut-corner-badge border border-white/12 bg-white/[0.05] px-4 py-3">Clinical readiness</span>
            <span className="cut-corner-badge border border-white/12 bg-white/[0.05] px-4 py-3">Community impact</span>
          </div>
        </div>
      </section>

      {/* ====================== FAQ & FOOTER INFO ====================== */}
      <section id="faqs" className="scroll-mt-24 pt-10 pb-8 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <FAQSection />
          
          {SHOW_PUBLIC_SEO_SECTIONS && (
            <section className="py-10 md:py-16 border-y border-slate-100">
              <LinkGridSection title="Important Links" items={importantLinks} />
            </section>
          )}
        </div>
      </section>

    </>
  );
}
