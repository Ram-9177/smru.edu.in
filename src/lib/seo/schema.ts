import { absoluteUrl } from "@/lib/metadata";
import { SITE_IDENTITY } from "./site";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoBreadcrumbItem = {
  name: string;
  path: string;
};

// 1. Root Organization & University Schema
export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": SITE_IDENTITY.id,
  name: SITE_IDENTITY.publicName,
  legalName: SITE_IDENTITY.legalName,
  alternateName: SITE_IDENTITY.alternateNames,
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: SITE_IDENTITY.logoUrl,
  },
  description: SITE_IDENTITY.defaultDescription,
  telephone: SITE_IDENTITY.telephone,
  email: SITE_IDENTITY.email,
  address: {
    "@type": "PostalAddress",
    ...SITE_IDENTITY.address,
  },
  contactPoint: SITE_IDENTITY.contactPoints.map((cp) => ({
    "@type": "ContactPoint",
    ...cp,
  })),
  sameAs: SITE_IDENTITY.socialLinks,
});

export const buildUniversitySchema = () => ({
  ...buildOrganizationSchema(),
});

const withoutContext = (schema: Record<string, unknown>) => {
  const { "@context": _context, ...node } = schema;
  return node;
};

// 2. WebSite Schema (Global)
export const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_IDENTITY.websiteId,
  name: SITE_IDENTITY.publicName,
  alternateName: SITE_IDENTITY.alternateNames,
  url: absoluteUrl("/"),
  publisher: { "@id": SITE_IDENTITY.id },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const buildHomepageEntityGraphSchema = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    withoutContext(buildWebSiteSchema()),
    withoutContext(buildOrganizationSchema()),
    withoutContext(buildWebPageSchema({ title, description, pathname: "/" })),
  ],
});

// 3. Page & Collection Schema
export const buildWebPageSchema = ({
  title,
  description,
  pathname,
  type = "WebPage",
  keywords = [],
}: {
  title: string;
  description: string;
  pathname: string;
  type?: string;
  keywords?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": absoluteUrl(`${pathname}#webpage`),
  name: title,
  description,
  url: absoluteUrl(pathname),
  isPartOf: { "@id": SITE_IDENTITY.websiteId },
  about: { "@id": SITE_IDENTITY.id },
  inLanguage: "en-IN",
  ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
});

const governanceBodyIds: Record<string, string> = {
  "Governing Council": "https://smru.edu.in/about/#governing-council",
  "Board of Management": "https://smru.edu.in/about/#board-of-management",
  "Sponsor Body": "https://smru.edu.in/about/#sponsor-body",
};

const slugifyId = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const isOrganizationMember = (name: string) => /educational society/i.test(name);

const personIdFor = (name: string) =>
  absoluteUrl(
    `/about#person-${slugifyId(
      name
        .replace(/\([^)]*\)/g, " ")
        .replace(/\b(dr|rev|sri|smt|mr|ms|lt|gen)\.?\s*/gi, " ")
    )}`
  );

