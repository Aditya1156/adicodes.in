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
    bgColor: "bg-blue-900/30",
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
    color: "text-cyan-400",
    bgColor: "bg-cyan-900/30",
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
    bgColor: "bg-slate-900/30",
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
      className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 hover:shadow-md transition-shadow duration-300"
      {...(shouldReduceMotion ? {} : optimizedFadeIn)}
      transition={{ delay: delay / 1000 }}
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg">
            <skill.icon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{skill.name}</h3>
            <p className="text-sm text-gray-400">{skill.experience}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-blue-400">{skill.level}%</span>
          <p className="text-xs text-gray-400">{skill.projects} projects</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
          />
        </div>
        <motion.div
          className="absolute -top-8 bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            x: isVisible ? `calc(${skill.level}% - 20px)` : -20 
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
        >
          {skill.level}%
        </motion.div>
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
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        >
          {category}
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
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive skill set built through hands-on experience and continuous learning
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{skillsData.flatMap(cat => cat.skills).length}</div>
            <div className="text-gray-400">Technologies</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{totalProjects}</div>
            <div className="text-gray-400">Projects Built</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 text-center">
            <div className="text-3xl font-bold text-slate-400 mb-2">{averageLevel}%</div>
            <div className="text-gray-400">Average Proficiency</div>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          className="flex justify-center mb-8"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                viewMode === 'bars'
                  ? 'bg-gray-600 text-blue-400 shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              Progress Bars
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-gray-600 text-blue-400 shadow-sm'
                  : 'text-gray-400'
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          >
            {filteredSkills.map((skill, index) => (
              <SkillBar
                key={`${skill.name}-${activeCategory}-${viewMode}`}
                skill={skill}
                delay={index * 100}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Skill Categories Overview */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.8 }}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={category.name}
              className={`${category.bgColor} p-6 rounded-xl border border-gray-700`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className={`text-xl font-semibold ${category.color} mb-3`}>
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm font-medium text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsVisualization;
