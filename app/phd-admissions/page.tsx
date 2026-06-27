import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import PhdAdmission from "@/views/PhdAdmission";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { PHD_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

export const metadata: Metadata = buildMetadata({
  title: "Ph.D. Admissions 2026 Status | Doctoral Research Programs | Stmarys University",
  description: "View Ph.D. admissions status, notices, fees, and doctoral research pathways at Stmarys University, including current cycle updates.",
  pathname: "/phd-admissions",
  keywords: ["Stmarys University PhD admissions", "doctoral programs Hyderabad"],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="phd-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Ph.D. Admissions", path: "/phd-admissions" },
        ])}
      />
      <StructuredData
        id="phd-page-schema"
        data={buildWebPageSchema({
          title: "Ph.D. Admissions",
          description: "Ph.D. admissions status, notices, fees, and doctoral research routes for Stmarys University, including current cycle updates.",
          pathname: "/phd-admissions",
        })}
      />
      <StructuredData id="phd-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(PHD_FAQS) : null} />
      <PhdAdmission />
    </>
  );
}
