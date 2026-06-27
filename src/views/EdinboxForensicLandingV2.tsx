"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCircle,
  FaBullhorn,
  FaBookOpen,
  FaHandsHelping,
  FaHistory,
  FaTrophy,
  FaDumbbell,
  FaFlask,
  FaUsers,
  FaComments,
  FaLaptopHouse,
  FaRedo,
  FaMedal,
  FaGraduationCap,
  FaAtom,
  FaChartBar,
  FaCalendarCheck,
  FaMapMarkedAlt,
  FaChevronRight,
  FaMicroscope,
  FaSearchLocation,
  FaDna,
  FaPills,
  FaShieldAlt,
  FaBalanceScale,
  FaChalkboardTeacher,
  FaQuoteLeft,
  FaPlus,
  FaPenAlt,
  FaPhone,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa";
import useOpenApply from "@/hooks/useOpenApply";
import { SITE_SOCIAL_LINKS } from "@/lib/shared/site-constants";

const HERO_IMAGE = "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1600&q=80";
const LAB_IMAGE = "https://images.unsplash.com/photo-1614308460973-0ecdaadfc13e?w=700&q=80";
const CTA_BG = "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1600&q=80";

// Color Palette (Teal & Orange)
const colors = {
  teal: "#1b5c48",
  tealDark: "#133d30",
  tealLight: "#227055",
  tealHover: "#2a8c6a",
  orange: "#e8971f",
  orangeLight: "#f5b042",
};

const smruSocialLinks = [
  { icon: FaFacebookF, href: SITE_SOCIAL_LINKS.facebook, label: "Stmarys University Facebook" },
  { icon: FaInstagram, href: SITE_SOCIAL_LINKS.instagram, label: "Stmarys University Instagram" },
  { icon: FaYoutube, href: SITE_SOCIAL_LINKS.youtube, label: "Stmarys University YouTube" },
  { icon: FaLinkedinIn, href: SITE_SOCIAL_LINKS.linkedin, label: "Stmarys University LinkedIn" },
];

