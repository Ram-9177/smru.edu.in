# SEO Remediation Phase Plan

## Guardrails

- Do not change UI before the baseline is accepted.
- Do not change content claims without verified university source data.
- Do not add course/program facts not already present in approved source data.
- Keep fixes route/template scoped; avoid broad refactors.

## Phase 0 - Baseline Lock

- Preserve Semrush counts in `issue-counts.json`.
- Keep source ownership in `affected-pages.md`.
- Confirm no UI/content files changed during baseline.

## Phase 1 - Crawl And Header Fixes

- Add HSTS at hosting layer if Apache supports headers, likely in `public/.htaccess`.
- Confirm intended robots behavior for `/thank-you/`, `/developer/`, and noindex routes.
- Validate `https://smru.edu.in/sitemap.xml` and `https://smru.edu.in/robots.txt` after deployment.

## Phase 2 - Metadata And H1 Template Fixes

- Shorten dynamic school/department/program title templates in `src/lib/shared/dynamic-route-metadata.ts`.
- Review static title entries in `src/lib/shared/route-registry.tsx`.
- Fix `/partner/edinbox/` duplicate H1 at the source boundary.
- Review duplicate H1/title candidates from `seo-inventory.csv`.

## Phase 3 - Thin Page And Internal Link Fixes

- Decide which low-word utility/static pages should be noindex, removed from crawl paths, or expanded.
- Add internal links only where they improve crawl flow and user path clarity.
- Treat partner iframe/static pages separately from core university pages.

## Phase 4 - External Link Review

- Obtain the Semrush broken-link URL export.
- Map each broken URL to source file before editing.
- Recheck shared footer/contact/social links because one shared broken link can create many page warnings.

## Phase 5 - AEO/GEO/Performance Pass

- Keep answer blocks and FAQ schema only where source facts are verified.
- Strengthen local/campus routes without adding unverified claims.
- Review heavy images/videos/iframes and static partner pages after SEO-critical metadata fixes.

## Passing Checklist

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] Typecheck: add `typecheck` script or run `npx tsc --noEmit`
- [ ] Sitemap validation: fetch `/sitemap.xml`, confirm XML parses, no duplicate `<loc>`, all indexable locs return 200 or intended redirect.
- [ ] Robots validation: fetch `/robots.txt`, confirm sitemap URL, intended disallows, and no accidental block of public indexable routes.
