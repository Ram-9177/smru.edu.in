export type CareerJob = {
  id: number;
  title: string;
  location: string;
  category_name: string;
  summary: string;
  details: string[];
};

export const CAREER_BENEFITS = [
  "Supportive Team Culture",
  "Growth & Research Opportunities",
  "Employee Wellness Benefits",
  "Career Development",
  "Global Collaboration",
  "Inclusive & Diverse Environment",
  "Modern Infrastructure",
  "Mentorship Programs",
] as const;

export const CAREER_OPENINGS: CareerJob[] = [
  {
    id: 1,
    title: "Principal - School of Law",
    location: "Hyderabad/Guntur",
    category_name: "Leadership",
    summary:
      "PhD in Law with deep research expertise. Strong academic profile including research work, published papers, and experience in academic administration.",
    details: [
      "Ph.D. in Law",
      "Strong academic profile (research papers, refereed journals, forums)",
      "Minimum 15 years of teaching experience at a renowned University/Institute",
      "At least 5 years of experience in academic administration or heading a department",
    ],
  },
  {
    id: 2,
    title: "Professors / Associate Professors / Assistant Professors",
    location: "Hyderabad/Guntur",
    category_name: "Faculty",
    summary:
      "Looking for dynamic educators with relevant academic experience to join the School of Law faculty team.",
    details: [
      "Relevant Master's/Ph.D. in Law or allied specializations",
      "Proven academic experience in teaching and research",
      "Strong communication and mentoring skills",
      "Commitment to academic excellence and student success",
    ],
  },
];

export interface CareerDocument {
  id: string;
  title: string;
  subtitle: string;
  category: "vc" | "admin" | "faculty";
  filename: string;
  downloadUrl: string;
  fileSize: string;
  format: string;
  summary: string;
}

export const RECRUITMENT_NOTICE_META = {
  notificationNo: "SMRU/2026-27/VC.APP/01",
  notificationDate: "05.10.2026",
  universityName: "St. Mary's Rehabilitation University",
  location: "Hyderabad, Telangana",
  website: "www.smru.edu.in",
  sponsoringSociety: "Joseph Sriharsha & Mary Indraja Educational Society",
  signatory: "President & Joint Secretary",
  posterImage: "/careers/smru-employment-notification-2026.jpg",
  deadlineRule: "21 clear calendar days from the later of (i) date of newspaper publication, or (ii) date on which the detailed notification is uploaded on the University website.",
  vcSubmissionEmail: "chancellor@smru.edu.in",
  adminFacultySubmissionEmail: "hr@smru.edu.in",
  enquiryPhone: "9010455590",
  alternatePhone: "9010445590",
  address: "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.",
};

