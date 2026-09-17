# smru.edu.in — changelog

Dated record of every implementation batch, newest first. The rules live in `PROJECT.md`; this file is
history. Each entry: what changed, why, what was verified, what was deliberately left. Entries before
17 September 2026 are the phase log carried over verbatim from the former `REMEDIATION_SUMMARY.md`.

## 2026-09-17 — /carebridge/ mirrors the partner's home page (branch `feat/carebridge-homepage`)

- `/carebridge/` swaps the 912-line SMRU-authored landing for Carebridge Education's own home page, iframed from
  `public/partners/carebridge/` like the other raw partner landings. `scripts/sync-carebridge-homepage.mjs`
  (`npm run partners:carebridge -- <export>`) is the repeatable procedure: copies `dist/index.html` plus its 16
  referenced assets (22.9 MB), rewrites the 46 page links to `https://carebridge.education/…` with `target="_top"`,
  sets the copy to noindex. The partner's copy, canonical and analytics are untouched.
- Consequences applied per the partner rule: `/carebridge/` is `noindex,follow` and out of the sitemap;
  `/partner/carebridge/` is a redirect shell + Apache 301 + register row; `isSmruAuthoredPartnerView` is edinbox only;
  `EDU_PARTNERS.CAREBRIDGE.iframeUrl` points at the mirror (the live site forbids framing); AppShell treats
  `/carebridge` as a partner route (footer and sticky CTAs hidden).
- The partner page asserts claims SMRU's own pages do not ("120-acre campus", "14+ rehab clinics", "100% rotations
  from Year 1", "NCAHP & RCI approved", "5–8× salary uplift", and a 2018-Act founding that contradicts the bridge
  sentence); logged in `docs/seo/needs-input.md` for the partner to align.
- Two shared `PartnerIframePage` bugs fixed: (1) a same-origin frame that finishes loading before hydration never
  fired `onLoad`, leaving the "Securing Partner Gateway" overlay up and the frame at opacity 0 — readiness is now
  read directly with a 6 s safety; (2) the height hook measured once and stopped, clipping content that grew after
  load — a ResizeObserver now follows the framed document.
- Verified: headless Chrome cold load and cached reload both dismiss the overlay, frame height = document height,
  a click navigates the top window to `https://carebridge.education/pathway.html`; `npm run verify` green
  (276 routes, 47 shells, register consistent, audit pass, gates pass, facts 29/29).

## 2026-09-17 — Handbook hardened against a vibe-coding test (branch `docs/project-handbook`)

- Nine reviewers attempted six realistic tasks (new page, new programme, retire a URL, publish a fee, partner
  landing + alias, fix a title bug) from `PROJECT.md` alone, then graded their plans against the repo: five
  of six were insufficient. 109 findings, deduplicated into two buckets.
- Repo fixed where the handbook stated a rule the code did not keep (commit `fix(repo)`): raw JSON-LD scripts →
  `<StructuredData>`; 19 schema ids suffixed; two hand-built shells normalised; register check now two-way and
  fails on client-only or homepage shells; CI equals `verify`; a stray 258 MB site export moved out of `app/`;
  `next-env.d.ts` untracked. Three new guard checks (45 total), each proven against a planted violation.
- Handbook rewritten where it was stale or incomplete: every count re-derived; every rule names its enforcer;
  recipes added for adding a programme (file order, row shape, level vocabulary, course codes never invented,
  health-allied profile), publishing a fee (key shape, what reaches JSON-LD, what is still hard-coded), retiring
  a page (authority map, link registries, llms route list, view deletion), partner landings (`EDU_PARTNERS` shape,
  alias chain, never in the sitemap); generator order (build first); CI stated exactly; commit subject rule
  reconciled with practice.
- CI caught that untracking `next-env.d.ts` removed the only ambient `.webp` module types on a fresh checkout
  (typecheck runs before build). `src/types/images.d.ts` now declares them; verified with the generated file absent.
- Verified at head: seo-guard 45/45; tests 39/39; typecheck clean (with and without next-env.d.ts); lint 0 errors
  (4 warnings); build 275 routes; redirects:check ok; audit:checklist pass; seo:gates pass; seo:facts 29/29.

## 2026-09-17 — Repository discipline: handbook, cleanup, redirect register (branch `docs/project-handbook`)

