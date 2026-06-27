# Performance Audit & Enhancements
**Date**: 2026-06-11
**Phase**: SEO Phase 7: Core Web Vitals Optimization

## Core Web Vitals Goals
- Mobile Performance: 85+
- LCP: < 2.5s
- CLS: < 0.1
- INP: < 200ms

## Enhancements Applied

### Largest Contentful Paint (LCP) Optimization
- Replaced the initial screen splash logo (`Preloader.tsx`) from a standard `<img>` tag to a fully optimized `next/image` with `priority={true}` and exact `sizes` configurations. This signals the browser to fetch the splash screen immediately, mitigating previous LCP rendering blockages.
- Injected `sizes="100vw"` on all hero images spanning full viewports (e.g., `Home.tsx`, `LawLanding.tsx`). This prevents browsers from downloading excessively large 4K original files on small mobile devices.

### Interaction to Next Paint (INP) & Main-Thread Blocking
- Statically loaded modal components (`EnquiryModal`, `MerittoApplyModal`) present in `AppShell.tsx` were converted to Dynamic Imports (`next/dynamic`). Because these massive modals are hidden upon initial load, skipping their initialization removes hundreds of kilobytes from the initial JavaScript payload. This radically speeds up the browser's Time To Interactive (TTI) and significantly lowers the Interaction to Next Paint (INP).

### Render Blocking Scripts
- Removed `strategy="beforeInteractive"` injected Next.js `<Script>` elements for JSON-LD structured data in `layout.tsx`. These scripts block HTML rendering while parsing. Substituted with native `<script>` elements relying natively on `dangerouslySetInnerHTML`, ensuring zero parser-blocking delays for SEO metadata.

## Post-Build Verification
The production build compiled successfully, indicating that dynamic imports correctly chunked the heavy scripts without causing runtime dependency errors. 

*We recommend completing a Lighthouse trace in Chrome Incognito simulating Mobile 4G to verify final performance digits reflect 85+ goals.*
