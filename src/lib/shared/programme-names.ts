// Display names for programmes whose data `name` is a bare abbreviation ("BPT", "BPO", "PDCP").
// An abbreviation-only H1 / <title> / Course.name is a keyword gap for engines and an ambiguity for
// readers ("BPO" is business-process outsourcing to most of the web). Expansions follow the
// university's own course-code register (src/data/course-codes.ts) and standard Indian degree
// nomenclature; nothing here asserts a fact about SMRU beyond what the register already states.
//
// `display`   — H1, <title> primary, Course.name, catalogue row. Full name + abbreviation.
// `credential`— Course.educationalCredentialAwarded (the degree, without the abbreviation).
// `title`     — optional ≤ 41-char variant for the <title> ladder when `display` cannot fit the
//               primary-title budget (metadata.ts caps the whole title at 65 incl. the brand).
export type ProgrammeNameEntry = { display: string; credential: string; title?: string };

export const PROGRAMME_NAMES: Record<string, ProgrammeNameEntry> = {
  // Rehabilitation Sciences
  baslp: {
    display: "Bachelor in Audiology & Speech-Language Pathology (BASLP)",
    credential: "Bachelor in Audiology and Speech-Language Pathology",
    title: "BASLP – Audiology & Speech Pathology",
  },
  bpo: { display: "Bachelor in Prosthetics & Orthotics (BPO)", credential: "Bachelor in Prosthetics and Orthotics", title: "BPO – Prosthetics & Orthotics" },
  mpo: { display: "Master in Prosthetics & Orthotics (MPO)", credential: "Master in Prosthetics and Orthotics", title: "MPO – Prosthetics & Orthotics" },
  "ba-bed-special-inclusive-education": {
    display: "B.A. B.Ed. (Special & Inclusive Education)",
    credential: "B.A. B.Ed. in Special and Inclusive Education",
    title: "B.A. B.Ed. Special & Inclusive Education",
  },
  "bsc-bed-special-inclusive-education": {
    display: "B.Sc. B.Ed. (Special & Inclusive Education)",
    credential: "B.Sc. B.Ed. in Special and Inclusive Education",
    title: "B.Sc. B.Ed. Special & Inclusive Education",
  },
  "bcom-bed-special-inclusive-education": {
    display: "B.Com. B.Ed. (Special & Inclusive Education)",
    credential: "B.Com. B.Ed. in Special and Inclusive Education",
    title: "B.Com. B.Ed. Special & Inclusive Education",
  },

  // Health & Allied Health Sciences
  bpt: { display: "Bachelor of Physiotherapy (BPT)", credential: "Bachelor of Physiotherapy" },
  mpt: { display: "Master of Physiotherapy (MPT)", credential: "Master of Physiotherapy" },
  bot: { display: "Bachelor of Occupational Therapy (BOT)", credential: "Bachelor of Occupational Therapy" },
  mot: { display: "Master of Occupational Therapy (MOT)", credential: "Master of Occupational Therapy" },
  bmlt: { display: "Bachelor of Medical Laboratory Technology (BMLT)", credential: "Bachelor of Medical Laboratory Technology", title: "BMLT – Medical Lab Technology" },
  bcvt: { display: "Bachelor of Cardiovascular Technology (BCVT)", credential: "Bachelor of Cardiovascular Technology", title: "BCVT – Cardiovascular Technology" },
  "b-optometry": { display: "Bachelor of Optometry", credential: "Bachelor of Optometry" },
  "bsc-anaesthesia-ot": {
    display: "B.Sc. Anaesthesia & Operation Theatre Technology",
    credential: "B.Sc. Anaesthesia and Operation Theatre Technology",
    title: "B.Sc. Anaesthesia & OT Technology",
  },
  "bsc-forensic-science": { display: "B.Sc. Forensic Science", credential: "B.Sc. Forensic Science" },
  // Long official names that would otherwise be word-trimmed inside the 41-char title budget.
  "bachelor-nutrition-dietetics-hons": {
    display: "Bachelor of Nutrition and Dietetics (Hons)",
    credential: "Bachelor of Nutrition and Dietetics (Hons)",
    title: "Bachelor of Nutrition & Dietetics (Hons)",
  },
  bdtt: {
    display: "Bachelor of Dialysis Therapy Technology (B.DTT)",
    credential: "Bachelor of Dialysis Therapy Technology",
    title: "Dialysis Therapy Technology (B.DTT)",
  },
  "diploma-anaesthesia-operation-theatre-technology": {
    display: "Diploma in Anaesthesia and Operation Theatre Technology (D.AOTT)",
    credential: "Diploma in Anaesthesia and Operation Theatre Technology",
    title: "Diploma in Anaesthesia & OT Technology",
  },

  // Psychology
  "professional-diploma-clinical-psychology": {
    display: "Professional Diploma in Clinical Psychology (PDCP)",
    credential: "Professional Diploma in Clinical Psychology",
    title: "PDCP – Clinical Psychology Diploma",
  },
  "pg-diploma-rehabilitation-psychology": {
    display: "Post Graduate Diploma in Rehabilitation Psychology (PGDRP)",
    credential: "Post Graduate Diploma in Rehabilitation Psychology",
    title: "PGDRP – Rehabilitation Psychology",
  },
  "b-psychology-applied-behavioural": { display: "Bachelor of Psychology (B.Psychology)", credential: "Bachelor of Psychology" },
  "m-psychology-applied-behavioural": { display: "Master of Psychology (M.Psychology)", credential: "Master of Psychology" },
  bmpsw: {
    display: "Bachelor of Medical and Psychiatric Social Work (B.MPSW)",
    credential: "Bachelor of Medical and Psychiatric Social Work",
    title: "Medical & Psychiatric Social Work",
  },

  // Engineering & Emerging Technologies (CSE is understood everywhere; only the credential is expanded)
  "btech-cse": { display: "B.Tech CSE", credential: "B.Tech in Computer Science and Engineering" },
  "btech-cse-aiml": { display: "B.Tech CSE (AI & ML)", credential: "B.Tech in Computer Science and Engineering (AI & ML)" },
  "btech-cse-ai-ds": { display: "B.Tech CSE (AI & DS)", credential: "B.Tech in Computer Science and Engineering (AI & Data Science)" },
  "btech-cse-cs": { display: "B.Tech CSE (CS)", credential: "B.Tech in Computer Science and Engineering (CS)" },
  "btech-cse-fintech-ai": { display: "B.Tech CSE (Fintech & AI)", credential: "B.Tech in Computer Science and Engineering (Fintech & AI)" },
  "btech-cse-biomedical-engineering": { display: "B.Tech CSE (Biomedical Engineering)", credential: "B.Tech in Computer Science and Engineering (Biomedical Engineering)" },
  "phd-cse": { display: "Ph.D. CSE", credential: "Doctor of Philosophy in Computer Science and Engineering" },
  "btech-rehab-engineering": { display: "B.Tech Rehabilitation Engineering", credential: "B.Tech in Rehabilitation Engineering" },
  "btech-rehabilitation-engineering-prosthetics-orthotics-assistive-technologies": {
    display: "B.Tech Rehabilitation Engineering (Prosthetics, Orthotics & Assistive Technologies)",
    credential: "B.Tech in Rehabilitation Engineering (Prosthetics, Orthotics and Assistive Technologies)",
    title: "B.Tech Rehab Engineering (P&O/AT)",
  },

  // Law
  llb: { display: "Bachelor of Laws (LL.B.)", credential: "Bachelor of Laws (LL.B.)" },
  "llb-hons": { display: "LL.B. (Hons.) – Bachelor of Laws with Honours", credential: "Bachelor of Laws with Honours (LL.B. Hons.)", title: "LL.B. (Hons.) – Bachelor of Laws" },
  llm: { display: "Master of Laws (LL.M.)", credential: "Master of Laws (LL.M.)" },
};

