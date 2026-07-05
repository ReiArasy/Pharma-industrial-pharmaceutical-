import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Anchor } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Scroll tracking parallax for company story image
      const storyImg = el.querySelector('.story-img-scroll');
      if (storyImg) {
        gsap.fromTo(
          storyImg,
          { scale: 1.15, yPercent: -6 },
          {
            scale: 1.0,
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: storyImg.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.0,
            },
          }
        );
      }

      // 2. Viewport-aware reveal for Company Story text
      const storyReveals = el.querySelectorAll('.story-reveal');
      if (storyReveals.length > 0) {
        gsap.fromTo(
          storyReveals,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.story-section-trigger',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Viewport-aware reveal for Three Pillars (Values)
      const valueCards = el.querySelectorAll('.value-card-reveal');
      if (valueCards.length > 0) {
        gsap.fromTo(
          valueCards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.values-section-trigger',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Scroll tracking parallax for facility images
      const facilityImgs = el.querySelectorAll('.facility-img-scroll');
      facilityImgs.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, yPercent: -8 },
          {
            scale: 1.02,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });

      // 5. Viewport-aware reveal for Facilities Section grid items
      const facilityCards = el.querySelectorAll('.facility-card-reveal');
      if (facilityCards.length > 0) {
        gsap.fromTo(
          facilityCards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.facilities-section-trigger',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 6. Viewport-aware reveal for Team Leadership cards
      const teamCards = el.querySelectorAll('.team-card-reveal');
      if (teamCards.length > 0) {
        gsap.fromTo(
          teamCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.team-section-trigger',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 7. Viewport-aware reveal for Services items
      const serviceItems = el.querySelectorAll('.service-item-reveal');
      if (serviceItems.length > 0) {
        gsap.fromTo(
          serviceItems,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.services-section-trigger',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  // Text for Hero reveal
  const heroText = "We design systems that protect the standards of human life.";
  const words = heroText.split(" ");

  const services = [
    { num: '01', name: 'Field Installation & Sterile-Grade Orbital Piping' },
    { num: '02', name: 'System Validation & Commissioning (IQ/OQ Protocols)' },
    { num: '03', name: 'Preventative Maintenance & OEM Spare Parts Support' },
    { num: '04', name: 'Technical Operator Certification & Plant Training' },
    { num: '05', name: 'Retrofitting & Controls Upgrade (Legacy Automation)' },
  ];

  const facilities = [
    { name: 'Primary Assembly Bay', desc: 'Large-scale mechanical assembly area with overhead overhead gantry cranes.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400&q=80' },
    { name: 'Aseptic QC Laboratory', desc: 'Certified class A laminar flow workstation for sterility and volumetric filling trials.', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=400&q=80' },
    { name: 'Automation & Panel CNC', desc: 'PLC logic programming, wiring bay, and electrical safety validation testing.', image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=600&h=400&q=80' },
  ];

  const seoTitle = "About PT. Pharma-Industrial Manufaktur Nusantara | Engineering Excellence";
  const seoDescription = "Learn about our engineering philosophy, strict cGMP validation standards, professional team of mechanical designers, and state-of-the-art Cikarang fabrication facility.";
  const siteUrl = `${window.location.origin}/about`;

  return (
    <div ref={containerRef} className="w-full bg-bg overflow-hidden">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="pharmaceutical engineers, sterile piping, IQ OQ validation, factory facility Cikarang, cGMP compliance, ISO 9001 certification" />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&h=630&q=80" />
        <meta property="og:site_name" content="Pharma-Industrial" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&h=630&q=80" />
      </Helmet>
      
      {/* Section 1 — Hero Text (Typography pure) */}
      <section className="relative h-screen w-full bg-bg-dark flex items-center justify-center px-6 md:px-12 text-center overflow-hidden">
        {/* Precision Industrial Animation Mask Entry */}
        <div className="absolute inset-0 flex flex-col pointer-events-none z-20">
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ originY: 0 }}
            className="w-full h-1/2 bg-neutral-950 border-b border-border/10"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ originY: 1 }}
            className="w-full h-1/2 bg-neutral-950 border-t border-border/10"
          />
        </div>

        <div className="max-w-4xl space-y-6 z-10">
          <span className="font-mono text-[11px] font-medium text-accent tracking-[0.25em] block uppercase animate-pulse">
            Our Engineering Philosophy
          </span>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 line-clamp-2">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="w-12 h-[1px] bg-white mx-auto mt-8"
          />
        </div>
      </section>

      {/* Section 2 — Company Story */}
      <section className="story-section-trigger py-24 md:py-36 px-6 md:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="aspect-[4/3] overflow-hidden border border-border relative">
            {/* Precision Industrial Horizontal Slide Mask */}
            <motion.div
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              style={{ originX: 1 }}
              className="absolute inset-0 bg-accent z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80"
              alt="Pharma factory installation"
              referrerPolicy="no-referrer"
              className="story-img-scroll w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="space-y-6 text-left">
            <span className="story-reveal font-mono text-[10px] font-medium text-accent tracking-widest uppercase block">
              PHARMA-INDUSTRIAL MANUFACTURING
            </span>
            <h2 className="story-reveal font-space text-3xl md:text-5xl font-light tracking-tight text-text leading-tight line-clamp-2">
              Bespoke Craftsmanship with Global Execution Standards.
            </h2>
            <div className="story-reveal h-[2px] w-12 bg-accent" />
            <p className="story-reveal font-sans text-sm md:text-base text-text-muted leading-relaxed line-clamp-2">
              Founded in 2011, Pharma-Industrial offers cleanroom-certified machinery that meets strict regulatory standards as a premium European alternative.
            </p>
            <p className="story-reveal font-sans text-sm md:text-base text-text-muted leading-relaxed line-clamp-2">
              We combine advanced mechanical design with global execution, offering certified tablet press and aseptic filling machinery lines.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3 — Company Values (3 pillars) */}
      <section className="values-section-trigger py-24 md:py-36 px-6 md:px-12 bg-bg-alt border-b border-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-left space-y-3">
            <span className="font-mono text-[10px] font-medium text-accent tracking-widest uppercase block">PRIMARY DIRECTIVES</span>
            <h2 className="font-space text-3xl md:text-4xl font-light text-text line-clamp-2">Three Pillars of Our Engineering</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="value-card-reveal bg-bg p-8 border border-border rounded-[2px] space-y-4 text-left">
              <div className="p-3 bg-primary/10 text-primary rounded-sm inline-block">
                <Cpu size={24} />
              </div>
              <h3 className="font-space text-lg font-medium text-text">01. Absolute Precision</h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed">
                Zero-tolerance for dimensional deviation. All tooling, dosing nozzles, and mechanical sync drives are manufactured to micron-level tolerances to guarantee dosage weight variation falls well within strict regulatory guidelines.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="value-card-reveal bg-bg p-8 border border-border rounded-[2px] space-y-4 text-left">
              <div className="p-3 bg-primary/10 text-primary rounded-sm inline-block">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-space text-lg font-medium text-text">02. Regulatory Compliance</h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed">
                Our machinery lines are designed from the ground up to facilitate painless cGMP, GMP Annex 1, ISO, and FDA validation protocols. Sterile orbital welds, RABS isolation, and certified premium alloys are standardized.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="value-card-reveal bg-bg p-8 border border-border rounded-[2px] space-y-4 text-left">
              <div className="p-3 bg-primary/10 text-primary rounded-sm inline-block">
                <Anchor size={24} />
              </div>
              <h3 className="font-space text-lg font-medium text-text">03. Operational Reliability</h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed">
                We build machinery to operate continuously 24/7 on primary packaging and processing lines with minimal downtime. Clean mechanical modularity and regional part supply networks guarantee decades of operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Production Facilities */}
      <section className="facilities-section-trigger py-24 md:py-36 px-6 md:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3 max-w-xl text-left">
            <span className="font-mono text-[10px] font-medium text-accent tracking-widest uppercase block">THE FABRICATION CAMPUS</span>
            <h2 className="font-space text-3xl md:text-4xl font-light text-text line-clamp-2">Cikarang Engineering Workshop</h2>
            <p className="font-sans text-sm text-text-muted leading-relaxed line-clamp-1">
              Integrated factory with multi-axis CNC centers and cleanroom test assembly bays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((fac, i) => (
              <div key={i} className="facility-card-reveal group relative aspect-[4/3] overflow-hidden border border-border rounded-[2px] bg-bg-dark">
                {/* Precision Industrial Vertical Scale Mask */}
                <motion.div
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: i * 0.15 }}
                  style={{ originY: 1 }}
                  className="absolute inset-0 bg-neutral-900 z-10"
                />
                <img
                  src={fac.image}
                  alt={fac.name}
                  referrerPolicy="no-referrer"
                  className="facility-img-scroll w-full h-[120%] object-cover transition-transform duration-700 ease-out group-hover:scale-102 opacity-80 group-hover:opacity-60 grayscale"
                />
                
                {/* Always visible base caption */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent text-left">
                  <h3 className="text-white font-space font-medium text-lg md:text-xl transition-colors group-hover:text-accent">
                    {fac.name}
                  </h3>
                  <p className="text-white/70 font-sans text-xs mt-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Services */}
      <section className="services-section-trigger py-24 md:py-36 px-6 md:px-12 border-b border-border">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-3 text-left">
            <span className="font-mono text-[10px] font-medium text-accent tracking-widest uppercase block">LIFE-CYCLE SUPPORT</span>
            <h2 className="font-space text-3xl md:text-4xl font-light text-text line-clamp-2">Full Life-Cycle Technical Auditing</h2>
            <p className="font-sans text-sm text-text-muted leading-relaxed line-clamp-1">
              Guaranteed regional parts availability and prompt engineering responses.
            </p>
          </div>

          <div className="divide-y divide-border border-t border-b border-border">
            {services.map((serv, index) => (
              <div
                key={index}
                className="service-item-reveal group py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-sm text-text-muted/60 mt-1">{serv.num}</span>
                  <h4 className="font-space text-lg md:text-xl font-medium text-text group-hover:text-primary group-hover:translate-x-2 transition-transform duration-300 text-left">
                    {serv.name}
                  </h4>
                </div>
                <div className="hidden md:block">
                  <span className="text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
