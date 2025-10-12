import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons/UIIcons';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons/SocialIcons';
import { SOCIAL_LINKS } from '../constants';
import { useMobileMenu } from '../hooks/useMobile';
import { 
  navSlideDown, 
  mobileMenuItemVariants
} from '../lib/animations';

const NavLinks: React.FC<{className?: string; onClick?: () => void; isMobile?: boolean}> = ({ 
  className, 
  onClick, 
  isMobile = false 
}) => {
  const baseClasses = isMobile 
    ? "w-full px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 relative overflow-hidden flex items-center gap-3 min-h-[56px]"
    : "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden";
  
  const hoverClasses = isMobile 
    ? "hover:bg-gray-800/50 active:bg-gray-700/50 active:scale-[0.98]" 
    : "hover:bg-white/5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20";
  
  const linkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${hoverClasses} ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-white border border-indigo-400/30 shadow-lg backdrop-blur-sm' 
        : 'text-gray-300 hover:text-white border border-transparent hover:border-gray-700/30'
    } ${className || ''}`;

  const links = [
    { to: '/', label: 'Home', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { to: '/about', label: 'About', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { to: '/projects', label: 'Projects', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )},
    { to: '/blog', label: 'Blog', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )},
    { to: '/resume', label: 'Resume', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { to: '/contact', label: 'Contact', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ];

  // Responsive hover effects based on screen size
  const getHoverEffect = () => {
    if (isMobile) {
      return { scale: 0.98 };
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
            scale: 0.96, 
            transition: { duration: 0.1 } 
          }}
        >
          <NavLink 
            to={link.to} 
            className={linkClasses}
            onClick={onClick}
          >
            {isMobile && (
              <span className="flex-shrink-0 opacity-70">
                {link.icon}
              </span>
            )}
            <span className="relative z-10 font-medium">{link.label}</span>
            {isMobile && (
              <svg className="w-5 h-5 ml-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
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
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isOpen, setIsOpen, closeMenu } = useMobileMenu();

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
                  {/* Profile Picture as Logo */}
                  <motion.div
                    className="w-12 h-12 relative cursor-pointer"
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: [0, -3, 3, 0],
                      transition: {
                        duration: 0.6,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <img
                      src="/images/aditya.jpg"
                      alt="Aditya Kumar"
                      className="w-full h-full object-cover rounded-full border-2 border-blue-400/60 shadow-lg ring-2 ring-blue-500/20"
                      style={{
                        background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)',
                        padding: '2px'
                      }}
                    />
                    
                    {/* Pulse Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0"
                      whileHover={{ 
                        opacity: 0.15, 
                        scale: 1.15,
                        transition: { duration: 0.6, ease: "easeOut" }
                      }}
                      style={{ filter: 'blur(8px)' }}
                    />
                  </motion.div>
                  
                  {/* Professional status indicator - removed duplicate */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-lg border-2 border-gray-900"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                
                <div className="flex flex-col">
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
                    FullStack Developer
                  </motion.span>
                </div>
              </NavLink>

              {/* Professional Badge - improved responsive spacing */}
              <motion.div
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full border border-emerald-400/20 backdrop-blur-sm ml-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium whitespace-nowrap">Available for hire</span>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation & Professional Tools */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {/* Main Navigation */}
              <motion.div 
                className="flex items-center space-x-1 xl:space-x-2"
                variants={navSlideDown}
                initial="hidden"
                animate="visible"
              >
                <NavLinks />
              </motion.div>

              {/* Professional Quick Actions */}
              <motion.div 
                className="flex items-center gap-2 xl:gap-3 pl-4 xl:pl-6 border-l border-gray-700/50"
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
                    className={`p-2 xl:p-2.5 rounded-xl text-gray-400 ${action.color} transition-all duration-300 border border-transparent hover:border-gray-600/30 backdrop-blur-sm`}
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
                    <action.icon className="w-4 h-4 xl:w-5 xl:h-5" />
                  </motion.a>
                ))}

                {/* Time Display */}
                <motion.div
                  className="px-3 py-1.5 xl:px-4 xl:py-2 bg-gray-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm"
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

            {/* Mobile Controls - Fixed responsive logic */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Mobile 3-Dot Menu Toggle */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 rounded-xl text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 backdrop-blur-sm min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'close' : 'dots'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    {isOpen ? (
                      <CloseIcon className="h-6 w-6" />
                    ) : (
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="19" r="2"/>
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Single notification indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full shadow-lg border-2 border-gray-900"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Better Organization */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-x-0 top-20 z-40 lg:hidden border-t border-gray-700/50 bg-gray-900/98 backdrop-blur-xl shadow-2xl"
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
                className="px-4 pt-6 pb-8 space-y-6 max-h-[85vh] overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {/* User Status Section */}
                <motion.div 
                  className="text-center py-4 border-b border-gray-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-12 relative">
                      <img
                        src="/images/aditya.jpg"
                        alt="Aditya Kumar"
                        className="w-full h-full object-cover rounded-full border-2 border-blue-400/60 ring-2 ring-blue-500/20"
                      />
                      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold text-base">Aditya Kumar</h3>
                      <p className="text-gray-400 text-sm">FullStack Developer</p>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full border border-emerald-400/20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm text-emerald-300 font-medium">Available for opportunities</span>
                  </div>
                </motion.div>

                {/* Navigation Section */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider px-4 pb-2">Navigation</h4>
                  <div className="space-y-1">
                    <NavLinks onClick={() => closeMenu()} isMobile={true} />
                  </div>
                </motion.div>

                {/* Quick Actions Section */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider px-4">Quick Actions</h4>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {quickActions.map((action, index) => (
                      <motion.a
                        key={action.label}
                        href={action.href}
                        target={action.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel={action.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-gray-400 ${action.color} transition-all duration-300 bg-gray-800/30 border border-gray-700/30 min-h-[80px] hover:scale-105 active:scale-95`}
                        onClick={() => closeMenu()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{action.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Additional Mobile Features */}
                <motion.div 
                  className="space-y-4 border-t border-gray-700/30 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider px-4">More</h4>
                  
                  <div className="space-y-2">
                    {/* Download Resume */}
                    <motion.button
                      onClick={() => {
                        // Add download resume functionality
                        const link = document.createElement('a');
                        link.href = '/resume.pdf';
                        link.download = 'Aditya_Kumar_Resume.pdf';
                        link.click();
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30"
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">Download Resume</span>
                    </motion.button>

                    {/* Theme Toggle */}
                    <motion.button
                      onClick={() => {
                        // Add theme toggle functionality
                        document.body.classList.toggle('dark');
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30"
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span className="font-medium">Toggle Theme</span>
                    </motion.button>

                    {/* Share Profile */}
                    <motion.button
                      onClick={async () => {
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: 'Aditya Kumar - FullStack Developer',
                              text: 'Check out my portfolio and projects',
                              url: window.location.href
                            });
                          } catch (error) {
                            console.log('Error sharing:', error);
                          }
                        } else {
                          // Fallback: copy to clipboard
                          navigator.clipboard.writeText(window.location.href);
                          // You could show a toast notification here
                        }
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30"
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="font-medium">Share Profile</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Current Time for Mobile */}
                <motion.div 
                  className="text-center pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/30">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <span className="text-sm text-gray-300 font-mono">
                      {currentTime.toLocaleTimeString('en-US', { 
                        hour12: true,
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced CSS for professional mobile optimization */}
      <style>{`
        /* Base responsive foundation */
        @media (max-width: 640px) {
          /* Small mobile devices */
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          nav .h-20 {
            height: 4.5rem;
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
        }

        /* Tablet and medium screens */
        @media (min-width: 641px) and (max-width: 1023px) {
          .hidden.sm\\:flex {
            display: flex;
          }
          
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        /* Large screens and desktop */
        @media (min-width: 1024px) {
          .hidden.lg\\:flex {
            display: flex;
          }
          
          .lg\\:hidden {
            display: none;
          }
          
          .container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1536px) {
          .container {
            max-width: 1280px;
          }
        }

        /* Mobile-first responsive design with proper constraints */
        @media (max-width: 1024px) {
          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: scale(1.01) !important;
          }
          
          /* Prevent layout shifts */
          nav {
            contain: layout style paint;
          }
        }
        
        /* Optimized for mobile touch with consistent sizing */
        @media (max-width: 768px) {
          /* Ensure minimum touch target size consistently */
          button, a, [role="button"] {
            min-height: 48px;
            min-width: 48px;
            touch-action: manipulation;
          }
          
          /* Improve tap responsiveness with proper highlight */
          .mobile-nav-item, button, a {
            -webkit-tap-highlight-color: rgba(79, 70, 229, 0.1);
            tap-highlight-color: rgba(79, 70, 229, 0.1);
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          
          /* Smooth scrolling for mobile menu with momentum */
          .mobile-menu-scroll {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            overscroll-behavior: contain;
          }
          
          /* Prevent zoom on input focus */
          input, textarea, select {
            font-size: 16px !important;
            transform: translateZ(0);
          }
          
          /* Fix viewport issues */
          .mobile-viewport {
            height: 100vh;
            height: 100svh;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Prevent layout shift on hover with GPU acceleration */
        nav {
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Enhanced touch device optimization */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-\\[1\\.02\\]:hover,
          .hover\\:-translate-y-0\\.5:hover {
            transform: none !important;
          }
          
          /* Enhanced touch feedback with proper timing */
          .touch-feedback:active {
            background-color: rgba(79, 70, 229, 0.12) !important;
            transform: scale(0.97) !important;
            transition: all 0.1s ease-out !important;
          }
          
          /* Remove hover states on touch devices */
          *:hover {
            background-color: inherit !important;
            color: inherit !important;
          }
        }

        /* Professional backdrop effects with proper layering */
        nav::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, 
            rgba(17, 24, 39, 0.85) 0%, 
            rgba(17, 24, 39, 0.95) 50%,
            rgba(17, 24, 39, 0.98) 100%
          );
          z-index: -1;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Enhanced mobile menu backdrop */
        .mobile-menu-backdrop {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Smooth animations optimized for performance */
        .mobile-menu-item {
          transform: translateX(-15px);
          opacity: 0;
          animation: slideInLeft 0.25s ease-out forwards;
          will-change: transform, opacity;
        }
        
        @keyframes slideInLeft {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Professional gradient text with fallback */
        .mobile-gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #34d399 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #60a5fa; /* fallback */
        }

        /* Enhanced scrollbar styling */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.8));
          border-radius: 2px;
          transition: background 0.2s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 1));
        }

        /* Mobile safe area handling */
        @media (max-width: 768px) {
          .mobile-safe-area {
            padding-top: max(env(safe-area-inset-top), 1rem);
            padding-bottom: max(env(safe-area-inset-bottom), 1rem);
            padding-left: max(env(safe-area-inset-left), 1rem);
            padding-right: max(env(safe-area-inset-right), 1rem);
          }
          
          /* Prevent overscroll issues */
          .overscroll-behavior-none {
            overscroll-behavior: none;
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Improved focus styles for accessibility */
        .focus-visible, *:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          nav {
            border-bottom: 2px solid currentColor;
            background: rgb(0, 0, 0) !important;
          }
          
          .mobile-menu-item, button, a {
            border: 1px solid currentColor !important;
            background: rgb(0, 0, 0) !important;
            color: rgb(255, 255, 255) !important;
          }
        }

        /* Dark mode optimizations */
        @media (prefers-color-scheme: dark) {
          .mobile-menu-backdrop {
            background: rgba(0, 0, 0, 0.6);
          }
          
          nav::before {
            background: linear-gradient(180deg, 
              rgba(0, 0, 0, 0.9) 0%, 
              rgba(17, 24, 39, 0.95) 100%
            );
          }
        }

        /* Performance optimizations */
        @media (max-width: 768px) {
          /* GPU acceleration for smooth animations */
          .mobile-menu-item, 
          nav, 
          .mobile-menu-container {
            transform: translateZ(0);
            will-change: transform;
            contain: layout style paint;
          }
          
          /* Optimize font rendering */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        }

        /* Professional loading states */
        .loading-shimmer {
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Error state styling */
        .error-state {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        /* Success state styling */
        .success-state {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
        }

        /* Fix for Safari iOS viewport height issues */
        @supports (-webkit-touch-callout: none) {
          .mobile-viewport {
            height: -webkit-fill-available;
          }
        }

        /* Orientation specific optimizations */
        @media (orientation: landscape) and (max-height: 500px) {
          .mobile-menu-container {
            max-height: 80vh;
            overflow-y: auto;
          }
          
          nav .h-20 {
            height: 3.5rem;
          }
        }

        /* Component conflict prevention - Added fixes */
        @media (max-width: 1023px) {
          /* Ensure mobile controls are always visible on smaller screens */
          .lg\\:hidden {
            display: flex !important;
          }
          
          /* Hide desktop navigation completely on smaller screens */
          .hidden.lg\\:flex {
            display: none !important;
          }
        }

        @media (min-width: 1024px) {
          /* Ensure desktop navigation is visible on large screens */
          .hidden.lg\\:flex {
            display: flex !important;
          }
          
          /* Hide mobile controls completely on large screens */
          .lg\\:hidden {
            display: none !important;
          }
        }

        /* Professional badge responsive behavior */
        @media (max-width: 767px) {
          .hidden.md\\:flex {
            display: none !important;
          }
        }

        @media (min-width: 768px) {
          .hidden.md\\:flex {
            display: flex !important;
          }
        }

        /* Mobile menu positioning fix */
        .mobile-menu-container {
          position: relative;
          width: 100%;
          z-index: 45;
        }

        /* Ensure proper stacking order */
        .navbar-container {
          position: relative;
          z-index: 50;
        }
        
        .navbar-desktop {
          z-index: 52;
        }
        
        .navbar-mobile {
          z-index: 51;
        }
        
        .navbar-menu {
          z-index: 49;
        }
      `}</style>
    </>
  );
};

export default Navbar;