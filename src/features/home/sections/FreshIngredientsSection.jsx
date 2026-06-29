import { Leaf, Sprout, Wheat } from "lucide-react";
import { homeContent } from "../../../data/home";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { Reveal } from "../../../components/motion/Reveal";
import { Button } from "../../../components/ui/Button";

const icons = [Leaf, Sprout, Wheat];

export function FreshIngredientsSection() {
  return (
    <Section className="bg-cream text-ink">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={homeContent.ingredients.eyebrow}
            text={homeContent.ingredients.text}
            title={homeContent.ingredients.title}
          />
          <div className="mt-12 divide-y divide-ink/12 border-y border-ink/12">
            {homeContent.ingredients.pillars.map((pillar, index) => {
              const Icon = icons[index];
              return (
                <Reveal
                  className="grid grid-cols-[auto_1fr] gap-5 py-6"
                  delay={index * 0.06}
                  key={pillar.number}
                >
                  <div className="grid size-11 place-items-center rounded-full bg-pistachio">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-2xl">{pillar.title}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/60">
                      {pillar.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Button className="mt-9" to="/menu" variant="secondary" icon>
            Voir ce que nous préparons
          </Button>
        </div>

        <Reveal className="lg:pt-16">
          <EditorialMedia
            alt="Ingrédients frais Maison Saha"
            className="aspect-[4/5] rounded-[2rem]"
            label="Du frais, vraiment"
            tone="apricot"
            src="/images/all-day-brunch.png"
          />
        </Reveal>
      </div>
    </Section>
  );
}
