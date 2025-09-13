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
        <div className="max-w-4xl mx-auto py-16 px-4">
              <motion.h1
                  className="text-5xl font-extrabold text-center mb-16 tracking-tight text-gray-900 dark:text-white"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
              >
                  About Me
              </motion.h1>

              <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 items-center"
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
                          src="/images/profile.jpg"
                          alt="Aditya Kumar"
                          className="relative w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                      />
                  </motion.div>
                  <motion.div 
                      className="md:col-span-2"
                      variants={itemVariants}
                  >
                      <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">A Passionate Developer</h2>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Hello! I'm Aditya, a third-year computer science student at PESITM with a deep interest in full-stack engineering. From my first "Hello World", I was captivated by the power of code to create and solve problems. I specialize in the MERN stack and enjoy integrating AI to build smarter, more interactive applications.
                      </p>
                  </motion.div>
              </motion.div>
              
               <div className="mb-24">
                  <motion.h2
                      className="text-3xl font-bold text-center mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                      My Tech Stack
                  </motion.h2>
                  <motion.div
                      className="flex flex-wrap justify-center gap-6 md:gap-8"
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

              <div className="mb-24">
                   <motion.h2 
                      className="text-3xl font-bold text-center mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                   >
                      Beyond the Code
                   </motion.h2>
                   <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
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
                  className="text-3xl font-bold text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
              >
                  My Journey
              </motion.h2>
              <div className="relative border-l-2 border-indigo-300 dark:border-indigo-700 ml-4">
                  <div className="absolute w-1 top-0 left-[-2.5px] h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-line-flow"></div>
                  {TIMELINE_EVENTS.map((event, index) => (
                      <motion.div
                          key={index}
                          className="mb-12 ml-8 group"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ type: 'spring', stiffness: 90, damping: 12, delay: index * 0.15 }}
                      >
                          <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 rounded-full -left-[17px] ring-4 ring-white dark:ring-gray-900 transition-all duration-300 group-hover:bg-indigo-500 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-500/30">
                              <div className="w-3 h-3 bg-indigo-500 rounded-full transition-all duration-300 group-hover:bg-white"></div>
                          </span>
                          <motion.div 
                              className="p-6 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:border-indigo-400 dark:group-hover:border-indigo-500 group-hover:-translate-y-2"
                          >
                              <h3 className="flex items-center mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                                  {event.title}
                                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 ml-3">{event.year}</span>
                              </h3>
                              <p className="block mb-2 text-base font-normal text-gray-600 dark:text-gray-400">{event.description}</p>
                          </motion.div>
                      </motion.div>
                  ))}
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