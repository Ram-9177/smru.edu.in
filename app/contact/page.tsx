import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Contact from "@/views/Contact";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildContactPageSchema, buildFaqSchema } from "@/lib/seo/schema";
import { CONTACT_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Admissions Helpdesk & Location | St. Mary's University Hyderabad",
  description: "Reach out to the St. Mary's University admissions team. Find campus location, corporate office visit address at LB Nagar, map, and contact directory.",
  pathname: "/contact",
  keywords: ["Contact St. Mary's University", "Hyderabad University Address", "Admissions Helpdesk", "St. Mary's University corporate office", "LB Nagar office"],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="contact-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <StructuredData id="contact-page-schema" data={buildContactPageSchema("/contact")} />
      <StructuredData id="contact-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(CONTACT_FAQS) : null} />
      <Contact />
    </>
  );
}
