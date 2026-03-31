export interface Project {
  title: string;
  image: string;
  description: string;
  github: string;
  liveDemo?: string;
  technologies: string[];
  badgeBg: string;
  badgeTextColor: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    title: "Sidvia AI",
    image: "/sidvia.png",
    description: "Smart Interactive Digital Voice-based Interview Agent. Practice and master your next job interview with real-time AI feedback. Features voice-based interactions, intelligent question generation, and comprehensive analytics.",
    github: "https://github.com/PrashantJaybhaye/Sidvia-Interview-Agent",
    liveDemo: "https://sidvia.vercel.app/",
    technologies: ["Next.js 15", "React 19", "Firebase", "VAPI AI", "Gemini AI"],
    badgeBg: "#d6cc99",
    badgeTextColor: "text-stone-900",
  },
  {
    title: "Siora - AI Agent",
    image: "/siora.png",
    description: "A personal AI mindfulness companion that enables real-time voice interactions for stress relief and focus. Built with React Native, Expo, LiveKit, and ElevenLabs to provide an immersive, intelligent meditation experience.",
    github: "https://github.com/PrashantJaybhaye/AI-Agent",
    technologies: ["React Native", "Expo", "LiveKit", "ElevenLabs", "AI Voice"],
    badgeBg: "#0a4174",
    badgeTextColor: "text-stone-300",
  },
  {
    title: "Smart Allocation System",
    image: "/smart-allocation.png",
    description: "A robust Flask-based system built to automate course allocation for university students. Features secure user management, CSV/Excel data processing, and an intelligent allocation algorithm to manage large volumes of academic data effectively.",
    github: "https://github.com/PrashantJaybhaye/Smart-Allocation-system",
    liveDemo: "https://smart-allocation-system.onrender.com",
    technologies: ["Flask", "Python", "SQLite", "Tailwind CSS"],
    badgeBg: "#abca9e",
    badgeTextColor: "text-stone-900",
  }
];
