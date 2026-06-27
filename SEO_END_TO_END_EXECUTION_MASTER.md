# SMRU End-to-End SEO, AEO, GEO Execution Master

This document is the operating system for making `smru.edu.in` stronger in Google Search, AI answers, local discovery, and admissions conversion.

## 1. Technical foundation

### Code systems already added

- Central authority map: `src/lib/seo/authority-map.ts`
- Course ItemList schema helper: `src/lib/seo/course-list.ts`
- SEO guard script: `scripts/seo-guard.js`
- SEO CI workflow: `.github/workflows/seo-hardening-ci.yml`
- Backlink/citation execution sheet: `SEO_BACKLINK_CITATION_EXECUTION_SHEET.md`

### Required checks before every production merge

Run:

```bash
npm ci
npm run seo:guard
npm run lint
npm run build
```

Do not merge if:

- Build fails.
- SEO guard fails.
- Sitemap is missing.
- Canonicals are broken.
- Homepage, admissions, schools, approvals, contact, brochure, campus tour, or PhD pages are removed from sitemap.
- Course pages lose Course schema or breadcrumbs.

## 2. Highest authority pages

| Cluster | Primary URL | Purpose |
|---|---|---|
| Brand | `/` | Main Stmarys University entity page |
| Admissions | `/admissions/` | Main admissions conversion page |
| Courses | `/schools/` | Main academic catalogue |
| Trust | `/approvals-recognitions/` | UGC, Act, statutory proof |
| Campus | `/campus-360/` | Campus confidence and parent trust |
| Contact | `/contact/` | Local/NAP/contact entity page |
| Brochure | `/brochure/` | Lead capture support |
| PhD | `/phd-admissions/` | Doctoral intent page |
| Leadership | `/leadership/all/` | Governance and trust |

## 3. Page structure standard

Every priority page should have:

- One clear H1.
- Direct answer in the first 40 to 60 words.
- Visible content matching schema.
- Breadcrumb schema.
- WebPage or CollectionPage schema.
- Internal links to parent, child, and trust pages.
- No unsupported No.1, best, top, first, or only claims.
- Clear CTA for admissions/contact where relevant.

## 4. Programme page standard

Each programme page must include:

- Admissions-focused H1.
- Programme overview.
- Duration.
- Level.
- Eligibility.
- Fee guidance disclaimer.
- Intake/batch status where available.
- Admission route.
- Recognition/verification note.
- Curriculum/admission process when data exists.
- Career/higher study pathways.
- Parent school and department links.
- Admissions/contact/approvals links.
- Course schema.
- Breadcrumb schema.

## 5. School and department page standard

Each school and department page must include:

- CollectionPage schema.
- Breadcrumb schema.
- ItemList schema for departments/programmes.
- Course ItemList schema for all contained programmes.
- Intro direct answer.
- Programme discovery section.
- Internal links to admissions, brochure, contact, and approvals.
- FAQs only if the FAQ content is visible on-page.

## 6. Homepage standard

Homepage must act as the central entity page.

It should link clearly to:

- Admissions.
- Schools/courses.
- Approvals and recognitions.
- Campus 360.
- Contact.
- Brochure.
- PhD admissions.
- Leadership/governance.
- Location/campus page.

## 7. Sitemap and robots standard

Sitemap must include:

- Homepage.
- Central authority pages.
- School pages.
- Department pages.
- Programme pages.
- Trust pages.
- Partner pages that are public and not removed.
- Leadership profiles.

Robots/noindex must protect:

- Developer routes.
- API routes.
- Thank-you pages.
- Duplicate/utility pages where needed.

## 8. Performance standard

Priority:

1. Homepage LCP.
2. Admissions LCP.
3. Schools/courses LCP.
4. Campus 360 isolation.
5. Image optimization.

Rules:

- Only above-fold hero image should use priority.
- Below-fold gallery and partner media should lazy-load.
- Heavy 360/Three.js code should stay isolated to campus-tour pages.
- Preloader must not delay the real LCP element.
- Run Lighthouse after deployment.

## 9. Accessibility standard

Each major page should pass:

- One H1.
- Logical heading order.
- Alt text for meaningful images.
- Empty alt text for decorative images.
- Descriptive link labels.
- Keyboard-accessible CTAs/modals.
- Visible focus states.

## 10. GSC weekly operating rhythm

Every week check:

- Indexed pages.
- Sitemap coverage.
- Pages discovered but not indexed.
- Top queries by impressions.
- High impressions, low CTR pages.
- Cannibalisation: multiple pages ranking for same query.
- Broken or redirected URLs.

Priority query groups:

- Stmarys University.
- SMRU Hyderabad.
- St Marys University Hyderabad.
- St Marys Rehabilitation University.
- Admissions 2026.
- Courses after 12th.
- Health sciences courses.
- Rehabilitation courses.
- Law courses.
- Engineering emerging technologies.
- Campus near Ramoji Film City.

## 11. Backlink and citation standard

Use only safe authority building:

- Google Business Profile.
- Official social profiles.
- Partner websites.
- Official education directories.
- Local PR/news coverage.
- Event coverage.
- PDFs/brochures linking back to canonical URLs.

Avoid:

- Paid backlink packages.
- Auto-generated backlinks.
- Spam directories.
- Repeated exact-match anchors.
- Unsupported ranking claims.

## 12. Deployment checklist

Before deployment:

- Merge latest `main` into the SEO branch or rebase safely.
- Resolve conflicts.
- Run CI.
- Confirm sitemap.
- Confirm robots.
- Confirm canonical URLs.
- Confirm homepage, admissions, schools, approvals, contact, campus, and brochure pages load.
- Deploy.
- Submit sitemap in GSC.
- Request indexing for priority pages.
- Run Lighthouse.
- Track changes in monthly SEO log.

## 13. Non-negotiable safety

Do not publish or commit any claim that is not verifiable through official university documents, UGC references, Telangana Act/Gazette, or approved institutional communication.
