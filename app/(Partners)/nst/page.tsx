import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Newton School of Technology Partner | Stmarys University", "/partner/nst");

export default function Page() {
  redirect(getPartnerAliasRedirect("nst"));
}
