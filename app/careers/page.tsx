import type { Metadata } from "next";
import Careers from "@/views/Careers";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Faculty & Staff Careers | Join the St. Mary's University Academic Team",
  description: "Build your academic career at St. Mary's University. Explore faculty and administrative job openings in Hyderabad.",
  pathname: "/careers",
  keywords: ["St. Mary's University careers", "faculty jobs Hyderabad"],
});

export default Careers;
