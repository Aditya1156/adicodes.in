import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon';
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  direction: { x: number; y: number };
}

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'section' | 'subtle' | 'fullpage';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'section', 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const shapesRef = useRef<Shape[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Professional black-blue color palette
  const colors = [
    'rgba(15, 23, 42, 0.15)',     // slate-900 - deep black
    'rgba(30, 41, 59, 0.12)',     // slate-800 - dark blue-black
    'rgba(30, 64, 175, 0.10)',    // blue-700 - professional blue
    'rgba(37, 99, 235, 0.08)',    // blue-600 - medium blue
    'rgba(59, 130, 246, 0.06)',   // blue-500 - bright blue
    'rgba(96, 165, 250, 0.04)',   // blue-400 - light blue
    'rgba(3, 105, 161, 0.08)',    // sky-700 - deep sky blue
    'rgba(2, 132, 199, 0.06)',    // sky-600 - sky blue
    'rgba(12, 74, 110, 0.10)',    // custom dark blue
    'rgba(7, 89, 133, 0.08)',     // custom professional blue
  ];

  const drawCircle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
    ctx.fillStyle = shape.color;
    ctx.fill();
  };

  const drawSquare = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.fillStyle = shape.color;
    ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
    ctx.restore();
  };

  const drawTriangle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -shape.size / 2);
    ctx.lineTo(-shape.size / 2, shape.size / 2);
    ctx.lineTo(shape.size / 2, shape.size / 2);
    ctx.closePath();
    ctx.fillStyle = shape.color;
    ctx.fill();
    ctx.restore();
  };

  const drawDiamond = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -shape.size / 2);
    ctx.lineTo(shape.size / 2, 0);
    ctx.lineTo(0, shape.size / 2);
    ctx.lineTo(-shape.size / 2, 0);
    ctx.closePath();
    ctx.fillStyle = shape.color;
    ctx.fill();
    ctx.restore();
  };

  const drawHexagon = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = Math.cos(angle) * shape.size / 2;
      const y = Math.sin(angle) * shape.size / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = shape.color;
    ctx.fill();
    ctx.restore();
  };

  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.globalAlpha = shape.opacity;
    switch (shape.type) {
      case 'circle':
        drawCircle(ctx, shape);
        break;
      case 'square':
        drawSquare(ctx, shape);
        break;
      case 'triangle':
        drawTriangle(ctx, shape);
        break;
      case 'diamond':
        drawDiamond(ctx, shape);
        break;
      case 'hexagon':
        drawHexagon(ctx, shape);
        break;
    }
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = Math.max(window.innerWidth, document.documentElement.clientWidth);
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Different configurations for different variants
    const configs = {
      hero: {
        count: 60,
        speeds: [0.3, 0.8],
        sizes: [8, 25],
        opacity: [0.08, 0.15]
      },
      section: {
        count: 40,
        speeds: [0.2, 0.5],
        sizes: [6, 20],
        opacity: [0.06, 0.12]
      },
      subtle: {
        count: 25,
        speeds: [0.1, 0.3],
        sizes: [4, 15],
        opacity: [0.04, 0.08]
      },
      fullpage: {
        count: 120,
        speeds: [0.1, 0.6],
        sizes: [5, 30],
        opacity: [0.05, 0.12]
      }
    };

    const config = configs[variant];
    const shapeTypes: Shape['type'][] = ['circle', 'square', 'triangle', 'diamond', 'hexagon'];

    // Initialize shapes
    shapesRef.current = Array.from({ length: config.count }, (_, index) => {
      const [minSize, maxSize] = config.sizes;
      const [minSpeed, maxSpeed] = config.speeds;
      const [minOpacity, maxOpacity] = config.opacity;
      
      return {
        id: index,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * ((maxSize ?? 30) - (minSize ?? 5)) + (minSize ?? 5),
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)] as Shape['type'],
        speed: Math.random() * ((maxSpeed ?? 0.6) - (minSpeed ?? 0.1)) + (minSpeed ?? 0.1),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * ((maxOpacity ?? 0.12) - (minOpacity ?? 0.05)) + (minOpacity ?? 0.05),
        color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
        direction: {
          x: (Math.random() - 0.5) * 0.3,
          y: variant === 'fullpage' ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.2
        }
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.direction.x * shape.speed;
        shape.y += shape.direction.y * shape.speed;
        shape.rotation += shape.rotationSpeed;
        
        // Wrap around edges
        if (shape.x < -shape.size) {
          shape.x = canvas.width + shape.size;
        } else if (shape.x > canvas.width + shape.size) {
          shape.x = -shape.size;
        }
        
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size;
        } else if (shape.y > canvas.height + shape.size) {
          shape.y = -shape.size;
        }
        
        // Draw shape
        drawShape(ctx, shape);
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
  }, [shouldReduceMotion, variant]);

  if (shouldReduceMotion) return null;

  const baseClasses = "fixed inset-0 pointer-events-none w-full h-full";
  const variantClasses = {
    hero: "opacity-30 z-10",
    section: "opacity-20 z-0",
    subtle: "opacity-15 z-0",
    fullpage: "opacity-25 z-0 fixed inset-0 w-full h-full min-w-full"
  };

  return (
    <>
      {/* Canvas with geometric shapes */}
      <canvas
        ref={canvasRef}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      />
      
      {/* Large Animated Gradient Orbs - Professional black-blue palette */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-slate-900/12 to-blue-700/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-800/8 to-blue-600/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 0.8, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-800/10 to-slate-900/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 0.9, 1],
          x: [0, 30, -15, 0],
          y: [0, -25, 10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/6 w-64 h-64 bg-gradient-to-r from-blue-700/6 to-slate-800/6 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 0.8, 1],
          x: [0, -20, 25, 0],
          y: [0, 15, -10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
      />

      {/* Small floating geometric elements - Professional black-blue palette */}
      <motion.div
        className="absolute top-1/6 right-1/5 w-4 h-4 bg-blue-600/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/5 right-1/3 w-5 h-5 border border-slate-700/25 rotate-45"
        animate={{
          rotate: [45, 135, 45],
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/5 w-3 h-3 bg-blue-700/40"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.4, 1],
          rotate: [0, 45, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      <motion.div
        className="absolute top-2/3 left-2/3 w-6 h-6 bg-gradient-to-br from-slate-800/20 to-blue-700/20 rounded-full"
        animate={{
          scale: [1, 1.5, 0.8, 1],
          opacity: [0.2, 0.4, 0.1, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/6 w-4 h-4 border-2 border-blue-600/30"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7
        }}
      />

      <motion.div
        className="absolute top-1/3 right-2/3 w-5 h-5 bg-slate-800/25 transform rotate-45"
        animate={{
          rotate: [45, 225, 45],
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </>
  );
};

// Additional Floating Shapes Component for React-based animations
const FloatingShapes: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;

  const shapes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 15,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 12 + 18,
    shape: ['circle', 'square', 'triangle', 'diamond'][Math.floor(Math.random() * 4)] as 'circle' | 'square' | 'triangle' | 'diamond'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden min-w-full w-full h-full bg-gradient-to-br from-slate-900/50 via-gray-900/50 to-blue-900/50">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-10"
          style={{
            left: `${shape.initialX}%`,
            top: `${shape.initialY}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -120, 80, 0],
            rotate: shape.shape === 'circle' ? [0, 180, 360] : [0, 90, 180, 270, 360],
            scale: [1, 1.3, 0.7, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.shape === 'circle' && (
            <div className="w-full h-full bg-gradient-to-br from-slate-800/15 to-blue-700/15 rounded-full" />
          )}
          {shape.shape === 'square' && (
            <div className="w-full h-full bg-gradient-to-br from-slate-900/12 to-blue-600/12 rounded-lg" />
          )}
          {shape.shape === 'triangle' && (
            <div 
              className="w-full h-full bg-gradient-to-br from-blue-800/12 to-slate-800/12"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          )}
          {shape.shape === 'diamond' && (
            <div 
              className="w-full h-full bg-gradient-to-br from-blue-700/10 to-slate-900/10 transform rotate-45"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
export { FloatingShapes };
