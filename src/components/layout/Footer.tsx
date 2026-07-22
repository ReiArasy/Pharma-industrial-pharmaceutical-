import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-bg-dark text-white/90 border-t border-white/5 py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle decorative grid background element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white" />
        <div className="absolute inset-y-0 left-2/3 w-[1px] bg-white" />
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand Signature and Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-space font-semibold text-xs tracking-[0.25em] text-white hover:text-accent transition-colors">
              PHARMA
            </Link>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="font-mono text-[9px] text-accent uppercase tracking-widest">
              cGMP &bull; ISO 9001
            </span>
          </div>
          <p className="font-sans text-xs text-white/40 leading-relaxed max-w-md">
            Custom sterile-grade machinery fabrication. Engineered to satisfy rigorous global standards.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-white/30">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Cikarang, West Java, Indonesia
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-accent" />
              info@pharma.co.id
            </span>
          </div>
        </div>

        {/* Right Side: Navigation and Scroll to Top */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <nav className="flex items-center gap-6 font-space text-[10px] uppercase tracking-wider">
            <Link to="/" className="text-white/50 hover:text-accent transition-colors">Home</Link>
            <Link to="/products" className="text-white/50 hover:text-accent transition-colors">Products</Link>
            <Link to="/about" className="text-white/50 hover:text-accent transition-colors">About</Link>
            <Link to="/contact" className="text-white/50 hover:text-accent transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <span className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded bg-white/[0.03] border border-white/10 hover:border-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all cursor-pointer group"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

      </div>

      {/* Underbar Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-white/30">
        <p>
          &copy; {currentYear} pharma-industrial. All rights reserved.
        </p>
        <p className="font-mono uppercase tracking-widest text-white/15">
          Precision Engineering Solutions
        </p>
      </div>
    </footer>
  );
}
