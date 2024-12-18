import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ url_extension: string }> },
) {
  const url_extension = (await params).url_extension;

  if (!url_extension) {
    return NextResponse.json(
      { error: "url_extension is required" },
      { status: 400 },
    );
  }

  const cacheKey = `event-${url_extension}`; // Unieke cache key per event

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache");
      return NextResponse.json(JSON.parse(cachedData as string), {
        status: 200,
      });
    }

    const response = await fetch(
      `${process.env.DATA_API_ENDPOINT}/rest-api/v3/events/${url_extension}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    console.log("Serving from API and caching result");

    const data = await response.json();

    await redis.set(cacheKey, JSON.stringify(data));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
