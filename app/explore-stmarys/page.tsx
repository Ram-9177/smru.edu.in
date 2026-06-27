import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata(
  "Explore Stmarys University",
  "/campus-guide"
);

export default function Page() {
  redirect("/campus-guide");
}
