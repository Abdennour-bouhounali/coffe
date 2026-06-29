import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { X, Flame, Leaf, Sparkles, Check, ArrowRight, MapPin, Coffee, ShoppingBag } from "lucide-react";
import { formatPrice } from "../../../lib/format";
import { cn } from "../../../lib/cn";
import { menuBadgeMap } from "../../../data/menu";

const optionIcons = {
  popular: Flame,
  vegetarian: Leaf,
  new: Sparkles,
};

export function ProductDetailModal({ product, isOpen, onClose, onAddToSelection }) {
  // Configuration options depending on the type of product
  const isFood = product?.collection === "brunch";
  const isCoffeeOrMatcha = product?.categoryId === "coffee" || product?.categoryId === "matcha" || product?.categoryId === "fancy-latte";

  // State for options
  const [selectedBase, setSelectedBase] = useState(() =>
    isFood && product?.description?.includes("Au choix :") 
      ? "nature" 
      : null
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!product) return null;
  
  // Calculate price dynamically
  let totalPrice = product.price;

  if (selectedBase === "saumon") totalPrice += 1.0;
  if (selectedMilk && selectedMilk !== "vache") totalPrice += 0.5;
  if (selectedSize === "grand") totalPrice += 0.5;
  if (selectedTemp === "glace" && !product.name.includes("Iced")) totalPrice += 0.5;
  
  selectedAddons.forEach(addon => {
    if (addon === "bacon") totalPrice += 3.5;
    if (addon === "halloumi") totalPrice += 3.0;
    if (addon === "saumon") totalPrice += 4.0;
    if (addon === "avocat") totalPrice += 3.0;
    if (addon === "oeuf") totalPrice += 2.0;
    if (addon === "gluten-free") totalPrice += 2.0;
  });

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
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
      }
    };
    onAddToSelection(customizedItem);
    onClose();
  };



  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop glass blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-md"
          />

          {/* Modal Container — pinned at exact 50%/50% of the viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100vw-2rem)] max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-2xl sm:w-[calc(100vw-3rem)] md:max-h-[80vh] md:flex-row"
          >
            {/* Left side: Premium Full-Bleed Image Hero */}
            <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden md:w-[45%] md:min-h-full">
              {/* Background Image with soft zoom */}
              {product.image ? (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.03 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 z-0"
                >
                  <EditorialMedia
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-ink/5">
                  <Coffee className="size-16 opacity-20 text-ink" />
                </div>
              )}

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

              {/* Top: Category Badge */}
              <div className="relative z-20 p-6 md:p-8">
                <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Bottom: Title, Badges & Price */}
              <div className="relative z-20 flex flex-col items-start p-6 text-left md:p-8">
                <h2 className="max-w-[280px] font-display text-[2.4rem] leading-[1.1] tracking-[-0.02em] text-white drop-shadow-sm">
                  {product.name}
                </h2>
                
                {product.badges && product.badges.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.badges.map((badge) => {
                      const badgeInfo = menuBadgeMap[badge];
                      const Icon = optionIcons[badge];
                      if (!badgeInfo || !Icon) return null;
                      return (
                        <span 
                          key={badge}
                          className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-white backdrop-blur-md"
                        >
                          <Icon className="size-3" />
                          {badgeInfo.label}
                        </span>
                      );
                    })}
                  </div>
                )}

                <p className="mt-3 font-display text-2xl leading-none tracking-tight text-white/90 drop-shadow-sm">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>

            {/* Right side: Configuration Panel */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8 md:p-10">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="absolute right-6 top-6 z-10 flex size-9 items-center justify-center rounded-full bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink transition-colors"
              >
                <X className="size-5" />
              </button>

              {/* Product Header */}
              <div className="pr-8">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink/40">
                  {product.collectionLabel}
                </span>
                <h3 className="mt-1 font-display text-[2.2rem] leading-none tracking-tight text-ink">
                  Configurer votre rituel
                </h3>
              </div>

              <div className="mt-6 flex-1 space-y-8">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-2">Description</h4>
                  <p className="text-sm leading-6 text-ink/70">
                    {product.description}
                  </p>
                </div>

                {/* Option 1: Eggs choice if Benedict or Burger */}
                {isFood && product.description.includes("Au choix :") && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-3">
                      Option incluse au choix
                    </h4>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                            "flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-300",
                            selectedBase === opt.id
                              ? "border-ink bg-ink text-cream shadow-sm"
                              : "border-ink/10 hover:border-ink/30 text-ink bg-transparent"
                          )}
                        >
                          <span className="text-xs font-semibold">{opt.label}</span>
                          <span className={cn(
                            "text-[0.68rem] mt-1",
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
                              selectedSize === opt.id
                                ? "border-ink bg-ink text-cream"
                                : "border-ink/10 hover:border-ink/30 text-ink"
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
                          { id: "vache", label: "Vache", price: 0 },
                          { id: "avoine", label: "Avoine", price: 0.5 },
                          { id: "amande", label: "Amande", price: 0.5 },
                          { id: "coco", label: "Coco", price: 0.5 }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedMilk(opt.id)}
                            className={cn(
                              "rounded-xl border p-2 text-center text-xs font-semibold transition-all duration-300",
                              selectedMilk === opt.id
                                ? "border-ink bg-ink text-cream"
                                : "border-ink/10 hover:border-ink/30 text-ink"
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
                                selectedTemp === opt.id
                                  ? "border-ink bg-ink text-cream"
                                  : "border-ink/10 hover:border-ink/30 text-ink"
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
                      Ajouter des suppléments (facultatif)
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
                              isSelected
                                ? "border-ink bg-ink/4 text-ink font-semibold"
                                : "border-ink/10 hover:border-ink/35 text-ink/80"
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

                {/* Recommendation Cross-Sell (Apple-style smart suggestion) */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40 mb-2">
                    L'accord idéal
                  </h4>
                  <div className="flex items-center gap-3 rounded-2xl bg-cream/30 p-3 border border-ink/5">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-saffron/15 text-saffron">
                      <Coffee className="size-5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-ink">
                        {isFood ? "Pistachio Latte" : "Baklava Pistachio"}
                      </p>
                      <p className="text-ink/60">
                        {isFood ? "Notre boisson signature s'accorde parfaitement." : "Complète parfaitement votre boisson."}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-ink/50">
                      {isFood ? "7,00 €" : "15,00 €"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to selection block */}
              <div className="mt-8 border-t border-ink/10 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="hidden sm:block">
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/40">Total Estimé</p>
                    <p className="font-display text-2xl font-bold text-ink">{formatPrice(totalPrice)}</p>
                  </div>
                  <button
                    onClick={handleAddClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-cream shadow-[0_12px_24px_rgba(40,27,21,0.15)] hover:bg-ink/90 transition-all duration-300 active:scale-[0.98] sm:flex-initial"
                  >
                    <ShoppingBag className="size-4" />
                    Ajouter à mon Brunch Idéal
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
