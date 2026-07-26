import { ThemeToggle } from "@/components/theme-toggle";
import { GithubGraph } from "@/components/GithubGraph";
import { CurrentTime } from "@/components/CurrentTime";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ExperienceList } from "@/components/ExperienceList";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";
import { FooterBackground } from "@/components/FooterBackground";
import { RightNavbar } from "@/components/RightNavbar";
import { CommandMenu } from "@/components/command-menu";
import Link from "next/link";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import SocialHoverCard from "@/components/pixel-perfect/social-hover-card";
import { BannerParticles } from "@/components/BannerParticles";
import { GithubStats } from "@/components/GithubStats";
import { Highlights } from "@/components/Highlights";
import { Terminal } from "@/components/Terminal";
import { GlitchText } from "@/components/GlitchText";
import { ClickRipple } from "@/components/ClickRipple";
import { TypingText } from "@/components/TypingText";
import { ParallaxLayer } from "@/components/ParallaxLayer";
import { InteractiveBanner } from "@/components/InteractiveBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  siCncf,
  siFigma,
  siFlutter,
  siGithub,
  siGo,
  siKubernetes,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siRust,
  siTypescript,
} from "simple-icons";

import { FileText } from "lucide-react";
import Image from "next/image";
import { hasResume, siteConfig } from "@/data/siteConfig";

// Icon paths are inlined from the simple-icons package rather than fetched from
// cdn.simpleicons.org — the CDN request can hang or fail, and a broken <img>
// paints its alt text over the label. Inlining also renders them server-side.
// Nine, not eighteen. A long list reads as "I have touched these"; a short one
// reads as "ask me anything about these." Everything here is backed by shipped
// work elsewhere on the page — Go and Kubernetes by the CNCF PRs, Flutter by
// Nudron, Figma by the design lead roles.
//
// Cut on purpose: Git and GitHub aren't skills, they're literacy. JavaScript is
// implied by TypeScript and Dart by Flutter. Three.js, GSAP, Kotlin and Linux
// were padding — the portfolio itself is the Three.js and GSAP evidence.
const skills = [
  { name: "Go", icon: siGo },
  { name: "Rust", icon: siRust },
  { name: "Python", icon: siPython },
  { name: "TypeScript", icon: siTypescript },
  { name: "React", icon: siReact },
  { name: "Next", icon: siNextdotjs },
  { name: "Kubernetes", icon: siKubernetes },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Flutter", icon: siFlutter },
  { name: "Figma", icon: siFigma },
];

// Shipped-product stats, sitting directly above the CTA. Same rule as the
// provenance strip below: every figure resolves to a public page that shows it.
//
// Checked against the Play Store listings on 26 Jul 2026. Both apps read "1K+
// downloads", so the combined floor is 2K+ — Google buckets these, it is not a
// precise count, which is why the label says "downloads" and not "users".
const shipped = [
  {
    value: "2",
    label: "apps on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.dvm.oasis2025rn&hl=en_IN",
  },
  {
    value: "2K+",
    label: "downloads",
    href: "https://play.google.com/store/apps/details?id=org.bitsdvm.apogee2026&hl=en_IN",
  },
  {
    value: "4.6",
    label: "rated on Oasis",
    href: "https://play.google.com/store/apps/details?id=com.dvm.oasis2025rn&hl=en_IN",
  },
];

