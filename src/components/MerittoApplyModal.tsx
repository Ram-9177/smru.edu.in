"use client";

import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import MerittoWidget from "./MerittoWidget";
import type { MerittoModalPayload } from "@/context/ApplyModalContext";

type MerittoApplyModalProps = {
  open: boolean;
  onClose: () => void;
  payload?: MerittoModalPayload | null;
};

const normalizeMessage = (value: unknown) => {
  if (typeof value === "string") return value.toLowerCase();
  if (typeof value === "object" && value !== null) return JSON.stringify(value).toLowerCase();
  return "";
};

const triggerBrowserDownload = (brochureUrl: string, brochureName?: string) => {
  const link = document.createElement("a");
  link.href = brochureUrl;
  if (brochureName) {
    link.download = brochureName;
  }
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default function MerittoApplyModal({ open, onClose, payload }: MerittoApplyModalProps) {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const hasBrochure = Boolean(payload?.brochureUrl);

  const brochurePrompt = useMemo(() => {
    if (!payload?.programLabel) return "Submit the form to unlock your brochure download.";
    return `Submit the form to unlock ${payload.programLabel} brochure download.`;
  }, [payload?.programLabel]);

  const downloadBrochure = () => {
    if (!payload?.brochureUrl || hasDownloaded) return;
    triggerBrowserDownload(payload.brochureUrl, payload.brochureName);
    setHasDownloaded(true);
  };

  useEffect(() => {
    if (!open) return;

    setHasDownloaded(false);
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const onMessage = (event: MessageEvent) => {
      if (!hasBrochure || hasDownloaded) return;

      const message = normalizeMessage(event.data);
      const looksLikeSubmit =
        message.includes("submit") ||
        message.includes("submitted") ||
        message.includes("thank") ||
        message.includes("success") ||
        message.includes("lead");

      if (looksLikeSubmit) {
        downloadBrochure();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      document.body.style.overflow = "";
    };
  }, [open, onClose, hasBrochure, hasDownloaded]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[4200] overflow-y-auto bg-black/55 p-3 backdrop-blur-[2px] sm:p-6" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center">
        <div
          className="relative w-full max-w-2xl bg-white p-4 shadow-2xl sm:p-6"
          style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))" }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-[#0d315c] text-white transition-colors hover:bg-[#c43342]"
            aria-label="Close application form"
          >
            <FaTimes size={14} />
          </button>
          <div className="pt-10">
            {hasBrochure && (
              <div className="mb-4 border border-[#dbe8f8] bg-[#f8fbff] p-3 text-xs font-semibold leading-5 text-[#0d315c]">
                <p>{brochurePrompt}</p>
                <button
                  type="button"
                  onClick={downloadBrochure}
                  disabled={hasDownloaded}
                  className="mt-3 inline-flex items-center gap-2 border border-[#0d315c]/20 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0d315c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {hasDownloaded ? "Brochure Downloaded" : "Download Brochure"}
                </button>
              </div>
            )}
            <MerittoWidget className="min-h-[400px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
