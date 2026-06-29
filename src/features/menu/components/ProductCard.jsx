import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Flame, Leaf, Sparkles, ArrowRight } from "lucide-react";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { formatPrice } from "../../../lib/format";
import { cn } from "../../../lib/cn";
import { fadeUp } from "../../../lib/animations";
import { ProductBadge } from "./ProductBadge";
import { ProductDetailModal } from "./ProductDetailModal";
import { useBrunchSelection } from "../../../app/providers/BrunchSelectionProvider";

export function ProductCard({ product, media = true, compact = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToSelection } = useBrunchSelection();

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // Apple-style background tint based on product tone
  const toneClasses = {
    cream: "bg-linear-to-b from-white/80 to-[#fdfaf7]/90 hover:from-white hover:to-[#fdfaf7]",
    coffee: "bg-linear-to-b from-[#2e201b]/95 to-[#241712]/95 hover:from-[#35251f] hover:to-[#281b15] text-cream",
    terracotta: "bg-linear-to-b from-[#8c3525]/90 to-[#78281a]/95 hover:from-[#963c2c] hover:to-[#832e20] text-cream",
    saffron: "bg-linear-to-b from-[#faeed2]/80 to-[#f6e1ba]/85 hover:from-[#fcf4e0] hover:to-[#f9e9cb]",
    pistachio: "bg-linear-to-b from-[#f2f4ec]/90 to-[#e2e7d7]/90 hover:from-[#f7f9f3] hover:to-[#eaf0de]",
    apricot: "bg-linear-to-b from-[#fdf4ee]/90 to-[#f6e4d5]/90 hover:from-[#fff8f3] hover:to-[#faebd8]",
  };

  const isDarkCard = product.tone === "coffee" || product.tone === "terracotta";

  const cardContent = (
    <div className="relative flex flex-col h-full">
      {/* Badges Overlay */}
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-1.5 pointer-events-none">
        {product.badges?.map((badge) => (
          <ProductBadge key={badge} type={badge} />
        ))}
      </div>

      {/* Large Image Area */}
      {media && (
        <div className="relative overflow-hidden rounded-[1.8rem] bg-ink/5 aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] xl:aspect-[1.35] group-hover:shadow-md transition-shadow duration-500">
          <EditorialMedia
            alt={product.name}
            className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            label={product.categoryLabel}
            src={product.image}
            tone={product.tone}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/10 via-transparent to-transparent" />
          
          {/* Subtle Category Pill in image corner */}
          <div className="absolute bottom-3 left-4">
            <span className={cn(
              "rounded-full border px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] backdrop-blur-md shadow-2xs",
              isDarkCard 
                ? "border-white/10 bg-white/10 text-cream" 
                : "border-black/5 bg-black/5 text-ink/75"
            )}>
              {product.categoryLabel}
            </span>
          </div>
        </div>
      )}

      {/* Text Info Section */}
      <div className={cn("flex flex-1 flex-col justify-between", media ? "pt-5 px-2" : "p-6")}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className={cn(
                "text-[0.62rem] font-bold uppercase tracking-[0.16em] opacity-40",
                isDarkCard ? "text-cream" : "text-ink"
              )}>
                {product.collectionLabel}
              </span>
              <h3 className={cn(
                "font-display tracking-tight text-ink",
                isDarkCard ? "text-cream" : "text-ink",
                compact ? "text-xl leading-snug" : "text-[1.85rem] leading-none"
              )}>
                {product.name}
              </h3>
            </div>
            
            {/* Apple style Price representation */}
            <span className={cn(
              "shrink-0 text-sm font-semibold rounded-full px-3 py-1 bg-ink/5 text-ink border border-ink/5 font-mono",
              isDarkCard && "bg-white/10 text-cream border-white/5"
            )}>
              {formatPrice(product.price)}
            </span>
          </div>

          <p className={cn(
            "mt-3 text-xs leading-relaxed opacity-70 line-clamp-3",
            isDarkCard ? "text-cream/80" : "text-ink/70"
          )}>
            {product.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-5 flex items-center justify-between border-t border-current/10 pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] flex items-center gap-1">
            Personnaliser et goûter
            <ArrowRight className="size-3" />
          </span>
          <div className={cn(
            "flex size-8 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:translate-x-0.5",
            isDarkCard && "bg-cream text-ink"
          )}>
            <Plus className="size-4" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.article
        variants={fadeUp}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleCardClick}
        className={cn(
          "group flex flex-col h-full rounded-[2.25rem] border border-ink/8 p-3 shadow-xs transition-all duration-500 cursor-pointer hover:shadow-[0_24px_60px_rgba(40,27,21,0.08)]",
          toneClasses[product.tone] || toneClasses.cream
        )}
      >
        {cardContent}
      </motion.article>

      {/* Product configuration modal */}
      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToSelection={addToSelection}
      />
    </>
  );
}
