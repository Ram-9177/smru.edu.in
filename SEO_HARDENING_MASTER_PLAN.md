# SMRU SEO Hardening Master Plan

Scope: Improve SEO, crawlability, metadata, schema, internal linking, performance, accessibility, analytics readiness, and authority systems without changing UI colours, visual theme, or design language.

Branch started: `seo-hardening-phase-1`

## Do Not Touch

- UI colour palette
- visual brand theme
- layout style unless required for accessibility or semantic HTML
- partner pages without explicit approval
- unsupported ranking claims such as No.1, best, top, first, or only unless backed by official evidence

## Phase 1: Technical SEO Foundation

- [x] Preserve homepage broad brand title while allowing non-home pages to keep intent-specific SEO titles.
- [x] Add central SEO authority page map for consistent internal links and sitelink candidates.
- [ ] Wire the SEO authority map into footer/nav/homepage link blocks without changing UI styling.
- [ ] Add Course ItemList schema for `/schools/`, school pages, and department pages.
- [ ] Verify sitemap includes all authority, school, department, programme, trust, and conversion URLs.
- [ ] Confirm canonical URLs match static export trailing-slash URLs.
- [ ] Review noindex/disallow handling for thank-you, developer, API, and duplicate/utility routes.

## Phase 2: Content Architecture

- [ ] Map one primary keyword cluster to one primary landing page.
- [ ] Avoid duplicate/cannibal pages for brand, admissions, courses, and local queries.
- [ ] Strengthen programme pages with direct-answer intros, eligibility, duration, curriculum, careers, FAQs, and related pathways.
- [ ] Strengthen school pages with course discovery, comparison-safe FAQs, and internal links.
- [ ] Strengthen trust pages with official recognition, legal status, documents, and source citations.
- [ ] Add or improve local/campus content around Hyderabad region, Ramoji Film City, Deshmukhi, Pochampally, and Yadadri Bhuvanagiri.

## Phase 3: Structured Data and AEO/GEO

- [ ] Ensure WebSite, Organization/CollegeOrUniversity, WebPage, Breadcrumb, Course, FAQ, and ItemList schemas are correct.
- [ ] Keep FAQ schema public only where content is visible and safe.
- [ ] Use direct answers in the first 40-60 words of important pages.
- [ ] Keep official facts consistent across homepage, facts page, approvals page, contact page, and schema.
- [ ] Improve AI-answer-friendly pages: facts, approvals, admissions, schools, contact, campus tour, leadership.

## Phase 4: Performance and Crawl Efficiency

- [ ] Reduce LCP on homepage and high-traffic pages.
- [ ] Convert large hero images to optimized WebP/AVIF where safe.
- [ ] Lazy-load below-fold media.
- [ ] Keep heavy 360/three/photo-sphere-viewer code isolated to campus-tour routes.
- [ ] Reduce unnecessary client-side hydration on SEO pages.
- [ ] Review font loading after visual QA.

## Phase 5: Accessibility and Code Quality

- [ ] Fix lint warnings: unescaped entities, JSX keys, hook dependencies, unnecessary img usage.
- [ ] Ensure every image has useful alt text or empty decorative alt text.
- [ ] Confirm one clear H1 per page.
- [ ] Confirm heading hierarchy follows H1 -> H2 -> H3.
- [ ] Confirm links and CTAs have descriptive accessible labels.
- [ ] Confirm forms/modals remain keyboard accessible.

## Phase 6: Internal Linking and Sitelink Readiness

- [ ] Keep primary navigation and footer anchors consistent.
- [ ] Link homepage to admissions, schools, approvals, campus tour, contact, brochure, PhD admissions, and leadership.
- [ ] Link every programme page to parent department, parent school, admissions, brochure, contact, approvals, campus tour, and related programmes.
- [ ] Link trust pages to leadership, academic structure, admissions, and contact.
- [ ] Link admissions pages to school/course clusters.

## Phase 7: Backlinks, Citations, and Entity Authority

- [ ] Clean Google Business Profile NAP consistency.
- [ ] Ensure official social profiles link to `smru.edu.in`.
- [ ] Request partner websites to link to relevant SMRU pages.
- [ ] Build citations from official education directories and trustworthy local sources.
- [ ] Use PR/news links for official announcements, campus events, admissions, and recognition updates.
- [ ] Avoid paid link schemes, automated backlinks, and spam directory submissions.

## Phase 8: Measurement

- [ ] Verify Google Search Console sitemap submission.
- [ ] Track impressions, clicks, CTR, position, and indexed pages weekly.
- [ ] Track queries by cluster: brand, admissions, courses, trust, local, partner.
- [ ] Review pages with high impressions and low CTR for title/meta improvements.
- [ ] Review pages with ranking cannibalisation before redirect/noindex decisions.
- [ ] Maintain a monthly SEO change log.
