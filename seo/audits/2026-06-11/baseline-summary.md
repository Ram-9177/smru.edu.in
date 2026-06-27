# SMRU SEO Baseline - 2026-06-11

## Scope

Baseline only. No UI, metadata, robots, sitemap, schema, or content claims were changed.

Semrush URL-level export was not present in the repo. `sheet.csv` is a Google Sheets access HTML page, not CSV data. This baseline preserves the provided Semrush counts and maps them to repo routes/source where local evidence supports it.

## Repo Structure

- `app/`: Next.js App Router pages, dynamic routes, `robots.ts`, and `sitemap.xml/route.ts`.
- `src/views/`: main page UI implementations used by App Router wrappers.
- `src/components/`, `components/`: shared UI, SEO templates, sitemap template, schema emitters.
- `src/lib/seo/`, `lib/seo/`: sitemap builder, SEO page registry, metadata helpers, internal links.
- `src/lib/shared/`: route registry, dynamic route metadata, redirects, site constants.
- `data/`: isolated SEO pages, compliance pages, course SEO seed data.
- `public/`: static export assets, partner static pages, `llms.txt`, `llms-full.txt`, `.htaccess`.
- `out/`: current static export used for rendered-page analysis.
- `docs/`, `scratch/`: supporting docs/scripts; not production routes by themselves.

## Framework And Routing

- Framework: Next.js `14.2.33`, React `18.3.1`.
- Routing: App Router under `app/`.
- Build mode: `output: "export"` with `trailingSlash: true` and `images.unoptimized: true`.
- Hosting assumption: static export deployed behind Apache/cPanel-like config because `public/.htaccess` contains HTTPS/non-www rewrites and caching rules.
- Important constraint: `@/*` maps to `./src/*`, so `@/lib/seo/sitemap` resolves to `src/lib/seo/sitemap.ts`.

## Metadata And SEO Utilities

- Root metadata/schema: `app/layout.tsx`.
- Default metadata helper: `src/lib/metadata.ts`.
- Isolated SEO/compliance metadata helper: `lib/seo/metadata.ts`.
- Static route metadata: `src/lib/shared/route-registry.tsx`.
- School/department/program metadata: `src/lib/shared/dynamic-route-metadata.ts`.
- SEO guide data: `data/seo-pages.ts`.
- Compliance data: `data/compliance-pages.ts`.
- Schema helpers: `src/lib/seo/schema.ts` and `lib/schema/*`.
- SEO templates: `components/seo/SeoPageTemplate.tsx`, `components/seo/GuidePageTemplate.tsx`, `components/compliance/CompliancePageTemplate.tsx`.

## Sitemap And Robots

- Sitemap route: `app/sitemap.xml/route.ts`.
- Sitemap source: `src/lib/seo/sitemap.ts`.
- Current rendered sitemap: `out/sitemap.xml`.
- Sitemap baseline: 305 URLs, 0 duplicate locs, 0 sitemap locs missing rendered HTML.
- Robots source: `app/robots.ts`.
- Rendered robots: `out/robots.txt`.
- Disallowed paths: `/developer/`, `/api/`, `/thank-you/`.

## Current Risk Summary

- SEO: Semrush reports title length, low text/HTML, duplicate H1/title, low word count, internal-link, broken-link, HSTS, multiple-H1, and crawl-blocking warnings.
- AEO: Direct-answer and FAQ patterns exist in isolated guide pages, but many are noindex or claim-safe placeholders. Answer visibility is limited where pages remain blocked/noindex.
- GEO: Location/campus pages and Place schema exist, but local discovery depends on external maps/social/apply links and thin partner/static pages.
- Mobile: Main app is responsive, but iframe-heavy partner pages and static partner HTML can create poor mobile UX and low accessible text.
- Performance: Static export is script/style heavy; `images.unoptimized: true`, large videos/images, Google fonts, preloaders, third-party widgets, and iframes increase payload and depress text/HTML ratio.
- Security/header SEO: HTTPS redirects exist in `.htaccess`, but no HSTS header is configured in repo.

## Validation Baseline

- `package.json` scripts: `build`, `lint`.
- No `typecheck` npm script exists; fallback is `npx tsc --noEmit`.
- Validation commands were not run for this docs-only baseline because the repo already has extensive unrelated uncommitted changes.
