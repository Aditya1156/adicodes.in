import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon } from './icons/UIIcons';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons/SocialIcons';
import CustomLogo from './CustomLogo';
import { SOCIAL_LINKS } from '../constants';
import { 
  navSlideDown, 
  mobileMenuItemVariants
} from '../lib/animations';

const NavLinks: React.FC<{className?: string; onClick?: () => void; isMobile?: boolean}> = ({ 
  className, 
  onClick, 
  isMobile = false 
}) => {
  const baseClasses = "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden";
  const hoverClasses = isMobile 
    ? "hover:bg-white/5" 
    : "hover:bg-white/5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20";
  
  const linkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${hoverClasses} ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-white border border-indigo-400/30 shadow-lg backdrop-blur-sm' 
        : 'text-gray-300 hover:text-white border border-transparent'
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
      y: -2, 
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.8
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
            <span className="relative z-10 font-medium">{link.label}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 rounded-xl"
              whileHover={{ opacity: 1 }}
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  const quickActions = [
    {
      icon: GithubIcon,
      href: SOCIAL_LINKS.github,
      label: 'GitHub',
      color: 'hover:text-white hover:bg-gray-700/50',
    },
    {
      icon: LinkedinIcon,
      href: SOCIAL_LINKS.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-400 hover:bg-blue-500/10',
    },
    {
      icon: MailIcon,
      href: SOCIAL_LINKS.email,
      label: 'Email',
      color: 'hover:text-green-400 hover:bg-green-500/10',
    },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl shadow-black/20' 
            : 'bg-gray-900/80 backdrop-blur-lg'
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
        {/* Subtle top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Section */}
            <motion.div 
              className="flex items-center gap-4"
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
              <NavLink to="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <CustomLogo size="md" animated={true} />
                  {/* Professional status indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full shadow-lg border-2 border-gray-900"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                
                <motion.div className="flex flex-col">
                  <motion.span 
                    className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent"
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
                  <motion.span 
                    className="text-xs text-gray-400 font-medium tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    whileHover={{ 
                      opacity: 1,
                      color: '#60a5fa',
                      transition: { duration: 0.2 }
                    }}
                  >
                       राधे राधे 
                  </motion.span>
                </motion.div>
              </NavLink>

              {/* Professional Badge */}
              <motion.div
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full border border-emerald-400/20 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium">Available for hire</span>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation & Professional Tools */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Main Navigation */}
              <motion.div 
                className="flex items-center space-x-2"
                variants={navSlideDown}
                initial="hidden"
                animate="visible"
              >
                <NavLinks />
              </motion.div>

              {/* Professional Quick Actions */}
              <motion.div 
                className="flex items-center gap-3 pl-6 border-l border-gray-700/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {quickActions.map((action) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={action.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className={`p-2.5 rounded-xl text-gray-400 ${action.color} transition-all duration-300 border border-transparent hover:border-gray-600/30 backdrop-blur-sm`}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                    title={action.label}
                  >
                    <action.icon className="w-5 h-5" />
                  </motion.a>
                ))}

                {/* Time Display */}
                <motion.div
                  className="px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-xs text-gray-300 font-mono">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Quick Contact */}
              <motion.a
                href={SOCIAL_LINKS.email}
                className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 border border-gray-700/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MailIcon className="w-5 h-5" />
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 backdrop-blur-sm"
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

        {/* Mobile Menu - Enhanced */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-700/50 bg-gray-900/98 backdrop-blur-xl"
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
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="px-4 pt-6 pb-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {/* Mobile Navigation Links */}
                <div className="space-y-3">
                  <NavLinks onClick={() => setIsOpen(false)} isMobile={true} />
                </div>

                {/* Mobile Social Links */}
                <div className="pt-6 border-t border-gray-700/30">
                  <div className="flex justify-center gap-4">
                    {quickActions.map((action) => (
                      <motion.a
                        key={action.label}
                        href={action.href}
                        target={action.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel={action.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        className={`p-4 rounded-2xl text-gray-400 ${action.color} transition-all duration-300 bg-gray-800/30 border border-gray-700/30`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                      >
                        <action.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Mobile Status */}
                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl border border-emerald-400/20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm text-emerald-300 font-medium">Available for opportunities</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced CSS for professional styling */}
      <style>{`
        @media (max-width: 1024px) {
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

        /* Professional backdrop effects */
        nav::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(17, 24, 39, 0.95) 100%);
          z-index: -1;
        }

        /* Enhanced scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.6);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}</style>
    </>
  );
};

export default Navbar;