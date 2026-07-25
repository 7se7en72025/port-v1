"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useEffects } from "./EffectsProvider";

export function PixelDissolve() {
  const { effects } = useEffects();
  const pathname = usePathname();
  const [dissolving, setDissolving] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!effects.typing) return;

    setDissolving(true);
    setShow(true);

    const timer1 = setTimeout(() => setDissolving(false), 600);
    const timer2 = setTimeout(() => setShow(false), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, effects.typing]);

  if (!effects.typing || !show) return null;

  return (
    <div className="fixed inset-0 z-[9995] pointer-events-none">
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 20 }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute bg-black dark:bg-white"
            style={{
              left: `${col * 5}%`,
              top: `${row * 5}%`,
              width: "5%",
              height: "5%",
              animation: `pixel-dissolve 0.6s ease-out ${(row + col) * 15}ms forwards`,
              opacity: dissolving ? 1 : 0,
            }}
          />
        ))
      )}
    </div>
  );
}
