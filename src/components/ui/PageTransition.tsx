import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

const panelVariants = {
  initial: { scaleY: 1 },
  enter: (i: number) => ({
    scaleY: 0,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.08,
    }
  }),
  exit: (i: number) => ({
    scaleY: 1,
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.04,
    }
  })
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        className="relative w-full"
      >
        {/* Industrial Staggered Shutter Panels */}
        <div className="fixed inset-0 flex z-50 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={panelVariants}
              style={{ originY: 0 }}
              className="h-full bg-neutral-950 flex-1 border-r border-neutral-900/40 last:border-r-0"
            />
          ))}
        </div>

        {/* Main Content Reveal */}
        <motion.div
          variants={contentVariants}
          className="w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

