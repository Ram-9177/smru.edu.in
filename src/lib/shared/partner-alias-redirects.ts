export const PARTNER_ALIAS_REDIRECTS: Record<string, string> = {
  blackbucks: "/partner/bb",
  "qtst-smru": "/partner/qtst",
  university: "/partner",
  bytexl: "/partner/bytexl",
  edinbox: "/partner/edinbox",
  edridge: "/partner/edridge",
  emversity: "/partner/emversity",
  mjiollnir: "/partner",
  nst: "/partner/nst",
  onnbikes: "/partner",
  skilgen: "/partner/skilgen",
  "skilgen-tech": "/partner/skilgen",
  skilgentech: "/partner/skilgen",
  veloces: "/partner/veloces",
  carebridge: "/carebridge",
};

export const getPartnerAliasRedirect = (alias: string) => PARTNER_ALIAS_REDIRECTS[alias] ?? "/partner";
