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

  console.log(query);

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
        <DialogContent className="w-[90%] rounded-md p-0 md:w-full">
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
              {query && results && !loading && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
              {results && (
                <CommandGroup heading="Search results">
                  {results.map((event) => (
                    <a href={`/event/${event.url_extension}`} key={event.id}>
                      <CommandItem>
                        <CalendarHeart />
                        <div>
                          <p className="text-md font-semibold text-white">
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
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
