import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("IST Partner | St. Mary's University", "/partner");

export default function Page() {
  return <RedirectFallback targetUrl="/partner" />;
}
