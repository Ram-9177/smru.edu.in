import type { Metadata } from "next";
import Script from "next/script";
import LawLanding from "@/views/LawLanding";
import { buildMetadata } from "@/lib/metadata";
import { lawMetaDescription } from "@/data/law";

export const metadata: Metadata = buildMetadata({
  title: "School of Law Admissions | St.Mary's University",
  description: lawMetaDescription,
  pathname: "/landing/law",
  keywords: [
    "School of Law admissions",
    "Law brochure",
    "LLB admissions",
    "LLM admissions",
    "St.Mary's University law",
  ],
});

export default function Page() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18293956146"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18293956146');
          `,
        }}
      />
      <LawLanding />
    </>
  );
}
