"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { schools } from "@/data/schools";
import { lawCareerPaths, lawFacilities, lawHighlights, lawProgrammes } from "@/data/law";
import { INFO_PAGES } from "@/lib/seo/info-pages";
import { OFFICIAL_DOCUMENT_LIST } from "@/lib/shared/university";
import { safeSlug } from "@/lib/shared/program-utils";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: string;
  keywords: string;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "before",
  "by",
  "does",
  "for",
  "from",
  "how",
  "in",
  "is",
  "near",
  "of",
  "on",
  "or",
  "the",
  "to",
  "what",
  "where",
  "with",
]);

const normalize = (value = "") =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/\bph\.?\s*d\.?\b/g, "phd")
    .replace(/\bb\.?\s*tech\b/g, "btech")
    .replace(/\bm\.?\s*tech\b/g, "mtech")
    .replace(/\bb\.?\s*sc\b/g, "bsc")
    .replace(/\bm\.?\s*sc\b/g, "msc")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const compact = (value = "") => normalize(value).replace(/\s+/g, "");

const QUERY_SYNONYMS: Record<string, string[]> = {
  Stmarys: ["Stmarys University", "Stmarys University hyderabad"],
  "Stmarys University": ["Stmarys", "Stmarys University hyderabad"],
  Stmaryshyderabad: ["Stmarys University hyderabad"],
  Stmarysuniversity: ["Stmarys", "Stmarys University"],
};

const queryVariants = (query: string) => {
  const normalized = normalize(query);
  if (!normalized) return [];
  return Array.from(new Set([normalized, ...(QUERY_SYNONYMS[compact(normalized)] || [])]));
};

const tokenize = (value: string) => {
  const terms = normalize(value).split(/\s+/).filter(Boolean);
  const meaningfulTerms = terms.filter((term) => !STOP_WORDS.has(term));
  return meaningfulTerms.length ? meaningfulTerms : terms;
};

const hasTerm = (field: string, term: string) => {
  const tokens = new Set(field.split(/\s+/).filter(Boolean));
  return tokens.has(term) || compact(field).includes(term);
};

const hasPhrase = (field: string, query: string, compactQuery: string) =>
  field.includes(query) || compact(field).includes(compactQuery);

const scoreSearchItem = (item: SearchItem, query: string) => {
  const q = normalize(query);
  if (!q) return 1;

  const compactQuery = compact(q);
  const terms = tokenize(q);
  const title = normalize(item.title);
  const description = normalize(item.description);
  const type = normalize(item.type);
  const keywords = normalize(item.keywords);
  const href = normalize(item.href);

  let score = 0;
  if (title === q || compact(title) === compactQuery) score += 1800;
  else if (title.startsWith(q) || compact(title).startsWith(compactQuery)) score += 900;
  else if (hasPhrase(title, q, compactQuery)) score += 700;

  if (hasPhrase(href, q, compactQuery)) score += 420;
  if (hasPhrase(keywords, q, compactQuery)) score += 320;
  if (hasPhrase(type, q, compactQuery)) score += 160;
  if (hasPhrase(description, q, compactQuery)) score += 80;

  let matchedTerms = 0;
  let titleTermHits = 0;
  terms.forEach((term) => {
    const titleHit = hasTerm(title, term);
    const hrefHit = hasTerm(href, term);
    const typeHit = hasTerm(type, term);
    const keywordHit = hasTerm(keywords, term);
    const descriptionHit = hasTerm(description, term);

    if (titleHit || hrefHit || typeHit || keywordHit || descriptionHit) matchedTerms += 1;
    if (titleHit) titleTermHits += 1;

    if (titleHit) score += 90;
    if (hrefHit) score += 60;
    if (typeHit) score += 35;
    if (keywordHit) score += 25;
    if (descriptionHit) score += 5;
  });

  const allTermsMatched = matchedTerms === terms.length;
  const phraseMatched =
    hasPhrase(title, q, compactQuery) ||
    hasPhrase(href, q, compactQuery) ||
    hasPhrase(keywords, q, compactQuery) ||
    hasPhrase(type, q, compactQuery);
  const strongSingleTermMatch =
    terms.length === 1 &&
    (titleTermHits > 0 || hasTerm(href, terms[0]) || hasTerm(type, terms[0]) || hasTerm(keywords, terms[0]));

  if (terms.length === 1 && !phraseMatched && !strongSingleTermMatch) return 0;
  if (terms.length > 1 && !phraseMatched && !allTermsMatched) return 0;

  if (allTermsMatched) score += 180;
  if (titleTermHits === terms.length) score += 220;

  return score;
};

