# UGC Public Self-Disclosure Audit

Audit date: 2026-05-14  
Source checked: UGC PDF `7822003_GUIDELINES-ON-PUBLIC-SELF-DISCLOSURE-BY-HIGHER-EDUCATION-INSTITUTIONS (2).pdf` and local website source.

## Executive Summary

Current status: PARTIAL, not ready for UGC public self-disclosure review.

Root cause: the website has a good public route structure and SEO/disclosure scaffold, but many UGC-required disclosures are either placeholder text, "Coming Soon" content, broken links, or not backed by verified PDFs/data.

Already present:
- Public website routes, sitemap, robots, and `/search`.
- `/about`, `/schools`, `/academic-structure`, `/admissions`, `/contact`, `/careers`.
- `/approvals-recognitions` with SMRU Act PDF and UGC 2(f) recognition PDF.
- Some program pages with duration/eligibility.
- Campus media, law page, campus guide, and Ph.D. admission material.

Main blockers:
- Mandatory disclosure hub is incomplete.
- Governance/administration details are incomplete.
- Annual reports, annual accounts, audit reports, IDP, statutes/ordinances, academic calendar, prospectus, refund policy, RTI, committees, faculty directory, research, placements, alumni, and telephone directory are missing or placeholder-only.
- Core broken disclosure/campus links found in this audit have been developer-fixed; remaining blockers are content/document completeness.

## Priority Definitions

High: likely UGC review blocker or broken public route.  
Medium: required/expected disclosure but can be completed after core statutory documents.  
Low: polish, discoverability, or non-blocking cleanup.

## High Priority Pending

1. Complete `/mandatory-disclosure`
   - Current page is only an index with placeholder sections.
   - Source: `src/lib/seo/info-pages.ts`.
   - Required: one UGC disclosure hub with all categories from the PDF and direct links to documents/pages.

2. Publish statutory and financial documents
   - Missing: Institutional Development Plan, Annual Reports, Annual Accounts, Balance Sheet, Income and Expenditure, Receipts and Payments, Audit Report.
   - Current `public/assets` only has SMRU Act, UGC 2(f), exam notification, and Ph.D. notices.
   - Add documents to `public/assets` and register in `src/lib/shared/official-documents.ts`.

3. Replace governance placeholders
   - `src/views/About.tsx` and `src/components/LeadershipAll.tsx` include "Coming Soon" for governing body/BOM/academic council.
   - Required: Chancellor, Pro-Chancellor, VC, Pro-VC if applicable, Registrar, Principal if applicable, Finance Officer, Controller of Examination, CVO, Ombudsperson, boards/councils/committees with particulars, photos, and contact details.

4. Publish faculty/staff directory
   - `/faculty-directory` exists but uses placeholder text.
   - Required: school/department/centre-wise faculty and staff details with photographs.

5. Publish academic statutory documents
   - Missing/placeholder: academic calendar, academic/exam statutes and ordinances, syllabus/curriculum PDFs, approved intake, semester-wise fee details.
   - `Program.tsx` shows duration/level/eligibility but not verified fee/intake/curriculum.

6. Publish professional/regulatory approvals
   - `/approvals-recognitions` has Act and UGC 2(f), but program-level approvals are not published.
   - Required where applicable: RCI, NCAHP, Nursing, BCI/law, AICTE, pharmacy, or "not applicable" statements.

7. Publish student grievance and welfare committees
   - `/grievance-redressal`, `/ombudsperson`, `/anti-ragging`, `/iqac-quality-assurance` are placeholder pages.
   - Missing: SGRC, Ombudsperson details, ICC, Anti-Ragging Cell, Equal Opportunity Cell, SEDG Cell, differently-abled facilities.

8. Publish RTI and contact directory
   - `/public-information` and `/contact-directory` are placeholder pages.
   - Required: CPIO/Appellate Authority details if applicable, official telephone directory, department emails/phones.

