import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("ONN Bikes Partner | St. Mary's University", "/partner/onnbikes");

export default function Page() {
  redirect(getPartnerAliasRedirect("onnbikes"));
}
