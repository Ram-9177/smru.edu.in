export const SITE_CONTACT = {
  whatsappNumberIntl: "919493321969",
  primaryPhone: "08065459645",
  secondaryPhone: "9493321969",
  email: "reach@smru.edu.in",
  address:
    "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.",
} as const;

export const ADMISSIONS_CONTENT_LAST_UPDATED = "15 May 2026";

export const PHD_ADMISSIONS_STATUS_MESSAGE =
  "Ph.D. Admissions 2026–27: Applications closed. Next-cycle updates will be announced through official university notices.";

export const PHD_APPLY_URL = "https://apply.smru.edu.in/Smru/phd/";

export const SITE_CTA_LINKS = {
  apply: "https://apply.smru.edu.in",
  phdApply: PHD_APPLY_URL,
  brochure: "/brochure",
  whatsapp: `https://wa.me/${SITE_CONTACT.whatsappNumberIntl}`,
  ctplApplyRedirect: "https://apply.smru.edu.in/",
} as const;

export const MERITTO_WIDGET = {
  scriptSrc: "https://widgets.in4.nopaperforms.com/emwgts.js",
  widgetKey: "1724ed5dcfaa2cb0aabd46c4d9c7d8df",
  height: "400px",
} as const;

const MERITTO_LANDING_PREFIXES = ["/landing/", "/partner/"] as const;
const MERITTO_LANDING_PATHS = [
  "/bb",
  "/blackbucks",
  "/bytexl",
  "/edinbox",
  "/edridge",
  "/emversity",
  "/iiat",
  "/ist",
  "/mjiollnir",
  "/niat",
  "/niat-upskilling",
  "/nst",
  "/onnbikes",
  "/qtst",
  "/qtst-Stmarys",
  "/university",
  "/veloces",
] as const;

export const isMerittoLandingPath = (pathname = "") => {
  const path = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  return MERITTO_LANDING_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || (MERITTO_LANDING_PATHS as readonly string[]).includes(path);
};

export const resolveApplyLink = ({
  pathname = "",
  target = "auto",
}: {
  pathname?: string;
  target?: string;
}) => {
  if (target === "phd") return SITE_CTA_LINKS.phdApply;
  if (target === "general") return SITE_CTA_LINKS.apply;
  return pathname.startsWith("/phd-admissions") ? SITE_CTA_LINKS.phdApply : SITE_CTA_LINKS.apply;
};

export const SITE_SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/SMRUniversity",
  instagram: "https://www.instagram.com/smruhyderabad",
  linkedin: "https://www.linkedin.com/company/smruhyderabad/",
  youtube: "https://www.youtube.com/@SMRUniversity",
} as const;

export const PARTNER_HIDDEN_STICKY_ROUTES = [] as const;

export const STICKY_CTA_HIDDEN_ROUTES = [
  "/partner",
  "/bb",
  "/iiat",
  "/niat",
  "/qtst",
  "/niat-upskilling",
  "/campus-guide"
] as const;
