import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, MapPin, Compass, ArrowRight, Share2, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "../../../lib/format";
import { siteConfig } from "../../../data/site";

export function SelectionDrawer({ items, onRemoveItem, onClearAll, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleShare = () => {
    const text = `Mon Brunch Idéal chez Maison Saha : \n${items.map(item => `- ${item.name} (${formatPrice(item.totalPrice)})`).join("\n")}\nTotal : ${formatPrice(total)}\nAdresse : 24 rue du Faubourg, Paris 10e`;
    
    if (navigator.share) {
      navigator.share({
        title: "Mon Brunch Idéal — Maison Saha",
        text: text,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          {/* Backdrop glass blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/30 backdrop-blur-xs"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative z-50 flex max-h-[85vh] w-full max-w-2xl flex-col rounded-t-[2.5rem] border-t border-ink/10 bg-white p-6 shadow-[0_-20px_50px_rgba(20,18,15,0.15)] md:p-8"
          >
            {/* Grabber indicator */}
            <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink/10" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/5 pb-4 pt-2">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                  <span>Mon Brunch Idéal</span>
                  <span className="rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs font-bold text-terracotta">
                    {items.length}
                  </span>
                </h3>
                <p className="text-xs text-ink/50 mt-0.5">Votre sélection personnalisée pour votre visite</p>
              </div>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink transition-colors"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-ink/5 text-ink/40">
                    <Sparkles className="size-6" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink">Aucun produit dans votre sélection</p>
                  <p className="mt-1 text-xs text-ink/50 max-w-[280px]">
                    Explorez la carte et cliquez sur un produit pour l'ajouter à votre sélection.
                  </p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div 
                    key={`${item.id}-${idx}`}
                    className="flex items-start justify-between gap-4 rounded-2xl bg-cream/20 p-4 border border-ink/5 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-ink mt-0.5">{item.name}</h4>
                      
                      {/* Customization description pills */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.customizations?.base && item.customizations.base !== "nature" && (
                          <span className="text-[0.65rem] bg-ink/5 px-2 py-0.5 rounded-md text-ink/75">
                            Base: {item.customizations.base === "saumon" ? "Saumon (+1€)" : item.customizations.base}
                          </span>
                        )}
                        {item.customizations?.milk && item.customizations.milk !== "vache" && (
                          <span className="text-[0.65rem] bg-ink/5 px-2 py-0.5 rounded-md text-ink/75">
                            Lait: {item.customizations.milk} (+0.5€)
                          </span>
                        )}
                        {item.customizations?.size === "grand" && (
                          <span className="text-[0.65rem] bg-ink/5 px-2 py-0.5 rounded-md text-ink/75">
                            Grand Format (+0.5€)
                          </span>
                        )}
                        {item.customizations?.temp === "glace" && (
                          <span className="text-[0.65rem] bg-ink/5 px-2 py-0.5 rounded-md text-ink/75">
                            Glacé (+0.5€)
                          </span>
                        )}
                        {item.customizations?.addons?.map(addon => (
                          <span key={addon} className="text-[0.65rem] bg-terracotta/5 px-2 py-0.5 rounded-md text-terracotta font-semibold">
                            +{addon}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between self-stretch">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-ink/30 hover:text-terracotta p-1 transition-colors rounded-lg hover:bg-terracotta/5"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <span className="font-display text-base font-semibold text-ink mt-2">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Calculation */}
            {items.length > 0 && (
              <div className="border-t border-ink/5 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-ink/50 font-medium">Estimation du brunch</p>
                    <p className="text-2xl font-display font-bold text-ink">{formatPrice(total)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="flex size-11 items-center justify-center rounded-full border border-ink/10 text-ink/70 hover:border-ink hover:text-ink transition-colors"
                      title="Partager ma sélection"
                    >
                      {copied ? <Check className="size-5 text-emerald-600" /> : <Share2 className="size-5" />}
                    </button>
                    <button
                      onClick={onClearAll}
                      className="rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink hover:border-terracotta hover:text-terracotta transition-colors"
                    >
                      Tout effacer
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-saffron/10 border border-saffron/20 p-3 text-xs text-ink/80 flex items-start gap-2">
                  <span className="text-saffron-600">💡</span>
                  <p>
                    <strong>Faites une capture d'écran</strong> ou partagez cette liste pour la montrer à notre équipe lors de votre commande au comptoir !
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center rounded-full border border-ink/10 py-3.5 text-sm font-semibold text-ink hover:bg-ink/5 transition-colors"
                  >
                    Continuer à ajouter
                  </button>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-cream shadow-md hover:bg-ink/90 transition-colors"
                  >
                    <MapPin className="size-4" />
                    Lancer l'itinéraire
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
