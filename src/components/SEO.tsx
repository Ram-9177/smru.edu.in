"use client";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  og?: Record<string, string>;
  twitter?: Record<string, string>;
  jsonLd?: unknown;
  robots?: string;
};

export default function SEO(_props: SEOProps) {
  return null;
}
