"use client";
import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { isMerittoLandingPath, resolveApplyLink } from "@/lib/shared/site-constants";

export type MerittoModalPayload = {
  brochureUrl?: string;
  brochureName?: string;
  programLabel?: string;
};

type ApplyModalContextValue = {
  showApplyModal: boolean;
  openApplyModal: () => void;
  closeApplyModal: () => void;
  showMerittoModal?: boolean;
  openMerittoModal?: (payload?: MerittoModalPayload) => void;
  closeMerittoModal?: () => void;
  merittoModalPayload?: MerittoModalPayload | null;
};

export const ApplyModalContext = createContext<ApplyModalContextValue | null>(null);

export const useOpenApply = (defaultTarget = "auto") => {
  const context = useContext(ApplyModalContext);
  const pathname = usePathname() || "";

  return (nextTarget) => {
    if (isMerittoLandingPath(pathname) && context?.openMerittoModal) {
      context.openMerittoModal();
      return;
    }

    const target = typeof nextTarget === "string" ? nextTarget : defaultTarget;
    window.location.href = resolveApplyLink({ pathname, target });
  };
};

export const useApplyModal = () => {
  const context = useContext(ApplyModalContext);
  if (!context) {
    return {
      showApplyModal: false,
      openApplyModal: () => {},
      closeApplyModal: () => {},
      openMerittoModal: () => {},
      closeMerittoModal: () => {},
      merittoModalPayload: null,
    };
  }
  return context;
};
