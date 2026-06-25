// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaArrowRight,
  FaBalanceScale,
  FaBookOpen,
  FaBriefcase,
  FaCheckCircle,
  FaEnvelope,
  FaGavel,
  FaGraduationCap,
  FaHandshake,
  FaLandmark,
  FaMicroscope,
  FaPaperPlane,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import useOpenApply from "../hooks/useOpenApply";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import CtplFormWidget from "../components/CtplFormWidget";

const LAW_CTPL_FORM_ID = "1c76a1c8dbc7278676884e00e5a46d7f54115d6b49a81b2210941f1a12f6771a";

const heroChips = ["Moot Court Training", "Legal Aid Cell", "AI Regulation & Data Sovereignty", "Forensic Jurisprudence"];
const personName = "Prof. N. R. Madhava Menon";
const lawQuoteProfile = {
  image: "/assets/law/Heroimage.webp",
  name: personName,
  quote: "Law is a tool for social engineering and lawyers are the architects of an equal and just society",
};

const sectionLinks = [
  ["About", "#about"],
  ["Programmes", "#programmes"],
  ["Careers", "#careers"],
  ["Facilities", "#facilities"],
  ["Faculty", "#faculty"],
  ["Admissions", "#admissions"],
  ["Recognition", "#recognition"],
  ["Contact", "#contact"],
];

const sectionScrollOffset = "scroll-mt-[150px] md:scroll-mt-[170px]";

const featureCards = [
  ["Practice-Driven Legal Education", "Learning supported by moot courts, legal aid, internships, workshops, and clinical exposure."],
  ["Emerging Law Focus", "Exposure to areas such as AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and Forensic Jurisprudence."],
  ["Community Justice Orientation", "Legal Aid Cell activities connect students with social responsibility and access-to-justice needs."],
  ["Ethics & Professional Readiness", "Emphasis on constitutional values, legal reasoning, advocacy, drafting, and professional conduct."],
];

const actionCards = [
  ["Moot Court Training", "Simulated courtroom practice helps students develop advocacy, oratory, analytical, and courtroom presentation skills.", FaGavel],
  ["Legal Aid & Community Justice", "Students engage with legal literacy, rural legal aid camps, urban legal awareness, and community-focused legal service.", FaHandshake],
  ["Emerging Law & Technology", "Academic exposure includes AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and digital legal challenges.", FaMicroscope],
  ["Research & Publication", "The Research and Publication Cell supports research papers, seminars, conferences, and legal scholarship.", FaBookOpen],
  ["ADR & Arbitration", "Dedicated training in negotiation, mediation, arbitration, drafting arbitration clauses, and dispute resolution simulations.", FaBalanceScale],
  ["Career Readiness", "Internships, resume workshops, mock interviews, bootcamps, and career guidance support professional preparation.", FaBriefcase],
];

const visionItems = [
  "To become a globally recognized centre of excellence in legal education, research, and innovation.",
  "To cultivate intellectually strong, ethically principled, and socially responsible legal professionals.",
  "To inspire transformative leadership that strengthens the rule of law and nation-building.",
  "To uphold constitutional values of justice, equality, liberty, and fraternity.",
  "To serve as a catalyst for social change through legal empowerment, outreach, and interdisciplinary scholarship.",
];

const missionItems = [
  "Offer holistic and dynamic legal education blending theory with real-world applications.",
  "Promote critical inquiry, academic freedom, and interdisciplinary research.",
  "Bridge legal academia and profession through clinical programmes, internships, and partnerships.",
  "Instill professional ethics, public service, and commitment to human rights.",
  "Encourage diversity, inclusivity, and global engagement.",
  "Nurture future-ready legal professionals for local, national, and global legal challenges.",
];

const objectiveClusters = [
  ["Academic Excellence", ["High-quality legal education balancing theory, practical training, and skills development.", "Learner-centric pedagogy supporting legal reasoning, advocacy, drafting, and critical thinking."]],
  ["Constitutional & Social Responsibility", ["Deep respect for constitutional values, democratic institutions, human rights, and rule of law.", "Legal aid clinics, public legal education, and pro bono outreach."]],
  ["Research & Global Perspective", ["Interdisciplinary and policy-oriented legal research.", "Comparative legal studies, academic exchange, and international collaborations."]],
  ["Professional & Holistic Development", ["Internships, moot court training, workshops, and industry interactions.", "Mentorship, student support, co-curricular activities, debates, sports, and cultural engagement."]],
];

const getProgramSlug = (progName) => {
  const p = progName.toLowerCase();
  if (p.includes("forensic")) return "bsc-llb-hons";
  if (p.includes("b.b.a")) return "bba-llb-hons";
  if (p.includes("b.a")) return "ba-llb-hons";
  if (p.includes("b.sc")) return "bsc-llb-hons";
  if (p.includes("hons")) return "llb-hons";
  if (p.includes("ll.b")) return "llb";
  return "llb";
};

const programmes = [
  { programme: "LL.B.", slug: "llb", eligibility: "Bachelor's Degree with 45%", duration: "3 Years", level: "UG", summary: "Practical legal foundation for a direct path into law practice." },
  { programme: "LL.B. (Hons.)", slug: "llb-hons", eligibility: "Bachelor's Degree with 45%", duration: "3 Years", level: "UG", summary: "Deeper specialization and advanced legal training." },
  { programme: "B.A. LL.B. / B.A. LL.B. (Hons.)", slug: "ba-llb-hons", eligibility: "10+2 with 45% aggregate", duration: "5 Years Integrated", level: "UG", summary: "Focus on litigation, judicial services, constitutional law, and social justice." },
  { programme: "B.B.A. LL.B. / B.B.A. LL.B. (Hons.)", slug: "bba-llb-hons", eligibility: "10+2 with 45% aggregate", duration: "5 Years Integrated", level: "UG", summary: "Emphasis on corporate, business, and compliance law." },
  { programme: "B.Sc. LL.B. / B.Sc. LL.B. (Hons.)", slug: "bsc-llb-hons", eligibility: "10+2 with 45% aggregate Science", duration: "5 Years Integrated", level: "UG", summary: "Forensic, criminal, and cyber law for science-minded students." },
  { programme: "LL.M. in Constitutional Democracy & Public Governance", slug: "llm-constitutional-democracy-public-governance", eligibility: "LL.B. or equivalent law degree", duration: "1 Year", level: "PG", summary: "One-year postgraduate law programme in constitutional democracy and public governance." },
  { programme: "LL.M. in Criminal Justice Reform & Forensic Advocacy", slug: "llm-criminal-justice-reform-forensic-advocacy", eligibility: "LL.B. or equivalent law degree", duration: "1 Year", level: "PG", summary: "One-year postgraduate law programme in criminal justice reform and forensic advocacy." },
  { programme: "LL.M. in Corporate & Commercial Laws", slug: "llm-corporate-commercial-laws", eligibility: "LL.B. or equivalent law degree", duration: "1 Year", level: "PG", summary: "One-year postgraduate law programme in corporate and commercial laws." },
  { programme: "LL.M. in Intellectual Property, AI Regulation & Data Sovereignty", slug: "llm-ip-ai-regulation-data-sovereignty", eligibility: "LL.B. or equivalent law degree", duration: "1 Year", level: "PG", summary: "One-year postgraduate law programme in intellectual property, AI regulation, and data sovereignty." },
  { programme: "LL.M. in ADR & Construction Law", slug: "llm-adr-construction-law", eligibility: "LL.B. or equivalent law degree", duration: "1 Year", level: "PG", summary: "One-year postgraduate law programme in ADR and construction law." },
  { programme: "Ph.D. in Law", slug: "phd-law", eligibility: "As per university Ph.D. admission norms", duration: "3-6 years", level: "Ph.D.", summary: "Doctoral research programme in Law." },
];

