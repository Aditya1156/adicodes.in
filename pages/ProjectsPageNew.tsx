import React from 'react';
import { motion } from 'framer-motion';
import EnhancedProjectGallery from '../components/EnhancedProjectGallery';
import MetaTags from '../components/MetaTags';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <MetaTags 
        title="Projects - Aditya Kumar" 
        description="Explore my portfolio of web applications, AI projects, and innovative solutions built with modern technologies."
        keywords="web development, React, TypeScript, AI projects, portfolio"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              My Projects
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              A showcase of my work in web development, AI integration, and innovative solutions. 
              Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>

          {/* Enhanced Project Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EnhancedProjectGallery />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
