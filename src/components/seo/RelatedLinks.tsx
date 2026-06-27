"use client";

import Link from "next/link";

export type RelatedLinkItem = {
  href: string;
  label: string;
  description: string;
};

type RelatedLinksProps = {
  title?: string;
  intro?: string;
  links: RelatedLinkItem[];
  className?: string;
};

export default function RelatedLinks({
  title = "Related Links",
  intro,
  links,
  className = "",
}: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className={`bg-white px-4 py-12 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-[13px] font-black uppercase tracking-[0.24em] text-[#0d315c]">{title}</h2>
          {intro && <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{intro}</p>}
        </div>
        <nav aria-label={title}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`} className="min-w-0">
                <Link
                  href={link.href}
                  className="block h-full border border-[#dce7f3] bg-[#f8fbff] p-5 transition-all hover:-translate-y-0.5 hover:border-[#019e6e] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#019e6e] focus-visible:ring-offset-2"
                >
                  <span className="block text-sm font-black leading-6 text-[#0d315c]">{link.label}</span>
                  <span className="mt-2 block text-xs font-medium leading-6 text-slate-600">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
