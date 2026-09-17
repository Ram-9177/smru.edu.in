import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import InternationalPage from "@/views/InternationalPage";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";

const TITLE = "NRI / OCI / PIO Admissions | St. Mary's University";
const DESCRIPTION =
  "NRI, OCI and PIO applicants can apply to St. Mary's University (SMRU), Hyderabad — eligibility, documents, fee route and how the NRI category differs from the regular route.";
const INTRO =
  "Indian-origin applicants living abroad — NRI (Non-Resident Indian), OCI (Overseas Citizen of India) and PIO (Person of Indian Origin) — can apply to St. Mary's University (SMRU), Hyderabad. This page explains who qualifies for the NRI route, the documents required, how fees are quoted, and how this differs from the regular domestic and foreign-national routes across SMRU's six schools.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, pathname: "/international/nri-admissions" });

const FAQS = [
  { question: "Who qualifies for the NRI route at SMRU?", answer: "Non-Resident Indians and, where applicable, their dependents, plus OCI/PIO applicants. Confirm the exact eligibility for your situation with international admissions before applying." },
  { question: "What documents do NRI/OCI/PIO applicants need?", answer: "Passport (and OCI/PIO card where applicable), academic transcripts and certificates, NRI-status/relationship evidence where required, and the standard programme documents. An AIU equivalence certificate may be requested for foreign qualifications." },
  { question: "Are NRI fees different from the regular fees?", answer: "Where an NRI fee category applies, it is quoted at official admissions counselling. SMRU does not publish placeholder NRI fee figures; request the current figure in INR/USD from international admissions." },
];

export default function Page() {
  return (
    <>
      <StructuredData id="nri-breadcrumb-schema" data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "International", path: "/international" }, { name: "NRI Admissions", path: "/international/nri-admissions" }])} />
      <StructuredData id="nri-webpage-schema" data={buildWebPageSchema({ title: TITLE, description: DESCRIPTION, pathname: "/international/nri-admissions" })} />
      <StructuredData id="nri-faq-schema" data={buildFaqSchema(FAQS)} />
      <InternationalPage
        eyebrow="International · NRI / OCI / PIO"
        title="NRI, OCI & PIO Admissions"
        intro={INTRO}
        blocks={[
          { type: "list", heading: "Who can apply under the NRI route", items: ["Non-Resident Indians (NRIs) and eligible dependents", "Overseas Citizens of India (OCI)", "Persons of Indian Origin (PIO)"] },
          { type: "list", heading: "Documents", items: ["Passport, and OCI/PIO card where applicable", "Academic transcripts and certificates (attested / verifiable as required)", "AIU equivalence certificate for foreign qualifications, where requested", "Evidence of NRI status / sponsor relationship where required", "Passport photographs and the standard programme documents"] },
          { type: "prose", heading: "How the NRI route differs", paragraphs: ["The NRI category, where it applies, has its own document and (where applicable) fee treatment distinct from the regular domestic route and from the foreign-national route. Foreign nationals (non-Indian passport holders) should use the country pages and apply on a student visa instead."] },
          { type: "prose", heading: "Fees", paragraphs: ["Any applicable NRI fee is quoted at official admissions counselling. Request the current figure in INR and an indicative USD guide from international admissions."] },
          { type: "callout", tone: "info", heading: "International admissions", text: "Email reach@smru.edu.in or call +91-7331119432 (WhatsApp) to confirm your eligibility and the current NRI route." },
        ]}
        faqs={FAQS}
        relatedLinks={[
          { href: "/international/", label: "International admissions hub" },
          { href: "/admissions/", label: "Admissions" },
          { href: "/programmes/", label: "All programmes (A–Z)" },
        ]}
      />
    </>
  );
}
