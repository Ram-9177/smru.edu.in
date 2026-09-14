import type { Metadata } from "next";
import CarebridgeLanding from "@/views/CarebridgeLanding";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Carebridge Global Healthcare Pathways | St.Mary's University",
  description:
    "Explore Carebridge healthcare degree programs, international licensing pathways, clinical rotations from Year 1, and career opportunities at St.Mary's University.",
  pathname: "/carebridge",
  keywords: [
    "Carebridge",
    "Carebridge Education",
    "Carebridge St. Mary's University",
    "Carebridge Hyderabad",
    "Global Healthcare Pathways Hyderabad",
    "BPT Physiotherapy Hyderabad",
    "BOT Occupational Therapy",
    "BSc Nursing admissions",
    "Allied health courses Hyderabad",
    "OET IELTS healthcare training",
    "UK NHS healthcare pathway",
    "Australia AHPRA healthcare",
  ],
});

export default function CarebridgePage() {
  return (
    <>
      <StructuredData
        id="carebridge-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partner" },
          { name: "Carebridge Global Healthcare", path: "/carebridge" },
        ])}
      />
      <StructuredData
        id="carebridge-page-schema"
        data={buildWebPageSchema({
          title: "Carebridge Global Healthcare Pathways | St.Mary's University",
          description:
            "Explore Carebridge healthcare degree programs, international licensing pathways, clinical rotations from Year 1, and career opportunities at St.Mary's University.",
          pathname: "/carebridge",
        })}
      />
      <CarebridgeLanding />
    </>
  );
}