const getLawProgrammeCardTitle = (programme) => programme;

const lawProgrammeCards = programmes;

const getLawProgrammeDescription = (row) => {
  if (row.summary) return row.summary;
  if (row.programme.includes("LL.B.") && row.duration === "3 Years") {
    return "The candidate should have passed graduation or its equivalent with minimum 45% marks in case of general category, 42% marks in case of OBC category and 40% marks for SC/ST.";
  }
  if (row.level === "UG") {
    return "The candidate should have passed 10+2 or its equivalent with minimum 45% marks in case of general category, 42% marks in case of OBC category and 40% marks for SC/ST.";
  }
  return row.eligibility;
};

const ugProgrammes = [
  {
    slug: "ba-llb-hons",
    title: "B.A. LL.B. (Hons.) - 5-Year Integrated Programme",
    overview: "A five-year integrated programme combining arts, humanities, and law to build interdisciplinary legal understanding.",
    groups: [
      ["Highlights", ["Humanities and law foundation.", "Political science, history, sociology, and economics.", "Constitutional law, criminal law, jurisprudence, corporate law, international law, and environmental law.", "Honours specialization from the 9th term.", "Moot court training.", "Legal Aid Cell exposure.", "Internships with courts, law firms, NGOs, and corporate legal departments.", "Legal writing, research methodology, and publication opportunities.", "Career preparation for litigation, judiciary, civil services, corporate law, academia, and policy-making."]],
      ["Programme Educational Objectives", ["Equip students with humanities and legal education for understanding law in its social context.", "Develop legal reasoning and professional competencies across major legal systems.", "Foster ethical, social, and professional responsibility.", "Build competencies in emerging areas such as Cyber Law, Environmental Law, and Human Rights.", "Promote lifelong learning and research through moot courts, internships, legal aid clinics, and publication opportunities."]],
    ],
  },
  {
    slug: "bba-llb-hons",
    title: "B.B.A. LL.B. (Hons.) - 5-Year Integrated Programme",
    overview: "A five-year integrated programme combining business administration and law for students interested in corporate legal practice, business consultancy, compliance, and entrepreneurship.",
    groups: [
      ["Highlights", ["Business administration and legal education.", "Management principles, corporate strategy, financial management, marketing, entrepreneurship, and organizational behaviour.", "Corporate governance, company law, taxation, IPR, securities law, and commercial contracts.", "Transactional lawyering, contract drafting, and corporate compliance.", "Mergers and acquisitions, securities law, and insolvency law.", "Internships with law firms, corporate legal departments, and financial institutions.", "Career preparation for corporate counsel, legal advisor, investment banker, and compliance officer."]],
      ["Programme Educational Objectives", ["Provide grounding in business administration and core legal education.", "Develop competencies in corporate law, business regulations, financial laws, and transactional practice.", "Build ethical standards and governance consciousness.", "Equip students with contract drafting, compliance, due diligence, and corporate dispute resolution skills.", "Prepare graduates for corporate law firms, in-house legal departments, investment banking, and regulatory bodies."]],
    ],
  },
  {
    slug: "bsc-llb-hons",
    title: "B.Sc. LL.B. (Hons.) - 5-Year Integrated Programme",
    overview: "An integrated programme combining science and law for students interested in technology, forensic science, cyber law, biotechnology law, environmental law, and intellectual property.",
    groups: [
      ["Highlights", ["Science and law integration.", "Mathematics, computer science, biology, chemistry, physics, and forensic science.", "Cyber law, biotechnology law, environmental law, forensic science, and IPR.", "Patent law and technology licensing exposure.", "Forensic evidence and courtroom applications.", "Interdisciplinary research projects.", "Career pathways in patent law, cyber law, environmental litigation, forensic legal practice, and regulatory compliance."]],
      ["Programme Educational Objectives", ["Integrate scientific disciplines with legal education.", "Develop expertise in technology law, intellectual property, cyber law, and environmental law.", "Foster interdisciplinary research skills.", "Build practical skills in forensic evidence handling, patent application drafting, and regulatory compliance.", "Prepare graduates for careers in patent law firms, technology legal departments, regulatory bodies, and environmental law practice."]],
    ],
  },
  {
    slug: "llb-hons",
    title: "LL.B. (Hons.) - 3-Year Programme",
    overview: "A three-year graduate-level legal programme for students from any academic discipline who want to pursue law with honours specialization and research-oriented learning.",
    groups: [["Highlights", ["Six-semester legal education.", "Honours electives from the fifth semester.", "Specializations in Corporate Law, Criminal Law, Constitutional Law, IPR, and International Law.", "Legal drafting, pleadings, conveyancing, and trial advocacy.", "Moot court training.", "Mandatory internships.", "Research dissertation and seminar papers.", "Preparation for judicial services, AIBE, UPSC, and higher legal education."]]],
  },
  {
    slug: "llb",
    title: "LL.B. - 3-Year Programme",
    overview: "A three-year legal programme for graduates from all disciplines, covering essential legal core subjects and practical legal training.",
    groups: [
      ["Core Subjects", ["Constitutional Law.", "Law of Crimes - BNS 2023 and BNSS 2023.", "Law of Contracts.", "Family Law.", "Law of Evidence - BSA 2023.", "Property Law.", "Administrative Law.", "Company Law.", "Labour Law.", "Environmental Law.", "CPC and Limitation Act.", "Public International Law.", "Professional Ethics.", "Drafting, Pleading, and Conveyancing.", "Alternative Dispute Resolution."]],
      ["Highlights", ["Comprehensive legal core subject coverage.", "Moot courts, drafting workshops, and court visits.", "Mandatory internships.", "Legal aid clinic participation.", "Career support for litigation, judiciary, government service, and corporate legal roles."]],
    ],
  },
];

