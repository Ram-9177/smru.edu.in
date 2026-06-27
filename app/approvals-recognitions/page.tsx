import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import ApprovalsRecognitions from "@/views/ApprovalsRecognitions";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Approvals & Recognitions | Statutory Status | Stmarys University Hyderabad",
  description: "Official approvals, recognitions, and regulatory disclosure page for Stmarys University. Download the university establishment Act and UGC recognition letters.",
  pathname: "/approvals-recognitions",
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="approvals-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Approvals & Recognitions", path: "/approvals-recognitions" },
        ])}
      />
      <StructuredData
        id="approvals-page-schema"
        data={buildWebPageSchema({
          title: "Approvals & Recognitions",
          description: "Official approvals, recognitions, and regulatory disclosure page for Stmarys University.",
          pathname: "/approvals-recognitions",
        })}
      />
      <ApprovalsRecognitions />
    </>
  );
}
