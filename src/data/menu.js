const brunchCategoryDefinitions = [
  {
    id: "eggs-on-fire",
    label: "Eggs on Fire",
    description: "Les assiettes signatures qui donnent le ton dès la première bouchée.",
    collection: "brunch",
  },
  {
    id: "hot-sandwiches",
    label: "Sandwichs chauds",
    description: "Des textures fondantes, croustillantes et ultra-réconfortantes.",
    collection: "brunch",
  },
  {
    id: "breakfast-pancakes",
    label: "Pancakes brunch",
    description: "Le brunch version moelleuse, salée et généreuse.",
    collection: "brunch",
  },
  {
    id: "avocado-lovers",
    label: "Avocat & œufs",
    description: "Des recettes fraîches, crémeuses et très café parisien.",
    collection: "brunch",
  },
  {
    id: "sweet-stacks",
    label: "Pancakes & French toast",
    description: "La parenthèse sucrée à partager avec un second café.",
    collection: "brunch",
  },
  {
    id: "bowls-pastries",
    label: "Bowls & comptoir",
    description: "Le côté frais et les douceurs maison qui complètent la table.",
    collection: "brunch",
  },
];

const drinksCategoryDefinitions = [
  {
    id: "matcha",
    label: "Matcha",
    description: "Des matchas crémeux, glacés ou pralinés, pensés comme des signatures.",
    collection: "drinks",
  },
  {
    id: "coffee",
    label: "Café",
    description: "L’essentiel du specialty coffee, net et parfaitement exécuté.",
    collection: "drinks",
  },
  {
    id: "cold",
    label: "Boissons fraîches",
    description: "Jus pressés, recettes maison et fraîcheur immédiate.",
    collection: "drinks",
  },
  {
    id: "fancy-latte",
    label: "Lattes créatifs",
    description: "Des boissons d’auteur entre café, réconfort et gourmandise.",
    collection: "drinks",
  },
  {
    id: "not-coffee",
    label: "Sans café",
    description: "Des boissons chaudes enveloppantes, sans espresso.",
    collection: "drinks",
  },
  {
    id: "smoothies",
    label: "Smoothies",
    description: "Des textures denses, fruitées et très lifestyle.",
    collection: "drinks",
  },
];

export const menuCollections = [
  {
    id: "all",
    label: "Tout le menu",
    eyebrow: "Carte digitale",
    description: "Du brunch all day aux boissons maison, en une seule expérience.",
  },
  {
    id: "brunch",
    label: "Brunch all day",
    eyebrow: "Brunch",
    description: "Les assiettes qui font rester un peu plus longtemps.",
  },
  {
    id: "drinks",
    label: "Boissons all day",
    eyebrow: "Boissons",
    description: "Matcha, café et créations maison à commander au rythme de la journée.",
  },
];

export const menuBadgeFilters = [
  { id: "all", label: "Tous les produits" },
  { id: "popular", label: "Les plus aimés" },
  { id: "vegetarian", label: "Végétariens" },
  { id: "new", label: "Nouveautés" },
];

export const menuBadgeMap = {
  popular: {
    label: "Populaire",
    accent: "bg-terracotta text-cream border-terracotta/30",
  },
  vegetarian: {
    label: "Végétarien",
    accent: "bg-pistachio/18 text-ink border-pistachio/30",
  },
  new: {
    label: "Nouveau",
    accent: "bg-saffron/30 text-ink border-saffron/40",
  },
};

export const menuCategoryDefinitions = [
  ...brunchCategoryDefinitions,
  ...drinksCategoryDefinitions,
];

