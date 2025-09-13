import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/UIIcons';

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
};

const FeaturedProjectsCarousel: React.FC<FeaturedProjectsCarouselProps> = ({ projects }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection + projects.length) % projects.length;
    setPage([newPage, newDirection]);
  };
  
  const goToPage = (newPage: number) => {
    const newDirection = newPage > page ? 1 : -1;
    setPage([newPage, newDirection]);
  }

  const project = projects[page];

  return (
    <div className="relative w-full h-[550px] md:h-96 flex items-center justify-center">
      <div className="relative w-full max-w-3xl h-full overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 h-48 md:h-full">
              <img
                src={project.imageUrls[0]}
                alt={project.title}
                className="w-full h-full object-cover md:rounded-l-xl md:rounded-r-none rounded-t-xl"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
              <div className="mt-4">
                 <Link 
                    to="/projects" 
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                 >
                    View All Projects
                 </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-0 md:-left-12 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors focus:outline-none z-10"
        aria-label="Previous project"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-0 md:-right-12 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors focus:outline-none z-10"
        aria-label="Next project"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 focus:outline-none ${
              page === index ? 'bg-indigo-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
