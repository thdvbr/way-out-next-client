const easing = [0.3, 0.85, 0.42, 0.96];

export const cardVariants = {
  initial: { scale: 0.9, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export const postHeaderVariants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 0.1, duration: 1, ease: easing },
  },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const postBodyVariants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 0.3, duration: 1, ease: easing },
  },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const morePostVariants = {
  initial: { y: 60, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.4, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

// TODO: dont think this stagger works
export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export const joinVariants = {
  opened: { y: 0 },
  closed: { y: '-48px' },
};

export const adVariants = {
  hidden: { x: '-100vw' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 1,
      bounce: 0.3,
      delay: 0.3,
    },
  },
};
