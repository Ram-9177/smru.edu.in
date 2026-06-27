import type { Metadata } from "next";
import BrochureDownload from "@/views/BrochureDownload";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Download Prospectus & Brochure | Admissions 2026 | Stmarys University",
  description: "Get the official Stmarys University brochure. Detailed information on courses, campus facilities, and 2026 admission guidelines.",
  pathname: "/brochure",
  keywords: ["Stmarys University brochure", "admissions prospectus"],
});

export default BrochureDownload;
