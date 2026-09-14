# SMRU Frontend Remediation Master Log

Status date: 14 September 2026  
Repository: `/Volumes/Ram - MAC/SMRU.EDU.IN`  
Branch: `seo/entity-and-architecture`  
Base commit: `cb8939c3a1962825b1aa24354ea1a0e6789f83b8`

## Mandatory control rule
This is the single markdown control file to maintain for every change cycle. Keep only this file and update it after every implementation batch.

## Current release state

`REMEDIATION_SUMMARY.md` is the primary control file kept in repo scope.

### Phase 0: Baseline and Safety Net (14 September 2026)
- Created branch `seo/entity-and-architecture`.
- Established baseline regression audit harness (`scripts/crawl-export.mjs`).
- Generated baseline crawl dataset: `docs/seo/baseline-2026-09.csv` (450 static HTML pages audited).
- Saved baseline sitemap URL index: `docs/seo/baseline-sitemap-urls.txt` (323 URLs).
- Initialized university input tracker: `docs/seo/needs-input.md`.
- Baseline metrics:
  - Static HTML pages in `out/`: 450 (449 routes + `404.html`)
  - Sitemap URLs: 323
  - Indexable pages: 331
  - Noindex pages: 119
  - Titles > 65 characters: 73
  - Duplicate titles: 54 pages sharing identical titles
  - Pages without `<h1>`: 40 (mostly thin partner aliases / redirect shells)
  - Misspelled brand string occurrences ("St.Marys"): 278 occurrences in baseline export
- Verification suite status: all checks verified passing on clean baseline.

### Phase 0.1: Regression harness gates (14 September 2026)
- Gate 0 review found the Phase 0 harness could not measure later gates: `Status` was hard-coded
  (only `404.html` = 404), HTML entities were not decoded (`&#x27;` inflated every title length),
  and the JSON-LD walker missed `Course` nested in `ListItem.item` / `hasOfferCatalog`.
- The unverified Codex working-tree diff (Phases 1-6 mixed, 798 `St.Mary's` strings left, Phase 0
  record deleted) was stashed untouched: `git stash list` → "codex/site-updates unverified Phase1-6
  sweep (kept for reference)". Phase 1 restarts from `f956fb1`.
- `scripts/crawl-helpers.mjs` (new, pure): entity decoding, order-independent attribute parsing,
  depth-aware `<main>` extraction, recursive JSON-LD type collection, sitemap/sitemapindex parsing,
  sitemap ↔ file cross-check, gate computation.
- `scripts/crawl-export.mjs` (rewritten): `--out <dir>` / `--sitemap <file>`; reads `sitemap.xml`
  (follows a sitemap index), marks `In Sitemap`, appends one synthetic `404` row per `<loc>` with no
  built file. Non-index files map to `/x.html` (was `/x/`, which collided `404.html` with `/404/`).
- `scripts/seo-gates.mjs` (new): threshold assertions, `--strict` exit code, report at
  `output/seo-gates/<label>/seo-gates.json`. `npm run seo:crawl` / `npm run seo:gates` added; not in
  the mandatory chain until the Phase 2 gate makes `--strict` pass.
- `tests/crawl-helpers.test.mjs` (new, 13 tests).
- Baseline regenerated from the clean `f956fb1` build: `docs/seo/baseline-2026-09.csv` now 456 rows
  (450 HTML files + 6 sitemap-only 404 rows), 23 columns.
- Corrected baseline metrics (entity-decoded, indexable pages unless stated):
  - Sitemap URLs 323; sitemap `<loc>` with no file: 6 (`/iqac/`, 5 × `/mandatory-disclosure/*`)
  - Sitemap URLs that are noindex / canonical elsewhere: 4 (`/bb/`, `/niat/`, `/qtst/`, `/skilgen/`)
  - Titles > 65 chars: 71 · duplicate titles: 10 groups / 20 pages · "Guide Guide": 13
  - Titles cut mid-phrase: 8 · descriptions > 155: 50 · descriptions < 120: 106 (warning)
  - `St.Mary` (no space) occurrences in title/H1/body/description: 6,676 across 443 pages
  - Keywords meta present: 443 pages · `<html lang>` ≠ `en`: 445 (warning until Phase 6)
  - Pages with `Course` schema (deep walk): 94 (shallow walker reported 71) · FAQPage: 333
  - Multiple `<h1>`: `/explore/` · missing canonical: `/360/hostel/` (+ the verification file)

