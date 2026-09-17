type KeywordGroups = {
  local: string[];
  national: string[];
  admission: string[];
  syllabus: string[];
  career: string[];
  variant: string[];
  regionalNri: string[];
  backend: string[];
};

export type HealthAlliedCourseSeoProfile = {
  subject: string;
  h1: string;
  metaTitle: string;
  directAnswer: string;
  study: string;
  experience: string;
  careerAnswer: string;
  keywords: KeywordGroups;
};

const HEALTH_ALLIED_SCHOOL_SLUG = "health-allied-health-sciences";

const REGIONAL_NRI_SUPPORT = [
  "allied health courses for North India students",
  "allied health courses for Andhra Pradesh students",
  "allied health courses for South India students",
  "allied health courses in Vijayawada",
  "allied health courses in Vizag",
  "allied health courses in Guntur",
  "allied health courses in Amaravati",
  "NRI allied health admission information",
  "international student allied health admission information",
];

const backendOnly = (terms: string[]) => terms;

const profile = (data: HealthAlliedCourseSeoProfile) => data;

const buildHighIntentMetaTitle = (courseProfile: HealthAlliedCourseSeoProfile) => {
  const baseTitle = (courseProfile.metaTitle || courseProfile.subject)
    .replace(/\s+/g, " ")
    .trim();

  if (/admission\s+2026/i.test(baseTitle)) return baseTitle;
  return `${baseTitle}: Admission 2026, Fees`;
};

