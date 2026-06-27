import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Home from "@/views/Home";
import { buildMetadata } from "@/lib/metadata";
import { HOME_FAQS } from "@/lib/seo/home-faqs";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

export const metadata: Metadata = buildMetadata({
  title: "Stmarys University | Private University in Hyderabad",
  description:
    "Explore Stmarys University in Hyderabad, Telangana: schools, courses, admissions, campus life, and official university updates.",
  pathname: "/",
  keywords: [
    "Stmarys University",
    "Stmarys University Hyderabad",
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
          title: "Stmarys University | Private University in Hyderabad",
          description:
            "Explore Stmarys University in Hyderabad, Telangana: schools, courses, admissions, campus life, and official university updates.",
          pathname: "/",
        })}
      />
      <StructuredData id="home-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(HOME_FAQS) : null} />
      <Home />
    </>
  );
}
