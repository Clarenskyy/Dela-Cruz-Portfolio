import React from 'react';
import { DeveloperProfile } from '../types';
import { Github, Linkedin, Twitter, Mail, Globe, MapPin, Sparkles, Edit2, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  profile: DeveloperProfile;
  onEditToggle: () => void;
  isEditing: boolean;
  onReset: () => void;
  isModified: boolean;
}

export default function Header({ profile, onEditToggle, isEditing, onReset, isModified }: HeaderProps) {
  const socialIcons = {
    github: <Github className="w-5 h-5" id="github-icon" />,
    linkedin: <Linkedin className="w-5 h-5" id="linkedin-icon" />,
    twitter: <Twitter className="w-5 h-5" id="twitter-icon" />,
    email: <Mail className="w-5 h-5" id="email-icon" />,
    website: <Globe className="w-5 h-5" id="website-icon" />,
  };

  return (
    <header className="relative w-full py-16 md:py-20 border-b border-white/10 bg-[#0A0A0A]" id="app-header">
      {/* Dynamic graphic split container representation from Design HTML (w-1/3 vertical contrast) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#141414] z-0 pointer-events-none border-l border-white/5 opacity-50 md:opacity-100" />
      
      {/* Technical blue ambient energy */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-4 right-10 w-72 h-72 bg-indigo-950/20 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Left Side: Photo/Memoji Frame & Bio details */}
        <div className="flex flex-col sm:flex-row items-start gap-8 max-w-4xl z-10" id="header-bio-container">
          
          {/* Avatar Area representational frame - Bold/Sharp geometric borders */}
          <div className="relative group flex-shrink-0" id="avatar-frame">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-tr ${profile.avatarColor || 'from-blue-600 to-indigo-600'} p-[2px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center text-5xl select-none text-white font-black`}>
              <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                {profile.avatarChar || "⚡"}
              </div>
            </div>
            
            {/* Pulsing Active Hiring Indicator */}
            {profile.availableForHire && (
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6" id="hiring-pulse-dot">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 border-2 border-slate-950 items-center justify-center text-[10px] text-white">✓</span>
              </span>
            )}
          </div>

          <div className="flex-1 space-y-4" id="bio-text-group">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tighter uppercase leading-[0.85]" id="developer-name">
                  {profile.name} <span className="text-blue-500 italic">/</span> {new Date().getFullYear()}
                </h1>
                {profile.availableForHire && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/30" id="badge-hiring-status">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    ACTIVE
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <p className="font-mono font-bold text-xs sm:text-sm tracking-widest uppercase text-blue-400" id="developer-title">
                  {profile.title}
                </p>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-mono uppercase tracking-wider" id="developer-location-wrapper">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-2xl text-base font-sans" id="developer-bio">
              {profile.bio}
            </p>

            {/* Social links - minimalist aesthetic tabs reminiscent of GH, TW, LI */}
            <div className="flex flex-wrap gap-2 pt-2" id="social-links-container">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all text-xs font-mono font-bold uppercase"
                  title="GitHub Profile"
                  id="link-github"
                >
                  GH
                </a>
              )}
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all text-xs font-mono font-bold uppercase"
                  title="LinkedIn Profile"
                  id="link-linkedin"
                >
                  LI
                </a>
              )}
              {profile.socials.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all text-xs font-mono font-bold uppercase"
                  title="Twitter / X Profile"
                  id="link-twitter"
                >
                  TW
                </a>
              )}
              {profile.socials.email && (
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all text-xs font-mono font-bold uppercase"
                  title="Email Address"
                  id="link-email"
                >
                  MAIL
                </a>
              )}
              {profile.socials.website && (
                <a
                  href={profile.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all text-xs font-mono font-bold uppercase"
                  title="Personal Site"
                  id="link-website"
                >
                  SITE
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Builder Tools Call-to-action - High contrast brutalist design buttons */}
        <div className="flex flex-col gap-3 min-w-[220px] w-full md:w-auto z-10" id="header-actions">
          <button
            onClick={onEditToggle}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-none font-bold uppercase tracking-wider text-xs border transition-all duration-200 cursor-pointer ${
              isEditing
                ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700'
                : 'bg-white text-slate-950 border-white hover:bg-slate-200'
            }`}
            id="btn-toggle-customizer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditing ? 'CLOSE CUSTOMIZER' : 'EDIT PORTFOLIO'}
          </button>

          {isModified && (
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-slate-950 hover:bg-red-950/30 text-rose-400 font-bold uppercase tracking-wider text-xs border border-rose-900/30 transition-all duration-200 cursor-pointer"
              id="btn-reset-portfolio"
              title="Reset configuration to default profile"
            >
              RESET TO ORIGINAL
            </button>
          )}

          <div className="p-4 bg-white/[0.02] border border-white/10 text-center" id="customizer-hint-box">
            <span className="text-[10px] font-mono font-bold text-blue-400 flex items-center justify-center gap-1.5 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              BUILD COMPILER
            </span>
            <p className="text-[10px] text-slate-400 mt-1.5 font-mono leading-normal lowercase">
              change profile properties instantly; data persists in browser memory.
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
