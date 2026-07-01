"use client";

import Link from "next/link";
import { getSeoAuthorityPageByPath } from "@/lib/seo/authority-map";

type AnswerItem = {
  question: string;
  answer: string;
};

type LinkItem = {
  href: string;
  label: string;
  description: string;
};

const officialSectionClip = "[clip-path:polygon(0_0,calc(100%-18px)_0,100%_14px,100%_100%,16px_100%,0_calc(100%-14px))] md:[clip-path:polygon(0_0,calc(100%-30px)_0,100%_24px,100%_100%,28px_100%,0_calc(100%-24px))]";
const officialCardClip = "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))] md:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_14px,100%_100%,18px_100%,0_calc(100%-14px))]";
const officialTileClip = "[clip-path:polygon(0_0,calc(100%-8px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%-6px))] md:[clip-path:polygon(0_0,calc(100%-14px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-10px))]";

const normalizeInternalPath = (href: string) => {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  const [path, suffix = ""] = href.split(/(?=[?#])/);
  const normalizedPath = path.replace(/\/+$/, "") || "/";
  return `${normalizedPath}${suffix}`;
};

const resolveAuthorityHref = (href: string) => {
  const normalized = normalizeInternalPath(href);
  const authorityPage = getSeoAuthorityPageByPath(normalized);
  return authorityPage?.path || href;
};

const formatRichText = (text: string) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className="font-black text-[#0d315c]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  ));
};

export function AnswerGridSection({
  title,
  items,
}: {
  title: string;
  items: AnswerItem[];
}) {
  if (!items.length) return null;

  return (
    <section className={`border border-[#e2eaf3] bg-gradient-to-br from-[#f8fbff] to-[#f0f7ff] p-6 md:p-8 ${officialSectionClip}`}>
      <div className="mb-6 w-fit">
        <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">{title}</h2>
        <div className="mt-2 h-1.5 w-full cut-corner-underline bg-[#ffaf3a]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.question} className={`border border-white/60 bg-white p-5 shadow-[0_4px_20px_rgba(13,49,92,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(13,49,92,0.08)] ${officialCardClip}`}>
            <h3 className="text-base font-black text-[#0d315c]">{item.question}</h3>
            <div className="mt-3 text-sm font-medium leading-7 text-slate-600">
              {formatRichText(item.answer)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: AnswerItem[];
}) {
  if (!items.length) return null;

  return (
    <section className={`border border-[#e9e1d1] bg-gradient-to-br from-[#fffdfa] to-[#fcf5e8] p-6 md:p-8 ${officialSectionClip}`}>
      <div className="mb-6 w-fit">
        <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">{title}</h2>
        <div className="mt-2 h-1.5 w-full cut-corner-underline bg-[#e39a2c]" />
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.question} className={`border border-[#f4ebdb] bg-white p-5 shadow-[0_4px_12px_rgba(227,154,44,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(227,154,44,0.06)] ${officialTileClip}`}>
            <h3 className="text-base font-black text-[#0d315c]">{item.question}</h3>
            <div className="mt-3 text-sm font-medium leading-7 text-slate-600">
              {formatRichText(item.answer)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LinkGridSection({
  title,
  items,
}: {
  title: string;
  items: LinkItem[];
}) {
  if (!items.length) return null;

  return (
    <section className={`border border-[#e2eaf3] bg-[radial-gradient(circle_at_100%_100%,#f8fbff_0%,#ffffff_100%)] p-6 md:p-8 shadow-[0_18px_32px_rgba(13,49,92,0.06)] ${officialSectionClip}`}>
      <div className="mb-6 w-fit">
        <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">{title}</h2>
        <div className="mt-2 h-1.5 w-full cut-corner-underline bg-[#019e6e]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const href = resolveAuthorityHref(item.href);
          return (
            <Link
              key={`${href}-${item.label}`}
              href={href}
              className={`border border-[#dce7f3] bg-[#f8fbff] p-5 transition-all hover:-translate-y-0.5 hover:border-[#019e6e] hover:bg-white ${officialCardClip}`}
            >
              <h3 className="text-base font-black text-[#0d315c]">{item.label}</h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{item.description}</p>
              <span className="mt-4 inline-flex text-[11px] font-black uppercase tracking-[0.2em] text-[#017552]">Open Page</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function VerificationSection({
  items,
}: {
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <section className={`border border-[#e9e1d1] bg-gradient-to-br from-[#fdfbf7] to-[#f9f4ea] p-6 md:p-8 ${officialSectionClip}`}>
      <div className="mb-4 w-fit">
        <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#0d315c]">Manual Verification Needed</h2>
        <div className="mt-2 h-1.5 w-full cut-corner-underline bg-[#ffaf3a]" />
      </div>
      <ul className="space-y-3 text-sm font-medium leading-7 text-slate-600">
        {items.map((item) => (
          <li key={item} className={`border border-[#f4ebdb] bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md ${officialTileClip}`}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
