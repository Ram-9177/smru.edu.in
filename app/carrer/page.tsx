import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Careers | St. Mary's University", "/careers");

export default function Page() {
  return <RedirectFallback targetUrl="/careers/" />;
}
