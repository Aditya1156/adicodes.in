import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SKILLS } from '../lib/skills';
import { TIMELINE_EVENTS } from '../lib/data';
import { BookOpenIcon, CafeIcon, CodeBracketIcon } from '../components/icons/UIIcons';
import BackgroundWrapper from '../components/BackgroundWrapper';
import MetaTags from '../components/MetaTags';
import { 
  staggerContainer, 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight,
  scaleIn,
  bounceIn
} from '../lib/animations';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const techStackContainerVariants: Variants = {
    hidden: { },
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const techStackItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 90,
            damping: 12,
        },
    },
};


const interests = [
    {
        icon: CodeBracketIcon,
        title: "Open Source",
        description: "Contributing to projects and sharing knowledge with the community."
    },
    {
        icon: BookOpenIcon,
        title: "Tech Blogs",
        description: "Staying updated with the latest trends and deep-diving into new tech."
    },
    {
        icon: CafeIcon,
        title: "Coffee & Code",
        description: "Fueling my passion for development one cup at a time."
    }
];

const displayedSkills = [
    SKILLS.REACT,
    SKILLS.TYPESCRIPT,
    SKILLS.NODE,
    SKILLS.MONGO,
    SKILLS.FIREBASE,
    SKILLS.TAILWIND,
    SKILLS.GEMINI,
    SKILLS.JAVA,
];


