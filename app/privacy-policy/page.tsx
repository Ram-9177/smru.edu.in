import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Stmarys University",
  description: "Privacy policy for Stmarys University website users.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData
        id="privacy-policy-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <StructuredData
        id="privacy-policy-webpage-schema"
        data={buildWebPageSchema({
          title: "Privacy Policy | Stmarys University",
          description: "Privacy policy for Stmarys University website users.",
          pathname: "/privacy-policy",
        })}
      />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-800">
        <h1 className="text-4xl font-black text-[#0d315c]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-600">
          This page describes how Stmarys University handles website visitor information and enquiry submissions.
        </p>
        <p className="mt-8 text-base leading-7">
          By using this website, you agree to the collection and processing of basic contact and enquiry data required for admissions support and communication. For policy-related queries, contact
          {" "}
          <a className="font-semibold text-[#0d315c] underline" href="mailto:reach@smru.edu.in">reach@smru.edu.in</a>.
        </p>
      </main>
    </>
  );
}
