import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, CheckCircleIcon } from './icons/UIIcons';
import { GithubIcon } from './icons/SocialIcons';
import { trackEvent } from '../lib/analytics';
import { 
  staggerContainer,
  staggerItem,
  tagVariants,
  rippleEffect,
  modalImageVariants
} from '../lib/animations';

interface InlineProjectModalProps {
  project: Project | null;
  isExpanded: boolean;
  onClose: () => void;
}

const InlineProjectModal: React.FC<InlineProjectModalProps> = ({ project, isExpanded, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for subtle parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 100, damping: 30 });
  const backgroundY = useSpring(useTransform(mouseY, [-200, 200], [-10, 10]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (isExpanded && project) {
      setCurrentImageIndex(0);
      setIsImageLoading(true);
      setRipples([]);
      trackEvent('View: Inline Project Modal', { project: project.title });
    }
  }, [isExpanded, project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isExpanded || !project) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isExpanded) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, project, currentImageIndex, onClose]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleNextImage = () => {
    if (!project) return;
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % project.imageUrls.length);
  };

  const handlePrevImage = () => {
    if (!project) return;
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + project.imageUrls.length) % project.imageUrls.length);
  };

  const goToImage = (index: number) => {
    if (!project || index === currentImageIndex) return;
    setIsImageLoading(true);
    setCurrentImageIndex(index);
  };

  const createRipple = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 800);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onMouseMove={handleMouseMove}
        >
          {/* Beautiful blur background with gradient overlay */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            style={{
              background: "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%)",
            }}
          />

          {/* Animated gradient particles */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 90% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `,
              x: backgroundX,
              y: backgroundY,
            }}
            animate={{
              background: [
                `radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 50% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)`
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            ref={modalRef}
            className="relative w-[95vw] max-w-7xl h-auto max-h-[95vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30"
            initial={{ 
              scale: 0.8,
              y: 50,
              opacity: 0,
              rotateX: 10
            }}
            animate={{ 
              scale: 1,
              y: 0,
              opacity: 1,
              rotateX: 0
            }}
            exit={{ 
              scale: 0.9,
              y: 30,
              opacity: 0,
              rotateX: -5
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 0.8,
              duration: 0.5
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Professional close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 z-30 p-3 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800"
              whileHover={{ 
                scale: 1.05, 
                rotate: 90,
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            >
              <CloseIcon className="h-5 w-5" />
            </motion.button>

            <div className="flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[600px] overflow-hidden">
              {/* Enhanced image section with proper spacing and alignment */}
              <div className="w-full lg:w-[60%] relative flex flex-col bg-gray-50 dark:bg-gray-800/50">
                <div 
                  ref={imageContainerRef}
                  className="relative flex-1 h-[300px] sm:h-[350px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 cursor-pointer flex items-center justify-center"
                  onClick={createRipple}
                >
                  {/* Ripple effects */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                    {ripples.map(ripple => (
                      <motion.div
                        key={ripple.id}
                        className="absolute w-6 h-6 bg-white/30 rounded-full"
                        style={{ left: ripple.x - 12, top: ripple.y - 12 }}
                        variants={rippleEffect}
                        initial="initial"
                        animate="animate"
                      />
                    ))}
                  </div>

                  {/* Loading overlay */}
                  <AnimatePresence>
                    {isImageLoading && (
                      <motion.div
                        className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center z-10"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">Loading image...</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.img
                    key={currentImageIndex}
                    src={project.imageUrls[currentImageIndex]}
                    alt={`Screenshot ${currentImageIndex + 1} of ${project.title}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onLoad={() => setIsImageLoading(false)}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  />

                  {/* Enhanced gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Professional navigation arrows */}
                  {project.imageUrls.length > 1 && (
                    <>
                      <motion.button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-white rounded-xl shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
                        whileHover={{ 
                          scale: 1.1, 
                          x: -3,
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </motion.button>
                      
                      <motion.button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-white rounded-xl shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
                        whileHover={{ 
                          scale: 1.1, 
                          x: 3,
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </motion.button>
                    </>
                  )}

                  {/* Professional image counter */}
                  {project.imageUrls.length > 1 && (
                    <motion.div 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/70 backdrop-blur-md text-white text-sm rounded-xl border border-white/20 font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentImageIndex + 1} of {project.imageUrls.length}
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Thumbnail strip with better spacing */}
                {project.imageUrls.length > 1 && (
                  <motion.div 
                    className="flex-shrink-0 p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800/70 dark:via-gray-800/50 dark:to-gray-800/70 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                      {project.imageUrls.map((url, index) => (
                        <motion.button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-sm ${
                            index === currentImageIndex 
                              ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-200 dark:ring-indigo-800' 
                              : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:shadow-md'
                          }`}
                          whileHover={{ 
                            scale: 1.08,
                            y: -2,
                            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                        >
                          <img
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover object-center rounded"
                            style={{
                              filter: index === currentImageIndex ? "brightness(1.1) contrast(1.05)" : "brightness(0.9)",
                            }}
                          />
                          {index === currentImageIndex && (
                            <motion.div 
                              className="absolute inset-0 bg-indigo-500/20 backdrop-blur-[1px]"
                              layoutId="activeThumb"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white dark:bg-gray-800 rounded-full text-xs flex items-center justify-center shadow-sm">
                            <span className="text-[8px] font-bold text-gray-600 dark:text-gray-300">
                              {index + 1}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Content section with proper spacing and no overlap */}
              <motion.div 
                className="w-full lg:w-[40%] flex flex-col overflow-hidden bg-gradient-to-br from-white/98 via-white/95 to-white/90 dark:from-gray-900/98 dark:via-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-gray-200/30 dark:border-gray-700/30"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Scrollable content area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
                  {/* Header */}
                  <motion.div className="mb-4" variants={staggerItem}>
                    <motion.h2 
                      className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight"
                      whileHover={{
                        background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {project.title}
                    </motion.h2>
                    
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                      project.status === 'Deployed' 
                        ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
                        : project.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </motion.div>

                  {/* Description */}
                  <motion.div className="mb-5" variants={staggerItem}>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      {project.detailedDescription}
                    </p>
                  </motion.div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <motion.div className="mb-5" variants={staggerItem}>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={feature} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Technologies */}
                  <motion.div className="mb-6" variants={staggerItem}>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-md text-sm font-medium border border-indigo-200/50 dark:border-indigo-700/50"
                          custom={index}
                          variants={tagVariants}
                          whileHover="hover"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Fixed action buttons at bottom */}
                <motion.div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm" variants={staggerItem}>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('Click: Project Live Demo', { project: project.title, location: 'inline-modal' })}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        Live Demo
                      </motion.a>
                    )}
                    
                    {project.repoUrl && (
                      <motion.a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('Click: Project Repo', { project: project.title, location: 'inline-modal' })}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <GithubIcon className="h-4 w-4" />
                        View Code
                      </motion.a>
                    )}
                    
                    <motion.button
                      onClick={onClose}
                      className="px-4 py-3 text-sm font-semibold rounded-lg text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InlineProjectModal;