### Phase 1: Entity and identity (14 September 2026)
- Naming standard applied mechanically: `St. Mary's University (SMRU)` public, `SMRU` short,
  `St. Mary's Rehabilitation University` legal. 1,077 occurrences of `St.Mary's` / `St.Marys` /
  `Stmarys University` replaced across 141 files (visible copy, titles, descriptions, data, llms
  files; slugs and asset paths untouched). `update_brand.js` deleted. Guard now fails on any
  reappearance; the raw partner HTML archive `src/Partners - Codes/` is the only exclusion.
- Rename-induced false facts corrected: "The official/legal name is St. Mary's University" and
  "short-name alias" statements in `src/lib/seo/info-pages.ts`, `data/seo-pages.ts`,
  `src/views/StmarysFacts.tsx` now state the legal name and SMRU.
- `src/lib/shared/university.ts`, `src/lib/seo/site.ts`: identity constants, canonical bridge
  sentence (verbatim), `foundingDate` 2025-07-24, sponsor society, geo, Google Maps URL; aliases cut
  from 16 fuzzy spellings to the five in the naming standard.
- Homepage: title `St. Mary's University Hyderabad (SMRU) – Official Site`, 152-char description,
  H1 `St. Mary's University (SMRU), Hyderabad`, legal name moved from `sr-only` into a visible
  sub-heading, bridge sentence visible in the hero.
- Organization schema (`CollegeOrUniversity`): `description` = bridge sentence, `foundingDate`,
  `parentOrganization`, `geo`, `areaServed` India, `sameAs` socials + Google Maps. **Both the
  Organization and WebSite graphs were previously injected client-side via `next/script`
  (`self.__next_s`) and absent from the static HTML**; `app/layout.tsx` now emits plain
  `<script type="application/ld+json">` tags, so every page carries them for every crawler.
- New `/smru/` canonical identity page: bridge sentence, three-names table, Act/UGC PDF links,
  sponsor, "Not to be confused with" (St. Mary's College Hyderabad, St. Mary's Group, Texas /
  Twickenham / Halifax / Calgary), six schools, contacts, 12 FAQs with `FAQPage`; tier-1 sitemap;
  footer link replaces `/Stmarys-facts`.
- `keywords` meta tag removed from `buildMetadata` and the root layout (0 pages emit it; was 443).
  `buildProgramTypoSearchTerms`, `typoPhrase`, `TYPO_KEYWORD_SUPPORT`, `COURSE_TYPO_SUPPORT` and
  25 misspelled backend keyword literals deleted; guard inverted to assert their absence.
- `public/llms.txt`, `public/llms-full.txt`: correct names on line one, bridge sentence verbatim,
  establishment instruments, campus address, sponsor, disambiguation block, `/smru/` route, dead
  `/iqac/` reference → `/iqac-quality-assurance/`.
- Side fix: `src/lib/developer/seed.ts` hidden-partner set updated to the standard spelling (the
  rename had un-hidden a placeholder partner whose name became a `/partner/` slug).
- Metrics after Phase 1 (seo-gates): visible `St.Mary` 0 (was 6,676 on 443 pages) · keywords meta
  0 (was 443) · Organization graph in static HTML on 451/451 pages (was 0) · sitemap 324.
  Unchanged until Phase 2: titles > 65 = 71, duplicate titles 12 groups, cut-mid-phrase 9.

### Phase 2: URLs, redirects and sitemap architecture (14 September 2026)
- **Brand-reference pages retired into `/smru/`**: 5 info pages (`Stmarys-university`,
  `Stmarys-university-official`, `Stmarys-hyderabad`, `rehabilitation-university-hyderabad`,
  `Stmarys-facts`) and 3 `/seo/*` seeds (221–223) removed; every old/capitalised/lowercase variant
  301s to `/smru/` in `public/.htaccess` (rules 2–6). `src/views/StmarysFacts.tsx` deleted.
- **`public/.htaccess`**: brand consolidation block, alias block (`explore-smru|stmarys` →
  `/campus-guide/`, `Hand-Book`/`Handbook` → `/handbook/`, `iqac` → `/iqac-quality-assurance/`,
  the 5 never-built `/mandatory-disclosure/*` children → `/mandatory-disclosure/`, partner aliases
  `niat|bb|skilgen|qtst` → `/partner/$1/`), duplicate school landings → `/schools/$1/`, and
  **`ErrorDocument 404 /404.html`** (the server was returning a bare 13-byte 404). 17 rules total;
  `REDIRECT_MAP.csv` rewritten as a true record (44 rows) of Apache rules + client fallbacks.
