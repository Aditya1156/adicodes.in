import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { optimizedFadeIn, optimizedSlideIn } from '../lib/optimizedAnimations';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'education' | 'project' | 'achievement' | 'experience';
  icon: string;
  details?: string[];
  technologies?: string[];
  status?: 'completed' | 'in-progress' | 'upcoming';
}

const timelineData: TimelineEvent[] = [
  {
    id: '1',
    year: '2021-2023',
    title: 'Senior Secondary Education',
    description: 'Completed Science Stream at St. Joseph School, Begusarai, Bihar',
    type: 'education',
    icon: '🎓',
    status: 'completed',
    details: [
      'Focused on Mathematics, Physics, and Computer Science',
      'Developed strong analytical and problem-solving skills',
      'Graduated in January 2023'
    ]
  },
  {
    id: '2',
    year: '2023',
    title: 'Started Engineering Journey',
    description: 'Began Bachelor of Engineering in Computer Science at PES Institute',
    type: 'education',
    icon: '🚀',
    status: 'in-progress',
    details: [
      'Enrolled at PES Institute of Technology & Management, Karnataka',
      'Currently in 3rd year of Computer Science Engineering',
      'Expected graduation: January 2027'
    ]
  },
  {
    id: '3',
    year: '2023-2024',
    title: 'MERN Stack Mastery',
    description: 'Deep dive into modern web development technologies',
    type: 'achievement',
    icon: '💻',
    status: 'completed',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
    details: [
      'Self-directed learning through hands-on projects',
      'Mastered frontend and backend development',
      'Gained expertise in modern deployment practices'
    ]
  },
  {
    id: '4',
    year: '2024',
    title: 'AI Integration Specialization',
    description: 'Specialized in AI/ML integration with web applications',
    type: 'achievement',
    icon: '🤖',
    status: 'completed',
    technologies: ['Google Gemini AI', 'API Integration', 'Real-time Analytics'],
    details: [
      'Integrated Google Gemini AI into web applications',
      'Built intelligent user experiences with AI-powered features',
      'Developed expertise in conversational AI interfaces'
    ]
  },
  {
    id: '5',
    year: '2024',
    title: 'TypingPath - Production Launch',
    description: 'Launched AI-powered typing training platform serving 500+ users',
    type: 'project',
    icon: '⌨️',
    status: 'completed',
    technologies: ['React 19', 'TypeScript', 'Firebase', 'Google AI API'],
    details: [
      'Architected responsive typing training platform',
      'Integrated AI for adaptive learning experiences',
      'Currently serving 500+ active users in production',
      'Built with modern web technologies and best practices'
    ]
  },
  {
    id: '6',
    year: '2024',
    title: 'AI Chatbot for Logistics',
    description: 'Developed intelligent chatbot for logistics support queries',
    type: 'project',
    icon: '💬',
    status: 'completed',
    technologies: ['React', 'Google Gemini API', 'Context-Aware AI'],
    details: [
      'Built conversational AI interface for customer service',
      'Achieved 95% user satisfaction rate',
      'Specialized for logistics use-cases and support queries'
    ]
  },
  {
    id: '7',
    year: '2024-Present',
    title: 'Portfolio & Professional Development',
    description: 'Building comprehensive portfolio and seeking opportunities',
    type: 'experience',
    icon: '🌟',
    status: 'in-progress',
    details: [
      'Created modern, optimized portfolio showcasing skills',
      'Actively seeking internship opportunities',
      'Continuing to build production-ready applications',
      'Expanding knowledge in AI/ML and cloud technologies'
    ]
  },
  {
    id: '8',
    year: '2025-2027',
    title: 'Professional Growth & Graduation',
    description: 'Completing engineering and transitioning to professional career',
    type: 'experience',
    icon: '🎯',
    status: 'upcoming',
    details: [
      'Complete Bachelor of Engineering degree',
      'Gain professional experience through internships',
      'Build industry connections and expertise',
      'Transition to full-time software development role'
    ]
  }
];

