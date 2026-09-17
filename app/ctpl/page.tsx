import RedirectFallback from "@/components/seo/RedirectFallback";
import { SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Apply | St. Mary's University", SITE_CTA_LINKS.ctplApplyRedirect);

export default function Page() {
  return <RedirectFallback targetUrl={SITE_CTA_LINKS.ctplApplyRedirect} />;
}
