import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Project } from '../types';
import { CloseIcon } from './icons/UIIcons';

interface ModernCircularCarouselProps {
  projects: Project[];
  showTitle?: boolean;
}

const ModernCircularCarousel: React.FC<ModernCircularCarouselProps> = ({
  projects,
  showTitle = true,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-10%"
  });

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  // Enhanced click outside to close
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    // Only close if clicking on the backdrop itself, not on child elements
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    // Allow full page scroll - no scroll prevention
    // Modal will overlay without blocking background scroll

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="w-full py-24 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/30" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Professional Header */}
        {showTitle && (
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-gray-200 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Showcase of innovative solutions built with cutting-edge technologies
            </p>
          </motion.div>
        )}

        {/* Professional Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => openModal(project)}
              style={{ cursor: 'pointer' }}
            >
              {/* Professional Image Container */}
              <div className="relative w-full h-72 bg-gradient-to-br from-slate-900/50 to-slate-800/50 overflow-hidden">
                {/* Dynamic Center Positioning Container */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.img
                      src={project.imageUrls[0] || 'https://via.placeholder.com/400x300/1e293b/64748b?text=Preview+Not+Available'}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300/1e293b/64748b?text=Preview+Not+Available';
                      }}
                    />
                  </div>
                </div>

                {/* Professional Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border ${
                    project.status === 'Deployed' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : project.status === 'Completed'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Professional Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <motion.span 
                    className="text-white text-sm font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    View Details
                  </motion.span>
                </div>
              </div>

              {/* Professional Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 bg-slate-700/60 text-purple-300 rounded-md border border-slate-600/50 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 bg-slate-600/50 text-slate-400 rounded-md text-xs">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            style={{ pointerEvents: 'none' }}
          >
            {/* Professional Backdrop with Enhanced Click */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: 'auto' }}
            />

            {/* Centering Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
              {/* Professional Modal Container with Enhanced Pop-in */}
              <motion.div
                className="relative w-full max-w-[90vw] max-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-600/50 rounded-3xl shadow-2xl overflow-hidden z-[10000]"
                initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.4, 0, 0.2, 1],
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  pointerEvents: 'auto'
                }}
              >
              <div className="flex flex-col lg:flex-row h-full min-h-[600px] max-h-[95vh]">
                
                {/* Professional Image Showcase - 2/3 Width */}
                <div className="lg:w-2/3 relative flex items-center justify-center bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-12">
                  <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
                    <motion.img
                      src={selectedProject.imageUrls[0] || 'https://via.placeholder.com/800x600/1e293b/64748b?text=Preview+Not+Available'}
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl drop-shadow-2xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x600/1e293b/64748b?text=Preview+Not+Available';
                      }}
                    />
                  </div>
                </div>

                {/* Professional Project Information Panel - 1/3 Width */}
                <div className="lg:w-1/3 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-l border-slate-600/50 relative">
                  {/* Scroll Indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div 
                      className="flex items-center gap-2 text-slate-400 text-xs opacity-60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 1 }}
                    >
                      <span>Scroll for more</span>
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        ⬇️
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Scrollable Content Container */}
                  <div 
                    className="p-10 h-full flex flex-col justify-between overflow-y-auto"
                    style={{
                      maxHeight: '95vh',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(139, 92, 246, 0.6) rgba(71, 85, 105, 0.3)'
                    }}
                  >
                    <div className="space-y-8">
                      {/* Project Header */}
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                          {selectedProject.title}
                        </h2>
                        <div className="flex items-center gap-3 mb-6">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                            selectedProject.status === 'Deployed' 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : selectedProject.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>
                            {selectedProject.status}
                          </span>
                        </div>
                      </motion.div>

                      {/* Project Description */}
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">About This Project</h3>
                        <p className="text-slate-400 leading-relaxed text-base mb-4">
                          {selectedProject.detailedDescription || selectedProject.description}
                        </p>
                        
                        {/* Additional scrollable content */}
                        <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                          <p>
                            This project demonstrates modern web development practices with attention to user experience, 
                            performance optimization, and scalable architecture. Built with industry-standard tools and 
                            following best practices for maintainable code.
                          </p>
                          <p>
                            The implementation focuses on responsive design, accessibility standards, and cross-browser 
                            compatibility to ensure optimal performance across all devices and platforms.
                          </p>
                        </div>
                      </motion.div>

                      {/* Key Features */}
                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <motion.div 
                          className="mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                        >
                          <h3 className="text-lg font-semibold text-slate-300 mb-4">Key Features</h3>
                          <ul className="space-y-3">
                            {selectedProject.features.map((feature, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-start gap-3 text-slate-400"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                              >
                                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Technology Stack */}
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">Technology Stack</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.tags.map((tag, i) => (
                            <motion.span 
                              key={i}
                              className="px-4 py-2 bg-slate-700/60 text-purple-300 rounded-full border border-slate-600/50 text-sm font-medium hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-200"
                              whileHover={{ scale: 1.05 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Development Insights - Additional scrollable content */}
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">Development Insights</h3>
                        <div className="space-y-3 text-slate-400 text-sm">
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
                            <h4 className="text-slate-300 font-medium mb-2">Architecture</h4>
                            <p className="text-xs leading-relaxed">
                              Modular component-based architecture with separation of concerns, 
                              ensuring maintainability and scalability.
                            </p>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
                            <h4 className="text-slate-300 font-medium mb-2">Performance</h4>
                            <p className="text-xs leading-relaxed">
                              Optimized for fast loading times with code splitting, lazy loading, 
                              and efficient state management.
                            </p>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
                            <h4 className="text-slate-300 font-medium mb-2">User Experience</h4>
                            <p className="text-xs leading-relaxed">
                              Intuitive interface design with smooth animations and responsive 
                              interactions across all device types.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Action Buttons - Sticky at bottom */}
                    <motion.div 
                      className="flex gap-4 mt-8 pt-6 border-t border-slate-700/50 bg-gradient-to-t from-slate-900/90 to-transparent backdrop-blur-sm sticky bottom-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {selectedProject.liveUrl && (
                        <motion.a 
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Live
                        </motion.a>
                      )}
                      {selectedProject.repoUrl && (
                        <motion.a 
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-slate-700/80 border border-slate-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-slate-600 hover:border-slate-500 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          GitHub
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Professional Close Button */}
              <motion.button
                onClick={closeModal}
                className="absolute top-6 right-6 w-12 h-12 bg-black/60 border border-slate-600/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:border-slate-500 transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CloseIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ModernCircularCarousel);
