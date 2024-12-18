import CreatePlaylist from "@/components/CreatePlaylist";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Artist, Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Calendar, ChevronLeft, House, Pin } from "lucide-react";
import { getServerSession } from "next-auth";

// Create a new ratelimiter, that allows 10 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "5 s"),
});

async function fetchEvent(url_extension: string): Promise<Event> {
  const session = await getServerSession();

  if (!session) {
    throw new Error("No session found");
  }

  const identifier = session.user!.email!;
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    throw new Error("Unable to process at this time");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${url_extension}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  return res.json();
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventID: string }>;
}) {
  const eventID = (await params).eventID;

  const data = await fetchEvent(eventID);
  //   const data = sampleResponse;

  if (!data) {
    return <div>Event not found</div>;
  }

  const eventStats = [
    {
      icon: Calendar,
      text: formatDate(data.start),
    },
    {
      icon: Pin,
      text: data.venue.name,
    },
    {
      icon: House,
      text: `${data.venue.city}, ${data.venue.country}`,
    },
  ];

  let artists: Artist[] = data.performances_plans.flatMap(
    (p: any) => p.artists,
  );

  if (artists.length === 0 && data.performances) {
    artists = data.performances.areas.flatMap((area) =>
      area.performances.flatMap((p: any) => p.artists),
    );
  }

  const artists_url_extensions = artists.map(
    (artist: Artist) => artist.url_extension,
  );

  return (
    <div className="">
      <Navbar
        actionItem={
          <a href="/">
            <Button variant="secondary" className="bg-secondary hover:bg-brand">
              <ChevronLeft />
            </Button>
          </a>
        }
      />
      <div className="relative mb-10 h-[35vh] overflow-hidden">
        <img
          src={data.photo}
          className="h-full w-full object-cover object-top blur-md filter"
          alt=""
        />
        <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 mt-5 w-full -translate-x-1/2 -translate-y-1/2 transform px-5">
          <p className="px-5 text-center text-3xl font-black leading-9 drop-shadow invert-0">
            {data.name}
          </p>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {eventStats.map((item) => (
              <li
                key={item.text}
                className="flex items-center justify-center gap-x-3"
              >
                <item.icon className="size-5 text-brand" />
                <span className="text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <MaxWidthWrapper className="space-y-6">
        <div className="flex w-full justify-center">
          <CreatePlaylist
            name={data.name}
            description={`Playlist by Raveify`}
            artistNames={artists_url_extensions}
          />
        </div>
        <div className="flex flex-col gap-3">
          {artists.length > 0 ? (
            artists.map((artist: Artist) => (
              <div
                key={artist.id}
                className="flex items-center gap-3 rounded bg-secondary p-4"
              >
                {artist.photo && (
                  <img
                    src={artist.photo}
                    className="size-10 rounded-full"
                    alt=""
                  />
                )}
                <div className="flex flex-col">
                  <p>{artist.name}</p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {artist.music_styles
                      .map((m: string) => m)
                      .join(", ")
                      .replaceAll("music_", "")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No lineup available
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
