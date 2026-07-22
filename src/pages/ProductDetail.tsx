import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, ShieldCheck, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';

const fallbackImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const detailContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);

  // Find current product
  const product = products.find((p) => p.slug === slug);

  // Redirect if not found
  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  useEffect(() => {
    if (!product) return;

    // Scroll to top on load
    window.scrollTo(0, 0);

    const el = detailContainerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Hero Parallax Scroll
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Content Rhythm - staggered fade in elements
      const revealElements = el.querySelectorAll('.content-reveal-anim');
      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [product, slug]);

  if (!product) return null;

  // Find related products
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  // If none from same category, take others
  const relatedProducts = related.length > 0 
    ? related 
    : products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const seoTitle = `${product.name} | pharma-industrial`;
  const seoDescription = product.description || `High-performance ${product.name} pharmaceutical system. Certified cGMP and FDA compliant machinery engineered for absolute sterile integrity.`;
  const siteUrl = `${window.location.origin}/products/${product.slug}`;
  const seoImage = product.cover || fallbackImage;

  return (
    <div ref={detailContainerRef} className="w-full bg-bg min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${product.name}, ${product.category}, pharma machine, pharmaceutical automation, Cikarang factory, cGMP, FDA validation`} />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:site_name" content="Pharma" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
      </Helmet>
      
      {/* 70vh Studio lighting Hero */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-bg-dark">
        <img
          ref={heroImageRef}
          src={product.cover || fallbackImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-[120%] object-cover opacity-60 grayscale brightness-90"
          style={{ top: '-10%' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        
        {/* Navigation & Header Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-10 max-w-7xl mx-auto w-full">
          {/* Back button */}
          <div className="pt-20">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-space text-xs font-medium uppercase tracking-widest text-white/85 hover:text-white transition-colors py-2"
            >
              <ArrowLeft size={14} /> Back to Catalogue
            </Link>
          </div>

          {/* Title bottom-left */}
          <div className="space-y-4 max-w-3xl text-left">
            <span className="font-mono text-xs font-medium tracking-[0.3em] text-accent uppercase block">
              {product.category}
            </span>
            <h1 className="font-space text-4xl md:text-6xl font-light text-white tracking-tight leading-tight line-clamp-2">
              {product.name}
            </h1>
            <p className="font-mono text-sm text-white/60">
              Model Series: {product.slug.toUpperCase()} &bull; Compliance: {product.compliance.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Spec Strip - Dark elegant row */}
      <div className="bg-bg-dark py-8 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          {product.specs.slice(0, 4).map((spec, index) => (
            <div key={index} className="flex items-center gap-6 min-w-[200px]">
              {index > 0 && <div className="hidden md:block w-[1px] h-10 bg-white/15" />}
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">
                  {spec.label}
                </span>
                <span className="font-space text-sm md:text-base font-medium text-white">
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Sections with Repeat Content Rhythm */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20 md:space-y-28">
        
        {/* 1. Technical Description */}
        <div className="content-reveal-anim grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="font-space text-2xl md:text-3xl font-light tracking-tight text-text line-clamp-2">
              Technical Description
            </h2>
            <div className="h-[2px] w-12 bg-accent mt-4" />
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="font-space text-lg md:text-xl text-text leading-relaxed font-light line-clamp-2">
              {product.description}
            </p>
            <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed line-clamp-2">
              Every sub-component of the {product.name} is fabricated to micron-level dimensional tolerances and undergoes a rigorous internal verification checklist. The seamless, dead-leg-free sanitary design eliminates contamination pockets, facilitating fast clean cycles and simple validation compliance (CIP/SIP ready).
            </p>
          </div>
        </div>

        {/* 2. Full-bleed component showcase */}
        <div className="content-reveal-anim -mx-6 md:-mx-12 overflow-hidden border-y border-border">
          <div className="aspect-[16/9] w-full relative bg-neutral-900">
            <img
              src={product.images[1] || product.cover || fallbackImage}
              alt="Machine component detail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 hover:scale-101 transition-transform duration-750"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-bg-dark/95 backdrop-blur-sm p-4 md:p-6 border border-white/10 max-w-sm text-left">
              <span className="text-[10px] font-mono text-accent block uppercase tracking-wider mb-1">ENGINEERING METRICS</span>
              <p className="text-white font-space text-sm md:text-base leading-relaxed line-clamp-2">
                High-grade stainless steel configuration with full orbital weld documentation. Engineered for absolute resistance against corrosive formulations and continuous high-temperature sterilization cycles.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Specifications Table */}
        <div className="content-reveal-anim grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="font-space text-2xl md:text-3xl font-light tracking-tight text-text line-clamp-2">
              Full Specifications
            </h2>
            <p className="text-text-muted text-xs font-mono mt-2 uppercase line-clamp-1">TECHNICAL PROTOCOL & PARAMETERS</p>
          </div>
          <div className="md:col-span-8">
            <div className="border border-border rounded-[2px] overflow-hidden bg-bg-alt">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row justify-between p-4 gap-2 text-sm ${
                    i < product.specs.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="font-space font-medium text-text max-w-xs">{spec.label}</span>
                  <span className="font-sans text-text-muted text-left sm:text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Two-Column Image Grid */}
        <div className="content-reveal-anim grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-[4/3] overflow-hidden border border-border">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="Engineering inspection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-95"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden border border-border">
            <img
              src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80"
              alt="Automation logic assembly"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-95"
            />
          </div>
        </div>

        {/* 5. Quick Contact CTA Column */}
        <div className="content-reveal-anim flex justify-center">
          {/* Quick Contact CTA */}
          <div className="border border-text/10 p-8 md:p-12 bg-bg-dark text-white rounded-[2px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full max-w-4xl">
            <div className="space-y-3 md:max-w-2xl text-left">
              <div className="p-3 bg-white/5 text-accent rounded-sm inline-block">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-space text-xl md:text-2xl font-medium text-white">Custom Plant Configuration?</h3>
              <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
                Every manufacturing floor poses unique spatial and process constraints. Our R&D engineers are ready to adapt punch counts, filling nozzles, or integrate custom process sensors to perfectly fit your production setup.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/contact"
                className="inline-block px-6 py-3.5 bg-white text-black font-space text-xs font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors duration-300 rounded-[2px]"
              >
                Initiate Engineering Audit &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 6. Related Products */}
        <div className="content-reveal-anim pt-16 border-t border-border space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-accent block">RELATED SYSTEMS</span>
              <h3 className="font-space text-2xl font-light text-text">Alternative Configurations</h3>
            </div>
            <Link to="/products" className="font-space text-xs font-medium uppercase tracking-wider text-text hover:text-accent transition-colors">
              View Full Lineup &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.slug}
                to={`/products/${rel.slug}`}
                className="relative block w-full overflow-hidden border border-border/30 rounded-sm bg-neutral-900 group transition-all duration-500 ease-out hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={rel.cover || fallbackImage}
                    alt={rel.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />

                  {/* Subtle Bottom Gradient for Contrast & Balance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Minimalist Overlay */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-left z-10">
                    <h4 className="font-space font-medium text-base text-white tracking-tight leading-snug">
                      {rel.name}
                    </h4>

                    {/* View Detail on Hover */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-8 transition-all duration-300 ease-out mt-0 group-hover:mt-1.5">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        View Detail &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
