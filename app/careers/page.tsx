import type { Metadata } from "next";
import Careers from "@/views/Careers";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Careers & Academic Appointments | St. Mary's Rehabilitation University",
  description: "Official recruitment notifications and prescribed application forms for Regular Vice-Chancellor, Registrar, Assistant Registrar, and Faculty across 6 constituent Schools at St. Mary's Rehabilitation University, Hyderabad.",
  pathname: "/careers",
  keywords: ["St. Mary's Rehabilitation University careers", "SMRU VC appointment", "faculty recruitment Hyderabad", "Registrar appointment SMRU"],
});

export default Careers;
