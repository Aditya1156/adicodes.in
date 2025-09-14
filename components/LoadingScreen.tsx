import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds loading time
    const steps = 100;
    const stepDuration = duration / steps;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 500); // Small delay before hiding
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Enhanced Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl"
              animate={{
                scale: [0.8, 1.3, 0.8],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            {/* Name Animation */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Aditya Kumar
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-400 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Professional Progress Bar Container */}
            <motion.div
              className="w-80 md:w-96 mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {/* Progress Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-sm font-medium text-gray-300 tracking-wide">LOADING PORTFOLIO</span>
                </div>
                <motion.div 
                  className="flex items-center space-x-2"
                  key={progress}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {progress.toString().padStart(3, '0')}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">%</span>
                </motion.div>
              </div>

              {/* Modern Progress Bar */}
              <div className="relative mb-6">
                {/* Progress Bar Track */}
                <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
                  {/* Progress Bar Fill with Gradient */}
                  <motion.div
                    className="h-full relative overflow-hidden rounded-full"
                    style={{ 
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, 
                        #3b82f6 0%, 
                        #06b6d4 30%, 
                        #8b5cf6 60%, 
                        #ec4899 100%)`
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Animated Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Progress Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-300/30 to-purple-400/20 blur-sm"
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress Indicator Dots */}
                <div className="absolute -bottom-1 flex justify-between w-full px-1">
                  {[0, 25, 50, 75, 100].map((milestone) => (
                    <motion.div
                      key={milestone}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        progress >= milestone 
                          ? 'bg-blue-400 shadow-md shadow-blue-400/50' 
                          : 'bg-gray-600'
                      }`}
                      animate={progress >= milestone ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Professional Loading Indicator */}
              <div className="flex justify-center items-center space-x-4">
                {/* Orbital Loading Animation */}
                <div className="relative w-8 h-8">
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                  />
                  <motion.div
                    className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full -ml-0.75 shadow-lg shadow-blue-400/50"
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      transformOrigin: '0.375rem 1rem'
                    }}
                  />
                  <motion.div
                    className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-300 rounded-full -ml-0.5"
                    animate={{
                      rotate: -360
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      transformOrigin: '0.25rem 1rem'
                    }}
                  />
                </div>

                {/* Status Dots */}
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Dynamic Loading Messages */}
            <motion.div
              className="mt-8 h-8 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <AnimatePresence mode="wait">
                {progress < 20 && (
                  <motion.div
                    key="initializing"
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-400 font-medium">Initializing workspace...</p>
                    <p className="text-xs text-gray-500 mt-1">Setting up development environment</p>
                  </motion.div>
                )}
                {progress >= 20 && progress < 40 && (
                  <motion.div
                    key="components"
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-400 font-medium">Loading components...</p>
                    <p className="text-xs text-gray-500 mt-1">React • TypeScript • Framer Motion</p>
                  </motion.div>
                )}
                {progress >= 40 && progress < 60 && (
                  <motion.div
                    key="projects"
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-400 font-medium">Fetching project data...</p>
                    <p className="text-xs text-gray-500 mt-1">Loading portfolio & experiences</p>
                  </motion.div>
                )}
                {progress >= 60 && progress < 80 && (
                  <motion.div
                    key="assets"
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-400 font-medium">Optimizing assets...</p>
                    <p className="text-xs text-gray-500 mt-1">Images • Animations • UI Elements</p>
                  </motion.div>
                )}
                {progress >= 80 && progress < 95 && (
                  <motion.div
                    key="finalizing"
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-400 font-medium">Finalizing interface...</p>
                    <p className="text-xs text-gray-500 mt-1">Applying themes & configurations</p>
                  </motion.div>
                )}
                {progress >= 95 && (
                  <motion.div
                    key="complete"
                    className="text-center"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.p 
                      className="text-sm text-green-400 font-semibold flex items-center justify-center space-x-2"
                      animate={{
                        color: ["#10b981", "#06d6a0", "#10b981"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      >
                        🚀
                      </motion.span>
                      <span>Portfolio Ready!</span>
                    </motion.p>
                    <p className="text-xs text-green-300/70 mt-1">Welcome to my digital space</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;