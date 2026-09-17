import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// IIAT is a removed partner page (see REMOVED_PARTNER_PAGE_SLUGS): the old landing URL goes to the
// partners index, exactly like /ist/. It used to point at /partner/iiat/, which does not exist.
const TARGET_PATH = "/partner";

export const metadata = buildRedirectMetadata("IIAT Partner | St. Mary's University", TARGET_PATH);

export default function Page() {
	return <RedirectFallback targetUrl={TARGET_PATH} />;
}
