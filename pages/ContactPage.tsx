import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons/SocialIcons';
import { SendIcon } from '../components/icons/UIIcons';
import { trackEvent } from '../lib/analytics';
import BackgroundWrapper from '../components/BackgroundWrapper';
import MetaTags from '../components/MetaTags';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  scaleIn
} from '../lib/animations';

// Random success messages with emojis
const successMessages: string[] = [
  "Message sent successfully! 🚀 I'll get back to you soon! ✨",
  "Your message is on its way! 💌 Thanks for reaching out! 😊",
  "Successfully sent! 🎉 Looking forward to connecting with you! 💫",
  "Message delivered! ⚡ I appreciate you taking the time to write! 🌟",
  "Sent with love! 💖 Your message made my day! 🌈",
  "Message received! 📨 I'll respond as quickly as possible! 🏃‍♂️💨",
  "Successfully submitted! ✅ Thank you for your interest! 🙏",
  "Your message is flying to my inbox! 🕊️ Talk soon! 💬",
  "Message sent like a rocket! 🚀 Thanks for connecting! 🤝",
  "Delivered successfully! 📬 Your message is precious to me! 💎"
];

const ideaMessages: string[] = [
  "Amazing idea! 💡 Can't wait to explore this topic! ✨",
  "Your suggestion is brilliant! 🌟 Thanks for the inspiration! 🙏",
  "What a fantastic idea! 🚀 This will make a great post! 📝",
  "Love this suggestion! 💖 Thanks for helping me create better content! 🎨",
  "Brilliant thinking! 🧠 This idea is going straight to my list! 📋"
];

const getRandomSuccessMessage = (): string => {
  const index = Math.floor(Math.random() * successMessages.length);
  return successMessages[index]!;
};

const getRandomIdeaMessage = (): string => {
  const index = Math.floor(Math.random() * ideaMessages.length);
  return ideaMessages[index]!;
};

