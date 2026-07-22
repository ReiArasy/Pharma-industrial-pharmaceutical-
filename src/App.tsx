import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import PageTransition from './components/ui/PageTransition';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset standard scroll position on path change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet 
        defaultTitle="pharma-industrial | Certified Pharmaceutical Machinery" 
        titleTemplate="%s | pharma-industrial"
      >
        <html lang="en" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="og:site_name" content="pharma-industrial" />
      </Helmet>
      <Router>
        <ScrollToTop />
        <SmoothScrollProvider>
          <div className="relative min-h-screen flex flex-col bg-bg text-text selection:bg-accent selection:text-white overflow-x-hidden">
            {/* Custom interactive cursor */}
            <CustomCursor />

            {/* Main content wrapper which scrolls over the sticky footer */}
            <div className="relative z-10 bg-bg shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex-grow flex flex-col min-h-screen">
              {/* Site Navigation */}
              <Navbar />

              {/* Main Content Area with elegant fade and slide transitions */}
              <main className="w-full flex-grow">
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Fallback to Home */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </PageTransition>
              </main>
            </div>

            {/* Pure CSS Sticky Reveal Footer - Beautiful, responsive and 100% Lenis compatible */}
            <div className="sticky bottom-0 left-0 w-full z-0">
              <Footer />
            </div>
          </div>
        </SmoothScrollProvider>
      </Router>
    </HelmetProvider>
  );
}
