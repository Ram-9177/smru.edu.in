# SEO Baseline

Generated: 2026-06-13

## Environment
- Framework: Next.js App Router, Next 14.2.35 observed in build output.
- Package manager: npm with package-lock.json.
- Canonical host: https://smru.edu.in
- Static export: next.config.mjs uses output: export and trailingSlash: true.

## Baseline checks
- npm run build: PASS after the safe SEO update; Next generated 459 static pages.
- npm run lint: FAIL after ESLint installation because of existing `react/no-unescaped-entities`, `<img>`, hook dependency, and JSX key issues across the repo.
- npm test: not available in package.json.

## Existing SEO systems preserved
- Metadata builder: src/lib/metadata.ts.
- Entity constants: src/lib/seo/site.ts.
- Schema builders: src/lib/seo/schema.ts.
- Sitemap builder: src/lib/seo/sitemap.ts served through app/sitemap.xml/route.ts.
- Robots: app/robots.ts.
- llms.txt: public/llms.txt.
- Existing brand pages: /st-marys-university/, /st-marys-rehabilitation-university/, /smru-hyderabad/, /smru-facts/.

## Current pass scope
- Partner/static pages were excluded by user instruction.
- No new pages were created.
- No redirects, noindex changes, or destructive guide-page changes were implemented.
- Safe claim wording was updated on non-partner existing pages only.

## Working tree note
The repo was already heavily dirty before this task. I did not revert unrelated changes. First 40 status lines at audit time:

```
 M app/(Partners)/bytexl/page.tsx
 M app/(Partners)/edinbox/page.tsx
 M app/(Partners)/ist/page.tsx
 M app/(Partners)/mjiollnir/page.tsx
 M app/(Partners)/onnbikes/page.tsx
 M app/(Partners)/partner/[slug]/page.tsx
 M app/(Partners)/qtst/page.tsx
 M app/departments/page.tsx
 M app/exam-notification/page.tsx
 M app/law/page.tsx
 M app/layout.tsx
 M app/leadership/all/page.tsx
 M app/loading.tsx
 M app/page.tsx
 M app/robots.ts
 M app/schools/[schoolSlug]/[deptSlug]/[programSlug]/page.tsx
 M app/search/page.tsx
 D app/sitemap.ts
 D eslint.config.js
 M next.config.mjs
 M package-lock.json
 M package.json
 M public/.htaccess
 M public/assets/hero-campus-2.png
 M public/assets/school-law.jpg
 M public/assets/smcet-syllabus/view/common-english.html
 M public/assets/smcet-syllabus/view/cse-pg.html
 M public/assets/smcet-syllabus/view/engineering-ug.html
 M public/assets/smcet-syllabus/view/occupational-therapy.html
 M public/assets/smcet-syllabus/view/pgdrp-pdcp.html
 M public/assets/smcet-syllabus/view/physiotherapy.html
 M public/assets/smcet-syllabus/view/psychology-test.html
 M public/calibrate.html
 M public/campus-guide/data/guide.json
 M public/campus-guide/images/campus-satellite.jpg
 M public/llms.txt
 M public/partners/edinbox/index.html
 M public/partners/ist/images/20-Startups-in-the-Making-Desktop-Image.webp
 M public/partners/ist/images/Abhinav-Harsh.webp
 M public/partners/ist/images/Accenture-Strategy.webp
```
