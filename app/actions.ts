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
  try {
    const response = await fetch(`${SPOTIFY_BASE_URL}${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spotify API error: ${errorText}`);
      throw new Error(`Spotify API error: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in spotifyApiRequest:", error);
    throw error;
  }
};

export const uploadPlaylistCoverImage = async (
  playlistId: string,
  base64Image: string,
  token: string,
) => {
  const url = `/playlists/${playlistId}/images`;

  try {
    const response = await fetch(`${SPOTIFY_BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/jpeg",
      },
      body: base64Image,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error uploading playlist cover image: ${errorText}`);
      throw new Error(
        `Fout bij het uploaden van de playlist-afbeelding: ${errorText}`,
      );
    }
  } catch (error) {
    console.error("Error in uploadPlaylistCoverImage:", error);
    throw error;
  }
};

export const fetchSpotifyUserId = async (token: string) => {
  try {
    const response = await spotifyApiRequest("/me", "GET", token);
    return response.id;
  } catch (error) {
    console.error("Error fetching Spotify user ID:", error);
    throw error;
  }
};

export async function fetchRelevantTracks(
  accessToken: string,
  artistNames: string[],
) {
  const trackIds: string[] = [];

  const fetchArtistsTracks = async (artistIds: string[]) => {
    if (artistIds.length === 0) {
      console.warn("No artist IDs provided for fetching tracks.");
      return [];
    }

    try {
      const ids = artistIds.join(","); // Directly join the string IDs
      const spotifyArtists = await spotifyApiRequest(
        `/artists?ids=${ids}`,
        "GET",
        accessToken,
      );

      if (!spotifyArtists || !spotifyArtists.artists) {
        console.error(
          "Invalid response from Spotify API for artists:",
          spotifyArtists,
        );
        return [];
      }

      const topTracksPromises = (spotifyArtists.artists || [])
        .filter((artist: any) => artist && artist.id)
        .map((artist: any) => {
          return spotifyApiRequest(
            `/artists/${artist.id}/top-tracks?market=NL`,
            "GET",
            accessToken,
          );
        });

      const topTracksData = await Promise.all(topTracksPromises);

      return topTracksData.flatMap((data: any) =>
        data.tracks.map((track: any) => track.id),
      );
    } catch (error) {
      console.error(`Error processing artists: ${artistIds.join(",")}`, error);
      return [];
    }
  };

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
        console.warn(
          `Artist not found or fetch failed: ${artistName} (status: ${response.status})`,
        );
        return null;
      }

      const artistSpotifyID = await response.json();
      console.log(
        `Fetched Spotify ID for artist: ${artistName}`,
        artistSpotifyID,
      );
      return artistSpotifyID;
    } catch (error) {
      console.error(
        `Error fetching Spotify ID for artist: ${artistName}`,
        error,
      );
      return null;
    }
  });

  const artistIds = (await Promise.all(artistIdPromises))
    .filter((artist) => artist !== null)
    .map((artist) => artist.spotifyId.split("?")[0]); // Remove possible query parameters

  const batches = [];
  for (let i = 0; i < artistIds.length; i += 50) {
    batches.push(artistIds.slice(i, i + 50));
  }

  const results = await Promise.all(
    batches.map((batch) => fetchArtistsTracks(batch)), // Pass string IDs only
  );

  results.forEach((artistTrackIds) => trackIds.push(...artistTrackIds));

  return trackIds;
}

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
  try {
    const playlist = await spotifyApiRequest(
      `/users/${userId}/playlists`,
      "POST",
      token,
      data,
    );
    return playlist;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

export const addTracksToPlaylist = async (
  playlistId: string,
  trackIds: string[],
  token: string,
) => {
  if (!Array.isArray(trackIds) || trackIds.length === 0) {
    console.error("No track IDs provided or trackIds is not an array");
    return;
  }

  const batches = [];
  for (let i = 0; i < trackIds.length; i += 100) {
    batches.push(trackIds.slice(i, i + 100));
  }

  for (const batch of batches) {
    const uris = batch.map((id) => `spotify:track:${id}`);
    try {
      await spotifyApiRequest(
        `/playlists/${playlistId}/tracks`,
        "POST",
        token,
        {
          uris,
        },
      );
    } catch (error) {
      console.error("Error adding tracks to playlist:", error);
      throw error;
    }
  }
};

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
      `Playlist for ${name} created successfully`,
      "generatePlaylist",
      logger_api_key,
    );

    return {
      playlistId: playlist.id,
      playlistUri: playlist.uri,
    };
  } catch (error) {
    console.error("Error creating playlist:", error);
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
