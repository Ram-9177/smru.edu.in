import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Programmes from "@/views/Programmes";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildItemListSchema } from "@/lib/seo/schema";
import { getCatalogueGroupedBySchool, getCatalogueProgrammes } from "@/lib/seo/programme-catalogue";

const groups = getCatalogueGroupedBySchool();
const programmes = getCatalogueProgrammes();
const TITLE = "All Programmes (A–Z) | St. Mary's University";
const DESCRIPTION =
  `Every programme at St. Mary's University (SMRU), Hyderabad — ${programmes.length} UG, PG, diploma and doctoral courses across six schools, with level, duration and admissions.`;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  pathname: "/programmes",
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="programmes-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programmes", path: "/programmes" },
        ])}
      />
      <StructuredData
        id="programmes-collection-schema"
        data={buildCollectionPageSchema({ title: "All Programmes", description: DESCRIPTION, pathname: "/programmes" })}
      />
      <StructuredData
        id="programmes-item-list-schema"
        data={buildItemListSchema(programmes.map((programme) => ({ name: programme.name, url: `${programme.path}/` })))}
      />
      <Programmes groups={groups} total={programmes.length} />
    </>
  );
}
