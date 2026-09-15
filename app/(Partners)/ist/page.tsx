import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("IST Partner | St. Mary's University", "/partner");

export default function Page() {
  redirect("/partner");
}
