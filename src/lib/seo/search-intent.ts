type AcademicEntity = {
  slug?: string;
  name?: string;
  level?: string;
};

type SearchCluster = {
  subject: string;
  keywords: string[];
};

const SEARCH_CLUSTERS: Record<string, SearchCluster> = {
  "rehabilitation-sciences": {
    subject: "rehabilitation sciences",
    keywords: [
      "rehabilitation sciences college in Hyderabad",
      "rehabilitation university in Hyderabad",
      "rehabilitation courses after 12th",
      "audiology and speech therapy courses",
      "prosthetics and orthotics courses",
      "special education courses in Hyderabad",
    ],
  },
  "health-allied-health-sciences": {
    subject: "allied health sciences",
    keywords: [
      "allied health sciences college in Hyderabad",
      "paramedical courses in Hyderabad",
      "allied health courses after 12th",
      "healthcare courses in Hyderabad",
      "clinical courses after 12th",
      "health sciences admissions 2026",
    ],
  },
  psychology: {
    subject: "psychology",
    keywords: [
      "psychology college in Hyderabad",
      "psychology courses after 12th",
      "clinical psychology courses in Hyderabad",
      "rehabilitation psychology courses",
      "behavioural health courses",
      "psychology admissions 2026",
    ],
  },
  "nursing-sciences": {
    subject: "nursing",
    keywords: [
      "nursing college in Hyderabad",
      "nursing courses after 12th",
      "BSc Nursing admission 2026",
      "MSc Nursing college in Hyderabad",
      "nursing college with clinical exposure",
      "nursing university in Telangana",
    ],
  },
  "engineering-emerging-technologies": {
    subject: "engineering",
    keywords: [
      "engineering college in Hyderabad",
      "BTech admission 2026 Hyderabad",
      "computer science engineering college Hyderabad",
      "artificial intelligence courses after 12th",
      "industry integrated BTech programmes",
      "emerging technology courses in Hyderabad",
    ],
  },
  law: {
    subject: "law",
    keywords: [
      "law college in Hyderabad",
      "law university in Hyderabad",
      "LLB college in Hyderabad",
      "law courses after 12th",
      "integrated law courses Hyderabad",
      "law college with moot court",
    ],
  },
  "commerce-applied-sciences": {
    subject: "commerce and applied sciences",
    keywords: [
      "commerce college in Hyderabad",
      "management courses in Hyderabad",
      "professional courses after 12th",
      "career focused courses Hyderabad",
    ],
  },
};

