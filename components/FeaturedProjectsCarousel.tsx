import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from './icons/UIIcons';
import { GithubIcon } from './icons/SocialIcons';
import { useShouldReduceMotion } from '../hooks/useReducedMotion';
import { 
  optimizedFadeIn, 
  optimizedSlideIn, 
  optimizedScaleIn, 
  optimizedHover,
  getOptimizedVariants 
} from '../lib/optimizedAnimations';

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

// Advanced animation variants with sophisticated effects
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      opacity: { duration: 0.2 },
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
    transition: {
      duration: 0.3,
    }
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const glowVariants = {
  initial: {
    boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
  },
  hover: {
    boxShadow: [
      "0 0 20px rgba(99, 102, 241, 0.3)",
      "0 0 40px rgba(168, 85, 247, 0.2)",
      "0 0 20px rgba(99, 102, 241, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const FeaturedProjectsCarousel: React.FC<FeaturedProjectsCarouselProps> = ({ projects }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useShouldReduceMotion();

  // Memoize animation variants to prevent recreation on every render
  const animationVariants = useMemo(() => ({
    slideVariants: getOptimizedVariants(
      shouldReduceMotion,
      slideVariants,
      optimizedSlideIn
    ),
    containerVariants: getOptimizedVariants(
      shouldReduceMotion,
      containerVariants,
      optimizedFadeIn
    ),
    glowVariants: shouldReduceMotion ? {} : glowVariants
  }), [shouldReduceMotion]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered && projects.length > 1) {
      intervalRef.current = setInterval(() => {
        paginate(1);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, page]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const paginate = useCallback((newDirection: number) => {
    const newPage = (page + newDirection + projects.length) % projects.length;
    setPage([newPage, newDirection]);
    setCurrentImageIndex(0);
  }, [page, projects.length]);
  
  const goToPage = useCallback((newPage: number) => {
    const newDirection = newPage > page ? 1 : -1;
    setPage([newPage, newDirection]);
    setCurrentImageIndex(0);
    setIsAutoPlaying(false);
    
    // Resume auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [page]);

  const handleImageCycle = useCallback(() => {
    const project = projects[page];
    if (project && project.imageUrls.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % project.imageUrls.length);
    }
  }, [projects, page]);

  const project = projects[page];
  if (!project) return null;

  return (
    <section 
      ref={carouselRef}
      className="relative w-full py-8 overflow-hidden"
    >
      {/* Enhanced container */}
      <div className="relative w-full max-w-5xl mx-auto px-4">
        {/* Enhanced Navigation arrows with professional circular design */}
        <motion.button
          onClick={() => paginate(-1)}
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border-2 border-slate-200/80 dark:border-slate-600/80 hover:border-blue-500/50 dark:hover:border-blue-400/50 z-30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center rounded-full"
          whileHover={{ 
            scale: 1.1,
            x: -3,
            boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isInView ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          aria-label="Previous project"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </motion.button>

        <motion.button
          onClick={() => paginate(1)}
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border-2 border-slate-200/80 dark:border-slate-600/80 hover:border-blue-500/50 dark:hover:border-blue-400/50 z-30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center rounded-full"
          whileHover={{ 
            scale: 1.1,
            x: 3,
            boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isInView ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          aria-label="Next project"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </motion.button>

        <motion.div 
          className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-600/60 shadow-xl hover:shadow-blue-500/20 hover:shadow-2xl overflow-hidden"
          initial={glowVariants.initial}
          animate={isHovered ? glowVariants.hover : glowVariants.initial}
          whileHover={{ 
            scale: 1.01,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              <div className="flex flex-col lg:flex-row min-h-[320px]">
                {/* Enhanced Image Section with multiple images */}
                <div className="w-full lg:w-[60%] relative h-[220px] lg:h-[320px] overflow-hidden">
                  {/* Image container with parallax effect */}
                  <motion.div
                    className="relative w-full h-full"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.img
                      key={`${page}-${currentImageIndex}`}
                      src={project.imageUrls[currentImageIndex] || project.imageUrls[0]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-1000"
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        filter: isHovered 
                          ? "brightness(1.1) contrast(1.1) saturate(1.2)" 
                          : "brightness(1) contrast(1.05) saturate(1.1)"
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    {/* Dynamic gradient overlay based on project status */}
                    <div className={`absolute inset-0 ${
                      project.status === 'Deployed' 
                        ? 'bg-gradient-to-t from-green-900/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-green-900/10 lg:to-green-900/40'
                        : project.status === 'Completed'
                        ? 'bg-gradient-to-t from-blue-900/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-blue-900/10 lg:to-blue-900/40'
                        : 'bg-gradient-to-t from-purple-900/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-purple-900/10 lg:to-purple-900/40'
                    }`}></div>

                    {/* Enhanced status badge with animation */}
                    <motion.div
                      className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border ${
                        project.status === 'Deployed' 
                          ? 'bg-green-500/95 text-white border-green-400/50 shadow-lg shadow-green-500/30'
                          : project.status === 'Completed'
                          ? 'bg-blue-500/95 text-white border-blue-400/50 shadow-lg shadow-blue-500/30'
                          : 'bg-purple-500/95 text-white border-purple-400/50 shadow-lg shadow-purple-500/30'
                      }`}
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {project.status}
                    </motion.div>

                    {/* Image navigation for multiple images */}
                    {project.imageUrls.length > 1 && (
                      <>
                        <button
                          onClick={handleImageCycle}
                          className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:scale-110 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </button>

                        {/* Image indicators */}
                        <div className="absolute bottom-6 left-6 flex gap-1">
                          {project.imageUrls.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentImageIndex 
                                  ? 'bg-white shadow-lg' 
                                  : 'bg-white/50 hover:bg-white/80'
                              }`}
                              aria-label={`View image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Enhanced Content Section with better typography */}
                <motion.div 
                  className="w-full lg:w-[40%] p-6 lg:p-8 flex flex-col justify-center space-y-4 bg-gradient-to-br from-slate-50/98 to-gray-100/98 dark:from-gray-800/98 dark:to-gray-700/98"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Enhanced title with gradient text */}
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 dark:from-slate-100 dark:via-blue-300 dark:to-indigo-300 leading-tight"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  {/* Enhanced description with better typography */}
                  <motion.p 
                    className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium"
                    variants={itemVariants}
                  >
                    {project.description}
                  </motion.p>

                  {/* Enhanced technology tags with better styling */}
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={itemVariants}
                  >
                    {project.tags.slice(0, 4).map((tag, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200/60 dark:border-blue-700/50 shadow-sm"
                        whileHover={{ 
                          scale: 1.03, 
                          y: -1,
                          backgroundColor: "rgba(59, 130, 246, 0.1)"
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {project.tags.length > 4 && (
                      <motion.span 
                        className="px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg font-medium"
                        variants={itemVariants}
                      >
                        +{project.tags.length - 4}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Enhanced action buttons with better animations */}
                  <motion.div 
                    className="flex flex-wrap gap-3"
                    variants={itemVariants}
                  >
                    <Link 
                      to="/projects" 
                      className="group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-200 overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        View All Projects
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ExternalLinkIcon className="h-5 w-5" />
                        </motion.div>
                      </span>
                    </Link>

                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-4 text-base font-semibold text-gray-700 dark:text-gray-300 bg-gray-800 rounded-2xl border-2 border-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          whileHover={{ 
                            borderColor: "#6366f1",
                            backgroundColor: "rgba(99, 102, 241, 0.05)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <ExternalLinkIcon className="h-5 w-5" />
                          </motion.div>
                          Demo
                        </motion.a>
                      )}

                      {project.repoUrl && (
                        <motion.a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-4 text-gray-600 dark:text-gray-400 bg-gray-800 rounded-2xl border-2 border-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          whileHover={{ 
                            borderColor: "#6366f1",
                            backgroundColor: "rgba(99, 102, 241, 0.05)",
                            color: "#6366f1"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <GithubIcon className="h-5 w-5" />
                          </motion.div>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>

                  {/* Project metrics */}
                  <motion.div 
                    className="flex items-center gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60"
                    variants={itemVariants}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{project.tags.length}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tech</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-600 dark:text-slate-400">{project.imageUrls.length}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Views</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        project.status === 'Deployed' ? 'text-green-500 dark:text-green-400' :
                        project.status === 'Completed' ? 'text-blue-500 dark:text-blue-400' :
                        'text-amber-600 dark:text-amber-400'
                      }`}>
                        {project.status === 'Deployed' ? '🚀' : project.status === 'Completed' ? '✅' : '🔨'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Status</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Enhanced project indicators with progress bar */}
        <motion.div 
          className="flex flex-col items-center gap-3 mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isInView ? 1 : 0, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Indicators with progress */}
          <div className="flex items-center gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToPage(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  page === index 
                    ? 'bg-blue-500 dark:bg-blue-400 w-8 shadow-md shadow-blue-500/30' 
                    : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -1,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to project ${index + 1}: ${projects[index]?.title || 'Project'}`}
              >
                {page === index && isAutoPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-blue-400 dark:bg-blue-300 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                  />
                )}
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800/90 dark:bg-slate-700/90 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none backdrop-blur-sm"
                  whileHover={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {projects[index]?.title || 'Project'}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(FeaturedProjectsCarousel);
