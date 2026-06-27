import type { Metadata } from "next";
import InformationPage from "@/components/seo/InformationPage";
import { INFO_PAGE_MAP, INFO_PAGES } from "@/lib/seo/info-pages";
import { buildMetadata } from "@/lib/metadata";
import { SHOW_PUBLIC_INFO_PAGES } from "@/lib/seo/visibility";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return INFO_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!SHOW_PUBLIC_INFO_PAGES) {
    return buildMetadata({
      title: "Page Unavailable",
      description: "This page is currently unavailable.",
      pathname: `/${params.slug}`,
      robots: "noindex,follow",
    });
  }
  const config = INFO_PAGE_MAP.get(params.slug);
  if (!config) {
    return {
      title: "Page Not Found",
      robots: "noindex,follow",
    };
  }

  return buildMetadata({
    title: config.title,
    description: config.description,
    pathname: `/${config.slug}`,
    keywords: config.keywords || [],
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const config = INFO_PAGE_MAP.get(params.slug);
  if (!config) notFound();
  if (!SHOW_PUBLIC_INFO_PAGES) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#f9fbff_100%)] pt-[120px] lg:pt-[136px] pb-16">
        <section className="px-4">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-[#dce7f3] bg-white px-6 py-12 text-center shadow-[0_24px_44px_rgba(13,49,92,0.08)] md:px-12">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">Page Unavailable</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-6xl">Content Hidden</h1>
            <div className="mt-5 h-1.5 w-20 rounded-full bg-[#ffaf3a] mx-auto" />
            <p className="mt-6 text-base font-medium leading-8 text-slate-600 md:text-lg">
              This page is currently hidden from public view and will be published after official university confirmation.
            </p>
          </div>
        </section>
      </main>
    );
  }
  return <InformationPage config={config} />;
}
