import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

const TARGET_PATH = "/partner/niat";

export const metadata = buildRedirectMetadata("NIAT Partner | St. Mary's University", TARGET_PATH);

export default function Page() {
	return <RedirectFallback targetUrl={TARGET_PATH} />;
}
