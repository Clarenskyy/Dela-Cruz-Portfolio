import React, { useState } from 'react';
import { DeveloperProfile, Skill, Project } from '../types';
import { X, Plus, Trash2, Edit2, Copy, Check, Info, FileCode } from 'lucide-react';

interface PortfolioEditorProps {
  profile: DeveloperProfile;
  onChange: (updatedProfile: DeveloperProfile) => void;
  onClose: () => void;
}

const GRADIENTS = [
  { name: 'Indigo-Fuchsia', value: 'from-indigo-600 via-purple-600 to-pink-600' },
  { name: 'Emerald-Cyan', value: 'from-emerald-500 via-teal-600 to-cyan-500' },
  { name: 'Rose-Violet', value: 'from-pink-500 to-rose-600' },
  { name: 'Amber-Orange', value: 'from-amber-500 to-orange-600' },
  { name: 'Blue-indigo', value: 'from-blue-600 to-indigo-600' },
  { name: 'Slate-Charcoal', value: 'from-slate-700 to-slate-900' }
];

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'AI / Data', 'Other'] as const;
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
const PROJECT_CATEGORIES = ['Web App', 'Library / Tool', 'AI & Analytics', 'Mobile', 'Design / UI'] as const;

export default function PortfolioEditor({ profile, onChange, onClose }: PortfolioEditorProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'export'>('profile');
  
  // Local state for adding a skill
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    category: 'Frontend',
    level: 'Advanced'
  });

  // Local state for editing/adding a project
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    description: '',
    extendedDescription: '',
    liveUrl: '',
    repoUrl: '',
    tags: [],
    category: 'Web App',
    featured: false,
    imageTheme: GRADIENTS[0].value,
    features: [],
    techStack: []
  });

  // Helper tags inputs
  const [tagsInput, setTagsInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Handle standard field change for root profile properties
  const handleProfileFieldChange = (field: keyof DeveloperProfile, value: any) => {
    onChange({
      ...profile,
      [field]: value
    });
  };

  // Handle nested profile socials fields
  const handleSocialFieldChange = (field: string, value: string) => {
    onChange({
      ...profile,
      socials: {
        ...profile.socials,
        [field]: value
      }
    });
  };

  // Add a skill to listing
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const updatedSkills = [...profile.skills, { ...newSkill, name: newSkill.name.trim() }];
    onChange({
      ...profile,
      skills: updatedSkills
    });

    setNewSkill({ name: '', category: 'Frontend', level: 'Advanced' });
  };

  // Delete a skill
  const handleDeleteSkill = (indexToDelete: number) => {
    const updatedSkills = profile.skills.filter((_, idx) => idx !== indexToDelete);
    onChange({
      ...profile,
      skills: updatedSkills
    });
  };

  // Initialize form for adding project
  const startAddProject = () => {
    setIsAddingProject(true);
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      subtitle: '',
      description: '',
      extendedDescription: '',
      liveUrl: '',
      repoUrl: '',
      tags: [],
      category: 'Web App',
      featured: false,
      imageTheme: GRADIENTS[0].value,
      features: [],
      techStack: []
    });
    setTagsInput('');
    setTechInput('');
    setNewFeatureInput('');
  };

  // Initialize form for editing project
  const startEditProject = (project: Project) => {
    setIsAddingProject(false);
    setEditingProjectId(project.id);
    setProjectForm({ ...project });
    setTagsInput(project.tags.join(', '));
    setTechInput(project.techStack?.join(', ') || '');
    setNewFeatureInput('');
  };

  // Save the project form (Add or Edit)
  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title?.trim() || !projectForm.description?.trim()) {
      alert('Project Title and Short Description are required.');
      return;
    }

    // Process Tags and Tech input comma values
    const processedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const processedTech = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const finalizedProject: Project = {
      id: editingProjectId || `proj-${Date.now()}`,
      title: projectForm.title.trim(),
      subtitle: (projectForm.subtitle || '').trim(),
      description: projectForm.description.trim(),
      extendedDescription: (projectForm.extendedDescription || '').trim(),
      liveUrl: (projectForm.liveUrl || '').trim(),
      repoUrl: (projectForm.repoUrl || '').trim(),
      tags: processedTags,
      category: projectForm.category || 'Web App',
      featured: !!projectForm.featured,
      imageTheme: projectForm.imageTheme || GRADIENTS[0].value,
      features: projectForm.features || [],
      techStack: processedTech
    };

    let updatedProjects: Project[];
    if (editingProjectId) {
      updatedProjects = profile.projects.map(p => p.id === editingProjectId ? finalizedProject : p);
    } else {
      updatedProjects = [...profile.projects, finalizedProject];
    }

    onChange({
      ...profile,
      projects: updatedProjects
    });

    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  // Delete project
  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = profile.projects.filter(p => p.id !== projectId);
    onChange({
      ...profile,
      projects: updatedProjects
    });
    if (editingProjectId === projectId) {
      setEditingProjectId(null);
      setIsAddingProject(false);
    }
  };

  // Add a feature checklist item
  const handleAddFeatureItem = () => {
    if (!newFeatureInput.trim()) return;
    const currentFeatures = projectForm.features || [];
    setProjectForm({
      ...projectForm,
      features: [...currentFeatures, newFeatureInput.trim()]
    });
    setNewFeatureInput('');
  };

  // Delete feature list item
  const handleDeleteFeatureItem = (idxToDelete: number) => {
    const currentFeatures = projectForm.features || [];
    setProjectForm({
      ...projectForm,
      features: currentFeatures.filter((_, idx) => idx !== idxToDelete)
    });
  };

  // Import-Export tool
  const [copied, setCopied] = useState(false);
  const copyConfigToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(profile, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const handleImportConfig = () => {
    try {
      setImportError('');
      setImportSuccess(false);
      const parsed = JSON.parse(importText);
      
      // Simple validation checks
      if (!parsed.name || !parsed.title || !Array.isArray(parsed.projects)) {
        throw new Error('Config missing mandatory fields (name, title, projects).');
      }

      onChange(parsed);
      setImportSuccess(true);
      setImportText('');
    } catch (err: any) {
      setImportError(err.message || 'Invalid JSON format. Please double check.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 w-full md:max-w-md border-l border-slate-800" id="editor-container">
      {/* Editor Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950" id="editor-header">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-indigo-500 text-white text-xs font-mono font-semibold">EDIT</span>
          <h2 className="font-display font-semibold text-lg text-white">Portfolio Settings</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close Customizer"
          id="btn-close-editor"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Internal Navigation Tabs */}
      <nav className="flex divide-x divide-slate-800 bg-slate-950/50 border-b border-slate-800 text-xs font-mono font-medium" id="editor-nav">
        <button
          onClick={() => { setActiveTab('profile'); setEditingProjectId(null); setIsAddingProject(false); }}
          className={`flex-1 py-3 text-center transition-colors ${activeTab === 'profile' ? 'text-indigo-400 bg-slate-900 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/30'}`}
          id="tab-edit-profile"
        >
          Bio / Social
        </button>
        <button
          onClick={() => { setActiveTab('skills'); setEditingProjectId(null); setIsAddingProject(false); }}
          className={`flex-1 py-3 text-center transition-colors ${activeTab === 'skills' ? 'text-indigo-400 bg-slate-900 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/30'}`}
          id="tab-edit-skills"
        >
          Skills ({profile.skills.length})
        </button>
        <button
          onClick={() => { setActiveTab('projects'); }}
          className={`flex-1 py-3 text-center transition-colors ${activeTab === 'projects' ? 'text-indigo-400 bg-slate-900 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/30'}`}
          id="tab-edit-projects"
        >
          Projects ({profile.projects.length})
        </button>
        <button
          onClick={() => { setActiveTab('export'); setEditingProjectId(null); setIsAddingProject(false); }}
          className={`flex-1 py-3 text-center transition-colors ${activeTab === 'export' ? 'text-indigo-400 bg-slate-900 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/30'}`}
          id="tab-export-config"
        >
          Config
        </button>
      </nav>

      {/* Editor Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6" id="editor-body">
        
        {/* TAB 1: Profile & Socials Form */}
        {activeTab === 'profile' && (
          <div className="space-y-5" id="form-profile-section">
            <h3 className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400 border-b border-slate-800 pb-2">Developer Biomarker Settings</h3>
            
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-prof-name">Full Name</label>
              <input
                id="input-prof-name"
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                placeholder="Alex Rivera"
                required
              />
            </div>

            {/* Spec Title */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-prof-title">Role / Subtitle</label>
              <input
                id="input-prof-title"
                type="text"
                value={profile.title}
                onChange={(e) => handleProfileFieldChange('title', e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                placeholder="Principal Full-Stack Engineer"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-prof-loc">Location</label>
              <input
                id="input-prof-loc"
                type="text"
                value={profile.location}
                onChange={(e) => handleProfileFieldChange('location', e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                placeholder="San Francisco, CA (Remote)"
              />
            </div>

            {/* Quick Slogan Pitch */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-prof-bio">Short Pitch</label>
              <textarea
                id="input-prof-bio"
                rows={3}
                value={profile.bio}
                onChange={(e) => handleProfileFieldChange('bio', e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors resize-none"
                placeholder="Short elevator pitch..."
              />
            </div>

            {/* Avatar customizations */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-prof-char">Avatar Badge Emoji / Icon</label>
                <input
                  id="input-prof-char"
                  type="text"
                  maxLength={2}
                  value={profile.avatarChar}
                  onChange={(e) => handleProfileFieldChange('avatarChar', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-center text-slate-100 transition-colors"
                  placeholder="⚡"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-prof-hiring">Availability Status</label>
                <div className="flex items-center h-full">
                  <input
                    id="input-prof-hiring"
                    type="checkbox"
                    checked={profile.availableForHire}
                    onChange={(e) => handleProfileFieldChange('availableForHire', e.target.checked)}
                    className="w-4 h-4 text-indigo-500 bg-slate-950 rounded border-slate-800 focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="ml-2 text-xs font-mono text-slate-300">Available for Hire</span>
                </div>
              </div>
            </div>

            {/* Avatar Gradient Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300 font-mono">Avatar Gradient theme</label>
              <div className="flex flex-wrap gap-2">
                {GRADIENTS.map((g, idx) => (
                  <button
                    key={`${g.name}-${idx}`}
                    type="button"
                    onClick={() => handleProfileFieldChange('avatarColor', g.value)}
                    className={`w-7 h-7 rounded-full bg-gradient-to-tr ${g.value} border-2 ${profile.avatarColor === g.value ? 'border-white scale-110 shadow-lg' : 'border-slate-800 hover:border-slate-400'} transition-all`}
                    title={g.name}
                  />
                ))}
              </div>
            </div>

            {/* Section 2: Personal Social Links */}
            <h3 className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400 border-b border-slate-800 pt-4 pb-2">Digital Footprints</h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-social-github">GitHub Profile URL</label>
                <input
                  id="input-social-github"
                  type="url"
                  value={profile.socials.github || ''}
                  onChange={(e) => handleSocialFieldChange('github', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-social-linkedin">LinkedIn Profile URL</label>
                <input
                  id="input-social-linkedin"
                  type="url"
                  value={profile.socials.linkedin || ''}
                  onChange={(e) => handleSocialFieldChange('linkedin', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-social-twitter">Twitter / X URL</label>
                <input
                  id="input-social-twitter"
                  type="url"
                  value={profile.socials.twitter || ''}
                  onChange={(e) => handleSocialFieldChange('twitter', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-social-email">Public Email</label>
                <input
                  id="input-social-email"
                  type="email"
                  value={profile.socials.email || ''}
                  onChange={(e) => handleSocialFieldChange('email', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="input-social-site">Personal Website URL</label>
                <input
                  id="input-social-site"
                  type="url"
                  value={profile.socials.website || ''}
                  onChange={(e) => handleSocialFieldChange('website', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 transition-colors"
                  placeholder="https://alexrivera.dev"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Skills Setup Form */}
        {activeTab === 'skills' && (
          <div className="space-y-5" id="form-skills-section">
            <h3 className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400 border-b border-slate-800 pb-2">Technical Skill Matrix</h3>

            {/* Skills Form Adder */}
            <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3" id="skill-adder-form">
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-indigo-400 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                Add Technical Skill Badge
              </span>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-slate-400 font-mono" htmlFor="input-skill-name">Technology Name</label>
                <input
                  id="input-skill-name"
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                  placeholder="e.g., GraphQL"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-slate-400 font-mono" htmlFor="select-skill-cat">Category</label>
                  <select
                    id="select-skill-cat"
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill['category'] })}
                    className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    {SKILL_CATEGORIES.map((cat, idx) => (
                      <option key={`${cat}-${idx}`} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-slate-400 font-mono" htmlFor="select-skill-lvl">Proficiency Level</label>
                  <select
                    id="select-skill-lvl"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill['level'] })}
                    className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    {SKILL_LEVELS.map((lvl, idx) => (
                      <option key={`${lvl}-${idx}`} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 font-mono text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                id="btn-submit-skill"
              >
                Insert Skill Badge
              </button>
            </form>

            <div className="space-y-2" id="skills-catalog-list">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block font-semibold pb-1">Current Skillset Matrix ({profile.skills.length})</span>
              {profile.skills.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-3 text-center bg-slate-950 rounded-lg">No skill badges defined yet.</p>
              ) : (
                <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl overflow-hidden border border-slate-800" id="current-skills-list-block">
                  {profile.skills.map((sk, index) => (
                    <div 
                      key={`${sk.name}-${index}`}
                      className="flex items-center justify-between p-3 hover:bg-slate-900 transition-colors"
                      id={`skill-row-${index}`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-slate-200">{sk.name}</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                            {sk.category}
                          </span>
                          <span className="text-[9px] font-mono font-medium text-indigo-400">
                            ★ {sk.level}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(index)}
                        className="p-1 px-2 rounded hover:bg-red-950/40 text-slate-500 hover:text-red-400 transition-colors"
                        title={`Delete ${sk.name}`}
                        id={`btn-delete-skill-${index}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Projects Admin - Grid list / Add form */}
        {activeTab === 'projects' && (
          <div className="space-y-5" id="form-projects-section">
            
            {/* View List / Form Selector trigger */}
            {!isAddingProject && editingProjectId === null ? (
              <div className="space-y-4" id="projects-initial-list">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400">Showcase Database</h3>
                  <button
                    onClick={startAddProject}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-semibold transition-colors shadow"
                    id="btn-trigger-add-project"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Project
                  </button>
                </div>

                <div className="space-y-2" id="projects-index-drawer">
                  {profile.projects.map((proj, idx) => (
                    <div 
                      key={proj.id}
                      className="p-3 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-center justify-between gap-3"
                      id={`project-editor-row-${proj.id}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${proj.imageTheme} flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold text-white shadow-sm`}>
                          P{idx + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-200 truncate block">{proj.title}</span>
                            {proj.featured && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" title="Featured" />}
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate">{proj.category} — {proj.tags.length} tags</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => startEditProject(proj)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="Modify Project Parameters"
                          id={`btn-edit-proj-${proj.id}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete Project Listing"
                          id={`btn-delete-proj-${proj.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // The detailed Project Insertion / Edit Form
              <form onSubmit={handleSaveProjectForm} className="space-y-4" id="project-designer-form">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-semibold text-indigo-400 font-mono uppercase">
                    {editingProjectId ? 'Modify Project Attributes' : 'Configure New Showcase'}
                  </span>
                  <button
                    type="button"
                    onClick={() => { setEditingProjectId(null); setIsAddingProject(false); }}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                    id="btn-cancel-project-form"
                  >
                    &lt; Back to List
                  </button>
                </div>

                {/* Sub-form inputs */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-title">Project Title</label>
                  <input
                    id="proj-form-title"
                    type="text"
                    value={projectForm.title || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                    placeholder="NexusFlow Visualizer"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-sub">Subheading / Motto</label>
                  <input
                    id="proj-form-sub"
                    type="text"
                    value={projectForm.subtitle || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                    placeholder="A real-time vector flow dashboard"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-category">Category Focus</label>
                    <select
                      id="proj-form-category"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as Project['category'] })}
                      className="px-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      {PROJECT_CATEGORIES.map((cat, idx) => (
                        <option key={`${cat}-${idx}`} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-featured">Priority Showcase</label>
                    <div className="flex items-center h-full">
                      <input
                        id="proj-form-featured"
                        type="checkbox"
                        checked={projectForm.featured || false}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="w-4 h-4 text-indigo-500 bg-slate-950 rounded border-slate-800 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-xs font-mono text-slate-300">Set as Featured</span>
                    </div>
                  </div>
                </div>

                {/* Banner Gradient Selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300 font-mono">Showcase Gradient Cover</label>
                  <div className="flex flex-wrap gap-2 py-1">
                    {GRADIENTS.map((g, idx) => (
                      <button
                        key={`${g.name}-${idx}`}
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, imageTheme: g.value })}
                        className={`w-6 h-6 rounded-lg bg-gradient-to-br ${g.value} border ${projectForm.imageTheme === g.value ? 'border-white ring-2 ring-indigo-500 scale-105' : 'border-slate-800 hover:border-slate-400'} transition-all`}
                        title={g.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-desc">Brief Overview</label>
                  <textarea
                    id="proj-form-desc"
                    rows={2}
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100 resize-none"
                    placeholder="Short introduction for card view..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-ext">Extended Description (Modal Case study)</label>
                  <textarea
                    id="proj-form-ext"
                    rows={3}
                    value={projectForm.extendedDescription || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, extendedDescription: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100 resize-none"
                    placeholder="Deeper explanation of problems solved, architecture, metrics..."
                  />
                </div>

                {/* Tags and Technical libraries */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-tags">Tags (comma-separated)</label>
                    <input
                      id="proj-form-tags"
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                      placeholder="React, TypeScript, Redux"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-tech">Detailed Tech (comma-separated)</label>
                    <input
                      id="proj-form-tech"
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                      placeholder="React 19, FastAPI, D3.js"
                    />
                  </div>
                </div>

                {/* External links */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-live">Live Preview URL</label>
                    <input
                      id="proj-form-live"
                      type="url"
                      value={projectForm.liveUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300 font-mono" htmlFor="proj-form-repo">Repository URL</label>
                    <input
                      id="proj-form-repo"
                      type="url"
                      value={projectForm.repoUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>

                {/* Key Accomplishments / Features section */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300 font-mono">Bullet Accomplishments ({projectForm.features?.length || 0})</label>
                  
                  <div className="flex gap-2">
                    <input
                      id="input-new-feature"
                      type="text"
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-slate-100"
                      placeholder="Add key feature milestone..."
                    />
                    <button
                      type="button"
                      onClick={handleAddFeatureItem}
                      className="px-3 py-1.5 font-mono text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                      id="btn-add-feature-sub"
                    >
                      Add
                    </button>
                  </div>

                  {projectForm.features && projectForm.features.length > 0 && (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 max-h-32 overflow-y-auto divide-y divide-slate-800" id="list-new-features-under">
                      {projectForm.features.map((feat, idx) => (
                        <div key={idx} className="py-1.5 flex items-start justify-between gap-2 text-xs font-sans text-slate-300">
                          <span className="truncate flex-1">• {feat}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFeatureItem(idx)}
                            className="text-[10px] text-slate-500 hover:text-red-400 pl-1"
                            id={`btn-del-feat-${idx}`}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save Project Actions */}
                <div className="flex gap-2.5 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-2 font-mono text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                    id="btn-submit-project"
                  >
                    Save Project Configuration
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingProjectId(null); setIsAddingProject(false); }}
                    className="px-4 py-2 font-mono text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                    id="btn-cancel-project"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: JSON CONFIG EXPORT IMPORT */}
        {activeTab === 'export' && (
          <div className="space-y-5" id="form-export-section">
            <h3 className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400 border-b border-slate-800 pb-2">Data Portability Node</h3>
            
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-sans text-xs text-slate-400 leading-relaxed">
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-indigo-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                No Cloud Database Overhead
              </span>
              <p>
                This developer portfolio operates high-performance client state persisting variables securely on your disk through standard <span className="text-white font-mono">browser localStorage</span>.
              </p>
              <p>
                To utilize this design in other computers or backups, copy your active database config block below or import any previously saved layout.
              </p>
            </div>

            {/* Export action */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-semibold text-slate-300 uppercase block">Active Portfolio JSON Config</span>
              <button
                onClick={copyConfigToClipboard}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="btn-copy-config"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
                {copied ? 'Config Block Copied!' : 'Copy Active DB Config'}
              </button>
            </div>

            {/* Direct Import Form */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono font-semibold text-slate-300 uppercase block">Import Existing Configuration</span>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-[10px] font-mono text-slate-200 resize-none h-28"
                placeholder="Paste JSON config code here..."
                id="input-import-json"
              />
              
              {importError && (
                <span className="text-[10px] font-mono text-red-400 block bg-red-950/20 px-3 py-2 rounded-lg border border-red-900/30">
                  ERROR: {importError}
                </span>
              )}

              {importSuccess && (
                <span className="text-[10px] font-mono text-emerald-400 block bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-900/30">
                  SUCCESS: Portfolio configuration import completed successfully!
                </span>
              )}

              <button
                onClick={handleImportConfig}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 shadow"
                id="btn-trigger-import"
              >
                <FileCode className="w-4 h-4" />
                Parse & Inject Config Block
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Editor Footer message */}
      <div className="p-4 border-t border-slate-800 text-center bg-slate-950 text-[10px] font-mono text-slate-500">
        AI Studio Portfolio App Engine
      </div>
    </div>
  );
}
