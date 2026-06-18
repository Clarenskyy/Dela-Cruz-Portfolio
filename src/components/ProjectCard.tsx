import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github, ArrowUpRight, Star, Heart } from 'lucide-react';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  // Extract project initials for the mockup screenshot overlay
  const getInitials = (title: string) => {
    return title
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  };

  return (
    <article
      className="group relative flex flex-col h-full bg-[#111111] rounded-none border border-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
      id={`project-card-${project.id}`}
    >
      {/* Visual Header Grid Gradient */}
      <div 
        className={`relative w-full h-40 bg-gradient-to-br ${project.imageTheme || 'from-blue-900/60 to-slate-950'} p-6 flex flex-col justify-between overflow-hidden border-b border-white/5`}
        id={`card-gradient-${project.id}`}
      >
        {/* Abstract design elements representation (dot-grid overlay matching code editor background) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/5 via-transparent to-transparent opacity-60" />
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-900/20 rounded-full blur-xl pointer-events-none" />
        
        {/* Top bar of gradient card header */}
        <div className="flex items-center justify-between relative z-10">
          <span className="px-2.5 py-1 text-[9px] font-mono font-bold bg-[#0A0A0A] text-blue-400 border border-blue-500/20 uppercase tracking-widest" id={`category-${project.id}`}>
            {project.category}
          </span>
          
          {project.featured && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold bg-blue-500 text-white uppercase tracking-widest" id={`badge-featured-${project.id}`}>
              <Star className="w-3 h-3 fill-white" />
              SPOTLIGHT
            </span>
          )}
        </div>

        {/* Dynamic Mock Interface overlay representing the applet initials */}
        <div className="flex items-end justify-between relative z-10" id={`mock-interface-${project.id}`}>
          <div>
            <span className="text-4xl font-mono font-black tracking-widest text-white/20 block select-none md:group-hover:text-white/40 transition-colors duration-200">
              {getInitials(project.title)}
            </span>
          </div>
          
          {/* Subtle decorative code tag mockup */}
          <span className="text-[9px] font-mono text-white/50 bg-[#0A0A0A]/60 px-2 py-0.5 border border-white/5 select-none uppercase tracking-wider">
            &lt;/&gt; src
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#111111]" id={`card-content-${project.id}`}>
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-display font-black text-2xl text-white group-hover:text-blue-400 transition-colors duration-200 tracking-tight uppercase leading-tight" id={`project-title-${project.id}`}>
              {project.title}
            </h3>
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold" id={`project-subtitle-${project.id}`}>
              {project.subtitle}
            </p>
          </div>

          <p className="text-slate-400 font-sans text-sm line-clamp-3 leading-relaxed" id={`project-desc-${project.id}`}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2" id={`project-tags-div-${project.id}`}>
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="px-2.5 py-0.5 text-[10px] font-mono bg-white/[0.02] text-slate-400 border border-white/5 uppercase tracking-wider"
                id={`tag-${project.id}-${idx}`}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-[#141414] text-[#A0A0A0] border border-white/5 uppercase tracking-wider">
                +{project.tags.length - 4} OTHER
              </span>
            )}
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5 gap-2" id={`project-actions-${project.id}`}>
          <button
            onClick={() => onSelect(project)}
            className="flex-1 inline-flex items-center justify-center gap-1 bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider py-2.5 cursor-pointer transition-all duration-200"
            id={`btn-view-details-${project.id}`}
          >
            <span>VIEW CODECASE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
                title="View Source Code"
                id={`link-repo-${project.id}`}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/5 border border-white/10 hover:border-blue-500/20 transition-all duration-200"
                title="View Live Demo"
                id={`link-live-${project.id}`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
