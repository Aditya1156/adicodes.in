import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Optimize chunk splitting for better caching
        rollupOptions: {
          output: {
            manualChunks: {
              // Separate vendor chunks for better caching
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'animation-vendor': ['framer-motion'],
              'ai-vendor': ['@google/generative-ai'],
            },
          },
        },
        // Enable source maps for debugging in production
        sourcemap: mode === 'development',
        // Optimize for modern browsers
        target: 'es2020',
        // Minify with better compression
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: mode === 'production',
            drop_debugger: mode === 'production',
          },
        },
      },
      // Enable SWC for faster builds in development
      esbuild: {
        target: 'es2020',
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', 'react-router-dom'],
      },
    };
});
