import { Seo } from "../components/common/Seo";
import { PageIntro } from "../components/ui/PageIntro";
import { Section } from "../components/ui/Section";
import { GalleryGrid } from "../features/gallery/components/GalleryGrid";
import { FinalCtaSection } from "../features/home/sections/FinalCtaSection";

export default function GalleryPage() {
  return (
    <>
      <Seo
        description="Découvrez en images les brunchs, boissons, gestes et moments de vie de Maison Saha à Paris."
        title="Galerie"
      />
      <PageIntro
        eyebrow="Le journal en images"
        text="La lumière, les gestes, les assiettes et toutes les petites choses qui donnent à la maison son énergie."
        title="Des moments à vivre, pas seulement à regarder."
      />
      <Section className="bg-sand text-ink">
        <GalleryGrid />
      </Section>
      <FinalCtaSection />
    </>
  );
}
