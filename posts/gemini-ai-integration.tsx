import React from 'react';

export const meta = {
  slug: 'gemini-ai-integration',
  title: 'Integrating Gemini AI in a React App',
  date: '2024-06-28',
  description: 'A step-by-step guide on how to leverage the Google Gemini API to build intelligent, interactive features in a modern React application.',
};

export const Content: React.FC = () => (
  <>
    <p>
      Artificial Intelligence is no longer a futuristic concept; it's a tool that developers can integrate into their applications today. Google's Gemini API provides a powerful and accessible way to do just that. In this post, I'll walk you through how I integrated Gemini into my React projects to create dynamic and intelligent user experiences.
    </p>

    <h2>Getting Started with the Google GenAI SDK</h2>
    <p>
      The first step is to get the necessary tools. Google provides the <code>@google/genai</code> SDK, which simplifies the process of making API calls. While my project environment manages the setup, the core of the client initialization is straightforward.
    </p>
    <pre><code className="language-tsx">{`import { GoogleGenAI } from "@google/genai";

// The API key is handled securely by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });`}</code></pre>
    <p>
        It's crucial to handle your API key securely. In a real-world application, you would never expose this on the client-side. All API calls should be proxied through your own backend server, which is where the key would be stored as an environment variable.
    </p>

    <h2>Crafting the Perfect Prompt</h2>
    <p>
      The quality of the AI's response is directly proportional to the quality of your prompt. "Prompt engineering" is the art of designing inputs that get the model to behave exactly as you want. For my TypingPath app, I needed the AI to generate typing lessons based on a user's common mistakes.
    </p>
    <p>
        A simplified version of my prompt looked something like this:
    </p>
    <blockquote>
        "You are a typing tutor. A user frequently makes mistakes with the letters 'a', 's', and the word 'the'. Generate a short, engaging paragraph of about 50 words that focuses on practicing these specific letters and words. The paragraph should be lowercase and contain no special punctuation."
    </blockquote>
    
    <h2>Making the API Call in React</h2>
    <p>
      To call the API from a React component, I created an asynchronous function. It's important to manage loading and error states to provide good user feedback.
    </p>

    <pre><code className="language-tsx">{`import { useState } from 'react';

async function generateLesson(prompt) {
  // In a real app, this would call our own backend endpoint
  // which then calls the Gemini API securely.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
}

function LessonGenerator() {
  const [lesson, setLesson] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const prompt = "Generate a new typing lesson."; // a dynamic prompt
    const newLesson = await generateLesson(prompt);
    setLesson(newLesson);
    setIsLoading(false);
  };

  // ... JSX to render button, loading state, and lesson
}`}</code></pre>

    <h2>Conclusion</h2>
    <p>
      Integrating the Gemini API into a React application is surprisingly straightforward with the provided SDK. The real challenge and fun lie in designing creative prompts and building a seamless user interface around the AI's capabilities. It opens up a world of possibilities for creating smarter, more personalized applications.
    </p>
  </>
);