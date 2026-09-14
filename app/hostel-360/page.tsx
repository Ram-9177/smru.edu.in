import type { Metadata } from "next";
import Hostel360Page from "@/views/Hostel360Page";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Hostel 360° Virtual Tour | St.Mary's University",
  description: "Explore the Student Hostel at St.Mary's University in 360°. View personal study suites, luxury vanity stations, and segregated wet & dry washrooms.",
  pathname: "/hostel-360",
});

export default function Page() {
  return <Hostel360Page />;
}
