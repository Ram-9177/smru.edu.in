# Performance Baseline

Generated: 2026-06-13

Partner/static pages are excluded by user instruction.

## Available Lighthouse Artifacts
| File | Performance | Accessibility | Best Practices | SEO | Key issue |
|---|---:|---:|---:|---:|---|
| `lh-report.json` | 71 | 96 | 100 | 100 | LCP 13.9s |
| `lighthouse-report.json` | 75 | 96 | 100 | 100 | LCP 22.2s |

## Build Baseline
- `npm run build`: PASS.
- Static pages generated: 459.
- Shared first-load JS: 87.7 kB.
- Several core client-heavy routes report about 296 kB first-load JS.
- `/smru-facts/` reports 125 kB first-load JS after moving schema out of the client component.

## Main Weak Points
- LCP is the largest performance risk.
- Many `<img>` warnings remain in lint, so image optimization is incomplete.
- Several routes are client-heavy, increasing hydration cost.
- Font preloads are numerous; review only after visual QA.
- Broad image conversion was not done to avoid visual degradation.
