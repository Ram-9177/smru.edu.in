import type { Metadata } from "next";
import LeaderProfile from "../../../src/views/LeaderProfile";
import StructuredData from "../../../src/components/seo/StructuredData";
import { leaderBySlug, leaders } from "../../../src/data/leaders";
import { buildMetadata } from "../../../src/lib/metadata";
import { buildBreadcrumbSchema, buildPersonSchema, buildWebPageSchema } from "../../../src/lib/seo/schema";

type Leader = (typeof leaders)[number];

const leaderTitle = (leader: Leader) => `${leader.name} | Leadership | St. Mary's University`;

// One sentence of identity, then the leader's own summary; buildMetadata trims at a sentence boundary.
const leaderDescription = (leader: Leader) =>
  `${leader.name}, ${leader.role} of St. Mary's University (SMRU), Hyderabad.${leader.about ? ` ${leader.about}` : ""}`;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const leader = leaderBySlug[params.slug as keyof typeof leaderBySlug];
  if (!leader) {
    return buildMetadata({
      title: "Leadership | St. Mary's University",
      description: "Leadership profile at St. Mary's University.",
      pathname: `/leadership/${params.slug}`,
      robots: "noindex,follow",
    });
  }

  return buildMetadata({
    title: leaderTitle(leader),
    description: leaderDescription(leader),
    pathname: `/leadership/${params.slug}`,
  });
}

export function generateStaticParams() {
  return (leaders || []).map((leader) => ({ slug: leader.slug }));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const leader = leaderBySlug[params.slug as keyof typeof leaderBySlug];
  const pathname = `/leadership/${params.slug}`;

  return (
    <>
      {leader && (
        <>
          <StructuredData
            id="leader-breadcrumb-schema"
            data={buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Leadership", path: "/leadership" },
              { name: leader.name, path: pathname },
            ])}
          />
          <StructuredData
            id="leader-webpage-schema"
            data={buildWebPageSchema({
              title: leaderTitle(leader),
              description: leaderDescription(leader),
              pathname,
            })}
          />
          <StructuredData
            id="leader-person-schema"
            data={buildPersonSchema({
              name: leader.name,
              jobTitle: leader.role,
              description: leader.about || undefined,
              pathname,
            })}
          />
        </>
      )}
      <LeaderProfile />
    </>
  );
}
