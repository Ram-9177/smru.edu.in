export const lawPathname = "/law";

export const lawMetaDescription =
  "Explore the School of Law at Stmarys University, Hyderabad with LL.B., integrated LL.B. (Hons.), LL.M., Ph.D. in Law, moot court training, legal aid, legal research, and admissions guidance.";

export const lawProgrammes = [
  { slug: "llb", name: "LL.B.", level: "UG", duration: "3 Years", eligibility: "Bachelor's Degree with 45%" },
  { slug: "llb-hons", name: "LL.B. (Hons.)", level: "UG", duration: "3 Years", eligibility: "Bachelor's Degree with 45%" },
  { slug: "ba-llb-hons", name: "B.A. LL.B. / B.A. LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years Integrated", eligibility: "10+2 with 45% aggregate" },
  { slug: "bba-llb-hons", name: "B.B.A. LL.B. / B.B.A. LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years Integrated", eligibility: "10+2 with 45% aggregate" },
  { slug: "bsc-llb-hons", name: "B.Sc. LL.B. / B.Sc. LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years Integrated", eligibility: "10+2 with 45% aggregate Science" },
  { slug: "llm-constitutional-democracy-public-governance", name: "LL.M. in Constitutional Democracy & Public Governance", level: "PG", duration: "1 Year", eligibility: "LL.B. or equivalent law degree" },
  { slug: "llm-criminal-justice-reform-forensic-advocacy", name: "LL.M. in Criminal Justice Reform & Forensic Advocacy", level: "PG", duration: "1 Year", eligibility: "LL.B. or equivalent law degree" },
  { slug: "llm-corporate-commercial-laws", name: "LL.M. in Corporate & Commercial Laws", level: "PG", duration: "1 Year", eligibility: "LL.B. or equivalent law degree" },
  { slug: "llm-ip-ai-regulation-data-sovereignty", name: "LL.M. in Intellectual Property, AI Regulation & Data Sovereignty", level: "PG", duration: "1 Year", eligibility: "LL.B. or equivalent law degree" },
  { slug: "llm-adr-construction-law", name: "LL.M. in ADR & Construction Law", level: "PG", duration: "1 Year", eligibility: "LL.B. or equivalent law degree" },
  { slug: "phd-law", name: "Ph.D. in Law", level: "Ph.D.", duration: "3-6 years", eligibility: "As per university Ph.D. admission norms" },
] as const;

export const lawHighlights = [
  "Moot court training",
  "Legal aid and community justice exposure",
  "Legal research and publication support",
  "ADR, negotiation, mediation, and arbitration practice",
  "Emerging law exposure including AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and Forensic Jurisprudence",
  "Career readiness through internships, workshops, mock interviews, and professional guidance",
] as const;

export const lawFacilities = [
  {
    title: "Moot Court Hall",
    description: "Courtroom-style training space for simulated proceedings, advocacy practice, oral arguments, and moot court competitions.",
  },
  {
    title: "Digital Law Library",
    description: "Digital legal research support with legal texts, journals, case law references, and e-resources. Specific database subscriptions will be listed after official university publication.",
  },
  {
    title: "Legal Aid Cell",
    description: "Supports supervised legal literacy, rural legal aid camps, urban legal awareness, and access-to-justice initiatives.",
  },
  {
    title: "ADR & Arbitration Centre",
    description: "Training in negotiation, mediation, arbitration, drafting arbitration clauses, and dispute-resolution simulations.",
  },
  {
    title: "Research and Publication Cell",
    description: "Supports legal research, papers, seminars, conferences, publication activities, and academic writing practice.",
  },
  {
    title: "Career Guidance and Placement Cell",
    description: "Supports internships, bootcamps, resume workshops, mock interviews, and career guidance for legal career preparation.",
  },
] as const;

export const lawCareerPaths = [
  "Advocate",
  "Judicial Services",
  "Corporate Counsel / In-House Lawyer",
  "Legal Advisor / Consultant",
  "Public Prosecutor / Assistant Public Prosecutor",
  "Legal Analyst / Legal Researcher",
  "Law Firm Associate",
  "Civil Services",
  "NGO / Policy Work",
  "Legal Academia",
  "Arbitration and Mediation Specialist",
] as const;

export const lawVerificationNote =
  "Programme and recognition details should be read with official university notifications and published approval documents. Where a document is not published yet, applicants should use the official admissions/contact channels for verified guidance.";

export const findLawProgramme = (slug: string) => lawProgrammes.find((program) => program.slug === slug);
