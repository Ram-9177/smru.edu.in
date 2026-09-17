import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import InternationalPage from "@/views/InternationalPage";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { GLOBAL_CAREER_PATHWAYS, GLOBAL_CAREER_DISCLAIMER } from "@/data/international";

const TITLE = "Global Career Pathways for SMRU Graduates | St. Mary's University";
const DESCRIPTION =
  "How St. Mary's University (SMRU) graduates pursue registration abroad — UK (NMC/HCPC), Australia (AHPRA), Gulf (DHA/DoH/MOH), Canada and USA (NCLEX). Registration is granted by the foreign regulator.";
const INTRO =
  "St. Mary's University (SMRU), Hyderabad awards UGC-recognised degrees that graduates can build on toward professional registration abroad. This page explains the pathway for each destination — the regulator, the licensing exam, a realistic timeline, and what SMRU provides versus what the graduate must complete. Registration is granted by the destination country's regulator, never by SMRU.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, pathname: "/global-careers" });

const FAQS = [
  { question: "Does SMRU grant a foreign licence?", answer: "No. SMRU provides the qualifying Indian degree and pathway preparation. Registration and the licence to practise are granted by the destination country's own regulator after its exams and checks." },
  { question: "Which destinations are covered?", answer: "United Kingdom (NMC for nursing, HCPC for physiotherapy), Australia (AHPRA), the Gulf (DHA Dubai, DoH Abu Dhabi, MOH), Canada, and the United States (NCLEX-RN)." },
  { question: "Does SMRU guarantee a job or visa abroad?", answer: "No. Employment, visa and registration are decided by the destination country's authorities and regulator, not by SMRU." },
];

export default function Page() {
  return (
    <>
      <StructuredData id="gc-breadcrumb-schema" data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Global Careers", path: "/global-careers" }])} />
      <StructuredData id="gc-webpage-schema" data={buildWebPageSchema({ title: TITLE, description: DESCRIPTION, pathname: "/global-careers" })} />
      <StructuredData id="gc-itemlist-schema" data={buildItemListSchema(GLOBAL_CAREER_PATHWAYS.map((d) => ({ name: `${d.destination} — ${d.profession}`, url: `/global-careers/${d.slug}/` })))} />
      <StructuredData id="gc-faq-schema" data={buildFaqSchema(FAQS)} />
      <InternationalPage
        eyebrow="Global careers"
        title="Global Career Pathways for SMRU Graduates"
        intro={INTRO}
        blocks={[
          { type: "callout", tone: "notice", heading: "Who grants registration", text: GLOBAL_CAREER_DISCLAIMER },
          { type: "table", heading: "Pathways by destination", columns: ["Destination", "Profession", "Regulator"], rows: GLOBAL_CAREER_PATHWAYS.map((d) => [d.destination, d.profession, d.regulator]), note: "Open a pathway below for the exam, timeline and what SMRU provides." },
        ]}
        relatedLinks={GLOBAL_CAREER_PATHWAYS.map((d) => ({ href: `/global-careers/${d.slug}/`, label: `${d.destination} — ${d.profession}`, description: d.regulator }))}
      />
    </>
  );
}
