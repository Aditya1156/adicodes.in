import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons/SocialIcons';
import { trackEvent } from '../lib/analytics';
import { fadeInUp, staggerContainer, iconFloat, buttonHover, buttonTap } from '../lib/animations';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: SOCIAL_LINKS.github,
      icon: GithubIcon,
      label: 'GitHub',
      color: 'hover:text-white',
      event: 'Click: Social (GitHub)',
    },
    {
      href: SOCIAL_LINKS.linkedin,
      icon: LinkedinIcon,
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      event: 'Click: Social (LinkedIn)',
    },
    {
      href: SOCIAL_LINKS.email,
      icon: MailIcon,
      label: 'Email',
      color: 'hover:text-indigo-600 dark:hover:text-indigo-400',
      event: 'Click: Social (Email)',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '/', event: 'Click: Footer Link (Home)' },
    { name: 'About', href: '/about', event: 'Click: Footer Link (About)' },
    { name: 'Projects', href: '/projects', event: 'Click: Footer Link (Projects)' },
    { name: 'Blog', href: '/blog', event: 'Click: Footer Link (Blog)' },
    { name: 'Contact', href: '/contact', event: 'Click: Footer Link (Contact)' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200/50 dark:border-gray-700/50 mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Aditya Kumar
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Full-stack developer passionate about creating innovative solutions and beautiful user experiences. 
              Specializing in modern web technologies and scalable applications.
            </motion.p>
            
            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              variants={fadeInUp}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={`relative group p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-500 ${social.color} transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20`}
                  onClick={() => trackEvent(social.event, { location: 'footer' })}
                  whileHover={{
                    ...buttonHover,
                    y: -2,
                  }}
                  whileTap={buttonTap}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    animate={iconFloat}
                    transition={{ delay: index * 0.2, ...iconFloat.transition }}
                  >
                    <social.icon className="h-5 w-5 relative z-10" />
                  </motion.div>
                  
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-sm flex items-center group"
                    onClick={() => trackEvent(link.event, { location: 'footer' })}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="w-0 h-0.5 bg-indigo-600 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"
                    />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center text-gray-600 dark:text-gray-300 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" />
                Available for opportunities
              </motion.div>
              <motion.div 
                className="text-gray-600 dark:text-gray-300 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Response time: Usually within 24hrs
              </motion.div>
              <motion.div 
                className="text-gray-600 dark:text-gray-300 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Let's build something amazing together!
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Enhanced with better readability */}
        <motion.div
          className="border-t border-gray-200/50 dark:border-gray-700/50 py-6 bg-gray-50/95 dark:bg-gray-900/95"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div 
              className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600 dark:text-gray-300"
              variants={fadeInUp}
            >
              <span>&copy; {currentYear} Aditya Kumar. All rights reserved.</span>
              <span className="hidden md:block">|</span>
              <span>Built with ❤️राधे राधे </span>
            </motion.div>

            {/* Version/Last Updated */}
            <motion.div 
              className="text-xs text-gray-500 dark:text-gray-400"
              variants={fadeInUp}
            >
              Last updated: {new Date().toLocaleDateString()}
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