const staticItems: SearchItem[] = [
  { title: "Home", description: "University overview, admissions highlights, campus, schools, and student support.", href: "/", type: "Page", keywords: "home Stmarys University admissions campus" },
  { title: "About", description: "Institutional profile, leadership, journey, and university context.", href: "/about", type: "Page", keywords: "about leadership university profile" },
  { title: "Admissions", description: "UG, PG, diploma, and doctoral admissions guidance.", href: "/admissions", type: "Admissions", keywords: "admission apply eligibility fee scholarship" },
  { title: "Ph.D. Admissions", description: "Doctoral admissions status, notices, research routes, and next-cycle support.", href: "/phd-admissions", type: "Admissions", keywords: "phd doctoral research entrance" },
  { title: "Schools", description: "Academic schools, departments, and programme pathways.", href: "/schools", type: "Academics", keywords: "schools departments programmes courses" },
  { title: "Departments", description: "Department directory across schools and academic units.", href: "/departments", type: "Academics", keywords: "department directory academic units" },
  { title: "Campus 360", description: "Campus tour, facilities, hostel, and student environment.", href: "/campus-360", type: "Campus", keywords: "campus tour hostel facilities" },
  { title: "Contact", description: "Official phone, email, location, and admissions helpdesk details.", href: "/contact", type: "Contact", keywords: "contact phone email address helpdesk" },
  { title: "School of Law", description: "Law programmes, moot court, legal aid, research, integrated LL.B. and 3-year LL.B. pathways.", href: "/law", type: "School", keywords: "law llb integrated moot court legal aid" },
  { title: "School of Law - Academic Route", description: "School of Law academic directory route under schools.", href: "/schools/law", type: "School", keywords: "school law legal studies" }
];

function buildSearchItems(): SearchItem[] {
  const schoolItems = (schools || []).flatMap((school) => {
    const schoolSlug = safeSlug(school.slug, school.name);
    const schoolHref = `/schools/${schoolSlug}`;
    const schoolItem: SearchItem = {
      title: school.name || "School",
      description: school.about || "Explore this school and its programmes.",
      href: schoolHref,
      type: "School",
      keywords: `${school.name || ""} ${school.short || ""} ${school.about || ""}`
    };

    const departmentItems = (school.departments || []).flatMap((department) => {
      const deptSlug = safeSlug(department.slug, department.name);
      const deptHref = `${schoolHref}/${deptSlug}`;
      const deptItem: SearchItem = {
        title: department.name || "Department",
        description: department.about || `${school.name || "School"} department page.`,
        href: deptHref,
        type: "Department",
        keywords: `${school.name || ""} ${department.name || ""} ${department.about || ""}`
      };
      const programmeItems: SearchItem[] = (department.programs || []).map((program) => ({
        title: program.name || "Program",
        description: program.overview || `${department.name || "Department"} programme under ${school.name || "Stmarys University"}.`,
        href: `${deptHref}/${safeSlug(program.slug, program.name)}`,
        type: "Programme",
        keywords: `${school.name || ""} ${department.name || ""} ${program.name || ""} ${program.level || ""} ${program.eligibility || ""} ${program.duration || ""}`
      }));
      return [deptItem, ...programmeItems];
    });

    return [schoolItem, ...departmentItems];
  });

  const lawProgrammeItems: SearchItem[] = lawProgrammes.map((program) => ({
    title: program.name,
    description: `${program.level} law programme. Duration: ${program.duration}. Eligibility: ${program.eligibility}.`,
    href: `/schools/law/legal-studies/${program.slug}`,
    type: "Law Programme",
    keywords: `${program.name} ${program.level} ${program.duration} ${program.eligibility} school of law llb integrated`
  }));

  const lawSupportItems: SearchItem[] = [
    ...lawHighlights.map((title) => ({ title, description: "School of Law academic and professional learning feature.", href: "/law#programmes", type: "Law", keywords: `school of law ${title}` })),
    ...lawFacilities.map((item) => ({ title: item.title, description: item.description, href: "/law#facilities", type: "Facility", keywords: `law facility ${item.title} ${item.description}` })),
    ...lawCareerPaths.map((title) => ({ title, description: "Career path connected with law programmes.", href: "/law#careers", type: "Career", keywords: `law career ${title}` }))
  ];

  const infoItems: SearchItem[] = INFO_PAGES.map((page) => ({
    title: page.title,
    description: page.description || page.intro,
    href: `/${page.slug}`,
    type: page.pageType === "trust" ? "Disclosure" : page.pageType === "local" ? "Location" : "Information",
    keywords: `${page.title} ${page.eyebrow} ${(page.keywords || []).join(" ")}`
  }));

  const officialDocumentItems: SearchItem[] = OFFICIAL_DOCUMENT_LIST.filter((document) => document.href).map((document) => ({
    title: document.title,
    description: `${document.description} Status: ${document.status}. Owner: ${document.ownerDepartment}.`,
    href: document.href!,
    type: "Official Document",
    keywords: `${document.title} ${document.label} ${document.category} ${document.authority} ${document.status} ${document.ownerDepartment}`
  }));

  return [...staticItems, ...schoolItems, ...lawProgrammeItems, ...lawSupportItems, ...infoItems, ...officialDocumentItems];
}

