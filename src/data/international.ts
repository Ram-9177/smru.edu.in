// International admissions + global-careers content.
//
// Country pages describe real, public processes: qualification equivalence to the Indian 10+2,
// the Indian student-visa route, and attestation steps. They never assert SMRU-specific fees,
// intake or scholarship figures — those carry the @@NEEDS_UNIVERSITY_INPUT@@ marker.
//
// Carebridge destination pages describe the foreign licensing pathway and carry the mandatory
// disclaimer that registration is granted by the foreign regulator, never by SMRU.

export type CountryInfo = {
  slug: string;
  name: string;
  demonym: string;
  code: string; // ISO 3166-1 alpha-2
  qualification: string; // the local 10+2-equivalent qualification
  equivalence: string; // how it maps to the Indian 10+2 for admission
  currency: string; // local currency name (for the fee note)
  attestation: string; // document attestation / verification route
  visaNote: string; // any country-specific visa nuance (else the standard route applies)
  intro: string; // answer-first paragraph (>= 40 words)
};

const STANDARD_ATTESTATION =
  "Academic transcripts and certificates should be verified through the issuing board and, where required, attested for use in India (embassy / MEA route). The Association of Indian Universities (AIU) equivalence certificate may be requested for admission.";

export const COUNTRIES: CountryInfo[] = [
  {
    slug: "nepal",
    name: "Nepal",
    demonym: "Nepali",
    code: "NP",
    qualification: "+2 / Higher Secondary (NEB) or A-Levels",
    equivalence: "Nepal's +2 / Higher Secondary Education Board (NEB) qualification is accepted as equivalent to the Indian 10+2 for undergraduate admission, subject to the subject requirements of the chosen programme.",
    currency: "Nepali Rupees",
    attestation: STANDARD_ATTESTATION,
    visaNote:
      "Nepali nationals do not require a visa to study in India under the India–Nepal Treaty of Peace and Friendship, but should carry valid identity and academic documents.",
    intro:
      "Nepali students can apply to St. Mary's University (SMRU) in Hyderabad with their +2 / Higher Secondary (NEB) qualification, which is accepted as equivalent to the Indian 10+2. This page explains eligibility mapping, documents, the fee route and arrival for applicants from Nepal to SMRU's Deshmukhi campus.",
  },
  {
    slug: "bangladesh",
    name: "Bangladesh",
    demonym: "Bangladeshi",
    code: "BD",
    qualification: "Higher Secondary Certificate (HSC)",
    equivalence: "The Bangladeshi Higher Secondary Certificate (HSC) is accepted as equivalent to the Indian 10+2 for undergraduate admission, subject to programme subject requirements.",
    currency: "Bangladeshi Taka",
    attestation: STANDARD_ATTESTATION,
    visaNote:
      "Bangladeshi nationals require an Indian student visa; the university issues the admission/eligibility documents needed for the application.",
    intro:
      "Bangladeshi students can apply to St. Mary's University (SMRU), Hyderabad with the Higher Secondary Certificate (HSC), accepted as equivalent to the Indian 10+2. This page covers eligibility mapping, the student-visa route, documents and arrival for applicants from Bangladesh to SMRU.",
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    demonym: "Sri Lankan",
    code: "LK",
    qualification: "G.C.E. Advanced Level (A/L)",
    equivalence: "The Sri Lankan G.C.E. Advanced Level (A/L) is accepted as equivalent to the Indian 10+2 for undergraduate admission, subject to programme subject requirements.",
    currency: "Sri Lankan Rupees",
    attestation: STANDARD_ATTESTATION,
    visaNote: "Sri Lankan nationals require an Indian student visa; the university issues the admission/eligibility documents for the application.",
    intro:
      "Sri Lankan students can apply to St. Mary's University (SMRU), Hyderabad with the G.C.E. Advanced Level (A/L), accepted as equivalent to the Indian 10+2. This page explains eligibility mapping, the student-visa route, documents and arrival for applicants from Sri Lanka to SMRU.",
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    demonym: "Bhutanese",
    code: "BT",
    qualification: "Bhutan Higher Secondary Education Certificate (BHSEC)",
    equivalence: "The Bhutan Higher Secondary Education Certificate (BHSEC) is accepted as equivalent to the Indian 10+2 for undergraduate admission, subject to programme subject requirements.",
    currency: "Bhutanese Ngultrum",
    attestation: STANDARD_ATTESTATION,
    visaNote: "Bhutanese nationals should confirm the current entry/stay requirements for study in India; the university issues the admission/eligibility documents.",
    intro:
      "Bhutanese students can apply to St. Mary's University (SMRU), Hyderabad with the Bhutan Higher Secondary Education Certificate (BHSEC), accepted as equivalent to the Indian 10+2. This page covers eligibility mapping, documents, the fee route and arrival for applicants from Bhutan to SMRU.",
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    demonym: "Nigerian",
    code: "NG",
    qualification: "WASSCE / SSCE (West African Senior School Certificate)",
    equivalence: "The Nigerian WASSCE / SSCE is accepted as equivalent to the Indian 10+2 for undergraduate admission, subject to programme subject requirements and required credit passes.",
    currency: "Nigerian Naira",
    attestation:
      "WAEC results should be verifiable online (WAEC scratch-card / verification), and certificates attested as required for use in India. An AIU equivalence certificate may be requested.",
    visaNote: "Nigerian nationals require an Indian student visa; the university issues the admission/eligibility documents, and applicants should budget for medical and police-clearance documentation.",
    intro:
      "Nigerian students can apply to St. Mary's University (SMRU), Hyderabad with the WASSCE / SSCE, accepted as equivalent to the Indian 10+2. This page explains eligibility mapping, WAEC verification, the student-visa route, documents and arrival for applicants from Nigeria to SMRU.",
  },
  {
    slug: "kenya",
    name: "Kenya",
    demonym: "Kenyan",
    code: "KE",
    qualification: "Kenya Certificate of Secondary Education (KCSE)",
    equivalence: "The Kenya Certificate of Secondary Education (KCSE) is accepted as equivalent to the Indian 10+2 for undergraduate admission, subject to programme subject requirements and required grades.",
    currency: "Kenyan Shillings",
    attestation:
      "KNEC results should be verifiable and certificates attested as required for use in India. An AIU equivalence certificate may be requested.",
    visaNote: "Kenyan nationals require an Indian student visa; the university issues the admission/eligibility documents.",
    intro:
      "Kenyan students can apply to St. Mary's University (SMRU), Hyderabad with the KCSE, accepted as equivalent to the Indian 10+2. This page covers eligibility mapping, the student-visa route, documents and arrival for applicants from Kenya to SMRU.",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    demonym: "UAE-based",
    code: "AE",
    qualification: "UAE / international 12th-grade certificate (CBSE, British, American or MoE curriculum)",
    equivalence: "A 12th-grade certificate completed in the UAE (CBSE, British A-Levels, American High School Diploma or UAE MoE curriculum) is accepted as equivalent to the Indian 10+2, subject to programme subject requirements.",
    currency: "UAE Dirhams",
    attestation:
      "Certificates issued in the UAE should be attested (UAE Ministry of Education / MoFA and the Indian mission) as required, and an AIU equivalence certificate may be requested for non-Indian boards.",
    visaNote: "Applicants holding foreign nationality require an Indian student visa; Indian-passport holders resident in the UAE apply as NRIs (see the NRI admissions page).",
    intro:
      "Students completing 12th grade in the UAE — CBSE, British, American or MoE curriculum — can apply to St. Mary's University (SMRU), Hyderabad, with their certificate accepted as equivalent to the Indian 10+2. This page covers eligibility mapping, attestation, NRI vs foreign-national routes, and arrival to SMRU.",
  },
  {
    slug: "oman",
    name: "Oman",
    demonym: "Oman-based",
    code: "OM",
    qualification: "Oman General Education Diploma or international 12th-grade certificate",
    equivalence: "The Oman General Education Diploma (or a CBSE/British/American 12th-grade certificate completed in Oman) is accepted as equivalent to the Indian 10+2, subject to programme subject requirements.",
    currency: "Omani Rials",
    attestation:
      "Certificates issued in Oman should be attested as required, and an AIU equivalence certificate may be requested for non-Indian boards.",
    visaNote: "Applicants holding foreign nationality require an Indian student visa; Indian-passport holders resident in Oman apply as NRIs (see the NRI admissions page).",
    intro:
      "Students completing 12th grade in Oman can apply to St. Mary's University (SMRU), Hyderabad, with their certificate accepted as equivalent to the Indian 10+2. This page covers eligibility mapping, attestation, NRI vs foreign-national routes, and arrival to SMRU.",
  },
];

