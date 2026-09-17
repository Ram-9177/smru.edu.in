import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata(
  "Explore St.Mary's University",
  "/campus-guide"
);

export default function Page() {
  redirect("/campus-guide");
}
