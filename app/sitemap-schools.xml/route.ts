import { buildSectionSitemapXml } from "@/lib/seo/sitemap";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSectionSitemapXml("schools"), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
