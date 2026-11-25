import { EDU_PARTNERS } from "@/data/edu-partners";
import type { Partner } from "@/types/developer";

// The built-in partners as the CMS stores them. Kept apart from seed.ts, which needs the whole course catalogue.
export const HIDDEN_PARTNER_CODES = new Set(["ST. MARY'S UNIVERSITY", "ST.MARY'S UNIVERSITY", "KPMG", "MICROSOFT", "IIAT"]);

export const normalizePath = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
};

export const seedPartnerId = (partner: { code?: string }) => `partner-${(partner.code || "unknown").toLowerCase()}`;

export const SEED_PARTNERS: Partner[] = Object.values(EDU_PARTNERS).map((partner: any) => {
  const isHidden = HIDDEN_PARTNER_CODES.has((partner.code || "").toUpperCase());
  return {
    id: seedPartnerId(partner),
    slug: String(partner.landingUrl || "").startsWith("/")
      ? partner.landingUrl.replace(/^\//, "")
      : (partner.code || "").toLowerCase(),
    name: partner.name,
    redirectUrl: normalizePath(partner.landingUrl),
    iframeUrl: partner.iframeUrl || "",
    embedCode: partner.embedCode || "",
    logo: partner.logo || "",
    visibility: isHidden ? "hidden" : "public",
    status: isHidden ? "archived" : "live",
    partnerType: "edutech",
    shortDescription: "Partner-linked education program pathway",
    website: "",
    openInNewTab: false,
  };
});
