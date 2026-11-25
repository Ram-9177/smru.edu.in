import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Home from "@/views/Home";
import { buildMetadata } from "@/lib/metadata";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { SITE_IDENTITY } from "@/lib/seo/site";

const HOME_TITLE = "St. Mary's University Hyderabad (SMRU) – Official Site";
const HOME_DESCRIPTION = SITE_IDENTITY.defaultDescription;

export const metadata: Metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  pathname: "/",
});

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/assets/hero-campus-mobile.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/hero-campus-fast.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <StructuredData
        id="home-webpage-schema"
        data={buildWebPageSchema({
          title: HOME_TITLE,
          description: HOME_DESCRIPTION,
          pathname: "/",
        })}
      />
      <Home />
    </>
  );
}
