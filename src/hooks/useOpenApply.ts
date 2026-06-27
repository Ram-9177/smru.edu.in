"use client";
import { usePathname } from "next/navigation";
import { useApplyModal } from "@/context/ApplyModalContext";
import { isMerittoLandingPath, resolveApplyLink } from "@/lib/shared/site-constants";

export default function useOpenApply(defaultTarget = "auto") {
  const pathname = usePathname() || "";
  const { openMerittoModal } = useApplyModal();

  return (nextTarget) => {
    if (isMerittoLandingPath(pathname)) {
      openMerittoModal();
      return;
    }

    const target = typeof nextTarget === "string" ? nextTarget : defaultTarget;
    window.location.href = resolveApplyLink({ pathname, target });
  };
}