const PROGRAM_RULES: Array<{ pattern: RegExp; terms: string[]; subject?: string }> = [
  { pattern: /\bBASLP\b/i, subject: "BASLP", terms: ["BASLP college in Hyderabad", "BASLP admission 2026", "speech therapy course in Hyderabad", "audiology college in Hyderabad"] },
  { pattern: /\bBPT\b/i, subject: "physiotherapy", terms: ["BPT college in Hyderabad", "BPT admission 2026", "physiotherapy courses after 12th", "physiotherapy college with clinical training"] },
  { pattern: /\bMPT\b/i, subject: "MPT", terms: ["MPT college in Hyderabad", "MPT admission 2026", "postgraduate physiotherapy course"] },
  { pattern: /physiotherapy/i, subject: "physiotherapy", terms: ["physiotherapy college in Hyderabad", "physiotherapy course eligibility", "physiotherapy career opportunities"] },
  { pattern: /\bBOT\b/i, subject: "occupational therapy", terms: ["occupational therapy college in Hyderabad", "BOT admission 2026", "occupational therapy courses after 12th"] },
  { pattern: /\bMOT\b/i, subject: "occupational therapy", terms: ["MOT course in Hyderabad", "postgraduate occupational therapy course"] },
  { pattern: /occupational therapy/i, subject: "occupational therapy", terms: ["occupational therapy college in Hyderabad", "occupational therapy course eligibility"] },
  { pattern: /medical lab|laboratory science|\bBMLT\b|\bBMLS\b/i, subject: "medical laboratory technology", terms: ["BMLT course in Hyderabad", "medical laboratory technology college", "medical lab technology admission 2026"] },
  { pattern: /anaesthesia|anesthesia|operation theatre/i, subject: "anaesthesia and operation theatre technology", terms: ["operation theatre technology course", "anaesthesia technology college Hyderabad", "OT technician course after 12th"] },
  { pattern: /cardiovascular/i, subject: "cardiovascular technology", terms: ["cardiovascular technology course", "cardiac technology college Hyderabad"] },
  { pattern: /emergency medical|\bEMT\b/i, subject: "emergency medical technology", terms: ["emergency medical technology course", "emergency care course after 12th"] },
  { pattern: /optometry/i, subject: "optometry", terms: ["optometry college in Hyderabad", "optometry course after 12th", "optometry admission 2026"] },
  { pattern: /radiotherapy/i, subject: "radiotherapy technology", terms: ["radiotherapy technology course", "radiotherapy college in Hyderabad"] },
  { pattern: /dialysis/i, subject: "dialysis technology", terms: ["dialysis technology course", "dialysis technician course Hyderabad"] },
  { pattern: /respiratory/i, subject: "respiratory technology", terms: ["respiratory technology course", "respiratory therapy college Hyderabad"] },
  { pattern: /physician assistant/i, subject: "physician assistant", terms: ["physician assistant course Hyderabad", "physician assistant admission 2026"] },
  { pattern: /nutrition|dietetics/i, subject: "nutrition and dietetics", terms: ["nutrition and dietetics college Hyderabad", "nutrition course after 12th"] },
  { pattern: /forensic science/i, subject: "forensic science", terms: ["forensic science college in Hyderabad", "BSc forensic science admission 2026", "forensic science courses after 12th"] },
  { pattern: /clinical psychology/i, subject: "clinical psychology", terms: ["clinical psychology college in Hyderabad", "BSc clinical psychology admission", "MA clinical psychology Hyderabad"] },
  { pattern: /rehabilitation psychology/i, subject: "rehabilitation psychology", terms: ["rehabilitation psychology course", "PG diploma rehabilitation psychology"] },
  { pattern: /psychology/i, subject: "psychology", terms: ["psychology college in Hyderabad", "psychology course eligibility and fees", "psychology career opportunities"] },
  { pattern: /B\.?Sc\.?\s*Nursing/i, subject: "nursing", terms: ["BSc Nursing college in Hyderabad", "BSc Nursing admission 2026", "nursing courses after 12th", "nursing college with clinical exposure"] },
  { pattern: /M\.?Sc\.?\s*Nursing/i, subject: "nursing", terms: ["MSc Nursing college in Hyderabad", "MSc Nursing admission 2026", "postgraduate nursing course"] },
  { pattern: /nursing/i, subject: "nursing", terms: ["nursing college in Hyderabad", "nursing course eligibility and fees", "nursing career opportunities"] },
  { pattern: /cyber security|cyber forensics/i, subject: "cyber security engineering", terms: ["BTech cyber security Hyderabad", "cyber security course after 12th", "cyber forensics course"] },
  { pattern: /AI\s*&\s*ML|artificial intelligence|machine learning/i, subject: "AI and machine learning engineering", terms: ["BTech AI and ML Hyderabad", "artificial intelligence engineering college", "AI courses after 12th"] },
  { pattern: /AI\s*&\s*DS|data science/i, subject: "AI and data science engineering", terms: ["BTech AI and data science Hyderabad", "data science engineering college", "AI and DS admission 2026"] },
  { pattern: /computer science|\bCSE\b/i, subject: "computer science engineering", terms: ["BTech CSE college Hyderabad", "computer science engineering admission 2026", "CSE course eligibility and fees"] },
  { pattern: /biomedical.*robotics|robotics/i, subject: "biomedical AI and robotics", terms: ["biomedical AI and robotics course", "robotics engineering college Hyderabad"] },
  { pattern: /rehabilitation engineering|assistive technolog/i, subject: "rehabilitation engineering", terms: ["rehabilitation engineering course", "assistive technology engineering", "BTech rehabilitation engineering"] },
  { pattern: /\bB\.?A\.?\s*LL\.?B|BA LLB/i, subject: "BA LLB", terms: ["BA LLB college in Hyderabad", "BA LLB admission 2026", "5 year integrated law course"] },
  { pattern: /\bB\.?B\.?A\.?\s*LL\.?B|BBA LLB/i, subject: "BBA LLB", terms: ["BBA LLB college in Hyderabad", "BBA LLB admission 2026", "business law course after 12th"] },
  { pattern: /\bB\.?Sc\.?\s*LL\.?B|BSc LLB/i, subject: "BSc LLB", terms: ["BSc LLB college in Hyderabad", "BSc LLB admission 2026", "forensic law course"] },
  { pattern: /\bLL\.?B/i, subject: "LLB", terms: ["LLB college in Hyderabad", "3 year LLB admission 2026", "LLB eligibility and fees"] },
  { pattern: /\bLL\.?M/i, subject: "LLM", terms: ["LLM college in Hyderabad", "one year LLM programmes", "LLM admission 2026"] },
  { pattern: /Ph\.?D/i, subject: "PhD", terms: ["PhD admission 2026 Hyderabad", "doctoral programmes in Hyderabad", "PhD eligibility and fees"] },
];

const unique = (values: string[], limit = 36) =>
  Array.from(new Set(values.map((value) => value.replace(/\s+/g, " ").trim()).filter(Boolean))).slice(0, limit);

const cleanName = (value = "") => value.replace(/\s*\/\s*.*/, "").replace(/\s+/g, " ").trim();

const clusterFor = (schoolSlug = "") =>
  SEARCH_CLUSTERS[schoolSlug] || {
    subject: "professional education",
    keywords: ["professional courses in Hyderabad", "career focused university courses", "university admissions 2026 Hyderabad"],
  };

