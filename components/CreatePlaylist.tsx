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
import { Progress } from "@/components/ui/progress";
import { AlbumIcon, CheckIcon } from "lucide-react";

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
  const [progress, setProgress] = useState(0);
  const [previewTracks, setPreviewTracks] = useState<string[]>([]);
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

      // Simuleer progress-indicator
      setProgress(25);

      const trackIds = await fetchRelevantTracks(accessToken, artistNames);

      // Update de preview met de eerste paar tracks
      setPreviewTracks(trackIds.slice(0, 5)); // Toon de eerste 5 tracks
      setProgress(75);

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
      setProgress(100);
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded bg-brand py-7 text-white hover:bg-red-600">
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
          <div className="space-y-4">
            {/* Progress-indicator */}
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500">
              {progress < 100
                ? "Fetching tracks and building your playlist..."
                : "Finalizing the playlist!"}
            </p>

            {/* Preview van tracks */}
            {previewTracks.length > 0 && (
              <div>
                <p className="text-sm font-semibold">Preview of tracks:</p>
                <ul className="space-y-2">
                  {previewTracks.map((track, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <AlbumIcon className="size-5 text-muted-foreground" />
                      <span>{track}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Succesmelding en opties na creatie */}
        {playlistCreated && (
          <div className="space-y-4">
            <p className="flex items-center space-x-2 text-lg font-bold text-green-600">
              <CheckIcon className="size-5" />
              <span>Playlist successfully created!</span>
            </p>

            <div className="flex flex-col space-y-2">
              <Button
                asChild
                className="rounded bg-green-500 text-white hover:bg-green-600"
              >
                <a
                  href={playlistUri!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on Spotify
                </a>
              </Button>
              <Button className="rounded bg-blue-500 text-white hover:bg-blue-600">
                Share on Social Media
              </Button>
            </div>
          </div>
        )}

        {/* Footer-knop */}
        <DialogFooter>
          {!playlistCreated && (
            <Button type="submit" onClick={createPlaylist} disabled={loading}>
              {loading ? "Creating..." : "Start creating playlist"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
