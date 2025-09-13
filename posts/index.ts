import { PostMeta } from '../types';
import { meta as howTypingPathWasBuiltMeta, Content as HowTypingPathWasBuiltContent } from './how-typing-path-was-built';
import { meta as geminiAiIntegrationMeta, Content as GeminiAiIntegrationContent } from './gemini-ai-integration';
import React from 'react';

// Array of all post metadata
export const posts: PostMeta[] = [
  howTypingPathWasBuiltMeta,
  geminiAiIntegrationMeta,
];

// Map of slugs to content components for dynamic rendering
export const postContent: { [key: string]: React.FC } = {
  [howTypingPathWasBuiltMeta.slug]: HowTypingPathWasBuiltContent,
  [geminiAiIntegrationMeta.slug]: GeminiAiIntegrationContent,
};
