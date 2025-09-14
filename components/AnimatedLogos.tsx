import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LogoPosition {
  id: number;
  initialX: number;
  initialY: number;
  scale: number;
  opacity: number;
  glowIntensity: number;
  brightness: number;
  hue: number;
  direction: number; // Movement direction in degrees
  speed: number; // Pixels per second
}

const AnimatedLogos: React.FC = () => {
  const [logos, setLogos] = useState<LogoPosition[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Initialize logo positions
  useEffect(() => {
    const initializeLogos = () => {
      const logoCount = 17; // Updated to use all 17 logos
      const newLogos: LogoPosition[] = [];
      
      for (let i = 1; i <= logoCount; i++) {
        // Generate random starting positions from all edges and interior
        const edge = Math.floor(Math.random() * 5); // 0-3 for edges, 4 for center
        let x, y;
        
        switch (edge) {
          case 0: // Top edge
            x = Math.random() * window.innerWidth;
            y = -60;
            break;
          case 1: // Right edge
            x = window.innerWidth + 60;
            y = Math.random() * window.innerHeight;
            break;
          case 2: // Bottom edge
            x = Math.random() * window.innerWidth;
            y = window.innerHeight + 60;
            break;
          case 3: // Left edge
            x = -60;
            y = Math.random() * window.innerHeight;
            break;
          default: // Center area
            x = 100 + Math.random() * (window.innerWidth - 200);
            y = 100 + Math.random() * (window.innerHeight - 200);
        }
        
        newLogos.push({
          id: i,
          initialX: x,
          initialY: y,
          scale: 0.2 + Math.random() * 0.3, // Reduced scale
          opacity: 0.08 + Math.random() * 0.15, // Much more transparent
          glowIntensity: 0.1 + Math.random() * 0.2, // Reduced glow
          brightness: 0.4 + Math.random() * 0.4, // Reduced brightness
          hue: Math.random() * 60 - 30,
          direction: Math.random() * 360, // Random direction in degrees
          speed: 10 + Math.random() * 15, // Slower movement
        });
      }
      
      setLogos(newLogos);
    };

    initializeLogos();
    
    // Reinitialize on window resize
    const handleResize = () => {
      initializeLogos();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className="absolute pointer-events-none"
          initial={{
            x: logo.initialX,
            y: logo.initialY,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              logo.initialX,
              logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 40,
              logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 80,
              logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 120,
            ],
            y: [
              logo.initialY,
              logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 40,
              logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 80,
              logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 120,
            ],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0, 1, 1, 0.8, 0], // Fade in and out completely
            scale: [0, 1, 1, 0.8, 0], // Scale in and out completely
          }}
          transition={{
            duration: 120 + Math.random() * 60, // 120-180 seconds for more variation
            ease: "linear",
            repeat: Infinity,
            delay: Math.random() * 10, // Random start delay
          }}
        >
          <motion.div
            className="relative pointer-events-none"
            animate={{
              scale: [
                logo.scale * 0.8, 
                logo.scale * 1.1, 
                logo.scale * 0.9, 
                logo.scale * 1.2, 
                logo.scale * 0.7
              ],
              rotate: [0, 15, -10, 20, 0], // Reduced rotation
            }}
            transition={{
              duration: 15 + Math.random() * 10, // Slower animation
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          >
            {/* Subtle outer glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-lg pointer-events-none"
              animate={{
                opacity: [0, logo.glowIntensity * 0.3, logo.glowIntensity * 0.2, logo.glowIntensity * 0.4, 0],
                scale: [0.8, 1.2, 1.0, 1.4, 0.8],
              }}
              transition={{
                duration: 12 + Math.random() * 8, // Slower glow animation
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
              style={{
                background: `radial-gradient(circle, rgba(148, 163, 184, ${logo.glowIntensity * 0.3}) 0%, transparent 70%)`,
                filter: `hue-rotate(${logo.hue}deg)`,
              }}
            />
            
            {/* Subtle inner glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full blur-sm pointer-events-none"
              animate={{
                opacity: [0, logo.glowIntensity * 0.4, logo.glowIntensity * 0.6, logo.glowIntensity * 0.2, 0],
                scale: [0.6, 1.2, 1.0, 1.3, 0.6],
              }}
              transition={{
                duration: 10 + Math.random() * 6, // Slower inner glow
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              }}
              style={{
                background: `radial-gradient(circle, rgba(203, 213, 225, ${logo.glowIntensity * 0.4}) 0%, transparent 60%)`,
                filter: `hue-rotate(${logo.hue}deg)`,
              }}
            />
            
            {/* Main logo image with subtle effects */}
            <motion.img
              src={`/images/logos/logo${logo.id}.png`}
              alt={`Logo ${logo.id}`}
              className="relative w-8 h-8 md:w-12 md:h-12 object-contain z-10 pointer-events-none select-none"
              animate={{
                opacity: [
                  0,
                  logo.opacity * 0.3, 
                  logo.opacity * 0.6, 
                  logo.opacity * 0.4, 
                  logo.opacity * 0.7, 
                  logo.opacity * 0.2,
                  0
                ],
                filter: [
                  `brightness(0.2) contrast(0.8) saturate(0.4) hue-rotate(${logo.hue}deg)`,
                  `brightness(${logo.brightness * 0.5}) contrast(1.0) saturate(0.8) hue-rotate(${logo.hue + 10}deg)`,
                  `brightness(${logo.brightness * 0.8}) contrast(1.2) saturate(1.0) hue-rotate(${logo.hue}deg)`,
                  `brightness(${logo.brightness * 0.6}) contrast(1.1) saturate(0.9) hue-rotate(${logo.hue - 10}deg)`,
                  `brightness(${logo.brightness * 1.0}) contrast(1.3) saturate(1.1) hue-rotate(${logo.hue + 5}deg)`,
                  `brightness(${logo.brightness * 0.4}) contrast(0.9) saturate(0.6) hue-rotate(${logo.hue}deg)`,
                  `brightness(0.1) contrast(0.6) saturate(0.2) hue-rotate(${logo.hue}deg)`,
                ],
                scale: [0, 0.6, 0.9, 0.7, 1.0, 0.4, 0],
                rotate: [0, 5, -8, 3, -5, 0, 0], // Reduced rotation
              }}
              transition={{
                duration: 20 + Math.random() * 15, // Slower animation
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 12,
              }}
              style={{
                filter: `drop-shadow(0 0 ${logo.glowIntensity * 8}px rgba(148, 163, 184, ${logo.glowIntensity * 0.5}))`,
              }}
            />
            
            {/* Subtle sparkle effects */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-300 rounded-full opacity-40 pointer-events-none"
                style={{
                  top: `${30 + i * 20}%`,
                  right: `${20 + i * 15}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 15 + i * 3,
                  repeatDelay: 12 + Math.random() * 18,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedLogos;
