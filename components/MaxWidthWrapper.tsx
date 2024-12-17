import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};
