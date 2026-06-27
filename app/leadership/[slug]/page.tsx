import type { Metadata } from "next";
import LeaderProfile from "../../../src/views/LeaderProfile";
import { leaderBySlug, leaders } from "../../../src/data/leaders";
import { buildMetadata } from "../../../src/lib/metadata";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const leader = leaderBySlug[params.slug as keyof typeof leaderBySlug];
  if (!leader) {
    return buildMetadata({
      title: "Leadership | Stmarys University",
      description: "Leadership profile at Stmarys University.",
      pathname: `/leadership/${params.slug}`,
      robots: "noindex,follow",
    });
  }

  return buildMetadata({
    title: `${leader.name} | Leadership | Stmarys University`,
    description: `${leader.name} — ${leader.role} at Stmarys University.`,
    pathname: `/leadership/${params.slug}`,
  });
}

export function generateStaticParams() {
  return (leaders || []).map((leader) => ({ slug: leader.slug }));
}

export default function Page() {
  return <LeaderProfile />;
}
