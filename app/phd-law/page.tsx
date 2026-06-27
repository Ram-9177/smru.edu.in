import RedirectFallback, { buildRedirectMetadata } from "@/components/seo/RedirectFallback";

export const metadata = buildRedirectMetadata("/law/", "This older Ph.D. Law URL has moved to the current School of Law page.");

export default function Page() {
  return (
    <RedirectFallback
      targetUrl="/law/#programmes"
      description="This older Ph.D. Law URL is no longer part of the current published course list. Please use the current School of Law programmes page."
      linkLabel="Go to Law Programmes"
    />
  );
}
