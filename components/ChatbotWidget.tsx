import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons/UIIcons';
import { startLocalChat, generateLocalResponse } from '../lib/localAI';
import { trackEvent } from '../lib/analytics';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  scaleHover 
} from '../lib/animations';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface LocalChatSession {
  sendMessage: (message: string) => Promise<{ response: { text: () => string } }>;
}

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [chat, setChat] = useState<LocalChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputControls = useAnimation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    useEffect(() => {
        // Initialize local chat immediately
        const chatSession = startLocalChat();
        setChat(chatSession);
        
        // Simulate typing for welcome message
        setTimeout(() => {
            setMessages([{ role: 'model', text: "Hi! I'm Aditya's AI assistant. I know everything about his skills, projects, and experience. Ask me anything!" }]);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);
        setIsLoading(true);
        trackEvent('Send: Chat Message');

        // Animate input field
        inputControls.start({
            scale: [1, 0.98, 1],
            transition: { duration: 0.2 }
        });

        try {
            // Simulate thinking time for natural feel
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
            
            // Generate local response
            const responseText = generateLocalResponse(currentInput);
            setIsTyping(false);
            
            // Simulate typing the response
            const modelMessage: Message = { role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Local AI Error:", error);
            setIsTyping(false);
            const errorMessage: Message = { role: 'model', text: "Sorry, I encountered an error. Please try asking something else about Aditya!" };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4
            }
        }
    };

    const typingVariants = {
        animate: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    };

    return (
        <motion.div
            className="fixed bottom-24 right-4 sm:bottom-20 sm:right-5 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[500px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-40"
            initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, rotateX: 15 }}
            transition={{ 
                duration: 0.4, 
                ease: [0.6, 0.05, 0.01, 0.99],
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            aria-modal="true"
            role="dialog"
        >
            {/* Enhanced Header with gradient */}
            <motion.header 
                className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="flex items-center gap-3">
                    <motion.div 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg"
                        animate={{ 
                            boxShadow: [
                                "0 4px 15px rgba(99, 102, 241, 0.3)",
                                "0 4px 20px rgba(168, 85, 247, 0.4)",
                                "0 4px 15px rgba(99, 102, 241, 0.3)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        AI
                    </motion.div>
                    <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Assistant</h2>
                        <motion.p 
                            className="text-xs text-gray-500 dark:text-gray-400"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {isLoading ? "Thinking..." : isTyping ? "Typing..." : "Online"}
                        </motion.p>
                    </div>
                </motion.div>
                <motion.button 
                    onClick={onClose} 
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group" 
                    aria-label="Close chat"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <CloseIcon className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                </motion.button>
            </motion.header>

            {/* Enhanced Messages with stagger animation */}
            <motion.div 
                className="flex-grow p-4 overflow-y-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col gap-4">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div 
                                key={index} 
                                className={`flex gap-2.5 items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                layout
                            >
                               {msg.role === 'model' && (
                                   <motion.div 
                                       className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg"
                                       whileHover={{ scale: 1.1 }}
                                       animate={{ rotate: [0, 5, -5, 0] }}
                                       transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                   >
                                       AI
                                   </motion.div>
                               )}
                               <motion.div 
                                   className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                                       msg.role === 'user' 
                                           ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none' 
                                           : 'bg-gray-100 dark:bg-gray-700 rounded-bl-none border border-gray-200/50 dark:border-gray-600/50'
                                   }`}
                                   whileHover={{ scale: 1.02 }}
                                   initial={{ scale: 0.8, opacity: 0 }}
                                   animate={{ scale: 1, opacity: 1 }}
                                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                               >
                                   <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                               </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                     {/* Enhanced typing indicator */}
                     <AnimatePresence>
                         {(isLoading || isTyping) && (
                            <motion.div 
                                className="flex gap-2.5 items-end justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                 <motion.div 
                                     className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg"
                                     variants={typingVariants}
                                     animate="animate"
                                 >
                                     AI
                                 </motion.div>
                                 <motion.div 
                                     className="max-w-[85%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-none flex items-center gap-1.5 border border-gray-200/50 dark:border-gray-600/50"
                                     animate={{ scale: [1, 1.02, 1] }}
                                     transition={{ duration: 1, repeat: Infinity }}
                                 >
                                    <motion.span 
                                        className="w-2 h-2 bg-indigo-500 rounded-full"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.span 
                                        className="w-2 h-2 bg-indigo-500 rounded-full"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    />
                                    <motion.span 
                                        className="w-2 h-2 bg-indigo-500 rounded-full"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                    />
                                 </motion.div>
                            </motion.div>
                         )}
                     </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </motion.div>

            {/* Enhanced Input with better animations */}
            <motion.form 
                onSubmit={handleSend} 
                className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
            >
                <div className="relative">
                    <motion.input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Aditya's skills, projects, experience..."
                        className="w-full pl-4 pr-12 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                        disabled={isLoading}
                        animate={inputControls}
                        whileFocus={{ 
                            scale: 1.02,
                            boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                        }}
                    />
                    <motion.button 
                        type="submit" 
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg" 
                        disabled={!input.trim() || isLoading} 
                        aria-label="Send message"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ 
                            boxShadow: input.trim() ? [
                                "0 4px 15px rgba(99, 102, 241, 0.3)",
                                "0 4px 20px rgba(168, 85, 247, 0.4)",
                                "0 4px 15px rgba(99, 102, 241, 0.3)"
                            ] : "0 2px 4px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            animate={{ rotate: input.trim() ? [0, 15, -15, 0] : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SendIcon className="w-5 h-5" />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
};


const ChatbotWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasNotification, setHasNotification] = useState(true);

    const toggleChat = () => {
        if (!isOpen) {
            trackEvent('Open: Chatbot');
            setHasNotification(false);
        }
        setIsOpen(prev => !prev);
    };

    // Show notification dot for first 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasNotification(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <motion.div className="fixed bottom-4 right-4 z-50">
                {/* Floating button with enhanced animations */}
                <motion.button
                    onClick={toggleChat}
                    className="relative w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center overflow-hidden"
                    whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                        boxShadow: [
                            "0 10px 25px rgba(99, 102, 241, 0.3)",
                            "0 15px 35px rgba(168, 85, 247, 0.4)",
                            "0 10px 25px rgba(99, 102, 241, 0.3)"
                        ]
                    }}
                    transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity },
                        scale: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
                >
                    {/* Gradient background effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    
                    {/* Notification dot */}
                    <AnimatePresence>
                        {hasNotification && !isOpen && (
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: 1
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ 
                                    scale: { duration: 1, repeat: Infinity },
                                    opacity: { duration: 0.3 }
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Icon with smooth transitions */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isOpen ? 'close' : 'chat'}
                            className="relative z-10"
                            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                            transition={{ 
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            {isOpen ? (
                                <CloseIcon className="w-8 h-8" />
                            ) : (
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                >
                                    <ChatBubbleIcon className="w-8 h-8" />
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Ripple effect on click */}
                    <motion.div
                        className="absolute inset-0 bg-white rounded-full opacity-0"
                        whileTap={{ 
                            scale: [1, 2], 
                            opacity: [0, 0.3, 0],
                            transition: { duration: 0.4 }
                        }}
                    />
                </motion.button>

                {/* Floating help text */}
                <AnimatePresence>
                    {!isOpen && hasNotification && (
                        <motion.div
                            className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ delay: 2, duration: 0.3 }}
                        >
                            <div className="relative">
                                Ask me about Aditya! 🤖
                                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Enhanced chat window with backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop blur */}
                        <motion.div
                            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <Chatbot onClose={() => setIsOpen(false)} />
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;
