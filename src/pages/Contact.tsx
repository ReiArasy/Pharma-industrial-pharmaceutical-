import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Clock, MessageSquareText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const productsList = [
  'Tablet Press (TP-500)',
  'Fluid Bed Dryer (FBD-200)',
  'High Shear Mixer (HSM-150)',
  'AutoCoat Tablet Coater (AC-120)',
  'Blister Packing (BP-400)',
  'Sterile Liquid Filling (LF-100)',
  'Capsule Filler (CF-800)',
  'Sterilizer Autoclave (AS-1000)',
  'Cleanroom Air Shower (AS-2)',
  'Other / Custom Specifications',
];

const steps = [
  {
    num: '01',
    title: 'Footprint & Workflow Audit',
    desc: 'Our lead fabrication engineers map your cleanroom zoning constraints, material transfers, and pressure differentials to establish standard compliance baselines.',
    badge: 'STAGE 01: FEASIBILITY'
  },
  {
    num: '02',
    title: 'Thermodynamic Simulation',
    desc: 'Advanced digital twins simulate heat distribution, sealing dwell times, and cleanroom HVAC air changes under maximum capacity loads.',
    badge: 'STAGE 02: CALIBRATION'
  },
  {
    num: '03',
    title: 'Precision CNC Machining',
    desc: 'We form high-grade AISI 316L stainless steel components using high-precision surgical-grade CNC lathe tooling at our Cikarang campus.',
    badge: 'STAGE 03: FABRICATION'
  },
  {
    num: '04',
    title: 'IQ/OQ/PQ Validation Protocol',
    desc: 'Execution of complete validation documentation package matching global FDA and local BPOM requirements prior to commissioning.',
    badge: 'STAGE 04: CERTIFICATION'
  }
];

