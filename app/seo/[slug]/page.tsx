import type { Metadata } from "next";
import SeoRoutePage from "@/components/seo/SeoRoutePage";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getSeoPageByRoute, getSeoPagesByRouteGroup } from "@/data/seo-pages";

const routeGroup = "seo" as const;

export function generateStaticParams() {
  return getSeoPagesByRouteGroup(routeGroup).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const page = getSeoPageByRoute(routeGroup, params.slug);
  if (!page) return { title: "Page Not Found", robots: "noindex,follow" };

  return buildMetadata({
    title: page.title,
    description: page.description,
    pathname: page.path,
    robots: page.robots,
    keywords: [page.keyword, page.bucket, page.intent, page.pageType],
  });
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = getSeoPageByRoute(routeGroup, params.slug);
  if (!page) notFound();
  return <SeoRoutePage page={page} />;
}
