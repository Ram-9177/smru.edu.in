import Script from "next/script";

export default function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown> | null;
}) {
  if (!data) return null;
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
