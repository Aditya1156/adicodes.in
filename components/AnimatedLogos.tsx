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
  isClickSpawned?: boolean; // Track if spawned by click
  spawnTime?: number; // When it was spawned
}

const AnimatedLogos: React.FC = () => {
  const [logos, setLogos] = useState<LogoPosition[]>([]);
  const [clickLogos, setClickLogos] = useState<LogoPosition[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Handle click to spawn 5 random logos
  const handleClick = (event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const newClickLogos: LogoPosition[] = [];
    const currentTime = Date.now();
    
    for (let i = 0; i < 5; i++) {
      // Generate random logo ID from 1-17
      const randomLogoId = Math.floor(Math.random() * 17) + 1;
      
      // Create random direction away from click point
      const angle = (Math.random() * 360) * (Math.PI / 180);
      
      newClickLogos.push({
        id: randomLogoId, // Use the random logo ID
        initialX: clickX,
        initialY: clickY,
        scale: 0.4 + Math.random() * 0.6,
        opacity: 0.3 + Math.random() * 0.5,
        glowIntensity: 0.4 + Math.random() * 0.8,
        brightness: 0.7 + Math.random() * 0.9,
        hue: Math.random() * 90 - 45,
        direction: angle * (180 / Math.PI),
        speed: 25 + Math.random() * 35,
        isClickSpawned: true,
        spawnTime: currentTime + i, // Add small offset for unique IDs
      });
    }
    
    setClickLogos(prev => [...prev, ...newClickLogos]);
    
    // Remove click-spawned logos after 15 seconds
    setTimeout(() => {
      setClickLogos(prev => prev.filter(logo => 
        !logo.spawnTime || Date.now() - logo.spawnTime < 15000
      ));
    }, 15000);
  };

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
          scale: 0.3 + Math.random() * 0.5,
          opacity: 0.15 + Math.random() * 0.4, // Slightly more transparent for more logos
          glowIntensity: 0.3 + Math.random() * 0.6,
          brightness: 0.6 + Math.random() * 0.8,
          hue: Math.random() * 60 - 30,
          direction: Math.random() * 360, // Random direction in degrees
          speed: 15 + Math.random() * 25, // Slightly slower for more logos
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

  const renderLogo = (logo: LogoPosition, isClickSpawned = false) => (
    <motion.div
      key={logo.id}
      className="absolute"
      initial={{
        x: logo.initialX,
        y: logo.initialY,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        x: isClickSpawned ? [
          logo.initialX,
          logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 8,
          logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 15,
        ] : [
          logo.initialX,
          logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 40,
          logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 80,
          logo.initialX + Math.cos(logo.direction * Math.PI / 180) * logo.speed * 120,
        ],
        y: isClickSpawned ? [
          logo.initialY,
          logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 8,
          logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 15,
        ] : [
          logo.initialY,
          logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 40,
          logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 80,
          logo.initialY + Math.sin(logo.direction * Math.PI / 180) * logo.speed * 120,
        ],
        rotate: isClickSpawned ? [0, 180, 360] : [0, 90, 180, 270, 360],
        opacity: isClickSpawned ? [0, 1, 0.8, 0] : [0, 1, 1, 0.8, 0],
        scale: isClickSpawned ? [0, 1.2, 0.9, 0] : [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: isClickSpawned ? 8 + Math.random() * 4 : 120 + Math.random() * 60,
        ease: "linear",
        repeat: isClickSpawned ? 0 : Infinity,
        delay: isClickSpawned ? 0 : Math.random() * 10,
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [
            logo.scale * 0.5, 
            logo.scale * 1.3, 
            logo.scale * 0.8, 
            logo.scale * 1.5, 
            logo.scale * 0.3
          ],
          rotate: [0, 45, -30, 60, 0],
        }}
        transition={{
          duration: isClickSpawned ? 6 : 12 + Math.random() * 8,
          repeat: isClickSpawned ? 1 : Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5,
        }}
      >
        {/* Enhanced outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            opacity: [0, logo.glowIntensity * 0.9, logo.glowIntensity * 0.4, logo.glowIntensity * 1.2, 0],
            scale: [0.5, 2, 1.2, 2.5, 0.5],
          }}
          transition={{
            duration: isClickSpawned ? 4 : 8 + Math.random() * 6,
            repeat: isClickSpawned ? 1 : Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
          style={{
            background: `radial-gradient(circle, rgba(148, 163, 184, ${logo.glowIntensity * 0.6}) 0%, transparent 70%)`,
            filter: `hue-rotate(${logo.hue}deg)`,
          }}
        />
        
        {/* Enhanced inner glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          animate={{
            opacity: [0, logo.glowIntensity * 0.7, logo.glowIntensity * 1.3, logo.glowIntensity * 0.5, 0],
            scale: [0.3, 1.5, 0.9, 1.8, 0.3],
          }}
          transition={{
            duration: isClickSpawned ? 3 : 6 + Math.random() * 4,
            repeat: isClickSpawned ? 1 : Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
          style={{
            background: `radial-gradient(circle, rgba(203, 213, 225, ${logo.glowIntensity * 0.8}) 0%, transparent 60%)`,
            filter: `hue-rotate(${logo.hue}deg)`,
          }}
        />
        
        {/* Main logo image with enhanced effects */}
        <motion.img
          src={`/images/logos/logo${logo.id}.png`}
          alt={`Logo ${logo.id}`}
          className="relative w-12 h-12 md:w-16 md:h-16 object-contain z-10"
          animate={{
            opacity: [
              0,
              logo.opacity * 0.5, 
              logo.opacity * 1.2, 
              logo.opacity * 0.8, 
              logo.opacity * 1.5, 
              logo.opacity * 0.3,
              0
            ],
            filter: [
              `brightness(0.3) contrast(1) saturate(0.5) hue-rotate(${logo.hue}deg)`,
              `brightness(${logo.brightness * 0.8}) contrast(1.2) saturate(1.0) hue-rotate(${logo.hue + 15}deg)`,
              `brightness(${logo.brightness * 1.5}) contrast(1.6) saturate(1.4) hue-rotate(${logo.hue}deg)`,
              `brightness(${logo.brightness * 1.0}) contrast(1.3) saturate(1.1) hue-rotate(${logo.hue - 20}deg)`,
              `brightness(${logo.brightness * 1.8}) contrast(1.8) saturate(1.6) hue-rotate(${logo.hue + 10}deg)`,
              `brightness(${logo.brightness * 0.6}) contrast(1.1) saturate(0.8) hue-rotate(${logo.hue}deg)`,
              `brightness(0.2) contrast(0.8) saturate(0.3) hue-rotate(${logo.hue}deg)`,
            ],
            scale: [0, 0.8, 1.2, 0.9, 1.3, 0.6, 0],
            rotate: [0, 10, -15, 5, -10, 0, 0],
          }}
          transition={{
            duration: isClickSpawned ? 8 : 15 + Math.random() * 10,
            repeat: isClickSpawned ? 0 : Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
          style={{
            filter: `drop-shadow(0 0 ${logo.glowIntensity * 20}px rgba(148, 163, 184, ${logo.glowIntensity}))`,
          }}
        />
        
        {/* Enhanced sparkle effects */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-80"
            style={{
              top: `${20 + i * 15}%`,
              right: `${15 + i * 10}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: isClickSpawned ? 1 : Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10 + i * 2,
              repeatDelay: 8 + Math.random() * 12,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <div 
      className="fixed inset-0 pointer-events-auto z-[1] overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Regular background logos */}
      {logos.map((logo) => renderLogo(logo, false))}
      
      {/* Click-spawned logos */}
      {clickLogos.map((logo) => renderLogo(logo, true))}
    </div>
  );
};

export default AnimatedLogos;
