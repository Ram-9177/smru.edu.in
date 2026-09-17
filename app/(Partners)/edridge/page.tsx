import RedirectFallback from "@/components/seo/RedirectFallback";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

const TARGET_PATH = getPartnerAliasRedirect("edridge");

export const metadata = buildRedirectMetadata("Edridge Partner | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} />;
}
