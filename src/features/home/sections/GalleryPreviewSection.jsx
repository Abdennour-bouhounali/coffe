import { galleryItems } from "../../../data/gallery";
import { homeContent } from "../../../data/home";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/motion/Reveal";

export function GalleryPreviewSection() {
  return (
    <Section className="bg-sand text-ink">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={homeContent.gallery.eyebrow}
          text={homeContent.gallery.text}
          title={homeContent.gallery.title}
        />
        <Button className="self-start lg:self-auto" to="/galerie" variant="secondary" icon>
          Entrer dans notre univers
        </Button>
      </div>

      <div className="mt-14 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[16rem] lg:mt-20 lg:grid-cols-4 lg:gap-5">
        {galleryItems.slice(0, 5).map((item, index) => (
          <Reveal
            className={
              index === 0
                ? "col-span-2 row-span-2"
                : index === 3
                  ? "row-span-2"
                  : ""
            }
            delay={index * 0.05}
            key={item.id}
          >
            <EditorialMedia
              alt={item.label}
              className="size-full rounded-[1.25rem]"
              label={item.label}
              tone={item.tone}
              src={item.image}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