// Organisations carrying merged code, shown directly under the intro. Every
// entry links to the GitHub search that returns the actual pull requests — the
// claim and its evidence are the same click. Anything that can't be linked to a
// public result set doesn't belong in this strip.
const provenance = [
  {
    org: "Kyverno",
    note: "CNCF",
    icon: siCncf,
    href: "https://github.com/search?q=is%3Apr+author%3A7se7en72025+is%3Amerged+org%3Akyverno&type=pullrequests",
  },
  {
    org: "Litmus",
    note: "CNCF",
    icon: siCncf,
    href: "https://github.com/search?q=is%3Apr+author%3A7se7en72025+is%3Amerged+org%3Alitmuschaos&type=pullrequests",
  },
  {
    org: "OpenYurt",
    note: "CNCF",
    icon: siCncf,
    href: "https://github.com/search?q=is%3Apr+author%3A7se7en72025+is%3Amerged+org%3Aopenyurtio&type=pullrequests",
  },
  {
    // Sugar Labs is not a CNCF project — it gets the neutral mark, not the badge.
    org: "Sugar Labs",
    note: "31 merged",
    icon: siGithub,
    href: "https://github.com/search?q=is%3Apr+author%3A7se7en72025+is%3Amerged+org%3Asugarlabs&type=pullrequests",
  },
];

