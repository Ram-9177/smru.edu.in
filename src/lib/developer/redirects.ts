import type { DeveloperCMSState, RedirectCheckResult } from "@/types/developer";

const isInternalUrl = (url: string) => /^\//.test(url);
const isExternalUrl = (url: string) => /^https?:\/\//.test(url);

export function validateRedirects(state: DeveloperCMSState): RedirectCheckResult[] {
  return state.routes
    .filter((route) => route.redirectTarget || route.pageType === "redirect")
    .map((route) => {
      const target = (route.redirectTarget || "").trim();
      if (!target) {
        return {
          routeId: route.id,
          url: route.url,
          valid: false,
          reason: "Missing redirect target",
        };
      }

      if (route.redirectType === "external" && !isExternalUrl(target)) {
        return {
          routeId: route.id,
          url: route.url,
          valid: false,
          reason: "External redirect must use http(s)",
        };
      }

      if ((route.redirectType === "internal" || route.redirectType === "hidden") && !isInternalUrl(target)) {
        return {
          routeId: route.id,
          url: route.url,
          valid: false,
          reason: "Internal/hidden redirect must start with /",
        };
      }

      return {
        routeId: route.id,
        url: route.url,
        valid: true,
      };
    });
}
