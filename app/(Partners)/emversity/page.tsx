import RedirectFallback from "@/components/seo/RedirectFallback";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Emversity Partner | St. Mary's University", "/partner/emversity");

export default function Page() {
  return <RedirectFallback targetUrl={getPartnerAliasRedirect("emversity")} />;
}
