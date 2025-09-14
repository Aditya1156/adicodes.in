import React, { ReactNode, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

// Types for different glow effects
export type GlowEffectType = 
  | 'neon' 
  | 'pulse' 
  | 'orbital' 
  | 'particle' 
  | 'smoky' 
  | 'electric' 
  | 'rainbow' 
  | 'crystalline'
  | 'aurora'
  | 'magnetic'
  | 'plasma'
  | 'quantum';

export interface GlowEffectProps {
  children: ReactNode;
  type: GlowEffectType;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  color?: string;
  duration?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
  interactive?: boolean;
}

// Neon Glow Effect
const NeonGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#00ffff', 
  duration = 2,
  size = 'md',
  className = '',
  animated = true,
  interactive = true 
}) => {
  
  const intensityValues = {
    low: { blur: 4, opacity: 0.4 },
    medium: { blur: 8, opacity: 0.6 },
    high: { blur: 12, opacity: 0.8 },
    extreme: { blur: 20, opacity: 1 }
  };

  const sizeValues = {
    sm: 0.8,
    md: 1,
    lg: 1.2,
    xl: 1.5
  };

  const { blur, opacity } = intensityValues[intensity];
  const scale = sizeValues[size];

  const neonVariants: Variants = {
    initial: {
      filter: `drop-shadow(0 0 ${blur * scale}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`,
      textShadow: `0 0 ${blur * scale}px ${color}`,
    },
    animate: animated ? {
      filter: [
        `drop-shadow(0 0 ${blur * scale}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`,
        `drop-shadow(0 0 ${blur * scale * 1.5}px ${color}${Math.round(opacity * 200).toString(16).padStart(2, '0')})`,
        `drop-shadow(0 0 ${blur * scale}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`
      ],
      textShadow: [
        `0 0 ${blur * scale}px ${color}`,
        `0 0 ${blur * scale * 1.5}px ${color}`,
        `0 0 ${blur * scale}px ${color}`
      ],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    } : {},
    hover: interactive ? {
      filter: `drop-shadow(0 0 ${blur * scale * 2}px ${color}FF)`,
      textShadow: `0 0 ${blur * scale * 2}px ${color}`,
      scale: 1.05,
      transition: { duration: 0.3 }
    } : {}
  };

  return (
    <motion.div
      className={`neon-glow-container ${className}`}
      variants={neonVariants}
      initial="initial"
      animate="animate"
      whileHover={interactive ? "hover" : {}}
    >
      {children}
    </motion.div>
  );
};

