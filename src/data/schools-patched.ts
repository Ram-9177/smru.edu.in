export const THEME = {
  primary: "#0d315c",
  accent: "#019e6e",
  accentDark: "#0f6a5a",
};

const text = (s) => s.replace(/\s+/g, " ").trim();

const APPLY_PORTAL_URL = "https://apply.smru.edu.in/";

import { OFFICIAL_COURSE_ROWS } from "./official-courses";
import nstLogo from "../assets/partner-logos/01_newton_school_of_technology.webp";
import qtstLogo from "../assets/partner-logos/02_quality_thought_school_of_technology.webp";
import nextgenLogo from "../assets/partner-logos/03_nextgen_powered_by_ctpl.webp";
import bytexlLogo from "../assets/partner-logos/04_bytexl.webp";
import velocesLogo from "../assets/partner-logos/05_veloces_campus.webp";
import iiatLogo from "../assets/partner-logos/06_iiat.webp";
import bbLogo from "../assets/partner-logos/07_blackbuck_education.webp";
import edridgeLogo from "../assets/partner-logos/08_edridge_learning_solutions.webp";
import emversityLogo from "../assets/partner-logos/09_emversity_industry_partner.webp";
import edinLogo from "../assets/partner-logos/10_edinbox.webp";
// import istLogo from "../assets/partner-logos/11_intellipaat_school_of_technology.webp";
import niatLogo from "../assets/partner-logos/12_niat.webp";
import smruLogo from "../assets/Logo.webp";

export const EDU_PARTNERS = {
  "Stmarys University": {
    code: "Stmarys University",
    name: "Stmarys University",
    landingUrl: "https://apply.smru.edu.in/",
    logo: smruLogo,
    embedCode: ""
  },
  NIAT: {
    code: "NIAT",
    name: "NxtWave",
    landingUrl: "/niat",
    logo: niatLogo,
    iframeUrl: "https://www.niatindia.com/external-universities/st.-mary-s-university",
    embedCode: ""
  },
  IIAT: {
    code: "IIAT",
    name: "Indian Institute of Advanced Technology",
    landingUrl: "/iiat",
    logo: iiatLogo,
    iframeUrl: "https://iiath.com/university/smru/",
    embedCode: ""
  },
  QTST: {
    code: "QTST",
    name: "Quality Thought",
    landingUrl: "/qtst",
    logo: qtstLogo,
    embedCode: ""
  },
  /*
  IST: {
    code: "IST",
    name: "Intellipaat",
    landingUrl: "/ist",
    logo: istLogo,
    embedCode: ""
  },
  */
  BB: {
    code: "BB",
    name: "BlackBucks",
    landingUrl: "/bb",
    logo: bbLogo,
    iframeUrl: "https://smru.theblackbucks.com/",
    embedCode: ""
  },
  BYTEXL: {
    code: "BYTEXL",
    name: "ByteXL",
    landingUrl: "/bytexl",
    logo: bytexlLogo,
    iframeUrl: "https://bytexl.com/smru.html",
    embedCode: ""
  },
  VELOCES: {
    code: "VELOCES",
    name: "Veloces",
    landingUrl: "/veloces",
    logo: velocesLogo,
    iframeUrl: "/partners/veloces/velocescampus.html",
    embedCode: ""
  },
  EDIN: {
    code: "EDIN",
    name: "Edinbox",
    landingUrl: "/edinbox",
    logo: edinLogo,
    embedCode: ""
  },
  EMVERSITY: {
    code: "EMVERSITY",
    name: "Emversity",
    landingUrl: "/emversity",
    logo: emversityLogo,
    iframeUrl: "https://emversity.com/university-partners/st-marys-website-page",
    embedCode: ""
  },
  EDRIDGE: {
    code: "EDRIDGE",
    name: "Edridge",
    landingUrl: "/edridge",
    logo: edridgeLogo,
    iframeUrl: "https://edridge.in/edridge-st-mary-s-university/",
    embedCode: ""
  },
  NEXTGEN: {
    code: "NEXTGEN",
    name: "NextGen",
    landingUrl: "/nextgen",
    logo: nextgenLogo,
    embedCode: ""
  },
  IFT: {
    code: "IFT",
    name: "Institute of FinTech",
    landingUrl: null,
  },
  IIST: {
    code: "IIST",
    name: "Indian Institute of Science and Technology",
    landingUrl: null,
  },
  KPMG: {
    code: "KPMG",
    name: "KPMG",
    landingUrl: null,
  },
  MICROSOFT: {
    code: "MICROSOFT",
    name: "Microsoft",
    landingUrl: null,
  },
  NST: {
    code: "NST",
    name: "Newton School of Technology",
    landingUrl: "/nst",
    logo: nstLogo,
    iframeUrl: "https://university.newtonschool.co/v1/nst-st-marys-hyd",
    embedCode: ""
  },
};

const getEduPartnerCodes = (program: any = {}) => {
  const rawCodes = Array.isArray(program.partnerCodes)
    ? program.partnerCodes
    : (program.partnerCode || "").split(/[;,]/);

  return rawCodes
    .map((code) => String(code || "").toUpperCase().trim())
    .filter(Boolean)
    .filter((val, idx, arr) => arr.indexOf(val) === idx);
};

export const getEduPartners = (program: any = {}) =>
  getEduPartnerCodes(program)
    .map((code) => EDU_PARTNERS[code])
    .filter((partner) => partner && partner.code !== "IST");

export const getEduPartner = (program: any = {}) => {
  return getEduPartners(program)[0] || null;
};

export const getEduPartnerLandingUrl = (program: any = {}) => {
  const isInvalidPartnerUrl = (url = "") => /apply\.smru\.edu\.in/i.test(url);
  const programUrl = (program.partnerLeadUrl || "").trim();
  if (programUrl && !isInvalidPartnerUrl(programUrl)) return programUrl;
  const partnerUrl = (getEduPartner(program)?.landingUrl || "").trim();
  if (partnerUrl && !isInvalidPartnerUrl(partnerUrl)) return partnerUrl;
  return null;
};

export const isEduPartneredProgram = (program: any = {}) => getEduPartners(program).length > 0;

export interface SchoolData {
  slug: string;
  name: string;
  short: string;
  visibility?: "public" | "hidden" | "draft" | "internal";
  about: any;
  departments: {
    slug: string;
    name: string;
    about: string;
    programs: any[];
  }[];
  vision?: string | string[];
  mission?: string | string[];
  facilities?: string[] | { name: string; desc: string }[];
}

