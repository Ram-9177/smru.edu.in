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
  metaDescription: string;
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

const TYPO_KEYWORD_SUPPORT = [
  "allied helth courses Hyderabad",
  "allied health scince courses Hyderabad",
  "allied health science cource Hyderabad",
  "paramedical cource Hyderabad",
  "paramedicle courses Hyderabad",
  "health science collage Hyderabad",
  "healthcare cource Hyderabad",
  "medical technolgy course Hyderabad",
  "course fees hyd",
  "admision 2026 hyd",
  "eligiblity fees hyd",
];

const COURSE_TYPO_SUPPORT: Record<string, string[]> = {
  "physiotherapy/bpt": ["bpt cource hyd", "bpt course hyderbad", "bpt admision 2026", "physiotheraphy course", "physio therapy collage"],
  "physiotherapy/mpt": ["mpt cource hyd", "mpt admision 2026", "master physiotheraphy", "pg physio therapy course"],
  "physiotherapy/phd-physiotherapy": ["phd physiotheraphy", "ph d physiotherapy", "doctorate physiotherapy hyd"],
  "physiotherapy/phd-physiotherapy-neurology": ["phd neuro physiotheraphy", "ph d physiotherapy neurology", "neuro physio doctorate hyd"],
  "occupational-therapy/bot": ["bot cource hyd", "bot admision 2026", "occupational theraphy course", "occupation therapy collage"],
  "occupational-therapy/mot": ["mot cource hyd", "master occupational theraphy", "pg ot course hyderabad"],
  "occupational-therapy/phd-occupational-therapy": ["phd occupational theraphy", "ph d occupational therapy", "doctorate ot hyderabad"],
  "allied-health-sciences/bmlt": ["bmlt cource hyd", "mlt cource hyderabad", "medical lab tecnology", "lab tecnician course"],
  "allied-health-sciences/bsc-anaesthesia-ot": ["anesthesia ot tecnology", "anaesthesia ot cource", "operation theater technology", "ot tecnician course"],
  "allied-health-sciences/bcvt": ["cardio vascular tecnology", "cardiac tech cource", "cv t course hyd", "bcvt admision"],
  "allied-health-sciences/bmit": ["medical imaging tecnology", "bmit cource hyd", "radiology cource hyderabad", "bmit admision"],
  "allied-health-sciences/betcms": ["emergency medical tecnology", "emt cource hyd", "emergency care cource", "betcms admision"],
  "allied-health-sciences/b-optometry": ["optomitry course", "optometry cource hyd", "eye care cource", "optometry admision"],
  "allied-health-sciences/brt": ["radio therapy tecnology", "radiotherapy tech hyd", "brtt cource", "radiotherapy admision"],
  "allied-health-sciences/bsc-forensic-science": ["forensic scince", "forensics cource hyd", "bsc forensic admision", "forensic collage"],
  "allied-health-sciences/diploma-anaesthesia-operation-theatre-technology": ["diploma anesthesia ot", "diploma anaesthesia tecnology", "d aott hyd", "ot diploma cource"],
  "allied-health-sciences/bachelor-nutrition-dietetics-hons": ["nutrision course", "nutrition dietics hyd", "dietetics cource", "dietician course hyd"],
  "allied-health-sciences/diploma-radiotherapy-technology": ["diploma radio therapy", "radiotherapy tecnology diploma", "d rt hyd", "radiotherapy diploma cource"],
  "allied-health-sciences/bpa": ["phisician assistant course", "physician assistant cource", "bpa admision hyd", "clinical assistant cource"],
  "allied-health-sciences/diploma-dialysis-technology": ["dialysis tecnology diploma", "dialisis technician course", "d dt hyd", "dialysis cource hyd"],
  "allied-health-sciences/bdtt": ["dialysis theraphy technology", "dialisis therapy course", "bdtt cource hyd", "renal care cource"],
  "allied-health-sciences/brt-respiratory": ["respiratory tecnology", "respiratory theraphy course", "brt respiratory hyd", "pulmonary care cource"],
};

