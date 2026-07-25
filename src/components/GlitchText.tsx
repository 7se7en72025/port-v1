"use client";

import { useEffects } from "./EffectsProvider";

export function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
  const { effects } = useEffects();

  if (!effects.glitch) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 z-0 animate-[glitch_3s_infinite] opacity-0 dark:opacity-70 text-cyan-400"
        aria-hidden="true"
        style={{ clipPath: "inset(20% 0 60% 0)" }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 z-0 animate-[glitch_3s_infinite_reverse] opacity-0 dark:opacity-70 text-red-500"
        aria-hidden="true"
        style={{ clipPath: "inset(60% 0 10% 0)" }}
      >
        {children}
      </span>
    </span>
  );
}
