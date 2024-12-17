import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ url_extension: string }> },
) {
  const url_extension = (await params).url_extension;

  try {
    // Vervang dit met je externe API-aanroep
    const eventDetails = await fetch(
      `${process.env.DATA_API_ENDPOINT}/rest-api/v3/events/${url_extension}`,
    );

    if (!eventDetails.ok) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: eventDetails.status },
      );
    }

    const data = await eventDetails.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