- `PROJECT.md` replaces `REMEDIATION_SUMMARY.md` as the single root Markdown: structure, sources of truth,
  invariants, recipes, the check/verify loop, current state. History moved here.
- Root cleanup (commit `chore(repo)`): 181 tracked files removed — Pages-router-era `lib/` and `components/`
  (dead, still carrying "Stmarys"), seven one-off root scripts, stale reports and CSVs, a OneDrive error dump,
  `scratch/`, `tmp/`, `Claude outputs/`, the separate "Nurseing Landing Page" Next project (already ported to
  `src/views/NursingLandingClient.tsx`). Root `data/` → `src/data`; tsconfig aliases reduced to `@/*`.
  20 unreferenced components/views and the no-op `<SEO/>` deleted. Export byte-identical (275 pages) outside
  build hashes and inline scripts.
- Redirects (commit `fix(redirects)`): 31 shells gained Apache 301s (0 client-only remain); five partner
  aliases had canonical ≠ target; `/llm`, `/phd-law`, `/llb-general` now target their live programme pages;
  `REDIRECT_MAP.csv` shell rows are generated by `scripts/redirect-map.mjs` and checked in `verify`.
- Tooling: `npm run check`, `npm run verify`, `npm run serve:out`, `redirects:map`, `redirects:check`;
  `engines.node >= 20`; `start` removed. seo-guard: Preloader check dropped (file deleted), root allowlist,
  required `PROJECT.md` sections, no stray root scripts added (see `scripts/seo-guard.js`).
- Verified at head: seo-guard pass; tests 39/39; typecheck clean; lint 0 errors; build 275 pages;
  redirects:check ok; audit:checklist pass; seo:gates pass; seo:facts 29/29.
- Deferred (tracked in `PROJECT.md` §9): ~800 MB of archive trees under `src/`, unimported `src/assets`,
  unreferenced public media, developer CMS fate, inline content pages, `next lint` migration.

## 2026-09-17 — Next.js 15.5.25 + React 19 (PR #9, branch `chore/next-15`)

- Cleared the CI critical-audit gate (two Next.js RCE advisories patched only from 15.5.24).
- Removed all `loading.tsx` boundaries: Next 15 exported the fallback inside `<main>` and streamed the page
  into a hidden div on 223/275 pages. Replaced by `nextjs-toploader`.
- Alias routes render `RedirectFallback` instead of `redirect()`, which exported bare error shells (43 pages
  without `<html lang>`). Two guard checks prevent regression.
- CI runs on every pull request (was filtered to `main`). 38 `<a href>` route links → `<Link>`. `/iiat/` alias
  pointed at a removed partner page (the one broken link on the site).
- Verified: CI green; 0 pending boundaries; 0 pages without lang; main text identical to the Next 14 build.

## 2026-09-17 — Quality pass (PR #8 head, commit 3df935e)

- Full degree names in titles/H1/Course.name; abbreviation in `alternateName`. Sentence-aware meta
  descriptions. One shared answer-first module for page copy and `Course.description`. Person + Breadcrumb
  schema on leadership pages. Partner iframe shells noindexed and out of the sitemap. Skip link; security
  headers; react-router alias and two dead files removed.

---

# Former REMEDIATION_SUMMARY.md (phase log, 14–16 September 2026, verbatim)

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

### Phase 4: Programme-page standard and course discovery (14 September 2026)
- **Course schema upgraded** (`buildCourseSchema`) for all 71 programme pages: `hasCourseInstance`
  (`courseMode: onsite`, campus `Place` with address + geo, `courseWorkload` = ISO duration),
  ISO-8601 `timeRequired` (`toIsoDuration`: "5 Years …" → P5Y), `educationalCredentialAwarded`,
  `coursePrerequisites`, and `offers` **only when a real fee exists** (never a placeholder price).
  Previously Course had no `hasCourseInstance` and no `offers`, making every page ineligible for
  Course rich results. `inLanguage`/`availableLanguage` set to en. The `keywords` searchTerms dump
  was removed from both the Course and WebPage JSON-LD on the programme route.
- **Fee plumbing** (`src/data/programme-fees.ts`): a typed `PROGRAMME_FEES` map keyed by programme
  path with `getProgrammeFee()`; empty today (no public fee table — fees must not be guessed). The
  facts table shows "Published at official admissions counselling" until a real figure lands, and
  the schema emits `offers` only then. All 71 fee gaps logged in `docs/seo/course-coverage.csv` and
  `docs/seo/needs-input.md`.
