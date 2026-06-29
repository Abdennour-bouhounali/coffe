import { Instagram } from "lucide-react";
import { galleryItems } from "../../../data/gallery";
import { homeContent } from "../../../data/home";
import { siteConfig } from "../../../data/site";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/motion/Reveal";

export function InstagramLifestyleSection() {
  return (
    <Section className="overflow-hidden bg-terracotta text-cream" contained={false}>
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={homeContent.social.eyebrow}
            text={homeContent.social.text}
            title={homeContent.social.title}
          />
          <Button
            className="self-start lg:self-auto"
            href={siteConfig.instagramUrl}
            icon
            rel="noreferrer"
            target="_blank"
            variant="light"
          >
            <Instagram aria-hidden="true" className="size-4" />
            Suivre notre quotidien
          </Button>
        </div>
      </div>

      <Reveal className="scrollbar-hidden mt-14 flex snap-x gap-4 overflow-x-auto px-5 sm:px-8 lg:mt-20 lg:px-12 xl:px-16">
        {galleryItems.slice(0, 5).map((item, index) => (
          <EditorialMedia
            alt={item.label}
            className={`shrink-0 snap-center rounded-[1.5rem] ${
              index % 2
                ? "mt-10 aspect-[3/4] w-[65vw] sm:w-72"
                : "aspect-[4/5] w-[72vw] sm:w-80"
            }`}
            key={item.id}
            label={item.label}
            tone={item.tone}
          />
        ))}
      </Reveal>
    </Section>
  );
}