9. Publish admissions/fee/refund documents
   - `/fee-structure`, `/refund-policy`, `/admission-policy` are placeholder pages.
   - `/brochure` downloads `/SMG-Flyer.pdf`, not a full UGC-style prospectus with fee structure.

10. Developer-fixed broken internal links
   - Added `/campus-location-hyderabad` as a public info page.
   - Added `/hostel` as a public info page.
   - Added `/statutory-disclosures` as a public info page.
   - Normalized IST partner HTML from `/terms-of-use/` to `/terms-of-service/`.
   - Normalized IST partner email protection URL to a direct `mailto:` link.

## Medium Priority Pending

1. Improve search discoverability
   - `/search` exists and works from code, but it is not exposed in main desktop/mobile nav or footer.
   - UGC requires a search facility; make it visible globally.

2. Add dedicated student life pages
   - Missing or partial: sports facilities, NCC/NSS, hostel details, health facilities, placement cell activities.
   - Current content is scattered across home/campus guide/Ph.D. page.

3. Add research disclosures
   - Ph.D. page lists research domains/labs, but no formal R&D Cell page.
   - Missing: R&D Cell, research/consultancy projects, foreign/industry collaborations, incubation/startup/entrepreneurship cell, central facilities.

4. Add alumni page
   - UGC asks for Alumni Association details.
   - Current alumni mentions are only partner/marketing fragments, not an official association page.

5. Add Information Corner pages
   - Missing: circulars/notices index, announcements, newsletters, news/recent events/achievements, reservation roster if applicable, Study in India, international student procedure/facilities.

6. Add library page
   - Library is mentioned in campus guide and images exist, but no official library disclosure page with timings, collection, staff/contact, and facilities.

7. Add constituent/off-campus/ODL disclosure
   - Required: constituent units, affiliated colleges, off-campus/off-shore campus, learning support centres under ODL mode where applicable.
   - If not applicable, publish an explicit "Not applicable" disclosure.

8. Add accreditation/ranking detail pages
   - `/naac` and `/nirf` exist but are generic.
   - Add current status, cycle/year, documents, or explicit "not yet applicable/not participated" statements.

## Low Priority Pending

1. Add "last updated", owner department, and document version metadata to every disclosure page.
2. Add a picture gallery page using existing `public/assets/campus-gallery/*`.
3. Add PDF naming/version convention for regulatory files.
4. Add sitemap priority grouping for final disclosure pages after content is complete.
5. Add a small automated internal-link check to CI/build for disclosure routes.

## UGC Checklist Mapping

