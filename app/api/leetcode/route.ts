import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GraphQLResponse = {
    data?: unknown;
    errors?: unknown;
};

export async function GET() {
    const username = "shivengoomer";

    const query = `
    query getUserData($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
          starRating
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
        topPercentage
      }
    }
  `;

    const calQuery = `
    query getUserCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
          streak
          totalActiveDays
        }
      }
    }
  `;

    const submissionsQuery = `
    query recentSubmissions($username: String!) {
      recentAcSubmissionList(username: $username, limit: 10) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }
    }
  `;

    const fetchGQL = (query: string, variables: Record<string, string> = {}) =>
        fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com",
            },
            cache: "no-store",
            body: JSON.stringify({ query, variables }),
        }).then(async (r): Promise<GraphQLResponse> => {
            if (!r.ok) {
                throw new Error(`LeetCode request failed with ${r.status}`);
            }

            return r.json();
        });

    try {
        const [main, calendar, submissions] = await Promise.all([
            fetchGQL(query, { username }),
            fetchGQL(calQuery, { username }),
            fetchGQL(submissionsQuery, { username }),
        ]);

        return NextResponse.json({ main, calendar, submissions });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch LeetCode data",
            },
            { status: 502 },
        );
    }
}
