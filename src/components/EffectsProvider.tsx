"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
  ReactNode,
} from "react";

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

const ALL_OFF: EffectsState = {
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
};

/**
 * Subscribes to a media query without copying its result into state.
 *
 * `useSyncExternalStore` exists for exactly this shape of problem — an external
 * source of truth React needs to read during render. The server snapshot is
 * always false: the server has no device to ask, and false matches what the
 * server-rendered markup assumes.
 */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

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

  const revertAll = useCallback(() => setEffects(ALL_OFF), []);

  const setEffect = useCallback((key: keyof EffectsState, value: boolean) => {
    setEffects((prev) => ({ ...prev, [key]: value }));
  }, []);

  // The CSS block in globals.css stops keyframe and transition animation, but the
  // rAF-driven effects (three.js particles, cursor follower) run in JS and never
  // see it — they have to be switched off here.
  //
  // Device preferences are read, not stored. Copying them into state would mean
  // a setState during an effect and a second render pass on every visit; both
  // queries report false during SSR, which is also what the server markup
  // assumes, so the first client paint matches.
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasCoarsePointer = useMediaQuery("(pointer: coarse)");

  const resolved = useMemo<EffectsState>(() => {
    if (prefersReducedMotion) return ALL_OFF;
    // A cursor follower on a touchscreen is a ring parked in a corner burning a
    // rAF loop for the whole session.
    return hasCoarsePointer ? { ...effects, cursor: false } : effects;
  }, [effects, prefersReducedMotion, hasCoarsePointer]);

  return (
    <EffectsContext.Provider value={{ effects: resolved, revertAll, setEffect }}>
      {children}
    </EffectsContext.Provider>
  );
}
