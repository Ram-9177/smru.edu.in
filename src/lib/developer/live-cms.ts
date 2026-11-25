import type { DeveloperCMSState } from "@/types/developer";

// cms-data.json is the file that publishes content from the local CMS. The deployed file is normally a placeholder,
// and this runs on every page, so this module imports no content: it only fetches the file and checks its shape.
export const LIVE_CMS_URL = "/cms-data.json";

// courseCodes is optional in a published file; readers fall back to the built-in register.
export type LiveCmsState = Omit<DeveloperCMSState, "courseCodes"> & Partial<Pick<DeveloperCMSState, "courseCodes">>;

const loads = new Map<string, Promise<LiveCmsState | null>>();

function readPublished(raw: unknown): LiveCmsState | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Partial<DeveloperCMSState>;
  const { routes, schools, departments, programs, partners, partnerLinks, pages, courseCodes } = payload;
  if (![routes, schools, departments, programs, partners, partnerLinks, pages].every(Array.isArray)) return null;
  return {
    metadata: {
      sourceVersion: payload.metadata?.sourceVersion || "smru-live-cms-json",
      lastUpdated: payload.metadata?.lastUpdated || new Date().toISOString(),
    },
    routes: routes!,
    schools: schools!,
    departments: departments!,
    programs: programs!,
    partners: partners!,
    partnerLinks: partnerLinks!,
    pages: pages!,
    ...(Array.isArray(courseCodes) ? { courseCodes } : {}),
  };
}

// Resolves to null when nothing is published. The answer is kept for the life of the page; a failed request is not,
// so the next caller tries again. "no-cache" asks the server whether the file changed and reuses it when it did not.
export function loadLiveCms({ url = LIVE_CMS_URL, allowLocal = false } = {}): Promise<LiveCmsState | null> {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocal && !allowLocal) return Promise.resolve(null);

  const known = loads.get(url);
  if (known) return known;

  const load = fetch(url, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(readPublished)
    .catch(() => {
      loads.delete(url);
      return null;
    });
  loads.set(url, load);
  return load;
}