export const VC_NOTIFICATION_DATA = {
  notificationNo: "SMRU/2026-27/VC.APP/01",
  date: "05.10.2026",
  postTitle: "Regular Vice-Chancellor",
  natureOfPost: "Full-time salaried statutory office",
  tenure: "Three (3) years or until attaining 70 years of age, whichever is earlier. Eligible for consideration for a further three-year term subject to statutory ceiling.",
  remuneration: "As prescribed under SMRU Statute 8.1(d) — applicable UGC provisions or a higher amount decided by the Chancellor / Sponsoring Body.",
  submissionEmail: "chancellor@smru.edu.in",
  downloadDocx: "/careers/SMRU-VC-Appointment-Detailed-Notification.docx",
  filename: "SMRU VC Appointment Detailed Notification.docx",
  
  governingFramework: [
    "Telangana State Private Universities (Establishment and Regulation) Act, 2018, as amended",
    "SMRU First Statutes and First Ordinances (G.O.Ms.Nos. 14 & 15 dated 28.03.2026)",
    "UGC Regulations on Minimum Qualifications for Appointment of Teachers and Other Academic Staff, 2018 (Regulation 7.3)",
    "Applicable statutory professional council norms and government orders",
  ],

  eligibilityRoutes: [
    {
      route: "Route (a) — University Professorial Service",
      qualification: "At least ten (10) years of experience as a Professor in a University.",
      evidence: "Professor appointment/promotion orders, joining records, and authenticated service certificates with exact dates. Cumulative non-overlapping calculation required.",
    },
    {
      route: "Route (b) — Research / Academic Administration",
      qualification: "At least ten (10) years of experience in a reputed research and/or academic administrative organisation, supported by evidence of academic leadership.",
      evidence: "Service certificates, organisational credentials, documented duties, responsibilities, and verified achievements demonstrating academic leadership.",
    },
  ],

  keyConditions: [
    "Distinguished academician with high competence, integrity, moral standing and institutional commitment.",
    "Statutory age ceiling for holding office is 70 years (verified at scrutiny, appointment and joining).",
    "Ten years of total teaching experience does not alone qualify; professorial rank or equivalent organisational leadership must be proven.",
    "Section III(L) statutory disclosures concerning Section 23 of the Act (unsound mind, insolvency, moral turpitude, private coaching, examination unfair practices).",
    "Resignation requires six (6) months' written notice addressed to the Chancellor under Statute 8.1(g).",
  ],

  responsibilities: [
    "Principal executive and academic officer responsible for general supervision of University affairs.",
    "Chair of Board of Management, Academic Council, Finance Committee, and Planning Board.",
    "Ensuring institutional adherence to the Act, First Statutes, Ordinances, UGC rules, and professional council standards.",
    "Spearheading academic quality, research culture, clinical training, admissions, examinations, and student welfare.",
    "Steering international collaborations, hospital networks, inclusive education, and financial stewardship.",
  ],

  selectionProcess: [
    "Scrutiny of applications and nominations by the Search-cum-Selection Committee.",
    "Comparative assessment of academic excellence, governance record, and vision alignment.",
    "Interaction/presentation before the Committee for shortlisted candidates.",
    "Search Committee recommends a panel of three suitable persons for consideration by the Chancellor.",
  ],

  howToApply: [
    "Complete every section of the prescribed application form in Section III.",
    "Attach a signed Vision Statement and Action Plan of 1,000–1,500 words (first 100 days, 3-year priorities, regulatory readiness, research, inclusive education, risk management).",
    "Attach detailed CV, recent photograph, and indexed, numbered self-attested annexures.",
    "Provide three (3) senior academic/professional referees with prior consent.",
    "Submit statutory integrity and conflict disclosures (Section III(L)).",
    "Forward through present employer with NOC / Relieving status where applicable.",
    "Email complete application package to chancellor@smru.edu.in within 21 clear calendar days.",
  ],
};

export const REGISTRAR_NOTIFICATION_DATA = {
  postTitle: "Registrar",
  referenceNo: "SMRU/2026-27/VC.APP/01 (dated 06.10.2026)",
  natureOfPost: "Full-time salaried statutory office",
  tenure: "Three (3) years; eligible for consideration for a further three-year term under Statute 9.",
  submissionEmail: "hr@smru.edu.in",
  downloadDocx: "/careers/SMRU-Registrar-Appointment-Detailed-Notification.docx",
  filename: "SMRU Registrar Appointment Detailed Notification.docx",

  essentialQualifications: [
    "Master's degree with at least 55% marks or an equivalent grade from a recognised institution.",
    "Must meet at least one of the three established experience routes:",
  ],

  experienceRoutes: [
    {
      route: "Route (a) — Academic Administration",
      details: "At least 15 years as Assistant Professor at Academic Level 11 or above; OR at least 8 years at Academic Level 12 or above, including service as Associate Professor, together with experience in educational administration.",
    },
    {
      route: "Route (b) — Comparable Institutional Experience",
      details: "Comparable experience in a research establishment and/or another institution of higher education of equivalent seniority and responsibility.",
    },
    {
      route: "Route (c) — Administrative Service",
      details: "At least 15 years of administrative experience, including at least eight (8) years as Deputy Registrar or an equivalent post.",
    },
  ],

  statutoryFunctions: [
    "Custodian of University records, the common seal, and entrusted property under Statute 9.",
    "Secretary to the Governing Body, Board of Management, and Academic Council without voting rights.",
    "Official conduct of authorised correspondence, issuing meeting notices, agendas, and recording statutory minutes.",
    "Execution and authentication of authorised contracts, agreements, and legal representation of the University in proceedings.",
    "Maintenance of the register of graduates and issuance of authenticated certificates and transcripts.",
  ],

  selectionAndTerms: [
    "Appointed by the Chancellor on the recommendation of the Statutory Selection Committee.",
    "Selection Committee: Vice-Chancellor (Chair), Chancellor's Nominee, and Sponsoring Body Nominee.",
    "Resignation: Three (3) months' notice addressed to the VC or surrender of three months' salary as per Statute 9.",
  ],
};

