import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectStatus } from '../types';
import { GithubIcon } from './icons/SocialIcons';
import { ExternalLinkIcon } from './icons/UIIcons';
import { trackEvent } from '../lib/analytics';

// Animation variants
const projectCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.1
  },
  center: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 0.9
  }
};

const rippleEffect = {
  initial: { scale: 0, opacity: 1 },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const getStatusBadgeColor = (status: ProjectStatus) => {
    switch (status) {
        case 'Deployed':
            return 'bg-green-500/20 text-green-400 border-green-400/30';
        case 'Completed':
            return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
        case 'In Progress':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-move images when hovered
  useEffect(() => {
    if (project.imageUrls.length > 1 && isHovered) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % project.imageUrls.length);
      }, 2500);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [project.imageUrls.length, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const createRipple = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    createRipple(e);
    onClick();
    trackEvent('Click: Project Card', { project: project.title });
  };

  // Create brief description (1-2 lines max)
  const getBriefDescription = (description: string): string => {
    const words = description.split(' ');
    if (words.length <= 12) return description;
    return words.slice(0, 12).join(' ') + '...';
  };

  return (
    <motion.div 
      ref={cardRef}
      layout
      variants={projectCardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
    >
      {/* Ripple effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute w-4 h-4 bg-indigo-400/30 rounded-full"
            style={{ left: ripple.x - 8, top: ripple.y - 8 }}
            variants={rippleEffect}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>

      {/* Gradient border effect */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
          filter: "blur(8px)",
        }}
        whileHover={{ 
          opacity: 1,
          scale: 1.02,
          transition: { duration: 0.4 }
        }}
      />

      {/* Auto-moving image section */}
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
        {/* Loading spinner */}
        <AnimatePresence>
          {isImageLoading && (
            <motion.div
              className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            className="absolute h-full w-full object-cover"
            src={project.imageUrls[currentImageIndex]}
            alt={`${project.title} preview`}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onLoad={() => setIsImageLoading(false)}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Status badge */}
        <motion.div
          className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${getStatusBadgeColor(project.status)}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.status}
        </motion.div>

        {/* Image dots indicator */}
        {project.imageUrls.length > 1 && (
          <motion.div 
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.imageUrls.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? 'bg-white shadow-sm' : 'bg-white/50'
                }`}
                animate={currentImageIndex === index ? { scale: 1.2 } : { scale: 1 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Content section - simplified */}
      <div className="p-4 h-28 flex flex-col">
        {/* Title */}
        <motion.h3 
          className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-1"
          whileHover={{ 
            background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        
        {/* Brief Description - only 1-2 lines */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow line-clamp-2">
          {getBriefDescription(project.detailedDescription)}
        </p>
        
        {/* Bottom row */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            Click for details →
          </div>
          
          <div className="flex gap-1.5">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent('Click: Project Live Demo', { project: project.title, location: 'card' });
                }}
                className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Live Demo"
              >
                <ExternalLinkIcon className="h-4 w-4" />
              </motion.a>
            )}
            
            {project.repoUrl && (
              <motion.a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent('Click: Project Repo', { project: project.title, location: 'card' });
                }}
                className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Source Code"
              >
                <GithubIcon className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
