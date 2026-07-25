"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RightNavbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    const sections = ["highlights", "experience", "projects", "opensource", "skills"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { name: "Highlights", href: "#highlights" },
    { name: "Open Source", href: "#opensource" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
  ];

  // Only render on the homepage where the #hash sections exist
  if (pathname !== "/") return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none hidden lg:block"
      style={{ width: 'calc(100vw - var(--removed-body-scroll-bar-size, 0px))' }}
    >
      {/* Sits in the right gutter, just outside the framed content column.
          Tracks --frame-gutter so it can't overlap the content when the
          gutter narrows on wide screens. */}
      <nav className="absolute top-[calc(22vh_+_112px)] left-[calc(100%_-_var(--frame-gutter)_+_32px)] pointer-events-auto flex flex-col gap-4 mt-2">
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-500 uppercase">
          Index
        </h3>

        {/* Dotted rail threading the section nodes, echoing the page's guide lines */}
        <div className="relative flex flex-col gap-3.5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[3px] top-2 bottom-2 w-px bg-black/40 dark:bg-white/25"
            style={{
              maskImage:
                "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 5px)",
              WebkitMaskImage:
                "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 5px)",
            }}
          />

          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                // pl-5 is constant so the active state can't shift the label
                className={`group relative flex items-center pl-5 text-[12px] tracking-[0.05em] transition-colors duration-300 ease-out ${
                  isActive
                    ? "font-semibold text-zinc-900 dark:text-white"
                    : "font-medium text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
                    isActive
                      ? "scale-110 border-zinc-900 bg-zinc-900 shadow-[0_0_0_3px_rgba(0,0,0,0.10)] dark:border-white dark:bg-white dark:shadow-[0_0_0_3px_rgba(255,255,255,0.14)]"
                      : "border-zinc-300 bg-white group-hover:border-zinc-400 dark:border-zinc-700 dark:bg-black dark:group-hover:border-zinc-500"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
