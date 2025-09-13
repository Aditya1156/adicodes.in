import React from 'react';

export const meta = {
  slug: 'how-typing-path-was-built',
  title: 'How TypingPath Was Built: A Deep Dive',
  date: '2024-07-15',
  description: 'An inside look into the architecture, technology choices, and challenges faced during the development of TypingPath.',
};

export const Content: React.FC = () => (
  <>
    <p>
      Building a full-stack application from scratch is both a daunting and rewarding experience. For my project, TypingPath, I wanted to create a modern, AI-powered typing tutor that was not only functional but also a joy to use. This post breaks down the journey, the tech stack, and some key learnings along the way.
    </p>
    
    <h2>The Core Idea</h2>
    <p>
      The goal was simple: move beyond static typing tests. I envisioned a platform that could analyze a user's performance in real-time and adapt the lessons to target their specific weaknesses. This is where the idea of integrating AI came into play.
    </p>
    
    <h2>Choosing the Tech Stack</h2>
    <p>
      Selecting the right tools is crucial. I opted for a modern, JavaScript-centric stack that I was passionate about:
    </p>
    <ul>
      <li><strong>Frontend:</strong> React 19 with Vite. Vite's lightning-fast development server made the experience incredibly smooth. TypeScript was a non-negotiable for type safety and scalability.</li>
      <li><strong>Styling:</strong> TailwindCSS. For rapid UI development, nothing beats Tailwind. It allowed me to build a custom, responsive design without writing a single line of custom CSS.</li>
      <li><strong>Backend & Database:</strong> Firebase. Using Firebase (Firestore for the database, Authentication for user management, and Hosting) allowed me to build a "serverless" backend quickly, letting me focus on the application logic rather than infrastructure.</li>
      <li><strong>AI Integration:</strong> Google's Gemini API. This was the magic ingredient for generating adaptive lessons and providing intelligent feedback.</li>
    </ul>

    <h2>Key Architectural Decisions</h2>
    <h3>1. State Management</h3>
    <p>
      For a complex application like a typing tutor, managing state is critical. I relied heavily on React's built-in hooks like <code>useState</code>, <code>useReducer</code>, and <code>useContext</code>. For global state like user authentication status, <code>useContext</code> was perfect. For the complex state of the typing test itself (e.g., current word, typed characters, errors, WPM), <code>useReducer</code> provided a robust and predictable way to handle state transitions.
    </p>
    <pre><code className="language-javascript">{`// Example of the typing test reducer
const initialState = {
  text: 'the quick brown fox...',
  typed: '',
  errors: 0,
  startTime: null,
};

function typingReducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, startTime: Date.now() };
    case 'TYPE_CHAR':
      // ... logic to handle character input
    default:
      return state;
  }
}`}</code></pre>
    
    <h3>2. Firebase Integration</h3>
    <p>
      I created a dedicated Firebase service layer in my application. This abstracted all the Firebase logic away from my components. Components would call functions like <code>authService.signIn()</code> or <code>firestoreService.getUserStats(userId)</code>, keeping them clean and focused on the UI.
    </p>

    <h2>Challenges & Learnings</h2>
    <p>
      The biggest challenge was calculating typing metrics (WPM, accuracy) accurately and performantly in real-time. Debouncing input and using efficient algorithms was key. Integrating the Gemini API also had a learning curve, particularly in crafting the right prompts to get the desired adaptive content.
    </p>
    <p>
      Overall, building TypingPath was an incredible learning experience. It solidified my understanding of full-stack development and showed me the power of integrating AI into modern web applications.
    </p>
  </>
);