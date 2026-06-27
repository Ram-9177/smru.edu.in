import type { Metadata } from "next";
import { Suspense } from "react";
import SiteSearchClient from "@/components/search/SiteSearchClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Search Stmarys University Website",
  description: "Search Stmarys University website for schools, departments, programmes, admissions, campus information, law programmes, and public information pages.",
  pathname: "/search",
  keywords: ["Stmarys University search", "Stmarys University search", "programme search", "admissions search", "school search", "university search"],
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SiteSearchClient />
    </Suspense>
  );
}
