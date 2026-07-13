# Health & Allied Health Sciences Course SEO Briefs

## Source Basis

Stable course order comes from `src/data/official-courses.ts`, grouped by existing canonical behavior in `src/data/schools.ts`.

This file is the next execution layer after:

- `docs/course-seo-batches/02-health-allied-health-sciences.md`
- `docs/course-seo-execution/01-health-allied-health-sciences-execution.md`

Do not create duplicate SEO pages for grouped partner variants. Use partner/variant terms as notes on the canonical route unless a separate URL and partner-specific admission value is approved.

## Technical Connection

| Need | Later implementation location |
|---|---|
| Title/meta/H1 logic | `src/lib/shared/dynamic-route-metadata.ts` |
| Search-term expansion | `src/lib/seo/search-intent.ts` |
| Course/WebPage/FAQ schema | `src/lib/seo/schema.ts` |
| Course source data | `src/data/schools.ts` and `src/data/official-courses.ts` |
| URL discovery | `app/sitemap.ts` and `src/lib/seo/sitemap.ts` |
| FAQs, internal links, copy blocks | course page components |

## Shared Page Rules

| Rule | Requirement |
|---|---|
| Source facts | If eligibility, fees, intake, approval, salary, placement, or council recognition is absent, write `VERIFY WITH UNIVERSITY`. |
| Local SEO | Hyderabad/Telangana and India keywords are priority. |
| Regional reach | North India, Andhra Pradesh, South India, and NRI/international phrases are support copy only. |
| NRI/international | Do not promise admission eligibility. Use information/pathway language only. |
| Typo keywords | Backend/search-intent notes only, never visible H1/H2 copy. |
| Voice phrases | Mark as `draft voice-search pattern, native review recommended`. |
| Copy uniqueness | Each course must have its own angle, examples, FAQs, and proof blocks. |

## Wave 1 P0 Course Briefs

