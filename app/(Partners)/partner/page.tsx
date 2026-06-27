import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Partner from "@/views/Partner";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Institutional Partners | Industry & Academic Alliances | Stmarys University",
  description: "Explore industry and academic partner routes connected with Stmarys University and career-ready learning pathways.",
  pathname: "/partner",
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="partner-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partner" },
        ])}
      />
      <StructuredData
        id="partner-page-schema"
        data={buildCollectionPageSchema({
          title: "Education Partners",
          description: "Explore public education and industry partner routes published on the Stmarys University website.",
          pathname: "/partner",
        })}
      />
      <Partner />
    </>
  );
}