| UGC Requirement | Current Status | Priority | Notes |
|---|---:|---:|---|
| Functional website, unrestricted access | Partial | Medium | Public routes exist; no login required for normal pages. |
| Search facility | Partial | Medium | `/search` exists but is not globally visible. |
| About us overview | Present | Low | `/about`. |
| Act and Statutes/MoA | Partial | High | Act PDF present; statutes/MoA missing. |
| Institutional Development Plan | Missing | High | No route/document found. |
| Constituent/off-campus/ODL details | Missing | Medium | Publish details or not-applicable statement. |
| Accreditation/ranking NAAC/NBA/NIRF | Partial | Medium | `/naac`, `/nirf` generic; NBA absent. |
| Recognition/approval 2(f), 12B, etc. | Partial | High | UGC 2(f) present; other approvals missing. |
| Annual reports | Missing | High | No document/page found. |
| Annual accounts/audit report | Missing | High | No document/page found. |
| Sponsoring body details | Partial | Medium | Names exist; formal details/doc missing. |
| Administration profiles/photos/contacts | Partial | High | Several roles missing or placeholder-only. |
| Boards/councils/committees composition | Partial | High | Placeholders and incomplete member particulars. |
| Internal Complaint Committee | Missing | High | No official ICC details. |
| Academic leadership Deans/HoDs | Missing | High | No complete directory/photos/contacts. |
| Academic programs | Partial | High | Pages exist; intake, fee, curriculum, approvals incomplete. |
| Academic calendar | Placeholder | High | `/academic-calendar` exists but no calendar. |
| Academic/exam statutes/ordinances | Missing | High | No documents found. |
| Schools/departments/centres | Present | Low | `/schools`, `/departments`, dynamic pages. |
| Faculty/staff details with photos | Placeholder | High | `/faculty-directory` incomplete. |
| ODL/online programs | Missing | Medium | Publish list or not-applicable statement. |
| IQAC | Placeholder | High | `/iqac-quality-assurance` incomplete. |
| Library | Partial | Medium | Mentioned only; no official page. |
| Academic collaborations | Partial | Medium | Partner routes exist; official collaboration disclosure missing. |
| Prospectus with fee structure | Partial | High | Flyer only; fee page placeholder. |
| Admission process/guidelines | Partial | Medium | `/admissions` exists; formal policy details incomplete. |
| Fee refund policy | Placeholder | High | `/refund-policy` incomplete. |
| Research/R&D cell/projects | Partial | High | Ph.D. content exists; no formal R&D disclosure. |
| Incubation/startups/entrepreneurship | Missing | Medium | No page found. |
| Central facilities | Partial | Medium | Labs/facilities scattered, not formal. |
| Sports facilities | Partial | Medium | Mentioned in home/campus guide. |
| NCC/NSS | Missing | Medium | No page found. |
| Hostel details | Partial | High | `/hostel` page now exists; verified hostel policy/fees still pending. |
| Placement Cell | Partial | High | Generic claims; no official cell/activity/stat data. |
| SGRC/Ombudsperson | Placeholder | High | Pages exist but no details. |
| Health facilities | Partial | Medium | Hospital stats mentioned; no formal page. |
| Anti-ragging cell | Placeholder | High | `/anti-ragging` incomplete. |
| Equal Opportunity Cell | Missing | Medium | No page found. |
| SEDG Cell | Missing | Medium | No page found. |
| Differently-abled facilities | Partial | Medium | Mission context exists; formal accessibility disclosure missing. |
| Alumni Association | Missing | Medium | No official alumni page. |
| RTI CPIO/Appellate Authority | Missing | High | No official RTI details. |
| Circulars/notices | Partial | Medium | Exam/Ph.D. notices exist; no index. |
| Announcements/newsletters/news/events | Missing | Medium | No official listing found. |
| Job openings | Present | Low | `/careers`. |
| Reservation roster | Missing | Medium | Publish if applicable. |
| Study in India/international students | Missing | Medium | No page found. |
| Picture gallery | Partial | Low | Assets exist; no dedicated gallery route. |
| Contact phone/email/address/map | Present | Low | `/contact`. |
| Telephone directory | Placeholder | High | `/contact-directory` incomplete. |

## Developer Implementation Path

1. Use `src/lib/seo/info-pages.ts` as the fastest path for disclosure pages; replace placeholder text with verified data and add missing slugs.
2. Extend `src/lib/shared/official-documents.ts` for every official PDF.
3. Upload PDFs under `public/assets/` with stable filenames.
4. Keep footer/nav links aligned with `INFO_PAGES`; the broken links identified in this audit are now resolved.
5. Add visible `/search` link in desktop nav, mobile menu, and footer.
6. Update `src/components/search/SiteSearchClient.tsx` to include every new disclosure page/document.
7. Update `app/sitemap.ts` after final routes are added.
8. Run a route/link audit before deployment.

## Minimum Acceptance Criteria Before UGC Review

- No disclosure page contains "Official details will be published", "Coming Soon", or "Awaiting Publication" unless explicitly marked not applicable with authority/date.
- Every UGC checklist item has either a live page, direct PDF, or not-applicable statement.
- All footer/nav disclosure links resolve to 200 pages.
- Search is visible and can find disclosure pages/documents.
- Mandatory disclosure page acts as the single index for all UGC categories.
