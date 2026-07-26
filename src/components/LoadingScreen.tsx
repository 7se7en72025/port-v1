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
  );
}

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchTimer = setTimeout(() => setGlitch(true), 1500);
    const hideTimer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 2200);

    return () => {
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

          {/* Glitch RGB layers */}
          <div className="relative">
            {glitch && (
              <motion.div
                className="absolute inset-0 text-[80px] sm:text-[120px] xl:text-[140px] font-bold tracking-[0.5em] text-cyan-400"
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

            {glitch && (
              <motion.div
                className="absolute inset-0 text-[80px] sm:text-[120px] xl:text-[140px] font-bold tracking-[0.5em] text-red-500"
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
              className="relative text-[80px] sm:text-[120px] xl:text-[140px] font-bold tracking-[0.5em] text-white"
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
