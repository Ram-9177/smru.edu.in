import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "HTML Sitemap",
  description: "Browse the main academic, admissions, campus, governance, and support pages on the Stmarys University website.",
  pathname: "/html-sitemap",
});

const sections = [
  {
    title: "University",
    links: [
      ["/", "Home"],
      ["/about", "About"],
      ["/leadership/all", "Leadership"],
      ["/approvals-recognitions", "Approvals & Recognitions"],
      ["/contact", "Contact"],
    ],
  },
  {
    title: "Academics",
    links: [
      ["/schools", "Schools & Programmes"],
      ["/academic-structure", "Academic Structure"],
      ["/departments", "Departments"],
      ["/law", "School of Law"],
    ],
  },
  {
    title: "Admissions",
    links: [
      ["/admissions", "Admissions"],
      ["/phd-admissions", "Ph.D. Admissions"],
      ["/exam-notification", "Exam Notification"],
      ["/brochure", "Brochure"],
    ],
  },
  {
    title: "Campus & Support",
    links: [
      ["/campus-guide", "Campus Guide"],
      ["/campus-360", "Campus 360"],
      ["/events", "Events"],
      ["/careers", "Careers"],
      ["/search", "Search"],
    ],
  },
] as const;

export default function HtmlSitemapPage() {
  return (
    <main className="bg-[#f7fbff] py-16 md:py-24">
      <div className="smru-container">
        <h1 className="text-4xl font-black tracking-tight text-[#0d315c] md:text-6xl">HTML Sitemap</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Browse the primary public sections of the Stmarys University website.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="cut-corner-panel border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-black text-[#0d315c]">{section.title}</h2>
              <ul className="mt-5 space-y-3">
                {section.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="font-semibold text-slate-600 transition-colors hover:text-[#019e6e]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
