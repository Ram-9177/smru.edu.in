import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

const TARGET_PATH = "/partner/iiat";

export const metadata = buildRedirectMetadata("IIAT Partner | St.Mary's University", TARGET_PATH);

export default function Page() {
	redirect(TARGET_PATH);
}
