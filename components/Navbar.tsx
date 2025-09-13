import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, LogoIcon } from './icons/UIIcons';
import { 
  navSlideDown, 
  mobileMenuVariants, 
  mobileMenuItemVariants,
  buttonHover,
  buttonTap 
} from '../lib/animations';

const NavLinks: React.FC<{className?: string; onClick?: () => void; isMobile?: boolean}> = ({ 
  className, 
  onClick, 
  isMobile = false 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden";
  const hoverClasses = "hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:scale-105";
  
  const linkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${hoverClasses} ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 shadow-lg' 
        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
    } ${className || ''}`;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/resume', label: 'Resume' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {links.map((link, index) => (
        <motion.div
          key={link.to}
          variants={isMobile ? mobileMenuItemVariants : undefined}
          whileHover={!isMobile ? { y: -2, scale: 1.05 } : undefined}
          whileTap={buttonTap}
          initial={isMobile ? "hidden" : undefined}
          animate={isMobile ? "visible" : undefined}
          custom={index}
        >
          <NavLink 
            to={link.to} 
            className={linkClasses}
            onClick={onClick}
          >
            <span className="relative z-10">{link.label}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
        </motion.div>
      ))}
    </>
  );
};

const Navbar: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
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
    <motion.nav
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-lg' 
          : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-gray-200 dark:border-gray-700'
      }`}
      variants={navSlideDown}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <LogoIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 transition-all duration-300" />
              </motion.div>
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                adicodes.in
              </motion.span>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-center space-x-2"
              variants={navSlideDown}
              initial="hidden"
              animate="visible"
            >
              <NavLinks />
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300 ml-4"
                whileHover={buttonHover}
                whileTap={buttonTap}
                initial={{ rotate: theme === 'dark' ? 180 : 0 }}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'light' ? 
                      <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : 
                      <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? 
                    <MoonIcon className="h-5 w-5" /> : 
                    <SunIcon className="h-5 w-5" />
                  }
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <NavLinks onClick={() => setIsOpen(false)} isMobile={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;