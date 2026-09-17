import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import InternationalPage from "@/views/InternationalPage";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { GLOBAL_CAREER_PATHWAYS, GLOBAL_CAREER_DISCLAIMER, getGlobalCareerPathway } from "@/data/international";

export const dynamicParams = false;

export function generateStaticParams() {
  return GLOBAL_CAREER_PATHWAYS.map((d) => ({ destination: d.slug }));
}

export async function generateMetadata(props: { params: Promise<{ destination: string }> }): Promise<Metadata> {
  const params = await props.params;
  const d = getGlobalCareerPathway(params.destination);
  if (!d) return { title: "Page Not Found", robots: "noindex,follow" };
  return buildMetadata({
    title: `${d.destination} ${d.profession} Pathway | St. Mary's University`,
    description: `${d.profession} graduates from SMRU: the ${d.regulator} pathway – exam, timeline and what SMRU provides. Registration is granted by the regulator, not SMRU.`,
    pathname: `/global-careers/${d.slug}`,
  });
}

export default async function Page(props: { params: Promise<{ destination: string }> }) {
  const params = await props.params;
  const d = getGlobalCareerPathway(params.destination);
  if (!d) notFound();

  const pathname = `/global-careers/${d.slug}`;
  const faqs = [
    { question: `Who grants ${d.profession.toLowerCase()} registration in ${d.destination}?`, answer: `${d.regulator}. St. Mary's University provides the qualifying degree and pathway preparation; it does not grant the foreign registration.` },
    { question: `What exam is required?`, answer: d.exam },
    { question: `How long does the pathway take?`, answer: d.timeline },
    { question: "Does SMRU guarantee a licence or job abroad?", answer: "No. SMRU provides the Indian degree and preparation support only. Registration, visa and employment are decided by the destination country's regulator and authorities." },
  ];

  return (
    <>
      <StructuredData id={`cb-${d.slug}-breadcrumb`} data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Global Careers", path: "/global-careers" }, { name: `${d.destination} ${d.profession}`, path: pathname }])} />
      <StructuredData id={`cb-${d.slug}-webpage`} data={buildWebPageSchema({ title: `${d.destination} ${d.profession} pathway`, description: d.intro, pathname })} />
      <StructuredData id={`cb-${d.slug}-faq`} data={buildFaqSchema(faqs)} />
      <InternationalPage
        eyebrow={`Global careers · ${d.destination}`}
        title={`${d.destination} ${d.profession} Pathway`}
        intro={d.intro}
        blocks={[
          { type: "callout", tone: "notice", heading: "Important: who grants registration", text: GLOBAL_CAREER_DISCLAIMER },
          { type: "prose", heading: "The regulator", paragraphs: [`Registration to practise is granted by the ${d.regulator}.`] },
          { type: "prose", heading: "The exam / assessment", paragraphs: [d.exam] },
          { type: "prose", heading: "Realistic timeline", paragraphs: [d.timeline] },
          { type: "list", heading: "What St. Mary's University provides", items: d.smruProvides },
          { type: "list", heading: "What you must do yourself", items: d.studentMust },
          { type: "callout", tone: "info", heading: "Plan your pathway", text: "Talk to admissions about the SMRU degree that fits this pathway. Email reach@smru.edu.in or call +91-7331119432 (WhatsApp)." },
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: "/global-careers/", label: "Global career pathways" },
          { href: "/international/", label: "International admissions" },
          { href: "/programmes/", label: "All programmes (A–Z)" },
        ]}
      />
    </>
  );
}
