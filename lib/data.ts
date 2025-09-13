/**
 * This file contains pure data constants, free of any React component imports.
 * It's used by modules like the Gemini API service that should not have
 * dependencies on the UI layer.
 */
import { Project, TimelineEvent } from '../types';

export const PROJECTS: Project[] = [
    {
        title: 'TypingPath – AI-Powered Typing App',
        status: 'Deployed',
        description: 'A full-stack typing training platform with AI integration for personalized lessons and real-time user analytics.',
        detailedDescription: 'Architected and developed a responsive typing training platform offering personalized lessons. Integrated Google Gemini AI for adaptive learning experiences and real-time feedback, creating a dynamic and effective tool for improving typing skills.',
        features: ['AI-Powered Adaptive Lessons', 'Real-time Performance Analytics', 'Responsive & Modern UI', 'Personalized Learning Paths', 'Google Gemini Integration'],
        imageUrls: [
            'https://placehold.co/600x400/10b981/ffffff?text=TypingPath+1',
            'https://placehold.co/600x400/34d399/ffffff?text=TypingPath+2',
            'https://placehold.co/600x400/6ee7b7/ffffff?text=TypingPath+3',
        ],
        tags: ['React', 'TypeScript', 'Firebase', 'Gemini API', 'Tailwind CSS'],
        liveUrl: 'https://www.typingpath.com',
        repoUrl: 'https://github.com/Aditya1156/TypingPath',
        featured: true,
    },
    {
        title: 'AI Chatbot for Logistics',
        status: 'Deployed',
        description: 'A conversational AI chatbot built with React and Gemini API to handle logistics-related use-cases.',
        detailedDescription: 'Developed a basic but intelligent chatbot using React for the front-end interface. The chatbot leverages the Google Gemini API for context-aware and intelligent response generation, tailored for common logistics support queries.',
        features: ['Conversational AI Interface', 'Context-Aware Responses', 'Google Gemini API Integration', 'Built with React'],
        imageUrls: [
            'https://placehold.co/600x400/3b82f6/ffffff?text=AI+Chatbot+1',
            'https://placehold.co/600x400/60a5fa/ffffff?text=AI+Chatbot+2',
        ],
        tags: ['React', 'Gemini API'],
        liveUrl: 'https://godox.netlify.app',
        repoUrl: 'https://github.com/Aditya1156/My-Chat-Bot',
        featured: true,
    },
    {
        title: 'Airline Management System',
        status: 'Completed',
        description: 'A desktop application built with Java for airline booking, scheduling, and passenger management.',
        detailedDescription: 'Designed and implemented a comprehensive desktop-based airline management system using Java. The application includes modules for ticket booking, managing passenger information, and tracking flight statuses, providing a complete solution for airline operations.',
        features: ['Ticket Booking Module', 'Passenger Management System', 'Flight Status Tracking', 'Desktop Application (Java)'],
        imageUrls: [
            'https://placehold.co/600x400/f59e0b/ffffff?text=Airline+App+1',
            'https://placehold.co/600x400/fbbf24/ffffff?text=Airline+App+2',
        ],
        tags: ['Java'],
        repoUrl: 'https://github.com/Aditya1156/FlightManagementSys',
        featured: true,
    },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2023',
    title: 'Completed Senior Secondary',
    description: 'Graduated from the Science Stream at St. Joseph School, Begusarai, Bihar.',
  },
  {
    year: '2023',
    title: 'Started University',
    description: 'Began my Bachelor of Engineering in Computer Science at PES Institute of Technology & Management.',
  },
  {
    year: '2024',
    title: 'Deep Dive into MERN & AI',
    description: 'Focused on building scalable web applications using the MERN stack and began integrating AI models like Gemini for intelligent features.',
  },
  {
    year: 'Present',
    title: 'Seeking New Opportunities',
    description: 'Actively looking for internship or freelance opportunities to apply my skills to real-world projects and continue learning.',
  },
];