"use client";

import { useCallback } from "react";
import { useEffects } from "./EffectsProvider";

export function useHoverSound() {
  const { effects } = useEffects();

  const playHover = useCallback(() => {
    if (!effects.sound) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.value = 0.03;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }, [effects.sound]);

  return playHover;
}
