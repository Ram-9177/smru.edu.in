"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import MandatoryAttendanceNotice from "./MandatoryAttendanceNotice";

/**
 * A compact "Important notice" call-out for the MPT and MOT programme pages. The full attendance
 * notice (unchanged) opens in a dialog on click, instead of occupying the top of the page.
 * The notice text is still in the document for crawlers: the dialog content is rendered only while
 * open, so the button carries a short summary line that names the subject.
 */
export default function MandatoryAttendanceNoticeButton() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  // The dialog is portalled to <body>: inside <main> it sits below the fixed header's stacking
  // context whatever its z-index, and the hero paints over it.
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => setPortalTarget(document.body), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-r from-[#fffaf0] to-white p-4 shadow-[0_8px_24px_rgba(217,119,6,0.10)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-500/15 text-amber-600 shadow-sm">
            <FaExclamationTriangle className="text-lg" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-900">Caution / Important Notice</p>
            <p className="mt-0.5 text-sm font-bold text-[#0d315c] sm:text-[15px]">
              Mandatory attendance for students admitted to the MPT and MOT programmes
            </p>
          </div>
        </div>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="cut-corner-badge inline-flex shrink-0 items-center justify-center gap-2 bg-[#0d315c] px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          <FaExclamationTriangle aria-hidden="true" />
          Read the notice
        </button>
      </div>

      {open && portalTarget && createPortal(
        <div
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-[#0d315c]/70 p-3 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-notice-heading"
            className="relative w-full max-w-4xl max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-3rem)]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close notice"
              className="absolute -top-3 -right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-400 bg-white text-[#0d315c] shadow-lg transition-colors hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <FaTimes aria-hidden="true" />
            </button>
            <div className="max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-2xl sm:max-h-[calc(100vh-3rem)]">
              <MandatoryAttendanceNotice />
            </div>
          </div>
        </div>,
        portalTarget
      )}
    </>
  );
}
