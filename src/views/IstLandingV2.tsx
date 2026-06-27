"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaCertificate,
  FaUserTie,
  FaLaptopCode,
  FaShieldAlt,
  FaDatabase,
  FaBrain,
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaDownload
} from "react-icons/fa";
import useOpenApply from "@/hooks/useOpenApply";

const THEME = {
  primary: "#0d315c",    // Stmarys University Deep Blue
  secondary: "#019e6e",  // Stmarys University Teal/Green
  accent: "#ffaf3a",     // Stmarys University Orange
  istBlue: "#1d4ed8",    // Intellipaat Blue
  istDark: "#061a2f",    // Intellipaat Dark
};

const PROGRAMS = [
  {
    title: "B.Tech CSE (AI & Machine Learning)",
    desc: "Master the future of technology with deep expertise in neural networks, deep learning, and predictive modeling.",
    icon: <FaBrain />,
    color: "#6366f1",
  },
  {
    title: "B.Tech CSE (Data Science)",
    desc: "Harness the power of big data to drive decision-making and innovation across industries.",
    icon: <FaDatabase />,
    color: "#06b6d4",
  },
  {
    title: "B.Tech CSE (Cyber Security)",
    desc: "Protect the digital world by mastering advanced threat detection, ethical hacking, and network security.",
    icon: <FaShieldAlt />,
    color: "#ef4444",
  },
  {
    title: "B.Tech Computer Science",
    desc: "A comprehensive foundation in software engineering, algorithms, and full-stack development.",
    icon: <FaLaptopCode />,
    color: "#10b981",
  },
];

const HIGHLIGHTS = [
  {
    title: "UGC Recognized Degree",
    desc: "Earn a valid B.Tech degree from Stmarys University.",
    icon: <FaCertificate />,
  },
  {
    title: "Industry Certifications",
    desc: "Get certified by Microsoft and IIT Patna alongside your degree.",
    icon: <FaRocket />,
  },
  {
    title: "Placement Support",
    desc: "Access to 500+ hiring partners and dedicated career mentoring.",
    icon: <FaUserTie />,
  },
];

const TESTIMONIALS = [
  {
    name: "Ankit Solanki",
    role: "B.Tech Graduate",
    text: "The B.Tech program gave me the perfect mix of academic rigor and industry-relevant projects. The mentors were exceptional.",
    image: "/partners/ist/Ankit-Solanki-1.webp",
  },
  {
    name: "Bhawana Saxena",
    role: "B.Tech Graduate",
    text: "The practical exposure through hackathons and labs helped me transition smoothly into my corporate role.",
    image: "/partners/ist/Bhawana-Saxena.webp",
  },
];

const FAQS = [
  {
    q: "Is the B.Tech degree UGC recognized?",
    a: "Yes, the degree is awarded by Stmarys University, which is established under the Telangana Gazette Act and recognized by the UGC.",
  },
  {
    q: "What certifications will I receive?",
    a: "In addition to your B.Tech degree, you will earn industry-recognized certifications from IIT Patna and Microsoft as part of the curriculum.",
  },
  {
    q: "What is the placement support provided?",
    a: "Students receive placement assistance, including mock interviews, resume building, and access to hiring partner networks.",
  },
];

