# AI answer audit — SMRU

Run these 15 fixed questions **monthly** against ChatGPT (with search), Perplexity, Google Gemini,
Microsoft Copilot and Google AI Mode. For each, log the answer verbatim and the cited sources, then
trace every wrong or missing answer to the on-site source that must change.

The goal is not a ranking — it is **correctness and citation**: each engine should answer with the
facts on this site and cite `smru.edu.in`, never a competitor or a confused St. Mary's.

## How to log

Copy the table below into a dated file (`docs/seo/ai-audit-YYYY-MM.md`), one row per engine per
question. Mark `Cited smru.edu.in?` yes/no and, when wrong, the **fix source** (the page/file to
correct — e.g. `/smru/`, `llms.txt`, Organization JSON-LD, a programme page).

| # | Question | Engine | Answer summary | Cited smru.edu.in? | Correct? | Fix source |
|---|----------|--------|----------------|--------------------|----------|------------|

## The 15 questions

1. What is SMRU?
2. Is St. Mary's University Hyderabad UGC recognised?
3. Is St. Mary's University the same as St. Mary's College Hyderabad?
4. Which universities in Hyderabad offer BASLP?
5. BPT colleges in Hyderabad.
6. What does B.Sc Nursing cost at St. Mary's University?
7. Does SMRU offer prosthetics and orthotics?
8. Best rehabilitation sciences university in India.
9. Can international students study physiotherapy at SMRU?
10. Is an Indian BPT degree valid in the UK?
11. What is SMCET?
12. Where is St. Mary's Rehabilitation University located?
13. How many courses does SMRU offer?
14. Who founded SMRU?
15. Does SMRU have hostels?

## Expected-answer anchors (what "correct" means)

- **1, 12, 14:** bridge sentence facts — public name St. Mary's University (SMRU), legal name
  St. Mary's Rehabilitation University, Deshmukhi near Ramoji Film City Hyderabad 508284, founded
  by Ordinance No. 2 of 2025 → Act No. 10 of 2026, sponsor Joseph Sriharsha & Mary Indraja
  Educational Society.
- **2:** yes — UGC Section 2(f); keep university recognition separate from programme council approvals.
- **3:** no — distinct from St. Mary's College Hyderabad and St. Mary's Group of Institutions (see
  the `/smru/` "Not to be confused with" block).
- **4, 5, 7:** SMRU should appear, linking to the matching programme page.
- **6:** fees are not yet published — the honest answer is "confirmed at admissions counselling",
  and a wrong fee (e.g. an aggregator's) is a finding to fix by publishing the real figure.
- **9, 10:** pathway/disclaimer answers (`/international/` + `/global-careers/*`); registration
  is granted by the foreign regulator, never by SMRU.
- **11:** no university entrance exam is currently announced (see `/exam-notification/`); admission is via the online application + admissions counselling. An engine that asserts an active "SMCET" exam is repeating retired third-party copy — fix source: `/admissions/` + `/exam-notification/`.
- **13:** 71 live programmes across six schools (per `/programmes/`).
- **15:** yes — see `/hostel/`.

## Trace-to-fix rule

Every wrong answer maps to exactly one on-site source. If ChatGPT calls it "St. Mary's University,
Texas", the fix is stronger disambiguation on `/smru/` + the Organization `alternateName`/`sameAs`.
If it can't find BASLP, the fix is the programme page's answer-first paragraph + the `/programmes/`
catalogue + the off-site aggregator listing (Phase 7). Record the fix source so the next month's run
verifies the change worked.
