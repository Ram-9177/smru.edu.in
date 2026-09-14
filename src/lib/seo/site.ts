import { UNIVERSITY_INFO } from "../shared/university";
import { SITE_SOCIAL_LINKS } from "../shared/site-constants";

export const SITE_IDENTITY = {
  id: "https://smru.edu.in/#organization",
  websiteId: "https://smru.edu.in/#website",
  siteName: UNIVERSITY_INFO.legacyBrandName,
  // Keep the official legal entity in machine-readable SEO data without
  // changing the existing visible content that still uses the public brand.
  legalName: "St. Mary's Rehabilitation University",
  publicName: UNIVERSITY_INFO.legacyBrandName,
  shortName: UNIVERSITY_INFO.shortName,
  brandName: UNIVERSITY_INFO.brandName,
  domain: "smru.edu.in",
  canonicalBaseUrl: "https://smru.edu.in",
  defaultTitle: "St.Mary's University",
  titleTemplate: "%s | St.Mary's University",
  defaultDescription:
    "Official website of St.Mary's University in Hyderabad, Telangana. Explore schools, programmes, admissions, campus information, and official disclosures.",
  defaultOpenGraphImage: UNIVERSITY_INFO.defaultOgImage,
  bridgeSentence:
    "St.Mary's University, legally established as St.Mary's University, Hyderabad, Telangana.",
  logoUrl: "https://smru.edu.in/assets/Logo.webp",
  email: UNIVERSITY_INFO.email,
  telephone: "+91-9010455591",
  locationText: `${UNIVERSITY_INFO.city}, ${UNIVERSITY_INFO.state}`,
  addressText: UNIVERSITY_INFO.address,
  alternateNames: [
    "St.Mary's University",
    "St. Mary's University",
    "Stmarys University",
    "St Marys University",
    "StMarys University",
    "stmarys university",
    "St.Mary's Rehabilitation University",
    "St.Mary's University Hyderabad",
    "Stmarys",
    "St Marys",
    "St. Mary's",
    "St.Mary's",
    "StMarys",
    "stmarys",
    "SMRU",
    "SMRU Hyderabad",
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
