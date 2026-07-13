# Target School SEO Execution: Health & Allied Health Sciences

## Execution Summary

Target school: `health-allied-health-sciences`.

Source order was created from `src/data/official-courses.ts`, then grouped by existing canonical route behavior in `src/data/schools.ts`. This execution file covers 27 official rows as 21 canonical course pages.

| Metric | Value |
|---|---:|
| Official rows represented | 27 |
| Canonical course pages to execute | 21 |
| Grouped partner/variant pages | 6 |
| P0 pages | 9 |
| P1 pages | 9 |
| P2 pages | 3 |
| Thin pages needing full landing page | 10 |

Do not create separate SEO pages for grouped variants unless a separate URL and partner-specific admission value is approved. Use grouped variants as partner/variant keyword notes on the canonical page.

## Technical Connection

| Need | Later implementation location |
|---|---|
| Title/meta/H1 logic | `src/lib/shared/dynamic-route-metadata.ts` |
| Search-term expansion | `src/lib/seo/search-intent.ts` |
| Course/WebPage/FAQ schema | `src/lib/seo/schema.ts` |
| Course source data | `src/data/schools.ts` and `src/data/official-courses.ts` |
| URL discovery | `app/sitemap.ts` and `src/lib/seo/sitemap.ts` |
| On-page copy, FAQs, internal links | course page components |

## Execution Order

| Wave | Courses | Reason |
|---|---|---|
| Wave 1 | BPT, BOT, Medical Lab Technology, Anesthesia & OT Technology, Cardiovascular Technology, Emergency Medical Technology, Optometry, Radiotherapy Technology, Forensic Science | P0, high admission/search intent, existing partial depth, partner/variant control needed |
| Wave 2 | MPT, MOT, Diploma AOTT, Nutrition and Dietetics, Diploma Radiotherapy, Physician Assistant, Dialysis, Respiratory Technology | P1, either PG or thin allied-health page needing full build |
| Wave 3 | Ph.D. Physiotherapy, Ph.D. Physiotherapy Neurology, Ph.D. Occupational Therapy | P2, research pages need university-confirmed research/admission inputs |

## Canonical Course Execution Table

| Priority | Course | Canonical route | Partner/variant handling | Fact blockers |
|---|---|---|---|---|
| P0 | BPT | `/schools/health-allied-health-sciences/physiotherapy/bpt` | Group `bpt` + `bpt-emversity`; no duplicate partner SEO page | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | MPT | `/schools/health-allied-health-sciences/physiotherapy/mpt` | None | intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P2 | Ph.D. Physiotherapy | `/schools/health-allied-health-sciences/physiotherapy/phd-physiotherapy` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P2 | Ph.D. Physiotherapy Neurology | `/schools/health-allied-health-sciences/physiotherapy/phd-physiotherapy-neurology` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | BOT | `/schools/health-allied-health-sciences/occupational-therapy/bot` | Group `bot` + `bot-emversity`; no duplicate partner SEO page | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | MOT | `/schools/health-allied-health-sciences/occupational-therapy/mot` | None | intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P2 | Ph.D. Occupational Therapy | `/schools/health-allied-health-sciences/occupational-therapy/phd-occupational-therapy` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Medical Lab Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bmlt` | Group `bmlt` + `bmls`; no duplicate partner SEO page | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Anesthesia & OT Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bsc-anaesthesia-ot` | Group `bsc-anaesthesia-ot` + `baott`; no duplicate partner SEO page | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Cardiovascular Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bcvt` | EMVERSITY partner note only | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Emergency Medical Technology | `/schools/health-allied-health-sciences/allied-health-sciences/betcms` | Group `betcms` + `bemt`; no duplicate partner SEO page | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Optometry | `/schools/health-allied-health-sciences/allied-health-sciences/b-optometry` | EMVERSITY partner note only | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Radiotherapy Technology | `/schools/health-allied-health-sciences/allied-health-sciences/brt` | Group `brt` + `brtt`; no duplicate partner SEO page | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P0 | Forensic Science | `/schools/health-allied-health-sciences/allied-health-sciences/bsc-forensic-science` | EDIN partner note only | intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Diploma in Anaesthesia and Operation Theatre Technology | `/schools/health-allied-health-sciences/allied-health-sciences/diploma-anaesthesia-operation-theatre-technology` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Bachelor of Nutrition and Dietetics (Hons) | `/schools/health-allied-health-sciences/allied-health-sciences/bachelor-nutrition-dietetics-hons` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Diploma of Radiotherapy Technology | `/schools/health-allied-health-sciences/allied-health-sciences/diploma-radiotherapy-technology` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Bachelor of Physician Assistant | `/schools/health-allied-health-sciences/allied-health-sciences/bpa` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Diploma of Dialysis Technology | `/schools/health-allied-health-sciences/allied-health-sciences/diploma-dialysis-technology` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Bachelor of Dialysis Therapy Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bdtt` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| P1 | Bachelor of Respiratory Technology | `/schools/health-allied-health-sciences/allied-health-sciences/brt-respiratory` | None | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |

## Page Build Checklist

Use this for every course page before moving to the next course.

