# St. Mary's University (SMRU) — SEO · AEO · GEO Diagnosis and Plan

**Scope:** smru.edu.in — brand searches ("St Mary's", "SMRU"), school searches, and course/programme searches across 90+ programmes; classic search (Google, Bing), answer engines (Google AI Overviews / AI Mode, Bing Copilot) and generative engines (ChatGPT, Perplexity, Gemini).
**Prepared:** 13 September 2026 · **Status:** v1 — this is the single working file; future changes are edits to this file.

---

## 0. The short version

You are not weak on-page. The codebase already has per-page metadata, canonicals, JSON-LD, a 322-URL sitemap, robots, llms.txt and a guard script. You are weak in three places that on-page work cannot fix by itself:

1. **Google does not know that "St. Mary's University" is you.** Every third-party source (UGC, Telangana Ordinance, Collegedunia, Careers360, Shiksha, YouTube, press) calls you *St. Mary's Rehabilitation University / SMRU*. The site rebranded itself to "St.Mary's University" (no space), a name Google already associates with St. Mary's College Hyderabad (Yousufguda), St. Mary's Group of Institutions, and universities in Texas, London and Halifax. Result: **for "st marys university hyderabad" Google shows St. Mary's College, Wikipedia, Careers360 and even Newton School's partner page about you — but not smru.edu.in.** Bing, by contrast, ranks you #1 and #2 for the same query, which tells you the problem is entity confusion, not crawlability.
2. **The rebrand script (`update_brand.js`) damaged the site's own identity statements and URLs.** The legal name is now recorded as "St.Mary's University", the site literally says *"St.Mary's University, legally established as St.Mary's University"*, a guide page is titled *"Is St.Marys University Same As St.Marys University"*, and the brand pages Google had indexed (`/smru-facts/`, `/st-marys-university/`, `/smru-hyderabad/`, `/st-marys-rehabilitation-university/`) now return **404** with no redirects, replaced by case-sensitive capitalised URLs (`/Stmarys-facts/` works, `/stmarys-facts/` is 404).
3. **Authority lives elsewhere.** Aggregators own page one for every head course query (BPT, BASLP, B.Sc Nursing …). Shiksha has three separate listings for you (SMRU, "SMRU powered by Emversity", "St. Mary's University powered by NIAT"). Collegedunia says you were established in 2025 and lists an M.Tech you may not offer. There is no Wikipedia/Wikidata presence, your own short domain smru.in is serving an expired SSL certificate, and the sister site stmarysgroup.com does not link to you at all.

