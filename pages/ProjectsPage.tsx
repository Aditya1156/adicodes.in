import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernCircularCarousel from '../components/ModernCircularCarousel';
import MetaTags from '../components/MetaTags';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { PROJECTS } from '../lib/data';
import { 
  staggerContainer, 
  fadeInUp, 
  scaleIn
} from '../lib/animations';

const ProjectsPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
  } | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
      
      // Re-enable modal interactions
      const modalElement = document.querySelector('[data-modal="true"]');
      if (modalElement) {
        (modalElement as HTMLElement).style.pointerEvents = 'auto';
      }
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
    };
  }, [selectedImage]);

  return (
    <>
      <MetaTags 
        title="Projects - Aditya Kumar" 
        description="Explore my portfolio of web applications, AI projects, and innovative solutions built with modern technologies."
        keywords="web development, React, TypeScript, AI projects, portfolio"
      />
      
      <BackgroundWrapper>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Modern Header Section with Material Design */}
            <motion.div
              className="text-center mb-16"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Decorative Elements */}
              <motion.div 
                className="flex justify-center mb-8"
                variants={scaleIn}
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl rotate-12 absolute -top-2 -left-2"></div>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center relative z-10">
                    <motion.div
                      className="text-4xl"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🚀
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                variants={fadeInUp}
              >
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  My Projects
                </span>
              </motion.h1>
              
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"
                variants={scaleIn}
              />
              
              <motion.p 
                className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                A showcase of my work in web development, AI integration, and innovative solutions. 
                Each project represents a unique challenge and learning experience in my journey as a developer.
              </motion.p>

              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
                variants={staggerContainer}
              >
                {[
                  { number: "15+", label: "Projects Completed", icon: "🎯" },
                  { number: "8+", label: "Technologies Used", icon: "⚡" },
                  { number: "100%", label: "Passion Driven", icon: "❤️" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.1)"
                    }}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Project Gallery with Material Design */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Floating Background Elements */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
              
              {/* Modern Circular Carousel */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                <ModernCircularCarousel projects={PROJECTS} showTitle={false} />
              </div>
            </motion.div>

            {/* Events & Activities Gallery */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Events & Activities
                </h3>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Capturing moments from hackathons, tech events, workshops, and community activities - A visual journey through my professional experiences
                </p>
              </div>

              {/* Photo Grid Gallery - Enhanced for 9 images */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Gallery Items with Real Images */}
                {[
                  {
                    id: 1,
                    title: "Tech Hackathon 2024",
                    description: "48-hour coding marathon with amazing developers",
                    image: "/images/galary/galary1.jpg",
                    category: "Hackathon",
                    date: "March 2024"
                  },
                  {
                    id: 2,
                    title: "Developer Conference",
                    description: "Speaking about modern web technologies",
                    image: "/images/galary/galary2.jpg",
                    category: "Conference",
                    date: "February 2024"
                  },
                  {
                    id: 3,
                    title: "Open Source Workshop",
                    description: "Teaching Git and collaborative development",
                    image: "/images/galary/galary3.jpg",
                    category: "Workshop",
                    date: "January 2024"
                  },
                  {
                    id: 4,
                    title: "Startup Pitch Event",
                    description: "Presenting innovative solutions to investors",
                    image: "/images/galary/galary4.jpg",
                    category: "Pitch",
                    date: "December 2023"
                  },
                  {
                    id: 5,
                    title: "Code Review Session",
                    description: "Mentoring junior developers",
                    image: "/images/galary/galary5.jpg",
                    category: "Mentoring",
                    date: "November 2023"
                  },
                  {
                    id: 6,
                    title: "Tech Meetup",
                    description: "Networking with fellow developers",
                    image: "/images/galary/galary6.jpg",
                    category: "Meetup",
                    date: "October 2023"
                  },
                  {
                    id: 7,
                    title: "Innovation Summit",
                    description: "Exploring cutting-edge technologies",
                    image: "/images/galary/galary7.jpg",
                    category: "Summit",
                    date: "September 2023"
                  },
                  {
                    id: 8,
                    title: "Community Workshop",
                    description: "Building together as a tech community",
                    image: "/images/galary/galary8.jpg",
                    category: "Community",
                    date: "August 2023"
                  },
                  {
                    id: 9,
                    title: "Project Showcase",
                    description: "Demonstrating latest developments",
                    image: "/images/galary/galary9.jpg",
                    category: "Showcase",
                    date: "July 2023"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden bg-slate-800/50">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/api/placeholder/400/300";
                          }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 bg-purple-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                          {item.category}
                        </div>

                        {/* Date Badge */}
                        <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                          {item.date}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View Gallery Button */}
              <div className="text-center mt-12">
                <motion.button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Full Gallery
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Large Image Modal with Background Blur */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              data-modal="true"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            >
              {/* Enhanced Full-Screen Background Blur */}
              <div 
                className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
                style={{ 
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'auto',
                  cursor: 'default',
                  zIndex: 51,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                }}
              />
              
              {/* Modal Content - Full Screen */}
              <motion.div
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-none overflow-hidden shadow-2xl w-full h-full flex flex-col lg:flex-row"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 60,
                  margin: 0,
                  padding: 0
                }}
              >
                {/* Close Button - Full Screen Prominent */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-8 right-8 z-20 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
                >
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Image Section - Full Screen Left */}
                <div className="lg:w-3/5 h-screen relative">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Category Badge on Image - Full Screen */}
                  <div className="absolute bottom-8 left-8 px-6 py-3 bg-purple-500/90 text-white text-lg font-bold rounded-full backdrop-blur-md shadow-2xl border border-white/20">
                    {selectedImage.category}
                  </div>
                </div>

                {/* Content Section - Full Screen Right */}
                <div className="lg:w-2/5 p-16 flex flex-col justify-center h-screen bg-black/20 backdrop-blur-sm">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-purple-300 text-xl font-medium">
                        {selectedImage.date}
                      </span>
                    </div>
                    <h3 className="text-5xl font-bold text-white mb-8 leading-tight">
                      {selectedImage.title}
                    </h3>
                    <p className="text-gray-300 text-2xl leading-relaxed mb-8">
                      {selectedImage.description}
                    </p>
                  </div>

                  {/* Additional Details - Full Screen */}
                  <div className="mt-12 pt-12 border-t border-white/20">
                    <h4 className="text-white font-semibold mb-6 text-2xl">Event Highlights</h4>
                    <ul className="text-gray-300 space-y-4 text-lg">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Professional networking opportunities
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Knowledge sharing and learning
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Community building and collaboration
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </BackgroundWrapper>
    </>
  );
};

export default ProjectsPage;
