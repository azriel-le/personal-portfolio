import React from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050508] border-t border-white/10 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-white text-sm tracking-tight">{PERSONAL_INFO.name}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">SOFTWARE ENGINEER</span>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-1.5 text-center text-slate-400">
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Engineered with React, Three.js & Tailwind.</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
          aria-label="Back to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