Where it already works: niche programme pages rank on page one on their own (BPO #2, B.Sc Clinical Psychology #4 for "… course/college in Hyderabad"), and every "SMRU" query is fine. So the machine works; it is pointed at the wrong name and starved of authority.

**The five moves that matter most (all in the P0/P1 lists below):**

1. Adopt one naming standard everywhere — *St. Mary's University (SMRU), legally St. Mary's Rehabilitation University* — with the space, and repair the broken identity strings, schema and llms.txt.
2. Restore the dead brand URLs with 301s, drop the capitalised slugs, fix the 6 sitemap 404s, renew smru.in and 301 it to smru.edu.in.
3. Consolidate the 152 templated "guide/seo/brand" pages into ~25 substantial ones (they are the same ~700-word template with "Guide Guide" titles and currently look like doorway pages).
4. Make the outside world agree with you: one Google Business Profile, one Shiksha listing, corrected Collegedunia/Careers360 data, a Wikidata item + Wikipedia list entry, and links from stmarysgroup.com and every partner site using the name "St. Mary's University (SMRU)".
5. Turn the 90+ programme pages into the best answer for "X course in Hyderabad": real fees, Course + CourseInstance + Offer schema, answer-first intros, and presence inside the aggregator "Top X colleges in Hyderabad" lists.

---

## 1. What was checked and how (read this before acting on any ranking claim)

| Check | Method | Caveat |
|---|---|---|
| Google visibility for ~15 brand, school and course queries | Web search API | The search API is **US-located**. Google India results in Hyderabad may differ (usually in your favour for local queries). Verify each query in an incognito window from Hyderabad, and in Search Console, before treating a position as fact. |
| Bing visibility (India market) | Bing.com from your desktop, `cc=IN` | Reliable; Bing also feeds ChatGPT search and Copilot. |
| Google from your desktop | Blocked by Google's bot check — not attempted further | Do this manually. |
| Full crawl of the live sitemap | All 322 URLs fetched from smru.edu.in on 13 Sep 2026: status, title, description, canonical, robots, H1, word count, JSON-LD types | Word counts are approximate (rendered HTML text incl. nav/footer). |
| Repo review | `app/`, `src/lib/seo/*`, `src/lib/metadata.ts`, `data/seo-pages.ts`, `public/.htaccess`, `public/llms.txt`, `out/` export, `REMEDIATION_SUMMARY.md`, June 2026 Semrush baseline (`seo/audits/2026-06-11`) | The live site matches the current `out/` build (Apache, HSTS on, .htaccess honoured). |
| Third-party sources | Collegedunia, Careers360, Shiksha, Newton School, Wikipedia lists, Telangana Ordinance No. 2 of 2025 (PRS India), stmarysgroup.com, smru.in | Snapshot on 13 Sep 2026. |

Not available for this pass: Google Search Console / Bing Webmaster data, backlink data, Google Business Profile status. Section 9 covers how to plug those in; each will sharpen the priorities but will not change the diagnosis.

---

## 2. Where you stand today

| Search type | Example query | Google (US API) | Bing (India) | Verdict |
|---|---|---|---|---|
| Brand — SMRU | "smru hyderabad admissions 2026" | Collegedunia #1, then your course pages, homepage #5, apply.smru.edu.in #6 | — | **OK** (aggregator still outranks the official site) |
| Brand — St Mary's | "st marys university hyderabad" | St. Mary's College (Wikipedia, Careers360, stmaryscollege.in), Newton School's SMU page, smru.in short domain #8; **smru.edu.in absent** | smru.edu.in #1 and #2 | **Broken on Google** |
| Brand — St Mary's + intent | "st marys university admissions 2026 hyderabad courses" | St Mary's College (Careers360, welcome.stmaryscollege.in), SMCET (CollegeDekho), **smru.edu.in #4**, Shiksha SMRU #6 | smru.edu.in #1, #2 | Weak on Google |
| Legal name | "St. Mary's Rehabilitation University Deshmukhi" | Careers360, YouTube, Collegedunia, then smru-facts, contact-directory, homepage; Shiksha "powered by Emversity" | — | OK, but aggregators first |
| Head course terms | "BPT colleges in Hyderabad", "BASLP colleges in Hyderabad", "bsc nursing colleges in hyderabad" | Aggregator listicles only (Careers360, CollegeDekho, Collegedunia, Shiksha, Vedantu, Propelld …). **SMRU absent** | — | **Absent** — normal for a 1-year-old domain; must be won through the aggregators + local + authority |
| Niche course terms | "prosthetics and orthotics course BPO college in Hyderabad" | **smru.edu.in BPO page #2** | — | Working |
| Niche course terms | "bsc clinical psychology course colleges in hyderabad" | **smru.edu.in #4** | — | Working |
| Regulator / list visibility | Wikipedia "List of educational institutions in Telangana" | Lists Anurag, Mahindra, SR, Woxsen … **SMRU not listed** | — | Missing entity signal |
| AI engines | ChatGPT/Copilot (Bing index) | — | Bing is healthy for the brand | Google AI Overviews/Gemini inherit the Google brand problem |

Key pattern: **anything that says "SMRU" works; anything that says "St Mary's" collides with older institutions; anything competitive is owned by aggregators.**

---

## 3. Root cause 1 — the name problem (entity split)

### 3.1 Three names, no bridge that Google trusts

| Name | Who uses it | Google's view |
|---|---|---|
| St. Mary's Rehabilitation University | Telangana Ordinance No. 2 of 2025 (24 July 2025) and Act No. 10 of 2026, UGC 2(f) letter, TGCHE, Collegedunia, Careers360, Shiksha, YouTube, press releases, your own PDFs | This is the Knowledge Graph entity |
| SMRU | Your domain, social handles (facebook.com/SMRUniversity, instagram/linkedin smruhyderabad, youtube @SMRUniversity), apply.smru.edu.in, aggregators | Strongly attached to the entity above |
| St.Mary's University (no space) | Site title template, H1s, 176 mentions on the homepage vs 20 for "St. Mary's", llms.txt ("St.Marys University"), keywords | Not an established entity; string-matches St. Mary's College Hyderabad, St. Mary's Group, St. Mary's University (Texas/Twickenham/Halifax/Calgary) |

Google resolves a brand query by matching the query to an entity, then ranking that entity's home page. Because nobody outside smru.edu.in calls you "St. Mary's University", the query "st marys university hyderabad" resolves to the *College*, whose Wikipedia article and Careers360 profile exist, and the university does not appear. This is also why the Newton School page — which says "St. Mary's University, Hyderabad" in plain text on a high-authority domain — outranks you for your own name.

### 3.2 The rebrand script broke the bridge on your own site

`update_brand.js` replaced every "St Mary's / St. Mary's / Stmarys" with "St.Mary's" across `src/`, `app/` and `data/`. Collateral damage found in the live site and repo:

| Location | What it says now | Impact |
|---|---|---|
| `src/lib/shared/university.ts` → `legalName` | "St.Mary's University" | Wrong legal name feeds any place that uses `UNIVERSITY_INFO.legalName` |
| `src/lib/seo/site.ts` → `bridgeSentence` | "St.Mary's University, legally established as St.Mary's University, Hyderabad, Telangana." | Nonsense sentence intended to be the canonical bridge |
| `/Stmarys-university-official/` (meta description) | "St.Mary's University is the official/legal name of St.Mary's University" | The page whose job is to explain the legal name no longer names it |
| `/Stmarys-hyderabad/` | "St.Mary's University Hyderabad refers to St.Mary's University, publicly known as St.Mary's University" | Tautology |
| `/rehabilitation-university-hyderabad/` | "Reference page for St.Mary's University … publicly known as St.Mary's University" | Same |
| `/student-guides/is-st-marys-university-same-as-smru/` | H1 "Is St.Marys University Same As St.Marys University Guide" | The one page that should answer "is SMRU the same as St Mary's?" no longer says SMRU |
| `/student-guides/what-is-smru/` | Title "What Is St.Marys University Guide" | Same |
| `public/llms.txt` | "Public brand: St.Marys University" (no apostrophe), "Established: 2026" | AI crawlers are told a third spelling |
| `/Stmarys-facts/`, `/Stmarys-hyderabad/`, `/Stmarys-university-official/` | H1 = full title including "| St.Mary's University" | Brand suffix inside the H1 |
| `/explore-smru/` | canonical → `/explore-Stmarys/` which is a 404 | Broken canonical |
| `/Handbook/` | Serves a copy of the homepage; `/Hand-Book/` has no canonical | Duplicates |

### 3.3 URLs Google had indexed now 404 — and the replacements are case-sensitive

| Old URL (indexed, cited in search results) | Status now | New URL | Status of lowercase variant |
|---|---|---|---|
| /smru-facts/ | **404** | /Stmarys-facts/ | /stmarys-facts/ → 404 |
| /st-marys-university/ | **404** | /Stmarys-university/ | /stmarys-university/ → 404 |
| /smru-hyderabad/ | **404** | /Stmarys-hyderabad/ | 404 |
| /st-marys-rehabilitation-university/ | **404** | /Stmarys-university-official/ | 404 |
| /seo/st-marys-university/, /seo/smru-hyderabad/ | **404** | — | — |
| /student-guides/st-marys-university/ | **404** | /student-guides/Stmarys-university/ | 404 |

No 301s exist in `public/.htaccess` for any of these. `REDIRECT_MAP.csv` records the intended renames (`smru-facts → stmarys-facts` etc.) but they were never implemented as server redirects, and the slugs shipped with a capital S. Every link and every bit of history those pages had earned is currently being thrown away, and Google has to re-crawl and re-evaluate the new URLs from zero.

### 3.4 The fix: one entity, three names, one spelling

Adopt this standard and apply it everywhere (site, schema, GBP, listings, social, press):

- **Display name:** St. Mary's University — *with the space and the apostrophe*. "St.Mary's" survives only as an `alternateName`.
- **Short name:** SMRU (keep — it is the name the web already knows).
- **Legal name:** St. Mary's Rehabilitation University.
- **Locator:** Hyderabad, Telangana (Deshmukhi campus, near Ramoji Film City).
- **Bridge sentence (use verbatim on the homepage, About, facts page, llms.txt, GBP description, every listing):** *"St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026."*

Homepage as the single entity page:

- `<title>`: **St. Mary's University Hyderabad (SMRU) – Official Site** (52 chars)
- Meta description: **St. Mary's University (SMRU) is a UGC-recognised private university in Hyderabad — legally St. Mary's Rehabilitation University — offering 90+ programmes in rehabilitation, allied health, nursing, psychology, engineering and law.** (trim to ≤160 if needed)
- H1: **St. Mary's University (SMRU), Hyderabad**, with a visible sub-line carrying the bridge sentence (today the legal name sits in an `sr-only` span — put it in visible text).
- Organization JSON-LD: `name` "St. Mary's University", `legalName` "St. Mary's Rehabilitation University", `alternateName` ["SMRU", "St. Mary's Rehabilitation University", "St.Mary's University", "St Marys University Hyderabad"], `foundingDate` "2025-07-24" (Ordinance) with `description` noting Act 10 of 2026, `parentOrganization` Joseph Sriharsha & Mary Indraja Educational Society, `sameAs` → GBP/Maps URL, LinkedIn, Facebook, Instagram, YouTube, Wikidata (once created), Collegedunia, Careers360, Shiksha.
- Keep the two brand pages that earn their place — `/about/` and one facts page — and give the facts page the URL **`/smru/`** ("SMRU – St. Mary's Rehabilitation University: name, status, campus, contacts"). 301 every other brand-reference URL (old and new) to it (see Appendix B).

Everything else (titles, H1s, body copy) then uses "St. Mary's University" and "SMRU" naturally; the legal name appears once per page in the footer line, which is enough.

---

## 4. Root cause 2 — authority and citations live off-site

| Finding | Evidence | Why it matters |
|---|---|---|
| Aggregators outrank the official site even for "smru hyderabad admissions" | Collegedunia #1 | Their pages have years of links and reviews; yours has months |
| Three Shiksha listings | "St. Mary's Rehabilitation University" (246974), "…powered by Emversity" (246322), "St. Mary's University Powered by NIAT" | Splits reviews, fees and Q&A across three entities; AI engines treat them as three colleges |
| Collegedunia data drift | "Established 2025", "over 47 courses" (meta says 60), M.Tech + PhD listed, fees INR 6L (BPT/BOT), 8L (B.Sc Nursing) | These numbers are what AI answers quote; the site says 2026 and 90+ |
| No encyclopaedic presence | Not on Wikipedia's Telangana institution list; no Wikidata item; St. Mary's College *has* an article | Knowledge Graph and AI engines lean on these |
| smru.in short domain | Indexed as a separate site ("SMRU \| Official Short Domain…", "Virtual Campus Tour \| St.Marys University"); my fetcher reported an **expired SSL certificate** — confirm in a browser | A second, thinner copy of the brand competing with the main site, now with a security warning |
| stmarysgroup.com (est. 1996 domain, same sponsor) | No link to smru.edu.in; own SEO is stale (no robots.txt, sitemap dated Feb 2024, every page titled "Welcome to St. Mary's Group \| Best Engineering College Hyd", http/https + www/non-www all indexed, broken H1 "Redefining Technical Education in") | The single cheapest authority link you can get, and it carries the "St. Mary's" name |
| Partner sites outrank you for your own name | Newton School's "St. Mary's University, Hyderabad" page ranks for the brand query; Emversity/NIAT-branded listings exist | Partners should be sending links and using the standard name, not creating parallel identities |
| Press exists but is not leveraged | fridaywall.com and prittleprattlenews.com launch coverage | Ask for links; reuse for Wikipedia citations |

### 4.1 Off-site action list

1. **Google Business Profile** — one profile, name "St. Mary's University (SMRU)" only if that is the name on the campus signage (GBP rules); otherwise "St. Mary's Rehabilitation University". Category *Private university*; add secondary categories (Physiotherapy college? use what GBP offers: "University", "College"); description = bridge sentence; website = https://smru.edu.in/; add photos, all 6 schools as services, opening hours, the LB Nagar corporate office as a separate "Admissions office" profile if it takes walk-ins. Start a review programme (students, parents, partner hospitals). This is what puts you in the local pack for "physiotherapy college near me" and "colleges near Ramoji Film City".
2. **Shiksha** — claim 246974, ask Shiksha to merge 246322 (Emversity) and the NIAT listing into it. **Collegedunia / Careers360 / CollegeDekho / GetMyUni / CollegeBatch / Justdial** — claim, set the standard name and bridge sentence, correct establishment (Ordinance 2025, Act 2026), remove courses you do not run, load all 90+ programmes with fees and eligibility. Aggregator "Top BPT colleges in Hyderabad" lists are generated from their own listings — you cannot appear in them until your listing carries that course.
3. **Wikidata item** for St. Mary's Rehabilitation University (instance of: private university; official name; alias St. Mary's University; short name SMRU; inception 2025; official website; coordinates; parent organisation). **Wikipedia:** add a sourced row to *List of educational institutions in Telangana* (and the private-universities list) citing the Ordinance/Act and UGC letter. A standalone article needs sustained independent coverage — collect it first (see 6).
4. **Regulator listings** — confirm the UGC private universities list and TGCHE list show the legal name *and* https://smru.edu.in as website; request corrections if blank. Same for RCI, INC, NCAHP, BCI programme approvals where they publish institution pages.
5. **smru.in** — renew the certificate today, then 301 every path to the equivalent smru.edu.in URL (keep it as a short link, never as a site).
6. **Sister and partner links** — footer/"Our institutions" links from stmarysgroup.com, smgoih.org, smichyderabad.org to https://smru.edu.in/ with anchor "St. Mary's University (SMRU)"; the same request to every partner page (Newton School/NST, Emversity, Carebridge, Intellipaat/IST, NIAT, Edinbox/AIFSET, ByteXL, Veloces, Skilgen, Edridge, Mjollnir, OnnBikes, BlackBucks). Ask partners to describe you with the bridge sentence, not "St. Mary's University powered by X".
7. **Earned coverage** — a steady drumbeat that Telangana and education media will cover: admissions/entrance (SMCET) notices, convocation, hospital/clinic tie-ups, RCI/INC approvals, placement drives, the Carebridge global-health pathway. Each story: standard name + link.
8. **Social naming** — LinkedIn/Facebook/Instagram/YouTube display names "St. Mary's University (SMRU), Hyderabad"; handles stay.

