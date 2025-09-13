import { PROJECTS, TIMELINE_EVENTS } from './data';
import { SKILL_NAMES } from '../constants';

interface PersonalData {
  name: string;
  title: string;
  bio: string;
  education: string;
  location: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  interests: string[];
  currentFocus: string[];
}

// Your personal information - customize this with your actual details
const ADITYA_DATA: PersonalData = {
  name: "Aditya Kumar",
  title: "MERN Stack Developer & Computer Science Student",
  bio: "Third-year Computer Science student at PESITM, passionate about MERN stack development and full-stack engineering. Experienced in building scalable web applications using React, TypeScript, Firebase, and AI integration. Known for writing clean, maintainable code and delivering high-performance, user-focused applications.",
  education: "Bachelor of Engineering – Computer Science at PES Institute of Technology & Management, Shivamogga, Karnataka (Expected Graduation: January 2027)",
  location: "Bengaluru, Karnataka 577205, India",
  contact: {
    email: "adityaissc7@gmail.com",
    github: "https://github.com/Aditya1156",
    linkedin: "https://linkedin.com/in/aditya-kumar-165911339"
  },
  interests: [
    "MERN Stack Development",
    "Full-Stack Engineering", 
    "Artificial Intelligence Integration",
    "Modern Web Technologies",
    "TypeScript Development",
    "Firebase & Real-time Applications",
    "UI/UX Design",
    "Open Source Contributing"
  ],
  currentFocus: [
    "Building scalable MERN stack applications",
    "Integrating AI/ML into web applications", 
    "Mastering React 19 and TypeScript",
    "Firebase and real-time data management",
    "Deploying production-ready applications",
    "Contributing to open source projects"
  ]
};

// Keywords and responses mapping for local AI
const KNOWLEDGE_BASE = {
  // Greetings
  greetings: {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hi there! I'm Aditya's AI assistant. I can tell you all about his skills, projects, and experience. What would you like to know?",
      "Hello! Welcome to Aditya's portfolio. I'm here to help you learn more about his work and expertise. What interests you?",
      "Hey! Great to meet you! I can share details about Aditya's projects, skills, and background. What would you like to explore?"
    ]
  },

  // About Aditya
  about: {
    keywords: ["about", "who", "tell me", "introduction", "background", "bio"],
    responses: [
      `${ADITYA_DATA.name} is a ${ADITYA_DATA.title}. ${ADITYA_DATA.bio}`,
      `Aditya is currently studying ${ADITYA_DATA.education}. He's passionate about building modern web applications and integrating cutting-edge technologies.`,
      `${ADITYA_DATA.name} specializes in the MERN stack and has a strong focus on creating user-centric applications with clean, maintainable code.`
    ]
  },

  // Skills
  skills: {
    keywords: ["skills", "technologies", "tech stack", "programming", "languages", "frameworks"],
    responses: [
      `Aditya's core skills include: ${SKILL_NAMES.slice(0, 8).join(", ")}. He's proficient in both frontend and backend development.`,
      `His technical expertise covers: ${SKILL_NAMES.slice(8, 16).join(", ")} and many more modern web technologies.`,
      `Aditya works with the full MERN stack: MongoDB, Express.js, React, and Node.js, along with TypeScript, Firebase, and AI integration tools.`
    ]
  },

  // Projects
  projects: {
    keywords: ["projects", "work", "portfolio", "built", "created", "developed"],
    responses: [
      `Aditya has built several impressive projects:\n${PROJECTS.map(p => `• ${p.title}: ${p.description}`).join('\n')}`,
      `His featured projects include:\n${PROJECTS.filter(p => p.featured).map(p => `• ${p.title} (${p.status}): ${p.description}`).join('\n')}`,
      `Some of his notable work includes the TypingPath AI-powered typing app, an AI chatbot for logistics, and an airline management system built with Java.`
    ]
  },

  // Experience/Timeline
  experience: {
    keywords: ["experience", "timeline", "journey", "education", "background", "history"],
    responses: [
      `Here's Aditya's journey:\n${TIMELINE_EVENTS.map(e => `• ${e.year}: ${e.title} - ${e.description}`).join('\n')}`,
      `Aditya started his computer science journey in 2023 and has been continuously learning and building projects in the MERN stack and AI integration.`,
      `Currently in his third year of engineering, Aditya is actively seeking internship and freelance opportunities to apply his skills to real-world projects.`
    ]
  },

  // Contact
  contact: {
    keywords: ["contact", "email", "reach", "hire", "work together", "collaboration"],
    responses: [
      `You can reach Aditya through the contact form on this website, or connect with him on GitHub at ${ADITYA_DATA.contact.github}`,
      `For collaboration opportunities, use the contact form on this portfolio or reach out through his professional networks.`,
      `Aditya is open to internship and freelance opportunities. Feel free to get in touch through the contact section!`
    ]
  },

  // Current work
  current: {
    keywords: ["current", "now", "working on", "latest", "recent", "today"],
    responses: [
      `Currently, Aditya is focusing on: ${ADITYA_DATA.currentFocus.join(", ")}`,
      `He's actively working on building scalable MERN stack applications and exploring AI integration in web development.`,
      `Aditya is currently seeking new opportunities to apply his skills and continue learning in a professional environment.`
    ]
  },

  // Interests
  interests: {
    keywords: ["interests", "hobbies", "passionate", "love", "enjoy", "likes"],
    responses: [
      `Aditya is passionate about: ${ADITYA_DATA.interests.join(", ")}`,
      `His main interests include web development, AI/ML, and creating innovative user experiences.`,
      `He enjoys problem-solving, learning new technologies, and contributing to open source projects.`
    ]
  },

  // Default fallback
  default: {
    keywords: [],
    responses: [
      "I can help you learn about Aditya's skills, projects, experience, and background. What specific aspect would you like to know more about?",
      "I'm here to share information about Aditya Kumar's portfolio. You can ask about his projects, skills, experience, or how to contact him.",
      "Feel free to ask me about Aditya's technical skills, his projects like TypingPath or the AI chatbot, or his educational background!"
    ]
  }
};

