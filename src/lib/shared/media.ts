export const resolveAssetSrc = (asset: unknown): string => {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  if (typeof asset === "object" && asset !== null && "src" in (asset as Record<string, unknown>)) {
    const src = (asset as { src?: unknown }).src;
    return typeof src === "string" ? src : "";
  }
  return "";
};
