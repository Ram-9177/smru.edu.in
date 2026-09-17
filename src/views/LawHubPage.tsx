import StructuredData from "@/components/seo/StructuredData";
import { buildItemListSchema, toIsoDuration } from "@/lib/seo/schema";
import { getProgrammeCredential, getProgrammeDisplayName, getProgrammeShortName } from "@/lib/shared/programme-names";
import { absoluteUrl } from "@/lib/metadata";
import SchoolOfLaw from "@/views/SchoolOfLaw";
import { getSchoolSearchTerms } from "@/lib/seo/search-intent";

const lawMetaDescription =
  "Explore the School of Law at St. Mary's University, Hyderabad with integrated law programmes, LL.B., moot court, legal aid, legal research, and admissions.";
const lawPathname = "/schools/law";
const lawSearchTerms = getSchoolSearchTerms({ slug: "law", name: "School of Law" });

// Slugs match the programme routes under /schools/law/legal-studies/ so the shared name rule applies.
const lawProgrammes = [
  { slug: "ba-llb-hons", name: "B.A. LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate" },
  { slug: "bba-llb-hons", name: "B.B.A. LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate" },
  { slug: "bsc-llb-hons", name: "B.Sc. LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate Science" },
  { slug: "bsc-forensic-llb-hons", name: "B.Sc. (Forensic) LL.B. (Hons.)", level: "Integrated UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate Science" },
  { slug: "llb-hons", name: "LL.B. (Hons.)", level: "UG", duration: "3 Years", eligibility: "Bachelor's Degree with 45%" },
  { slug: "llb", name: "LL.B.", level: "UG", duration: "3 Years", eligibility: "Bachelor's Degree with 45%" },
];

const lawSchoolSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": absoluteUrl(`${lawPathname}#school-of-law`),
  name: "School of Law",
  url: absoluteUrl(lawPathname),
  description: lawMetaDescription,
  email: "reach@smru.edu.in",
  parentOrganization: { "@id": "https://smru.edu.in/#organization" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Moot court training",
    "Legal aid",
    "Legal research",
    "AI Regulation",
    "Data Sovereignty",
    "Forensic Jurisprudence",
    "Cyber Law",
    "Technology Law",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "School of Law Programmes",
    itemListElement: lawProgrammes.map((program) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Course",
        // Same full-name / credential / ISO-duration rule as the programme pages' own Course nodes.
        name: getProgrammeDisplayName(program),
        ...(getProgrammeShortName(program) !== getProgrammeDisplayName(program) ? { alternateName: getProgrammeShortName(program) } : {}),
        provider: { "@id": absoluteUrl(`${lawPathname}#school-of-law`) },
        educationalCredentialAwarded: getProgrammeCredential(program) || program.level,
        ...(toIsoDuration(program.duration) ? { timeRequired: toIsoDuration(program.duration) } : {}),
        coursePrerequisites: program.eligibility,
      },
    })),
  },
};

// Rich School of Law hub, rendered by app/schools/[schoolSlug]/page.tsx for the canonical /schools/law/ URL.
export const LAW_META_DESCRIPTION = lawMetaDescription;

export default function LawHubPage() {
  return (
    <>
      <StructuredData id="law-school-schema" data={lawSchoolSchema} />
      <StructuredData
        id="law-programmes-schema"
        data={buildItemListSchema(lawProgrammes.map((program) => ({ name: getProgrammeDisplayName(program), url: `${lawPathname}#programmes` })))}
      />
      <SchoolOfLaw />
    </>
  );
}
