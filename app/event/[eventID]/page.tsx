import CreatePlaylist from "@/components/CreatePlaylist";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Artist } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Calendar, ChevronLeft, House, Pin } from "lucide-react";

const sampleResponse = {
  id: 217624,
  name: "Rotterdam Rave 2024 · Winter Special",
  short_description:
    "Sunday, funday! Let&#8217;s get experimental with exciting F2F&#8217;s in Maassilo&#8217;s main room.<br /><br />&#8213;&#119827;&#119816;&#119810;&#119818;&#119812;&#119827;&#119826; &#8213;<br /><br />Available via www.rotterdamrave.com.<br /><br />&#8213; &#119819;&#119816;&#119821;&#119812;-&#119828;&#119823; &#8213;<br /><br />Adri&#225;n Mills f2f Wilder&#237;ch<br />BY&#216;RN f2f KUKO<br />Cloudy f2f Winson<br />Fumi f2f Linus Villa<br />Klofama f2f Toxic Machinery<br />Serafina f2f Zwilling<br /><br />&#8213; &#119816;&#119820;&#119823;&#119825;&#119812;&#119826;&#119826;&#119816;&#119822;&#119821; &#8213;<br /><br />Rotterdam Rave &#039;Winter Special&#039; 2023<br /><br />&#8213; &#119816;&#119821;&#119813;&#119822;&#119825;&#119820;&#119808;&#119827;&#119816;&#119822;&#119821; &#8213;",
  long_description:
    'Sunday, funday! Let&#8217;s get experimental with exciting F2F&#8217;s in Maassilo&#8217;s main room.<br /><br />&#8213;&#119827;&#119816;&#119810;&#119818;&#119812;&#119827;&#119826; &#8213;<br /><br />Available via www.rotterdamrave.com.<br /><br />&#8213; &#119819;&#119816;&#119821;&#119812;-&#119828;&#119823; &#8213;<br /><br />Adri&#225;n Mills f2f Wilder&#237;ch<br />BY&#216;RN f2f KUKO<br />Cloudy f2f Winson<br />Fumi f2f Linus Villa<br />Klofama f2f Toxic Machinery<br />Serafina f2f Zwilling<br /><br />&#8213; &#119816;&#119820;&#119823;&#119825;&#119812;&#119826;&#119826;&#119816;&#119822;&#119821; &#8213;<br /><br />Rotterdam Rave &#039;Winter Special&#039; 2023:<br /><a href="https://www.youtube.com/watch?v=CvHqBPCF1OE" target="_blank">https://www.youtube.com</a><br /><br />&#8213; &#119816;&#119821;&#119813;&#119822;&#119825;&#119820;&#119808;&#119827;&#119816;&#119822;&#119821; &#8213;<br /><br />- Doors are open till 21:00<br />- FAQ and travel info: www.rotterdamrave.com<br />- 18+<br />- If this event cannot take place due to covid, all ticket holders wil receive a refund excluding the service fee.',
  category: "category_event_indoor_music_event",
  photo:
    "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/336233c9-bfb7-4c5d-9852-8b722dd64498.1024x1024_q85_crop-smart.jpg",
  secondary_photo: null,
  photo_id: "",
  slider: [
    {
      id: 0,
      photo:
        "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/original/f7ae99ef-0fbd-40c8-af71-acfa678f6926.jpg",
      photo_id:
        "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/original/f7ae99ef-0fbd-40c8-af71-acfa678f6926.jpg",
      width: 1920,
      height: 1080,
    },
  ],
  map_photo: null,
  venue: {
    id: 1567,
    name: "Maassilo",
    category: "category_venue_dance_club",
    photo:
      "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/aebcc2db-c32f-45ac-b880-88db48e9e8c7.200x200_q85_crop-smart.jpg",
    slider: [],
    street: "Maashaven Zuidzijde 1 – 2",
    zip_code: "3081 AE",
    city: "Rotterdam",
    country: "NL",
    location: { lat: 51.8978342, lon: 4.4947944 },
    web_page: null,
    mobile_page: "",
    hours: ["", "", "", "", "", "", ""],
    short_description: "",
    long_description: "",
    is_claimed: true,
    is_public: true,
    venue_status: 1,
    photos: [],
    visitors_count: 0,
    details: {
      variable_wheelchair_accessible: 1,
      variable_consumption_tokens: 1,
      variable_serves_alcoholic_beverages: 1,
      variable_vip_area: 0,
      variable_table_reservation: 0,
      variable_dance_floor: "dance_floor_yes",
      variable_facebook_page: "https://www.facebook.com/142711202450846",
      variable_soundcloud: "https://soundcloud.com/maassilo",
      variable_instagram: "https://www.instagram.com/OfficialMaassilo/",
      variable_twitter: "https://twitter.com/factory010",
    },
    is_verified: 1,
    is_highlighted: 0,
    url_extension: "maassilo",
  },
  venue_id: 1567,
  venue_name: "Maassilo",
  location: { lat: 51.8978342, lon: 4.4947944 },
  start: "2024-12-15 15:00:00",
  end: "2024-12-15 23:00:00",
  visitors_count: 69,
  followers_count: 54,
  details: {
    variable_music_style: ["music_techno"],
    variable_minimum_age: "18",
    variable_spotify:
      "https://open.spotify.com/user/rotterdamserave/playlist/11OQAYhaIk0pxesLDWIzfW",
    variable_youtube:
      "https://www.youtube.com/channel/UCPUH7zFWcwDAMHvJzgigs3w",
    variable_instagram: "https://www.instagram.com/rotterdamrave/",
    variable_soundcloud: "https://soundcloud.com/rotterdamse-rave",
    variable_tiktok: "https://www.tiktok.com/@rotterdamrave",
    variable_facebook_page: "https://facebook.com/events/896241985759322",
    variable_partyflock: "https://partyflock.nl/party/473411:Rotterdam-Rave",
  },
  web_page: null,
  movie: "https://www.youtube.com/v/CvHqBPCF1OE",
  mobile_page: null,
  ticket_link: "https://partyflock.nl/order_ticket/473411?appic",
  areas: [
    {
      id: 222190,
      name: "Main Stage",
      description: null,
      latitude: null,
      longitude: null,
      event_map_image: null,
      sponsor_description: null,
      sponsor_button_url: null,
      sponsor_button_text: null,
      sponsor_banner: "",
    },
    {
      id: 222192,
      name: "Area #1",
      description: null,
      latitude: null,
      longitude: null,
      event_map_image: null,
      sponsor_description: null,
      sponsor_button_url: null,
      sponsor_button_text: null,
      sponsor_banner: "",
    },
  ],
  performances: null,
  performances_plans: [
    {
      id: 900175,
      area: 221778,
      name: "Shlømo",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 3833,
          name: "Shlømo",
          category: "category_artist_dj",
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/f6444dc0-6f2d-4ef4-b648-94c83a9fa283.200x200_q85_crop-smart.jpg",
          followers_count: 881,
          music_styles: ["music_techno"],
          url_extension: "shlmo",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900176,
      area: 221778,
      name: "Cynthia Spiering",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 9824,
          name: "Cynthia Spiering",
          category: "category_artist_dj",
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/5d8b6b48-c401-4698-aa37-604e9924b473.200x200_q85_crop-smart.jpg",
          followers_count: 1389,
          music_styles: ["music_techno"],
          url_extension: "cynthia-spiering",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900177,
      area: 221778,
      name: "Kruelty",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 14406,
          name: "Kruelty",
          category: "category_artist_dj",
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/2123d023-76f5-4e72-a807-a9ee00cda2c3.200x200_q85_crop-smart.jpg",
          followers_count: 512,
          music_styles: ["music_hardstyle"],
          url_extension: "kruelty",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900178,
      area: 221778,
      name: "DIØN",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 19055,
          name: "DIØN",
          category: "category_artist_dj",
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/c7369402-9938-47b9-b4ac-f9ecf7dfa86b.200x200_q85_crop-smart.jpg",
          followers_count: 2174,
          music_styles: ["music_techno"],
          url_extension: "din-nl",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900179,
      area: 221778,
      name: "Basswell",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 58517,
          name: "Basswell",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/c00cdb31-9fa1-485c-9237-25ab2c36e4fe.200x200_q85_crop-smart.jpg",
          followers_count: 185,
          music_styles: ["music_techno"],
          url_extension: "basswell",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900180,
      area: 221778,
      name: "NOVAH",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 121347,
          name: "NOVAH",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/2c4d2717-3446-4ca9-bcb1-054b9cd9950c.200x200_q85_crop-smart.jpg",
          followers_count: 13,
          music_styles: [],
          url_extension: "novah",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900181,
      area: 221778,
      name: "BYØRN",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 121348,
          name: "BYØRN",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/b3441e80-6a07-4951-b7fa-902835f4f022.200x200_q85_crop-smart.jpg",
          followers_count: 16,
          music_styles: ["music_techno", "music_house"],
          url_extension: "byrn",
        },
      ],
      created_at: "2024-10-01 00:00:07",
      is_mc: null,
    },
    {
      id: 900182,
      area: 221778,
      name: "6EJOU",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 124482,
          name: "6EJOU",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/dd2ccf34-8a40-44f2-83b3-719305ed75d9.200x200_q85_crop-smart.jpg",
          followers_count: 443,
          music_styles: ["music_techno"],
          url_extension: "6ejou",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
    {
      id: 900183,
      area: 221778,
      name: "Fenrick",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 130047,
          name: "Fenrick",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/f2818388-f4a0-4d07-986a-6c7e97143440.200x200_q85_crop-smart.jpg",
          followers_count: 1,
          music_styles: ["music_techno"],
          url_extension: "fenrick",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
    {
      id: 900184,
      area: 221778,
      name: "Durdenhauer",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 130465,
          name: "Durdenhauer",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/76c9d967-44ff-4ec1-8f95-4017ca9b406e.200x200_q85_crop-smart.jpg",
          followers_count: 0,
          music_styles: ["music_techno", "music_house"],
          url_extension: "durdenhauer",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
    {
      id: 900185,
      area: 221778,
      name: "Winson",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 131106,
          name: "Winson",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/d1c8194d-d550-4d9b-9d75-c5ea14195e54.200x200_q85_crop-smart.jpg",
          followers_count: 293,
          music_styles: ["music_techno"],
          url_extension: "winson",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
    {
      id: 900186,
      area: 221778,
      name: "Klofama",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 133073,
          name: "Klofama",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/022f9d1a-4895-494d-bb00-56c5df9804fb.200x200_q85_crop-smart.jpg",
          followers_count: 52,
          music_styles: [],
          url_extension: "klofama",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
    {
      id: 900187,
      area: 221778,
      name: "Toxic Machinery",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 134957,
          name: "Toxic Machinery",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/0ecfff94-f764-4dbb-9eaf-7244568d3c73.200x200_q85_crop-smart.jpg",
          followers_count: 163,
          music_styles: [],
          url_extension: "toxic-machinery",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
    {
      id: 900188,
      area: 221778,
      name: "Onlynumbers",
      photo: null,
      category: null,
      description: null,
      day: "2025-02-28",
      start: null,
      end: null,
      artists: [
        {
          id: 138237,
          name: "Onlynumbers",
          category: null,
          photo:
            "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/thumbnail/b0ec480d-8266-4617-a4c0-79bbd331a67a.200x200_q85_crop-smart.jpg",
          followers_count: 21,
          music_styles: ["music_techno"],
          url_extension: "onlynumbers",
        },
      ],
      created_at: "2024-10-01 00:00:08",
      is_mc: null,
    },
  ],
  address: {
    id_address: 6669251,
    zip_code: "3081 AE",
    street: "Maashaven Zuidzijde 1 – 2",
    city: "Rotterdam",
    country: "NL",
    latitude: 51.8978342,
    longitude: 4.4947944,
    is_dummy: false,
  },
  is_highlighted: null,
  is_verified: 1,
  timetable_days: [
    {
      id: 158552,
      day: "2024-12-15",
      start: "2024-12-15 15:00:00",
      end: "2024-12-15 23:00:00",
      areas: [Array],
      min_age: 18,
      performance_start: "2024-12-15 15:00:00",
      performance_end: "2024-12-15 23:00:00",
    },
  ],
  timetable_release_date: null,
  timetable_released: false,
  ordering: 1734260331,
  event_map: null,
  updated_at: "2024-10-04 16:00:39",
  last_event_update: "2024-12-14 01:00:50",
  has_cashless_payment_provider: false,
  ui: null,
  tags: [{ name: "Weekend", key: "weekend", color: "#00ad00" }],
  url_extension: "rotterdam-rave-2024-winter-special-2024",
  live_streams: [],
  is_live_stream_only: false,
  web_shop_url: null,
  galleries: [],
  photos_count: 0,
  background_movie: null,
  custom_tabs: [],
  sponsors: [],
  hide_interactive_event_map_popup: false,
  headers: [],
  is_user_checked_in: false,
  is_reviewed_already: false,
  is_followed: false,
  last_update: "2024-12-14T01:00:50",
  custom_tabs_keys: [
    ["notifications", "Notifications"],
    ["cashless", "Cashless"],
  ],
};

async function fetchEvent(url_extension: string) {
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

  const artists = data.performances_plans.flatMap((p: any) => p.artists);
  const artistNames = artists.map((artist: any) => artist.name);

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
          {artists.map((artist: Artist) => (
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
          ))}
        </div>
        {/* <div className="flex flex-wrap text-center">
          {data.performances_plans.map((p) => p.name).join(" · ")}
        </div> */}
      </MaxWidthWrapper>
    </div>
  );
}
