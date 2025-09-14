import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlowEffect, { GlowEffectType } from './GlowEffects';

const GlowEffectsDemo: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState<GlowEffectType>('neon');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high' | 'extreme'>('medium');
  const [animated, setAnimated] = useState(true);

  const glowEffects: Array<{
    type: GlowEffectType;
    name: string;
    description: string;
    color: string;
    icon: string;
  }> = [
    {
      type: 'neon',
      name: 'Neon Glow',
      description: 'Classic neon sign effect with bright, electric colors',
      color: '#00ffff',
      icon: '⚡'
    },
    {
      type: 'pulse',
      name: 'Pulse Glow',
      description: 'Rhythmic pulsing effect with breathing animation',
      color: '#8b5cf6',
      icon: '💜'
    },
    {
      type: 'orbital',
      name: 'Orbital Glow',
      description: 'Particles orbiting around the element',
      color: '#06b6d4',
      icon: '🌌'
    },
    {
      type: 'particle',
      name: 'Particle Glow',
      description: 'Floating particles creating ambient lighting',
      color: '#f59e0b',
      icon: '✨'
    },
    {
      type: 'smoky',
      name: 'Smoky Glow',
      description: 'Soft, diffused glow like smoke or mist',
      color: '#6b7280',
      icon: '💨'
    },
    {
      type: 'electric',
      name: 'Electric Glow',
      description: 'Lightning-like flashes and electrical energy',
      color: '#3b82f6',
      icon: '⚡'
    },
    {
      type: 'rainbow',
      name: 'Rainbow Glow',
      description: 'Dynamic rainbow spectrum cycling effect',
      color: '#ff0080',
      icon: '🌈'
    },
    {
      type: 'crystalline',
      name: 'Crystalline Glow',
      description: 'Faceted crystal-like light reflections',
      color: '#a855f7',
      icon: '💎'
    },
    {
      type: 'aurora',
      name: 'Aurora Glow',
      description: 'Northern lights inspired flowing effect',
      color: '#00ff88',
      icon: '🌊'
    },
    {
      type: 'magnetic',
      name: 'Magnetic Glow',
      description: 'Magnetic field visualization with attraction',
      color: '#ef4444',
      icon: '🧲'
    },
    {
      type: 'plasma',
      name: 'Plasma Glow',
      description: 'High-energy plasma ball effect',
      color: '#10b981',
      icon: '⚛️'
    },
    {
      type: 'quantum',
      name: 'Quantum Glow',
      description: 'Quantum particle entanglement visualization',
      color: '#f97316',
      icon: '🔬'
    }
  ];

  const currentEffect = glowEffects.find(effect => effect.type === selectedEffect);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlowEffect type="neon" color="#00ffff" intensity="high">
            <h1 className="text-6xl font-bold mb-4">Glow Effects Showcase</h1>
          </GlowEffect>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience a variety of stunning glow effects for your modern web applications.
            Each effect is customizable with different intensities, colors, and animations.
          </p>
        </motion.div>

        {/* Main Demo Area */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Effect Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Select Effect</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {glowEffects.map((effect) => (
                <motion.button
                  key={effect.type}
                  className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                    selectedEffect === effect.type
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedEffect(effect.type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{effect.icon}</span>
                    <div>
                      <h3 className="font-semibold">{effect.name}</h3>
                      <p className="text-sm text-gray-400">{effect.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Demo Display */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{currentEffect?.name}</h2>
                <p className="text-gray-400">{currentEffect?.description}</p>
              </div>

              {/* Demo Element */}
              <div className="flex items-center justify-center h-64 mb-8">
                <GlowEffect
                  type={selectedEffect}
                  intensity={intensity}
                  color={currentEffect?.color || '#ffffff'}
                  animated={animated}
                  interactive={true}
                  className="cursor-pointer"
                >
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-600">
                    <div className="text-center">
                      <span className="text-4xl mb-4 block">{currentEffect?.icon}</span>
                      <h3 className="text-2xl font-bold mb-2">{currentEffect?.name}</h3>
                      <p className="text-gray-300">Hover to interact</p>
                    </div>
                  </div>
                </GlowEffect>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Intensity Control */}
                <div>
                  <label className="block text-sm font-medium mb-3">Intensity</label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high', 'extreme'] as const).map((level) => (
                      <button
                        key={level}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          intensity === level
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setIntensity(level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animation Toggle */}
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={animated}
                      onChange={(e) => setAnimated(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium">Enable Animation</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Showcase */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">All Effects Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {glowEffects.map((effect, index) => (
              <motion.div
                key={effect.type}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowEffect
                  type={effect.type}
                  color={effect.color}
                  intensity="medium"
                  animated={true}
                  interactive={true}
                  className="cursor-pointer"
                >
                  <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-all duration-300">
                    <div className="text-center">
                      <span className="text-3xl mb-3 block">{effect.icon}</span>
                      <h3 className="font-bold mb-1">{effect.name}</h3>
                      <p className="text-sm text-gray-400">{effect.description}</p>
                    </div>
                  </div>
                </GlowEffect>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Usage Example */}
        <motion.div
          className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Usage Example</h2>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">
{`import GlowEffect from './components/GlowEffects';

// Basic usage
<GlowEffect type="neon" color="#00ffff">
  <button>Click me!</button>
</GlowEffect>

// With custom properties
<GlowEffect 
  type="pulse" 
  intensity="high" 
  color="#8b5cf6"
  duration={3}
  animated={true}
  interactive={true}
>
  <div>Your content here</div>
</GlowEffect>`}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GlowEffectsDemo;