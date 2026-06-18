import React, { useState, useEffect, useMemo } from 'react';
import { DeveloperProfile, Project, Skill } from './types';
import { DEFAULT_PROFILE } from './data';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import PortfolioEditor from './components/PortfolioEditor';
import { Search, Compass, Cpu, Briefcase, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'ai_studio_dev_portfolio_data';

export default function App() {
  // Load state from localStorage on init, or default
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load local portfolio state", e);
      }
    }
    return DEFAULT_PROFILE;
  });

  // Track if current state is modified from the default dataset
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Check if the current profile matches the default to allow the "Reset" button
    const isDefault = JSON.stringify(profile) === JSON.stringify(DEFAULT_PROFILE);
    setIsModified(!isDefault);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // View state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  // Filtering & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillTab, setActiveSkillTab] = useState<string>('All');

  // Categories list derived from real projects database
  const projectCategories = useMemo(() => {
    const cats = new Set(profile.projects.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [profile.projects]);

  // Skill categories list derived dynamically
  const skillCategories = useMemo(() => {
    const cats = new Set(profile.skills.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, [profile.skills]);

  // Handle data updates from editor
  const handleProfileChange = (updatedProfile: DeveloperProfile) => {
    setProfile(updatedProfile);
  };

  // Reset to original preset
  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to revert all changes and restore the default showpiece details and mock projects?')) {
      setProfile(DEFAULT_PROFILE);
      setIsCustomizerOpen(false);
    }
  };

  // Filter projects based on selected Category and search keywords
  const filteredProjects = useMemo(() => {
    return profile.projects.filter(project => {
      const matchCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const cleanQuery = searchQuery.toLowerCase().trim();
      const matchSearch = 
        cleanQuery === '' ||
        project.title.toLowerCase().includes(cleanQuery) ||
        project.subtitle.toLowerCase().includes(cleanQuery) ||
        project.description.toLowerCase().includes(cleanQuery) ||
        project.tags.some(t => t.toLowerCase().includes(cleanQuery)) ||
        (project.techStack && project.techStack.some(t => t.toLowerCase().includes(cleanQuery)));

      return matchCategory && matchSearch;
    });
  }, [profile.projects, selectedCategory, searchQuery]);

  // Split filtered projects into Featured and Standard buckets
  const featuredProjects = useMemo(() => {
    return filteredProjects.filter(p => p.featured);
  }, [filteredProjects]);

  const standardProjects = useMemo(() => {
    return filteredProjects.filter(p => !p.featured);
  }, [filteredProjects]);

  // Filter skills by technical category tab
  const filteredSkills = useMemo(() => {
    if (activeSkillTab === 'All') return profile.skills;
    return profile.skills.filter(s => s.category === activeSkillTab);
  }, [profile.skills, activeSkillTab]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col justify-between selection:bg-blue-600 selection:text-white" id="portfolio-app-root">
      
      {/* Top Banner Alert conveying client database capability */}
      <div className="bg-[#111111] text-slate-300 py-3 px-4 text-center text-[10px] font-mono border-b border-white/10 flex items-center justify-center gap-2 uppercase tracking-widest" id="top-alert-notif">
        <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 animate-pulse" />
        <span>Portfolio Compiler Active <strong className="text-white hover:underline">/ Edit Details Live</strong> with the toggle button</span>
      </div>

      {/* Primary Workspace container */}
      <div className="flex-1 flex flex-col md:flex-row relative" id="layout-split-pane">
        
        {/* LEFT VIEWPORT: The Actual Rendered Showcase Portfolio */}
        <div className="flex-1 overflow-y-auto bg-[#0A0A0A]" id="portfolio-showcase-view">
          
          {/* Hero Bio Banner Section */}
          <Header 
            profile={profile}
            onEditToggle={() => setIsCustomizerOpen(prev => !prev)}
            isEditing={isCustomizerOpen}
            onReset={handleResetToDefault}
            isModified={isModified}
          />

          <main className="max-w-7xl mx-auto px-6 py-16 space-y-20 mt-4" id="portfolio-main-content">
            
            {/* TECHNICAL SKILLS SECTION */}
            <section className="space-y-6" id="skills-arena">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tighter flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-blue-500" />
                    Technical Stack
                  </h2>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    core frameworks, toolchains, languages, and structural runtimes.
                  </p>
                </div>

                {/* Categorical filters tab strip inside skills list */}
                <div className="flex flex-wrap gap-1 bg-white/[0.02] border border-white/10 p-1 rounded-none" id="skill-filters-tablist">
                  {skillCategories.map((cat, idx) => (
                    <button
                      key={`${cat}-${idx}`}
                      onClick={() => setActiveSkillTab(cat)}
                      className={`px-4 py-2 text-[10px] font-mono font-bold transition-all uppercase tracking-widest cursor-pointer rounded-none ${
                        activeSkillTab === cat
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                      id={`skills-tab-${cat}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSkills.length === 0 ? (
                <div className="p-12 text-center bg-[#111111] border border-white/10">
                  <p className="text-slate-400 italic font-mono text-xs">No skills found in category {activeSkillTab}. You can edit these items in the Customizer drawer!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" id="skill-badges-grid">
                  {filteredSkills.map((sk, idx) => {
                    let levelClass = 'bg-white/[0.02] text-slate-300 border-white/10';
                    if (sk.level === 'Expert') levelClass = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
                    else if (sk.level === 'Advanced') levelClass = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
                    else if (sk.level === 'Intermediate') levelClass = 'bg-purple-500/10 text-purple-400 border-purple-500/20';

                    return (
                      <div
                        key={`${sk.name}-${idx}`}
                        className="p-4 rounded-none border border-white/10 bg-[#111111] hover:border-blue-500/30 hover:bg-white/[0.02] transition-all duration-200 group flex flex-col justify-between"
                        id={`skill-card-${idx}`}
                      >
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block truncate">
                          {sk.name}
                        </span>
                        
                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/5">
                          <span className="text-[9px] font-mono uppercase text-slate-500">
                            {sk.category}
                          </span>
                          <span className={`text-[8px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 border ${levelClass}`}>
                            {sk.level}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* PROJECTS SHOWCASE SECTION */}
            <section className="space-y-8" id="projects-arena">
              
              {/* Header and filters search controls component boundary */}
              <div className="flex flex-col gap-6" id="projects-controls-panel">
                <div className="space-y-1">
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tighter flex items-center gap-2">
                    <Compass className="w-6 h-6 text-blue-500" />
                    Product & Tool Showcase
                  </h2>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    a clean catalog of real-time web applications, command-line interfaces, and systems assets.
                  </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-none bg-[#111111] border border-white/10" id="search-filter-row">
                  
                  {/* Category badges strip */}
                  <div className="flex flex-wrap gap-1.5" id="category-filter-chips">
                    {projectCategories.map((cat, idx) => (
                      <button
                        key={`${cat}-${idx}`}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-blue-600 text-white border border-blue-500'
                            : 'bg-white/[0.02] border border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                        }`}
                        id={`category-btn-${idx}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Elegant Search Input */}
                  <div className="relative max-w-sm w-full" id="search-input-frame">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-none bg-[#0A0A0A] border border-white/10 focus:border-blue-500 focus:outline-none placeholder-slate-500 text-white transition-all"
                      placeholder="SEARCH TECH, STACK KEYWORDS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="input-project-search"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white font-mono cursor-pointer"
                        id="btn-clear-search"
                      >
                        [CLEAR]
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Zero state message */}
              {filteredProjects.length === 0 ? (
                <div className="py-20 text-center max-w-md mx-auto space-y-6 border border-white/10 bg-[#111111] p-8" id="projects-zero-state">
                  <div className="w-16 h-16 bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto" id="zero-state-icon">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-mono font-bold text-base text-white uppercase tracking-wider">No Showcase Matches</h3>
                    <p className="text-slate-400 text-xs font-mono lowercase leading-relaxed">
                      we couldn't locate any projects matching your specified filters. try searching tag keywords or create a new showcase.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider cursor-pointer"
                    id="btn-reset-filters"
                  >
                    // RESET FILTERS & SEARCH
                  </button>
                </div>
              ) : (
                <div className="space-y-12" id="grid-listings-wrapper">
                  
                  {/* FEATURED PROJECTS SUBGRID */}
                  {featuredProjects.length > 0 && (
                    <div className="space-y-4" id="featured-listings-arena">
                      <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        PREMIUM SPOTLIGHTS [{featuredProjects.length}]
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="grid-featured-cards">
                        {featuredProjects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onSelect={setSelectedProject}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STANDARD PROJECTS GRID */}
                  {standardProjects.length > 0 && (
                    <div className="space-y-4" id="standard-listings-arena">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        ALL CONTRIBUTIONS [{standardProjects.length}]
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="grid-standard-cards">
                        {standardProjects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onSelect={setSelectedProject}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </section>

          </main>
        </div>

        {/* RIGHT VIEWPORT: The Sliding Customizer Drawer */}
        {isCustomizerOpen && (
          <div className="relative flex-shrink-0 border-l border-white/10 bg-[#0E0E0E]" id="customizer-drawer-mount">
            <PortfolioEditor 
              profile={profile}
              onChange={handleProfileChange}
              onClose={() => setIsCustomizerOpen(false)}
            />
          </div>
        )}

      </div>

      {/* FOOTER BAR */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 py-12 px-6 text-center text-xs text-slate-500 font-mono" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="uppercase tracking-widest text-[10px] text-slate-400">CODENAME: alexrivera.dev // READY TO DEPLOY</span>
          <div className="flex gap-4">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Built with React + Tailwind v4 + Space Grotesk</span>
          </div>
        </div>
      </footer>

      {/* DETAIL WORKLOAD CASES - Slide-over/Dialog Modal rendering */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
