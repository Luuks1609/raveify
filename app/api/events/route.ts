import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "5 s"),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await getServerSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const identifier = session.user!.email!;
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return new Response(
        JSON.stringify({ error: "Unable to process at this time" }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { query } = await request.json();
    const formattedQuery = encodeURIComponent(query.trim());

    const response = await fetch(
      `${process.env.DATA_API_ENDPOINT}/rest-api/v1/search/events?name=${formattedQuery}&page_size=4`,
    );
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during fetching events:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
