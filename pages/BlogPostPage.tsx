import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { posts, postContent } from '../posts';
import NotFoundPage from './NotFoundPage';
import { ChevronLeftIcon } from '../components/icons/UIIcons';
import MetaTags from '../components/MetaTags';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (window.Prism) {
      // Small delay to ensure content is fully rendered before highlighting
      setTimeout(() => window.Prism?.highlightAll(), 0);
    }
  }, [slug]);

  if (!slug) {
    return <NotFoundPage />;
  }

  const postMeta = posts.find((p) => p.slug === slug);
  const PostContent = postContent[slug];

  if (!postMeta || !PostContent) {
    return <NotFoundPage />;
  }

  return (
    <>
      <MetaTags
        title={`${postMeta.title} | Aditya Kumar's Blog`}
        description={postMeta.description}
      />
      <div className="relative min-h-screen overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30"></div>
        <div className="absolute bottom-8 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30"></div>
        
        <motion.div
          className="max-w-3xl mx-auto py-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Back to Blog
          </Link>
        </div>
        <article>
          <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {postMeta.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Published on{' '}
              {new Date(postMeta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>
          <div className="prose dark:prose-invert max-w-none">
            <PostContent />
          </div>
        </article>
        <style>{`
          .prose {
            color: #374151;
          }
          .dark .prose {
            color: #d1d5db;
          }
          .prose h2 {
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            margin-top: 2.5em;
            margin-bottom: 1.25em;
          }
          .prose h3 {
              font-size: 1.5rem;
              line-height: 2rem;
              font-weight: 600;
              margin-top: 2em;
              margin-bottom: 1em;
          }
          .prose p {
            line-height: 1.75;
            margin-top: 1.25em;
            margin-bottom: 1.25em;
          }
          .prose a {
            color: #4f46e5;
            text-decoration: underline;
          }
          .dark .prose a {
              color: #818cf8;
          }
          .prose ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin-top: 1.25em;
              margin-bottom: 1.25em;
          }
          .prose li {
              margin-top: 0.5em;
              margin-bottom: 0.5em;
          }
          .prose pre {
            /* Let PrismJS themes control the background */
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-top: 1.5em;
            margin-bottom: 1.5em;
            border: 1px solid theme('colors.gray.200');
          }
          .dark .prose pre {
            border-color: theme('colors.gray.700');
          }
          .prose code {
            font-family: monospace;
          }
          /* This is for Prism's theme to take over */
          .prose pre code {
              background-color: transparent !important;
              padding: 0;
              color: inherit;
          }
          .prose :not(pre) > code {
              background-color: #e5e7eb;
              color: #1f2937;
              padding: 0.2em 0.4em;
              border-radius: 0.25rem;
              font-size: 0.9em;
          }
          .dark .prose :not(pre) > code {
              background-color: #374151;
              color: #e5e7eb;
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          @media (prefers-reduced-motion: reduce) {
            .animate-blob {
              animation: none;
            }
          }
        `}</style>
        </motion.div>
      </div>
    </>
  );
};

export default BlogPostPage;