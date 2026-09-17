import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// Retired short-form school URL: canonical hub is /schools/{slug}/ (301 in public/.htaccess).
const TARGET_PATH = "/schools/nursing-sciences";

export const metadata = buildRedirectMetadata("School of Nursing | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} />;
}
