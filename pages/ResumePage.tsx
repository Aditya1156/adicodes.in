import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadIcon, CheckCircleIcon } from '../components/icons/UIIcons';
import { trackEvent } from '../lib/analytics';
import BackgroundWrapper from '../components/BackgroundWrapper';
import MetaTags from '../components/MetaTags';

const ResumePage: React.FC = () => {
  const resumeUrl = '/resume.pdf';
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    trackEvent('Click: Download Resume');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <MetaTags
        title="Resume | Aditya Kumar"
        description="View and download the professional resume of Aditya Kumar, detailing my experience, education, and technical skills."
        keywords="Aditya Kumar resume, CV, MERN developer resume, web developer resume"
      />
      <BackgroundWrapper>
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            My Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Here is my current resume, outlining my skills and experience. Feel free to download it for your records.
          </p>

          <motion.a
            href={resumeUrl}
            download="Aditya_Kumar_Resume.pdf"
            onClick={handleDownload}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 mb-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Resume
          </motion.a>

          <motion.div
            className="w-full aspect-[8.5/11] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-2 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
              <object
                data={resumeUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                aria-label="Aditya Kumar's Resume PDF"
                className="rounded-lg"
              >
                <div className="p-8 h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <p className="mb-4">
                    It appears you don't have a PDF plugin for this browser. No biggie...
                  </p>
                  <a href={resumeUrl} className="text-indigo-500 hover:underline">
                    Click here to download the PDF file instead.
                  </a>
                </div>
              </object>
          </motion.div>
        </motion.div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full shadow-lg z-50 dark:bg-white dark:text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { ease: 'easeInOut', duration: 0.3 } }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span>Download started!</span>
            </motion.div>
          )}
        </AnimatePresence>
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
      </BackgroundWrapper>
    </>
  );
};

export default ResumePage;