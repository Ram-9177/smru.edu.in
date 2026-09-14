# SEO / AEO / GEO - University Input Tracker

This document tracks all facts, approvals, fee structures, intake figures, faculty details, hospital partners, and regulatory documentation requiring verification and input from the university administration.

| Item | Page(s) | Why needed | Who can answer |
|---|---|---|---|
| Aggregator profile URLs for Organization `sameAs` (Shiksha listing 246974, Collegedunia, Careers360) | Organization JSON-LD (all pages) | Brief §Phase 1 asks for profile URLs in `sameAs`; none are recorded in the repo and must not be guessed | Admissions / marketing |
| Google Business Profile URL (and whether a GBP exists) | Organization JSON-LD, `/smru/` | `sameAs` currently uses a Maps search URL, not the GBP listing | Marketing |
| Wikidata item QID | Organization JSON-LD | Add to `sameAs` once the item is created (Phase 7 playbook) | Whoever creates the Wikidata item |
| Ordinance No. 2 of 2025 PDF | `/smru/`, `/approvals-recognitions/` | Only the Act (No. 10 of 2026) and UGC 2(f) letter PDFs are in `/assets/`; the Ordinance is cited from the brief, not linked | Registrar |
| Square favicon / app-icon mark (512×512 source) | All pages (`app/layout.tsx` icons) | The only logo source is a 1024×547 wide image; the generated 32/180/512 px icons are letterboxed | Marketing / design |
| Per-programme fees (annual INR, total INR, indicative USD) — all 71 programmes | Every programme page, Course `offers` schema, `/programmes/` table | No public fee table exists; Collegedunia already publishes figures Google ranks. Fill `src/data/programme-fees.ts`. Fee gaps: 71/71 | Registrar / Finance |
| Programme eligibility for 45 programmes | Programme pages, Course `coursePrerequisites` | 45 of 71 programmes are `{slug,name,level}` stubs with no eligibility/overview; see `docs/seo/course-coverage.csv` | Academic office |
| Answer-first paragraph (40–70 words) for ~57 programmes | Programme pages (answer-first lead) | Stub programmes render a short generic lead; the strong direct-answer exists only for the 14 health-allied courses with SEO profiles | Academic office |
| Per-programme council approval (RCI/INC/NCAHP/BCI/PCI) statements | Course `occupationalCredentialAwarded`, programme pages | Only university-level UGC 2(f) is asserted; programme-level council approval must not be claimed without proof | Registrar |
