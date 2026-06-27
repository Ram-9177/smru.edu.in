import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Veloces Partner | Stmarys University", "/partner/veloces");

export default function Page() {
  redirect(getPartnerAliasRedirect("veloces"));
}
