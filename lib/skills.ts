import React from 'react';
import {
  ReactIcon,
  TypeScriptIcon,
  FirebaseIcon,
  GeminiIcon,
  NodeIcon,
  MongoIcon,
  ExpressIcon,
  TailwindIcon,
  JavaIcon
} from '../components/icons/TechIcons';
import { SKILLS_DATA } from '../constants'; // Import the pure data

export interface Skill {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// Combine data with icons to create the UI-specific SKILLS object
export const SKILLS: { [key: string]: Skill } = {
  REACT: { ...SKILLS_DATA.REACT, icon: ReactIcon },
  TYPESCRIPT: { ...SKILLS_DATA.TYPESCRIPT, icon: TypeScriptIcon },
  NODE: { ...SKILLS_DATA.NODE, icon: NodeIcon },
  EXPRESS: { ...SKILLS_DATA.EXPRESS, icon: ExpressIcon },
  MONGO: { ...SKILLS_DATA.MONGO, icon: MongoIcon },
  FIREBASE: { ...SKILLS_DATA.FIREBASE, icon: FirebaseIcon },
  GEMINI: { ...SKILLS_DATA.GEMINI, icon: GeminiIcon },
  TAILWIND: { ...SKILLS_DATA.TAILWIND, icon: TailwindIcon },
  JAVA: { ...SKILLS_DATA.JAVA, icon: JavaIcon },
};