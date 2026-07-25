import type { ComponentType } from "react";
import { Network, Search } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiPrisma,
  SiCloudflare,
  SiLangchain,
  SiNodedotjs,
  SiFramer,
  SiTailwindcss,
  SiBun,
  SiEslint,
  SiRadixui,
  SiChartdotjs,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiCelery,
  SiTldraw,
  SiCss,
  SiPython,
  SiAnthropic,
  SiClaude,
  SiGooglegemini,
  SiMeta,
  SiJavascript,
  SiGreensock,
  SiDrizzle,
  SiPostgresql,
  SiGo,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next" | "ts" | "react" | "three" | "prisma" | "cloud" | "langchain" | "langgraph" | "rag"
  | "node" | "motion" | "tailwind" | "bun" | "eslint" | "radixui" | "charts" | "github" | "fastapi"
  | "redis" | "celery" | "tldraw" | "css3" | "python" | "anthropic" | "claude" | "gemini" | "llama"
  | "js" | "gsap" | "drizzle" | "postgres" | "go";

export type TechItem = TechKey | { label: string; tooltip?: string; };

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  video: string;
  description: string;
  tech: TechItem[];
  github: string;
  live: string;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
  status?: "live" | "building" | "not-started";
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, three: SiThreedotjs, prisma: SiPrisma,
  cloud: SiCloudflare, langchain: SiLangchain, langgraph: Network, rag: Search, node: SiNodedotjs,
  motion: SiFramer, tailwind: SiTailwindcss, bun: SiBun, eslint: SiEslint, radixui: SiRadixui,
  charts: SiChartdotjs, github: SiGithub, fastapi: SiFastapi, redis: SiRedis, celery: SiCelery,
  tldraw: SiTldraw, css3: SiCss, python: SiPython, anthropic: SiAnthropic, claude: SiClaude,
  gemini: SiGooglegemini, llama: SiMeta, js: SiJavascript, gsap: SiGreensock, drizzle: SiDrizzle,
  postgres: SiPostgresql, go: SiGo,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", three: "Three.js", prisma: "Prisma",
  cloud: "Cloudflare", langchain: "LangChain", langgraph: "LangGraph", rag: "RAG",
  node: "Node.js", motion: "Framer Motion", tailwind: "Tailwind CSS", bun: "Bun", eslint: "ESLint",
  radixui: "Radix UI", charts: "Charts", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  celery: "Celery", tldraw: "tldraw", css3: "CSS3", python: "Python", anthropic: "Anthropic",
  claude: "Claude", gemini: "Gemini", llama: "LLaMA", js: "JavaScript", gsap: "GSAP",
  drizzle: "Drizzle", postgres: "PostgreSQL", go: "Go",
};

export const projectsData: Project[] = [
  {
    slug: "oasis-app",
    title: "Oasis App",
    imageTitle: "Festival App",
    src: "/project-image/oasis-2025.png",
    backgroundImage: "/project-image/oasis-2025.png",
    video: "",
    description: "The official Oasis 2025 festival app built for 6,000+ attendees. Real-time event schedules, interactive maps, push notifications, and live crowd density tracking across BITS Pilani campus.",
    tech: ["next", "ts", "react", "tailwind"],
    github: "",
    live: "https://play.google.com/store/apps/details?id=com.dvm.oasis2025rn&hl=en_IN",
    hasPin: true,
    status: "live",
  },
  {
    slug: "apogee-app",
    title: "Apogee App",
    imageTitle: "Festival App",
    src: "/project-image/apogee-2026.png",
    backgroundImage: "/project-image/apogee-2026.png",
    video: "",
    description: "The official Apogee 2026 tech festival app. Handles event registration, competition tracking, speaker sessions, and real-time updates for thousands of attendees across a multi-day national-level technical symposium.",
    tech: ["next", "ts", "react", "tailwind"],
    github: "",
    live: "https://play.google.com/store/apps/details?id=org.bitsdvm.apogee2026&hl=en_IN",
    hasPin: true,
    status: "live",
  },
  {
    slug: "nyxa-ui",
    title: "NYXA UI",
    imageTitle: "Landing Page",
    src: "/project-image/nyxa-ui.png",
    backgroundImage: "/project-image/nyxa-ui.png",
    video: "",
    description:
      "A space-themed UI component library with a 3D interactive landing page, built for the future of component development.",
    tech: ["react", "three", "js", "gsap"],
    github: "https://github.com/7se7en72025/NYXA-UI",
    live: "https://kata-ui-rho.vercel.app",
    starsText: "53",
    hasPin: true,
    status: "live",
  },
  {
    slug: "speak-ai",
    title: "Speak-AI",
    imageTitle: "Voice Engine",
    src: "/project-image/speak-ai.png",
    backgroundImage: "/project-image/speak-ai.png",
    video: "",
    description:
      "Sugar Labs' Speak activity rebuilt as an AI-native tool — pairs a small language model with an LLM for fast responses, and adds richer voices via Kokoro synthesis.",
    tech: ["python", "llama", { label: "Kokoro", tooltip: "Kokoro TTS" }],
    github: "https://github.com/7se7en72025/speak-ai",
    live: "",
    starsText: "1",
    hasPin: false,
    status: "building",
  },
  {
    slug: "logdy",
    title: "Logdy",
    imageTitle: "Dashboard",
    src: "/project-image/logdy.png",
    backgroundImage: "/project-image/logdy.png",
    video: "",
    description:
      "A lightweight observability demo built with Next.js, Drizzle, Postgres, and a realtime SSE stream, with a logs viewer and AI-assisted query endpoint.",
    tech: ["next", "ts", "drizzle", "postgres"],
    github: "https://github.com/7se7en72025/Logdy",
    live: "https://logdy.vercel.app",
    hasPin: false,
    status: "live",
  },
  {
    slug: "opendiff",
    title: "OpenDiff",
    imageTitle: "Review UI",
    src: "/project-image/opendiff.png",
    backgroundImage: "/project-image/opendiff.png",
    video: "",
    description:
      "Browse, diff, and review GitHub pull requests from one place — an Actix-web backend in Rust with MongoDB persistence, live updates over WebSockets, and aggressive client-side caching to stay off the API rate limit.",
    tech: [{ label: "Rust" }, { label: "Actix", tooltip: "Actix-web" }, { label: "MongoDB" }, "github"],
    github: "https://github.com/7se7en72025/OpenDiff",
    live: "",
    hasPin: false,
    status: "building",
  },
  {
    slug: "pikapika",
    title: "pikapika",
    imageTitle: "Language",
    src: "/project-image/pikapika.png",
    backgroundImage: "/project-image/pikapika.png",
    video: "",
    description: "A stack-based concatenative language written in Go — hand-rolled lexer, recursive-descent parser, and a typed AST. Pika pika!",
    tech: ["go"],
    github: "https://github.com/7se7en72025/pikapika",
    live: "",
    starsText: "1",
    hasPin: false,
    status: "building",
  },
];
