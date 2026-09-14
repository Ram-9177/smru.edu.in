import { UNIVERSITY_INFO } from "../shared/university";
import { SITE_SOCIAL_LINKS } from "../shared/site-constants";

export const SITE_IDENTITY = {
  id: "https://smru.edu.in/#organization",
  websiteId: "https://smru.edu.in/#website",
  siteName: UNIVERSITY_INFO.legacyBrandName,
  legalName: UNIVERSITY_INFO.legalName,
  publicName: UNIVERSITY_INFO.legacyBrandName,
  shortName: UNIVERSITY_INFO.shortName,
  brandName: UNIVERSITY_INFO.brandName,
  domain: "smru.edu.in",
  canonicalBaseUrl: "https://smru.edu.in",
  defaultTitle: "St. Mary's University Hyderabad (SMRU) – Official Site",
  titleTemplate: "%s | St. Mary's University",
  defaultDescription:
    "St. Mary's University (SMRU), legally St. Mary's Rehabilitation University, is a UGC-recognised private university in Hyderabad offering 90+ programmes.",
  defaultOpenGraphImage: UNIVERSITY_INFO.defaultOgImage,
  // Canonical bridge sentence — used verbatim on the homepage, /about/, /smru/, llms.txt and the Organization schema.
  bridgeSentence:
    "St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.",
  foundingDate: "2025-07-24",
  parentOrganizationName: "Joseph Sriharsha & Mary Indraja Educational Society",
  geo: { latitude: "17.3484", longitude: "78.6824" },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=St.+Mary's+Rehabilitation+University+Deshmukhi",
  logoUrl: "https://smru.edu.in/assets/Logo.webp",
  email: UNIVERSITY_INFO.email,
  telephone: "+91-9010455591",
  locationText: `${UNIVERSITY_INFO.city}, ${UNIVERSITY_INFO.state}`,
  addressText: UNIVERSITY_INFO.address,
  // Schema-only aliases (naming standard §4). The site's former no-space spelling is kept as an
  // alias so engines can reconcile old citations; misspelling-style aliases are deliberately not listed.
  alternateNames: [
    "SMRU",
    "SMRU Hyderabad",
    "St. Mary's Rehabilitation University",
    "St.Mary's University",
    "St Marys University Hyderabad",
  ],
  address: {
    streetAddress: UNIVERSITY_INFO.addressLine,
    addressLocality: UNIVERSITY_INFO.city,
    addressRegion: UNIVERSITY_INFO.state,
    postalCode: UNIVERSITY_INFO.postalCode,
    addressCountry: "IN",
  },
  contactPoints: [
    {
      telephone: "+91-9010455591",
      contactType: "Admissions",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
  ],
  socialLinks: [
    SITE_SOCIAL_LINKS.facebook,
    SITE_SOCIAL_LINKS.instagram,
    SITE_SOCIAL_LINKS.linkedin,
    SITE_SOCIAL_LINKS.youtube,
  ].filter(Boolean),
};