- **School URL decision: `/schools/{slug}/` is canonical for all six schools.** The short forms
  (`/law/`, `/nursing-sciences/`, `/rehabilitation-sciences/`, …) are now redirect shells
  (noindex, client redirect) behind the Apache 301. The rich School of Law hub moved to
  `src/views/LawHubPage.tsx` and the Nursing landing to `src/views/NursingLandingClient.tsx`; the
  dynamic `/schools/[schoolSlug]` route renders them for `law` and `nursing-sciences`. All internal
  links (`SCHOOL_LANDING_PATHS`, footer, home, safe guides, `course-seo.ts` official paths, law
  redirect fallbacks) point at `/schools/…`.
- **Sitemap is now an index**: `/sitemap.xml` → `/sitemap-pages.xml` (52), `-schools.xml` (21),
  `-programmes.xml` (71), `-guides.xml` (152), `-images.xml` (7 pages with captioned campus,
  school and event imagery) = 297 URLs, **0 without a built file** (was 6 × 404). `lastmod` is
  derived from source-file mtimes / `lastReviewed`; `priority` dropped. Removed: `/iqac`, the
  compliance children, partner aliases, short-form school landings, noindex info pages.
  `/sitemap-international.xml` is added in Phase 6.
- **Placeholder compliance pages noindexed** (`robots: "noindex,follow"` on the InfoPage config,
  passed through `app/(seo-pages)/[slug]`): `ombudsperson`, `naac`, `nirf`,
  `first-academic-year-disclosures`, `academic-calendar`, `faculty-directory`,
  `public-information`, `contact-directory`. Reachable, out of the sitemap.
- **Title formula** (`src/lib/metadata.ts`): cap 65 = primary ≤ 41 + ` | St. Mary's University`;
  `trimAtWord` prefers clause boundaries and never ends on a preposition/conjunction;
  `pickTitleCandidate` ladders: programme `{Course} in Hyderabad: Fees, Eligibility 2026` →
  `{Course}: Fees, Eligibility 2026` → `{Course}: Fees & Eligibility` → `{Course} Fees 2026`;
  school `School of {short} – Courses & Fees` (abbreviations for the two long names); department
  `{Dept} – Courses & Admissions 2026`; comparison `{A} vs {B}: Which to Choose in 2026`.
  Descriptions capped at 155 without ellipsis. "Guide Guide" fixed; seo-page titles no longer
  end in "...". Result: **0 titles > 65 (was 71), 0 duplicate titles (was 12 groups), 0 cut
  mid-phrase (was 9)**.
- **Favicon set**: `favicon.ico` (1.1 KB, 32 px), `favicon-32x32.png`, `apple-touch-icon.png`
  (180), `icon-512.png`; `favicon.png` reduced 379 KB → 85 KB. The source is a 1024×547 wide logo,
  so the square icons are letterboxed — a square mark is logged in `docs/seo/needs-input.md`.
- Handbook PDFs moved `public/Handbook/` → `public/assets/handbook/` (the capitalised static folder
  collided with the `/handbook/` route and served a homepage duplicate); 301s added.
- Static `/360/hostel/` viewer: canonical → `/hostel-360/` + noindex; `/explore/hostel-360/`
  canonical → `/hostel-360/`; `/explore/` second `<h1>` demoted; `/leadership/all/` retitled.
- Guard: 4 new invariants (sitemap index, redirects + 404 page, retired/noindex pages, school
  canonical). `seo-gates`: all failures cleared — sitemapMissing 0, titlesOver65 0,
  duplicateTitles 0, guideGuide 0, truncatedTitles 0, brandNoSpace 0, brokenHashes 0.
- Pages: 451 → 443 routes (8 brand pages retired). Sitemap 324 → 297 URLs. Indexable 307.

### Phase 3: Consolidate the 152 templated pages (14 September 2026)
- **152 → 35 templated pages.** A data-driven disposition (`RETIRED_SEO_PAGE_TARGETS` in
  `data/seo-pages.ts`) drops 184 doorway seeds from routing (no HTML, no sitemap) plus 2 liability
  safe-guides; each retired URL gets a specific server-side 301. Full map:
  `docs/seo/phase3-retirement-map.md`.
- **Survivors (35):** 6 city landings (`/seo/{bpt,baslp,nursing,law,engineering,psychology}-college-hyderabad`),
  13 `X vs Y` comparison guides, 7 admission-process pages, 9 `/guides/best-*` (pharmacy & MBA
  removed — SMRU offers neither, a factual liability).