const TimelineCard: React.FC<{ 
  event: TimelineEvent; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
}> = ({ event, isActive, onClick, index }) => {
  const shouldReduceMotion = useReducedMotion();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-400';
      default:
        return 'bg-indigo-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'border-blue-800 bg-blue-900/20';
      case 'project':
        return 'border-green-800 bg-green-900/20';
      case 'achievement':
        return 'border-purple-800 bg-purple-900/20';
      case 'experience':
        return 'border-orange-800 bg-orange-900/20';
      default:
        return 'border-gray-700 bg-gray-800';
    }
  };

  return (
    <motion.div
      className="relative flex items-center cursor-pointer group"
      onClick={onClick}
      {...(shouldReduceMotion ? {} : optimizedFadeIn)}
      transition={{ delay: index * 0.1 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
    >
      {/* Timeline Dot - Enhanced with better positioning */}
      <motion.div
        className={`relative z-20 w-16 h-16 rounded-full ${getStatusColor(event.status)} flex items-center justify-center text-white text-2xl shadow-xl border-4 border-gray-900`}
        whileHover={shouldReduceMotion ? {} : { 
          scale: 1.1,
          boxShadow: '0 0 0 4px rgba(17, 24, 39, 1), 0 0 30px rgba(59, 130, 246, 0.5)'
        }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        style={{
          boxShadow: '0 0 0 4px rgba(17, 24, 39, 1), 0 0 20px rgba(59, 130, 246, 0.3)',
          minWidth: '64px', // Ensure consistent width
          minHeight: '64px' // Ensure consistent height
        }}
      >
        {event.icon}
        {event.status === 'in-progress' && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white opacity-60"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Card Content - Better aligned */}
      <motion.div
        className={`ml-6 p-6 rounded-xl border-2 ${getTypeColor(event.type)} ${
          isActive ? 'shadow-lg scale-105' : 'shadow-sm'
        } transition-all duration-300 flex-1 hover:shadow-blue-500/20 hover:shadow-xl min-h-[120px] flex flex-col justify-center`}
        layoutId={`card-${event.id}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">
            {event.year}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.status === 'completed' ? 'bg-green-900/50 text-green-400' :
            event.status === 'in-progress' ? 'bg-blue-900/50 text-blue-400' :
            'bg-gray-700 text-gray-400'
          }`}>
            {event.status?.replace('-', ' ') || 'completed'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {event.description}
        </p>

        {event.technologies && (
          <div className="flex flex-wrap gap-2 mb-3">
            {event.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-400">
          Click to view details →
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimelineDetails: React.FC<{ event: TimelineEvent; onClose: () => void }> = ({ event, onClose }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center text-2xl">
              {event.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{event.title}</h2>
              <p className="text-indigo-400 font-semibold">{event.year}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
          {event.description}
        </p>

        {event.technologies && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {event.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-300 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {event.details && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Key Highlights</h3>
            <ul className="space-y-3">
              {event.details.map((detail, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  {...(shouldReduceMotion ? {} : optimizedSlideIn)}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const InteractiveTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<'all' | 'education' | 'project' | 'achievement' | 'experience'>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredEvents = filter === 'all' 
    ? timelineData 
    : timelineData.filter(event => event.type === filter);

  const filters = [
    { key: 'all', label: 'All Events', icon: '📅' },
    { key: 'education', label: 'Education', icon: '🎓' },
    { key: 'project', label: 'Projects', icon: '💻' },
    { key: 'achievement', label: 'Achievements', icon: '🏆' },
    { key: 'experience', label: 'Experience', icon: '💼' }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Follow my educational and professional timeline, from student to aspiring developer
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.2 }}
        >
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <span>{filterOption.icon}</span>
              <span>{filterOption.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Continuous Timeline Line - Properly positioned to connect all dots */}
          <div className="absolute w-1 z-0 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400 opacity-80 rounded-full"
               style={{ 
                 left: '31px', // Exact center of the 64px (4rem) dot
                 top: '32px',  // Start from center of first dot
                 bottom: '32px', // End at center of last dot
               }} 
          />
          
          {/* Enhanced background line for depth */}
          <div className="absolute w-3 z-0 bg-gradient-to-b from-gray-700/20 to-gray-800/40 rounded-full blur-sm"
               style={{ 
                 left: '30px',
                 top: '32px',
                 bottom: '32px',
               }} 
          />
          
          {/* Timeline container with consistent spacing */}
          <div className="space-y-8 relative z-10">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  <TimelineCard
                    event={event}
                    isActive={selectedEvent?.id === event.id}
                    onClick={() => setSelectedEvent(event)}
                    index={index}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {timelineData.filter(e => e.type === 'education').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Education Milestones</div>
          </div>
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {timelineData.filter(e => e.type === 'project').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Major Projects</div>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {timelineData.filter(e => e.type === 'achievement').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Key Achievements</div>
          </div>
          <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {timelineData.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completed Goals</div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <TimelineDetails
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveTimeline;
