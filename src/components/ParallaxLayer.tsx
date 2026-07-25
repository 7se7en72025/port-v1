"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useEffects } from "./EffectsProvider";

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const { effects } = useEffects();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!effects.particles || !ref.current) return;

    const el = ref.current;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            const scrolled = window.scrollY;
            el.style.transform = `translateY(${scrolled * speed}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [effects.particles, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
