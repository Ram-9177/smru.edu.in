import type { Metadata } from "next";
import ThankYou from "@/views/ThankYou";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Submission Received | Stmarys University Admissions",
  description: "Your enquiry has been successfully submitted. Our admissions team will contact you shortly.",
  pathname: "/thank-you",
  robots: "noindex,follow",
});

export default ThankYou;
