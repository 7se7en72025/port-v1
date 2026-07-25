"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { playSound } from "@/lib/sound-engine";
import { click003Sound } from "@/lib/click-003";
import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

function subscribeToClient() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useMounted() {
  return React.useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [isAnimating, setIsAnimating] = React.useState(false);

  if (!mounted) {
    return <div className={cn("h-[18px] w-[18px]", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const transitionDocument = document as ViewTransitionDocument;

    setIsAnimating(true);

    // Create expanding circle animation from click point
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const circle = document.createElement("div");
    circle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: ${isDark ? "#ffffff" : "#000000"};
      transform: translate(-50%, -50%);
      z-index: 9998;
      pointer-events: none;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(circle);

    // Expand circle to cover viewport
    requestAnimationFrame(() => {
      const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.5;
      circle.style.width = `${maxDim}px`;
      circle.style.height = `${maxDim}px`;
    });

    setTimeout(() => {
      if (!transitionDocument.startViewTransition) {
        setTheme(nextTheme);
      } else {
        transitionDocument.startViewTransition(() => {
          flushSync(() => {
            setTheme(nextTheme);
          });
        });
      }

      setTimeout(() => {
        circle.style.opacity = "0";
        setTimeout(() => {
          circle.remove();
          setIsAnimating(false);
        }, 500);
      }, 100);
    }, 300);
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        void playSound(click003Sound.dataUri, { volume: 0.5 });
        toggleTheme(e);
      }}
      className={cn(
        "relative z-[9999] flex h-[18px] w-[18px] cursor-pointer items-center justify-center text-zinc-500 transition-all duration-300 hover:text-zinc-900 active:scale-95 dark:text-zinc-600 dark:hover:text-zinc-300",
        className,
      )}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      disabled={isAnimating}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
