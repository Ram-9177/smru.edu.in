import type { Metadata, Viewport } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
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
// high-intent speculation rules prerender list is kept:
// prerender: ["/explore/", "/campus-360/", "/schools/", "/admissions/", "/about/", "/contact/", "/explore/hostel-360/"]
// Injected dynamically via predictive-preloader.ts post-hydration to avoid React 19 SSR collisions with browser extensions.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <script
          id="smru-extension-guard"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                try {
                  var origError = console.error;
                  console.error = function() {
                    var msg = (arguments[0] && typeof arguments[0] === 'string') ? arguments[0] : '';
                    if (
                      msg.indexOf('bis_skin_checked') !== -1 ||
                      msg.indexOf('bis_register') !== -1 ||
                      msg.indexOf('bis_use') !== -1 ||
                      msg.indexOf('speculationrules') !== -1 ||
                      msg.indexOf('chrome-extension://') !== -1 ||
                      msg.indexOf('browser extension installed which messes with the HTML') !== -1
                    ) {
                      return;
                    }
                    return origError.apply(console, arguments);
                  };
                  var clean = function(node) {
                    if (!node || node.nodeType !== 1) return;
                    if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                    if (node.hasAttribute('bis_register')) node.removeAttribute('bis_register');
                    if (node.hasAttribute('bis_use')) node.removeAttribute('bis_use');
                    if (node.hasAttribute('__processed_5a602d8c-387d-41f7-b0c3-89a10295ee1a__')) node.removeAttribute('__processed_5a602d8c-387d-41f7-b0c3-89a10295ee1a__');
                  };
                  var obs = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes') {
                        var a = m.attributeName;
                        if (a && (a === 'bis_skin_checked' || a === 'bis_register' || a === 'bis_use' || a.indexOf('__processed_') === 0)) {
                          m.target.removeAttribute(a);
                        }
                      } else if (m.type === 'childList') {
                        for (var j = 0; j < m.addedNodes.length; j++) {
                          clean(m.addedNodes[j]);
                        }
                      }
                    }
                  });
                  obs.observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked', 'bis_register', 'bis_use']
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
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
            loading="lazy"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* Plain script tags so the Organization/WebSite graph is present in the static HTML for every crawler,
            not injected client-side via next/script. */}
        <StructuredData id="smru-university-schema" data={universitySchema} />
        <StructuredData id="smru-website-schema" data={websiteSchema} />
        {/* Route-transition indicator. Replaces the loading.tsx boundaries, which in Next 15 static
            export put the fallback inside <main> and streamed the page into a hidden div. */}
        <NextTopLoader color="#019e6e" height={3} showSpinner={false} shadow={false} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

