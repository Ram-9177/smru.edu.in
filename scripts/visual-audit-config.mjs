const partnerIframeRoutes = [
  "/partner/bb/",
  "/partner/bytexl/",
  "/partner/edridge/",
  "/partner/emversity/",
  "/partner/niat/",
  "/partner/nst/",
  "/partner/skilgen/",
];
const partnerLoaderSelector = "div[class~='fixed'][class~='inset-0'][class~='z-[1000]']";
const partnerReadinessRoutes = ["/partner/edinbox/", "/partner/qtst/", "/partner/veloces/"];

export const visualMaskRegistry = new Map([
  ["/partner/edinbox/", [{
    selector: "img[src^=\"https://images.unsplash.com/\"]",
    justification: "The protected Edinbox landing uses remotely controlled Unsplash media.",
  }]],
  ["/partners/edinbox/", [{
    selector: "img[src^=\"https://images.unsplash.com/\"]",
    justification: "The protected legacy Edinbox landing uses remotely controlled Unsplash media.",
  }, {
    selector: ".hero-bg",
    mode: "background-image",
    replacementBackgroundImage: "linear-gradient(100deg, rgba(15,45,35,0.97) 0%, rgba(27,92,72,0.88) 55%, rgba(27,92,72,0.55) 100%)",
    justification: "The protected legacy Edinbox hero uses a remotely controlled Unsplash background.",
  }, {
    selector: ".final-cta",
    mode: "background-image",
    replacementBackgroundImage: "linear-gradient(90deg, rgba(15,45,35,0.95) 0%, rgba(27,92,72,0.88) 100%)",
    justification: "Remove only the protected remote final-CTA background while retaining its copy and buttons.",
  }]],
  ["/partner/qtst/", [{
    frameSelector: "iframe[title$=\" Portal\"]",
    selector: "img[src^=\"https://\"]",
    justification: "The same-origin QTST portal frame loads externally hosted remote image assets.",
  }]],
  ["/partners/qtst/", [{
    selector: "img[src^=\"https://\"]",
    justification: "The protected legacy QTST landing loads externally hosted remote image assets.",
  }]],
  ["/campus-360/", [{
    selector: ".psv-canvas-container",
    justification: "Photo Sphere canvas orientation changes while auto-rotation remains behavior-locked.",
  }, {
    selector: ".psv-markers",
    justification: "Photo Sphere marker positions move with the auto-rotating canvas.",
  }]],
  ["/nursing-sciences/", [{
    selector: "main > section:first-child img[data-nimg=\"fill\"]",
    justification: "The approved nursing hero rotates images on a fixed timer.",
  }]],
  ["/niat-upskilling/", [{
    selector: "iframe#dynamicIframe",
    justification: "The cross-origin NIAT portal controls its own render state.",
  }, {
    selector: partnerLoaderSelector,
    justification: "The protected NIAT loading overlay depends on the cross-origin iframe load event.",
    optional: true,
  }]],
  ["/law/", [{
    selector: "img[alt=\"Prof. N. R. Madhava Menon\"]",
    justification: "Mobile /law/ captures showed a low-entropy hero card rasterization variance isolated to this image on certain mobile stacks.",
  }]],
  ["/Hand-Book/", [{
    selector: "div.mb-10.relative img",
    justification: "Mobile /Hand-Book/ captures showed a low-entropy logo rasterization variance isolated to this top logo image.",
  }]],
  ...partnerIframeRoutes.map((route) => [route, [{
    selector: "div.overflow-hidden.bg-white",
    justification: "The wrapper contains only the protected cross-origin partner portal and inherits its nondeterministic load opacity.",
  }, {
    selector: partnerLoaderSelector,
    justification: "The protected partner loading overlay depends on the cross-origin iframe load event.",
    optional: true,
  }]]),
]);

export const visualReadinessRegistry = new Map(partnerReadinessRoutes.map((route) => [route, [{
  selector: partnerLoaderSelector,
  state: "absent",
  timeoutMs: 15_000,
  justification: "The existing partner gateway loader must complete before the portal wrapper and its approved initial state are compared.",
}]]));

export const visualExternalImageRoutes = new Map([
  ["/partner/edinbox/", "Preserve an unmasked capture of protected remote Unsplash media before selector masking."],
  ["/partner/qtst/", "Preserve an unmasked capture of the same-origin QTST portal before frame-local selector masking."],
  ["/partners/edinbox/", "Preserve an unmasked capture of protected legacy remote media before selector masking."],
  ["/partners/qtst/", "Preserve an unmasked capture of externally hosted remote image assets before selector masking."],
]);

export const visualStabilizerRegistry = new Map([
  ["/partner/qtst/", {
    kind: "qtst-page-one",
    frameSelector: "iframe[title$=\" Portal\"]",
    timerFreeze: {
      documentPath: "/partners/qtst/index.html",
      method: "setTimeout",
      delay: 3000,
      callbackIncludes: "go(current + 1)",
    },
    justification: "Reset the same-origin protected QTST carousel to its existing first page before evidence capture.",
  }],
  ["/partners/qtst/", {
    kind: "qtst-page-one",
    timerFreeze: {
      documentPath: "/partners/qtst/",
      method: "setTimeout",
      delay: 3000,
      callbackIncludes: "go(current + 1)",
    },
    justification: "Reset the protected QTST carousel to its existing first page before evidence capture.",
  }],
  ["/partner/veloces/", {
    kind: "veloces-first-slide",
    frameSelector: "iframe[title$=\" Portal\"]",
    timerFreeze: {
      documentPath: "/partners/veloces/velocescampus.html",
      method: "setInterval",
      delay: 4000,
      callbackIncludes: "moveSlide(1)",
    },
    justification: "Reset the same-origin protected Veloces carousel to its existing first slide before evidence capture.",
  }],
  ["/partners/veloces/velocescampus.html", {
    kind: "veloces-first-slide",
    timerFreeze: {
      documentPath: "/partners/veloces/velocescampus.html",
      method: "setInterval",
      delay: 4000,
      callbackIncludes: "moveSlide(1)",
    },
    justification: "Reset the protected Veloces carousel to its existing first slide before evidence capture.",
  }],
]);

