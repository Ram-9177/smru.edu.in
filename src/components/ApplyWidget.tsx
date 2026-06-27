"use client";
import React, { useEffect, useRef } from "react";

const DEFAULT_FORM_ID = "1c76a1c8dbc7278676884e00e5a46d7f54115d6b49a81b2210941f1a12f6771a";
const CTPL_CONTAINER_ID = "ctplform";

const getRegistry = () => {
  if (typeof window === "undefined") return {};
  if (!window.__ctplWidgetRegistry) {
    window.__ctplWidgetRegistry = {};
  }
  return window.__ctplWidgetRegistry;
};

const ApplyWidget = ({ formId = DEFAULT_FORM_ID }) => {
  const initializedId = useRef(null);

  useEffect(() => {
    if (initializedId.current === formId) return;
    initializedId.current = formId;

    const init = () => {
      const container = document.getElementById(CTPL_CONTAINER_ID);
      if (!container || typeof window.ctplTag !== "function") return;

      const registry = getRegistry();
      const registryKey = `${CTPL_CONTAINER_ID}:${formId}`;

      if (registry[registryKey]) return;

      registry[registryKey] = true;
      window.ctplTag(formId);
    };

    // Script already loaded and ready
    if (typeof window.ctplTag === "function") {
      init();
    } else {
      // Wait for the static script in index.html to finish loading
      const poll = setInterval(() => {
        if (typeof window.ctplTag === "function") {
          clearInterval(poll);
          init();
        }
      }, 100);
      setTimeout(() => clearInterval(poll), 10000);
    }
  }, [formId]);

  return <div id={CTPL_CONTAINER_ID} form-id={formId} className="w-full" />;
};

export default ApplyWidget;