export default function SiteSearchClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const items = useMemo(buildSearchItems, []);
  const results = useMemo(() => {
    if (!normalize(query)) return items.slice(0, 18);
    const variants = queryVariants(query);
    return items
      .map((item) => {
        const score = Math.max(...variants.map((variant) => scoreSearchItem(item, variant)));
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 24)
      .map(({ item }) => item);
  }, [items, query]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#fbfdff_100%)] pt-[120px] lg:pt-[136px] pb-16">
      <section className="px-4">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#dce7f3] bg-white px-6 py-10 shadow-[0_24px_44px_rgba(13,49,92,0.08)] md:px-12">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">Site Search</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-6xl">Search Stmarys University</h2>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 md:text-lg">
            Search schools, programmes, admissions information, official documents, campus resources, and public disclosure pages.
          </p>
          <label className="mt-8 block">
            <span className="sr-only">Search website</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search schools, programmes, admissions, law, official documents, contact..."
              className="w-full rounded-2xl border border-[#cddbea] bg-[#f8fbff] px-5 py-4 text-base font-semibold text-[#0d315c] outline-none ring-[#019e6e]/20 transition focus:border-[#019e6e] focus:ring-4"
              autoFocus
            />
          </label>
        </div>
      </section>

      <section className="px-4 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-500">{results.length} result{results.length === 1 ? "" : "s"}</p>
            {query && <button onClick={() => setQuery("")} className="text-xs font-black uppercase tracking-[0.16em] text-[#019e6e]">Clear</button>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((item) => (
              <Link key={`${item.href}-${item.title}`} href={item.href} className="group rounded-3xl border border-[#dce7f3] bg-white p-5 shadow-[0_14px_32px_rgba(13,49,92,0.06)] transition hover:-translate-y-1 hover:border-[#019e6e] hover:shadow-[0_20px_42px_rgba(13,49,92,0.10)]">
                <span className="inline-flex rounded-full bg-[#e9f8f2] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#019e6e]">{item.type}</span>
                <h2 className="mt-4 text-xl font-black text-[#0d315c] group-hover:text-[#019e6e]">{item.title}</h2>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{item.description}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#0d315c]/50">Open page →</p>
              </Link>
            ))}
          </div>
          {results.length === 0 && (
            <div className="rounded-3xl border border-[#dce7f3] bg-white p-8 text-center shadow-[0_14px_32px_rgba(13,49,92,0.06)]">
              <h2 className="text-2xl font-black text-[#0d315c]">No matching page found</h2>
              <p className="mt-3 text-sm font-medium text-slate-600">Try programme names, department names, admissions, law, hostel, fee, contact, or disclosure keywords.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