const DEGREE_PREFIX = /^(?:B\.?\s?(?:Sc|A|Com|Tech|Ed|Psychology|B\.?A|P\.?A|Optom)|M\.?\s?(?:Sc|A|Tech|Psychology|Ed|Phil|B\.?A)|Ph\.?D|LL\.?[BM]|Bachelor|Master|Diploma|Post ?Graduate Diploma|P\.?G\.? Diploma|Professional Diploma)\b/i;

const LEVEL_CREDENTIALS: Array<[RegExp, string]> = [
  [/integrated/i, "Integrated bachelor's degree"],
  [/ph\.?d/i, "Doctor of Philosophy (Ph.D.)"],
  [/pg\s*diploma|post\s*graduate\s*diploma/i, "Postgraduate Diploma"],
  [/diploma/i, "Diploma"],
  [/\bpg\b|postgraduate/i, "Master's degree"],
  [/\bug\b|undergraduate/i, "Bachelor's degree"],
];

type NamedProgramme = { slug?: string; name?: string; level?: string };

const entryFor = (program: NamedProgramme | null | undefined) => (program?.slug ? PROGRAMME_NAMES[program.slug] : undefined);

/** Full name with abbreviation — the H1 / <title> / Course.name form. Falls back to the data name. */
export const getProgrammeDisplayName = (program: NamedProgramme | null | undefined) =>
  entryFor(program)?.display || program?.name || "";

/** The short form used in breadcrumbs, FAQ questions and running copy ("BPT"). */
export const getProgrammeShortName = (program: NamedProgramme | null | undefined) => program?.name || "";

/** ≤ 41-char form for the <title> ladder; `display` when it already fits, else the entry's `title`. */
export const getProgrammeTitleName = (program: NamedProgramme | null | undefined) => {
  const entry = entryFor(program);
  if (!entry) return program?.name || "";
  return entry.display.length <= 41 ? entry.display : entry.title || entry.display;
};

/** Credential for Course.educationalCredentialAwarded: the degree itself, never a level label. */
export const getProgrammeCredential = (program: NamedProgramme | null | undefined) => {
  const entry = entryFor(program);
  if (entry) return entry.credential;
  const name = (program?.name || "").trim();
  if (name && DEGREE_PREFIX.test(name)) return name;
  const level = program?.level || "";
  const match = LEVEL_CREDENTIALS.find(([pattern]) => pattern.test(level) || pattern.test(name));
  return match ? match[1] : level || undefined;
};
