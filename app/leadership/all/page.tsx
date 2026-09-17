import type { Metadata } from "next";
import AboutPage from "../../../src/views/About";
import StructuredData from "../../../src/components/seo/StructuredData";
import { buildMetadata } from "../../../src/lib/metadata";
import { buildBreadcrumbSchema } from "../../../src/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "All Leadership Profiles | St. Mary's University",
  description: "Meet the leaders, governing council, and academic teams steering St. Mary's University.",
  pathname: "/leadership/all",
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="leadership-all-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leadership", path: "/leadership" },
          { name: "All members", path: "/leadership/all" },
        ])}
      />
      <AboutPage />
    </>
  );
}
