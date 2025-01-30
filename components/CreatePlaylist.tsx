"use client";

import {
  fetchRelevantTracks,
  fetchSpotifyUserId,
  generatePlaylist,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { RiLoader5Fill } from "@remixicon/react";
import { Label } from "./ui/label";
import MultipleSelector from "./ui/multiselect";

export default function CreatePlaylist({
  name,
  description,
  artistNames,
  coverImage,
}: {
  name: string;
  description: string;
  artistNames: string[];
  coverImage: string;
}) {
  const [loading, setLoading] = useState(false);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [playlistUri, setPlaylistUri] = useState<string | null>(null);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [excludedArtists, setExcludedArtists] = useState<string[]>([]);

  async function createPlaylist() {
    setLoading(true);
    const session = await getSession();

    if (!session) {
      console.error("No session found");
      setLoading(false);
      return;
    }

    // @ts-ignore
    const accessToken = session.accessToken;

    try {
      const userId = await fetchSpotifyUserId(accessToken);

      // Filter out the excluded artists
      const filteredArtistNames = artistNames.filter(
        (artist) => !excludedArtists.includes(artist),
      );

      const trackIds = await fetchRelevantTracks(
        accessToken,
        filteredArtistNames,
      );

      const { playlistId, playlistUri } = await generatePlaylist(
        name,
        description,
        coverImage,
        userId,
        trackIds,
        accessToken,
      );

      setPlaylistCreated(true);
      setPlaylistUri(playlistUri);
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"brand"} className="w-full rounded py-7">
          Create playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] space-y-4 rounded-md md:w-full">
        <DialogHeader>
          <DialogTitle>Create playlist</DialogTitle>
          <DialogDescription>
            {playlistCreated
              ? "🎉 Your playlist is ready! Time to rave!"
              : "Sit tight while we prepare your ultimate playlist."}
          </DialogDescription>
        </DialogHeader>

        {!playlistCreated && loading && (
          // loading state here
          <div className="flex justify-center">
            <RiLoader5Fill className="size-6 animate-spin" />
          </div>
        )}

        {/* Footer-knop */}
        <DialogFooter>
          {/* Succesmelding en opties na creatie */}
          {playlistCreated && (
            <div className="w-full space-y-4">
              <p className="flex items-center justify-center space-x-2 text-center text-lg font-bold text-white">
                <CheckIcon className="size-5 text-green-500" />
                <span className="text-center">
                  Playlist successfully created!
                </span>
              </p>

              <div className="flex flex-col space-y-2">
                <Button
                  asChild
                  className="rounded bg-brand text-white hover:bg-green-600"
                >
                  <a
                    href={playlistUri!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open on Spotify
                  </a>
                </Button>
              </div>
            </div>
          )}

          {!playlistCreated && (
            <div className="grid w-full gap-4 py-4">
              <Button
                type="submit"
                className="w-full"
                variant={"brand"}
                onClick={createPlaylist}
                disabled={loading}
              >
                {loading ? "Creating..." : "Start creating playlist"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    Advanced options
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                Advanced Settings
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showAdvanced && (
                <div className="mt-4 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="excluded-artists">Exclude Artists</Label>
                    <MultipleSelector
                      commandProps={{
                        label: "Select artists to exclude from the playlist",
                      }}
                      defaultOptions={artistNames.map((artist) => ({
                        value: artist,
                        label: artist,
                      }))}
                      placeholder="Select artists to exclude from the playlist"
                      hideClearAllButton
                      hidePlaceholderWhenSelected
                      emptyIndicator={
                        <p className="text-center text-sm">No results found</p>
                      }
                      onChange={(selected) =>
                        setExcludedArtists(
                          selected.map((option) => option.value),
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
