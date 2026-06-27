import {
  INDEXABLE_SEO_PAGES,
  ROUTABLE_SEO_PAGES,
  getSeoPageByRoute,
  getSeoPagesByRouteGroup,
} from "../../data/seo-pages";

export const ALL_ISOLATED_SEO_ROUTES = ROUTABLE_SEO_PAGES.map((page) => page.path);

export const INDEXABLE_ISOLATED_SEO_ROUTES = INDEXABLE_SEO_PAGES.map((page) => page.path);

export const getSeoPage = getSeoPageByRoute;
export const getSeoStaticParams = (routeGroup: Parameters<typeof getSeoPagesByRouteGroup>[0]) =>
  getSeoPagesByRouteGroup(routeGroup)
    .filter((page) => page.slug !== "index")
    .map((page) => ({ slug: page.slug }));
