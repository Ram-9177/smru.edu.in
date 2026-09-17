"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __smruRemoveChildGuarded?: boolean;
  }
}

export default function ReactDomSafetyPatch() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__smruRemoveChildGuarded) return;

    // 1. Guard against DOM removal collisions from 3rd party scripts
    const originalRemoveChild = Node.prototype.removeChild;

    Node.prototype.removeChild = function patchedRemoveChild<T extends Node>(child: T): T {
      if (!child || child.parentNode !== this) {
        return child;
      }

      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") {
          return child;
        }
        throw error;
      }
    };

    // 2. Intercept and isolate unhandled runtime errors from external 3rd-party widgets (e.g. ctplform.js / Meritto)
    const handleGlobalError = (event: ErrorEvent) => {
      const filename = event.filename || "";
      const message = event.message || "";
      const stack = event.error?.stack || "";

      const isThirdPartyWidget =
        filename.includes("ctplform.js") ||
        filename.includes("apply.smru.edu.in") ||
        stack.includes("ctplform.js") ||
        stack.includes("CTPLSelect") ||
        stack.includes("CTPLinitialize") ||
        (message.includes("null is not an object") && stack.includes("ctpl"));

      if (isThirdPartyWidget) {
        event.preventDefault();
        event.stopImmediatePropagation();
        console.warn("[SMRU Safety Patch] Intercepted non-fatal third-party widget error:", message);
        return true;
      }
    };

    window.addEventListener("error", handleGlobalError, true);

    // 3. Suppress benign console error noise from browser extensions that mutate DOM attributes before React hydration (e.g. Bitdefender bis_skin_checked, bis_register, bis_use)
    const originalConsoleError = console.error;
    console.error = function (...args: any[]) {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("bis_skin_checked") ||
        msg.includes("bis_register") ||
        msg.includes("bis_use") ||
        msg.includes("speculationrules") ||
        msg.includes("chrome-extension://") ||
        msg.includes("browser extension installed which messes with the HTML")
      ) {
        return;
      }
      return originalConsoleError.apply(this, args);
    };

    // 4. Initial DOM sweep to remove any extension attributes that may have slipped in before hydration
    try {
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => el.removeAttribute("bis_skin_checked"));
      document.querySelectorAll("[bis_use]").forEach((el) => el.removeAttribute("bis_use"));
      document.body?.removeAttribute("bis_register");
    } catch (_) {}

    window.__smruRemoveChildGuarded = true;

    return () => {
      window.removeEventListener("error", handleGlobalError, true);
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
