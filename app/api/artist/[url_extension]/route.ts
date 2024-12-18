import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ url_extension: string }> },
) {
  const url_extension = (await params).url_extension;

  // This api route calls the endpoint to fetch an artist. And returns the spotify ID.

  try {
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
      return NextResponse.json(data.spotify.split("/").pop());
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