const facilities = [
  ["Moot Court Hall", "Real courtroom-style training space for simulated proceedings, advocacy practice, oral arguments, and moot court competitions."],
  ["Digital Law Library", "Digital legal research resources will be listed based on officially available subscriptions and university-published information."],
  ["Legal Aid Cell", "Provides legal assistance and public legal education through supervised legal aid work, rural camps, urban literacy drives, and community outreach."],
  ["Smart Classrooms", "ICT-enabled classrooms with smart boards, projectors, audio-visual support, and internet access."],
  ["ADR & Arbitration Centre", "Training in negotiation, mediation, arbitration, drafting arbitration clauses, and mock dispute resolution."],
  ["Research and Publication Cell", "Supports research projects, papers, seminars, workshops, conferences, and publication activities."],
  ["Career Guidance and Placement Cell", "Supports internships, bootcamps, resume workshops, mock interviews, and career guidance."],
  ["Centre for Criminal Law, Forensic Studies, and Criminology", "Focuses on criminal law, forensic science, mock crime scene investigations, forensic psychology, toxicology, cybercrime, and criminal profiling."],
  ["Student Clubs and Societies", "Includes Moot Court Society, Legal Debating and Literary Club, Human Rights Forum, Corporate Law Club, Cyber Law and Technology Society, ADR and Negotiation Club, Environmental Law Collective, Sports and IPR Club."],
  ["Campus Infrastructure", "Wi-Fi-enabled campus, hostel facilities, cafeteria, sports and recreation, student lounge, and university transport."],
];

const entranceTabs = {
  "5-Year Integrated UG Programmes": ["CLAT UG", "AILET UG", "LSAT India", "LAW CET Telangana / Andhra Pradesh", "CUET Law Domain", "Stmarys University-LAT"],
  "3-Year LL.B. Programmes": ["CLAT UG", "AILET UG", "LSAT India", "LAW CET Telangana / Andhra Pradesh", "CUET Law Domain", "Stmarys University-LAT"],
};
const admissionFlow = [
  ["01", "Choose Programme", "Select integrated law or LL.B. pathways."],
  ["02", "Entrance Test", "Submit valid national, state, or Stmarys University-LAT score."],
  ["03", "Documents", "Upload academic records and required certificates."],
  ["04", "Admission Review", "Complete counselling, verification, and final confirmation."],
];
const mandatoryDocs = ["Mark sheets and passing certificates of qualifying examinations.", "Valid entrance examination scorecard.", "Transfer Certificate.", "Migration Certificate if applicable.", "Aadhar Card.", "Four recent passport-size photographs.", "Category Certificate for SC/ST/OBC/EWS/PwD candidates if applicable.", "Gap Year Affidavit if applicable."];
const undertakings = ["Anti-Ragging Affidavit signed by Student and Parent/Guardian.", "Code of Conduct Agreement.", "Attendance Undertaking with 75% minimum attendance.", "Moot Court and Internship Participation Agreement."];

const methodologyCards = [
  ["Case-Based Learning", "Case law analysis, judicial decisions, legislative texts, and scholarly readings."],
  ["Problem-Based Learning", "Classroom discussions built around real legal problems and socio-economic contexts."],
  ["Moot Courts & Simulations", "Moot court exercises, role-plays, legal clinics, and courtroom simulations."],
  ["Legal Writing & Research", "Project work, legal writing, research methodology, and dissertation-based learning."],
  ["Structured Academic Planning", "Course outlines, weekly teaching plans, reading lists, and advance preparation."],
  ["Continuous Feedback", "End-semester feedback supports course improvement and academic responsiveness."],
];

const facultyProfiles = [
  {
    name: "Prof. Dr. M. Satyanarayana",
    designation: "Registrar, Stmarys University, Hyderabad",
    image: "/assets/law/faculty/m-satyanarayana.webp",
    education: ["LL.B. - Osmania University", "LL.M. - Osmania University", "Ph.D. in Law - Osmania University", "M.A. (Public Personnel Management) - Osmania University", "Postgraduate Diploma in PMIR & LW - A.P. Productivity Council"],
    focus: "Higher education governance, institutional policy, accreditation, faculty development, strategic development, and legal education.",
    research: "Cyber law, legal framework of cybersecurity under the IT Act, 2000, institutional governance, and higher education development.",
    highlights: [
      "Distinguished academic leader and administrator with over 35 years of experience in higher education, institutional governance, accreditation, and strategic development.",
      "Plays a key role in shaping institutional policies, advancing faculty development, and supporting transformative research initiatives.",
      "Former Principal of leading law colleges, Associate Professor & Vice - Principal of FCPGC, and Director at Stmarys Group of Institutions.",
      "Organized more than 60 national and international seminars and conferences on critical topics, including emerging technologies.",
      "Published research on the legal framework of cybersecurity under the IT Act, 2000 in an international journal.",
      "Guided over 200 MBA and LL.M. students in project research.",
      "Contributed significantly to NAAC accreditation and autonomous processes across institutions.",
      "Served as examiner and paper setter for multiple universities.",
      "Actively engaged in voluntary social initiatives and community development.",
    ],
  },
  {
    name: "Prof. Kishor",
    designation: "Founding In-Charge & Assistant Professor, School of Law",
    image: "/assets/law/faculty/kishor.webp",
    education: ["LL.M. - National Law School of India University (NLSIU), Bengaluru"],
    focus: "Legal aspects of business, equity and trusts, competition law, arbitration in technology industries, and Insolvency & Bankruptcy Law.",
    research: "Competition law, consumer law, IPR, AI's impact on labor markets, and dispute resolution.",
    highlights: [
      "Founding In-Charge of the School of Law at Stmarys University, responsible for establishing the legal education framework, curriculum design, and academic leadership.",
      "Former I/C Head of Department and Assistant Professor of Law at Aurora University Hyderabad.",
      "Former Assistant Professor of Law at NIMS University, Rajasthan.",
      "Visiting faculty at NMIMS School of Law, Hyderabad, teaching Insolvency & Bankruptcy Law.",
      "Faculty Convenor of the Centre for ADR and Convenor of ARBICON, an international conference on dispute resolution.",
      "Research published in Scopus-listed and peer-reviewed journals.",
      "Presented papers at NLIU, NALSAR, NUJS, and CHRIST University.",
      "Interned under Justice Naveen Chawla of the Delhi High Court and with HDFC Bank, ICICI Lombard, and leading law firms.",
      "Judged multiple national moot court and mediation competitions.",
      "Recipient of the National Youth Inspiration Award 2025 and Exemplary Educator Impact Award 2025.",
    ],
  },
  {
    name: "Prof. Gaurav Chawla",
    designation: "Assistant Professor",
    image: "/assets/law/faculty/gaurav-chawla.webp",
    education: ["LL.M. - National Law School of India University (NLSIU), Bengaluru", "B.A. LL.B. (Hons.) - Faculty of Law, University of Lucknow", "UGC NET-JRF Qualified"],
    focus: "Constitutional Law, Family Law, Arbitration, International Law",
    research: "Constitutional Law, Family Law, Arbitration, International Law",
    highlights: ["Assistant Professor at Stmarys University, Hyderabad.", "Invited judge for moot court competitions at T.S. Mishra Law School and Amity Law School, Lucknow.", "Published and presented research on Indian space law; winner of multiple constitutional law quizzes."],
  },
  {
    name: "Prof. B. Lalitha Kameswari",
    designation: "Assistant Professor",
    image: "/assets/law/faculty/lalitha-kameswari-profile.webp",
    education: ["LL.M. - Osmania University", "LL.B. - Osmania University", "M.Sc. (Psychology) - Dr. BROAU", "POSH Certified Trainer"],
    focus: "Family Law, Criminal Law, Law of Crimes, POCSO Act, J J Act, Constitutional Law, Women and Child Laws, Psychology",
    research: "Family Law, Child Rights, Juvenile Justice, Criminal Justice Administration, Victim Psychology, Child Protection Laws, Gender Justice, Mental Health and Law, Psychology",
    highlights: [
      "Practicing advocate at High Court of Telangana and session and district court of A.P.",
      "Teaching and academic guidance in Law and Psychology-related subjects with special focus on Family Law, Criminal Law, POCSO, and Juvenile Justice.",
      "Involved in legal awareness programmes, student mentoring, counselling, and socio-legal outreach activities.",
      "Teaches Family Law I & II, Criminal Law, Law of Torts, Constitutional Law, POCSO Act, Juvenile Justice Act, Women and Law, Criminology, and Psychology.",
      "Conducted legal awareness programmes on Child Rights and Protection Laws.",
      "Delivered lectures on POCSO Act and Juvenile Justice System.",
      "Guided students in legal research and socio-legal studies.",
      "Participated in seminars, workshops, and faculty development programmes.",
      "Published papers and articles in Family Law and Child Rights.",
      "Participated in national and state-level seminars, workshops, FDPs, and conferences relating to Law, Child Rights, Criminal Justice, and Psychology.",
      "Contributes to legal literacy, counselling, and social outreach programmes.",
      "Handles student mentoring, academic coordination, legal aid, outreach activities, and institutional committee responsibilities.",
      "Skilled in legal research, academic writing, counselling, public speaking, student mentoring, legal drafting, communication, and interpersonal skills.",
    ],
  },
];

