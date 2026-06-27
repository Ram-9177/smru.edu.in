export const REMOVED_PARTNER_PAGE_SLUGS = new Set([
  "ift",
  "iist",
  "kpmg",
  "microsoft",
  "nextgen",
]);

export const isRemovedPartnerPageSlug = (slug?: string | null) =>
  REMOVED_PARTNER_PAGE_SLUGS.has(String(slug || "").trim().toLowerCase());
