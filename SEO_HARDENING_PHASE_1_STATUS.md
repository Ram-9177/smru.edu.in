# SEO Hardening Phase 1 Status

Branch: `seo-hardening-phase-1`

Repository: `Ram-9177/smru.edu.in`

## Completed in this branch

1. Navbar authority links now use the central SEO authority map.
2. Footer authority links now use the central SEO authority map.
3. Course ItemList schema was added for the main schools page.
4. Course ItemList schema was added for dynamic school pages.
5. Course ItemList schema was added for dynamic department pages.
6. Sitemap now includes central authority pages from the SEO authority map.
7. Programme pages now use stronger admissions-focused H1 text and direct-answer overview intros.
8. Low-risk LCP improvement was applied by reducing splash/preloader duration and removing image priority from the splash logo.
9. A backlink and citation execution sheet was added.
10. A small lint cleanup removed an unused import from the dynamic school page.
11. A GitHub Actions SEO CI workflow was added to run install, SEO guard, lint, and build checks.
12. A repository SEO guard script was added as `npm run seo:guard`.
13. An end-to-end SEO, AEO, GEO execution master document was added.

## Code-level items still open

1. Homepage Important Links block still uses hardcoded links. It already links authority pages, but it is not yet fully wired through `SEO_AUTHORITY_PAGES`.
2. Repo-wide lint cleanup may still be required because historical lint issues existed before this SEO branch.
3. Full image optimization for large hero/gallery media still requires asset-level review and visual QA.
4. Full accessibility QA still requires route-by-route browser testing.

## Verification pending

1. Review GitHub Actions workflow result for this branch after GitHub runs it.
2. Run `npm run seo:guard` locally or in CI.
3. Run `npm run build` locally or in CI.
4. Run `npm run lint` locally or in CI and resolve remaining findings.
5. Run Lighthouse/PageSpeed after deployment or local production build.
6. Verify sitemap submission and coverage in Google Search Console.

## Manual SEO operations pending

1. Google Business Profile NAP check.
2. Social profile canonical website check.
3. Partner backlink outreach.
4. Reputable education directory citation submissions.
5. PR/news link plan.
6. GSC query and CTR review.

## Production merge note

This branch must be updated with latest `main` before merging because `main` moved after the branch was created.
