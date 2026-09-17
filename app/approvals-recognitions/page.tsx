import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import ApprovalsRecognitions from "@/views/ApprovalsRecognitions";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Approvals & Recognitions | Statutory Status | St. Mary's University Hyderabad",
  description: "Official approvals, recognitions, and regulatory disclosure page for St. Mary's University. Download the university establishment Act and UGC recognition letters.",
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
          description: "Official approvals, recognitions, and regulatory disclosure page for St. Mary's University.",
          pathname: "/approvals-recognitions",
        })}
      />
      <ApprovalsRecognitions />
    </>
  );
}
