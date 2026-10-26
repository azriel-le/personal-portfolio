import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Database, Wrench, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES, SkillCategory } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const activeCategory: SkillCategory = SKILL_CATEGORIES[selectedCategoryIndex];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0b10]/80">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-400">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>03 / TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            STACK & SYSTEM ARCHITECTURE.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            A disciplined toolkit spanning modern frontend frameworks, backend APIs, relational database design, and efficient development tooling.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategoryIndex === idx;
            return (
              <button
                key={cat.category}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-violet-900/40 to-indigo-950/50 border-violet-500/50 shadow-xl shadow-violet-900/20'
                    : 'glass-panel hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                    {idx === 0 && <Layout className="w-5 h-5" />}
                    {idx === 1 && <Server className="w-5 h-5" />}
                    {idx === 2 && <Database className="w-5 h-5" />}
                    {idx === 3 && <Wrench className="w-5 h-5" />}
                  </div>
                  <span className="font-mono text-xs text-slate-400 font-semibold">{cat.skills.length} TECHS</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">{cat.category}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{cat.description}</p>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Matrix Grid */}
        <motion.div
          key={activeCategory.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-2xl text-white flex items-center gap-3">
                <span>{activeCategory.category}</span>
                <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  {activeCategory.skills.length} Core Skills
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">{activeCategory.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-violet-500/30 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {skill.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {skill.description}
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-violet-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                  <span>Level: {skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
