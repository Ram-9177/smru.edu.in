import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/metadata";

type RedirectFallbackProps = {
  targetUrl?: string;
  title?: string;
  description?: string;
  linkLabel?: string;
};

export const buildRedirectMetadata = (targetUrl = "/law/", description = "This page has moved."): Metadata => ({
  title: "Page Moved | Stmarys University",
  description,
  robots: "noindex,follow",
  alternates: {
    canonical: absoluteUrl(targetUrl),
  },
});

export const metadata: Metadata = buildRedirectMetadata("/law/", "This page has moved to the School of Law page.");

export default function RedirectPage({
  targetUrl = "/law/",
  title = "Page Has Moved",
  description = "The content you are looking for has been moved to the current official page.",
  linkLabel = "Go to Current Page",
}: RedirectFallbackProps) {
  const safeTargetUrl = targetUrl.startsWith("/") ? targetUrl : "/law/";

  const redirectScript = `
    window.location.replace(${JSON.stringify(safeTargetUrl)});
  `;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="cut-corner-panel w-full max-w-xl border border-slate-200 bg-white p-10 text-center shadow-xl md:p-16">
        <div className="mb-8">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-4 text-2xl font-black uppercase tracking-tight text-[#0d315c] md:text-3xl">{title}</h1>
          <p className="font-medium leading-relaxed text-slate-600">{description}</p>
        </div>

        <div className="space-y-6">
          <Link
            href={safeTargetUrl}
            replace
            className="cut-corner-badge inline-flex items-center justify-center bg-[#0d315c] px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#019e6e]"
          >
            {linkLabel}
          </Link>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Redirecting automatically...
          </p>
        </div>

        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <meta httpEquiv="refresh" content={`0;url=${safeTargetUrl}`} />
      </div>
    </main>
  );
};
