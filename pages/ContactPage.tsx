import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons/SocialIcons';
import { trackEvent } from '../lib/analytics';
import BackgroundWrapper from '../components/BackgroundWrapper';
import MetaTags from '../components/MetaTags';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  scaleHover 
} from '../lib/animations';

const ContactPage: React.FC = () => {
  const [contactStatus, setContactStatus] = useState({ message: '', type: '' });
  const [ideaStatus, setIdeaStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formControls = useAnimation();
  const myEmail = SOCIAL_LINKS.email.replace('mailto:', '');

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Animate form submission
    formControls.start({
      scale: [1, 0.98, 1],
      transition: { duration: 0.3 }
    });

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (name && email && message) {
      trackEvent('Submit: Contact Form', { status: 'success' });
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subject = encodeURIComponent(`Message from ${name} via adicodes.in`);
      const bodyContent = `Name: ${name}\r\nEmail: ${email}\r\n\r\nMessage:\r\n${message}`;
      const body = encodeURIComponent(bodyContent);
      
      window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

      setContactStatus({ message: 'Your email client is opening to send the message.', type: 'success' });
      (e.target as HTMLFormElement).reset();
      setFocusedField(null);
      setTimeout(() => setContactStatus({ message: '', type: '' }), 5000);
    } else {
      trackEvent('Submit: Contact Form', { status: 'fail' });
      setContactStatus({ message: 'Please fill out all fields.', type: 'error' });
      setTimeout(() => setContactStatus({ message: '', type: '' }), 5000);
    }
    
    setIsSubmitting(false);
  };

  const handleIdeaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('idea-name') as string;
    const email = formData.get('idea-email') as string;
    const idea = formData.get('idea-message') as string;

    if (name && email && idea) {
        trackEvent('Submit: Blog Idea', { status: 'success' });
        
        const subject = encodeURIComponent(`Blog Post Idea from ${name}`);
        const bodyContent = `Name: ${name}\r\nEmail: ${email}\r\n\r\nIdea:\r\n${idea}`;
        const body = encodeURIComponent(bodyContent);
        
        window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

        setIdeaStatus({ message: 'Your email client is opening to send your suggestion!', type: 'success' });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIdeaStatus({ message: '', type: '' }), 5000);
    } else {
        trackEvent('Submit: Blog Idea', { status: 'fail' });
        setIdeaStatus({ message: 'Please fill out all fields.', type: 'error' });
        setTimeout(() => setIdeaStatus({ message: '', type: '' }), 5000);
    }
  };

  return (
    <>
      <MetaTags
        title="Contact | Aditya Kumar"
        description="Get in touch with Aditya Kumar. Whether you have a question, a project idea, or just want to connect, I'd love to hear from you."
        keywords="Contact Aditya Kumar, hire web developer, email, LinkedIn, GitHub"
      />
      <BackgroundWrapper>
        <div className="max-w-4xl mx-auto py-12 relative z-10">
        <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight">Get In Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
          Have a question or want to work together? Feel free to reach out.
        </p>
        <div className="flex flex-col gap-16">
          {/* Enhanced Contact Form & Links Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
              <motion.div 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                variants={staggerItem}
                animate={formControls}
              >
              <motion.h2 
                className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                variants={fadeInUp}
              >
                Let's Connect
              </motion.h2>
              
              <motion.form 
                onSubmit={handleContactSubmit} 
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                  {/* Name Field */}
                  <motion.div variants={staggerItem}>
                      <motion.label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        animate={{ 
                          color: focusedField === 'name' ? '#6366f1' : undefined,
                          scale: focusedField === 'name' ? 1.05 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        Name
                      </motion.label>
                      <motion.input 
                        type="text" 
                        name="name" 
                        id="name" 
                        required 
                        className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" 
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                        }}
                        disabled={isSubmitting}
                      />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={staggerItem}>
                      <motion.label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        animate={{ 
                          color: focusedField === 'email' ? '#6366f1' : undefined,
                          scale: focusedField === 'email' ? 1.05 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        Email
                      </motion.label>
                      <motion.input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required 
                        className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" 
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                        }}
                        disabled={isSubmitting}
                      />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div variants={staggerItem}>
                      <motion.label 
                        htmlFor="message" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        animate={{ 
                          color: focusedField === 'message' ? '#6366f1' : undefined,
                          scale: focusedField === 'message' ? 1.05 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        Message
                      </motion.label>
                      <motion.textarea 
                        name="message" 
                        id="message" 
                        rows={4} 
                        required 
                        className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none" 
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                        }}
                        disabled={isSubmitting}
                      />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={staggerItem}>
                      <motion.button
                          type="submit"
                          className="w-full relative overflow-hidden px-6 py-4 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={!isSubmitting ? { 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)"
                          } : {}}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                          disabled={isSubmitting}
                      >
                          {/* Button background animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Button content */}
                          <motion.span 
                            className="relative z-10 flex items-center justify-center gap-2"
                            animate={isSubmitting ? { 
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{ duration: 0.6, repeat: isSubmitting ? Infinity : 0 }}
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Sending...
                              </>
                            ) : (
                              "Send Message"
                            )}
                          </motion.span>
                      </motion.button>
                  </motion.div>
              </motion.form>
              
              {/* Enhanced Status Messages */}
              <AnimatePresence>
                {contactStatus.message && (
                  <motion.div
                    className={`mt-6 p-4 rounded-lg border text-center ${
                      contactStatus.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' 
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                    }`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.p
                      className="text-sm font-medium"
                      animate={contactStatus.type === 'success' ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {contactStatus.message}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              </motion.div>
              <motion.div 
                className="flex flex-col justify-center space-y-6"
                variants={staggerItem}
              >
              <motion.h3 
                className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                variants={fadeInUp}
              >
                Quick Connect
              </motion.h3>
              
              <motion.a
                  href={SOCIAL_LINKS.email}
                  className="group flex items-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-lg"
                  onClick={() => trackEvent('Click: Social (Email)', { location: 'contact_page' })}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
              >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MailIcon className="h-6 w-6" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">adityaissc7@gmail.com</p>
                  </div>
                  <motion.div
                    className="text-gray-400 group-hover:text-indigo-500 transition-colors"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
              </motion.a>
              
              <motion.a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-lg"
                  onClick={() => trackEvent('Click: Social (LinkedIn)', { location: 'contact_page' })}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
              >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg group-hover:text-blue-600 transition-colors">LinkedIn</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">in/aditya-kumar-165911339</p>
                  </div>
                  <motion.div
                    className="text-gray-400 group-hover:text-blue-500 transition-colors"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
              </motion.a>
              
              <motion.a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-lg"
                  onClick={() => trackEvent('Click: Social (GitHub)', { location: 'contact_page' })}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(107, 114, 128, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
              >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-full flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GithubIcon className="h-6 w-6" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">GitHub</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Aditya1156</p>
                  </div>
                  <motion.div
                    className="text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
              </motion.a>
              </motion.div>
          </motion.div>
          {/* Blog Post Idea Form Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-2 text-center">Suggest a Blog Post</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Got an idea for a topic I should write about? Let me know!</p>
              <form onSubmit={handleIdeaSubmit} className="space-y-6 max-w-lg mx-auto">
                  <div>
                      <label htmlFor="idea-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                      <input type="text" name="idea-name" id="idea-name" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="idea-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                      <input type="email" name="idea-email" id="idea-email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="idea-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Idea</label>
                      <textarea name="idea-message" id="idea-message" rows={3} required placeholder="e.g., A tutorial on Framer Motion with React Router..." className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                  </div>
                  <div>
                      <motion.button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                      >
                          Submit Idea
                      </motion.button>
                  </div>
              </form>
              {ideaStatus.message && (
                  <p className={`mt-4 text-center text-sm ${ideaStatus.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {ideaStatus.message}
                  </p>
              )}
          </div>
        </div>
        
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

export default ContactPage;