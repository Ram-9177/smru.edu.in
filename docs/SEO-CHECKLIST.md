# SMRU SEO Excellence Checklist

This document outlines the mandatory standards for all pages on the St. Mary's Rehabilitation University (SMRU) platform to maintain its "God-Level" institutional authority.

## 1. Metadata Checklist
- [ ] **Title Tag**: 50-60 characters, includes `| SMRU` or `| St. Mary's Rehabilitation University`.
- [ ] **Meta Description**: 150-160 characters, action-oriented, includes primary keyword.
- [ ] **Canonical URL**: Self-referencing absolute URL (no trailing slashes if using `absoluteUrl`).
- [ ] **OpenGraph**: Descriptive `og:title`, `og:description`, and `og:image` (campus or facility).
- [ ] **Robots**: Default to `index, follow` unless it's a thank-you or private page.

## 2. Page Creation Checklist
- [ ] **URL Slug**: lowercase-with-hyphens, no special characters, keyword-rich.
- [ ] **Hierarchy**: Correct parent-child relationship (e.g., `/schools/[school]/[dept]`).
- [ ] **Information Component**: Uses the standardized `InformationPage` or `SchoolLayout`.
- [ ] **Breadcrumbs**: Full path back to home with valid `ListItem` schema.

## 3. Schema (JSON-LD) Checklist
- [ ] **Primary Schema**: Every page has `WebPage` schema with a unique `@id`.
- [ ] **Contextual Schema**:
    - [ ] Schools: `EducationalOrganization` + `ItemList`.
    - [ ] Programs: `Course` + `EducationalOccupationalProgram`.
    - [ ] Local Hubs: `Place` + `AboutPage`.
    - [ ] Faculty: `Person`.
- [ ] **Knowledge Graph**: All schemas link to the central university `@id` (`#organization`).
- [ ] **FAQ Schema**: Included if the page contains a Q&A section.

## 4. Image & Media Checklist
- [ ] **Next/Image**: All `<img>` tags replaced with `<Image />` from `next/image`.
- [ ] **Alt Text**: Descriptive, institutional, includes keywords (e.g., "SMRU Physiotherapy Lab").
- [ ] **Dimensions**: Explicit width/height or `aspect-ratio` container to prevent CLS.
- [ ] **Video Posters**: All `<video>` tags have a high-quality `poster` image.

## 5. Content & Institutional Proof
- [ ] **H1 Heading**: Single H1 per page, matches the primary intent.
- [ ] **Truthfulness**: No "India's Best" or "First" claims unless backed by verified proof.
- [ ] **Placeholders**: Use "Needs university input" or "Pending verification" for missing data.
- [ ] **Internal Mesh**: Links to related silos (Scholarships, Placements, Contact).

## 6. Pre-Deployment Technicals
- [ ] **Sitemap**: Page added to `app/sitemap.ts` with correct priority.
- [ ] **Loading State**: Page has a `loading.tsx` or uses `Skeleton` components.
- [ ] **Type Check**: Run `npx tsc --noEmit` to ensure no interface mismatches.
- [ ] **Responsive Check**: Verified on Mobile, Tablet, and Desktop viewports.

## 7. Post-Launch Search Console
- [ ] **Inspection**: Run "URL Inspection" in GSC for new high-value pages.
- [ ] **Core Web Vitals**: Monitor LCP and CLS in the GSC Experience report.
- [ ] **Mobile Usability**: Ensure no "clickable elements too close" errors.
- [ ] **Rich Results**: Verify FAQ and Course schema via the "Rich Results Test" tool.
