import { startTransition, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getCategoriesByCollection,
  menuBadgeFilters,
  menuProducts,
} from "../../../data/menu";

const defaults = {
  q: "",
  collection: "all",
  badge: "all",
  category: "all",
};

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const badgeIds = new Set(menuBadgeFilters.map((filter) => filter.id));
const collectionIds = new Set(["all", "brunch", "drinks"]);

export function useMenuFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || defaults.q;
  const collection = collectionIds.has(searchParams.get("collection"))
    ? searchParams.get("collection")
    : defaults.collection;
  const badge = badgeIds.has(searchParams.get("badge"))
    ? searchParams.get("badge")
    : defaults.badge;

  const availableCategories = getCategoriesByCollection(collection);
  const availableCategoryIds = new Set(availableCategories.map((item) => item.id));
  const category = availableCategoryIds.has(searchParams.get("category"))
    ? searchParams.get("category")
    : defaults.category;

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalize(deferredQuery);

  const filteredProducts = menuProducts.filter((product) => {
    if (collection !== "all" && product.collection !== collection) return false;
    if (badge !== "all" && !product.badges.includes(badge)) return false;
    if (category !== "all" && product.categoryId !== category) return false;
    if (!normalizedQuery) return true;

    const haystack = normalize(
      [
        product.name,
        product.description,
        product.categoryLabel,
        product.collectionLabel,
      ].join(" "),
    );

    return haystack.includes(normalizedQuery);
  });

  const updateFilters = (updates) => {
    const nextState = {
      q: query,
      collection,
      badge,
      category,
      ...updates,
    };

    if (updates.collection && updates.collection !== collection) {
      nextState.category = "all";
    }

    startTransition(() => {
      const nextSearchParams = new URLSearchParams();

      Object.entries(nextState).forEach(([key, value]) => {
        if (value && value !== defaults[key]) {
          nextSearchParams.set(key, value);
        }
      });

      setSearchParams(nextSearchParams, { replace: true });
    });
  };

  return {
    availableCategories,
    badge,
    category,
    collection,
    filteredProducts,
    hasActiveFilters:
      Boolean(query.trim()) ||
      collection !== defaults.collection ||
      badge !== defaults.badge ||
      category !== defaults.category,
    query,
    resetFilters: () => updateFilters(defaults),
    resultsLabel:
      filteredProducts.length === 1
        ? "1 produit"
        : `${filteredProducts.length} produits`,
    setBadge: (value) => updateFilters({ badge: value }),
    setCategory: (value) => updateFilters({ category: value }),
    setCollection: (value) => updateFilters({ collection: value }),
    setQuery: (value) => updateFilters({ q: value }),
  };
}
