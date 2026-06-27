import { redirect } from "next/navigation";
import { SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Apply | Stmarys University", SITE_CTA_LINKS.ctplApplyRedirect);

export default function Page() {
  redirect(SITE_CTA_LINKS.ctplApplyRedirect);
}
