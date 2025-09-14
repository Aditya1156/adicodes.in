import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { optimizedFadeIn, optimizedScaleIn } from '../lib/optimizedAnimations';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, speed, text, shouldReduceMotion]);

  return (
    <span className="relative">
      <motion.span
        className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      >
        {displayText}
      </motion.span>
      <motion.span
        className="inline-block w-0.5 h-8 ml-1"
        animate={{ 
          opacity: [1, 0],
          backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6']
        }}
        transition={{ 
          opacity: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
          backgroundColor: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </span>
  );
};

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<ParticleProps[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        // Update particle position
        particle.y -= particle.speed;
        
        // Reset particle if it goes off screen
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  );
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  // Restore scroll transform but with safer bounds to prevent image clipping
  const y = useTransform(scrollY, [0, 500], [0, 100]); // Restored movement but kept safe
  const opacity = useTransform(scrollY, [0, 400], [1, 0.1]); // Slower fade, don't fully disappear
  const shouldReduceMotion = useReducedMotion();

  const heroTitles = [
    "Full-Stack Developer",
    "AI Integration Specialist", 
    "Modern Web Architect",
    "Problem Solver"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, heroTitles.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-10">
      {/* Particle Background - Using more intense variant for hero */}
      <ParticleField />
      
      {/* Background Gradient Orbs - Restored animations */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={shouldReduceMotion ? {} : { y, opacity }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-500/20 to-slate-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 0.8, 1],
          x: [0, -40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={shouldReduceMotion ? {} : { y: useTransform(scrollY, [0, 500], [0, -80]), opacity }}
      />

      {/* Main Content - Restored scroll effects with waving animation */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={shouldReduceMotion ? {} : { y, opacity }}
        animate={shouldReduceMotion ? {} : {
          y: [0, -8, 0], // Gentle waving motion when static
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        {...(shouldReduceMotion ? {} : optimizedFadeIn)}
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8"
          {...(shouldReduceMotion ? {} : optimizedScaleIn)}
          transition={{ delay: 0.1 }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
            {/* Subtle glowing background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-600/15 to-gray-600/15 blur-md"
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Professional border with subtle gradient */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-500/25 via-gray-500/15 to-slate-600/25 p-0.5"
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Smoky Glow Effects */}
              <motion.div
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-cyan-500/20 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-indigo-500/25 blur-xl"
                animate={{
                  scale: [1.1, 0.9, 1.1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-500/25 to-purple-400/30 blur-lg"
                animate={{
                  scale: [0.9, 1.3, 0.9],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
              
              {/* Floating particles */}
              <motion.div
                className="absolute -inset-12 pointer-events-none"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
                    style={{
                      top: `${Math.sin((i * Math.PI * 2) / 6) * 40 + 50}%`,
                      left: `${Math.cos((i * Math.PI * 2) / 6) * 40 + 50}%`,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.3, 0.8, 0.3],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </motion.div>
              
              <div className="relative w-full h-full rounded-full bg-slate-900 p-1 shadow-2xl overflow-hidden">
                {/* Inner glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <motion.img
                  src="/images/aditya.jpg"
                  alt="Aditya Kumar"
                  className="relative z-10 w-full h-full object-cover rounded-full"
                  whileHover={shouldReduceMotion ? {} : {
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />
              </div>
            </motion.div>
            
            {/* Subtle floating accent dots */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-slate-400 rounded-full opacity-60"
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-50"
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p 
          className="text-lg md:text-xl font-medium mb-4"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="bg-gradient-to-r from-slate-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Hello, I'm
          </motion.span>
        </motion.p>

        {/* Name */}
        <motion.h1 
          className="text-4xl md:text-7xl font-bold mb-6 leading-tight md:leading-none py-2"
          {...(shouldReduceMotion ? {} : optimizedScaleIn)}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Aditya Kumar
          </motion.span>
        </motion.h1>

        {/* Dynamic Title with Typewriter Effect */}
        <motion.div 
          className="text-2xl md:text-4xl font-semibold text-gray-300 mb-8 h-16 flex items-center justify-center"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.6 }}
        >
          {shouldReduceMotion ? (
            <span>Full-Stack Developer & AI Integration Specialist</span>
          ) : (
            <Typewriter 
              text={heroTitles[currentTitleIndex] || "Full-Stack Developer"}
              key={currentTitleIndex}
              delay={500}
              speed={100}
            />
          )}
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 0.8 }}
        >
          Computer Science Engineering student passionate about building modern web applications 
          with AI integration. Currently developing production-ready applications and seeking 
          exciting internship opportunities.
        </motion.p>

        {/* Action Buttons - Improved spacing and visual hierarchy */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          {...(shouldReduceMotion ? {} : optimizedFadeIn)}
          transition={{ delay: 1.0 }}
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-600 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="group px-8 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-full hover:bg-slate-400 hover:text-slate-900 transition-all duration-300"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating Elements - Restored original animations */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-slate-500 rounded-full opacity-50"
        animate={shouldReduceMotion ? {} : {
          y: [0, -20, 0], // Restored original range
          scale: [1, 1.2, 1], // Restored original scale
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-6 h-6 border-2 border-gray-500 rotate-45 opacity-30"
        animate={shouldReduceMotion ? {} : {
          rotate: [45, 225, 45], // Restored original rotation
          scale: [1, 0.8, 1], // Restored original scale
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default HeroSection;
