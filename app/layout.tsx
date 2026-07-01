import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../src/styles/globals.css";
import AppShell from "../src/components/AppShell";
import Preloader from "../src/components/Preloader";
import { absoluteUrl } from "../src/lib/metadata";
import { UNIVERSITY_INFO } from "../src/lib/shared/university";
import { SITE_IDENTITY } from "../src/lib/seo/site";

import { buildUniversitySchema, buildWebSiteSchema } from "../src/lib/seo/schema";

const universitySchema = buildUniversitySchema();
const websiteSchema = buildWebSiteSchema();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_IDENTITY.canonicalBaseUrl),
  title: SITE_IDENTITY.defaultTitle,
  description: SITE_IDENTITY.defaultDescription,
  verification: {
    google: "MNlkKsQJcg3Cv14G_CeV3L_C7f2A3MpdPNSYNdDtdfU",
  },
  keywords: [
    "Stmarys University",
    "Stmarys University Hyderabad",
    "St. Mary's University",
    "St Marys University",
    "UGC-recognized university",
    "six schools",
    "rehabilitation sciences",
    "health and allied health sciences",
    "psychology",
    "nursing",
    "engineering and emerging technologies",
    "law",
    "academic programmes",
    "admissions",
    "student support",
    "official disclosures",
  ],
  // NOTE: No root-level canonical here — each page sets its own via buildMetadata()
  // to prevent every page from pointing to "/" as canonical (duplicate content).
  openGraph: {
    siteName: SITE_IDENTITY.siteName,
    type: "website",
    url: absoluteUrl("/"),
    title: SITE_IDENTITY.defaultTitle,
    description: SITE_IDENTITY.defaultDescription,
    images: [
      {
        url: absoluteUrl(UNIVERSITY_INFO.defaultOgImage),
        alt: SITE_IDENTITY.siteName,
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  robots: "index,follow",
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.defaultTitle,
    description: SITE_IDENTITY.defaultDescription,
    images: [absoluteUrl(UNIVERSITY_INFO.defaultOgImage)],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d315c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          id="smru-university-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(universitySchema) }}
        />
        <Script
          id="smru-website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <Preloader />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
