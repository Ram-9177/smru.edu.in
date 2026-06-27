# SEO Hardening Phase 1 Status

Branch: `seo-hardening-phase-1`

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

## Still pending after this branch work

1. Wire the homepage Important Links block directly to the SEO authority map. The homepage already links several authority pages, but it is still hardcoded.
2. Run `npm run build` locally or in CI.
3. Run `npm run lint` and finish the remaining lint cleanup across the full repo.
4. Run Lighthouse/PageSpeed after deployment or local build to confirm LCP improvement.
5. Complete the full image optimization pass for large hero/gallery images.
6. Complete full accessibility QA across all routes.
7. Verify sitemap submission and coverage in Google Search Console.
8. Execute the backlink/citation outreach manually because it requires access to profiles, partners, directories, and official listings.

## Manual SEO operations pending

- Google Business Profile NAP check.
- Social profile canonical website check.
- Partner backlink outreach.
- Reputable education directory citation submissions.
- PR/news link plan.
- GSC query and CTR review.
