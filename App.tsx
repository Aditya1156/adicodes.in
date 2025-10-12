
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoadingScreen from './components/LoadingScreen';
import SEO from './components/SEO';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import { initPerformanceMonitoring, addResourceHints } from './lib/componentLoader';
import { useServiceWorker } from './lib/pwaUtils';
import { httpsEnforcement } from './lib/security';
import './styles/accessibility.css';

// Lazy load all non-critical components for better performance
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));
const InstallPrompt = lazy(() => import('./components/InstallPrompt'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const GlowEffectsDemo = lazy(() => import('./components/GlowEffectsDemo'));

// Preload critical components
const preloadComponent = (componentImport: () => Promise<any>) => {
  const componentImportFunction = componentImport;
  componentImportFunction();
};

// Preload components on hover for instant navigation
const usePreloadOnHover = () => {
  useEffect(() => {
    const preloadOnMouseEnter = (selector: string, importFn: () => Promise<any>) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.addEventListener('mouseenter', () => preloadComponent(importFn), { once: true });
      });
    };

    // Preload components when user hovers over navigation links
    setTimeout(() => {
      preloadOnMouseEnter('a[href*="about"]', () => import('./pages/AboutPage'));
      preloadOnMouseEnter('a[href*="projects"]', () => import('./pages/ProjectsPage'));
      preloadOnMouseEnter('a[href*="resume"]', () => import('./pages/ResumePage'));
      preloadOnMouseEnter('a[href*="contact"]', () => import('./pages/ContactPage'));
      preloadOnMouseEnter('a[href*="blog"]', () => import('./pages/BlogPage'));
    }, 1000);
  }, []);
};

// Helper component to handle smooth scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use CSS smooth scroll behavior instead of JavaScript
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Scroll Progress Indicator Component
const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          
          setScrollProgress(scrollPercent);
          setIsVisible(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 z-50 transition-transform duration-300 ease-out"
        style={{ 
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: '0 0'
        }}
      />
      
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </>
  );
};


// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { updateAvailable, updateServiceWorker } = useServiceWorker();

  // Initialize performance monitoring
  useEffect(() => {
    // Enforce HTTPS in production
    httpsEnforcement.enforceHTTPS();
    
    // Add resource hints for better performance
    addResourceHints();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize critical font loading
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
    document.head.appendChild(fontLink);
  }, []);

  // Handle service worker updates
  useEffect(() => {
    if (updateAvailable) {
      // Show update notification
      const shouldUpdate = window.confirm('A new version is available. Update now?');
      if (shouldUpdate) {
        updateServiceWorker();
      }
    }
  }, [updateAvailable, updateServiceWorker]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Add small delay to ensure smooth transition
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  };

  // Prevent flash of unstyled content
  if (!isInitialized && isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <AccessibilityProvider>
          <HelmetProvider>
            <SEO />
            <BrowserRouter>
              <ScrollToTop />
              <AppContent />
            </BrowserRouter>
          </HelmetProvider>
        </AccessibilityProvider>
      )}
    </>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Use preloading hook
  usePreloadOnHover();

  // Add smooth scrolling to the entire page
  useEffect(() => {
    // CSS scroll-behavior is already set in index.css, no need to duplicate
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollProgressIndicator />
      <Navbar />
      {/* Add proper spacing for fixed navbar */}
      <main 
        id="main-content"
        className={`flex-grow pt-20 ${isHomePage ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8'} ${isHomePage ? 'py-0' : 'py-8'}`}
        role="main"
        aria-label="Main content"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/glow-demo" element={<GlowEffectsDemo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
      <Suspense fallback={null}>
        <InstallPrompt />
      </Suspense>
    </div>
  );
};

export default App;