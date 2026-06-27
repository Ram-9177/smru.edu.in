import type { Metadata } from "next";
import LawLanding from "@/views/LawLanding";
import { buildMetadata } from "@/lib/metadata";
import { lawMetaDescription } from "@/data/law";

export const metadata: Metadata = buildMetadata({
  title: "School of Law Admissions | Stmarys University",
  description: lawMetaDescription,
  pathname: "/landing/law",
  keywords: [
    "School of Law admissions",
    "Law brochure",
    "LLB admissions",
    "LLM admissions",
    "Stmarys University law",
  ],
});

export default function Page() {
  return <LawLanding />;
}
