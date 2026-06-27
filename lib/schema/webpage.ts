const baseUrl = "https://smru.edu.in";

export const absoluteSeoUrl = (path: string) => {
  const url = new URL(path || "/", baseUrl);
  if (!/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
};

export const buildWebPageSchema = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteSeoUrl(path)}#webpage`,
  name: title,
  description,
  url: absoluteSeoUrl(path),
  isPartOf: { "@id": `${baseUrl}/#website` },
  about: { "@id": `${baseUrl}/#organization` },
  inLanguage: "en-IN",
});