export default function Home() {
  return (
    <ClickRipple>
    <div className="min-h-screen w-full bg-white dark:bg-black relative overflow-x-hidden transition-colors duration-300">

      {/* Ambient gradient glow orbs */}
      <ParallaxLayer speed={0.1}>
        <div className="pointer-events-none absolute left-1/2 top-[10vh] -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/[0.12]" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.15}>
        <div className="pointer-events-none absolute left-[15%] top-[55vh] -z-10 h-[380px] w-[380px] rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-500/[0.10]" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.2}>
        <div className="pointer-events-none absolute right-[12%] top-[105vh] -z-10 h-[400px] w-[400px] rounded-full bg-violet-400/10 blur-[120px] dark:bg-violet-500/[0.10]" />
      </ParallaxLayer>

      {/* Right Side Blueprint Navigation */}
      <RightNavbar />

      {/* Vertical Lines - Ultra-fine Micro Dots */}
      <div className="absolute top-0 bottom-0 left-[var(--frame-gutter)] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="absolute top-0 bottom-0 right-[var(--frame-gutter)] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Horizontal Lines - Ultra-fine Micro Dots */}
      <div className="absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Ultra-Tiny Solid Nodes */}
      {[
        { top: '22vh', left: 'var(--frame-gutter)' },
        { top: '22vh', right: 'var(--frame-gutter)' },
        { top: 'calc(22vh + 112px)', left: 'var(--frame-gutter)' },
        { top: 'calc(22vh + 112px)', right: 'var(--frame-gutter)' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] pointer-events-none z-10 hidden md:block"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            transform: `translate(${pos.right ? '50%' : '-50%'}, -50%)`
          }} />
      ))}

      {/* Cell 1: Banner */}
      <InteractiveBanner />

      {/* Timer - fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <CurrentTime />
      </div>

      {/* Cell 2: Profile Section - 112px height to wrap the framed image (13px gap top/bottom) */}
      <div className="absolute left-0 right-0 md:left-[var(--frame-gutter)] md:right-[var(--frame-gutter)] top-[22vh] h-[112px] flex items-center px-4 z-50">
        <div className="flex w-full items-center justify-between">

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="group relative shrink-0">
              {/* Animated conic glow ring */}
              <div className="pointer-events-none absolute -inset-[3px] rounded-[9px] sm:rounded-[11px] opacity-70 blur-[6px] transition-opacity duration-500 group-hover:opacity-100 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#38bdf8,#6366f1,#8b5cf6,#38bdf8)]" />
              <div className="relative p-[3px] rounded-[6px] sm:rounded-[8px] border-[1.5px] border-black/30 dark:border-white/[0.15] bg-white dark:bg-black">
                {/* The inner image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[3px] sm:rounded-[5px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/avatar.jpg"
                    alt="Profile"
                    width={375}
                    height={666}
                    quality={90}
                    priority
                    fetchPriority="high"
                    sizes="(min-width: 640px) 120px, 96px"
                    className="h-full w-full origin-center translate-y-1 scale-[1.1] object-cover saturate-[1.15] transition-transform duration-500 group-hover:scale-[1.18]"
                  />
                </div>
              </div>
              {/* Live status dot */}
              <span className="absolute -bottom-1 -right-1 z-20 flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black" />
              </span>
            </div>

            <div className="flex flex-col justify-center pt-8">
              <h1 className="text-[20px] sm:text-[24px] xl:text-[30px] 2xl:text-[34px] font-bold tracking-tight leading-none mb-1 text-zinc-900 dark:text-white">
                <GlitchText>{siteConfig.name}</GlitchText>
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-[13px] sm:text-[14px] xl:text-[15px] text-zinc-500 dark:text-zinc-400">BITS Pilani</p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-end gap-2 sm:gap-3 h-20 sm:h-24 py-1">
            <CommandMenu />
            <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-300" />
          </div>

        </div>
      </div>

      {/* Flowing Content Section */}
      <div className="ml-0 mr-0 md:ml-[var(--frame-gutter)] md:mr-[var(--frame-gutter)] pt-[calc(22vh+112px)] pb-0 px-4 flex flex-col z-10 relative min-h-screen">
        <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
          <span className="font-semibold text-zinc-900 dark:text-white">Full-stack Developer / Designer.</span>{" "}
          <TypingText text="Kubernetes tooling, education software, and a placement platform that actually works." delay={2500} speed={30} />
        </p>

        {/* Currently building */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium">currently building WonStepCareer v2</span>
        </div>

        <ul className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4 pl-4">
          <li className="flex gap-1.5"><span>•</span><span>42 pull requests merged into repos I don&apos;t maintain, across three CNCF projects. <span className="font-semibold text-zinc-900 dark:text-white">Kyverno</span> enforces policy on Kubernetes clusters, <span className="font-semibold text-zinc-900 dark:text-white">Litmus</span> breaks them on purpose, and <span className="font-semibold text-zinc-900 dark:text-white">OpenYurt</span> runs them at the edge, where I stopped yurthub panicking on an EndpointSlice with a nil NodeName. Most of the rest is <span className="font-semibold text-zinc-900 dark:text-white">Sugar Labs&apos;</span> Music Blocks: memory leaks, event listener leaks, render performance.</span></li>
          <li className="flex gap-1.5"><span>•</span><span>Designed the <span className="font-semibold text-zinc-900 dark:text-white">Oasis 2025</span> and <span className="font-semibold text-zinc-900 dark:text-white">Apogee 2026</span> apps and sites. If you were on campus for either fest, you used them. Past 2,000 downloads between them, 4.6 stars on Oasis.</span></li>
          <li className="flex gap-1.5"><span>•</span><span>Built <a href={siteConfig.wscUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-900 underline decoration-black/20 underline-offset-[3px] transition-colors hover:decoration-black/60 dark:text-white dark:decoration-white/25 dark:hover:decoration-white/60">WonStepCareer</a> after watching capable batchmates get filtered out by branch and CGPA before a human read their resume. It matches on verified skills instead. Live at BITS Pilani.</span></li>
          <li className="flex gap-1.5"><span>•</span><span>Fed terabytes of satellite imagery, LiDAR point clouds and borehole logs through custom ML pipelines for <span className="font-semibold text-zinc-900 dark:text-white">CSIR</span>, scoring collapse risk across 200km of NH-208 at 94% accuracy. Months of manual geological survey, done in under 48 hours.</span></li>
          <li className="flex gap-1.5"><span>•</span><span>I build systems for the pleasure of it. <span className="font-semibold text-zinc-900 dark:text-white">pikapika</span> is a stack-based concatenative language in Go, with a hand-rolled lexer, recursive-descent parser and typed AST. <span className="font-semibold text-zinc-900 dark:text-white">OpenDiff</span> reviews pull requests from a Rust and Actix-web backend that caches hard to stay under GitHub&apos;s rate limit.</span></li>
        </ul>

        {/* Provenance strip — who is running this code, above the fold. */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            Merged into
          </span>
          {provenance.map((item) => (
            <a
              key={item.org}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-[5px] border border-black/30 px-2 py-1 transition-all duration-300 hover:-translate-y-[1px] hover:border-black/50 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)] dark:border-white/[0.15] dark:hover:border-white/30 dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.12)]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className="h-3 w-3 shrink-0 text-zinc-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100 dark:text-zinc-400"
              >
                <path d={item.icon.path} />
              </svg>
              <span className="text-[12px] font-medium text-zinc-700 transition-colors duration-300 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                {item.org}
              </span>
              <span className="text-[10px] tabular-nums text-zinc-400 dark:text-zinc-600">
                {item.note}
              </span>
            </a>
          ))}
        </div>

        <GithubStats />

        {/* Shipped-product stats, directly above the CTA. */}
        <div className="mt-4 flex flex-wrap items-center gap-y-2">
          {shipped.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="px-2 text-zinc-300 dark:text-zinc-700">
                  ·
                </span>
              )}
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-1.5"
              >
                <span className="text-[14px] font-bold tabular-nums leading-none text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  {stat.value}
                </span>
                <span className="text-[12px] text-zinc-500 underline decoration-transparent underline-offset-[3px] transition-colors group-hover:decoration-zinc-400 dark:text-zinc-400">
                  {stat.label}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <a href={siteConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer">
            <SoftPillButton as="span" variant="secondary" className="px-3 py-1.5 !text-[12px]">
              <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Let&apos;s build something
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </SoftPillButton>
          </a>
          <Link href="/contact">
            <SoftPillButton
              as="span"
              variant="secondary"
              className="px-3 py-1.5 !text-[12px]"
            >
              <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Send an email
              </div>
            </SoftPillButton>
          </Link>
        </div>

        {/* Socials */}
        <div id="contact" className="mt-6 scroll-mt-24">
          <h2 className="text-[14px] text-zinc-500 mb-2">Here are my <span className="font-medium text-zinc-800 dark:text-zinc-200">socials</span></h2>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: 'GitHub', href: siteConfig.socials.github, icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" fill="none"></path> },
              { name: 'WhatsApp', href: siteConfig.socials.whatsapp, icon: <path d="M20.52 3.449A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.423-8.452M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.437-9.884 9.888-9.884a9.825 9.825 0 0 1 9.881 9.892c-.003 5.45-4.437 9.884-9.885 9.884m5.421-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" fill="currentColor"></path> },
              { name: 'Twitter', href: siteConfig.socials.twitter, icon: <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768" stroke="currentColor" strokeWidth="2" fill="none"></path> },
              { name: 'LinkedIn', href: siteConfig.socials.linkedin, icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none"></path> },
            ].filter((social) => social.href).map((social, i) => (
              <SocialHoverCard key={i} socialName={social.name}>
                <SoftPillButton
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="px-3 py-1.5 !text-[12px]"
                >
                  <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                      {social.icon}
                    </svg>
                    {social.name}
                  </div>
                </SoftPillButton>
              </SocialHoverCard>
            ))}
            {hasResume && (
              <Link href="/resume">
                <SoftPillButton
                  as="span"
                  variant="secondary"
                  className="px-3 py-1.5 !text-[12px]"
                >
                  <span className="flex items-center gap-1.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    <FileText className="h-3.5 w-3.5" />
                    Resume
                  </span>
                </SoftPillButton>
              </Link>
            )}
          </div>
        </div>

        {/* Projects */}
        <ScrollReveal delay={100}>
        <div id="projects" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          <div className="py-2 relative mt-1">
            <h2 className="group flex items-center gap-2.5 text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight relative"><span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[calc(100%+32px)] h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent blur-[2px] pointer-events-none" /><span className="inline-block h-[14px] w-[3px] rounded-full bg-gradient-to-b from-sky-400 to-indigo-500" />Projects</h2>

            {/* Horizontal line below Projects heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 left-1/2 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          {/* Grid Container */}
          <div className="relative pt-6 pb-12 px-4">
            {/* Center Vertical Line */}
            <div className="absolute top-0 bottom-6 left-1/2 w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none -translate-x-1/2 hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

            <ProjectsGrid />

            {/* Bottom Horizontal Line */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          {/* View All Button */}
          <div className="flex justify-center -mt-[19px] pb-0 relative z-20">
            <Link href="/projects" className="relative group block">
              <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                View All
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>
        </ScrollReveal>

        {/* Experiences */}
        <ScrollReveal delay={0}>
        <div id="experience" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative">
            <h2 className="group flex items-center gap-2.5 text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight relative"><span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[calc(100%+32px)] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-[2px] pointer-events-none" /><span className="inline-block h-[14px] w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />Experiences</h2>
            {/* Bottom full-width line */}
            <div
              className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{
                maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
                WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
              }}
            />
            {/* Bottom Line Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="block mt-0">
            <ExperienceList />

            {/* View All Button */}
            <div className="py-4 px-4 -mx-4 flex justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer rounded-b-lg mt-0">
              <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Bottom Line Intersections */}
              <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <Link href="/experience" className="relative group block mt-0">
                <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
                <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                  View All
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Highlights */}
        <div id="highlights" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="group flex items-center gap-2.5 text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight relative"><span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[calc(100%+32px)] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent blur-[2px] pointer-events-none" /><span className="inline-block h-[14px] w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />Highlights</h2>

            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Highlights />
        </div>

        {/* Open Source */}
        <GithubGraph />

        <div id="opensource" className="scroll-mt-24">
          <OpenSourceContributions />
        </div>

        {/* Skills */}
        <div id="skills" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="group flex items-center gap-2.5 text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight relative"><span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[calc(100%+32px)] h-[1px] bg-gradient-to-r from-transparent via-violet-400/20 to-transparent blur-[2px] pointer-events-none" /><span className="inline-block h-[14px] w-[3px] rounded-full bg-gradient-to-b from-indigo-400 to-violet-500" />Skills & Technologies</h2>

            {/* Horizontal line below Skills heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="relative pt-6 pb-2">
            <div className="flex flex-wrap gap-2 w-full">
              {skills.map((skill, index) => (
                <div key={index} className="group grow flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-50 hover:bg-white dark:bg-[#0a0a0a] dark:hover:bg-[#141418] border border-black/30 dark:border-white/[0.15] rounded-[6px] transition-all duration-300 cursor-default hover:-translate-y-[2px] hover:border-black/50 dark:hover:border-white/30 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.12)]">
                  <svg
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                    fill="currentColor"
                    className="h-3.5 w-3.5 shrink-0 text-zinc-500 opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                  >
                    <path d={skill.icon.path} />
                  </svg>
                  <span className="whitespace-nowrap text-[13px] font-medium text-zinc-600 dark:text-zinc-400 transition-colors duration-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-6">
          <Terminal />
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-2 text-center">
            press <kbd className="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono">⌘K</kbd> to navigate
          </p>
        </div>

        {/* Closing statement */}
        <div className="mt-12 flex flex-col items-center justify-center relative py-12">
          <div className="flex w-full max-w-[560px] flex-col items-center">
            <p className="text-center text-[16px] font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              I don't ship code to impress hiring managers.
              <br className="hidden md:block" />{" "}
              <span className="text-zinc-700 dark:text-zinc-300">
                I ship it because the alternative is building someone else's vision.
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 mb-8 text-center">
          <p className="text-[11px] text-zinc-400">
            <a href="https://github.com/7se7en72025/port-v1" target="_blank" rel="noopener noreferrer" className="group inline-block hover:text-cyan-400 dark:hover:text-cyan-300 transition-all duration-300 underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-cyan-400 dark:hover:decoration-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]">built this</a>
            {' '}· Next.js + Tailwind
          </p>
        </div>

        {/* Fading Grid Filler */}
        <div className="flex-grow w-[calc(100%+32px)] -mx-4 h-[300px] relative mt-4">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Intersections */}
          <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <FooterBackground />
        </div>

      </div>

    </div>
    </ClickRipple>
  );
}
