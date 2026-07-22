import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Machinery', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const menuSlideVariants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { 
    x: "0", 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: { 
    x: "calc(100% + 100px)", 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
  }
};

const curveVariants = {
  initial: {
    d: "M100 0 L100 100 Q-100 50 100 0"
  },
  enter: {
    d: "M100 0 L100 100 Q100 50 100 0",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    d: "M100 0 L100 100 Q-100 50 100 0",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Disable page scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Is current page a dark hero section? Home, About, etc. have dark heroes
  // Let's check. For Home ("/"), the hero is dark (video background). For About ("/about"), the hero is dark.
  // Other pages might have a lighter or darker banner, but standard is transparent white text on dark backgrounds,
  // transitioning to dark text on light bg when scrolled.
  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/about' || location.pathname.startsWith('/products/');
  
  // Determine if text should be light or dark based on scrolled state & active page
  const textIsLight = !scrolled && isDarkHeroPage;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out py-5 md:py-6 px-6 md:px-12 ${
          scrolled
            ? 'bg-bg/95 backdrop-blur-md border-b border-border shadow-sm py-4 md:py-5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Wordmark */}
          <Link
            to="/"
            className={`font-space font-medium text-sm tracking-[0.2em] transition-colors duration-400 select-none ${
              textIsLight ? 'text-white' : 'text-text'
            }`}
          >
            PHARMA
          </Link>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-sans text-[13px] font-medium tracking-wide transition-colors duration-400 py-1 ${
                    isActive
                      ? 'text-accent'
                      : textIsLight
                      ? 'text-white/80 hover:text-white'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Request Quotation button/link */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className={`group relative font-space text-[13px] font-medium uppercase tracking-wider transition-colors duration-400 ${
                textIsLight ? 'text-white' : 'text-text'
              }`}
            >
              Request Quotation &rarr;
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-400 rounded-sm focus:outline-none ${
                textIsLight ? 'text-white hover:bg-white/10' : 'text-text hover:bg-black/5'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 md:hidden"
            />

            {/* Sliding Curved Drawer */}
            <motion.div
              variants={menuSlideVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="fixed top-0 right-0 h-screen w-[85vw] sm:w-[400px] bg-neutral-950 text-white z-50 flex flex-col justify-between p-8 md:hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Dynamic Liquid SVG Curve */}
              <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-neutral-950 stroke-none pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                />
              </svg>

              {/* Top Bar inside Overlay */}
              <div className="flex items-center justify-between z-10">
                <span className="font-space font-medium text-sm tracking-[0.2em] text-white">
                  PHARMA
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-sm focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Staggered Links */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="flex flex-col space-y-6 my-auto pl-4 z-10"
              >
                {navLinks.map((link) => {
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.path);

                  return (
                    <motion.div
                      key={link.name}
                      variants={{
                        initial: { opacity: 0, y: 30 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-space text-3xl font-medium tracking-tight block hover:text-accent transition-colors duration-200 ${
                          isActive ? 'text-accent' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  className="pt-6 border-t border-white/10 z-10"
                >
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-space text-sm font-medium text-accent tracking-wider uppercase flex items-center gap-2 hover:text-white transition-colors duration-200"
                  >
                    Request Quotation &rarr;
                  </Link>
                </motion.div>
              </motion.div>

              {/* Bottom Info inside Overlay */}
              <div className="text-xs font-mono text-white/50 space-y-1 z-10 text-left">
                <p>pharma-industrial</p>
                <p>info@pharma.co.id</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
