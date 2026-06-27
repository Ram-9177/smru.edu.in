# SEO Risk Register

Generated: 2026-06-13

| Risk | Level | Status | Handling |
|---|---|---|---|
| Repo has extensive pre-existing dirty changes | Medium | Open | Limited edits to schema/search/footer and report files only. |
| ESLint now installed but repo lint fails | Medium | Open | Build passes. Lint baseline captured separately; broad lint cleanup kept out of scope. |
| Search Console/backlink data unavailable | Medium | Open | No brand alias redirects deployed. Added to review-only. |
| Unverified 1996 legal-university implication | High | Mitigated | Removed schema foundingDate constant and footer "Since 1996" line. Legacy references kept where clearly educational legacy. |
| Duplicate/conflicting Organization/WebSite nodes | Medium | Mitigated | Homepage now emits one entity @graph with WebSite, CollegeOrUniversity, WebPage. |
| FAQ schema duplication on homepage | Low | Mitigated | Removed duplicate app-level FAQ emission; existing Home view FAQ remains. |
| Existing high-volume SEO guide pages may be sensitive | Medium | Review | Preserved; no redirects/noindex changes without data. |
| Brand-cluster pages overlap by design | Medium | Review | Kept live with distinct intent. Redirects require GSC/backlink evidence. |
| `/smru-facts/` lacked full shared metadata path | Medium | Mitigated | Added canonical/Open Graph metadata and server-rendered WebPage/Breadcrumb schema. |
| Unsupported claim wording on non-partner pages | High | Mitigated | Replaced “first/top/30-year/world-class” style wording with safer factual copy. |
| Partner/static pages may still contain risky claims | Medium | Excluded | Not inspected or edited per user instruction. |