---

## 5. Root cause 3 — on-site quality (from the crawl of all 322 sitemap URLs, 13 Sep 2026)

| # | Finding | Count / examples | Fix |
|---|---|---|---|
| 5.1 | Sitemap URLs that return 404 | 6: `/iqac/`, `/mandatory-disclosure/ugc-disclosure/`, `/mandatory-disclosure/statutory-disclosures/`, `/mandatory-disclosure/contact/`, `/mandatory-disclosure/first-academic-year-disclosure/`, `/mandatory-disclosure/public-information/` | Remove from `src/lib/seo/sitemap.ts` (`isolatedSeoRoutes` / `indexableComplianceRoutes`) or create the routes. llms.txt also points to `/iqac/`. |
| 5.2 | Sitemap lists noindex/alias pages | `/niat/`, `/bb/`, `/skilgen/` are noindex and canonical to `/partner/*`; `/qtst/` has **no canonical**; `/search/` is indexable and in the sitemap; `/niat-upskilling/`, `/qtst/` have no H1 | Drop aliases and `/search/` from the sitemap; noindex `/search/`; add canonical to `/qtst/` |
| 5.3 | Titles over 60 characters | 71 (all 71 programme pages, 68–82 chars) | New title formula, Appendix C |
| 5.4 | Titles cut mid-phrase by the trimmer | "Best Private University in \| St.Mary's University", "UGC Recognized University In \| …", "School of Engineering & Emerging \| …", "Top University in Hyderabad for \| …", "Compare St.Marys University With \| …" (7) | Fix `trimAtWord` in `src/lib/metadata.ts` (the 23-char suffix leaves 37 chars; shorten the suffix, and never cut inside a phrase) |
| 5.5 | Duplicate titles | 11 pairs, e.g. `/health-allied-health-sciences/` vs `/schools/health-allied-health-sciences/`; `/Stmarys-university/` vs `/student-guides/Stmarys-rehabilitation-university/` ("St.Marys University Guide") | Consolidate (5.7) |
| 5.6 | "Guide Guide" titles | `/admission-guides/bpo-course-guide/` → "BPO Course Guide Guide", "BASLP Admission Guide Guide" … | Template suffix bug in `data/seo-pages.ts` title builder |
| 5.7 | **152 templated pages with near-identical length** | 22 `/seo/*` (702–734 words each), 72 `/admission-guides/*` (728–733), 50 `/student-guides/*` (~700), 8 brand reference pages | Same skeleton with the keyword swapped in. Under Google's *doorway pages* and *scaled content abuse* policies this is the profile that gets a site ignored or worse — and it cannibalises the real programme pages (`/admission-guides/bpt-course-hyderabad/` vs `/schools/…/bpt/`). Consolidate to ~25 pages that say something different (Section 6.3). |
| 5.8 | FAQPage schema on 261 of 322 pages, largely boilerplate ("How do I compare the right course…") | 261 | Google stopped showing FAQ rich results for non-government/health sites in 2023; boilerplate FAQs add nothing and make every page look the same to an LLM. Keep FAQ schema only where the questions are page-specific (programme pages, /smru/). |
| 5.9 | Deliberate misspellings injected as keywords | Programme pages carry "cource", "admision", "collage", "hyderbad" in meta keywords **and** JSON-LD `keywords` (BCVT page: "cource" ×54, "hyderbad" ×18) | Google ignores meta keywords; LLM crawlers read JSON-LD. Delete `buildProgramTypoSearchTerms` and the brand-misspelling keyword lists. |
| 5.10 | Fees pages without fees | Programme pages: "Fee status: confirm through official admissions counselling"; `/fee-structure/` a status page | A "BPT fees Hyderabad" searcher gets a number on Collegedunia (₹6 L) and nothing here → Google ranks Collegedunia. Publish at least an annual fee range per programme. |
| 5.11 | Compliance pages that are status placeholders but indexable | `/ombudsperson/`, `/naac/`, `/nirf/`, `/first-academic-year-disclosures/`, `/academic-calendar/`, `/faculty-directory/` ("Under process", "Awaiting public release") | Fine to keep for compliance; noindex until they carry real content so they do not dilute the crawl budget and quality signal |
| 5.12 | Custom 404 page never served | Server returns a bare 13-byte "404 Not Found" for any missing URL; `out/404.html` is unused | Add `ErrorDocument 404 /404.html` to `.htaccess` |
| 5.13 | Thin pages | `/campus-360/` (133 words), 15 partner alias pages (~115 words, no H1) | Noindex the alias pages (already partly done); give `/campus-360/` real copy |
| 5.14 | Description length | 47 over 160 chars; 7 under 70 | Formula in Appendix C |
| 5.15 | Homepage weight | 211 KB HTML, 379 KB favicon PNG used for all icon sizes | Not a ranking factor by itself; trim the favicon to a 32/180/512 set |
| 5.16 | Speculation rules prefetch *every* internal link eagerly | `app/layout.tsx` | Harmless for SEO, wasteful on mobile data; keep the prerender list, drop the eager `/*` prefetch |

