# Course SEO Batch 04: School of Nursing

## Batch Summary

Source inspected first: `src/data/official-courses.ts`. Stable order follows the official file order after partner/duplicate variants are grouped by the existing `src/data/schools.ts` canonical merge rules.

| Metric | Value |
|---|---:|
| Official rows represented | 2 |
| Canonical SEO course pages | 2 |
| Grouped partner/variant pages | 0 |
| Thin pages needing full content | 2 |

Do not create duplicate SEO pages for grouped variants. Keep variant terms as backend/search-intent notes or partner callouts on the canonical page unless a separate partner URL has independent admission value.

## Technical Connection

Later implementation should connect this documentation exactly to:

| Area | File or component |
|---|---|
| Title/meta/H1 logic | `src/lib/shared/dynamic-route-metadata.ts` |
| Search-term expansion | `src/lib/seo/search-intent.ts` |
| Course/WebPage/FAQ schema | `src/lib/seo/schema.ts` |
| Course data | `src/data/schools.ts` and `src/data/official-courses.ts` |
| URL discovery | `app/sitemap.ts` and `src/lib/seo/sitemap.ts` |
| On-page content | course page components for FAQs, internal links, and copy blocks |

## Route And Data Checklist

| Order | Course | schoolSlug | departmentSlug | course slug | Route path | Route status | Partner/variant keyword notes | Content status | Implementation Priority |
|---:|---|---|---|---|---|---|---|---|---|
| 52 | B.Sc. Nursing | `nursing-sciences` | `nursing` | `bsc-nursing` | `/schools/nursing-sciences/nursing/bsc-nursing` | Route generated | None | Content depth required: Full landing page | P0 |
| 53 | M.Sc. Nursing | `nursing-sciences` | `nursing` | `msc-nursing` | `/schools/nursing-sciences/nursing/msc-nursing` | Route generated | None | Content depth required: Full landing page | P0 |

## Source-Fact Verification

Use source values only. Where the source files do not provide a field, keep `VERIFY WITH UNIVERSITY` in copy briefs and implementation tickets.

| Course | Duration | Eligibility | Fees | Intake | Approval or council recognition | Salary | Placement |
|---|---|---|---|---|---|---|---|
| B.Sc. Nursing | 4 Years (8 Semesters) | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY |
| M.Sc. Nursing | 2 Years (4 Semesters) | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY | VERIFY WITH UNIVERSITY |

## SEO And Copy Guidance

Visible H1/H2 copy should prioritize Hyderabad, Telangana, and India intent. North India, regional India, NRI, and international phrases are support terms only. Typo terms stay backend-only.

| Course | Priority keywords | Support keywords | Course-specific copy angle | Backend/search-intent notes |
|---|---|---|---|---|
| B.Sc. Nursing | B.Sc. Nursing course in Hyderabad; B.Sc. Nursing admission 2026; nursing college in Telangana; B.Sc. Nursing eligibility and fees India | nursing courses after 12th India; B.Sc. Nursing Telangana admissions; B.Sc. Nursing for North India students; B.Sc. Nursing for Andhra Pradesh and South India students; B.Sc. Nursing NRI/international admission information, VERIFY WITH UNIVERSITY | Build a course-specific landing page around nursing, patient care, clinical practice, admissions intent, curriculum depth, and Hyderabad/Telangana student decision factors. | Typo intent backend only: b sc nursng. Voice: draft voice-search pattern, native review recommended: B.Sc. Nursing course Hyderabad lo details; B.Sc. Nursing admission Hyderabad mein kya eligibility hai. |
| M.Sc. Nursing | M.Sc. Nursing course in Hyderabad; M.Sc. Nursing admission 2026; nursing college in Telangana; M.Sc. Nursing eligibility and fees India | nursing courses after 12th India; M.Sc. Nursing Telangana admissions; M.Sc. Nursing for North India students; M.Sc. Nursing for Andhra Pradesh and South India students; M.Sc. Nursing NRI/international admission information, VERIFY WITH UNIVERSITY | Build a course-specific landing page around nursing, patient care, clinical practice, admissions intent, curriculum depth, and Hyderabad/Telangana student decision factors. | Typo intent backend only: m sc nursng. Voice: draft voice-search pattern, native review recommended: M.Sc. Nursing course Hyderabad lo details; M.Sc. Nursing admission Hyderabad mein kya eligibility hai. |

## Seven Keyword Categories By Program

Each program below has seven keyword buckets. Visible copy should use categories 1-5 naturally. Category 6 is for partner/variant control. Category 7 is support/search-intent only and must not become visible H1/H2 spam.

