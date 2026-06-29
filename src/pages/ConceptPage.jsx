import { Heart, Sparkles, Sun } from "lucide-react";
import { Seo } from "../components/common/Seo";
import { PageIntro } from "../components/ui/PageIntro";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { EditorialMedia } from "../components/media/EditorialMedia";
import { Reveal } from "../components/motion/Reveal";
import { FinalCtaSection } from "../features/home/sections/FinalCtaSection";

const values = [
  {
    icon: Sun,
    title: "Solaire",
    text: "Une cuisine colorée et une atmosphère qui rendent les journées plus légères.",
  },
  {
    icon: Heart,
    title: "Généreuse",
    text: "Des assiettes franches, un accueil naturel et le plaisir de prendre son temps.",
  },
  {
    icon: Sparkles,
    title: "Vivante",
    text: "Une maison façonnée par son quartier, son équipe et les personnes qui la traversent.",
  },
];

export default function ConceptPage() {
  return (
    <>
      <Seo
        description="Découvrez Maison Saha : un coffee shop parisien inspiré par la lumière, les couleurs et l’hospitalité de Marrakech."
        title="Notre concept"
      />
      <PageIntro
        eyebrow="Notre histoire"
        text="Une maison parisienne nourrie par la lumière de Marrakech, le café de spécialité et le plaisir très simple d’être ensemble."
        title="Plus qu’un café, un moment à soi."
      >
        <Button className="mt-9" to="/menu" icon>
          Goûter notre univers
        </Button>
      </PageIntro>

      <Section className="bg-ink text-cream">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <EditorialMedia
            alt="L’univers de Maison Saha"
            className="aspect-[4/5] rounded-t-full"
            label="Paris · Marrakech"
            tone="terracotta"
            src="/images/hero-maison-saha.png"
          />
          <SectionHeading
            eyebrow="Le point de départ"
            text="Saha signifie la santé, le partage, ce petit mot que l’on offre avant de savourer. Nous en avons fait une maison ouverte : précise dans ses goûts, libre dans son énergie et profondément chaleureuse."
            title="Une hospitalité qui ne joue pas un rôle."
          />
        </div>
      </Section>

      <Section className="bg-sand text-ink">
        <SectionHeading
          align="center"
          eyebrow="Notre caractère"
          title="Du soin, sans cérémonie."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
          {values.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              className="rounded-[1.75rem] border border-ink/10 bg-cream p-7 sm:p-9"
              delay={index * 0.08}
              key={title}
            >
              <Icon aria-hidden="true" className="size-7 text-terracotta" strokeWidth={1.5} />
              <h2 className="mt-10 font-display text-3xl">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-pistachio text-ink">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow="Dans l’assiette"
            text="Fleur d’oranger, pistache, zaatar, agrumes et café de saison : nos inspirations ne sont jamais un décor. Elles donnent du relief à chaque création."
            title="Le goût raconte la suite."
          />
          <div className="grid grid-cols-2 gap-4">
            <EditorialMedia
              alt="Boisson signature"
              className="aspect-[3/4] rounded-[1.5rem]"
              label="À boire"
              tone="apricot"
              src="/images/rose-latte.png"
            />
            <EditorialMedia
              alt="Brunch signature"
              className="mt-12 aspect-[3/4] rounded-[1.5rem]"
              label="À partager"
              tone="saffron"
              src="/images/luxury-brunch-table.png"
            />
          </div>
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