- **`/programmes/` A–Z catalogue** (`src/views/Programmes.tsx`, `src/lib/seo/programme-catalogue.ts`):
  every programme grouped by school with level, duration and fee, a client-side school/level/search
  filter (all 71 rows rendered in the static HTML — crawlable), `CollectionPage` + `ItemList` +
  `BreadcrumbList` schema. Tier-1 sitemap; linked from the footer and HTML sitemap. The single page
  an engine or LLM can crawl to learn the whole catalogue.
- **`docs/seo/course-coverage.csv`** (`scripts/course-coverage.mjs`, `npm run seo:coverage`): audits
  all 71 programmes × [page, title ≤65, answer-first ≥40w, fee/offer, eligibility, duration,
  approvals, curriculum, FAQs, Course, CourseInstance, image, words]. Result: **71/71 structurally
  complete** (Course + CourseInstance + curriculum + image + title ≤65 + FAQPage); gaps flagged for
  university input — fees 71, eligibility 45, richer answer-first ~57 (the stub programmes carry
  `{slug,name,level}` only). Every row is complete or carries a `NEEDS_INPUT` reason.
- **Fact fix**: `src/data/schools.ts` / `schools-patched.ts` still said "legally established as St.
  Mary's University" (a tautology the Phase 1 sweep created) — corrected to "St. Mary's
  Rehabilitation University" across all programme accreditation strings.
- Guard: 2 new invariants (`/programmes/` catalogue, Course `hasCourseInstance` + fee plumbing) →
  34 checks. All programme Course nodes carry the Google-required name + description + provider +
  `hasCourseInstance.courseMode`; `audit:checklist` reports `invalidJsonLd: 0`.
- **Deferred (needs university content, not invented):** per-programme fees, eligibility for 45
  stub programmes, and a 40–70-word answer-first lead for ~57 programmes — all tracked in
  `course-coverage.csv`. The named-hospital / salary-with-source / labs detail (Phase 4a items 4–5)
  likewise awaits real data. The catalogue reports 71 programmes, not the brief's "90+".
- Pages: 256 → 258 routes (+`/programmes/`, +1). Sitemap 180 → 181.

### Phase 5: AEO / GEO — be the cited answer (14 September 2026)
- **Fact-consistency guard** (`scripts/check-facts-consistency.mjs`, `npm run seo:facts`): asserts
  the bridge sentence is byte-identical across `site.ts`, `llms.txt`, `llms-full.txt`, the built
  `/smru/` and the homepage Organization JSON-LD, and that legal name, Ordinance/Act, UGC 2(f),
  sponsor society, email, postal code and the six schools match across the key built pages + llms
  files. `--strict` fails the build on drift. Runs post-build (needs `out/`); the source-level
  bridge check is also one of the `seo:guard` invariants. First run found and fixed a real gap —
  the official email was absent from both llms files — now **28/28 checks pass**.
- **llms-full.txt full catalogue** (`scripts/generate-llms.mjs`, `npm run seo:llms`): regenerates a
  `## Programme Catalogue` block (between `<!-- programmes:start/end -->` markers) listing all 71
  live programmes with canonical URL + level · duration · fee state, read from the built Course
  schema. A contact block (email, admissions phone, apply URL) was added to both llms files.
- **robots.txt** rewritten (`app/robots.txt/route.ts`) with an explicit `Allow` group for 20
  crawlers — classic (Googlebot, bingbot), answer-engine (OAI-SearchBot, PerplexityBot,
  Claude-SearchBot, Applebot) and generative (GPTBot, ChatGPT-User, ClaudeBot, Google-Extended,
  CCBot, Applebot-Extended, Bytespider, Amazonbot, cohere-ai, YouBot …) — each keeping
  `/developer/`, `/api/`, `/thank-you/` disallowed; `Sitemap:` points at the sitemap index.
- **Answer-first enforcement**: `analyzeHtml` now measures the first substantive (≥12-word)
  paragraph inside `<main>`; `seo-gates` fails when an entity/discovery page (`/`, `/smru/`,
  `/about/`, `/schools/`, `/programmes/`) leads with fewer than 35 words (the canonical bridge
  sentence length) and warns on programme pages that fall short (57 stubs — tracked in
  `course-coverage.csv`). `/about/` (18→41 w) and `/schools/` (32→39 w) gained real factual
  answer-first leads; all five entity pages now pass, **0 gate failures**.
