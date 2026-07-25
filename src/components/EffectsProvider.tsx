"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface EffectsState {
  glitch: boolean;
  particles: boolean;
  typing: boolean;
  sound: boolean;
  ripple: boolean;
  cursor: boolean;
  parallax: boolean;
  reveal: boolean;
  noise: boolean;
  scramble: boolean;
  gradient: boolean;
  counter: boolean;
  progress: boolean;
  dissolve: boolean;
}

interface EffectsContextType {
  effects: EffectsState;
  revertAll: () => void;
  setEffect: (key: keyof EffectsState, value: boolean) => void;
}

const EffectsContext = createContext<EffectsContextType | null>(null);

export function useEffects() {
  const ctx = useContext(EffectsContext);
  if (!ctx) throw new Error("useEffects must be used within EffectsProvider");
  return ctx;
}

export function EffectsProvider({ children }: { children: ReactNode }) {
  // Four effects on, ten off. Everything here degrades to plain content when
  // false, so this is purely a taste dial — flip one back on if you miss it.
  //
  // Kept: particles is the one hero moment and stays boxed inside the banner;
  // reveal and progress are structural, telling you where you are; counter
  // animates the numbers that carry the whole page.
  //
  // Cut: glitch and scramble mangle the name and headings a reader is trying to
  // read. typing withholds a sentence that is already written. cursor, ripple
  // and sound respond to input nobody asked to be responded to. noise, gradient,
  // parallax and dissolve move the background while you read the foreground.
  const [effects, setEffects] = useState<EffectsState>({
    particles: true,
    reveal: true,
    progress: true,
    counter: true,

    glitch: false,
    typing: false,
    sound: false,
    ripple: false,
    cursor: false,
    parallax: false,
    noise: false,
    scramble: false,
    gradient: false,
    dissolve: false,
  });

  const revertAll = useCallback(() => {
    setEffects({
      glitch: false,
      particles: false,
      typing: false,
      sound: false,
      ripple: false,
      cursor: false,
      parallax: false,
      reveal: false,
      noise: false,
      scramble: false,
      gradient: false,
      counter: false,
      progress: false,
      dissolve: false,
    });
  }, []);

  const setEffect = useCallback((key: keyof EffectsState, value: boolean) => {
    setEffects((prev) => ({ ...prev, [key]: value }));
  }, []);

  // The CSS block in globals.css stops keyframe and transition animation, but the
  // rAF-driven effects (three.js particles, cursor follower) run in JS and never
  // see it — they have to be switched off here. Effects start on so the
  // server-rendered markup matches; this runs after hydration.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduced.matches) revertAll();
    };
    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, [revertAll]);

  // A cursor follower on a touchscreen is a ring parked in a corner burning a
  // rAF loop for the whole session.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEffect("cursor", false);
    }
  }, [setEffect]);

  return (
    <EffectsContext.Provider value={{ effects, revertAll, setEffect }}>
      {children}
    </EffectsContext.Provider>
  );
}
