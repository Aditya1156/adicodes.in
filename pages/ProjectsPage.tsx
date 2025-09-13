import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, Variants, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import InlineProjectModal from '../components/InlineProjectModal';
import { PROJECTS } from '../lib/data';
import { Project } from '../types';
import MetaTags from '../components/MetaTags';
import { 
  projectGridContainer,
  fadeInUp,
  staggerContainer,
} from '../lib/animations';

const headerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

const filterButtonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalExpanded, setIsModalExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Optimized categories using useMemo to prevent recalculation
  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(PROJECTS.flatMap(project => project.tags)))],
    []
  );

  // Optimized filtered projects with useMemo
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter(project => project.tags.includes(activeFilter));
  }, [activeFilter]);

  // Remove useEffect since we're using useMemo now
  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalExpanded(true);
  };

  const handleCloseModal = () => {
    setIsModalExpanded(false);
    // Delay setting selectedProject to null to allow exit animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <MetaTags
        title="Projects | Aditya Kumar"
        description="Browse through a curated selection of projects by Aditya Kumar, including full-stack web applications, AI-powered tools, and more."
        keywords="Aditya Kumar projects, portfolio, web development, TypingPath, AI Chatbot, Airline Management System"
      />
      <div ref={containerRef} className="relative overflow-hidden py-16 min-h-screen">
        {/* Simplified optimized background */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-900"></div>
          
          {/* Static optimized background blobs */}
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-5" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-5" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-3" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced header with parallax */}
          <motion.div
            style={{ y: headerY }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight"
              variants={headerVariants}
            >
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                My Projects
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8"
              variants={fadeInUp}
            >
              A curated collection of projects showcasing modern web technologies, innovative solutions, and creative problem-solving.
            </motion.p>

            {/* Enhanced filter buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-lg border-2 overflow-hidden ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/30'
                      : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90'
                  }`}
                  variants={filterButtonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                >
                  {/* Ripple effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0"
                    whileHover={{ opacity: activeFilter !== category ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Active indicator */}
                  {activeFilter === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full -z-10"
                      layoutId="activeFilter"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Optimized project grid with lazy loading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
              variants={projectGridContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={`${project.title}-${activeFilter}`}
                  className="w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: Math.min(index * 0.05, 0.3), // Cap delay for better performance
                      duration: 0.4,
                      ease: "easeOut",
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => handleCardClick(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No projects found message */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔍
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try selecting a different category to explore more projects.
              </p>
            </motion.div>
          )}
        </div>

        {/* Optimized project modal */}
        <InlineProjectModal 
          project={selectedProject}
          isExpanded={isModalExpanded}
          onClose={handleCloseModal} 
        />
      </div>
    </>
  );
};

export default ProjectsPage;