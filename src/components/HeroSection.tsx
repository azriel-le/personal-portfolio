import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, MapPin, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full my-auto">
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Editorial Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-wider w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>CRAFTING DIGITAL EXPERIENCES</span>
            </motion.div>

            {/* Giant Expressive Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-wrap-balance"
            >
              I BUILD DIGITAL EXPERIENCES THAT{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 text-glow">
                FEEL DIFFERENT.
              </span>
            </motion.h1>

            {/* Professional Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              I'm <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>, a Software Engineer and Creative Developer based in Ethiopia. Graduated with a B.Sc. in Software Engineering from Wolkite University, specializing in interactive frontend architecture, responsive web systems, and high-performance applications.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 rounded-xl shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                Let's Connect
              </a>

              {/* Quick Social Links */}
              <div className="flex items-center gap-2 ml-auto sm:ml-0 pl-2 border-l border-white/10">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Metadata Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-4"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.education}</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <Hero3D />
          </motion.div>

        </div>

        {/* Full-width Stats Bar Below Split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col space-y-1">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400">{stat.label}</span>
              <span className="text-lg sm:text-xl font-bold font-display text-white tracking-tight">{stat.value}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-8 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="hidden sm:inline-block">SCROLL TO DISCOVER</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1 mx-auto sm:mx-0">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-violet-400"
          />
        </div>
        <span className="hidden sm:inline-block">2026 EDITION</span>
      </div>
    </section>
  );
};
