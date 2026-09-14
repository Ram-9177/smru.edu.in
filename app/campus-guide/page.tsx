import type { Metadata } from "next";
import CampusGuide from "@/views/CampusGuide";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Campus Guide | Physical & Virtual Tour | St. Mary's University",
  description:
    "Choose a language and explore the St. Mary's University campus through a guided physical or virtual campus tour.",
  pathname: "/campus-guide",
  keywords: ["St. Mary's University campus guide", "St. Mary's University campus guide", "campus tour", "virtual campus tour", "physical campus tour"],
});

export default function CampusGuidePage() {
  return (
    <>
      <h1 className="sr-only">Campus Guide | St. Mary&apos;s University</h1>
      <CampusGuide />
    </>
  );
}