export default function EdinboxForensicLandingV2() {
  const openApply = useOpenApply();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const handleLandingApply = (event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    openApply("forensic");
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-[#1a2e28]">
      {/* ══════════════════════
           TOP UTILITY BAR
      ══════════════════════ */}
      <div className="bg-[#0f2d23] py-2 text-[12px] text-white/70">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:08071296016" className="hover:text-[#e8971f] transition-colors flex items-center gap-1.5">
              <FaPhone className="text-[10px]" /> 08071296016
            </a>
            <a href="mailto:support@edinbox.com" className="hover:text-[#e8971f] transition-colors flex items-center gap-1.5 border-l border-white/15 pl-4">
              <FaEnvelope className="text-[10px]" /> support@edinbox.com
            </a>
            <span className="hidden sm:flex items-center gap-1.5 border-l border-white/15 pl-4">
              <FaMapMarkerAlt className="text-[10px]" /> Hyderabad, Telangana
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-r border-white/15 pr-4">
              {smruSocialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-[#e8971f] transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
            <a href="/admissions"
              onClick={handleLandingApply} className="bg-[#e8971f] text-white px-4 py-1 rounded font-bold hover:bg-[#f5b042] transition-colors">
              Apply Now
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════
           MAIN NAVBAR
      ══════════════════════ */}
      <nav className="bg-[#1b5c48] sticky top-0 z-[1000] shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between h-[65px]">
          <div className="flex items-center gap-6 border-r border-white/15 pr-6 h-full py-2">
            <div className="flex flex-col leading-none">
              <span className="font-outfit text-xl font-black text-white tracking-wider">Stmarys</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/65">Rehabilitation University</span>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleNav} className="text-white text-2xl">
              {isNavOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <ul className={`lg:flex items-stretch h-full font-bold text-[14px] text-white/90 gap-1 ${isNavOpen ? 'absolute top-full left-0 w-full bg-[#1b5c48] flex-col p-4 space-y-2 h-auto shadow-xl' : 'hidden'}`}>
            <li className="flex"><a href="/partner/edinbox" className="flex items-center px-4 hover:bg-[#133d30] hover:border-b-4 hover:border-[#e8971f] active">Home</a></li>
            <li className="relative group flex items-center px-4 cursor-pointer hover:bg-[#133d30]">
              About <FaChevronRight className="ml-1.5 text-[10px] rotate-90" />
            </li>
            <li className="relative group flex items-center px-4 cursor-pointer hover:bg-[#133d30]">
              Schools <FaChevronRight className="ml-1.5 text-[10px] rotate-90" />
            </li>
            <li className="relative group flex items-center px-4 cursor-pointer hover:bg-[#133d30]">
              Admissions <FaChevronRight className="ml-1.5 text-[10px] rotate-90" />
            </li>
            <li className="flex"><a href="#careers" className="flex items-center px-4 hover:bg-[#133d30]">Careers</a></li>
            <li className="flex"><a href="/contact" className="flex items-center px-4 hover:bg-[#133d30]">Contact</a></li>
          </ul>

          <div className="hidden lg:flex items-center ml-auto pl-4">
            <a href="/admissions"
              onClick={handleLandingApply} className="bg-[#e8971f] text-white px-6 py-2.5 rounded font-black text-[13px] uppercase tracking-wider hover:bg-[#f5b042] transform hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-lg">
              Register for AIFSET <FaArrowRight />
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════
           HERO SECTION
      ══════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#133d30]">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Forensic Lab"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d23]/95 via-[#1b5c48]/85 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-3 bg-[#e8971f]/15 border border-[#e8971f]/50 text-[#f5b042] px-4 py-1.5 rounded text-[12px] font-black uppercase tracking-[0.18em] mb-6">
                <FaCircle size={6} className="animate-pulse" />
                Now Admitting Nationwide
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-white/75 text-lg font-light tracking-[0.15em] uppercase">India's First Rehabilitation University</p>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tight font-outfit">
                  B.Sc <span className="text-[#f5b042] italic">Forensic</span><br />Science
                </h1>
              </div>

              <p className="text-white/85 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light">
                Build a career in one of India's most sought-after fields. Stmarys University × AIFSET makes forensic science education accessible to every eligible student in India — via a single online entrance exam.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <a
                  href="/admissions"
              onClick={handleLandingApply}
                  className="bg-[#e8971f] text-white px-10 py-5 font-black text-[14px] uppercase tracking-wider rounded text-center shadow-[0_10px_30px_rgba(232,151,31,0.4)] hover:bg-[#f5b042] transform hover:-translate-y-1 transition-all"
                >
                  Register for AIFSET
                </a>
                <a
                  href="#about"
                  className="bg-transparent border-2 border-white/40 text-white px-10 py-5 font-black text-[14px] uppercase tracking-wider rounded text-center hover:border-white hover:bg-white/5 transition-all"
                >
                  Book Free Consultation
                </a>
              </div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/15">
                {[
                  { value: "3×", label: "Attempts per Year" },
                  { value: "100%", label: "Online Exam" },
                  { value: "#1", label: "Rehab Univ. India" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-3xl font-black text-[#f5b042] font-outfit">{stat.value}</span>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-white/55 font-bold mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative reveal">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/10 group">
                <Image src={LAB_IMAGE} alt="Forensic Lab" width={600} height={400} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#1b5c48]/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#e8971f] p-8 rounded shadow-2xl z-20 flex flex-col items-center justify-center min-w-[160px]">
                <div className="text-4xl font-black text-white font-outfit leading-none">50+</div>
                <div className="text-[11px] font-black uppercase tracking-widest text-white/80 mt-2">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           ANNOUNCEMENT BAR
      ══════════════════════ */}
      <div className="bg-white border-b-4 border-[#e8971f] py-4 shadow-xl relative z-40">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#e8971f] text-white px-4 py-1.5 rounded font-black text-[11px] uppercase tracking-widest flex items-center gap-2">
              <FaBullhorn /> Admissions Open
            </span>
            <span className="text-[15px] font-black text-[#1a2e28] tracking-tight">Registration Open for B.Sc Forensic Science 2025–26</span>
          </div>
          <a
            href="/admissions"
              onClick={handleLandingApply}
            className="bg-[#1b5c48] text-white px-6 py-2 rounded font-black text-[12px] uppercase tracking-wider hover:bg-[#227055] transition-all flex items-center gap-2 shadow-md"
          >
            Explore Eligibility <FaArrowRight />
          </a>
        </div>
      </div>

      {/* ══════════════════════
           WHY Stmarys University SECTION
      ══════════════════════ */}
      <section className="py-24 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20 reveal">
            <p className="text-[#e8971f] font-black text-[12px] uppercase tracking-[0.25em] mb-4">Two Missions, One Purpose</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a2e28] font-outfit mb-6 italic">Why Join <span className="text-[#1b5c48] not-italic">Stmarys University?</span></h2>
            <div className="w-16 h-1 bg-[#e8971f] mx-auto mb-8" />
            <p className="text-lg text-[#3d5a52] leading-relaxed">
              Stmarys University and AIFSET eliminate the confusion around admissions — one exam, full support, and a university that stands alone in India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <FaBookOpen />, title: "Rehab-Focused Curriculum", desc: "Specialised expertise across the world of health sciences and forensics." },
              { icon: <FaHandsHelping />, title: "Clinical Training & Outreach", desc: "Real-world facility training backed by a 100-bedded hospital on campus." },
              { icon: <FaHistory />, title: "50+ Years of Experience", desc: "A proven record of over 5,000 graduates placed across India since inception." },
              { icon: <FaTrophy />, title: "Top Placement Record", desc: "Consistent excellence in graduate placements in government and private sectors." },
              { icon: <FaDumbbell />, title: "Activity-Based Therapy", desc: "Practical, hands-on learning for real-world professional development." },
              { icon: <FaFlask />, title: "Simulation-Based Practice", desc: "State-of-the-art simulation labs accessible for our students." },
              { icon: <FaUsers />, title: "Multisensory Learning", desc: "All types of learners supported across diverse, inclusive pathways." },
              { icon: <FaComments />, title: "Peer-Led Discussions", desc: "Collaborative case study groups fostering teamwork and critical thinking." },
            ].map((item, idx) => (
              <div key={idx} className="reveal group p-8 rounded-xl bg-[#f4f7f5] border border-[#d0ddd8] hover:bg-white hover:shadow-[0_20px_50px_rgba(27,92,72,0.12)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-[#1b5c48]/10 group-hover:bg-[#1b5c48] group-hover:text-white flex items-center justify-center text-[#1b5c48] text-2xl mb-6 transition-all duration-300">
                  {item.icon}
                </div>
                <h5 className="text-[16px] font-black text-[#1a2e28] mb-3 leading-tight">{item.title}</h5>
                <p className="text-[#6b8a80] text-[13px] leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
           AIFSET ADVANTAGE (TEAL)
      ══════════════════════ */}
      <section className="py-24 bg-[#1b5c48] relative overflow-hidden text-white" id="aifset">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-[250px] -mt-[250px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="max-w-2xl reveal">
              <p className="text-[#f5b042] font-black text-[12px] uppercase tracking-[0.25em] mb-4">National Entrance Examination</p>
              <h2 className="text-4xl md:text-5xl font-black text-white font-outfit mb-6 italic">The <span className="text-[#f5b042] not-italic">AIFSET</span> Advantage</h2>
              <div className="w-16 h-1 bg-[#f5b042] mb-8" />
              <p className="text-lg text-white/75 leading-relaxed font-light">
                The All India Forensic Science Entrance Test is conducted online, multiple times a year, and designed to be accessible to every eligible student in India. One exam — seamless admission to Stmarys University.
              </p>
            </div>
            <a
              href="/admissions"
              onClick={handleLandingApply}
              className="reveal bg-[#e8971f] text-white px-12 py-5 font-black text-[15px] uppercase tracking-wider rounded shadow-2xl hover:bg-[#f5b042] transform hover:scale-105 transition-all flex items-center gap-3"
            >
              Register for AIFSET <FaArrowRight />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaLaptopHouse />, title: "100% Online", desc: "Appear from home on any device. No travel or exam centre required." },
              { icon: <FaRedo />, title: "3 Attempts / Year", desc: "Multiple attempts remove single-chance pressure and maximise your score." },
              { icon: <FaMedal />, title: "Early-Bird Scholarship", desc: "Merit-based scholarship seats available for early AIFSET applicants." },
            ].map((item, idx) => (
              <div key={idx} className="reveal p-10 bg-white/10 border border-white/20 rounded-xl text-center hover:bg-white/15 transition-all group">
                <div className="text-4xl text-[#f5b042] mb-6 flex justify-center transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h5 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h5>
                <p className="text-white/60 text-[14px] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
           ELIGIBILITY SECTION
      ══════════════════════ */}
      <section className="py-24 bg-[#f4f7f5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-[#e8971f] font-black text-[12px] uppercase tracking-[0.25em] mb-4">Who Can Apply</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a2e28] font-outfit mb-6 italic">Eligibility <span className="text-[#1b5c48] not-italic">Criteria</span></h2>
              <div className="w-16 h-1 bg-[#1b5c48] mb-8" />
              <p className="text-lg text-[#3d5a52] leading-relaxed mb-10">
                AIFSET is open to science students across India who meet these straightforward requirements — from any recognised board.
              </p>
              <a
                href="/admissions"
              onClick={handleLandingApply}
                className="bg-[#1b5c48] text-white px-10 py-5 font-black text-[14px] uppercase tracking-wider rounded shadow-xl hover:bg-[#227055] transition-all inline-block"
              >
                Check My Eligibility
              </a>
            </div>

            <div className="reveal space-y-4">
              {[
                { icon: <FaGraduationCap />, label: "Qualification", value: "Class 12 pass or appearing from any recognised board in India" },
                { icon: <FaAtom />, label: "Stream", value: "Science — Physics, Chemistry with Biology (PCB) or Mathematics (PCM)" },
                { icon: <FaChartBar />, label: "Minimum Marks", value: "50% aggregate from a recognised board" },
                { icon: <FaCalendarCheck />, label: "Age Requirement", value: "17 years and above at the time of admission" },
                { icon: <FaMapMarkedAlt />, label: "Location", value: "Open to students from all states across India — no barriers" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 bg-white border border-[#d0ddd8] rounded-xl hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 shrink-0 rounded bg-gradient-to-br from-[#1b5c48] to-[#227055] flex items-center justify-center text-white text-xl shadow-lg transform group-hover:rotate-6 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#1b5c48]/60 mb-1">{item.label}</div>
                    <div className="text-[#1a2e28] font-black leading-snug">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           ADMISSION PROCESS
      ══════════════════════ */}
      <section className="py-24 bg-white" id="process">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20 reveal">
            <p className="text-[#e8971f] font-black text-[12px] uppercase tracking-[0.25em] mb-4">Step-by-Step</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a2e28] font-outfit mb-6 italic">Admission <span className="text-[#1b5c48] not-italic">Process</span></h2>
            <div className="w-16 h-1 bg-[#e8971f] mx-auto mb-8" />
            <p className="text-lg text-[#3d5a52] leading-relaxed">
              A straightforward 5-step path from your home to a confirmed seat at Stmarys University — fully guided by AIFSET counsellors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            {[
              { num: "1", title: "Register for AIFSET", desc: "Visit the portal, fill your details, and pay the application fee — done in under 10 minutes." },
              { num: "2", title: "Appear for Exam", desc: "Take the AIFSET fully online from home. Any device, any location, zero travel." },
              { num: "3", title: "Receive Score", desc: "Scores declared online. Up to 3 attempts per year — maximise your result." },
              { num: "4", title: "Apply to Stmarys University", desc: "Submit your AIFSET score directly to Stmarys University via the AIFSET counselling portal." },
              { num: "5", title: "Confirm Seat", desc: "AIFSET counsellors guide you through docs, fee payment, and final seat confirmation." },
            ].map((step, idx) => (
              <div key={idx} className="reveal relative">
                <div className="h-full p-8 bg-white border border-[#d0ddd8] rounded-xl text-center shadow-sm hover:shadow-xl hover:border-[#1b5c48] transition-all group flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#1b5c48] text-white flex items-center justify-center font-black text-2xl font-outfit mb-6 shadow-[0_5px_15px_rgba(27,92,72,0.3)] group-hover:bg-[#e8971f] group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <h5 className="text-[14px] font-black uppercase tracking-wider text-[#1a2e28] mb-4 leading-tight">{step.title}</h5>
                  <p className="text-[#6b8a80] text-[13px] leading-relaxed font-medium">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 text-[#e8971f] text-xl animate-pulse">
                    <FaChevronRight />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16 reveal">
            <a
              href="/admissions"
              onClick={handleLandingApply}
              className="bg-[#e8971f] text-white px-12 py-5 font-black text-[15px] uppercase tracking-wider rounded shadow-2xl hover:bg-[#f5b042] transform hover:-translate-y-1 transition-all inline-flex items-center gap-3"
            >
              Start My Application <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           CAREER SCOPE
      ══════════════════════ */}
      <section className="py-24 bg-[#f4f7f5]" id="careers">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-[#e8971f] font-black text-[12px] uppercase tracking-[0.25em] mb-4">Career Scope</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a2e28] font-outfit mb-6 italic">What You Can <span className="text-[#1b5c48] not-italic">Become</span></h2>
              <div className="w-16 h-1 bg-[#1b5c48] mb-8" />
              <p className="text-lg text-[#3d5a52] leading-relaxed mb-8">
                A B.Sc Forensic Science from Stmarys University opens doors across government labs, law enforcement, private agencies, and research — nationwide.
              </p>
              <a
                href="/admissions"
              onClick={handleLandingApply}
                className="bg-[#1b5c48] text-white px-10 py-5 font-black text-[14px] uppercase tracking-wider rounded shadow-xl hover:bg-[#227055] transition-all inline-block"
              >
                Explore the Degree
              </a>
            </div>

            <div className="grid gap-3 reveal">
              {[
                { icon: <FaMicroscope />, title: "Forensic Scientist", sub: "Government & Private Forensic Laboratories" },
                { icon: <FaSearchLocation />, title: "Crime Scene Investigator", sub: "Police Departments, CBI, Intelligence Agencies" },
                { icon: <FaDna />, title: "DNA Analyst / Serologist", sub: "Forensic Science Laboratories, Research Institutes" },
                { icon: <FaPills />, title: "Forensic Toxicologist", sub: "AIIMS, Govt Hospitals, Poison Control Centres" },
                { icon: <FaShieldAlt />, title: "Cyber & Digital Forensics Expert", sub: "Tech Companies, Government Cyber Cells, CERT-In" },
                { icon: <FaBalanceScale />, title: "Forensic Consultant", sub: "Law Firms, Private Investigative Agencies" },
                { icon: <FaChalkboardTeacher />, title: "Researcher / Lecturer", sub: "After Post-Graduation — Universities" },
              ].map((career, idx) => (
                <div key={idx} className="flex items-center gap-6 p-4 bg-white border border-[#d0ddd8] rounded-lg hover:shadow-md hover:translate-x-2 transition-all group">
                  <div className="w-12 h-12 shrink-0 rounded bg-gradient-to-br from-[#1b5c48] to-[#227055] flex items-center justify-center text-white text-lg shadow-md group-hover:scale-110 transition-transform">
                    {career.icon}
                  </div>
                  <div>
                    <div className="text-[#1a2e28] font-black leading-tight tracking-tight">{career.title}</div>
                    <div className="text-[#6b8a80] text-[11px] font-bold uppercase tracking-widest mt-1">{career.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           SCHOLARSHIP (TEAL GRADIENT)
      ══════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#133d30] via-[#1b5c48] to-[#133d30] relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(232,151,31,0.15)_0,transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#f5b042] font-black text-[12px] uppercase tracking-[0.4em] mb-6">Limited Opportunity</p>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 font-outfit">
            Scholarships at <span className="text-[#f5b042] italic">Stmarys University</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Merit-based scholarship seats available for early AIFSET applicants. Limited intake — first come, first served. Don't miss your window.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="/admissions"
              onClick={handleLandingApply}
              className="bg-[#e8971f] text-white px-12 py-5 font-black text-[15px] uppercase tracking-wider rounded shadow-[0_10px_30px_rgba(232,151,31,0.3)] hover:bg-[#f5b042] transform hover:scale-105 transition-all"
            >
              Secure My Scholarship Seat
            </a>
            <a
              href="/schools"
              className="bg-transparent border-2 border-white/30 text-white px-12 py-5 font-black text-[15px] uppercase tracking-wider rounded hover:border-white hover:bg-white/5 transition-all"
            >
              View All Programmes
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-white/50 text-[12px] font-black uppercase tracking-[0.15em]">
            {[
              "Forensic Biotechnology",
              "Stmarys Rehab University",
              "Forensic Science (B.Sc)",
              "AIFSET Counselled Intake"
            ].map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <FaCheckCircle className="text-[#f5b042]" /> {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
           TESTIMONIAL SECTION
      ══════════════════════ */}
      <section className="py-24 bg-[#0f2d23] text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <FaQuoteLeft className="text-[#e8971f] text-6xl mx-auto mb-10 opacity-30" />
          <blockquote className="text-2xl md:text-4xl font-black text-white italic max-w-4xl mx-auto leading-[1.3] tracking-tight font-outfit mb-12">
            "At Stmarys University, I help learners find their voice — combining cutting-edge forensic science education with hands-on investigative training to transform every graduate into a highly sought-after professional."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="text-[#f5b042] font-black uppercase tracking-[0.3em] text-sm">Dr. Shiva Deekshith</div>
            <div className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Dean, School of Forensic Sciences — Stmarys University</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           FAQ SECTION
      ══════════════════════ */}
      <section className="py-24 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 reveal">
            <p className="text-[#e8971f] font-black text-[12px] uppercase tracking-[0.25em] mb-4">Got Questions?</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a2e28] font-outfit italic">Frequently Asked <span className="text-[#1b5c48] not-italic">Questions</span></h2>
            <div className="w-16 h-1 bg-[#1b5c48] mx-auto mt-6" />
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-12">
            <div className="reveal">
              <div className="bg-[#f4f7f5] p-8 rounded-xl border border-[#d0ddd8]">
                <p className="text-[#1b5c48] font-black uppercase tracking-[0.2em] text-[11px] mb-8">Dimensions</p>
                <ul className="space-y-4">
                  {["Admissions", "Programmes", "Campus & Facilities", "Scholarships", "Career Support"].map((item) => (
                    <li key={item} className="group">
                      <a href="#faq" className="text-[#3d5a52] font-black text-[14px] hover:text-[#1b5c48] transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8971f] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 reveal">
              {[
                { q: "Is AIFSET recognised by Stmarys University?", a: "Yes. Stmarys University accepts AIFSET scores as the primary admission pathway for B.Sc Forensic Science. It is the official and only entrance route for this programme through the AIFSET partnership." },
                { q: "How many times can I take the AIFSET?", a: "You can take the AIFSET up to 3 times per year. This gives you multiple opportunities to achieve your best score without the pressure of a single attempt." },
                { q: "Can I apply from outside Hyderabad?", a: "Absolutely. AIFSET is fully online and Stmarys University admits students from all states across India. Your location is not a barrier — all you need is an internet connection and the right qualifications." },
                { q: "Is there a scholarship available?", a: "Yes. Merit-based scholarships are available for eligible AIFSET applicants. Early registration significantly increases your chances of qualifying for the early-bird scholarship seats." },
                { q: "What is the eligibility for AIFSET?", a: "Class 12 with Physics, Chemistry, and Biology or Mathematics. Minimum 50% aggregate from a recognised board. Age 17 years and above at the time of admission." },
                { q: "What support does AIFSET provide?", a: "AIFSET provides free academic counselling, document guidance, regional on-ground support across India, and complete hand-holding through every step of the Stmarys University admission process." },
              ].map((faq, idx) => (
                <div key={idx} className="border border-[#d0ddd8] rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${activeFaq === idx ? "bg-[#1b5c48] text-white" : "bg-white text-[#1a2e28] hover:bg-[#f4f7f5]"}`}
                  >
                    <span className="font-black text-[15px] leading-tight tracking-tight">{faq.q}</span>
                    <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center transition-all ${activeFaq === idx ? "bg-[#e8971f] text-white rotate-45" : "bg-[#1b5c48] text-white"}`}>
                      <FaPlus className="text-xs" />
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="p-6 bg-[#f4f7f5] text-[#3d5a52] text-[14px] leading-relaxed border-t border-[#d0ddd8]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           FINAL CTA BANNER
      ══════════════════════ */}
      <section className="py-24 relative overflow-hidden text-center text-white" id="register">
        <div className="absolute inset-0">
          <Image src={CTA_BG} alt="Forensic Science" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d23]/98 via-[#1b5c48]/95 to-[#1b5c48]/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#f5b042] font-black text-[12px] uppercase tracking-[0.4em] mb-6">Limited Seats Available</p>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10 font-outfit">
            Register for AIFSET.<br /><span className="text-[#f5b042] italic">Choose Stmarys University. Build India.</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            India is training its next generation of forensic experts. Don't miss your admission window — seats are strictly limited per intake.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/admissions"
              onClick={handleLandingApply}
              className="bg-[#e8971f] text-white px-12 py-6 font-black text-[15px] uppercase tracking-wider rounded shadow-2xl hover:bg-[#f5b042] transform hover:scale-105 transition-all flex items-center gap-3 justify-center"
            >
              <FaPenAlt /> Register for AIFSET
            </a>
            <a
              href="/contact"
              onClick={handleLandingApply}
              className="bg-transparent border-2 border-white/40 text-white px-12 py-6 font-black text-[15px] uppercase tracking-wider rounded hover:border-white hover:bg-white/5 transition-all flex items-center gap-3 justify-center"
            >
              <FaPhone /> Book Free Consultation
            </a>
          </div>

          <div className="mt-16 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 space-x-4">
            <span>Stmarys University × AIFSET Partnership</span>
            <span className="hidden sm:inline">|</span>
            <span>Telangana State Act University</span>
            <span className="hidden sm:inline">|</span>
            <span>100% Online AIFSET Exam</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           FOOTER (MINI)
      ══════════════════════ */}
      <footer className="bg-[#0f2d23] pt-20 pb-10 text-white/50 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex flex-col mb-6">
                <span className="font-outfit text-2xl font-black text-white leading-none">Stmarys</span>
                <span className="text-[12px] font-bold text-[#f5b042] italic mt-1">Rehabilitation University</span>
              </div>
              <p className="text-[13px] leading-relaxed mb-8 pr-4">
                A specialized university framework for rehabilitation-led and forensic sciences education.
              </p>
              <div className="flex gap-3">
                {smruSocialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 border border-white/10 rounded flex items-center justify-center hover:bg-[#1b5c48] hover:border-[#1b5c48] hover:text-white transition-all">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8 border-b-2 border-[#e8971f] inline-block pb-1">Quick Routes</h4>
              <ul className="space-y-3 text-[14px]">
                <li><a href="#about" className="hover:text-[#f5b042] transition-colors">About Stmarys University</a></li>
                <li><a href="#aifset" className="hover:text-[#f5b042] transition-colors">AIFSET Entrance</a></li>
                <li><a href="/schools" className="hover:text-[#f5b042] transition-colors">Academic Schools</a></li>
                <li><a href="/admissions" className="hover:text-[#f5b042] transition-colors">Admissions 2025</a></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8 border-b-2 border-[#e8971f] inline-block pb-1">Legal Route</h4>
              <ul className="space-y-3 text-[14px]">
                <li><a href="/privacy-policy" className="hover:text-[#f5b042] transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-[#f5b042] transition-colors">Terms of Service</a></li>
                <li><a href="/mandatory-disclosure" className="hover:text-[#f5b042] transition-colors">Mandatory Disclosure</a></li>
                <li><a href="/contact" className="hover:text-[#f5b042] transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8 border-b-2 border-[#e8971f] inline-block pb-1">Connect</h4>
              <div className="space-y-4 text-[14px]">
                <div className="flex gap-3">
                  <FaPhone className="text-[#e8971f] mt-1 shrink-0" />
                  <span>08071296016</span>
                </div>
                <div className="flex gap-3">
                  <FaEnvelope className="text-[#e8971f] mt-1 shrink-0" />
                  <span>support@edinbox.com</span>
                </div>
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-[#e8971f] mt-1 shrink-0" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest">
            <p>© 2026 Stmarys University. All Rights Reserved.</p>
            <p>Institutional Partner: <span className="text-white">Edinbox</span></p>
          </div>
        </div>
      </footer>

      {/* Reveal animations styles */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
