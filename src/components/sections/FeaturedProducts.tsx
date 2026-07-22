import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../../data/products';

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featured = products.filter((p) => p.featured);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    
    // Calculate scroll percentage (0 to 100)
    const pct = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(pct);

    // Update navigation states
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to set correct states
    handleScroll();

    // Re-check on window resize
    window.addEventListener('resize', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [featured.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-bg py-24 md:py-36 px-6 md:px-12 border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl text-left">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent block">
              Machinery Lineup
            </span>
            <h2 className="font-space text-3xl md:text-5xl font-light tracking-tight text-text leading-none">
              Featured Systems
            </h2>
            <p className="font-sans text-sm text-text-muted leading-relaxed font-light">
              Precision-fabricated components built for the most demanding sanitary standards, ensuring optimal material flow.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-6 self-start md:self-end">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-space text-xs font-medium uppercase tracking-wider text-text hover:text-accent transition-colors duration-300 mr-4"
            >
              View Entire Catalogue <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll Left"
                className={`p-3 border rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-border text-text hover:bg-text hover:text-bg-dark cursor-pointer'
                    : 'border-border/20 text-text/20 cursor-not-allowed'
                }`}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll Right"
                className={`p-3 border rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-border text-text hover:bg-text hover:text-bg-dark cursor-pointer'
                    : 'border-border/20 text-text/20 cursor-not-allowed'
                }`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative -mx-6 md:-mx-12 px-6 md:px-12">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none py-6 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {featured.map((product) => (
              <div
                key={product.slug}
                className="snap-start shrink-0 w-[290px] sm:w-[350px] md:w-[420px] group snap-always"
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="relative block w-full overflow-hidden border border-border/30 rounded-sm bg-neutral-900 transition-all duration-500 ease-out hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                >
                  {/* Aspect Ratio Container for Image */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.cover}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Subtle Bottom Gradient for Contrast & Balance */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Minimalist Overlay: Product Name in White & View Detail on Hover */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-10">
                      <h3 className="font-space font-medium text-lg md:text-xl text-white tracking-tight leading-snug">
                        {product.name}
                      </h3>

                      {/* View Detail on Hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-8 transition-all duration-300 ease-out mt-0 group-hover:mt-2">
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-accent flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                          View Detail &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Scroll Progress Tracker */}
        <div className="flex flex-col items-center justify-center mt-12 space-y-2">
          <div className="h-[2px] w-48 bg-border/40 relative overflow-hidden rounded-full">
            <div
              className="h-full bg-accent transition-all duration-150 ease-out rounded-full absolute left-0 top-0"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
            Swipe or Drag to Explore &bull; {Math.round(scrollProgress)}%
          </span>
        </div>

      </div>
    </section>
  );
}
