import { Seo } from "../components/common/Seo";
import { localBusinessSchema } from "../lib/seo";
import { HeroSection } from "../features/home/sections/HeroSection";
import { FeaturedBrunchSection } from "../features/home/sections/FeaturedBrunchSection";
import { MarrakechInspirationSection } from "../features/home/sections/MarrakechInspirationSection";
import { BestSellersSection } from "../features/home/sections/BestSellersSection";
import { SignatureDrinksSection } from "../features/home/sections/SignatureDrinksSection";
import { FreshIngredientsSection } from "../features/home/sections/FreshIngredientsSection";
import { InstagramLifestyleSection } from "../features/home/sections/InstagramLifestyleSection";
import { GalleryPreviewSection } from "../features/home/sections/GalleryPreviewSection";
import { VisitUsSection } from "../features/home/sections/VisitUsSection";
import { FinalCtaSection } from "../features/home/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <Seo
        description="Maison Saha, coffee shop et brunch solaire à Paris : café de spécialité, assiettes généreuses et inspirations de Marrakech."
        schema={localBusinessSchema}
      />
      <HeroSection />
      <FeaturedBrunchSection />
      <MarrakechInspirationSection />
      <BestSellersSection />
      <SignatureDrinksSection />
      <FreshIngredientsSection />
      <InstagramLifestyleSection />
      <GalleryPreviewSection />
      <VisitUsSection />
      <FinalCtaSection />
    </>
  );
}
