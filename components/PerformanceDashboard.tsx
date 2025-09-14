import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  cacheHitRate: number;
  apiResponseTime: number;
  cumulativeLayoutShift: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'accessibility' | 'seo' | 'best-practices';
  implemented: boolean;
}

const PerformanceDashboard: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock performance data - in real app, this would come from analytics
  const optimizations: OptimizationSuggestion[] = [
    {
      id: 'lazy-loading',
      title: 'Lazy Loading Implementation',
      description: 'Components are loaded on-demand to improve initial page load time',
      impact: 'high',
      category: 'performance',
      implemented: true
    },
    {
      id: 'code-splitting',
      title: 'Code Splitting',
      description: 'Bundle is split into chunks for better caching and faster loads',
      impact: 'high',
      category: 'performance',
      implemented: true
    },
    {
      id: 'image-optimization',
      title: 'Image Optimization',
      description: 'Images are compressed and served in modern formats (WebP, AVIF)',
      impact: 'medium',
      category: 'performance',
      implemented: true
    },
    {
      id: 'reduced-motion',
      title: 'Reduced Motion Support',
      description: 'Animations respect user preferences for reduced motion',
      impact: 'high',
      category: 'accessibility',
      implemented: true
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode with System Detection',
      description: 'Automatically detects and follows system theme preferences',
      impact: 'medium',
      category: 'accessibility',
      implemented: true
    },
    {
      id: 'semantic-html',
      title: 'Semantic HTML Structure',
      description: 'Proper heading hierarchy and semantic elements for screen readers',
      impact: 'high',
      category: 'accessibility',
      implemented: true
    },
    {
      id: 'meta-tags',
      title: 'SEO Meta Tags',
      description: 'Comprehensive meta tags for better search engine visibility',
      impact: 'high',
      category: 'seo',
      implemented: true
    },
    {
      id: 'typescript',
      title: 'TypeScript Implementation',
      description: 'Strong typing reduces runtime errors and improves maintainability',
      impact: 'high',
      category: 'best-practices',
      implemented: true
    }
  ];

  // Simulate fetching performance metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get real performance metrics when available
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const lcp = paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0;
      
      setMetrics({
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 1250,
        renderTime: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 340,
        memoryUsage: (performance as any)?.memory?.usedJSHeapSize / 1024 / 1024 || 12.5,
        bundleSize: 275, // From build output
        cacheHitRate: 94.2,
        apiResponseTime: 120,
        cumulativeLayoutShift: 0.03,
        firstContentfulPaint: fcp || 890,
        largestContentfulPaint: lcp || 1540,
        totalBlockingTime: 45
      });
      
      setIsLoading(false);
    };
    
    fetchMetrics();
  }, []);

  // Calculate overall performance score
  const performanceScore = useMemo(() => {
    if (!metrics) return 0;
    
    let score = 100;
    
    // Deduct points based on metrics
    if (metrics.loadTime > 2000) score -= 15;
    else if (metrics.loadTime > 1500) score -= 10;
    else if (metrics.loadTime > 1000) score -= 5;
    
    if (metrics.firstContentfulPaint > 1500) score -= 10;
    else if (metrics.firstContentfulPaint > 1000) score -= 5;
    
    if (metrics.largestContentfulPaint > 2500) score -= 15;
    else if (metrics.largestContentfulPaint > 2000) score -= 10;
    
    if (metrics.cumulativeLayoutShift > 0.1) score -= 10;
    else if (metrics.cumulativeLayoutShift > 0.05) score -= 5;
    
    return Math.max(0, Math.min(100, score));
  }, [metrics]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const formatBytes = (bytes: number) => {
    return `${bytes.toFixed(1)} MB`;
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return '⚡';
      case 'accessibility':
        return '♿';
      case 'seo':
        return '🔍';
      case 'best-practices':
        return '✅';
      default:
        return '📊';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5 }
    }
  };

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Open Performance Dashboard"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && setIsVisible(false)}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Performance Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time insights and optimization metrics</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading performance data...</span>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Overall Score */}
                <motion.div
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="relative inline-block">
                    <div className="w-32 h-32 mx-auto">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="2"
                          strokeDasharray={`${performanceScore}, 100`}
                          className={`${performanceScore >= 90 ? 'text-green-500' : performanceScore >= 75 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`}
                          stroke="currentColor"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className={`text-3xl font-bold ${getScoreColor(performanceScore)}`}>
                            {performanceScore}
                          </div>
                          <div className="text-sm text-gray-400">Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Key Metrics Grid */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
                    <div className="text-sm text-blue-400 font-medium">Load Time</div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {metrics && formatTime(metrics.loadTime)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
                    <div className="text-sm text-green-400 font-medium">FCP</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {metrics && formatTime(metrics.firstContentfulPaint)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
                    <div className="text-sm text-purple-400 font-medium">Memory</div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {metrics && formatBytes(metrics.memoryUsage)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl">
                    <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Bundle Size</div>
                    <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {metrics && `${metrics.bundleSize}KB`}
                    </div>
                  </div>
                </motion.div>

                {/* Detailed Metrics */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Core Web Vitals</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">LCP (Largest Contentful Paint)</span>
                        <span className="font-medium">{metrics && formatTime(metrics.largestContentfulPaint)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">CLS (Cumulative Layout Shift)</span>
                        <span className="font-medium">{metrics?.cumulativeLayoutShift.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">TBT (Total Blocking Time)</span>
                        <span className="font-medium">{metrics && formatTime(metrics.totalBlockingTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">System Performance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Cache Hit Rate</span>
                        <span className="font-medium">{metrics?.cacheHitRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">API Response Time</span>
                        <span className="font-medium">{metrics && formatTime(metrics.apiResponseTime)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Render Time</span>
                        <span className="font-medium">{metrics && formatTime(metrics.renderTime)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Optimizations */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">Implemented Optimizations</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {optimizations.map((optimization) => (
                      <div
                        key={optimization.id}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getCategoryIcon(optimization.category)}</span>
                            <h4 className="font-medium text-gray-100">{optimization.title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(optimization.impact)}`}>
                              {optimization.impact}
                            </span>
                            {optimization.implemented && (
                              <span className="text-green-500">✓</span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{optimization.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceDashboard;
