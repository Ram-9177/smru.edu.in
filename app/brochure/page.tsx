import type { Metadata } from "next";
import BrochureDownload from "@/views/BrochureDownload";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Download Prospectus & Brochure | Admissions 2026 | St. Mary's University",
  description: "Get the official St. Mary's University brochure. Detailed information on courses, campus facilities, and 2026 admission guidelines.",
  pathname: "/brochure",
  keywords: ["St. Mary's University brochure", "admissions prospectus"],
});

export default BrochureDownload;
