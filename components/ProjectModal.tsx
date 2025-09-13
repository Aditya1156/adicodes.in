import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Project, ProjectStatus } from '../types';
import { GithubIcon } from './icons/SocialIcons';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, CheckCircleIcon } from './icons/UIIcons';
import { trackEvent } from '../lib/analytics';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1], // Decelerate easing for a smooth arrival
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.5, 0, 0.75, 0], // Accelerate easing for a quick departure
    },
  },
};

const imageVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: { zIndex: 1, x: 0, opacity: 1 },
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

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [page, setPage] = useState([0, 0]); // [index, direction]
  const imageIndex = page[0];
  const direction = page[1];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const paginate = (newDirection: number) => {
    const newIndex = (imageIndex + newDirection + project.imageUrls.length) % project.imageUrls.length;
    setPage([newIndex, newDirection]);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden border border-gray-200 dark:border-gray-700"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors z-20 bg-white/50 dark:bg-gray-900/50 p-1.5 rounded-full"
          aria-label="Close project details"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-gray-100 dark:bg-gray-900">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page[0]}
                    className="absolute h-full w-full object-cover"
                    src={project.imageUrls[imageIndex]}
                    alt={`Screenshot ${imageIndex + 1} of ${project.title}`}
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
            {project.imageUrls.length > 1 && (
                <>
                    <button onClick={() => paginate(-1)} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75 transition-colors z-10"><ChevronLeftIcon className="h-5 w-5" /></button>
                    <button onClick={() => paginate(1)} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75 transition-colors z-10"><ChevronRightIcon className="h-5 w-5" /></button>
                </>
            )}
        </div>

        {/* Project Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h2 id="project-title" className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap shrink-0 mt-1 ${getStatusBadgeColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">{project.detailedDescription}</p>

          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Features</h3>
          <ul className="space-y-2 mb-6">
            {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Technologies Used</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{tag}</span>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => trackEvent('Click: Project Live Demo', { project: project.title, location: 'modal' })}
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors hover:scale-110" 
                aria-label={`GitHub Repository for ${project.title}`}
                onClick={() => trackEvent('Click: Project Repo', { project: project.title, location: 'modal' })}
              >
                <GithubIcon className="h-7 w-7" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;