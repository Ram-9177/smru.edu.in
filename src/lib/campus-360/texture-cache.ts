// Ultra-fast client-side texture & image decode cache for instant 360 switches

export const decodedImageRegistry = new Set<string>();

export function prefetchAndDecode(src?: string, highPriority = false): Promise<boolean> {
  if (!src || typeof window === "undefined") return Promise.resolve(false);
  if (decodedImageRegistry.has(src)) return Promise.resolve(true);

  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    if (highPriority && "fetchPriority" in img) {
      (img as any).fetchPriority = "high";
    }
    img.src = src;
    if (img.decode) {
      img.decode()
        .then(() => {
          decodedImageRegistry.add(src);
          resolve(true);
        })
        .catch(() => {
          decodedImageRegistry.add(src);
          resolve(true);
        });
    } else {
      img.onload = () => {
        decodedImageRegistry.add(src);
        resolve(true);
      };
      img.onerror = () => resolve(false);
    }
  });
}

export function warmUpTourTextures(
  locations: Array<{ panoramaSrc: string; lowResSrc?: string }>,
) {
  if (typeof window === "undefined" || !locations.length) return;

  // Phase 1: Immediately prefetch and decode all low-res spheres in parallel (~450 KB total)
  const lowResList = locations
    .map((l) => l.lowResSrc)
    .filter((s): s is string => Boolean(s));

  lowResList.forEach((src) => {
    void prefetchAndDecode(src, true);
  });

  // Phase 2: Stream high-res textures smoothly in small staggered batches
  const timer = window.setTimeout(() => {
    locations.forEach((loc, index) => {
      window.setTimeout(() => {
        if (loc.panoramaSrc) void prefetchAndDecode(loc.panoramaSrc, false);
      }, index * 80);
    });
  }, 200);

  return () => window.clearTimeout(timer);
}

const CUBE_FACES = ["f", "b", "l", "r", "u", "d"];

export function warmUpHostelTiles(sceneIds: string[] = []) {
  if (typeof window === "undefined" || !sceneIds.length) return;

  // 1. Immediately pre-warm active / first scene preview & all 6 Level-1 cube faces with highest priority
  const firstScene = sceneIds[0];
  if (firstScene) {
    void prefetchAndDecode(`/360/hostel/tiles/${firstScene}/preview.jpg`, true);
    CUBE_FACES.forEach((face) => {
      void prefetchAndDecode(`/360/hostel/tiles/${firstScene}/1/${face}/0/0.jpg`, true);
    });
  }

  // 2. Pre-warm remaining scene previews and Level-1 tiles in gentle background stream
  const remainingScenes = sceneIds.slice(1);
  const timer = window.setTimeout(() => {
    remainingScenes.forEach((sceneId, idx) => {
      window.setTimeout(() => {
        void prefetchAndDecode(`/360/hostel/tiles/${sceneId}/preview.jpg`, false);
        CUBE_FACES.forEach((face) => {
          void prefetchAndDecode(`/360/hostel/tiles/${sceneId}/1/${face}/0/0.jpg`, false);
        });
      }, idx * 100);
    });
  }, 400);

  return () => window.clearTimeout(timer);
}

