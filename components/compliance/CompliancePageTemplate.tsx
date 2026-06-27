import Link from "next/link";
import type { CompliancePage } from "../../data/compliance-pages";
import JsonLd from "../seo/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "../../lib/schema";

const faqItemsFor = (page: CompliancePage) =>
  page.faqTopics.map((topic) => ({
    question: `How is ${topic} handled?`,
    answer: `${topic} is handled through official St.Marys University disclosure status, evidence links or contact routes. Unsupported public claims should not be made.`,
  }));

const sectionsFor = (page: CompliancePage) => [
  {
    heading: "Verification Guidance",
    paragraphs: [
      `${page.title} should be read as a public verification page, not as a promotional claim.`,
      "Use the status, owner office, review dates and evidence links on this page before relying on any disclosure-related statement.",
    ],
  },
  {
    heading: "Evidence Handling",
    paragraphs: [
      "Published documents can be cited only for the exact claim they support.",
      `Source document needed: ${page.sourceDocumentNeeded}`,
      "Programme approvals, rankings, placement outcomes, accreditation outcomes, committee names and officer details must remain unpublished unless official evidence is available.",
    ],
  },
  {
    heading: "Public Update Route",
    paragraphs: [
      `The current owner office for this disclosure item is ${page.ownerOffice}.`,
      "When details are not public, students and parents should use the official contact route instead of relying on third-party summaries.",
    ],
  },
];

export default function CompliancePageTemplate({ page }: { page: CompliancePage }) {
  const path = `/${page.section}/${page.slug}`;
  const faqItems = faqItemsFor(page);
  const sections = sectionsFor(page);
  const canEmitFaqSchema = page.schemaMode === "verified-public-facts";
  return (
    <>
      <JsonLd
        id={`${page.section}-${page.slug}-breadcrumb-schema`}
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.title, path },
        ])}
      />
      <JsonLd id={`${page.section}-${page.slug}-page-schema`} data={buildWebPageSchema({ title: page.title, description: page.description, path })} />
      {canEmitFaqSchema ? <JsonLd id={`${page.section}-${page.slug}-faq-schema`} data={buildFaqSchema(faqItems)} /> : null}
      <main className="bg-[#f7fafc] px-4 py-12 text-slate-800 md:py-16">
        <article className="mx-auto max-w-5xl">
          <section className="border border-slate-200 bg-white p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#019e6e]">Official Disclosure Layer</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#0d315c] md:text-5xl">{page.h1}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">{page.description}</p>
          </section>

          <section className="mt-6 border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Direct Answer</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{page.directAnswer}</p>
          </section>

          <section className="mt-6 space-y-6">
            {sections.map((section) => (
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

          <section className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Status</h2>
              <dl className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                <div><dt className="font-black text-slate-500">Status</dt><dd>{page.status}</dd></div>
                <div><dt className="font-black text-slate-500">Owner office</dt><dd>{page.ownerOffice}</dd></div>
                <div><dt className="font-black text-slate-500">Source document needed</dt><dd>{page.sourceDocumentNeeded}</dd></div>
                <div><dt className="font-black text-slate-500">Last updated</dt><dd>{page.lastUpdated}</dd></div>
                <div><dt className="font-black text-slate-500">Last reviewed</dt><dd>{page.lastReviewed}</dd></div>
                <div><dt className="font-black text-slate-500">Next review</dt><dd>{page.nextReviewDue}</dd></div>
              </dl>
            </div>
            <div className="border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Evidence Links</h2>
              <div className="mt-4 space-y-3">
                {page.evidenceLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block border border-slate-100 bg-slate-50 p-4 text-sm font-black text-[#0d315c] hover:bg-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 border border-[#e9e1d1] bg-[#fff8ec] p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#8a5a16]">Claim Handling Note</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#8a5a16]">{page.disclosureNote}</p>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#8a5a16]">{page.disclaimer}</p>
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
        </article>
      </main>
    </>
  );
}
