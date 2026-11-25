"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaTimes } from "@/components/icons";
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
  // The form sends several messages per submission and they can arrive before React re-renders, so whether the
  // brochure went out is kept in a ref: one download each time the form is opened.
  const downloaded = useRef(false);
  const brochureUrl = payload?.brochureUrl;
  const brochureName = payload?.brochureName;
  const hasBrochure = Boolean(brochureUrl);

  const brochurePrompt = useMemo(() => {
    if (!payload?.programLabel) return "Submit the form to unlock your brochure download.";
    return `Submit the form to unlock ${payload.programLabel} brochure download.`;
  }, [payload?.programLabel]);

  const downloadBrochure = useCallback(() => {
    if (!brochureUrl || downloaded.current) return;
    downloaded.current = true;
    triggerBrowserDownload(brochureUrl, brochureName);
    setHasDownloaded(true);
  }, [brochureUrl, brochureName]);

  useEffect(() => {
    if (!open) return;
    downloaded.current = false;
    setHasDownloaded(false);
  }, [open, brochureUrl]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const onMessage = (event: MessageEvent) => {
      const message = normalizeMessage(event.data);
      const looksLikeSubmit =
        message.includes("submit") ||
        message.includes("thank") ||
        message.includes("success") ||
        message.includes("lead");

      if (looksLikeSubmit) downloadBrochure();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      document.body.style.overflow = "";
    };
  }, [open, onClose, downloadBrochure]);

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
