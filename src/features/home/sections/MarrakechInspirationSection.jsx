import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeContent } from "../../../data/home";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { Reveal } from "../../../components/motion/Reveal";

export function MarrakechInspirationSection() {
  return (
    <Section className="overflow-hidden bg-ink text-cream">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="grid grid-cols-2 gap-4">
          <Reveal className="pt-16">
            <EditorialMedia
              alt="Couleurs de Marrakech"
              className="aspect-[3/4] rounded-t-full"
              label="Couleurs"
              tone="terracotta"
              src="/images/luxury-brunch-table.png"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <EditorialMedia
              alt="Matières et épices"
              className="aspect-[3/4] rounded-b-full"
              label="Matières"
              tone="saffron"
              src="/images/interieur-01.png"
            />
          </Reveal>
        </div>

        <div>
          <SectionHeading
            eyebrow={homeContent.inspiration.eyebrow}
            text={homeContent.inspiration.text}
            title={homeContent.inspiration.title}
          />
          <Reveal className="mt-10 border-t border-cream/15 pt-8">
            <p className="max-w-xl font-display text-2xl leading-9 text-cream/85 sm:text-3xl">
              « Une hospitalité généreuse, des parfums francs et la liberté de
              rester encore un peu. »
            </p>
            <Link
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-cream/25 underline-offset-6 hover:decoration-cream"
              to="/concept"
            >
              Découvrir notre histoire
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