function CheckList({ items, columns = "md:grid-cols-2" }) {
  return (
    <ul className={`grid ${columns} gap-3`}>
      {items.map((item) => (
        <li key={item} className="cut-corner-card flex gap-3 border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-[#f8fbff] p-3 text-sm font-medium leading-relaxed text-slate-700">
          <FaCheckCircle className="mt-1 shrink-0 text-[#019e6e]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CardGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([title, desc, Icon]) => {
        const CardIcon = Icon || FaLandmark;
        return (
          <article key={title} className="cut-corner-card border border-[#dbe8f8] border-t-4 border-t-[#019e6e] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
            <CardIcon className="mb-4 text-[#019e6e]" size={28} />
            <h3 className="text-lg font-black text-[#0d315c]">{title}</h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{desc}</p>
          </article>
        );
      })}
    </div>
  );
}

function DataTable({ rows }) {
  return (
    <>
      <div className="cut-corner-panel hidden overflow-hidden border border-[#dbe8f8] bg-white shadow-[0_20px_40px_rgba(13,49,92,0.08)] md:block">
        <table className="w-full text-sm">
          <thead className="bg-[#019e6e] text-white">
            <tr>
              <th className="px-4 py-4 text-left">Programme</th>
              <th className="px-4 py-4 text-left">Eligibility</th>
              <th className="px-4 py-4 text-left">Duration</th>
              <th className="px-4 py-4 text-left">Level</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.programme} className="border-t border-slate-200 align-top">
                <td className="px-4 py-4 font-black text-[#0d315c]">{row.programme}</td>
                <td className="px-4 py-4 text-slate-600">{row.eligibility}</td>
                <td className="px-4 py-4 text-slate-600">{row.duration}</td>
                <td className="px-4 py-4 text-slate-600">{row.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <article key={row.programme} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
            <h3 className="font-black text-[#0d315c]">{row.programme}</h3>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              <div><dt className="font-black text-[#0d315c]">Eligibility</dt><dd>{row.eligibility}</dd></div>
              <div><dt className="font-black text-[#0d315c]">Duration</dt><dd>{row.duration}</dd></div>
              <div><dt className="font-black text-[#0d315c]">Level</dt><dd>{row.level}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}

export default function SchoolOfLaw() {
  const openApply = useOpenApply();
  const [progFilter, setProgFilter] = useState("UG");
  const [expandedProg, setExpandedProg] = useState(null);
  const [vmoTab, setVmoTab] = useState("Vision");
  const [entranceTab, setEntranceTab] = useState("5-Year Integrated UG Programmes");
  const [careerTab, setCareerTab] = useState("After Integrated Law / LL.B.");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const vmoItems = vmoTab === "Vision" ? visionItems : vmoTab === "Mission" ? missionItems : null;

  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Force scroll to top on mount to prevent browser jumping to footer or hash
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProgrammes = programmes.filter((p) => p.level === progFilter);
  const renderProgrammeDetails = (row) => (
    <>
      {row.level === "UG" && (
        <div className="space-y-6">
          {ugProgrammes.find((u) => u.slug === (row.slug || getProgramSlug(row.programme)))?.groups.map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#ffaf3a]" />
                {title}
              </h4>
              <CheckList items={items} />
            </div>
          ))}
        </div>
      )}
      {row.level !== "UG" && (
        <p className="text-sm font-medium leading-7 text-slate-600">
          {row.summary || row.eligibility}
        </p>
      )}
    </>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f9ff] text-[#0d315c]">
      {/* Hero Section starts from the top, covering the area under the main navbar */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f8ff] to-[#e6effb] pt-[115px] pb-14 md:pt-[90px] md:pb-20">
        {/* Subtle grid and glows texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-cover bg-center pointer-events-none mix-blend-multiply bg-[url('/assets/law/hero.webp')]" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(13,49,92,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,49,92,0.06)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
        
        {/* Dynamic Multi-layered Brand Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(1,158,110,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,175,58,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] bg-[#0d315c]/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Gradient line integration with content area */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0d315c]/10 to-transparent" />

        {/* Internal Page Navigation - Glassmorphic Overlay */}
        <nav 
          aria-label="School of Law sections" 
          className={`fixed left-0 right-0 z-[1500] border-b border-[#0d315c]/12 bg-white/95 px-3 py-2 shadow-[0_10px_30px_rgba(13,49,92,0.10)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4 sm:py-3 ${
            scrollDir === "up" 
              ? "top-[104px] lg:top-[116px]" 
              : "top-0 md:top-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
            {sectionLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="cut-corner-badge shrink-0 border border-[#0d315c]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0d315c] transition-colors hover:border-[#ffaf3a] hover:bg-[#0d315c] hover:text-white sm:px-4 sm:text-[11px] sm:tracking-[0.14em]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-14 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 cut-corner-badge bg-white/60 border border-[#0d315c]/10 text-[#0d315c] mb-6 backdrop-blur-sm mx-auto shadow-sm lg:mx-0">
                <span className="h-2 w-2 rounded-full bg-[#019e6e] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Stmarys University</span>
              </div>
              <h1 className="whitespace-nowrap text-[2.75rem] font-black leading-none tracking-tight text-[#0d315c] drop-shadow-sm sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[4.75rem]">
                School of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#019e6e] to-[#0d315c]">Law</span>
              </h1>
              <div id="recognition" className={`${sectionScrollOffset} mt-6 sm:mt-8`}>
                <div className="cut-corner-panel grid gap-5 border border-[#f1c7cc] bg-white/90 p-5 shadow-[0_22px_55px_rgba(196,51,66,0.12)] backdrop-blur-sm sm:grid-cols-[140px_1fr] sm:p-6">
                  <div className="flex items-center justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#e60700]/20 bg-white shadow-[0_18px_40px_rgba(230,7,0,0.16)]">
                      <Image
                        src="/assets/law/bci-logo.svg"
                        alt="Bar Council of India logo"
                        width={112}
                        height={112}
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-center sm:text-left">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c43342]">Approved by the</p>
                    <h2 className="mt-2 text-3xl font-black leading-tight text-[#0d315c] sm:text-4xl">Bar Council of India</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="mx-auto w-full max-w-[720px] cut-corner-panel p-[1.5px] bg-gradient-to-br from-[#019e6e]/40 via-[#dbe8f8] to-[#ffaf3a]/30 shadow-[0_20px_50px_rgba(13,49,92,0.06)] hover:shadow-[0_25px_60px_rgba(13,49,92,0.12)] hover:scale-[1.01] transition-all duration-500 lg:ml-auto">
              <div className="cut-corner-panel bg-white/88 backdrop-blur-md p-5 sm:p-7 md:p-8 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-7 md:gap-8 overflow-hidden">
                <div className="relative w-full max-w-[240px] aspect-[4/3] sm:aspect-square md:w-[230px] md:h-[230px] xl:w-[250px] xl:h-[250px] shrink-0 cut-corner-panel p-[1px] bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm">
                  <div className="w-full h-full cut-corner-panel overflow-hidden bg-slate-50 relative">
                    <Image 
                      src={lawQuoteProfile.image} 
                      alt={lawQuoteProfile.name} 
                      fill 
                      priority 
                      className="object-cover object-[center_20%]" 
                    />
                  </div>
                </div>
                <div className="flex-1 py-2 text-center md:text-left lg:text-center xl:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 cut-corner-badge bg-[#c43342]/10 border border-[#c43342]/20 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#c43342]">Legacy of Excellence</span>
                  </div>
                  <blockquote className="text-xl font-extrabold leading-tight tracking-normal text-[#0d315c] md:text-2xl lg:text-[1.55rem] xl:text-[1.75rem]">
                    “{lawQuoteProfile.quote}”
                  </blockquote>
                  <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#c43342]">{lawQuoteProfile.name}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">Father of Modern Legal Education in India</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="about" className={`${sectionScrollOffset} px-3 py-12 sm:px-4 sm:py-16 md:py-20 bg-white/50`}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl">
            <div>
              <UniversitySectionHeader align="left" title="About School of Law" />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:mt-8 sm:text-base sm:space-y-5">
                <p>The School of Law at Stmarys University, Hyderabad, stands distinct for combining rigorous legal doctrine with real-world advocacy and emerging legal technologies. The curriculum is designed to go beyond textbook learning, with specialised exposure to AI Regulation, Data Sovereignty, and Forensic Jurisprudence.</p>
                <p>The School promotes an immersive, practice-driven learning ecosystem through moot court training, legal aid engagement, community justice exposure, ethical reasoning, and professional skill development. The goal is to prepare legal professionals who are practice-ready, purpose-driven, and capable of responding to contemporary legal challenges.</p>
              </div>
              
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {featureCards.map(([title, desc]) => (
                  <article key={title} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
                    <h3 className="text-sm font-black text-[#0d315c]">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programmes" className={`${sectionScrollOffset} relative overflow-hidden bg-[#0d213f] px-3 py-14 text-white sm:px-4 sm:py-16 md:py-24`}>
        {/* Law-specific cinematic texture */}
        <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-fixed pointer-events-none mix-blend-screen bg-[url('/assets/law/courtroom.webp')]" />
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        
        {/* Elevated cinematic texture and glows */}
        <div className="absolute inset-0 opacity-[0.6] bg-[radial-gradient(ellipse_at_top_left,rgba(1,158,110,0.3)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,175,58,0.15)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#ffaf3a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#019e6e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Programmes Offered
            </h2>
            <div className="mx-auto mt-7 h-1.5 w-24 rounded-full bg-[#c43342]" />
            <p className="mx-auto mt-7 max-w-4xl text-base font-medium leading-8 text-white/80 md:text-xl">
              Explore industry-focused legal programmes designed to build strong legal knowledge, advocacy skills, and professional excellence.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
            {lawProgrammeCards.map((row) => {
              const isExpanded = expandedProg === row.programme;
              return (
                <article
                  id={`prog-${row.programme.replace(/[^a-zA-Z0-9]/g, "-")}`}
                  key={row.programme}
                  className={`flex flex-col h-full overflow-hidden rounded-[1.5rem] bg-white text-[#0d1726] shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-[#dce7f3] transition-all duration-300 ${
                    isExpanded 
                      ? "sm:col-span-2 xl:col-span-4 ring-4 ring-[#ffaf3a]" 
                      : "hover:shadow-[0_30px_65px_rgba(13,49,92,0.16)] hover:-translate-y-1 hover:border-[#ffaf3a]/40"
                  }`}
                >
                  <div className={`flex flex-1 flex-col p-6 sm:p-7 ${isExpanded ? "xl:flex-row xl:items-start border-b border-slate-100" : ""}`}>
                    <div className={isExpanded ? "xl:w-1/3 xl:pr-8" : ""}>
                      <h3 className={`font-black leading-tight tracking-tight text-2xl md:text-[1.65rem] ${isExpanded ? "" : "min-h-[5.5rem]"}`}>
                        {getLawProgrammeCardTitle(row.programme)}
                      </h3>

                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#eef3ff] to-[#f4f8ff] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#1b2d55] border border-[#dce7f3]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#019e6e] animate-pulse" />
                        Duration: {row.duration}
                      </div>

                      <p className="mt-6 text-base font-medium leading-7 text-[#5f6268]">
                        {getLawProgrammeDescription(row)}
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="mt-8 border-t border-slate-200 pt-6 xl:mt-0 xl:w-2/3 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c43342]">Programme Details</p>
                          <Link 
                            href={`/schools/law/legal-studies/${row.slug || getProgramSlug(row.programme)}`}
                            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#019e6e] hover:text-[#0d315c] hover:underline"
                          >
                            View Full Syllabus & Dynamic Page →
                          </Link>
                        </div>
                        {renderProgrammeDetails(row)}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const newProg = expandedProg === row.programme ? null : row.programme;
                      setExpandedProg(newProg);
                      if (newProg) {
                        setTimeout(() => {
                          const el = document.getElementById(`prog-${row.programme.replace(/[^a-zA-Z0-9]/g, "-")}`);
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 150;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }, 100);
                      }
                    }}
                    className="flex w-full items-center justify-between bg-[#c43342] px-6 py-5 text-left text-lg font-black text-white hover:bg-[#a92532]"
                  >
                    <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                    <FaArrowRight className={`text-xl transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* VISION, MISSION & OBJECTIVES moved after Programmes */}
      <section id="vision-mission-objectives" className="bg-[#0d315c] px-3 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Vision, Mission & Objectives" titleClassName="text-white" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Vision", "Mission", "Objectives"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setVmoTab(tab)} 
                className={`cut-corner-badge px-8 py-3 text-xs font-black uppercase tracking-[0.16em] transition-all flex items-center gap-2 ${vmoTab === tab ? "bg-[#019e6e] text-white shadow-lg" : "border border-white/20 bg-white/10 text-white hover:bg-white/20"}`}
              >
                {tab === "Vision" ? <FaLandmark size={14} /> : tab === "Mission" ? <FaBriefcase size={14} /> : <FaCheckCircle size={14} />}
                {tab}
              </button>
            ))}
          </div>
          <div className="cut-corner-panel mt-10 border border-white/15 bg-white/5 p-8 backdrop-blur-sm max-w-5xl mx-auto">
            <h3 className="text-2xl font-black text-[#ffaf3a] flex items-center gap-4">
              <div className="h-1 w-12 bg-[#ffaf3a]" />
              {vmoTab === "Vision" ? "Vision of the School" : vmoTab === "Mission" ? "Mission Statement" : "Objectives of the School of Law"}
            </h3>
            <div className="mt-8">
              {vmoItems ? (
                <ul className="grid md:grid-cols-2 gap-4">
                  {vmoItems.map((item) => (
                    <li key={item} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                      <FaCheckCircle className="mt-1 shrink-0 text-[#019e6e]" />
                      <span className="text-sm font-medium leading-relaxed text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {objectiveClusters.map(([title, items]) => (
                    <article key={title} className="cut-corner-card border border-white/15 border-l-4 border-l-[#019e6e] bg-white/5 p-6 hover:bg-white/10 transition-colors">
                      <h4 className="font-black text-[#ffaf3a] uppercase tracking-wider text-sm mb-4">{title}</h4>
                      <ul className="space-y-3">
                        {items.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-white/80 flex gap-2">
                            <span className="text-[#019e6e]">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES moved above Admissions */}
      <section id="careers" className={`${sectionScrollOffset} relative overflow-hidden bg-[#071a32] px-3 py-14 text-white md:py-14 lg:py-20`}>
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffaf3a]/70 to-transparent" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#ffaf3a]">Career Pathways</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
            What You Can Become <span className="text-[#ffaf3a]">After Studying Law</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/62 md:text-base">
            Career-focused legal education with moot court training, internships, legal research, policy exposure, and placement readiness.
          </p>

          <div className="relative mx-auto mt-8 max-w-6xl md:h-[425px] lg:h-[640px]">
            <div className="relative z-10 mx-auto h-[260px] w-[260px] max-w-full sm:h-[270px] sm:w-[270px] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 lg:h-[390px] lg:w-[390px]">
              <div className="law-orbit-ring absolute inset-0 rounded-full border border-dashed border-[#ffaf3a]/35" />
              <div className="absolute inset-8 rounded-full border border-[#019e6e]/35" />
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="law-career-dot-orbit absolute inset-0">
                <span className="law-career-dot absolute left-[16%] top-[26%] bg-[#ffaf3a]" />
                <span className="law-career-dot absolute right-[14%] top-[34%] bg-[#019e6e] [animation-delay:700ms]" />
                <span className="law-career-dot absolute bottom-[15%] left-[31%] bg-[#c43342] [animation-delay:1200ms]" />
              </div>
              <div className="law-career-core absolute inset-[44px] overflow-hidden rounded-full border-[9px] border-[#183756] bg-[#0d315c] shadow-[0_32px_80px_rgba(0,0,0,0.42)] sm:inset-[45px] lg:inset-[66px]">
                <Image src="/assets/law/careers-hero.webp" alt="Law career pathways" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a32]/50 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-0 md:block">
            {[
              { title: "Litigation & Advocacy", icon: <FaGavel size={18} />, desc: "Court practice and drafting", pos: "md:left-0 md:top-0", line: "md:after:right-[-34px]" },
              { title: "Corporate Lawyer", icon: <FaBriefcase size={18} />, desc: "Contracts, compliance, advisory", pos: "md:right-0 md:top-0", line: "md:after:left-[-34px]" },
              { title: "Judicial Services", icon: <FaLandmark size={18} />, desc: "Magistrate and Civil Judge route", pos: "md:left-0 md:top-[190px] lg:top-[275px]", line: "md:after:right-[-34px]" },
              { title: "Legal Advisor / Consultant", icon: <FaBalanceScale size={18} />, desc: "Legal strategy and counsel", pos: "md:right-0 md:top-[190px] lg:top-[275px]", line: "md:after:left-[-34px]" },
              { title: "Policy & Civil Services", icon: <FaUsers size={18} />, desc: "Public policy and governance", pos: "md:left-[72px] md:bottom-0 lg:left-[160px]", line: "md:after:right-[-34px]" },
              { title: "Research & Academia", icon: <FaBookOpen size={18} />, desc: "Teaching, research, higher studies", pos: "md:right-[72px] md:bottom-0 lg:right-[160px]", line: "md:after:left-[-34px]" },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`law-career-fade group relative flex items-center gap-3 cut-corner-card border border-white/10 bg-white/[0.07] px-4 py-3 text-left shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffaf3a]/55 hover:bg-white/[0.11] sm:min-h-[76px] md:absolute md:w-[245px] md:after:absolute md:after:top-1/2 md:after:h-px md:after:w-8 md:after:bg-[#ffaf3a]/35 md:after:content-[''] lg:w-[300px] lg:py-4 ${item.pos} ${item.line}`}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center cut-corner-badge bg-[#019e6e] text-white shadow-[0_12px_28px_rgba(1,158,110,0.28)] transition-transform duration-300 group-hover:scale-110 lg:h-11 lg:w-11">{item.icon}</span>
                <span>
                  <span className="block text-sm font-black leading-tight text-white">{item.title}</span>
                  <span className="mt-1 block text-[11px] font-semibold leading-4 text-white/55 lg:text-xs lg:leading-5">{item.desc}</span>
                </span>
              </article>
            ))}
            </div>
          </div>

          <button
            onClick={() => openApply("law")}
            className="law-career-fade mt-10 hidden items-center gap-3 cut-corner-badge bg-[#ffaf3a] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#071a32] shadow-[0_18px_45px_rgba(255,175,58,0.26)] transition-transform duration-300 hover:-translate-y-1 lg:inline-flex"
          >
            Apply Now <FaArrowRight />
          </button>
        </div>
        <style>{`
          .law-career-fade {
            animation: law-career-fade-up 620ms cubic-bezier(.22,.95,.36,1) both;
          }
          @keyframes law-career-fade-up {
            from { opacity: 0; translate: 0 18px; }
            to { opacity: 1; translate: 0 0; }
          }
          .law-orbit-ring {
            animation: law-orbit-spin 28s linear infinite;
            transform-origin: center;
          }
          .law-career-core {
            animation: law-career-float 5s ease-in-out infinite;
          }
          .law-career-dot-orbit {
            animation: law-career-dot-spin 12s linear infinite;
            transform-origin: center;
          }
          .law-career-dot {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            box-shadow: 0 0 0 8px rgba(255,255,255,0.05);
            animation: law-career-pulse 2.8s ease-in-out infinite;
          }
          @keyframes law-orbit-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes law-career-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes law-career-dot-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes law-career-pulse {
            0%, 100% { scale: 1; opacity: .72; }
            50% { scale: 1.35; opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            .law-career-fade,
            .law-orbit-ring,
            .law-career-core,
            .law-career-dot-orbit,
            .law-career-dot {
              animation: none;
            }
          }
        `}</style>
      </section>

      <div className="h-px bg-[#dbe8f8]" />

      <section id="facilities" className={`${sectionScrollOffset} px-3 py-16 md:py-24 bg-[#f8fbff] relative`}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#dbe8f8] to-transparent" />
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Facilities at Stmarys School of Law" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Moot Court Hall", desc: "Real courtroom-style training space for simulated proceedings, advocacy practice, oral arguments, and moot court competitions.", img: "/assets/law/moot-court.webp" },
              { title: "Digital Law Library", desc: "Digital legal research resources will be listed based on officially available subscriptions and university-published information.", img: "/assets/law/digital-library.webp" },
              { title: "Legal Aid Cell", desc: "Provides legal assistance and public legal education through supervised legal aid work, rural camps, urban literacy drives, and community outreach.", img: "/assets/law/legal-aid.webp" },
              { title: "Smart Classrooms", desc: "ICT-enabled classrooms with smart boards, projectors, audio-visual support, and internet access.", img: "/assets/law/classroom.webp" },
              { title: "ADR & Arbitration Centre", desc: "Training in negotiation, mediation, arbitration, drafting arbitration clauses, and mock dispute resolution.", img: "/assets/law/adr.webp" },
              { title: "Forensic & Criminal Law Centre", desc: "Specialized lab for forensic science, crime scene investigation simulations, and criminal psychology studies.", img: "/assets/law/forensic-lab.webp" },
            ].map((facility) => (
              <article key={facility.title} className="cut-corner-card overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={facility.img} alt={facility.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-[#0d315c] uppercase tracking-tight">{facility.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{facility.desc}</p>
                </div>
              </article>
            ))}
          </div>
          {/* Render remaining facilities as simple cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.slice(6).map(([title, desc]) => (
              <article key={title} className="p-5 border border-slate-200 bg-white/50 cut-corner-card">
                <h3 className="font-black text-[#0d315c] text-xs uppercase tracking-wider">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#dbe8f8]" />

      <section id="faculty" className={`${sectionScrollOffset} bg-white px-3 py-16 md:py-24`}>
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Faculty" subtitle="Faculty of Stmarys University - School of Law." subtitleClassName="max-w-2xl" />
          {facultyProfiles.length > 0 ? (
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {facultyProfiles.map((faculty) => (
                <button key={faculty.name} type="button" onClick={() => setSelectedFaculty(faculty)} className="group cut-corner-card overflow-hidden border border-[#dbe8f8] bg-white text-left shadow-[0_12px_28px_rgba(13,49,92,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#019e6e] hover:shadow-[0_18px_40px_rgba(13,49,92,0.12)]" aria-label={`View ${faculty.name} profile`}>
                  <div className="relative aspect-[4/5] bg-[#edf5ff]">
                    {faculty.image ? (
                      <Image src={faculty.image} alt={faculty.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#0d315c]">
                        <FaUsers size={40} />
                      </div>
                    )}
                  </div>
                  <div className="border-t border-[#dbe8f8] bg-[#f8fbff] p-5 text-center">
                    <h3 className="text-xl font-black leading-tight text-[#0d315c]">{faculty.name}</h3>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="cut-corner-panel mx-auto mt-10 max-w-3xl border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-[#f8fbff] p-6 text-center shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
              <FaUsers className="mx-auto text-[#019e6e]" size={32} />
              <h3 className="mt-4 text-2xl font-black text-[#0d315c]">Faculty Profiles</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">Faculty profiles will be added here one by one.</p>
            </div>
          )}
        </div>
      </section>

      {selectedFaculty && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071a32]/70 px-3 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${selectedFaculty.name} faculty profile`} onClick={() => setSelectedFaculty(null)}>
          <div className="cut-corner-panel relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-[#dbe8f8] bg-white shadow-[0_28px_70px_rgba(0,0,0,0.28)]" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedFaculty(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d315c] text-white shadow-lg" aria-label="Close faculty profile">
              <FaTimes />
            </button>
            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="bg-[#edf5ff] p-5">
                <div className="relative aspect-[4/5] overflow-hidden cut-corner-card bg-white">
                  {selectedFaculty.image ? (
                    <Image src={selectedFaculty.image} alt={selectedFaculty.name} fill className="object-cover object-top" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#0d315c]">
                      <FaUsers size={48} />
                    </div>
                  )}
                </div>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#c43342]">School of Law Faculty</p>
                <h3 className="mt-2 text-3xl font-black leading-tight text-[#0d315c]">{selectedFaculty.name}</h3>
                <p className="mt-2 text-sm font-bold text-slate-600">{selectedFaculty.designation}</p>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-500">Stmarys University</p>
              </div>
              <div className="p-6 sm:p-8">
                {selectedFaculty.education?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0d315c]">Education</p>
                    <ul className="mt-3 grid gap-2 text-sm font-semibold leading-relaxed text-slate-600">
                      {selectedFaculty.education.map((item) => (
                        <li key={item} className="cut-corner-card border border-[#dbe8f8] bg-[#f8fbff] px-3 py-2">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedFaculty.focus && (
                  <div className="mt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0d315c]">Teaching / Focus Areas</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{selectedFaculty.focus}</p>
                  </div>
                )}
                {selectedFaculty.research && (
                  <div className="mt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0d315c]">Research Interests</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{selectedFaculty.research}</p>
                  </div>
                )}
                {selectedFaculty.highlights?.length > 0 && (
                  <div className="mt-6 border-t border-[#dbe8f8] pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0d315c]">Highlights</p>
                    <ul className="mt-3 space-y-3 text-sm font-medium leading-relaxed text-slate-600">
                      {selectedFaculty.highlights.map((item) => (
                        <li key={item} className="flex gap-3">
                          <FaCheckCircle className="mt-1 shrink-0 text-[#019e6e]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-px bg-[#dbe8f8]" />

      <section id="admissions" className={`${sectionScrollOffset} bg-white px-3 py-16 md:py-24 relative`}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#dbe8f8] to-transparent" />
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Admissions" subtitle="Admissions at Stmarys School of Law are conducted with a process designed around fairness, transparency, and merit-based selection in alignment with statutory frameworks." subtitleClassName="max-w-2xl" />
          <p className="cut-corner-panel mx-auto mt-4 max-w-3xl border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-[#f8fbff] p-4 text-center text-xs font-medium leading-relaxed text-slate-700 sm:mt-6 sm:p-5 sm:text-sm">The School accepts recognized national and state-level entrance examinations and also conducts Stmarys University-LAT for candidates who do not have valid national entrance scores.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {admissionFlow.map(([step, title, desc], index) => (
              <article key={step} className="cut-corner-card relative overflow-hidden border border-[#dbe8f8] bg-[#f8fbff] p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white ${index % 2 === 0 ? "bg-[#019e6e]" : "bg-[#b4232a]"}`}>{step}</div>
                <h3 className="mt-4 font-black text-[#0d315c]">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 sm:mt-8">{Object.keys(entranceTabs).map((tab) => <button key={tab} onClick={() => setEntranceTab(tab)} className={`cut-corner-badge px-3 py-2 text-xs font-black uppercase tracking-[0.12em] sm:px-4 sm:py-3 ${entranceTab === tab ? "bg-[#019e6e] text-white" : "border border-[#dbe8f8] bg-white text-[#0d315c]"}`}>{tab}</button>)}</div>
          <div className="cut-corner-panel mt-6 border border-[#dbe8f8] bg-white p-4 sm:p-6"><CheckList items={entranceTabs[entranceTab]} /></div>
          {/* Removed duplicate Eligibility Summary table as requested */}
          <div className="mt-8 grid gap-4 sm:gap-6 sm:mt-10 lg:grid-cols-2">
            <article>
              <h3 className="text-2xl font-black">Mandatory Documents</h3>
              <div className="mb-5 mt-3 h-1 w-16 cut-corner-underline bg-[#ffaf3a]" />
              <CheckList items={mandatoryDocs} columns="md:grid-cols-1" />
            </article>
            <article>
              <h3 className="text-2xl font-black">Undertakings Required</h3>
              <div className="mb-5 mt-3 h-1 w-16 cut-corner-underline bg-[#ffaf3a]" />
              <CheckList items={undertakings} columns="md:grid-cols-1" />
            </article>
          </div>
        </div>
      </section>

      {/* Hiding Methodology as requested */}
      <section className="hidden">
        <UniversitySectionHeader title="Teaching-Learning Methodology" />
        <CardGrid items={methodologyCards} />
      </section>

      {/* ================= LAW PORTAL CTA ================= */}
      <section className="py-20 bg-[#f0f7ff] border-y border-[#dbe8f8] px-4 -mb-px">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#0d315c] mb-6 shadow-sm border border-slate-100">
            <FaBalanceScale size={24} />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-[#0d315c] uppercase tracking-tight">Explore the Law Portal</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-medium">Access the complete legal education ecosystem, resources, and official student portal for the School of Law.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            <a 
              href="/law/" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#0d315c] text-white font-black text-[13px] uppercase tracking-[0.25em] cut-corner-badge shadow-xl hover:scale-105 transition-all transform active:scale-95"
            >
              Visit Law Portal <FaArrowRight />
            </a>
            <button 
              onClick={() => openApply("law")}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#019e6e] text-white font-black text-[13px] uppercase tracking-[0.25em] cut-corner-badge shadow-xl hover:scale-105 transition-all transform active:scale-95"
            >
              APPLY / ENQUIRE
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className={`${sectionScrollOffset} bg-[#0d315c] px-3 py-12 sm:px-4 sm:py-16 text-white md:py-20`}>
        <div className="mx-auto max-w-5xl text-center">
          <FaGraduationCap className="mx-auto text-[#ffaf3a]" size={40} />
          <UniversitySectionHeader
            className="mt-4 sm:mt-5"
            title="Start Your Legal Education Journey"
            titleClassName="text-white"
            subtitle="For admissions-related enquiries, connect with the School of Law admissions office."
            subtitleClassName="max-w-2xl text-white/80"
          />
          <div className="cut-corner-panel mx-auto mt-6 grid max-w-3xl gap-2 border border-white/15 bg-white/8 p-4 text-xs font-semibold text-white/90 sm:gap-3 sm:p-5 sm:text-sm md:grid-cols-2 sm:mt-8">
            <div className="flex items-center justify-center gap-2"><FaLandmark className="text-[#ffaf3a]" /> School of Law</div>
            <div className="flex items-center justify-center gap-2"><FaUsers className="text-[#ffaf3a]" /> Stmarys University</div>
            <div className="flex items-center justify-center gap-2"><FaBalanceScale className="text-[#ffaf3a]" /> Hyderabad, Telangana, India</div>
            <a href="mailto:reach@smru.edu.in" className="flex items-center justify-center gap-2 underline decoration-white/30 underline-offset-4"><FaEnvelope className="text-[#ffaf3a]" /> reach@smru.edu.in</a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 sm:mt-8">
            <button onClick={() => openApply("general")} className="cut-corner-badge inline-flex items-center gap-2 bg-[#ffaf3a] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0d315c] sm:px-8 sm:py-4 sm:gap-3">Apply for Law Admissions <FaArrowRight className="hidden sm:inline" /></button>
            <a href="#programmes" className="cut-corner-badge border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white sm:px-8 sm:py-4">Explore Law Programmes</a>
            <a href="mailto:reach@smru.edu.in" className="cut-corner-badge border border-white/25 bg-[#019e6e] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white sm:px-8 sm:py-4">Talk to Admissions</a>
          </div>
        </div>
      </section>
    </div>
  );
}
