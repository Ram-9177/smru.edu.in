# Antigravity brief — SMRU (smru.edu.in) end-to-end SEO · AEO · GEO rebuild

> **How to use this:** paste the whole file as the opening prompt in Antigravity with the repo `/Volumes/Ram - MAC/SMRU.EDU.IN` open. It is self-contained — it carries the audit findings, the rules, the phase plan and the acceptance tests, so the agent needs no prior conversation. Work through the phases in order and stop at each gate.

---

## 0. Your role and the outcome I want

You are the SEO/engineering agent for **St. Mary's University (SMRU)**, Hyderabad — a UGC-recognised private university whose website is this Next.js repo. Your job is to take this site from "technically tidy but invisible for its own brand name" to **the authoritative result for every search about this university, its 6 schools and its 90+ programmes — in India and internationally — across classic search (Google, Bing), answer engines (Google AI Overviews / AI Mode, Bing Copilot) and generative engines (ChatGPT, Perplexity, Gemini, Claude).**

Concretely, when this work is finished:

1. Searching **"st marys university"**, "st marys university hyderabad", "stmarys university", "SMRU", "St. Mary's Rehabilitation University" — in any engine, from any country — returns smru.edu.in first, with correct sitelinks and a correct knowledge panel, and is never confused with St. Mary's College Hyderabad, St. Mary's Group of Institutions, or St. Mary's University in Texas / Twickenham / Halifax / Calgary.
2. Searching **any school** ("rehabilitation sciences college Hyderabad", "allied health sciences university Telangana", "law college Hyderabad", "nursing college Hyderabad", "psychology college Hyderabad", "engineering college Hyderabad") surfaces the matching SMRU school hub.
3. Searching **any of the 90+ courses** — by full name, abbreviation, or colloquial name, with or without a city ("BPT", "BASLP fees", "B.Sc nursing admission 2026", "prosthetics and orthotics course", "cardiovascular technology course Hyderabad", "MPT vs MOT") — surfaces the matching SMRU programme page, and SMRU appears as a recommended option in AI answers to "which college offers X".
4. **International** searches — inbound ("study BPT in India for international students", "NRI quota nursing India", "{country} students Indian private university") and outbound ("Indian physiotherapy degree HCPC UK", "B.Sc nursing India to NCLEX", "AHPRA Indian degree") — reach the right SMRU page.
5. Every engine, when asked "what is SMRU / is St. Mary's University Hyderabad UGC recognised / what courses does it offer", answers **correctly and consistently**, citing smru.edu.in.

Treat 1 as the prerequisite for everything else: the brand-entity fix gates the rest.

---

## 1. Repository and deployment facts (verified — do not re-derive)

| Item | Value |
|---|---|
| Path | `/Volumes/Ram - MAC/SMRU.EDU.IN` |
| Stack | Next.js **14.2.33** App Router + React 18 + TypeScript + Tailwind 3.4 |
| Build mode | **Static export** — `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` (`next.config.mjs`) |
| Output | `out/` — currently 446 static pages |
| Hosting | **Apache**; redirects and headers live in `public/.htaccess` (HSTS on, HTTPS + non-www 301s active) |
| Canonical origin | `https://smru.edu.in` (HTTPS, non-www, trailing slash) |
| Apply subdomain | `https://apply.smru.edu.in` (separate, leave alone) |
| Short domain | `smru.in` — separate host, currently indexed as a second site, **SSL certificate reported expired** |
| Control file | `REMEDIATION_SUMMARY.md` — the repo's single markdown source of truth; `scripts/seo-guard.js` **enforces that exactly one `.md` file exists at repo root**, so do not add root-level `.md` files (put any new docs under `docs/`) |
| npm scripts | `build`, `lint`, `typecheck`, `test`, `seo:guard`, `links:internal`, `audit:checklist`, `audit:frontend`, `audit:visual` |
| Analytics already installed | Google Ads gtag `AW-18293956146`, Meta Pixel `1582040940369832`, Google site verification `MNlkKsQJcg3Cv14G_CeV3L_C7f2A3MpdPNSYNdDtdfU` |

Key SEO source files:

```
app/layout.tsx                          root metadata, JSON-LD injection, speculation rules
app/page.tsx                            homepage metadata
app/robots.txt/route.ts                 robots.txt generator
app/sitemap.xml/route.ts                sitemap route  →  src/lib/seo/sitemap.ts
src/lib/metadata.ts                     buildMetadata(), formatSeoTitle(), trimAtWord(), absoluteUrl()
src/lib/seo/site.ts                     SITE_IDENTITY (names, aliases, address, socials)
src/lib/shared/university.ts            UNIVERSITY_INFO (brandName, legalName, address)
src/lib/shared/site-constants.ts        SITE_CONTACT, CTA links, social links
src/lib/seo/schema.ts                   all JSON-LD builders
src/lib/seo/sitemap.ts                  sitemap entry builder (tier1/2/3 + dynamic)
src/lib/seo/info-pages.ts               INFO_PAGES registry (brand + compliance pages)
src/lib/seo/authority-map.ts            SEO_AUTHORITY_PAGES
src/lib/seo/safe-guides.ts              SAFE_GUIDE_PAGES (/guides/*)
src/lib/seo/academic.ts                 programme FAQs, breadcrumbs, recommendations
src/lib/seo/search-intent.ts            keyword generators (incl. typo generator — to be deleted)
src/lib/seo/health-allied-course-seo.ts per-course SEO profiles
src/lib/shared/dynamic-route-metadata.ts school/dept/programme metadata builders
src/data/schools.ts                     schools → departments → programmes (source of truth for courses)
data/seo-pages.ts                       templated SEO page definitions
public/.htaccess  public/llms.txt  public/llms-full.txt
```

