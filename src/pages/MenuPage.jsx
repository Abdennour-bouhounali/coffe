import { ArrowDownRight, MapPinned, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Seo } from "../components/common/Seo";
import { Container } from "../components/ui/Container";
import { PageIntro } from "../components/ui/PageIntro";
import { Button } from "../components/ui/Button";
import {
  getProductsByCollection,
  menuAddons,
  menuCategories,
  menuProducts,
  menuServiceNotes,
} from "../data/menu";
import { siteConfig } from "../data/site";
import { VisitUsSection } from "../features/home/sections/VisitUsSection";
import { stagger } from "../lib/animations";
import { ProductCard } from "../features/menu/components/ProductCard";
import { MenuToolbar } from "../features/menu/components/MenuToolbar";
import { MenuEmptyState } from "../features/menu/components/MenuEmptyState";
import { MenuAddonsPanel } from "../features/menu/components/MenuAddonsPanel";
import { useMenuFilters } from "../features/menu/hooks/useMenuFilters";
import { useBrunchSelection } from "../app/providers/BrunchSelectionProvider";
import { SelectionDrawer } from "../features/menu/components/SelectionDrawer";


const brunchCount = getProductsByCollection("brunch").length;
const drinksCount = getProductsByCollection("drinks").length;

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Menu Maison Saha",
  hasMenuSection: menuCategories.map((category) => ({
    "@type": "MenuSection",
    name: category.label,
    description: category.description,
    hasMenuItem: category.products.map((product) => ({
      "@type": "MenuItem",
      name: product.name,
      description: product.description,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "EUR",
      },
    })),
  })),
};

function StatCard({ label, value }) {
  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-white/75 p-5 shadow-[0_16px_40px_rgba(20,18,15,0.05)] backdrop-blur-sm">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/42">
        {label}
      </p>
      <p className="mt-3 font-display text-[2.35rem] leading-none tracking-[-0.05em] text-ink">
        {value}
      </p>
    </div>
  );
}

export default function MenuPage() {
  const {
    availableCategories,
    badge,
    category,
    collection,
    filteredProducts,
    hasActiveFilters,
    query,
    resetFilters,
    resultsLabel,
    setBadge,
    setCategory,
    setCollection,
    setQuery,
  } = useMenuFilters();

  const {
    selection,
    removeFromSelection,
    clearSelection,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useBrunchSelection();

  const activeCategory = availableCategories.find((item) => item.id === category);
  const activeCollectionLabel =
    collection === "all"
      ? "Toute la carte"
      : collection === "brunch"
        ? "Brunch all day"
        : "Boissons all day";

  return (
    <>
      <Seo
        description="Explorez le menu digital de Maison Saha à Paris : brunch all day, matchas, cafés et boissons signature sans PDF."
        schema={menuSchema}
        title="Le menu digital"
      />

      <PageIntro
        eyebrow="Le menu, réinventé"
        text="Une carte pensée comme un showroom gourmand : explorez, filtrez, comparez, puis venez vivre l’expérience au café."
        title="Le menu devient une destination à lui seul."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="#menu-digital" icon>
            Explorer la carte
          </Button>
          <Button href={siteConfig.mapsUrl} target="_blank" variant="secondary">
            Venir au café
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <StatCard label="Produits à découvrir" value={menuProducts.length} />
          <StatCard label="Assiettes brunch" value={brunchCount} />
          <StatCard label="Boissons maison" value={drinksCount} />
        </div>
      </PageIntro>

      <section
        className="relative overflow-hidden bg-linear-to-b from-cream via-[#f6efe3] to-sand py-16 sm:py-20"
        id="menu-digital"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-radial-[ellipse_at_top] from-white/85 via-white/30 to-transparent"
        />

        <Container className="relative">
          <div className="rounded-[2.25rem] border border-ink/10 bg-white/55 p-5 shadow-[0_30px_90px_rgba(20,18,15,0.08)] backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/42">
                  Centre de l’expérience
                </p>
                <h2 className="mt-3 font-display text-[2.8rem] leading-[0.92] tracking-[-0.05em] text-ink sm:text-[3.6rem]">
                  Choisissez comme dans une boutique produit, pas comme sur un PDF.
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-6 text-ink/65">
                <p>
                  Recherche instantanée, catégories lisibles, badges utiles et
                  cartes généreuses : tout est pensé pour donner envie de goûter
                  avant même d’arriver.
                </p>
                <p className="inline-flex items-center gap-2 rounded-full bg-ink/4 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/58">
                  <ArrowDownRight aria-hidden="true" className="size-4" />
                  {activeCategory?.label || activeCollectionLabel}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <MenuToolbar
                availableCategories={availableCategories}
                badge={badge}
                category={category}
                collection={collection}
                hasActiveFilters={hasActiveFilters}
                query={query}
                resetFilters={resetFilters}
                resultsLabel={resultsLabel}
                setBadge={setBadge}
                setCategory={setCategory}
                setCollection={setCollection}
                setQuery={setQuery}
              />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/42">
                  Résultats
                </p>
                <h3 className="mt-3 font-display text-[2.3rem] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[2.8rem]">
                  {activeCategory?.label || activeCollectionLabel}
                </h3>
              </div>
              <p className="inline-flex items-center gap-2 text-sm text-ink/56">
                <MapPinned aria-hidden="true" className="size-4" />
                Paris 10e, à quelques minutes de votre prochain café.
              </p>
            </div>

            <div className="mt-10">
              {filteredProducts.length ? (
                <motion.div
                  className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3"
                  key={`${collection}-${category}-${badge}-${query}`}
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <MenuEmptyState onReset={resetFilters} />
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {menuAddons.map((group) => (
              <MenuAddonsPanel
                description={group.description}
                items={group.items}
                key={group.id}
                title={group.title}
              />
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-ink/10 bg-terracotta px-6 py-7 text-cream shadow-[0_18px_50px_rgba(20,18,15,0.1)] sm:px-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
              Au comptoir
            </p>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-cream/80 sm:grid-cols-2">
              {menuServiceNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <VisitUsSection />

      {/* Floating tray button */}
      <AnimatePresence>
        {selection.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
          >
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream shadow-2xl border border-white/10 hover:bg-ink/90 active:scale-[0.98] transition-all"
            >
              <div className="relative">
                <ShoppingBag className="size-4.5" />
                <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-terracotta text-[0.65rem] font-bold text-cream">
                  {selection.length}
                </span>
              </div>
              <span>Mon Brunch Idéal</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection detail drawer */}
      <SelectionDrawer
        items={selection}
        onRemoveItem={removeFromSelection}
        onClearAll={clearSelection}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
