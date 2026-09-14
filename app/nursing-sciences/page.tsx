import type { Metadata } from "next";
import { buildSchoolLandingMetadata } from "@/lib/shared/school-landing";
import NursingLandingClient from "./NursingLandingClient";

const schoolSlug = "nursing-sciences";

export const metadata: Metadata = buildSchoolLandingMetadata(schoolSlug);

export default function Page() {
  return <NursingLandingClient />;
}
