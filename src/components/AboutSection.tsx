import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, Code, Compass, Cpu, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

import portraitImg from '../assets/images/474784kdhd.png';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'education' | 'overview'>('philosophy');

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0a0b10]/60">
      {/* Background Lighting Grid */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-400">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>01 / ABOUT & PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            ENGINEERING WITH INTENT & PRECISION.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Building software requires a balance between architectural discipline, user-centric interface design, and continuous technical evolution.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Quick Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center lg:justify-start relative"
          >
            {/* Ambient Backlight Glow for Portrait */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-violet-600/20 to-indigo-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[350px] rounded-3xl overflow-hidden glass-panel p-3 border border-white/10 group shadow-2xl shadow-violet-950/20 hover:border-violet-500/30 transition-all duration-500">
              {/* Portrait Image */}
              <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] rounded-2xl overflow-hidden bg-slate-900/60">
                <img
                  src={portraitImg}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/30 to-transparent opacity-85" />
                
                {/* Overlay Monogram Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-base text-white leading-tight">{PERSONAL_INFO.name}</h3>
                      <p className="text-[11px] text-violet-300 font-medium mt-0.5">{PERSONAL_INFO.shortTitle}</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Available for work" />
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-3 p-1 text-xs font-mono text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 hover:bg-white/[0.05] transition-colors">
                  <GraduationCap className="w-4 h-4 text-violet-400 shrink-0" />
                  <div className="truncate">
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wider">Degree</span>
                    <span className="font-semibold text-white text-[11px] truncate">B.Sc. Software Eng.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 hover:bg-white/[0.05] transition-colors">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wider">Location</span>
                    <span className="font-semibold text-white text-[11px] truncate">Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Philosophy Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Editorial Statement */}
            <blockquote className="text-xl sm:text-2xl font-display font-medium text-slate-200 leading-snug border-l-2 border-violet-500 pl-6">
              "Great software isn't just about code that executes—it's about creating intuitive systems that solve real problems with speed and clarity."
            </blockquote>

            {/* Professional Biography */}
            <p className="text-slate-300 text-base leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'philosophy' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Engineering Philosophy
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'education' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Education & Background
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'philosophy' && (
              <div className="space-y-4">
                {PERSONAL_INFO.philosophy.map((item, idx) => (
                  <div key={item.title} className="p-5 rounded-2xl glass-panel glass-panel-hover flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0 font-mono text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base">{item.title}</h4>
                      <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="p-6 rounded-2xl glass-panel space-y-4 border border-violet-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">{PERSONAL_INFO.education}</h4>
                    <p className="text-xs text-violet-300 font-mono mt-0.5">{PERSONAL_INFO.university} · Ethiopia</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    Completed
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  Earned a B.Sc. degree in Software Engineering with intensive coursework in software architecture, algorithm optimization, database systems, object-oriented software development, web engineering, and software project management.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {[
                    'Object-Oriented Software Engineering',
                    'Database Management Systems (PostgreSQL/MySQL)',
                    'Algorithms & Data Structures',
                    'Web Application Architecture & REST APIs',
                    'Software Quality Assurance & Testing',
                    'Agile Project Methodologies'
                  ].map((course) => (
                    <div key={course} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
