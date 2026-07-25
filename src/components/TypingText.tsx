"use client";

import { useState, useEffect } from "react";
import { useEffects } from "./EffectsProvider";

export function TypingText({
  text,
  className,
  delay = 0,
  speed = 40,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const { effects } = useEffects();
  const [displayed, setDisplayed] = useState(effects.typing ? "" : text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!effects.typing) {
      setDisplayed(text);
      return;
    }

    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [effects.typing, delay, text]);

  useEffect(() => {
    if (!effects.typing || !started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, speed, started, effects.typing]);

  return (
    <span className={className}>
      {displayed}
      {effects.typing && displayed.length < text.length && (
        <span className="animate-pulse ml-[1px] text-zinc-400">|</span>
      )}
    </span>
  );
}
