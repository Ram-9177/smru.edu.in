"use client";
import React, { useEffect } from "react";

const CTPL_SCRIPT_SRC = "https://apply.smru.edu.in/js/ctplform.js";
const CTPL_CONTAINER_ID = "ctplform";

const getRegistry = () => {
  if (typeof window === "undefined") return {};
  if (!window.__ctplWidgetRegistry) {
    window.__ctplWidgetRegistry = {};
  }
  return window.__ctplWidgetRegistry;
};

export const PHD_CTPL_FORM_ID = "d1f77bfe0d14579a3b3bc9ea65912e18d15308bc1de18afe198ae57f7cf53f14";

export default function CtplFormWidget({ 
  formId = PHD_CTPL_FORM_ID, 
  containerId = CTPL_CONTAINER_ID 
}) {
  useEffect(() => {
    if (!formId) return;
    let cancelled = false;
    let retryTimer = null;
    const currentContainerId = containerId;

    const existingScript = document.querySelector(`script[src="${CTPL_SCRIPT_SRC}"]`);
    const script =
      existingScript ||
      (() => {
        const s = document.createElement("script");
        s.src = CTPL_SCRIPT_SRC;
        s.defer = true;
        s.setAttribute("data-ctplform", "true");
        document.body.appendChild(s);
        return s;
      })();

    const boot = () => {
      if (cancelled) return;
      const container = document.getElementById(currentContainerId);
      if (!container || !container.isConnected) return;

      // Ensure we don't call it if it's already being handled or if the script failed
      if (typeof window.ctplTag !== "function") {
        console.warn("CTPL widget script (ctplTag) not found. Checking again in 500ms.");
        retryTimer = setTimeout(boot, 500);
        return;
      }

      const registry = getRegistry();
      const registryKey = `${currentContainerId}:${formId}`;
      if (registry[registryKey]) return;

      registry[registryKey] = true;
      try {
        window.ctplTag(formId);
      } catch (err) {
        console.error("Failed to initialize CTPL tag:", err);
      }
    };

    if (typeof window.ctplTag === "function") {
      // Slight delay to ensure DOM is truly ready for the widget injection
      const t = setTimeout(boot, 100);
      return () => {
        cancelled = true;
        clearTimeout(t);
        if (retryTimer) clearTimeout(retryTimer);
      };
    }

    script.addEventListener("load", boot, { once: true });
    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      script.removeEventListener("load", boot);
    };
  }, [formId]);

  return (
    <div 
      id={containerId} 
      form-id={formId} 
      className="ctpl-inline-shell min-h-[300px] w-full max-w-full overflow-x-hidden bg-white/5 cut-corner-panel flex items-start justify-center p-3 sm:p-4"
    />
  );
}