| Course | Keyword category | Keyword set | Usage rule |
|---|---|---|---|
| B.Sc. Nursing | 1. Local Hyderabad/Telangana | B.Sc. Nursing course in Hyderabad; nursing college in Hyderabad; B.Sc. Nursing admissions Telangana | Visible title/meta/H1/H2 candidate; keep natural and course-specific. |
| B.Sc. Nursing | 2. India/National | B.Sc. Nursing course in India; nursing courses after 12th India; B.Sc. Nursing university program India | Use in meta keywords, body copy, schema keywords, and national comparison FAQs. |
| B.Sc. Nursing | 3. Admissions/Eligibility/Fees | B.Sc. Nursing admission 2026; B.Sc. Nursing eligibility; B.Sc. Nursing fees; B.Sc. Nursing duration | Commercial-intent cluster. Missing facts must remain VERIFY WITH UNIVERSITY. |
| B.Sc. Nursing | 4. Curriculum/Syllabus/Labs | B.Sc. Nursing syllabus; B.Sc. Nursing curriculum; nursing practical training; nursing labs | Use for syllabus sections, lab/practical blocks, and FAQ prompts after content is verified. |
| B.Sc. Nursing | 5. Career/Placement/Salary | B.Sc. Nursing career opportunities; nursing jobs after graduation; B.Sc. Nursing placement support; B.Sc. Nursing salary | Use cautiously. Salary, placement outcomes, and employer claims require VERIFY WITH UNIVERSITY. |
| B.Sc. Nursing | 6. Partner/Variant/Comparison | no partner variant expansion needed | Backend/search-intent and internal-link notes. Avoid duplicate SEO pages for grouped variants. |
| B.Sc. Nursing | 7. Regional/NRI/Voice/Typo | B.Sc. Nursing for North India students; B.Sc. Nursing for Andhra Pradesh and South India students; B.Sc. Nursing NRI/international admission information, VERIFY WITH UNIVERSITY; typo intent backend only; draft voice-search pattern, native review recommended | Support reach only. Do not use typo keywords in visible H1/H2 copy or promise NRI/international eligibility. |
| M.Sc. Nursing | 1. Local Hyderabad/Telangana | M.Sc. Nursing course in Hyderabad; nursing college in Hyderabad; M.Sc. Nursing admissions Telangana | Visible title/meta/H1/H2 candidate; keep natural and course-specific. |
| M.Sc. Nursing | 2. India/National | M.Sc. Nursing course in India; nursing courses after 12th India; M.Sc. Nursing university program India | Use in meta keywords, body copy, schema keywords, and national comparison FAQs. |
| M.Sc. Nursing | 3. Admissions/Eligibility/Fees | M.Sc. Nursing admission 2026; M.Sc. Nursing eligibility; M.Sc. Nursing fees; M.Sc. Nursing duration | Commercial-intent cluster. Missing facts must remain VERIFY WITH UNIVERSITY. |
| M.Sc. Nursing | 4. Curriculum/Syllabus/Labs | M.Sc. Nursing syllabus; M.Sc. Nursing curriculum; nursing practical training; nursing labs | Use for syllabus sections, lab/practical blocks, and FAQ prompts after content is verified. |
| M.Sc. Nursing | 5. Career/Placement/Salary | M.Sc. Nursing career opportunities; nursing jobs after graduation; M.Sc. Nursing placement support; M.Sc. Nursing salary | Use cautiously. Salary, placement outcomes, and employer claims require VERIFY WITH UNIVERSITY. |
| M.Sc. Nursing | 6. Partner/Variant/Comparison | no partner variant expansion needed | Backend/search-intent and internal-link notes. Avoid duplicate SEO pages for grouped variants. |
| M.Sc. Nursing | 7. Regional/NRI/Voice/Typo | M.Sc. Nursing for North India students; M.Sc. Nursing for Andhra Pradesh and South India students; M.Sc. Nursing NRI/international admission information, VERIFY WITH UNIVERSITY; typo intent backend only; draft voice-search pattern, native review recommended | Support reach only. Do not use typo keywords in visible H1/H2 copy or promise NRI/international eligibility. |

## SEO Authority Upgrade End-To-End

Use this section as the high-level execution layer after keyword mapping. The goal is to turn each generated route into a source-verified authority page, not only a keyword page.

### Content Authority Proof Matrix

| Course | Authority score | Current proof status | New proof blocks to add | Missing facts to verify |
|---|---|---|---|---|
| B.Sc. Nursing | 0 - thin/full landing page required | eligibility proof needed; fee proof needed; approval/council proof needed; placement proof needed | Labs/practical exposure, faculty, curriculum, internships, outcomes for nursing | eligibility, fees, intake, approval, salary, placement |
| M.Sc. Nursing | 0 - thin/full landing page required | eligibility proof needed; fee proof needed; approval/council proof needed; placement proof needed | Labs/practical exposure, faculty, curriculum, internships, outcomes for nursing | eligibility, fees, intake, approval, salary, placement |

### Unique FAQ Bank