| Course | Canonical route | Draft title/meta/H1 direction | Course-specific copy angle | Fact blockers |
|---|---|---|---|---|
| BPT | `/schools/health-allied-health-sciences/physiotherapy/bpt` | Title/H1: BPT Admissions 2026 in Hyderabad. Meta: eligibility, duration, fees, clinical learning, physiotherapy careers. | Position as a physiotherapy degree focused on movement science, rehabilitation practice, clinical exposure, and Hyderabad/Telangana admissions. Include Emversity only as partner/variant note. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| BOT | `/schools/health-allied-health-sciences/occupational-therapy/bot` | Title/H1: BOT Admissions 2026 in Hyderabad. Meta: eligibility, duration, fees, OT curriculum, clinical rehabilitation. | Focus on occupational therapy for functional independence, assistive living, rehabilitation planning, and practical clinical learning. Include Emversity only as partner/variant note. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Medical Lab Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bmlt` | Title/H1: Medical Lab Technology Course in Hyderabad. Meta: diagnostics, eligibility, fees, lab training, career scope. | Build around clinical diagnostics, pathology, microbiology, lab quality, and hospital/diagnostic lab readiness. Group `bmlt` and `bmls` under one canonical page. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Anesthesia & OT Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bsc-anaesthesia-ot` | Title/H1: Anesthesia & OT Technology Course in Hyderabad. Meta: operation theatre training, eligibility, fees, duration, careers. | Focus on perioperative support, OT protocols, patient monitoring, sterilisation, and anaesthesia team readiness. Group `bsc-anaesthesia-ot` and `baott`. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Cardiovascular Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bcvt` | Title/H1: Cardiovascular Technology Course in Hyderabad. Meta: cardiac diagnostics, eligibility, fees, duration, career scope. | Build around cardiac diagnostics, cath-lab support, ECG/echo concepts, clinical departments, and cardiac-care readiness. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Emergency Medical Technology | `/schools/health-allied-health-sciences/allied-health-sciences/betcms` | Title/H1: Emergency Medical Technology Course in Hyderabad. Meta: trauma care, emergency response, eligibility, fees, careers. | Focus on emergency department readiness, trauma response, triage, critical care support, and simulation/practical learning. Group `betcms` and `bemt`. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Optometry | `/schools/health-allied-health-sciences/allied-health-sciences/b-optometry` | Title/H1: Optometry Course in Hyderabad. Meta: eye-care training, eligibility, fees, duration, career scope. | Focus on vision science, eye screening, optical practice, patient care, and clinical optometry training. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Radiotherapy Technology | `/schools/health-allied-health-sciences/allied-health-sciences/brt` | Title/H1: Radiotherapy Technology Course in Hyderabad. Meta: oncology support, eligibility, fees, duration, careers. | Build around radiotherapy treatment support, oncology workflow, patient safety, treatment planning basics, and clinical practice. Group `brt` and `brtt`. | approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Forensic Science | `/schools/health-allied-health-sciences/allied-health-sciences/bsc-forensic-science` | Title/H1: Forensic Science Course in Hyderabad. Meta: forensic labs, eligibility, fees, duration, crime-scene learning. | Focus on forensic evidence, crime-scene methods, laboratory investigation, legal-science relevance, and Hyderabad admissions. Include EDIN only as partner note. | intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |

## Wave 2 P1 Course Briefs

| Course | Canonical route | Draft title/meta/H1 direction | Course-specific copy angle | Fact blockers |
|---|---|---|---|---|
| MPT | `/schools/health-allied-health-sciences/physiotherapy/mpt` | Title/H1: MPT Admissions 2026 in Hyderabad. Meta: PG physiotherapy eligibility, fees, duration, advanced practice. | Focus on advanced physiotherapy practice, specialization readiness, clinical reasoning, rehabilitation planning, and research orientation. | intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| MOT | `/schools/health-allied-health-sciences/occupational-therapy/mot` | Title/H1: MOT Admissions 2026 in Hyderabad. Meta: PG occupational therapy, eligibility, fees, duration, clinical practice. | Build around advanced occupational therapy, assistive technology, rehabilitation outcomes, and specialist clinical practice. | intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Diploma in Anaesthesia and Operation Theatre Technology | `/schools/health-allied-health-sciences/allied-health-sciences/diploma-anaesthesia-operation-theatre-technology` | Title/H1: Diploma in Anaesthesia and OT Technology in Hyderabad. Meta: diploma eligibility, duration, fees, OT technician readiness. | Focus on technician-level OT support, anaesthesia assistance, sterilisation basics, patient movement, and perioperative workflow. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Bachelor of Nutrition and Dietetics (Hons) | `/schools/health-allied-health-sciences/allied-health-sciences/bachelor-nutrition-dietetics-hons` | Title/H1: Nutrition and Dietetics Course in Hyderabad. Meta: eligibility, fees, duration, clinical nutrition, careers. | Build around diet planning, clinical nutrition, wellness counselling, community nutrition, and healthcare support roles. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Diploma of Radiotherapy Technology | `/schools/health-allied-health-sciences/allied-health-sciences/diploma-radiotherapy-technology` | Title/H1: Diploma of Radiotherapy Technology in Hyderabad. Meta: eligibility, fees, duration, oncology support. | Focus on radiotherapy technician readiness, oncology department workflow, treatment-room safety, and patient support. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Bachelor of Physician Assistant | `/schools/health-allied-health-sciences/allied-health-sciences/bpa` | Title/H1: Physician Assistant Course in Hyderabad. Meta: eligibility, fees, duration, clinical care coordination. | Focus on physician-assistant practice, clinical coordination, patient documentation, care pathways, and hospital-team support. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Diploma of Dialysis Technology | `/schools/health-allied-health-sciences/allied-health-sciences/diploma-dialysis-technology` | Title/H1: Diploma of Dialysis Technology in Hyderabad. Meta: eligibility, fees, duration, renal care technician training. | Build around dialysis technician readiness, renal-care workflow, machine handling concepts, and patient monitoring support. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Bachelor of Dialysis Therapy Technology | `/schools/health-allied-health-sciences/allied-health-sciences/bdtt` | Title/H1: Dialysis Therapy Technology Course in Hyderabad. Meta: eligibility, fees, duration, renal-care careers. | Focus on degree-level renal care, dialysis therapy support, equipment exposure, patient safety, and clinical postings. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |
| Bachelor of Respiratory Technology | `/schools/health-allied-health-sciences/allied-health-sciences/brt-respiratory` | Title/H1: Respiratory Technology Course in Hyderabad. Meta: eligibility, fees, duration, pulmonary/ICU support careers. | Build around pulmonary care, respiratory support, ICU readiness, patient monitoring, and respiratory-technology practice. | eligibility, fees, intake, approval/council, salary, placement: VERIFY WITH UNIVERSITY |

## Wave 3 P2 Course Briefs

| Course | Canonical route | Draft title/meta/H1 direction | Course-specific copy angle | Fact blockers |
|---|---|---|---|---|
| Ph.D. Physiotherapy | `/schools/health-allied-health-sciences/physiotherapy/phd-physiotherapy` | Title/H1: Ph.D. Physiotherapy Admissions 2026 in Hyderabad. Meta: research areas, eligibility, duration, application process. | Research page focused on rehabilitation science, clinical physiotherapy research, supervisors, entrance process, and facilities. | eligibility, fees, intake, approval/council, salary, placement, research areas, supervisors: VERIFY WITH UNIVERSITY |
| Ph.D. Physiotherapy Neurology | `/schools/health-allied-health-sciences/physiotherapy/phd-physiotherapy-neurology` | Title/H1: Ph.D. Physiotherapy Neurology Admissions 2026 in Hyderabad. Meta: neuro-physiotherapy research, eligibility, duration. | Research page focused on neuro-rehabilitation, movement recovery, neurological physiotherapy, supervisor fit, and research methods. | eligibility, fees, intake, approval/council, salary, placement, research areas, supervisors: VERIFY WITH UNIVERSITY |
| Ph.D. Occupational Therapy | `/schools/health-allied-health-sciences/occupational-therapy/phd-occupational-therapy` | Title/H1: Ph.D. Occupational Therapy Admissions 2026 in Hyderabad. Meta: OT research, eligibility, duration, application process. | Research page focused on occupational therapy research, assistive living, rehabilitation outcomes, supervisors, and research facilities. | eligibility, fees, intake, approval/council, salary, placement, research areas, supervisors: VERIFY WITH UNIVERSITY |

## Required FAQ Pattern

Use course-specific wording. Do not copy/paste the same answer body across courses.

| FAQ type | Required question pattern | Answer rule |
|---|---|---|
| Course identity | What is `[course]` at St.Mary's University Hyderabad? | Explain the discipline and SMRU context. |
| Eligibility | What is the eligibility for `[course]`? | Use source value or `VERIFY WITH UNIVERSITY`. |
| Fees | What are the `[course]` fees? | Use source value or `VERIFY WITH UNIVERSITY`. |
| Duration | What is the duration of `[course]`? | Use source value from official course list/source data. |
| Syllabus | What does the `[course]` syllabus cover? | Mention only verified curriculum themes. |
| Practical training | What practical or clinical exposure is available? | Do not invent labs, hospital tie-ups, or equipment. |
| Career | What are career options after `[course]`? | Do not include salary/placement outcomes unless verified. |
| NRI/international | Is NRI/international admission information available? | Say information must be confirmed with university. Do not promise eligibility. |

## Internal Link Targets

| Course group | Required internal links |
|---|---|
| Physiotherapy | School page, Physiotherapy department, BPT, MPT, Ph.D. Physiotherapy, Admissions, Contact |
| Occupational Therapy | School page, Occupational Therapy department, BOT, MOT, Ph.D. Occupational Therapy, Admissions, Contact |
| Allied Health Technologies | School page, Allied Health department, related allied-health courses, Admissions, Contact |
| Partner variants | Canonical course page, partner page only where useful, Admissions, Contact |

## Search Intent Notes

| Category | Use |
|---|---|
| Hyderabad/Telangana | Visible title/meta/H1/H2 where natural |
| India national | Visible copy and schema keywords |
| North India | Support copy only |
| Andhra Pradesh/South India | Support copy only |
| NRI/international | Safe information copy only, no eligibility promise |
| Typo keywords | Backend/search-intent notes only |
| Multilingual voice | `draft voice-search pattern, native review recommended` |

## 8-Category Keyword Matrix

Use these eight categories for every canonical page. Categories 1-5 can support visible copy when natural. Categories 6-8 are control/support categories and must not become visible keyword spam.

| Course | 1. Local Hyderabad/Telangana | 2. India national | 3. Admission/facts | 4. Syllabus/practical | 5. Career intent | 6. Partner/variant control | 7. Regional/NRI support | 8. Backend typo/voice |
|---|---|---|---|---|---|---|---|---|
| BPT | BPT course in Hyderabad; physiotherapy college in Telangana | BPT course in India; physiotherapy courses after 12th India | BPT admission 2026; BPT eligibility; BPT fees; BPT duration | BPT syllabus; physiotherapy practical training; clinical rehabilitation | BPT career opportunities; physiotherapy jobs; placement/salary VERIFY WITH UNIVERSITY | `bpt` + `bpt-emversity`; keep canonical route only | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| MPT | MPT course in Hyderabad; PG physiotherapy Telangana | MPT course in India; postgraduate physiotherapy India | MPT admission 2026; MPT eligibility; MPT fees; MPT duration | MPT syllabus; advanced physiotherapy practice; research methods | MPT career scope; specialist physiotherapy roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Ph.D. Physiotherapy | Ph.D. Physiotherapy in Hyderabad; physiotherapy research Telangana | Ph.D. Physiotherapy India; doctoral physiotherapy program | Ph.D. Physiotherapy admission 2026; eligibility; fees; duration | research areas; supervisors; methodology; facilities VERIFY WITH UNIVERSITY | academic/research careers; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Ph.D. Physiotherapy Neurology | Ph.D. Physiotherapy Neurology Hyderabad; neuro-physiotherapy research Telangana | Ph.D. neuro-physiotherapy India; doctoral rehab research | Ph.D. Physiotherapy Neurology admission 2026; eligibility; fees; duration | neuro-rehabilitation research; supervisors; facilities VERIFY WITH UNIVERSITY | academic/research careers; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| BOT | BOT course in Hyderabad; occupational therapy college Telangana | BOT course in India; occupational therapy after 12th India | BOT admission 2026; BOT eligibility; BOT fees; BOT duration | BOT syllabus; OT practical training; rehabilitation practice | BOT career opportunities; occupational therapy jobs; placement/salary VERIFY WITH UNIVERSITY | `bot` + `bot-emversity`; keep canonical route only | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| MOT | MOT course in Hyderabad; PG occupational therapy Telangana | MOT course in India; postgraduate occupational therapy India | MOT admission 2026; MOT eligibility; MOT fees; MOT duration | MOT syllabus; advanced OT practice; assistive technology | MOT career scope; specialist OT roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Ph.D. Occupational Therapy | Ph.D. Occupational Therapy Hyderabad; OT research Telangana | Ph.D. Occupational Therapy India; doctoral OT program | Ph.D. OT admission 2026; eligibility; fees; duration | research areas; supervisors; rehabilitation outcomes VERIFY WITH UNIVERSITY | academic/research careers; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Medical Lab Technology | Medical Lab Technology course in Hyderabad; lab technology Telangana | MLT course in India; medical laboratory science India | MLT admission 2026; eligibility; fees; duration | pathology; microbiology; diagnostics lab training | lab technologist careers; diagnostic lab roles; placement/salary VERIFY WITH UNIVERSITY | `bmlt` + `bmls`; keep canonical route only | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Anesthesia & OT Technology | Anesthesia & OT Technology course Hyderabad; OT technology Telangana | anaesthesia technology course India; OT technology India | AOTT admission 2026; eligibility; fees; duration | OT protocols; anaesthesia support; perioperative training | OT technologist careers; anaesthesia support roles; placement/salary VERIFY WITH UNIVERSITY | `bsc-anaesthesia-ot` + `baott`; keep canonical route only | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Cardiovascular Technology | Cardiovascular Technology course Hyderabad; cardiac technology Telangana | cardiovascular technology course India; cardiac care technology | CVT admission 2026; eligibility; fees; duration | ECG/echo concepts; cath-lab support; cardiac diagnostics | cardiac technologist roles; placement/salary VERIFY WITH UNIVERSITY | EMVERSITY note only; no duplicate SEO page | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Emergency Medical Technology | Emergency Medical Technology course Hyderabad; trauma care Telangana | emergency medical technology India; EMT course India | EMT admission 2026; eligibility; fees; duration | triage; trauma response; emergency simulation | emergency care roles; trauma support careers; placement/salary VERIFY WITH UNIVERSITY | `betcms` + `bemt`; keep canonical route only | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Optometry | Optometry course Hyderabad; eye-care course Telangana | optometry course India; vision science India | Optometry admission 2026; eligibility; fees; duration | eye screening; vision science; clinical optometry | optometrist roles; optical practice; placement/salary VERIFY WITH UNIVERSITY | EMVERSITY note only; no duplicate SEO page | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Radiotherapy Technology | Radiotherapy Technology course Hyderabad; oncology technology Telangana | radiotherapy technology course India; oncology support India | Radiotherapy admission 2026; eligibility; fees; duration | treatment support; radiation safety; oncology workflow | radiotherapy technologist roles; placement/salary VERIFY WITH UNIVERSITY | `brt` + `brtt`; keep canonical route only | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Forensic Science | Forensic Science course Hyderabad; forensic college Telangana | forensic science course India; forensic science after 12th India | forensic science admission 2026; eligibility; fees; duration | crime-scene methods; evidence handling; forensic labs | forensic lab roles; investigation support; placement/salary VERIFY WITH UNIVERSITY | EDIN note only; no duplicate SEO page | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Diploma in Anaesthesia and Operation Theatre Technology | Diploma AOTT Hyderabad; OT technician course Telangana | diploma anaesthesia technology India; OT technician India | diploma AOTT admission 2026; eligibility; fees; duration | sterilisation; OT support; anaesthesia assistance | OT technician roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Bachelor of Nutrition and Dietetics (Hons) | Nutrition and Dietetics course Hyderabad; dietetics Telangana | nutrition course India; dietetics course India | nutrition admission 2026; eligibility; fees; duration | clinical nutrition; diet planning; community nutrition | dietitian roles; wellness careers; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Diploma of Radiotherapy Technology | Diploma Radiotherapy Technology Hyderabad; radiotherapy diploma Telangana | radiotherapy diploma India; oncology technician course India | D.RT admission 2026; eligibility; fees; duration | treatment-room support; safety basics; oncology workflow | radiotherapy technician roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Bachelor of Physician Assistant | Physician Assistant course Hyderabad; clinical assistant Telangana | physician assistant course India; PA course India | B.PA admission 2026; eligibility; fees; duration | patient documentation; care coordination; clinical posting | physician assistant roles; hospital-team support; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Diploma of Dialysis Technology | Diploma Dialysis Technology Hyderabad; dialysis technician Telangana | dialysis technician course India; dialysis diploma India | D.DT admission 2026; eligibility; fees; duration | dialysis workflow; machine handling; patient monitoring | dialysis technician roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Bachelor of Dialysis Therapy Technology | Dialysis Therapy Technology course Hyderabad; renal care Telangana | dialysis therapy course India; renal-care technology India | B.DTT admission 2026; eligibility; fees; duration | renal care; dialysis equipment; clinical postings | dialysis technologist roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |
| Bachelor of Respiratory Technology | Respiratory Technology course Hyderabad; pulmonary care Telangana | respiratory technology course India; respiratory care India | B.RT admission 2026; eligibility; fees; duration | pulmonary care; ICU support; patient monitoring | respiratory technologist roles; placement/salary VERIFY WITH UNIVERSITY | None | North India, Andhra Pradesh, South India, NRI/international information only | Typo backend only; draft voice-search pattern, native review recommended |

## Course End-To-End Execution Matrix

Each course should move left to right. Do not implement schema or final metadata until source facts and copy are approved.

| Course | Verify facts | Copy build | SEO build | Developer build | QA |
|---|---|---|---|---|---|
| BPT | council/approval, salary, placement | physiotherapy intro, curriculum, clinical learning, FAQs | title/meta/H1, 8 keyword categories, partner note | `src/data/schools.ts`, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| MPT | intake, approval, salary, placement | PG physiotherapy, specialization, research orientation, FAQs | title/meta/H1, PG intent, internal links | data, metadata, schema after verification | route, canonical, sitemap, Rich Results, URL Inspection |
| Ph.D. Physiotherapy | eligibility, fees, intake, research areas, supervisors | doctoral research brief, admissions process, FAQs | Ph.D. research keywords, no salary claim | data only after university Ph.D. inputs | route, canonical, sitemap, schema safety |
| Ph.D. Physiotherapy Neurology | eligibility, fees, intake, neuro research areas, supervisors | neuro-rehabilitation research brief, FAQs | Ph.D. neuro-physiotherapy keywords | data only after university Ph.D. inputs | route, canonical, sitemap, schema safety |
| BOT | council/approval, salary, placement | OT intro, functional rehabilitation, assistive living, FAQs | title/meta/H1, 8 keyword categories, partner note | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| MOT | intake, approval, salary, placement | advanced OT practice, assistive technology, FAQs | title/meta/H1, PG OT intent, links | data, metadata, schema after verification | route, canonical, sitemap, Rich Results, URL Inspection |
| Ph.D. Occupational Therapy | eligibility, fees, intake, research areas, supervisors | OT research brief, admission process, FAQs | Ph.D. OT research keywords | data only after university Ph.D. inputs | route, canonical, sitemap, schema safety |
| Medical Lab Technology | council/approval, salary, placement | diagnostics, pathology, lab training, FAQs | title/meta/H1, grouped MLT variant terms | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Anesthesia & OT Technology | council/approval, salary, placement | perioperative care, OT protocols, FAQs | title/meta/H1, grouped AOTT variant terms | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Cardiovascular Technology | council/approval, salary, placement | cardiac diagnostics, cath-lab support, FAQs | title/meta/H1, CVT intent, partner note | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Emergency Medical Technology | council/approval, salary, placement | trauma response, triage, emergency simulation, FAQs | title/meta/H1, EMT intent, grouped variant terms | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Optometry | council/approval, salary, placement | vision science, eye screening, clinical optometry, FAQs | title/meta/H1, optometry intent, partner note | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Radiotherapy Technology | council/approval, salary, placement | oncology workflow, treatment support, safety, FAQs | title/meta/H1, grouped radiotherapy variant terms | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Forensic Science | intake, approval, salary, placement | evidence, crime-scene methods, forensic labs, FAQs | title/meta/H1, forensic science intent, EDIN note | data, metadata, search intent, schema, page blocks | route, canonical, sitemap, Rich Results, URL Inspection |
| Diploma in Anaesthesia and Operation Theatre Technology | eligibility, fees, intake, approval, salary, placement | technician-readiness, OT support, FAQs | diploma AOTT keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |
| Bachelor of Nutrition and Dietetics (Hons) | eligibility, fees, intake, approval, salary, placement | nutrition, diet planning, wellness, FAQs | nutrition/dietetics keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |
| Diploma of Radiotherapy Technology | eligibility, fees, intake, approval, salary, placement | technician-readiness, oncology support, FAQs | diploma radiotherapy keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |
| Bachelor of Physician Assistant | eligibility, fees, intake, approval, salary, placement | clinical care coordination, physician support, FAQs | physician assistant keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |
| Diploma of Dialysis Technology | eligibility, fees, intake, approval, salary, placement | dialysis technician readiness, renal care, FAQs | diploma dialysis keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |
| Bachelor of Dialysis Therapy Technology | eligibility, fees, intake, approval, salary, placement | renal care, dialysis therapy, clinical postings, FAQs | dialysis therapy keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |
| Bachelor of Respiratory Technology | eligibility, fees, intake, approval, salary, placement | pulmonary care, ICU support, respiratory practice, FAQs | respiratory technology keywords, safe facts | data and schema only after verification | route, canonical, sitemap, schema safety |

## Developer Handoff

| Task | File/component |
|---|---|
| Confirm canonical slugs and grouped variants | `src/data/official-courses.ts`, `src/data/schools.ts` |
| Add verified course facts | `src/data/schools.ts` |
| Expand title/meta/H1 logic after copy approval | `src/lib/shared/dynamic-route-metadata.ts` |
| Add search-intent terms after SEO approval | `src/lib/seo/search-intent.ts` |
| Add Course/WebPage/FAQ schema using verified facts only | `src/lib/seo/schema.ts` |
| Confirm URL discovery | `app/sitemap.ts`, `src/lib/seo/sitemap.ts` |
| Add copy blocks, FAQs, internal links | course page components |

## School-Level TODO Checklist

| Task | Status |
|---|---|
| Confirm this school remains the first execution target | TODO |
| Collect missing university-approved facts for all 21 canonical pages | TODO |
| Write Wave 1 P0 content drafts | TODO |
| Review Wave 1 facts with university team | TODO |
| Implement Wave 1 only after fact approval | TODO |
| Validate schema, sitemap, canonical URLs, and indexing | TODO |
| Repeat for Wave 2 | TODO |
| Repeat for Wave 3 after Ph.D. research inputs are verified | TODO |
