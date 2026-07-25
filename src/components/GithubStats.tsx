"use client";

import { useEffect, useState } from "react";

/**
 * Live headline numbers pulled from the GitHub API via the /api/github proxy.
 *
 * Seeded with the values that were true when this shipped, so the strip renders
 * real figures on first paint instead of zeros or skeletons, then updates in
 * place once the live query resolves.
 */
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
      }
    }
    repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
      nodes {
        stargazerCount
      }
    }
  }
}`;

export function GithubStats() {
  const [stats, setStats] = useState(SEED);

  useEffect(() => {
    const cacheKey = "github_stats";

    const fetchStats = async () => {
      const cached =
        typeof window !== "undefined" ? localStorage.getItem(cacheKey) : null;
      if (cached) {
        try {
          setStats(JSON.parse(cached));
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
        };

        setStats(next);
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
              {item.value}
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
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
