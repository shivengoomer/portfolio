import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
};

export async function GET() {
  const username = "shivengoomer";

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github+json" },
        cache: "no-store",
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        {
          headers: { Accept: "application/vnd.github+json" },
          cache: "no-store",
        },
      ),
    ]);

    if (!userResponse.ok) {
      throw new Error(`GitHub user request failed with ${userResponse.status}`);
    }

    if (!reposResponse.ok) {
      throw new Error(`GitHub repos request failed with ${reposResponse.status}`);
    }

    const user = (await userResponse.json()) as GitHubUser;
    const repos = (await reposResponse.json()) as GitHubRepo[];
    const sourceRepos = repos.filter((repo) => !repo.fork);
    const totalStars = sourceRepos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );
    const totalForks = sourceRepos.reduce(
      (sum, repo) => sum + repo.forks_count,
      0,
    );
    const languages = sourceRepos.reduce<Record<string, number>>((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      }

      return acc;
    }, {});
    const topLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([name, count]) => ({ name, count }));
    const topRepos = [...sourceRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((repo) => ({
        name: repo.name,
        href: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
      }));

    return NextResponse.json({
      user,
      stats: {
        totalStars,
        totalForks,
        sourceRepos: sourceRepos.length,
        topLanguages,
        topRepos,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch GitHub data",
      },
      { status: 502 },
    );
  }
}
