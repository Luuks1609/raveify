"use client";

import { CalendarHeart } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDebounce } from "@/hooks/use-debounce";
import { useState, useEffect } from "react";
import { SearchResultEvent } from "@/lib/types";
import { CommandLoading } from "cmdk";

const sampleResponse: SearchResultEvent[] = [
  {
    id: 217624,
    name: "Rotterdam Rave 2024 · Winter Special",
    cover_photo:
      "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/original/f7ae99ef-0fbd-40c8-af71-acfa678f6926.jpg",
    start: "2024-12-15 15:00:00",
    end: "2024-12-15 23:00:00",
    location: "Maassilo",
    address: "Rotterdam",
    is_cancelled: false,
    url_extension: "rotterdam-rave-2024-winter-special-2024",
  },
  {
    id: 216718,
    name: "Rotterdam Rave 2025 · Kick Off",
    cover_photo:
      "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/original/6f4a1285-b092-4ce5-a98c-724a7dcf6914.jpg",
    start: "2025-02-15 14:00:00",
    end: "2025-02-16 00:00:00",
    location: "Ahoy",
    address: "Rotterdam",
    is_cancelled: false,
    url_extension: "rotterdam-rave-kick-off",
  },
  {
    id: 219089,
    name: "Rotterdam Rave Afterparty 2025 · Kick-Off",
    cover_photo:
      "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/original/94994e85-a96c-4029-94b8-6a761ce368b7.jpg",
    start: "2025-02-15 23:00:00",
    end: "2025-02-16 07:00:00",
    location: "Maassilo",
    address: "Rotterdam",
    is_cancelled: false,
    url_extension: "rotterdam-rave-afterparty-2025-kick-off",
  },
  {
    id: 219391,
    name: "Rotterdam Rave 2025 · Spring Special",
    cover_photo:
      "https://app2xpr.s3.eu-central-1.amazonaws.com/media/app-images/original/5bc4f6f9-7e58-4fcf-9fda-2aa1fd64fc85.jpg",
    start: "2025-03-29 14:00:00",
    end: "2025-03-29 23:00:00",
    location: "Maassilo",
    address: "Rotterdam",
    is_cancelled: false,
    url_extension: "rotterdam-rave-2025-spring-special",
  },
];

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultEvent[]>();
  const debouncedSearchValue = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedSearchValue) {
      handleSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  async function handleSearch(searchQuery: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error during fetching events:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Command>
            <CommandInput
              className=""
              readOnly
              placeholder="What event are you looking for?"
            />
          </Command>
        </DialogTrigger>
        <DialogContent className="rounded p-0">
          <DialogTitle className="sr-only">Search Event</DialogTitle>
          <Command
            shouldFilter={false}
            className=""
            filter={(value, search) => {
              const normalize = (str: string) =>
                str
                  .toLowerCase()
                  .replace(/[^a-z0-9\s]/g, "")
                  .split(" ")
                  .filter(Boolean);

              const normalizedValueWords = normalize(value);
              const normalizedSearchWords = normalize(search);

              const matches = normalizedSearchWords.every((searchWord) =>
                normalizedValueWords.some((valueWord) =>
                  valueWord.startsWith(searchWord),
                ),
              );

              return matches ? 1 : 0;
            }}
          >
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Type the name of an event..."
            />
            <CommandList key={results?.length || 0}>
              {query && <CommandEmpty>No results found.</CommandEmpty>}
              <CommandGroup heading="Search results">
                {results &&
                  results.map((event) => (
                    <a href={`/event/${event.url_extension}`} key={event.id}>
                      <CommandItem>
                        <CalendarHeart />
                        <div>
                          <p className="text-md font-semibold text-brand">
                            {event.name}{" "}
                            <span className="sr-only">{event.start}</span>
                          </p>
                          <span className="text-muted-foreground">
                            {new Date(event.start).toLocaleDateString(
                              undefined,
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}{" "}
                            • {event.location}
                          </span>
                        </div>
                      </CommandItem>
                    </a>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
