# Course SEO Batch Documentation Index

Source inspected first: `src/data/official-courses.ts`.

The official list has 86 rows. Existing route/data logic groups partner and duplicate variants into 69 canonical course SEO pages. The docs below preserve official order while preventing duplicate SEO pages from competing with canonical routes.

| Batch | School | Canonical pages | File |
|---|---|---:|---|
| 01 | School of Rehabilitation Sciences | 11 | `docs/course-seo-batches/01-rehabilitation-sciences.md` |
| 02 | School of Health & Allied Health Sciences | 21 | `docs/course-seo-batches/02-health-allied-health-sciences.md` |
| 03 | School of Psychology | 13 | `docs/course-seo-batches/03-psychology.md` |
| 04 | School of Nursing | 2 | `docs/course-seo-batches/04-nursing-sciences.md` |
| 05 | School of Engineering & Emerging Technologies | 11 | `docs/course-seo-batches/05-engineering-emerging-technologies.md` |
| 06 | School of Law | 11 | `docs/course-seo-batches/06-law.md` |

## Global Implementation Notes

- Route pattern: `/schools/[schoolSlug]/[deptSlug]/[programSlug]`.
- Current generated route source: `app/schools/[schoolSlug]/[deptSlug]/[programSlug]/page.tsx` uses `schools` from `src/data/schools.ts`.
- Canonical grouping happens in `src/data/schools.ts` through `getCanonicalSlugAndName` and `mergeOfficialCourses`.
- Keep typo keywords as backend/search-intent notes only, never visible H1/H2 copy.
- International/NRI copy must say information or pathway only; do not promise eligibility or admission until verified.
- Missing eligibility, fees, intake, approval, salary, placement, or council-recognition facts must remain `VERIFY WITH UNIVERSITY`.
