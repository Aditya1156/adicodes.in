import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';
    
    return {
      base: '/', // Ensure base path is set correctly for Vercel
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NODE_ENV': JSON.stringify(mode),
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
            manualChunks: (id) => {
              // Create more granular chunks for better caching
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                  return 'react-vendor';
                }
                if (id.includes('framer-motion')) {
                  return 'animation-vendor';
                }
                if (id.includes('@google/generative-ai')) {
                  return 'ai-vendor';
                }
                if (id.includes('react-helmet-async')) {
                  return 'seo-vendor';
                }
                // Group smaller dependencies
                return 'vendor';
              }
              // Split pages into separate chunks
              if (id.includes('/pages/')) {
                const pageMatch = id.split('/pages/')[1];
                if (pageMatch) {
                  const pageName = pageMatch.split('.')[0];
                  if (pageName) {
                    return `page-${pageName.toLowerCase()}`;
                  }
                }
              }
              // Split components into chunks
              if (id.includes('/components/')) {
                if (id.includes('ChatbotWidget') || id.includes('GlowEffects')) {
                  return 'heavy-components';
                }
                if (id.includes('LoadingScreen') || id.includes('SEO')) {
                  return 'core-components';
                }
                return 'components';
              }
              // Default chunk
              return undefined;
            },
            // Optimize asset file naming
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name!.split('.');
              const ext = info[info.length - 1];
              if (ext && /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                return `assets/images/[name]-[hash][extname]`;
              }
              if (ext && /css/i.test(ext)) {
                return `assets/css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            },
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
          },
        },
        // Enable source maps for debugging in production
        sourcemap: !isProduction,
        // Optimize for modern browsers
        target: ['es2020', 'chrome80', 'firefox78', 'safari13'],
        // Minify with better compression
        minify: isProduction ? 'terser' : false,
        terserOptions: isProduction ? {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug'],
            passes: 2,
          },
          mangle: {
            safari10: true,
          },
          format: {
            comments: false,
          },
        } : {},
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
        // Enable CSS code splitting
        cssCodeSplit: true,
        // Optimize assets
        assetsInlineLimit: 4096, // 4kb
        // Report compressed size
        reportCompressedSize: isProduction,
      },
      // Enable SWC for faster builds in development
      esbuild: {
        target: 'es2020',
        drop: isProduction ? ['console', 'debugger'] : [],
        legalComments: 'none',
      },
      // Optimize dependencies
      optimizeDeps: {
        include: [
          'react', 
          'react-dom', 
          'framer-motion', 
          'react-router-dom',
          'react-helmet-async'
        ],
        exclude: ['@google/generative-ai'], // Exclude large deps from pre-bundling
      },
      // Development server optimizations
      server: {
        hmr: {
          overlay: false, // Disable error overlay for better UX
        },
        // Enable compression in dev
        middlewareMode: false,
      },
      // Preview server optimizations
      preview: {
        port: 4173,
        strictPort: true,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
      // CSS optimizations
      css: {
        devSourcemap: !isProduction,
        preprocessorOptions: {
          // Add any CSS preprocessor options here
        },
      },
      // Plugin optimizations
      plugins: [],
      // Experimental features
      experimental: {
        renderBuiltUrl(filename, { hostType }) {
          if (hostType === 'js') {
            return { js: `/${filename}` };
          } else {
            return { relative: true };
          }
        }
      },
    };
});
