import Link from "next/link";
import { getHtmlSitemapGroups } from "../../lib/seo/internal-links";

export default function HtmlSitemap() {
  const groups = getHtmlSitemapGroups();
  return (
    <main className="bg-[#f7fafc] px-4 py-12 text-slate-800 md:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="border border-slate-200 bg-white p-6 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#019e6e]">Index</p>
          <h1 className="mt-4 text-4xl font-black text-[#0d315c]">HTML Sitemap</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">
            This sitemap lists isolated SEO, guide, disclosure and patient-enquiry pages. Existing expert-written website content remains unchanged.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          {groups.map((group) => (
            <section key={group.bucket} className="border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#0d315c]">{group.bucket}</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {group.pages.map((page) => (
                  <Link key={page.href} href={page.href} className="border border-slate-100 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700 hover:bg-white">
                    {page.label}
                    <span className="mt-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Risk: {page.risk}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
