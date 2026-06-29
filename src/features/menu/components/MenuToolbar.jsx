import { Search, SlidersHorizontal, X, Flame, Leaf, Sparkles, Coffee, GlassWater, Cookie, Utensils, Egg, Croissant } from "lucide-react";
import { motion } from "motion/react";
import {
  menuBadgeFilters,
  menuCollections,
} from "../../../data/menu";
import { cn } from "../../../lib/cn";

const categoryIcons = {
  "eggs-on-fire": Egg,
  "hot-sandwiches": Croissant,
  "breakfast-pancakes": Sparkles,
  "avocado-lovers": Leaf,
  "sweet-stacks": Cookie,
  "bowls-pastries": Utensils,
  matcha: Leaf,
  coffee: Coffee,
  cold: GlassWater,
  "fancy-latte": Coffee,
  "not-coffee": Leaf,
  smoothies: GlassWater,
};

function FilterChip({ active, children, onClick, icon: Icon, layoutId }) {
  return (
    <button
      className={cn(
        "relative inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 select-none outline-none",
        active
          ? "text-cream"
          : "text-ink/70 hover:text-ink"
      )}
      onClick={onClick}
      type="button"
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 z-0 rounded-full bg-ink shadow-md"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="size-4 shrink-0" />}
        {children}
      </span>
    </button>
  );
}

export function MenuToolbar({
  availableCategories,
  badge,
  category,
  collection,
  hasActiveFilters,
  query,
  resetFilters,
  resultsLabel,
  setBadge,
  setCategory,
  setCollection,
  setQuery,
}) {
  return (
    <div className="rounded-[2.5rem] border border-ink/8 bg-white/60 p-4 shadow-[0_18px_60px_rgba(20,18,15,0.05)] backdrop-blur-xl sm:p-6 space-y-6">
      {/* Search and Results Status */}
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4.5 top-1/2 size-5 -translate-y-1/2 text-ink/30"
            strokeWidth={2}
          />
          <input
            className="h-14 w-full rounded-full border border-ink/8 bg-cream/35 pl-12 pr-12 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink/30 focus:border-ink/20 focus:bg-cream/50"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un matcha, un pancake, une douceur..."
            type="search"
            value={query}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
            >
              <X className="size-4.5" />
            </button>
          )}
        </label>

        {/* Filter badge details */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/4 px-4 py-2 font-semibold text-ink/75">
            <SlidersHorizontal aria-hidden="true" className="size-3.5" />
            {resultsLabel}
          </span>
          {hasActiveFilters && (
            <button
              className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/20 bg-terracotta/5 px-4 py-2 font-semibold text-terracotta transition-colors duration-300 hover:bg-terracotta hover:text-cream hover:border-terracotta"
              onClick={resetFilters}
              type="button"
            >
              <X aria-hidden="true" className="size-3.5" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      <div className="space-y-6 pt-2 border-t border-ink/5">
        {/* Row 1: Univers (Brunch, Drinks) */}
        <div>
          <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/40">
            Explorer par univers
          </p>
          <div className="scrollbar-hidden flex gap-2 overflow-x-auto pb-1">
            {menuCollections.map((item) => (
              <FilterChip
                active={collection === item.id}
                key={item.id}
                onClick={() => setCollection(item.id)}
                layoutId="collection-active-pill"
                icon={item.id === "brunch" ? Egg : item.id === "drinks" ? Coffee : Sparkles}
              >
                {item.label}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Row 2: Badges (Popular, Veg, New) */}
        <div>
          <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/40">
            Préférences et Régimes
          </p>
          <div className="scrollbar-hidden flex gap-2 overflow-x-auto pb-1">
            {menuBadgeFilters.map((item) => (
              <FilterChip
                active={badge === item.id}
                key={item.id}
                onClick={() => setBadge(item.id)}
                layoutId="badge-active-pill"
                icon={item.id === "popular" ? Flame : item.id === "vegetarian" ? Leaf : item.id === "new" ? Sparkles : null}
              >
                {item.label}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Row 3: Subcategories (Eggs, Sandwiches, Matcha, etc.) */}
        <div>
          <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/40">
            Catégories de produits
          </p>
          <div className="scrollbar-hidden flex gap-2 overflow-x-auto pb-1">
            <FilterChip
              active={category === "all"}
              onClick={() => setCategory("all")}
              layoutId="category-active-pill"
              icon={Sparkles}
            >
              Tout voir
            </FilterChip>
            {availableCategories.map((item) => (
              <FilterChip
                active={category === item.id}
                key={item.id}
                onClick={() => setCategory(item.id)}
                layoutId="category-active-pill"
                icon={categoryIcons[item.id]}
              >
                {item.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
