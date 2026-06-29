import { SearchX } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export function MenuEmptyState({ onReset }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-ink/15 bg-white/70 px-6 py-14 text-center shadow-[0_14px_44px_rgba(20,18,15,0.05)] backdrop-blur-sm sm:px-10">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-ink/5 text-ink/55">
        <SearchX aria-hidden="true" className="size-7" strokeWidth={1.7} />
      </div>
      <h3 className="mt-6 font-display text-4xl tracking-[-0.04em] text-ink">
        Rien pour l’instant
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ink/62">
        Essayez une recherche plus large ou réactivez l’ensemble de la carte pour
        retrouver toutes les assiettes et boissons.
      </p>
      <Button className="mt-8" onClick={onReset} variant="secondary">
        Revenir au menu complet
      </Button>
    </div>
  );
}
