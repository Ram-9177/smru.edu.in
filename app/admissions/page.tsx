import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Admissions from "@/views/Admissions";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { ADMISSIONS_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

export const metadata: Metadata = buildMetadata({
  title: "Admissions Open 2026 | Stmarys University",
  description: "Explore 2026 admissions at Stmarys University. Compare programmes, eligibility, scholarships, counselling support, and doctoral status before applying.",
  pathname: "/admissions",
  keywords: [
    "Direct Admission 2026",
    "University Application Hyderabad",
    "Stmarys University Admissions",
    "Eligibility",
    "Fees",
    "Scholarships",
    "university admissions open 2026",
    "college admissions Hyderabad 2026",
    "UG admission 2026 Telangana",
    "PG admission 2026 Hyderabad",
    "courses after 12th in Hyderabad",
    "university entrance exam 2026",
  ],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="admissions-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Admissions", path: "/admissions" },
        ])}
      />
      <StructuredData
        id="admissions-page-schema"
        data={buildWebPageSchema({
          title: "Admissions",
          description: "Admissions for UG, PG, diploma, and doctoral pathways at Stmarys University.",
          pathname: "/admissions",
        })}
      />
      <StructuredData
        id="admissions-faq-schema"
        data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(ADMISSIONS_FAQS) : null}
      />
      <Admissions />
    </>
  );
}
