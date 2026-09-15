import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata(
  "Explore St. Mary's University",
  "/explore"
);

export default function Page() {
  redirect("/explore");
}
