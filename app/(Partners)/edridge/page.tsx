import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Edridge Partner | Stmarys University", "/partner/edridge");

export default function Page() {
  redirect(getPartnerAliasRedirect("edridge"));
}
