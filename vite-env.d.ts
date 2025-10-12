/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_GA_TRACKING_ID?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  // Add more env variables as needed
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
