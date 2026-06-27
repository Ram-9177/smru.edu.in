import Link from "next/link";
import StructuredData from "@/components/seo/StructuredData";
import {
  AnswerGridSection,
  FaqSection,
  LinkGridSection,
  VerificationSection,
} from "@/components/seo/PageSections";
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildFaqSchema,
  buildPlaceSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { STATUS_DESCRIPTIONS } from "@/lib/shared/official-documents";
import type { InfoPageConfig } from "@/lib/seo/info-pages";
import { UNIVERSITY_INFO } from "@/lib/shared/university";

const displayDate = (value?: string) => value || "Maintained by university office";
const displayStatus = (status = "") => {
  if (status === "Under Process") return "Official Publication Workflow";
  if (status === "Awaiting Public Release") return "University Verification";
  if (status === "Available on Official Request") return "Official Office Confirmation";
  if (status === "Not Applicable - First Academic Year") return "First University-Cycle Tracking";
  return status;
};

export default function InformationPage({ config }: { config: InfoPageConfig }) {
  const pathname = `/${config.slug}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: config.title, path: pathname },
  ];

  const isLocationPage = config.pageType === "local";
  const officialHeroClip = "cut-corner-hero";
  const officialBadgeClip = "cut-corner-badge";
  const officialPanelClip = "cut-corner-panel";
  const pageSchema = buildWebPageSchema({
    title: config.title,
    description: config.description,
    pathname,
    type: isLocationPage ? "AboutPage" : "WebPage",
  });

  return (
    <>
      <StructuredData id={`${config.slug}-breadcrumb-schema`} data={buildBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData id={`${config.slug}-page-schema`} data={pageSchema} />
      <StructuredData
        id={`${config.slug}-faq-schema`}
        data={config.faqItems.length ? buildFaqSchema(config.faqItems) : null}
      />
      <StructuredData
        id={`${config.slug}-contact-schema`}
        data={config.slug === "contact-directory" ? buildContactPageSchema(pathname) : null}
      />
      <StructuredData
        id={`${config.slug}-place-schema`}
        data={isLocationPage ? buildPlaceSchema({ title: config.title, description: config.description, pathname }) : null}
      />

      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_0%,#0fa571_0%,#019e6e_50%,#01724f_100%)]" />
      <div className="min-h-screen pt-8 md:pt-12 pb-16">
        <section className="px-4">
          <div
            className={`relative mx-auto max-w-6xl border border-[#dce7f3] bg-white px-6 py-12 shadow-[0_24px_56px_rgba(13,49,92,0.1)] md:px-12 ${officialHeroClip} overflow-hidden`}
          >
            {/* Subtle premium accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#019e6e]/5 to-transparent rounded-full -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#ffaf3a]/5 to-transparent rounded-full -ml-24 -mb-24 pointer-events-none" />
            
            <div className="relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
              <Link href="/" className="transition-colors hover:text-[#019e6e]">Home</Link>
              <span>/</span>
              <span className="text-[#0d315c]">{config.title}</span>
            </nav>

            <div className={`mb-8 inline-flex items-center gap-3 border border-slate-300 bg-gradient-to-r from-slate-50 to-white px-4 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.08)] ${officialBadgeClip}`}>
              <div className="h-11 w-11 overflow-hidden border border-slate-300 bg-white p-1.5 [clip-path:polygon(0_0,100%_0,100%_78%,78%_100%,0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_76%,76%_100%,0_100%)]">
                <img
                  src="/favicon.png"
                  alt="Stmarys University official mark"
                  className="h-full w-full object-contain p-1.5 grayscale contrast-125"
                />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Official University Page</p>
                <p className="mt-1 text-xs font-black text-slate-700">Stmarys University</p>
              </div>
            </div>

            <div className="max-w-4xl">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">{config.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-6xl">
                {config.title}
              </h1>
              <div className="mt-5 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a]" />
              <div className="mt-6 space-y-4 text-base font-medium leading-8 text-slate-600 md:text-lg">
                {config.intro.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:flex-wrap">
                <p className="inline-flex cut-corner-badge border border-[#dce7f3] bg-[#f8fbff] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Last reviewed: {displayDate(config.lastReviewed)}
                </p>
                {config.ownerDepartment && (
                  <p className="inline-flex cut-corner-badge border border-[#dce7f3] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Owner: {config.ownerDepartment}
                  </p>
                )}
                {config.status && (
                  <p className="inline-flex cut-corner-badge border border-[#006b4a]/30 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c]">
                    Status: {displayStatus(config.status)}
                  </p>
                )}
                {config.nextReviewDue && (
                  <p className="inline-flex cut-corner-badge border border-[#e9e1d1] bg-[#fff8ec] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#8a5a16]">
                    Next review: {config.nextReviewDue}
                  </p>
                )}
                {config.statusNote && (
                  <p className="inline-flex cut-corner-badge border border-[#e3f2fd] bg-[#e3f2fd]/30 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c]">
                    {config.statusNote.split('\n\n')[0]}
                  </p>
                )}
              </div>
              {config.statusNote && config.statusNote.split('\n\n')[1] && (
                <p className="mt-4 text-[11px] font-bold italic text-slate-400">
                  Note: {config.statusNote.split('\n\n')[1]}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

        <section className="px-4 pt-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <AnswerGridSection title="Quick Answers" items={config.answers} />

            {config.documents && (
              <section
                className={`border border-[#dce7f3] bg-white p-6 md:p-8 shadow-[0_18px_32px_rgba(13,49,92,0.06)] ${
                  officialPanelClip
                }`}
              >
                <div className="mb-6 w-fit">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">Official Documents & Status</h2>
                  <div className="mt-2 h-1.5 w-full cut-corner-underline bg-[#ffaf3a]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {config.documents.map((doc, i) => (
                    <div
                      key={i}
                      className={`flex flex-col border border-slate-50 bg-[#f8fbff] p-5 cut-corner-card`}
                    >
                      <h3 className="text-sm font-black text-[#0d315c]">{doc.title}</h3>
                      <p className="mt-2 text-xs font-bold leading-6 text-slate-500">{doc.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span
                          className={`inline-flex border border-slate-300 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-700 ${
                            officialBadgeClip
                          }`}
                        >
                          {displayStatus(doc.status)}
                        </span>
                        {doc.href ? (
                          <Link href={doc.href} className="text-[10px] font-black uppercase tracking-widest text-[#019e6e] hover:underline">
                            View Document
                          </Link>
                        ) : (
                          <span className="text-[10px] font-bold italic text-slate-400">
                            Status Maintained
                          </span>
                        )}
                      </div>
                      <dl className="mt-4 grid gap-2 border-t border-slate-100 pt-4 text-[11px] font-bold leading-5 text-slate-500">
                        <div className="flex justify-between gap-3">
                          <dt className="uppercase tracking-widest text-slate-400">Authority</dt>
                          <dd className="text-right text-[#0d315c]">{doc.authority}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="uppercase tracking-widest text-slate-400">Owner</dt>
                          <dd className="text-right text-[#0d315c]">{doc.ownerDepartment}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="uppercase tracking-widest text-slate-400">Reviewed</dt>
                          <dd className="text-right text-[#0d315c]">{doc.lastReviewed}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-[11px] font-semibold leading-5 text-slate-500">
                        {doc.publicNote || STATUS_DESCRIPTIONS[doc.status]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {config.sections.map((section) => (
              <section
                key={section.heading}
                className={`border border-[#dce7f3] bg-white p-6 md:p-8 shadow-[0_18px_32px_rgba(13,49,92,0.06)] ${
                  officialPanelClip
                }`}
              >
                <div className="mb-6 w-fit">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">{section.heading}</h2>
                  <div className="mt-2 h-1.5 w-full cut-corner-underline bg-[#019e6e]" />
                </div>
                <div className="space-y-4 text-sm font-medium leading-8 text-slate-600 md:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {config.tables?.map((table) => (
              <section
                key={table.heading}
                className={`overflow-hidden border border-[#dce7f3] bg-white shadow-[0_18px_32px_rgba(13,49,92,0.06)] ${officialPanelClip}`}
              >
                <div className="border-b border-[#dce7f3] px-6 py-5 md:px-8">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">{table.heading}</h2>
                  {table.note && <p className="mt-2 text-xs font-bold leading-6 text-slate-500">{table.note}</p>}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse text-left">
                    <thead className="bg-[#0d315c] text-white">
                      <tr>
                        {table.columns.map((column) => (
                          <th key={column} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {table.rows.map((row, rowIndex) => (
                        <tr key={`${table.heading}-${rowIndex}`} className="odd:bg-white even:bg-[#f8fbff]">
                          {row.map((cell, cellIndex) => (
                            <td key={`${table.heading}-${rowIndex}-${cellIndex}`} className="px-5 py-4 text-sm font-medium leading-6 text-slate-600">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}

            {config.mapEmbedUrl && (
              <section
                className={`overflow-hidden border border-[#dce7f3] bg-white shadow-[0_18px_32px_rgba(13,49,92,0.06)] ${
                  officialPanelClip
                }`}
              >
                <div className="border-b border-[#dce7f3] px-6 py-5 md:px-8">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">Map Reference</h2>
                </div>
                <div className="h-[360px] w-full">
                  <iframe
                    title={`${UNIVERSITY_INFO.brandName} map`}
                    src={config.mapEmbedUrl}
                    loading="lazy"
                    className="h-full w-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            <LinkGridSection title="Related Links" items={config.relatedLinks} />
            <FaqSection title="Frequently Asked Questions" items={config.faqItems} />

            {config.footerDisclaimer && (
              <section
                className={`border border-slate-200 bg-slate-50/50 p-6 md:p-8 ${
                  officialPanelClip
                }`}
              >
                <p className="whitespace-pre-line text-sm font-bold leading-8 text-slate-500">
                  {config.footerDisclaimer}
                </p>
              </section>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
