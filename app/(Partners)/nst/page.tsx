import RedirectFallback from "@/components/seo/RedirectFallback";
import { getPartnerAliasRedirect } from "@/lib/shared/partner-alias-redirects";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

const TARGET_PATH = getPartnerAliasRedirect("nst");

export const metadata = buildRedirectMetadata("Newton School of Technology Partner | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} />;
}
