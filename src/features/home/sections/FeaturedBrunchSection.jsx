import { homeContent } from "../../../data/home";
import { getProductsByIds } from "../../../data/menu";
import { Button } from "../../../components/ui/Button";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { ProductCard } from "../../menu/components/ProductCard";
import { StaggerGroup } from "../../../components/motion/StaggerGroup";

export function FeaturedBrunchSection() {
  const brunches = getProductsByIds([
    "egg-benedict",
    "avocado-toast",
    "baklava-pistachio-berries",
  ]);

  return (
    <Section className="bg-cream text-ink" id="brunch">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={homeContent.featuredBrunch.eyebrow}
          text={homeContent.featuredBrunch.text}
          title={homeContent.featuredBrunch.title}
        />
        <Button
          className="self-start lg:self-auto"
          to="/menu?collection=brunch"
          variant="secondary"
          icon
        >
          Explorer les brunchs
        </Button>
      </div>

      <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {brunches.map((product, index) => (
          <div className={index === 1 ? "lg:translate-y-12" : ""} key={product.id}>
            <ProductCard
              product={product}
              to={`/menu?collection=brunch&category=${product.categoryId}`}
            />
          </div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