const AboutPage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="About | Aditya Kumar"
        description="Learn more about Aditya Kumar, a third-year Computer Science student. Discover my journey, skills in web development, and passion for technology."
        keywords="About Aditya Kumar, biography, skills, computer science, MERN stack"
      />
      <BackgroundWrapper>
        <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
              <motion.h1
                  className="text-5xl md:text-6xl font-extrabold text-center mb-20 tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
              >
                  About Me
              </motion.h1>

              <motion.div
                  className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32 items-center"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
              >
                  <motion.div 
                      className="relative w-48 h-48 md:w-56 md:h-56 mx-auto"
                      variants={itemVariants}
                  >
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 dark:opacity-30"></div>
                      <motion.img
                          src="/images/aditya.jpg"
                          alt="Aditya Kumar - MERN Stack Developer"
                          className="relative w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                      />
                  </motion.div>
                  <motion.div 
                      className="lg:col-span-2"
                      variants={itemVariants}
                  >
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MERN Stack Developer</h2>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          Hello! I'm Aditya Kumar, a third-year Computer Science student at PES Institute of Technology & Management, Shivamogga, Karnataka. I'm passionate about MERN stack development and full-stack engineering, with experience in building scalable web applications using React, TypeScript, Firebase, and AI integration.
                      </p>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          I've deployed multiple real-world projects including TypingPath (currently in production) and various AI-powered applications. Known for writing clean, maintainable code and delivering high-performance, user-focused applications. Expected graduation: January 2027.
                      </p>
                  </motion.div>
              </motion.div>
              
               <div className="mb-32">
                  <motion.h2
                      className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                      My Tech Stack
                  </motion.h2>
                  <motion.div
                      className="flex flex-wrap justify-center gap-8 md:gap-12"
                      variants={techStackContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                  >
                      {displayedSkills.map((skill) => (
                          <motion.div
                              key={skill.name}
                              className="group flex flex-col items-center gap-2"
                              variants={techStackItemVariants}
                              whileHover={{ y: -5, scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                          >
                              <div className="w-20 h-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 shadow-md group-hover:shadow-indigo-500/20 group-hover:shadow-xl transition-all duration-300">
                                  <skill.icon className="w-10 h-10 text-gray-700 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                              </div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{skill.name}</span>
                          </motion.div>
                      ))}
                  </motion.div>
              </div>

              <div className="mb-32">
                   <motion.h2 
                      className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                   >
                      Beyond the Code
                   </motion.h2>
                   <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                   >
                      {interests.map((interest, index) => (
                          <motion.div
                              key={index}
                              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg text-center"
                              variants={itemVariants}
                              whileHover={{ y: -10, scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                              transition={{ type: 'spring', stiffness: 300 }}
                          >
                              <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                  <interest.icon className="w-8 h-8" />
                              </div>
                              <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{interest.description}</p>
                          </motion.div>
                      ))}
                   </motion.div>
              </div>

              <motion.h2
                  className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
              >
                  My Journey
              </motion.h2>
              
              {/* Timeline Container */}
              <div className="relative max-w-4xl mx-auto">
                  {/* Flowing timeline line - Hidden on mobile */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-200 via-indigo-500 to-purple-500 rounded-full"></div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50 animate-line-flow"></div>
                  
                  {/* Mobile timeline line */}
                  <div className="md:hidden absolute left-8 w-1 h-full bg-gradient-to-b from-indigo-200 via-indigo-500 to-purple-500 rounded-full"></div>
                  
                  <div className="space-y-12">
                      {TIMELINE_EVENTS.map((event, index) => (
                          <motion.div
                              key={index}
                              className={`relative flex items-center ${
                                  // Desktop: alternate sides, Mobile: always left-aligned
                                  'md:' + (index % 2 === 0 ? 'justify-start' : 'justify-end')
                              }`}
                              initial={{ opacity: 0, x: window.innerWidth < 768 ? -50 : (index % 2 === 0 ? -50 : 50) }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ 
                                  type: 'spring', 
                                  stiffness: 100, 
                                  damping: 15, 
                                  delay: index * 0.2 
                              }}
                          >
                              {/* Timeline content */}
                              <motion.div 
                                  className={`w-full md:w-5/12 ${
                                      index % 2 === 0 
                                          ? 'md:pr-8 md:text-right ml-16 md:ml-0' 
                                          : 'md:pl-8 md:text-left ml-16 md:ml-0'
                                  }`}
                              >
                                  <motion.div 
                                      className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                      whileHover={{ 
                                          scale: 1.02,
                                          boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)"
                                      }}
                                  >
                                      {/* Year badge */}
                                      <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-md">
                                          {event.year}
                                      </span>
                                      
                                      {/* Title */}
                                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                          {event.title}
                                      </h3>
                                      
                                      {/* Description */}
                                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                          {event.description}
                                      </p>
                                      
                                      {/* Decorative arrow - Desktop only */}
                                      <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 ${
                                          index % 2 === 0 
                                              ? '-right-3 border-l-8 border-l-white dark:border-l-gray-800 border-y-8 border-y-transparent' 
                                              : '-left-3 border-r-8 border-r-white dark:border-r-gray-800 border-y-8 border-y-transparent'
                                      }`}></div>
                                  </motion.div>
                              </motion.div>
                              
                              {/* Central timeline dot - Desktop center, Mobile left */}
                              <motion.div 
                                  className={`absolute w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 ${
                                      'md:left-1/2 md:transform md:-translate-x-1/2 left-5'
                                  }`}
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                      delay: index * 0.2 + 0.3,
                                      type: "spring",
                                      stiffness: 200,
                                      damping: 10
                                  }}
                                  whileHover={{ 
                                      scale: 1.3,
                                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)"
                                  }}
                              >
                                  <motion.div 
                                      className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                      animate={{ 
                                          scale: [1, 1.2, 1],
                                          opacity: [1, 0.8, 1]
                                      }}
                                      transition={{ 
                                          duration: 2,
                                          repeat: Infinity,
                                          delay: index * 0.5
                                      }}
                                  />
                              </motion.div>
                          </motion.div>
                      ))}
                  </div>
                  
                  {/* End marker */}
                  <motion.div 
                      className="absolute bottom-0 left-1/2 md:left-1/2 md:transform md:-translate-x-1/2 left-5 translate-y-8"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: TIMELINE_EVENTS.length * 0.2 + 0.5 }}
                  >
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium whitespace-nowrap">
                          To be continued...
                      </p>
                  </motion.div>
              </div>
              <style>{`
                  @keyframes blob {
                      0% { transform: translate(0px, 0px) scale(1); }
                      33% { transform: translate(30px, -50px) scale(1.1); }
                      66% { transform: translate(-20px, 20px) scale(0.9); }
                      100% { transform: translate(0px, 0px) scale(1); }
                  }
                  .animate-blob {
                      animation: blob 7s infinite;
                  }
                  .animation-delay-2000 { animation-delay: 2s; }
                  .animation-delay-4000 { animation-delay: 4s; }
                  @keyframes line-flow {
                      0% { transform: translateY(-100%); }
                      100% { transform: translateY(100%); }
                  }
                  .animate-line-flow {
                      animation: line-flow 4s linear infinite;
                  }
                   /* Accessibility: Reduce motion for keyframe animations */
                  @media (prefers-reduced-motion: reduce) {
                      .animate-blob, .animate-line-flow {
                          animation: none;
                      }
                  }
              `}</style>
          </div>
      </BackgroundWrapper>
    </>
  );
};

export default AboutPage;