- **Speculation rules**: dropped the eager `href_matches: "/*"` prefetch (it downloaded the whole
  site on mobile data); kept the small `prerender` list.
- **AI answer-audit harness** (`docs/seo/ai-audit.md`): the 15 fixed monthly questions, per-engine
  logging table, expected-answer anchors, and the trace-to-fix rule. The first live run against
  ChatGPT / Perplexity / Gemini / Copilot / Google AI Mode is a manual/logged-in step — the harness
  is ready; results are not fabricated here.
- Guard: 5 new invariants → **39 checks**. `npm run seo:llms` / `seo:facts` added.

### Phase 6: International — inbound + outbound (14 September 2026)
- **`<html lang>` en-IN → en** and **hreflang** (`en-IN` / `en` / `x-default`, all → the page's own
  canonical) now emitted on every `buildMetadata` page via `alternates.languages` — telling Google
  the site serves English speakers everywhere, not India-only. One URL set, no translation split.
- **`/international/` hub**: who can apply, qualification equivalence, English requirement, fees
  (INR + indicative USD, no invented figures), application steps, documents, the Indian
  student-visa + e-FRRO route, and arrival — with `WebPage` + `FAQPage` + `ContactPoint`
  (`International Admissions`, areaServed the 8 countries) schema.
- **8 country pages** `/international/{nepal,bangladesh,sri-lanka,bhutan,nigeria,kenya,uae,oman}/`
  from `src/data/international.ts`: each maps the local 12th-grade qualification to the Indian 10+2,
  gives the visa nuance, attestation/AIU route and a fee note — real public process facts only,
  never SMRU-specific fees. `generateStaticParams` + `dynamicParams = false`.
- **`/international/nri-admissions/`**: NRI / OCI / PIO route, documents, how it differs from the
  domestic and foreign-national routes.
- **`/carebridge/{destination}/` global-careers cluster** (6 pages: uk-nursing,
  uk-physiotherapy-hcpc, australia-ahpra, gulf-dha-haad, canada, usa-nclex): the regulator, the
  exam, a realistic timeline, what SMRU provides vs what the graduate must do, and the **mandatory
  disclaimer** — registration is granted by the foreign regulator (NMC, HCPC, AHPRA, DHA/DoH/MOH,
  NCLEX/state boards), never by SMRU — as the first block on every page.
  **[Corrected]** relocated to `/global-careers/` — see the note under Phase 7.
- **Organization schema** `areaServed` expanded from India-only to India + the 8 recruitment
  countries (with `GeoCoordinates` already present).
- **`/sitemap-international.xml`** added as a 5th sitemap-index child (16 URLs: hub + NRI + 8
  countries + 6 carebridge destinations).
- **`docs/seo/international-citations.md`**: ready-to-send listing brief for the marketing team
  (StudyInIndia, StudyPortals, AIU, Yocket, Leverage Edu, EDUopinions, ICCR, country agent
  directories) with the standard name + bridge sentence.
- Guard sitemap-index check now requires the `international` child. Pages 258 → 274 routes;
  hreflang on 256/273 built pages (the 17 without are static/partner-archive/redirect-shell files
  that bypass `buildMetadata`). `langNotEn` warnings 252 → 1 (the standalone `/360/hostel/` viewer).

### Phase 7: Off-site playbook + content QA (14 September 2026)
- **`docs/seo/offsite-playbook.md`** — ready-to-send copy (humans execute): a single standard
  copy block; Google Business Profile setup + review-request template; aggregator corrections
  (Shiksha listing 246974 merge, Collegedunia year/course-count/fee fixes, Careers360/CollegeDekho/
  GetMyUni/Justdial); Wikidata statements with citations; Wikipedia list rows; society + partner
  link-request template (anchor "St. Mary's University (SMRU)", not "powered by {partner}");
  smru.in certificate renewal + 301s; regulator listings; social display names; Search Console /
  Bing / IndexNow + the monthly AI-audit routine. Priority-ordered.