export const menuProducts = [
  {
    id: "egg-benedict",
    name: "Egg Benedict",
    price: 16.5,
    description:
      "English muffin, cheddar fondu, dip de poivrons rouges, avocat tranché, 2 œufs mollets, spicy hollandaise, poivrons, pousses, grenade et cébette. Au choix : bacon de bœuf halal, halloumi ou saumon fumé (+1 €).",
    collection: "brunch",
    categoryId: "eggs-on-fire",
    badges: ["popular"],
    featured: true,
    tone: "terracotta",
    image: "/images/saha-benedict.png",
  },
  {
    id: "energy-plate",
    name: "Energy Plate",
    price: 16.5,
    description:
      "Pain aux céréales et au levain bio toasté, 2 œufs au plat, halloumi grillé, avocat tranché, houmous de betteraves maison, tomates cerise, pousses et sésame. Bacon de bœuf halal ou saumon fumé (+1 €), pain sans gluten Les Copains (+2 €).",
    collection: "brunch",
    categoryId: "eggs-on-fire",
    badges: ["vegetarian"],
    tone: "pistachio",
    image: "/images/energy-plate.png",
  },
  {
    id: "egg-burger",
    name: "Egg Burger",
    price: 16,
    description:
      "Bun brioché au charbon actif, dip de poivrons rouges, cheddar fondu, avocat, 2 œufs au plat, pickles d’oignons rouges et cébette. Au choix : bacon de bœuf halal, halloumi ou saumon fumé (+1 €).",
    collection: "brunch",
    categoryId: "eggs-on-fire",
    tone: "coffee",
    image: "/images/egg-burger.png",
  },
  {
    id: "grilled-cheese",
    name: "Grilled Cheese",
    price: 16,
    description:
      "Sandwich chaud au pain toasté, cheddar, gouda au cumin, échalotes caramélisées, spicy mayo maison et grana padano. Encore meilleur avec bacon de bœuf halal (+3,5 €).",
    collection: "brunch",
    categoryId: "hot-sandwiches",
    badges: ["popular", "vegetarian"],
    featured: true,
    tone: "saffron",
    image: "/images/grilled-cheese.png",
  },
  {
    id: "tuna-melt-grilled-cheese",
    name: "Tuna Melt Grilled Cheese",
    price: 16.5,
    description:
      "Sandwich chaud au pain toasté, dip de thon, spicy mayo, cheddar, cornichons aigres-doux et grana padano.",
    collection: "brunch",
    categoryId: "hot-sandwiches",
    badges: ["new"],
    tone: "apricot",
    image: "/images/tuna-melt.png",
  },
  {
    id: "bacon-pancakes",
    name: "Bacon Pancakes",
    price: 15,
    description:
      "Pancakes moelleux, 2 œufs au plat, ciboulette, pousses, bacon de bœuf croustillant et sirop d’érable.",
    collection: "brunch",
    categoryId: "breakfast-pancakes",
    badges: ["popular"],
    featured: true,
    tone: "coffee",
    image: "/images/all-day-brunch.png",
  },
  {
    id: "salmon-pancakes",
    name: "Salmon Pancakes",
    price: 17,
    description:
      "Pancakes moelleux, 2 œufs au plat, avocat tranché, saumon fumé, grenade, cébette, pousses et graines de sésame, servis avec du sirop d’érable.",
    collection: "brunch",
    categoryId: "breakfast-pancakes",
    tone: "terracotta",
    image: "/images/salmon-pancakes.png",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    price: 16.5,
    description:
      "Pain aux céréales et au levain bio toasté, cream cheese, huile pimentée, avocat tranché, feta, grenade, œuf mollet, pickles d’oignons rouges, sésame, cébette et herbes fraîches. Pain sans gluten Les Copains (+2 €).",
    collection: "brunch",
    categoryId: "avocado-lovers",
    badges: ["vegetarian"],
    featured: true,
    tone: "pistachio",
    image: "/images/avocado-toast.png",
  },
  {
    id: "avocado-croissant",
    name: "Avocado Croissant",
    price: 16.5,
    description:
      "Croissant toasté, écrasé d’avocat épicé, 2 œufs mollets, pickles d’oignons rouges, herbes fraîches, sésame et grana padano.",
    collection: "brunch",
    categoryId: "avocado-lovers",
    badges: ["vegetarian", "new"],
    tone: "cream",
    image: "/images/avocado-croissant.png",
  },
  {
    id: "baklava-pistachio-berries",
    name: "Baklava Pistachio Berries",
    price: 15,
    description:
      "Pancakes ou pain perdu avec mascarpone pistache, praliné pistache, fruits rouges, brisures de baklava, pistaches, pétales de rose et sirop d’érable.",
    collection: "brunch",
    categoryId: "sweet-stacks",
    badges: ["popular", "vegetarian"],
    featured: true,
    tone: "saffron",
    image: "/images/baklava-pistachio-berries.png",
  },
  {
    id: "choco-ban-amlou",
    name: "Choco Ban'Amlou",
    price: 15,
    description:
      "Pancakes ou pain perdu avec mascarpone amande, praliné amande, bananes, pépites de chocolat au lait, amandes caramélisées et sirop d’érable.",
    collection: "brunch",
    categoryId: "sweet-stacks",
    badges: ["vegetarian"],
    tone: "apricot",
    image: "/images/choco-banamlou.png",
  },
  {
    id: "granola-bowl",
    name: "Granola Bowl",
    price: 13,
    description:
      "Granola nuts maison, yaourt grec aux épices, purée d’amande, kiwi, framboises, mûres, banane, dattes, pistache et miel.",
    collection: "brunch",
    categoryId: "bowls-pastries",
    badges: ["vegetarian"],
    tone: "pistachio",
    image: "/images/granola-bowl.png",
  },
  {
    id: "cozy-granola",
    name: "Cozy Granola",
    price: 14,
    description: "Un granola ultra gourmand aux éclats de chocolat, noisettes torréfiées et yaourt infusé à la vanille.",
    collection: "brunch",
    categoryId: "bowls-pastries",
    badges: ["new"],
    tone: "apricot",
    image: "/images/cozy-granola.png",
  },
  {
    id: "cinnamon-rolls",
    name: "Cinnamon Rolls",
    price: 6.5,
    description: "Roulés à la cannelle fondants, servis tièdes avec un glaçage au cream cheese.",
    collection: "brunch",
    categoryId: "bowls-pastries",
    tone: "cream",
    image: "/images/cinnamon-rolls.png",
  },
  {
    id: "cookies",
    name: "Cookies Maison",
    price: 4.5,
    description: "Cookies ultra moelleux aux pépites de chocolat et pointe de sel de mer.",
    collection: "brunch",
    categoryId: "bowls-pastries",
    tone: "coffee",
    image: "/images/cookies.png",
  },
  {
    id: "iced-mango-matcha",
    name: "Iced Mango Matcha",
    price: 7.5,
    description: "Matcha, purée de mangue et lait.",
    collection: "drinks",
    categoryId: "matcha",
    featured: true,
    tone: "saffron",
    image: "/images/iced-mango-matcha.png",
  },
  {
    id: "iced-strawberry-matcha",
    name: "Iced Strawberry Matcha",
    price: 7.5,
    description: "Matcha, purée de fraise et lait.",
    collection: "drinks",
    categoryId: "matcha",
    tone: "apricot",
    image: "/images/iced-strawberry-matcha.png",
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    price: 6,
    description: "Matcha et lait.",
    collection: "drinks",
    categoryId: "matcha",
    tone: "pistachio",
    image: "/images/matcha-latte.png",
  },
  {
    id: "vanilla-matcha",
    name: "Vanilla Matcha",
    price: 6.5,
    description: "Matcha, sirop de vanille et lait.",
    collection: "drinks",
    categoryId: "matcha",
    tone: "cream",
    image: "/images/vanilla-matcha.png",
  },
  {
    id: "pistachio-matcha",
    name: "Pistachio Matcha",
    price: 7,
    description: "Matcha, praliné pistache et lait.",
    collection: "drinks",
    badges: ["popular"],
    categoryId: "matcha",
    tone: "pistachio",
    image: "/images/pistachio-cloud.png",
  },
  {
    id: "espresso-allonge",
    name: "Espresso / Allongé",
    price: 2.5,
    description: "Shot de café, ou eau chaude en plus pour l’allongé.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "coffee",
    image: "/images/espresso.png",
  },
  {
    id: "americano",
    name: "Americano",
    price: 3.5,
    description: "2 shots de café et eau chaude.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "coffee",
    image: "/images/americano.png",
  },
  {
    id: "double-espresso",
    name: "Double Espresso",
    price: 3.5,
    description: "2 shots de café serré.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "coffee",
    image: "/images/double-espresso.png",
  },
  {
    id: "noisette",
    name: "Noisette",
    price: 3,
    description: "Shot de café et nuage de lait.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "cream",
    image: "/images/noisette.png",
  },
  {
    id: "latte",
    name: "Latte",
    price: 5,
    description: "Shot de café et lait.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "cream",
    image: "/images/latte.png",
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: 5.5,
    description: "2 shots de café et lait.",
    collection: "drinks",
    badges: ["popular"],
    categoryId: "coffee",
    tone: "cream",
    image: "/images/flat-white.png",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 5,
    description: "Shot de café, cacao en poudre et lait.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "cream",
    image: "/images/cappuccino.png",
  },
  {
    id: "mocha",
    name: "Mocha",
    price: 6,
    description: "Shot de café, chocolat, lait et poudre de cacao.",
    collection: "drinks",
    categoryId: "coffee",
    tone: "apricot",
    image: "/images/mocha.png",
  },
  {
    id: "jus-orange-presse-bio",
    name: "Jus d’orange pressé bio",
    price: 6,
    description: "Orange pressée minute.",
    collection: "drinks",
    categoryId: "cold",
    tone: "saffron",
    image: "/images/jus-orange-presse-bio.png",
  },
  {
    id: "glow-juice-bio",
    name: "Glow Juice Bio",
    price: 6,
    description: "Pomme, citron, carotte et gingembre.",
    collection: "drinks",
    categoryId: "cold",
    tone: "pistachio",
    image: "/images/glow-juice-bio.png",
  },
  {
    id: "beldi-the-glace-maison",
    name: "Beldi Thé glacé maison",
    price: 6,
    description:
      "Thé vert, menthe, écorce d’orange, miel, tranche d’orange et menthe fraîche.",
    collection: "drinks",
    badges: ["popular"],
    featured: true,
    categoryId: "cold",
    tone: "pistachio",
    image: "/images/beldi-the-glace.png",
  },
  {
    id: "citronnade-maison",
    name: "Citronnade maison",
    price: 6,
    description: "Menthe fraîche, fleur d’oranger et miel.",
    collection: "drinks",
    categoryId: "cold",
    tone: "cream",
    image: "/images/citronnade-maison.png",
  },
  {
    id: "pistachio-latte",
    name: "Pistachio Latte",
    price: 7,
    description: "Shot de café, praliné pistache et lait.",
    collection: "drinks",
    badges: ["popular"],
    featured: true,
    categoryId: "fancy-latte",
    tone: "pistachio",
    image: "/images/pistachio-cloud.png",
  },
  {
    id: "pumpkin-spice-latte",
    name: "Pumpkin Spice Latte",
    price: 5.5,
    description: "Shot de café, sirop pumpkin spice et lait.",
    collection: "drinks",
    categoryId: "fancy-latte",
    tone: "apricot",
    image: "/images/pumpkin-spice-latte.png",
  },
  {
    id: "erable-latte",
    name: "Érable Latte",
    price: 5.5,
    description: "Shot de café, sirop d’érable, lait et cannelle.",
    collection: "drinks",
    categoryId: "fancy-latte",
    tone: "saffron",
    image: "/images/erable-latte.png",
  },
  {
    id: "rose-latte",
    name: "Rose Latte",
    price: 5.5,
    description: "Shot de café, sirop de rose et lait.",
    collection: "drinks",
    categoryId: "fancy-latte",
    tone: "cream",
    image: "/images/rose-latte.png",
  },
  {
    id: "peanut-butter-latte",
    name: "Peanut Butter Latte",
    price: 6,
    description: "Shot de café, beurre de cacahuète, sirop d’érable et lait.",
    collection: "drinks",
    categoryId: "fancy-latte",
    tone: "coffee",
    image: "/images/almond-butter-latte.png",
  },
  {
    id: "almond-butter-latte",
    name: "Almond Butter Latte",
    price: 6,
    description: "Shot de café, purée d’amande, sirop d’érable et lait.",
    collection: "drinks",
    categoryId: "fancy-latte",
    tone: "apricot",
    image: "/images/almond-butter-latte.png",
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    price: 6,
    description: "Sauce chocolat Valrhona et lait.",
    collection: "drinks",
    categoryId: "not-coffee",
    tone: "coffee",
    image: "/images/hot-chocolate.png",
  },
  {
    id: "spicy-hot-chocolate",
    name: "Spicy Hot Chocolate",
    price: 6,
    description: "Sauce chocolat Valrhona, épices et lait.",
    collection: "drinks",
    categoryId: "not-coffee",
    tone: "terracotta",
    image: "/images/spicy-hot-chocolate.png",
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    price: 6,
    description: "Épices chai et lait.",
    collection: "drinks",
    categoryId: "not-coffee",
    tone: "saffron",
    image: "/images/chai-latte.png",
  },
  {
    id: "golden-latte",
    name: "Golden Latte",
    price: 6,
    description: "Curcuma, gingembre, épices et lait.",
    collection: "drinks",
    categoryId: "not-coffee",
    tone: "saffron",
    image: "/images/golden-latte.png",
  },
  {
    id: "blue-cloud-smoothie",
    name: "Blue Cloud Smoothie",
    price: 8.5,
    description:
      "Banane, mangue, datte, spiruline bleue, beurre d’amande, crème de coco et lait végétal.",
    collection: "drinks",
    categoryId: "smoothies",
    tone: "cream",
    image: "/images/blue-cloud-smoothie.png",
  },
  {
    id: "pink-cloud-smoothie",
    name: "Pink Cloud Smoothie",
    price: 8.5,
    description:
      "Fruits rouges, banane, datte, poudre de pitaya, beurre d’amande, crème de coco, graines de chia et lait végétal.",
    collection: "drinks",
    categoryId: "smoothies",
    tone: "apricot",
    image: "/images/pink-cloud-smoothie.png",
  },
].map((product) => {
  const category = menuCategoryDefinitions.find(
    (entry) => entry.id === product.categoryId,
  );

  return {
    ...product,
    categoryLabel: category?.label || "",
    collectionLabel:
      menuCollections.find((entry) => entry.id === product.collection)?.label ||
      "",
    badges: product.badges || [],
  };
});

