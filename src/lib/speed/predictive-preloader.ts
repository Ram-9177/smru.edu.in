// Predictive Smart Preloader & Intent-Based Zero-Latency Accelerator

import { prefetchAndDecode, warmUpHostelTiles, warmUpTourTextures } from "@/lib/campus-360/texture-cache";
import { CAMPUS_TOUR_LOCATIONS } from "@/data/campus-tour";

const prefetchedUrls = new Set<string>();

const ROUTE_MEDIA_MAP: Record<string, string[]> = {
  "/": [
    "/assets/Stmarys-Logo.webp",
    "/assets/Logo.webp",
  ],
  "/explore": [
    "/assets/hero-campus.webp",
    "/campus-360/entry-gate/panorama-low.webp",
    "/360/hostel/tiles/0-girls-rooms/preview.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/f/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/b/0/0.jpg",
  ],
  "/explore/": [
    "/assets/hero-campus.webp",
    "/campus-360/entry-gate/panorama-low.webp",
    "/360/hostel/tiles/0-girls-rooms/preview.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/f/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/b/0/0.jpg",
  ],
  "/campus-360": [
    "/campus-360/entry-gate/panorama-low.webp",
    "/campus-360/entry-gate/panorama.webp",
    "/campus-360/main-block/panorama-low.webp",
    "/campus-360/clock-tower/panorama-low.webp",
  ],
  "/campus-360/": [
    "/campus-360/entry-gate/panorama-low.webp",
    "/campus-360/entry-gate/panorama.webp",
    "/campus-360/main-block/panorama-low.webp",
    "/campus-360/clock-tower/panorama-low.webp",
  ],
  "/hostel-360": [
    "/360/hostel/tiles/0-girls-rooms/preview.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/f/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/b/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/l/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/r/0/0.jpg",
    "/360/hostel/tiles/6-girls_handwash/preview.jpg",
    "/360/hostel/tiles/3-girls-washroom-360/preview.jpg",
  ],
  "/explore/hostel-360": [
    "/360/hostel/tiles/0-girls-rooms/preview.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/f/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/b/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/l/0/0.jpg",
    "/360/hostel/tiles/0-girls-rooms/1/r/0/0.jpg",
    "/360/hostel/tiles/6-girls_handwash/preview.jpg",
    "/360/hostel/tiles/3-girls-washroom-360/preview.jpg",
  ],
  "/campus-guide": [
    "/assets/Campus guide images/Main Gate.webp",
    "/assets/Campus guide images/campus-main.webp",
  ],
  "/campus-guide/": [
    "/assets/Campus guide images/Main Gate.webp",
    "/assets/Campus guide images/campus-main.webp",
  ],
  "/law": [
    "/assets/law/moot-court.webp",
    "/assets/law/bci-logo.svg",
  ],
  "/landing/law": [
    "/assets/law/moot-court.webp",
    "/assets/law/bci-logo.svg",
  ],
};

/**
 * Predictively prefetch and decode high-intent media assets for a given route
 */
export function predictivePrefetch(targetUrl: string) {
  if (typeof window === "undefined" || !targetUrl) return;

  // Normalize target URL pathname
  let path = targetUrl;
  try {
    if (targetUrl.startsWith("http")) {
      path = new URL(targetUrl).pathname;
    } else {
      path = targetUrl.split("?")[0].split("#")[0];
    }
  } catch {
    return;
  }

  if (prefetchedUrls.has(path)) return;
  prefetchedUrls.add(path);

  // 1. Check exact match in route media map
  const mediaList = ROUTE_MEDIA_MAP[path] || ROUTE_MEDIA_MAP[`${path}/`];
  if (mediaList) {
    mediaList.forEach((src) => {
      void prefetchAndDecode(src, true);
    });
  }

  // 2. Specialized route predictive warmers
  if (path.includes("campus-360")) {
    warmUpTourTextures(CAMPUS_TOUR_LOCATIONS.slice(0, 6));
  } else if (path.includes("hostel-360") || path.includes("hostel")) {
    warmUpHostelTiles(["0-girls-rooms", "6-girls_handwash", "3-girls-washroom-360", "2-girls-wet--dry"]);
  } else if (path.includes("explore")) {
    warmUpTourTextures(CAMPUS_TOUR_LOCATIONS.slice(0, 4));
    warmUpHostelTiles(["0-girls-rooms", "6-girls_handwash"]);
  }
}

/**
 * Initialize global intent listeners on user hover, touch, and focus
 */
export function initPredictiveNavigation(router?: { prefetch: (url: string) => void }) {
  if (typeof window === "undefined") return () => {};

  let idleHandle: number;

  const handleInteraction = (event: Event) => {
    const rawTarget = event.target as Node | null;
    if (!rawTarget) return;

    const element =
      rawTarget instanceof Element
        ? rawTarget
        : rawTarget.parentElement instanceof Element
        ? rawTarget.parentElement
        : null;

    if (!element || typeof element.closest !== "function") return;

    const target = element.closest("a, button, [data-href]");
    if (!target) return;

    const href =
      target.getAttribute("href") ||
      target.getAttribute("data-href") ||
      "";

    if (!href || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
      return;
    }

    // Predictive media decode
    predictivePrefetch(href);

    // Next.js client-side bundle prefetch
    if (router && href.startsWith("/")) {
      try {
        router.prefetch(href);
      } catch {}
    }
  };

  // Passive listeners for lightning-fast anticipation on hover, touch, and tab navigation
  document.addEventListener("pointerenter", handleInteraction, { passive: true, capture: true });
  document.addEventListener("touchstart", handleInteraction, { passive: true, capture: true });
  document.addEventListener("focusin", handleInteraction, { passive: true, capture: true });

  // Background idle pre-warming on initial landing
  const requestIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 800));
  idleHandle = requestIdle(() => {
    // Warm up top universal brand and visual assets
    predictivePrefetch("/");
    predictivePrefetch("/explore");
  });

  return () => {
    document.removeEventListener("pointerenter", handleInteraction, { capture: true });
    document.removeEventListener("touchstart", handleInteraction, { capture: true });
    document.removeEventListener("focusin", handleInteraction, { capture: true });
    if (typeof window !== "undefined" && "cancelIdleCallback" in window && idleHandle) {
      window.cancelIdleCallback(idleHandle);
    }
  };
}
