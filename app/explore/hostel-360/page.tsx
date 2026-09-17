import type { Metadata } from "next";
import Hostel360Page from "@/views/Hostel360Page";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Hostel 360° Virtual Tour | High-End Rooms & Washrooms | St. Mary's University",
  description: "Experience the state-of-the-art Student Hostel at St. Mary's University in an interactive 360° tour. Explore fully high-end rooms, study stations, vanity handwash areas, wet & dry washrooms, and recreational facilities.",
  pathname: "/hostel-360",
  robots: "noindex,follow",
  keywords: [
    "St. Mary's University hostel 360",
    "hostel virtual tour",
    "high-end hostel rooms",
    "luxury hostel washroom 360",
    "SMRU hostel facilities",
  ],
});

export default function Page() {
  return <Hostel360Page />;
}
