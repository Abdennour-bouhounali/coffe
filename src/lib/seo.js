import { siteConfig } from "../data/site";

export const buildTitle = (title) =>
  title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — Café & brunch à Paris`;

export const buildCanonicalUrl = (pathname = "/") =>
  new URL(pathname, siteConfig.url).toString();

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phoneHref,
  email: siteConfig.email,
  servesCuisine: ["Brunch", "Café de spécialité"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postcode,
    addressLocality: siteConfig.address.city,
    addressCountry: "FR",
  },
};
