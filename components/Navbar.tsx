"use client";

import { signOut, useSession } from "next-auth/react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";

import { ReactNode } from "react";
import { APP_NAME } from "@/lib/utils";
import { ListMusic } from "lucide-react";

interface Props {
  actionItem?: ReactNode;
}

function NavbarSkeleton({ actionItem }: Props) {
  return (
    <MaxWidthWrapper>
      <div className="flex h-20 w-full items-center justify-between">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand text-white">
            <ListMusic className="size-4" />
          </div>
          {APP_NAME}
        </a>
        <Skeleton className="size-10 rounded-full" />
      </div>
    </MaxWidthWrapper>
  );
}

export default function Navbar({ actionItem }: Props) {
  const { data: session } = useSession();

  if (session)
    return (
      <MaxWidthWrapper>
        <div className="flex h-20 w-full items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand text-white">
              <ListMusic className="size-4" />
            </div>
            {APP_NAME}
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-x-3 rounded">
                {!session?.user?.image ? (
                  <Skeleton className="size-10 rounded-full" />
                ) : (
                  <img
                    src={session?.user?.image ?? ""}
                    className="size-10 rounded-full"
                    alt=""
                  />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-2">
              <DropdownMenuLabel>Hi {session.user?.name}!</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <p onClick={() => signOut()}>Sign Out</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </MaxWidthWrapper>
    );
  else return <NavbarSkeleton actionItem={actionItem} />;
}
