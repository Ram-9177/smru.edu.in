import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("QTST | Stmarys University", "/qtst");

export default function Page() {
  redirect(getPartnerAliasRedirect("qtst-smru"));
}
