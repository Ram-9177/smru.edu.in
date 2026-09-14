import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page Under Update | St.Mary's University",
  description: "This university page is currently under update and is not ready for public publication.",
  pathname: "/under-update",
  robots: "noindex,follow",
});

export default function UnderUpdateLayout({ children }: { children: ReactNode }) {
  return children;
}
