"use client";

import { useEffect, useState } from "react";
import { useEffects } from "./EffectsProvider";

const GRADIENTS = [
  "from-cyan-500/5 to-transparent",
  "from-violet-500/5 to-transparent",
  "from-emerald-500/5 to-transparent",
  "from-amber-500/5 to-transparent",
  "from-rose-500/5 to-transparent",
];

export function GradientShift() {
  const { effects } = useEffects();
  const [gradientIdx, setGradientIdx] = useState(0);

  useEffect(() => {
    if (!effects.particles) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docHeight;
      const idx = Math.floor(progress * GRADIENTS.length) % GRADIENTS.length;
      setGradientIdx(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [effects.particles]);

  if (!effects.particles) return null;

  return (
    <div
      className={`fixed inset-0 -z-10 transition-all duration-1000 bg-gradient-to-br ${GRADIENTS[gradientIdx]}`}
    />
  );
}