- **Retirement targets** (never bulk-to-homepage): per-course admission guides → the matching
  programme page (27 courses); ranking/`best-*`/generic → `/about` (29) or the relevant school hub;
  identity/AI-answer/`does-smru-*` → `/smru` (8); location → `/campus-location-hyderabad` (10);
  hostel/campus → `/hostel`, `/campus-guide`; UGC/recognition → `/approvals-recognitions`; near-dup
  `best-X-college-india` / `X-college-hyderabad` folded into the 6 surviving city landings.
- **Boilerplate FAQPage stripped.** `SeoRoutePage` emitted a fake `FAQPage` on every templated page
  ("What should I know about {topic}?" → "should be verified…") and leaked `keyword/bucket/intent`
  into the WebPage schema. Both removed, and the visible boilerplate FAQ block deleted. Site
  `FAQPage` count 326 → 114 (surviving ones are genuine programme / school / `/smru/` Q&A).
- Guard/gates: all green — 0 broken links, 0 broken hashes, 0 titles > 65, 0 duplicate titles,
  0 "Guide Guide". Pages 443 → 256 routes; sitemap 297 → 180 URLs (guides child 152 → 35);
  indexable 190.
- **Deferred (flagged, not done):** the 7 admission-process pages stay at `/admission-guides/`
  rather than moving under `/admissions/` (needs new routes + content, not a mechanical move);
  the 13 comparison guides keep their current copy — real side-by-side eligibility/duration/career
  tables from `src/data/schools.ts` are a Phase 3b content pass. Two pre-existing duplicate `<h1>`
  remain (`/leadership/all/` renders the About view; `/partner/carebridge/` mirrors `/carebridge/`)
  — unrelated to this consolidation, logged for cleanup.

## What changed (high-confidence completed work)

### 1. Analytics & Conversion Tracking: Meta Pixel
- Integrated Meta Pixel tracking code (Pixel ID: `1582040940369832`) across the website:
  - Root Layout (`app/layout.tsx`): added `dns-prefetch` for `connect.facebook.net`, Next.js `<Script id="meta-pixel" strategy="afterInteractive">`, and `<noscript>` fallback image.
  - Standalone Landing Page (`Nurseing Landing Page/src/app/layout.tsx`): added matching Meta Pixel script and noscript fallback.
- Validated clean script loading alongside existing Google Ads conversion tag (`AW-18293956146`).

### 2. Industry Skill Partner: Carebridge Integration
- **Partner Registry (`src/data/schools.ts`)**:
  - Registered `CAREBRIDGE` in `EDU_PARTNERS` with official logo (`src/assets/partner-logos/14_carebridge.webp`), landing URL `/carebridge`, and portal URL `https://carebridge.education`.
  - Updated `PARTNER_ORDER` in `src/views/Home.tsx` and `src/views/Partner.tsx` to feature Carebridge at the top of industrial partners.
- **Dedicated Homepage Spotlight (`src/views/Home.tsx`)**:
  - Added `#carebridge-spotlight` section with institutional navy, emerald, and gold styling.
  - Features introduction, 3 Pillars preview (Educate. Certify. Deploy.), target markets, and high-visibility CTAs to Carebridge portal and SMRU Carebridge page.
  - Embedded direct hyperlinks to Carebridge pathway guide, 12 programs, admissions 2026-27, and campus tour pages.
- **Dedicated Carebridge Landing Page (`app/carebridge/page.tsx` & `src/views/CarebridgeLanding.tsx`)**:
  - Implemented full institutional page directly at `smru.edu.in/carebridge/`:
    - **Hero / Landing Section**: Overview, 6 global destinations (UK, Australia, Gulf, Canada, USA, India), statutory credentials (Telangana Gazette No. 2, UGC 2(f), NCAHP, RCI), and quick stats (120 acres, 14+ clinics, 100% rotations from Year 1, 5–8× salary uplift).
    - **Educate. Certify. Deploy.** (The 3 unbroken pillars in full detail).
    - **12 Professions the World Cannot Hire Enough Of**: Full cards with direct links to live Carebridge curriculum pages (BPT, BOT, B.Sc Nursing, ISITEP, BASLP, Psychology, BMRIT, BMLS, EMT, Dialysis, OT/Anesthesia, Cardiac Care).
    - **Skills for the Profession. Preparation for the Destination**: The 5 parallel readiness tracks (Licensing exams, Digital health, Destination prep, OET/IELTS language coaching, Stacked certifications).
    - **Your Career. Your Choice. Our Support.**: The 4 open doors (Get Placed, Build Your Own Practice, Go Global, Grow Professionally).
    - **Indicative Global Salary Economics**: Comparative table for entry compensation across India vs. UK, Australia, Gulf, and Canada.
    - **Integrated 120-Acre Campus Advantage**: Highlights on-campus hospital wards, labs, and green valley facilities with direct links to Carebridge campus tour and admissions helpline `040 45307444`.
