"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeCompleteness, findMissingContent } from "@/lib/developer/completeness";
import { validateRedirects } from "@/lib/developer/redirects";
import { loadSeedState } from "@/lib/developer/seed";
import {
  getEffectiveState,
  deleteOverlayEntity,
  loadOverlayState,
  normalizeOverlay,
  saveOverlayState,
  upsertOverlayCollection,
} from "@/lib/developer/state";
import type { CmsEntityBase, DeveloperCMSOverlay, DeveloperCMSState } from "@/types/developer";

type UseDeveloperCmsOptions = {
  useOverlay?: boolean;
  autoPublishOnMutate?: boolean;
  liveJsonUrl?: string;
  allowLocalLiveFetch?: boolean;
};

const DOWNLOAD_FILENAME = "cms-data.json";
type LiveLoadResult = { state: DeveloperCMSState; source: "live-json" | "seed" };
const liveLoadCache = new Map<string, LiveLoadResult>();
const liveLoadPromises = new Map<string, Promise<LiveLoadResult>>();

const toPublishedState = (raw: unknown, seed: DeveloperCMSState): DeveloperCMSState | null => {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Partial<DeveloperCMSState>;
  const isArr = (v: unknown) => Array.isArray(v);
  if (
    !isArr(payload.routes) ||
    !isArr(payload.schools) ||
    !isArr(payload.departments) ||
    !isArr(payload.programs) ||
    !isArr(payload.partners) ||
    !isArr(payload.partnerLinks) ||
    !isArr(payload.pages)
  ) {
    return null;
  }

  return {
    metadata: {
      sourceVersion: payload.metadata?.sourceVersion || "smru-live-cms-json",
      lastUpdated: payload.metadata?.lastUpdated || new Date().toISOString(),
    },
    routes: payload.routes,
    schools: payload.schools,
    departments: payload.departments,
    programs: payload.programs,
    courseCodes: isArr(payload.courseCodes) ? payload.courseCodes : seed.courseCodes,
    partners: payload.partners,
    partnerLinks: payload.partnerLinks,
    pages: payload.pages,
  };
};

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

const withCacheBuster = (url: string) => {
  const hasQuery = url.includes("?");
  return `${url}${hasQuery ? "&" : "?"}v=${Date.now()}`;
};

const loadLiveState = async (liveJsonUrl: string, seed: DeveloperCMSState): Promise<LiveLoadResult> => {
  const cached = liveLoadCache.get(liveJsonUrl);
  if (cached) return cached;

  const pending = liveLoadPromises.get(liveJsonUrl);
  if (pending) return pending;

  const request = (async (): Promise<LiveLoadResult> => {
    try {
      const response = await fetch(withCacheBuster(liveJsonUrl), { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      const parsed = toPublishedState(json, seed);
      if (!parsed) throw new Error("Invalid cms-data.json shape");
      return { state: parsed, source: "live-json" };
    } catch {
      return { state: seed, source: "seed" };
    }
  })();

  liveLoadPromises.set(liveJsonUrl, request);
  const result = await request;
  liveLoadPromises.delete(liveJsonUrl);
  // Cache only successful live reads so transient failures can recover
  // without forcing a full page reload.
  if (result.source === "live-json") {
    liveLoadCache.set(liveJsonUrl, result);
  }
  return result;
};

export function useDeveloperCms(options: UseDeveloperCmsOptions = {}) {
  const useOverlay = options.useOverlay === true;
  const autoPublishOnMutate = options.autoPublishOnMutate === true;
  const liveJsonUrl = options.liveJsonUrl || "/cms-data.json";
  const allowLocalLiveFetch = options.allowLocalLiveFetch === true;

  const [seed] = useState<DeveloperCMSState>(() => loadSeedState());
  const [baseState, setBaseState] = useState<DeveloperCMSState>(() => loadSeedState());
  const [overlay, setOverlay] = useState<DeveloperCMSOverlay>({});
  const [liveSource, setLiveSource] = useState<"live-json" | "seed">("seed");
  const [publishNotice, setPublishNotice] = useState<string>("");
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const baseRef = useRef<DeveloperCMSState>(baseState);
  const publishTimerRef = useRef<number | null>(null);
  const pendingPublishRef = useRef<DeveloperCMSState | null>(null);

  useEffect(() => {
    baseRef.current = baseState;
  }, [baseState]);

  useEffect(() => {
    let active = true;

    const hostname = typeof window === "undefined" ? "" : window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

    if (isLocalhost && !allowLocalLiveFetch) {
      setBaseState(seed);
      setLiveSource("seed");
      return () => {
        active = false;
      };
    }

    const loadLiveJson = async () => {
      const result = await loadLiveState(liveJsonUrl, seed);
      if (!active) return;
      setBaseState(result.state);
      setLiveSource(result.source);
    };
    loadLiveJson();
    return () => {
      active = false;
    };
  }, [allowLocalLiveFetch, liveJsonUrl, seed]);

  useEffect(() => {
    if (!useOverlay) {
      setOverlay({});
      return;
    }
    const loaded = normalizeOverlay(loadOverlayState());
    setOverlay(loaded);
  }, [useOverlay]);

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

  const state = useMemo(() => getEffectiveState(baseState, useOverlay ? overlay : {}), [baseState, overlay, useOverlay]);
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
