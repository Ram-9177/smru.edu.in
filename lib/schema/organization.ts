const baseUrl = "https://smru.edu.in";

export const buildCollegeOrUniversitySchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${baseUrl}/#organization`,
  name: "Stmarys University",
  legalName: "Stmarys Rehabilitation University",
  alternateName: [
    "Stmarys University",
    "Stmarys Rehabilitation University",
    "Stmarys University Hyderabad",
    "Stmarys Hyderabad",
    "SMRU",
  ],
  url: baseUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "508284",
    addressCountry: "IN",
  },
});
