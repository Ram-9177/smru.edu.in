"use client";
import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const ENQUIRY_CTPL_FORM_ID = "d1f77bfe0d14579a3b3bc9ea65912e18d15308bc1de18afe198ae57f7cf53f14";
const CTPL_SCRIPT_SRC = "https://apply.smru.edu.in/js/ctplform.js";
const CTPL_CONTAINER_ID = "ctplform";

export default function ApplyModal({ open, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);

    const ensureScript = () => {
      const existingScript = document.querySelector(`script[src="${CTPL_SCRIPT_SRC}"]`);
      if (existingScript) return existingScript;

      const script = document.createElement("script");
      script.src = CTPL_SCRIPT_SRC;
      script.defer = true;
      script.setAttribute("data-ctplform", "true");
      document.body.appendChild(script);
      return script;
    };

    const tryInit = (attempts = 0) => {
      const el = document.getElementById(CTPL_CONTAINER_ID);
      if (el && typeof window.ctplTag === "function") {
        window.ctplTag(ENQUIRY_CTPL_FORM_ID);
      } else if (attempts < 30) {
        setTimeout(() => tryInit(attempts + 1), 100);
      }
    };

    const script = ensureScript();
    const startInit = () => setTimeout(() => tryInit(), 150);

    if (typeof window.ctplTag === "function") {
      startInit();
    } else {
      script.addEventListener("load", startInit, { once: true });
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      script.removeEventListener("load", startInit);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[4000] bg-black/50 backdrop-blur-[2px] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative min-h-screen w-full flex items-center justify-center p-3 sm:p-6 animate-[modal-in_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 sm:right-6 sm:top-6 z-50 w-10 h-10 flex items-center justify-center cut-corner-badge bg-white text-gray-600 hover:text-gray-900 transition-colors shadow-lg"
          aria-label="Close"
        >
          <FaTimes size={14} />
        </button>

        <div className="w-full max-w-2xl pt-14 sm:pt-16" ref={containerRef}>
          <div className="ctpl-popup-shell cut-corner-panel bg-white shadow-2xl overflow-hidden sm:bg-transparent sm:shadow-none">
            <div
              id={CTPL_CONTAINER_ID}
              form-id={ENQUIRY_CTPL_FORM_ID}
              className="min-h-[180px] flex items-center justify-center p-4 sm:p-0 max-h-[calc(100vh-7rem)] overflow-y-auto overflow-x-hidden"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 639px) {
          .ctpl-popup-shell,
          .ctpl-popup-shell * {
            box-sizing: border-box;
          }

          .ctpl-popup-shell #ctplform {
            width: 100%;
            justify-content: center;
            align-items: flex-start;
          }

          .ctpl-popup-shell #ctplform > * {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .ctpl-popup-shell form,
          .ctpl-popup-shell form > *,
          .ctpl-popup-shell .row,
          .ctpl-popup-shell [class*="row"],
          .ctpl-popup-shell [class*="col-"],
          .ctpl-popup-shell [style*="width"] {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .ctpl-popup-shell input,
          .ctpl-popup-shell select,
          .ctpl-popup-shell textarea,
          .ctpl-popup-shell button,
          .ctpl-popup-shell .ctpl-select,
          .ctpl-popup-shell .ctpl-select-dropdown,
          .ctpl-popup-shell .ctpl-select .current,
          .ctpl-popup-shell .ctpl-select-search-box,
          .ctpl-popup-shell .ctpl-list-cont {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
