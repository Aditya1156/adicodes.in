import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { PROJECTS } from '../lib/data';
import { Project } from '../types';
import MetaTags from '../components/MetaTags';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto'; // Restore scrolling
    setSelectedProject(null);
  };


  return (
    <>
      <MetaTags
        title="Projects | Aditya Kumar"
        description="Browse through a curated selection of projects by Aditya Kumar, including full-stack web applications, AI-powered tools, and more."
        keywords="Aditya Kumar projects, portfolio, web development, TypingPath, AI Chatbot, Airline Management System"
      />
      <div className="relative overflow-hidden py-12">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-900"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob dark:opacity-20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000 dark:opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 
            className="text-5xl font-extrabold text-center mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            My Projects
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            A selection of projects I've worked on.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PROJECTS.map((project, index) => (
              <motion.div key={index} variants={itemVariants} className="flex">
                <ProjectCard project={project} onClick={() => handleCardClick(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
          )}
        </AnimatePresence>
        <style>{`
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
                animation: blob 8s infinite;
            }
            .animation-delay-2000 { animation-delay: 2s; }
            @media (prefers-reduced-motion: reduce) {
                .animate-blob {
                    animation: none;
                }
            }
        `}</style>
      </div>
    </>
  );
};

export default ProjectsPage;