import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import InternationalPage from "@/views/InternationalPage";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { COUNTRIES, getCountry } from "@/data/international";

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRIES.map((country) => ({ country: country.slug }));
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const country = getCountry(params.country);
  if (!country) return { title: "Page Not Found", robots: "noindex,follow" };
  return buildMetadata({
    title: `Study at SMRU from ${country.name} | St. Mary's University`,
    description: `${country.demonym} students: apply to St. Mary's University (SMRU), Hyderabad with your ${country.qualification}. Eligibility mapping, visa route, documents and fees.`.slice(0, 155),
    pathname: `/international/${country.slug}`,
  });
}

export default function Page({ params }: { params: { country: string } }) {
  const country = getCountry(params.country);
  if (!country) notFound();

  const pathname = `/international/${country.slug}`;
  const faqs = [
    { question: `Is a ${country.qualification} accepted at SMRU?`, answer: country.equivalence },
    { question: `Do ${country.demonym} students need a visa to study in India?`, answer: country.visaNote },
    { question: `How are ${country.name} certificates verified?`, answer: country.attestation },
    { question: "What are the fees for international students?", answer: "Fees are published at official admissions counselling. Request the current programme fee in INR and an indicative USD figure from international admissions before applying." },
  ];

  return (
    <>
      <StructuredData id={`intl-${country.slug}-breadcrumb`} data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "International", path: "/international" }, { name: country.name, path: pathname }])} />
      <StructuredData id={`intl-${country.slug}-webpage`} data={buildWebPageSchema({ title: `Study at SMRU from ${country.name}`, description: country.intro, pathname })} />
      <StructuredData id={`intl-${country.slug}-faq`} data={buildFaqSchema(faqs)} />
      <InternationalPage
        eyebrow={`International · ${country.name}`}
        title={`Study at St. Mary's University from ${country.name}`}
        intro={country.intro}
        blocks={[
          { type: "prose", heading: "Qualification equivalence", paragraphs: [country.equivalence] },
          { type: "prose", heading: "Visa and entry", paragraphs: [country.visaNote, "After arrival, register with the FRRO/e-FRRO within the required period (commonly 14 days)."] },
          { type: "prose", heading: "Document verification and attestation", paragraphs: [country.attestation] },
          { type: "list", heading: "How to apply", items: ["Choose a programme and confirm the eligibility mapping above", `Submit the application with your ${country.qualification}, transcripts and passport`, "Receive the admission / eligibility letter", "Apply for an Indian student visa where required", "Confirm fees and your seat, then travel to Hyderabad"] },
          { type: "prose", heading: "Fees", paragraphs: [`Fees are quoted at official admissions counselling; request the programme fee in INR and an indicative USD figure (payable from ${country.currency} accounts) from international admissions.`] },
          { type: "callout", tone: "info", heading: "International admissions", text: "Email reach@smru.edu.in or call +91-7331119432 (WhatsApp) for country-specific guidance and current fees." },
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: "/international/", label: "International admissions hub" },
          { href: "/international/nri-admissions/", label: "NRI / OCI / PIO admissions" },
          { href: "/programmes/", label: "All programmes (A–Z)" },
        ]}
      />
    </>
  );
}
