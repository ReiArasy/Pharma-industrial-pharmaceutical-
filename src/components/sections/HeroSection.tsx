import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function HeroSection() {
  // GSAP animation refs for Hero Content
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Trigger GSAP layout reveal synced with page overlay reveal
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.4 }
      );

      tl.fromTo(
        subheadlineRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 1.0, ease: 'power3.out' },
        '-=0.8'
      );

      tl.fromTo(
        actionsRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
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
  );
}
