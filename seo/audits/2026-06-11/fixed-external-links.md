# Fixed External Links - Phase 3

Date: 2026-06-11
Branch: `seo/phase-3-broken-external-links`

## Summary

- Rendered external anchors checked: 32
- Broken rendered external anchors after fixes: 0
- Rendered empty, `#`, or `javascript:` anchor hrefs after fixes: 0
- Rendered `target="_blank"` anchors missing `rel="noopener noreferrer"` after fixes: 0

## Fixed Links

| Old URL | New URL | Location/file | Reason |
|---|---|---|---|
| `#` | `https://www.facebook.com/SMRUniversity` | `src/views/EdinboxForensicLandingV2.tsx`, `public/partners/edinbox/index.html`, `src/Partners - Codes/Edinbox/smru-forensic-landing-v2.html`, `src/views/EdinboxRawLanding.tsx` | Replaced social placeholder with verified SMRU Facebook URL. |
| `#` | `https://www.instagram.com/smruhyderabad` | Same Edinbox files | Replaced social placeholder with verified SMRU Instagram URL. |
| `#` | `https://www.youtube.com/@SMRUniversity` | Same Edinbox files | Replaced social placeholder with verified SMRU YouTube URL. |
| `#` | `https://www.linkedin.com/company/smruhyderabad/` | Same Edinbox files | Replaced social placeholder with verified SMRU LinkedIn URL. |
| `#` | `/contact` | Same Edinbox files | No verified SMRU X/Twitter URL in source; converted to internal contact fallback. |
| `mailto:support@edinbox` / `#` | `mailto:support@edinbox.com` | `src/views/EdinboxForensicLandingV2.tsx`, Edinbox static/mirror files | Fixed malformed or placeholder email link. |
| `#` | `/partner/edinbox/` | Edinbox React/static/mirror files | Replaced Home/logo placeholder with page route. |
| `#` | `/about`, `/leadership`, `/campus-location-hyderabad`, `/schools`, `/admissions`, `/contact` | Edinbox React/static/mirror files | Replaced header/footer nav placeholders with existing internal pages. |
| `#` | `https://aifset.com/` | Edinbox static/mirror files | Replaced AIFSET CTA placeholders with existing verified AIFSET URL already used on the page. |
| `#` | `/schools` | Edinbox React/static/mirror files | Replaced programme placeholders with internal academics page instead of inventing programme-specific URLs. |
| `#` | `/privacy-policy`, `/terms-of-service`, `/html-sitemap` | Edinbox static/mirror files; `src/views/EdinboxForensicLandingV2.tsx`; `src/views/IstLandingV2.tsx` | Replaced legal/footer placeholders with existing internal routes. |
| `#` | `https://admissions.velocescampus.com/` | `public/partners/veloces/velocescampus.html`, `src/Partners - Codes/Veloces/velocescampus.html` | Replaced Veloces Apply placeholder with existing verified admissions URL already used on the page. |
| `#` | `/contact`, `/privacy-policy`, `/terms-of-service`, `/grievance-redressal`, `/about`, `/partner/veloces/` | Veloces static/mirror files | Converted unknown commented/legal placeholders to internal routes. |
| `#` | `https://qtst.ai/#institutes` | `public/partners/qtst/index.html`, `src/Partners - Codes/QTST/qtst-smru.html` | Replaced QTST "Our Services" placeholder with verified QTST services section URL. |
| empty `href=""` | `#student-builds` | `public/partners/ist/index.html`, `src/Partners - Codes/IST/sushant-uni/sushantuniversity.html` | Replaced empty IST outcome links with existing in-page section anchor. |
| Same external URL | Same URL plus `rel="noopener noreferrer"` | IST static/mirror files | Added safe `rel` to all `target="_blank"` anchors. |
| Same document URL | Same URL plus `rel="noopener noreferrer"` | `src/views/PhdAdmission.tsx` | Added safe `rel` to document download opened in a new tab. |

## Validation

- `npm run build`: passed
- `node scripts/check-external-links.mjs out`: passed, 0 broken
- Rendered anchor hygiene scan: 0 empty/hash/javascript hrefs and 0 `_blank` anchors missing rel
