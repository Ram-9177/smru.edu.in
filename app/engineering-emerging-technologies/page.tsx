import type { Metadata } from "next";
import SchoolLandingComingSoon from "@/components/SchoolLandingComingSoon";
import { buildSchoolLandingMetadata } from "@/lib/shared/school-landing";

const schoolSlug = "engineering-emerging-technologies";

export const metadata: Metadata = buildSchoolLandingMetadata(schoolSlug);

export default function Page() {
  return <SchoolLandingComingSoon schoolSlug={schoolSlug} />;
}
