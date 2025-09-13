import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { SKILLS } from '../lib/skills';
import { PROJECTS } from '../lib/data';
import FeaturedProjectsCarousel from '../components/FeaturedProjectsCarousel';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { trackEvent } from '../lib/analytics';
import MetaTags from '../components/MetaTags';
import { 
  staggerContainer, 
  fadeInUp, 
  fadeInDown, 
  scaleIn, 
  bounceIn,
  typewriterVariants,
  buttonHover,
  buttonTap,
  iconFloat
} from '../lib/animations';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

const HomePage: React.FC = () => {
  const techStack = [SKILLS.REACT, SKILLS.TYPESCRIPT, SKILLS.FIREBASE, SKILLS.GEMINI, SKILLS.NODE, SKILLS.TAILWIND];
  const featuredProjects = PROJECTS.filter(p => p.featured);

  return (
    <>
      <MetaTags
        title="Aditya Kumar | MERN Stack Developer"
        description="Welcome to the portfolio of Aditya Kumar, a passionate MERN Stack Developer and AI-integrated web builder. Explore my projects, skills, and professional journey."
        keywords="Aditya Kumar, Portfolio, MERN Stack, Developer, React, TypeScript, AI, Web Developer"
      />
      <BackgroundWrapper>
        <div className="space-y-24 md:space-y-32">
          {/* Hero Section */}
          <motion.div
            className="flex flex-col items-center justify-center text-center pt-12 md:pt-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Image with Advanced Animations */}
            <motion.div
              className="relative mb-8"
              variants={scaleIn}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src="/images/profile.jpg"
                alt="Aditya Kumar"
                className="relative w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl z-10"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>

            {/* Animated Title */}
            <motion.div
              className="overflow-hidden"
              variants={titleVariants}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Aditya Kumar
              </motion.h1>
            </motion.div>

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              className="relative mt-2 mb-6"
              variants={fadeInUp}
            >
              <motion.h2
                className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                MERN Stack Developer
              </motion.h2>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              variants={fadeInUp}
            >
              I'm a third-year Computer Science student at PESITM, passionate about building scalable web applications with React, TypeScript, and AI. I write clean, maintainable code to deliver high-performance, user-focused applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link 
                  to="/projects" 
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 overflow-hidden"
                  onClick={() => trackEvent('Click: View Projects (Hero)')}
                >
                  <span className="relative z-10">View Projects</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link 
                  to="/resume" 
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 backdrop-blur-sm transition-all duration-300"
                  onClick={() => trackEvent('Click: View Resume (Hero)')}
                >
                  <span className="relative z-10">View Resume</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Featured Projects Section */}
          {featuredProjects.length > 0 && (
            <motion.section 
              className="w-full max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h3 
                className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Featured Projects
              </motion.h3>
              <FeaturedProjectsCarousel projects={featuredProjects} />
            </motion.section>
          )}

          {/* Tech Stack Section */}
          <motion.section
            className="w-full max-w-2xl mx-auto text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p 
              variants={fadeInUp} 
              className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4"
            >
              Core Technologies
            </motion.p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                  variants={bounceIn}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  custom={index}
                >
                  <motion.div
                    className="relative p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-500/20 transition-all duration-300"
                    animate={iconFloat}
                    transition={{ delay: index * 0.1, ...iconFloat.transition }}
                  >
                    <tech.icon className="h-10 w-10 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <span className="text-xs font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </BackgroundWrapper>
    </>
  );
};

export default HomePage;