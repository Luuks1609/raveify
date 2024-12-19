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
import { CheckIcon } from "lucide-react";
import { RiLoader5Fill } from "@remixicon/react";

export default function CreatePlaylist({
  name,
  description,
  artistNames,
}: {
  name: string;
  description: string;
  artistNames: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [playlistUri, setPlaylistUri] = useState<string | null>(null);

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

      console.log("Artist names:", artistNames);

      const trackIds = await fetchRelevantTracks(accessToken, artistNames);

      console.log("Fetched Track IDs:", trackIds); // Debugging log

      const { playlistId, playlistUri } = await generatePlaylist(
        name,
        description,
        userId,
        trackIds,
        accessToken,
      );

      console.log(`Playlist created with ID: ${playlistId}`);
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
      <DialogContent className="space-y-4">
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
            <Button
              type="submit"
              className="w-full"
              variant={"brand"}
              onClick={createPlaylist}
              disabled={loading}
            >
              {loading ? "Creating..." : "Start creating playlist"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
