import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import ManifestoStrip from '../components/sections/ManifestoStrip';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import StatsCounter from '../components/sections/StatsCounter';
import CTAStrip from '../components/sections/CTAStrip';

export default function Home() {
  const seoTitle = "pharma-industrial | Sterile Machinery Fabrication";
  const seoDescription = "Pioneering high-performance pharmaceutical machinery fabrication. We engineer precision tablet presses, fluid bed dryers, and sterilizers complying with global cGMP, FDA, and ISO standards.";
  const siteUrl = window.location.origin;

  return (
    <div className="w-full">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="pharmaceutical machinery, tablet press, fluid bed dryer, sterile liquid filling, autoclave, cleanroom, cGMP, FDA validation, Cikarang" />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=80" />
        <meta property="og:site_name" content="pharma-industrial" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=80" />
      </Helmet>

      <HeroSection />
      <ManifestoStrip />
      <FeaturedProducts />
      <StatsCounter />
      <CTAStrip />
    </div>
  );
}
