import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { optimizedFadeIn, optimizedSlideIn } from '../lib/optimizedAnimations';
import { MailIcon } from './icons/SocialIcons';
import { CheckCircleIcon, SendIcon } from './icons/UIIcons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const EnhancedContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof ValidationErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);
      
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 border-2 rounded-xl bg-gray-800 text-white
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    ${errors[fieldName as keyof ValidationErrors] 
      ? 'border-red-300 dark:border-red-600' 
      : focusedField === fieldName 
        ? 'border-indigo-300 dark:border-indigo-600' 
        : 'border-gray-600'
    }
    ${focusedField === fieldName ? 'transform scale-105' : ''}
  `;

  const labelClasses = (fieldName: string) => `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${errors[fieldName as keyof ValidationErrors] 
      ? 'text-red-600 dark:text-red-400' 
      : focusedField === fieldName 
        ? 'text-indigo-400' 
        : 'text-gray-700 dark:text-gray-300'
    }
  `;

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            {...(shouldReduceMotion ? {} : optimizedSlideIn)}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center">
                    <MailIcon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a 
                      href="mailto:adityaissc7@gmail.com"
                      className="text-indigo-400 hover:underline"
                    >
                      adityaissc7@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-xl">💻</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Currently</p>
                    <p className="text-gray-600 dark:text-gray-400">Seeking internship opportunities</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400 text-xl">🚀</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Specialization</p>
                    <p className="text-gray-600 dark:text-gray-400">Full-stack development & AI integration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-2xl text-white"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            >
              <h4 className="font-bold text-lg mb-2">Quick Response</h4>
              <p className="text-indigo-100">
                I typically respond to messages within 24 hours. Looking forward to connecting with you!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            {...(shouldReduceMotion ? {} : optimizedSlideIn)}
            transition={{ delay: 0.4 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={labelClasses('name')}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={handleBlur}
                  className={inputClasses('name')}
                  placeholder="Your full name"
                  disabled={status.type === 'loading'}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 dark:text-red-400 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className={labelClasses('email')}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={handleBlur}
                  className={inputClasses('email')}
                  placeholder="your.email@example.com"
                  disabled={status.type === 'loading'}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 dark:text-red-400 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className={labelClasses('subject')}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={handleBlur}
                  className={inputClasses('subject')}
                  placeholder="What's this about?"
                  disabled={status.type === 'loading'}
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 dark:text-red-400 text-sm mt-1"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className={labelClasses('message')}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={handleBlur}
                  rows={5}
                  className={inputClasses('message') + ' resize-none'}
                  placeholder="Tell me about your project or just say hello!"
                  disabled={status.type === 'loading'}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 dark:text-red-400 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                  status.type === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
                whileHover={shouldReduceMotion || status.type === 'loading' ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion || status.type === 'loading' ? {} : { scale: 0.98 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  {status.type === 'loading' ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {status.type !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-4 rounded-lg flex items-center space-x-3 ${
                      status.type === 'success'
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                        : status.type === 'error'
                        ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {status.type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactForm;