export const ASST_REGISTRAR_NOTIFICATION_DATA = {
  postTitle: "Assistant Registrar",
  referenceNo: "SMRU/2026-27/VC.APP/01",
  natureOfPost: "Full-time administrative officer post",
  submissionEmail: "hr@smru.edu.in",
  downloadDocx: "/careers/SMRU-Assistant-Registrar-Appointment-Detailed-Notification.docx",
  filename: "SMRU Assistant Registrar Appointment Detailed Notification.docx",

  essentialQualifications: [
    "Master's degree with at least 55% marks or an equivalent grade from a recognised institution.",
    "Demonstrated proficiency in office automation software, electronic record keeping, e-governance systems, and official drafting.",
  ],

  desirableExperience: [
    "Prior experience in university or college administration, admissions, examinations, establishment/HR, finance, or student affairs.",
    "Familiarity with higher education statutory rules, regulatory returns (UGC, AISHE, NIRF), and ERP administration.",
    "High confidentiality, meticulous drafting, accessible administration, and public-facing grievance redressal skills.",
  ],

  portfoliosAndDuties: [
    "Admissions & Enrolment: Candidate data, registration registries, eligibility checking, and statutory student registers.",
    "Examinations & Records: Examination scheduling, grade moderation documentation, result registers, and transcript preparation.",
    "Establishment & Administration: Faculty and staff service registers, recruitment committee files, roster points, and meeting support.",
    "Regulatory & Secretarial: Coordination with statutory bodies, council returns, and office workflow management under the Registrar.",
  ],

  selectionAndTerms: [
    "Recruitment governed by SMRU Statutes 12, 18, and 21 for officers and administrative staff.",
    "Selection may include administrative drafting / case exercise, computer competency test, and interview.",
  ],
};

export const FACULTY_NOTIFICATION_DATA = {
  postTitle: "Faculty Positions (Professor, Associate Professor, Assistant Professor)",
  referenceNo: "SMRU/2026-27/VC.APP/01",
  natureOfPost: "Full-time academic appointments across 6 Schools",
  submissionEmail: "hr@smru.edu.in",
  downloadDocx: "/careers/SMRU-Faculty-Appointment-Detailed-Notification.docx",
  filename: "SMRU Faculty Appointment Detailed Notification.docx",

  schools: [
    {
      schoolName: "School of Rehabilitation Sciences",
      disciplines: ["BASLP", "M.Sc. Audiology", "MAO", "BPO", "MPO", "B.A./B.Sc./B.Com. B.Ed. (Special Education)"],
      norms: "Rehabilitation Council of India (RCI) norms & UGC Regulations. Valid Central Rehabilitation Register (CRR) registration mandatory where applicable.",
    },
    {
      schoolName: "School of Health & Allied Health Sciences",
      disciplines: [
        "BPT", "MPT", "BOT", "MOT", "BMLS", "Anaesthesia & OT Technology",
        "Cardiovascular Technology", "Emergency Medical Technology (B.EMT)", "Optometry",
        "Radiotherapy Technology (D.RT/B.RTT)", "BAOTT", "Nutrition & Dietetics (Hons)",
        "Physician Assistant", "Dialysis Therapy Technology", "Respiratory Technology",
        "Medical Radiology & Imaging Technology", "Forensic Science",
      ],
      norms: "National Commission for Allied and Healthcare Professions (NCAHP) framework, relevant council standards, and UGC norms.",
    },
    {
      schoolName: "School of Psychology",
      disciplines: [
        "B.Sc./M.A. Clinical Psychology", "PDCP", "PGDRP", "B.Psychology",
        "M.Psychology", "BMPSW", "MMSW", "M.PSW",
      ],
      norms: "RCI curricula norms for clinical psychology & rehabilitation programmes, with valid CRR registration where required.",
    },
    {
      schoolName: "School of Nursing",
      disciplines: ["B.Sc. Nursing", "M.Sc. Nursing"],
      norms: "Indian Nursing Council (INC) & State Nursing Council regulations. Valid Registered Nurse / Registered Midwife (RN/RM) credentials required.",
    },
    {
      schoolName: "School of Engineering & Emerging Technologies",
      disciplines: [
        "B.Tech Rehabilitation Engineering", "B.Tech RE (P&O/AT)", "B.Tech CSE",
        "AI & ML", "AR/VR", "AI & DS", "Cyber Security", "Fintech & AI",
        "Biomedical Engineering", "Full Stack Development", "Cloud Technology & Information Security",
      ],
      norms: "AICTE Gazette norms & UGC Regulations for Engineering and Technology faculties.",
    },
    {
      schoolName: "School of Law",
      disciplines: [
        "LL.B. (Hons)", "B.A. LL.B. (Hons)", "B.B.A. LL.B. (Hons)",
        "B.Sc. LL.B. (Hons)", "B.Sc. (Forensic) LL.B. (Hons)", "LL.M.",
      ],
      norms: "Bar Council of India (BCI) Legal Education Rules & UGC Regulations. Non-law subjects require master's/doctorate in relevant disciplines.",
    },
  ],

  ranks: [
    {
      rank: "Assistant Professor",
      criteria: [
        "Master's degree with minimum 55% marks (or equivalent grade) in the relevant/allied discipline from a recognised Indian or accredited foreign university.",
        "National Eligibility Test (NET) conducted by UGC/CSIR or accredited SET/SLET, OR Ph.D. awarded in accordance with UGC 2009/2016 Regulations.",
        "For Engineering: B.E./B.Tech. and M.E./M.Tech. with First Class in either degree.",
        "For Rehabilitation/Nursing/Health: Current professional registration (RCI CRR, INC, etc.) in accordance with course staffing requirements.",
      ],
    },
    {
      rank: "Associate Professor",
      criteria: [
        "Good academic record with a Ph.D. Degree in the concerned / allied / relevant discipline.",
        "Master's Degree with at least 55% marks (or equivalent grade).",
        "Minimum eight (8) years of teaching and/or research experience in an academic/research position equivalent to Assistant Professor.",
        "Minimum seven (7) publications in peer-reviewed or UGC-listed journals.",
        "Total research score of at least seventy-five (75) as per Appendix II, Table 2 of UGC Regulations.",
      ],
    },
    {
      rank: "Professor",
      criteria: [
        "Distinguished academician with Ph.D. in concerned/allied/relevant discipline.",
        "Minimum ten (10) publications in peer-reviewed or UGC-listed journals.",
        "Minimum ten (10) years of teaching experience in university/college as Assistant/Associate Professor, or equivalent research experience.",
        "Evidence of successfully guided doctoral candidates.",
        "Total research score of at least one hundred and twenty (120) under Appendix II, Table 2 of UGC Regulations.",
        "Alternative: Outstanding professional with Ph.D. and ten years' proven contribution in relevant industry/institution under UGC Regulation 4.1.",
      ],
    },
  ],
};

