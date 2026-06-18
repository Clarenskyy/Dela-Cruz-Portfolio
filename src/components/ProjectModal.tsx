import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Wrench, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
      id="modal-overlay"
    >
      <div
        className="relative bg-[#0E0E0E] w-full max-w-3xl rounded-none border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh] animate-slideUp animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        id="modal-container"
      >
        
        {/* Color Gradient Banner with close trigger */}
        <div 
          className={`h-32 sm:h-40 bg-gradient-to-br ${project.imageTheme || 'from-blue-900/60 to-slate-950'} relative p-6 sm:p-8 flex items-end justify-between overflow-hidden border-b border-white/5`}
          id="modal-banner"
        >
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          <span className="relative z-10 px-3 py-1 bg-[#0A0A0A] border border-blue-500/30 text-blue-400 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest">
            {project.category}
          </span>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-none border border-white/15 transition-colors duration-150 z-20 cursor-pointer"
            aria-label="Close modal"
            id="btn-close-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8" id="modal-content-body">
          
          {/* Main Titles */}
          <div className="space-y-2">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tighter uppercase leading-tight" id="modal-project-title">
              {project.title}
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-500 font-bold" id="modal-project-subtitle">
              // {project.subtitle}
            </p>
          </div>

          {/* Call-to-actions directly available at top is very useful */}
          <div className="flex flex-wrap gap-3" id="modal-project-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-blue-600 text-white hover:bg-blue-700 font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer border border-blue-500"
                id="modal-live-link"
              >
                <span>LAUNCH DEPLOYMENT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 border border-white/10 cursor-pointer"
                id="modal-repo-link"
              >
                <Github className="w-4 h-4" />
                <span>VIEW STORAGE TREE</span>
              </a>
            )}
          </div>

          {/* Project Details section */}
          <div className="space-y-4" id="modal-project-summary">
            <h3 className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-500" />
              PROJECT ARCHITECTURE
            </h3>
            <div className="text-slate-300 font-sans leading-relaxed space-y-4 text-base">
              <p id="modal-short-desc">{project.description}</p>
              {project.extendedDescription && (
                <p className="border-l-2 border-blue-500 pl-4 py-1 bg-white/[0.01] text-slate-400 font-sans italic text-sm" id="modal-extended-desc">
                  {project.extendedDescription}
                </p>
              )}
            </div>
          </div>

          {/* Key Deliverables/Features list */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-4" id="modal-project-features">
              <h3 className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                KEY FEATURES & DELIVERABLES
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="modal-features-list">
                {project.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-none bg-[#141414] border border-white/5 text-sm text-slate-300 font-sans"
                    id={`feature-item-${idx}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Complete Tech stack used description cards */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="space-y-4 animate-fadeIn" id="modal-project-tech-stack">
              <h3 className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-500 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-blue-500" />
                SYSTEM INTEGRATIONS
              </h3>
              <div className="flex flex-wrap gap-1.5" id="modal-tech-stack-pills">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={`${tech}-${idx}`}
                    className="px-3.5 py-1.5 rounded-none text-xs font-mono font-bold bg-white/[0.02] text-slate-300 border border-white/10 uppercase tracking-wider"
                    id={`tech-${idx}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info box */}
        <div className="bg-[#0B0B0B] border-t border-white/10 px-6 sm:px-8 py-4 flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          <span>PROJECT REVISION: {project.id}</span>
          <span>COMPLIANCE: SEAMLESS V4</span>
        </div>

      </div>
    </div>
  );
}
