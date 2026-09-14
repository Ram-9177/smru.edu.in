import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import InternationalPage from "@/views/InternationalPage";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildInternationalContactPointSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { COUNTRIES } from "@/data/international";

const TITLE = "International Admissions | St. Mary's University";
const DESCRIPTION =
  "International students can apply to St. Mary's University (SMRU), Hyderabad — qualification equivalence, English requirement, fees, student-visa route, documents and arrival support across six schools.";
const INTRO =
  "St. Mary's University (SMRU), Hyderabad welcomes international students to its 71 programmes across six schools. This page explains who can apply, how your qualification maps to the Indian 10+2, the English requirement, fees in INR with an indicative USD guide, the Indian student-visa and e-FRRO route, the documents you need, and arrival support at the Deshmukhi campus near Ramoji Film City.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, pathname: "/international" });

const FAQS = [
  { question: "Who can apply to SMRU as an international student?", answer: "Anyone with a 12th-grade / higher-secondary qualification accepted as equivalent to the Indian 10+2, meeting the subject requirements of the chosen programme. Postgraduate applicants need a recognised relevant bachelor's degree." },
  { question: "What English-language level is required?", answer: "Programmes are taught in English. Applicants from non-English-medium backgrounds should be ready to demonstrate English proficiency; confirm the current requirement with international admissions." },
  { question: "How much are the fees for international students?", answer: "Fees are published at official admissions counselling. Ask international admissions for the current programme fee in INR and an indicative USD figure before applying." },
  { question: "What visa do I need to study at SMRU?", answer: "Most international students need an Indian student visa, applied for at the Indian mission after receiving the university's admission/eligibility documents. On arrival, register with the FRRO/e-FRRO within the required period (commonly 14 days)." },
  { question: "Does SMRU help with arrival and accommodation?", answer: "Hostel accommodation is available on campus; contact international admissions about airport pickup, hostel allocation and arrival support." },
];

export default function Page() {
  return (
    <>
      <StructuredData id="international-breadcrumb" data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "International", path: "/international" }])} />
      <StructuredData id="international-webpage" data={buildWebPageSchema({ title: TITLE, description: DESCRIPTION, pathname: "/international" })} />
      <StructuredData id="international-contact" data={buildInternationalContactPointSchema("/international")} />
      <StructuredData id="international-faq" data={buildFaqSchema(FAQS)} />
      <InternationalPage
        eyebrow="International admissions"
        title="International Admissions at SMRU"
        intro={INTRO}
        blocks={[
          { type: "list", heading: "Who can apply", items: ["School-leavers with a 12th-grade qualification accepted as equivalent to the Indian 10+2 (subject to programme subject requirements)", "Graduates with a recognised relevant bachelor's degree, for postgraduate programmes", "NRI, OCI and PIO applicants — see the NRI admissions page"] },
          { type: "prose", heading: "Qualification equivalence", paragraphs: ["Your national 12th-grade / higher-secondary qualification is mapped to the Indian 10+2 for admission. An Association of Indian Universities (AIU) equivalence certificate may be requested. Choose your country below for the specific mapping."] },
          { type: "prose", heading: "English requirement", paragraphs: ["All programmes are taught in English. Applicants from non-English-medium backgrounds should be prepared to demonstrate English proficiency; confirm the current requirement with international admissions."] },
          { type: "prose", heading: "Fees (INR and indicative USD)", paragraphs: ["Programme fees are published at official admissions counselling. Request the current fee in INR and an indicative USD figure from international admissions before applying. SMRU does not publish placeholder fees."] },
          { type: "list", heading: "Application steps", items: ["Choose a programme and confirm eligibility mapping for your country", "Submit the application with academic documents and passport", "Receive the admission / eligibility letter from the university", "Apply for an Indian student visa at the Indian mission", "Pay fees as advised and confirm your seat", "Travel to Hyderabad and complete FRRO/e-FRRO registration"] },
          { type: "list", heading: "Documents", items: ["Passport (valid)", "Academic transcripts and certificates (attested / verifiable as required)", "AIU equivalence certificate where requested", "Passport photographs", "Medical fitness documents as advised", "Police clearance where required by the visa process"] },
          { type: "prose", heading: "Visa and e-FRRO", paragraphs: ["Most international students need an Indian student visa. After arrival, register with the FRRO/e-FRRO within the required period (commonly 14 days). Nepali nationals study under the India–Nepal treaty without a visa but should carry valid documents."] },
          { type: "callout", tone: "info", heading: "International admissions contact", text: "Email reach@smru.edu.in or call +91-7331119432 (WhatsApp available) for country-specific guidance, current fees and arrival support." },
        ]}
        faqs={FAQS}
        relatedLinks={[
          { href: "/international/nri-admissions/", label: "NRI / OCI / PIO admissions", description: "Route for Indian-origin applicants abroad" },
          { href: "/programmes/", label: "All programmes (A–Z)", description: "Every course with level and duration" },
          { href: "/global-careers/", label: "Global career pathways", description: "UK, Australia, Gulf, Canada, USA licensing routes" },
          ...COUNTRIES.map((c) => ({ href: `/international/${c.slug}/`, label: `From ${c.name}`, description: c.qualification })),
        ]}
      />
    </>
  );
}
