import { homeContent } from "../../../data/home";
import { getProductsByIds } from "../../../data/menu";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { Button } from "../../../components/ui/Button";
import { formatPrice } from "../../../lib/format";
import { StaggerGroup, StaggerItem } from "../../../components/motion/StaggerGroup";
import { fadeUp } from "../../../lib/animations";

export function SignatureDrinksSection() {
  const drinks = getProductsByIds([
    "iced-mango-matcha",
    "pistachio-latte",
    "beldi-the-glace-maison",
  ]);

  return (
    <Section className="bg-pistachio text-ink">
      <SectionHeading
        eyebrow={homeContent.drinks.eyebrow}
        text={homeContent.drinks.text}
        title={homeContent.drinks.title}
      />

      <StaggerGroup className="scrollbar-hidden -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:mt-20">
        {drinks.map((drink, index) => (
          <StaggerItem
            className="w-[82vw] shrink-0 snap-center sm:w-auto"
            key={drink.id}
            variants={fadeUp}
          >
            <article className="group relative">
              <EditorialMedia
                alt={drink.name}
                className="aspect-[4/5] rounded-[45%_45%_1.75rem_1.75rem] transition-transform duration-700 group-hover:-translate-y-2"
                label={`0${index + 1} · ${drink.name}`}
                tone={drink.tone}
                src={drink.image}
              />
              <div className="flex items-start justify-between gap-4 pt-5">
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.025em]">
                    {drink.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-ink/65">
                    {drink.description}
                  </p>
                </div>
                <p className="text-sm font-bold">{formatPrice(drink.price)}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Button
        className="mt-12"
        to="/menu?collection=drinks"
        variant="secondary"
        icon
      >
        Découvrir les boissons
      </Button>
    </Section>
  );
}
