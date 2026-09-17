# Off-site playbook — SMRU (humans execute)

Everything on smru.edu.in is now consistent (Phases 1–6). The remaining barrier is **off-site**:
Google still associates "St. Mary's University" with other institutions because nobody outside
smru.edu.in used the standard name. This playbook is ready-to-send copy — paste it, don't rewrite it.
Keep every listing byte-identical so engines reconcile all of them to one entity.

## The standard copy block (paste verbatim everywhere)

- **Name:** St. Mary's University (SMRU), Hyderabad
- **Legal name:** St. Mary's Rehabilitation University
- **Short name:** SMRU
- **Bridge sentence:** *St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation
  University, a UGC-recognised private university in Hyderabad, Telangana, established under
  Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026.*
- **Sponsor body:** Joseph Sriharsha & Mary Indraja Educational Society
- **Campus:** Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, near Ramoji Film
  City, Hyderabad, Telangana 508284, India
- **Established:** Ordinance No. 2 of 2025 (24 July 2025); Act No. 10 of 2026 · **UGC:** Section 2(f)
- **Website:** https://smru.edu.in · **Apply:** https://apply.smru.edu.in
- **Schools (6):** Rehabilitation Sciences · Health & Allied Health Sciences · Psychology · Nursing ·
  Engineering & Emerging Technologies · Law · **Programmes:** 71 (https://smru.edu.in/programmes/)
- **Email:** reach@smru.edu.in · **Admissions:** +91-7331119432
- **Not to be confused with:** St. Mary's College Hyderabad; St. Mary's Group of Institutions;
  St. Mary's University in Texas / Twickenham / Halifax / Calgary.

---

## 1. Google Business Profile (highest impact)

- **Name:** GBP requires the name on campus signage. If the board reads "St. Mary's Rehabilitation
  University", use that; otherwise "St. Mary's University". Do **not** append "(SMRU)" or a tagline —
  Google suspends stuffed names.
- **Primary category:** University. **Additional:** College, Nursing school, Physiotherapy school as
  relevant.
- **Description:** the bridge sentence, then one line per school and the programme count.
- **Website:** https://smru.edu.in · **Appointment URL:** https://apply.smru.edu.in
- **Services:** add each of the 6 schools.
- **Photos checklist:** campus entrance/signage, each school building, labs/clinics, hostel, library,
  a convocation/event, exterior with the board showing the legal name.
- **Review request template (SMS/WhatsApp to students & parents):**
  > "Thank you for choosing St. Mary's University (SMRU), Hyderabad. If your experience has been
  > good, a short Google review helps other students find us: [GBP review link]. Please mention your
  > school/course. Thank you!"
- **Second profile:** if the LB Nagar corporate/admissions office takes walk-ins, add it as a
  separate "admissions office" location, not a duplicate university.

## 2. Aggregator corrections (generate the "top colleges" list eligibility)

You cannot appear in "Top BPT colleges in Hyderabad" lists until your listing carries that course.
For each, claim the profile and paste the standard block + the full 71-programme list
(from https://smru.edu.in/programmes/).

- **Shiksha** — claim listing **246974** ("St. Mary's Rehabilitation University"). **Request a merge**
  of the duplicate listings "…powered by Emversity" (246322) and "St. Mary's University Powered by
  NIAT" into 246974. Split listings split reviews and Q&A.
- **Collegedunia** — fix: establishment year → 2025 (Ordinance) / 2026 (Act), **not** 2025-only or
  2025 "over 47 courses"; course count → 71; **remove courses SMRU does not offer** (verify the
  listed M.Tech / PhD and any MBA/Pharmacy); **remove the published fee figures** unless they match
  an official SMRU figure; load all 71 programmes.
- **Careers360, CollegeDekho, GetMyUni, CollegeBatch, Justdial** — claim, align to the standard name,
  load the 71 programmes, remove any fee/placement figure not on the official site.

## 3. Wikidata item (draft statements)

Create an item "St. Mary's University (SMRU)". Statements:

- instance of (P31): private university (Q902104)
- official name (P1448): St. Mary's Rehabilitation University
- short name (P1813): SMRU
- inception (P571): 24 July 2025 (Ordinance No. 2 of 2025)
- official website (P856): https://smru.edu.in
- country (P17): India · located in the administrative territorial entity (P131): Telangana /
  Yadadri Bhuvanagiri
- coordinates (P625): 17.3484, 78.6824
- parent organization (P749): Joseph Sriharsha & Mary Indraja Educational Society

Cite the Telangana Ordinance No. 2 of 2025, Act No. 10 of 2026, and the UGC 2(f) letter (PDFs in
/assets/). Add the Wikidata QID to the Organization `sameAs` once created (logged in needs-input.md).

## 4. Wikipedia (sourced rows — no standalone article yet)

- Add a sourced row to **List of educational institutions in Telangana** and the private-universities
  list, citing the Ordinance, Act and UGC letter. (A standalone article needs sustained independent
  coverage — collect press first; see §7.)

## 5. Link requests (template)

> Subject: Link to St. Mary's University (SMRU), Hyderabad
>
> Could you add/update a link to **St. Mary's University (SMRU)** — https://smru.edu.in — with the
> anchor text **"St. Mary's University (SMRU)"** (not "St. Mary's University powered by [partner]")?
> Suggested text: *"St. Mary's University (SMRU) is the public name of St. Mary's Rehabilitation
> University, a UGC-recognised private university in Hyderabad."* Thank you.

Send to: **stmarysgroup.com, smgoih.org, smichyderabad.org** (society/sister sites — "Our
Institutions" footer link) and every partner (Newton School/NST, Emversity, Carebridge, Intellipaat/
IST, NIAT, Edinbox/AIFSET, ByteXL, Veloces, Skilgen, Edridge, Mjollnir, OnnBikes, BlackBucks) — ask
each to change "St. Mary's University powered by {partner}" to "St. Mary's University (SMRU)".

## 6. smru.in (the second-site problem)

The short domain smru.in serves an expired certificate and is indexed as a competing copy.
1. Renew the SSL certificate.
2. 301 every smru.in path to the smru.edu.in equivalent (`RewriteRule ^(.*)$ https://smru.edu.in/$1`).
   It must be a short redirect, never a second site.

## 7. Regulator & press

- **Regulator listings** — confirm UGC, TGCHE, RCI, INC, NCAHP, BCI each show the legal name and
  https://smru.edu.in.
- **Press** — the launch coverage (fridaywall.com, prittleprattlenews.com and others) should link
  with the standard name; reuse the coverage as Wikipedia citations. Collect every article URL/date
  into a press log for the Wikidata/Wikipedia work.

## 8. Social & measurement

- **Social display names** → "St. Mary's University (SMRU), Hyderabad" on Facebook
  (facebook.com/SMRUniversity), Instagram/LinkedIn (smruhyderabad), YouTube (@SMRUniversity).
  Handles stay; only the display name changes.
- **Search Console (Google) + Bing Webmaster Tools** — verify both (the Google verification tag is
  already in `app/layout.tsx`); submit `https://smru.edu.in/sitemap.xml` (the index); request
  indexing for `/`, `/about/`, `/smru/`, `/programmes/`, `/international/`.
- **IndexNow** — enable on Bing so future changes are picked up fast (Bing already ranks SMRU #1–2
  for the brand).
- **Monthly routine** — run `docs/seo/ai-audit.md` (15 questions × 5 engines); export GSC clicks &
  positions for the brand/school/course query map; count aggregator "Top X colleges in Hyderabad"
  pages now listing SMRU. Trace every wrong AI answer to the on-site source to fix.

---

## Priority order

1. Google Business Profile (§1) + smru.in fix (§6) — the two that move the brand fastest.
2. Aggregator corrections (§2) — unlocks the "top colleges" lists.
3. Society/partner links (§5) + regulator/press (§7).
4. Wikidata + Wikipedia (§3, §4) — durable entity signal.
5. Social + Search Console/Bing/IndexNow + monthly audit (§8).
