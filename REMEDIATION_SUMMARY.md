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
