export const SOCIAL_LINKS = {
  github: 'https://github.com/Aditya1156',
  linkedin: 'https://linkedin.com/in/aditya-kumar-165911339',
  email: 'mailto:adityaissc7@gmail.com',
  portfolio: 'https://adityakr1156.netlify.app',
  medium: 'https://medium.com/@refactorslife',
  typingpath: 'https://www.typingpath.com',
};

// Single source of truth for skill definitions (without icons)
export const SKILLS_DATA = {
  // Programming Languages
  JAVA: { name: 'Java' },
  C: { name: 'C' },
  TYPESCRIPT: { name: 'TypeScript' },
  JAVASCRIPT: { name: 'JavaScript' },
  
  // Web Technologies
  HTML: { name: 'HTML' },
  CSS: { name: 'CSS' },
  TAILWIND: { name: 'TailwindCSS' },
  FIREBASE: { name: 'Firebase' },
  
  // Frameworks & Libraries
  REACT: { name: 'React.js' },
  VITE: { name: 'Vite' },
  
  // API Integration
  REST_API: { name: 'RESTful APIs' },
  GEMINI_AI: { name: 'Google Gemini AI' },
  
  // Tools & Platforms
  GITHUB: { name: 'GitHub' },
  NETLIFY: { name: 'Netlify' },
  VERCEL: { name: 'Vercel' },
  
  // Soft Skills
  COMMUNICATION: { name: 'Communication' },
  TEAMWORK: { name: 'Team Collaboration' },
  LEADERSHIP: { name: 'Leadership' },
};

export const SKILL_NAMES: string[] = Object.values(SKILLS_DATA).map(skill => skill.name);