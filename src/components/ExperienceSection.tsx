import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award, Compass, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-400">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>04 / JOURNEY & MILESTONES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            TIMELINE & TECHNICAL EVOLUTION.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            From university software engineering education to full-stack project delivery and continuous backend expansion.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCE_TIMELINE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0d0e15] border-2 border-violet-500 flex items-center justify-center text-violet-300 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                {item.type === 'education' && <GraduationCap className="w-4 h-4" />}
                {item.type === 'project' && <Briefcase className="w-4 h-4" />}
                {item.type === 'milestone' && <Award className="w-4 h-4" />}
                {item.type === 'goal' && <Compass className="w-4 h-4" />}
              </div>

              {/* Timeline Content Card */}
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-violet-500/30 transition-all space-y-4">
                
                {/* Card Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono text-xs font-semibold">
                    {item.period}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-violet-400 font-medium mt-1">
                    {item.organization}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Achievements Bullet List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <h4 className="text-xs font-mono uppercase text-slate-400">Key Highlights</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {item.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
