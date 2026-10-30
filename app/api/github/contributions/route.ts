import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export type ContributionDay = {
  date: string;
  weekday: number;
  contributionCount: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type GitHubContributionsPayload = {
  username: string;
  year: number;
  totalContributions: number;
  weeks: ContributionWeek[];
  busiestDay: {
    date: string;
    count: number;
  };
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  source: "live" | "fallback";
};

// Generates high-fidelity fallback weeks if network request fails or rate limits
function generateFallbackCalendar(year: number): {
  weeks: ContributionWeek[];
  totalContributions: number;
  busiestDay: { date: string; count: number };
  activeDays: number;
} {
  const weeks: ContributionWeek[] = [];
  let total = 0;
  let activeDays = 0;
  let maxCount = 0;
  let maxDate = `${year}-06-15`;

  const startDate = new Date(year, 0, 1);
  // Roll back to the previous Sunday if not Sunday
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  const currentDate = new Date(startDate);
  const endDate = new Date(year, 11, 31);

  for (let w = 0; w < 53; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const inYear = currentDate.getFullYear() === year;

      // Seed pseudo-random realistic commit distribution based on week & day
      let count = 0;
      if (inYear) {
        const seed = Math.sin(w * 13 + d * 7 + year) * 10000;
        const rand = seed - Math.floor(seed);
        if (rand > 0.42) {
          count = Math.floor(rand * 8);
          if (rand > 0.88) count = Math.floor(rand * 15);
        }
      }

      if (count > 0) {
        total += count;
        activeDays++;
        if (count > maxCount) {
          maxCount = count;
          maxDate = dateStr;
        }
      }

      days.push({
        date: dateStr,
        weekday: d,
        contributionCount: count,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push({ contributionDays: days });
    if (currentDate > endDate && w >= 51) break;
  }

  return {
    weeks,
    totalContributions: total || 420,
    busiestDay: { date: maxDate, count: maxCount || 12 },
    activeDays: activeDays || 160,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "shivengoomer";
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : 2026;

  try {
    const lambdaUrl = `https://uvdvlzzjiciqsfkl7u37nnhnsm0sleur.lambda-url.eu-central-1.on.aws?username=${encodeURIComponent(
      username
    )}&year=${year}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(lambdaUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      const calendar =
        json?.user?.contributionsCollection?.contributionCalendar;

      if (calendar && Array.isArray(calendar.weeks)) {
        const weeks: ContributionWeek[] = calendar.weeks;
        const total = calendar.totalContributions ?? 0;

        let maxCount = 0;
        let maxDate = "";
        let activeDays = 0;
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        for (const week of weeks) {
          for (const day of week.contributionDays ?? []) {
            if (day.contributionCount > 0) {
              activeDays++;
              tempStreak++;
              if (tempStreak > longestStreak) longestStreak = tempStreak;
              if (day.contributionCount > maxCount) {
                maxCount = day.contributionCount;
                maxDate = day.date;
              }
            } else {
              tempStreak = 0;
            }
          }
        }
        currentStreak = tempStreak;

        const payload: GitHubContributionsPayload = {
          username,
          year,
          totalContributions: total,
          weeks,
          busiestDay: {
            date: maxDate || `${year}-05-12`,
            count: maxCount,
          },
          activeDays,
          longestStreak,
          currentStreak,
          source: "live",
        };

        return NextResponse.json(payload, {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      }
    }
  } catch (err) {
    console.warn("Failed to fetch GitHub contributions from proxy, using fallback:", err);
  }

  // Graceful fallback
  const fallback = generateFallbackCalendar(year);
  const payload: GitHubContributionsPayload = {
    username,
    year,
    totalContributions: fallback.totalContributions,
    weeks: fallback.weeks,
    busiestDay: fallback.busiestDay,
    activeDays: fallback.activeDays,
    longestStreak: 18,
    currentStreak: 4,
    source: "fallback",
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}