export const schoolsSeed: SchoolData[] = [
  {
    slug: "rehabilitation-sciences",
    name: "School of Rehabilitation Sciences",
    short: "Rehabilitation Sciences",
    about: text("The School of Rehabilitation Sciences operates as a specialized hub for educating practitioners who restore communication and learning abilities. Curriculum focuses on evidence-based audiology, speech therapy, and inclusive education, using clinical labs and assistive technology to improve the lives of individuals with diverse challenges."),
    departments: [
      {
        slug: "audiology-speech-sciences",
        name: "Audiology & Speech-Language Pathology",
        about: "",
        programs: [
          {
            slug: "baslp",
            name: "BASLP",
            level: "UG Program",
            overview: text("Students learn to calibrate advanced audiological equipment and conduct speech-language assessments for individuals with communication impairments. You will spend time in clinical labs mastering the fitting of hearing aids and designing rehabilitation protocols for neurogenic communication disorders."),
            intake: "40 Seats",
            duration: "4 Years (3 Years Academic + 1 Year Internship)",
            eligibility: "10+2 with Physics, Chemistry, Biology/Mathematics; minimum 50% marks",
            labs: "Specialized Audiology Lab, Speech Science Lab, and Earmould Lab equipped with diagnostic audiometers.",
            fieldExposure: "Clinical rotations at leading ENT hospitals and rehabilitation centers in Hyderabad.",
            careerOpportunities: ["Audiologist", "Speech-Language Pathologist", "Clinical Supervisor", "Rehab Consultant"],
            outcomes: text("Graduates find placement in ENT clinics and specialized schools, where they manage diagnostic testing and long-term speech therapy for pediatric and geriatric populations."),
            accreditation: "Stmarys University is UGC 2(f) recognized at the university level. Programme-level professional permissions, where required, are verified through official university notifications or relevant statutory council documents."
          },
          { slug: "msc-audiology", name: "M.Sc. Audiology", level: "PG Program" }
        ]
      },
      {
        slug: "prosthetics-orthotics",
        name: "Prosthetics Orthotics",
        about: "",
        programs: [
          { slug: "bpo", name: "BPO", level: "UG Program" },
          { slug: "mpo", name: "MPO", level: "PG Program" }
        ]
      },
      {
        slug: "inclusive-education",
        name: "Special & Inclusive Education",
        about: "",
        programs: [
          { slug: "ba-bed-special-inclusive-education", name: "B.A. B.Ed. (Special & Inclusive Education)", level: "UG Program" },
          { slug: "bsc-bed-special-inclusive-education", name: "B.Sc. B.Ed. (Special & Inclusive Education)", level: "UG Program" },
          { slug: "bcom-bed-special-inclusive-education", name: "B.Com. B.Ed. (Special & Inclusive Education)", level: "UG Program" }
        ]
      }
    ]
  },
  {
    slug: "health-allied-health-sciences",
    name: "School of Health & Allied Health Sciences",
    short: "Health & Allied Health Sciences",
    about: text("The School of Health and Allied Health Sciences at Stmarys University is a multidisciplinary center of excellence dedicated to training health and allied health professionals who play a vital role in diagnostics, therapy, patient care, and health system management. The school integrates scientific knowledge with hands-on training to support advanced clinical services and rehabilitation care across various healthcare domains."),
    departments: [
      {
        slug: "physiotherapy",
        name: "Physiotherapy",
        about: text("Dedicated to the science of restorative movement and physical well-being. Students engage in manual therapy practice and use advanced mobilization technologies to improve patient mobility across diverse clinical environments."),
        programs: [
          {
            slug: "bpt",
            name: "BPT",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "5 Years (10 Semesters) – Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "₹8 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            overview: text(
              "The Bachelor's in Physiotherapy is a five-year undergraduate program that trains students in the assessment, diagnosis, and treatment of musculoskeletal, neurological, cardiovascular, and respiratory conditions through evidence-based physical therapy interventions. The program covers functional anatomy, exercise therapy, electrotherapy, manual therapy, sports rehabilitation, and community rehabilitation — equipping graduates with clinical reasoning and hands-on therapeutic skills required by hospitals, rehabilitation centres, and sports medicine facilities."
            ),
            schoolTitle: "School of Health & Allied Health Sciences - Stmarys University",
            schoolDescription: text(
              "Delivered through a partnership model: Stmarys University provides the academic and degree framework while Emversity supplies industry-skilling, AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement support."
            ),
            highlights: [
              "Comprehensive five-year physiotherapy curriculum",
              "Simulation-led learning and AR/VR practicals",
              "Extensive clinical postings and a final-year internship",
              "Industry co-designed modules and placement support"
            ],
            durationNote: text("10 semesters combining foundational sciences, clinical skills, and a full-time internship in the final year."),
            eligibilityNote: text(
              "Requires 10+2 with Physics, Chemistry and Biology/Mathematics; selection based on Stmarys University entrance or merit as applicable."
            ),
            specializations: [
              "Neuro Physiotherapy",
              "Orthopaedic Physiotherapy",
              "Cardiopulmonary Physiotherapy",
              "Sports Physiotherapy",
              "Paediatric Physiotherapy",
              "Geriatric Rehabilitation",
              "Onco Rehabilitation"
            ],
            semesterSummary: text(
              "Curriculum progresses from foundational health sciences and biomechanics (Years 1–2), to core physiotherapy techniques and clinical assessment (Years 2–3), advanced practice and sports/critical care rotations (Years 3–4), and concludes with a full-time clinical internship and capstone project (Year 5)."
            ),
            outcomes: text(
              "Graduates qualify for roles as Physiotherapists across hospitals, sports clinics, neurological and cardiopulmonary rehabilitation units, and community health programmes."
            ),
            careerOpportunities: [
              "Physiotherapist",
              "Sports Physiotherapist",
              "Neuro Physiotherapist",
              "Cardiopulmonary Physiotherapist",
              "Pediatric Physiotherapist",
              "Geriatric Rehabilitation Specialist",
              "Community Rehabilitation Therapist"
            ],
            labs: text("Electrotherapy, Biomechanics & Motion Analysis, Manual Therapy and Exercise Therapy labs."),
            fieldExposure: text("Clinical postings in hospitals, ICU & post-surgical units, sports rehab centres, and community-based rehabilitation projects."),
            feeNotes: [
              "Total program fee: ₹8 Lakhs payable to Stmarys University",
              "Scholarships and education loans available as per university policy"
            ],
            accreditation: text(
              "Stmarys University, legally established as Stmarys University, is UGC 2(f) recognized at the university level. Programme-level professional permissions, where required, are verified through official university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Strong clinical exposure and simulation-based training",
              "Industry-partnered modules with Emversity",
              "Comprehensive internship and placement support",
              "Focus on evidence-based practice and community rehabilitation"
            ],
            feeDisplay: "₹8 Lakhs",
            intakeDisplay: "July / August"
          },
          {
            slug: "mpt",
            name: "MPT",
            level: "PG Program",
            duration: "2 years (full-time)",
            eligibility: "Bachelor of Physiotherapy with minimum 50% marks",
            fees: "1.75 Lakh per annum",
            overview: text("Delve into specialized musculoskeletal and neurological recovery pathways through clinical mentorship and evidence-based practice. You will develop expertise in advanced mobilization techniques and injury prevention strategies tailored for high-performance athletes and chronic rehabilitation cases."),
            specializations: ["Neuro Physiotherapy", "Ortho Physiotherapy", "Cardio Respiratory", "Sports Physiotherapy", "Pediatric Physiotherapy", "Onco Physiotherapy", "Obstetric / Gynic Physiotherapy"],
            outcomes: text("Prepares you for senior consultant roles and clinical research positions, focusing on innovative physical therapy solutions in global healthcare settings."),
            accreditation: text("Following Allied Health Professions Act norms, this program aligns with National Medical Commission recommendations for advanced clinical eligibility.")
          }
        ]
      },
      {
        slug: "occupational-therapy",
        name: "Occupational Therapy",
        about: text("This department focuses on restoring functional independence through activity-based therapy. Students learn to analyze life-skills and physical task performance to help patients overcome cognitive and physical barriers."),
        programs: [
          {
            slug: "bot",
            name: "BOT",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "5 Years (10 Semesters) – Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "₹8 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            overview: text(
              "The Bachelor's in Occupational Therapy is a five-year undergraduate program that trains students to assess, plan, and deliver therapeutic interventions that enable individuals with physical, cognitive, developmental, or psychosocial challenges to participate meaningfully in daily activities. The program covers human occupation theory, functional anatomy, neuroscience, paediatric and geriatric rehabilitation, mental health practice, assistive technology, and community-based rehabilitation — equipping graduates with clinical reasoning and therapeutic skills required by rehabilitation centres, hospitals, and inclusive education settings."
            ),
            schoolTitle: "School of Rehabilitation & Allied Health Sciences - Stmarys University",
            schoolDescription: text(
              "This program is delivered through a partnership model: Stmarys University provides the academic framework and degree conferral while Emversity delivers industry-skilling, AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement assistance."
            ),
            highlights: [
              "Integrated academic degree with industry-skilling",
              "Extensive clinical placements and a year-long internship",
              "AR/VR simulation and assistive-technology training",
              "Head Start Programme with complimentary laptop for eligible students"
            ],
            durationNote: text("10 semesters combining foundational sciences, clinical rotations, and practicum leading to a full-time internship in the final year."),
            eligibilityNote: text(
              "Requires 10+2 with Physics, Chemistry and Biology/Mathematics; minimum aggregate as per Stmarys University norms. Admissions are conducted by Stmarys University through the official admissions portal."
            ),
            specializations: [
              "Neuro Rehabilitation",
              "Paediatrics",
              "Mental Health",
              "Hand & Upper Extremity Therapy",
              "Geriatric Rehabilitation",
              "Assistive Technology",
              "Community-Based Rehabilitation"
            ],
            labs: text("ADL (Activities of Daily Living) Lab, Sensory Integration Lab, Splinting & Orthotics Workshop, and simulation suites."),
            fieldExposure: text("Clinical postings across hospitals, rehabilitation centres, paediatric and geriatric units with supervised hands-on practice and community-based rehabilitation projects."),
            semesterSummary: text(
              "Curriculum progresses from foundational health sciences and occupation theory (Years 1–2), through core occupational therapy assessment and intervention (Years 2–3), advanced clinical practice and community rehabilitation (Years 3–4), to a year-long full-time clinical internship and professional readiness (Year 5)."
            ),
            outcomes: text(
              "Graduates qualify for roles as Occupational Therapists, Paediatric Occupational Therapists, Neuro-Rehabilitation Therapists, Hand Therapists, Geriatric Rehabilitation Specialists, Assistive Technology Specialists, and Community Rehabilitation Coordinators in hospitals, rehabilitation centres, special education settings, NGOs, and corporate wellness programmes."
            ),
            careerOpportunities: [
              "Occupational Therapist",
              "Paediatric Occupational Therapist",
              "Neuro-Rehabilitation Therapist",
              "Hand & Upper Extremity Therapist",
              "Geriatric Rehabilitation Specialist",
              "Assistive Technology Specialist",
              "Community-Based Rehabilitation Coordinator"
            ],
            feeNotes: [
              "Total program fee: ₹8 Lakhs payable to Stmarys University",
              "Scholarships and education loans available as per university policy"
            ],
            accreditation: text(
              "Stmarys University, legally established as Stmarys University, is UGC 2(f) recognized at the university level. Degree, examinations, and certificates are awarded by Stmarys University. Programme-level professional permissions, where required, are verified through official university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Comprehensive clinical exposure and simulation-led training",
              "Industry co-designed modules with Emversity",
              "Strong internship and placement support",
              "Focus on community and inclusive rehabilitation practice"
            ],
            feeDisplay: "₹8 Lakhs",
            intakeDisplay: "July / August"
          },
          {
            slug: "mot",
            name: "MOT",
            level: "PG Program",
            duration: "2 years (advanced coursework + research project/clinical practicum)",
            eligibility: "Bachelor's degree in Occupational Therapy with minimum 50% marks",
            fees: "1.75 Lakh per annum",
            overview: text("This advanced program focuses on specialized recovery strategies for pediatric and neurological cases. You will lead research-driven interventions, using assistive technologies to manage complex patient profiles and advocating for inclusive healthcare delivery across specialized wards."),
            specializations: ["Neuro Science", "Mental Health", "Orthopaedics", "Hand Therapy", "Paediatrics", "Sensory Integration", "Oncology", "Rehabilitation"],
            outcomes: text("Graduates move into clinical leadership and rehabilitation management, overseeing multidisciplinary therapy teams in specialized medical centers."),
            accreditation: text("Stmarys University is UGC 2(f) recognized at the university level. Programme-level professional permissions, where required, are verified through official university notifications or relevant statutory council documents.")
          }
        ]
      },
      {
        slug: "allied-health-sciences",
        name: "Allied Health Technologies",
        about: "",
        programs: [
          {
            slug: "bmlt",
            name: "Medical Lab Technology",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "4 Years (8 Semesters) - Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "Rs. 7.2 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            complimentaryLaptop: "Awarded to students who successfully complete the Head Start Programme",
            industrySkillingPartner: "Emversity (Beyond Odds Technologies Pvt. Ltd.)",
            overview: text(
              "The Bachelor of Medical Laboratory Technology is a four-year undergraduate program that trains students in clinical pathology, microbiology, biochemistry, haematology, histopathology, and molecular diagnostics. The program covers the scientific principles, laboratory techniques, and quality assurance protocols essential for accurate disease diagnosis, equipping graduates with the technical competencies required by diagnostic laboratories, hospitals, and research institutions. This program at Stmarys University, Hyderabad is delivered through a partnership model: Stmarys University provides the academic framework, degree conferral, examinations, and campus infrastructure, while Emversity delivers the industry-skilling component including AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement assistance through its network of 500+ healthcare employer partners. Graduates are equipped to work in clinical pathology laboratories, hospital diagnostic departments, blood banks, public health laboratories, pharmaceutical companies, and biomedical research institutions."
            ),
            eligibilityDetails: text(
              "Candidates must have passed 10+2 (or equivalent) from a recognised board with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB) as principal subjects. Minimum aggregate marks are as prescribed by Stmarys University, with relaxation for SC/ST/OBC as per university norms."
            ),
            admissionProcess: [
              "Visit the Stmarys University official website and complete the online application form",
              "Submit required documents (10+2 marksheet, ID proof, photographs, category certificate if applicable)",
              "Appear for the university entrance examination or merit-based selection as applicable",
              "Receive admission offer from Stmarys University and complete fee payment through the university portal",
              "Enroll in the Head Start Programme, a zero-cost online bridge course to build foundational skills before classes begin",
            ],
            curriculum: [
              {
                year: "Year 1: Foundations of Health Sciences & Laboratory Basics (Semesters 1-2)",
                semesters: [
                  "Human Anatomy",
                  "Pathology (General)",
                  "Human Physiology",
                  "Microbiology (General)",
                  "Biochemistry",
                  "Pharmacology (Basics)",
                  "Introduction to Medical Laboratory Sciences",
                  "Clinical Chemistry - I",
                  "Medical Terminology & Communication",
                  "Constitution of India & Human Rights",
                  "Computer Applications in Healthcare",
                  "First Aid & Basic Life Support",
                  "Environmental Science",
                  "Lab Practicals - I",
                ],
              },
              {
                year: "Year 2: Core Laboratory Sciences (Semesters 3-4)",
                semesters: [
                  "Clinical Haematology & Blood Banking",
                  "Clinical Microbiology (Virology & Parasitology)",
                  "Clinical Microbiology (Bacteriology & Mycology)",
                  "Clinical Immunology & Serology",
                  "Clinical Chemistry - II (Enzymology & Immunochemistry)",
                  "Molecular Biology & Genetics (Basics)",
                  "Histopathology & Cytology Techniques",
                  "Urinalysis & Body Fluid Analysis",
                  "Laboratory Safety & Quality Control",
                  "Medical Ethics & Medicolegal Aspects",
                  "Biomedical Waste Management",
                  "Biostatistics for Laboratory Sciences",
                  "Lab Practicals - II",
                  "Lab Practicals - III",
                ],
              },
              {
                year: "Year 3: Advanced Laboratory Practice (Semesters 5-6)",
                semesters: [
                  "Molecular Diagnostics & PCR Techniques",
                  "Advanced Microbiology (Antimicrobial Resistance & Infection Control)",
                  "Advanced Haematology & Coagulation Studies",
                  "Cytogenetics & Genetic Testing",
                  "Clinical Endocrinology & Toxicology",
                  "Laboratory Automation & Information Systems (LIS)",
                  "Transfusion Medicine & Advanced Blood Banking",
                  "Forensic Laboratory Sciences (Introduction)",
                  "Research Methodology & Scientific Writing",
                  "Hospital Management & Quality Assurance (NABL)",
                  "Clinical Posting - I (Hospital Laboratory)",
                  "Clinical Posting - II",
                ],
              },
              {
                year: "Year 4: Specialisation & Professional Readiness (Semesters 7-8)",
                semesters: [
                  "Advanced Molecular & Genomic Diagnostics",
                  "Professional Development & Soft Skills",
                  "Simulation-Based Laboratory Training",
                  "Cambridge English for Healthcare Professionals",
                  "Clinical Audit & Evidence-Based Practice",
                  "Capstone Project / Research Dissertation",
                  "Elective - I (Molecular Diagnostics / Microbiology / Haematology)",
                  "Elective - II",
                  "Internship - I (Hospital / Diagnostic Lab Rotation)",
                  "Internship - II & Placement Preparation",
                ],
              },
            ],
            highlights: [
              "AR/VR simulation labs",
              "Employer-co-designed modules",
              "Structured clinical internships",
              "Placement assistance through 500+ healthcare employer partners",
              "Head Start Programme as a zero-cost bridge course",
              "Complimentary laptop for students who complete the Head Start Programme",
            ],
            careerOpportunities: [
              "Medical Laboratory Technologist",
              "Clinical Pathology Technician",
              "Microbiologist (Laboratory)",
              "Haematology Technologist",
              "Histopathology Technician",
              "Blood Bank Technologist",
              "Molecular Diagnostics Technician",
              "Clinical Research Associate (Diagnostics)",
            ],
            outcomes: text(
              "Graduates can work in hospital diagnostic laboratories, standalone diagnostic centres, blood banks, public health laboratories, pharmaceutical companies, clinical research organisations, forensic laboratories, and biomedical research institutions."
            ),
            labs: text(
              "AR/VR simulation labs, structured clinical internships, and hands-on laboratory training facilitated through industry-skilling modules."
            ),
            fieldExposure: text(
              "Supervised clinical and operational exposure across hospital diagnostic laboratories, blood banks, research institutions, and related healthcare settings."
            ),
            accreditation: text(
              "Stmarys University is UGC 2(f) recognized at the university level. The degree is awarded solely by Stmarys University, while Emversity handles the industry-skilling component. Students should verify current programme-level professional permissions through published university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Partnership model combining Stmarys University academics with Emversity industry-skilling",
              "Laboratory-focused curriculum with clinical and simulation training",
              "Placement support and internships through a large employer network",
              "Bridge course support before classes begin",
            ],
            feeNotes: [
              "Total program fee: Rs. 7.2 Lakhs",
              "Fees are payable directly to Stmarys University as per the university schedule",
              "Scholarships may be available on merit and category basis as per Stmarys University norms",
            ],
          },
          {
            slug: "bsc-anaesthesia-ot",
            name: "Anesthesia & Operation Theatre Technology",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "4 Years (8 Semesters) - Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "Rs. 7.2 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            complimentaryLaptop: "Awarded to students who successfully complete the Head Start Programme",
            industrySkillingPartner: "Emversity (Beyond Odds Technologies Pvt. Ltd.)",
            overview: text(
              "The Bachelor of Anaesthesia & OT Technology is a four-year undergraduate program that prepares students for careers as anaesthesia technologists and operation theatre technicians. The program covers anaesthesia principles, airway management, patient monitoring, OT protocols, sterilisation, emergency care, and perioperative patient management, equipping graduates with the clinical and technical competencies required by modern hospitals and surgical centres. This program at Stmarys University, Hyderabad is delivered through a partnership model: Stmarys University provides the academic framework, degree conferral, examinations, and campus infrastructure, while Emversity delivers the industry-skilling component including AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement assistance through its network of 500+ healthcare employer partners. Graduates are equipped to work in operation theatres, intensive care units, pain management clinics, cardiac catheterisation labs, and emergency departments across hospitals, medical colleges, and specialised surgical centres."
            ),
            eligibilityDetails: text(
              "Candidates must have passed 10+2 (or equivalent) from a recognised board with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB) as principal subjects. Minimum aggregate marks are as prescribed by Stmarys University, with relaxation for SC/ST/OBC as per university norms."
            ),
            admissionProcess: [
              "Visit the Stmarys University official website and complete the online application form",
              "Submit required documents (10+2 marksheet, ID proof, photographs, category certificate if applicable)",
              "Appear for the university entrance examination or merit-based selection as applicable",
              "Receive admission offer from Stmarys University and complete fee payment through the university portal",
              "Enroll in the Head Start Programme, a zero-cost online bridge course to build foundational skills before classes begin",
            ],
            curriculum: [
              {
                year: "Year 1: Foundations of Health Sciences & Basic Anaesthesia (Semesters 1-2)",
                semesters: [
                  "Human Anatomy",
                  "Pathology & Microbiology",
                  "Human Physiology",
                  "Pharmacology (General)",
                  "Biochemistry",
                  "Physics for Allied Health Sciences",
                  "Basics of Anaesthesiology",
                  "Introduction to Operation Theatre Technology",
                  "Medical Terminology & Communication",
                  "Constitution of India & Human Rights",
                  "Computer Applications in Healthcare",
                  "First Aid & Basic Life Support",
                  "Environmental Science",
                  "Lab Practicals - I",
                ],
              },
              {
                year: "Year 2: Core Anaesthesia & OT Sciences (Semesters 3-4)",
                semesters: [
                  "Anaesthesia Techniques (General & Regional)",
                  "Advanced Anaesthesia Techniques",
                  "Airway Management & Ventilation",
                  "Pain Management & Palliative Care",
                  "OT Instruments, Equipment & Sterilisation",
                  "OT Safety, Protocols & Infection Control",
                  "Patient Monitoring Systems",
                  "Emergency & Trauma Care (Basics)",
                  "Pharmacology (Anaesthetic Agents)",
                  "Biomedical Waste Management",
                  "Perioperative Nursing Care",
                  "Medical Ethics & Medicolegal Aspects",
                  "Lab Practicals - II",
                  "Lab Practicals - III",
                ],
              },
              {
                year: "Year 3: Advanced Clinical Practice (Semesters 5-6)",
                semesters: [
                  "Cardiac Anaesthesia & Perfusion Technology",
                  "Obstetric & Geriatric Anaesthesia",
                  "Neuro & Paediatric Anaesthesia",
                  "Regional Anaesthesia & Ultrasound-Guided Techniques",
                  "Critical Care & ICU Management",
                  "Day Care Anaesthesia & Ambulatory Surgery",
                  "Advanced Patient Monitoring & Diagnostics",
                  "Disaster Management & Mass Casualty Care",
                  "Research Methodology & Biostatistics",
                  "Hospital Management & Quality Assurance",
                  "Clinical Posting - I (OT & ICU)",
                  "Clinical Posting - II",
                ],
              },
              {
                year: "Year 4: Specialisation & Professional Readiness (Semesters 7-8)",
                semesters: [
                  "Advanced OT Management & Leadership",
                  "Professional Development & Soft Skills",
                  "Simulation-Based Clinical Training",
                  "Cambridge English for Healthcare Professionals",
                  "Clinical Audit & Evidence-Based Practice",
                  "Capstone Project / Research Dissertation",
                  "Elective - I (Cardiac OT / Pain Clinic / Trauma)",
                  "Elective - II",
                  "Internship - I (Hospital Clinical Rotation)",
                  "Internship - II & Placement Preparation",
                ],
              },
            ],
            highlights: [
              "AR/VR simulation labs",
              "Employer-co-designed modules",
              "Structured clinical internships",
              "Placement assistance through 500+ healthcare employer partners",
              "Head Start Programme as a zero-cost bridge course",
              "Complimentary laptop for students who complete the Head Start Programme",
            ],
            careerOpportunities: [
              "Anaesthesia Technologist",
              "Operation Theatre Technician",
              "ICU Technologist",
              "Perfusion Technology Assistant",
              "Pain Management Clinic Technician",
              "Anaesthesia Equipment Specialist",
              "Emergency Care Technologist",
              "Clinical Research Associate (Anaesthesia)",
            ],
            outcomes: text(
              "Graduates can work in operation theatres, intensive care units, pain management clinics, cardiac catheterisation labs, and emergency departments across hospitals, medical colleges, and specialised surgical centres."
            ),
            labs: text(
              "AR/VR simulation labs, structured clinical internships, and hands-on anaesthesia and OT training facilitated through industry-skilling modules."
            ),
            fieldExposure: text(
              "Supervised clinical and operational exposure across operation theatres, intensive care units, surgical centres, and related healthcare settings."
            ),
            accreditation: text(
              "Stmarys University is UGC 2(f) recognized at the university level. The degree is awarded solely by Stmarys University, while Emversity handles the industry-skilling component. Students should verify current programme-level professional permissions through published university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Partnership model combining Stmarys University academics with Emversity industry-skilling",
              "Anaesthesia and OT-focused curriculum with clinical and simulation training",
              "Placement support and internships through a large employer network",
              "Bridge course support before classes begin",
            ],
            feeNotes: [
              "Total program fee: Rs. 7.2 Lakhs",
              "Fees are payable directly to Stmarys University as per the university schedule",
              "Scholarships may be available on merit and category basis as per Stmarys University norms",
            ],
          },
          {
            slug: "bcvt",
            name: "Cardiovascular Technology",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "4 Years (8 Semesters) - Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "Rs. 7.2 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            complimentaryLaptop: "Awarded to students who successfully complete the Head Start Programme",
            industrySkillingPartner: "Emversity (Beyond Odds Technologies Pvt. Ltd.)",
            overview: text(
              "The Bachelor of Cardiovascular Technology is a four-year undergraduate program that trains students in the diagnosis, monitoring, and treatment support of cardiovascular diseases. The program covers cardiac anatomy, echocardiography, cardiac catheterisation, electrophysiology, vascular technology, and cardiac rehabilitation, equipping graduates with the technical expertise required by cardiology departments, cardiac catheterisation labs, and cardiovascular research centres. This program at Stmarys University, Hyderabad is delivered through a partnership model: Stmarys University provides the academic framework, degree conferral, examinations, and campus infrastructure, while Emversity delivers the industry-skilling component including AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement assistance through its network of 500+ healthcare employer partners. Graduates are equipped to work in cardiology departments, cardiac catheterisation laboratories, echocardiography units, electrophysiology labs, cardiac rehabilitation centres, and cardiovascular research institutions."
            ),
            eligibilityDetails: text(
              "Candidates must have passed 10+2 (or equivalent) from a recognised board with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB) as principal subjects. Minimum aggregate marks are as prescribed by Stmarys University, with relaxation for SC/ST/OBC as per university norms."
            ),
            admissionProcess: [
              "Visit the Stmarys University official website and complete the online application form",
              "Submit required documents (10+2 marksheet, ID proof, photographs, category certificate if applicable)",
              "Appear for the university entrance examination or merit-based selection as applicable",
              "Receive admission offer from Stmarys University and complete fee payment through the university portal",
              "Enroll in the Head Start Programme, a zero-cost online bridge course to build foundational skills before classes begin",
            ],
            curriculum: [
              {
                year: "Year 1: Foundations of Health Sciences & Cardiovascular Basics (Semesters 1-2)",
                semesters: [
                  "Human Anatomy",
                  "Pathology & Microbiology",
                  "Human Physiology",
                  "Pharmacology (General)",
                  "Biochemistry",
                  "Physics for Allied Health Sciences",
                  "Introduction to Cardiovascular Sciences",
                  "Cardiovascular Anatomy & Physiology (Advanced)",
                  "Medical Terminology & Communication",
                  "Constitution of India & Human Rights",
                  "Computer Applications in Healthcare",
                  "First Aid & Basic Life Support",
                  "Environmental Science",
                  "Lab Practicals - I",
                ],
              },
              {
                year: "Year 2: Core Cardiovascular Sciences (Semesters 3-4)",
                semesters: [
                  "Electrocardiography (ECG) - Principles & Interpretation",
                  "Cardiac Catheterisation & Angiography",
                  "Echocardiography (Non-Invasive Cardiac Imaging)",
                  "Electrophysiology & Pacemaker Technology",
                  "Cardiac Pharmacology",
                  "Vascular Technology & Peripheral Doppler",
                  "Haemodynamic Monitoring",
                  "Cardiac Rehabilitation Principles",
                  "Cardiovascular Pathology",
                  "Medical Ethics & Medicolegal Aspects",
                  "Biomedical Instrumentation for Cardiology",
                  "Infection Control & Biomedical Waste Management",
                  "Lab Practicals - II",
                  "Lab Practicals - III",
                ],
              },
              {
                year: "Year 3: Advanced Clinical Practice (Semesters 5-6)",
                semesters: [
                  "Advanced Echocardiography (TEE, Stress Echo)",
                  "Cardiac Surgery Assistance & Perfusion Basics",
                  "Interventional Cardiology (PCI, TAVI, Device Closures)",
                  "Heart Failure Management & Mechanical Circulatory Support",
                  "Paediatric Cardiology & Congenital Heart Disease",
                  "Preventive Cardiology & Lipidology",
                  "Cardiac CT & MRI (Introduction)",
                  "Nuclear Cardiology (Introduction)",
                  "Research Methodology & Biostatistics",
                  "Hospital Management & Quality Assurance",
                  "Clinical Posting - I (Cath Lab & Echo Lab)",
                  "Clinical Posting - II",
                ],
              },
              {
                year: "Year 4: Specialisation & Professional Readiness (Semesters 7-8)",
                semesters: [
                  "Advanced Cath Lab Procedures & Leadership",
                  "Professional Development & Soft Skills",
                  "Simulation-Based Cardiovascular Training",
                  "Cambridge English for Healthcare Professionals",
                  "Clinical Audit & Evidence-Based Practice",
                  "Capstone Project / Research Dissertation",
                  "Elective - I (Interventional / Electrophysiology / Vascular)",
                  "Elective - II",
                  "Internship - I (Hospital Clinical Rotation)",
                  "Internship - II & Placement Preparation",
                ],
              },
            ],
            highlights: [
              "AR/VR simulation labs",
              "Employer-co-designed modules",
              "Structured clinical internships",
              "Placement assistance through 500+ healthcare employer partners",
              "Head Start Programme as a zero-cost bridge course",
              "Complimentary laptop for students who complete the Head Start Programme",
            ],
            careerOpportunities: [
              "Cardiovascular Technologist",
              "Echocardiography Technician",
              "Cardiac Catheterisation Lab Technologist",
              "Electrophysiology Technician",
              "Vascular Technology Specialist",
              "Cardiac Rehabilitation Technologist",
              "Non-Invasive Cardiology Technician",
              "Clinical Research Associate (Cardiology)",
            ],
            outcomes: text(
              "Graduates can work in cardiology departments, cardiac catheterisation laboratories, echocardiography units, electrophysiology labs, cardiac rehabilitation centres, and cardiovascular research institutions."
            ),
            labs: text(
              "AR/VR simulation labs, structured clinical internships, and hands-on cardiovascular technology training facilitated through industry-skilling modules."
            ),
            fieldExposure: text(
              "Supervised clinical and operational exposure across cardiology departments, cath labs, echo labs, rehabilitation centres, and related healthcare settings."
            ),
            accreditation: text(
              "Stmarys University is UGC 2(f) recognized at the university level. The degree is awarded solely by Stmarys University, while Emversity handles the industry-skilling component. Students should verify current programme-level professional permissions through published university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Partnership model combining Stmarys University academics with Emversity industry-skilling",
              "Cardiovascular-focused curriculum with clinical and simulation training",
              "Placement support and internships through a large employer network",
              "Bridge course support before classes begin",
            ],
            feeNotes: [
              "Total program fee: Rs. 7.2 Lakhs",
              "Fees are payable directly to Stmarys University as per the university schedule",
              "Scholarships may be available on merit and category basis as per Stmarys University norms",
            ],
          },
          {
            slug: "betcms",
            name: "Emergency Medical Technology",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "4 Years (8 Semesters) - Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "Rs. 7.2 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            complimentaryLaptop: "Awarded to students who successfully complete the Head Start Programme",
            industrySkillingPartner: "Emversity (Beyond Odds Technologies Pvt. Ltd.)",
            overview: text(
              "The Bachelor of Emergency/Trauma Care Management System is a four-year undergraduate program designed to train students as emergency medical professionals capable of managing critical patients in emergency departments, trauma centres, and pre-hospital care settings. The program covers emergency medicine principles, trauma assessment, triage systems, advanced life support, disaster management, and critical care, equipping graduates with the rapid-response clinical skills demanded by hospitals, ambulance services, and disaster relief organisations. This program at Stmarys University, Hyderabad is delivered through a partnership model: Stmarys University provides the academic framework, degree conferral, examinations, and campus infrastructure, while Emversity delivers the industry-skilling component including AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement assistance through its network of 500+ healthcare employer partners. Graduates are equipped to work in hospital emergency departments, trauma centres, ambulance services, disaster response units, critical care units, and defence medical services."
            ),
            eligibilityDetails: text(
              "Candidates must have passed 10+2 (or equivalent) from a recognised board with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB) as principal subjects. Minimum aggregate marks are as prescribed by Stmarys University, with relaxation for SC/ST/OBC as per university norms."
            ),
            admissionProcess: [
              "Visit the Stmarys University official website and complete the online application form",
              "Submit required documents (10+2 marksheet, ID proof, photographs, category certificate if applicable)",
              "Appear for the university entrance examination or merit-based selection as applicable",
              "Receive admission offer from Stmarys University and complete fee payment through the university portal",
              "Enroll in the Head Start Programme, a zero-cost online bridge course to build foundational skills before classes begin",
            ],
            curriculum: [
              {
                year: "Year 1: Foundations of Health Sciences & Emergency Medicine Basics (Semesters 1-2)",
                semesters: [
                  "Human Anatomy",
                  "Pathology & Microbiology",
                  "Human Physiology",
                  "Pharmacology (General)",
                  "Biochemistry",
                  "First Aid & Basic Life Support (BLS)",
                  "Introduction to Emergency Medicine",
                  "Introduction to Trauma Care",
                  "Medical Terminology & Communication",
                  "Constitution of India & Human Rights",
                  "Computer Applications in Healthcare",
                  "Health Education & Community Medicine",
                  "Environmental Science",
                  "Lab Practicals - I",
                ],
              },
              {
                year: "Year 2: Core Emergency & Trauma Sciences (Semesters 3-4)",
                semesters: [
                  "Emergency Patient Assessment & Triage",
                  "Paediatric & Neonatal Emergency Care",
                  "Advanced Cardiac Life Support (ACLS)",
                  "Advanced Trauma Life Support (ATLS) Concepts",
                  "Trauma Assessment & Management",
                  "Burns, Toxicology & Environmental Emergencies",
                  "Emergency Pharmacology",
                  "Emergency Radiology & Diagnostics",
                  "Pre-Hospital Care & Ambulance Operations",
                  "Medical Ethics & Medicolegal Aspects",
                  "Infection Control & Biomedical Waste Management",
                  "Emergency Communication & Documentation",
                  "Lab Practicals - II",
                  "Lab Practicals - III",
                ],
              },
              {
                year: "Year 3: Advanced Clinical Practice (Semesters 5-6)",
                semesters: [
                  "Critical Care & ICU Management",
                  "Obstetric & Gynaecological Emergencies",
                  "Disaster Management & Mass Casualty Incident Response",
                  "Neurological & Psychiatric Emergencies",
                  "Surgical Emergencies & Perioperative Care",
                  "Orthopaedic Trauma & Fracture Management",
                  "Advanced Monitoring & Point-of-Care Diagnostics",
                  "Air Ambulance & Aeromedical Evacuation (Introduction)",
                  "Research Methodology & Biostatistics",
                  "Hospital Administration & Quality Assurance",
                  "Clinical Posting - I (Emergency Department & Trauma Centre)",
                  "Clinical Posting - II",
                ],
              },
              {
                year: "Year 4: Specialisation & Professional Readiness (Semesters 7-8)",
                semesters: [
                  "Emergency Department Operations & Leadership",
                  "Professional Development & Soft Skills",
                  "Simulation-Based Emergency Training",
                  "Cambridge English for Healthcare Professionals",
                  "Clinical Audit & Evidence-Based Practice",
                  "Capstone Project / Research Dissertation",
                  "Elective - I (Disaster Medicine / Critical Care / Pre-Hospital)",
                  "Elective - II",
                  "Internship - I (Hospital & Pre-Hospital Clinical Rotation)",
                  "Internship - II & Placement Preparation",
                ],
              },
            ],
            highlights: [
              "AR/VR simulation labs",
              "Employer-co-designed modules",
              "Structured clinical internships",
              "Placement assistance through 500+ healthcare employer partners",
              "Head Start Programme as a zero-cost bridge course",
              "Complimentary laptop for students who complete the Head Start Programme",
            ],
            careerOpportunities: [
              "Emergency Medical Technician (EMT)",
              "Trauma Care Technologist",
              "Emergency Department Technician",
              "Pre-Hospital Care Specialist",
              "Disaster Management Coordinator",
              "Critical Care Technologist",
              "Ambulance Operations Manager",
              "Clinical Research Associate (Emergency Medicine)",
            ],
            outcomes: text(
              "Graduates can work in hospital emergency departments, Level I-III trauma centres, ambulance services, pre-hospital care networks, disaster relief organisations, defence medical services, industrial emergency units, and air ambulance services."
            ),
            labs: text(
              "AR/VR simulation labs, structured clinical internships, and hands-on emergency care training facilitated through industry-skilling modules."
            ),
            fieldExposure: text(
              "Supervised clinical and operational exposure across emergency departments, trauma centres, ambulance services, disaster response units, and related healthcare settings."
            ),
            accreditation: text(
              "Stmarys University is UGC 2(f) recognized at the university level. The degree is awarded solely by Stmarys University, while Emversity handles the industry-skilling component. Students should verify current programme-level professional permissions through published university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Partnership model combining Stmarys University academics with Emversity industry-skilling",
              "Emergency and trauma-focused curriculum with clinical and simulation training",
              "Placement support and internships through a large employer network",
              "Bridge course support before classes begin",
            ],
            feeNotes: [
              "Total program fee: Rs. 7.2 Lakhs",
              "Fees are payable directly to Stmarys University as per the university schedule",
              "Scholarships may be available on merit and category basis as per Stmarys University norms",
            ],
          },
          {
            slug: "b-optometry",
            name: "Optometry",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "5 Years (10 Semesters) – Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "₹8 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            overview: text(
              "The Bachelor of Optometry is a five-year undergraduate program that trains students in the examination, diagnosis, and management of visual disorders and eye diseases. The program covers ocular anatomy, refraction, contact lens fitting, binocular vision, low vision rehabilitation, paediatric optometry, and community eye care — equipping graduates with the clinical and optical skills required by eye hospitals, optical retail chains, vision research centres, and community eye health programmes."
            ),
            schoolTitle: "School of Health & Allied Health Sciences - Stmarys University",
            schoolDescription: text(
              "The School of Health & Allied Health Sciences prepares students for applied clinical and rehabilitative careers across allied health fields. This program combines Stmarys University academic framework with Emversity's industry-skilling modules to deliver practice-ready graduates."
            ),
            highlights: [
              "Five-year clinical and professional optometry training",
              "Industry-skilling partnership with Emversity: AR/VR simulation and employer-designed modules",
              "Structured clinical internships and placement assistance",
              "Head Start Programme with complimentary laptop for successful participants"
            ],
            durationNote: text("10 semesters combining foundational sciences, clinical rotations, and professional practicum."),
            eligibilityNote: text(
              "Requires 10+2 with Physics, Chemistry and Biology/Mathematics; minimum aggregate and category-based relaxations as per Stmarys University norms. Admissions processed by Stmarys University through the official admissions portal."
            ),
            eligibilityPoints: [
              "10+2 with Physics, Chemistry and Biology/Mathematics (PCB/PCMB)",
              "Selection based on university entrance / merit as applicable"
            ],
            feeNotes: [
              "Total program fee: ₹8 Lakhs payable directly to Stmarys University",
              "Scholarships available as per Stmarys University policy",
              "Education loans available from leading banks and NBFCs"
            ],
            overviewDetails: text(
              "Stmarys University provides the academic framework, degree conferral, examinations, and campus infrastructure, while Emversity delivers industry-skilling including AR/VR simulation labs, employer-co-designed modules, structured clinical internships, and placement assistance through a large network of healthcare employers."
            ),
            semesterSummary: text(
              "The curriculum progresses from foundational health sciences and visual sciences (Years 1-2), through core optometric sciences and clinical refraction (Years 2-3), to advanced diagnostics, contact lens practice, low vision rehabilitation, and internships (Years 3-5), concluding with a capstone project and professional readiness preparation."
            ),
            outcomes: text(
              "Graduates are prepared to work as optometrists, contact lens practitioners, low vision specialists, paediatric optometrists, optical dispensing specialists, clinical refractionists, and community eye health coordinators in hospitals, clinics, optical retail, research organizations, and public health programmes."
            ),
            careerOpportunities: [
              "Optometrist",
              "Clinical Refractionist",
              "Contact Lens Practitioner",
              "Low Vision Rehabilitation Specialist",
              "Paediatric Optometrist",
              "Optical Dispensing Specialist",
              "Clinical Research Associate (Ophthalmology)"
            ],
            labs: text(
              "AR/VR simulation labs, advanced ocular diagnostics (OCT, Visual Fields, Fundus Imaging), and supervised clinical postings in partner eye hospitals."
            ),
            fieldExposure: text(
              "Clinical rotations and internships in eye hospitals, outpatient departments, optical dispensing units, and community eye health camps."
            ),
            accreditation: text(
              "Stmarys University, legally established as Stmarys University, is UGC 2(f) recognized at the university level. Degree, examinations, and certificates are awarded solely by Stmarys University. Applicants should verify current programme-level professional permissions through published university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Integrated academic degree with industry-skilling for workplace readiness",
              "Extensive clinical exposure and AR/VR simulation training",
              "Complimentary Head Start Programme with laptop support",
              "Placement assistance through Emversity's employer network"
            ],
            feeDisplay: "₹8 Lakhs",
            intakeDisplay: "July / August"
          },
          {
            slug: "brt",
            name: "Radiotherapy Technology",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "4 Years (8 Semesters) – Full-Time",
            campus: "Stmarys University Campus, Hyderabad, Telangana",
            eligibility: "12th Pass (10+2) with Physics, Chemistry, and Biology/Mathematics (PCB/PCMB)",
            fees: "₹7.2 Lakhs (Total Program Fee)",
            intake: "July / August (as per university academic calendar)",
            overview: text(
              "The Bachelor of Radiotherapy Technology is a four-year undergraduate program that prepares students for careers as radiation therapy technologists who plan, deliver, and monitor radiation treatments for cancer patients. The program covers radiation physics, radiation biology, treatment planning systems, linear accelerator operations, brachytherapy, dosimetry, and radiation safety — equipping graduates with the clinical and technical competencies required by oncology centres, cancer hospitals, and radiation therapy departments."
            ),
            schoolTitle: "School of Health & Allied Health Sciences - Stmarys University",
            schoolDescription: text(
              "This program combines Stmarys University academic governance with Emversity's industry-skilling to deliver practice-ready radiotherapy technologists, emphasising simulation, clinical postings, and treatment planning skills."
            ),
            highlights: [
              "Comprehensive radiotherapy technology curriculum",
              "Hands-on LINAC and brachytherapy training",
              "AR/VR simulation and clinical internships via Emversity",
              "Professional readiness and placement assistance"
            ],
            durationNote: text("8 semesters combining foundational sciences, clinical training, and department rotations."),
            eligibilityNote: text(
              "Requires 10+2 with Physics, Chemistry and Biology/Mathematics; selection based on Stmarys University entrance or merit as applicable."
            ),
            eligibilityPoints: [
              "10+2 with Physics, Chemistry and Biology/Mathematics (PCB/PCMB)",
              "Minimum aggregate as per Stmarys University guidelines"
            ],
            feeNotes: [
              "Total program fee: ₹7.2 Lakhs payable directly to Stmarys University",
              "Scholarships and education loans available as per university policies"
            ],
            semesterSummary: text(
              "Covers radiation physics, treatment planning (IMRT/VMAT), dosimetry, brachytherapy, LINAC operations, IGRT, stereotactic techniques, patient positioning, and clinical postings across oncology departments."
            ),
            outcomes: text(
              "Graduates are prepared to work as Radiation Therapy Technologists, Treatment Planners, Dosimetry Technicians, LINAC Operators, Brachytherapy Technologists, and Radiation Safety Officers in cancer hospitals, radiation oncology centres, and medical physics departments."
            ),
            careerOpportunities: [
              "Radiation Therapy Technologist",
              "Radiotherapy Treatment Planner",
              "Dosimetry Technician",
              "LINAC Operator",
              "Brachytherapy Technologist",
              "Radiation Safety Officer (Assistant)",
              "Medical Physics Assistant"
            ],
            labs: text(
              "LINAC and simulation labs, treatment planning workstations, dosimetry and QA equipment, AR/VR simulation for treatment workflow training."
            ),
            fieldExposure: text(
              "Clinical rotations in radiation oncology departments, hands-on treatment planning, and supervised brachytherapy sessions."
            ),
            accreditation: text(
              "Stmarys University, legally established as Stmarys University, is UGC 2(f) recognized at the university level. Degree and certifications are awarded by Stmarys University. Applicants should confirm current programme-level professional permissions through published university notifications or relevant statutory council documents."
            ),
            whyChoose: [
              "Industry-skilling partnership with Emversity",
              "Strong clinical exposure and equipment-focused training",
              "Placement assistance and internship network",
              "Simulation-led learning and professional development modules"
            ],
            feeDisplay: "₹7.2 Lakhs",
            intakeDisplay: "July / August"
          },
          {
            slug: "bsc-forensic-science",
            name: "B.Sc. Forensic Science",
            level: "UG Program",
            partnerCode: "EDIN",
            duration: "3 Years (6 Semesters)",
            eligibility: "10+2 Science stream",
            fees: "1,50,000 per year",
            overview: text("Uncover the hidden truths of investigative science by mastering the chemical, biological, and digital analysis techniques that drive modern criminal justice. Students transition from foundational science to active crime scene simulation, learning to identify, preserve, and analyze evidence that bridges the gap between the lab and the courtroom."),
            schoolTitle: "School of Health & Allied Health Sciences - Stmarys University",
            schoolDescription: text("The School of Health & Allied Health Sciences focuses on the practical application of scientific discovery across investigative and creative domains. We prepare students with the analytical and technical skills required for modern scientific and professional fields."),
            highlights: [
              "Simulating crime scene investigation and evidence preservation",
              "Hands-on lab training in forensic toxicology and DNA profiling",
              "Mastering chemical analysis for fingerprint and trace evidence detection",
              "Exploring digital forensics and information security investigative methods",
              "Analyzing the link between forensic science and rehabilitative health"
            ],
            durationNote: text("6 semesters of investigative science and laboratory drills."),
            eligibilityNote: text("Requires a background in science and high analytical focus."),
            eligibilityPoints: ["10+2 with Science (Biology/Math/Chemistry)", "Selection based on academic merit and entrance performance"],
            feeNotes: ["Specialized laboratory and crime-scene kit fees", "Standard examination charges"],
            specializationsIntro: text("Technical focus:"),
            specializations: ["Crime Scene Analysis", "Forensic Toxicology", "DNA Profiling", "Digital Investigation", "Trace Evidence Science"],
            careerOpportunities: ["Forensic Investigator", "Lab Analyst", "Toxicology Specialist", "Crime Scene Coordinator", "Science Research Associate"],
            outcomes: text("Graduates are prepared to serve as specialized investigators and analysts in state forensic labs and private investigative firms."),
            salaryIndia: "3 LPA - 6 LPA",
            salaryInternational: "$40,000 - $80,000 annually",
            salaryNote: text("Reflects market demand for specialized scientific investigative talent."),
            accreditation: text("Degree awarded by Stmarys University; curriculum focus on contemporary forensic standards."),
            accreditationPoints: ["Awarded by Stmarys University", "Technical labs focused on experimental and investigative science"],
            whyChoose: [
              "Hands-on crime scene simulation and investigative drills",
              "Focus on practical lab analysis for high-stakes evidence detection",
              "Academic mentorship from experts in forensic chemistry and biology",
              "Learning in a research-oriented institution"
            ],
            whyChooseNote: text("Empowers you to apply the power of science to the pursuit of justice."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("On-campus accommodation including meals.")
          }
        ]
      }
    ]
  },
  {
    slug: "psychology",
    name: "School of Psychology",
    short: "Psychology",
    about: text("The School of Psychology at Stmarys University serves as a specialized center for mental health education and clinical training. Programs are structured around practical research and rehabilitative strategies, preparing students to evaluate behavioral patterns and implement psychological interventions in diverse community and medical settings."),
    departments: [
      {
        slug: "clinical-psychology",
        name: "Clinical Psychology",
        about: text("The Department of Clinical Psychology focuses on the science of diagnosing and managing mental health disorders through direct clinical exposure. Students engage in supervised assessment drills and therapeutic case studies to master the tools required for evidence-based mental health care."),
        programs: [
          {
            slug: "bsc-clinical-psychology",
            name: "B.Sc. Clinical Psychology",
            level: "UG Program",
            duration: "4 years (full-time undergraduate program, 6 semesters)",
            eligibility: "10+2 in any stream; background in science preferred but not mandatory",
            fees: "1.5 Lakh per annum",
            overview: text("Students dive into the mechanics of human behavior by conducting controlled observations and learning the nuances of psychological testing. You will learn to map cognitive processes, assess emotional triggers, and participate in case-based discussions that reflect real-world clinical scenarios in mental health departments."),
            outcomes: text("Graduates transition into support roles within psychiatric clinics and rehabilitation centers, assisting in the implementation of therapeutic plans and behavioral monitoring for patients."),
            accreditation: text("Degree awarded by Stmarys University, a UGC 2(f) recognized university. Professional permissions for advanced regulated pathways, where required, are verified through official university notifications or relevant statutory council documents.")
          },
          {
            slug: "ma-clinical-psychology",
            name: "M.A. Clinical Psychology",
            level: "PG Program",
            duration: "2 years",
            eligibility: "Bachelor's in Psychology or any discipline with psychology as a paper with 50%+ marks",
            fees: "1.75 Lakh per annum",
            overview: text("This postgraduate track focuses on mastering complex diagnostic protocols and evidence-based psychotherapy techniques through intensive fieldwork. You will gain proficiency in managing specialized patient cases and designing psychological intervention programs that address severe psychopathology in diverse clinical settings."),
            outcomes: text("Prepares you for lead consulting roles in mental health services and faculty positions, with a focus on delivering specialized clinical care in high-pressure medical and social welfare environments."),
            accreditation: text("Degree awarded by Stmarys University, a UGC 2(f) recognized university. Eligibility for further regulated professional pathways should be verified through the applicable statutory council and published university documents.")
          },
          { slug: "professional-diploma-clinical-psychology", name: "Professional Diploma in clinical Psychology(PDCP)", level: "Diploma" }
        ]
      },
      {
        slug: "rehabilitation-psychology",
        name: "Rehabilitation Psychology",
        about: text("This department specializes in helping individuals with chronic disabilities adapt to cognitive and physical challenges. Training focuses on vocational assessment and psychosocial support strategies used in long-term recovery centers."),
        programs: [
          { slug: "pg-diploma-rehabilitation-psychology", name: "P.G. Diploma in Rehabilitation Psychology ( PGDRP)", level: "PG Diploma" }
        ]
      },
      {
        slug: "applied-psychology-behavioural-health",
        name: "Applied Psychology & Behavioral Health",
        about: text("Focuses on the practical application of psychological science in corporate, educational, and digital spaces. Students learn to use behavioral metrics to improve organizational productivity and individual well-being."),
        programs: [
          {
            slug: "b-psychology-applied-behavioural",
            name: "B.Psychology",
            level: "UG Program",
            duration: "4 years (full-time undergraduate program, 6 semesters)",
            eligibility: "10+2 in any stream; background in psychology not mandatory",
            fees: "1.5 Lakh per annum",
            overview: text("Explore how psychological principles solve practical problems in education, business, and community settings by analyzing human interactions. Students learn to draft behavioral modification plans and conduct organizational assessments to enhance group performance and individual mental well-being in professional environments."),
            specializations: ["Neuro Psychology", "Organizational Psychology", "Forensic Psychology", "School Psychology", "Sports Psychology", "Cyber Psychology", "Military Psychology"],
            outcomes: text("You will be equipped to work in school counseling units, corporate HR departments as behavioral experts, and as program coordinators for mental health NGOs."),
            accreditation: text("Curriculum aligned with Indian Psychological Association recommendations, supporting readiness for advanced postgraduate studies.")
          },
          {
            slug: "m-psychology-applied-behavioural",
            name: "M. Psychology",
            level: "PG Program",
            duration: "2 years",
            eligibility: "Bachelor's in Psychology or any discipline with psychology as a paper with 50%+ marks",
            fees: "1.75 Lakh per annum",
            overview: text("Master specialized domains like Neuropsychology and Forensic Psychology by applying research-driven approaches to understand complex behavioral patterns. The program involves using digital therapy frameworks and specialized assessment tools to navigate legal, corporate, and competitive landscapes in behavioral health."),
            specializations: ["Neuro Psychology", "Organizational Psychology", "Forensic Psychology", "School Psychology", "Sports Psychology", "Cyber Psychology", "Military Psychology"],
            outcomes: text("Career paths include roles as Behavioral Health Consultants and specialized investigators in legal and military settings, utilizing expert profiling and modification skills."),
            accreditation: text("Degree awarded by Stmarys University, a UGC 2(f) recognized university. Eligibility for further regulated professional pathways should be verified through published university notifications or relevant statutory council documents.")
          }
        ]
      }
    ]
  },
  {
    slug: "nursing-sciences",
    name: "School of Nursing",
    short: "Nursing",
    about: text("Programs in nursing from undergraduate to postgraduate level."),
    departments: [
      {
        slug: "nursing",
        name: "Nursing",
        about: "",
        programs: [
          { slug: "bsc-nursing", name: "B.Sc. Nursing", level: "UG Program" },
          { slug: "msc-nursing", name: "M.Sc. Nursing", level: "PG Program" }
        ]
      }
    ]
  },
  {
    slug: "engineering-emerging-technologies",
    name: "School of Engineering & Emerging Technologies",
    short: "Engineering & Emerging Technologies",
    about: text("Programs in rehabilitation engineering, assistive technologies, computer science, artificial intelligence, machine learning, and data science as shown in the academic structure."),
    departments: [
      {
        slug: "rehabilitation-engineering-assistive-technologies",
        name: "Rehabilitation Engineering & Assistive Technologies",
        about: "",
        programs: [
          {
            slug: "btech-rehabilitation-engineering-prosthetics-orthotics-assistive-technologies",
            name: "B.Tech Rehabilitation Engineering (Prosthetics, Orthotics & Assistive Technologies)",
            level: "UG Program"
          },
          {
            slug: "btech-biomedical-ai-robotics",
            name: "B.Tech Biomedical AI & Robotics",
            level: "UG Program",
            partnerCode: "IIAT"
          }
        ]
      },
      {
        slug: "computer-science-engineering",
        name: "Computer Science & Engineering",
        about: "",
        programs: [
          {
            slug: "btech-cse-iiat",
            name: "B.Tech CSE",
            level: "UG Program",
            partnerCode: "QTST",
            partnerCodes: ["QTST", "IIAT"],
            partnerLeadUrl: APPLY_PORTAL_URL,
            duration: "4 Years (8 Semesters)",
            eligibility: "10+2 with Physics, Chemistry, and Mathematics (PCM); entrance process as applicable",
            fees: "1,50,000 per year",
            overview: text("Students engineer scalable software architectures by mastering programming paradigms and system-level integration. You will implement computational models that drive digital health innovations and secure enterprise data infrastructures in the modern technology landscape."),
            schoolTitle: "School of Engineering and Technology - Stmarys University",
            schoolDescription: text("The School of Engineering is a center for technical advancement where computing power meets medical necessity. Focus is on creating digital tools that facilitate long-term patient recovery and streamline healthcare operations through data-driven engineering."),
            highlights: [
              "8-semester professional track in architectural software design",
              "Hands-on system building in specialized coding environments",
              "Implementation of neural networks and distributed cloud systems",
              "Direct participation in technical sprints and software life-cycle projects",
              "Engineering digital solutions for assistive technology sectors"
            ],
            durationNote: text("The program involves architectural system design, laboratory drills, and technical research sprints."),
            eligibilityNote: text("Admission eligibility follows university norms for engineering disciplines."),
            eligibilityPoints: [
              "10+2 with Physics, Chemistry, and Mathematics (PCM)",
              "Qualifying entrance examination score",
              "Academic performance as per university norms"
            ],
            feeNotes: ["Examination fees", "Laboratory and project expenses", "Technical event and workshop charges"],
            specializationsIntro: text("Technical domains include:"),
            specializations: ["AI & ML Architecture", "Data Infrastructure", "Cyber Security Systems", "Cloud Computing Strategy", "Enterprise Software Engineering"],
            careerOpportunities: ["Full-Stack Software Engineer", "Cloud Architect", "AI Systems Developer", "Cyber Security Analyst", "Data Systems Engineer"],
            outcomes: text("Graduates become the architects of digital infrastructure, working as full-stack engineers and cloud specialists in global tech firms and healthcare startups."),
            salaryIndia: "4 LPA - 8 LPA",
            salaryInternational: "$60,000 - $100,000 annually",
            salaryNote: text("Reflects entry-level market trends for software engineering roles."),
            accreditation: text("Degree awarded by Stmarys University. Program aligned with global software engineering and architecture standards."),
            accreditationPoints: [
              "Degree awarded by Stmarys University",
              "Aligned with modern technology architecture requirements",
              "Technical curriculum vetted by IT industry mentors"
            ],
            whyChoose: [
              "Technical curriculum linked with high-impact medical engineering",
              "Access to advanced labs for collaborative system building",
              "Focus on verifiable technical skill acquisition and project delivery",
              "Learning environment that mirrors modern tech industry practices"
            ],
            whyChooseNote: text("Graduates emerge ready to lead technical teams and manage complex software deployments in data-rich sectors."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("Separate from tuition; includes campus amenities and accommodation.")
          },
          {
            slug: "btech-cse-aiml-niat",
            name: "B.Tech CSE (AI & ML)",
            level: "UG Program",
            partnerCode: "NIAT",
            partnerCodes: ["NIAT", "QTST", "IIAT", "BYTEXL"],
            duration: "4 Years (8 Semesters)",
            eligibility: "10+2 with Physics, Chemistry, and Mathematics (PCM) and entrance process as applicable",
            fees: "1,50,000 per year",
            overview: text("Synthesize machine intelligence with core computing to architect autonomous software systems that learn and adapt in real-time. Students learn to build high-precision predictive engines and automate complex information processing tasks, focusing on the high-growth sectors of digital healthcare and automated industrial operations."),
            schoolTitle: "School of Engineering and Technology - Stmarys University",
            schoolDescription: text("The School of Engineering is a center for technical advancement where computing power meets medical necessity. Focus is on creating digital tools that facilitate long-term patient recovery and streamline healthcare operations through data-driven engineering."),
            highlights: [
              "Architecting autonomous agents and predictive software engines",
              "Implementing high-precision ML models for automated healthcare diagnostics",
              "Practical training in neural architecture search and adaptive systems",
              "Building data-intensive AI platforms for real-time industrial automation",
              "Exposure to ethical AI governance and large-scale model optimization"
            ],
            durationNote: text("8 semesters focusing on the convergence of machine intelligence and software systems."),
            eligibilityNote: text("Proficiency in mathematical logic and logical reasoning required."),
            eligibilityPoints: ["10+2 with PCM", "University-specified entrance qualifying score"],
            feeNotes: ["Laboratory and computing software fees", "Standard examination charges"],
            specializationsIntro: text("Technical verticals:"),
            specializations: ["Predictive Systems", "Autonomous Agents", "Clinical AI", "Industrial Automation", "Information Synthesis"],
            careerOpportunities: ["AI System Architect", "Machine Learning Lead", "Data Strategy Analyst", "Automation Engineer", "Research Analyst"],
            outcomes: text("Graduates gain the knowledge and technical skills required to become AI engineers and innovators shaping intelligent technology systems."),
            salaryIndia: "6 LPA - 12 LPA",
            salaryInternational: "$80,000 - $140,000 annually",
            salaryNote: text("Salary prospects depend on skills, projects, organization, experience, and specialization."),
            accreditation: text("Degree awarded by Stmarys University. Program offered under the School of Engineering and Technology. Curriculum aligned with modern artificial intelligence and computing industry requirements."),
            accreditationPoints: [
              "Degree awarded by Stmarys University",
              "Program offered under the School of Engineering and Technology",
              "Curriculum aligned with modern artificial intelligence and computing industry requirements"
            ],
            whyChoose: [
              "engineering programs connected with healthcare and technological innovation",
              "Exposure to emerging technologies such as AI and machine learning",
              "Hands-on learning through technical laboratories and development projects",
              "Academic environment focused on research, innovation, and ethical technology development"
            ],
            whyChooseNote: text("Graduates gain the knowledge and technical skills required to become AI engineers and innovators shaping intelligent technology systems."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("Hostel charges are separate from tuition and may include accommodation and basic facilities as per university norms.")
          },
          {
            slug: "btech-cse-ai-ds-iiat",
            name: "B.Tech CSE (AI & DS)",
            level: "UG Program",
            partnerCode: "IIAT",
            partnerCodes: ["IIAT", "BB"],
            duration: "4 Years (8 Semesters)",
            eligibility: "10+2 PCM; entrance process applies",
            fees: "1,50,000 per year"
          },
          {
            slug: "btech-cse-ai-nst",
            name: "B.Tech CSE (AI)",
            level: "UG Program",
            partnerCode: "NST"
          },
          {
            slug: "btech-cse-cyber-security",
            name: "B.Tech CSE (Cyber Security)",
            level: "UG Program",
            partnerCode: "QTST"
          },
          {
            slug: "btech-cyber-security-aiml",
            name: "B.Tech CSE (Cyber Security & AI/ML)",
            level: "UG Program",
            partnerCode: "IIAT"
          },
          {
            slug: "btech-fintech-ai",
            name: "B.Tech CSE (FinTech & AI)",
            level: "UG Program",
            partnerCode: "IIAT"
          },
          {
            slug: "mtech-ai-ds",
            name: "M.Tech (AI & DS)",
            level: "PG Program",
            partnerCode: "BB"
          },
          {
            slug: "btech-cyber-forensic-it",
            name: "B.Tech CSE (Cyber Forensics & Information Technology)",
            level: "UG Program",
            partnerCode: "EDRIDGE"
          },
          {
            slug: "btech-cse-var",
            name: "B.Tech CSE (Virtual & Augmented Reality)",
            level: "UG Program",
            partnerCode: "VELOCES"
          }
        ]
      }
    ]
  },
  {
    slug: "law",
    name: "School of Law",
    short: "Law",
    about: text("The School of Law at Stmarys University, Hyderabad, is designed around rigorous legal doctrine, real-world advocacy, and emerging technologies. Our curriculum is intentionally designed to transcend textbook learning, offering specialised training in critical future-facing domains such as AI Regulation, Data Sovereignty, and Forensic Jurisprudence. What truly sets Stmarys University apart is our commitment to an immersive, practice-driven ecosystem - from our Moot Court Hall to a Legal Aid Cell that connects students directly with community justice needs."),
    vision: [
      "To be a globally recognized center of excellence in legal education, research, and innovation.",
      "To cultivate a generation of legal professionals who are intellectually robust, ethically principled, and socially responsible.",
      "To inspire transformative leadership that strengthens the rule of law and contributes to nation-building.",
      "To uphold the constitutional values of justice, equality, liberty, and fraternity in every aspect of legal learning.",
      "To serve as a catalyst for social change through legal empowerment, community outreach, and interdisciplinary scholarship."
    ],
    mission: [
      "To offer a holistic and dynamic legal education that blends theoretical foundations with real-world applications.",
      "To promote a culture of critical inquiry, academic freedom, and interdisciplinary research in legal studies.",
      "To bridge the gap between legal academia and the legal profession through robust clinical programmes, internships, and industry partnerships.",
      "To instill a deep sense of professional ethics, public service, and commitment to human rights among students.",
      "To encourage diversity, inclusivity, and global engagement in all academic and co-curricular pursuits.",
      "To nurture future-ready legal professionals equipped to address contemporary legal challenges locally, nationally, and globally."
    ],
    facilities: [
      { name: "Moot Court Hall", desc: "Replicates real courtroom settings with professional A/V recording for advocacy training." },
      { name: "Digital Law Library", desc: "Access to Manupatra, SCC Online, LexisNexis, and Hein Online databases." },
      { name: "Legal Aid Cell", desc: "Free legal assistance to underprivileged sections through rural camps and literacy drives." },
      { name: "ADR & Arbitration Centre", desc: "Specialized training in negotiation, mediation, and arbitration." },
      { name: "Forensic Studies Centre", desc: "Interdisciplinary hub integrating criminal law with forensic science investigation." }
    ],
    departments: [
      {
        slug: "legal-studies",
        name: "Law",
        about: "",
        programs: [
          {
            slug: "llb",
            name: "LL.B.",
            level: "UG Program",
            duration: "3 Years",
            eligibility: "Bachelor's Degree with 45%",
            overview: text("Practical legal foundation for a direct path into law practice.")
          },
          {
            slug: "llb-hons",
            name: "LL.B. (Hons.)",
            level: "UG Program",
            duration: "3 Years",
            eligibility: "Bachelor's Degree with 45%",
            overview: text("Deeper specialization and advanced legal training.")
          },
          {
            slug: "ba-llb-hons",
            name: "B.A. LL.B. / B.A. LL.B. (Hons.)",
            level: "UG Program",
            duration: "5 Years Integrated",
            eligibility: "10+2 with 45% aggregate",
            overview: text("Focus on litigation, judicial services, constitutional law, and social justice.")
          },
          {
            slug: "bba-llb-hons",
            name: "B.B.A. LL.B. / B.B.A. LL.B. (Hons.)",
            level: "UG Program",
            duration: "5 Years Integrated",
            eligibility: "10+2 with 45% aggregate",
            overview: text("Emphasis on corporate, business, and compliance law.")
          },
          {
            slug: "bsc-llb-hons",
            name: "B.Sc. LL.B. / B.Sc. LL.B. (Hons.)",
            level: "UG Program",
            duration: "5 Years Integrated",
            eligibility: "10+2 with 45% (Science)",
            overview: text("Forensic, criminal, and cyber law for science-minded students.")
          },
          {
            slug: "llm-constitutional-democracy-public-governance",
            name: "LL.M. in Constitutional Democracy & Public Governance",
            level: "PG Program",
            duration: "1 Year",
            eligibility: "LL.B. or equivalent law degree",
            overview: text("One-year postgraduate law programme in constitutional democracy and public governance.")
          },
          {
            slug: "llm-criminal-justice-reform-forensic-advocacy",
            name: "LL.M. in Criminal Justice Reform & Forensic Advocacy",
            level: "PG Program",
            duration: "1 Year",
            eligibility: "LL.B. or equivalent law degree",
            overview: text("One-year postgraduate law programme in criminal justice reform and forensic advocacy.")
          },
          {
            slug: "llm-corporate-commercial-laws",
            name: "LL.M. in Corporate & Commercial Laws",
            level: "PG Program",
            duration: "1 Year",
            eligibility: "LL.B. or equivalent law degree",
            overview: text("One-year postgraduate law programme in corporate and commercial laws.")
          },
          {
            slug: "llm-ip-ai-regulation-data-sovereignty",
            name: "LL.M. in Intellectual Property, AI Regulation & Data Sovereignty",
            level: "PG Program",
            duration: "1 Year",
            eligibility: "LL.B. or equivalent law degree",
            overview: text("One-year postgraduate law programme in intellectual property, AI regulation, and data sovereignty.")
          },
          {
            slug: "llm-adr-construction-law",
            name: "LL.M. in ADR & Construction Law",
            level: "PG Program",
            duration: "1 Year",
            eligibility: "LL.B. or equivalent law degree",
            overview: text("One-year postgraduate law programme in ADR and construction law.")
          },
          {
            slug: "phd-law",
            name: "Ph.D. in Law",
            level: "Ph.D. Program",
            duration: "3-6 years",
            eligibility: "As per university Ph.D. admission norms",
            overview: text("Doctoral research programme in Law.")
          }
        ]
      }
    ]
  },
/*
  {
    slug: "commerce-applied-sciences",
    name: "School of Commerce & Applied Sciences",
    short: "Commerce & Applied Sciences",
    visibility: "hidden",
    about: text("A multidisciplinary school focusing on industry-aligned professional programs in management, aviation, agriculture, and hospitality."),
    departments: [
      {
        slug: "management-ai-ds",
        name: "Management & Data Science",
        about: "",
        programs: [
          { slug: "bba-ai-ds", name: "BBA AI & DS", level: "UG Program", partnerCode: "BB" },
          { slug: "mba-ai-ds", name: "MBA AI & DS", level: "PG Program", partnerCode: "BB" }
        ]
      },
      {
        slug: "aviation-hospitality",
        name: "Aviation & Hospitality",
        about: "",
        programs: [
          { slug: "bba-aviation-management", name: "BBA Aviation Management", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "bba-airport-air-traffic-mgmt", name: "BBA Airport & Air Traffic Mgmt", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "bba-aviation-veloces", name: "BBA Aviation", level: "UG Program", partnerCode: "VELOCES" },
          { slug: "bsc-hospitality-hotel-admin", name: "B.Sc. Hospitality & Hotel Admin", level: "UG Program", partnerCode: "EDRIDGE" }
        ]
      },
      {
        slug: "agriculture-technology",
        name: "Agriculture & Biotechnology",
        about: "",
        programs: [
          { slug: "bsc-hons-agriculture", name: "B.Sc. (Hons) Agriculture", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "bsc-food-tech-microbiology-chemistry", name: "B.Sc. Food Tech, Microbiology, Chemistry", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "btech-biotechnology-edridge", name: "B.Tech Biotechnology", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "btech-bio-informatics-edridge", name: "B.Tech Bio-Informatics", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "btech-food-technology-edridge", name: "B.Tech Food Technology", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "btech-dairy-technology-edridge", name: "B.Tech Dairy Technology", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "btech-agricultural-engineering-edridge", name: "B.Tech Agricultural Engineering", level: "UG Program", partnerCode: "EDRIDGE" },
          { slug: "btech-pharmaceutical-engineering-edridge", name: "B.Tech Pharmaceutical Engineering", level: "UG Program", partnerCode: "EDRIDGE" }
        ]
      }
    ]
  },
  {
    slug: "nextgen-powered",
    name: "NextGen Powered Programs",
    short: "NextGen",
    visibility: "hidden",
    about: text("Specialized professional programs powered by NextGen industry integration."),
    departments: [
      {
        slug: "nextgen-specialized",
        name: "NextGen Specialized Tracks",
        about: "",
        programs: [
          { slug: "nextgen-track", name: "NexGen Professional Track", level: "UG Program", partnerCode: "NEXTGEN" }
        ]
      }
    ]
  }
*/
];

const normalizeProgramKey = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getCanonicalSlugAndName = (slug: string, name: string) => {
  const s = slug.toLowerCase().trim();
  if (s === "bpt" || s === "bpt-emversity") {
    return { slug: "bpt", name: "BPT" };
  }
  if (s === "bot" || s === "bot-emversity") {
    return { slug: "bot", name: "BOT" };
  }
  if (s === "btech-cse" || s === "btech-cse-qtst" || s === "btech-cse-iiat" || s === "btech-cse-veloces") {
    return { slug: "btech-cse", name: "B.Tech CSE" };
  }
  if (s === "bmlt" || s === "bmls") {
    return { slug: "bmlt", name: "Medical Lab Technology" };
  }
  if (s === "bsc-anaesthesia-ot" || s === "baott") {
    return { slug: "bsc-anaesthesia-ot", name: "Anesthesia & OT Technology" };
  }
  if (s === "betcms" || s === "bemt") {
    return { slug: "betcms", name: "Emergency Medical Technology" };
  }
  if (s === "brt" || s === "brtt") {
    return { slug: "brt", name: "Radiotherapy Technology" };
  }
  if (
    s === "btech-cse-aiml" ||
    s === "btech-cse-aiml-niat" ||
    s === "btech-cse-aiml-ist" ||
    s === "btech-cse-aiml-iiat" ||
    s === "btech-cse-aiml-veloces" ||
    s === "btech-cse-aiml-bytexl"
  ) {
    return { slug: "btech-cse-aiml", name: "B.Tech CSE (AI & ML)" };
  }
  if (
    s === "btech-cse-ai-ds" ||
    s === "btech-cse-ai-ds-qtst" ||
    s === "btech-cse-ai-ds-bb" ||
    s === "btech-cse-ai-ds-iiat"
  ) {
    return { slug: "btech-cse-ai-ds", name: "B.Tech CSE (AI & DS)" };
  }
  return { slug, name };
};

const mergeOfficialCourses = (seedSchools: SchoolData[]): SchoolData[] =>
  seedSchools.map((school) => {
    const officialRows = OFFICIAL_COURSE_ROWS.filter((row) => row.schoolSlug === school.slug);
    if (!officialRows.length) return school;

    const existingDepartments = new Map((school.departments || []).map((department) => [department.slug, department]));
    const departmentSlugs = [...new Set(officialRows.map((row) => row.departmentSlug))];

    return {
      ...school,
      departments: departmentSlugs.map((departmentSlug) => {
        const rows = officialRows.filter((row) => row.departmentSlug === departmentSlug);
        const existingDepartment = existingDepartments.get(departmentSlug);
        const existingBySlug = new Map((existingDepartment?.programs || []).map((program) => [program.slug, program]));
        const existingByName = new Map((existingDepartment?.programs || []).map((program) => [normalizeProgramKey(program.name), program]));

        // Group rows by canonical slug to merge duplicates
        const canonicalGroups = new Map<string, typeof rows>();
        rows.forEach((row) => {
          const canonical = getCanonicalSlugAndName(row.slug, row.name);
          const key = canonical.slug;
          if (!canonicalGroups.has(key)) {
            canonicalGroups.set(key, []);
          }
          canonicalGroups.get(key)!.push(row);
        });

        const mergedPrograms = Array.from(canonicalGroups.entries()).map(([canonicalSlug, groupRows]) => {
          // Find the primary row (prefer one with a partner if available, or just the first)
          const primaryRow = groupRows.find((row) => row.partnerCode) || groupRows[0];
          
          // Get all unique partner codes from the group
          const partnerCodes = [...new Set(
            groupRows
              .map((row) => row.partnerCode || (groupRows.length > 1 ? "Stmarys University" : undefined))
              .filter((code): code is string => Boolean(code))
          )];

          const canonical = getCanonicalSlugAndName(primaryRow.slug, primaryRow.name);
          const nameToUse = canonical.name;

          const existingProgram = existingBySlug.get(canonicalSlug) || existingByName.get(normalizeProgramKey(nameToUse)) || ({} as any);

          // Merge partner codes from existingProgram, seed, and groupRows
          const allPartnerCodesSet = new Set<string>();
          partnerCodes.forEach(code => allPartnerCodesSet.add(code.toUpperCase()));
          if (existingProgram.partnerCodes) {
            existingProgram.partnerCodes.forEach((code: string) => allPartnerCodesSet.add(code.toUpperCase()));
          }
          if (existingProgram.partnerCode) {
            allPartnerCodesSet.add(existingProgram.partnerCode.toUpperCase());
          }
          
          const finalPartnerCodes = Array.from(allPartnerCodesSet);
          const finalPartnerCode = finalPartnerCodes[0] || "";

          const officialPartnerFields = finalPartnerCodes.length > 0
            ? { partnerCode: finalPartnerCode, partnerCodes: finalPartnerCodes }
            : { partnerCode: undefined, partnerCodes: [] };

          return {
            ...existingProgram,
            ...officialPartnerFields,
            slug: canonicalSlug,
            name: nameToUse,
            level: primaryRow.level,
            duration: primaryRow.duration || existingProgram.duration,
            courseCode: primaryRow.courseCode,
          };
        });

        return {
          slug: departmentSlug,
          name: existingDepartment?.name || rows[0]?.departmentName || departmentSlug,
          about: existingDepartment?.about || "",
          programs: mergedPrograms,
        };
      }),
    };
  });

export const schools: SchoolData[] = mergeOfficialCourses(schoolsSeed);

export const allSchoolsBar = schools
  .filter(s => s.visibility !== "hidden")
  .map(({ slug, name, short }) => ({
    slug,
    name,
    short: short || name,
  }));
