import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Entrance Exam Updates | Stmarys University",
  description: "Redirect to the official page for future Stmarys University entrance exam announcements.",
  pathname: "/exam-notification",
  robots: "noindex,follow",
  keywords: ["Stmarys University entrance exam updates"],
});

export default function Page() {
  redirect("/exam-notification");
}
