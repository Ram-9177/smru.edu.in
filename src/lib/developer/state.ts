import type {
  CmsCollectionKey,
  CmsEntityBase,
  DeveloperCMSOverlay,
  DeveloperCMSState,
} from "@/types/developer";

const STORAGE_KEY = "smru_developer_cms_overlay_v1";

type CollectionKey = CmsCollectionKey;

const COLLECTIONS: CollectionKey[] = [
  "routes",
  "schools",
  "departments",
  "programs",
  "courseCodes",
  "partners",
  "partnerLinks",
  "pages",
];

function mergeCollection<T extends CmsEntityBase>(base: T[], patch: Partial<T>[] | undefined): T[] {
  if (!patch?.length) return base;

  const byId = new Map(base.map((item) => [item.id, item]));
  patch.forEach((partial) => {
    if (!partial?.id) return;
    const existing = byId.get(partial.id);
    if (existing) {
      byId.set(partial.id, { ...existing, ...partial });
      return;
    }
    byId.set(partial.id, partial as T);
  });

  return Array.from(byId.values());
}

export function getEffectiveState(seed: DeveloperCMSState, overlay: DeveloperCMSOverlay): DeveloperCMSState {
  const deleted = overlay.deleted || {};
  const applyDeletes = <T extends CmsEntityBase>(items: T[], key: CollectionKey) => {
    const ids = new Set(deleted[key] || []);
    if (!ids.size) return items;
    return items.filter((item) => !ids.has(item.id));
  };

  return {
    metadata: {
      sourceVersion: seed.metadata.sourceVersion,
      lastUpdated: new Date().toISOString(),
    },
    routes: applyDeletes(mergeCollection(seed.routes, overlay.routes), "routes"),
    schools: applyDeletes(mergeCollection(seed.schools, overlay.schools), "schools"),
    departments: applyDeletes(mergeCollection(seed.departments, overlay.departments), "departments"),
    programs: applyDeletes(mergeCollection(seed.programs, overlay.programs), "programs"),
    courseCodes: applyDeletes(mergeCollection(seed.courseCodes, overlay.courseCodes), "courseCodes"),
    partners: applyDeletes(mergeCollection(seed.partners, overlay.partners), "partners"),
    partnerLinks: applyDeletes(mergeCollection(seed.partnerLinks, overlay.partnerLinks), "partnerLinks"),
    pages: applyDeletes(mergeCollection(seed.pages, overlay.pages), "pages"),
  };
}

export function loadOverlayState(): DeveloperCMSOverlay {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as DeveloperCMSOverlay;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveOverlayState(patch: DeveloperCMSOverlay): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(patch));
  } catch {
    // ignore write errors
  }
}

export function clearOverlayState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function upsertOverlayCollection<T extends CmsEntityBase>(
  overlay: DeveloperCMSOverlay,
  key: CollectionKey,
  item: T
): DeveloperCMSOverlay {
  const current = ((overlay[key] || []) as Partial<T>[]).filter(Boolean);
  const idx = current.findIndex((entry) => entry.id === item.id);
  const updated = [...current];

  if (idx === -1) {
    updated.push(item);
  } else {
    updated[idx] = { ...updated[idx], ...item };
  }

  return {
    ...overlay,
    deleted: {
      ...(overlay.deleted || {}),
      [key]: ((overlay.deleted?.[key] || []) as string[]).filter((id) => id !== item.id),
    },
    [key]: updated,
  };
}

export function deleteOverlayEntity(
  overlay: DeveloperCMSOverlay,
  key: CollectionKey,
  id: string
): DeveloperCMSOverlay {
  const current = (overlay[key] || []) as Partial<CmsEntityBase>[];
  const nextCollection = current.filter((entry) => entry?.id !== id);
  const deletedIds = new Set((overlay.deleted?.[key] || []) as string[]);
  deletedIds.add(id);

  return {
    ...overlay,
    [key]: nextCollection,
    deleted: {
      ...(overlay.deleted || {}),
      [key]: Array.from(deletedIds),
    },
  };
}

export function normalizeOverlay(overlay: DeveloperCMSOverlay): DeveloperCMSOverlay {
  const normalized: DeveloperCMSOverlay = {};
  COLLECTIONS.forEach((key) => {
    const items = overlay[key];
    if (Array.isArray(items) && items.length > 0) {
      (normalized as any)[key] = items;
    }
  });
  if (overlay.deleted && typeof overlay.deleted === "object") {
    const cleaned: Record<string, string[]> = {};
    Object.entries(overlay.deleted).forEach(([key, ids]) => {
      if (Array.isArray(ids) && ids.length > 0) cleaned[key] = ids.filter(Boolean);
    });
    if (Object.keys(cleaned).length > 0) {
      normalized.deleted = cleaned as DeveloperCMSOverlay["deleted"];
    }
  }
  return normalized;
}
