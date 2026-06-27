import type { Metadata } from "next";
import LeadershipHub from "../../src/components/LeadershipHub";
import { buildMetadata } from "../../src/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Leadership | Stmarys University",
  description: "Explore the leadership team guiding Stmarys University.",
  pathname: "/leadership",
});

export default function Page() {
  return <LeadershipHub />;
}