| Block | Required output | Rule |
|---|---|---|
| Metadata | Title, meta description, canonical URL, H1 | Hyderabad/Telangana and India terms first; no keyword stuffing |
| Hero copy | 80-120 word course-specific intro | Must not reuse the same paragraph across courses |
| Facts | Duration, eligibility, fees, intake, approval/council, salary, placement | Use source values only; otherwise `VERIFY WITH UNIVERSITY` |
| Curriculum | Syllabus themes, labs/practical learning, internship/clinical exposure | Do not invent labs, hospital tie-ups, or outcomes |
| Careers | Role pathways and sector fit | Salary and placement outcomes require university verification |
| Partner note | Partner/variant explanation when applicable | Keep on canonical page; no competing duplicate SEO page |
| Local block | Hyderabad/Telangana relevance | Include local context naturally |
| Regional/NRI block | North India, Andhra Pradesh/South India, NRI/international info | Support copy only; no admission eligibility promise |
| FAQ | 6-8 unique FAQs | Enable FAQ schema only after answers are visible and verified |
| Internal links | School, department, admissions, contact, related courses | Add related courses in same department first |
| Schema | Course, WebPage, FAQPage | Include only verified facts |

## Course-Level Copy Angles

| Course | Primary angle | Supporting proof to collect |
|---|---|---|
| BPT | Physiotherapy degree page focused on rehabilitation, movement science, clinical practice, and Hyderabad/Telangana admissions | clinical exposure, internship structure, approval/council status, placement support |
| MPT | PG physiotherapy page focused on specialization, advanced clinical practice, and research readiness | specialization tracks, faculty, clinical/research facilities |
| Ph.D. Physiotherapy | Doctoral page focused on research areas, supervisors, entrance process, and facilities | Ph.D. regulations, guide availability, research labs |
| Ph.D. Physiotherapy Neurology | Research page focused on neuro-physiotherapy themes | supervisor expertise, research scope, admissions process |
| BOT | Occupational therapy page focused on functional independence, assistive living, and clinical rehabilitation | labs, assistive technology exposure, internship structure |
| MOT | PG occupational therapy page focused on advanced clinical and rehabilitation practice | specialization areas, clinical exposure, research methods |
| Ph.D. Occupational Therapy | Doctoral page focused on occupational therapy research | guide list, research areas, admission criteria |
| Medical Lab Technology | Diagnostics-focused page covering lab science, pathology, and clinical testing | lab facilities, practical training, internship/clinical posting details |
| Anesthesia & OT Technology | OT and perioperative care page focused on operation theatre readiness | simulation/lab exposure, OT protocols, clinical posting details |
| Cardiovascular Technology | Cardiac diagnostics and cath-lab support page | equipment exposure, clinical departments, internship details |
| Emergency Medical Technology | Emergency, trauma, and critical-response page | simulation training, emergency protocols, hospital exposure |
| Optometry | Vision science and eye-care page | optometry lab, clinical screening, internship details |
| Radiotherapy Technology | Oncology treatment support and radiotherapy technology page | radiotherapy lab/clinical exposure, safety protocols |
| Forensic Science | Forensic lab, evidence, crime-scene methods, and legal-science page | lab setup, forensic modules, practical investigation exposure |
| Diploma AOTT | Technician-readiness page for anaesthesia and operation theatre support | eligibility, fees, lab/practical hours |
| Nutrition and Dietetics | Clinical nutrition, diet planning, and wellness science page | labs, hospital/community exposure, career pathways |
| Diploma Radiotherapy | Technician-readiness page for radiotherapy support | eligibility, fees, clinical exposure |
| Physician Assistant | Clinical care coordination and physician-assistant practice page | scope, clinical posting, role clarity |
| Diploma Dialysis | Dialysis technician-readiness page | eligibility, fees, dialysis lab/clinical exposure |
| Dialysis Therapy Technology | Renal care and dialysis therapy degree page | practical exposure, equipment, internship details |
| Respiratory Technology | Pulmonary care, ICU support, and respiratory technology page | respiratory labs, ICU exposure, clinical training |

## Team Tickets

| Team | Ticket | Applies to |
|---|---|---|
| University | Provide verified missing facts: eligibility, fees, intake, approval/council, salary, placement | All 21 courses |
| SEO | Finalize title/meta/H1 and seven-category keyword mapping | All 21 courses |
| Copywriting | Draft unique landing copy and FAQs from course-level angles | All 21 courses |
| Development | Add/verify data in `src/data/schools.ts` without changing canonical slugs | All 21 courses |
| Development | Wire metadata/search/schema only with verified facts | All 21 courses |
| SEO + Development | Validate sitemap, canonical URLs, Rich Results Test, URL Inspection | All launched pages |
| Native reviewer | Review Telugu/Hindi/regional voice phrases before visible publication | Any multilingual copy |

## Acceptance Criteria

| Check | Pass condition |
|---|---|
| Source order preserved | Routes follow canonical order from `src/data/official-courses.ts` after grouping |
| No duplicate SEO pages | Partner variants remain notes unless separate approved URL/admission value exists |
| Facts verified | Missing facts are still `VERIFY WITH UNIVERSITY` |
| Copy unique | Each course has specific angle, FAQ, and curriculum/career focus |
| Local priority | Hyderabad/Telangana and India terms appear before broader regional/NRI support |
| Schema safe | Schema uses only visible, verified page facts |
| QA complete | Sitemap, canonical, Rich Results Test, and URL Inspection are checked |

## Target School TODO Checklist

| Task | Status |
|---|---|
| Confirm Health & Allied Health Sciences as first production target | TODO |
| Collect university-approved missing facts for all 21 canonical pages | TODO |
| Execute Wave 1 P0 content briefs | TODO |
| Implement Wave 1 data/copy/schema safely | TODO |
| QA Wave 1 routes, sitemap, canonical, schema, and indexing | TODO |
| Execute Wave 2 P1 pages | TODO |
| Execute Wave 3 Ph.D. pages after research inputs are verified | TODO |
| Only after this school is complete, move to next school batch | TODO |
