export const easing = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easing },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: easing },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
