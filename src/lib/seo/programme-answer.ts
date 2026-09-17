// Answer-first paragraph for a programme page — the first thing an engine or an LLM reads, and the
// text the Course schema describes the programme with. Shared by the client view (visible copy)
// and the route (Course.description) so the two can never drift.
import { getHealthAlliedCourseSeoProfile } from "@/lib/seo/health-allied-course-seo";
import { getProgrammeDisplayName } from "@/lib/shared/programme-names";

export const formatLevel = (lvl = "") => {
  const l = lvl.toLowerCase().trim();
  if (l.includes("ug")) return "Undergraduate Program";
  if (l.includes("pg")) return "Postgraduate Program";
  if (l.includes("ph.d") || l.includes("phd")) return "Doctoral Program (Ph.D.)";
  if (l.includes("post") || l.includes("dip")) return "Postgraduate Diploma";
  return l.toUpperCase();
};


// One sentence on who you become and who you help — true of the discipline, no institutional claims.
const getProgramPurpose = (schoolName = "", programName = "") => {
  const n = `${schoolName} ${programName}`.toLowerCase();
  if (/audiolog|speech|baslp/.test(n)) return "prepares you to help people hear, speak and communicate — from newborn hearing screening to rehabilitation after stroke.";
  if (/prosthetic|orthotic|bpo|mpo/.test(n)) return "prepares you to design and fit the artificial limbs and braces that give people their mobility and independence back.";
  if (/inclusive|special/.test(n)) return "prepares you to teach and support children with disabilities so they learn alongside everyone else.";
  if (/rehabilitation/.test(n)) return "prepares you to help people regain movement, communication and independence after injury, illness or disability.";
  if (/physiotherap|bpt|mpt/.test(n)) return "prepares you to relieve pain and restore movement — the professional patients turn to after injury, surgery, stroke or on the sports field.";
  if (/occupational|bot|mot/.test(n)) return "prepares you to help people get back to the everyday activities that matter to them — work, school, self-care — after illness, injury or disability.";
  if (/nursing/.test(n)) return "prepares you for the profession at the centre of every hospital and community health team, caring for patients from the first day of clinical practice.";
  if (/psycholog/.test(n)) return "prepares you to understand the mind and help people through mental-health, developmental and neurological challenges.";
  if (/law|ll\.?b|llm/.test(n)) return "prepares you to argue, advise and shape the rules society lives by — in courtrooms, companies, government and public-interest work.";
  if (/nutrition|dietet/.test(n)) return "prepares you to use food and nutrition as medicine, from hospital wards to sports and community health.";
  if (/forensic/.test(n)) return "prepares you to turn physical evidence into answers — at the crime scene and in the laboratory.";
  if (/optometr/.test(n)) return "prepares you to protect and correct people's sight as a primary eye-care professional.";
  if (/imaging|radiolog|radiotherap|mrit|bmit|brt/.test(n)) return "prepares you to run the imaging and radiation technology that diagnoses and treats disease, working alongside radiologists and oncologists.";
  if (/dialysis|renal/.test(n)) return "prepares you to run the life-sustaining dialysis care that people with kidney failure depend on.";
  if (/respirator|pulmon/.test(n)) return "prepares you to manage breathing and ventilation for critically ill patients in ICUs and respiratory units.";
  if (/emergency|trauma|betcms/.test(n)) return "prepares you to be the calm, skilled first responder in emergencies and trauma care.";
  if (/anaesth|operation theatre|aott/.test(n)) return "prepares you to keep the operation theatre running safely, supporting surgeons and anaesthetists through every procedure.";
  if (/cardio|cardiac|bcvt/.test(n)) return "prepares you to run the tests and cath-lab procedures that diagnose and treat heart disease.";
  if (/lab|mlt|pathology/.test(n)) return "prepares you to produce the laboratory results almost every diagnosis depends on.";
  if (/physician assistant|bpa/.test(n)) return "prepares you to work alongside doctors in patient assessment, care coordination and procedures.";
  if (/health information|him\b/.test(n)) return "prepares you to manage the clinical records and health data modern hospitals run on.";
  if (/public health/.test(n)) return "prepares you to improve the health of whole communities through epidemiology, policy and programmes.";
  if (/ai|artificial|machine learning|data science|cse|computer|software|engineering|tech/.test(n)) return "prepares you to build the software and intelligent systems shaping healthcare and industry — including technology that helps people with disabilities.";
  if (/business|management|mba|commerce/.test(n)) return "prepares you to lead and manage organisations with a grounding in finance, marketing and strategy.";
  return "";
};

export const buildProgramDirectAnswer = ({
  programName,
  levelFull,
  schoolName,
  departmentName,
  duration,
  eligibility,
}: {
  programName: string;
  levelFull: string;
  schoolName?: string;
  departmentName?: string;
  duration?: string;
  eligibility?: string;
}) => {
  // Answer-first, written for the aspirant: open with who you become and who you help (true for the
  // discipline), then the facts a parent checks, then the one honest fee line. No hype, no invented figures.
  const purpose = getProgramPurpose(schoolName, programName);
  // "School of Nursing (Nursing)" reads badly — only name the department when it adds information.
  const school = schoolName || "St. Mary's University";
  const deptAdds = departmentName && !school.toLowerCase().includes(departmentName.toLowerCase().replace(/^department of /i, ""));
  const home = deptAdds ? `the ${school} (${departmentName})` : `the ${school}`;
  const level = (levelFull || "programme").replace(/\bProgram(me)?\b/i, "programme").toLowerCase();
  const article = /^[aeiou]/i.test(level) ? "an" : "a";
  const cleanDuration = duration ? duration.replace(/\s*[–-]\s*Full-Time$/i, "") : "";
  const sentences = [
    purpose ? `${programName} ${purpose}` : "",
    `It is ${article} ${level} in ${home} at St. Mary's University (SMRU), Hyderabad — a UGC-recognised private university on a residential campus at Deshmukhi, near Ramoji Film City${cleanDuration ? `, and runs for ${cleanDuration}` : ""}.`,
    eligibility ? `You can apply with ${eligibility}.` : "",
    "The current fee, intake and scholarship terms are confirmed with you at admissions counselling.",
  ].filter(Boolean);
  return sentences.join(" ");
};

const cleanDuration = (duration?: string) => (duration ? String(duration).replace(/\s*[–-]\s*Full-Time$/i, "") : "");

/**
 * The visible answer-first paragraph for a programme. Health-allied programmes carry a hand-written
 * direct answer; every other programme gets the discipline-true fallback. Both end on the facts a
 * parent checks and the one honest fee line.
 */
export const getProgrammeAnswerFirst = ({
  school,
  department,
  program,
  schoolSlug,
  departmentSlug,
  programSlug,
}: {
  school: any;
  department: any;
  program: any;
  schoolSlug: string;
  departmentSlug: string;
  programSlug: string;
}) => {
  const profile = getHealthAlliedCourseSeoProfile({ schoolSlug, departmentSlug, programSlug });
  const duration = cleanDuration(program?.duration);
  if (profile) {
    return [
      profile.directAnswer,
      duration ? `The programme runs for ${duration}.` : "",
      program?.eligibility ? `You can apply with ${program.eligibility}.` : "",
      "The current fee, intake and scholarship terms are confirmed with you at admissions counselling.",
    ]
      .filter(Boolean)
      .join(" ");
  }
  return buildProgramDirectAnswer({
    programName: getProgrammeDisplayName(program),
    levelFull: formatLevel(program?.level || ""),
    schoolName: school?.name,
    departmentName: department?.name,
    duration: program?.duration,
    eligibility: program?.eligibility,
  });
};
