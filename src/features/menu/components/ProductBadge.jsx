import { Flame, Leaf, Sparkles } from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import { menuBadgeMap } from "../../../data/menu";
import { cn } from "../../../lib/cn";

const icons = {
  popular: Flame,
  vegetarian: Leaf,
  new: Sparkles,
};

export function ProductBadge({ type }) {
  const badge = menuBadgeMap[type];
  const Icon = icons[type];

  if (!badge || !Icon) return null;

  return (
    <Badge
      className={cn(
        "inline-flex items-center gap-1.5 border px-3 py-1.5 text-[0.62rem] tracking-[0.16em]",
        badge.accent,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
      {badge.label}
    </Badge>
  );
}
