import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Home from "@/views/Home";
import { buildMetadata } from "@/lib/metadata";
import { buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "St.Mary's University Hyderabad | Courses & Admissions",
  description:
    "Official website of St.Mary's University in Hyderabad, Telangana. Explore schools, programmes, admissions, campus information, and official disclosures.",
  pathname: "/",
  keywords: [
    "St.Mary's University",
    "St.Mary's University Hyderabad",
    "St.Mary's University",
    "St.Mary's University",
    "stmarys",
    "st marys",
    "st. marys",
    "St.Mary's",
    "private university in Hyderabad",
    "private university in Telangana",
    "UGC recognized university in Hyderabad",
    "university near Ramoji Film City",
    "university admissions 2026 Hyderabad",
    "professional courses in Hyderabad",
    "university courses after 12th",
    "private university admissions Hyderabad",
  ],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="home-webpage-schema"
        data={buildWebPageSchema({
          title: "St.Mary's University Hyderabad | Courses & Admissions",
          description:
            "Official website of St.Mary's University in Hyderabad, Telangana. Explore schools, programmes, admissions, campus information, and official disclosures.",
          pathname: "/",
        })}
      />
      <Home />
    </>
  );
}
