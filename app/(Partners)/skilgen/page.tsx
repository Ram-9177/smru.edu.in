import RedirectFallback from "@/components/seo/RedirectFallback";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Skilgen Tech | St. Mary's University", "/partner/skilgen");

export default function Page() {
  return <RedirectFallback targetUrl={getPartnerAliasRedirect("skilgen")} />;
}
