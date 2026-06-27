import type { Metadata } from "next";
import Careers from "@/views/Careers";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Faculty & Staff Careers | Join the Stmarys University Academic Team",
  description: "Build your academic career at Stmarys University. Explore faculty and administrative job openings in Hyderabad.",
  pathname: "/careers",
  keywords: ["Stmarys University careers", "faculty jobs Hyderabad"],
});

export default Careers;
