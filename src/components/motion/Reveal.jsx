import { motion, useReducedMotion } from "motion/react";
import { fadeUp } from "../../lib/animations";

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      transition={{ delay }}
      variants={fadeUp}
      viewport={{ once, amount }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </motion.div>
  );
}
