import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon, LogoIcon } from './icons/UIIcons';
import { 
  navSlideDown, 
  mobileMenuItemVariants
} from '../lib/animations';

const NavLinks: React.FC<{className?: string; onClick?: () => void; isMobile?: boolean}> = ({ 
  className, 
  onClick, 
  isMobile = false 
}) => {
  const baseClasses = "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden";
  const hoverClasses = isMobile 
    ? "hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10" 
    : "hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:scale-[1.02] hover:-translate-y-0.5";
  
  const linkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${hoverClasses} ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 shadow-lg' 
        : 'text-gray-300 hover:text-indigo-400'
    } ${className || ''}`;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/resume', label: 'Resume' },
    { to: '/contact', label: 'Contact' },
  ];

  // Responsive hover effects based on screen size
  const getHoverEffect = () => {
    if (isMobile) {
      return {};
    }
    return { 
      y: -1, 
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        mass: 0.5
      }
    };
  };

  return (
    <>
      {links.map((link, index) => (
        <motion.div
          key={link.to}
          {...(isMobile ? {
            variants: mobileMenuItemVariants,
            initial: "hidden",
            animate: "visible",
            custom: index
          } : {})}
          whileHover={getHoverEffect()}
          whileTap={{ 
            scale: 0.98, 
            transition: { duration: 0.1 } 
          }}
        >
          <NavLink 
            to={link.to} 
            className={linkClasses}
            onClick={onClick}
          >
            <span className="relative z-10">{link.label}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0"
              whileHover={{ opacity: 0.08 }}
              transition={{ duration: 0.2 }}
            />
          </NavLink>
        </motion.div>
      ))}
    </>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled 
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700/50 shadow-lg' 
            : 'bg-gray-800/70 backdrop-blur-lg border-gray-700'
        }`}
        variants={navSlideDown}
        initial="hidden"
        animate="visible"
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center"
              whileHover={{ 
                scale: 1.02,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <NavLink to="/" className="flex items-center gap-2.5 group">
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -5, 0],
                    scale: 1.05,
                    transition: { 
                      rotate: { duration: 0.4, ease: "easeInOut" },
                      scale: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                >
                  <LogoIcon className="h-8 w-8 text-blue-400 transition-all duration-300" />
                </motion.div>
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { 
                      duration: 0.2, 
                      ease: "easeOut" 
                    }
                  }}
                >
                  adicodes.in
                </motion.span>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <motion.div 
                className="ml-10 flex items-center space-x-1"
                variants={navSlideDown}
                initial="hidden"
                animate="visible"
              >
                <NavLinks />
              </motion.div>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden">
              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-gray-300 bg-gray-800/50 hover:bg-gray-700/50"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? 
                      <CloseIcon className="h-6 w-6" /> : 
                      <MenuIcon className="h-6 w-6" />
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Optimized */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-xl"
              initial={{ 
                opacity: 0, 
                height: 0,
                y: -10
              }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                y: -10
              }}
              transition={{ 
                duration: 0.25,
                ease: "easeInOut",
                height: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="px-4 pt-4 pb-6 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <NavLinks onClick={() => setIsOpen(false)} isMobile={true} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* CSS for responsive optimizations */}
      <style>{`
        @media (max-width: 768px) {
          .hover\\:scale-\\[1\\.02\\] {
            transform: scale(1.01) !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Prevent layout shift on hover */
        nav {
          transform: translate3d(0, 0, 0);
        }
        
        /* Optimize for touch devices */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: none !important;
          }
          .hover\\:-translate-y-0\\.5:hover {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;