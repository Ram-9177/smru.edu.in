import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Mjiollnir Partner | Stmarys University", "/partner/mjiollnir");

export default function Page() {
  redirect(getPartnerAliasRedirect("mjiollnir"));
}