What is already good and should stay: trailing-slash canonicals, HTTPS + non-www 301s, HSTS, X-Robots-Tag on `/thank-you/`, breadcrumbs, Course/CollectionPage/ItemList schema, `llms.txt` (once corrected), the seo:guard script, no rendering dependence on JavaScript (static export).

---

## 6. Course and school search — how St. Mary's shows up for 90+ programmes

### 6.1 What actually ranks for a course query, and where you can win

For "BPT colleges in Hyderabad" Google's page one is: aggregator lists (Careers360, CollegeDekho, Collegedunia, Shiksha), a local pack from Google Maps, sometimes a "Colleges" carousel from the Knowledge Graph, and one or two official college pages that have strong authority. For "BPT course in Hyderabad fees" or "BPO course Hyderabad" (long-tail or niche), individual programme pages rank — which is exactly where your BPO and B.Sc Clinical Psychology pages already sit.

So the plan has four lanes, all needed:

| Lane | Query family | What wins | Your action |
|---|---|---|---|
| A. Own programme pages | "{course} in Hyderabad", "{course} fees Hyderabad", "{course} eligibility 2026", "{course} admission Hyderabad", "{course} vs {course}" | The most complete, specific page | Programme page standard (6.2) on all 90+ pages |
| B. Aggregator lists | "top/best {course} colleges in Hyderabad" | Collegedunia/Shiksha/Careers360/CollegeDekho lists — built from their listings | Claim listings, load every course with fees (Section 4.1) |
| C. Local | "{course} college near me", "colleges near Ramoji Film City / LB Nagar / Deshmukhi" | Google Business Profile + reviews | GBP with services, photos, reviews, posts |
| D. Answer/AI engines | "which college in Hyderabad offers BASLP?", "is SMRU good for BPT?", "BPT fees at St Mary's" | Consistent facts across official site, listings, Wikidata; answer-first page intros | Section 7 |

