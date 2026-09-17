import type { Metadata } from "next";
import { Suspense } from "react";
import SiteSearchClient from "@/components/search/SiteSearchClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Search St.Mary's University Website",
  description: "Search St.Mary's University website for schools, departments, programmes, admissions, campus information, law programmes, and public information pages.",
  pathname: "/search",
  keywords: ["St.Mary's University search", "St.Mary's University search", "programme search", "admissions search", "school search", "university search"],
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SiteSearchClient />
    </Suspense>
  );
}
