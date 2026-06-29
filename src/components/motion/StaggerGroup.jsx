import { motion, useReducedMotion } from "motion/react";
import { stagger } from "../../lib/animations";

export function StaggerGroup({
  children,
  className,
  amount = 0.15,
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={stagger}
      viewport={{ once, amount }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = motion.div;