### 6.2 Programme page standard (apply to every one of the 90+ pages)

Each page must be the best single answer for its course in Hyderabad. Minimum contents, in this order:

1. **Answer-first paragraph (40–70 words, visible, above the fold):** what the programme is, duration, eligibility in one line, annual fee or fee range, intake/seat count if public, approvals that apply to *this* programme (RCI/INC/NCAHP/BCI/UGC), campus. This paragraph is what AI Overviews and ChatGPT lift.
2. **Key facts table:** level, duration, eligibility, entrance/selection (SMCET or merit), annual fee, total fee, intake, start month, approvals, department, school.
3. **Curriculum outline** by year/semester (real subjects, not generic).
4. **Clinical / practical training:** partner hospitals, labs, hours — named.
5. **Careers:** roles, typical starting salary range in India (state the source), higher-study paths.
6. **Why St. Mary's for this course:** 3–5 concrete differentiators (on-campus clinics, faculty, 120-acre campus, hostel).
7. **5–8 programme-specific FAQs** (with FAQPage schema) — "Is BPT at St. Mary's University approved by…?", "What is the BPT fee at SMRU?", "Does SMRU offer hostel for BPT students?"
8. **Internal links:** school hub, department hub, 3–6 related programmes, admissions, fee structure, campus tour, apply.
9. **Schema:** `Course` with `provider` → organisation `@id`, `hasCourseInstance` (`courseMode`: onsite, `courseSchedule`/duration, `location`), `offers` (`price`, `priceCurrency` INR, `category` annual fee), `educationalCredentialAwarded`, `occupationalCredentialAwarded` where a council registration follows, `BreadcrumbList`. Today's `buildCourseSchema` has no `hasCourseInstance` or `offers`, which makes the pages ineligible for course rich results.
10. **Title/description** per Appendix C, an H1 that names the course and the university, a real "Last updated" date, and one distinctive image with alt text.

Pages at 1,000–1,500 words of *specific* content beat 4,000 words of template. Several programme pages are already long (avg 1,414 words) — the gap is specificity (fees, approvals, hospitals, salaries), not length.

### 6.3 Consolidation map for the 152 templated pages

| Group | Today | Do this |
|---|---|---|
| Brand reference (5 info pages + 3 student-guide brand pages + old 404 URLs) | 8 near-identical pages | One page at `/smru/`; 301 all others (Appendix B) |
| `/seo/*` city-intent pages (22) | "X College Hyderabad Guide" template | Keep 6 as genuinely written landing pages that map to a school and link to its programmes: `bpt-college-hyderabad`, `baslp-college-hyderabad`, `nursing-college-hyderabad`, `law-college-hyderabad`, `engineering-college-hyderabad`, `psychology-college-hyderabad`. Fold `private-university-in-hyderabad/telangana`, `ugc-recognized-*`, `rehabilitation-university-hyderabad` into `/about/`+`/smru/`; fold location pages (`colleges-near-ramoji-film-city`, `university-near-ramoji-film-city`, `college-in-deshmukhi-hyderabad`, `university-in-yadadri-bhuvanagiri`) into **one** `/campus-location-hyderabad/`; 301 the rest to the relevant school hub. |
| `/admission-guides/*` (72) | Per-course duplicates of programme pages + admission-process pages | Course ones: merge into the programme page ("Admission process" section) and 301. Keep and strengthen the process pages as *one* Admissions hub: `smru-admissions-2026`, `smcet-2026-guide`, `application-form-guide`, `document-checklist`, `scholarship-eligibility-questions`, `admission-counselling-guide`, `admission-helpline-guide` → 7 pages under `/admissions/…/`. |
| `/student-guides/*` (50) | Comparisons, campus, FAQ-style "does SMRU offer…" | Keep the 13 "X vs Y" comparisons (`bpt-vs-bot`, `baslp-vs-bpt`, `llb-vs-ba-llb`, `mpt-vs-mot`, `bpo-vs-mpo`…) — rewrite each with a real comparison table; these are the best long-tail assets on the site. Merge all "does-smru-offer-…/where-is-smru/what-is-smru/how-to-apply" into `/smru/` FAQs and 301. Merge campus-visit/hostel pages into `/campus-guide/` and `/hostel/`. |
| `/guides/best-*` (11) | "Best university in Hyderabad" pages that carefully "do not claim" | Keep 3 (`best-rehabilitation-university-in-hyderabad`, `best-allied-health-sciences-college-in-hyderabad`, `best-law-college-in-hyderabad`) only if rewritten as honest comparison guides with named competitors and criteria; otherwise 301 to school hubs. A page titled "Best MBA College in Hyderabad" on a university with no MBA is a liability. |

