import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 5 seconds per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(200, "60 s"),
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ url_extension: string }> },
) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url_extension = (await params).url_extension;

  const { success } = await ratelimit.limit(accessToken);

  if (!success) {
    console.log("rate limit called");
    return NextResponse.json(
      { error: "Too many requests, please try again later" },
      { status: 429 },
    );
  }

  const cacheKey = `artist-${url_extension}`; // Unique cache key per artist

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache");
      return NextResponse.json(cachedData, {
        status: 200,
      });
    }

    const artistDetails = await fetch(
      `${process.env.DATA_API_ENDPOINT}/rest-api/v1/community/pages/${url_extension}`,
    );

    if (!artistDetails.ok) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: artistDetails.status },
      );
    }

    const data = await artistDetails.json();
    if (data && data.spotify) {
      const spotifyId = data.spotify.split("/").pop();
      await redis.set(cacheKey, JSON.stringify(spotifyId));
      console.log("Serving from API and caching result");
      return NextResponse.json(spotifyId);
    } else {
      return NextResponse.json(
        { error: "Spotify ID not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error fetching artist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
