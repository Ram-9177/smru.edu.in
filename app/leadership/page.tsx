import type { Metadata } from "next";
import LeadershipHub from "../../src/components/LeadershipHub";
import StructuredData from "../../src/components/seo/StructuredData";
import { buildMetadata } from "../../src/lib/metadata";
import { buildBreadcrumbSchema } from "../../src/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Leadership | St. Mary's University",
  description: "Explore the leadership team guiding St. Mary's University.",
  pathname: "/leadership",
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="leadership-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leadership", path: "/leadership" },
        ])}
      />
      <LeadershipHub />
    </>
  );
}
