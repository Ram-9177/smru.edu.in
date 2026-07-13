import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "../src/lib/seo/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
