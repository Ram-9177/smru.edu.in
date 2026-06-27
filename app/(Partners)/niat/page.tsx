import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

const TARGET_PATH = "/partner/niat";

export const metadata = buildRedirectMetadata("NIAT Partner | Stmarys University", TARGET_PATH);

export default function Page() {
	redirect(TARGET_PATH);
}
