// The training partners, their logos and landing pages, and which of them a programme belongs to. Kept apart from
// schools.ts so a page that shows partners does not download the course catalogue.
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
import niatLogo from "../assets/partner-logos/12_niat.webp";
import skilgenLogo from "../assets/partner-logos/13_skilgen.webp";
import carebridgeLogo from "../assets/partner-logos/14_carebridge.webp";
import smruLogo from "../assets/Logo.webp";

export const EDU_PARTNERS = {
  CAREBRIDGE: {
    code: "CAREBRIDGE",
    name: "Carebridge",
    landingUrl: "/carebridge",
    logo: carebridgeLogo,
    iframeUrl: "/partners/carebridge/index.html",
    embedCode: ""
  },
  "St. Mary's University": {
    code: "St. Mary's University",
    name: "St. Mary's University",
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
  SKILGEN: {
    code: "SKILGEN",
    name: "Skilgen Tech",
    landingUrl: "/skilgen",
    logo: skilgenLogo,
    iframeUrl: "https://skilgentech.com",
    embedCode: ""
  },
  IIAT: {
    code: "IIAT",
    name: "Indian Institute of Advanced Technology",
    landingUrl: null,
  },
  QTST: {
    code: "QTST",
    name: "Quality Thought",
    landingUrl: "/qtst",
    logo: qtstLogo,
    embedCode: ""
  },
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
    landingUrl: "https://smrunextgenstageprod.ctpl.io/",
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
    .filter(Boolean)
    .filter((partner) => Boolean(partner.landingUrl));

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
