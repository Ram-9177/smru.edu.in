import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Careers | St.Mary's University", "/careers");

export default function Page() {
  redirect("/careers/");
}
