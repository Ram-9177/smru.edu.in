import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InformationPage from "@/components/seo/InformationPage";
import { buildMetadata } from "@/lib/metadata";
import { SAFE_GUIDE_PAGE_MAP } from "@/lib/seo/safe-guides";

const slug = "best-university-in-hyderabad";
const pageConfig = SAFE_GUIDE_PAGE_MAP.get(slug);

export const metadata: Metadata = pageConfig
  ? buildMetadata({
      title: pageConfig.title,
      description: pageConfig.description,
      pathname: `/${pageConfig.slug}`,
      keywords: pageConfig.keywords || [],
    })
  : { title: "Page Not Found", robots: "noindex,follow" };

export default function Page() {
  if (!pageConfig) notFound();
  return <InformationPage config={pageConfig} />;
}
