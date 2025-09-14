import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectStatus } from '../types';
import { GithubIcon } from './icons/SocialIcons';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from './icons/UIIcons';
import { trackEvent } from '../lib/analytics';

// Simplified animation variants for better performance
const projectCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const imageGalleryVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

// Simplified variants for better performance
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const statusBadgeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const rippleEffect = {
  hidden: { scale: 0, opacity: 1 },
  visible: { 
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
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-700';
        case 'Completed':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700';
        case 'In Progress':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-600';
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [page, setPage] = useState([0, 0]); // [index, direction]
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const imageIndex = page[0];
  const direction = page[1];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const paginate = (newDirection: number) => {
    const newIndex = (imageIndex + newDirection + project.imageUrls.length) % project.imageUrls.length;
    setPage([newIndex, newDirection]);
  };

  const goToImage = (newIndex: number) => {
    const newDirection = newIndex > imageIndex ? 1 : -1;
    setPage([newIndex, newDirection]);
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
  };

  // Helper function to truncate text without cutting words
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
    return `${truncated}...`;
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
      className="group relative h-[500px] cursor-pointer overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
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

      {/* Enhanced glowing border effect */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
          filter: "blur(12px)",
        }}
        whileHover={{ 
          opacity: 1,
          scale: 1.02,
          transition: { duration: 0.4 }
        }}
      />

      {/* Enhanced image gallery */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
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
                className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page[0]}
            className="absolute h-full w-full object-cover"
            src={project.imageUrls[imageIndex]}
            alt={`Screenshot ${imageIndex + 1} of the ${project.title} project.`}
            custom={direction}
            variants={imageGalleryVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onLoad={() => setIsImageLoading(false)}
            style={{ transform: "translateZ(20px)" }}
          />
        </AnimatePresence>
        
        {/* Enhanced image overlay effects */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Enhanced navigation buttons */}
        {project.imageUrls.length > 1 && (
          <motion.div 
            className="absolute inset-y-0 inset-x-2 z-10 flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.button 
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2.5 rounded-full backdrop-blur-sm shadow-lg border border-white/20"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </motion.button>
            <motion.button 
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2.5 rounded-full backdrop-blur-sm shadow-lg border border-white/20"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced image indicators */}
        {project.imageUrls.length > 1 && (
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {project.imageUrls.map((_, index) => (
              <motion.button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  imageIndex === index ? 'bg-white shadow-lg' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                animate={imageIndex === index ? { scale: 1.2 } : { scale: 1 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Enhanced content section */}
      <motion.div 
        className="p-6 flex flex-col flex-grow"
        style={{ transform: "translateZ(40px)" }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header with status badge */}
        <motion.div 
          className="flex justify-between items-start mb-3 gap-3"
          variants={staggerItem}
        >
          <motion.h3 
            className="text-xl font-bold text-white leading-tight"
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
          
          <motion.span 
            className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 border ${getStatusBadgeColor(project.status)}`}
            variants={statusBadgeVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            {project.status}
          </motion.span>
        </motion.div>
        
        {/* Description */}
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow leading-relaxed"
          variants={staggerItem}
        >
          {truncateText(project.detailedDescription, 100)}
        </motion.p>
        
        {/* Enhanced tags */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.tags.slice(0, 4).map((tag, index) => (
            <motion.span 
              key={index} 
              className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-200/50 dark:border-indigo-700/50"
              custom={index}
              variants={tagVariants}
              whileHover="hover"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 4 && (
            <motion.span 
              className="text-xs text-gray-400 px-2 py-1"
              variants={tagVariants}
              custom={4}
            >
              +{project.tags.length - 4} more
            </motion.span>
          )}
        </motion.div>
        
        {/* Enhanced action buttons */}
        <motion.div 
          className="mt-auto pt-4 border-t border-gray-200/80 dark:border-gray-700/80 flex items-center justify-between gap-4"
          variants={staggerItem}
        >
          {project.liveUrl ? (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackEvent('Click: Project Live Demo', { project: project.title, location: 'card' });
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                className="relative z-10 flex items-center gap-2"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Live Demo
              </motion.div>
            </motion.a>
          ) : <div />}
          
          {project.repoUrl && (
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackEvent('Click: Project Repo', { project: project.title, location: 'card' });
              }}
              className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              whileHover={{ 
                scale: 1.2, 
                rotate: 15,
                color: "#6366f1",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon className="h-6 w-6" />
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default ProjectCard;
