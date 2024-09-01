import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200 dark:bg-slate-50/10", // Updated light mode color
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
