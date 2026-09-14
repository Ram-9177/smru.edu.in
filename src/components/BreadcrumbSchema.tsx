import React from "react";
import { buildBreadcrumbSchema, SeoBreadcrumbItem } from "@/lib/seo/schema";
import { serializeJsonLd } from "@/lib/seo/json-ld";

export default function BreadcrumbSchema({ items }: { items: SeoBreadcrumbItem[] }) {
  const schema = buildBreadcrumbSchema(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
