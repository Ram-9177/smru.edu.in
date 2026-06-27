import type { MetadataRoute } from "next";

const base = "https://smru.edu.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/assets/",
          "/_next/static/",
          "/*.js",
          "/*.css",
        ],
        disallow: [
          "/developer/",
          "/api/",
          "/thank-you/",
        ],
      },
      {
        // Explicit Googlebot rule: allow JS/CSS for rendering
        userAgent: "Googlebot",
        allow: [
          "/",
          "/assets/",
          "/_next/static/",
          "/*.js",
          "/*.css",
        ],
        disallow: ["/developer/", "/api/", "/thank-you/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