export const getCountry = (slug: string) => COUNTRIES.find((country) => country.slug === slug);

export type CarebridgeDestination = {
  slug: string;
  destination: string;
  profession: string;
  regulator: string; // the foreign body that grants registration
  exam: string; // the licensing exam(s)
  timeline: string; // realistic, generic timeline
  smruProvides: string[]; // what SMRU actually provides (education + support)
  studentMust: string[]; // what the student must do themselves
  intro: string;
};

// The disclaimer is mandatory on every Carebridge destination page.
export const CAREBRIDGE_DISCLAIMER =
  "Registration and the licence to practise are granted by the destination country's own regulator after its own exams, checks and requirements — never by St. Mary's University. SMRU provides the qualifying Indian degree and pathway preparation; it does not guarantee a foreign licence, visa or job. Requirements change; always confirm current rules with the named regulator before relying on this page.";

export const CAREBRIDGE_DESTINATIONS: CarebridgeDestination[] = [
  {
    slug: "uk-nursing",
    destination: "United Kingdom",
    profession: "Nursing",
    regulator: "Nursing and Midwifery Council (NMC), UK",
    exam: "NMC registration: computer-based test (CBT) + OSCE, with an approved English test (IELTS/OET)",
    timeline: "Typically 12–24 months after graduation, depending on English test, CBT/OSCE scheduling and NMC application processing.",
    smruProvides: ["A UGC-recognised B.Sc / M.Sc Nursing degree", "English-language (IELTS/OET) preparation support", "Guidance on the NMC application and document set"],
    studentMust: ["Pass an approved English test", "Pass the NMC CBT and OSCE", "Complete NMC registration and secure a UK work visa/sponsorship independently"],
    intro:
      "Indian nursing graduates can pursue UK registration through the Nursing and Midwifery Council (NMC). This page explains the NMC pathway — English test, CBT and OSCE — what St. Mary's University (SMRU) provides and what the graduate must complete themselves. Registration is granted by the NMC, not by SMRU.",
  },
  {
    slug: "uk-physiotherapy-hcpc",
    destination: "United Kingdom",
    profession: "Physiotherapy",
    regulator: "Health and Care Professions Council (HCPC), UK",
    exam: "HCPC international registration assessment of qualifications (no single national exam; assessment against UK standards), with an approved English test",
    timeline: "Typically 6–18 months for HCPC assessment, depending on documentation and any required additional evidence.",
    smruProvides: ["A UGC-recognised BPT / MPT degree with clinical training", "English-language preparation support", "Guidance on assembling the HCPC evidence portfolio"],
    studentMust: ["Pass an approved English test", "Submit and pass the HCPC international application/assessment", "Secure a UK work visa/sponsorship independently"],
    intro:
      "Indian physiotherapy graduates can seek UK registration through the Health and Care Professions Council (HCPC). This page explains the HCPC assessment route, English requirements, what St. Mary's University (SMRU) provides and what the graduate must do. Registration is granted by the HCPC, not by SMRU.",
  },
  {
    slug: "australia-ahpra",
    destination: "Australia",
    profession: "Nursing & allied health",
    regulator: "Australian Health Practitioner Regulation Agency (AHPRA) and the relevant national board",
    exam: "AHPRA registration via the relevant board's assessment (e.g. NMBA outcomes-based assessment for nurses), with an approved English test",
    timeline: "Typically 12–24 months, depending on the assessment pathway, English test and AHPRA processing.",
    smruProvides: ["A UGC-recognised degree in the relevant discipline", "English-language (IELTS/OET) preparation support", "Guidance on the AHPRA application"],
    studentMust: ["Pass an approved English test", "Complete the relevant AHPRA/board assessment", "Secure an Australian visa/sponsorship independently"],
    intro:
      "Indian nursing and allied-health graduates can pursue Australian registration through AHPRA and the relevant national board. This page explains the assessment pathway, English requirements, what St. Mary's University (SMRU) provides and what the graduate must do. Registration is granted by AHPRA, not by SMRU.",
  },
  {
    slug: "gulf-dha-haad",
    destination: "Gulf / Middle East",
    profession: "Healthcare (nursing & allied health)",
    regulator: "Dubai (DHA), Abu Dhabi (DoH, formerly HAAD), and the Ministry of Health (MOH) for other emirates/countries",
    exam: "Prometric / regulator licensing examination for the profession, plus dataflow primary-source verification",
    timeline: "Typically 3–9 months after graduation and required experience, depending on the exam and dataflow verification.",
    smruProvides: ["A UGC-recognised degree in the relevant discipline", "Guidance on dataflow document verification", "Exam-preparation direction"],
    studentMust: ["Complete any required post-qualification experience", "Pass the relevant Prometric/regulator exam", "Complete dataflow verification and secure employment/visa independently"],
    intro:
      "Indian healthcare graduates can seek Gulf licensure through DHA (Dubai), DoH (Abu Dhabi) or MOH. This page explains the Prometric exam and dataflow verification, what St. Mary's University (SMRU) provides and what the graduate must do. Licensure is granted by the Gulf regulator, not by SMRU.",
  },
  {
    slug: "canada",
    destination: "Canada",
    profession: "Nursing & allied health",
    regulator: "The relevant provincial regulatory college (e.g. provincial nursing colleges via NNAS)",
    exam: "Credential assessment (e.g. NNAS for nurses) and the applicable provincial/national exam (e.g. NCLEX-RN for registered nurses), with an approved English/French test",
    timeline: "Typically 18–36 months, depending on credential assessment, exams, and provincial requirements.",
    smruProvides: ["A UGC-recognised degree in the relevant discipline", "English-language preparation support", "Guidance on the credential-assessment document set"],
    studentMust: ["Complete credential assessment (e.g. NNAS)", "Pass the applicable exam and meet provincial requirements", "Secure Canadian immigration/work authorisation independently"],
    intro:
      "Indian graduates can pursue Canadian registration through the relevant provincial regulatory college, usually after a credential assessment and the applicable exam. This page explains the pathway, what St. Mary's University (SMRU) provides and what the graduate must do. Registration is granted by the Canadian regulator, not by SMRU.",
  },
  {
    slug: "usa-nclex",
    destination: "United States",
    profession: "Nursing",
    regulator: "The relevant US State Board of Nursing (via NCSBN)",
    exam: "NCLEX-RN, plus credentials evaluation (e.g. CGFNS) and an approved English test",
    timeline: "Typically 12–30 months, depending on the state board, credentials evaluation, NCLEX scheduling and visa processing.",
    smruProvides: ["A UGC-recognised B.Sc / M.Sc Nursing degree", "English-language preparation support", "Guidance on CGFNS/credentials evaluation and the NCLEX application"],
    studentMust: ["Complete credentials evaluation (e.g. CGFNS)", "Pass an approved English test and the NCLEX-RN", "Obtain state-board licensure and US immigration authorisation independently"],
    intro:
      "Indian nursing graduates can pursue US licensure by passing the NCLEX-RN and meeting a State Board of Nursing's requirements. This page explains the NCLEX pathway, credentials evaluation, what St. Mary's University (SMRU) provides and what the graduate must do. Licensure is granted by the US state board, not by SMRU.",
  },
];

export const getCarebridgeDestination = (slug: string) => CAREBRIDGE_DESTINATIONS.find((d) => d.slug === slug);