export function validateVisualMaskRegistry(registry = visualMaskRegistry) {
  const forbiddenSelectors = new Set(["*", "html", "body", "main", "#__next", "section"]);
  const seenRoutes = new Set();
  for (const [route, masks] of registry) {
    if (!route.startsWith("/") || !route.endsWith("/") || seenRoutes.has(route)) {
      throw new Error(`Invalid or duplicate visual-mask route: ${route}`);
    }
    seenRoutes.add(route);
    if (!Array.isArray(masks) || masks.length === 0) throw new Error(`Visual-mask route has no selectors: ${route}`);
    const selectors = new Set();
    for (const mask of masks) {
      const selector = mask?.selector?.trim();
      const frameSelector = mask?.frameSelector?.trim();
      const selectorKey = `${frameSelector || "top"}|${selector}`;
      if (!selector || selectors.has(selectorKey) || selector.includes(",") || forbiddenSelectors.has(selector.toLowerCase())) {
        throw new Error(`Unsafe visual-mask selector for ${route}: ${selector || "<empty>"}`);
      }
      if (frameSelector && (frameSelector.includes(",") || forbiddenSelectors.has(frameSelector.toLowerCase()))) {
        throw new Error(`Unsafe visual-mask frame selector for ${route}: ${frameSelector}`);
      }
      if (!mask.justification?.trim()) throw new Error(`Visual mask lacks justification for ${route}: ${selector}`);
      if (mask.optional !== undefined && typeof mask.optional !== "boolean") {
        throw new Error(`Visual mask has invalid optional flag for ${route}: ${selector}`);
      }
      if (mask.mode !== undefined && !["hide", "background-image"].includes(mask.mode)) {
        throw new Error(`Visual mask has invalid mode for ${route}: ${selector}`);
      }
      if (mask.mode === "background-image") {
        const replacement = mask.replacementBackgroundImage?.trim();
        if (!replacement || /url\s*\(|[{};]/i.test(replacement)) {
          throw new Error(`Visual background mask lacks a safe deterministic replacement for ${route}: ${selector}`);
        }
      } else if (mask.replacementBackgroundImage !== undefined) {
        throw new Error(`Visual hide mask has an unexpected background replacement for ${route}: ${selector}`);
      }
      if (frameSelector && mask.mode === "background-image") {
        throw new Error(`Frame-local background masks are unsupported for ${route}: ${selector}`);
      }
      selectors.add(selectorKey);
    }
  }
  return true;
}

export function visualMasksForRoute(route) {
  return visualMaskRegistry.get(route) || [];
}

export function allowExternalImageRequestsForRoute(route) {
  return visualExternalImageRoutes.has(route);
}

export function visualStabilizerForRoute(route) {
  return visualStabilizerRegistry.get(route) || null;
}

export function visualReadinessForRoute(route) {
  return visualReadinessRegistry.get(route) || [];
}

export function validateVisualReadinessRegistry(registry = visualReadinessRegistry) {
  const seenRoutes = new Set();
  for (const [route, requirements] of registry) {
    if (!route.startsWith("/") || seenRoutes.has(route) || !Array.isArray(requirements) || requirements.length === 0) {
      throw new Error(`Invalid visual-readiness route: ${route}`);
    }
    seenRoutes.add(route);
    for (const requirement of requirements) {
      if (!requirement.selector?.trim() || requirement.selector.includes(",") || requirement.state !== "absent"
        || !Number.isInteger(requirement.timeoutMs) || requirement.timeoutMs <= 0 || !requirement.justification?.trim()) {
        throw new Error(`Invalid visual-readiness requirement: ${route}`);
      }
    }
  }
  return true;
}

export function validateVisualStabilizerRegistry(registry = visualStabilizerRegistry) {
  const seenRoutes = new Set();
  for (const [route, stabilizer] of registry) {
    const timerFreeze = stabilizer?.timerFreeze;
    const timerFreezeIsValid = timerFreeze
      && timerFreeze.documentPath?.startsWith("/")
      && ["setTimeout", "setInterval"].includes(timerFreeze.method)
      && Number.isInteger(timerFreeze.delay)
      && timerFreeze.delay > 0
      && timerFreeze.callbackIncludes?.trim();
    if (!route.startsWith("/") || seenRoutes.has(route)
      || !["qtst-page-one", "veloces-first-slide"].includes(stabilizer?.kind)
      || !stabilizer.justification?.trim() || !timerFreezeIsValid) {
      throw new Error(`Invalid visual stabilizer: ${route}`);
    }
    seenRoutes.add(route);
  }
  return true;
}

validateVisualMaskRegistry();
validateVisualReadinessRegistry();
for (const [route, justification] of visualExternalImageRoutes) {
  if (!visualMaskRegistry.has(route) || !justification.trim()) {
    throw new Error(`External-image route lacks a justified selector mask: ${route}`);
  }
}
validateVisualStabilizerRegistry();
