import React from 'react';
import { motion } from 'framer-motion';
import MetaTags from '../components/MetaTags';
import HeroSection from '../components/HeroSection';
import SkillsVisualization from '../components/SkillsVisualization';
import InteractiveTimeline from '../components/InteractiveTimeline';
import EnhancedContactForm from '../components/EnhancedContactForm';
import FeaturedProjectsCarousel from '../components/FeaturedProjectsCarousel';
import AnimatedBackground, { FloatingShapes } from '../components/AnimatedBackground';
import EnhancedTechAnimation from '../components/EnhancedTechAnimation';
import AtmosphericSmoke from '../components/AtmosphericSmoke';
import AnimatedLogos from '../components/AnimatedLogos';
import { ScrollNavigation, ScrollFadeIn, ParallaxSection } from '../components/ScrollUtils';
import { PROJECTS } from '../lib/data';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { optimizedFadeIn } from '../lib/optimizedAnimations';

const HomePage: React.FC = () => {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <MetaTags
        title="Aditya Kumar | Full-Stack Developer & AI Integration Specialist"
        description="Welcome to the portfolio of Aditya Kumar, a passionate Computer Science student specializing in full-stack development with React, TypeScript, and AI integration. Explore my projects, skills, and professional journey."
        keywords="Aditya Kumar, Portfolio, Full-Stack Developer, React, TypeScript, AI Integration, Web Developer, Computer Science Student, MERN Stack"
      />
      
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 min-h-screen w-full">
        {/* Solid Background Fill to eliminate any gaps */}
        <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 z-[-1]" />
        
        {/* Scroll Navigation */}
        <ScrollNavigation />
        
        {/* Full-Page Animated Background with Enhanced Geometric Shapes */}
        <ParallaxSection speed={0.3}>
          <AnimatedBackground variant="fullpage" className="fixed inset-0 z-0" />
        </ParallaxSection>
        
        {/* Atmospheric Smoke Effects */}
        <ParallaxSection speed={0.2}>
          <AtmosphericSmoke />
        </ParallaxSection>
        
        {/* Additional Floating Shapes Layer */}
        <ParallaxSection speed={0.4}>
          <FloatingShapes />
        </ParallaxSection>
        
        {/* Enhanced Tech Animation with Smoke Effects */}
        <ParallaxSection speed={0.1}>
          <EnhancedTechAnimation />
        </ParallaxSection>
        
        {/* Animated Floating Logos */}
        <ParallaxSection speed={0.25}>
          <AnimatedLogos />
        </ParallaxSection>
        
        {/* Enhanced Hero Section */}
        <section id="home" className="relative z-10">
          <HeroSection />
        </section>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <ScrollFadeIn>
            <motion.section 
              id="projects"
              className="relative py-20 z-10"
              {...(shouldReduceMotion ? {} : optimizedFadeIn)}
            >
              <div className="max-w-6xl mx-auto px-6">
                <motion.div
                  className="text-center mb-16"
                  {...(shouldReduceMotion ? {} : optimizedFadeIn)}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-300 to-gray-200 bg-clip-text text-transparent">
                    Featured Projects
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Explore my latest work showcasing modern web development with cutting-edge technologies
                  </p>
                </motion.div>
                <FeaturedProjectsCarousel projects={featuredProjects} />
              </div>
            </motion.section>
          </ScrollFadeIn>
        )}

        {/* Skills Visualization Section */}
        <ScrollFadeIn>
          <section id="skills" className="relative z-10">
            <SkillsVisualization />
          </section>
        </ScrollFadeIn>

        {/* Interactive Timeline Section */}
        <ScrollFadeIn>
          <section id="timeline" className="relative z-10">
            <InteractiveTimeline />
          </section>
        </ScrollFadeIn>

        {/* Enhanced Contact Form */}
        <ScrollFadeIn>
          <section id="contact" className="relative z-10">
            <EnhancedContactForm />
          </section>
        </ScrollFadeIn>
      </div>
    </>
  );
};

export default HomePage;