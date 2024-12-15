import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { query } = await request.json();
    const formattedQuery = encodeURIComponent(query.trim());

    const response = await fetch(
      `https://api.beappic.com/rest-api/v1/search/events?name=${formattedQuery}&page_size=4`
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
