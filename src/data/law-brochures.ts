export const LAW_BROCHURE_DIR = "src/Law_Brouchers" as const;

export const LAW_BROCHURE_FILE_MAP = {
  "llb": "SMRU LLB COURSE BROCHURE.pdf",
  "llb-hons": "SMRU LLB COURSE BROCHURE.pdf",
  "ba-llb-hons": "SMRU BA LLB Course Brochure.pdf",
  "bba-llb-hons": "BBA LLB Course Brochure.pdf",
  "bsc-llb-hons": "SMRU BSC LLB Course Brochure.pdf",
  "llm-constitutional-democracy-public-governance": "SMRU LLM Brochure.pdf",
  "llm-criminal-justice-reform-forensic-advocacy": "SMRU LLM Brochure.pdf",
  "llm-corporate-commercial-laws": "SMRU LLM Brochure.pdf",
  "llm-ip-ai-regulation-data-sovereignty": "SMRU LLM Brochure.pdf",
  "llm-adr-construction-law": "SMRU LLM Brochure.pdf",
  "phd-law": "SMRU Student Campus Brochure.pdf",
  "general": "SMRU Student Campus Brochure.pdf",
} as const;

export type LawBrochureProgram = keyof typeof LAW_BROCHURE_FILE_MAP;

export const getLawBrochureFileName = (program: string) => {
  return LAW_BROCHURE_FILE_MAP[program as LawBrochureProgram] ?? LAW_BROCHURE_FILE_MAP.general;
};

export const getLawBrochureDownloadUrl = (program: string) => {
  const fileName = getLawBrochureFileName(program);
  return `/law-brochures/${encodeURIComponent(fileName)}`;
};