// Pulse Glow Effect
const PulseGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#8b5cf6', 
  duration = 2,
  className = '',
  animated = true 
}) => {
  const intensityValues = {
    low: { scale: [1, 1.02], opacity: [0.5, 0.8] },
    medium: { scale: [1, 1.05], opacity: [0.4, 0.9] },
    high: { scale: [1, 1.08], opacity: [0.3, 1] },
    extreme: { scale: [1, 1.12], opacity: [0.2, 1] }
  };

  const { scale, opacity } = intensityValues[intensity];

  return (
    <div className={`relative ${className}`}>
      {/* Pulsing background layers */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: 'blur(10px)'
        }}
        animate={animated ? {
          scale: scale,
          opacity: opacity,
        } : {}}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}60 0%, transparent 50%)`,
          filter: 'blur(20px)'
        }}
        animate={animated ? {
          scale: [1, ...scale.slice(1).map(s => s * 1.2)],
          opacity: opacity.map(o => o * 0.6),
        } : {}}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: 0.2
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Orbital Glow Effect
const OrbitalGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#06b6d4', 
  duration = 4,
  size = 'md',
  className = '',
  animated = true 
}) => {
  const sizeValues = {
    sm: 60,
    md: 80,
    lg: 100,
    xl: 120
  };

  const orbitRadius = sizeValues[size];
  const particleCount = intensity === 'low' ? 3 : intensity === 'medium' ? 6 : intensity === 'high' ? 9 : 12;

  return (
    <div className={`relative ${className}`}>
      {/* Orbiting particles */}
      {animated && [...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [
              Math.cos((i * 2 * Math.PI) / particleCount) * orbitRadius,
              Math.cos((i * 2 * Math.PI) / particleCount + Math.PI * 2) * orbitRadius
            ],
            y: [
              Math.sin((i * 2 * Math.PI) / particleCount) * orbitRadius,
              Math.sin((i * 2 * Math.PI) / particleCount + Math.PI * 2) * orbitRadius
            ],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: (i * duration) / particleCount
          }}
        />
      ))}
      
      {/* Central glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${color}20 0%, transparent 60%)`,
          filter: 'blur(15px)'
        }}
        animate={animated ? {
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Particle Glow Effect
const ParticleGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#f59e0b', 
  duration = 3,
  className = '',
  animated = true 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const particleCount = intensity === 'low' ? 8 : intensity === 'medium' ? 15 : intensity === 'high' ? 25 : 40;
    const newParticles = [...Array(particleCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * duration,
      size: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
  }, [intensity, duration]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Floating particles */}
      {animated && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            width: particle.size,
            height: particle.size,
            background: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: duration + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
      
      {/* Base glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse, ${color}15 0%, transparent 70%)`,
          filter: 'blur(8px)'
        }}
        animate={animated ? {
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Smoky Glow Effect
const SmokyGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#6b7280', 
  duration = 6,
  className = '',
  animated = true 
}) => {
  const layers = intensity === 'low' ? 2 : intensity === 'medium' ? 3 : intensity === 'high' ? 4 : 6;

  return (
    <div className={`relative ${className}`}>
      {/* Smoky layers */}
      {animated && [...Array(layers)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse ${100 + i * 20}% ${80 + i * 15}%, ${color}${Math.round((0.3 - i * 0.05) * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
            filter: `blur(${15 + i * 5}px)`,
          }}
          animate={{
            scale: [1, 1.1 + i * 0.05, 1],
            rotate: [0, 10 - i * 2, 0],
            opacity: [0.4 - i * 0.05, 0.6 - i * 0.05, 0.4 - i * 0.05],
          }}
          transition={{
            duration: duration + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Electric Glow Effect
const ElectricGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#3b82f6', 
  duration = 0.5,
  className = '',
  animated = true 
}) => {
  const [isFlashing, setIsFlashing] = useState(false);
  
  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 100);
    }, Math.random() * 3000 + 1000);
    
    return () => clearInterval(interval);
  }, [animated]);

  const baseIntensity = intensity === 'low' ? 0.4 : intensity === 'medium' ? 0.6 : intensity === 'high' ? 0.8 : 1;

  return (
    <div className={`relative ${className}`}>
      {/* Electric base glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: 'blur(10px)'
        }}
        animate={animated ? {
          opacity: [baseIntensity * 0.5, baseIntensity, baseIntensity * 0.5],
          scale: [1, 1.02, 1],
        } : {}}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Electric flash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${color}80 0%, ${color}40 30%, transparent 60%)`,
          filter: 'blur(5px)'
        }}
        animate={{
          opacity: isFlashing ? 1 : 0,
          scale: isFlashing ? 1.1 : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut"
        }}
      />
      
      {/* Lightning effect lines */}
      {animated && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '2px',
            height: '100%',
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            left: `${30 + i * 20}%`,
            filter: 'blur(1px)'
          }}
          animate={{
            opacity: isFlashing ? [0, 1, 0] : 0,
            scaleY: isFlashing ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{
            duration: 0.15,
            delay: i * 0.05
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Rainbow Glow Effect
const RainbowGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  duration = 4,
  className = '',
  animated = true 
}) => {
  const colors = [
    '#ff0000', '#ff8000', '#ffff00', '#80ff00', 
    '#00ff00', '#00ff80', '#00ffff', '#0080ff', 
    '#0000ff', '#8000ff', '#ff00ff', '#ff0080'
  ];

  const intensityValues = {
    low: { opacity: 0.4, blur: 8 },
    medium: { opacity: 0.6, blur: 12 },
    high: { opacity: 0.8, blur: 16 },
    extreme: { opacity: 1, blur: 24 }
  };

  const { opacity, blur } = intensityValues[intensity];

  return (
    <div className={`relative ${className}`}>
      {/* Rainbow gradient glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
          filter: `blur(${blur}px)`,
          opacity: opacity
        }}
        animate={animated ? {
          rotate: [0, 360],
        } : {}}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Inner rainbow layer */}
      <motion.div
        className="absolute inset-2"
        style={{
          background: `conic-gradient(from 180deg, ${colors.join(', ')})`,
          filter: `blur(${blur / 2}px)`,
          opacity: opacity * 0.7
        }}
        animate={animated ? {
          rotate: [360, 0],
        } : {}}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Crystalline Glow Effect
const CrystallineGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  color = '#a855f7', 
  duration = 3,
  className = '',
  animated = true 
}) => {
  const facets = intensity === 'low' ? 6 : intensity === 'medium' ? 8 : intensity === 'high' ? 12 : 16;

  return (
    <div className={`relative ${className}`}>
      {/* Crystalline facets */}
      {animated && [...Array(facets)].map((_, i) => {
        const angle = (360 / facets) * i;
        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${angle}deg, transparent 0%, ${color}40 50%, transparent 100%)`,
              filter: 'blur(8px)',
              clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos((angle - 30) * Math.PI / 180)}% ${50 + 40 * Math.sin((angle - 30) * Math.PI / 180)}%, ${50 + 40 * Math.cos((angle + 30) * Math.PI / 180)}% ${50 + 40 * Math.sin((angle + 30) * Math.PI / 180)}%)`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i * duration) / facets
            }}
          />
        );
      })}
      
      {/* Central crystal glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${color}60 0%, ${color}20 30%, transparent 70%)`,
          filter: 'blur(12px)'
        }}
        animate={animated ? {
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Aurora Glow Effect
const AuroraGlow: React.FC<GlowEffectProps> = ({ 
  children, 
  intensity = 'medium', 
  duration = 8,
  className = '',
  animated = true 
}) => {
  const auroraColors = [
    '#00ff88', '#0088ff', '#8800ff', '#ff0088', '#ff8800'
  ];

  const waves = intensity === 'low' ? 2 : intensity === 'medium' ? 3 : intensity === 'high' ? 4 : 6;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora waves */}
      {animated && [...Array(waves)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${45 + i * 30}deg, transparent 0%, ${auroraColors[i % auroraColors.length]}40 30%, ${auroraColors[(i + 1) % auroraColors.length]}30 60%, transparent 100%)`,
            filter: `blur(${15 + i * 3}px)`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: duration + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * (duration / waves)
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Main GlowEffect Component
const GlowEffect: React.FC<GlowEffectProps> = ({ type, ...props }) => {
  const effectComponents = {
    neon: NeonGlow,
    pulse: PulseGlow,
    orbital: OrbitalGlow,
    particle: ParticleGlow,
    smoky: SmokyGlow,
    electric: ElectricGlow,
    rainbow: RainbowGlow,
    crystalline: CrystallineGlow,
    aurora: AuroraGlow,
    magnetic: PulseGlow, // Reuse pulse with different styling
    plasma: ElectricGlow, // Reuse electric with different styling
    quantum: OrbitalGlow, // Reuse orbital with different styling
  };

  const Component = effectComponents[type];
  
  if (!Component) {
    console.warn(`Unknown glow effect type: ${type}`);
    return <div>{props.children}</div>;
  }

  return <Component type={type} {...props} />;
};

export default GlowEffect;
export {
  NeonGlow,
  PulseGlow,
  OrbitalGlow,
  ParticleGlow,
  SmokyGlow,
  ElectricGlow,
  RainbowGlow,
  CrystallineGlow,
  AuroraGlow
};