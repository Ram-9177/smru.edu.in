import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Stmarys University",
  description: "The page you are looking for does not exist.",
  robots: "noindex,follow",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#019e6e] mb-3">Error 404</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist or has been moved. Please use the links below to navigate.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0d315c] hover:bg-[#019e6e] text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Go to Home
          </Link>
          <Link href="/schools" className="inline-flex items-center gap-2 border border-[#0d315c] text-[#0d315c] font-semibold py-3 px-6 rounded-lg transition duration-200 hover:bg-[#eef6ff]">
            Browse Schools
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-[#0d315c] text-[#0d315c] font-semibold py-3 px-6 rounded-lg transition duration-200 hover:bg-[#eef6ff]">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
