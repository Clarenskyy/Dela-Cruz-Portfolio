import { DeveloperProfile } from './types';

export const DEFAULT_PROFILE: DeveloperProfile = {
  name: "Alex Rivera",
  title: "Principal Full-Stack Engineer & Designer",
  location: "San Francisco, CA (Open to Remote)",
  bio: "Architecting slick interactive systems, high-throughput backend runtimes, and accessible design tokens with atomic clean-code systems.",
  longBio: "I design and build high-performance web products. Over the last seven years, I have worked across the engineering stack—from developing fluid UI experiences and high-performance interactive canvases to wiring up low-latency streaming microservices and distributed databases. I focus on aesthetic craftsmanship, clean code architecture, and high performance.",
  avatarChar: "⚡",
  avatarColor: "from-indigo-600 via-purple-600 to-pink-600",
  availableForHire: true,
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "alex.rivera.dev@example.com",
    website: "https://alexrivera.dev"
  },
  skills: [
    { name: "React / Next.js", category: "Frontend", level: "Expert" },
    { name: "TypeScript", category: "Frontend", level: "Expert" },
    { name: "Tailwind CSS & Motion", category: "Frontend", level: "Expert" },
    { name: "Node.js (NestJS / Express)", category: "Backend", level: "Advanced" },
    { name: "Go (Golang)", category: "Backend", level: "Advanced" },
    { name: "PostgreSQL & Redis", category: "Database", level: "Advanced" },
    { name: "GraphQL / gRPC", category: "Backend", level: "Intermediate" },
    { name: "Docker & Kubernetes", category: "DevOps", level: "Advanced" },
    { name: "AWS & Terraform", category: "DevOps", level: "Intermediate" },
    { name: "Vector Search & Embeddings", category: "AI / Data", level: "Intermediate" },
    { name: "D3.js Data Visualization", category: "Frontend", level: "Advanced" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "NexusFlow Visualizer",
      subtitle: "A real-time vector flow-state monitoring dashboard & canvas",
      description: "An interactive full-stack flow visualizer rendering live stream computations, telemetry sockets, and pipeline network states in a multi-user high-performance HTML5 Canvas.",
      extendedDescription: "NexusFlow solves the issue of inspecting complex, high-throughput Stream Pipelines by rendering visual canvas topologies dynamically. It includes an Express websocket proxy, active viewport auto-balancing, and detailed node-level telemetry inspections. Developed with standard WebSockets and fine-tuned rendering cycles.",
      liveUrl: "https://nexus-flow.demo.example.com",
      repoUrl: "https://github.com/example/nexus-flow-visualizer",
      tags: ["React", "TypeScript", "D3.js", "WebSockets", "Node.js"],
      category: "Web App",
      featured: true,
      imageTheme: "from-blue-600 to-indigo-600",
      features: [
        "Interactive hardware-accelerated SVG & canvas renderings for up to 10k items",
        "Configurable routing thresholds with dynamic backpressure UI flags",
        "Exportable pipeline layout configurations in standard JSON schema",
        "Instant replay debug modes with pause/resume streaming events"
      ],
      techStack: ["React 19", "TypeScript", "D3.js Force Simulation", "Tailwind CSS", "Express Server", "WebSockets"]
    },
    {
      id: "proj-2",
      title: "AetherSearch AI",
      subtitle: "Semantic vector file explorer and autocomplete service",
      description: "A fast, privacy-focused semantic asset database that indexes local documents, formats, and notes with secure local embeddings and interactive text-grounded highlights.",
      extendedDescription: "AetherSearch empowers users to find document connections regardless of keyword matchings. Leveraging local embedding models, it computes geometric cosine distances inside pgvector and maps query locations to 3D clusters with WebGL representations, resulting in search indexing times under 50ms per megabyte.",
      liveUrl: "https://aether-search.demo.example.com",
      repoUrl: "https://github.com/example/aether-search-ai",
      tags: ["FastAPI", "Python", "pgvector", "Tailwind CSS", "Three.js"],
      category: "AI & Analytics",
      featured: true,
      imageTheme: "from-emerald-500 via-teal-600 to-cyan-500",
      features: [
        "Cosine similarity clustering utilizing multi-dimensional document projections",
        "Incremental real-time file watcher with zero-downtime database indexing",
        "Rich UI highlights of text sources with dynamic Markdown rendering blocks",
        "3D spatial clustering dashboard with search filter controls"
      ],
      techStack: ["FastAPI", "Python 3.11", "pgvector", "PostgreSQL", "React", "Three.js", "Tailwind CSS"]
    },
    {
      id: "proj-3",
      title: "PrismUI Tokens & Blocks",
      subtitle: "An accessible, themeable design system built with custom CSS triggers",
      description: "A component playground and utility block builder compliant with strict WCAG AA criteria, including complete keyboard hooks, focus rings, and high contrast variations.",
      extendedDescription: "PrismUI is built to resolve the common trade-off between flexible aesthetic design and complete screen-reader accessibility. By building on top of headless state primitive buttons, developer nodes can build robust forms, responsive popups, and dark-mode gradients without sacrificing standard HTML structures.",
      liveUrl: "https://prism-ui.demo.example.com",
      repoUrl: "https://github.com/example/prism-ui-tokens",
      tags: ["React", "Tailwind CSS", "TypeScript", "Storybook", "Framer Motion"],
      category: "Design / UI",
      featured: true,
      imageTheme: "from-pink-500 to-rose-600",
      features: [
        "Over 45+ highly generic and extendable micro-components styled with Tailwind utility tokens",
        "Aria-compliant live keyboard routing and full modal focus trap states",
        "Automatic dark/light mode toggle system that aligns with device preferences",
        "Highly scannable developer playgrounds for copying raw markup or TSX classes"
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS v4", "Radix UI Primitives", "Framer Motion"]
    },
    {
      id: "proj-4",
      title: "KubeMeter CLI & Live",
      subtitle: "Lightweight node inspector and cost optimizer for Kubernetes clusters",
      description: "A real-time command-line metrics agent and visual dashboard summarizing memory leaks, orphan services, and recommended cloud instance savings in one command.",
      extendedDescription: "KubeMeter provides instant operational indicators directly inside the shell or in a lightweight dashboard. By bypassing bulky enterprise visual setups, team members can debug memory leaks and resource hogs instantly while obtaining recommended sizing profiles in seconds.",
      liveUrl: "https://kube-meter.demo.example.com",
      repoUrl: "https://github.com/example/kubemeter-cli",
      tags: ["Go", "gRPC", "Docker", "Prometheus", "Tailwind CSS"],
      category: "Library / Tool",
      featured: false,
      imageTheme: "from-amber-500 to-orange-600",
      features: [
        "Instant local server daemon requiring zero Kubernetes operator installs",
        "Aggregates metrics from Prometheus Prometheus-Operator dynamically",
        "Saves an average of 34% in cluster allocation costs by tracking non-idle nodes",
        "Dual client: interactive terminal GUI (TUI) and lightweight Web UI"
      ],
      techStack: ["Go (Golang)", "React", "gRPC-Web", "Docker", "Prometheus API"]
    },
    {
      id: "proj-5",
      title: "ZenSpace Audio Engine",
      subtitle: "Offline-first ambient sound designer and breathing timer",
      description: "A beautiful, state-driven browser audio synthesizer that shapes calming wave loops and breath patterns with visual custom metronome interfaces.",
      extendedDescription: "ZenSpace provides high-fidelity, client-synthesized noise generators using the Web Audio API. Unlike static MP3 runtimes, ZenSpace parameters shift based on your inhalation targets, creating high-fidelity ambient landscapes completely offline with zero loading lag.",
      liveUrl: "https://zenspace-audio.demo.example.com",
      repoUrl: "https://github.com/example/zenspace-audio-engine",
      tags: ["Web Audio API", "React", "Motion", "TypeScript", "Tailwind CSS"],
      category: "Mobile",
      featured: false,
      imageTheme: "from-violet-500 to-fuchsia-600",
      features: [
        "Dynamic sound synthesis using raw oscillators, filters, and GainNode loops",
        "Integrated visual breath visualizer matching custom exhalation ratios",
        "Completely offline-first utility that works with a closed laptop lid",
        "Slick, minimal user settings panel to change sound colors (Pink, Brown, White)"
      ],
      techStack: ["HTML5 Web Audio API", "React", "Tailwind CSS", "motion/react"]
    }
  ]
};
