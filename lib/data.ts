/**
 * This file contains pure data constants, free of any React component imports.
 * It's used by modules like the Gemini API service that should not have
 * dependencies on the UI layer.
 */
import { Project, TimelineEvent } from '../types';

export const PROJECTS: Project[] = [
    {
        title: 'TypingPath – AI-Powered Modern Typing WebApp',
        status: 'Deployed',
        description: 'Full-stack web application with AI integration and real-time user analytics, currently in production.',
        detailedDescription: 'Architected and developed a responsive typing training platform with personalized lessons. Integrated Google Gemini AI for adaptive learning experiences and real-time feedback, creating a dynamic and effective tool for improving typing skills. Built with React 19, TypeScript, Firebase, and modern web technologies.',
        features: ['AI-Powered Adaptive Lessons', 'Real-time User Analytics', 'Responsive Modern UI', 'Personalized Learning Paths', 'Google Gemini AI Integration', 'Production Deployment'],
        imageUrls: [
            '/images/typingpath1.jpg',
            '/images/typingpath2.jpg',
            '/images/typingpath3.jpg',
            '/images/typingpath4.jpg',
        ],
        tags: ['React 19', 'TypeScript', 'Firebase', 'Google AI API', 'Vite', 'TailwindCSS'],
        liveUrl: 'https://www.typingpath.com',
        repoUrl: 'https://github.com/Aditya1156/TypingPath',
        featured: true,
    },
    {
        title: 'AI Chatbot for Logistics Support',
        status: 'Deployed',
        description: 'Developed a basic chatbot using React for logistics use-cases with intelligent, context-aware response generation.',
        detailedDescription: 'Built a conversational AI chatbot using React for the front-end interface. The chatbot leverages the Google Gemini API for intelligent, context-aware response generation, specifically tailored for logistics support queries and customer service.',
        features: ['Conversational AI Interface', 'Context-Aware Responses', 'Google Gemini API Integration', 'Logistics Use-Cases', 'Real-time Chat Experience'],
        imageUrls: [
            '/images/chatbot1.jpg',
            '/images/chatbot2.jpg',
            '/images/chatbot3.jpg',
            '/images/chatbot4.jpg',
        ],
        tags: ['React', 'Google Gemini API', 'JavaScript', 'CSS'],
        liveUrl: 'https://godox.netlify.app',
        repoUrl: 'https://github.com/Aditya1156/My-Chat-Bot',
        featured: true,
    },
    {
        title: 'Airline Management System – Desktop Application',
        status: 'Completed',
        description: 'Designed a desktop-based airline booking and scheduling system with comprehensive passenger management features.',
        detailedDescription: 'Designed and implemented a comprehensive desktop-based airline management system using Java. The application includes modules for ticket booking, managing passenger information, and tracking flight statuses, providing a complete solution for airline operations and customer service.',
        features: ['Ticket Booking Module', 'Passenger Management System', 'Flight Status Tracking', 'Desktop Application (Java)', 'Comprehensive Airline Operations'],
        imageUrls: [
            '/images/airline1.jpg',
            '/images/airline2.jpg',
            '/images/airline3.jpg',
            '/images/airline4.jpg',
        ],
        tags: ['Java', 'Desktop Application', 'Database Management'],
        repoUrl: 'https://github.com/Aditya1156/FlightManagementSys',
        featured: true,
    },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2023',
    title: 'Completed Senior Secondary',
    description: 'Graduated from Science Stream at St. Joseph School, Begusarai, Bihar in January 2023.',
  },
  {
    year: '2023',
    title: 'Started Engineering',
    description: 'Began Bachelor of Engineering in Computer Science at PES Institute of Technology & Management, Shivamogga, Karnataka.',
  },
  {
    year: '2024',
    title: 'Deep Dive into MERN & AI',
    description: 'Focused on building scalable web applications using React, TypeScript, Firebase, and began integrating AI models like Google Gemini for intelligent features.',
  },
  {
    year: '2024-2025',
    title: 'Production Projects & Portfolio',
    description: 'Deployed TypingPath to production, built AI chatbot for logistics, and created comprehensive portfolio showcasing real-world applications.',
  },
  {
    year: 'Present',
    title: 'Third Year & Job Ready',
    description: 'Currently in third year of engineering, actively seeking internship opportunities and freelance projects to apply skills in professional environments. Expected graduation: January 2027.',
  },
];