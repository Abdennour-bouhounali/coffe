import { cn } from "../../lib/cn";

export function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-current/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