- **Content QA (full built site):** red-flag scan clean — 0 `St.Mary` no-space, 0 legal-name
  tautology, 0 placeholder/lorem text; every "best/top/No.1/guaranteed placement" hit is inside
  disclaimer copy that tells students *not* to trust such claims. 0 duplicate titles, 0 duplicate
  descriptions across 208 indexable pages. All 6 `/carebridge/*` disclaimers present; all 8 country
  pages carry the equivalence + visa facts; regulator/exam names (NMC, HCPC, AHPRA, NCLEX-RN,
  DHA/DoH/MOH) verified accurate. Remaining minor items: 8 descriptions < 70 chars and ~20 thin
  *utility* pages (brochure/360/handbook/html-sitemap/status) — functional pages, not content;
  the one partner phrase "100% Placement Assistance" on `/carebridge/` is partner content (not a
  job guarantee) and left untouched per the no-touch-partner-content rule.

### Correction: global-careers moved out of the partner /carebridge/ namespace (14 September 2026)
Carebridge is a third-party industry/skill **partner**, not SMRU's own programme. The Phase 6
global-careers pathway pages had been placed under `/carebridge/{destination}/`, inside the partner's
brand namespace — a violation of the "do not touch partner commercial content" rule. Corrected:
- The 6 licensing-pathway pages moved to **`/global-careers/{destination}/`** (SMRU-owned) plus a new
  **`/global-careers/`** hub with an `ItemList` of the pathways. None of them carry Carebridge
  branding — they describe NMC / HCPC / AHPRA / DHA-DoH-MOH / NCLEX pathways in SMRU's own voice.
- `/carebridge/` is left as the partner's landing page **only** (verified: no SMRU pathway sub-pages
  under it in the build).
- Data renamed `CAREBRIDGE_DESTINATIONS/DISCLAIMER` → `GLOBAL_CAREER_PATHWAYS`/`GLOBAL_CAREER_DISCLAIMER`;
  sitemap-international, the `/international/` hub link, and the three docs updated. Regulator
  disclaimer still leads every pathway page.

### Production-readiness pass (15 September 2026)
An 8-dimension adversarial audit (build/config, on-page meta, structured data, redirects/links/
assets, content & rules, performance, accessibility, crawl/indexation — 40 raw findings, 34
confirmed after independent re-verification) was run against the built export and every real
issue fixed:

- **Blocker — fabricated facts removed.** The Nursing hub asserted "100-Bed Rehabilitation
  Hospital", "50-Bed Mental Health Hospital" and "our own hospitals" (no source) and cited a wrong
  legal basis ("Act 2018 … Gazette No. 2 dated 25 July 2025"). Replaced with unquantified
  clinical-placement wording ("confirmed at admissions counselling") and the canonical Ordinance
  No. 2 of 2025 / Act No. 10 of 2026 sentence; card sub-headings h4→h3 (no skipped level).
- **Blocker — partner pages publishing unverified claims about SMRU** (`/partner/edinbox/`
  "India's First Rehabilitation University", "100-bedded hospital", "50+ years / 5,000 graduates";
  `/partner/qtst/` "India's pioneering"; `/partner/veloces/` hard B.Tech fee figures) are now
  **noindex,follow** and out of the sitemap — reachable, content untouched (partner rule), but no
  longer SMRU's indexed statement. Raw partner iframe HTML under `/partners/*.html` gets an
  `X-Robots-Tag: noindex` header. Logged in `needs-input.md` for the partners to correct their copy.
- **Programme count reconciled**: "90+ / more than 90" (brief figure) → "70+" in all prose; the
  catalogue's computed 71 stands. `/schools/` "71+ Programs" → "70+".
