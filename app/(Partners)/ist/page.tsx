import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("IST Partner | St. Mary's University", "/partners/ist/index.html");

export default function Page() {
  redirect("/partners/ist/index.html");
}
