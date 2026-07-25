// Shared experience timeline data.
// Consumed by the home-page <ExperienceList /> and the full /experience page,
// which previously each carried their own copy of this array.

export type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  location: string;
  src: string;
  type?: string;
  imageFit?: "contain" | "cover";
  imageZoom?: number;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  screenshot?: string;
};

export const experiences: ExperienceData[] = [
  {
    title: "Nudron IoT Solutions",
    role: "Flutter Developer",
    dates: "Feb 2026 - May 2026",
    location: "Remote",
    src: "",
    description: `
      Developed and maintained cross-platform Flutter apps for real-time IoT device monitoring and control, integrating with backend APIs for live telemetry
      Designed reusable UI components and state-management logic, improving app responsiveness
      Collaborated with hardware engineers on device connectivity
    `,
    tech: ["Flutter", "Dart", "REST APIs", "IoT"],
  },
  {
    title: "WSC Private Limited",
    role: "Co-Founder",
    dates: "Apr 2026 - Present",
    location: "Remote",
    src: "",
    description: `
      Co-founded WSC Private Limited and shipped WonStepCareer, a skill-based campus placement platform live at wonstepcareer.com
      Built the matching model around verified skill profiles rather than branch and CGPA, the two filters that screen out capable non-CS students before a human ever reads their resume
      Shipped both sides of the marketplace: student profile building with AI skill extraction, and a pre-screened, skill-matched shortlist for recruiters
    `,
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    title: "CSIR",
    role: "AI/ML Engineer (PS1)",
    dates: "2025 - 2026",
    location: "Remote",
    src: "",
    description: `
      Designed the AI backbone for CSIR's Comprehensive Geotechnical Assessment of NH 208 and 108B in Tripura, a national infrastructure project evaluating soil stability and collapse risk across 200km of strategic highway
      Processed terabytes of satellite imagery, LiDAR point clouds, and borehole data through custom ML pipelines that replaced months of manual geological surveys with automated inference in under 48 hours
      Built computer vision models that flagged high-risk failure zones with 94% accuracy, giving engineers actionable intelligence before a single shovel hit the ground
      Shipped a live dashboard that CSIR teams now use to monitor geotechnical risk heatmaps across the entire corridor in real time
    `,
    tech: ["Python", "Computer Vision", "GIS", "TensorFlow", "Data Pipeline"],
    metrics: [
      { label: "Highway Stretch", value: "200km" },
      { label: "Accuracy", value: "94%" },
      { label: "Assessment Time", value: "48hrs" },
    ],
  },
  {
    title: "Speak-AI",
    role: "SDE",
    dates: "Mar 2026 - Present",
    location: "Remote",
    src: "",
    description: `
      Rebuilt Sugar Labs' Speak activity into an AI-native tool by fusing a small language model (SLM) with an LLM for fast, high-quality responses
      Integrated Kokoro-based voice synthesis to add richer, more natural voice variety on top of the original text-to-speech engine
      Shipped a working SLM+LLM pipeline as a real feature in an active open-source education project used by children worldwide
    `,
    tech: ["Python", "SLM", "LLM", "Kokoro", "TTS"],
  },
  {
    title: "AS",
    role: "Technical Lead",
    dates: "Apr 2026 - Present",
    location: "BITS Pilani",
    src: "",
    description: `
      Mentored junior developers within the club, conducting practical sessions on basic web development, hosting, and Git version control
      Built and launched the official club website from scratch, developing custom sections for club history, executive board listings, contact portals, and archives of past achievements
    `,
    tech: ["Web Development", "Git", "Hosting"],
  },
  {
    title: "Sugar Labs",
    role: "SDE",
    dates: "2024 - Present",
    location: "Remote",
    src: "",
    description: `
      Contributed pull requests to Sugar Labs' Music Blocks and Speak-AI, alongside Kyverno and Litmus
      Maintained NYXA-UI, an open-source component library grown to 53 GitHub stars
      Logged 350+ GitHub contributions in the past year across commits, pull requests, and code reviews
    `,
    tech: ["JavaScript", "Python", "Go", "Git"],
  },
  {
    title: "PDC",
    role: "UI/UX Lead",
    dates: "Aug 2025 - Feb 2026",
    location: "BITS Pilani",
    src: "",
    description: `
      Led a team of 12 designers on internal apps and club projects
      Ran design workshops teaching 50+ students Figma and UI/UX fundamentals
      Built and maintained a shared design system with reusable component libraries, cutting prototyping time by 40%
    `,
    tech: ["Figma", "Design Systems", "UI/UX"],
    metrics: [
      { label: "Designers Led", value: "12" },
      { label: "Students Taught", value: "50+" },
      { label: "Prototyping Time", value: "-40%" },
    ],
  },
  {
    title: "DVM",
    role: "UI/UX Designer",
    dates: "Mar 2025 - Present",
    location: "BITS Pilani",
    src: "",
    description: `
      Co-designed for Oasis and Apogee, directing the end-to-end product design lifecycle for flagship festival web and mobile platforms supporting a footfall of 6,000+ attendees
      Architected high-fidelity interfaces, scalable design systems, and cross-platform user journeys
      Collaborated with developer teams to ensure pixel-perfect delivery for high-traffic digital infrastructure
    `,
    tech: ["Figma", "Design Systems", "UI/UX"],
    metrics: [
      { label: "Festival Footfall", value: "6,000+" },
    ],
  },
];