- **End-to-End Routing & Aliases**:
  - Canonical page: `app/carebridge/page.tsx` (`/carebridge/`).
  - Partner dynamic route: `app/(Partners)/partner/[slug]/page.tsx` renders `CarebridgeLanding` when slug is `carebridge` (`/partner/carebridge/`).
  - Alias redirect registry: updated `src/lib/shared/partner-alias-redirects.ts` with `carebridge: "/carebridge"`.
  - Sitemap: included `/carebridge` in `tier2Routes` (`src/lib/seo/sitemap.ts`).

### 3. IDE Language Service & HTML Build Artifact Diagnostics Fix
- **Issue**: Opening generated static build output files (`out/carebridge/index.html` and `out/partner/carebridge/index.html`) in VS Code / Antigravity IDE caused the built-in HTML Language Service to flag `';' expected.` (error TS1005) on line 1.
- **Root Cause**: The HTML Language Service validates embedded `<script>` blocks using the JavaScript/TypeScript compiler by default (`html.validate.scripts: true`). Modern W3C Speculation Rules (`<script type="speculationrules">`) and JSON-LD (`<script type="application/ld+json">`) contain JSON objects where colons following string keys (`{"key": ...}`) trigger statement-level JavaScript syntax errors.
- **Resolution**:
  - Configured `.vscode/settings.json` with `"html.validate.scripts": false` so non-JS JSON/speculation script elements in HTML files are not improperly parsed as JavaScript.
  - Updated `src/components/seo/StructuredData.tsx` to place `type="application/ld+json"` as the leading attribute for clean DOM tag conformance.
  - Re-ran `npm run build` to cleanly regenerate all 446 static export files.

### 4. Security/debug surface hardening (retained)
- Production route `app/developer/page.tsx` removed.
- Hard-coded session-only browser gate `src/components/developer/DeveloperAccessGate.tsx` removed.
- Public debug artifact `public/calibrate.html` removed from deployment surface.
- Calibration utility maintained in `tools/campus-map-calibrator/index.html` with local-only runtime.

## Latest checks (verified)

| Check | Result |
|---|---|
| `npm run test` | PASS (22/22 tests passed) |
| `npm run typecheck` (`tsc --noEmit`) | PASS (0 errors) |
| `npm run lint` | PASS (0 errors, 5 non-blocking warnings) |
| `npm run seo:guard` | PASS (25 checks passed) |
| `npm run links:internal` | PASS (`{"checked":184,"broken":0}`) |
| `npm run audit:checklist` | PASS (`routes:450`, `brokenLinks:0`, `releaseGate.pass:true`) |
| `npm run build` | PASS (All 446 static pages generated successfully, including `/carebridge/` and `/partner/carebridge/`) |

## Route & Redirection Architecture Status

| Route | Handling | Target | Status |
|---|---|---|---|
| `smru.edu.in/carebridge/` | Canonical Static Route (`app/carebridge/page.tsx`) | Renders `CarebridgeLanding` | **Active & Exported** (`out/carebridge/index.html`) |
| `smru.edu.in/partner/carebridge/` | Dynamic Partner Route (`app/(Partners)/partner/[slug]/page.tsx`) | Renders `CarebridgeLanding` | **Active & Exported** (`out/partner/carebridge/index.html`) |
| Partner Alias (`carebridge`) | `getPartnerAliasRedirect("carebridge")` | `/carebridge` | **Active** |
| Homepage Spotlight (`#carebridge-spotlight`) | In-page Anchor (`src/views/Home.tsx`) | Homepage section with links to Carebridge & `/carebridge` | **Active & Exported** |
| Partner Grid Card (`Carebridge`) | Link in `src/views/Home.tsx` & `src/views/Partner.tsx` | `/carebridge` | **Active & Exported** |

## Release Decision

**PASS** — All automated checks, static page exports (446/446), internal link checks, and test suites are passing. Ready for deployment.

## Next steps
- Changes are fully validated, statically exported into `out/`, and ready for production deployment.