// Simple keyword matching and response generation
export function generateLocalResponse(userInput: string): string {
  const input = userInput.toLowerCase().trim();
  
  // Find matching category
  for (const [category, data] of Object.entries(KNOWLEDGE_BASE)) {
    if (category === 'default') continue;
    
    const hasKeyword = data.keywords.some(keyword => 
      input.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      // Return random response from matching category
      const responses = data.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Special handling for specific project questions
  if (input.includes('typingpath') || input.includes('typing')) {
    const typingProject = PROJECTS.find(p => p.title.toLowerCase().includes('typing'));
    return `${typingProject?.title} is ${typingProject?.description} It features: ${typingProject?.features.join(', ')}. You can check it out at ${typingProject?.liveUrl}`;
  }
  
  if (input.includes('chatbot') || input.includes('ai bot')) {
    const chatbotProject = PROJECTS.find(p => p.title.toLowerCase().includes('chatbot'));
    return `${chatbotProject?.title} is ${chatbotProject?.description} Built with ${chatbotProject?.tags.join(', ')}. See it live at ${chatbotProject?.liveUrl}`;
  }
  
  if (input.includes('airline') || input.includes('flight')) {
    const airlineProject = PROJECTS.find(p => p.title.toLowerCase().includes('airline'));
    return `${airlineProject?.title} is ${airlineProject?.description} It includes: ${airlineProject?.features.join(', ')}. Check the code at ${airlineProject?.repoUrl}`;
  }
  
  // Default response
  const defaultResponses = KNOWLEDGE_BASE.default.responses;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Export for backward compatibility
export const startLocalChat = () => ({
  sendMessage: (message: string) => Promise.resolve({
    response: {
      text: () => generateLocalResponse(message)
    }
  })
});
