"use client";

import { useEffect, useState } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

const SEED = {
  upstreamMerged: 42,
  stars: 54,
  reposContributed: 15,
  contributions: 351,
};

const STATS_QUERY = `query {
  upstream: search(query: "is:pr author:7se7en72025 is:merged -user:7se7en72025", type: ISSUE) {
    issueCount
  }
  user(login: "7se7en72025") {
    contributionsCollection {
      totalRepositoriesWithContributedCommits
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
    repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
      nodes {
        stargazerCount
      }
    }
  }
}`;

interface ContributionDay {
  contributionCount: number;
  date: string;
}

function getLevel(count: number): string {
  if (count === 0) return "bg-zinc-800 dark:bg-zinc-800/50";
  if (count <= 2) return "bg-emerald-900 dark:bg-emerald-900/60";
  if (count <= 5) return "bg-emerald-700 dark:bg-emerald-700/70";
  return "bg-emerald-500 dark:bg-emerald-500/80";
}

export function GithubStats() {
  const [stats, setStats] = useState(SEED);
  const [heatmap, setHeatmap] = useState<ContributionDay[]>([]);

  useEffect(() => {
    const cacheKey = "github_stats";

    const fetchStats = async () => {
      const cached =
        typeof window !== "undefined" ? localStorage.getItem(cacheKey) : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setStats(parsed);
          if (parsed._heatmap) setHeatmap(parsed._heatmap);
        } catch {
          // Stale or corrupt cache — the live fetch below replaces it.
        }
      }

      try {
        const response = await fetch("/api/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: STATS_QUERY }),
        });
        const json = await response.json();
        const user = json?.data?.user;
        const upstream = json?.data?.upstream;
        if (!user || !upstream) return;

        const weeks = user.contributionsCollection.contributionCalendar.weeks ?? [];
        const last12 = weeks.slice(-12);
        const days: ContributionDay[] = last12.flatMap(
          (w: { contributionDays: ContributionDay[] }) => w.contributionDays
        );

        const next = {
          upstreamMerged: upstream.issueCount,
          stars: (user.repositories?.nodes ?? []).reduce(
            (sum: number, repo: { stargazerCount: number }) =>
              sum + repo.stargazerCount,
            0,
          ),
          reposContributed:
            user.contributionsCollection.totalRepositoriesWithContributedCommits,
          contributions:
            user.contributionsCollection.contributionCalendar.totalContributions,
          _heatmap: days,
        };

        setStats(next);
        setHeatmap(days);
        localStorage.setItem(cacheKey, JSON.stringify(next));
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error);
      }
    };

    fetchStats();
  }, []);

  const items = [
    { value: stats.upstreamMerged, label: "Merged Upstream" },
    { value: stats.stars, label: "Stars Earned" },
    { value: stats.reposContributed, label: "Repos Contributed" },
    { value: stats.contributions, label: "Contributions" },
  ];

  return (
    <div className="relative mt-6">
      <span
        className="pointer-events-none absolute inset-x-[-100vw] top-0 h-0 border-t border-black/30 dark:border-white/[0.15]"
        style={{
          maskImage:
            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
          WebkitMaskImage:
            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
        }}
      />
      <div className="grid grid-cols-2 py-3 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="relative min-w-0 px-3 py-2 after:absolute after:bottom-0 after:right-0 after:top-0 after:w-0 after:border-r after:border-black/30 after:[mask-image:repeating-linear-gradient(to_bottom,black_0,black_1px,transparent_1px,transparent_6px)] dark:after:border-white/[0.15] [&:nth-child(2n)]:after:hidden sm:[&:not(:last-child)]:after:block sm:[&:last-child]:after:hidden"
          >
            <p className="text-[20px] font-bold leading-none tabular-nums text-zinc-900 dark:text-zinc-100">
              <AnimatedCounter target={item.value} duration={1800} />
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mini heatmap — last12 weeks */}
      {heatmap.length > 0 && (
        <div className="flex items-center gap-[3px] px-3 pb-3 overflow-hidden">
          {heatmap.map((day, i) => (
            <div
              key={day.date}
              title={`${day.contributionCount} contributions on ${day.date}`}
              className={`w-[3px] h-[3px] rounded-[1px] ${getLevel(day.contributionCount)} transition-colors duration-200`}
            />
          ))}
        </div>
      )}

      <span
        className="pointer-events-none absolute inset-x-[-100vw] bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]"
        style={{
          maskImage:
            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
          WebkitMaskImage:
            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
        }}
      />
    </div>
  );
}
