import { Coffee } from "lucide-react";
import { Section } from "../../../components/ui/Section";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/motion/Reveal";

export function FinalCtaSection() {
  return (
    <Section className="overflow-hidden bg-saffron text-ink">
      <Reveal className="relative text-center">
        <Coffee
          aria-hidden="true"
          className="mx-auto mb-8 size-10 rotate-[-8deg]"
          strokeWidth={1.4}
        />
        <p className="eyebrow mb-6">À très vite</p>
        <h2 className="mx-auto max-w-5xl text-balance font-display text-5xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-9xl">
          Alors, on se retrouve autour d’un café ?
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-ink/65 sm:text-lg">
          Choisissez votre prochain favori, puis venez le goûter à Paris.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/menu" icon>
            Découvrir le menu
          </Button>
          <Button to="/nous-trouver" variant="secondary">
            Venir nous voir
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
