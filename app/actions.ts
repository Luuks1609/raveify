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
  const startTime = performance.now(); // Start timing
  const response = await fetch(`${SPOTIFY_BASE_URL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
  const endTime = performance.now(); // End timing
  console.log(
    `spotifyApiRequest duration: ${endTime - startTime} milliseconds`,
  );

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }
  return await response.json();
};

// Helper: Fetch Spotify User ID
export const fetchSpotifyUserId = async (token: string) => {
  const startTime = performance.now(); // Start timing
  const response = await spotifyApiRequest("/me", "GET", token);
  const endTime = performance.now(); // End timing
  console.log(
    `fetchSpotifyUserId duration: ${endTime - startTime} milliseconds`,
  );
  return response.id; // Return the user ID
};

export async function fetchRelevantTracks(
  accessToken: string,
  artistNames: string[],
) {
  const startTime = performance.now(); // Start timing
  const trackIds: string[] = [];

  // Helper om data voor één artiest op te halen
  const fetchArtistTracks = async (artistName: string) => {
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
        return [];
      }

      const artistSpotifyID = await response.json();
      if (!artistSpotifyID) {
        console.warn(`No Spotify ID found for artist: ${artistName}`);
        return [];
      }

      const spotifyArtist = await spotifyApiRequest(
        `/artists/${artistSpotifyID}`,
        "GET",
        accessToken,
      );

      const artistId = spotifyArtist?.id;
      if (!artistId) {
        console.warn(`No artist found for: ${artistName}`);
        return [];
      }

      const topTracksData = await spotifyApiRequest(
        `/artists/${artistId}/top-tracks?market=NL`,
        "GET",
        accessToken,
      );

      return topTracksData.tracks.map((track: any) => track.id);
    } catch (error) {
      console.error(`Error processing artist: ${artistName}`, error);
      return [];
    }
  };

  // Paralleliseer de artiestaanroepen
  const results = await Promise.all(
    artistNames.map((artistName) => fetchArtistTracks(artistName)),
  );

  // Combineer alle track-IDs
  results.forEach((artistTrackIds) => trackIds.push(...artistTrackIds));

  const endTime = performance.now(); // End timing
  console.log(
    `fetchRelevantTracks duration: ${endTime - startTime} milliseconds`,
  );
  return trackIds;
}

// Playlist aanmaken
export const createPlaylist = async (
  name: string,
  description: string,
  userId: string,
  token: string,
) => {
  const startTime = performance.now(); // Start timing
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
  const endTime = performance.now(); // End timing
  console.log(`createPlaylist duration: ${endTime - startTime} milliseconds`);
  return playlist;
};

// Tracks toevoegen aan playlist
export const addTracksToPlaylist = async (
  playlistId: string,
  trackIds: string[],
  token: string,
) => {
  const startTime = performance.now(); // Start timing
  if (!Array.isArray(trackIds) || trackIds.length === 0) {
    console.error("No track IDs provided or trackIds is not an array");
    return;
  }

  // Splits track-IDs in batches of 100
  const batches = [];
  console.log("Track IDs:", trackIds); // Debugging log
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
  const endTime = performance.now(); // End timing
  console.log(
    `addTracksToPlaylist duration: ${endTime - startTime} milliseconds`,
  );
};

// Hoofdlogica om alles samen te brengen
export const generatePlaylist = async (
  name: string,
  description: string,
  userId: string,
  trackIds: string[],
  token: string,
) => {
  const startTime = performance.now(); // Start timing
  try {
    const playlist = await createPlaylist(name, description, userId, token);
    console.log({ playlist });
    await addTracksToPlaylist(playlist.id, trackIds, token);

    // Retourneer zowel de ID als de URI
    const endTime = performance.now(); // End timing
    console.log(
      `generatePlaylist duration: ${endTime - startTime} milliseconds`,
    );
    return {
      playlistId: playlist.id,
      playlistUri: playlist.uri,
    };
  } catch (error) {
    console.error("Fout bij het aanmaken van de playlist:", error);
    throw error;
  }
};
