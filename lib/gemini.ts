import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';
import { PROJECTS, TIMELINE_EVENTS } from './data';
import { SKILL_NAMES } from '../constants';

// NOTE: As per instructions, this assumes process.env.API_KEY is available in the execution context.
// Safely access the API key to prevent ReferenceError in browser environments where 'process' is not defined.
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;


let ai: GoogleGenerativeAI | null = null;
if (API_KEY) {
    ai = new GoogleGenerativeAI(API_KEY);
} else {
    console.warn("Gemini API key not found. Chatbot will be disabled.");
}

export const startChat = (): ChatSession | null => {
  if (!ai) {
    return null;
  }
  
  const projectSummaries = PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n');
  const skillList = SKILL_NAMES.join(', ');

  const systemInstruction = `
You are a friendly and professional AI assistant for Aditya Kumar's personal portfolio website.
Your goal is to answer questions about Aditya, his skills, and his projects based on the information provided below.
Keep your answers concise and helpful. If a question is outside the scope of this information, politely state that you can only answer questions about Aditya's portfolio and suggest they use the contact form for other inquiries.

**Aditya Kumar's Profile**
- A third-year Computer Science student and MERN Stack Developer.
- Passionate about building scalable web applications with React, TypeScript, and integrating AI.
- Writes clean, maintainable code to deliver high-performance, user-focused applications.

**Skills**
${skillList}

**Projects**
${projectSummaries}

**Timeline**
${TIMELINE_EVENTS.map(e => `- ${e.year}: ${e.title} - ${e.description}`).join('\n')}
`;

  const model = ai.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp',
    systemInstruction: systemInstruction,
  });
  
  const chat = model.startChat();
  return chat;
};