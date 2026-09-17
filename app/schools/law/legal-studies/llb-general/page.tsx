import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// "LL.B. (General)" was folded into the single LL.B. programme page.
const TARGET_PATH = "/schools/law/legal-studies/llb/";

export const metadata = buildRedirectMetadata("Bachelor of Laws (LL.B.) | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} linkLabel="Go to the LL.B. programme" />;
}
