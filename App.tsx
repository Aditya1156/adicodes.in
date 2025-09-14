
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatbotWidget from './components/ChatbotWidget';
import PerformanceDashboard from './components/PerformanceDashboard';
import { usePerformanceMonitor } from './lib/performance';

// Lazy load non-critical pages for better performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Helper component to handle smooth scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};


// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

const App: React.FC = () => {
  // Initialize performance monitoring
  usePerformanceMonitor();

  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className={`flex-grow ${isHomePage ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8'} py-8`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatbotWidget />
      <PerformanceDashboard />
    </div>
  );
};

export default App;