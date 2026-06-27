export const PARTNER_ALIAS_REDIRECTS: Record<string, string> = {
  blackbucks: "/bb",
  "qtst-smru": "/qtst",
  university: "/iiat",
  bytexl: "/partner/bytexl",
  edinbox: "/partner/edinbox",
  edridge: "/partner/edridge",
  emversity: "/partner/emversity",
  ist: "/partners/ist/index.html",
  mjiollnir: "/partner",
  nst: "/partner/nst",
  onnbikes: "/partner",
  veloces: "/partner/veloces",
};

export const getPartnerAliasRedirect = (alias: string) => PARTNER_ALIAS_REDIRECTS[alias] ?? "/partner";
