import { absoluteSeoUrl } from "./webpage";

export const buildPlaceSchema = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${absoluteSeoUrl(path)}#place`,
  name: title,
  description,
  url: absoluteSeoUrl(path),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "508284",
    addressCountry: "IN",
  },
});