| Course | FAQ prompts to write | Answer rule |
|---|---|---|
| B.Sc. Nursing | What is B.Sc. Nursing at St.Mary's University Hyderabad? / What is the eligibility for B.Sc. Nursing? / What are the B.Sc. Nursing fees and duration? / What does the B.Sc. Nursing syllabus cover? / What practical training is available for nursing? / What are career options after B.Sc. Nursing? / Can students from other Indian states apply for B.Sc. Nursing? / Is NRI/international admission information available for B.Sc. Nursing? | Use only source-verified answers; eligibility, fees, approval, salary, placement: VERIFY WITH UNIVERSITY if absent. |
| M.Sc. Nursing | What is M.Sc. Nursing at St.Mary's University Hyderabad? / What is the eligibility for M.Sc. Nursing? / What are the M.Sc. Nursing fees and duration? / What does the M.Sc. Nursing syllabus cover? / What practical training is available for nursing? / What are career options after M.Sc. Nursing? / Can students from other Indian states apply for M.Sc. Nursing? / Is NRI/international admission information available for M.Sc. Nursing? | Use only source-verified answers; eligibility, fees, approval, salary, placement: VERIFY WITH UNIVERSITY if absent. |

### Schema Readiness

| Course | Schema targets | Required fields | Conditional fields | Blockers |
|---|---|---|---|---|
| B.Sc. Nursing | Course + WebPage + FAQPage | name, provider, description, url, educationalLevel, timeToComplete/duration | offers/price, coursePrerequisites/eligibility, FAQPage, ItemList related courses | price/fees, eligibility, approval/council recognition VERIFY WITH UNIVERSITY |
| M.Sc. Nursing | Course + WebPage + FAQPage | name, provider, description, url, educationalLevel, timeToComplete/duration | offers/price, coursePrerequisites/eligibility, FAQPage, ItemList related courses | price/fees, eligibility, approval/council recognition VERIFY WITH UNIVERSITY |

### Internal Link Mesh

| Course | Canonical URL | Required hub links | Related course links | Implementation note |
|---|---|---|---|---|
| B.Sc. Nursing | `/schools/nursing-sciences/nursing/bsc-nursing` | `/schools/nursing-sciences`, `/schools/nursing-sciences/nursing`, `/admissions`, `/contact` | M.Sc. Nursing | Add breadcrumb, related-course cards, admissions CTA, and school-level link block. |
| M.Sc. Nursing | `/schools/nursing-sciences/nursing/msc-nursing` | `/schools/nursing-sciences`, `/schools/nursing-sciences/nursing`, `/admissions`, `/contact` | B.Sc. Nursing | Add breadcrumb, related-course cards, admissions CTA, and school-level link block. |

### Local, Regional, NRI Authority Blocks

| Course | Local block | Regional support block | NRI/international safety block |
|---|---|---|---|
| B.Sc. Nursing | Hyderabad/Telangana demand for nursing; campus/practical learning context; regional student support | Andhra Pradesh, South India, North India reach terms only as support copy | NRI/international information only; no eligibility promise until verified |
| M.Sc. Nursing | Hyderabad/Telangana demand for nursing; campus/practical learning context; regional student support | Andhra Pradesh, South India, North India reach terms only as support copy | NRI/international information only; no eligibility promise until verified |

### Multilingual, Voice, And Rich Results QA

| Course | Structured data QA | Indexing QA | Duplicate/canonical QA | Voice-search QA |
|---|---|---|---|---|
| B.Sc. Nursing | Rich Results Test for Course/WebPage/FAQ JSON-LD | URL Inspection after deployment | Check canonical route, sitemap inclusion, no duplicate partner URL competing | Native review for Telugu/Hindi/other voice phrases before use |
| M.Sc. Nursing | Rich Results Test for Course/WebPage/FAQ JSON-LD | URL Inspection after deployment | Check canonical route, sitemap inclusion, no duplicate partner URL competing | Native review for Telugu/Hindi/other voice phrases before use |

### End-To-End Launch Checklist

| Step | Owner | Status |
|---|---|---|
| Confirm canonical route and grouped partner variants | Developer + SEO | TODO |
| Fill missing source facts from university-approved documents | University + SEO | TODO |
| Write unique course copy, not reused paragraph blocks | Copywriter | TODO |
| Add FAQ content and only then enable FAQ schema | Copywriter + Developer | TODO |
| Add Course/WebPage schema with verified fields only | Developer | TODO |
| Add internal links to school, department, admissions, contact, and related courses | Developer + SEO | TODO |
| Confirm sitemap discovery in `app/sitemap.ts` and `src/lib/seo/sitemap.ts` | Developer | TODO |
| Validate page in Rich Results Test and Google Search Console URL Inspection | SEO | TODO |
| Native-review Telugu/Hindi/regional voice phrases before publishing visibly | SEO + Native reviewer | TODO |

## Batch TODO Checklist

| Check | Status |
|---|---|
| Confirm route paths against generated params before implementation | TODO |
| Fill all `VERIFY WITH UNIVERSITY` fields from official university source | TODO |
| Write non-duplicated H1/title/meta for each canonical route | TODO |
| Add grouped partner/variant notes without creating competing course pages | TODO |
| Add Course/WebPage/FAQ schema only after facts are verified | TODO |
| Add internal links to school, department, admissions, contact, and related courses | TODO |
| Review multilingual voice-search drafts with native speaker before use | TODO |
