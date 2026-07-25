"use client";

import { useState, useCallback } from "react";
import { useEffects } from "./EffectsProvider";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function ClickRipple({ children }: { children: React.ReactNode }) {
  const { effects } = useEffects();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!effects.ripple) return;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
    },
    [effects.ripple]
  );

  return (
    <div onClick={handleClick} className="relative">
      {children}
      {effects.ripple &&
        ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none fixed z-[9998] h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-[ripple_0.8s_ease-out_forwards] rounded-full border border-zinc-400/30 dark:border-zinc-500/30"
            style={{ left: r.x, top: r.y }}
          />
        ))}
    </div>
  );
}
