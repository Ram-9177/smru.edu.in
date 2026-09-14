import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export type IntlBlock =
  | { type: "prose"; heading?: string; paragraphs: string[] }
  | { type: "list"; heading: string; items: string[] }
  | { type: "table"; heading: string; columns: string[]; rows: string[][]; note?: string }
  | { type: "callout"; tone: "info" | "notice"; heading?: string; text: string };

export type IntlFaq = { question: string; answer: string };
export type IntlLink = { href: string; label: string; description?: string };

export default function InternationalPage({
  eyebrow,
  title,
  intro,
  blocks,
  faqs = [],
  relatedLinks = [],
}: {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: IntlBlock[];
  faqs?: IntlFaq[];
  relatedLinks?: IntlLink[];
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#f9fbff_100%)] pt-[120px] lg:pt-[136px] pb-20">
      <section className="px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-5xl">{title}</h1>
          <div className="mt-5 h-1.5 w-20 rounded-full bg-[#ffaf3a]" />
          {/* Answer-first passage. */}
          <p className="mt-8 text-lg font-medium leading-8 text-slate-700">{intro}</p>

          <div className="mt-12 space-y-10">
            {blocks.map((block, index) => {
              if (block.type === "prose") {
                return (
                  <div key={index}>
                    {block.heading && <h2 className="text-2xl font-black text-[#0d315c]">{block.heading}</h2>}
                    <div className="mt-4 space-y-3 text-base leading-7 text-slate-700">
                      {block.paragraphs.map((paragraph, p) => (
                        <p key={p}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                );
              }
              if (block.type === "list") {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-black text-[#0d315c]">{block.heading}</h2>
                    <ul className="mt-4 space-y-2">
                      {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-base leading-7 text-slate-700">
                          <FaCheckCircle className="mt-1.5 shrink-0 text-[#019e6e]" size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (block.type === "table") {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-black text-[#0d315c]">{block.heading}</h2>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                        <thead>
                          <tr className="bg-[#0d315c] text-white">
                            {block.columns.map((column) => (
                              <th key={column} className="px-4 py-3 font-bold">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, r) => (
                            <tr key={r} className="border-b border-[#e3edf8] bg-white">
                              {row.map((cell, c) => (
                                <td key={c} className="px-4 py-3 text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {block.note && <p className="mt-2 text-sm italic text-slate-500">{block.note}</p>}
                  </div>
                );
              }
              // callout
              return (
                <div
                  key={index}
                  className={`rounded-xl border-l-4 p-5 ${block.tone === "notice" ? "border-[#ffaf3a] bg-[#fff7ea]" : "border-[#019e6e] bg-[#f0fdf4]"}`}
                >
                  {block.heading && <p className="font-black text-[#0d315c]">{block.heading}</p>}
                  <p className="mt-1 text-sm leading-7 text-slate-700">{block.text}</p>
                </div>
              );
            })}
          </div>

          {faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-black text-[#0d315c]">Frequently asked questions</h2>
              <div className="mt-6 space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-[#dce7f3] bg-white px-6 py-5">
                    <h3 className="text-base font-black text-[#0d315c]">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedLinks.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-black text-[#0d315c]">Related pages</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-[#dce7f3] bg-white px-5 py-4 transition hover:border-[#019e6e]"
                  >
                    <span className="flex items-center justify-between text-sm font-bold text-[#0d315c]">
                      {link.label} <FaArrowRight size={11} className="text-[#019e6e]" />
                    </span>
                    {link.description && <span className="mt-1 block text-xs text-slate-500">{link.description}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
