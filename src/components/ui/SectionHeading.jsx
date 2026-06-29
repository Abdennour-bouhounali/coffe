import { cn } from "../../lib/cn";
import { Reveal } from "../motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className,
  titleClassName,
  as: Heading = "h2",
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Heading
        className={cn(
          "text-balance font-display text-4xl leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-7xl",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {text && (
        <p className="mt-6 max-w-2xl text-base leading-7 text-current/70 sm:text-lg">
          {text}
        </p>
      )}
    </Reveal>
  );
}
