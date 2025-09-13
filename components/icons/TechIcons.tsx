
import React from 'react';

// Using generic icons as placeholders for brand logos to avoid copyright issues.
// In a real project, you would use the official logos.

export const ReactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" fill="currentColor" {...props}><path d="M610.7 330.9c-14.8-21.3-43.2-26.3-64.5-11.5L144.4 532.9c-21.3 14.8-26.3 43.2-11.5 64.5l1.5 2.1c14.8 21.3 43.2 26.3 64.5 11.5l401.8-278.1c21.3-14.8 26.3-43.2 11.5-64.5l-1.5-2.1zM512 512c0-136.1 110.3-246.3 246.3-246.3S1004.7 375.9 1004.7 512S894.4 758.3 758.3 758.3S512 648.1 512 512zm0 184.7c-26.3-14.8-31.3-43.2-16.5-64.5L897.3 229c14.8-21.3 43.2-26.3 64.5-11.5l2.1 1.5c21.3 14.8 26.3 43.2 11.5 64.5L573.5 684.5c-14.8 21.3-43.2 26.3-64.5 11.5l-2.1-1.5zM277.9 313.5c-26.3-14.8-59.6 1.5-64.5 32.8L19.6 749.1c-4.9 31.3 16.5 59.6 42.7 64.5l2.1.5c26.3 4.9 54.7-16.5 59.6-42.7l193.8-402.8c4.9-31.3-16.5-59.6-42.7-64.5l-2.1-.5z"></path></svg>
);

export const TypeScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M1.5 0h21l-3 18H18L21 0h-3.033L15.465 18H12.45L15 0H9.033L6.531 18H3.516L6 0H1.5zM24 24H0V0h1.5v22.5h19.5V0H24v24z"></path></svg>
);

export const FirebaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m3.153 18.062 8.64-15.9c.092-.17.32-.17.412 0l2.3 4.234-3.35 6.164-4.85-2.613zm15.49 1.488-8.227-4.44-2.858 5.257 8.628 3.03c.18.064.368-.052.422-.243zM4.68 21.053l5.856-10.77 3.333 6.13zm13.197-15.01L9.65 18.063l.794.43 8.228-4.44c.176-.096.242-.32.146-.496z"></path></svg>
);

export const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z"></path>
    <path d="m9.5 9 2.5 5 2.5-5"></path><path d="m14.5 14-2.5-5"></path>
  </svg>
);

export const JavaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h4v2h-4zm6-5H8V7h10v5z"></path>
  </svg>
);

export const NodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.372 13.916c-.44-.22-1.015-.22-1.454 0-1.21.604-2.564 1.015-4.009 1.185v-5.26c1.445.17 2.799.58 4.009 1.185.44.22.985.22 1.424 0l.955-.478c.44-.22.693-.693.58-1.155-.58-2.503-2.055-4.66-4.148-6.13-1.045-.724-2.26-.985-3.52-.754h-3.69c-1.26-.23-2.475.03-3.52.754-2.094 1.47-3.568 3.627-4.148 6.13-.113.462.14.935.58 1.155l.955.478c.44.22.985.22 1.424 0 1.21-.604 2.565-1.015 4.01-1.185v5.26c-1.445-.17-2.799-.58-4.01-1.185-.44-.22-1.015-.22-1.454 0l-.955.478c-.44.22-.693.693-.58 1.155.58 2.503 2.055 4.66 4.148 6.13 1.045.724 2.26.985 3.52.754h3.69c1.26.23 2.475-.03 3.52-.754 2.094-1.47 3.568-3.627 4.148-6.13.113-.462-.14-.935-.58-1.155l-.955-.478z"></path>
  </svg>
);

export const MongoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.22 14.78c-1.1.72-2.3.4-3.13-.53-.83-.93-.79-2.2.14-3.13.93-.93 2.2-.97 3.13-.14.93.83 1.25 2.03.53 3.13-.33.49-.8.7-1.34.7-.29 0-.58-.08-.87-.23z"></path>
  </svg>
);

export const ExpressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
  </svg>
);

export const TailwindIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 12.5C12 12.5 12.5 11 14 11C15.5 11 16 12.5 16 12.5C16 12.5 15.5 14 14 14C12.5 14 12 12.5 12 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M8 12.5C8 12.5 8.5 11 10 11C11.5 11 12 12.5 12 12.5C12 12.5 11.5 14 10 14C8.5 14 8 12.5 8 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);
