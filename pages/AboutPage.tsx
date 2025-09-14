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
                  className="text-5xl md:text-6xl font-extrabold text-center mb-20 tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
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
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-50 dark:opacity-30"></div>
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
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MERN Stack Developer</h2>
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
                      className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
                              <div className="w-20 h-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 shadow-md group-hover:shadow-blue-500/20 group-hover:shadow-xl transition-all duration-300">
                                  <skill.icon className="w-10 h-10 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                              </div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{skill.name}</span>
                          </motion.div>
                      ))}
                  </motion.div>
              </div>

              <div className="mb-32">
                   <motion.h2 
                      className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
                              <div className="mx-auto bg-blue-900/50 text-blue-500 dark:text-blue-400 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                  <interest.icon className="w-8 h-8" />
                              </div>
                              <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{interest.description}</p>
                          </motion.div>
                      ))}
                   </motion.div>
              </div>

              <motion.h2
                  className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
              >
                  My Journey
              </motion.h2>
              
              {/* Professional Timeline */}
              <div className="relative max-w-4xl mx-auto">
                  {/* Single clean timeline line */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-px w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30"></div>
                  
                  {/* Timeline Events */}
                  <div className="space-y-16">
                      {TIMELINE_EVENTS.map((event, index) => (
                          <motion.div
                              key={index}
                              className="relative"
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ 
                                  duration: 0.6,
                                  delay: index * 0.1,
                                  ease: 'easeOut'
                              }}
                          >
                              {/* Timeline Dot */}
                              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-6">
                                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                              </div>

                              {/* Content Container */}
                              <div className={`ml-16 md:ml-0 md:w-5/12 ${
                                  index % 2 === 0 
                                      ? 'md:mr-auto md:pr-12' 
                                      : 'md:ml-auto md:pl-12'
                              }`}>
                                  <motion.div 
                                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                                      whileHover={{ y: -5, scale: 1.02 }}
                                  >
                                      {/* Year Badge */}
                                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold mb-4">
                                          {event.year}
                                      </div>
                                      
                                      {/* Event Title */}
                                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                          {event.title}
                                      </h3>
                                      
                                      {/* Event Description */}
                                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                          {event.description}
                                      </p>
                                  </motion.div>
                              </div>
                          </motion.div>
                      ))}
                  </div>
                  
                  {/* Timeline End Marker */}
                  <motion.div 
                      className="relative mt-20 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: TIMELINE_EVENTS.length * 0.1 + 0.3 }}
                  >
                      <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                      </div>
                      <div className="ml-20 md:ml-0 text-center mt-4" style={{ marginTop: 'calc(1rem + 133px)' }}>
                          <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                              To be continued...
                          </span>
                      </div>
                  </motion.div>
              </div>
          </div>
      </BackgroundWrapper>
    </>
  );
};

export default AboutPage;