Net: ~152 → ~30 pages, each with a reason to exist. Expect a temporary dip in indexed-page count and no loss of traffic these pages were not earning.

### 6.4 School and department hubs

Six school pages and their department pages exist; make each a true hub: intro (answer-first), programme table (name · level · duration · annual fee · approvals · link), faculty highlights, labs/clinics, admissions CTA, FAQs, `CollectionPage` + `ItemList` of `Course`. Fix the duplicate school URLs (`/health-allied-health-sciences/` and `/schools/health-allied-health-sciences/` carry the same title): canonicalise or 301 the short one to `/schools/…`.

Add one **"All programmes A–Z"** page (`/programmes/`) listing every course with level, school and fee — a single crawl-and-link hub that also feeds AI engines a complete inventory. `/academic-structure/` and `/html-sitemap/` partially do this; one canonical list is better.

### 6.5 Query map by school (targets for tracking; expand from GSC)

| School | Head terms (lane B/C) | Own-page terms (lane A) |
|---|---|---|
| Rehabilitation Sciences | BASLP colleges in Hyderabad; audiology course Hyderabad; special education B.Ed Hyderabad; prosthetics orthotics course India | BASLP fees Hyderabad; BASLP eligibility 2026; BPO course Hyderabad; B.Ed special & inclusive education RCI Hyderabad; BASLP vs BPT |
| Health & Allied Health | BPT colleges in Hyderabad; BOT colleges Hyderabad; BMLT colleges Hyderabad; optometry colleges Hyderabad; forensic science course Hyderabad | BPT fees Hyderabad private university; MPT admission 2026 Hyderabad; cardiovascular technology course Hyderabad; anaesthesia OT technology course Hyderabad; BPT vs BOT |
| Psychology | psychology colleges in Hyderabad; clinical psychology course Hyderabad | B.Sc clinical psychology Hyderabad (already ranking); M.A. clinical psychology Hyderabad; PG diploma rehabilitation psychology RCI |
| Nursing | B.Sc nursing colleges in Hyderabad; nursing colleges Telangana INC | B.Sc nursing fees Hyderabad private; M.Sc nursing admission 2026 Hyderabad |
| Engineering & Emerging Tech | B.Tech CSE AI ML colleges Hyderabad; private university B.Tech Hyderabad | B.Tech rehabilitation engineering India; B.Tech CSE fintech Hyderabad; B.Tech biomedical engineering Hyderabad |
| Law | law colleges in Hyderabad; BA LLB colleges Hyderabad; LLB admission 2026 Telangana | 5-year integrated LLB private university Hyderabad; B.Sc forensic LLB; LLB vs BA LLB |
| University-wide | private universities in Hyderabad; UGC recognised private university Telangana; colleges near Ramoji Film City | SMRU admissions 2026; SMCET; St Mary's University fees; SMRU hostel |

---

## 7. AEO and GEO — being the answer in AI Overviews, ChatGPT, Perplexity, Gemini, Copilot

How these engines choose sources today:

- **Google AI Overviews / AI Mode / Gemini** — Google's index + Knowledge Graph. They inherit the brand-entity problem in Section 3; fix that first and they follow.
- **ChatGPT search / Bing Copilot** — Bing's index. Bing already ranks you #1–2 for the brand, so the job here is *fact consistency*, Bing Webmaster Tools verification and IndexNow so changes propagate in hours.
- **Perplexity** — its own crawler (PerplexityBot) plus Bing; cites the pages with the clearest, most quotable facts.

Actions:

1. **One facts source, repeated everywhere.** The bridge sentence, establishment (Ordinance No. 2 of 2025 → Act No. 10 of 2026), UGC 2(f), sponsor society, campus address, phone, email, six schools, programme count, and the official URL must read identically on: homepage, `/about/`, `/smru/`, `llms.txt`, Organization JSON-LD, GBP, LinkedIn, all aggregator listings, Wikidata. Today they disagree on the name (three spellings), the year (2025 vs 2026) and the course count (47 / 60 / 90+).
2. **Fix `public/llms.txt` and `llms-full.txt`:** correct the name and spelling, add the legal name and SMRU on line one, add establishment facts, add the `/programmes/` A–Z URL, remove the `/iqac/` 404, and list *every* programme with its canonical URL and one-line fact (level · duration · fee). Keep the "source priority" and "answer rules" sections — they are good.
3. **Answer-first intros** on every programme, school and brand page (6.2, item 1) — engines quote the first specific paragraph.
4. **Schema completeness:** Organization `sameAs` to every profile and listing; `Course` + `hasCourseInstance` + `offers`; `FAQPage` only with page-specific questions; `foundingDate`; `address` with `geo`. Remove the misspelled keyword arrays — LLM crawlers read them.
5. **Crawler access:** robots.txt currently allows everything except `/developer/`, `/api/`, `/thank-you/` — keep it; explicitly allow `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Bingbot` (the guard script already expects OAI-SearchBot and bingbot lines).
6. **Wikidata + Wikipedia list entry** (4.1) — the single most effective GEO move for a new entity.
7. **Reviews and Q&A** on GBP, Shiksha, Collegedunia — AI answers to "is SMRU good?" are built from these.
8. **Monthly AI audit:** ask ChatGPT, Perplexity, Gemini and Google AI Mode the same 12 questions ("What is SMRU?", "Is St. Mary's University Hyderabad UGC recognised?", "BPT colleges in Hyderabad", "BASLP fees at St Mary's University" …), log what they say and which sources they cite, and fix the source that misled them. Keep the log in this file.

