"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_IFRAME_HEIGHT = 320;
const MAX_IFRAME_HEIGHT = 30000;

const clampHeight = (value: number) => Math.min(MAX_IFRAME_HEIGHT, Math.max(MIN_IFRAME_HEIGHT, Math.ceil(value)));

const getIframeOrigin = (iframe: HTMLIFrameElement | null) => {
  const src = iframe?.src;
  if (!src) return null;

  try {
    const { origin, protocol } = new URL(src, window.location.href);
    return protocol === "http:" || protocol === "https:" ? origin : null;
  } catch {
    return null;
  }
};

const viewportFitFallbackHeight = (iframe: HTMLIFrameElement | null) => {
  if (typeof window === "undefined") return 1000;

  const viewportHeight = window.innerHeight || 900;
  const viewportWidth = window.innerWidth || 1000;
  
  // Mobile content is usually significantly longer
  const isMobile = viewportWidth < 768;
  const minViewportFill = Math.round(viewportHeight * (isMobile ? 0.85 : 0.72));
  const fallbackFloor = Math.max(isMobile ? 1200 : 760, minViewportFill);

  if (!iframe) {
    return clampHeight(fallbackFloor);
  }

  const iframeRect = iframe.getBoundingClientRect();
  const topOffset = Math.max(0, iframeRect.top);
  const footer = document.querySelector("footer");
  const footerHeight = footer ? Math.max(0, footer.getBoundingClientRect().height) : 0;
  const safeGap = isMobile ? 40 : 12;

  // Attempt to fill remaining viewport, but ensure a solid minimum for the partner content
  const fillHeight = viewportHeight - topOffset - footerHeight - safeGap;
  return clampHeight(Math.max(fallbackFloor, fillHeight));
};

const extractHeightCandidate = (payload: any): unknown => {
  if (typeof payload === "string") {
    try {
      const parsed = JSON.parse(payload);
      return extractHeightCandidate(parsed);
    } catch {
      const match = payload.match(/(?:iframeHeight|documentHeight|contentHeight|scrollHeight|height)["':=\s]+(\d{3,6})/i);
      return match ? match[1] : null;
    }
  }

  if (!payload || typeof payload !== "object") return null;

  return (
    payload?.iframeHeight ??
    payload?.height ??
    payload?.documentHeight ??
    payload?.contentHeight ??
    payload?.scrollHeight ??
    payload?.data?.iframeHeight ??
    payload?.data?.height ??
    payload?.data?.documentHeight ??
    payload?.data?.contentHeight ??
    payload?.data?.scrollHeight ??
    payload?.payload?.iframeHeight ??
    payload?.payload?.height ??
    payload?.payload?.documentHeight ??
    payload?.payload?.contentHeight ??
    payload?.payload?.scrollHeight ??
    null
  );
};

type UseIframeAutoHeightOptions = {};

export function useIframeAutoHeight(initialHeight = 1400, options: UseIframeAutoHeightOptions = {}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState(initialHeight);
  const [hasDynamicHeight, setHasDynamicHeight] = useState(false);
  const [allowIframeScroll, setAllowIframeScroll] = useState(false);
  void options;

  const applyHeight = useCallback((rawHeight: unknown) => {
    const next = Number(rawHeight);
    if (!Number.isFinite(next)) return false;
    setIframeHeight(clampHeight(next));
    setHasDynamicHeight(true);
    setAllowIframeScroll(false);
    return true;
  }, []);

  const applyFallback = useCallback(() => {
    setAllowIframeScroll(true);
    setIframeHeight((prev) => (hasDynamicHeight ? prev : viewportFitFallbackHeight(iframeRef.current)));
  }, [hasDynamicHeight]);

  const measureSameOriginHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentWindow?.document;
      if (!doc) return;
      const body = doc.body;
      const html = doc.documentElement;
      const height = Math.max(
        body?.scrollHeight || 0,
        body?.offsetHeight || 0,
        html?.clientHeight || 0,
        html?.scrollHeight || 0,
        html?.offsetHeight || 0
      );

      if (height > 0) {
        setIframeHeight(clampHeight(height));
        setHasDynamicHeight(true);
        setAllowIframeScroll(false);
      }
    } catch {
      // Cross-origin iframe cannot be measured directly.
    }
  }, []);

  const handleIframeLoad = useCallback(() => {
    measureSameOriginHeight();
    applyFallback();
  }, [measureSameOriginHeight, applyFallback]);

  useEffect(() => {
    applyFallback();
  }, [applyFallback]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const iframe = iframeRef.current;
      const iframeWindow = iframe?.contentWindow;
      if (iframeWindow && event.source !== iframeWindow) return;
      const expectedOrigin = getIframeOrigin(iframe);
      if (expectedOrigin && event.origin !== expectedOrigin) return;

      // Handle specific Stmarys University message type
      if (event.data?.type === "SMRU_IFRAME_HEIGHT" && typeof event.data?.height === "number") {
        applyHeight(event.data.height);
        return;
      }

      const candidate = extractHeightCandidate(event.data);
      applyHeight(candidate);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [applyHeight]);

  useEffect(() => {
    let ticks = 0;
    const interval = window.setInterval(() => {
      ticks += 1;

      const iframe = iframeRef.current;
      if (!iframe) return;

      // Try same-origin measurement when possible.
      measureSameOriginHeight();

      // Ask partner pages that support postMessage handshake to reply with height.
      try {
        const targetOrigin = getIframeOrigin(iframe) || "*";
        iframe.contentWindow?.postMessage({ type: "SMRU_REQUEST_IFRAME_HEIGHT" }, targetOrigin);
        iframe.contentWindow?.postMessage({ type: "REQUEST_IFRAME_HEIGHT" }, targetOrigin);
      } catch {
        // ignore cross-origin messaging errors
      }

      if (ticks >= 45 || hasDynamicHeight) {
        window.clearInterval(interval);
      }
    }, 1200);

    return () => window.clearInterval(interval);
  }, [hasDynamicHeight, measureSameOriginHeight]);

  useEffect(() => {
    const handleResize = () => {
      if (hasDynamicHeight) {
        measureSameOriginHeight();
      } else {
        applyFallback();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applyFallback, hasDynamicHeight, measureSameOriginHeight]);

  return {
    iframeRef,
    iframeHeight,
    handleIframeLoad,
    iframeScrolling: allowIframeScroll ? "yes" : "no",
    hasDynamicHeight,
  };
}
