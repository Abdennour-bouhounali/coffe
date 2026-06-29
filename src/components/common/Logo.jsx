import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

export function Logo({ className, light = false }) {
  return (
    <Link
      aria-label="Maison Saha — Accueil"
      className={cn(
        "inline-flex items-baseline gap-0.5 font-display text-2xl leading-none tracking-tight",
        light ? "text-cream" : "text-ink",
        className,
      )}
      to="/"
    >
      maison <span className="font-sans text-lg font-black uppercase tracking-widest text-terracotta">Saha</span>
      <span className="text-terracotta text-lg font-bold">.</span>
    </Link>
  );
}
