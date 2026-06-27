import type { SeoPage } from "../../data/seo-pages";
import SeoPageTemplate from "./SeoPageTemplate";

export default function GuidePageTemplate({ page }: { page: SeoPage }) {
  return <SeoPageTemplate page={page} />;
}
