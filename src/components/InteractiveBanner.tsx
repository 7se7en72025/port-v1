"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { BannerParticles } from "./BannerParticles";

export function InteractiveBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 12, y: y * 8 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 md:left-[var(--frame-gutter)] md:right-[var(--frame-gutter)] top-0 h-[22vh] -z-0 pointer-events-auto overflow-hidden bg-white dark:bg-black shadow-[0_4px_12px_rgba(2,6,23,0.04)] dark:shadow-[0_4px_12px_rgba(2,6,23,0.10)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-transform duration-[0.3s] ease-out will-change-transform"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(1.05)` }}
      >
        <Image
          src="/ChatGPT%20Image%20May%2022%2C%202026%2C%2012_40_29%20AM.jpg"
          alt=""
          fill
          fetchPriority="high"
          sizes="(min-width: 768px) 40vw, 100vw"
          quality={100}
          className="object-cover object-center dark:hidden"
        />
        <Image
          src="/ChatGPT%20Image%20May%2022%2C%202026%2C%2012_49_39%20AM.jpg"
          alt=""
          fill
          fetchPriority="high"
          sizes="(min-width: 768px) 40vw, 100vw"
          quality={100}
          className="hidden object-cover object-center dark:block"
        />
      </div>
      <BannerParticles />
      <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-[5] bg-gradient-to-t from-white/90 to-transparent dark:from-black/50 dark:to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20 bg-gradient-to-r from-white/90 to-transparent dark:from-black/40 dark:to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20 bg-gradient-to-l from-white/90 to-transparent dark:from-black/40 dark:to-transparent" />
    </div>
  );
}
