import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata(
  "Explore St. Mary's University",
  "/explore"
);

export default function Page() {
  return <RedirectFallback targetUrl="/explore" />;
}
