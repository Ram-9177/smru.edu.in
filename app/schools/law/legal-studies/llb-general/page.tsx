import RedirectFallback, { buildRedirectMetadata } from "@/components/seo/RedirectFallback";

const targetUrl = "/schools/law/legal-studies/llb/";

export const metadata = buildRedirectMetadata(targetUrl, "LL.B. (General) now maps to the current LL.B. programme page.");

export default function Page() {
  return (
    <RedirectFallback
      targetUrl={targetUrl}
      description="LL.B. (General) now maps to the current official LL.B. programme page."
      linkLabel="Go to LL.B. Programme"
    />
  );
}
