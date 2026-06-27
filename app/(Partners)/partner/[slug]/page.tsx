import PartnerIframePage from "@/views/PartnerIframePage";
import EdinboxForensicLandingV2 from "@/views/EdinboxForensicLandingV2";
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
  return buildMetadata({
    title: `${name} Partner | Stmarys University`,
    description: `Explore ${name} education partner programs and pathways at Stmarys University.`,
    pathname: `/partner/${params.slug}`,
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
          description: `Explore ${name} education partner programs and pathways at Stmarys University.`,
          pathname: `/partner/${params.slug}`,
        })}
      />
      {params.slug === "edinbox" ? (
        <EdinboxForensicLandingV2 />
      ) : (
        <PartnerIframePage slug={params.slug} />
      )}
    </>
  );
}
