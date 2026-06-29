import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { StaggerGroup } from "../../../components/motion/StaggerGroup";
import { ProductCard } from "./ProductCard";

export function MenuCategory({ category, index }) {
  return (
    <Section
      className={index % 2 === 0 ? "bg-cream" : "bg-sand"}
      id={category.id}
    >
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.5fr] lg:gap-20">
        <SectionHeading
          className="lg:sticky lg:top-40 lg:self-start"
          eyebrow={category.eyebrow}
          text={category.description}
          title={category.label}
        />
        <StaggerGroup className="divide-y divide-ink/12">
          {category.products.map((product) => (
            <ProductCard
              categoryId={category.id}
              key={product.id}
              media={false}
              product={product}
            />
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
