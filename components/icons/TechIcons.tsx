
import React from 'react';

// Using generic icons as placeholders for brand logos to avoid copyright issues.
// In a real project, you would use the official logos.

export const ReactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M12 1c-5 0-9 2-9 6 0 4 4 6 9 6s9-2 9-6c0-4-4-6-9-6"></path>
    <path d="M12 23c-5 0-9-2-9-6 0-4 4-6 9-6s9 2 9 6c0 4-4 6-9 6"></path>
    <path d="M5 8c0-5 2-9 6-9 4 0 6 4 6 9 0 5-2 9-6 9-4 0-6-4-6-9"></path>
    <path d="M23 16c0-5-2-9-6-9-4 0-6 4-6 9 0 5 2 9 6 9 4 0 6-4 6-9"></path>
  </svg>
);

export const TypeScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2"></rect>
    <path d="M8 7v2h2v8h2V9h2V7H8z" fill="white"></path>
    <path d="M16 7v2c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v4c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6v2c1.1 0 2.1-.4 2.8-1.2.7-.7 1.2-1.7 1.2-2.8v-4c0-1.1-.4-2.1-1.2-2.8C18.1 7.4 17.1 7 16 7z" fill="white"></path>
  </svg>
);

export const JavaScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2"></rect>
    <path d="M7 16v-2c0-.6-.4-1-1-1s-1 .4-1 1v2c0 1.1.9 2 2 2s2-.9 2-2" fill="#000"></path>
    <path d="M17 16v-2c0-.6-.4-1-1-1s-1 .4-1 1v2c0 1.1.9 2 2 2s2-.9 2-2" fill="#000"></path>
    <path d="M9 8h6v2H9V8z" fill="#000"></path>
  </svg>
);

export const JavaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218"></path>
    <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"></path>
    <path d="M19.33 20.504s.679.559-.747.99c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.819"></path>
  </svg>
);

export const CppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2H7v-2h2v-2h2v6zm4-4h-2v-2h2v2zm0-4h-2V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2z"></path>
  </svg>
);

export const CIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h4v2h-4zm6-5H8v-2h8v2z"></path>
  </svg>
);

export const ViteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);

export const NodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm-1 14.5h-2v-7h2v7zm4 0h-2v-7h2v7z"></path>
  </svg>
);

export const MongoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"></path>
  </svg>
);

export const ExpressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.2L19.6 8 12 11.8 4.4 8 12 4.2zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"></path>
  </svg>
);

export const FirebaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L4 8v8l8 6 8-6V8l-8-6zm0 2.8L17.2 9 12 12.2 6.8 9 12 4.8zM6 10.5l5 3v5.5l-5-3.7v-4.8zm12 0v4.8l-5 3.7v-5.5l5-3z"></path>
  </svg>
);

export const TailwindIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6z"></path>
    <path d="M6 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C9.61 13.15 8.47 12 6 12z"></path>
  </svg>
);

export const NextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14v-8l6 4-6 4z"></path>
  </svg>
);

export const GitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
  </svg>
);

export const PythonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c-1.1 0-2 .9-2 2v3H8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2v3c0 1.1.9 2 2 2s2-.9 2-2v-3h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-2V4c0-1.1-.9-2-2-2zm0 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm0 16c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path>
  </svg>
);

export const HTMLIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 2L5.5 20.5L12 22l6.5-1.5L20 2H4zm3.5 4h9l-.5 2h-8l.5 2h7l-1 4-3.5 1L7 14l.5-2H9l1 1 2.5-.5.5-1.5H6L4.5 6z"></path>
  </svg>
);

export const CSSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 2L5.5 20.5L12 22l6.5-1.5L20 2H4zm12.5 4.5l-.5 2-2-.5-2 .5-.5-2h5zm-1 4l-.5 2h-6l.5-2h6zm-1.5 4l-1.5.5-1.5-.5-.5-1.5h3l-.5 1.5z"></path>
  </svg>
);

export const DockerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 1.5h3v3h-3v-3zm-3 3h3v3h-3v-3zm-3 3h3v3h-3v-3zm-3 3h3v3h-3v-3zm-3 0h3v3h-3v-3zm9-6h3v3h-3v-3zm3 3h3v3h-3v-3zm-12 9c0 3.87 3.13 7 7 7s7-3.13 7-7"></path>
  </svg>
);

export const VSCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.4 4.4L16 2l-8 8-4-4L2 8l6 6-6 6 2 2 4-4 8 8 2.4-2.4L10.8 12l7.6-7.6z"></path>
  </svg>
);

export const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z"></path>
    <path d="m9.5 9 2.5 5 2.5-5"></path><path d="m14.5 14-2.5-5"></path>
  </svg>
);
