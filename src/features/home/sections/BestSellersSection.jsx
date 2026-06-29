import { homeContent } from "../../../data/home";
import { getFeaturedProducts } from "../../../data/menu";
import { Button } from "../../../components/ui/Button";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { ProductCard } from "../../menu/components/ProductCard";
import { StaggerGroup } from "../../../components/motion/StaggerGroup";

export function BestSellersSection() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <Section className="bg-sand text-ink">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.6fr] lg:gap-20">
        <div>
          <SectionHeading
            className="lg:sticky lg:top-36"
            eyebrow={homeContent.bestSellers.eyebrow}
            text={homeContent.bestSellers.text}
            title={homeContent.bestSellers.title}
          />
        </div>

        <div>
          <StaggerGroup className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {products.map((product, index) => (
              <div className={index % 2 ? "sm:translate-y-12" : ""} key={product.id}>
                <ProductCard
                  categoryId={product.categoryId}
                  compact
                  product={product}
                />
              </div>
            ))}
          </StaggerGroup>
          <Button
            className="mt-12 sm:mt-24"
            to="/menu?badge=popular"
            variant="secondary"
            icon
          >
            Voir tous les incontournables
          </Button>
        </div>
      </div>
    </Section>
  );
}
