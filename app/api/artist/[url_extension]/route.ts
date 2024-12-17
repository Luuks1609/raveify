import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ url_extension: string }> },
) {
  const url_extension = (await params).url_extension;

  // This api route calls the endpoint to fetch an artist. And returns the spotify ID.

  try {
    const artistDetails = await fetch(
      `https://api.beappic.com/rest-api/v1/community/pages/${url_extension}`,
    );

    console.log("hallo?");

    if (!artistDetails.ok) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: artistDetails.status },
      );
    }

    const data = await artistDetails.json();
    const { spotify } = data;
    const spotifyId = spotify.split("/").pop();

    return NextResponse.json(spotifyId);
  } catch (error) {
    console.error("Error fetching artist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
