import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "ugc-image-upload",
  "playlist-modify-public",
  "playlist-modify-private",
].join(" ");

async function refreshAccessToken(token: any) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET,
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const data = await response.json();
  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_SECRET || "",
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
          redirect_uri: process.env.NEXTAUTH_URL
            ? `${process.env.NEXTAUTH_URL}/api/auth/callback/spotify`
            : undefined,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      // access token has expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Extend the session type to include accessToken
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
