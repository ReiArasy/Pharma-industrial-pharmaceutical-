import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    const isCurrentDetail = pathname.startsWith('/products/') && pathname !== '/products/';
    const isPrevDetail = prevPath.startsWith('/products/') && prevPath !== '/products/';

    // Skip overlay animation when:
    // 1. Navigating TO product detail page (/products/:slug)
    // 2. Navigating FROM product detail page (/products/:slug) BACK TO catalog (/products)
    if (isCurrentDetail || (isPrevDetail && pathname === '/products')) {
      setShowOverlay(false);
      setCurrentPath(pathname);
      return;
    }

    setCurrentPath(pathname);
    setShowOverlay(true);

    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Determine route transition label
  const getPageTitle = (path: string) => {
    if (path === '/' || path === '') {
      return { brand: 'PHARMA', tag: '' };
    }
    if (path.startsWith('/products')) {
      return { brand: 'PHARMA', tag: 'MACHINERY' };
    }
    if (path.startsWith('/about')) {
      return { brand: 'PHARMA', tag: 'ABOUT' };
    }
    if (path.startsWith('/contact')) {
      return { brand: 'PHARMA', tag: 'CONTACT' };
    }
    return { brand: 'PHARMA', tag: '' };
  };

  const { brand, tag } = getPageTitle(currentPath);

  return (
    <div className="relative w-full min-h-screen">
      {/* High-End Global Route Transition Curtain Overlay */}
      <AnimatePresence mode="wait">
        {showOverlay && (
          <motion.div
            key={currentPath + '-overlay'}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              y: '-100%',
              opacity: 0.98,
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-white px-4 md:px-8 overflow-hidden pointer-events-none"
          >
            <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
              {/* Minimalist Brand + Route Typography (Single line, perfectly centered on all viewports) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 font-space font-light text-base sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase whitespace-nowrap w-full overflow-hidden"
              >
                <span className="tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] pl-[0.2em] sm:pl-[0.3em] md:pl-[0.4em]">
                  {brand}
                </span>
                {tag && (
                  <>
                    <span className="text-accent font-normal text-sm sm:text-xl md:text-2xl lg:text-3xl select-none">
                      —
                    </span>
                    <span className="text-white/80 font-extralight tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] pl-[0.2em] sm:pl-[0.3em] md:pl-[0.4em]">
                      {tag}
                    </span>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      {children}
    </div>
  );
}
