import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import About from "@/views/About";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Stmarys University | Leadership & Legacy",
  description:
    "Learn about the educational legacy, leadership, and vision of Stmarys University, Hyderabad, with official governance context.",
  pathname: "/about",
  keywords: ["About Stmarys University", "Stmarys University leadership", "Stmarys University"],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="about-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <StructuredData
        id="about-page-schema"
        data={buildWebPageSchema({
          title: "About Stmarys University",
          description: "Read about the leadership, institutional journey, and academic direction of Stmarys University in Hyderabad.",
          pathname: "/about",
          type: "AboutPage",
        })}
      />
      <About />
    </>
  );
}
