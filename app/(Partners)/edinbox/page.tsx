import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Edinbox | St. Mary's University", "/partner/edinbox");

export default function Page() {
  return <RedirectFallback targetUrl="/partner/edinbox" />;
}
