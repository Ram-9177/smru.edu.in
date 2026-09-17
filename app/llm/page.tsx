import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// Legacy short URL for the LL.M.; the programme page is live under the School of Law.
const TARGET_PATH = "/schools/law/legal-studies/llm/";

export const metadata = buildRedirectMetadata("Master of Laws (LL.M.) | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} linkLabel="Go to the LL.M. programme" />;
}