- "500+ healthcare employer partners" (an Emversity claim quoted in 4 programme overviews +
  bullets) → "a network of healthcare employer partners" (SMRU cannot verify a partner's count).
- **Structured data**: the `keywords` list (with "best/top … in Hyderabad" strings) stripped from
  all 21 school/department `CollectionPage` nodes — no superlatives left in SMRU's own JSON-LD.
- **Indexation**: `/niat-upskilling/` (9-word placeholder), `/campus-guide/` (6-word client shell)
  and `/landing/law/` (PPC duplicate of `/schools/law/`) → noindex; `/explore-smru|stmarys/` now
  301 to `/explore/` (real content) instead of the empty shell; orphaned/missing indexable pages
  (`/explore/`, `/hostel-360/`, `/leadership/`, `/ugc-disclosure/`, `/statutory-disclosures/`,
  `/grievance-redressal/`, `/iqac-quality-assurance/`) added to the sitemap; `/ist/` shell now
  points at `/partner/` (ist is a removed partner). 6 internal links that routed through school
  301s repointed to `/schools/…`. Indexable 208 → 202, sitemap 202, all resolve.
- **Performance**: the loading splash used the 379 KB `Logo.png` (→ 30 KB `Logo.webp`); 12
  partner logos (301 KB) were eagerly preloaded on the homepage because React Float hoists plain
  `<img>` in the SSR shell — now `loading="lazy"` (below the fold, no preload); unused Google
  Fonts preconnects removed (fonts are self-hosted); `campus-life.webp` 579 → 322 KB; a proper
  1200×630 **JPG** OG image (`/assets/og-default.jpg`, 189 KB) replaces the 560 KB WebP that
  LinkedIn/WhatsApp render inconsistently.
- **Apache**: `Order/Deny` → `Require all denied` (2.4) with a 2.2 compat fallback;
  `ErrorDocument 500 /500.html` added.
- **Accessibility**: the standalone `/360/hostel/` viewer gains `lang="en"` and allows pinch-zoom.
- 5 policy pages (`admission-policy`, `refund-policy`, `grievance-redressal`, `anti-ragging`,
  `iqac-quality-assurance`) routed through `buildMetadata` — page-specific OG + hreflang.
- The flaky `tests/audit-comparison.test.mjs` (spawnSync `status:null` under load) hardened with
  `maxBuffer` + `timeout`.
- **Deliberately not done**: pruning ~19 MB of unreferenced `out/assets` originals (the audit's
  230 MB figure over-counted dynamically-referenced files; a prune risks a hidden reference) —
  left for the team to clean `public/` at source. 45 stub programmes still lack
  `coursePrerequisites` (data gap, tracked). Runtime: the `Failed to fetch RSC payload` console
  line is the benign `output: export` soft-nav fallback (hard navigation works); the
  `ERR_CONNECTION_REFUSED` seen locally is the single-threaded test server, not Apache.
- Final: typecheck · lint 0 · test 35/35 · seo:guard 39/39 · build 277 · links 0 broken ·
  audit (0 broken/hashes/dupIds/invalidJsonLd/missingAssets/secrets, release gate pass) ·
  seo-gates 0 failures · seo:facts 29/29 · coverage 71/71 — **ready to deploy**.

### Performance pass (15 September 2026)
Delivery-only optimisation: a crawl of all 275 pages before and after shows **0 semantic
differences** (titles, descriptions, canonicals, robots, H1s, JSON-LD types, word counts identical).

- **Compression (biggest win, server-side).** `public/.htaccess` had no `mod_deflate`/`mod_brotli`
  config — every HTML/JS/CSS byte shipped uncompressed. Now brotli (when the module exists) else gzip
  for text/html, css, js, json, xml, svg, RSC `.txt`; images/woff2/mp4 excluded. Measured on the
  wire: homepage 196 KB → **25 KB brotli** (34 KB gzip); `/schools/law/` 183 → 22 KB; the 315 KB
  three.js chunk → 62 KB.
- **Cache-Control** made explicit: hashed `/_next/static/*` → `max-age=31536000, immutable`;
  media/fonts 30 d; other js/css 1 d; HTML, RSC `index.txt`, sitemaps, robots → `max-age=0,
  must-revalidate` so deploys propagate. `mod_expires` kept as a fallback.
- **Link prefetch burst.** Every page prefetched the RSC payload of every visible `<Link>` — the
  Navbar + Footer alone are 46 links → **~993 KB raw (~248 KB brotli) fetched speculatively on every
  visit**, mostly wasted on mobile. `prefetch={false}` on the 46 nav/footer links: viewport
  prefetch off, hover prefetch still on, so navigation stays instant. Homepage on-load RSC
  prefetches 49 → **1**; total requests 1,670+ → 73.
- **Soft navigation verified working** (`output: export`): Next appends `index.txt` and accepts
  `text/plain`, so Apache serves it natively — a real click to `/admissions/` kept a JS marker alive
  (true client-side navigation). The `ERR_CONNECTION_REFUSED` / "Failed to fetch RSC payload" seen
  earlier was the single-process local test server dropping the prefetch burst, now gone.
- **LCP hero**: `<picture>` serves an 820 w variant (**78 KB**) to viewports ≤768 px instead of the
  1600 w file (317 KB, re-encoded from 379 KB) — viewport-based so DPR cannot defeat it; React
  Float does not auto-preload `<img>` inside `<picture>`, so phones never fetch the desktop file.
  Hero removed from the hover-prefetch media map.
- **School hub route**: `/schools/[schoolSlug]` statically imported the Law, Nursing *and* generic
  views (a Phase 2 regression) — Law and Nursing are now `next/dynamic`, so Law is its own 62 KB
  chunk loaded only on `/schools/law/`.
- Meta Pixel `<noscript><img>` was being preloaded by React Float on every page → `loading="lazy"`.
- `tests/audit-comparison.test.mjs`: child-process runs retry once on `status === null` (load
  hiccup) — 35/35 three consecutive full runs.
- Not changed (out of "don't break anything" scope): `"use client"` page views (Home, School,
  Program) and `framer-motion` on `/academic-structure` / `/campus-guide` — a larger refactor;
  the 360-tour libs (527 KB) are already code-split to the tour pages only.

### Content pass — sensitive surfaces, written plainly (16 September 2026)
A content-expert rewrite of the copy that carries the most risk and the most reader intent. No
fact was added that the university has not published; every caveat is now said once, with the one
useful next step, instead of repeated as deflection.
- **Programme pages (71):** the answer-first paragraph now leads with substance — what the
  programme is, school/department, campus, duration, eligibility, and the single honest fee line —
  instead of ending in navigational filler; the small "Recognition & Verification" card moved below
  the overview so the answer paragraph is the first thing engines read (`answerFirstProgramme`
  warnings **57 → 0**). The six discipline fallbacks (`getProgramPositioning`) rewritten as concrete
  descriptions of what the field covers ("dynamic patient-care ecosystem" → what allied-health
  professionals actually do). "a Undergraduate" grammar fixed.
- **24 health-allied `directAnswer`s** rewritten from "…for students comparing X, Y and admission
  guidance" SEO-speak into one clear sentence each on what the discipline is and trains you to do.
- **Programme / school / department FAQs (705 Q/A pairs):** natural questions ("How long is BPO?",
  "Who is eligible for…?") replace robotic ones ("What overview is available for…?"); the
  fallback that answered factual questions with an unrelated UGC-recognition note is gone —
  missing facts get an honest "confirmed at admissions counselling — call / email" answer in the
  visible Quick Answers, and are **dropped from FAQPage schema** rather than published as
  non-answers (**0 non-answers** across all 71 pages, was widespread). The recognition line is one
  plain sentence with the university/programme distinction.
- **`/fee-structure/`:** the policy stated once (fee shared per applicant at counselling, and why),
  what a fee comprises (tuition, application, exam, caution deposit, lab/clinical, hostel & mess —
  heads, not amounts), how to get the figure, scholarships and refunds. The seven-row "confirmed at
  counselling" padding table removed.
- **`/approvals-recognitions/`:** "Statutory Trust & Compliance", "Academic Context: St. Mary's
  Legacy", "Verified Digital Repository", "Legacy of Trust" replaced with plain headings and the
  canonical establishment/recognition sentence; the sponsoring society named; the university-vs-
  programme approval distinction explained once; a disambiguation FAQ added.
- **`/admissions/`:** "Backed by St. Mary's educational legacy…" → the concrete facts (UGC-recognised,
  70+ programmes, six schools) and what the admissions team actually helps with.
- `docs/seo/ai-audit.md` anchor for "What is SMCET?" corrected: no entrance exam is currently
  announced (the official `/exam-notification/` page), so an engine asserting an active SMCET is
  repeating retired copy.
- Verified: typecheck · lint 0 · test 35/35 · guard 39/39 · build 277 · links 0 broken · audit
  clean · gates PASS · facts 29/29 · coverage 71/71.


---

# Pre-rebuild notes (July 2026, carried over verbatim; superseded by the phases above)

## Status: brief Phases 0–7 complete

All seven phases of the Antigravity brief are implemented and verified (typecheck · lint · test ·
seo:guard · links:internal · audit:checklist · build · seo-gates · seo:facts all pass). The one
planned surface **not** in the brief — a dated **News/Blog** section (recommended in the diagnosis §8)
— remains as optional follow-up. Outstanding facts requiring university input are tracked in
`docs/seo/needs-input.md`; the off-site work is a human task list in `docs/seo/offsite-playbook.md`.

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
