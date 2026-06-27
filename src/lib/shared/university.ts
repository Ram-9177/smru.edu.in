import { SITE_CONTACT } from "@/lib/shared/site-constants";

const siteUrl = "https://smru.edu.in";

export const UNIVERSITY_INFO = {
  siteUrl,
  brandName: "Stmarys University",
  shortName: "Stmarys University",
  legalName: "Stmarys University",
  legacyBrandName: "Stmarys University",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  postalCode: "508284",
  locality: "Yadadri Bhuvanagiri District",
  addressLine: "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal",
  address: SITE_CONTACT.address,
  email: SITE_CONTACT.email,
  phone: SITE_CONTACT.primaryPhone,
  secondaryPhone: SITE_CONTACT.secondaryPhone,
  whatsapp: `https://wa.me/${SITE_CONTACT.whatsappNumberIntl}`,
  logoPath: "/assets/Logo.webp",
  defaultOgImage: "/assets/hero-campus.webp",
  officeHours: "Mon - Sat: 9:30 AM - 5:00 PM",
  emergencyPhone: "9493321969",
  mapEmbedUrl: "https://maps.google.com/maps?q=St.%20Mary%27s%20Rehabilitation%20University%2C%20Deshmukhi&output=embed",
} as const;

export const SEO_UPDATE_NOTE = "Verified as per Government of Telangana Act No. 10 of 2026 and UGC Recognition Letter under Section 2(f).";
export const MANUAL_VERIFICATION_LABEL = "Verified Official Document";

export { STATUS_DESCRIPTIONS } from "./official-documents";
export * from "./official-documents";
