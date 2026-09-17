import RedirectFallback from "@/components/seo/RedirectFallback";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Edridge Partner | St. Mary's University", "/partner/edridge");

export default function Page() {
  return <RedirectFallback targetUrl={getPartnerAliasRedirect("edridge")} />;
}
