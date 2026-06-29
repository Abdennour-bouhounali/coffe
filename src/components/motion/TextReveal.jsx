import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/cn";

export function TextReveal({
  as: Component = "h1",
  className,
  lineClassName,
  lines,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Component className={className}>
      {lines.map((line, index) => (
        <span className="block overflow-hidden pb-[0.08em]" key={index}>
          <motion.span
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            className={cn("block origin-left", lineClassName, line.className)}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, rotate: 1.5, y: "112%" }
            }
            transition={{
              delay: 0.12 + index * 0.11,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line.content}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
