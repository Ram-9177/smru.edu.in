import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("BlackBucks | Stmarys University", "/bb");

export default function Page() {
  redirect(getPartnerAliasRedirect("blackbucks"));
}
