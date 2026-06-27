import { absoluteSeoUrl } from "./webpage";

export const buildArticleSchema = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${absoluteSeoUrl(path)}#article`,
  headline: title,
  description,
  url: absoluteSeoUrl(path),
  author: { "@id": "https://smru.edu.in/#organization" },
  publisher: { "@id": "https://smru.edu.in/#organization" },
  inLanguage: "en-IN",
});
