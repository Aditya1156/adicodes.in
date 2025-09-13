import React from 'react';
import { motion, Variants } from 'framer-motion';
import { posts } from '../posts';
import { Link } from 'react-router-dom';
import { CalendarIcon, ArrowRightIcon } from '../components/icons/UIIcons';
import { trackEvent } from '../lib/analytics';
import BackgroundWrapper from '../components/BackgroundWrapper';
import MetaTags from '../components/MetaTags';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const BlogPage: React.FC = () => {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <MetaTags
        title="Blog | Aditya Kumar"
        description="Read articles and tutorials by Aditya Kumar on web development, AI integration, React, Firebase, and other tech-related topics."
        keywords="Aditya Kumar blog, web development blog, React tutorials, Gemini AI, programming"
      />
      <BackgroundWrapper>
        <div className="max-w-4xl mx-auto py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-extrabold text-center mb-4 tracking-tight">My Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
            Thoughts on technology, development, and personal projects.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedPosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link
                to={`/blog/${post.slug}`}
                className="block p-8 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/80 dark:border-gray-700/80 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <style>{`
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
        </div>
      </BackgroundWrapper>
    </>
  );
};

export default BlogPage;