import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadIcon, CheckCircleIcon, MapPinIcon, GlobeIcon } from '../components/icons/UIIcons';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons/SocialIcons';
import { trackEvent } from '../lib/analytics';
import BackgroundWrapper from '../components/BackgroundWrapper';
import MetaTags from '../components/MetaTags';
import { PROJECTS } from '../lib/data';
import { SOCIAL_LINKS } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { optimizedFadeIn, optimizedFadeInUp } from '../lib/optimizedAnimations';

interface ResumeSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const ResumePage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('summary');
  const shouldReduceMotion = useReducedMotion();

  const handlePrint = () => {
    trackEvent('Click: Print Resume');
    window.print();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const educationData = [
    {
      degree: "Bachelor of Engineering - Computer Science",
      institution: "PES Institute of Technology & Management",
      location: "Shivamogga, Karnataka",
      period: "2023 - 2027 (Expected)",
      status: "Currently in 3rd Year"
    },
    {
      degree: "Senior Secondary Education - Science Stream",
      institution: "St. Joseph School",
      location: "Begusarai, Bihar",
      period: "2021 - 2023",
      status: "Completed January 2023"
    }
  ];

  const experienceData = [
    {
      title: "Full-Stack Developer",
      company: "Freelance & Personal Projects",
      period: "2024 - Present",
      location: "Remote",
      achievements: [
        "Developed and deployed TypingPath.com - AI-powered typing training platform with 500+ active users",
        "Built conversational AI chatbot using Google Gemini API for logistics support with 95% user satisfaction",
        "Architected responsive web applications using React 19, TypeScript, and Firebase",
        "Integrated AI/ML models for personalized learning experiences and real-time analytics"
      ]
    },
    {
      title: "Software Development Intern",
      company: "Self-Directed Learning",
      period: "2023 - 2024",
      location: "Remote",
      achievements: [
        "Mastered MERN stack development through hands-on project building",
        "Specialized in modern web technologies: React, TypeScript, Node.js, Firebase",
        "Gained expertise in AI integration using Google Gemini API",
        "Developed proficiency in version control, deployment, and CI/CD practices"
      ]
    }
  ];

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "TailwindCSS", "Responsive Design"]
    },
    {
      category: "Backend Development", 
      skills: ["Node.js", "Express.js", "RESTful APIs", "Firebase", "Database Design"]
    },
    {
      category: "Programming Languages",
      skills: ["TypeScript", "JavaScript", "Java", "C", "Python"]
    },
    {
      category: "AI & Modern Technologies",
      skills: ["Google Gemini AI", "API Integration", "Real-time Analytics", "Progressive Web Apps"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Git/GitHub", "Vite", "Netlify", "Vercel", "Firebase Hosting", "VS Code"]
    }
  ];

  const resumeSections: ResumeSection[] = [
    {
      id: 'summary',
      title: 'Professional Summary',
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Passionate Computer Science Engineering student with hands-on experience in full-stack development 
            and AI integration. Proven track record of building and deploying production-ready applications 
            that serve real users.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-400 mb-2">Current Focus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Building scalable web applications with React, TypeScript, and AI integration. 
                Actively seeking internship opportunities to apply skills in professional environments.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Key Strengths</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Strong problem-solving abilities, modern web development expertise, 
                and experience with AI/ML integration for intelligent user experiences.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'experience',
      title: 'Experience',
      content: (
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="border-l-4 border-indigo-500 pl-6 pb-6"
              {...(shouldReduceMotion ? {} : optimizedFadeInUp)}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <span className="text-sm text-indigo-400 font-medium">{exp.period}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center text-gray-600 dark:text-gray-400 mb-3">
                <span className="font-medium">{exp.company}</span>
                <span className="hidden md:inline mx-2">•</span>
                <span className="text-sm">{exp.location}</span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'education',
      title: 'Education',
      content: (
        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
              {...(shouldReduceMotion ? {} : optimizedFadeInUp)}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                <span className="text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-300 px-3 py-1 rounded-full">
                  {edu.status}
                </span>
              </div>
              <p className="text-indigo-400 font-medium mb-1">{edu.institution}</p>
              <div className="flex flex-col md:flex-row md:items-center text-gray-600 dark:text-gray-400 text-sm">
                <span className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {edu.location}
                </span>
                <span className="hidden md:inline mx-2">•</span>
                <span>{edu.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'skills',
      title: 'Technical Skills',
      content: (
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300"
              {...(shouldReduceMotion ? {} : optimizedFadeInUp)}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 
                             text-indigo-300 px-3 py-1 rounded-full text-sm font-medium
                             hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800/50 dark:hover:to-purple-800/50
                             transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'projects',
      title: 'Featured Projects',
      content: (
        <div className="space-y-6">
          {PROJECTS.slice(0, 3).map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300"
              {...(shouldReduceMotion ? {} : optimizedFadeInUp)}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{project.detailedDescription}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
                  >
                    <GlobeIcon className="w-4 h-4 mr-1" />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium flex items-center"
                  >
                    <GithubIcon className="w-4 h-4 mr-1" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <>
      <MetaTags
        title="Resume | Aditya Kumar"
        description="Professional resume of Aditya Kumar - Computer Science Engineering student specializing in full-stack development and AI integration. View my experience, education, and technical skills."
        keywords="Aditya Kumar resume, CV, computer science student, full-stack developer, React developer, AI integration"
      />
      <BackgroundWrapper>
        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Aditya Kumar
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              Computer Science Engineering Student & Full-Stack Developer
            </h2>
            
            {/* Contact Information */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
              <a href="mailto:adityaissc7@gmail.com" className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <MailIcon className="w-5 h-5 mr-2" />
                adityaissc7@gmail.com
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <GithubIcon className="w-5 h-5 mr-2" />
                GitHub Profile
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <LinkedinIcon className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handlePrint}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/50"
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Print Resume
              </motion.button>
              <a
                href={SOCIAL_LINKS.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-full text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
              >
                <GlobeIcon className="w-5 h-5 mr-2" />
                View Portfolio
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            {...(shouldReduceMotion ? {} : optimizedFadeInUp)}
            transition={{ delay: 0.2 }}
          >
            {resumeSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-600'
                }`}
              >
                {section.title}
              </button>
            ))}
          </motion.div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {resumeSections.map((section) => (
              activeSection === section.id && (
                <motion.div
                  key={section.id}
                  {...(shouldReduceMotion ? {} : optimizedFadeIn)}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300"
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    {section.title}
                  </h2>
                  {section.content}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full shadow-lg z-50 dark:bg-white dark:text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { ease: 'easeInOut', duration: 0.3 } }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span>Print dialog opened!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Print Styles */}
        <style>{`
          @media print {
            body { font-size: 12px; }
            .no-print { display: none !important; }
            .print-break { page-break-before: always; }
            .bg-gradient-to-r { background: white !important; color: black !important; }
            .dark\\:bg-gray-800 { background: white !important; }
            .dark\\:text-white { color: black !important; }
            .text-indigo-600 { color: #4f46e5 !important; }
            .backdrop-blur-sm { backdrop-filter: none !important; }
            .shadow-xl { box-shadow: none !important; }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </BackgroundWrapper>
    </>
  );
};

export default ResumePage;