export const getSchoolSearchTerms = (school: AcademicEntity) => {
  const name = cleanName(school.name || "Academic School");
  const cluster = clusterFor(school.slug);
  return unique([
    name,
    `${name} Hyderabad`,
    `${name} admissions 2026`,
    `${name} courses`,
    `${name} eligibility and fees`,
    `best ${cluster.subject} college in Hyderabad`,
    `top ${cluster.subject} colleges in Telangana`,
    ...cluster.keywords,
  ]);
};

export const getDepartmentSearchTerms = (school: AcademicEntity, department: AcademicEntity) => {
  const name = cleanName(department.name || "Department");
  const cluster = clusterFor(school.slug);
  return unique([
    name,
    `${name} college in Hyderabad`,
    `${name} courses in Hyderabad`,
    `${name} admission 2026`,
    `${name} eligibility and fees`,
    `${name} career opportunities`,
    `best ${cluster.subject} college in Hyderabad`,
    ...cluster.keywords,
  ]);
};

export const getProgramSearchSubject = (program: AcademicEntity, department?: AcademicEntity) => {
  const name = cleanName(program.name || "programme");
  return PROGRAM_RULES.find((rule) => rule.pattern.test(name))?.subject || cleanName(department?.name || name);
};

export const getProgramSearchTerms = (
  school: AcademicEntity,
  department: AcademicEntity,
  program: AcademicEntity
) => {
  const name = cleanName(program.name || "Programme");
  const subject = getProgramSearchSubject(program, department);
  const isDoctoral = /ph\.?d|doctoral/i.test(`${name} ${program.level || ""}`);
  const matchingTerms = isDoctoral
    ? [
        `PhD ${subject} in Hyderabad`,
        `doctoral programme in ${subject}`,
        `${subject} research programme`,
      ]
    : PROGRAM_RULES.filter((rule) => rule.pattern.test(name)).flatMap((rule) => rule.terms);
  const afterTwelfth = /ug|undergraduate|integrated/i.test(program.level || "")
    ? [`${subject} courses after 12th`]
    : [];

  return unique([
    name,
    `${name} course in Hyderabad`,
    `${name} admission 2026`,
    `${name} eligibility`,
    `${name} fees`,
    `${name} duration`,
    `${name} syllabus`,
    `${name} career opportunities`,
    isDoctoral ? `best university for PhD ${subject} in Hyderabad` : `best ${subject} college in Hyderabad`,
    isDoctoral ? `top PhD ${subject} programmes in Telangana` : `top ${subject} colleges in Telangana`,
    ...afterTwelfth,
    ...matchingTerms,
    ...getDepartmentSearchTerms(school, department).slice(0, 8),
  ]);
};

export const buildSchoolComparisonFaqs = (school: AcademicEntity) => {
  const cluster = clusterFor(school.slug);
  return [
    {
      question: `How should students compare the best ${cluster.subject} colleges in Hyderabad?`,
      answer:
        "Compare verified university recognition, programme curriculum, faculty information, laboratories or practical exposure, eligibility, published fee guidance, student support, and career preparation. “Best” and “top” are comparison searches, not independent ranking claims on this website.",
    },
    {
      question: `Is ${school.name || "this school"} located in the Hyderabad region?`,
      answer:
        `${school.name || "This school"} is part of Stmarys University in Hyderabad, Telangana. Use the official campus and contact pages for the current address, map, and visit guidance.`,
    },
  ];
};

export const buildDepartmentComparisonFaqs = (school: AcademicEntity, department: AcademicEntity) => {
  const cluster = clusterFor(school.slug);
  return [
    {
      question: `What should I check when comparing top ${cluster.subject} departments in Hyderabad?`,
      answer:
        `Review the programmes listed under ${department.name || "the department"}, their eligibility, duration, curriculum, practical learning, applicable professional requirements, admissions route, and officially published fee information.`,
    },
  ];
};

export const buildProgramComparisonFaqs = (
  school: AcademicEntity,
  department: AcademicEntity,
  program: AcademicEntity
) => {
  const name = cleanName(program.name || "this programme");
  const subject = getProgramSearchSubject(program, department);
  const isDoctoral = /ph\.?d|doctoral/i.test(`${name} ${program.level || ""}`);
  const comparisonPhrase = isDoctoral
    ? `PhD ${subject} programmes in Hyderabad`
    : `${subject} colleges in Hyderabad`;
  return [
    {
      question: `How should I compare the best ${comparisonPhrase}?`,
      answer:
        `Compare the ${name} curriculum, eligibility, duration, practical or clinical exposure, faculty information, facilities, applicable approvals, fee disclosures, and career support. This page provides Stmarys University programme information and does not claim an independent ranking.`,
    },
    {
      question: `Where can I check ${name} admission, eligibility, duration, and fees?`,
      answer:
        `This page lists the available ${name} eligibility and duration details. Use the official admissions, fee, and contact links for current 2026 application and fee confirmation.`,
    },
  ];
};