const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactStatus, setContactStatus] = useState({ message: '', type: '' });
  const [ideaStatus, setIdeaStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formControls = useAnimation();
  const myEmail = SOCIAL_LINKS.email.replace('mailto:', '');

  const tabs = [
    { id: 'contact', label: 'Get in Touch', icon: '💬', description: 'Send me a message' },
    { id: 'idea', label: 'Blog Ideas', icon: '💡', description: 'Suggest a topic' },
    { id: 'connect', label: 'Quick Connect', icon: '🔗', description: 'Social links' }
  ];

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subject = encodeURIComponent(`Message from ${name} via adicodes.in`);
      const bodyContent = `Name: ${name}\r\nEmail: ${email}\r\n\r\nMessage:\r\n${message}`;
      const body = encodeURIComponent(bodyContent);
      
      window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

      // Use random success message
      setContactStatus({ message: getRandomSuccessMessage(), type: 'success' });
      (e.target as HTMLFormElement).reset();
      setFocusedField(null);
      setTimeout(() => setContactStatus({ message: '', type: '' }), 6000);
    } else {
      trackEvent('Submit: Contact Form', { status: 'fail' });
      setContactStatus({ message: 'Please fill out all fields! 🤔', type: 'error' });
      setTimeout(() => setContactStatus({ message: '', type: '' }), 4000);
    }
    
    setIsSubmitting(false);
  };

  const handleIdeaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('idea-name') as string;
    const email = formData.get('idea-email') as string;
    const idea = formData.get('idea-message') as string;

    if (name && email && idea) {
        trackEvent('Submit: Blog Idea', { status: 'success' });
        
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const subject = encodeURIComponent(`Blog Post Idea from ${name}`);
        const bodyContent = `Name: ${name}\r\nEmail: ${email}\r\n\r\nIdea:\r\n${idea}`;
        const body = encodeURIComponent(bodyContent);
        
        window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

        setIdeaStatus({ message: getRandomIdeaMessage(), type: 'success' });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIdeaStatus({ message: '', type: '' }), 6000);
    } else {
        trackEvent('Submit: Blog Idea', { status: 'fail' });
        setIdeaStatus({ message: 'Please fill out all fields! 📝', type: 'error' });
        setTimeout(() => setIdeaStatus({ message: '', type: '' }), 4000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <MetaTags
        title="Contact | Aditya Kumar"
        description="Get in touch with Aditya Kumar. Whether you have a question, a project idea, or just want to connect, I'd love to hear from you."
        keywords="Contact Aditya Kumar, hire web developer, email, LinkedIn, GitHub"
      />
      <BackgroundWrapper>
        <div className="max-w-6xl mx-auto py-16 px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-slate-600 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Let's Connect! 🚀
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Ready to bring your ideas to life? Whether you have a project in mind, want to collaborate, or just say hello - I'm here for it all! ✨
            </motion.p>
          </motion.div>

          {/* Modern Tab Navigation */}
          <motion.div
            className="mb-8"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 backdrop-blur-lg border-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-xl shadow-indigo-500/30'
                      : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90'
                  }`}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tab.icon}</span>
                    <div className="text-left">
                      <div className="font-bold">{tab.label}</div>
                      <div className="text-xs opacity-80">{tab.description}</div>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 hover:shadow-blue-500/20 hover:shadow-3xl transition-all duration-300"
            >
              {/* Contact Form Tab */}
              {activeTab === 'contact' && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="text-center mb-8" variants={fadeInUp}>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Send me a message 💬
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      I'd love to hear about your project or just chat about web development!
                    </p>
                  </motion.div>

                  <motion.form 
                    onSubmit={handleContactSubmit} 
                    className="max-w-2xl mx-auto space-y-6"
                    variants={staggerContainer}
                    animate={formControls}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <motion.div variants={staggerItem}>
                        <motion.label 
                          htmlFor="name" 
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                          animate={{ 
                            color: focusedField === 'name' ? '#6366f1' : undefined,
                            scale: focusedField === 'name' ? 1.02 : 1
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          Your Name ✨
                        </motion.label>
                        <motion.input 
                          type="text" 
                          name="name" 
                          id="name" 
                          required 
                          placeholder="What should I call you?"
                          className="w-full px-4 py-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-blue-500/20 focus:shadow-xl transition-all duration-300 text-white placeholder-gray-400" 
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ 
                            scale: 1.02,
                            boxShadow: "0 8px 30px rgba(59, 130, 246, 0.25)"
                          }}
                          disabled={isSubmitting}
                        />
                      </motion.div>

                      {/* Email Field */}
                      <motion.div variants={staggerItem}>
                        <motion.label 
                          htmlFor="email" 
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                          animate={{ 
                            color: focusedField === 'email' ? '#6366f1' : undefined,
                            scale: focusedField === 'email' ? 1.02 : 1
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          Email Address 📧
                        </motion.label>
                        <motion.input 
                          type="email" 
                          name="email" 
                          id="email" 
                          required 
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-blue-500/20 focus:shadow-xl transition-all duration-300 text-white placeholder-gray-400" 
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ 
                            scale: 1.02,
                            boxShadow: "0 8px 30px rgba(59, 130, 246, 0.25)"
                          }}
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </div>

                    {/* Message Field */}
                    <motion.div variants={staggerItem}>
                      <motion.label 
                        htmlFor="message" 
                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                        animate={{ 
                          color: focusedField === 'message' ? '#6366f1' : undefined,
                          scale: focusedField === 'message' ? 1.02 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        Your Message 💭
                      </motion.label>
                      <motion.textarea 
                        name="message" 
                        id="message" 
                        rows={6} 
                        required 
                        placeholder="Tell me about your project, ask a question, or just say hello! I'm excited to hear from you..."
                        className="w-full px-4 py-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-blue-500/20 focus:shadow-xl transition-all duration-300 resize-none text-white placeholder-gray-400" 
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        whileFocus={{ 
                          scale: 1.01,
                          boxShadow: "0 8px 30px rgba(59, 130, 246, 0.25)"
                        }}
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={staggerItem} className="text-center">
                      <motion.button
                        type="submit"
                        className="relative overflow-hidden px-8 py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                        whileHover={!isSubmitting ? { 
                          scale: 1.05,
                          boxShadow: "0 15px 40px rgba(99, 102, 241, 0.4)",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        disabled={isSubmitting}
                      >
                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        {/* Button content */}
                        <motion.span 
                          className="relative z-10 flex items-center justify-center gap-3"
                          animate={isSubmitting ? { 
                            scale: [1, 1.05, 1],
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
                              Sending Magic...
                            </>
                          ) : (
                            <>
                              <SendIcon className="w-5 h-5" />
                              Send Message 🚀
                            </>
                          )}
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                  
                  {/* Enhanced Status Messages */}
                  <AnimatePresence>
                    {contactStatus.message && (
                      <motion.div
                        className={`mt-8 mx-auto max-w-2xl p-6 rounded-2xl border-2 text-center ${
                          contactStatus.type === 'success' 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300' 
                            : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                        }`}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.8 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.div
                          animate={contactStatus.type === 'success' ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, 1, -1, 0]
                          } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <p className="text-lg font-bold">
                            {contactStatus.message}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Blog Idea Tab */}
              {activeTab === 'idea' && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="text-center mb-8" variants={fadeInUp}>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Suggest a Blog Topic 💡
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Got an idea for something I should write about? I'd love to hear your suggestions!
                    </p>
                  </motion.div>

                  <motion.form 
                    onSubmit={handleIdeaSubmit} 
                    className="max-w-2xl mx-auto space-y-6"
                    variants={staggerContainer}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <motion.div variants={staggerItem}>
                        <label htmlFor="idea-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Your Name ✨
                        </label>
                        <input 
                          type="text" 
                          name="idea-name" 
                          id="idea-name" 
                          required 
                          placeholder="What should I call you?"
                          className="w-full px-4 py-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                          disabled={isSubmitting}
                        />
                      </motion.div>

                      {/* Email Field */}
                      <motion.div variants={staggerItem}>
                        <label htmlFor="idea-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email Address 📧
                        </label>
                        <input 
                          type="email" 
                          name="idea-email" 
                          id="idea-email" 
                          required 
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </div>

                    {/* Idea Field */}
                    <motion.div variants={staggerItem}>
                      <label htmlFor="idea-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Blog Idea 🎯
                      </label>
                      <textarea 
                        name="idea-message" 
                        id="idea-message" 
                        rows={6} 
                        required 
                        placeholder="e.g., A tutorial on Framer Motion with React Router, or tips for building scalable web applications..."
                        className="w-full px-4 py-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-gray-400"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={staggerItem} className="text-center">
                      <motion.button
                        type="submit"
                        className="relative overflow-hidden px-8 py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                        whileHover={!isSubmitting ? { 
                          scale: 1.05,
                          boxShadow: "0 15px 40px rgba(251, 146, 60, 0.4)"
                        } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        disabled={isSubmitting}
                      >
                        <motion.span 
                          className="relative z-10 flex items-center justify-center gap-3"
                          animate={isSubmitting ? { 
                            scale: [1, 1.05, 1],
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
                              Submitting...
                            </>
                          ) : (
                            <>
                              💡 Submit Idea
                            </>
                          )}
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </motion.form>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {ideaStatus.message && (
                      <motion.div
                        className={`mt-8 mx-auto max-w-2xl p-6 rounded-2xl border-2 text-center ${
                          ideaStatus.type === 'success' 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300' 
                            : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                        }`}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.8 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.div
                          animate={ideaStatus.type === 'success' ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, 1, -1, 0]
                          } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <p className="text-lg font-bold">
                            {ideaStatus.message}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Quick Connect Tab */}
              {activeTab === 'connect' && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="text-center mb-12" variants={fadeInUp}>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Quick Connect 🔗
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Find me on these platforms or shoot me a quick email!
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {/* Email */}
                    <motion.a
                      href={SOCIAL_LINKS.email}
                      className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
                      onClick={() => trackEvent('Click: Social (Email)', { location: 'contact_page' })}
                      whileHover={{ 
                        scale: 1.03,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.97 }}
                      variants={staggerItem}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="relative text-center">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <MailIcon className="h-8 w-8" />
                        </motion.div>
                        <h3 className="font-bold text-xl text-white mb-2">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">adityaissc7@gmail.com</p>
                        <p className="text-indigo-400 text-sm font-semibold">Send me a message 📧</p>
                      </div>
                    </motion.a>

                    {/* LinkedIn */}
                    <motion.a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
                      onClick={() => trackEvent('Click: Social (LinkedIn)', { location: 'contact_page' })}
                      whileHover={{ 
                        scale: 1.03,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.97 }}
                      variants={staggerItem}
                    >
                      <div className="relative text-center">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <LinkedinIcon className="h-8 w-8" />
                        </motion.div>
                        <h3 className="font-bold text-xl text-white mb-2">LinkedIn</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Professional Network</p>
                        <p className="text-blue-400 text-sm font-semibold">Let's connect! 🤝</p>
                      </div>
                    </motion.a>

                    {/* GitHub */}
                    <motion.a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-2 border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
                      onClick={() => trackEvent('Click: Social (GitHub)', { location: 'contact_page' })}
                      whileHover={{ 
                        scale: 1.03,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.97 }}
                      variants={staggerItem}
                    >
                      <div className="relative text-center">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <GithubIcon className="h-8 w-8" />
                        </motion.div>
                        <h3 className="font-bold text-xl text-white mb-2">GitHub</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Check out my code</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Follow my journey 👨‍💻</p>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </BackgroundWrapper>
    </>
  );
};

export default ContactPage;
