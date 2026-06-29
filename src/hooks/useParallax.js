import { useReducedMotion, useScroll, useTransform } from "motion/react";

export function useParallax(target, distance = 48) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return shouldReduceMotion ? 0 : y;
}
