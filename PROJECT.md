# smru.edu.in — project handbook

The one file to read before changing anything, and the one file to update after. It is the only
Markdown allowed at the repository root (enforced by `npm run seo:guard`). Everything else that is
prose lives under `docs/`. If a rule here and the code disagree, the code is wrong or this file is
stale; fix one in the same commit.

**Give this file to an AI assistant before asking it to change the site.** Every recipe below is
written so that following it produces work the verification chain accepts.

Status date: 17 September 2026 · Release Decision: see [Current state](#current-state)

---

## 1. What this is

The public website of **St. Mary's University (SMRU)**, Hyderabad — the public name of
**St. Mary's Rehabilitation University**, a UGC-recognised private university established under
Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.

| | |
|---|---|
| Stack | Next.js 15 App Router, React 19, TypeScript (non-strict), Tailwind 3.4 |
| Output | **Static export** (`next.config.mjs`: `output: "export"`, `trailingSlash: true`). No Node server in production. |
| Hosting | Apache. Deploy `out/` **together with** `public/.htaccess` (redirects, headers, caching, 404). |
| Node | 20 (`.nvmrc`, CI). `package.json` declares `engines.node >= 20`. |
| Repository | `github.com/Ram-9177/smru.edu.in`, default branch `main`. There is no other remote. |
| Live pages | 275 exported HTML pages: 71 programme pages across 6 schools, hubs, guides, compliance, international, partner landings, 46 redirect shells. |

The site exists to be **found, trusted and cited**: by Google, by AI answer engines, and by
students and parents checking facts. Most rules in this file come from that goal. The reasoning
behind them is in `docs/seo/SMRU_SEO_AEO_GEO_Diagnosis_and_Plan.md` (the diagnosis) and
`docs/seo/ANTIGRAVITY_PROMPT_SMRU_SEO.md` (the phased brief that built the current site).

---

## 2. Repository structure

Only these entries may exist at the root. Anything else fails `npm run seo:guard`.

```
app/            Next.js App Router routes — one folder per URL, thin page.tsx files (§3)
src/            All application source (§3). The only import alias is "@/*" → "src/*".
public/         URL-addressed static files served verbatim (§6)
scripts/        Verification, audit and generation tooling (§7). ESM .mjs; node: built-ins only.
tests/          node:test suites, one file per subject: tests/<subject>.test.mjs
docs/seo/       Plans, playbooks, trackers, generated CSVs, the changelog. Prose goes here, never at root.
tools/          Local-only developer tools (campus map calibrator). Never shipped.
.github/        One workflow: seo-hardening-ci.yml
PROJECT.md      This file. The only root-level .md.
REDIRECT_MAP.csv  The redirect register (§5). Shell rows are generated; Apache rows are hand-kept.
package.json  package-lock.json  next.config.mjs  tsconfig.json  tailwind.config.js
postcss.config.js  .eslintrc.json  .nvmrc  .gitignore  next-env.d.ts
```

Ignored, never committed: `node_modules/`, `.next/`, `.next-dev/`, `out/`, `output/` (audit
reports), `.claude/`, `tmp/`, `scratch/`, `*.log`. Scratch work goes in `scratch/` or `tmp/`;
they are gitignored on purpose. One-off scripts are not committed at all; if a script is worth
keeping it gets a header comment, an `npm run` entry and lives in `scripts/`.

### `src/` layout

```
src/app-facing code
  views/         One default-exported component per route body, named after the route (Home, Program, Contact…).
                 37 of 41 are "use client". A view is imported by exactly one app/**/page.tsx (LawHubPage wraps SchoolOfLaw).
  components/    Reusable pieces used by ≥1 view/page or by AppShell.
    seo/         Server templating primitives: StructuredData, InformationPage, SeoRoutePage, PageSections,
                 RelatedLinks, RedirectFallback. (PageSections/RelatedLinks are "use client".)
    search/      Client search island.
    developer/   Local-only CMS dashboard. Has NO route (a test forbids app/developer). Do not wire it into pages.
    AppShell.tsx Owns all layout chrome: skip link, ticker, Navbar, MobileMenu, sticky CTA, Footer, ApplyModal provider.
  context/, hooks/  ApplyModalContext (Meritto/CTPL apply flow), useOpenApply, useIframeAutoHeight.
  styles/globals.css  The only stylesheet. House classes live in @layer components (.smru-*, .cut-corner-*).

src/facts and rules (the sources of truth, §4)
  data/          Catalogue and content data: schools.ts, official-courses.ts, programme-fees.ts, leaders.ts,
                 international.ts, events.ts, careers.ts, law.ts, law-brochures.ts, seo-pages.ts,
                 compliance-pages.ts, course-seo.ts, home-data.ts, about-faqs.ts, campus-tour.ts, course-codes.ts.
  lib/shared/    Identity + URL rules: university.ts, site-constants.ts, programme-names.ts, program-utils.ts,
                 redirect-metadata.ts, partner-alias-redirects.ts, partner-pages.ts, school-landing.ts,
                 dynamic-route-metadata.ts, official-documents.ts, media.ts, gtag.ts.
  lib/seo/       Search/answer-engine layer: site.ts (SITE_IDENTITY), schema.ts (all JSON-LD builders), json-ld.ts,
                 sitemap.ts, authority-map.ts, info-pages.ts, safe-guides.ts, academic.ts, programme-answer.ts,
                 programme-catalogue.ts, course-list.ts, search-intent.ts, health-allied-course-seo.ts,
                 home-faqs.ts, static-page-faqs.ts, visibility.ts.
  lib/metadata.ts  buildMetadata — the ONLY way a page gets <title>, description, canonical, OG, hreflang.

src/binary and archive trees (see §6 — these are the known debt)
  assets/        Webpack-imported images (logo, leader portraits, partner logos). Imported relatively: ../assets/x.webp
  360/, Audio/, Law_Brouchers/, "Partners - Codes"/, "Syllabus For SMCET"/
                 Archives of originals, ~800 MB. Not read by any code. Do not add to them; see §9 for their fate.
```

### Naming

- Folders and route slugs: `kebab-case`. Programme slugs are derived with `safeSlug(slug, name)` from
  `src/lib/shared/program-utils.ts` and nowhere else.
- Components and views: `PascalCase.tsx`, default export, file named after the export.
- Library modules: `kebab-case.ts`, named exports; data registries `UPPER_SNAKE` consts with a lookup helper
  beside them (`leaderBySlug`, `getProgrammeFee`, `INFO_PAGE_MAP`).
- Scripts: `kebab-case.mjs`; tests: `tests/<subject>.test.mjs` (nested folders are not discovered).
- New files under `public/`: `kebab-case`, no spaces, no capitals. (Legacy files with spaces exist; do not add more.)
- Never create a second file that does what an existing module does. Grep first; the repo has been
  cleaned of duplicates once and the guard now watches the root.

---

## 3. How a page is built

Every URL is `app/<path>/page.tsx`. A page file is **thin**: metadata, JSON-LD, one view.

```tsx
// app/example/page.tsx — the canonical shape
import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import Example from "@/views/Example";

const title = "Example | St. Mary's University";
const description = "One or two full sentences, factual, ends with a full stop.";

export const metadata: Metadata = buildMetadata({ title, description, pathname: "/example" });

export default function Page() {
  return (
    <>
      <StructuredData id="example-breadcrumb-schema" data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Example", path: "/example" }])} />
      <StructuredData id="example-webpage-schema" data={buildWebPageSchema({ title, description, pathname: "/example" })} />
      <Example />
    </>
  );
}
```

Rules, each enforced by a guard check, a test or the build unless marked *(convention)*:

1. **Metadata only via `buildMetadata`** (`src/lib/metadata.ts`) with an explicit `pathname`. It caps the
   title at 65 chars (41-char primary + ` | St. Mary's University`), cuts the description at a sentence
   boundary ≤155 chars, sets canonical/og:url/hreflang from the pathname. The root layout sets no canonical.
   Redirect shells use `buildRedirectMetadata(title, targetPath)` from `src/lib/shared/redirect-metadata.ts`.
2. **JSON-LD only via `<StructuredData>`** with builders from `src/lib/seo/schema.ts`. Ids are
   `<slug>-<kind>-schema`. Organization and WebSite nodes are emitted once in `app/layout.tsx`; page nodes
   reference them by `@id`. Pass `null` to suppress a block.
3. **Dynamic segments** (`[slug]`) export `generateStaticParams()` over a data module, an async
   `generateMetadata(props: { params: Promise<…> })`, an async default `Page` that awaits `props.params`,
   and call `notFound()` on a miss. `params` is a Promise in Next 15; the codemod already converted all 13.
4. **Explicit route + catch-all collision:** if you add `app/<slug>/page.tsx` and `<slug>` also exists in
   `src/lib/seo/info-pages.ts`, add it to `EXPLICIT_PAGE_SLUGS` in `app/(seo-pages)/[slug]/page.tsx`
   (guides: `EXPLICIT_GUIDE_SLUGS` in `app/guides/[slug]/page.tsx`). Keep them literal `new Set([...])`; a
   test parses them.
5. **No `loading.tsx` anywhere under `app/`.** In a Next 15 static export the fallback is written inside
   `<main>` and the real page streamed into a hidden div; non-JS crawlers see a spinner. Navigation
   feedback comes from `nextjs-toploader` in the root layout.
6. **No `redirect()` / `permanentRedirect()` in a page.** They export an `<html id="__next_error__">`
   shell with no layout, no `lang`, no meta refresh. Aliases render `<RedirectFallback targetUrl=… />` (§5).
7. **Route links use `<Link>`** from `next/link`, never `<a href="/…">` (ESLint error under Next 15).
8. **Sitemap membership is opt-in.** A new static page is added to `tier1Routes`/`tier2Routes`/`tier3Routes`
   in `src/lib/seo/sitemap.ts`. Data-driven routes enter through the loops there. Utility pages pass
   `robots: "noindex,follow"` to `buildMetadata` and stay out.
9. **Every page has one `<h1>`.** If the view has none, the page adds `<h1 className="sr-only">`.
10. *(convention)* Client components start with `"use client"` on line 1. Heavy views are code-split with
    `next/dynamic`. A client component is colocated in `app/` only when tiny and route-specific.
11. *(convention)* Styling is Tailwind utilities plus the house classes in `src/styles/globals.css`. Brand colours:
    `#0d315c` navy, `#019e6e` green, `#ffaf3a` amber, `#f8fbff` surface. Fonts via `next/font` variables
    (`--font-inter`, `--font-outfit`, `--font-cinzel`). Do not add a stylesheet or a CSS-in-JS library.

### Programme pages (`/schools/{school}/{dept}/{programme}/`)

The most important 71 pages. They are generated from data, not written by hand:

- Which programmes exist, their slug, official name, level, duration and course code: `src/data/official-courses.ts`.
  Editorial fields (overview, eligibility, labs, careers, curriculum): `src/data/schools.ts`. The two are merged
  at module load; a programme that is not in `src/data/official-courses.ts` is **not routable**.
- Full display name, ≤41-char title name, credential: `src/lib/shared/programme-names.ts`. Always read names
  through `getProgrammeDisplayName / getProgrammeTitleName / getProgrammeShortName / getProgrammeCredential`.
- The answer-first opening paragraph: `src/lib/seo/programme-answer.ts` — used by both the view (visible copy)
  and the route (`Course.description`) so they cannot drift. Guarded.
- Fees: `src/data/programme-fees.ts`, keyed by programme path. Empty by design until the Registrar supplies
  figures. `Course.offers` is emitted only when a real fee exists. Guarded.
- Titles follow `"{Full name} in Hyderabad: Fees, Eligibility 2026"`, dropping suffixes until 41 chars fit.

---

## 4. Sources of truth

Edit the fact in exactly one place. Everything else derives from it.

| Fact | File |
|---|---|
| Public name, short name, legal name, address, logo, OG image | `src/lib/shared/university.ts` |
| Bridge sentence, founding date, sponsor, geo, `@id`s, schema `alternateName`s, Organization phone | `src/lib/seo/site.ts` |
| Contact phones, email, apply URLs, Meritto keys, social links, hidden-CTA routes | `src/lib/shared/site-constants.ts` |
| Schools, departments, programme editorial text, `EDU_PARTNERS` registry | `src/data/schools.ts` |
| Routable programme register (slug, code, level, duration) | `src/data/official-courses.ts` |
| Programme names and credentials | `src/lib/shared/programme-names.ts` |
| Programme fees (the only place a figure may be entered) | `src/data/programme-fees.ts` |
| Leaders, governance bodies | `src/data/leaders.ts` |
| Partner alias → canonical partner path | `src/lib/shared/partner-alias-redirects.ts` |
| Removed partner slugs, top-level partner landings | `src/lib/shared/partner-pages.ts` |
| Which partner landings are indexable | `app/(Partners)/partner/[slug]/page.tsx` (mirrored in `src/lib/seo/sitemap.ts`) |
| Trust / compliance / local info pages | `src/lib/seo/info-pages.ts` |
| "Best/top" comparison guides | `src/lib/seo/safe-guides.ts` |
| Templated `/seo`, `/admission-guides`, `/student-guides` pages and their retirement targets | `src/data/seo-pages.ts` |
| Compliance page registry, `NOINDEX_COMPLIANCE_PATHS` | `src/data/compliance-pages.ts` |
| International countries, global-career pathways | `src/data/international.ts` |
| Events, careers, home content, about FAQs, campus tour locations | `src/data/{events,careers,home-data,about-faqs,campus-tour}.ts` |
| Official documents (Act, UGC 2(f) letter, notices) | `src/lib/shared/official-documents.ts` |
| Nav/footer authority pages and anchor text | `src/lib/seo/authority-map.ts` |
| Sitemap tiers, image sitemap, lastmod | `src/lib/seo/sitemap.ts` |
| robots.txt policy and AI-crawler allowlist | `app/robots.txt/route.ts` |
| Server 301s, headers, caching, 404 document | `public/.htaccess` |
| Redirect register | `REDIRECT_MAP.csv` (shell rows generated by `npm run redirects:map`) |
| LLM-facing identity text and programme block | `public/llms.txt`, `public/llms-full.txt` (block generated by `npm run seo:llms`) |
| Facts the university still owes us | `docs/seo/needs-input.md` |
| Architecture invariants | `scripts/seo-guard.js` |

### The naming standard (apply mechanically)

| Where | Form |
|---|---|
| First mention on a page | **St. Mary's University (SMRU)** — with the space and the apostrophe |
| Later mentions | St. Mary's University *or* SMRU |
| Legal name (footer, `legalName`, statutory pages) | **St. Mary's Rehabilitation University** |
| Bridge sentence, verbatim, on `/`, `/about/`, `/smru/`, `public/llms.txt`, Organization `description` | *St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.* |
| Campus | Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, near Ramoji Film City, Hyderabad, Telangana 508284 |
| **Never** | `St.Mary's` (no space), `St.Marys`, `Stmarys`, "St. Mary's University powered by {partner}" as an institution name |

The guard scans `src/`, `app/` and both llms files for the forbidden forms and checks the bridge
sentence is byte-identical everywhere it must appear.

### Facts that must never be invented

Fees, intake numbers, council approvals (RCI/INC/NCAHP/BCI/PCI), NAAC/NIRF status, placement figures,
salaries, faculty names, hospital partners, foreign licensing outcomes, superlatives ("best", "#1",
"India's first"). University-level UGC Section 2(f) recognition is the only approval asserted.

When a fact is missing, do all four, in the same commit:

1. Visible copy says *"confirmed at admissions counselling"* (see `ASK_ADMISSIONS` in `src/lib/seo/academic.ts`).
2. The schema field is omitted (never a placeholder value in JSON-LD).
3. `docs/seo/course-coverage.csv` shows `NEEDS_INPUT` for that cell (regenerated, not hand-edited).
4. A row is added to `docs/seo/needs-input.md`: item, page(s), why, who can answer.

Partner-supplied content is never edited. An unverifiable partner claim about SMRU on our domain is
handled with `noindex,follow`, removal from the sitemap, and a needs-input row asking the partner to
align to the bridge sentence.

---

## 5. Redirects and retired URLs

Every removed or renamed URL gets **a specific target**, never the homepage, implemented twice:

1. **Server:** a `RewriteRule … [L,R=301]` in `public/.htaccess` (the real redirect for browsers and Googlebot).
2. **Shell:** `app/<old>/page.tsx` renders `<RedirectFallback targetUrl={TARGET_PATH} />` with
   `buildRedirectMetadata(title, TARGET_PATH)` so nothing 404s without Apache and crawlers still see a
   complete document (noindex, canonical → target, meta refresh, visible link).

```tsx
// app/old-url/page.tsx — the only acceptable shape for an alias
import RedirectFallback from "@/components/seo/RedirectFallback";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

const TARGET_PATH = "/new-url/";                 // or getPartnerAliasRedirect("slug") for partner aliases

export const metadata = buildRedirectMetadata("New Page | St. Mary's University", TARGET_PATH);

export default function Page() {
  return <RedirectFallback targetUrl={TARGET_PATH} />;
}
```

One `TARGET_PATH` feeds both the canonical and the refresh so they cannot disagree. After `npm run build`,
`npm run redirects:map` rewrites the shell rows of `REDIRECT_MAP.csv` from the export and
`npm run redirects:check` fails if the register is stale or an Apache row has no matching rule. Both run
inside `npm run verify`. Retirement rationale for templated pages is recorded in
`docs/seo/phase3-retirement-map.md`; their targets live in `RETIRED_SEO_PAGE_TARGETS` (`src/data/seo-pages.ts`).

---

## 6. Assets

Two planes, chosen by how the file is consumed:

| Plane | Where | Referenced how | Use for |
|---|---|---|---|
| URL-addressed | `public/…` | root-absolute string `"/assets/x.webp"`, `resolveAssetSrc()` accepts either plane | panoramas, tiles, audio, video, PDFs, iframe HTML, OG image, sitemap images, favicons |
| Bundled | `src/assets/…` | relative import `../assets/x.webp` → hashed `/_next/static/media/…` | site logo, leader portraits, partner logos, small fixed visuals |

Rules:

- Every raster ships as `.webp`; keep the original only if regeneration is needed. `scripts/optimize-images-webp.mjs`
  creates the twin and rewrites references (it edits committed files; review the diff).
- Public media is not content-hashed and is cached 30 days by `.htaccess`. **A changed asset gets a new file name.**
- A campus-360 location is `public/campus-360/<slug>/` with `panorama.jpg` + four derived `.webp`
  (`scripts/generate-campus360-optimized.mjs`) and a `location("<slug>", …)` entry in `src/data/campus-tour.ts`.
- Campus-guide narration: `public/campus-guide/audio/<en|hi|te>/common/<slug>.mp3`, bound in
  `public/campus-guide/data/guide.json`.
- Official PDFs: `public/assets/` (or `public/assets/handbook/`), registered in `src/lib/shared/official-documents.ts`.
- Law brochures: `public/law-brochures/`, mapped in `src/data/law-brochures.ts`.
- Raw partner HTML: `public/partners/<slug>/`, iframed via `src/views/PartnerIframePage.tsx`, kept out of the
  index by the `.htaccess` `X-Robots-Tag` rule.
- `public/images/` is legacy (nursing landing, campus-life section). New images go under `public/assets/`.

---

## 7. Tooling and verification

Run everything from the repository root. Every script prints one JSON summary line.

### The two commands you actually run

| Command | When | What it does |
|---|---|---|
| `npm run check` | before every commit (≈30 s) | `seo:guard` → `typecheck` → `test` → `lint` |
| `npm run verify` | before every push (≈4 min) | `check` → `build` → `redirects:check` → `audit:checklist -- ci --strict` → `seo:gates -- ci --strict` → `seo:facts -- --strict` |

CI (`.github/workflows/seo-hardening-ci.yml`) runs on every pull request and on pushes to `main`:
`npm audit --audit-level=critical`, then the same steps as `verify` (the audit step is CI-only because it
needs the lockfile). CI green is required to merge. Lint warnings do not fail; there are 5 known
`react-hooks/exhaustive-deps` warnings.

### What each gate protects

| Gate | Fails when |
|---|---|
| `scripts/seo-guard.js` (≈40 named checks) | an architecture invariant is broken: naming standard, bridge sentence, single root `.md`, allowed root entries, no `loading.tsx`, no `redirect()` in pages, sitemap index shape, guarded `.htaccess` rules, Course schema plumbing, programme-page standard, AI-crawler robots policy… Change a guarded string → update the guard **in the same commit** and say so in the message. |
| `tsc --noEmit` | type errors (tsconfig is non-strict; don't add `// @ts-nocheck`, 17 legacy files still carry it) |
| `node --test tests/*.test.mjs` | route-collision sets drift, JSON-LD escaping breaks, developer route reappears, crawl gates or visual-audit registries misbehave |
| `next lint` | ESLint errors (`next/core-web-vitals`); `<a>` for internal routes is an error |
| `next build` | any route fails to prerender; also re-runs type and lint checks |
| `redirects:check` | `REDIRECT_MAP.csv` disagrees with the export or `.htaccess` |
| `audit:checklist -- ci --strict` | any release blocker > 0: broken internal links, broken hashes, duplicate ids, invalid or duplicate JSON-LD, missing assets, secrets or credentials in source or bundle, source maps, debug routes, non-production metadata |
| `seo:gates -- ci --strict` | on the export: titles > 65, duplicate titles, descriptions cut mid-sentence, missing/multiple `<h1>`, missing canonical, sitemap lists a noindex or 404 page, entity pages open with < 35 words |
| `seo:facts -- --strict` | bridge sentence, legal name, ordinance/act, UGC 2(f), sponsor, email, postcode or the six school names differ between `src/lib/seo/site.ts`, the llms files and the built pages |

### Generators (they overwrite committed files — run, review the diff, commit)

| Command | Writes |
|---|---|
| `npm run redirects:map` | shell rows of `REDIRECT_MAP.csv` (from `out/`) |
| `npm run seo:llms` | the programme block of `public/llms-full.txt` |
| `npm run seo:coverage` | `docs/seo/course-coverage.csv` |
| `npm run seo:crawl -- <path.csv>` | a crawl CSV. **Always pass a path**; the default target is the frozen live-site baseline `docs/seo/baseline-2026-09.csv`, which must not be regenerated. |

Run the first three whenever programme data, names, fees, aliases or `.htaccess` change, then re-run `verify`.

### Other tools

`npm run serve:out` serves `out/` at `http://127.0.0.1:4173` the way Apache does (directories → index.html,
404 → `404.html`). `npm run audit:frontend` and `npm run audit:visual` need it running and need puppeteer
(not available in CI). Labels for audit scripts go after `--`: `npm run audit:visual -- my-label`.
`npm run links:internal` is a standalone link checker; the release audit covers the same ground in CI.

---

## 8. Workflow — the loop

Every change, however small, goes through this loop. An AI assistant working from this file follows it too.

```
1. Branch      git switch -c <type>/<slug>          from origin/main (or from the PR branch you stack on)
2. Read        the relevant §3–§6 rules and the source-of-truth row for the fact you are touching
3. Change      code + data + guard (if a guarded string changes) + generators (§7) in one coherent unit
4. check       npm run check                        fix until clean
5. verify      npm run verify                       fix until clean; read the JSON lines, not just the exit code
6. Record      update PROJECT.md §10 "Current state" and, for anything a future reader must know,
               append a dated entry to docs/seo/changelog.md; add needs-input rows for missing facts
7. Commit      one logical change per commit, message format below; PROJECT.md/changelog in the SAME commit
8. Push + PR   gh pr create --base main …           body format below; CI must be green
9. After merge git switch main && git pull; delete the branch
```

### Branches

`<type>/<kebab-slug>`: `seo/entity-and-architecture`, `chore/next-15`, `docs/project-handbook`,
`fix/partner-canonicals`. Long-lived initiatives get one PR; follow-ups stack on it with the PR body naming
the merge order. Never commit to `main` directly.

### Commit messages

```
<type>(<scope>): <summary in lower case, ≤ 72 chars>

One or two paragraphs: what was wrong and why (cause, not symptom), then what changed.
- bullets for the concrete edits, naming files or counts
- note anything deliberately NOT done and where it is tracked

Verified: seo-guard 40/40; tests 39/39; typecheck clean; lint 0 errors; build 275 pages;
redirects:check ok; audit:checklist pass; seo:gates pass; seo:facts 29/29

Co-Authored-By: <assistant name> <noreply@anthropic.com>   ← when an AI wrote most of it
```

Types: `feat`, `fix`, `perf`, `content`, `docs`, `chore`, `build`, `ci`, `test`, `seo`. Scope is the
area (`programmes`, `partners`, `redirects`, `deps`, `repo`, `home`…). The `Verified:` line is not
decoration; it is the record that the loop was run. Upstream issues are cited as `vercel/next.js#76651`.

### Pull request body

```
## Why            the problem, in one paragraph, with evidence
## What changed   numbered list, one entry per commit, leading with the bold type
## Verification   a | Check | Result | table (CI status + the verify JSON summaries)
## Follow-ups     what this PR deliberately leaves, and where it is tracked
## Deploy note    "deploy out/ together with public/.htaccess" plus anything else the deployer must know
```

PR titles are plain sentences with a colon, not commit-typed. Stacked PRs name the merge order.

### Working with an AI assistant

Paste this file (or point the assistant at it) and ask for the change. Then hold it to §8: it must run
`check` and `verify`, quote the JSON results, update §10, and write the commit in the format above. If
it proposes a fact (a fee, an approval, a ranking), the answer is §4: it goes in `docs/seo/needs-input.md`, not the
site. If it proposes a new folder at the root, a `loading.tsx`, a `redirect()` call, a second metadata
helper or a hand-written `<script type="application/ld+json">`, the guard will refuse it; so should you.

---

## 9. Known debt and open decisions

Deliberately not fixed yet. Each has an owner decision attached; do not "fix" them in passing.

| Item | State | Decision needed |
|---|---|---|
| `src/360/`, `src/Audio/`, `src/Law_Brouchers/`, `src/Partners - Codes/`, `src/Syllabus For SMCET/` | ~800 MB of originals and byte-identical duplicates of `public/` trees, read by nothing | Move originals to LFS/external storage or delete; keep `public/` as the single served copy. Requires confirming where the master files live. |
| `src/assets/` | 111 of 138 files never imported (~105 MB) | Prune to the 27 imported `.webp` files after the decision above. |
| `public/assets/campus_video.{mp4,webm}` (81 MB) and ~30 unreferenced files | shipped, unreferenced | Delete once confirmed no external link depends on them. |
| `src/components/developer/` + `src/lib/developer/` | local CMS with no route; `useDeveloperCms` still read by Navbar, Footer, Program, Partner | Decide whether the CMS returns as a local tool or is removed. |
| Content-heavy pages written inline in `app/` (`/smru`, compliance pages, `/departments`, `/events`) | work, but break the thin-page convention | Move markup to `src/views/` or `INFO_PAGES` (`src/lib/seo/info-pages.ts`) when next touched. |
| `next lint` | deprecated in Next 15, removed in 16 | Migrate to the ESLint CLI before any Next 16 move. |
| `npm audit`: 5 high (puppeteer 24, postcss pinned by next) | 0 critical; CI gate is critical-only | puppeteer 25 (dev tooling only); postcss with the Next 16 bump. |
| `@@NEEDS_UNIVERSITY_INPUT@@` token in the brief | practice uses the counselling sentence + `NEEDS_INPUT` cells (§4) | The brief is historical; this file is the rule. |
| Fees for 71 programmes, eligibility for 45, per-programme council approvals, GBP/Wikidata/aggregator URLs, Ordinance PDF, square logo | waiting on the university | `docs/seo/needs-input.md` — never closed by guessing. |

---

## 10. Current state

Updated by the loop (§8 step 6). Keep it to facts a reader needs today; history goes to `docs/seo/changelog.md`.

| | |
|---|---|
| Status date | 17 September 2026 |
| Release Decision | **PASS** — `npm run verify` green at the head of `docs/project-handbook`; deploy `out/` + `public/.htaccess` |
| Open PRs | [#8](https://github.com/Ram-9177/smru.edu.in/pull/8) `seo/entity-and-architecture` → `main` (the SEO rebuild, 19 commits). [#9](https://github.com/Ram-9177/smru.edu.in/pull/9) `chore/next-15` → `seo/entity-and-architecture` (Next 15 + React 19, CI green). `docs/project-handbook` stacks on `chore/next-15`. Merge order: #9 → #8 → main. |
| Gates at head | seo-guard 40/40 · tests 39/39 · typecheck clean · lint 0 errors (5 known warnings) · build 275 pages · redirects:check ok (203 Apache rows, 46 shells, 0 client-only) · audit:checklist pass · seo:gates pass (1 warning: 53 descriptions under 120 chars) · seo:facts 29/29 |
| Last structural change | Repository cleanup: dead root trees, one-off scripts, scratch and reports removed; root `data/` → `src/data`; single `@/*` alias; every alias shell now has a server 301 and a canonical equal to its target; `REDIRECT_MAP.csv` shell rows generated from the export. |
| Deferred, low priority | 8 meta descriptions < 70 chars; ~20 thin utility pages (brochure, 360, handbook, html-sitemap, status). |
| Do not touch | apply.smru.edu.in links, Google Ads / Meta Pixel tags, the Google verification token, `/developer/` and `/api/` disallows, partner-supplied HTML. |
