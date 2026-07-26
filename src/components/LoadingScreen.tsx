"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SlotDigit({ target, delay }: { target: number; delay: number }) {
  const [display, setDisplay] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplay(Math.floor(Math.random() * 10));
      }, 50);
    }, delay);

    const stopTimeout = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplay(target);
      setSpinning(false);
    }, delay + 600);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(stopTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delay, target]);

  return (
    <span className="relative inline-block">
      <motion.span
        className="inline-block"
        animate={
          !spinning
            ? {
                y: [0, -8, 3, -2, 0],
                scale: [1, 1.15, 0.95, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        {display}
      </motion.span>
      {/* Glow pulse on stop */}
      {!spinning && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ boxShadow: "0 0 0px rgba(255,255,255,0)" }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 24px 4px rgba(255,255,255,0.35)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </span>
  );
}

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    // Progress bar fills as digits lock in
    const t1 = setTimeout(() => setBarWidth("33%"), 800);   // digit 1 stops at 200+600
    const t2 = setTimeout(() => setBarWidth("66%"), 1000);  // digit 2 stops at 400+600
    const t3 = setTimeout(() => setBarWidth("100%"), 1200); // digit 3 stops at 600+600
    const glitchTimer = setTimeout(() => setGlitch(true), 1500);
    const hideTimer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(glitchTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 15,
            filter: "blur(12px)",
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* Glitch RGB layers */}
            <div className="relative">
              {/* Cyan clone */}
              {glitch && (
                <motion.div
                  className="absolute inset-0 text-[60px] sm:text-[80px] font-bold tracking-[0.5em] text-cyan-400"
                  style={{ fontFamily: '"Doto", monospace' }}
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.7, 0],
                    x: [-3, 3, -2, 0],
                  }}
                  transition={{ duration: 0.4, times: [0, 0.2, 0.8, 1] }}
                  aria-hidden="true"
                >
                  777
                </motion.div>
              )}

              {/* Red clone */}
              {glitch && (
                <motion.div
                  className="absolute inset-0 text-[60px] sm:text-[80px] font-bold tracking-[0.5em] text-red-500"
                  style={{ fontFamily: '"Doto", monospace' }}
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.7, 0],
                    x: [3, -3, 2, 0],
                  }}
                  transition={{ duration: 0.4, times: [0, 0.2, 0.8, 1] }}
                  aria-hidden="true"
                >
                  777
                </motion.div>
              )}

              {/* Main digits */}
              <motion.div
                className="relative text-[60px] sm:text-[80px] font-bold tracking-[0.5em] text-white"
                style={{ fontFamily: '"Doto", monospace' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <SlotDigit target={7} delay={200} />
                <SlotDigit target={7} delay={400} />
                <SlotDigit target={7} delay={600} />
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-[120px] h-[1px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-white/60"
                animate={{ width: barWidth }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* LOADING subtitle */}
            <motion.p
              className="mt-3 text-[10px] tracking-[0.3em] text-zinc-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <LoadingText />
            </motion.p>
          </div>

          {/* Subtle glow underneath */}
          <motion.div
            className="absolute w-[200px] h-[60px] rounded-full bg-white/5 blur-[40px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingText() {
  const text = "LOADING";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 70);
    return () => clearTimeout(t);
  }, [shown, text.length]);

  return (
    <span>
      {text.slice(0, shown)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-0.5"
      >
        _
      </motion.span>
    </span>
  );
}
