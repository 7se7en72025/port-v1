"use client";

import { useEffect, useState } from "react";

export function CurrentTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setTime(new Date()), 0);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  if (!time) {
    return (
      <div className="flex items-center opacity-0">
        <div 
          className="text-[20px] sm:text-[24px] tracking-[0.2em] text-zinc-400 dark:text-zinc-500" 
          style={{ fontFamily: '"Doto", monospace', fontWeight: 700 }}
        >
          00:00:00
        </div>
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center h-[24px]">
      <div 
        className="text-[20px] sm:text-[24px] tracking-[0.2em] text-zinc-500 dark:text-zinc-400" 
        style={{ fontFamily: '"Doto", monospace', fontWeight: 700 }}
      >
        <span>{hours}</span>
        <span className="animate-pulse">:</span>
        <span>{minutes}</span>
        <span className="animate-pulse">:</span>
        <span>{seconds}</span>
      </div>
    </div>
  );
}
