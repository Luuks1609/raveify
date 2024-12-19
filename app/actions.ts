"use server";

import { getServerSession } from "next-auth";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

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

// Helper: Fetch Spotify User ID
export const fetchSpotifyUserId = async (token: string) => {
  const response = await spotifyApiRequest("/me", "GET", token);
  return response.id; // Return the user ID
};

export async function fetchRelevantTracks(
  accessToken: string,
  artistNames: string[],
) {
  const trackIds = [];

  for (const artistName of artistNames) {
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
        continue;
      }

      const artistSpotifyID = await response.json();

      if (!artistSpotifyID) {
        console.warn(`No Spotify ID found for artist: ${artistName}`);
        continue;
      }

      const spotifyArtist = await spotifyApiRequest(
        `/artists/${artistSpotifyID}`,
        "GET",
        accessToken,
      );

      const artistId = spotifyArtist?.id;

      if (!artistId) {
        console.warn(`No artist found for: ${artistName}`);
        continue;
      }

      const topTracksData = await spotifyApiRequest(
        `/artists/${artistId}/top-tracks?market=NL`,
        "GET",
        accessToken,
      );

      const artistTrackIds = topTracksData.tracks.map((track: any) => track.id);
      trackIds.push(...artistTrackIds);
    } catch (error) {
      console.error(`Error processing artist: ${artistName}`, error);
    }
  }

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
  // Splits track-IDs in batches van 100
  const batches = [];
  console.log({ trackIds });
  for (let i = 0; i < trackIds.length; i += 100) {
    batches.push(trackIds.slice(i, i + 100));
  }

  // Voeg per batch tracks toe
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
  userId: string,
  trackIds: string[],
  token: string,
) => {
  try {
    const playlist = await createPlaylist(name, description, userId, token);
    console.log({ playlist });
    await addTracksToPlaylist(playlist.id, trackIds, token);

    // Retourneer zowel de ID als de URI
    return {
      playlistId: playlist.id,
      playlistUri: playlist.uri,
    };
  } catch (error) {
    console.error("Fout bij het aanmaken van de playlist:", error);
    throw error;
  }
};
