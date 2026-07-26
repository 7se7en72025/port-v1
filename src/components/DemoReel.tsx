"use client";

import { useEffect, useRef, useState } from "react";

type Reel = {
  key: string;
  label: string;
  caption: string;
  /** Looping muted clip in public/demos. Leave empty and the tab disappears. */
  src: string;
  poster?: string;
};

const reels: Reel[] = [
  {
    key: "oasis",
    label: "Oasis 2025",
    caption: "Schedule, campus map, live crowd density.",
    src: "/demos/oasis-2025.mp4",
    poster: "/project-image/oasis-2025.png",
  },
  {
    key: "apogee",
    label: "Apogee 2026",
    caption: "Event registration and competition tracking.",
    src: "/demos/apogee-2026.mp4",
    poster: "/project-image/apogee-2026.png",
  },
];

export function DemoReel() {
  const [active, setActive] = useState(0);
  // A clip that 404s drops its tab rather than showing a black rectangle.
  const [broken, setBroken] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const available = reels.filter((r) => r.src && !broken.includes(r.key));
  const current = available[Math.min(active, available.length - 1)];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Only paint while it is on screen — an off-screen loop is wasted battery.
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!current) return null;

  return (
    <div ref={wrapRef} className="mt-8 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
          In use
        </span>
        <div className="flex items-center gap-1.5">
          {available.map((reel, i) => (
            <button
              key={reel.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={current.key === reel.key}
              className={`rounded-[5px] border px-2 py-1 text-[11px] font-medium transition-all duration-300 ${
                current.key === reel.key
                  ? "border-black/50 text-zinc-900 dark:border-white/30 dark:text-zinc-100"
                  : "border-black/30 text-zinc-500 hover:-translate-y-[1px] hover:border-black/50 dark:border-white/[0.15] dark:text-zinc-400 dark:hover:border-white/30"
              }`}
            >
              {reel.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Phone frame — both are mobile apps, so a 16:9 box would letterbox. */}
        <div className="relative w-[186px] shrink-0 rounded-[22px] border border-black/20 bg-zinc-100 p-[5px] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)] dark:border-white/[0.15] dark:bg-zinc-900">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[17px] bg-black">
            <video
              key={current.key}
              ref={videoRef}
              src={current.src}
              poster={current.poster}
              onError={() => setBroken((b) => [...b, current.key])}
              className="size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${current.label} app demo`}
            />
          </div>
          <div className="absolute left-1/2 top-[9px] h-[4px] w-[42px] -translate-x-1/2 rounded-full bg-black/70 dark:bg-black" />
        </div>

        <p className="text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {current.caption}
          <span className="block mt-1 text-zinc-400 dark:text-zinc-600">
            Recorded on the shipped build.
          </span>
        </p>
      </div>
    </div>
  );
}
