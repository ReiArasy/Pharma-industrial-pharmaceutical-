import { Link } from 'react-router-dom';

export default function CTAStrip() {
  return (
    <section className="bg-primary text-white py-16 md:py-24 px-6 md:px-12 text-center relative overflow-hidden">
      {/* Background depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary to-[#2a5b75] opacity-90 z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-8">
        <h2 className="font-space text-3xl md:text-5xl font-light tracking-tight text-white leading-tight line-clamp-2">
          Require Tailored Manufacturing Solutions?
        </h2>
        
        <p className="font-sans text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed line-clamp-1 font-light">
          Consult on standard capacities and cleanroom spatial layouts with our expert engineering division.
        </p>

        <div className="pt-4">
          <Link
            to="/contact"
            className="inline-block px-8 py-4 font-space text-xs font-medium uppercase tracking-widest text-white border-2 border-white hover:bg-white hover:text-primary transition-all duration-300 rounded-[2px]"
          >
            Request Quotation &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
