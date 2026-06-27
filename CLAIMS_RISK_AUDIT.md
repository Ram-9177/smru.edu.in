# Claims Risk Audit

Generated: 2026-06-13

Partner/static pages are excluded by user instruction.

## Fixed In This Pass
| Risk wording | Safer handling |
|---|---|
| “30-year / 30+ years” used as visible legacy proof | Replaced with “St. Mary’s educational legacy” or “Educational Legacy”. |
| “India’s first / first and only” on non-partner pages and campus-guide transcript | Replaced with rehabilitation-focused factual wording. |
| “Top Academic” in About metadata | Replaced with neutral leadership wording. |
| “World-Class Campus” homepage section title | Replaced with “Campus & Learning Environment”. |
| `/smru-facts/` FAQ-like schema | Removed client FAQ-like JSON-LD; added WebPage/Breadcrumb schema. |

## Deliberately Not Changed
- `data/seo-pages.ts` contains “best/top/No.1” keywords as claim-check guide inputs and disclaimers. Those are not presented as SMRU claims.
- Partner landing pages may still contain risky wording, but they were not inspected or edited per user instruction.
- Audio `.mp3` files were not edited.

## Remaining Risk
- Broad guide clusters under `/seo/*`, `/student-guides/*`, and `/admission-guides/*` should be evaluated with GSC data before merge/noindex/redirect decisions.
