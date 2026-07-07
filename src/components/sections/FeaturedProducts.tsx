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
                  className="relative block w-full overflow-hidden border border-border/40 rounded-sm bg-bg-dark transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.65)] hover:border-accent/40"
                >
                  {/* Aspect Ratio Container for Image */}
                  <div className="w-full aspect-[4/5] overflow-hidden relative">
                    <img
                      src={product.cover}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Info Header Overlay (Visible permanently or styled neatly) */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
                    <span className="px-2 py-0.5 rounded-[1px] bg-black/70 backdrop-blur-sm border border-white/10 text-[8px] font-mono font-medium text-accent uppercase tracking-widest">
                      {product.category}
                    </span>
                    <span className="p-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white">
                      <ArrowUpRight size={12} />
                    </span>
                  </div>

                  {/* Gradient Overlay (Sleek minimalist black gradient) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-6 md:p-8 text-left">
                    <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {/* Category */}
                      <span className="text-[9px] font-mono font-medium tracking-[0.2em] text-accent uppercase block">
                        {product.category}
                      </span>
                      
                      {/* Name */}
                      <h3 className="font-space font-medium text-lg md:text-xl text-white tracking-tight leading-tight">
                        {product.name}
                      </h3>

                      {/* Capacity */}
                      <span className="block font-sans text-[11px] text-white/70 uppercase tracking-widest">
                        Cap: {product.capacity}
                      </span>

                      {/* Brief micro description */}
                      <p className="font-sans text-xs text-white/50 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      {/* Compliance & Arrow */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex gap-1">
                          {product.compliance.slice(0, 2).map((comp) => (
                            <span 
                              key={comp}
                              className="px-1.5 py-0.5 rounded-[1px] bg-white/10 text-[8px] font-mono font-medium text-white/80 uppercase tracking-wider"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                        <span className="text-white text-xs font-mono font-medium uppercase tracking-widest flex items-center gap-1">
                          View &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Always-visible card bottom strip for modern elegant layout */}
                <div className="mt-4 flex justify-between items-start text-left px-1">
                  <div>
                    <h3 className="font-space text-base font-medium text-text group-hover:text-accent transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-text-muted mt-0.5 font-light">
                      {product.capacity}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted border border-border/40 px-2 py-0.5 rounded-sm">
                    {product.compliance[0]}
                  </span>
                </div>
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
