export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI / Data' | 'Other';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  extendedDescription?: string;
  liveUrl: string;
  repoUrl: string;
  tags: string[];
  category: 'Web App' | 'Library / Tool' | 'AI & Analytics' | 'Mobile' | 'Design / UI';
  featured: boolean;
  imageTheme: string; // Tailwind gradient classes or aesthetic color names
  features?: string[];
  techStack?: string[];
}

export interface DeveloperProfile {
  name: string;
  title: string;
  location: string;
  bio: string;
  longBio: string;
  avatarChar: string; // Single character or Emoji
  avatarColor: string; // Gradient color for the profile header circle
  availableForHire: boolean;
  socials: SocialLinks;
  skills: Skill[];
  projects: Project[];
}
