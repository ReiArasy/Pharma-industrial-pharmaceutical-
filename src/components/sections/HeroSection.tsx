import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';

export default function HeroSection() {
  const [showIntro, setShowIntro] = useState(true);
  
  // GSAP animation refs for Hero Content
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  // Auto-terminate intro overlay after a short calibration period
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // When intro ends, trigger beautiful GSAP layout reveal
    if (!showIntro) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' },
          0.1
        );

        tl.fromTo(
          subheadlineRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 0.8, duration: 1.2, ease: 'power3.out' },
          0.4
        );

        tl.fromTo(
          actionsRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
          0.6
        );
      });

      return () => ctx.revert();
    }
  }, [showIntro]);

  return (
    <>
      {/* 1. INTRO LOADER OVERLAY (Motion Principle: Engage, Elevate Quality, Convey Precision) */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              y: '-100%',
              opacity: 0.9,
              transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white"
          >
            <div className="space-y-6 text-center px-6">
              {/* Spinning micro caliber ring */}
              <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/5" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t border-accent"
                />
                <span className="font-mono text-[9px] text-accent font-semibold tracking-widest uppercase animate-pulse">99.9%</span>
              </div>
              
              <div className="space-y-2">
                <motion.h3 
                  initial={{ tracking: '0.1em', opacity: 0 }}
                  animate={{ tracking: '0.35em', opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="font-space font-light text-[10px] uppercase text-white/50"
                >
                  CALIBRATING SYSTEMS
                </motion.h3>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-space font-light text-base md:text-lg tracking-[0.45em] text-white"
                >
                  PHARMA-INDUSTRIAL
                </motion.h1>
              </div>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 140 }}
                transition={{ delay: 0.1, duration: 1.2, ease: "easeInOut" }}
                className="h-[1px] bg-accent/40 mx-auto"
              />

              <p className="font-mono text-[9px] text-white/30 tracking-wider uppercase">
                Aseptic Engineering Standard &bull; Version 2.6.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE HERO SECTION (Centered, Minimalist, Grayscale-Filtered Looping Background) */}
      <section 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center px-6 md:px-12"
      >
        {/* Background Looping YouTube Video of Outpatient Pharmacy Automation System */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-full min-h-[56.25vw] opacity-30 scale-102">
            <iframe
              src="https://www.youtube.com/embed/-6iUTGZTkm8?autoplay=1&mute=1&controls=0&loop=1&playlist=-6iUTGZTkm8&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1"
              title="Outpatient Pharmacy Automation System (OPAS) at KKH"
              className="w-full h-full grayscale contrast-[1.05] pointer-events-none select-none border-0"
              allow="autoplay; encrypted-media"
            />
          </div>
          {/* Multi-layered subtle gradient overlay for readability & high-contrast minimalism */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/95" />
          <div className="absolute inset-0 bg-radial-gradient-to-c from-transparent via-transparent to-black/95" />
        </div>

        {/* Centered Typography Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-8 md:space-y-10">
          
          {/* Micro-label */}
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent font-medium">
              cGMP & FDA Compliant Machinery
            </span>
          </div>

          {/* Centered Hero Headline - Refined to ultra-clean light weights */}
          <div className="overflow-hidden">
            <h1 
              ref={headlineRef}
              className="font-space text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.15] md:leading-[1.1] line-clamp-2"
            >
              Engineering Absolute Precision <br />
              <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-white">
                For Sterile Process Lines
              </span>
            </h1>
          </div>

          {/* Centered Subtitle */}
          <p
            ref={subheadlineRef}
            className="text-white/70 font-sans text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed line-clamp-1 font-light tracking-wide"
          >
            State-of-the-art machinery and sterile process lines engineered to the highest regulatory standards.
          </p>

          {/* Action Call To Actions */}
          <div 
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-3.5 font-space text-xs font-medium uppercase tracking-[0.15em] text-black bg-white hover:bg-neutral-200 transition-all duration-300 rounded-[2px]"
            >
              Explore Machinery Catalog
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 font-space text-xs font-medium uppercase tracking-[0.15em] text-white border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300 rounded-[2px]"
            >
              Request Consultation
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