export const menuCategories = menuCategoryDefinitions.map((category) => ({
  ...category,
  products: menuProducts.filter((product) => product.categoryId === category.id),
}));

export const menuAddons = [
  {
    id: "savory",
    title: "Ajouter quelque chose",
    description: "Les options qui enrichissent les assiettes brunch.",
    items: [
      "Saumon fumé (+4 €)",
      "Halloumi (+3 €)",
      "Bacon de bœuf halal (+3,5 €)",
      "1/2 avocat (+3 €)",
      "Œuf mollet (+2 €)",
      "Œuf au plat (+2 €)",
      "Pain sans gluten Les Copains (+2 €)",
      "Peanut butter bio (+1,5 €)",
      "Nocciolata (+1,5 €)",
      "Purée d’amande bio (+1,5 €)",
    ],
  },
  {
    id: "drinks",
    title: "Personnaliser sa boisson",
    description: "Les petits ajustements vus sur le menu, désormais intégrés au digital.",
    items: [
      "Grand format chaud (+0,5 €)",
      "Shot espresso supplémentaire (+1 €)",
      "Version glacée (+0,5 €)",
      "Lait végétal avoine, coco ou amande (+0,5 €)",
      "Sirop vanille, caramel salé ou noisette (+0,5 €)",
    ],
  },
];

export const menuServiceNotes = [
  "Cookies et rolls maison disponibles au comptoir selon la cuisson du jour.",
  "Pour toute allergie ou adaptation, l’équipe peut vous guider avant la commande.",
];

export const getFeaturedProducts = () =>
  menuProducts.filter((product) => product.featured);

export const getProductById = (id) =>
  menuProducts.find((product) => product.id === id);

export const getProductsByIds = (ids) =>
  ids
    .map((id) => getProductById(id))
    .filter(Boolean);

export const getProductsByCollection = (collectionId) =>
  menuProducts.filter((product) => product.collection === collectionId);

export const getCategoriesByCollection = (collectionId) => {
  if (collectionId === "all") return menuCategories;

  return menuCategories.filter((category) => category.collection === collectionId);
};
