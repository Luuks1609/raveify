"use server";

import { fetchImageAsBase64, logger } from "@/lib/utils";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

const logger_api_key = process.env.LOGGER_API_KEY!;

// Helper: Spotify API Request
const spotifyApiRequest = async (
  url: string,
  method: string,
  token: string,
  body: any = null,
) => {
  const response = await fetch(`${SPOTIFY_BASE_URL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }
  return await response.json();
};

export const uploadPlaylistCoverImage = async (
  playlistId: string,
  base64Image: string,
  token: string,
) => {
  const url = `/playlists/${playlistId}/images`;

  // Verstuur de Base64-afbeelding
  const response = await fetch(`${SPOTIFY_BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "image/jpeg", // Zorg dat de afbeelding een JPEG is
    },
    body: base64Image,
  });

  if (!response.ok) {
    throw new Error(
      `Fout bij het uploaden van de playlist-afbeelding: ${response.statusText}`,
    );
  }
};

export const fetchSpotifyUserId = async (token: string) => {
  const response = await spotifyApiRequest("/me", "GET", token);
  return response.id; // Return the user ID
};

export async function fetchRelevantTracks(
  accessToken: string,
  artistNames: string[],
) {
  const trackIds: string[] = [];

  // Helper om data voor meerdere artiesten op te halen
  const fetchArtistsTracks = async (artistIds: string[]) => {
    try {
      const ids = artistIds.join(",");
      const spotifyArtists = await spotifyApiRequest(
        `/artists?ids=${ids}`,
        "GET",
        accessToken,
      );

      const topTracksPromises = spotifyArtists.artists.map((artist: any) =>
        spotifyApiRequest(
          `/artists/${artist.id}/top-tracks?market=NL`,
          "GET",
          accessToken,
        ),
      );

      const topTracksData = await Promise.all(topTracksPromises);

      return topTracksData.flatMap((data: any) =>
        data.tracks.map((track: any) => track.id),
      );
    } catch (error) {
      console.error(`Error processing artists: ${artistIds}`, error);
      return [];
    }
  };

  // Fetch artist IDs from names
  const artistIdPromises = artistNames.map(async (artistName) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/${artistName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        console.error(`Error fetching Spotify ID for artist: ${artistName}`);
        return null;
      }

      const artistSpotifyID = await response.json();
      if (!artistSpotifyID) {
        console.warn(`No Spotify ID found for artist: ${artistName}`);
        return null;
      }

      return artistSpotifyID;
    } catch (error) {
      console.error(`Error processing artist: ${artistName}`, error);
      return null;
    }
  });

  const artistIds = (await Promise.all(artistIdPromises)).filter(
    (id) => id !== null,
  );

  // Split artist IDs into batches of 50
  const batches = [];
  for (let i = 0; i < artistIds.length; i += 50) {
    batches.push(artistIds.slice(i, i + 50));
  }

  // Fetch tracks for each batch of artist IDs
  const results = await Promise.all(
    batches.map((batch) => fetchArtistsTracks(batch)),
  );

  // Combine all track IDs
  results.forEach((artistTrackIds) => trackIds.push(...artistTrackIds));

  return trackIds;
}

// Playlist aanmaken
export const createPlaylist = async (
  name: string,
  description: string,
  userId: string,
  token: string,
) => {
  const data = {
    name,
    description,
    public: true,
  };
  const playlist = await spotifyApiRequest(
    `/users/${userId}/playlists`,
    "POST",
    token,
    data,
  );
  return playlist;
};

// Tracks toevoegen aan playlist
export const addTracksToPlaylist = async (
  playlistId: string,
  trackIds: string[],
  token: string,
) => {
  if (!Array.isArray(trackIds) || trackIds.length === 0) {
    console.error("No track IDs provided or trackIds is not an array");
    return;
  }

  // Splits track-IDs in batches of 100
  const batches = [];
  for (let i = 0; i < trackIds.length; i += 100) {
    batches.push(trackIds.slice(i, i + 100));
  }

  // Add tracks per batch
  for (const batch of batches) {
    const uris = batch.map((id) => `spotify:track:${id}`);
    await spotifyApiRequest(`/playlists/${playlistId}/tracks`, "POST", token, {
      uris,
    });
  }
};

// Hoofdlogica om alles samen te brengen
export const generatePlaylist = async (
  name: string,
  description: string,
  coverImage: string,
  userId: string,
  trackIds: string[],
  token: string,
) => {
  try {
    const playlist = await createPlaylist(name, description, userId, token);
    await addTracksToPlaylist(playlist.id, trackIds, token);

    if (coverImage) {
      try {
        const base64Image = await fetchImageAsBase64(coverImage);
        await uploadPlaylistCoverImage(playlist.id, base64Image, token);
      } catch (error) {
        console.warn(
          "Failed to upload custom cover image, using default image provided by Spotify.",
        );
      }
    }

    await logger(
      "success",
      "Playlist created successfully",
      "generatePlaylist",
      logger_api_key,
    );

    // Retourneer zowel de ID als de URI
    return {
      playlistId: playlist.id,
      playlistUri: playlist.uri,
    };
  } catch (error) {
    console.error("Fout bij het aanmaken van de playlist:", error);
    await logger(
      "failed",
      "Error creating playlist",
      "generatePlaylist",
      logger_api_key,
      (error as Error).message,
    );
    throw error;
  }
};
