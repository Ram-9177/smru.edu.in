import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cinzel, Inter, Outfit } from "next/font/google";
import "../src/styles/globals.css";
import AppShell from "../src/components/AppShell";
import StructuredData from "../src/components/seo/StructuredData";
import { absoluteUrl } from "../src/lib/metadata";
import { UNIVERSITY_INFO } from "../src/lib/shared/university";
import { SITE_IDENTITY } from "../src/lib/seo/site";

import { buildUniversitySchema, buildWebSiteSchema } from "../src/lib/seo/schema";

const universitySchema = buildUniversitySchema();
const websiteSchema = buildWebSiteSchema();

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_IDENTITY.canonicalBaseUrl),
  title: SITE_IDENTITY.defaultTitle,
  description: SITE_IDENTITY.defaultDescription,
  verification: {
    google: "MNlkKsQJcg3Cv14G_CeV3L_C7f2A3MpdPNSYNdDtdfU",
  },
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
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d315c",
};

// No eager "/*" prefetch: it downloaded the whole site on mobile data. Only a small,
// high-intent prerender list is kept.
const speculationRules = {
  prerender: [
    {
      source: "list",
      urls: [
        "/explore/",
        "/campus-360/",
        "/schools/",
        "/admissions/",
        "/about/",
        "/contact/",
        "/explore/hostel-360/",
      ],
      eagerness: "moderate",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cinzel.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speculationRules) }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18293956146"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18293956146');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1582040940369832');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1582040940369832&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* Plain script tags so the Organization/WebSite graph is present in the static HTML for every crawler,
            not injected client-side via next/script. */}
        <StructuredData id="smru-university-schema" data={universitySchema} />
        <StructuredData id="smru-website-schema" data={websiteSchema} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

