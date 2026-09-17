import PartnerIframePage from "@/views/PartnerIframePage";
import EdinboxForensicLandingV2 from "@/views/EdinboxForensicLandingV2";
import CarebridgeLanding from "@/views/CarebridgeLanding";
import { EDU_PARTNERS } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import {
  isRemovedPartnerPageSlug,
} from "@/lib/shared/partner-pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const partnerSlug = (partner: any) => {
  const landingUrl = String(partner.landingUrl || "").trim();
  let slug = "";
  if (landingUrl.startsWith("/") && !landingUrl.startsWith("//")) {
    slug = landingUrl.replace(/^\/+/, "").replace(/^partner\//, "").replace(/\/$/, "").toLowerCase();
  } else if (!/^https?:\/\//i.test(landingUrl)) {
    slug = String(partner.code || "").trim().toLowerCase();
  }
  return isRemovedPartnerPageSlug(slug) ? "" : slug;
};

// Slugs whose partner-supplied copy asserts unverified claims about SMRU (see docs/seo/needs-input.md).
const NOINDEX_PARTNER_LANDINGS = new Set(["edinbox", "qtst", "veloces"]);

// Slugs rendered by an SMRU-authored view. Every other partner landing is a PartnerIframePage shell
// whose crawlable text is only the loader caption, so it stays reachable but out of the index.
const isSmruAuthoredPartnerView = (slug: string) => slug === "edinbox" || slug === "carebridge";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const partner = Object.values(EDU_PARTNERS || {}).find((item: any) => partnerSlug(item) === params.slug);
  if (!partner) {
    return buildMetadata({
      title: "Page Not Found",
      description: "This partner page is not available.",
      pathname: `/partner/${params.slug}`,
      robots: "noindex,nofollow",
    });
  }
  const name = (partner as any)?.name || params.slug.toUpperCase();
  // /partner/carebridge/ renders the same CarebridgeLanding as /carebridge/, so it canonicalises there:
  // buildMetadata derives canonical, og:url and hreflang from pathname, hence the canonical path is passed.
  if (params.slug === "carebridge") {
    return buildMetadata({
      title: `${name} Partner | St. Mary's University`,
      description: `Explore ${name} education partner programs and pathways at St. Mary's University.`,
      pathname: "/carebridge",
    });
  }
  return buildMetadata({
    title: `${name} Partner | St. Mary's University`,
    description: `Explore ${name} education partner programs and pathways at St. Mary's University.`,
    pathname: `/partner/${params.slug}`,
    // Partner-authored landings that publish unverified superlatives, hospital or fee claims about
    // SMRU stay reachable but out of the index until the partner copy is corrected (content untouched).
    // Iframe shells are noindex too: the partner's site is the content, not this page.
    robots:
      NOINDEX_PARTNER_LANDINGS.has(params.slug) || !isSmruAuthoredPartnerView(params.slug)
        ? "noindex,follow"
        : "index,follow",
  });
}

export function generateStaticParams() {
  return Object.values(EDU_PARTNERS || {})
    .map(partnerSlug)
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export default function PartnerDetailPage({ params }: { params: { slug: string } }) {
  if (isRemovedPartnerPageSlug(params.slug)) notFound();
  const partner = Object.values(EDU_PARTNERS || {}).find((item: any) => partnerSlug(item) === params.slug);
  if (!partner) notFound();
  const name = (partner as any)?.name || params.slug.toUpperCase();
  return (
    <>
      <StructuredData
        id={`${params.slug}-breadcrumb-schema`}
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partner" },
          { name, path: `/partner/${params.slug}` },
        ])}
      />
      <StructuredData
        id={`${params.slug}-page-schema`}
        data={buildWebPageSchema({
          title: `${name} Partner`,
          description: `Explore ${name} education partner programs and pathways at St. Mary's University.`,
          pathname: `/partner/${params.slug}`,
        })}
      />
      {!isSmruAuthoredPartnerView(params.slug) && (
        <h1 className="sr-only">{name} Partner Programs | St. Mary&apos;s University</h1>
      )}
      {params.slug === "edinbox" ? (
        <EdinboxForensicLandingV2 />
      ) : params.slug === "carebridge" ? (
        <CarebridgeLanding />
      ) : (
        <PartnerIframePage slug={params.slug} />
      )}
    </>
  );
}
