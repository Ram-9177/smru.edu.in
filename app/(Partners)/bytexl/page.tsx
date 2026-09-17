import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("ByteXL | St.Mary's University", "https://bytexl.com/smru.html");

export default function Page() {
  redirect(getPartnerAliasRedirect("bytexl"));
}