const IstLandingV2 = () => {
  const openApply = useOpenApply();

  const handleApply = () => {
    openApply("ist");
  };

  return (
    <div className="bg-white font-sans text-slate-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[#061a2f] overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1d4ed8]/10 rounded-full blur-[120px] -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#019e6e]/10 rounded-full blur-[100px] -ml-64 -mb-64" />

        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#ffaf3a] animate-pulse" />
                <span className="text-white/90 text-xs font-bold uppercase tracking-widest">Admissions Open 2026-27</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8">
                Next-Gen <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#019e6e]">
                  B.Tech Programs
                </span>
              </h1>

              <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
                Empowering the tech leaders of tomorrow with industry-integrated B.Tech programs in partnership with <strong className="text-white">Intellipaat</strong>. Get academic excellence and global career readiness.
              </p>

              <div className="flex flex-wrap gap-6">
                <button
                  onClick={handleApply}
                  className="px-10 py-5 bg-[#ffaf3a] text-[#0d315c] font-black uppercase tracking-widest text-sm cut-corner-badge hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/20"
                >
                  Apply Now
                </button>
                <button className="px-10 py-5 bg-white/10 text-white font-black uppercase tracking-widest text-sm cut-corner-badge border border-white/20 hover:bg-white/20 transition-all flex items-center gap-3">
                  <FaDownload className="text-xs" />
                  Syllabus
                </button>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                <div>
                  <div className="text-3xl font-black text-white mb-1">500+</div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Hiring Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">IIT Patna</div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Certification</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">Microsoft</div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Tech Partner</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:w-2/5 relative"
            >
              <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 cut-corner-panel p-8 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#1d4ed8] flex items-center justify-center text-white text-xl">
                      <FaRocket />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Degree + Certs</h3>
                      <p className="text-white/50 text-xs">Total Career Transformation</p>
                    </div>
                  </div>

                  <ul className="space-y-6">
                    {HIGHLIGHTS.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] mt-1">
                          <FaCheckCircle className="text-[#019e6e]" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                          <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#019e6e] text-white p-6 rounded-2xl shadow-2xl z-30 flex items-center gap-4 border-4 border-[#061a2f]">
                <div className="text-4xl font-black">95%</div>
                <div className="text-[10px] font-black uppercase leading-tight">Average <br />Placement <br />Success</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-[#1d4ed8] uppercase tracking-[0.3em] mb-4">Focus Areas</h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#0d315c] mb-6">Cutting-Edge Specializations</h3>
            <p className="text-slate-500 text-lg">
              Choose from industry-verified specializations designed to make you future-ready in the world of computer science.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((prog, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 cut-corner-panel shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group transition-all"
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mb-8 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${prog.color}15`, color: prog.color }}
                >
                  {prog.icon}
                </div>
                <h4 className="text-xl font-bold text-[#0d315c] mb-4">{prog.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{prog.desc}</p>
                <button className="mt-auto text-xs font-black uppercase tracking-widest text-[#1d4ed8] flex items-center gap-2 group-hover:gap-4 transition-all">
                  View Syllabus <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Stmarys University + Intellipaat Advantage */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#0d315c] cut-corner-panel overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-8">
                The Dual Advantage of Degree + Industry Ready
              </h3>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Why choose between a university degree and industry skills? Our partnership with Intellipaat brings you the best of both worlds—academic rigor and career transformation.
              </p>

              <div className="space-y-6">
                {[
                  "UGC Recognized B.Tech Degree from Stmarys University",
                  "Industry Mentorship from FAANG Experts",
                  "24/7 Support and Interactive Learning",
                  "Job Readiness through Live Capstone Projects"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/90 font-bold">
                    <FaCheckCircle className="text-[#019e6e] text-xl" />
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={handleApply}
                className="mt-12 px-10 py-5 bg-[#019e6e] text-white font-black uppercase tracking-widest text-sm cut-corner-badge hover:bg-emerald-600 transition-all"
              >
                Start Your Journey
              </button>
            </div>

            <div className="lg:w-1/2 relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Students collaborating"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0d315c] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl max-w-sm text-center">
                  <div className="text-6xl font-black text-[#ffaf3a] mb-2">30+</div>
                  <div className="text-white font-bold uppercase tracking-widest text-sm">Years of Educational Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-xs font-black text-[#1d4ed8] uppercase tracking-[0.3em] mb-4">Alumni Success</h2>
              <h3 className="text-4xl font-black text-[#0d315c] mb-6">Where Our Graduates Work</h3>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Join our network of alumni who are now working at top-tier organizations globally.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {["Amazon", "Microsoft", "Google", "Meta", "Adobe", "Netflix"].map((brand, i) => (
                  <div key={i} className="h-16 bg-white rounded-2xl flex items-center justify-center font-black text-slate-300 text-xs border border-slate-100 uppercase tracking-tighter">
                    {brand}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white p-10 cut-corner-panel shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-6xl text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaQuoteLeft />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <img src={t.image} alt={t.name} className="w-16 h-16 cut-corner-badge object-cover shadow-lg" />
                      <div>
                        <h4 className="text-lg font-bold text-[#0d315c]">{t.name}</h4>
                        <p className="text-[#1d4ed8] text-xs font-black uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 italic leading-relaxed">"{t.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-[#0d315c] mb-4">Frequently Asked Questions</h3>
            <p className="text-slate-500">Everything you need to know about the B.Tech program.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-slate-50 cut-corner-panel border border-slate-100 overflow-hidden transition-all">
                <summary className="p-8 font-bold text-[#0d315c] cursor-pointer list-none flex justify-between items-center group-open:bg-[#0d315c] group-open:text-white transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="p-8 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-[#1d4ed8] p-12 md:p-24 cut-corner-panel text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                Your Tech Career <br />Starts Here.
              </h2>
              <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto">
                Applications for the 2025-26 academic session are now closing. Secure your seat today.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button
                  onClick={handleApply}
                  className="px-12 py-6 bg-white text-[#1d4ed8] font-black uppercase tracking-widest text-sm cut-corner-badge hover:scale-105 transition-all shadow-2xl"
                >
                  Apply Now
                </button>
                <button className="px-12 py-6 bg-transparent border-2 border-white/30 text-white font-black uppercase tracking-widest text-sm cut-corner-badge hover:bg-white/10 transition-all">
                  Request Callback
                </button>
              </div>
              <p className="mt-12 text-white/50 text-xs font-bold uppercase tracking-[0.2em]">
                Stmarys University × Intellipaat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-10 border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[#0d315c] font-black text-xl">Stmarys University × IST</div>
          <div className="text-slate-400 text-sm">© 2025 Stmarys University. All Rights Reserved.</div>
          <div className="flex gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <a href="/privacy-policy" className="hover:text-[#1d4ed8]">Privacy</a>
            <a href="/terms-of-service" className="hover:text-[#1d4ed8]">Terms</a>
            <a href="/contact" className="hover:text-[#1d4ed8]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IstLandingV2;
