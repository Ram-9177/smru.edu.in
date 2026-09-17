import { buildSitemapIndexXml } from "@/lib/seo/sitemap";

export const dynamic = "force-static";

// /sitemap.xml is a sitemap index; the URL lists live in /sitemap-{pages,schools,programmes,guides,images}.xml.
export function GET() {
  return new Response(buildSitemapIndexXml(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
