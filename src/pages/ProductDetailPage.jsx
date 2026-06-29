import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Coffee, Sparkles, Flame, Leaf, ArrowRight, Share2, Check, MapPin, CheckCircle, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Seo } from "../components/common/Seo";
import { Container } from "../components/ui/Container";
import { ProductCard } from "../features/menu/components/ProductCard";
import { useBrunchSelection } from "../app/providers/BrunchSelectionProvider";
import { menuProducts, menuBadgeMap } from "../data/menu";
import { formatPrice } from "../lib/format";
import { cn } from "../lib/cn";

// Rich metadata for Maison Saha's signature products
const detailedProductContent = {
  "egg-benedict": {
    ingredients: [
      { name: "Œufs de ferme bio", detail: "Pochés à la minute, origine Île-de-France" },
      { name: "Muffin anglais artisanal", detail: "Boulangerie partenaire à Paris" },
      { name: "Sauce Hollandaise Maison", detail: "Infusée au piment d'Espelette et agrumes" },
      { name: "Avocat Hass", detail: "Tranché fin, assaisonné de citron vert et fleur de sel" },
      { name: "Garniture croquante", detail: "Grenade fraîche, coriandre, cébette et pousses" }
    ],
    story: "Inspiré par l'énergie solaire des matins de Marrakech combinée à la précision de la bistronomie parisienne. Notre Hollandaise signature troque le vinaigre blanc classique pour une touche de peps d'agrumes et de piment doux, offrant une assiette chaude et vibrante.",
    sourcing: "100% fait maison. Œufs de poules élevées en plein air. Herbes fraîches livrées tous les matins."
  },
  "energy-plate": {
    ingredients: [
      { name: "Pain bio au levain naturel", detail: "Tranches généreuses toastées à l'huile d'olive" },
      { name: "Œufs de plein air", detail: "2 œufs au plat parfaits, jaune coulant" },
      { name: "Halloumi grillé AOP", detail: "Fromage chypriote doré à la plancha" },
      { name: "Houmous maison betterave", detail: "Pois chiches bio, purée de betterave rôtie, tahini" },
      { name: "Avocat Hass & sésame", detail: "Demi-avocat saupoudré de graines de sésame torréfiées" }
    ],
    story: "Conçue pour être l'assiette complète ultime après une promenade matinale le long du canal Saint-Martin. L'halloumi salé et chaud trouve son parfait équilibre avec la douceur terreuse et colorée de notre houmous de betterave signature.",
    sourcing: "Pain de la boulangerie Mamiche, Paris 10e. Betteraves cultivées localement."
  },
  "pistachio-latte": {
    ingredients: [
      { name: "Espresso de spécialité", detail: "Origine Éthiopie ou Brésil, torréfié à Paris" },
      { name: "Pâte de pistache pure", detail: "100% pistaches de Sicile torréfiées sans sucre ajouté" },
      { name: "Lait au choix", detail: "Lait entier de ferme ou boissons végétales (avoine, amande, coco)" },
      { name: "Pralin de pistache", detail: "Saupoudré pour le croquant final" }
    ],
    story: "La boisson signature culte de Maison Saha. Nous voulions créer un latte gourmand qui s'éloigne des sirops industriels. La texture grasse et naturellement sucrée de la pistache verte de Sicile se fond dans un espresso rond pour une douceur irrésistible.",
    sourcing: "Café torréfié par Lomi (Paris 18e). Pistaches importées d'une coopérative sicilienne."
  },
  "matcha-signature": {
    ingredients: [
      { name: "Matcha Cérémoniel Uji", detail: "Importé directement du Japon, récolte de printemps" },
      { name: "Lait d'avoine bio", detail: "Notre recommandation pour une texture veloutée" },
      { name: "Sirop d'agave biologique", detail: "Une touche légère de douceur" }
    ],
    story: "Un matcha d'exception préparé dans les règles de l'art avec un fouet en bambou (chasen). Sa belle robe vert émeraude est le gage de sa pureté cérémonielle. Il ne présente aucune amertume, juste des notes d'umami intenses et herbacées.",
    sourcing: "Matcha sourcé dans la préfecture de Kyoto, Japon."
  }
};

