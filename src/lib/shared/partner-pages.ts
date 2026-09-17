export const REMOVED_PARTNER_PAGE_SLUGS = new Set([
  "ift",
  "iiat",
  "iist",
  "ist",
  "kpmg",
  "microsoft",
]);

export const isRemovedPartnerPageSlug = (slug?: string | null) =>
  REMOVED_PARTNER_PAGE_SLUGS.has(String(slug || "").trim().toLowerCase());

// Partners whose landing is an SMRU-authored top-level page rather than a /partner/{slug} shell.
// Internal links go straight there; /partner/carebridge/ is only a canonicalised alias of it.
export const TOP_LEVEL_PARTNER_LANDINGS = new Set(["/carebridge"]);

/** The href an internal link should use for a partner registry `landingUrl`. */
export const getPartnerLandingHref = (landingUrl?: string | null) => {
  const raw = String(landingUrl || "").trim();
  if (!raw) return "/partner";
  if (/^https?:\/\//i.test(raw)) return raw;
  const path = `/${raw.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  if (TOP_LEVEL_PARTNER_LANDINGS.has(path)) return path;
  const slug = path.replace(/^\/partner\//, "").replace(/^\//, "");
  return slug ? `/partner/${slug}` : "/partner";
};
