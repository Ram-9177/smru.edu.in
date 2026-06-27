import type { Metadata } from "next";
import Campus360 from "@/views/Campus360";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Virtual Campus Tour | Cinematic Campus Experience | Stmarys University",
  description: "Take a 360-degree virtual tour of the Hyderabad campus. Explore labs, hostel facilities, academic spaces, and campus visit guidance at Stmarys University.",
  pathname: "/campus-360",
  keywords: ["Stmarys University campus tour", "virtual campus tour"],
});

export default Campus360;
