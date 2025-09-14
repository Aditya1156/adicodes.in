import React from 'react';
import { motion } from 'framer-motion';

interface CustomLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const CustomLogo: React.FC<CustomLogoProps> = ({ 
  className = '', 
  size = 'md',
  animated = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const codeVariants = {
    initial: { opacity: 0.8 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative cursor-pointer`}
      variants={animated ? logoVariants : {}}
      initial="initial"
      whileHover="hover"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main Background Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#bgGradient)"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          filter="url(#glow)"
          variants={animated ? {
            initial: { scale: 1 },
            hover: { 
              scale: 1.02,
              transition: { duration: 0.3 }
            }
          } : {}}
        />

        {/* Code Brackets */}
        <motion.g
          variants={animated ? codeVariants : {}}
          fill="url(#codeGradient)"
          strokeWidth="2"
          stroke="url(#codeGradient)"
        >
          {/* Left Bracket < */}
          <path
            d="M35 25 L25 35 L25 45 L25 55 L25 65 L35 75"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          
          {/* Right Bracket > */}
          <path
            d="M65 25 L75 35 L75 45 L75 55 L75 65 L65 75"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </motion.g>

        {/* Letter 'A' in the center */}
        <motion.g
          variants={animated ? codeVariants : {}}
          fill="url(#codeGradient)"
        >
          <path
            d="M50 30 L42 60 L46 60 L47.5 55 L52.5 55 L54 60 L58 60 L50 30 Z M49 45 L51 45 L50 42 Z"
            fillRule="evenodd"
          />
          <rect x="48" y="47" width="4" height="2" />
        </motion.g>

        {/* Decorative Dots */}
        <motion.g
          variants={animated ? {
            initial: { opacity: 0.6 },
            hover: { 
              opacity: 1,
              scale: 1.1,
              transition: { duration: 0.3 }
            }
          } : {}}
        >
          <circle cx="20" cy="20" r="2" fill="rgba(255, 255, 255, 0.4)" />
          <circle cx="80" cy="20" r="2" fill="rgba(255, 255, 255, 0.4)" />
          <circle cx="20" cy="80" r="2" fill="rgba(255, 255, 255, 0.4)" />
          <circle cx="80" cy="80" r="2" fill="rgba(255, 255, 255, 0.4)" />
        </motion.g>

        {/* Binary Pattern Background */}
        <motion.g
          variants={animated ? {
            initial: { opacity: 0.1 },
            hover: { 
              opacity: 0.2,
              transition: { duration: 0.3 }
            }
          } : {}}
          fill="rgba(255, 255, 255, 0.1)"
          fontSize="6"
          fontFamily="monospace"
        >
          <text x="15" y="15">01</text>
          <text x="75" y="15">10</text>
          <text x="15" y="90">11</text>
          <text x="75" y="90">00</text>
        </motion.g>
      </svg>

      {/* Pulse Effect on Hover */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0"
          variants={{
            initial: { opacity: 0, scale: 1 },
            hover: { 
              opacity: 0.2, 
              scale: 1.2,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          style={{ filter: 'blur(8px)' }}
        />
      )}
    </motion.div>
  );
};

export default CustomLogo;