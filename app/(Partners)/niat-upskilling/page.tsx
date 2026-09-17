import type { Metadata } from "next";
import NiatUpskillingView from "@/views/NiatUpskilling";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NIAT Upskilling",
  description: "Explore the NIAT Upskilling route published on the St. Mary's University website.",
  pathname: "/niat-upskilling",
  robots: "noindex,follow",
});

export default function NiatUpskillingPage() {
  return (
    <>
      <h1 className="sr-only">NIAT Upskilling | St. Mary&apos;s University</h1>
      <NiatUpskillingView />
    </>
  );
}
