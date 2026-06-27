import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Emversity Partner | Stmarys University", "/partner/emversity");

export default function Page() {
  redirect(getPartnerAliasRedirect("emversity"));
}
