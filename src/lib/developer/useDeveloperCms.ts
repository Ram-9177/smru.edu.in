"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeCompleteness, findMissingContent } from "@/lib/developer/completeness";
import { validateRedirects } from "@/lib/developer/redirects";
import { deleteOverlayEntity, getEffectiveState, saveOverlayState, upsertOverlayCollection } from "@/lib/developer/state";
import { useCmsState, type CmsStateOptions } from "@/lib/developer/useCmsState";
import type { CmsEntityBase, DeveloperCMSState } from "@/types/developer";

// The local CMS dashboard: what the public pages read (useCmsState) plus editing, checks and export.
type UseDeveloperCmsOptions = CmsStateOptions & {
  autoPublishOnMutate?: boolean;
};

const DOWNLOAD_FILENAME = "cms-data.json";

const downloadStateJson = (state: DeveloperCMSState) => {
  const payload: DeveloperCMSState = {
    ...state,
    metadata: {
      ...state.metadata,
      lastUpdated: new Date().toISOString(),
    },
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = DOWNLOAD_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export function useDeveloperCms(options: UseDeveloperCmsOptions = {}) {
  const useOverlay = options.useOverlay === true;
  const autoPublishOnMutate = options.autoPublishOnMutate === true;

  const { state, baseState, overlay, setOverlay, liveSource } = useCmsState(options);
  const [publishNotice, setPublishNotice] = useState<string>("");
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const baseRef = useRef<DeveloperCMSState>(baseState);
  const publishTimerRef = useRef<number | null>(null);
  const pendingPublishRef = useRef<DeveloperCMSState | null>(null);

  useEffect(() => {
    baseRef.current = baseState;
  }, [baseState]);

  useEffect(() => {
    return () => {
      if (publishTimerRef.current) window.clearTimeout(publishTimerRef.current);
    };
  }, []);

  const queuePublish = (nextState: DeveloperCMSState) => {
    if (!autoPublishOnMutate) return;
    pendingPublishRef.current = nextState;
    if (publishTimerRef.current) window.clearTimeout(publishTimerRef.current);
    publishTimerRef.current = window.setTimeout(() => {
      if (!pendingPublishRef.current) return;
      downloadStateJson(pendingPublishRef.current);
      setPublishNotice(`Downloaded ${DOWNLOAD_FILENAME}. Upload it to FTP at /cms-data.json to publish live.`);
      pendingPublishRef.current = null;
      publishTimerRef.current = null;
    }, 450);
  };

  const exportState = () => {
    const nextState = getEffectiveState(baseRef.current, useOverlay ? overlay : {});
    downloadStateJson(nextState);
    setPublishNotice(`Downloaded ${DOWNLOAD_FILENAME}. Upload it to FTP at /cms-data.json to publish live.`);
    setHasPendingChanges(false);
  };

  const livePublishedAt = liveSource === "live-json" ? baseState.metadata?.lastUpdated || "" : "";
  const completeness = useMemo(() => computeCompleteness(state), [state]);
  const missing = useMemo(() => findMissingContent(state), [state]);
  const redirects = useMemo(() => validateRedirects(state), [state]);

  const updateEntity = <T extends CmsEntityBase>(
    key: "routes" | "schools" | "departments" | "programs" | "courseCodes" | "partners" | "partnerLinks" | "pages",
    item: T
  ) => {
    if (!useOverlay) return;
    setOverlay((current) => {
      const next = upsertOverlayCollection(current, key, item);
      saveOverlayState(next);
      setHasPendingChanges(true);
      queuePublish(getEffectiveState(baseRef.current, next));
      return next;
    });
  };

  const deleteEntity = (
    key: "routes" | "schools" | "departments" | "programs" | "courseCodes" | "partners" | "partnerLinks" | "pages",
    id: string
  ) => {
    if (!useOverlay) return;
    setOverlay((current) => {
      const next = deleteOverlayEntity(current, key, id);
      saveOverlayState(next);
      setHasPendingChanges(true);
      queuePublish(getEffectiveState(baseRef.current, next));
      return next;
    });
  };

  return {
    state,
    overlay,
    liveSource,
    livePublishedAt,
    publishNotice,
    hasPendingChanges,
    completeness,
    missing,
    redirects,
    updateEntity,
    deleteEntity,
    exportState,
    clearPublishNotice: () => setPublishNotice(""),
  };
}
