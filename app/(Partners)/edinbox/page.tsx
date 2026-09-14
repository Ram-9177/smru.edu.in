import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Edinbox | St. Mary's University", "/partner/edinbox");

export default function Page() {
  redirect("/partner/edinbox");
}
