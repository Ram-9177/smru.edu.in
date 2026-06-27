import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Stmarys University",
  description: "Terms of service for Stmarys University website usage.",
  pathname: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <>
      <StructuredData
        id="terms-of-service-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ])}
      />
      <StructuredData
        id="terms-of-service-webpage-schema"
        data={buildWebPageSchema({
          title: "Terms of Service | Stmarys University",
          description: "Terms of service for Stmarys University website usage.",
          pathname: "/terms-of-service",
        })}
      />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-800">
        <h1 className="text-4xl font-black text-[#0d315c]">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-600">
          These terms govern access and usage of the Stmarys University website and digital enquiry tools.
        </p>
        <p className="mt-8 text-base leading-7">
          All program information and admissions timelines are subject to official university updates. For the latest confirmation, contact
          {" "}
          <a className="font-semibold text-[#0d315c] underline" href="mailto:reach@smru.edu.in">reach@smru.edu.in</a>.
        </p>
      </main>
    </>
  );
}
