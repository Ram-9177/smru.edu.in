import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

// Retired short-form school URL: canonical hub is /schools/{slug}/ (301 in public/.htaccess).
const TARGET_PATH = "/schools/law";

export const metadata = buildRedirectMetadata("School of Law | St. Mary's University", TARGET_PATH);

export default function Page() {
  redirect(TARGET_PATH);
}
