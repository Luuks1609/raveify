"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME, cn } from "@/lib/utils";
import { RiSpotifyFill } from "@remixicon/react";
import { GalleryVerticalEnd, ListMusic } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-secondary p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand text-white">
            <ListMusic className="size-4" />
          </div>
          {APP_NAME}
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome</CardTitle>
              <CardDescription>Login with your Spotfiy account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => signIn("spotify", { callbackUrl: "/" })}
                variant="outline"
                className="w-full hover:bg-brand"
              >
                <RiSpotifyFill size={36} className="" />
                Continue with Spotify
              </Button>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
