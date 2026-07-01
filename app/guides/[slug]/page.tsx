import type { Metadata } from "next";
import InformationPage from "@/components/seo/InformationPage";
import { buildMetadata } from "@/lib/metadata";
import { SAFE_GUIDE_PAGE_MAP, SAFE_GUIDE_PAGES } from "@/lib/seo/safe-guides";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SAFE_GUIDE_PAGES.map((page) => ({ slug: page.slug.replace(/^guides\//, "") }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const config = SAFE_GUIDE_PAGE_MAP.get(params.slug);
  if (!config) {
    return {
      title: "Page Not Found",
      robots: "noindex,follow",
    };
  }

  return buildMetadata({
    title: config.title,
    description: config.description,
    pathname: `/${config.slug}`,
    keywords: config.keywords || [],
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const config = SAFE_GUIDE_PAGE_MAP.get(params.slug);
  if (!config) notFound();
  return <InformationPage config={config} />;
}
