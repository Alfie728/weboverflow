import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";

export default function Loading() {
  return (
    <>
      {/* Title skeleton */}
      <Skeleton className="h-14 w-full max-w-[50%]" />

      {/* Search bar skeleton */}
      <div className="mt-11 w-full">
        <Skeleton className="h-14 w-full" />
      </div>

      {/* Question card skeletons */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {range(5).map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-10 flex justify-center">
        <Skeleton className="h-10 w-60" />
      </div>
    </>
  );
}
