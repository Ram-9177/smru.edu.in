# Affected Pages And Source Map

## Input Limits

Semrush warning counts are known, but the URL-level Semrush export is not available in this repo. Exact Semrush page membership cannot be reconstructed without that export. Mappings below use repo source plus current `out/` rendered HTML.

## Issue Map

| Semrush issue | Count | Source/routes where possible |
|---|---:|---|
| Low text-to-HTML ratio | 89 | Broad template/static-export issue. Main owners: `src/components/AppShell.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `components/seo/SeoPageTemplate.tsx`, `components/compliance/CompliancePageTemplate.tsx`, `src/views/PartnerIframePage.tsx`, `public/partners/*`. Local render: 457 pages under 10%, inflated by scripts/styles/static assets. |
| Broken external links | 78 | URL list unavailable. Rendered external anchors are owned mainly by `src/lib/shared/site-constants.ts`, `src/components/Footer.tsx`, `src/data/schools.ts`, `src/views/CampusGuide.tsx`, `public/partners/ist/index.html`, `public/partners/qtst/index.html`, `public/partners/veloces/velocescampus.html`. Live check of 26 unique rendered anchors returned no hard broken status. |
| Title element too long | 44 | Template owners: `src/lib/shared/dynamic-route-metadata.ts`, `src/lib/shared/route-registry.tsx`, `lib/seo/metadata.ts`, `data/seo-pages.ts`. Local render has many candidates because brand suffixes are appended globally. |
| Pages with only one internal link | 18 | Exact local rendered candidates: `/landing/law/`, `/partners/veloces/velocescampus/`, `/500/`. Semrush likely uses a different link extraction rule or a different crawl set. |
| Duplicate H1 and title | 11 | Candidate owners: `src/lib/shared/route-registry.tsx`, `components/seo/SeoPageTemplate.tsx`, `lib/seo/metadata.ts`, `data/seo-pages.ts`. `seo-inventory.csv` shows 13 candidates; Semrush likely reports a subset. |
| Low word count | 10 | Local candidates cluster in redirect shells, partner shells, static syllabus HTML, `/campus-guide/`, `/developer/`, `/maintenance/`, `/test/`. Owners: `src/lib/shared/redirect-metadata.ts`, partner route pages, `public/assets/smcet-syllabus/view/*`, `src/views/CampusGuide.tsx`. |
| No HSTS support | 2 | Host-level issue. `public/.htaccess` forces HTTPS/non-www but does not set `Strict-Transport-Security`. `next.config.mjs` has no headers hook, and static export cannot set runtime headers by itself. |
| Multiple H1 tags | 1 | Primary exact repo match: `/partner/edinbox/`, from `app/(Partners)/partner/[slug]/page.tsx` sr-only H1 plus `src/views/EdinboxForensicLandingV2.tsx` H1. Local render also shows `/partners/veloces/velocescampus/` with 2 H1s in static HTML. |
| Blocked from crawling | 1 | `app/robots.ts` disallows `/developer/`, `/api/`, `/thank-you/`. Likely crawled URL is `/thank-you/` or `/developer/`; exact Semrush URL unavailable. |

## Exact Local Rendered Candidates

### Multiple H1

| Route | H1 count | Source |
|---|---:|---|
| `/partner/edinbox/` | 2 | `app/(Partners)/partner/[slug]/page.tsx`, `src/views/EdinboxForensicLandingV2.tsx` |
| `/partners/veloces/velocescampus/` | 2 | `public/partners/veloces/velocescampus.html` |

### Pages With Exactly One Rendered Internal Anchor

| Route | Source |
|---|---|
| `/landing/law/` | `app/landing/law/page.tsx` |
| `/partners/veloces/velocescampus/` | `public/partners/veloces/velocescampus.html` |
| `/500/` | `public/500.html` or generated error export |

### Low Word Count Candidates

Under 100 rendered words:

- `/500/`
- `/assets/smcet-syllabus/view/common-english/`
- `/assets/smcet-syllabus/view/cse-pg/`
- `/assets/smcet-syllabus/view/physiotherapy/`
- `/calibrate/`
- `/developer/`
- `/maintenance/`
- `/test/`

Additional 100-199 word candidates:

- `/assets/smcet-syllabus/view/occupational-therapy/`
- `/assets/smcet-syllabus/view/psychology-test/`
- `/bb/`, `/blackbucks/`, `/bytexl/`, `/edinbox/`, `/edridge/`, `/emversity/`, `/iiat/`, `/ist/`, `/mjiollnir/`, `/niat/`, `/niat-upskilling/`, `/nst/`, `/onnbikes/`, `/qtst/`, `/qtst-smru/`, `/university/`, `/veloces/`
- `/campus-guide/`
- `/partner/bb/`, `/partner/bytexl/`, `/partner/edridge/`, `/partner/emversity/`, `/partner/iiat/`, `/partner/nextgen/`, `/partner/niat/`, `/partner/nst/`, `/partner/qtst/`, `/partner/veloces/`

### No H1 Candidates

Main route groups:

- Static syllabus views: `/assets/smcet-syllabus/view/*`
- Legacy/alias partner routes: `/bb/`, `/blackbucks/`, `/bytexl/`, `/edinbox/`, `/edridge/`, `/emversity/`, `/iiat/`, `/ist/`, `/mjiollnir/`, `/niat/`, `/qtst/`, `/qtst-smru/`, `/university/`, `/veloces/`
- Department redirect routes: `/departments/*`
- Utility/static: `/calibrate/`, `/test/`, `/ctpl/`, `/entrancetest/`, `/campus-guide/`

### Long Title Candidate Families

Highest-risk source families:

- `/schools/[schoolSlug]/[deptSlug]/`: `src/lib/shared/dynamic-route-metadata.ts`
- `/schools/[schoolSlug]/[deptSlug]/[programSlug]/`: `src/lib/shared/dynamic-route-metadata.ts`
- `/seo/[slug]`, `/admission-guides/[slug]`, `/student-guides/[slug]`: `data/seo-pages.ts` plus `lib/seo/metadata.ts`
- Static routes with long configured titles: `src/lib/shared/route-registry.tsx`

Top rendered examples:

- `/schools/engineering-emerging-technologies/rehabilitation-engineering-assistive-technologies/`
- `/schools/engineering-emerging-technologies/business-administration-computer-applications/`
- `/schools/engineering-emerging-technologies/computer-science-engineering/`
- `/schools/rehabilitation-sciences/audiology-speech-sciences/`
- `/schools/health-allied-health-sciences/allied-health-sciences/`
- `/schools/health-allied-health-sciences/allied-health-sciences/diploma-anaesthesia-operation-theatre-technology/`
- `/schools/law/legal-studies/llm-ip-ai-regulation-data-sovereignty/`
- `/leadership/vice-chancellor/`
- `/phd-admissions/`
- `/academic-structure/`

### Duplicate H1/Title Candidates From `seo-inventory.csv`

- `/admissions`
- `/phd-admissions`
- `/bb`
- `/iiat`
- `/niat`
- `/qtst`
- `/niat-upskilling`
- `/partner/ist`
- `/approvals-recognitions`
- `/schools/rehabilitation-sciences`
- `/schools/law`
- `/mandatory-disclosure`
- `/public-information`

### Robots/Crawl Blocking

Configured in `app/robots.ts` and rendered in `out/robots.txt`:

- `Disallow: /developer/`
- `Disallow: /api/`
- `Disallow: /thank-you/`

### External Link Ownership

Shared links repeated across hundreds of rendered pages:

- `https://apply.smru.edu.in/` from `src/lib/shared/site-constants.ts`, `src/components/Footer.tsx`, CTA components.
- `https://wa.me/917331119432` from shared contact/footer/campus guide code.
- Social links from `src/lib/shared/site-constants.ts`.

Partner/static external links:

- `public/partners/ist/index.html`: Intellipaat, WhatsApp shortlinks, apply links.
- `public/partners/qtst/index.html`: `qtst.ai` routes and Google Maps shortlink.
- `public/partners/veloces/velocescampus.html`: Veloces admissions link.
- `public/partners/edinbox/index.html`: AIFSET link.
