import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata(
  "Explore Stmarys University",
  "/explore-Stmarys"
);

export default function Page() {
  redirect("/explore-Stmarys");
}
