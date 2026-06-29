import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";

const variants = {
  primary:
    "bg-ink text-cream hover:bg-terracotta focus-visible:outline-terracotta shadow-sm",
  accent:
    "bg-terracotta text-cream hover:bg-ink focus-visible:outline-terracotta shadow-sm",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream focus-visible:outline-ink",
  light:
    "bg-cream text-ink hover:bg-saffron focus-visible:outline-cream shadow-xs",
  text: "px-0 text-ink underline decoration-ink/20 underline-offset-6 hover:decoration-ink focus-visible:outline-ink",
};

export function Button({
  children,
  className,
  variant = "primary",
  to,
  href,
  icon = false,
  ...props
}) {
  const styles = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 cursor-pointer select-none",
    variants[variant],
    className
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.2}
          />
        )}
      </span>
    </>
  );

  // Framer Motion micro-interaction props
  const motionProps = {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link className={styles} to={to} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <a className={styles} href={href} {...props}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      className={styles}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
}
