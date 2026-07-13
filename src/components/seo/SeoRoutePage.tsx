import Link from "next/link";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import type { SeoPage } from "../../../data/seo-pages";

const faqItemsFor = (page: SeoPage) =>
  page.faqTopics.map((topic) => ({
    question: `What should I know about ${topic}?`,
    answer: `${topic} should be verified through official St.Mary's University links before applying or relying on the claim.`,
  }));

export default function SeoRoutePage({ page }: { page: SeoPage }) {
  const faqItems = faqItemsFor(page);
  const keywords = [page.keyword, page.bucket, page.intent, page.pageType];

  return (
    <>
      <StructuredData
        id={`${page.slug}-breadcrumb-schema`}
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.h1, path: page.path },
        ])}
      />
      <StructuredData
        id={`${page.slug}-page-schema`}
        data={buildWebPageSchema({
          title: page.title,
          description: page.description,
          pathname: page.path,
          type: "WebPage",
          keywords,
        })}
      />
      <StructuredData id={`${page.slug}-faq-schema`} data={faqItems.length ? buildFaqSchema(faqItems) : null} />

      <main className="min-h-screen bg-[#f8fafc] pt-[120px] pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <section className="border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#019e6e]">{page.bucket}</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#0d315c] md:text-5xl">{page.h1}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">{page.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-slate-600">
                Intent: {page.intent}
              </span>
              <span className="border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-amber-900">
                Risk: {page.risk}
              </span>
            </div>
          </section>

          <section className="mt-6 border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">Direct Answer</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{page.directAnswer}</p>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {page.keyFacts.map((fact) => (
              <div key={fact.label} className="border border-slate-200 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">{fact.label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#0d315c]">{fact.value}</p>
              </div>
            ))}
          </section>

          <section className="mt-6 space-y-6">
            {page.sections.map((section) => (
              <section key={section.heading} className="border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#0d315c]">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm font-semibold leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
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
              {page.internalLinks.map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="border border-slate-100 bg-slate-50 p-4 text-sm font-black text-[#0d315c] hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-6 border border-[#e9e1d1] bg-[#fff8ec] p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#8a5a16]">Claim Handling</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#8a5a16]">{page.claimHandlingNote}</p>
            <p className="mt-4 text-sm font-black text-[#0d315c]">{page.cta}</p>
          </section>
        </div>
      </main>
    </>
  );
}
