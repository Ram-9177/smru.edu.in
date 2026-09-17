import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Home from "@/views/Home";
import { buildMetadata } from "@/lib/metadata";
import { HOME_FAQS } from "@/lib/seo/home-faqs";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

export const metadata: Metadata = buildMetadata({
  title: "St.Mary's University | Top Private University in Hyderabad",
  description:
    "Welcome to St.Mary's University in Hyderabad, Telangana. Explore top-ranked schools, courses, admissions, and campus life at St.Mary's.",
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
    "best university courses after 12th",
    "top private universities in Hyderabad",
  ],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="home-webpage-schema"
        data={buildWebPageSchema({
          title: "St.Mary's University | Top Private University in Hyderabad",
          description:
            "Welcome to St.Mary's University in Hyderabad, Telangana. Explore top-ranked schools, courses, admissions, and campus life at St.Mary's.",
          pathname: "/",
        })}
      />
      <StructuredData id="home-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(HOME_FAQS) : null} />
      <Home />
    </>
  );
}
