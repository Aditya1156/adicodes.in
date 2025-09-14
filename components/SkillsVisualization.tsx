import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { optimizedFadeIn } from '../lib/optimizedAnimations';
import { ReactIcon, TypeScriptIcon, FirebaseIcon, NodeIcon, JavaIcon } from './icons/TechIcons';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  experience: string;
  projects: number;
}

interface SkillCategory {
  name: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Frontend Development",
    color: "text-blue-400",
    bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    skills: [
      {
        name: "React.js",
        level: 90,
        category: "Frontend",
        icon: ReactIcon,
        experience: "2+ years",
        projects: 5
      },
      {
        name: "TypeScript",
        level: 85,
        category: "Frontend",
        icon: TypeScriptIcon,
        experience: "1.5+ years",
        projects: 4
      },
      {
        name: "JavaScript",
        level: 88,
        category: "Frontend",
        icon: TypeScriptIcon,
        experience: "2+ years",
        projects: 6
      }
    ]
  },
  {
    name: "Backend Development",
    color: "text-purple-400",
    bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    skills: [
      {
        name: "Node.js",
        level: 80,
        category: "Backend",
        icon: NodeIcon,
        experience: "1+ year",
        projects: 3
      },
      {
        name: "Firebase",
        level: 85,
        category: "Backend",
        icon: FirebaseIcon,
        experience: "1.5+ years",
        projects: 4
      }
    ]
  },
  {
    name: "Programming Languages",
    color: "text-slate-400",
    bgColor: "bg-gradient-to-br from-slate-500/20 to-gray-500/20",
    skills: [
      {
        name: "Java",
        level: 82,
        category: "Programming",
        icon: JavaIcon,
        experience: "2+ years",
        projects: 3
      }
    ]
  }
];

const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/10"
      {...(shouldReduceMotion ? {} : optimizedFadeIn)}
      transition={{ delay: delay / 1000 }}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300">
            <skill.icon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg group-hover:text-blue-100 transition-colors duration-300">{skill.name}</h3>
            <p className="text-sm text-slate-400 font-medium">{skill.experience}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{skill.level}%</span>
          <p className="text-xs text-slate-500 font-medium mt-1">{skill.projects} projects</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryFilter: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm border ${
            activeCategory === category
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl shadow-blue-500/25 border-blue-400/30'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border-slate-600/30 hover:border-slate-500/50'
          }`}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        >
          {activeCategory === category && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl"
              layoutId="categoryBackground"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
};

const SkillsVisualization: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'bars' | 'cards'>('bars');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', ...skillsData.map(cat => cat.name)];
  
  const filteredSkills = activeCategory === 'All' 
    ? skillsData.flatMap(cat => cat.skills)
    : skillsData.find(cat => cat.name === activeCategory)?.skills || [];

  const totalProjects = skillsData.flatMap(cat => cat.skills).reduce((sum, skill) => sum + skill.projects, 0);
  const averageLevel = Math.round(
    skillsData.flatMap(cat => cat.skills).reduce((sum, skill) => sum + skill.level, 0) / 
    skillsData.flatMap(cat => cat.skills).length
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-slate-900/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Comprehensive skill set built through hands-on experience, continuous learning, and real-world project development
          </motion.p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/10 text-center hover:border-blue-500/30 transition-all duration-300"
            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              {skillsData.flatMap(cat => cat.skills).length}
            </div>
            <div className="text-slate-400 font-semibold text-lg">Technologies</div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <motion.div 
            className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/10 text-center hover:border-purple-500/30 transition-all duration-300"
            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              {totalProjects}
            </div>
            <div className="text-slate-400 font-semibold text-lg">Projects Built</div>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <motion.div 
            className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/10 text-center hover:border-slate-500/30 transition-all duration-300"
            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text text-transparent mb-3">
              {averageLevel}%
            </div>
            <div className="text-slate-400 font-semibold text-lg">Avg Proficiency</div>
            <div className="w-16 h-1 bg-gradient-to-r from-slate-500 to-slate-400 rounded-full mx-auto mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-slate-200/10">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                viewMode === 'bars'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Progress Bars
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Skill Cards
            </button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.6 }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + viewMode}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {filteredSkills.map((skill, index) => (
              <SkillBar
                key={`${skill.name}-${activeCategory}-${viewMode}`}
                skill={skill}
                delay={index * 150}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Skill Categories Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 1.0 }}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={category.name}
              className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
              whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${category.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold ${category.color} mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name} 
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-slate-200/10 group-hover:border-slate-200/20 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                    >
                      <div className="flex items-center space-x-3">
                        <skill.icon className="w-5 h-5 text-blue-400" />
                        <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {skill.level}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.05) + 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsVisualization;
