export const siteConfig = {
  name: "Maison Saha",
  shortName: "Saha",
  description:
    "Café de spécialité, brunchs solaires et douceur de vivre à Paris.",
  url: import.meta.env.VITE_SITE_URL || "https://www.maisonsaha.fr",
  email: "bonjour@maisonsaha.fr",
  phoneDisplay: "01 84 80 20 24",
  phoneHref: "+33184802024",
  address: {
    street: "24 rue du Faubourg",
    postcode: "75010",
    city: "Paris",
    district: "Paris 10e",
    metro: "Strasbourg–Saint-Denis",
  },
  mapsUrl:
    import.meta.env.VITE_MAPS_URL ||
    "https://maps.google.com/?q=24+rue+du+Faubourg+75010+Paris",
  instagramUrl:
    import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/",
  instagramHandle: "@maisonsaha",
  hours: [
    { days: "Lundi — vendredi", hours: "8h30 — 18h00" },
    { days: "Samedi — dimanche", hours: "9h00 — 18h30" },
  ],
};

export const mainNavigation = [
  { label: "Accueil", to: "/" },
  { label: "Concept", to: "/concept" },
  { label: "Menu", to: "/menu", featured: true },
  { label: "Galerie", to: "/galerie" },
  { label: "Nous trouver", to: "/nous-trouver" },
  { label: "Contact", to: "/contact" },
];

export const footerNavigation = [
  {
    title: "Explorer",
    links: mainNavigation.slice(1),
  },
  {
    title: "À savourer",
    links: [
      { label: "Brunch all day", to: "/menu?collection=brunch" },
      { label: "Matcha", to: "/menu?collection=drinks&category=matcha" },
      { label: "Café", to: "/menu?collection=drinks&category=coffee" },
      { label: "Best sellers", to: "/menu?badge=popular" },
    ],
  },
];
