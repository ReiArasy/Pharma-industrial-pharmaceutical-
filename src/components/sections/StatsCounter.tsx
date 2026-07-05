import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { id: 'stat-years', value: 15, suffix: '+', label: 'Years of Precision Fabrication' },
  { id: 'stat-machines', value: 200, suffix: '+', label: 'Industrial Installations' },
  { id: 'stat-clients', value: 50, suffix: '+', label: 'Active Pharma & Biotech Clients' },
  { id: 'stat-compliance', value: 100, suffix: '%', label: 'cGMP & FDA Regulatory Compliance' },
];

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      statsData.forEach((stat) => {
        const counterElement = el.querySelector(`#${stat.id}`);
        if (counterElement) {
          gsap.fromTo(
            counterElement,
            { innerHTML: '0' },
            {
              innerHTML: stat.value,
              duration: 2,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              onUpdate: function () {
                // Keep the suffix appended
                const progress = this.progress();
                const currentValue = Math.floor(stat.value * progress);
                counterElement.innerHTML = `${currentValue}${stat.suffix}`;
              },
              onComplete: function () {
                // Ensure exact target is set
                counterElement.innerHTML = `${stat.value}${stat.suffix}`;
              }
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-dark text-white py-20 px-6 md:px-12 border-b border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
        {statsData.map((stat) => (
          <div key={stat.id} className="space-y-2">
            {/* Value */}
            <div
              id={stat.id}
              className="font-space text-5xl md:text-7xl font-light text-accent tracking-tight select-none"
            >
              0{stat.suffix}
            </div>
            {/* Label */}
            <div className="font-sans text-[11px] md:text-xs text-white/50 uppercase tracking-[0.15em] leading-relaxed max-w-[180px] mx-auto md:mx-0">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
