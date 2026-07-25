"use client";

import { useState, useRef, useEffect } from "react";
import { useEffects } from "./EffectsProvider";

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

const HELP_TEXT = `Available commands:
  help      - Show this message
  about     - Who is this?
  skills    - Tech stack
  socials   - Links
  clear     - Clear terminal
  revert    - Kill terminal session
  sm revert - Disable all effects
             (glitch, particles, typing,
              sound, ripple, cursor,
              parallax, reveal, noise,
              scramble, gradient, counter,
              progress, dissolve)`;

const ABOUT_TEXT = `NSA Raiyyan. 19. BITS Pilani.
Full-stack Developer / Designer.
I build for the web and ship to open source.`;

const SKILLS_TEXT = `Next.js, React, TypeScript, Tailwind CSS, Python, Go, Flutter,
Figma, UI/UX Design, Machine Learning, Git`;

const SOCIALS_TEXT = `GitHub  : github.com/7se7en72025
Email   : f20241312a@pilani.bits-pilani.ac.in`;

export function Terminal() {
  const { revertAll } = useEffects();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [reverted, setReverted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    setLines((prev) => [...prev, { type: "input", text: cmd }]);

    if (trimmed === "help") {
      setLines((prev) => [...prev, { type: "output", text: HELP_TEXT }]);
    } else if (trimmed === "about") {
      setLines((prev) => [...prev, { type: "output", text: ABOUT_TEXT }]);
    } else if (trimmed === "skills") {
      setLines((prev) => [...prev, { type: "output", text: SKILLS_TEXT }]);
    } else if (trimmed === "socials") {
      setLines((prev) => [...prev, { type: "output", text: SOCIALS_TEXT }]);
    } else if (trimmed === "clear") {
      setLines([]);
    } else if (trimmed === "revert") {
      setReverted(true);
      setLines((prev) => [
        ...prev,
        { type: "output", text: "Everything has been reverted. Refresh to start over." },
      ]);
    } else if (trimmed === "sm revert") {
      revertAll();
      setLines((prev) => [
        ...prev,
        { type: "output", text: "All effects disabled. Glitch, particles, typing, sound, ripple, cursor — all off." },
      ]);
    } else if (trimmed === "") {
      return;
    } else {
      setLines((prev) => [
        ...prev,
        { type: "output", text: `Command not found: ${cmd}. Type 'help' for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setHistory((prev) => [...prev, input]);
      setHistoryIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const idx = historyIdx + 1;
        if (idx >= history.length) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  if (reverted) {
    return (
      <div
        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden font-mono text-sm cursor-pointer"
        onClick={focusInput}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-800">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[11px] text-zinc-500">terminal</span>
        </div>
        <div className="p-3 text-zinc-500 text-xs">
          Session ended. Refresh to restart.
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden font-mono text-sm cursor-pointer"
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[11px] text-zinc-500">terminal</span>
      </div>

      {/* Terminal body */}
      <div className="p-3 max-h-[200px] overflow-y-auto space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "input" ? (
              <span>
                <span className="text-emerald-400">~</span>{" "}
                <span className="text-zinc-300">{line.text}</span>
              </span>
            ) : (
              <span className="text-zinc-400">{line.text}</span>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center">
          <span className="text-emerald-400">~</span>{" "}
          <span className="text-zinc-300 ml-1">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-zinc-100 outline-none ml-2 caret-emerald-400"
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
