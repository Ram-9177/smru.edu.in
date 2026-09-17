import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("QTST | St. Mary's University", "/partner/qtst");

export default function Page() {
  return <RedirectFallback targetUrl="/partner/qtst" />;
}
