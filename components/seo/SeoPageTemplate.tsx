import Link from "next/link";
import type { SeoPage } from "../../data/seo-pages";
import { OFFICIAL_COURSE_BY_SLUG } from "../../data/course-seo";
import JsonLd from "./JsonLd";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildCourseSchema,
  buildFaqSchema,
  buildPlaceSchema,
  buildWebPageSchema,
} from "../../lib/schema";

const riskClass = {
  Low: "border-emerald-200 bg-emerald-50 text-emerald-900",
  Medium: "border-amber-200 bg-amber-50 text-amber-900",
  High: "border-red-200 bg-red-50 text-red-900",
};

const buildFaqItems = (page: SeoPage) =>
  page.faqTopics.map((topic) => ({
    question: `What should I know about ${topic}?`,
    answer:
      page.risk === "High"
        ? `${topic} should be verified through official St.Marys University contact or published evidence before relying on it.`
        : `${topic} should be checked through the official St.Marys University route linked on this page.`,
  }));

const schemaItemsFor = (page: SeoPage) => {
  const faqItems = buildFaqItems(page);
  const course = page.officialCourseSlug ? OFFICIAL_COURSE_BY_SLUG.get(page.officialCourseSlug) : undefined;
  return [
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.title, path: page.path },
    ]),
    page.schema.includes("Article")
      ? buildArticleSchema({ title: page.title, description: page.description, path: page.path })
      : buildWebPageSchema({ title: page.title, description: page.description, path: page.path }),
    buildFaqSchema(faqItems),
    page.schema.includes("Place") ? buildPlaceSchema({ title: page.title, description: page.description, path: page.path }) : null,
    page.schema.includes("Course") && course ? buildCourseSchema(course) : null,
  ].filter(Boolean) as Record<string, unknown>[];
};

export default function SeoPageTemplate({ page }: { page: SeoPage }) {
  const faqItems = buildFaqItems(page);
  const schemas = schemaItemsFor(page);
  const isPatientPage = page.bucket.startsWith("I.");

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} id={`${page.slug}-schema-${index}`} data={schema} />
      ))}
      <main className="bg-[#f7fafc] px-4 py-12 text-slate-800 md:py-16">
        <article className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            <Link href="/" className="hover:text-[#0d315c]">Home</Link>
            <span className="mx-2">/</span>
            <span>{page.pageType}</span>
          </nav>

          <section className="border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#019e6e]">{page.bucket}</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#0d315c] md:text-5xl">{page.h1}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">{page.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`border px-3 py-1 text-xs font-black uppercase tracking-widest ${riskClass[page.risk]}`}>
                Risk: {page.risk}
              </span>
              <span className="border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-slate-600">
                Intent: {page.intent}
              </span>
            </div>
          </section>

          <section className="mt-6 border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Direct Answer</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{page.directAnswer}</p>
            {isPatientPage && (
              <p className="mt-4 border border-red-100 bg-red-50 p-4 text-sm font-bold leading-7 text-red-900">
                This page is not for emergency care, diagnosis or treatment advice. For urgent medical needs, contact local emergency services or a licensed hospital immediately.
              </p>
            )}
            {page.requiresManualApproval && (
              <p className="mt-4 border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-950">
                {page.claimDisclaimer}
              </p>
            )}
          </section>

          <section className="mt-6 space-y-6">
            {page.sections.map((section) => (
              <section key={section.heading} className="border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm font-semibold leading-7 text-slate-600">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </section>

          <section className="mt-6 border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Claim Handling</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{page.claimHandlingNote}</p>
          </section>

          <section className="mt-6 overflow-hidden border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-6 md:p-8">
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Key Facts</h2>
            </div>
            <table className="w-full text-left text-sm">
              <tbody>
                {page.keyFacts.map((fact) => (
                  <tr key={fact.label} className="border-b border-slate-100 last:border-b-0">
                    <th className="w-1/3 bg-slate-50 px-5 py-4 font-black text-slate-600">{fact.label}</th>
                    <td className="px-5 py-4 font-semibold leading-6 text-slate-600">{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-6 border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="border border-slate-100 bg-slate-50 p-4">
                  <h3 className="font-black text-[#0d315c]">{item.question}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Official Links</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {page.internalLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="border border-slate-100 bg-slate-50 p-4 text-sm font-black text-[#0d315c] hover:bg-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-6 border border-[#e9e1d1] bg-[#fff8ec] p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#8a5a16]">UGC / NAAC Note</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#8a5a16]">{page.ugcNaacNote}</p>
            <p className="mt-4 text-sm font-black text-[#0d315c]">{page.cta}</p>
          </section>
        </article>
      </main>
    </>
  );
}
