import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("QTST | St.Mary's University", "/partner/qtst");

export default function Page() {
  redirect("/partner/qtst");
}
