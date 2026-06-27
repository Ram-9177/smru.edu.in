import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export function buildRedirectMetadata(title: string, targetPath: string): Metadata {
  return buildMetadata({
    title,
    description: `Redirecting to ${title.replace(/\s+\|\s+St\. Mary's University$/, "")}.`,
    pathname: targetPath.startsWith("http") ? "/" : targetPath,
    robots: "noindex,follow",
  });
}
