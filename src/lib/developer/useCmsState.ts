"use client";

import { useEffect, useMemo, useState } from "react";
import { LIVE_CMS_URL, loadLiveCms } from "./live-cms";
import { loadSeedState } from "./seed";
import { getEffectiveState, loadOverlayState, normalizeOverlay } from "./state";
import type { DeveloperCMSOverlay, DeveloperCMSState } from "@/types/developer";

export type CmsStateOptions = {
  useOverlay?: boolean;
  liveJsonUrl?: string;
  allowLocalLiveFetch?: boolean;
};

// Built from the whole catalogue, so it is built once and shared. Read it, never change it.
let seedState: DeveloperCMSState | undefined;
export const getSeedState = () => (seedState ??= loadSeedState());

const NO_OVERLAY: DeveloperCMSOverlay = {};

// The content the public pages show: built-in, replaced by a published cms-data.json, then by local overlay edits.
export function useCmsState({ useOverlay = false, liveJsonUrl = LIVE_CMS_URL, allowLocalLiveFetch = false }: CmsStateOptions = {}) {
  const [baseState, setBaseState] = useState(getSeedState);
  const [liveSource, setLiveSource] = useState<"live-json" | "seed">("seed");
  const [overlay, setOverlay] = useState(NO_OVERLAY);

  useEffect(() => {
    let active = true;
    loadLiveCms({ url: liveJsonUrl, allowLocal: allowLocalLiveFetch }).then((live) => {
      if (!active || !live) return;
      setBaseState({ ...live, courseCodes: live.courseCodes ?? getSeedState().courseCodes });
      setLiveSource("live-json");
    });
    return () => {
      active = false;
    };
  }, [allowLocalLiveFetch, liveJsonUrl]);

  useEffect(() => {
    if (!useOverlay) return;
    const saved = normalizeOverlay(loadOverlayState());
    if (Object.keys(saved).length > 0) setOverlay(saved);
  }, [useOverlay]);

  const state = useMemo(
    () => (useOverlay && overlay !== NO_OVERLAY ? getEffectiveState(baseState, overlay) : baseState),
    [baseState, overlay, useOverlay],
  );

  return { state, baseState, overlay, setOverlay, liveSource };
}
