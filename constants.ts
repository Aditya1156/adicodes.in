export const SOCIAL_LINKS = {
  github: 'https://github.com/Aditya1156',
  linkedin: 'https://linkedin.com/in/aditya-kumar-165911339',
  email: 'mailto:adityaissc7@gmail.com',
};

// Single source of truth for skill definitions (without icons)
export const SKILLS_DATA = {
  REACT: { name: 'React' },
  TYPESCRIPT: { name: 'TypeScript' },
  NODE: { name: 'Node.js' },
  EXPRESS: { name: 'Express' },
  MONGO: { name: 'MongoDB' },
  FIREBASE: { name: 'Firebase' },
  GEMINI: { name: 'Gemini API' },
  TAILWIND: { name: 'Tailwind CSS' },
  JAVA: { name: 'Java' },
};

export const SKILL_NAMES: string[] = Object.values(SKILLS_DATA).map(skill => skill.name);