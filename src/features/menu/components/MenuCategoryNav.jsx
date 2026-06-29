import { cn } from "../../../lib/cn";
import { useActiveSection } from "../../../hooks/useActiveSection";

export function MenuCategoryNav({ categories }) {
  const categoryIds = categories.map((category) => category.id);
  const activeSection = useActiveSection(categoryIds);

  return (
    <div className="sticky top-20 z-30 border-y border-ink/10 bg-cream/92 backdrop-blur-xl">
      <div className="scrollbar-hidden mx-auto flex max-w-[90rem] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12 xl:px-16">
        {categories.map((category) => (
          <a
            aria-current={activeSection === category.id ? "location" : undefined}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              activeSection === category.id
                ? "bg-ink text-cream"
                : "bg-ink/5 text-ink hover:bg-ink/10",
            )}
            href={`#${category.id}`}
            key={category.id}
          >
            {category.label}
          </a>
        ))}
      </div>
    </div>
  );
}