const PROFILES: Record<string, HealthAlliedCourseSeoProfile> = {
  "physiotherapy/bpt": profile({
    subject: "physiotherapy",
    h1: "BPT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "BPT Course in Hyderabad",
    directAnswer: "BPT (Bachelor of Physiotherapy) prepares you to relieve pain and restore movement — the professional people turn to after injury, surgery, stroke or on the sports field. At St. Mary's University (SMRU), Hyderabad you learn to assess and treat musculoskeletal, neurological, cardiorespiratory and sports conditions, combining classroom science with supervised clinical practice.",
    study: "Students study anatomy, exercise therapy, electrotherapy, manual therapy, biomechanics, clinical rehabilitation, and patient assessment.",
    experience: "Learning should emphasize physiotherapy labs, supervised clinical postings, movement assessment, and rehabilitation practice.",
    careerAnswer: "Career paths can include physiotherapy, sports rehabilitation, neuro-rehabilitation, cardiopulmonary rehabilitation, and community rehabilitation roles after source verification.",
    keywords: {
      local: ["BPT course in Hyderabad", "physiotherapy college in Telangana", "BPT admission Hyderabad"],
      national: ["BPT course in India", "physiotherapy courses after 12th India"],
      admission: ["BPT admission 2026", "BPT eligibility", "BPT fees", "BPT duration"],
      syllabus: ["BPT syllabus", "physiotherapy practical training", "clinical rehabilitation training"],
      career: ["BPT career opportunities", "physiotherapy jobs", "physiotherapy placement support"],
      variant: ["bpt", "bpt-emversity", "BPT EMVERSITY", "BPT St. Mary's University"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bpt hyd", "bpt course hyd",]),
    },
  }),
  "physiotherapy/mpt": profile({
    subject: "postgraduate physiotherapy",
    h1: "MPT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "MPT Course in Hyderabad",
    directAnswer: "MPT (Master of Physiotherapy) takes you from physiotherapist to specialist. At St. Mary's University (SMRU), Hyderabad you deepen clinical reasoning through advanced assessment, evidence-based treatment and a research project of your own.",
    study: "Students focus on advanced physiotherapy practice, specialization-based learning, clinical reasoning, research methods, and rehabilitation leadership.",
    experience: "Learning should include specialist clinical exposure, case-based practice, research orientation, and supervised physiotherapy mentoring.",
    careerAnswer: "Career paths can include specialist physiotherapist, clinical educator, rehabilitation consultant, research assistant, and advanced therapy roles after source verification.",
    keywords: {
      local: ["MPT course in Hyderabad", "PG physiotherapy Telangana", "MPT admission Hyderabad"],
      national: ["MPT course in India", "postgraduate physiotherapy India"],
      admission: ["MPT admission 2026", "MPT eligibility", "MPT fees", "MPT duration"],
      syllabus: ["MPT syllabus", "advanced physiotherapy practice", "physiotherapy research methods"],
      career: ["MPT career scope", "specialist physiotherapy roles", "MPT placement support"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["mpt hyd", "mpt course hyd",]),
    },
  }),
  "physiotherapy/phd-physiotherapy": profile({
    subject: "physiotherapy research",
    h1: "Ph.D. Physiotherapy in Hyderabad: Admission, Eligibility & Research",
    metaTitle: "Ph.D. Physiotherapy Hyderabad",
    directAnswer: "Ph.D. in Physiotherapy at St. Mary's University (SMRU), Hyderabad is for physiotherapy graduates who want to contribute original research to rehabilitation science, working under a supervisor; the current cycle, eligibility and fee are confirmed by the university.",
    study: "Research focus may include physiotherapy practice, movement science, clinical rehabilitation, methodology, and evidence-based care after university confirmation.",
    experience: "Doctoral learning should center on research supervision, methodology, research facilities, ethics, and publication readiness once officially confirmed.",
    careerAnswer: "Career paths can include academic, research, clinical leadership, and rehabilitation research roles after university verification.",
    keywords: {
      local: ["Ph.D. Physiotherapy in Hyderabad", "physiotherapy research Telangana"],
      national: ["Ph.D. Physiotherapy India", "doctoral physiotherapy program"],
      admission: ["Ph.D. Physiotherapy admission 2026", "Ph.D. Physiotherapy eligibility", "Ph.D. Physiotherapy fees"],
      syllabus: ["physiotherapy research areas", "Ph.D. methodology", "physiotherapy supervisors"],
      career: ["physiotherapy research careers", "academic physiotherapy careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly([ "ph d physiotherapy", "doctorate physiotherapy hyderabad"]),
    },
  }),
  "physiotherapy/phd-physiotherapy-neurology": profile({
    subject: "neuro-physiotherapy research",
    h1: "Ph.D. Physiotherapy Neurology in Hyderabad: Admission & Research",
    metaTitle: "Ph.D. Physiotherapy Neurology Hyderabad",
    directAnswer: "Ph.D. in Physiotherapy (Neurology) at St. Mary's University (SMRU), Hyderabad is for physiotherapists who want to advance neuro-rehabilitation — stroke, spinal-cord injury and neurological movement disorders — through original research under a supervisor; the current cycle, eligibility and fee are confirmed by the university.",
    study: "Research focus may include neuro-rehabilitation, neurological physiotherapy, movement recovery, methodology, and evidence-based clinical research after confirmation.",
    experience: "Doctoral learning should center on research supervision, neuro-rehabilitation facilities, methodology, ethics, and publication readiness once officially confirmed.",
    careerAnswer: "Career paths can include academic, research, neuro-rehabilitation, and clinical leadership roles after university verification.",
    keywords: {
      local: ["Ph.D. Physiotherapy Neurology Hyderabad", "neuro-physiotherapy research Telangana"],
      national: ["Ph.D. neuro-physiotherapy India", "doctoral neuro rehabilitation research"],
      admission: ["Ph.D. Physiotherapy Neurology admission 2026", "Ph.D. Physiotherapy Neurology eligibility", "Ph.D. Physiotherapy Neurology fees"],
      syllabus: ["neuro-rehabilitation research", "neurological physiotherapy research", "Ph.D. supervisors"],
      career: ["neuro physiotherapy research careers", "academic neuro rehabilitation careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly([ "ph d physiotherapy neurology", "doctorate neuro physiotherapy"]),
    },
  }),
  "occupational-therapy/bot": profile({
    subject: "occupational therapy",
    h1: "BOT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "BOT Course in Hyderabad",
    directAnswer: "BOT (Bachelor of Occupational Therapy) prepares you to help people get back to the everyday activities that matter to them — work, school, self-care, play — after illness, injury or disability. At St. Mary's University (SMRU), Hyderabad you learn assessment, therapeutic activity and assistive technology through supervised practice.",
    study: "Students study human occupation, functional anatomy, neuroscience, assistive technology, rehabilitation practice, mental health, and community-based therapy.",
    experience: "Learning should emphasize ADL training, assistive technology exposure, supervised clinical postings, functional assessment, and rehabilitation practice.",
    careerAnswer: "Career paths can include occupational therapy, paediatric OT, neuro-rehabilitation, hand therapy, geriatric rehabilitation, and assistive technology roles after source verification.",
    keywords: {
      local: ["BOT course in Hyderabad", "occupational therapy college Telangana", "BOT admission Hyderabad"],
      national: ["BOT course in India", "occupational therapy after 12th India"],
      admission: ["BOT admission 2026", "BOT eligibility", "BOT fees", "BOT duration"],
      syllabus: ["BOT syllabus", "occupational therapy practical training", "functional rehabilitation"],
      career: ["BOT career opportunities", "occupational therapy jobs", "BOT placement support"],
      variant: ["bot", "bot-emversity", "BOT EMVERSITY", "BOT St. Mary's University"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bot hyd", "bot course hyd",]),
    },
  }),
  "occupational-therapy/mot": profile({
    subject: "postgraduate occupational therapy",
    h1: "MOT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "MOT Course in Hyderabad",
    directAnswer: "MOT (Master of Occupational Therapy) at St. Mary's University (SMRU), Hyderabad takes your occupational-therapy practice into specialist areas, assistive technology and rehabilitation leadership, with a research component.",
    study: "Students focus on advanced occupational therapy, assistive technology, specialized rehabilitation, clinical reasoning, research methods, and inclusive care.",
    experience: "Learning should include specialist clinical exposure, case-based practice, assistive technology use, research orientation, and supervised OT mentoring.",
    careerAnswer: "Career paths can include specialist occupational therapist, clinical lead, rehabilitation coordinator, assistive technology specialist, and research roles after source verification.",
    keywords: {
      local: ["MOT course in Hyderabad", "PG occupational therapy Telangana"],
      national: ["MOT course in India", "postgraduate occupational therapy India"],
      admission: ["MOT admission 2026", "MOT eligibility", "MOT fees", "MOT duration"],
      syllabus: ["MOT syllabus", "advanced OT practice", "assistive technology"],
      career: ["MOT career scope", "specialist OT roles", "MOT placement support"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["mot hyd", "pg ot course hyderabad"]),
    },
  }),
  "occupational-therapy/phd-occupational-therapy": profile({
    subject: "occupational therapy research",
    h1: "Ph.D. Occupational Therapy in Hyderabad: Admission & Research",
    metaTitle: "Ph.D. Occupational Therapy Hyderabad",
    directAnswer: "Ph.D. in Occupational Therapy at St. Mary's University (SMRU), Hyderabad is for OT graduates pursuing original research in occupational science and rehabilitation under a supervisor; the current cycle, eligibility and fee are confirmed by the university.",
    study: "Research focus may include occupational therapy practice, functional rehabilitation, assistive living, community rehabilitation, methodology, and outcome research after confirmation.",
    experience: "Doctoral learning should center on research supervision, methodology, rehabilitation outcomes, ethics, and publication readiness once officially confirmed.",
    careerAnswer: "Career paths can include academic, research, clinical leadership, and occupational therapy research roles after university verification.",
    keywords: {
      local: ["Ph.D. Occupational Therapy Hyderabad", "OT research Telangana"],
      national: ["Ph.D. Occupational Therapy India", "doctoral OT program"],
      admission: ["Ph.D. OT admission 2026", "Ph.D. Occupational Therapy eligibility", "Ph.D. Occupational Therapy fees"],
      syllabus: ["occupational therapy research areas", "rehabilitation outcomes research", "OT supervisors"],
      career: ["occupational therapy research careers", "academic OT careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly([ "ph d occupational therapy", "doctorate ot hyderabad"]),
    },
  }),
  "allied-health-sciences/bmlt": profile({
    subject: "medical laboratory technology",
    h1: "Medical Lab Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Medical Lab Technology Hyderabad",
    directAnswer: "Medical Laboratory Technology prepares you to produce the results almost every diagnosis depends on. At St. Mary's University (SMRU), Hyderabad you train in haematology, clinical biochemistry, microbiology and histopathology through hands-on laboratory practice and clinical postings.",
    study: "Students study pathology, microbiology, biochemistry, haematology, histopathology, molecular diagnostics, lab safety, and quality assurance.",
    experience: "Learning should emphasize diagnostic lab practice, hospital laboratory postings, specimen handling, clinical chemistry, microbiology, and quality control.",
    careerAnswer: "Career paths can include lab technologist, diagnostic lab associate, blood bank technologist, pathology lab assistant, and clinical research support roles after source verification.",
    keywords: {
      local: ["Medical Lab Technology course in Hyderabad", "lab technology Telangana", "MLT admission Hyderabad"],
      national: ["MLT course in India", "medical laboratory science India"],
      admission: ["MLT admission 2026", "Medical Lab Technology eligibility", "MLT fees", "MLT duration"],
      syllabus: ["MLT syllabus", "pathology lab training", "microbiology lab training", "diagnostics lab training"],
      career: ["lab technologist careers", "diagnostic lab roles", "MLT placement support"],
      variant: ["bmlt", "bmls", "Bachelor of Medical Laboratory Science", "Medical Lab Technology EMVERSITY"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["mlt hyd", "bmlt hyd", "lab technician course hyderabad"]),
    },
  }),
  "allied-health-sciences/bsc-anaesthesia-ot": profile({
    subject: "anaesthesia and operation theatre technology",
    h1: "Anesthesia & OT Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Anesthesia OT Technology Hyderabad",
    directAnswer: "Anaesthesia & Operation Theatre Technology prepares you to keep the operation theatre running safely, supporting surgeons and anaesthetists through every procedure. At St. Mary's University (SMRU), Hyderabad you learn equipment, patient monitoring, sterile technique and safety in skills labs and supervised theatre postings.",
    study: "Students study operation theatre protocols, anaesthesia support, perioperative care, sterilisation, equipment handling, emergency response, and patient monitoring.",
    experience: "Learning should emphasize OT workflow, anaesthesia assistance, perioperative simulation, sterilisation protocols, and supervised clinical postings.",
    careerAnswer: "Career paths can include OT technologist, anaesthesia support technologist, perioperative assistant, and surgical services support roles after source verification.",
    keywords: {
      local: ["Anesthesia & OT Technology course Hyderabad", "OT technology Telangana", "anaesthesia technology Hyderabad"],
      national: ["anaesthesia technology course India", "OT technology India"],
      admission: ["AOTT admission 2026", "Anesthesia OT eligibility", "Anesthesia OT fees", "AOTT duration"],
      syllabus: ["AOTT syllabus", "OT protocols", "anaesthesia support training", "perioperative training"],
      career: ["OT technologist careers", "anaesthesia support roles", "operation theatre technologist jobs"],
      variant: ["bsc-anaesthesia-ot", "baott", "Bachelor of Anaesthesia and Operation Theatre Technology"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["aott hyd", "anaesthesia ot course",]),
    },
  }),
  "allied-health-sciences/bcvt": profile({
    subject: "cardiovascular technology",
    h1: "Cardiovascular Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Cardiovascular Technology Hyderabad",
    directAnswer: "Cardiovascular Technology prepares you to run the tests and cath-lab procedures that diagnose and treat heart disease. At St. Mary's University (SMRU), Hyderabad you train in ECG, echocardiography, stress testing and catheterisation-laboratory support, with clinical postings in cardiac units.",
    study: "Students study cardiovascular anatomy, ECG concepts, echo basics, cath-lab support, cardiac diagnostics, patient monitoring, and clinical technology workflows.",
    experience: "Learning should emphasize cardiac diagnostics exposure, equipment familiarity, cath-lab support concepts, patient monitoring, and supervised clinical practice.",
    careerAnswer: "Career paths can include cardiac technologist, cardiovascular technology assistant, cath-lab support technologist, and cardiac diagnostics roles after source verification.",
    keywords: {
      local: ["Cardiovascular Technology course Hyderabad", "cardiac technology Telangana"],
      national: ["cardiovascular technology course India", "cardiac care technology"],
      admission: ["CVT admission 2026", "Cardiovascular Technology eligibility", "CVT fees", "CVT duration"],
      syllabus: ["CVT syllabus", "ECG concepts", "echo concepts", "cath-lab support", "cardiac diagnostics"],
      career: ["cardiac technologist roles", "cardiovascular technology jobs", "CVT placement support"],
      variant: ["bcvt", "Cardiovascular Technology EMVERSITY"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["cv t course", "bcvt hyd", "cardiac tech course hyderabad"]),
    },
  }),
  "allied-health-sciences/betcms": profile({
    subject: "emergency medical technology",
    h1: "Emergency Medical Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Emergency Medical Tech Hyderabad",
    directAnswer: "Emergency Medical Technology prepares you to be the calm, skilled first responder in emergencies and trauma care. At St. Mary's University (SMRU), Hyderabad you train in triage, pre-hospital care, resuscitation and emergency-department support through simulation and supervised clinical postings.",
    study: "Students study emergency response, trauma care, triage, patient transport, basic life support, emergency equipment, and acute-care workflows.",
    experience: "Learning should emphasize emergency simulations, trauma response drills, patient monitoring, supervised clinical postings, and emergency department workflow exposure.",
    careerAnswer: "Career paths can include emergency care technologist, trauma support assistant, ambulance services support, and emergency department support roles after source verification.",
    keywords: {
      local: ["Emergency Medical Technology course Hyderabad", "trauma care Telangana", "EMT course Hyderabad"],
      national: ["emergency medical technology India", "EMT course India"],
      admission: ["EMT admission 2026", "Emergency Medical Technology eligibility", "EMT fees", "EMT duration"],
      syllabus: ["EMT syllabus", "triage training", "trauma response", "emergency simulation"],
      career: ["emergency care roles", "trauma support careers", "EMT placement support"],
      variant: ["betcms", "bemt", "Bachelor of Emergency Medical Technologist"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["emt hyd", "betcms", "emergency care course hyd"]),
    },
  }),
  "allied-health-sciences/b-optometry": profile({
    subject: "optometry",
    h1: "Optometry Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "Optometry Course Hyderabad",
    directAnswer: "Optometry prepares you to protect and correct people's sight as a primary eye-care professional. At St. Mary's University (SMRU), Hyderabad you learn to examine vision, detect refractive errors and common eye conditions, prescribe corrective lenses and manage low vision, with clinical practice in eye-care settings.",
    study: "Students study ocular anatomy, refraction, contact lenses, binocular vision, low vision rehabilitation, paediatric optometry, and community eye care.",
    experience: "Learning should emphasize eye screening, refraction practice, clinical optometry exposure, optical dispensing, and supervised clinical postings.",
    careerAnswer: "Career paths can include optometrist, clinical refractionist, contact lens practitioner, low vision specialist, and optical practice roles after source verification.",
    keywords: {
      local: ["Optometry course Hyderabad", "eye-care course Telangana", "optometry admission Hyderabad"],
      national: ["optometry course India", "vision science India"],
      admission: ["Optometry admission 2026", "Optometry eligibility", "Optometry fees", "Optometry duration"],
      syllabus: ["Optometry syllabus", "eye screening", "vision science", "clinical optometry"],
      career: ["optometrist roles", "optical practice careers", "optometry placement support"],
      variant: ["b-optometry", "Optometry EMVERSITY"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["optometry hyd", "eye care course hyderabad"]),
    },
  }),
  "allied-health-sciences/brt": profile({
    subject: "radiotherapy technology",
    h1: "Radiotherapy Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Radiotherapy Technology Hyderabad",
    directAnswer: "Radiotherapy Technology prepares you to plan and deliver the radiation treatment cancer patients depend on. At St. Mary's University (SMRU), Hyderabad you learn treatment-planning fundamentals, machine operation and radiation safety, with postings in oncology departments.",
    study: "Students study radiation physics, treatment workflow, radiation biology, treatment planning concepts, brachytherapy basics, dosimetry, and radiation safety.",
    experience: "Learning should emphasize oncology workflow, treatment-room support, radiation safety practice, simulation, and supervised radiotherapy department exposure.",
    careerAnswer: "Career paths can include radiotherapy technologist, treatment planning assistant, LINAC support, dosimetry technician support, and oncology department roles after source verification.",
    keywords: {
      local: ["Radiotherapy Technology course Hyderabad", "oncology technology Telangana"],
      national: ["radiotherapy technology course India", "oncology support India"],
      admission: ["Radiotherapy admission 2026", "Radiotherapy Technology eligibility", "Radiotherapy fees", "Radiotherapy duration"],
      syllabus: ["Radiotherapy syllabus", "treatment support", "radiation safety", "oncology workflow"],
      career: ["radiotherapy technologist roles", "radiotherapy technology jobs", "oncology support careers"],
      variant: ["brt", "brtt", "Bachelor of Radiotherapy Technology"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["brt radiotherapy", "brtt", "radiotherapy tech hyd"]),
    },
  }),
  "allied-health-sciences/bsc-forensic-science": profile({
    subject: "forensic science",
    h1: "Forensic Science Course in Hyderabad: Admission, Eligibility & Fees",
    metaTitle: "Forensic Science Course Hyderabad",
    directAnswer: "B.Sc. Forensic Science prepares you to turn physical evidence into answers — at the crime scene and in the laboratory. At St. Mary's University (SMRU), Hyderabad you study evidence collection, fingerprinting, toxicology, forensic biology and digital forensics with laboratory practice.",
    study: "Students study crime-scene methods, evidence handling, forensic chemistry, toxicology, DNA profiling, digital investigation, and trace evidence.",
    experience: "Learning should emphasize forensic lab practice, investigation simulation, evidence preservation, analytical methods, and supervised practical exposure.",
    careerAnswer: "Career paths can include forensic lab analyst, crime-scene support, toxicology support, DNA analysis support, and investigative science roles after source verification.",
    keywords: {
      local: ["Forensic Science course Hyderabad", "forensic college Telangana"],
      national: ["forensic science course India", "forensic science after 12th India"],
      admission: ["forensic science admission 2026", "forensic science eligibility", "forensic science fees"],
      syllabus: ["forensic science syllabus", "crime-scene methods", "evidence handling", "forensic labs"],
      career: ["forensic lab roles", "investigation support careers", "forensic science placement support"],
      variant: ["bsc-forensic-science", "Forensic Science EDIN"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["forensic science hyd", "bsc forensic hyd", "forensics course hyderabad"]),
    },
  }),
  "allied-health-sciences/diploma-anaesthesia-operation-theatre-technology": profile({
    subject: "anaesthesia and operation theatre technology",
    h1: "Diploma AOTT in Hyderabad: Admission, Eligibility & Fees",
    metaTitle: "Diploma AOTT Hyderabad",
    directAnswer: "The Diploma in Anaesthesia & Operation Theatre Technology at St. Mary's University (SMRU), Hyderabad is your shorter, practice-focused route into operation-theatre and anaesthesia-support roles, covering equipment, sterile technique and patient monitoring.",
    study: "Students should verify official modules for sterilisation, OT workflow, anaesthesia assistance, patient monitoring, and perioperative support.",
    experience: "Learning should emphasize technician-readiness, OT support, sterilisation basics, equipment handling, and supervised practical exposure after university confirmation.",
    careerAnswer: "Career paths can include OT technician, anaesthesia support assistant, surgical services support, and perioperative support roles after source verification.",
    keywords: {
      local: ["Diploma AOTT Hyderabad", "OT technician course Telangana"],
      national: ["diploma anaesthesia technology India", "OT technician India"],
      admission: ["diploma AOTT admission 2026", "diploma AOTT eligibility", "diploma AOTT fees"],
      syllabus: ["diploma AOTT syllabus", "sterilisation", "OT support", "anaesthesia assistance"],
      career: ["OT technician roles", "diploma AOTT career opportunities"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["d aott hyd", "diploma anesthesia ot",]),
    },
  }),
  "allied-health-sciences/bachelor-nutrition-dietetics-hons": profile({
    subject: "nutrition and dietetics",
    h1: "Nutrition and Dietetics Course in Hyderabad: Admission & Fees",
    metaTitle: "Nutrition Dietetics Hyderabad",
    directAnswer: "Bachelor of Nutrition and Dietetics (Hons) prepares you to use food and nutrition as medicine. At St. Mary's University (SMRU), Hyderabad you train in clinical nutrition, diet planning for medical conditions, community nutrition and food science, with practical and clinical placements.",
    study: "Students should verify official modules for clinical nutrition, diet planning, community nutrition, food science, wellness counselling, and public health nutrition.",
    experience: "Learning should emphasize diet planning practice, nutrition assessment, community nutrition exposure, case-based planning, and supervised practical work after confirmation.",
    careerAnswer: "Career paths can include dietetics, nutrition counselling, wellness support, community nutrition, and hospital nutrition support roles after source verification.",
    keywords: {
      local: ["Nutrition and Dietetics course Hyderabad", "dietetics Telangana"],
      national: ["nutrition course India", "dietetics course India"],
      admission: ["nutrition admission 2026", "nutrition eligibility", "nutrition fees"],
      syllabus: ["nutrition syllabus", "clinical nutrition", "diet planning", "community nutrition"],
      career: ["dietitian roles", "nutrition careers", "wellness careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["nutrition dietetics hyd", "dietetics course hyd",]),
    },
  }),
  "allied-health-sciences/diploma-radiotherapy-technology": profile({
    subject: "radiotherapy technology",
    h1: "Diploma Radiotherapy Technology in Hyderabad: Admission & Fees",
    metaTitle: "Diploma Radiotherapy Hyderabad",
    directAnswer: "The Diploma in Radiotherapy Technology at St. Mary's University (SMRU), Hyderabad is your practice-focused route into radiotherapy treatment-room support, covering machine operation, patient positioning and radiation safety.",
    study: "Students should verify official modules for treatment-room support, radiation safety basics, oncology workflow, patient positioning, and equipment support.",
    experience: "Learning should emphasize oncology department exposure, safety basics, treatment-room workflow, and supervised practical support after university confirmation.",
    careerAnswer: "Career paths can include radiotherapy technician, oncology support assistant, treatment-room support, and cancer-care department roles after source verification.",
    keywords: {
      local: ["Diploma Radiotherapy Technology Hyderabad", "radiotherapy diploma Telangana"],
      national: ["radiotherapy diploma India", "oncology technician course India"],
      admission: ["D.RT admission 2026", "D.RT eligibility", "D.RT fees"],
      syllabus: ["D.RT syllabus", "treatment-room support", "safety basics", "oncology workflow"],
      career: ["radiotherapy technician roles", "diploma radiotherapy careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["d rt hyd", "diploma radio therapy",]),
    },
  }),
  "allied-health-sciences/bpa": profile({
    subject: "physician assistant",
    h1: "Physician Assistant Course in Hyderabad: Admission & Fees",
    metaTitle: "Physician Assistant Hyderabad",
    directAnswer: "Bachelor of Physician Assistant prepares you to work alongside doctors in patient assessment, care coordination and procedures. At St. Mary's University (SMRU), Hyderabad you learn history-taking, examination and procedural assistance through supervised hospital postings.",
    study: "Students should verify official modules for patient documentation, care coordination, clinical posting, medical terminology, and hospital workflow support.",
    experience: "Learning should emphasize clinical postings, patient documentation, physician-team support, care coordination, and supervised hospital exposure after confirmation.",
    careerAnswer: "Career paths can include physician assistant, clinical coordinator, hospital team support, patient care documentation, and clinical services roles after source verification.",
    keywords: {
      local: ["Physician Assistant course Hyderabad", "clinical assistant Telangana"],
      national: ["physician assistant course India", "PA course India"],
      admission: ["B.PA admission 2026", "B.PA eligibility", "B.PA fees"],
      syllabus: ["B.PA syllabus", "patient documentation", "care coordination", "clinical posting"],
      career: ["physician assistant roles", "hospital-team support careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bpa hyd", "physician assistant hyd",]),
    },
  }),
  "allied-health-sciences/diploma-dialysis-technology": profile({
    subject: "dialysis technology",
    h1: "Diploma Dialysis Technology in Hyderabad: Admission & Fees",
    metaTitle: "Diploma Dialysis Hyderabad",
    directAnswer: "The Diploma in Dialysis Technology at St. Mary's University (SMRU), Hyderabad is your practice-focused route into dialysis-unit roles, covering haemodialysis machine operation, renal-care workflow and patient monitoring.",
    study: "Students should verify official modules for dialysis workflow, machine handling, patient monitoring, renal care basics, infection control, and clinical support.",
    experience: "Learning should emphasize dialysis unit workflow, machine handling basics, patient monitoring, renal care support, and supervised practical exposure after confirmation.",
    careerAnswer: "Career paths can include dialysis technician, renal care support, dialysis unit assistant, and patient monitoring support roles after source verification.",
    keywords: {
      local: ["Diploma Dialysis Technology Hyderabad", "dialysis technician Telangana"],
      national: ["dialysis technician course India", "dialysis diploma India"],
      admission: ["D.DT admission 2026", "D.DT eligibility", "D.DT fees"],
      syllabus: ["D.DT syllabus", "dialysis workflow", "machine handling", "patient monitoring"],
      career: ["dialysis technician roles", "diploma dialysis careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["d dt hyd",]),
    },
  }),
  "allied-health-sciences/bdtt": profile({
    subject: "dialysis therapy technology",
    h1: "Dialysis Therapy Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Dialysis Therapy Tech Hyderabad",
    directAnswer: "Bachelor of Dialysis Therapy Technology prepares you to run the life-sustaining care people with kidney failure depend on. At St. Mary's University (SMRU), Hyderabad you train in haemodialysis and peritoneal dialysis, water treatment, vascular access and patient monitoring, with clinical postings in dialysis units.",
    study: "Students should verify official modules for renal care, dialysis equipment, patient monitoring, dialysis workflow, infection control, and clinical postings.",
    experience: "Learning should emphasize dialysis equipment handling, renal care support, clinical postings, patient monitoring, and supervised dialysis unit exposure after confirmation.",
    careerAnswer: "Career paths can include dialysis technologist, renal care technologist, dialysis unit support, and patient monitoring roles after source verification.",
    keywords: {
      local: ["Dialysis Therapy Technology course Hyderabad", "renal care Telangana"],
      national: ["dialysis therapy course India", "renal-care technology India"],
      admission: ["B.DTT admission 2026", "B.DTT eligibility", "B.DTT fees"],
      syllabus: ["B.DTT syllabus", "renal care", "dialysis equipment", "clinical postings"],
      career: ["dialysis technologist roles", "renal care careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bdtt hyd",]),
    },
  }),
  "allied-health-sciences/brt-respiratory": profile({
    subject: "respiratory technology",
    h1: "Respiratory Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Respiratory Technology Hyderabad",
    directAnswer: "Bachelor of Respiratory Technology prepares you to manage breathing and ventilation for critically ill patients. At St. Mary's University (SMRU), Hyderabad you train in ventilator management, oxygen therapy, pulmonary function testing and ICU support, with supervised clinical postings.",
    study: "Students should verify official modules for pulmonary care, ICU support, respiratory equipment, patient monitoring, ventilation support, and clinical postings.",
    experience: "Learning should emphasize pulmonary care exposure, ICU workflow support, patient monitoring, respiratory equipment familiarity, and supervised clinical practice after confirmation.",
    careerAnswer: "Career paths can include respiratory technologist, pulmonary care support, ICU support technologist, and patient monitoring roles after source verification.",
    keywords: {
      local: ["Respiratory Technology course Hyderabad", "pulmonary care Telangana"],
      national: ["respiratory technology course India", "respiratory care India"],
      admission: ["B.RT admission 2026", "B.RT eligibility", "B.RT fees"],
      syllabus: ["B.RT syllabus", "pulmonary care", "ICU support", "patient monitoring"],
      career: ["respiratory technologist roles", "respiratory care careers"],
      variant: [],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["brt respiratory hyd", "respiratory therapy course hyderabad"]),
    },
  }),
  "allied-health-sciences/bmit": profile({
    subject: "medical imaging technology",
    h1: "Medical Imaging Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Medical Imaging Tech Hyderabad",
    directAnswer: "B.Sc. Medical Imaging Technology prepares you to run the X-ray, CT, MRI and ultrasound technology that diagnoses disease. At St. Mary's University (SMRU), Hyderabad you learn to operate imaging equipment safely, position patients correctly and support radiologists, with postings in imaging departments.",
    study: "Students should verify official modules for radiographic techniques, MRI, CT scanning, radiation safety, imaging physics, and clinical postings.",
    experience: "Learning should emphasize imaging lab exposure, MRI/CT machine familiarity, radiation safety, and supervised practical support in radiology departments after confirmation.",
    careerAnswer: "Career paths can include radiology technologist, MRI technician, CT scan technologist, and imaging department support roles after source verification.",
    keywords: {
      local: ["Medical Imaging Technology course Hyderabad", "radiology course Telangana"],
      national: ["medical imaging technology India", "radiology technician course India"],
      admission: ["B.Sc. Radiology admission 2026", "BMIT eligibility", "BMIT fees"],
      syllabus: ["BMIT syllabus", "MRI training", "CT scan training", "radiation safety"],
      career: ["radiology technologist roles", "medical imaging careers"],
      variant: ["bsc-radiology", "bsc-mrit"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bmit hyd", "radiology technology", "medical imaging course hyderabad"]),
    },
  }),
  "allied-health-sciences/bsc-him": profile({
    subject: "health information management",
    h1: "Health Information Management Course in Hyderabad: Admission & Fees",
    metaTitle: "Health Information Management Hyderabad",
    directAnswer: "B.Sc. Health Information Management prepares you to manage the clinical records and health data modern hospitals run on. At St. Mary's University (SMRU), Hyderabad you learn medical coding, health informatics, privacy and healthcare analytics.",
    study: "Students should verify official modules for medical coding, health informatics, hospital records management, data analytics, and healthcare IT systems.",
    experience: "Learning should emphasize healthcare IT software exposure, medical records handling, coding practice, and supervised hospital administration postings after confirmation.",
    careerAnswer: "Career paths can include health information manager, medical coder, healthcare data analyst, and hospital records administrator roles after source verification.",
    keywords: {
      local: ["Health Information Management course Hyderabad", "medical coding course Telangana"],
      national: ["health information management India", "medical coding degree India"],
      admission: ["B.Sc. HIM admission 2026", "HIM eligibility", "HIM fees"],
      syllabus: ["HIM syllabus", "medical coding", "hospital records", "healthcare IT"],
      career: ["medical coder roles", "health information manager careers"],
      variant: ["bsc-him"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["him hyd", "medical records management", "health info management course"]),
    },
  }),
  "allied-health-sciences/bsc-public-health": profile({
    subject: "public health",
    h1: "Public Health Course in Hyderabad: Admission & Fees",
    metaTitle: "Public Health Course Hyderabad",
    directAnswer: "B.Sc. Public Health prepares you to improve the health of whole communities. At St. Mary's University (SMRU), Hyderabad you study epidemiology, community health, health policy and programme management for careers in public-health organisations and community programmes.",
    study: "Students should verify official modules for epidemiology, community health, biostatistics, environmental health, and public health administration.",
    experience: "Learning should emphasize community health projects, epidemiological data analysis, public health campaigns, and supervised NGO/hospital postings after confirmation.",
    careerAnswer: "Career paths can include public health officer, community health worker, epidemiologist assistant, and health policy coordinator roles after source verification.",
    keywords: {
      local: ["Public Health course Hyderabad", "community health course Telangana"],
      national: ["public health course India", "BSc public health India"],
      admission: ["B.Sc. Public Health admission 2026", "Public Health eligibility", "Public Health fees"],
      syllabus: ["Public Health syllabus", "epidemiology", "community health", "health policy"],
      career: ["public health officer roles", "community health careers"],
      variant: ["bsc-public-health"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["public health hyd", "community health management", "bsc public health hyderabad"]),
    },
  }),
};

const keyFor = (departmentSlug?: string, programSlug?: string) =>
  `${String(departmentSlug || "").toLowerCase()}/${String(programSlug || "").toLowerCase()}`;

const unique = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.replace(/\s+/g, " ").trim()).filter(Boolean)));

export const getHealthAlliedCourseSeoProfile = ({
  schoolSlug,
  departmentSlug,
  programSlug,
}: {
  schoolSlug?: string;
  departmentSlug?: string;
  programSlug?: string;
}) => {
  if (schoolSlug && schoolSlug !== HEALTH_ALLIED_SCHOOL_SLUG) return null;
  const courseKey = keyFor(departmentSlug, programSlug);
  const courseProfile = PROFILES[courseKey] || null;
  return courseProfile
    ? { ...courseProfile, metaTitle: buildHighIntentMetaTitle(courseProfile) }
    : null;
};

export const getHealthAlliedCourseSearchSubject = (departmentSlug?: string, programSlug?: string) =>
  PROFILES[keyFor(departmentSlug, programSlug)]?.subject || null;

export const getHealthAlliedCourseTerms = ({
  schoolSlug,
  departmentSlug,
  programSlug,
}: {
  schoolSlug?: string;
  departmentSlug?: string;
  programSlug?: string;
}) => {
  const courseProfile = getHealthAlliedCourseSeoProfile({ schoolSlug, departmentSlug, programSlug });
  if (!courseProfile) return [];

  const groups = courseProfile.keywords;
  return unique([
    courseProfile.h1,
    courseProfile.subject,
    ...groups.local,
    ...groups.national,
    ...groups.admission,
    ...groups.syllabus,
    ...groups.career,
    ...groups.variant,
    ...groups.regionalNri,
    ...groups.backend,
  ]);
};

export const buildHealthAlliedCourseFaqs = ({
  schoolSlug,
  departmentSlug,
  programSlug,
  programName,
}: {
  schoolSlug?: string;
  departmentSlug?: string;
  programSlug?: string;
  programName?: string;
}) => {
  const courseProfile = getHealthAlliedCourseSeoProfile({ schoolSlug, departmentSlug, programSlug });
  if (!courseProfile) return [];

  const name = programName || courseProfile.subject;
  return [
    {
      question: `What does the ${name} syllabus and practical training focus on?`,
      answer: `${courseProfile.study} Detailed syllabus, semester structure, and practical-hour requirements should be confirmed through official St. Mary's University sources before application.`,
    },
    {
      question: `What career path should students verify for ${name}?`,
      answer: `${courseProfile.careerAnswer} Salary, placement outcomes, intake, and employer details should be verified through official university records.`,
    },
    {
      question: `What kind of clinical exposure and lab facilities are provided for ${name}?`,
      answer: `${courseProfile.experience} The university offers specialized laboratories and simulation setups on campus, coupled with clinical postings at partner hospitals. Ensure to verify specific lab equipment and partner hospital details through the official admissions counselor.`,
    },
    {
      question: `Is an internship or clinical posting mandatory for ${name}?`,
      answer: `Yes, for most allied health programmes, a supervised clinical internship is a mandatory component of the curriculum for degree completion. You must verify the exact duration (e.g., 6 months to 1 year) and the internship stipends or locations with St. Mary's University.`,
    },
    {
      question: `Are there any specific eligibility requirements for students from outside Telangana?`,
      answer: `Students from all states (including Andhra Pradesh, North India, and South India) are eligible to apply. NRI or international students may have separate fee structures and eligibility criteria which must be verified with the university admissions team.`,
    },
    {
      question: `Can students from other Indian states or NRI/international applicants use this ${name} page?`,
      answer:
        "Students from Telangana, Andhra Pradesh, North India, South India, and other regions can use this page for programme discovery. NRI or international admission eligibility is not promised here and must be confirmed with the university admissions team.",
    },
  ];
};
