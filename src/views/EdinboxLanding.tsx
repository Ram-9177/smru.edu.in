"use client";

import { useEffect, useState } from "react";
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
  FaPhone 
} from "react-icons/fa";
import useOpenApply from "@/hooks/useOpenApply";
import UniversitySectionHeader from "@/components/UniversitySectionHeader";

const HERO_IMAGE = "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1600&q=80";
const LAB_IMAGE = "https://images.unsplash.com/photo-1614308460973-0ecdaadfc13e?w=700&q=80";
const CTA_BG = "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1600&q=80";

export default function EdinboxLanding() {
  const openApply = useOpenApply();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0d315c] font-outfit">
      
      {/* ══════════════════════
           HERO SECTION
      ══════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#082244]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={HERO_IMAGE} 
            alt="Forensic Lab" 
            fill 
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d315c]/95 via-[#0d315c]/85 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 bg-[#ffaf3a]/10 border border-[#ffaf3a]/30 text-[#ffaf3a] px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em]">
                <FaCircle size={6} className="animate-pulse" />
                Now Admitting Nationwide
              </div>
              
              <div className="space-y-4">
                <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-bold">India's First Rehabilitation University</p>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                  B.SC <span className="text-[#ffaf3a] italic">FORENSIC</span><br />SCIENCE
                </h1>
              </div>

              <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                Build a career in one of India's most sought-after fields. Stmarys University × AIFSET makes forensic science education accessible to every eligible student in India via a single online entrance exam.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => openApply("forensic")}
                  className="cut-corner-badge bg-[#ffaf3a] text-[#0d315c] px-10 py-5 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                >
                  Register for AIFSET
                </button>
                <button 
                  onClick={() => openApply("forensic")}
                  className="cut-corner-badge border-2 border-white/30 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                >
                  Book Consultation
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
                {[
                  { num: "3×", label: "Attempts per Year" },
                  { num: "100%", label: "Online Exam" },
                  { num: "#1", label: "Rehab Univ. India" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black text-[#ffaf3a]">{stat.num}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative reveal">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white/10">
                <Image src={LAB_IMAGE} alt="Forensic Lab" width={600} height={400} className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#ffaf3a] p-8 cut-corner-badge shadow-2xl z-20">
                <div className="text-3xl font-black text-[#0d315c]">50+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0d315c]/60">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           ANNOUNCEMENT BAR
      ══════════════════════ */}
      <div className="bg-white border-b-4 border-[#ffaf3a] py-4 shadow-lg sticky top-[72px] z-40">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#ffaf3a] text-[#0d315c] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <FaBullhorn /> Admissions Open
            </span>
            <span className="text-sm font-bold text-[#0d315c]">Registration Open for B.Sc Forensic Science 2025–26</span>
          </div>
          <button 
            onClick={() => openApply("forensic")}
            className="bg-[#0d315c] text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#019e6e] transition-all flex items-center gap-2"
          >
            Explore Eligibility <FaArrowRight />
          </button>
        </div>
      </div>

      {/* ══════════════════════
           WHY Stmarys University SECTION
      ══════════════════════ */}
      <section className="py-24 bg-white" id="about">
        <div className="container mx-auto px-4">
          <UniversitySectionHeader 
            title={<>Why Join <span className="text-[#019e6e] italic">Stmarys University?</span></>}
            subtitle="Stmarys University and AIFSET eliminate the confusion around admissions — one exam, full support, and a university that stands alone in India."
            className="mb-16"
          />
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: FaBookOpen, title: "Rehab-Focused Curriculum", desc: "Specialised expertise across the world of health sciences and forensics." },
            { icon: FaHandsHelping, title: "Clinical Training & Outreach", desc: "Real-world facility training backed by a 100-bedded hospital on campus." },
            { icon: FaHistory, title: "50+ Years of Experience", desc: "A proven record of over 5,000 graduates placed across India since inception." },
            { icon: FaTrophy, title: "Top Placement Record", desc: "Consistent excellence in graduate placements in government and private sectors." },
            { icon: FaDumbbell, title: "Activity-Based Therapy", desc: "Practical, hands-on learning for real-world professional development." },
            { icon: FaFlask, title: "Simulation-Based Practice", desc: "State-of-the-art simulation labs accessible for our students." },
            { icon: FaUsers, title: "Multisensory Learning", desc: "All types of learners supported across diverse, inclusive pathways." },
            { icon: FaComments, title: "Peer-Led Discussions", desc: "Collaborative case study groups fostering teamwork and critical thinking." },
          ].map((item, idx) => (
            <div key={idx} className="reveal group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-[#0d315c] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-[#019e6e]/10 group-hover:bg-white flex items-center justify-center mb-6 transition-colors">
                <item.icon className="text-[#019e6e] text-2xl" />
              </div>
              <h5 className="text-lg font-black text-[#0d315c] group-hover:text-white mb-4 transition-colors">{item.title}</h5>
              <p className="text-slate-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════
           AIFSET ADVANTAGE
      ══════════════════════ */}
      <section className="py-24 bg-[#0d315c] relative overflow-hidden text-white" id="aifset">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#019e6e]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <UniversitySectionHeader 
                align="left"
                title={<>The <span className="text-[#ffaf3a]">AIFSET</span> Advantage</>}
                subtitle="The All India Forensic Science Entrance Test is conducted online, multiple times a year, and designed to be accessible to every eligible student in India. One exam — seamless admission to Stmarys University."
                titleClassName="text-white"
                subtitleClassName="text-white/70"
              />
            </div>
            <button 
              onClick={() => openApply("forensic")}
              className="bg-[#ffaf3a] text-[#0d315c] px-12 py-5 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge shadow-2xl hover:scale-105 transition-all"
            >
              Register for AIFSET <FaArrowRight className="inline ml-2" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaLaptopHouse, title: "100% Online", desc: "Appear from home on any device. No travel or exam centre required." },
              { icon: FaRedo, title: "3 Attempts / Year", desc: "Multiple attempts remove single-chance pressure and maximise your score." },
              { icon: FaMedal, title: "Early-Bird Scholarship", desc: "Merit-based scholarship seats available for early AIFSET applicants." },
            ].map((item, idx) => (
              <div key={idx} className="reveal p-10 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-all">
                <item.icon className="text-[#ffaf3a] text-4xl mx-auto mb-6" />
                <h5 className="text-xl font-black text-white mb-4">{item.title}</h5>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
           ELIGIBILITY SECTION
      ══════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <UniversitySectionHeader 
                align="left"
                title={<>Eligibility <span className="text-[#019e6e] italic">Criteria</span></>}
                subtitle="AIFSET is open to science students across India who meet these straightforward requirements — from any recognised board."
              />
              <button 
                onClick={() => openApply("forensic")}
                className="mt-10 bg-[#0d315c] text-white px-12 py-5 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge shadow-xl hover:bg-[#019e6e] transition-all"
              >
                Check My Eligibility
              </button>
            </div>

            <div className="reveal space-y-4">
              {[
                { icon: FaGraduationCap, label: "Qualification", value: "Class 12 pass or appearing from any recognised board in India" },
                { icon: FaAtom, label: "Stream", value: "Science — Physics, Chemistry with Biology (PCB) or Mathematics (PCM)" },
                { icon: FaChartBar, label: "Minimum Marks", value: "50% aggregate from a recognised board" },
                { icon: FaCalendarCheck, label: "Age Requirement", value: "17 years and above at the time of admission" },
                { icon: FaMapMarkedAlt, label: "Location", value: "Open to students from all states across India — no barriers" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#0d315c] to-[#019e6e] flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#0d315c]/60 mb-1">{item.label}</div>
                    <div className="text-slate-800 font-bold leading-relaxed">{item.value}</div>
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
          <UniversitySectionHeader 
            title={<>Admission <span className="text-[#019e6e] italic">Process</span></>}
            subtitle="A straightforward 5-step path from your home to a confirmed seat at Stmarys University — fully guided by AIFSET counsellors."
            className="mb-16"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-center gap-6">
            {[
              { num: "1", title: "Register for AIFSET", desc: "Visit the portal, fill your details, and pay the application fee." },
              { num: "2", title: "Appear for Exam", desc: "Take the AIFSET fully online from home. Any device, zero travel." },
              { num: "3", title: "Receive Score", desc: "Scores declared online. Up to 3 attempts per year." },
              { num: "4", title: "Apply to Stmarys University", desc: "Submit your AIFSET score directly to Stmarys University via the portal." },
              { num: "5", title: "Confirm Seat", desc: "Finalize documents, fee payment, and final seat confirmation." },
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col lg:flex-row items-center gap-6 flex-1 min-w-[240px]">
                <div className="reveal flex-1 p-8 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl hover:border-[#019e6e] transition-all group w-full">
                  <div className="w-14 h-14 rounded-full bg-[#0d315c] text-white flex items-center justify-center font-black text-2xl mx-auto mb-6 shadow-lg group-hover:bg-[#019e6e] transition-colors">
                    {step.num}
                  </div>
                  <h5 className="text-base font-black uppercase tracking-widest text-[#0d315c] mb-4">{step.title}</h5>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <FaChevronRight className="hidden lg:block text-[#ffaf3a] text-xl opacity-50" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button 
              onClick={() => openApply("forensic")}
              className="bg-[#ffaf3a] text-[#0d315c] px-12 py-5 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge shadow-2xl hover:scale-105 transition-all"
            >
              Start My Application <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           CAREERS SECTION
      ══════════════════════ */}
      <section className="py-24 bg-slate-50" id="careers">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <UniversitySectionHeader 
                align="left"
                title={<>What You Can <span className="text-[#019e6e] italic">Become</span></>}
                subtitle="A B.Sc Forensic Science from Stmarys University opens doors across government labs, law enforcement, private agencies, and research — nationwide."
              />
              <button 
                onClick={() => openApply("forensic")}
                className="mt-10 bg-[#0d315c] text-white px-12 py-5 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge shadow-xl hover:bg-[#019e6e] transition-all"
              >
                Explore the Degree
              </button>
            </div>

            <div className="reveal grid gap-4">
              {[
                { icon: FaMicroscope, title: "Forensic Scientist", sub: "Government & Private Forensic Laboratories" },
                { icon: FaSearchLocation, title: "Crime Scene Investigator", sub: "Police Departments, CBI, Intelligence Agencies" },
                { icon: FaDna, title: "DNA Analyst / Serologist", sub: "Forensic Science Laboratories, Research Institutes" },
                { icon: FaPills, title: "Forensic Toxicologist", sub: "AIIMS, Govt Hospitals, Poison Control Centres" },
                { icon: FaShieldAlt, title: "Cyber & Digital Forensics Expert", sub: "Tech Companies, Government Cyber Cells" },
                { icon: FaBalanceScale, title: "Forensic Consultant", sub: "Law Firms, Private Investigative Agencies" },
                { icon: FaChalkboardTeacher, title: "Researcher / Lecturer", sub: "Post-Graduation Pathways" },
              ].map((career, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all hover:translate-x-2 group">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-[#0d315c] to-[#019e6e] flex items-center justify-center text-white text-lg shadow-md">
                    <career.icon />
                  </div>
                  <div>
                    <div className="text-[#0d315c] font-black tracking-tight">{career.title}</div>
                    <div className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">{career.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           SCHOLARSHIP SECTION
      ══════════════════════ */}
      <section className="py-32 bg-gradient-to-br from-[#082244] to-[#0d315c] relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,#ffaf3a_0,transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#ffaf3a] font-black text-xs uppercase tracking-[0.4em] mb-6">Limited Opportunity</p>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
            Scholarships at <span className="text-[#ffaf3a] italic">Stmarys University</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Merit-based scholarship seats available for early AIFSET applicants. Limited intake — first come, first served. Don't miss your window.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openApply("forensic")}
              className="bg-[#ffaf3a] text-[#0d315c] px-12 py-5 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge shadow-2xl hover:scale-105 transition-all"
            >
              Secure My Scholarship Seat
            </button>
            <button className="border-2 border-white/20 text-white px-12 py-5 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge hover:bg-white/10 transition-all">
              View All Programmes
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-xs font-black uppercase tracking-widest">
            {["Forensic Biotechnology", "Stmarys Rehab University", "Forensic Science (B.Sc)", "AIFSET Counselled Intake"].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <FaCheckCircle className="text-[#ffaf3a]" /> {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
           TESTIMONIAL SECTION
      ══════════════════════ */}
      <section className="py-24 bg-[#082244] text-center">
        <div className="container mx-auto px-4">
          <FaQuoteLeft className="text-[#ffaf3a] text-6xl mx-auto mb-10 opacity-30" />
          <blockquote className="text-2xl md:text-4xl font-black text-white italic max-w-4xl mx-auto leading-tight tracking-tight">
            "At Stmarys University, I help learners find their voice — combining cutting-edge forensic science education with hands-on investigative training to transform every graduate into a highly sought-after professional."
          </blockquote>
          <div className="mt-12">
            <div className="text-[#ffaf3a] font-black uppercase tracking-[0.3em] text-sm">Dr. Shiva Deekshith</div>
            <div className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-2">Dean, School of Forensic Sciences — Stmarys University</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           FAQ SECTION
      ══════════════════════ */}
      <section className="py-24 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <UniversitySectionHeader 
              title={<>Frequently Asked <span className="text-[#019e6e] italic">Questions</span></>}
              className="mb-16"
            />

            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
              <div className="space-y-6">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <p className="text-[#0d315c] font-black uppercase tracking-widest text-[10px] mb-6">Dimensions</p>
                  <ul className="space-y-4 text-sm font-bold text-slate-500">
                    {["Admissions", "Programmes", "Campus & Facilities", "Scholarships", "Career Support"].map((item) => (
                      <li key={item} className="hover:text-[#019e6e] cursor-pointer transition-colors flex items-center gap-2">
                        <FaChevronRight size={10} className="text-[#ffaf3a]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { q: "Is AIFSET recognised by Stmarys University?", a: "Yes. Stmarys University accepts AIFSET scores as the primary admission pathway for B.Sc Forensic Science. It is the official and only entrance route for this programme through the AIFSET partnership." },
                  { q: "How many times can I take the AIFSET?", a: "You can take the AIFSET up to 3 times per year. This gives you multiple opportunities to achieve your best score without the pressure of a single attempt." },
                  { q: "Can I apply from outside Hyderabad?", a: "Absolutely. AIFSET is fully online and Stmarys University admits students from all states across India. Your location is not a barrier — all you need is an internet connection." },
                  { q: "Is there a scholarship available?", a: "Yes. Merit-based scholarships are available for eligible AIFSET applicants. Early registration significantly increases your chances of qualifying for scholarship seats." },
                  { q: "What is the eligibility for AIFSET?", a: "Class 12 with Physics, Chemistry, and Biology or Mathematics. Minimum 50% aggregate from a recognised board. Age 17 years and above." },
                  { q: "What support does AIFSET provide?", a: "AIFSET provides free academic counselling, document guidance, regional on-ground support across India, and complete hand-holding through every step." },
                ].map((faq, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className={`w-full flex items-center justify-between p-6 text-left transition-all ${activeFaq === idx ? "bg-[#0d315c] text-white" : "bg-white text-[#0d315c] hover:bg-slate-50"}`}
                    >
                      <span className="font-black text-sm uppercase tracking-wider">{faq.q}</span>
                      <FaPlus className={`transition-transform duration-300 ${activeFaq === idx ? "rotate-45 text-[#ffaf3a]" : "text-[#019e6e]"}`} />
                    </button>
                    {activeFaq === idx && (
                      <div className="p-6 bg-slate-50 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
           FINAL CTA SECTION
      ══════════════════════ */}
      <section className="py-32 relative overflow-hidden text-center text-white" id="register">
        <div className="absolute inset-0 z-0">
          <Image src={CTA_BG} alt="Forensic Science" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082244]/98 to-[#0d315c]/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#ffaf3a] font-black text-xs uppercase tracking-[0.4em] mb-6">Limited Seats Available</p>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
            Register for AIFSET.<br /><span className="text-[#ffaf3a] italic">Choose Stmarys University. Build India.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            India is training its next generation of forensic experts. Don't miss your admission window — seats are strictly limited per intake.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openApply("forensic")}
              className="bg-[#ffaf3a] text-[#0d315c] px-12 py-6 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge shadow-2xl hover:scale-105 transition-all flex items-center gap-3 justify-center"
            >
              <FaPenAlt /> Register for AIFSET
            </button>
            <button 
              onClick={() => openApply("forensic")}
              className="border-2 border-white/20 text-white px-12 py-6 font-black text-sm uppercase tracking-[0.2em] cut-corner-badge hover:bg-white/10 transition-all flex items-center gap-3 justify-center"
            >
              <FaPhone /> Book Free Consultation
            </button>
          </div>
          
          <div className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            Stmarys University × AIFSET Partnership &nbsp;·&nbsp; Telangana State Act University &nbsp;·&nbsp; 100% Online AIFSET Exam
          </div>
        </div>
      </section>

    </div>
  );
}
