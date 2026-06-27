import type { Metadata } from "next";
import type { CompliancePage } from "../../data/compliance-pages";
import { compliancePagePath, isCompliancePathIndexable } from "../../data/compliance-pages";
import { formatMetaDescription, formatSeoTitle, SEO_TITLE_BRAND } from "../../src/lib/metadata";
import { absoluteSeoUrl } from "../schema/webpage";

type PageLike = {
  title: string;
  description: string;
  path: string;
  robots?: "index, follow" | "noindex, follow";
  isIndexable?: boolean;
};

export const buildSeoMetadata = (page: PageLike): Metadata => {
  const canonical = absoluteSeoUrl(page.path);
  const robots = page.robots ?? (page.isIndexable === false ? "noindex, follow" : "index, follow");
  const title = formatSeoTitle(page.title);
  const description = formatMetaDescription(page.description);
  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SEO_TITLE_BRAND,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
};

export const compliancePageToMetadataInput = (page: CompliancePage): PageLike => {
  const path = compliancePagePath(page);
  const isIndexable = isCompliancePathIndexable(path);
  return {
    title: page.title,
    description: page.description,
    path,
    isIndexable,
    robots: isIndexable ? "index, follow" : "noindex, follow",
  };
};
