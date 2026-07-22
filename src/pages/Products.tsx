import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';
import { Product } from '../types';

const fallbackImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400&q=80";

const FILTER_CATEGORIES = [
  { id: 'All', label: 'All Systems' },
  { id: 'Fillers', label: 'Fillers' },
  { id: 'Labelers', label: 'Labelers' },
  { id: 'Sterilization', label: 'Sterilization' },
  { id: 'Tablet & Process', label: 'Tablet & Process' },
];

const SORT_OPTIONS = [
  { id: 'default', label: 'Default Order' },
  { id: 'name-asc', label: 'Name (A-Z)' },
  { id: 'name-desc', label: 'Name (Z-A)' },
  { id: 'capacity', label: 'Capacity' }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Elegant 600ms high-fidelity delay
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter((product) => {
        const cat = product.category.toLowerCase();
        const name = product.name.toLowerCase();
        if (activeCategory === 'Fillers') {
          return cat.includes('filling') || name.includes('filler') || name.includes('filling');
        }
        if (activeCategory === 'Labelers') {
          return cat.includes('labeling') || name.includes('labeler') || name.includes('label');
        }
        if (activeCategory === 'Sterilization') {
          return cat.includes('sterilization') || name.includes('steriliz') || name.includes('autoclave') || name.includes('shower');
        }
        if (activeCategory === 'Tablet & Process') {
          return cat.includes('compression') || cat.includes('mixing') || cat.includes('granulation') || cat.includes('coating') || name.includes('press') || name.includes('coater') || name.includes('mixer') || name.includes('dryer');
        }
        return false;
      });
    }

    // Sort Order
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'capacity') {
      const getNum = (str: string) => {
        const parsed = parseInt(str.replace(/,/g, '').match(/\d+/)?.[0] || '0', 10);
        return parsed;
      };
      result.sort((a, b) => getNum(b.capacity) - getNum(a.capacity));
    }

    return result;
  }, [activeCategory, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setVisibleCount(6); // Reset visible count on category change
  };

  const seoTitle = "Machinery Catalog | pharma-industrial";
  const seoDescription = "Explore our certified cGMP, FDA, and ISO compliant pharmaceutical machinery catalog. Engineered for precision, including high-shear mixers, tablet presses, fluid bed dryers, and sterile filling systems.";
  const siteUrl = `${window.location.origin}/products`;

  return (
    <div className="w-full bg-bg min-h-screen pt-28 md:pt-36 pb-24">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="pharmaceutical machinery catalog, tablet compression, liquid filling line, aseptic bottle packaging, rotary tablet press, industrial granulation" />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=80" />
        <meta property="og:site_name" content="Pharma" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=80" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Intro Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent block">
            Machinery Catalogue
          </span>
          <h1 className="font-space text-4xl md:text-6xl font-light tracking-tight text-text leading-none line-clamp-2">
            High-Performance Systems
          </h1>
          <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed line-clamp-1">
            Fully certified cGMP and FDA compliant industrial machinery designed for absolute safety.
          </p>
        </div>

        {/* Filter & Sort Bar (Sticky) */}
        <div className="sticky top-[64px] md:top-[80px] bg-bg/95 backdrop-blur-md z-30 border-b border-border py-4 -mx-6 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex space-x-8 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 md:pb-0">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative py-2 font-space text-[12px] font-medium uppercase tracking-widest transition-colors duration-200 focus:outline-none cursor-pointer ${
                    isActive ? 'text-text' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="filterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-border/60 pt-3 md:pt-0">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-text border border-border/80 px-2 py-1 font-space text-[11px] uppercase tracking-wider rounded-[2px] focus:outline-none focus:border-accent cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-bg text-text">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Gallery Grid */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                [...Array(6)].map((_, index) => {
                  return (
                    <motion.div
                      layout
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                      className="w-full group animate-pulse"
                    >
                      <div className="relative block w-full overflow-hidden border border-border/20 rounded-sm bg-bg-dark/30 p-4 space-y-4">
                        {/* Shimmer Image Box */}
                        <div className="w-full aspect-[4/3] bg-neutral-900/60 rounded-[1px] relative overflow-hidden" />
                        
                        {/* Text Placeholders */}
                        <div className="space-y-3 pt-2">
                          <div className="h-2.5 bg-neutral-900 rounded-[1px] w-1/4" />
                          <div className="h-4 bg-neutral-900 rounded-[1px] w-3/4" />
                          <div className="h-2.5 bg-neutral-950 rounded-[1px] w-1/3" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                displayedProducts.map((product) => {
                  return (
                    <motion.div
                      layout
                      key={product.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full group"
                    >
                      <Link
                        to={`/products/${product.slug}`}
                        className="relative block w-full overflow-hidden border border-border/30 rounded-sm bg-neutral-900 transition-all duration-500 ease-out hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                      >
                        {/* Minimalist Gallery Image Container */}
                        <div className="w-full aspect-[4/3] overflow-hidden relative">
                          <img
                            src={product.cover || fallbackImage}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = fallbackImage;
                            }}
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
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
              <p className="text-text font-space text-lg font-medium">No Products Found</p>
              <p className="text-text-muted font-sans text-sm">There are no systems matching the current filters.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!isLoading && filteredProducts.length > visibleCount && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-4 font-space text-xs font-medium uppercase tracking-widest text-text border border-text hover:bg-text hover:text-bg transition-colors duration-300 rounded-[2px]"
            >
              Load More Systems &darr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
