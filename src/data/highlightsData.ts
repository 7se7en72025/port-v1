export type Highlight = {
  id: string;
  title: string;
  badge: string;
  image: string;
  /** Big figure shown in place of a screenshot. Keep it short — 1–4 characters. */
  metric?: string;
  /** Small caption under the metric. */
  metricLabel?: string;
  link?: string;
};

/**
 * Every claim here was checked against the GitHub API. Counts are point-in-time
 * (verified July 2026) — <GithubStats /> is the always-current source, these
 * cards carry the narrative that a bare number can't.
 */
export const highlightsData: Highlight[] = [
  {
    id: "cncf",
    badge: "CNCF",
    metric: "3",
    metricLabel: "merged upstream",
    title:
      "Fixes merged into Kyverno and Litmus — CNCF projects running in production clusters",
    image: "",
    link: "https://github.com/search?q=is%3Apr+author%3A7se7en72025+is%3Amerged+org%3Akyverno&type=pullrequests",
  },
  {
    id: "sugarlabs",
    badge: "Sugar Labs",
    metric: "31",
    metricLabel: "pull requests merged",
    title:
      "31 PRs merged into Music Blocks and Speak-AI, education software used by children worldwide",
    image: "",
    link: "https://github.com/search?q=is%3Apr+author%3A7se7en72025+is%3Amerged+org%3Asugarlabs&type=pullrequests",
  },
  {
    id: "nyxa-ui",
    badge: "Maintainer",
    metric: "53",
    metricLabel: "GitHub stars",
    title:
      "NYXA-UI — a component library designed, shipped and maintained solo, MIT licensed",
    image: "",
    link: "https://github.com/7se7en72025/NYXA-UI",
  },
  {
    id: "speak-ai",
    badge: "Shipped",
    metric: "AI",
    metricLabel: "SLM + LLM pipeline",
    title:
      "Rebuilt Sugar Labs' Speak activity as an AI-native tool with Kokoro voice synthesis",
    image: "",
    link: "https://github.com/7se7en72025/speak-ai",
  },
  {
    id: "reviews",
    badge: "Review",
    metric: "54",
    metricLabel: "code reviews",
    title:
      "54 pull request reviews in the past year across the 15 repositories I contribute to",
    image: "",
    link: "https://github.com/7se7en72025",
  },
];
