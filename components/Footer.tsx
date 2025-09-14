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

  return (
    <motion.footer
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 mt-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Social Links */}
          <motion.div 
            className="flex space-x-6"
            variants={fadeInUp}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className={`relative group p-3 rounded-full bg-gray-100/50 dark:bg-gray-800/50 text-gray-500 ${social.color} transition-all duration-300`}
                onClick={() => trackEvent(social.event, { location: 'footer' })}
                whileHover={{
                  ...buttonHover,
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
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
                  <social.icon className="h-6 w-6 relative z-10" />
                </motion.div>
                
                {/* Hover effect background */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1 rounded-lg opacity-0 pointer-events-none"
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-100" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            className="text-center sm:text-right"
            variants={fadeInUp}
          >
            <motion.p 
              className="text-sm text-gray-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Built with ❤️ using React & TypeScript
            </motion.p>
            <motion.p 
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              &copy; {new Date().getFullYear()} Aditya Kumar. All Rights Reserved.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-6 pt-6 border-t border-gray-200/30 dark:border-gray-700/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="flex justify-center space-x-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                variants={fadeInUp}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
