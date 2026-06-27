# SEO Hardening Phase 1 Status

Branch: `seo-hardening-phase-1`

Repository: `Ram-9177/smru.edu.in`

## Completed in this branch

1. Navbar authority links now use the central SEO authority map.
2. Footer authority links now use the central SEO authority map.
3. Homepage and shared `LinkGridSection` internal links now resolve through the SEO authority map where a mapped authority route exists.
4. Course ItemList schema was added for the main schools page.
5. Course ItemList schema was added for dynamic school pages.
6. Course ItemList schema was added for dynamic department pages.
7. Sitemap now includes central authority pages from the SEO authority map.
8. Programme pages now use stronger admissions-focused H1 text and direct-answer overview intros.
9. Low-risk LCP improvement was applied by reducing splash/preloader duration and removing image priority from the splash logo.
10. A backlink and citation execution sheet was added.
11. A small lint cleanup removed an unused import from the dynamic school page.
12. A GitHub Actions SEO CI workflow was added to run install, SEO guard, lint, and build checks.
13. A repository SEO guard script was added as `npm run seo:guard`.
14. The SEO guard now checks homepage/shared link-grid authority resolution.
15. An end-to-end SEO, AEO, GEO execution master document was added.

## Code-level status

All originally listed repo-side SEO hardening items are now implemented at code level on this branch.

## Verification still required before production merge

1. Review GitHub Actions workflow result for this branch after GitHub runs it.
2. Run `npm run seo:guard` locally or in CI.
3. Run `npm run build` locally or in CI.
4. Run `npm run lint` locally or in CI and resolve any remaining historical lint findings.
5. Run Lighthouse/PageSpeed after deployment or local production build.
6. Verify sitemap submission and coverage in Google Search Console.

## Manual SEO operations still require account/browser access

1. Google Business Profile NAP check.
2. Social profile canonical website check.
3. Partner backlink outreach.
4. Reputable education directory citation submissions.
5. PR/news link plan.
6. GSC query and CTR review.

## Production merge note

This branch must be updated with latest `main` before merging because `main` moved after the branch was created.
