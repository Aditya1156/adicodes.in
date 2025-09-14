import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, CheckCircleIcon } from './icons/UIIcons';
import { GithubIcon } from './icons/SocialIcons';
import { trackEvent } from '../lib/analytics';
import { 
  modalOverlayVariants,
  modalContentVariants,
  modalImageVariants,
  staggerContainer,
  staggerItem,
  tagVariants,
  rippleEffect
} from '../lib/animations';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), { stiffness: 100, damping: 30 });
  const backgroundY = useSpring(useTransform(mouseY, [-500, 500], [-30, 30]), { stiffness: 100, damping: 30 });

  // Auto-play images with pause on hover
  useEffect(() => {
    if (isOpen && project && project.imageUrls.length > 1 && isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % project.imageUrls.length);
      }, 4000); // Change image every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isOpen, project, isAutoPlaying]);

  useEffect(() => {
    if (isOpen && project) {
      setCurrentImageIndex(0);
      setIsImageLoading(true);
      setRipples([]);
      setIsAutoPlaying(true);
      trackEvent('View: Project Modal', { project: project.title });
    }
  }, [isOpen, project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !project) return;
      
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

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, currentImageIndex]);

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
    setIsAutoPlaying(false); // Pause auto-play when user navigates
    setCurrentImageIndex((prev) => (prev + 1) % project.imageUrls.length);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrevImage = () => {
    if (!project) return;
    setIsImageLoading(true);
    setIsAutoPlaying(false); // Pause auto-play when user navigates
    setCurrentImageIndex((prev) => (prev - 1 + project.imageUrls.length) % project.imageUrls.length);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToImage = (index: number) => {
    if (!project || index === currentImageIndex) return;
    setIsImageLoading(true);
    setIsAutoPlaying(false); // Pause auto-play when user navigates
    setCurrentImageIndex(index);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-8"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
          onMouseMove={handleMouseMove}
        >
          {/* Animated background particles */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
              x: backgroundX,
              y: backgroundY,
            }}
          />
          
          <motion.div
            ref={modalRef}
            className="relative w-[90vmin] h-[90vmin] max-w-[600px] max-h-[600px] bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-3xl"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 100px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Enhanced close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-3 bg-black/80 text-white rounded-full shadow-2xl backdrop-blur-sm border border-white/20"
              whileHover={{ 
                scale: 1.1, 
                rotate: 90,
                backgroundColor: "rgba(239, 68, 68, 0.9)",
                boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CloseIcon className="h-6 w-6" />
            </motion.button>

            <div className="flex flex-col h-full overflow-hidden">
              {/* Enhanced image section - Top half */}
              <div className="w-full h-1/2 relative flex-shrink-0">
                <div 
                  ref={imageContainerRef}
                  className="relative h-full overflow-hidden bg-gradient-to-br from-gray-900 to-black cursor-pointer"
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
                        className="absolute inset-0 bg-gray-700 flex items-center justify-center z-10"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-12 h-12 border-3 border-indigo-500 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.img
                    key={currentImageIndex}
                    src={project.imageUrls[currentImageIndex]}
                    alt={`Screenshot ${currentImageIndex + 1} of ${project.title}`}
                    className="w-full h-full object-cover transition-all duration-500"
                    variants={modalImageVariants}
                    initial="enter"
                    animate="center"
                    onLoad={() => setIsImageLoading(false)}
                    style={{
                      filter: "contrast(1.1) saturate(1.2) brightness(1.05)",
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      filter: "contrast(1.15) saturate(1.3) brightness(1.08)",
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Enhanced gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Enhanced navigation arrows */}
                  {project.imageUrls.length > 1 && (
                    <>
                      <motion.button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 text-white rounded-full shadow-2xl backdrop-blur-sm border border-white/20"
                        whileHover={{ 
                          scale: 1.2,
                          x: -4,
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </motion.button>
                      
                      <motion.button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 text-white rounded-full shadow-2xl backdrop-blur-sm border border-white/20"
                        whileHover={{ 
                          scale: 1.2,
                          x: 4,
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </motion.button>
                    </>
                  )}

                  {/* Enhanced image counter with auto-play indicator */}
                  {project.imageUrls.length > 1 && (
                    <motion.div 
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-md text-white text-lg rounded-full border border-white/20"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span>{currentImageIndex + 1} / {project.imageUrls.length}</span>
                      
                      {/* Auto-play indicator */}
                      <motion.button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          isAutoPlaying ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full ${
                            isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'
                          }`}
                          animate={isAutoPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                          transition={{ duration: 1, repeat: isAutoPlaying ? Infinity : 0 }}
                        />
                        {isAutoPlaying ? 'Auto' : 'Manual'}
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Enhanced thumbnail strip */}
                {project.imageUrls.length > 1 && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-6 bg-black/40 backdrop-blur-md border-t border-white/10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-center">
                      {project.imageUrls.map((url, index) => (
                        <motion.button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-white shadow-lg shadow-white/25 scale-110' 
                              : 'border-white/30 hover:border-white/60'
                          }`}
                          whileHover={{ scale: index === currentImageIndex ? 1.1 : 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === currentImageIndex && (
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Enhanced content section - Bottom half */}
              <motion.div 
                className="w-full h-1/2 p-4 sm:p-6 overflow-y-auto scrollbar-hide bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Full-screen header */}
                <motion.div 
                  className="mb-8"
                  variants={staggerItem}
                >
                  <motion.h2 
                    className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                    whileHover={{
                      background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h2>
                  
                  <motion.div 
                    className="flex items-center gap-4"
                    variants={staggerItem}
                  >
                    <span className={`px-4 py-2 text-base font-semibold rounded-full border ${
                      project.status === 'Deployed' 
                        ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
                        : project.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Full-screen description */}
                <motion.div 
                  className="mb-8"
                  variants={staggerItem}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    About This Project
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {project.detailedDescription}
                  </p>
                </motion.div>

                {/* Full-screen features */}
                {project.features && project.features.length > 0 && (
                  <motion.div 
                    className="mb-8"
                    variants={staggerItem}
                  >
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Key Features
                    </h3>
                    <motion.ul 
                      className="space-y-4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.features.map((feature, index) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-start gap-4 text-gray-600 dark:text-gray-400 text-base"
                          variants={staggerItem}
                          custom={index}
                        >
                          <motion.div
                            className="mt-1"
                            whileHover={{ scale: 1.3, color: "#10b981" }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                          </motion.div>
                          <span className="leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}

                {/* Full-screen technologies */}
                <motion.div 
                  className="mb-10"
                  variants={staggerItem}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Technologies Used
                  </h3>
                  <motion.div 
                    className="flex flex-wrap gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-300 px-4 py-2.5 rounded-xl text-base font-medium border border-indigo-200/50 dark:border-indigo-700/50"
                        custom={index}
                        variants={tagVariants}
                        whileHover="hover"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Full-screen action buttons */}
                <motion.div 
                  className="flex flex-col gap-4"
                  variants={staggerItem}
                >
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('Click: Project Live Demo', { project: project.title, location: 'modal' })}
                      className="inline-flex items-center justify-center gap-4 px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button background animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <motion.div
                        className="relative z-10 flex items-center gap-4"
                        whileHover={{ rotate: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLinkIcon className="h-6 w-6" />
                        View Live Demo
                      </motion.div>
                    </motion.a>
                  )}
                  
                  <motion.div className="flex gap-4">
                    {project.repoUrl && (
                      <motion.a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('Click: Project Repo', { project: project.title, location: 'modal' })}
                        className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-gray-800 border border-gray-700 transition-all"
                        whileHover={{ 
                          scale: 1.02,
                          borderColor: "#6366f1",
                          backgroundColor: "rgba(99, 102, 241, 0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <GithubIcon className="h-6 w-6" />
                        </motion.div>
                        Source Code
                      </motion.a>
                    )}
                    
                    <motion.button
                      onClick={onClose}
                      className="px-6 py-4 text-lg font-semibold rounded-xl text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-600 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;