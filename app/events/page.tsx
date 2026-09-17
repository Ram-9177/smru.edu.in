import { redirect } from "next/navigation";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata(
  "University Events | St.Mary's University",
  "/#events"
);

export default function Page() {
  redirect("/#events");
}
