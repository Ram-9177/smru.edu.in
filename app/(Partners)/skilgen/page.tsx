import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Skilgen Tech | St.Mary's University", "/partner/skilgen");

export default function Page() {
  redirect(getPartnerAliasRedirect("skilgen"));
}