const revealText = "Every custom tablet press, fluid bed dryer, and cleanroom system is fabricated under absolute sterile compliance protocols. Our engineering campus delivers uncompromising aseptic integrity, enabling absolute cGMP and FDA validation compliance for high-output biopharmaceutical manufacturers across Bekasi, Bekasi Nusantara, and Southeast Asia.";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    machineryType: productsList[0],
    capacity: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  // Text Gradient Opacity On Scroll (Character-by-character)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.reveal-char');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true,
      }
    });

    tl.fromTo(chars,
      { opacity: 0.15 },
      { opacity: 1, stagger: 0.01, ease: 'none' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Horizontal Scroll Section using GSAP ScrollTrigger (for desktop, wraps cleanly on mobile)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    let pinAnim: gsap.core.Tween | null = null;

    const setupPin = () => {
      const pin = horizontalSectionRef.current;
      const container = horizontalContainerRef.current;
      if (!pin || !container) return;

      const amountToScroll = container.scrollWidth - window.innerWidth;
      if (amountToScroll <= 0) return;

      pinAnim = gsap.to(container, {
        x: () => -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1,
          start: 'top 12%',
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
          markers: false,
          onUpdate: (self) => {
            const progressBar = document.getElementById('horizontal-scroll-progress');
            if (progressBar) {
              progressBar.style.width = `${self.progress * 100}%`;
            }
          }
        }
      });
    };

    if (mediaQuery.matches) {
      setupPin();
    }

    const handleResize = () => {
      if (pinAnim) {
        pinAnim.scrollTrigger?.kill();
        pinAnim.kill();
        pinAnim = null;
      }
      if (mediaQuery.matches) {
        setupPin();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (pinAnim) {
        pinAnim.scrollTrigger?.kill();
        pinAnim.kill();
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = `Hello Pharma-Industrial Engineering,

I would like to submit a formal Request for Quotation (RFQ) with the following details:

Name: ${formData.name}
Company: ${formData.company}
Email: ${formData.email}
Phone/WhatsApp: ${formData.whatsapp}
Machinery System: ${formData.machineryType}
Target Production Capacity: ${formData.capacity || 'Not specified'}

Project Notes / Custom Specifications:
${formData.message}

Thank you.`;

    const encodedText = encodeURIComponent(formattedMessage);
    const targetWhatsAppNumber = '6281234567890'; // Realistic business contact
    const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = whatsappUrl;
    }, 800);
  };

  const seoTitle = "Contact & RFQ | PT. Pharma-Industrial Manufaktur Nusantara";
  const seoDescription = "Initiate your plant architecture audit. Request a formal quotation (RFQ) or submit your custom specifications directly to our West Java factory and lead design engineers.";
  const siteUrl = `${window.location.origin}/contact`;

  return (
    <div className="w-full bg-bg min-h-screen pt-28 md:pt-36 pb-24 space-y-24">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="pharmaceutical machine RFQ, purchase tablet press, Cikarang factory contact, West Java machinery manufacturer, pharma quotation" />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=80" />
        <meta property="og:site_name" content="Pharma-Industrial" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=80" />
      </Helmet>
      {/* 1. Header Intro Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 max-w-2xl text-left">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent block">
            Contact Us
          </span>
          <h1 className="font-space text-4xl md:text-6xl font-light tracking-tight text-text leading-tight">
            Initiate Your Plant Architecture Audit
          </h1>
          <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
            Request formal quotations or consult with our lead design engineers.
          </p>
        </div>
      </div>

      {/* 2. Text Gradient Opacity On Scroll */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="py-16 md:py-24 border-y border-border/60">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] font-semibold text-accent uppercase tracking-[0.3em] block mb-6">
              Calibration Statement
            </span>
            <p className="font-space text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed tracking-tight text-text text-left flex flex-wrap">
              {revealText.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split('').map((char, cIdx) => (
                    <span 
                      key={cIdx} 
                      className="reveal-char" 
                      style={{ opacity: 0.15 }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Scroll Section */}
      <div ref={horizontalSectionRef} className="relative w-full overflow-hidden bg-bg-alt/20 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] font-semibold text-accent uppercase tracking-[0.3em] block mb-3">
              Fulfillment Protocol
            </span>
            <h2 className="font-space text-3xl md:text-4xl font-light text-text tracking-tight">
              Four-Stage Calibration Workflow
            </h2>
          </div>
          {/* Progress bar container for desktop horizontal scroll */}
          <div className="hidden lg:block w-64 h-[2px] bg-border/40 relative mb-2">
            <div 
              id="horizontal-scroll-progress" 
              className="absolute left-0 top-0 h-full bg-accent w-0 transition-all duration-75"
            />
          </div>
        </div>

        {/* Slide wrapper */}
        <div className="lg:h-[450px] overflow-x-auto lg:overflow-hidden scrollbar-none flex px-6 md:px-12 lg:px-0">
          <div 
            ref={horizontalContainerRef} 
            className="flex gap-6 lg:gap-12 flex-row pb-6 lg:pb-0 lg:pl-[max(24px,calc((100vw-1200px)/2))] lg:pr-24"
          >
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="horizontal-slide w-[280px] sm:w-[350px] lg:w-[450px] shrink-0 bg-bg border border-border p-8 lg:p-12 rounded-[2px] shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent font-semibold tracking-wider">
                      {step.badge}
                    </span>
                    <span className="font-space text-5xl font-extralight text-border/70">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-space text-lg lg:text-xl font-medium text-text tracking-tight mt-4">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-8 border-t border-border/40 mt-6 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>CALIBRATION SYSTEM</span>
                  <span className="text-accent">&bull; COMPLIANT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Form & Map Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Column Left: Quotation Request Form */}
          <div className="space-y-8 text-left bg-bg-alt/40 p-8 border border-border rounded-[2px]">
            <div className="space-y-2">
              <h2 className="font-space text-2xl font-medium text-text tracking-tight">Request Quotation</h2>
              <p className="font-sans text-xs text-text-muted uppercase tracking-wider">Estimation Protocol Document</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div className="flex flex-col space-y-1">
                <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Ir. Hermawan Kartajaya"
                  className="bg-transparent border-b border-border py-2 text-sm text-text focus:outline-none focus:border-accent transition-colors font-sans"
                />
              </div>

              {/* Company Name */}
              <div className="flex flex-col space-y-1">
                <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Company / Institution *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Kalbe Farma Tbk"
                  className="bg-transparent border-b border-border py-2 text-sm text-text focus:outline-none focus:border-accent transition-colors font-sans"
                />
              </div>

              {/* Business Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1">
                  <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g., purchase@company.com"
                    className="bg-transparent border-b border-border py-2 text-sm text-text focus:outline-none focus:border-accent transition-colors font-sans"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="e.g., +62 812 3456 789"
                    className="bg-transparent border-b border-border py-2 text-sm text-text focus:outline-none focus:border-accent transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Target System Dropdown */}
              <div className="flex flex-col space-y-2">
                <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Target Machinery System *</label>
                <select
                  name="machineryType"
                  value={formData.machineryType}
                  onChange={handleChange}
                  className="bg-bg-alt border border-border p-3 text-sm text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-sans rounded-sm"
                >
                  {productsList.map((prod) => (
                    <option key={prod} value={prod}>
                      {prod}
                    </option>
                  ))}
                </select>
              </div>

              {/* Production Capacity Optional */}
              <div className="flex flex-col space-y-1">
                <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Target Production Capacity (Optional)</label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g., 500k tablets/hr, or 500L/batch"
                  className="bg-transparent border-b border-border py-2 text-sm text-text focus:outline-none focus:border-accent transition-colors font-sans"
                />
              </div>

              {/* Detail Message */}
              <div className="flex flex-col space-y-1">
                <label className="font-space text-xs font-medium uppercase tracking-wider text-text-muted">Custom Specifications & Project Scope</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Detail space dimensions, validation codes (FDA/cGMP), installation timelines, or retrofit objectives..."
                  className="bg-transparent border-b border-border py-2 text-sm text-text focus:outline-none focus:border-accent transition-colors font-sans resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 font-space text-xs font-medium uppercase tracking-widest hover:bg-accent transition-colors duration-300 rounded-[2px] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Connecting to secure WhatsApp API...</span>
                ) : (
                  <>
                    <MessageSquareText size={14} /> Submit RFQ via WhatsApp &rarr;
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Column Right: Company Info & Location */}
          <div className="space-y-12 text-left">
            {/* Info block */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-space text-2xl font-light text-text tracking-tight">Pharma-Industrial Manufacturing</h2>
                <p className="font-sans text-xs text-accent uppercase tracking-wider font-medium">Headquarters & Fabrication Campus</p>
              </div>

              <div className="space-y-4 text-sm text-text-muted font-sans">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Jababeka Industrial Estate Phase III, Block B5-C, Cikarang, Bekasi, West Java 17530, Indonesia
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-accent shrink-0 mt-0.5" />
                  <p>
                    <a href="mailto:info@pharma-industrial.co.id" className="text-text hover:text-accent transition-colors font-mono">
                      info@pharma-industrial.co.id
                    </a>
                  </p>
                </div>

                {/* Operational hours */}
                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-text">Office Operational Hours:</p>
                    <p>Monday to Friday, 08:00 to 17:00 (UTC+7)</p>
                    <p className="text-xs text-text-muted/70 mt-1">Saturday, Sunday & Public Holidays: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed - borderless, 300px */}
            <div className="border border-border p-1 bg-bg-alt rounded-[2px]">
              <iframe
                title="Pharma Industrial Factory Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.579483321588!2d107.16104273873995!3d-6.257143974558509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6984d7be15e1df%3A0xf6b579122fb20f4b!2sKawasan%20Industri%20Jababeka%20III!5e0!3m2!1sid!2sid!4v1719811568212!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-sm grayscale filter contrast-[1.05]"
              />
            </div>

            {/* SLA / Quality notice */}
            <div className="p-6 border-l-2 border-accent bg-bg-alt rounded-sm">
              <p className="font-sans text-xs text-text-muted leading-relaxed">
                <strong>Official Service Level Agreement (SLA):</strong> Our pricing estimation team guarantees a preliminary formal quotation back within 48 business hours after details are verified.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
