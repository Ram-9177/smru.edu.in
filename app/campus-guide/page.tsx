import type { Metadata } from "next";
import CampusGuide from "@/views/CampusGuide";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Campus Guide | Physical & Virtual Tour | Stmarys University",
  description:
    "Choose a language and explore the Stmarys University campus through a guided physical or virtual campus tour.",
  pathname: "/campus-guide",
  keywords: ["Stmarys University campus guide", "Stmarys University campus guide", "campus tour", "virtual campus tour", "physical campus tour"],
});

export default function CampusGuidePage() {
  return <CampusGuide />;
}