---

## 8. Prioritised roadmap

Effort: S = hours, M = days, L = weeks. Impact is on the brand + course goals above.

### P0 — this week (mostly code and config; highest impact per hour)

| # | Action | Where | Effort | Impact |
|---|---|---|---|---|
| 1 | Naming standard: fix `legalName`, `bridgeSentence`, `defaultTitle`/`titleTemplate` spelling to "St. Mary's University"; Organization schema per 3.4; homepage title/description/H1 | `src/lib/shared/university.ts`, `src/lib/seo/site.ts`, `src/lib/metadata.ts`, `app/page.tsx`, `src/views/Home.tsx` | S | Very high |
| 2 | 301s for every dead/capitalised brand URL to `/smru/`; rename slugs to lowercase; `ErrorDocument 404` | `public/.htaccess`, `src/lib/seo/info-pages.ts`, `data/seo-pages.ts` (Appendix B) | S | Very high |
| 3 | Sitemap hygiene: remove the 6 × 404s, alias/noindex pages and `/search/`; canonical on `/qtst/`; fix `/explore-smru/` canonical; fix `/Hand-Book/` canonical | `src/lib/seo/sitemap.ts`, page files | S | High |
| 4 | Repair the broken brand pages' copy (3.2) — or simply retire them into `/smru/` now | `src/lib/seo/info-pages.ts`, `data/seo-pages.ts` | S | High |
| 5 | Renew smru.in certificate; 301 smru.in/* → smru.edu.in/* | DNS/hosting | S | High |
| 6 | `llms.txt` / `llms-full.txt` corrections (7.2) | `public/` | S | Medium |
| 7 | Google Search Console: confirm the property, submit the sitemap, request indexing for `/`, `/about/`, `/smru/`; **Bing Webmaster Tools + IndexNow** | GSC/BWT | S | High (measurement) |
| 8 | Title formula + trimmer fix; remove typo-keyword generation and brand-misspelling keyword arrays | `src/lib/metadata.ts`, `src/lib/shared/dynamic-route-metadata.ts`, `src/lib/seo/search-intent.ts`, `src/lib/seo/health-allied-course-seo.ts` (Appendix C) | M | High |

### P1 — next 30 days (off-site + content structure)

| # | Action | Owner | Effort | Impact |
|---|---|---|---|---|
| 9 | Google Business Profile set up/claimed to the standard; review programme started | Admissions/marketing | M | Very high |
| 10 | Aggregator listings claimed and aligned (Shiksha merge, Collegedunia corrections, all 90+ courses with fees on each) | Admissions | M | Very high |
| 11 | Links + standard naming from stmarysgroup.com, smgoih.org, smichyderabad.org and all partner sites | Management/partnerships | M | High |
| 12 | Wikidata item; Wikipedia list entries with citations (Ordinance, Act, UGC letter, press) | Anyone with the sources | S | High |
| 13 | Consolidation of the 152 templated pages per 6.3 (with 301s) | Dev + content | L | High |
| 14 | Publish fee ranges for every programme; add `hasCourseInstance` + `offers` to Course schema | Registrar + dev | M | High |
| 15 | Regulator lists (UGC, TGCHE, RCI, INC, NCAHP, BCI) show legal name + website | Registrar | S | Medium |
| 16 | Social display names updated; press outlets asked to link | Marketing | S | Medium |

### P2 — 60–90 days (content that earns rankings and links)

| # | Action | Effort | Impact |
|---|---|---|---|
| 17 | Programme page standard (6.2) rolled out across all 90+ pages, starting with the 20 highest-search programmes (BPT, B.Sc Nursing, BASLP, BOT, BMLT, B.Tech CSE AI/ML, BA LLB, B.Sc Clinical Psychology, Optometry, Forensic Science …) | L | Very high |
| 18 | 13 "X vs Y" comparison guides rewritten with real tables; 6 city-intent landing pages rewritten | L | High |
| 19 | School hubs + `/programmes/` A–Z (6.4) | M | High |
| 20 | YouTube: one 3–5 minute video per top-20 programme (campus, labs, faculty), embedded on the page with `VideoObject`; the existing channel already ranks for the legal name | L | Medium–High |
| 21 | Earned-media calendar (4.1 item 7) and a "News & notices" section on the site with real dates | ongoing | Medium–High |
| 22 | Monthly AI-engine audit and this file updated | S/month | Medium |

---

## 9. Measurement

- **Search Console (Google) and Webmaster Tools (Bing):** verify both (the Google verification meta tag is already in `app/layout.tsx`); submit `https://smru.edu.in/sitemap.xml`; watch *Pages → Not indexed* for the capitalised URLs and the consolidated pages; export *Performance → Queries* monthly.
- **Brand KPIs (monthly):** impressions and average position for "st marys university hyderabad", "st mary's university hyderabad", "stmarys university", "smru", "smru hyderabad", "st marys rehabilitation university"; target: smru.edu.in in the top 3 for all of them on Google India within 90 days of P0+P1.
- **Course KPIs:** clicks and position for the 6.5 query map (start with 30 queries); number of aggregator "Top X colleges in Hyderabad" pages listing SMRU; GBP views/direction requests/calls; programme-page → apply.smru.edu.in conversions (the existing Google Ads and Meta Pixel tags can carry an "Apply" event).
- **Health KPIs:** sitemap URLs returning non-200 (target 0); pages with titles > 65 chars (target 0); indexed pages vs sitemap pages within ±10%; Core Web Vitals in GSC (static export should pass).
- **Baseline to capture now, before changes:** screenshots of Google India results for the 6 brand queries, GSC last-90-days export, current indexed count (`site:smru.edu.in` in Google India), and the AI-engine answers to the 12 questions in 7.8.

---

## Appendix A — Crawl summary (live site, 13 Sep 2026, 322 sitemap URLs)

- Status: 316 × 200, **6 × 404** (listed in 5.1). Host: Apache; HSTS present; `.htaccess` redirects honoured (law URLs 301 correctly); custom 404 page not served.
- Canonical ≠ URL: `/niat/`, `/bb/`, `/skilgen/` (→ `/partner/*`, noindex), `/qtst/` (none).
- Noindex in sitemap: 3. Pages without robots meta: 0.
- Titles: 71 over 60 chars (62 over 70); 7 truncated mid-phrase; 11 duplicate-title pairs; 6 empty (the 404s).
- Descriptions: 47 over 160 chars; 7 under 70.
- H1: 15 pages with none (partner aliases, `/search/`); 3 with the brand suffix inside the H1; 0 with multiple H1s.
- Word count (rendered, incl. chrome): 22 under 300; 210 under 800; 112 at 800+. Programme pages avg 1,414 (min 1,062). `/seo/*` 702–734; `/admission-guides/*` 728–733; `/student-guides/*` ~700.
- Structured data: FAQPage on 261 pages; Course on 94; 19 pages with none (leadership, brochure, careers, campus-360, html-sitemap).
- Brand string counts on the homepage HTML: "St.Mary" 176 · "St. Mary" 20 · "SMRU" 19 · "Rehabilitation University" 18.
- Programme pages carry misspelled keywords in meta keywords and JSON-LD (BCVT page: "cource" ×54, "admision" ×24, "hyderbad" ×18, "collage" ×18).
- June 2026 Semrush baseline (for comparison): 370 long titles, 277 duplicate H1/title, 44 no-H1, 140 noindex pages — most of these have since been fixed; the remaining issues are the ones above.

## Appendix B — Redirect map to implement in `public/.htaccess` (Apache, `mod_rewrite`)

Rename the capitalised slugs to lowercase in `src/lib/seo/info-pages.ts` and `data/seo-pages.ts` first, then add (before the "Retired law URLs" block):

```apache
# Brand reference pages -> single canonical facts page
RewriteRule ^(smru-facts|Stmarys-facts|stmarys-facts)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^(st-marys-university|Stmarys-university|stmarys-university|st-marys-rehabilitation-university|Stmarys-university-official|stmarys-university-official)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^(smru-hyderabad|Stmarys-hyderabad|stmarys-hyderabad|rehabilitation-university-hyderabad)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^seo/(st-marys-university|stmarys-university|smru-hyderabad|stmarys-hyderabad|st-marys-rehabilitation-university|stmarys-university-official)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
RewriteRule ^student-guides/(st-marys-university|Stmarys-university|stmarys-university|Stmarys-university-hyderabad|stmarys-university-hyderabad|Stmarys-rehabilitation-university|stmarys-rehabilitation-university|what-is-smru|is-st-marys-university-same-as-smru|where-is-smru-located)/?$ https://smru.edu.in/smru/ [L,R=301,NC]
# Aliases
RewriteRule ^explore-smru/?$ https://smru.edu.in/campus-guide/ [L,R=301]
RewriteRule ^Hand-Book/?$ https://smru.edu.in/handbook/ [L,R=301,NC]
# Serve the real 404 page
ErrorDocument 404 /404.html
```

Add the 6.3 consolidation redirects in the same style once the target pages exist (one rule per retired page; never redirect everything to the homepage).

For smru.in (separate host): `RewriteCond %{HTTP_HOST} ^(www\.)?smru\.in$ [NC]` → `RewriteRule ^(.*)$ https://smru.edu.in/$1 [L,R=301]` after the certificate is renewed.

## Appendix C — Title and description formulas

- Brand suffix everywhere: ` | St. Mary's University` (24 chars). Budget for the primary part: **≤ 40 chars** so the whole title stays ≤ 65. If the primary part would be cut, drop words from the *end* of a phrase ("Guide", "in Hyderabad", "2026") rather than cutting mid-phrase, and never emit a title ending in a preposition or conjunction.
- Homepage: `St. Mary's University Hyderabad (SMRU) – Official Site`
- Facts page `/smru/`: `SMRU – St. Mary's Rehabilitation University, Hyderabad`
- School: `School of {X} – Courses & Fees | St. Mary's University` (abbreviate long school names: "Health & Allied Health Sciences" → "Allied Health Sciences")
- Programme (target ≤ 65): `{Course} in Hyderabad: Fees, Eligibility 2026 | St. Mary's University` — where the course name is long, use the short form ("B.Sc. Nursing", "BPT", "BA LLB (Hons)") and drop "in Hyderabad" before dropping "Fees".
- Comparison guide: `{A} vs {B}: Which to Choose in 2026 | St. Mary's University`
- Descriptions: 120–155 chars, lead with the fact a searcher wants (fee, duration, eligibility, approval), one call to action, the words "St. Mary's University (SMRU), Hyderabad" once.
- Meta keywords: remove the tag entirely (no engine uses it; the misspelling lists are a liability).

## Appendix D — Naming standard (copy into brand guidelines, GBP, listings, partner briefs)

| Context | Use |
|---|---|
| First mention on any page or document | St. Mary's University (SMRU) |
| Subsequent mentions | St. Mary's University *or* SMRU |
| Legal / statutory / footer / schema `legalName` | St. Mary's Rehabilitation University |
| Bridge sentence (verbatim) | St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation University, a UGC-recognised private university in Hyderabad, Telangana, established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026. |
| Never | "St.Mary's" (no space) in visible text or titles; "St.Marys"; "St. Mary's University powered by {partner}" as an institution name |
| Location string | Deshmukhi, near Ramoji Film City, Hyderabad, Telangana 508284 |

---

*Sources consulted: Google search API results (US vantage) and Bing (India) on 13 Sep 2026; smru.edu.in live crawl; repo files listed in Section 1; Telangana Ordinance No. 2 of 2025 (PRS India); Collegedunia, Careers360, Shiksha, Newton School, Wikipedia, stmarysgroup.com, smru.in.*
