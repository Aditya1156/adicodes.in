import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectStatus } from '../types';
import { GithubIcon } from './icons/SocialIcons';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from './icons/UIIcons';
import { trackEvent } from '../lib/analytics';
import { 
  cardHover, 
  scaleHover, 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  slideInFromRight,
  floatAnimation,
  buttonHover
} from '../lib/animations';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const imageVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

const getStatusBadgeColor = (status: ProjectStatus) => {
    switch (status) {
        case 'Deployed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Completed':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'In Progress':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [page, setPage] = useState([0, 0]); // [index, direction]

  const imageIndex = page[0];
  const direction = page[1];

  const paginate = (newDirection: number) => {
    const newIndex = (imageIndex + newDirection + project.imageUrls.length) % project.imageUrls.length;
    setPage([newIndex, newDirection]);
  };

  const goToImage = (newIndex: number) => {
    const newDirection = newIndex > imageIndex ? 1 : -1;
    setPage([newIndex, newDirection]);
  }

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
      className="group relative w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-gray-200/80 dark:border-gray-700/80 flex flex-col transition-all duration-500 cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        rest: { 
          y: 0, 
          scale: 1,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        hover: { 
          y: -8, 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }
      }}
      onClick={onClick}
    >
        {/* Enhanced glowing border effect */}
        <motion.div 
          className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0 -z-10"
          variants={{
            rest: { 
              opacity: 0,
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))",
            },
            hover: { 
              opacity: 1,
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(168, 85, 247, 0.6))",
              transition: { duration: 0.4 }
            }
          }}
          style={{
            filter: "blur(8px)",
          }}
        />

      <div className="relative h-48 w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page[0]}
            className="absolute h-full w-full object-cover"
            src={project.imageUrls[imageIndex]}
            alt={`Screenshot ${imageIndex + 1} of the ${project.title} project.`}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }}
          />
        </AnimatePresence>
        
        {/* Enhanced image overlay effects */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.3 } }
          }}
        />
        
        {project.imageUrls.length > 1 && (
            <motion.div 
              className="absolute inset-y-0 inset-x-2 z-10 flex items-center justify-between"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } }
              }}
            >
                <motion.button 
                    onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                    className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/75 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={`Previous image for ${project.title}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </motion.button>
                <motion.button 
                    onClick={(e) => { e.stopPropagation(); paginate(1); }}
                    className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/75 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={`Next image for ${project.title}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </motion.button>
            </motion.div>
        )}

        {project.imageUrls.length > 1 && (
            <motion.div 
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
              variants={{
                rest: { opacity: 0, y: 10 },
                hover: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }
              }}
            >
                {project.imageUrls.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                        className={`h-2 w-2 rounded-full transition-all duration-300 focus:outline-none ${
                            imageIndex === index ? 'bg-white scale-125 shadow-md' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1} for ${project.title}`}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </motion.div>
        )}
      </div>

      <motion.div 
        className="p-6 flex flex-col flex-grow"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="flex justify-between items-start mb-2 gap-2"
          variants={staggerItem}
        >
            <motion.h3 
              className="text-xl font-bold text-gray-900 dark:text-white"
              variants={{
                rest: { color: "var(--text-primary)" },
                hover: { 
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  transition: { duration: 0.3 }
                }
              }}
            >
              {project.title}
            </motion.h3>
            <motion.span 
              className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${getStatusBadgeColor(project.status)}`}
              variants={floatAnimation}
              animate="animate"
            >
              {project.status}
            </motion.span>
        </motion.div>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow"
          variants={staggerItem}
        >
          {truncateText(project.detailedDescription, 100)}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 10 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: [0.6, 0.05, 0.01, 0.99],
                  }
                }
              }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgb(99 102 241 / 0.2)",
                transition: { duration: 0.2 }
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                      variants={{
                        rest: { rotate: 0 },
                        hover: { rotate: 45, transition: { duration: 0.2 } }
                      }}
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                    </motion.div>
                    Live Demo
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
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                    aria-label={`GitHub Repository for ${project.title}`}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      color: "#6366f1",
                      transition: { duration: 0.4 }
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
