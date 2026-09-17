import type { Metadata } from "next";
import PartnerIframePage from "@/views/PartnerIframePage";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/metadata";

// Carebridge Education's own home page, mirrored under public/partners/carebridge/ by
// `npm run partners:carebridge -- <export>` and shown here in the same iframe shell as the other
// raw partner landings. Every link inside it leaves for https://carebridge.education/. Like every
// iframe partner landing, this shell is noindex and out of the sitemap: the partner's site is the
// content, and this page's own crawlable text is only the loader caption.
const title = "Carebridge | St. Mary's University";
const description =
  "Carebridge Education partner landing at St. Mary's University (SMRU), Hyderabad. The full Carebridge site, programmes and admissions live at carebridge.education.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  pathname: "/carebridge",
  robots: "noindex,follow",
});

export default function CarebridgePage() {
  return (
    <>
      <StructuredData
        id="carebridge-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partner" },
          { name: "Carebridge", path: "/carebridge" },
        ])}
      />
      <StructuredData id="carebridge-webpage-schema" data={buildWebPageSchema({ title, description, pathname: "/carebridge" })} />
      <h1 className="sr-only">Carebridge Partner Programs | St. Mary&apos;s University</h1>
      <PartnerIframePage slug="carebridge" />
    </>
  );
}