const backendOnly = (terms: string[]) => terms;

const profile = (data: HealthAlliedCourseSeoProfile) => data;

const buildHighIntentMetaTitle = (courseProfile: HealthAlliedCourseSeoProfile) => {
  const baseTitle = (courseProfile.metaTitle || courseProfile.subject)
    .replace(/\s+/g, " ")
    .trim();

  if (/admission\s+2026/i.test(baseTitle)) return baseTitle;
  return `${baseTitle}: Admission 2026, Fees`;
};

const withTypoKeywordSupport = (courseKey: string, courseProfile: HealthAlliedCourseSeoProfile) => ({
  ...courseProfile,
  keywords: {
    ...courseProfile.keywords,
    backend: unique([
      ...courseProfile.keywords.backend,
      ...TYPO_KEYWORD_SUPPORT,
      ...(COURSE_TYPO_SUPPORT[courseKey] || []),
    ]),
  },
});

const PROFILES: Record<string, HealthAlliedCourseSeoProfile> = {
  "physiotherapy/bpt": profile({
    subject: "physiotherapy",
    h1: "BPT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "BPT Course in Hyderabad",
    metaDescription: "Explore BPT at St.Mary's University Hyderabad with eligibility, duration, fee guidance, physiotherapy practical training, clinical learning, and admissions support.",
    directAnswer: "BPT at St.Mary's University Hyderabad is a physiotherapy programme for students comparing rehabilitation, movement science, clinical training, and admission guidance in Telangana.",
    study: "Students study anatomy, exercise therapy, electrotherapy, manual therapy, biomechanics, clinical rehabilitation, and patient assessment.",
    experience: "Learning should emphasize physiotherapy labs, supervised clinical postings, movement assessment, and rehabilitation practice.",
    careerAnswer: "Career paths can include physiotherapy, sports rehabilitation, neuro-rehabilitation, cardiopulmonary rehabilitation, and community rehabilitation roles after source verification.",
    keywords: {
      local: ["BPT course in Hyderabad", "physiotherapy college in Telangana", "BPT admission Hyderabad"],
      national: ["BPT course in India", "physiotherapy courses after 12th India"],
      admission: ["BPT admission 2026", "BPT eligibility", "BPT fees", "BPT duration"],
      syllabus: ["BPT syllabus", "physiotherapy practical training", "clinical rehabilitation training"],
      career: ["BPT career opportunities", "physiotherapy jobs", "physiotherapy placement support"],
      variant: ["bpt", "bpt-emversity", "BPT EMVERSITY", "BPT St.Mary's University"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bpt hyd", "bpt course hyd", "physiotheraphy course", "physio therapy college"]),
    },
  }),
  "physiotherapy/mpt": profile({
    subject: "postgraduate physiotherapy",
    h1: "MPT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "MPT Course in Hyderabad",
    metaDescription: "Review MPT at St.Mary's University Hyderabad with PG physiotherapy eligibility, duration, fee guidance, specialization focus, clinical practice, and admissions support.",
    directAnswer: "MPT at St.Mary's University Hyderabad is a postgraduate physiotherapy pathway for students comparing advanced rehabilitation practice and specialization options in Telangana.",
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
      backend: backendOnly(["mpt hyd", "mpt course hyd", "master physiotheraphy"]),
    },
  }),
  "physiotherapy/phd-physiotherapy": profile({
    subject: "physiotherapy research",
    h1: "Ph.D. Physiotherapy in Hyderabad: Admission, Eligibility & Research",
    metaTitle: "Ph.D. Physiotherapy Hyderabad",
    metaDescription: "Review Ph.D. Physiotherapy at St.Mary's University Hyderabad with doctoral admission guidance, research focus areas, supervisor verification, eligibility, and fee updates.",
    directAnswer: "Ph.D. Physiotherapy at St.Mary's University Hyderabad is a doctoral research pathway for physiotherapy scholars; eligibility, supervisors, intake, and fees must be verified with the university.",
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
      backend: backendOnly(["phd physiotheraphy", "ph d physiotherapy", "doctorate physiotherapy hyderabad"]),
    },
  }),
  "physiotherapy/phd-physiotherapy-neurology": profile({
    subject: "neuro-physiotherapy research",
    h1: "Ph.D. Physiotherapy Neurology in Hyderabad: Admission & Research",
    metaTitle: "Ph.D. Physiotherapy Neurology Hyderabad",
    metaDescription: "Review Ph.D. Physiotherapy Neurology at St.Mary's University Hyderabad with doctoral admission guidance, neuro-rehabilitation research focus, eligibility, and fee updates.",
    directAnswer: "Ph.D. Physiotherapy Neurology is a doctoral pathway for neuro-rehabilitation research; eligibility, supervisor availability, intake, and fees must be verified with the university.",
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
      backend: backendOnly(["phd neuro physiotheraphy", "ph d physiotherapy neurology", "doctorate neuro physiotherapy"]),
    },
  }),
  "occupational-therapy/bot": profile({
    subject: "occupational therapy",
    h1: "BOT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "BOT Course in Hyderabad",
    metaDescription: "Explore BOT at St.Mary's University Hyderabad with occupational therapy eligibility, duration, fee guidance, functional rehabilitation, assistive living, and admissions support.",
    directAnswer: "BOT at St.Mary's University Hyderabad is an occupational therapy programme for students comparing functional rehabilitation, assistive living, clinical learning, and admission guidance in Telangana.",
    study: "Students study human occupation, functional anatomy, neuroscience, assistive technology, rehabilitation practice, mental health, and community-based therapy.",
    experience: "Learning should emphasize ADL training, assistive technology exposure, supervised clinical postings, functional assessment, and rehabilitation practice.",
    careerAnswer: "Career paths can include occupational therapy, paediatric OT, neuro-rehabilitation, hand therapy, geriatric rehabilitation, and assistive technology roles after source verification.",
    keywords: {
      local: ["BOT course in Hyderabad", "occupational therapy college Telangana", "BOT admission Hyderabad"],
      national: ["BOT course in India", "occupational therapy after 12th India"],
      admission: ["BOT admission 2026", "BOT eligibility", "BOT fees", "BOT duration"],
      syllabus: ["BOT syllabus", "occupational therapy practical training", "functional rehabilitation"],
      career: ["BOT career opportunities", "occupational therapy jobs", "BOT placement support"],
      variant: ["bot", "bot-emversity", "BOT EMVERSITY", "BOT St.Mary's University"],
      regionalNri: REGIONAL_NRI_SUPPORT,
      backend: backendOnly(["bot hyd", "bot course hyd", "occupational theraphy course"]),
    },
  }),
  "occupational-therapy/mot": profile({
    subject: "postgraduate occupational therapy",
    h1: "MOT Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "MOT Course in Hyderabad",
    metaDescription: "Review MOT at St.Mary's University Hyderabad with PG occupational therapy eligibility, duration, fee guidance, assistive technology, clinical practice, and admissions support.",
    directAnswer: "MOT at St.Mary's University Hyderabad is a postgraduate occupational therapy pathway for students comparing advanced OT practice, assistive technology, and rehabilitation leadership.",
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
      backend: backendOnly(["mot hyd", "master occupational theraphy", "pg ot course hyderabad"]),
    },
  }),
  "occupational-therapy/phd-occupational-therapy": profile({
    subject: "occupational therapy research",
    h1: "Ph.D. Occupational Therapy in Hyderabad: Admission & Research",
    metaTitle: "Ph.D. Occupational Therapy Hyderabad",
    metaDescription: "Review Ph.D. Occupational Therapy at St.Mary's University Hyderabad with doctoral admission guidance, OT research focus, eligibility, supervisors, and fee updates.",
    directAnswer: "Ph.D. Occupational Therapy at St.Mary's University Hyderabad is a doctoral research pathway; eligibility, supervisors, intake, and fees must be verified with the university.",
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
      backend: backendOnly(["phd occupational theraphy", "ph d occupational therapy", "doctorate ot hyderabad"]),
    },
  }),
  "allied-health-sciences/bmlt": profile({
    subject: "medical laboratory technology",
    h1: "Medical Lab Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Medical Lab Technology Hyderabad",
    metaDescription: "Explore Medical Lab Technology at St.Mary's University Hyderabad with MLT eligibility, fee guidance, diagnostics lab training, pathology, microbiology, and admissions support.",
    directAnswer: "Medical Lab Technology at St.Mary's University Hyderabad is an allied health programme for students comparing diagnostics, pathology, microbiology, lab training, and admission guidance.",
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
      backend: backendOnly(["mlt hyd", "bmlt hyd", "medical lab tecnology", "lab technician course hyderabad"]),
    },
  }),
  "allied-health-sciences/bsc-anaesthesia-ot": profile({
    subject: "anaesthesia and operation theatre technology",
    h1: "Anesthesia & OT Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Anesthesia OT Technology Hyderabad",
    metaDescription: "Explore Anesthesia & OT Technology at St.Mary's University Hyderabad with AOTT eligibility, fee guidance, OT protocols, anaesthesia support, and admissions support.",
    directAnswer: "Anesthesia & OT Technology at St.Mary's University Hyderabad is an allied health programme for students comparing operation theatre support, anaesthesia assistance, and clinical training.",
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
      backend: backendOnly(["aott hyd", "anaesthesia ot course", "anesthesia ot tecnology", "operation theater technology"]),
    },
  }),
  "allied-health-sciences/bcvt": profile({
    subject: "cardiovascular technology",
    h1: "Cardiovascular Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Cardiovascular Technology Hyderabad",
    metaDescription: "Explore Cardiovascular Technology at St.Mary's University Hyderabad with CVT eligibility, fee guidance, ECG and echo concepts, cardiac diagnostics, and admissions support.",
    directAnswer: "Cardiovascular Technology at St.Mary's University Hyderabad is an allied health programme for students comparing cardiac diagnostics, cath-lab support, and clinical technology training.",
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
      backend: backendOnly(["cv t course", "bcvt hyd", "cardio vascular tecnology", "cardiac tech course hyderabad"]),
    },
  }),
  "allied-health-sciences/betcms": profile({
    subject: "emergency medical technology",
    h1: "Emergency Medical Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Emergency Medical Tech Hyderabad",
    metaDescription: "Explore Emergency Medical Technology at St.Mary's University Hyderabad with EMT eligibility, fee guidance, trauma response, triage, simulation, and admissions support.",
    directAnswer: "Emergency Medical Technology at St.Mary's University Hyderabad is an allied health programme for students comparing trauma response, triage, emergency simulation, and clinical support training.",
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
      backend: backendOnly(["emt hyd", "betcms", "emergency medical tecnology", "emergency care course hyd"]),
    },
  }),
  "allied-health-sciences/b-optometry": profile({
    subject: "optometry",
    h1: "Optometry Course in Hyderabad: Admission, Eligibility, Fees & Syllabus",
    metaTitle: "Optometry Course Hyderabad",
    metaDescription: "Explore Optometry at St.Mary's University Hyderabad with eligibility, fee guidance, vision science, eye screening, clinical optometry, and admissions support.",
    directAnswer: "Optometry at St.Mary's University Hyderabad is an allied health programme for students comparing vision science, eye screening, clinical optometry, and admission guidance.",
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
      backend: backendOnly(["optometry hyd", "optomitry course", "eye care course hyderabad"]),
    },
  }),
  "allied-health-sciences/brt": profile({
    subject: "radiotherapy technology",
    h1: "Radiotherapy Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Radiotherapy Technology Hyderabad",
    metaDescription: "Explore Radiotherapy Technology at St.Mary's University Hyderabad with eligibility, fee guidance, oncology workflow, radiation safety, treatment support, and admissions support.",
    directAnswer: "Radiotherapy Technology at St.Mary's University Hyderabad is an allied health programme for students comparing oncology support, treatment planning basics, radiation safety, and clinical technology training.",
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
      backend: backendOnly(["brt radiotherapy", "brtt", "radio therapy tecnology", "radiotherapy tech hyd"]),
    },
  }),
  "allied-health-sciences/bsc-forensic-science": profile({
    subject: "forensic science",
    h1: "Forensic Science Course in Hyderabad: Admission, Eligibility & Fees",
    metaTitle: "Forensic Science Course Hyderabad",
    metaDescription: "Explore Forensic Science at St.Mary's University Hyderabad with eligibility, fee guidance, crime-scene methods, evidence handling, forensic labs, and admissions support.",
    directAnswer: "Forensic Science at St.Mary's University Hyderabad is a science-led programme for students comparing crime-scene methods, evidence handling, forensic labs, and admission guidance.",
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
      backend: backendOnly(["forensic science hyd", "forensic scince", "bsc forensic hyd", "forensics course hyderabad"]),
    },
  }),
  "allied-health-sciences/diploma-anaesthesia-operation-theatre-technology": profile({
    subject: "anaesthesia and operation theatre technology",
    h1: "Diploma AOTT in Hyderabad: Admission, Eligibility & Fees",
    metaTitle: "Diploma AOTT Hyderabad",
    metaDescription: "Explore Diploma in Anaesthesia and Operation Theatre Technology at St.Mary's University Hyderabad with technician-readiness guidance, OT support, and admissions updates.",
    directAnswer: "Diploma AOTT at St.Mary's University Hyderabad is a diploma pathway for students comparing operation theatre support, anaesthesia assistance, and technician-readiness training.",
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
      backend: backendOnly(["d aott hyd", "diploma anesthesia ot", "anaesthesia operation theater technology diploma"]),
    },
  }),
  "allied-health-sciences/bachelor-nutrition-dietetics-hons": profile({
    subject: "nutrition and dietetics",
    h1: "Nutrition and Dietetics Course in Hyderabad: Admission & Fees",
    metaTitle: "Nutrition Dietetics Hyderabad",
    metaDescription: "Explore Bachelor of Nutrition and Dietetics (Hons) at St.Mary's University Hyderabad with dietetics admission guidance, clinical nutrition, diet planning, and fee updates.",
    directAnswer: "Bachelor of Nutrition and Dietetics (Hons) at St.Mary's University Hyderabad is an allied health pathway for students comparing clinical nutrition, diet planning, and wellness careers.",
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
      backend: backendOnly(["nutrition dietetics hyd", "dietetics course hyd", "nutrision course hyderabad"]),
    },
  }),
  "allied-health-sciences/diploma-radiotherapy-technology": profile({
    subject: "radiotherapy technology",
    h1: "Diploma Radiotherapy Technology in Hyderabad: Admission & Fees",
    metaTitle: "Diploma Radiotherapy Hyderabad",
    metaDescription: "Explore Diploma of Radiotherapy Technology at St.Mary's University Hyderabad with technician-readiness guidance, oncology workflow, safety basics, and admissions updates.",
    directAnswer: "Diploma of Radiotherapy Technology at St.Mary's University Hyderabad is a diploma pathway for students comparing oncology support, treatment-room assistance, and technician-readiness training.",
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
      backend: backendOnly(["d rt hyd", "diploma radio therapy", "radiotherapy tecnology diploma"]),
    },
  }),
  "allied-health-sciences/bpa": profile({
    subject: "physician assistant",
    h1: "Physician Assistant Course in Hyderabad: Admission & Fees",
    metaTitle: "Physician Assistant Hyderabad",
    metaDescription: "Explore Bachelor of Physician Assistant at St.Mary's University Hyderabad with clinical care coordination guidance, admission support, eligibility, and fee updates.",
    directAnswer: "Bachelor of Physician Assistant at St.Mary's University Hyderabad is an allied health pathway for students comparing clinical care coordination, physician support, and hospital-team readiness.",
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
      backend: backendOnly(["bpa hyd", "physician assistant hyd", "phisician assistant course"]),
    },
  }),
  "allied-health-sciences/diploma-dialysis-technology": profile({
    subject: "dialysis technology",
    h1: "Diploma Dialysis Technology in Hyderabad: Admission & Fees",
    metaTitle: "Diploma Dialysis Hyderabad",
    metaDescription: "Explore Diploma of Dialysis Technology at St.Mary's University Hyderabad with dialysis technician guidance, renal care workflow, admission support, eligibility, and fee updates.",
    directAnswer: "Diploma of Dialysis Technology at St.Mary's University Hyderabad is a diploma pathway for students comparing dialysis technician readiness, renal care workflow, and patient monitoring.",
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
      backend: backendOnly(["d dt hyd", "dialysis tecnology diploma", "dialisis technician course"]),
    },
  }),
  "allied-health-sciences/bdtt": profile({
    subject: "dialysis therapy technology",
    h1: "Dialysis Therapy Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Dialysis Therapy Tech Hyderabad",
    metaDescription: "Explore Bachelor of Dialysis Therapy Technology at St.Mary's University Hyderabad with renal care guidance, dialysis equipment, clinical postings, and admissions updates.",
    directAnswer: "Bachelor of Dialysis Therapy Technology at St.Mary's University Hyderabad is an allied health pathway for students comparing renal care, dialysis therapy, clinical postings, and patient monitoring.",
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
      backend: backendOnly(["bdtt hyd", "dialysis theraphy technology", "dialisis therapy course"]),
    },
  }),
  "allied-health-sciences/brt-respiratory": profile({
    subject: "respiratory technology",
    h1: "Respiratory Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Respiratory Technology Hyderabad",
    metaDescription: "Explore Bachelor of Respiratory Technology at St.Mary's University Hyderabad with pulmonary care guidance, ICU support, patient monitoring, and admissions updates.",
    directAnswer: "Bachelor of Respiratory Technology at St.Mary's University Hyderabad is an allied health pathway for students comparing pulmonary care, ICU support, respiratory practice, and patient monitoring.",
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
      backend: backendOnly(["brt respiratory hyd", "respiratory tecnology", "respiratory therapy course hyderabad"]),
    },
  }),
  "allied-health-sciences/bmit": profile({
    subject: "medical imaging technology",
    h1: "Medical Imaging Technology Course in Hyderabad: Admission & Fees",
    metaTitle: "Medical Imaging Tech Hyderabad",
    metaDescription: "Explore B.Sc. Medical Imaging Technology (Radiology) at St.Mary's University Hyderabad with imaging basics, MRI, CT, X-Ray training, and admission updates.",
    directAnswer: "B.Sc. Medical Imaging Technology at St.Mary's University Hyderabad is an allied health pathway for students comparing radiology support, MRI/CT operation, and imaging department readiness.",
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
    metaDescription: "Explore B.Sc. Health Information Management at St.Mary's University Hyderabad with medical coding, hospital records, healthcare IT, and admission updates.",
    directAnswer: "B.Sc. Health Information Management at St.Mary's University Hyderabad is a pathway for students comparing medical coding, healthcare data analytics, and hospital records administration.",
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
    metaDescription: "Explore B.Sc. Public Health at St.Mary's University Hyderabad with community health, epidemiology, health policy, and admission updates.",
    directAnswer: "B.Sc. Public Health at St.Mary's University Hyderabad is a pathway for students comparing community health management, epidemiology, and public health policy.",
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
    ? { ...withTypoKeywordSupport(courseKey, courseProfile), metaTitle: buildHighIntentMetaTitle(courseProfile) }
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
      answer: `${courseProfile.study} Detailed syllabus, semester structure, and practical-hour requirements should be confirmed through official St.Mary's University sources before application.`,
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
      answer: `Yes, for most allied health programmes, a supervised clinical internship is a mandatory component of the curriculum for degree completion. You must verify the exact duration (e.g., 6 months to 1 year) and the internship stipends or locations with St.Mary's University.`,
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
