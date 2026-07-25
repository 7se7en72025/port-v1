"use client";

import { useEffects } from "./EffectsProvider";

export function NoiseOverlay() {
  const { effects } = useEffects();

  if (!effects.noise) return null;

  return <div className="noise-overlay" />;
}
