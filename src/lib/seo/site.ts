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
  defaultTitle: "Stmarys University",
  titleTemplate: "%s | Stmarys University",
  defaultDescription:
    "Explore Stmarys University in Hyderabad, Telangana: schools, courses, admissions, campus life, and official university updates.",
  defaultOpenGraphImage: UNIVERSITY_INFO.defaultOgImage,
  bridgeSentence:
    "Stmarys University, legally established as Stmarys University, Hyderabad, Telangana.",
  logoUrl: "https://smru.edu.in/assets/Logo.png",
  email: UNIVERSITY_INFO.email,
  telephone: "+91-9493321969",
  locationText: `${UNIVERSITY_INFO.city}, ${UNIVERSITY_INFO.state}`,
  addressText: UNIVERSITY_INFO.address,
  alternateNames: [
    "Stmarys University",
    "Stmarys Rehabilitation University",
    "Stmarys University Hyderabad",
    "Stmarys Hyderabad",
    "Stmarys",
    "SMRU",
    "smru.edu.in",
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
      telephone: "+91-9493321969",
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
