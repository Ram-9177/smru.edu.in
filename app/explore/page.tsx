import type { Metadata } from "next";
import Explore from "@/views/Explore";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Explore St.Mary's University",
  description: "Explore the St.Mary's University campus, programmes, student life, visitor information, and key website sections.",
  pathname: "/explore",
});

export default function Page() {
  return <Explore />;
}
