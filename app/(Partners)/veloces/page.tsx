import RedirectFallback from "@/components/seo/RedirectFallback";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Veloces Partner | St. Mary's University", "/partner/veloces");

export default function Page() {
  return <RedirectFallback targetUrl={getPartnerAliasRedirect("veloces")} />;
}