export const buildAboutGovernanceSchema = ({
  title,
  description,
  groups,
}: {
  title: string;
  description: string;
  groups: Record<string, Array<{ name: string; role: string; about?: string }>>;
}) => {
  const memberMap = new Map<string, any>();
  const groupNodes = Object.entries(groups || {}).map(([groupName, members]) => {
    const groupId = governanceBodyIds[groupName] || absoluteUrl(`/about#${slugifyId(groupName)}`);
    const memberRefs = (members || []).map((member) => {
      const memberId = isOrganizationMember(member.name) ? absoluteUrl(`/about#${slugifyId(member.name)}`) : personIdFor(member.name);
      const existing = memberMap.get(memberId);
      const memberOf = Array.from(new Set([...(existing?.memberOf || []), groupId]));
      const jobTitleValues = Array.from(new Set([...(existing?.jobTitleValues || []), member.role]));
      const name = existing?.name && existing.name.length >= member.name.length ? existing.name : member.name;
      const node = isOrganizationMember(member.name)
        ? {
            "@type": "Organization",
            "@id": memberId,
            name: member.name,
            description: member.role,
            memberOf: memberOf.map((id) => ({ "@id": id })),
          }
        : {
            "@type": "Person",
            "@id": memberId,
            name,
            jobTitle: jobTitleValues.length === 1 ? jobTitleValues[0] : jobTitleValues,
            ...(existing?.description || member.about ? { description: existing?.description || member.about } : {}),
            worksFor: { "@id": SITE_IDENTITY.id },
            affiliation: { "@id": SITE_IDENTITY.id },
            memberOf: memberOf.map((id) => ({ "@id": id })),
          };
      memberMap.set(memberId, { ...node, memberOf, jobTitleValues });
      return { "@id": memberId };
    });

    return {
      "@type": "Organization",
      "@id": groupId,
      name: groupName,
      url: absoluteUrl(`/about#governing-bodies`),
      parentOrganization: { "@id": SITE_IDENTITY.id },
      member: memberRefs,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(buildWebPageSchema({ title, description, pathname: "/about", type: "AboutPage" })),
      ...groupNodes,
      ...Array.from(memberMap.values()).map((node) => {
        const { memberOf, jobTitleValues: _jobTitleValues, ...rest } = node;
        return {
          ...rest,
          memberOf: memberOf.map((id: string) => ({ "@id": id })),
        };
      }),
    ],
  };
};

export const buildBreadcrumbSchema = (items: SeoBreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

// 4. Academic Schema
export const buildCourseSchema = ({
  name,
  description,
  pathname,
  schoolName,
  level,
  duration,
  eligibility,
  offers,
  keywords = [],
}: {
  name: string;
  description: string;
  pathname: string;
  schoolName?: string;
  level?: string;
  duration?: string;
  eligibility?: string;
  offers?: any;
  keywords?: string[];
}) => {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name,
    description,
    url,
    provider: { "@id": SITE_IDENTITY.id },
    inLanguage: "en-IN",
    ...(schoolName ? { isPartOf: { "@type": "EducationalOrganization", name: schoolName } } : {}),
    ...(level ? { educationalCredentialAwarded: level } : {}),
    ...(duration ? { timeRequired: duration } : {}),
    ...(eligibility ? { coursePrerequisites: eligibility } : {}),
    ...(offers ? { offers: { "@type": "Offer", ...offers } } : {}),
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
  };
};

export const buildEducationProgramSchema = (args: any) => ({
  ...buildCourseSchema(args),
  "@type": "EducationalOccupationalProgram",
});

export const buildEducationEventSchema = ({
  name,
  description,
  pathname,
  startDate,
  endDate,
}: {
  name: string;
  description: string;
  pathname: string;
  startDate: string;
  endDate: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "@id": absoluteUrl(`${pathname}#event`),
  name,
  description,
  url: absoluteUrl(pathname),
  startDate,
  endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  organizer: { "@id": SITE_IDENTITY.id },
  location: {
    "@type": "VirtualLocation",
    url: absoluteUrl(pathname),
  },
  inLanguage: "en-IN",
});

export const buildItemListSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.url),
  })),
});

// 5. Faculty & Person Schema
export const buildPersonSchema = ({
  name,
  jobTitle,
  description,
  pathname,
  image,
}: {
  name: string;
  jobTitle: string;
  description?: string;
  pathname: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl(`${pathname}#person`),
  name,
  jobTitle,
  description,
  image: image ? absoluteUrl(image) : undefined,
  url: absoluteUrl(pathname),
  worksFor: { "@id": SITE_IDENTITY.id },
});

// 6. Utility Schema
export const buildFaqSchema = (items: SeoFaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildContactPageSchema = (pathname: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": absoluteUrl(`${pathname}#contactpage`),
  url: absoluteUrl(pathname),
  mainEntity: { "@id": SITE_IDENTITY.id },
});

export const buildPlaceSchema = ({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": absoluteUrl(`${pathname}#place`),
  name: title,
  description,
  url: absoluteUrl(pathname),
  address: {
    "@type": "PostalAddress",
    ...SITE_IDENTITY.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "17.3484",
    longitude: "78.6824",
  },
  publicAccess: true,
});

export const buildCollectionPageSchema = ({
  title,
  description,
  pathname,
  keywords = [],
}: {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": absoluteUrl(`${pathname}#collectionpage`),
  name: title,
  description,
  url: absoluteUrl(pathname),
  isPartOf: { "@id": SITE_IDENTITY.websiteId },
  about: { "@id": SITE_IDENTITY.id },
  inLanguage: "en-IN",
  ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
});

export const buildVideoSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  publisher: { "@id": SITE_IDENTITY.id },
});
