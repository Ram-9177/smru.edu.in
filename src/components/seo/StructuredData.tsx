import { serializeJsonLd } from "@/lib/seo/json-ld";

export default function StructuredData({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown> | null;
}) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
