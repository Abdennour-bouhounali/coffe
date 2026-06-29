import { MapPin, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/site";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 overflow-hidden rounded-full border border-cream/15 bg-ink p-1 text-cream shadow-[0_12px_40px_rgba(39,26,21,0.28)] sm:hidden"
    >
      <Link
        className="flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors hover:bg-cream/10"
        to="/menu"
      >
        <Utensils aria-hidden="true" className="size-4" />
        Voir le menu
      </Link>
      <a
        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta text-sm font-semibold"
        href={siteConfig.mapsUrl}
        rel="noreferrer"
        target="_blank"
      >
        <MapPin aria-hidden="true" className="size-4" />
        Itinéraire
      </a>
    </nav>
  );
}
