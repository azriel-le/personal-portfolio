import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight, Github, Sparkles, Code2 } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'webapps' | 'platforms'>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'webapps') {
      return p.id === 'leave-management' || p.id === 'university-clearance';
    }
    if (selectedFilter === 'platforms') {
      return p.id === 'freelancer-connect' || p.id === 'ethio-craft-hub' || p.id === 'game-zone';
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-400">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span>02 / FEATURED WORKS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              CURATED PROJECTS EXHIBITION.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Each project represents a distinct problem space—from enterprise administrative systems and university clearance workflows to freelance marketplaces and cultural booking platforms.
            </p>
          </div>

          {/* Segmented Filter Bar */}
          <div className="flex items-center gap-1 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedFilter === 'all' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Works ({PROJECTS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('webapps')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedFilter === 'webapps' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Web Systems
            </button>
            <button
              onClick={() => setSelectedFilter('platforms')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedFilter === 'platforms' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Platforms & Marketplaces
            </button>
          </div>
        </div>

        {/* Project Showcase List - Custom Distinctive Cards */}
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative rounded-3xl glass-panel p-6 lg:p-8 border border-white/10 hover:border-violet-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* Asymmetric Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual Image Showcase Container */}
                <div className={`lg:col-span-7 relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-shadow">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                        project.id === 'leave-management' || project.id === 'freelancer-connect'
                          ? 'object-contain'
                          : 'object-cover'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-60" />

                    {/* Quick Inspection Floating Trigger */}
                    <div className="absolute inset-0 bg-violet-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center">
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold text-xs tracking-wide shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <span>Explore Full Architecture</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  
                  {/* Category Kicker */}
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="text-violet-400 font-bold">PROJECT {project.number}</span>
                    <span>·</span>
                    <span>{project.category}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Tagline & Short Description */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/25 flex items-center gap-2 transition-all"
                    >
                      <span>Project Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="p-2.5 text-slate-500 bg-white/5 border border-white/10 rounded-xl cursor-not-allowed opacity-50 transition-colors"
                      title="Source repository link disabled"
                    >
                      <Github className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