export const RECRUITMENT_DOCUMENTS: CareerDocument[] = [
  {
    id: "doc-vc",
    title: "SMRU Regular Vice-Chancellor Appointment",
    subtitle: "Detailed Notification, Terms of Office & Prescribed Application Form",
    category: "vc",
    filename: "SMRU VC Appointment Detailed Notification.docx",
    downloadUrl: "/careers/SMRU-VC-Appointment-Detailed-Notification.docx",
    fileSize: "61 KB",
    format: "DOCX",
    summary: "Complete statutory terms under TS Act 2018, UGC Reg 7.3, 10-year professorial eligibility, Vision Statement format, Section III application forms and checklists.",
  },
  {
    id: "doc-registrar",
    title: "SMRU Registrar Appointment",
    subtitle: "Detailed Requirements, Selection Norms & Application Form",
    category: "admin",
    filename: "SMRU Registrar Appointment Detailed Notification.docx",
    downloadUrl: "/careers/SMRU-Registrar-Appointment-Detailed-Notification.docx",
    fileSize: "45 KB",
    format: "DOCX",
    summary: "Statute 9 requirements, Master's 55%, 15-year administrative / 8-year Deputy Registrar eligibility routes, selection committee procedure, and application form.",
  },
  {
    id: "doc-asst-registrar",
    title: "SMRU Assistant Registrar Appointment",
    subtitle: "Detailed Qualifications, Competencies & Application Form",
    category: "admin",
    filename: "SMRU Assistant Registrar Appointment Detailed Notification.docx",
    downloadUrl: "/careers/SMRU-Assistant-Registrar-Appointment-Detailed-Notification.docx",
    fileSize: "43 KB",
    format: "DOCX",
    summary: "Master's 55% eligibility, administrative portfolios (Admissions, Examinations, HR, Secretarial), e-governance competencies, and prescribed application schedule.",
  },
  {
    id: "doc-faculty",
    title: "SMRU Faculty Appointment (6 Schools)",
    subtitle: "Detailed Qualifications, Regulatory Council Norms & Application Form",
    category: "faculty",
    filename: "SMRU Faculty Appointment Detailed Notification.docx",
    downloadUrl: "/careers/SMRU-Faculty-Appointment-Detailed-Notification.docx",
    fileSize: "50 KB",
    format: "DOCX",
    summary: "Professor, Associate Professor & Assistant Professor norms across Rehabilitation, Health Sciences, Psychology, Nursing, Engineering, and Law faculties.",
  },
];
