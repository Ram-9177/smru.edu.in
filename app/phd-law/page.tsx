import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// Legacy short URL for the Ph.D. in Law; the programme page is live under the School of Law.
const TARGET_PATH = "/schools/law/legal-studies/phd-law/";

export const metadata = buildRedirectMetadata("Ph.D. in Law | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} linkLabel="Go to the Ph.D. in Law programme" />;
}
