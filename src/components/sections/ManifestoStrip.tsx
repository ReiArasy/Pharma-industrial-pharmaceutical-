import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ManifestoStrip() {
  return (
    <section className="bg-bg-dark text-white py-16 md:py-28 px-6 md:px-12 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left Column: Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 md:space-y-8"
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent block">
            Our Manifesto
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-light tracking-tight text-white leading-tight line-clamp-2">
            Engineered to the <br />Highest Sanitary Standards.
          </h2>
          <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed max-w-lg line-clamp-1 font-light">
            Pharma designs and manufactures high-performance pharmaceutical machinery certified to strict regulatory guidelines.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 font-space text-xs font-medium uppercase tracking-wider text-accent hover:text-accent/90 transition-colors"
            >
              About Our Technology &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Industrial Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1000&q=80"
            alt="Sterile pharma cleanroom manufacturing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-90 hover:scale-102 transition-transform duration-750"
          />
          {/* Subtle industrial overlay */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
