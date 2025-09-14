import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  JavaIcon,
  CppIcon,
  CIcon,
  ViteIcon,
  NodeIcon,
  MongoIcon,
  ExpressIcon,
  TailwindIcon,
  NextIcon,
  GitIcon,
  GitHubIcon,
  PythonIcon,
  HTMLIcon,
  CSSIcon,
  DockerIcon,
  VSCodeIcon,
  GeminiIcon,
  FirebaseIcon
} from './icons/TechIcons';

interface TechIcon {
  id: number;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  delay: number;
}

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const EnhancedTechAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const smokeParticlesRef = useRef<SmokeParticle[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const techIcons: TechIcon[] = [
    { id: 1, component: ReactIcon, name: 'React', color: '#61DAFB', x: 15, y: 10, size: 40, rotation: 0, speed: 2, delay: 0 },
    { id: 2, component: TypeScriptIcon, name: 'TypeScript', color: '#3178C6', x: 85, y: 15, size: 35, rotation: 0, speed: 2.5, delay: 0.5 },
    { id: 3, component: JavaScriptIcon, name: 'JavaScript', color: '#F7DF1E', x: 20, y: 80, size: 38, rotation: 0, speed: 2.2, delay: 1 },
    { id: 4, component: JavaIcon, name: 'Java', color: '#ED8B00', x: 75, y: 75, size: 42, rotation: 0, speed: 1.8, delay: 1.5 },
    { id: 5, component: CppIcon, name: 'C++', color: '#00599C', x: 10, y: 45, size: 36, rotation: 0, speed: 2.1, delay: 2 },
    { id: 6, component: CIcon, name: 'C', color: '#A8B9CC', x: 90, y: 50, size: 34, rotation: 0, speed: 2.3, delay: 2.5 },
    { id: 7, component: ViteIcon, name: 'Vite', color: '#646CFF', x: 50, y: 20, size: 40, rotation: 0, speed: 2.7, delay: 3 },
    { id: 8, component: NodeIcon, name: 'Node.js', color: '#339933', x: 60, y: 85, size: 45, rotation: 0, speed: 1.9, delay: 3.5 },
    { id: 9, component: MongoIcon, name: 'MongoDB', color: '#47A248', x: 30, y: 30, size: 38, rotation: 0, speed: 2.4, delay: 4 },
    { id: 10, component: ExpressIcon, name: 'Express', color: '#000000', x: 80, y: 35, size: 36, rotation: 0, speed: 2.6, delay: 4.5 },
    { id: 11, component: TailwindIcon, name: 'Tailwind', color: '#06B6D4', x: 40, y: 65, size: 42, rotation: 0, speed: 2.0, delay: 5 },
    { id: 12, component: NextIcon, name: 'Next.js', color: '#000000', x: 70, y: 25, size: 39, rotation: 0, speed: 2.8, delay: 5.5 },
    { id: 13, component: GitIcon, name: 'Git', color: '#F05032', x: 25, y: 60, size: 37, rotation: 0, speed: 2.1, delay: 6 },
    { id: 14, component: GitHubIcon, name: 'GitHub', color: '#181717', x: 85, y: 65, size: 41, rotation: 0, speed: 1.7, delay: 6.5 },
    { id: 15, component: PythonIcon, name: 'Python', color: '#3776AB', x: 45, y: 40, size: 44, rotation: 0, speed: 2.2, delay: 7 },
    { id: 16, component: HTMLIcon, name: 'HTML5', color: '#E34F26', x: 65, y: 55, size: 38, rotation: 0, speed: 2.5, delay: 7.5 },
    { id: 17, component: CSSIcon, name: 'CSS3', color: '#1572B6', x: 35, y: 75, size: 36, rotation: 0, speed: 2.3, delay: 8 },
    { id: 18, component: DockerIcon, name: 'Docker', color: '#2496ED', x: 55, y: 70, size: 40, rotation: 0, speed: 1.9, delay: 8.5 },
    { id: 19, component: VSCodeIcon, name: 'VS Code', color: '#007ACC', x: 15, y: 25, size: 35, rotation: 0, speed: 2.4, delay: 9 },
    { id: 20, component: GeminiIcon, name: 'Gemini AI', color: '#4285F4', x: 75, y: 45, size: 43, rotation: 0, speed: 2.6, delay: 9.5 },
    { id: 21, component: FirebaseIcon, name: 'Firebase', color: '#FFCA28', x: 50, y: 50, size: 41, rotation: 0, speed: 2.1, delay: 10 },
  ];

  // Create smoke particles
  const createSmokeParticle = (x: number, y: number): SmokeParticle => ({
    id: Math.random(),
    x: x + (Math.random() - 0.5) * 20,
    y: y + (Math.random() - 0.5) * 20,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -Math.random() * 0.8 - 0.2,
    size: Math.random() * 15 + 5,
    opacity: Math.random() * 0.1 + 0.02,
    life: 0,
    maxLife: Math.random() * 200 + 100,
  });

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

    // Initialize smoke particles
    const addSmokeParticles = () => {
      const particleCount = 3;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 50;
        smokeParticlesRef.current.push(createSmokeParticle(x, y));
      }
    };

    // Add particles periodically
    const smokeInterval = setInterval(addSmokeParticles, 200);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw smoke particles
      smokeParticlesRef.current = smokeParticlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        const ageRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0, particle.opacity * (1 - ageRatio * 0.02));
        particle.size += 0.1;

        if (particle.life < particle.maxLife && particle.opacity > 0.001) {
          // Create gradient for smoke effect
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          gradient.addColorStop(0, `rgba(30, 64, 175, ${particle.opacity})`); // blue-700
          gradient.addColorStop(0.5, `rgba(15, 23, 42, ${particle.opacity * 0.6})`); // slate-900
          gradient.addColorStop(1, `rgba(15, 23, 42, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }
        return false;
      });

      // Keep particle count reasonable
      if (smokeParticlesRef.current.length > 150) {
        smokeParticlesRef.current = smokeParticlesRef.current.slice(-100);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(smokeInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden min-w-full w-full h-full bg-gradient-to-r from-slate-900/30 via-transparent to-blue-900/30">
      {/* Smoke Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full min-w-full opacity-40"
      />

      {/* Animated Tech Icons */}
      {techIcons.map((icon) => {
        const Icon = icon.component;
        return (
          <motion.div
            key={icon.id}
            className="absolute pointer-events-none"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              color: icon.color,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.3,
              rotate: icon.rotation,
              y: 50
            }}
            animate={{
              opacity: [0, 0.6, 0.4, 0.7, 0.3],
              scale: [0.3, 1.2, 0.8, 1.1, 0.9],
              rotate: [icon.rotation, icon.rotation + 360],
              y: [50, -20, 10, -30, 0],
              x: [0, 15, -10, 20, 0],
            }}
            transition={{
              duration: 15 + icon.speed,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 0.7, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + icon.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon 
                className="drop-shadow-lg"
                style={{ 
                  width: icon.size, 
                  height: icon.size,
                  filter: `drop-shadow(0 0 10px ${icon.color}40)`,
                }} 
              />
            </motion.div>
            
            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-md"
              style={{
                background: `radial-gradient(circle, ${icon.color}20 0%, transparent 70%)`,
                width: icon.size * 1.5,
                height: icon.size * 1.5,
                transform: 'translate(-25%, -25%)',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 3 + icon.speed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}

      {/* Floating Tech Symbols */}
      <motion.div
        className="absolute top-1/4 left-1/6 text-blue-600/20 text-6xl font-mono"
        animate={{
          y: [0, -30, 15, -20, 0],
          rotate: [0, 45, -30, 15, 0],
          opacity: [0.2, 0.4, 0.1, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        &lt;/&gt;
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/5 text-slate-700/30 text-5xl font-mono"
        animate={{
          y: [0, 25, -15, 20, 0],
          rotate: [0, -30, 45, -15, 0],
          opacity: [0.3, 0.1, 0.4, 0.2, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        { }
      </motion.div>

      <motion.div
        className="absolute top-2/3 left-1/4 text-blue-800/25 text-4xl font-mono"
        animate={{
          y: [0, -20, 25, -10, 0],
          x: [0, 15, -20, 10, 0],
          opacity: [0.25, 0.5, 0.15, 0.35, 0.25],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        [ ]
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3 text-slate-600/20 text-7xl font-mono"
        animate={{
          scale: [1, 1.3, 0.8, 1.1, 1],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.2, 0.4, 0.1, 0.3, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 6,
        }}
      >
        +
      </motion.div>

      {/* Modern Gradient Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-slate-700/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-700/25 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-800/25 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
};

export default EnhancedTechAnimation;