---

## 2. Audit findings you are fixing (verified 13 Sep 2026 — live crawl of all 322 sitemap URLs + repo review)

### 2.1 The core problem: brand-entity collision

Google does **not** associate the string "St. Mary's University" with this institution. Evidence:

- Google for **"st marys university hyderabad"**: returns St. Mary's College Hyderabad (Wikipedia, Careers360, stmaryscollege.in), St. Mary's Group of Institutions, and **Newton School's partner page about SMRU** — but **not smru.edu.in**. The only SMRU-family result is the short domain smru.in at ~#8.
- **Bing** for the same query: smru.edu.in at **#1 and #2**. So the site is crawlable and indexed — this is an entity/authority problem, not a technical one.
- Every third-party source calls it **St. Mary's Rehabilitation University / SMRU**: Telangana Ordinance No. 2 of 2025, Telangana Act No. 10 of 2026, UGC 2(f) letter, TGCHE, Collegedunia, Careers360, Shiksha, YouTube, press. The site calls itself **"St.Mary's University"** (no space) — 176 occurrences on the homepage vs 20 of "St. Mary's" and 19 of "SMRU".
- Anything containing "SMRU" ranks fine. Niche course pages rank on their own (BPO #2, B.Sc Clinical Psychology #4). Head course terms are owned by aggregators.

### 2.2 A rebrand script (`update_brand.js`) corrupted identity strings and URLs

It bulk-replaced "St Mary's / St. Mary's / Stmarys" → "St.Mary's" across `src/`, `app/`, `data/`. Damage:

| Location | Current (broken) value |
|---|---|
| `src/lib/shared/university.ts` → `legalName` | `"St.Mary's University"` — the legal name is lost |
| `src/lib/seo/site.ts` → `bridgeSentence` | `"St.Mary's University, legally established as St.Mary's University, Hyderabad, Telangana."` |
| `/Stmarys-university-official/` meta description | "St.Mary's University is the official/legal name of St.Mary's University" |
| `/Stmarys-hyderabad/` | "…refers to St.Mary's University, publicly known as St.Mary's University" |
| `/student-guides/is-st-marys-university-same-as-smru/` | H1: "Is St.Marys University Same As St.Marys University Guide" |
| `/student-guides/what-is-smru/` | Title: "What Is St.Marys University Guide" |
| `public/llms.txt` | "Public brand: St.Marys University" (no apostrophe); "Established: 2026" |
| `/explore-smru/` | canonical → `/explore-Stmarys/` which is a **404** |
| `/Handbook/` | serves a duplicate of the homepage; `/Hand-Book/` has no canonical |

### 2.3 Indexed brand URLs now 404, replacements are capitalised and case-sensitive

| Old URL (was indexed / still cited) | Now | New URL | Lowercase variant |
|---|---|---|---|
| `/smru-facts/` | **404** | `/Stmarys-facts/` | `/stmarys-facts/` → 404 |
| `/st-marys-university/` | **404** | `/Stmarys-university/` | → 404 |
| `/smru-hyderabad/` | **404** | `/Stmarys-hyderabad/` | → 404 |
| `/st-marys-rehabilitation-university/` | **404** | `/Stmarys-university-official/` | → 404 |
| `/seo/st-marys-university/`, `/seo/smru-hyderabad/` | **404** | — | — |
| `/student-guides/st-marys-university/` | **404** | `/student-guides/Stmarys-university/` | → 404 |

No 301s exist for any of them. `REDIRECT_MAP.csv` records the intended renames but they were never implemented server-side, and shipped with a capital `S`.

### 2.4 Crawl results — all 322 sitemap URLs, live, 13 Sep 2026

| Finding | Detail |
|---|---|
| **6 sitemap URLs return 404** | `/iqac/`, `/mandatory-disclosure/ugc-disclosure/`, `/mandatory-disclosure/statutory-disclosures/`, `/mandatory-disclosure/contact/`, `/mandatory-disclosure/first-academic-year-disclosure/`, `/mandatory-disclosure/public-information/` |
| Noindex / alias pages in sitemap | `/niat/`, `/bb/`, `/skilgen/` (noindex, canonical → `/partner/*`); `/qtst/` has **no canonical**; `/search/` is indexable and listed |
| Titles > 60 chars | **71** (62 of them > 70) — every programme page, 68–82 chars |
| Titles cut mid-phrase | 7, e.g. "Best Private University in \| St.Mary's University", "UGC Recognized University In \| …", "School of Engineering & Emerging \| …", "Compare St.Marys University With \| …" |
| Duplicate titles | 11 pairs, e.g. `/health-allied-health-sciences/` vs `/schools/health-allied-health-sciences/` |
| "Guide Guide" titles | `/admission-guides/bpo-course-guide/` → "BPO Course Guide Guide"; "BASLP Admission Guide Guide"; … |
| **152 near-identical templated pages** | 22 × `/seo/*` (702–734 words each), 72 × `/admission-guides/*` (728–733), 50 × `/student-guides/*` (~700), 8 brand-reference pages — one skeleton with the keyword swapped. This is the *doorway pages* / *scaled content abuse* pattern and it cannibalises the real programme pages. |
| FAQPage schema on **261 of 322** pages | Mostly boilerplate ("How do I compare the right course…") |
| **Deliberate misspellings injected as keywords** | `buildProgramTypoSearchTerms()` emits "cource", "admision", "collage", "hyderbad" into meta keywords **and** JSON-LD `keywords`. The BCVT page contains "cource" ×54, "admision" ×24, "hyderbad" ×18, "collage" ×18. LLM crawlers read JSON-LD. |
| No fees anywhere | Programme pages say "Fee status: confirm through official admissions counselling"; `/fee-structure/` is a status page. Collegedunia publishes ₹6 L for BPT — so Google ranks Collegedunia. |
| Course schema incomplete | `buildCourseSchema` has no `hasCourseInstance` and no `offers` → ineligible for course rich results |
| Placeholder pages indexable | `/ombudsperson/`, `/naac/`, `/nirf/`, `/first-academic-year-disclosures/`, `/academic-calendar/`, `/faculty-directory/` all say "under process" / "awaiting release" |
| Custom 404 never served | Server returns a bare 13-byte "404 Not Found"; `out/404.html` is unused — no `ErrorDocument` directive |
| Thin pages | `/campus-360/` (133 words); 15 partner alias pages (~115 words, **no H1**) |
| Descriptions | 47 over 160 chars; 7 under 70 |
| Programme pages | 71 pages, avg 1,414 words, min 1,062 — long, but generic (no fees, no named hospitals, no salary data) |
| Homepage | 211 KB HTML; 379 KB favicon PNG reused for every icon size |
| Speculation rules | eagerly prefetches **every** internal link (`href_matches: "/*"`, `eagerness: "eager"`) |
| Sitemap | Single flat file, 322 URLs, `lastModified` hard-coded to `2026-05-15` for almost everything |
| No international IA | No `/international/`, no NRI route, no USD fees, no visa guidance, no `hreflang`; `lang="en-IN"` sitewide |

### 2.5 Off-site (context — mostly not your work, but it shapes priorities)

- Shiksha carries **three** listings: "St. Mary's Rehabilitation University", "…powered by Emversity", "St. Mary's University Powered by NIAT".
- Collegedunia says established **2025**, "over 47 courses" (meta says 60), lists an **M.Tech + PhD** that may not exist, publishes fees (BPT/BOT ₹6 L, B.Sc Nursing ₹8 L).
- **No Wikidata item; not on Wikipedia's "List of educational institutions in Telangana"** (which does list Anurag, Mahindra, SR, Woxsen).
- **stmarysgroup.com** (same sponsor society, domain since ~1996) does **not link to smru.edu.in at all**; its own SEO is stale (no robots.txt → 404, sitemap dated Feb 2024, every page titled "Welcome to St. Mary's Group | Best Engineering College Hyd", http/https + www/non-www all indexed, homepage H1 is the truncated "Redefining Technical Education in").
- **smru.in** serves an expired SSL certificate and is indexed as a competing copy of the brand.

---

## 3. Non-negotiable rules

1. **Never invent a fact.** Fees, intake numbers, approvals (RCI/INC/NCAHP/BCI/UGC/PCI), NAAC/NIRF status, placement figures, salaries, faculty names, hospital partners, international recognition. Where a real value is required and you do not have it, insert the literal token `@@NEEDS_UNIVERSITY_INPUT@@` and log it in `docs/seo/needs-input.md`. **A wrong approval or fee claim on a university site is a regulatory problem, not an SEO problem.**
2. **Never claim foreign licensing outcomes.** Carebridge/global pages describe pathways and exams; registration is granted by the foreign regulator (HCPC, AHPRA, NMC, NCLEX/NCSBN, DHA/HAAD/MOH), never by SMRU. Every such page carries that disclaimer.
3. **No superlatives you cannot evidence** — "best", "top", "#1", "India's first" — unless a cited third party says it and you cite them inline.
4. **Every removed or renamed URL gets a 301** to the closest equivalent page. Never bulk-redirect to the homepage.
5. **Do not break the build.** After every phase: `npm run typecheck && npm run lint && npm run test && npm run seo:guard && npm run links:internal && npm run audit:checklist && npm run build` — all must pass.
6. **`scripts/seo-guard.js` asserts exactly one root-level `.md` file** (`REMEDIATION_SUMMARY.md`). Put new docs in `docs/`. If you change a guarded invariant, update the guard in the same commit and say so.
7. **Work on a branch**, one commit per phase, conventional messages. Update `REMEDIATION_SUMMARY.md` at the end of each phase (it is the repo's control log).
8. **Do not touch**: `apply.smru.edu.in` links, the Google Ads / Meta Pixel tags, the Google verification token, `/developer/` and `/api/` disallows, partner commercial content.
9. **Ask before deleting any page that currently ranks.** When unsure, noindex + keep rather than delete.
10. Preserve the existing pastel/navy design system and component structure — this is an SEO and content-architecture job, not a redesign.

---

## 4. The naming standard (apply everywhere, mechanically)

| Context | Value |
|---|---|
| Display name, first mention on any page | **St. Mary's University (SMRU)** — with the space and apostrophe |
| Subsequent mentions | St. Mary's University *or* SMRU |
| Legal name (footer, schema `legalName`, statutory pages) | **St. Mary's Rehabilitation University** |
| Short name | **SMRU** |
| Canonical bridge sentence — use **verbatim** on the homepage, `/about/`, `/smru/`, `llms.txt`, Organization schema `description`, and in every listing brief | *"St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026."* |
| Campus | Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, near Ramoji Film City, Hyderabad, Telangana 508284, India |
| Founding | Ordinance No. 2 of 2025 promulgated **24 July 2025**; Act No. 10 of 2026 |
| Schools (6) | Rehabilitation Sciences · Health & Allied Health Sciences · Psychology · Nursing · Engineering & Emerging Technologies · Law |
| **Never** | "St.Mary's" (no space) in visible text, titles or H1s; "St.Marys"; "St. Mary's University powered by {partner}" as an institution name |
| `alternateName` (schema only) | SMRU · SMRU Hyderabad · St. Mary's Rehabilitation University · St.Mary's University · St Marys University Hyderabad |

---

## 5. Phased execution plan

Stop at each **GATE** and report. Do not start the next phase until I confirm.

---

### PHASE 0 — Baseline and safety net

1. Create branch `seo/entity-and-architecture`.
2. Record a baseline: run the full verification suite; save `out/` page count, current sitemap URL list, and a CSV of every URL with status/title/description/canonical/robots/H1/word-count/JSON-LD types to `docs/seo/baseline-2026-09.csv`. (Write a small Node script under `scripts/` — e.g. `scripts/crawl-export.mjs` — that walks `out/**/*.html`; keep it, it becomes the regression harness.)
3. Create `docs/seo/needs-input.md` with an empty table: `Item | Page(s) | Why needed | Who can answer`.

**GATE 0** — report baseline numbers and confirm the suite passes on a clean checkout.

---

### PHASE 1 — Entity and identity (highest impact; everything else depends on it)

1. **Fix the identity constants.**
   - `src/lib/shared/university.ts`: `brandName: "St. Mary's University"`, `shortName: "SMRU"`, `legalName: "St. Mary's Rehabilitation University"`, `legacyBrandName` → keep only if something depends on it, else remove.
   - `src/lib/seo/site.ts`: `defaultTitle`, `titleTemplate`, `publicName`, `bridgeSentence` (use the verbatim sentence from §4), `alternateNames` (the list in §4 — **delete** the misspelling entries "Stmarys", "stmarys", "StMarys", "St Marys", "St.Mary's" etc. beyond the five listed).
   - Grep the whole repo for `St.Mary's` (no space) and `St.Marys` in **visible copy, titles, H1s, descriptions, JSON-LD and `llms.txt`** and replace with the standard. Leave slugs/filenames/asset paths alone until Phase 2. `update_brand.js` caused this — **delete that script** so nobody re-runs it.
2. **Homepage as the entity page** (`app/page.tsx` + `src/views/Home.tsx`):
   - `<title>`: `St. Mary's University Hyderabad (SMRU) – Official Site`
   - Description: `St. Mary's University (SMRU) is a UGC-recognised private university in Hyderabad — legally St. Mary's Rehabilitation University — offering 90+ programmes in rehabilitation, allied health, nursing, psychology, engineering and law.` (trim ≤ 160)
   - H1: `St. Mary's University (SMRU), Hyderabad` — and move the legal name out of the `sr-only` span into **visible** sub-heading text carrying the bridge sentence.
3. **Organization / WebSite schema** (`src/lib/seo/schema.ts`): `@type` `CollegeOrUniversity`; `name`, `legalName`, `alternateName`, `description` = bridge sentence, `foundingDate: "2025-07-24"`, `parentOrganization` = Joseph Sriharsha & Mary Indraja Educational Society, `address` + `geo`, `areaServed`, `numberOfStudents` only if known, and `sameAs` → Facebook/Instagram/LinkedIn/YouTube + Google Maps/GBP URL + Wikidata (add once created) + Collegedunia/Careers360/Shiksha profile URLs. Keep the `@id` graph pattern that already exists.
4. **Create `/smru/`** — the single canonical identity page: "SMRU – St. Mary's Rehabilitation University, Hyderabad". Contents: bridge sentence, the three names and when each is used, legal establishment with links to the Act/Ordinance/UGC PDFs already in `/assets/`, campus address + map, the 6 schools with links, programme count, official contact routes, "not to be confused with" disambiguation naming St. Mary's College Hyderabad and St. Mary's Group of Institutions (this disambiguation text is what teaches the engines the difference), and 10–12 real FAQs ("Is St. Mary's University the same as SMRU?", "Is it UGC recognised?", "Where is the campus?", "Is this St. Mary's College Hyderabad?"). Schema: `WebPage` + `FAQPage` + Organization reference.
5. **Fix `public/llms.txt` and `llms-full.txt`**: correct spelling, legal name and SMRU on line one, bridge sentence, establishment facts, the 6 schools, a link to `/programmes/` (built in Phase 4), remove the `/iqac/` 404. Keep the existing "Source priority" and "AI answer rules" sections — they are good.
6. **Delete the typo-keyword machinery**: `buildProgramTypoSearchTerms` and every misspelling array in `src/lib/seo/search-intent.ts` and `src/lib/seo/health-allied-course-seo.ts`; remove the `keywords` meta tag entirely from `buildMetadata` (no engine uses it, and the misspellings leak into JSON-LD). Update `scripts/seo-guard.js` — it currently *asserts* the typo terms exist; invert those checks to assert they are **absent**.

**GATE 1** — show me: the diff of the identity constants, the new `/smru/` page rendered, the homepage `<head>`, the Organization JSON-LD validated against Google's Rich Results Test, and a grep proving zero "St.Mary's" (no space) in visible copy.

---

### PHASE 2 — URLs, redirects, sitemap architecture

1. **Lowercase every capitalised slug** in `src/lib/seo/info-pages.ts` and `data/seo-pages.ts` (`Stmarys-*` → retire entirely, see below; `Hand-Book` → `handbook`).
2. **Write the redirect block into `public/.htaccess`** (place before the "Retired law URLs" block):

```apache
# --- Brand reference consolidation -> /smru/ ---
RewriteRule ^(smru-facts|Stmarys-facts|stmarys-facts)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^(st-marys-university|Stmarys-university|stmarys-university|st-marys-rehabilitation-university|Stmarys-university-official|stmarys-university-official)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^(smru-hyderabad|Stmarys-hyderabad|stmarys-hyderabad|rehabilitation-university-hyderabad)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^seo/(st-marys-university|stmarys-university|smru-hyderabad|stmarys-hyderabad|st-marys-rehabilitation-university|stmarys-university-official)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^student-guides/(st-marys-university|Stmarys-university|stmarys-university|Stmarys-university-hyderabad|stmarys-university-hyderabad|Stmarys-rehabilitation-university|stmarys-rehabilitation-university|what-is-smru|is-st-marys-university-same-as-smru|where-is-smru-located)/?$ https://smru.edu.in/smru/ [L,R=301,NC]

# --- Aliases ---
RewriteRule ^explore-smru/?$ https://smru.edu.in/campus-guide/ [L,R=301]
RewriteRule ^Hand-Book/?$ https://smru.edu.in/handbook/ [L,R=301,NC]

# --- Serve the real 404 page ---
ErrorDocument 404 /404.html
```

   Then extend this block with one rule per page retired in Phase 3. Keep `REDIRECT_MAP.csv` in sync — it is currently aspirational, make it a true record.
3. **Fix the 6 sitemap 404s** in `src/lib/seo/sitemap.ts`: either create the routes or remove them from `isolatedSeoRoutes` / `indexableComplianceRoutes`. `/iqac/` is referenced in `llms.txt` too.
4. **Remove from the sitemap**: `/search/` (and set it `noindex`), the noindex partner aliases (`/niat/`, `/bb/`, `/skilgen/`, `/qtst/`, `/niat-upskilling/`). Add a canonical to `/qtst/`. Fix `/explore-smru/`'s canonical (currently → a 404).
5. **Rebuild the sitemap as a sitemap index** — this is what a 400+ page multi-school site needs:

```
/sitemap.xml                  → index
  /sitemap-pages.xml          → core: home, about, /smru/, admissions, contact, campus, compliance
  /sitemap-schools.xml        → 6 schools + all departments
  /sitemap-programmes.xml     → all 90+ programme pages
  /sitemap-guides.xml         → surviving comparison/city/admission guides
  /sitemap-international.xml  → /international/* and /carebridge/* (Phase 6)
  /sitemap-images.xml         → campus, lab, hostel imagery with captions
```

   Give each URL a **real** `lastmod` derived from content or file mtime — not the hard-coded `2026-05-15`. Drop `priority` (Google ignores it) or keep it tiered; keep `changefreq` modest. Regenerate `out/` and verify every `<loc>` returns 200.
6. **De-duplicate school URLs**: `/health-allied-health-sciences/`, `/engineering-emerging-technologies/`, `/rehabilitation-sciences/`, `/psychology/`, `/nursing-sciences/`, `/law/` duplicate `/schools/{slug}/`. Pick `/schools/{slug}/` as canonical and 301 the short forms (or keep the short forms as the canonical and 301 the long — decide once, apply consistently, tell me which).
7. **Noindex the placeholder compliance pages** until they carry real content: `/ombudsperson/`, `/naac/`, `/nirf/`, `/first-academic-year-disclosures/`, `/academic-calendar/`, `/faculty-directory/`, `/public-information/`, `/contact-directory/` (keep them reachable for compliance; just `robots: "noindex,follow"`).
8. **Title/description formula** — fix `trimAtWord()` in `src/lib/metadata.ts` so it never cuts mid-phrase and never ends on a preposition/conjunction:
   - Brand suffix ` | St. Mary's University` (24 chars); primary part ≤ 40 chars; total ≤ 65.
   - Homepage: `St. Mary's University Hyderabad (SMRU) – Official Site`
   - `/smru/`: `SMRU – St. Mary's Rehabilitation University, Hyderabad`
   - School: `School of {X} – Courses & Fees | St. Mary's University` (abbreviate long school names)
   - Programme: `{Course} in Hyderabad: Fees, Eligibility 2026 | St. Mary's University`; if too long, drop "in Hyderabad" before dropping "Fees"
   - Comparison: `{A} vs {B}: Which to Choose in 2026 | St. Mary's University`
   - Descriptions 120–155 chars, lead with the fact the searcher wants (fee / duration / eligibility / approval).
   - Fix the "Guide Guide" suffix bug in the `data/seo-pages.ts` title builder.
9. **Favicon set**: replace the single 379 KB PNG with 32×32, 180×180 (apple-touch) and 512×512 assets.

**GATE 2** — show me: zero non-200 URLs in the new sitemap index, a table of every 301 added with source → target → status, the new title lengths (0 over 65), and the passing verification suite.

---

### PHASE 3 — Consolidate the 152 templated pages

These currently read as doorway pages. Target: **~152 → ~30**, each with a reason to exist. Every retirement gets a 301.

| Group | Now | Action |
|---|---|---|
| Brand reference | 8 pages | → `/smru/` (done in Phase 1–2) |
| `/seo/*` city-intent | 22 | **Keep 6**, rewritten as real landing pages mapped to a school: `bpt-college-hyderabad`, `baslp-college-hyderabad`, `nursing-college-hyderabad`, `law-college-hyderabad`, `engineering-college-hyderabad`, `psychology-college-hyderabad`. Fold `private-university-in-hyderabad/telangana`, `ugc-recognized-*`, `rehabilitation-university-hyderabad` into `/about/` + `/smru/`. Merge the 4 location pages into **one** `/campus-location-hyderabad/`. 301 the rest to the relevant school hub. |
| `/admission-guides/*` | 72 | Per-course guides duplicate the programme pages → merge their unique content into the programme page's "Admission process" section and 301. **Keep 7** process pages, moved under `/admissions/`: `smru-admissions-2026`, `smcet-2026-guide`, `application-form-guide`, `document-checklist`, `scholarship-eligibility-questions`, `admission-counselling-guide`, `admission-helpline-guide`. |
| `/student-guides/*` | 50 | **Keep the 13 "X vs Y" comparisons** (`bpt-vs-bot`, `baslp-vs-bpt`, `llb-vs-ba-llb`, `mpt-vs-mot`, `bpo-vs-mpo`, `clinical-vs-rehabilitation-psychology`, `btech-cse-vs-cse-ai-ml`, `bsc-nursing-vs-allied-health`, `ba-llb-vs-bba-llb`, `forensic-science-vs-medical-lab-technology`, `optometry-vs-radiotherapy-technology`, `private-university-vs-college`, `university-vs-college-admission`) — rewrite each with a genuine side-by-side table (eligibility, duration, fee, career, who it suits). These are the best long-tail assets on the site. Merge all "does-smru-offer-…" / "what-is-smru" / "how-to-apply" into `/smru/` FAQs. Merge campus/hostel visit pages into `/campus-guide/` and `/hostel/`. |
| `/guides/best-*` | 11 | **Keep 3** only if rewritten as honest comparison guides with named criteria: `best-rehabilitation-university-in-hyderabad`, `best-allied-health-sciences-college-in-hyderabad`, `best-law-college-in-hyderabad`. **Delete `best-mba-college-in-hyderabad` and `best-pharmacy-college-in-hyderabad`** — SMRU offers neither; they are a liability. 301 the rest to school hubs. |

Also: strip boilerplate `FAQPage` schema from every page where the questions are not page-specific (currently 261 pages). Keep it on programme pages, `/smru/`, comparison guides and `/international/`.

**GATE 3** — show me the full retirement table (URL → 301 target → reason), the new page count, and confirmation that no retained page shares an H1 or title with another.

---

### PHASE 4 — All 90+ courses: the programme page standard

This is the phase that wins course search. Drive it from `src/data/schools.ts` so it applies to **every** programme, present and future.

**4a. Programme page template** — required sections, in order:

1. **Answer-first paragraph, 40–70 words, visible above the fold:** what the programme is, duration, eligibility in one line, annual fee (or `@@NEEDS_UNIVERSITY_INPUT@@`), intake if public, the approval that applies to *this* programme, campus. This is the paragraph AI Overviews and ChatGPT lift verbatim — write it as a standalone answer.
2. **Key facts table:** level · duration · eligibility · selection (SMCET/merit) · annual fee · total fee · intake · start month · approvals · department · school.
3. **Curriculum by year/semester** — real subject names from the syllabus, not generic filler.
4. **Clinical / practical training** — named labs, on-campus clinics, partner hospitals, hours.
5. **Careers** — roles, India starting-salary range *with source*, higher-study paths, and (where relevant) the global pathway with a link to the matching `/carebridge/*` page.
6. **Why SMRU for this course** — 3–5 concrete differentiators.
7. **International block** (see Phase 6): eligibility equivalence, USD fee, recognition, visa route, link to `/international/`.
8. **5–8 programme-specific FAQs** with `FAQPage` schema — "What is the BPT fee at SMRU?", "Is BASLP at St. Mary's University RCI-approved?", "Does SMRU offer hostel for nursing students?"
9. **Internal links:** school hub · department hub · 3–6 related programmes · `/admissions/` · `/fee-structure/` · `/campus-360/` · apply CTA.
10. **Visible "Last updated" date**, one distinctive image with descriptive alt text.

**4b. Schema** — extend `buildCourseSchema` in `src/lib/seo/schema.ts`:

```jsonc
{
  "@type": "Course",
  "provider": { "@id": "https://smru.edu.in/#organization" },
  "educationalCredentialAwarded": "...",
  "occupationalCredentialAwarded": "...",        // where a council registration follows
  "coursePrerequisites": "...",
  "timeRequired": "P4Y",                          // ISO 8601
  "inLanguage": "en",
  "availableLanguage": "en",
  "hasCourseInstance": {                          // REQUIRED for course rich results
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "courseWorkload": "...",
    "location": { "@type": "Place", "address": { /* campus */ } },
    "startDate": "..."
  },
  "offers": [                                     // REQUIRED; omit entirely if fee unknown
    { "@type": "Offer", "category": "Annual tuition", "price": "...", "priceCurrency": "INR",
      "availability": "https://schema.org/InStock", "url": "https://apply.smru.edu.in" }
  ]
}
```

   Never emit `offers` with a placeholder price — omit the node until the real figure exists.

**4c. Fees.** Publishing a fee range per programme is the single biggest course-search win (right now Collegedunia has numbers and you do not). Build the plumbing: add `fee: { annualINR, totalINR, annualUSD? }` to the programme type in `src/data/schools.ts`, render it in the facts table and schema, and where the value is missing emit a clear "Fee for 2026–27 is published at counselling — call {number}" line **and** log it to `docs/seo/needs-input.md`. Do not guess.

**4d. Course coverage audit.** Produce `docs/seo/course-coverage.csv`: every programme in `src/data/schools.ts` × [has page · title length · answer-first para · fee · eligibility · duration · approvals · curriculum · FAQs · Course schema · CourseInstance · Offer · internal links in · image]. Every row must be complete or carry a `@@NEEDS_UNIVERSITY_INPUT@@` reason. This CSV is the definition of "all 90+ courses are done".

**4e. Course discovery surfaces** — so any course search can find SMRU:
- **`/programmes/` — an A–Z of every programme** with level, school, duration, fee and link; `ItemList` schema of all `Course` nodes. One page an engine can crawl to learn the entire catalogue.
- Each **school hub**: intro (answer-first) + programme table + labs/clinics + faculty + FAQs + `CollectionPage` + `ItemList`.
- Each **department hub**: same pattern, narrower.
- A **course-finder** on `/programmes/` filterable by school/level/duration (client-side, but render all rows in the static HTML so they are crawlable).
- Cross-links: every programme page links to 3–6 siblings (`buildProgramRecommendationLinks` already exists — make sure it is bidirectional and rendered in HTML, not JS-only).

**GATE 4** — show me `course-coverage.csv` with ≥ 90 complete rows, three sample programme pages (one from Rehabilitation Sciences, one Allied Health, one Law), and Rich Results Test passes for `Course`.

---

### PHASE 5 — AEO / GEO: be the cited answer

1. **Fact consistency.** The bridge sentence, establishment dates, UGC 2(f), sponsor society, address, phone, email, 6 schools, programme count and official URL must be byte-identical across: homepage, `/about/`, `/smru/`, `llms.txt`, `llms-full.txt`, Organization JSON-LD, `/international/`. Write `scripts/check-facts-consistency.mjs` to assert this and wire it into `npm run seo:guard`.
2. **`llms-full.txt`**: list **every** programme with its canonical URL and a one-line fact (level · duration · fee · approval). This is the file an LLM crawler reads to learn the catalogue in one fetch.
3. **Answer-first intros** on every programme, school, brand and international page (Phase 4a item 1 — enforce it in the guard script: first `<p>` of main content ≥ 40 words and contains the page's primary entity).
4. **robots.txt** (`app/robots.txt/route.ts`) — it already has `*`, `Googlebot`, `OAI-SearchBot`, `bingbot`. Add explicit `Allow` blocks for `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `CCBot`, `Applebot-Extended`. Keep `/developer/`, `/api/`, `/thank-you/` disallowed. Add the sitemap-index line.
5. **Remove the boilerplate FAQ noise** (Phase 3) so the FAQs that remain are genuinely distinctive — an LLM summarising 261 pages with the same three questions learns nothing.
6. **Speculation rules** (`app/layout.tsx`): drop the eager `href_matches: "/*"` prefetch (it downloads the whole site on mobile data); keep the `prerender` list.
7. **AI answer audit harness** — `docs/seo/ai-audit.md` with 15 fixed questions to run monthly against ChatGPT, Perplexity, Gemini, Copilot and Google AI Mode, logging answer + cited sources:
   *What is SMRU? · Is St. Mary's University Hyderabad UGC recognised? · Is St. Mary's University the same as St. Mary's College Hyderabad? · Which universities in Hyderabad offer BASLP? · BPT colleges in Hyderabad · What does B.Sc Nursing cost at St. Mary's University? · Does SMRU offer prosthetics and orthotics? · Best rehabilitation sciences university in India · Can international students study physiotherapy at SMRU? · Is an Indian BPT degree valid in the UK? · What is SMCET? · Where is St. Mary's Rehabilitation University located? · How many courses does SMRU offer? · Who founded SMRU? · Does SMRU have hostels?*
   Each wrong answer traces to a source to fix.

**GATE 5** — show me the consistency-check output, the updated robots.txt, and the first AI audit log.

---

### PHASE 6 — International (inbound + outbound)

Additive only — do not disturb the India-facing pages.

1. **`/international/` hub**: who can apply · qualification equivalence · English requirement · fees INR **and** indicative USD · scholarships · application steps · documents (passport, transcripts, AIU equivalence, medical, police clearance) · Indian student-visa route and e-FRRO registration within 14 days · arrival and airport pickup · hostel and food · named international-admissions contact, email and WhatsApp in international format. Schema: `WebPage` + `FAQPage` + `ContactPoint` with `areaServed` and `availableLanguage`.
2. **`/international/{country}/`** — **only** where you can say something real. Start with Nepal, Bangladesh, Sri Lanka, Bhutan, Nigeria, Kenya, UAE, Oman. Each: qualification mapping to Indian 10+2, visa specifics, fee in local currency alongside INR, attestation/embassy steps. **Do not publish a country page you cannot substantiate.**
3. **`/international/nri-admissions/`** — NRI/OCI/PIO route, documents, fee differences.
4. **Global-careers cluster under `/carebridge/`** — one page per destination-profession pair you can evidence: `uk-nursing`, `uk-physiotherapy-hcpc`, `australia-ahpra`, `gulf-dha-haad`, `canada`, `usa-nclex`. Each: the exam, the regulator, realistic timeline, indicative cost, what SMRU provides vs what the student must do, **and the disclaimer that registration is granted by the foreign regulator, not by SMRU**. This is where SMRU can out-write every competitor in Telangana — and it is what earns international links and AI citations.
5. **Programme pages**: add the international block (Phase 4a item 7) and, where an international fee exists, a second `Offer` with `priceCurrency: "USD"`.
6. **Technical internationalisation:**
   - Keep **one** URL set — no `/en/` or `/in/` split (there is no translated content).
   - Change `<html lang="en-IN">` → `lang="en"` in `app/layout.tsx`.
   - Emit on every page: `<link rel="alternate" hreflang="en-IN" href="{canonical}">`, `hreflang="en"` and `hreflang="x-default"` — all pointing at the same canonical URL. This is what tells Google the page serves English speakers everywhere rather than India only.
   - Add `areaServed` (IN + active recruitment countries) and `GeoCoordinates` to Organization schema.
   - **No geo-redirects, no cloaking** — serve identical content to every country.
   - Add `/sitemap-international.xml` to the index.
7. **International citation list** for the marketing team (write to `docs/seo/international-citations.md`): StudyPortals/Bachelorsportal, EDUopinions, studyabroad.shiksha, Yocket, Leverage Edu, **StudyInIndia (Govt. of India portal — a genuine authority link)**, AIU membership listing, ICCR where applicable, country-specific agent directories — each with the standard name and bridge sentence.

**GATE 6** — show me the international IA, one finished country page, one finished `/carebridge/{destination}/` page, and the hreflang implementation on three sample URLs.

---

### PHASE 7 — Off-site brief (you write the brief; humans execute)

Produce `docs/seo/offsite-playbook.md` — ready-to-send copy blocks, not advice:

1. **Google Business Profile** — name (GBP requires the name on campus signage: use "St. Mary's Rehabilitation University" if that is what the board says, else "St. Mary's University"), category, the bridge sentence as description, website, services = the 6 schools, photos checklist, review-request template for students/parents. Add a separate "admissions office" profile for the LB Nagar corporate office if it takes walk-ins.
2. **Aggregator corrections** — one section each for Shiksha (claim 246974, request merge of the "powered by Emversity" and "powered by NIAT" listings), Collegedunia (fix establishment year, course count, remove courses not offered, load all 90+), Careers360, CollegeDekho, GetMyUni, CollegeBatch, Justdial. Include the exact name, bridge sentence, establishment facts and course list to paste. **These listings are what generate the "Top BPT colleges in Hyderabad" lists — you cannot appear in those lists until your listing carries that course.**
3. **Wikidata item** — draft the statements (instance of: private university; official name; alias; short name; inception 2025-07-24; official website; coordinates; parent organisation; country; located in Telangana) with the Ordinance/Act/UGC citations.
4. **Wikipedia** — a sourced row for *List of educational institutions in Telangana* and the private-universities list, with citations. (A standalone article needs sustained independent coverage — collect it first.)
5. **Link requests** — template emails to stmarysgroup.com, smgoih.org, smichyderabad.org ("Our institutions" footer link) and to every partner (Newton School/NST, Emversity, Carebridge, Intellipaat/IST, NIAT, Edinbox/AIFSET, ByteXL, Veloces, Skilgen, Edridge, Mjollnir, OnnBikes, BlackBucks), asking for anchor text **"St. Mary's University (SMRU)"** and the bridge sentence — not "St. Mary's University powered by {partner}".
6. **smru.in** — renew the certificate, then 301 every path to the smru.edu.in equivalent. It must be a short link, never a second site.
7. **Regulator listings** — UGC, TGCHE, RCI, INC, NCAHP, BCI: confirm each shows the legal name **and** https://smru.edu.in.
8. **Social display names** → "St. Mary's University (SMRU), Hyderabad" (handles unchanged).
9. **Search Console / Bing Webmaster** — verify both, submit the sitemap index, set up IndexNow, and the monthly export routine.

**GATE 7** — deliver the playbook.

---

## 6. Definition of done

- [ ] Zero non-200 URLs in the sitemap index; zero orphan pages; custom 404 served.
- [ ] Zero occurrences of "St.Mary's" / "St.Marys" in visible copy, titles, H1s, descriptions or JSON-LD.
- [ ] Every retired URL 301s to a specific equivalent; `REDIRECT_MAP.csv` is a true record.
- [ ] Zero titles over 65 chars; zero duplicate titles or H1s; zero "Guide Guide".
- [ ] `docs/seo/course-coverage.csv` shows all 90+ programmes complete (or with a logged input gap).
- [ ] `Course` + `CourseInstance` (+ `Offer` where a real fee exists) validate for every programme page.
- [ ] Organization/WebSite graph validates; `sameAs` covers every profile.
- [ ] Templated pages reduced from 152 to ~30, each distinct.
- [ ] `llms.txt` / `llms-full.txt` accurate and list the full catalogue.
- [ ] `hreflang` en / en-IN / x-default on every page; `lang="en"`.
- [ ] `/international/`, country pages and `/carebridge/{destination}/` live with disclaimers.
- [ ] `npm run typecheck && lint && test && seo:guard && links:internal && audit:checklist && build` all pass.
- [ ] `REMEDIATION_SUMMARY.md` updated; `docs/seo/needs-input.md` lists every outstanding fact.

---

## 7. Report format after every phase

```
PHASE n — <name>
Changed:     <files, one line each>
Pages:       before → after (indexed / sitemap / total)
Redirects:   <count> added
Checks:      typecheck ✓ lint ✓ test ✓ seo:guard ✓ links ✓ audit ✓ build ✓
Needs input: <items added to docs/seo/needs-input.md>
Risks:       <anything I should decide before you proceed>
Next:        <phase n+1 summary>
```

**Start with Phase 0 and stop at Gate 0.**
