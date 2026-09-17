import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// Legacy URL; no university entrance exam is currently announced (see /exam-notification/).
const TARGET_PATH = "/exam-notification/";

export const metadata = buildRedirectMetadata("Entrance Exam Updates | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} />;
}
