import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SmokeStream {
  id: number;
  x: number;
  startY: number;
  particles: SmokeParticle[];
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  age: number;
  maxAge: number;
}

const AtmosphericSmoke: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const smokeStreamsRef = useRef<SmokeStream[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = Math.max(window.innerWidth, document.documentElement.clientWidth);
      canvas.height = Math.max(window.innerHeight, document.documentElement.clientHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize smoke streams
    const initStreams = () => {
      smokeStreamsRef.current = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: (i / 7) * canvas.width,
        startY: canvas.height + 100,
        particles: []
      }));
    };

    initStreams();

    const createParticle = (stream: SmokeStream): SmokeParticle => ({
      x: stream.x + (Math.random() - 0.5) * 30,
      y: stream.startY,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 1.2 - 0.5,
      size: Math.random() * 25 + 10,
      opacity: Math.random() * 0.08 + 0.02,
      age: 0,
      maxAge: Math.random() * 300 + 200
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      smokeStreamsRef.current.forEach(stream => {
        // Add new particles
        if (Math.random() < 0.3) {
          stream.particles.push(createParticle(stream));
        }

        // Update and draw particles
        stream.particles = stream.particles.filter(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.age++;
          
          // Slow down and disperse over time
          particle.vx *= 0.998;
          particle.vy *= 0.995;
          particle.size += 0.15;
          
          const ageRatio = particle.age / particle.maxAge;
          particle.opacity = Math.max(0, particle.opacity * (1 - ageRatio * 0.015));

          if (particle.age < particle.maxAge && particle.opacity > 0.001) {
            // Create radial gradient for smoke
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.size
            );
            
            // Professional black-blue smoke colors
            gradient.addColorStop(0, `rgba(30, 64, 175, ${particle.opacity})`); // blue-700
            gradient.addColorStop(0.3, `rgba(15, 23, 42, ${particle.opacity * 0.8})`); // slate-900
            gradient.addColorStop(0.6, `rgba(71, 85, 105, ${particle.opacity * 0.4})`); // slate-600
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            return true;
          }
          return false;
        });

        // Limit particles per stream
        if (stream.particles.length > 30) {
          stream.particles = stream.particles.slice(-25);
        }
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
    <>
      {/* Atmospheric Smoke Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full min-w-full pointer-events-none z-0 opacity-30 bg-gray-900/20"
      />

      {/* Additional Floating Smoke Wisps */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 min-w-full w-full h-full bg-gradient-to-br from-slate-900/20 via-transparent to-blue-900/20"
      >
        {/* Large Smoke Wisps */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, rgba(15, 23, 42, 0.05) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.4, 0.8, 1.2, 1],
            x: [0, 60, -30, 40, 0],
            y: [0, -80, 20, -40, 0],
            rotate: [0, 45, -30, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-8"
          style={{
            background: 'radial-gradient(circle, rgba(71, 85, 105, 0.08) 0%, rgba(30, 64, 175, 0.04) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 0.7, 1.3, 0.9, 1],
            x: [0, -70, 50, -20, 0],
            y: [0, 60, -40, 80, 0],
            rotate: [0, -60, 30, -45, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        <motion.div
          className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-12"
          style={{
            background: 'radial-gradient(circle, rgba(15, 23, 42, 0.12) 0%, rgba(30, 64, 175, 0.06) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.6, 0.6, 1.1, 1],
            x: [0, 80, -60, 30, 0],
            y: [0, -90, 40, -20, 0],
            rotate: [0, 90, -45, 120, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />

        {/* Medium Smoke Clouds */}
        <motion.div
          className="absolute top-1/6 right-1/6 w-64 h-64 rounded-full blur-2xl opacity-6"
          style={{
            background: 'radial-gradient(circle, rgba(30, 64, 175, 0.06) 0%, rgba(71, 85, 105, 0.03) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.2, 0.8, 1],
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            opacity: [0.06, 0.12, 0.04, 0.06],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <motion.div
          className="absolute bottom-1/6 left-1/2 w-56 h-56 rounded-full blur-2xl opacity-8"
          style={{
            background: 'radial-gradient(circle, rgba(71, 85, 105, 0.08) 0%, rgba(15, 23, 42, 0.04) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 0.9, 1.3, 1],
            x: [0, -50, 25, 0],
            y: [0, 40, -30, 0],
            opacity: [0.08, 0.04, 0.1, 0.08],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
        />
      </motion.div>
    </>
  );
};

export default AtmosphericSmoke;
