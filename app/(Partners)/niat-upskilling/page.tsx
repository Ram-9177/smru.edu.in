import type { Metadata } from "next";
import NiatUpskillingView from "@/views/NiatUpskilling";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NIAT Upskilling",
  description: "Explore the NIAT Upskilling route published on the Stmarys University website.",
  pathname: "/niat-upskilling",
});

export default NiatUpskillingView;