const badgeIcons = {
  popular: Flame,
  vegetarian: Leaf,
  new: Sparkles,
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { addToSelection } = useBrunchSelection();
  const [copied, setCopied] = useState(false);

  // Find product by ID
  const product = menuProducts.find((p) => p.id === productId);

  // Configuration state (duplicate modal customization logic for standard page setup)
  const isFood = product?.collection === "brunch";
  const isCoffeeOrMatcha = product?.categoryId === "coffee" || product?.categoryId === "matcha" || product?.categoryId === "fancy-latte";

  const [selectedBase, setSelectedBase] = useState(() =>
    isFood && product?.description?.includes("Au choix :") ? "nature" : null
  );
  const [selectedMilk, setSelectedMilk] = useState(() =>
    isCoffeeOrMatcha ? "vache" : null
  );
  const [selectedSize, setSelectedSize] = useState(() =>
    isCoffeeOrMatcha ? "standard" : null
  );
  const [selectedTemp, setSelectedTemp] = useState(() =>
    isCoffeeOrMatcha ? "chaud" : null
  );
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Reset state when navigating between products
  useEffect(() => {
    setSelectedBase(isFood && product?.description?.includes("Au choix :") ? "nature" : null);
    setSelectedMilk(isCoffeeOrMatcha ? "vache" : null);
    setSelectedSize(isCoffeeOrMatcha ? "standard" : null);
    setSelectedTemp(isCoffeeOrMatcha ? "chaud" : null);
    setSelectedAddons([]);
  }, [productId, isFood, isCoffeeOrMatcha, product]);

  // If product doesn't exist, show clean fallback
  if (!product) {
    return (
      <Container className="py-24 text-center">
        <Seo title="Produit non trouvé" description="Ce produit n'existe pas ou n'est plus à la carte." />
        <h1 className="font-display text-4xl text-ink">Produit non trouvé</h1>
        <p className="mt-4 text-ink/60">Explorez notre carte complète pour trouver votre bonheur.</p>
        <Link to="/menu" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream">
          Retourner au Menu
        </Link>
      </Container>
    );
  }

  // Get additional custom details or fallback
  const details = detailedProductContent[product.id] || {
    ingredients: [
      { name: "Ingrédients frais & locaux", detail: "Sélectionnés chaque matin" },
      { name: "Préparation maison", detail: "Cuisiné à la commande dans notre cuisine" }
    ],
    story: `Découvrez notre interprétation exclusive du ${product.name}. Une recette originale pensée avec passion par notre chef pour éveiller vos sens dès les premières heures de la journée.`,
    sourcing: "Ingrédients issus de circuits courts et de producteurs partenaires engagés."
  };

  // Find related products (same category or collection, excluding current)
  const relatedProducts = menuProducts
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.collection === product.collection))
    .slice(0, 3);

  // Calculate dynamic price
  let totalPrice = product.price;
  if (selectedBase === "saumon") totalPrice += 1.0;
  if (selectedMilk && selectedMilk !== "vache") totalPrice += 0.5;
  if (selectedSize === "grand") totalPrice += 0.5;
  if (selectedTemp === "glace" && !product.name.includes("Iced")) totalPrice += 0.5;
  
  selectedAddons.forEach((addon) => {
    if (addon === "bacon") totalPrice += 3.5;
    if (addon === "halloumi") totalPrice += 3.0;
    if (addon === "saumon") totalPrice += 4.0;
    if (addon === "avocat") totalPrice += 3.0;
    if (addon === "oeuf") totalPrice += 2.0;
    if (addon === "gluten-free") totalPrice += 2.0;
  });

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleAddClick = () => {
    const customizedItem = {
      ...product,
      totalPrice,
      customizations: {
        base: selectedBase,
        milk: selectedMilk,
        size: selectedSize,
        temp: selectedTemp,
        addons: selectedAddons,
      },
    };
    addToSelection(customizedItem);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} — Maison Saha`,
        text: `Découvrez le délicieux ${product.name} sur le menu digital de Maison Saha !`,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toneClasses = {
    cream: "bg-[#fdfaf7]/90 text-ink",
    coffee: "bg-[#241712] text-cream",
    terracotta: "bg-[#78281a] text-cream",
    saffron: "bg-[#f6e1ba] text-ink",
    pistachio: "bg-[#e2e7d7] text-ink",
    apricot: "bg-[#f6e4d5] text-ink",
  };

  const isDarkTone = product.tone === "coffee" || product.tone === "terracotta";

  return (
    <>
      <Seo
        title={`${product.name} — Maison Saha`}
        description={`${product.name} à la carte de Maison Saha Paris : ${product.description}`}
      />

      <section className="relative overflow-hidden bg-cream pt-24 pb-16 sm:pb-24">
        {/* Back Link */}
        <Container className="mb-6 relative z-10">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-4" />
            Retourner au menu
          </Link>
        </Container>

        <Container className="relative">
          {/* Main Product Layout */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            
            {/* Left Column: Visual Showcase (Span 6) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Premium Hero Image Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-[2.5rem] p-8 shadow-xl flex items-center justify-center border border-ink/5",
                  toneClasses[product.tone] || toneClasses.cream
                )}
              >
                <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-white/10 to-transparent" />
                
                {/* Geometric rings */}
                <div className={cn(
                  "absolute size-[320px] rounded-full border border-current/10",
                  isDarkTone ? "text-cream" : "text-ink"
                )} />
                <div className={cn(
                  "absolute size-[420px] rounded-full border border-current/5 rotate-45",
                  isDarkTone ? "text-cream" : "text-ink"
                )} />

                <div className="relative z-10 text-center">
                  <span className={cn(
                    "rounded-full border px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] backdrop-blur-md shadow-2xs",
                    isDarkTone ? "border-white/20 bg-white/10 text-cream" : "border-black/10 bg-black/5 text-ink"
                  )}>
                    {product.categoryLabel}
                  </span>
                  
                  {/* Visual Title */}
                  <h1 className="mt-8 font-display text-5xl md:text-6xl tracking-tight leading-none">
                    {product.name}
                  </h1>

                  <div className="mt-6 flex justify-center gap-1.5">
                    {product.badges?.map((badge) => {
                      const badgeInfo = menuBadgeMap[badge];
                      const Icon = badgeIcons[badge];
                      if (!badgeInfo || !Icon) return null;
                      return (
                        <span 
                          key={badge}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider",
                            badgeInfo.accent
                          )}
                        >
                          <Icon className="size-3.5" />
                          {badgeInfo.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className={cn(
                  "absolute bottom-4 left-6 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest opacity-60",
                  isDarkTone ? "text-cream" : "text-ink"
                )}>
                  <MapPin className="size-3.5" />
                  Maison Saha Paris
                </div>
              </motion.div>

              {/* Story Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-[2rem] border border-ink/8 bg-white/70 p-6 md:p-8 shadow-xs"
              >
                <h3 className="font-display text-2xl text-ink mb-4">L'Histoire de la Recette</h3>
                <p className="text-sm leading-7 text-ink/70 font-light italic">
                  "{details.story}"
                </p>
                <div className="mt-6 border-t border-ink/5 pt-4 text-xs text-ink/50 flex items-start gap-2">
                  <Info className="size-4 text-terracotta shrink-0 mt-0.5" />
                  <p><strong>Engagement Sourcing :</strong> {details.sourcing}</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Specifications & Configuration (Span 6) */}
            <div className="lg:col-span-6 space-y-8">
              {/* Product Intro */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
                  {product.collectionLabel}
                </span>
                <div className="flex items-baseline justify-between mt-1 gap-4 flex-wrap">
                  <h2 className="font-display text-4xl md:text-5xl tracking-tight text-ink">
                    {product.name}
                  </h2>
                  <span className="font-display text-3xl font-bold text-ink">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/75">
                  {product.description}
                </p>
              </motion.div>

              {/* Ingredients List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[2rem] border border-ink/8 bg-cream/35 p-6 md:p-8"
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/40 mb-4">Composition & Sourcing</h3>
                <ul className="space-y-3">
                  {details.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="size-4.5 text-terracotta shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ink font-semibold">{ing.name}</strong>
                        <span className="text-ink/65 block text-xs mt-0.5">{ing.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Customization Options */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 border-t border-ink/10 pt-6"
              >
                {/* Option 1: Eggs choice */}
                {isFood && product.description.includes("Au choix :") && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-3">
                      Garniture incluse au choix
                    </h4>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { id: "nature", label: "Nature", price: 0 },
                        { id: "bacon", label: "Bacon de bœuf", price: 0 },
                        { id: "halloumi", label: "Halloumi", price: 0 },
                        { id: "saumon", label: "Saumon fumé", price: 1.0 }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedBase(opt.id)}
                          className={cn(
                            "flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-300",
                            selectedBase === opt.id
                              ? "border-ink bg-ink text-cream shadow-sm"
                              : "border-ink/10 hover:border-ink/30 text-ink bg-transparent"
                          )}
                        >
                          <span className="text-xs font-semibold">{opt.label}</span>
                          <span className={cn(
                            "text-[0.65rem] mt-0.5",
                            selectedBase === opt.id ? "text-cream/70" : "text-ink/50"
                          )}>
                            {opt.price > 0 ? `+${formatPrice(opt.price)}` : "Inclus"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drink Options: Lait / Taille / Température */}
                {isCoffeeOrMatcha && (
                  <div className="space-y-6">
                    {/* Size */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-3">Format</h4>
                      <div className="flex gap-2">
                        {[
                          { id: "standard", label: "Standard", price: 0 },
                          { id: "grand", label: "Grand format", price: 0.5 }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedSize(opt.id)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
                              selectedSize === opt.id ? "border-ink bg-ink text-cream" : "border-ink/10 hover:border-ink/30 text-ink"
                            )}
                          >
                            {opt.label} {opt.price > 0 && `(+${formatPrice(opt.price)})`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Milk */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-3">Lait</h4>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                          { id: "vache", label: "Lait entier", price: 0 },
                          { id: "avoine", label: "Avoine Bio", price: 0.5 },
                          { id: "amande", label: "Amande Bio", price: 0.5 },
                          { id: "coco", label: "Coco Bio", price: 0.5 }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedMilk(opt.id)}
                            className={cn(
                              "rounded-xl border p-2 text-center text-xs font-semibold transition-all duration-300",
                              selectedMilk === opt.id ? "border-ink bg-ink text-cream" : "border-ink/10 hover:border-ink/30 text-ink"
                            )}
                          >
                            {opt.label}
                            {opt.price > 0 && (
                              <span className="block text-[0.62rem] opacity-60 mt-0.5">
                                +{formatPrice(opt.price)}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Temperature */}
                    {!product.name.includes("Iced") && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-3">Température</h4>
                        <div className="flex gap-2">
                          {[
                            { id: "chaud", label: "Chaud", price: 0 },
                            { id: "glace", label: "Glacé", price: 0.5 }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedTemp(opt.id)}
                              className={cn(
                                "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
                                selectedTemp === opt.id ? "border-ink bg-ink text-cream" : "border-ink/10 hover:border-ink/30 text-ink"
                              )}
                            >
                              {opt.label} {opt.price > 0 && `(+${formatPrice(opt.price)})`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Extras/Addons Section */}
                {isFood && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-3">
                      Ajouter des suppléments
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "saumon", label: "Saumon fumé", price: 4.0 },
                        { id: "bacon", label: "Bacon de bœuf", price: 3.5 },
                        { id: "halloumi", label: "Halloumi grillé", price: 3.0 },
                        { id: "avocat", label: "Avocat tranché", price: 3.0 },
                        { id: "oeuf", label: "Œuf mollet", price: 2.0 },
                        { id: "gluten-free", label: "Pain sans gluten", price: 2.0 }
                      ].map((addon) => {
                        const isSelected = selectedAddons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={cn(
                              "flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-300",
                              isSelected ? "border-ink bg-ink/4 text-ink font-semibold" : "border-ink/10 hover:border-ink/35 text-ink/80"
                            )}
                          >
                            <span className="text-xs">{addon.label}</span>
                            <span className="text-xs font-bold text-terracotta">
                              +{formatPrice(addon.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Call To Action Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t border-ink/10 pt-6 flex gap-3 flex-col sm:flex-row"
              >
                <button
                  onClick={handleAddClick}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4.5 text-sm font-semibold text-cream shadow-md hover:bg-ink/90 active:scale-[0.98] transition-all"
                >
                  <Plus className="size-4" />
                  Ajouter à mon Brunch Idéal
                  <ArrowRight className="size-4" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex size-14 items-center justify-center rounded-full border border-ink/10 text-ink/75 hover:border-ink hover:text-ink transition-colors shrink-0"
                  title="Partager ce produit"
                >
                  {copied ? <Check className="size-5 text-emerald-600" /> : <Share2 className="size-5" />}
                </button>
              </motion.div>
            </div>

          </div>
        </Container>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-sand py-16 sm:py-24 border-t border-ink/5">
          <Container>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink/40">Suggestion de la maison</span>
                <h3 className="font-display text-3xl sm:text-4xl text-ink mt-1">Vous aimerez aussi...</h3>
              </div>
              <Link to="/menu" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:underline">
                Voir toute la carte
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
